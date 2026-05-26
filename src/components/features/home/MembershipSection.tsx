import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Zap } from "lucide-react";
import { mockMembershipPlans } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function MembershipSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 bg-white dark:bg-dark-card" id="membership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Membership Plans</span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">
            Choose Your Pet Care Plan
          </h2>
          <p className="text-light-muted dark:text-dark-muted mb-8">Start free, upgrade anytime. All plans include core pet management features.</p>
          <div className="flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium", !isYearly ? "text-light-text dark:text-dark-heading" : "text-light-muted dark:text-dark-muted")}>Monthly</span>
            <button onClick={() => setIsYearly(!isYearly)}
              className={cn("w-12 h-6 rounded-full transition-colors relative", isYearly ? "bg-brand-orange" : "bg-light-border dark:bg-dark-border")}>
              <span className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow", isYearly ? "left-7" : "left-1")} />
            </button>
            <span className={cn("text-sm font-medium", isYearly ? "text-light-text dark:text-dark-heading" : "text-light-muted dark:text-dark-muted")}>
              Yearly <span className="text-brand-green text-xs font-semibold ml-1">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockMembershipPlans.map((plan) => (
            <div key={plan.id} className={cn(
              "relative rounded-2xl border-2 p-6 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl",
              plan.highlighted
                ? "border-brand-orange bg-gradient-to-b from-brand-orange/5 to-transparent shadow-orange"
                : "border-light-border dark:border-dark-border bg-white dark:bg-dark-card"
            )}>
              {plan.badge && (
                <div className={cn(
                  "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white",
                  plan.highlighted ? "bg-brand-orange" : plan.badge === "Enterprise" ? "bg-purple-500" : "bg-brand-blue"
                )}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl mb-3" style={{ backgroundColor: plan.color + "20" }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <Zap className="w-5 h-5" style={{ color: plan.color }} />
                  </div>
                </div>
                <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="font-poppins font-extrabold text-3xl text-light-text dark:text-dark-heading">
                    {plan.price === 0 ? "Free" : `$${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-light-muted dark:text-dark-muted text-sm mb-1">/mo</span>}
                </div>
                {isYearly && plan.price > 0 && (
                  <p className="text-brand-green text-xs font-semibold mt-1">${plan.yearlyPrice}/year billed annually</p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-light-text dark:text-dark-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.price === 0 ? "/register" : "/pricing"}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-semibold text-center transition-all",
                  plan.highlighted
                    ? "bg-brand-orange hover:bg-brand-orange-dark text-white shadow-orange"
                    : "border-2 border-light-border dark:border-dark-border text-light-text dark:text-dark-heading hover:border-brand-orange hover:text-brand-orange"
                )}>
                {plan.price === 0 ? "Get Started Free" : "Choose Plan"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
