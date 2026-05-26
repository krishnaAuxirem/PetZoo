import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { faqData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function FAQHomeSection() {
  const [openId, setOpenId] = useState<string | null>("f1");
  const displayFaqs = faqData.slice(0, 6);

  return (
    <section className="py-24 bg-white dark:bg-dark-card relative overflow-hidden" id="faq">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-500/3 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label mb-5 inline-flex">
            <MessageCircle className="w-3 h-3" /> Frequently Asked
          </span>
          <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Got Questions? <span className="text-gradient-orange">We've Got Answers</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Can't find what you need?{" "}
            <Link to="/contact" className="text-brand-orange hover:text-orange-500 font-semibold transition-colors underline underline-offset-2">
              Contact our support team
            </Link>
          </p>
        </div>

        <div className="space-y-2.5">
          {displayFaqs.map((faq) => (
            <div
              key={faq.id}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-200 border",
                openId === faq.id
                  ? "border-brand-orange/20 bg-orange-50/50 dark:bg-orange-500/5"
                  : "border-slate-200/80 dark:border-white/6 bg-white dark:bg-[#0D1117]"
              )}
              style={{
                boxShadow: openId === faq.id
                  ? "0 4px 20px rgba(249,115,22,0.06)"
                  : "0 1px 3px rgba(0,0,0,0.04)"
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-[10px] font-bold text-brand-orange bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-lg uppercase tracking-wide flex-shrink-0">
                    {faq.category}
                  </span>
                  <span className={cn(
                    "font-medium text-sm transition-colors",
                    openId === faq.id
                      ? "text-brand-orange"
                      : "text-slate-900 dark:text-white"
                  )}>
                    {faq.question}
                  </span>
                </div>
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-all",
                  openId === faq.id
                    ? "bg-brand-orange text-white"
                    : "bg-slate-100 dark:bg-white/6 text-slate-400"
                )}>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", openId === faq.id && "rotate-180")} />
                </div>
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-5">
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed pl-[4.5rem]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors group px-6 py-3 rounded-xl border border-slate-200/80 dark:border-white/8 hover:border-brand-orange/30 bg-white dark:bg-[#0D1117]">
            View All {faqData.length} FAQs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
