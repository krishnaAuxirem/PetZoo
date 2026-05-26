import MembershipSection from "@/components/features/home/MembershipSection";
import CTASection from "@/components/features/home/CTASection";
import { Shield, Zap, Star, Heart } from "lucide-react";

export default function Membership() {
  const benefits = [
    { icon: Shield, title: "Health Protection", desc: "AI-powered health monitoring catches issues before they become serious.", color: "text-blue-500" },
    { icon: Zap, title: "Priority Access", desc: "Skip the queue with priority booking for vets, groomers and trainers.", color: "text-amber-500" },
    { icon: Star, title: "Exclusive Discounts", desc: "Save up to 20% on marketplace products and services.", color: "text-yellow-500" },
    { icon: Heart, title: "Emergency Support", desc: "24/7 emergency veterinary phone line for immediate peace of mind.", color: "text-red-500" },
  ];

  return (
    <div className="pt-16">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">⭐ Membership</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Premium Pet Care, Simplified</h1>
          <p className="text-white/70">Choose a plan that fits your pet family. Upgrade or cancel anytime.</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="card-base p-6 text-center hover:shadow-card-hover transition-shadow">
                <b.icon className={`w-10 h-10 ${b.color} mx-auto mb-4`} />
                <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-2">{b.title}</h3>
                <p className="text-light-muted dark:text-dark-muted text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MembershipSection />
      <CTASection />
    </div>
  );
}
