import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all required fields"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Message sent. We'll respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Contact Us</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">We'd Love to Hear From You</h1>
          <p className="text-white/70">Our support team is available 24/7. Average response time: under 2 hours.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading">Get in Touch</h2>
            {[
              { icon: Mail, title: "Email Support", value: "support@petzoo.com", sub: "We respond within 2 hours", color: "text-brand-orange" },
              { icon: Phone, title: "Phone Support", value: "+1 (800) 738-9663", sub: "Mon-Sun, 8am - 10pm EST", color: "text-brand-blue" },
              { icon: MapPin, title: "Headquarters", value: "123 Pet Lane, New York", sub: "NY 10001, United States", color: "text-brand-green" },
              { icon: Clock, title: "Support Hours", value: "24/7 Live Chat", sub: "Phone: 8am-10pm EST", color: "text-purple-500" },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl bg-light-hover dark:bg-dark-hover flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{item.title}</p>
                  <p className="text-sm text-light-text dark:text-dark-body">{item.value}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card-base p-8">
              <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Name *</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name"
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Subject</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
                    <option value="">Select a topic</option>
                    <option>General Inquiry</option><option>Technical Support</option><option>Billing & Payments</option>
                    <option>Report an Issue</option><option>Partnership</option><option>Press & Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
