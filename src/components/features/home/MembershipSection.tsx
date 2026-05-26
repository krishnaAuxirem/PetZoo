import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Zap, ArrowRight, Sparkles } from "lucide-react";
import { mockMembershipPlans } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function MembershipSection() {
  const [isYearly, setIsYearly] = useState(false);

  const planColors: Record<string, { gradient: string; shadow: string; badge: string }> = {
    Free: { gradient: "from-slate-500 to-slate-400", shadow: "rgba(100,116,139,0.3)", badge: "" },
    Basic: { gradient: "from-sky-500 to-sky-400", shadow: "rgba(14,165,233,0.35)", badge: "" },
    Premium: { gradient: "from-orange-500 to-orange-400", shadow: "rgba(249,115,22,0.4)", badge: "Most Popular" },
    Enterprise: { gradient: "from-violet-500 to-violet-400", shadow: "rgba(168,85,247,0.35)", badge: "Best Value" },
  };

  return (
    <section className="py-24 bg-white dark:bg-dark-card relative overflow-hidden" id="membership">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/4 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-violet-500/4 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label mb-5 inline-flex">
            <Sparkles className="w-3 h-3" /> Pricing Plans
          </span>
          <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Choose Your Perfect Plan
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Start free, upgrade anytime. All plans include our core pet management suite.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/8">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                !isYearly
                  ? "bg-white dark:bg-dark-card text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}>
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                isYearly
                  ? "bg-white dark:bg-dark-card text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}>
              Yearly
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {mockMembershipPlans.map((plan) => {
            const colors = planColors[plan.name] || planColors.Basic;
            const isHighlighted = plan.highlighted;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden",
                  isHighlighted
                    ? "border-0 text-white"
                    : "bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-white/6"
                )}
                style={isHighlighted ? {
                  background: `linear-gradient(145deg, #F97316, #EA6C0A)`,
                  boxShadow: `0 8px 32px ${colors.shadow}, 0 0 0 1px rgba(249,115,22,0.2)`
                } : {
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.04)"
                }}
              >
                {/* Badge */}
                {colors.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded-full",
                      isHighlighted
                        ? "bg-white/20 text-white"
                        : "bg-violet-500 text-white"
                    )}>
                      {colors.badge}
                    </span>
                  </div>
                )}

                {/* Subtle grid pattern for highlighted */}
                {isHighlighted && (
                  <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                )}

                <div className="relative p-6 flex flex-col flex-1">
                  {/* Plan icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    isHighlighted ? "bg-white/15" : `${colors.gradient} bg-gradient-to-br`
                  )} style={!isHighlighted ? { background: `linear-gradient(135deg, ${colors.gradient})`, boxShadow: `0 4px 12px ${colors.shadow}` } : {}}>
                    <Zap className="w-5 h-5 text-white" />
                  </div>

                  <h3 className={cn(
                    "font-poppins font-bold text-lg mb-1",
                    isHighlighted ? "text-white" : "text-slate-900 dark:text-white"
                  )}>{plan.name}</h3>

                  <div className="flex items-end gap-1.5 mb-5">
                    <span className={cn(
                      "font-poppins font-extrabold text-3xl tracking-tight",
                      isHighlighted ? "text-white" : "text-slate-900 dark:text-white"
                    )}>
                      {plan.price === 0 ? "Free" : `$${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className={cn("text-sm mb-1", isHighlighted ? "text-white/70" : "text-slate-500 dark:text-slate-400")}>/mo</span>
                    )}
                  </div>
                  {isYearly && plan.price > 0 && (
                    <p className={cn("text-xs font-semibold -mt-3 mb-4", isHighlighted ? "text-white/70" : "text-emerald-500")}>
                      ${plan.yearlyPrice}/year
                    </p>
                  )}

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          isHighlighted ? "bg-white/20" : "bg-emerald-50 dark:bg-emerald-500/10"
                        )}>
                          <Check className={cn("w-2.5 h-2.5", isHighlighted ? "text-white" : "text-emerald-500")} />
                        </div>
                        <span className={cn("text-sm", isHighlighted ? "text-white/85" : "text-slate-600 dark:text-slate-300")}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.price === 0 ? "/register" : "/pricing"}
                    className={cn(
                      "w-full py-3 rounded-xl text-sm font-semibold text-center transition-all flex items-center justify-center gap-2 group",
                      isHighlighted
                        ? "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                        : plan.name === "Enterprise"
                          ? "bg-violet-500 hover:bg-violet-600 text-white"
                          : "border border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-200 hover:border-brand-orange hover:text-brand-orange dark:hover:border-brand-orange dark:hover:text-brand-orange"
                    )}>
                    {plan.price === 0 ? "Get Started Free" : "Choose Plan"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
