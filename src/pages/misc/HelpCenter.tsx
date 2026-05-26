import { useState } from "react";
import { Search, HelpCircle, MessageCircle, BookOpen, Video, ChevronDown, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { faqData } from "@/lib/mockData";
import toast from "react-hot-toast";

const categories = [
  { label: "Getting Started", icon: BookOpen, color: "text-sky-500", bg: "bg-sky-100 dark:bg-sky-900/20", count: 12 },
  { label: "Account & Billing", icon: HelpCircle, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/20", count: 8 },
  { label: "Veterinary Services", icon: MessageCircle, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20", count: 15 },
  { label: "Marketplace", icon: BookOpen, color: "text-brand-orange", bg: "bg-brand-orange/10", count: 10 },
  { label: "Adoptions", icon: HelpCircle, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/20", count: 7 },
  { label: "Technical Issues", icon: Video, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20", count: 6 },
];

const guides = [
  { title: "Getting Started with PetZoo", steps: 5, time: "5 min", type: "Guide" },
  { title: "How to Book a Vet Appointment", steps: 3, time: "2 min", type: "Video" },
  { title: "Setting Up Your Pet Profile", steps: 4, time: "3 min", type: "Guide" },
  { title: "Managing Vaccination Records", steps: 4, time: "4 min", type: "Guide" },
  { title: "Using the Telemedicine Feature", steps: 3, time: "2 min", type: "Video" },
  { title: "Navigating the Marketplace", steps: 5, time: "5 min", type: "Guide" },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filtered = faqData.filter(f =>
    search === "" ||
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-sky-500/20 text-sky-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Help Center</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">How can we help you?</h1>
          <p className="text-white/70 mb-8">Find answers, guides, and tutorials for everything on PetZoo.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 text-sm" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-white/50">
            <span>Popular:</span>
            {["Book a vet", "Reset password", "Track order", "Cancel subscription"].map(t => (
              <button key={t} onClick={() => setSearch(t)} className="text-sky-400 hover:text-sky-300 underline underline-offset-2">{t}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mb-8">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => (
              <button key={cat.label} onClick={() => setSearch(cat.label)}
                className="card-base p-5 flex items-center gap-4 hover:shadow-card-hover transition-all hover:-translate-y-0.5 text-left group">
                <div className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-heading">{cat.label}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{cat.count} articles</p>
                </div>
                <ArrowRight className="w-4 h-4 text-light-muted dark:text-dark-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Start Guides */}
        <div className="mb-16">
          <h2 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mb-8">Quick Start Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map(guide => (
              <button key={guide.title} onClick={() => toast.info("Opening guide: " + guide.title)}
                className="card-base p-5 text-left hover:shadow-card-hover transition-all hover:-translate-y-0.5 group">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${guide.type === "Video" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"}`}>
                    {guide.type}
                  </span>
                  <span className="text-xs text-light-muted dark:text-dark-muted">{guide.time} read</span>
                </div>
                <h3 className="font-semibold text-sm text-light-text dark:text-dark-heading mb-2 group-hover:text-brand-orange transition-colors">{guide.title}</h3>
                <p className="text-xs text-light-muted dark:text-dark-muted">{guide.steps} steps</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading">Frequently Asked Questions</h2>
            <Link to="/faq" className="text-sm text-brand-orange font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {(search ? filtered : faqData.slice(0, 6)).map(faq => (
              <div key={faq.id} className="card-base overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <span className="font-semibold text-sm text-light-text dark:text-dark-heading">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-light-muted dark:text-dark-muted flex-shrink-0 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-4 border-t border-light-border dark:border-dark-border">
                    <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            {search && filtered.length === 0 && (
              <div className="card-base p-8 text-center">
                <p className="text-light-muted dark:text-dark-muted">No results for "{search}". Try a different search or <Link to="/contact" className="text-brand-orange hover:underline">contact support</Link>.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: MessageCircle, title: "Live Chat", desc: "Chat with our support team in real-time. Available 24/7.", action: "Start Chat", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20", onClick: () => toast.info("Live chat opening... (demo)") },
            { icon: Mail, title: "Email Support", desc: "Send us a detailed message. We reply within 24 hours.", action: "Send Email", color: "text-sky-500", bg: "bg-sky-100 dark:bg-sky-900/20", onClick: () => window.location.href = "mailto:support@petzoo.com" },
            { icon: Phone, title: "Phone Support", desc: "Talk to a human. Available Mon–Fri 9AM–6PM EST.", action: "Call Now", color: "text-brand-orange", bg: "bg-brand-orange/10", onClick: () => toast.info("Calling +1 800 PETZOO6...") },
          ].map(ch => (
            <div key={ch.title} className="card-base p-6 text-center hover:shadow-card-hover transition-all">
              <div className={`w-14 h-14 ${ch.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <ch.icon className={`w-7 h-7 ${ch.color}`} />
              </div>
              <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-2">{ch.title}</h3>
              <p className="text-light-muted dark:text-dark-muted text-sm mb-4">{ch.desc}</p>
              <button onClick={ch.onClick} className="w-full py-2.5 border border-light-border dark:border-dark-border rounded-xl text-sm font-semibold text-light-text dark:text-dark-heading hover:border-brand-orange hover:text-brand-orange transition-colors">
                {ch.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
