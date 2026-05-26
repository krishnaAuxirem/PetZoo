import { useState } from "react";
import { Star, Check, ArrowRight, Zap, Crown, Shield, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const plans = [
  { id: "m1", name: "Paw Starter", price: 0, yearlyPrice: 0, current: false, color: "from-slate-400 to-slate-500",
    features: ["1 Pet Profile", "Basic Health Records", "Community Access", "3 Vet Consultations/year", "Marketplace Access"] },
  { id: "m2", name: "Pet Care Plus", price: 9.99, yearlyPrice: 89.99, current: true, color: "from-sky-500 to-sky-600",
    features: ["3 Pet Profiles", "Full Health Records", "Vaccination Reminders", "Unlimited Vet Chat", "10% Marketplace Discount", "Grooming Booking", "Priority Support"] },
  { id: "m3", name: "Premium Guardian", price: 24.99, yearlyPrice: 239.99, current: false, color: "from-brand-orange to-orange-600",
    features: ["Unlimited Pets", "AI Health Assistant", "Telemedicine Consultations", "15% Marketplace Discount", "Free Monthly Grooming", "Training Programs", "Emergency 24/7 Vet Line", "Pet Insurance Integration"] },
];

const membershipBenefits = [
  { title: "Priority Vet Booking", desc: "Skip the queue and book appointments instantly", icon: Zap, color: "text-amber-500" },
  { title: "AI Health Insights", desc: "Personalized health reports powered by AI", icon: Sparkles, color: "text-violet-500" },
  { title: "Exclusive Discounts", desc: "Up to 15% off marketplace and services", icon: Star, color: "text-brand-orange" },
  { title: "24/7 Emergency Line", desc: "Instant access to emergency vet support", icon: Shield, color: "text-emerald-500" },
];

export default function OwnerMembership() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const currentPlan = plans.find(p => p.current);

  return (
    <DashboardLayout title="Membership">
      {/* Current Plan Banner */}
      <div className="mb-6 p-5 rounded-2xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)", boxShadow: "0 8px 32px rgba(14,165,233,0.3)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)" }} />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span className="text-white/70 text-sm">Current Plan</span>
            </div>
            <h3 className="font-poppins font-bold text-xl text-white">{currentPlan?.name}</h3>
            <p className="text-white/70 text-sm mt-0.5">${currentPlan?.price}/month · Renews Jan 15, 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white/70 text-xs">Next billing</p>
              <p className="text-white font-semibold">Jan 15, 2025</p>
            </div>
            <button className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-xl border border-white/20 transition-all">Manage Plan</button>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {membershipBenefits.map(b => (
          <div key={b.title} className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <b.icon className={cn("w-6 h-6 mb-2", b.color)} />
            <p className="font-semibold text-sm text-slate-900 dark:text-white">{b.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="text-center mb-6">
        <h3 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-2">Upgrade Your Plan</h3>
        <div className="inline-flex items-center gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/8 mt-2">
          <button onClick={() => setBilling("monthly")} className={cn("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all", billing === "monthly" ? "bg-white dark:bg-dark-card text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400")}>Monthly</button>
          <button onClick={() => setBilling("yearly")} className={cn("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2", billing === "yearly" ? "bg-white dark:bg-dark-card text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400")}>
            Yearly <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">Save 25%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map(plan => (
          <div key={plan.id} className={cn("rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 relative", plan.current ? "border-sky-300 dark:border-sky-500/30 ring-2 ring-sky-500/20" : "border-slate-200/80 dark:border-white/5 bg-white dark:bg-dark-card")} style={{ boxShadow: plan.current ? "0 8px 32px rgba(14,165,233,0.2)" : "0 1px 3px rgba(0,0,0,0.04)" }}>
            {plan.current && (
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white text-[10px] font-bold">Current</span>
              </div>
            )}
            <div className={cn("p-1 bg-gradient-to-r", plan.color)} />
            <div className="p-6">
              <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4", plan.color)} style={{ background: `linear-gradient(135deg, ${plan.color.split(" ")[1]}, ${plan.color.split(" ")[3]})` }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-1">{plan.name}</h4>
              <div className="flex items-end gap-1 mb-5">
                <span className="font-poppins font-extrabold text-3xl text-slate-900 dark:text-white">
                  {plan.price === 0 ? "Free" : `$${billing === "yearly" ? Math.floor(plan.yearlyPrice / 12) : plan.price}`}
                </span>
                {plan.price > 0 && <span className="text-slate-400 mb-1">/mo</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <div className="w-4 h-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled={plan.current} className={cn("w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all", plan.current ? "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-default" : "bg-gradient-to-r text-white hover:opacity-90")} style={!plan.current ? { background: `linear-gradient(135deg, ${plan.color.split(" ")[1]}, ${plan.color.split(" ")[3]})`, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } : {}}>
                {plan.current ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"} {!plan.current && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
