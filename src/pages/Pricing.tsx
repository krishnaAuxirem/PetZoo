import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Zap, ArrowRight } from "lucide-react";
import { mockMembershipPlans } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const features = [
    { name: "Pet Profiles", starter: "1", plus: "3", premium: "Unlimited", enterprise: "Unlimited" },
    { name: "Health Records", starter: "Basic", plus: "Full", premium: "Full + AI", enterprise: "Full + AI" },
    { name: "Vet Consultations", starter: "3/year", plus: "Unlimited Chat", premium: "Video + Chat", enterprise: "Priority" },
    { name: "Marketplace Discount", starter: "—", plus: "10%", premium: "15%", enterprise: "20%" },
    { name: "Grooming Booking", starter: "❌", plus: "✅", premium: "✅ + 1 Free/mo", enterprise: "✅ Unlimited" },
    { name: "Training Programs", starter: "❌", plus: "❌", premium: "✅", enterprise: "✅" },
    { name: "AI Pet Assistant", starter: "❌", plus: "❌", premium: "✅ Full Access", enterprise: "✅ Priority" },
    { name: "Emergency 24/7 Line", starter: "❌", plus: "❌", premium: "✅", enterprise: "✅" },
    { name: "Family Access", starter: "1 user", plus: "2 users", premium: "5 users", enterprise: "Unlimited" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Pricing</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-white/70 mb-8">Start free, upgrade when you need more. No hidden fees. Cancel anytime.</p>
          <div className="flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium", !yearly ? "text-white" : "text-white/60")}>Monthly</span>
            <button onClick={() => setYearly(!yearly)} className={cn("w-12 h-6 rounded-full transition-colors relative", yearly ? "bg-brand-orange" : "bg-slate-600")}>
              <span className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow", yearly ? "left-7" : "left-1")} />
            </button>
            <span className={cn("text-sm font-medium", yearly ? "text-white" : "text-white/60")}>
              Yearly <span className="text-brand-green text-xs font-bold ml-1">Save 25%</span>
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {mockMembershipPlans.map((plan) => (
            <div key={plan.id} className={cn(
              "relative rounded-2xl border-2 p-6 flex flex-col transition-all",
              plan.highlighted ? "border-brand-orange bg-gradient-to-b from-brand-orange/5 to-transparent shadow-xl" : "border-light-border dark:border-dark-border bg-white dark:bg-dark-card"
            )}>
              {plan.badge && <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white", plan.highlighted ? "bg-brand-orange" : "bg-brand-blue")}>{plan.badge}</div>}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3"><Zap className="w-5 h-5" style={{ color: plan.color }} /><h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading">{plan.name}</h3></div>
                <div className="flex items-end gap-1">
                  <span className="font-poppins font-extrabold text-3xl text-light-text dark:text-dark-heading">{plan.price === 0 ? "Free" : `$${yearly ? Math.floor(plan.yearlyPrice / 12) : plan.price}`}</span>
                  {plan.price > 0 && <span className="text-light-muted dark:text-dark-muted text-sm mb-1">/mo</span>}
                </div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, i) => <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" /><span className="text-sm text-light-text dark:text-dark-body">{f}</span></li>)}
              </ul>
              <Link to="/register" className={cn("w-full py-3 rounded-xl text-sm font-semibold text-center transition-all", plan.highlighted ? "bg-brand-orange hover:bg-brand-orange-dark text-white shadow-orange" : "border-2 border-current hover:bg-light-hover dark:hover:bg-dark-hover")} style={{ color: plan.highlighted ? "white" : plan.color }}>
                {plan.price === 0 ? "Get Started Free" : "Choose Plan"}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-hover dark:bg-dark-hover">
                <tr>
                  <th className="text-left px-6 py-4 font-poppins font-semibold text-light-text dark:text-dark-heading">Feature</th>
                  {mockMembershipPlans.map(p => <th key={p.id} className="px-6 py-4 font-poppins font-semibold text-center" style={{ color: p.color }}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.name} className={i % 2 === 0 ? "bg-white dark:bg-dark-card" : "bg-light-bg dark:bg-dark-bg"}>
                    <td className="px-6 py-3 text-sm text-light-text dark:text-dark-body font-medium">{f.name}</td>
                    {[f.starter, f.plus, f.premium, f.enterprise].map((v, j) => (
                      <td key={j} className="px-6 py-3 text-sm text-center">
                        {v === "❌" ? <X className="w-4 h-4 text-red-400 mx-auto" /> : v === "✅" ? <Check className="w-4 h-4 text-brand-green mx-auto" /> : <span className="text-light-text dark:text-dark-body">{v}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
