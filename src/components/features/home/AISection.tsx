import { useState } from "react";
import { Bot, Stethoscope, Salad, Brain, AlertTriangle, CalendarDays, Info, Send } from "lucide-react";

const aiFeatures = [
  { icon: Stethoscope, label: "Symptom Checker", color: "text-sky-400" },
  { icon: Salad, label: "Nutrition Advisor", color: "text-green-400" },
  { icon: Brain, label: "Behavior Guide", color: "text-purple-400" },
  { icon: AlertTriangle, label: "Emergency Help", color: "text-red-400" },
  { icon: CalendarDays, label: "Care Reminders", color: "text-amber-400" },
  { icon: Info, label: "Breed Info", color: "text-brand-orange" },
];

function AISection() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{role: "user"|"ai"; text: string}[]>([
    { role: "ai", text: "Hi, I'm PetAI — your intelligent pet care assistant. Ask me anything about your pet's health, nutrition, behavior, or care." }
  ]);

  const responses = [
    "Based on your description, this sounds like it could be a minor skin irritation. Monitor for redness, excessive scratching, or spreading. If symptoms persist beyond 48 hours, I recommend a vet visit. Would you like me to book an appointment?",
    "For a Golden Retriever, I recommend 2-3 cups of high-quality dry food daily, split into two meals. Look for formulas with chicken or fish as the first ingredient.",
    "Excessive barking at night often indicates anxiety, boredom, or a medical issue. Try providing more exercise during the day, a comfortable sleeping area, and consider a white noise machine.",
    "Cats typically need 24-35 calories per pound of body weight daily. Wet food is preferred for hydration. I'd recommend consulting with a veterinarian for a personalized nutrition plan.",
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage("");
    setChat(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setChat(prev => [...prev, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800" id="ai-assistant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-indigo-500/20 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">AI Pet Assistant</span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet PetAI — Your Intelligent Pet Care Advisor
            </h2>
            <p className="text-white/70 mb-8">Available 24/7 to answer health questions, provide nutrition guidance, behavioral advice and emergency care instructions for all types of pets.</p>
            <div className="grid grid-cols-2 gap-3">
              {aiFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 text-white/70 text-sm">
                  <f.icon className={`w-4 h-4 flex-shrink-0 ${f.color}`} />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-slate-700/50">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-orange to-orange-400 rounded-xl flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">PetAI Assistant</p>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /><span className="text-white/50 text-xs">Online</span></div>
              </div>
            </div>
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 rounded-lg bg-brand-orange/20 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-brand-orange" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === "user" ? "bg-brand-orange text-white" : "bg-slate-700/70 text-white/90"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-4 border-t border-white/10">
              <input value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask about your pet's health..."
                className="flex-1 bg-slate-700/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-orange" />
              <button onClick={handleSend} className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AISection };
