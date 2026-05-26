import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, Pill, Scissors, GraduationCap, ShoppingBag, Heart, Bot, Users } from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Veterinary Care",
    desc: "Book appointments with 1,200+ verified vets. In-clinic or telemedicine consultations available 24/7.",
    href: "/veterinarians",
    accent: "#0EA5E9",
    bg: "from-sky-500/8 to-sky-500/2",
    border: "border-sky-500/15",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-500",
    tag: "Most Popular",
  },
  {
    icon: Pill,
    title: "Health Tracking",
    desc: "Vaccination records, medication reminders, weight and nutrition tracking — all in your pet's digital passport.",
    href: "/dashboard/owner/health",
    accent: "#22C55E",
    bg: "from-emerald-500/8 to-emerald-500/2",
    border: "border-emerald-500/15",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Scissors,
    title: "Pet Grooming",
    desc: "Book professional groomers near you. Home visits available. Bath, haircut, nail trim and spa services.",
    href: "/grooming",
    accent: "#A855F7",
    bg: "from-purple-500/8 to-purple-500/2",
    border: "border-purple-500/15",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: GraduationCap,
    title: "Expert Training",
    desc: "Join training programs led by certified trainers. Puppy classes, obedience, agility and behavior correction.",
    href: "/training",
    accent: "#F59E0B",
    bg: "from-amber-500/8 to-amber-500/2",
    border: "border-amber-500/15",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    icon: ShoppingBag,
    title: "Pet Marketplace",
    desc: "Shop 25,000+ premium pet products. Food, toys, accessories, healthcare. Fast delivery to your door.",
    href: "/marketplace",
    accent: "#F97316",
    bg: "from-orange-500/8 to-orange-500/2",
    border: "border-orange-500/15",
    iconBg: "bg-orange-500/10",
    iconColor: "text-brand-orange",
    tag: "25K+ Products",
  },
  {
    icon: Heart,
    title: "Pet Adoption",
    desc: "Give a pet a forever home. Browse adoptable pets from 200+ registered shelters across the country.",
    href: "/adoption",
    accent: "#EC4899",
    bg: "from-pink-500/8 to-pink-500/2",
    border: "border-pink-500/15",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    icon: Bot,
    title: "AI Pet Assistant",
    desc: "Get instant AI-powered answers about your pet's health, nutrition, behavior and emergency care guidance.",
    href: "/#ai-assistant",
    accent: "#6366F1",
    bg: "from-indigo-500/8 to-indigo-500/2",
    border: "border-indigo-500/15",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    tag: "Powered by AI",
  },
  {
    icon: Users,
    title: "Pet Community",
    desc: "Connect with millions of pet owners. Share stories, join breed groups, attend events and competitions.",
    href: "/community",
    accent: "#14B8A6",
    bg: "from-teal-500/8 to-teal-500/2",
    border: "border-teal-500/15",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#090B12] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-500/4 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label mb-5 inline-flex">Complete Platform</span>
          <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Everything Your Pet Needs,{" "}
            <span className="text-gradient-orange">Simplified</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From daily health management to emergency care, grooming to adoption — PetZoo is the only platform you'll ever need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Link
              key={i}
              to={f.href}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${f.bg} border ${f.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              style={{ backdropFilter: "blur(8px)" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${f.accent}15 0%, transparent 60%)` }} />

              {/* Tag */}
              {f.tag && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-white/8 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/8">
                  {f.tag}
                </span>
              )}

              <div className={`relative w-11 h-11 ${f.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className={`w-5 h-5 ${f.iconColor}`} />
              </div>

              <h3 className="relative font-poppins font-semibold text-slate-900 dark:text-white mb-2 text-[15px]">{f.title}</h3>
              <p className="relative text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{f.desc}</p>

              <div className="relative flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                style={{ color: f.accent }}>
                Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
