import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { faqData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function FAQHomeSection() {
  const [openId, setOpenId] = useState<string | null>("f1");
  const displayFaqs = faqData.slice(0, 6);

  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">FAQ</span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-light-muted dark:text-dark-muted">
            Can't find your answer? <Link to="/contact" className="text-brand-orange hover:underline">Contact our support team</Link>.
          </p>
        </div>

        <div className="space-y-3">
          {displayFaqs.map((faq) => (
            <div key={faq.id} className={cn("card-base overflow-hidden transition-all", openId === faq.id && "ring-2 ring-brand-orange/30")}>
              <button className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-lg">{faq.category}</span>
                  <span className="font-medium text-light-text dark:text-dark-heading text-sm">{faq.question}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-light-muted dark:text-dark-muted flex-shrink-0 transition-transform ml-4", openId === faq.id && "rotate-180")} />
              </button>
              {openId === faq.id && (
                <div className="px-5 pb-5">
                  <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed pl-[5.5rem]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/faq" className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-dark font-semibold text-sm group">
            View All FAQs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
