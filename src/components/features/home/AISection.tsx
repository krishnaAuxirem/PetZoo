import { useState } from "react";
import { Bot, Stethoscope, Salad, Brain, AlertTriangle, CalendarDays, Info, Send, Sparkles, Zap } from "lucide-react";

const aiFeatures = [
  { icon: Stethoscope, label: "Symptom Checker", desc: "Instant health analysis", color: "text-sky-400", bg: "bg-sky-500/10" },
  { icon: Salad, label: "Nutrition Advisor", desc: "Diet & feeding plans", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Brain, label: "Behavior Guide", desc: "Understand your pet", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: AlertTriangle, label: "Emergency Help", desc: "24/7 emergency triage", color: "text-red-400", bg: "bg-red-500/10" },
  { icon: CalendarDays, label: "Care Reminders", desc: "Smart scheduling", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Info, label: "Breed Info", desc: "3,000+ breed profiles", color: "text-orange-400", bg: "bg-orange-500/10" },
];

const responses = [
  "Based on your description, this sounds like a minor skin irritation. Monitor for redness or spreading. If symptoms persist beyond 48 hours, I recommend a vet visit. Would you like me to find an available vet nearby?",
  "For a Golden Retriever, I recommend 2-3 cups of high-quality dry food daily, split into two meals. Look for formulas with real chicken or salmon as the first ingredient. Avoid corn and wheat fillers.",
  "Excessive barking at night often signals anxiety or boredom. Try more exercise during the day, a comfortable sleeping space, and white noise. If it persists, a behavioral consult could help.",
  "Cats need 24-35 calories per pound of body weight daily. Wet food is best for hydration. I recommend scheduling a vet visit for a personalized nutrition plan tailored to your cat's age and activity.",
];

const quickPrompts = ["Is my dog's weight healthy?", "Best food for cats?", "My pet is scratching a lot", "Puppy vaccination schedule"];

function AISection() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm PetAI — your 24/7 intelligent pet care assistant. Ask me about health symptoms, nutrition, behavior, or emergency care for any pet." }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (msg?: string) => {
    const userMsg = msg || message;
    if (!userMsg.trim()) return;
    setMessage("");
    setChat(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChat(prev => [...prev, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0D1117 0%, #090B12 100%)" }} id="ai-assistant">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full animate-orb"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full animate-orb-delayed"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3 h-3" /> Powered by Advanced AI
            </span>
            <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Meet PetAI —<br />
              <span className="text-gradient-orange">Your Intelligent</span><br />
              Pet Care Advisor
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              Available 24/7 to answer any pet health question, provide personalized nutrition guidance, behavior coaching, and emergency care instructions — for every pet type.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {aiFeatures.map(f => (
                <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors">
                  <div className={`w-8 h-8 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}>
                    <f.icon className={`w-4 h-4 ${f.color}`} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{f.label}</p>
                    <p className="text-white/40 text-[10px]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand-orange/8 border border-brand-orange/15">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Instant Responses</p>
                <p className="text-white/50 text-xs mt-0.5">Powered by GPT-5 · Answers in under 2 seconds</p>
              </div>
            </div>
          </div>

          {/* Right — Chat UI */}
          <div className="rounded-2xl overflow-hidden border border-white/8"
            style={{ background: "rgba(13,17,28,0.8)", backdropFilter: "blur(40px)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

            {/* Chat Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center"
                style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                <Bot className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">PetAI Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white/40 text-xs">Online · Powered by GPT-5</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {["bg-red-500", "bg-amber-500", "bg-emerald-500"].map(c => (
                  <div key={c} className={`w-2.5 h-2.5 rounded-full ${c} opacity-60`} />
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 smooth-scroll">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-xl bg-brand-orange/15 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-brand-orange" />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-brand-orange to-orange-600 text-white"
                      : "bg-white/5 text-white/85 border border-white/6"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-xl bg-brand-orange/15 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/6">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {quickPrompts.map(p => (
                <button key={p} onClick={() => handleSend(p)}
                  className="text-xs text-white/50 hover:text-white border border-white/8 hover:border-brand-orange/30 px-3 py-1.5 rounded-lg transition-all hover:bg-brand-orange/5">
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 p-4 border-t border-white/6">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask about your pet's health, diet, or behavior..."
                className="flex-1 bg-white/5 border border-white/8 focus:border-brand-orange/40 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none transition-colors"
              />
              <button onClick={() => handleSend()}
                className="px-4 py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-1.5"
                style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AISection };
