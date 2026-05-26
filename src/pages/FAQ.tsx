import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { faqData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const allCategories = ["All", ...Array.from(new Set(faqData.map(f => f.category)))];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = faqData.filter(f =>
    (cat === "All" || f.category === cat) &&
    (search === "" || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Help Center</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/70 mb-8">Can't find what you're looking for? <Link to="/contact" className="text-brand-orange hover:underline">Contact us</Link>.</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/40" />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-2 flex-wrap mb-8">
          {allCategories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-brand-orange"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(f => (
            <div key={f.id} className={cn("card-base overflow-hidden transition-all", open === f.id && "ring-2 ring-brand-orange/30")}>
              <button className="w-full flex items-center justify-between p-5 text-left gap-4" onClick={() => setOpen(open === f.id ? null : f.id)}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-lg whitespace-nowrap">{f.category}</span>
                  <span className="font-medium text-sm text-light-text dark:text-dark-heading truncate">{f.question}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-light-muted dark:text-dark-muted flex-shrink-0 transition-transform", open === f.id && "rotate-180")} />
              </button>
              {open === f.id && (
                <div className="px-5 pb-5">
                  <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">{f.answer}</p>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-light-muted dark:text-dark-muted">No FAQs found. <Link to="/contact" className="text-brand-orange hover:underline">Contact support</Link>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
