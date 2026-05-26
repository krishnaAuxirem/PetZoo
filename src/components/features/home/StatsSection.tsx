import { Home, Globe, Stethoscope, ShoppingCart, Heart, GraduationCap, Scissors, Star } from "lucide-react";

const stats = [
  { label: "Pet Families Served", value: "48,291+", icon: Home, gradient: "from-orange-500 to-orange-400" },
  { label: "Cities Covered", value: "150+", icon: Globe, gradient: "from-sky-500 to-sky-400" },
  { label: "Verified Veterinarians", value: "1,247+", icon: Stethoscope, gradient: "from-emerald-500 to-emerald-400" },
  { label: "Products Available", value: "25,000+", icon: ShoppingCart, gradient: "from-violet-500 to-violet-400" },
  { label: "Adoptions Facilitated", value: "3,421+", icon: Heart, gradient: "from-pink-500 to-pink-400" },
  { label: "Training Sessions", value: "12,800+", icon: GraduationCap, gradient: "from-yellow-500 to-yellow-400" },
  { label: "Grooming Bookings", value: "18,500+", icon: Scissors, gradient: "from-teal-500 to-teal-400" },
  { label: "App Rating", value: "4.9 / 5", icon: Star, gradient: "from-amber-500 to-amber-400" },
];

const logos = ["Petco", "Royal Canin", "Hill's Science", "Purina Pro Plan", "Merck Animal", "Zoetis", "Bayer Pet", "Chewy", "PetSmart", "Rover"];

export default function StatsSection() {
  return (
    <section className="bg-white dark:bg-dark-card border-y border-slate-200/60 dark:border-white/5 overflow-hidden">
      {/* Logo Marquee */}
      <div className="py-8 border-b border-slate-100 dark:border-white/4">
        <p className="text-center text-slate-400 dark:text-slate-500 text-xs mb-5 font-semibold uppercase tracking-widest">
          Trusted by leading pet care brands
        </p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-dark-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-dark-card to-transparent z-10 pointer-events-none" />
          <div className="flex gap-10 animate-marquee whitespace-nowrap py-1">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i}
                className="text-slate-300 dark:text-slate-600 font-poppins font-bold text-base tracking-tight hover:text-slate-500 dark:hover:text-slate-400 transition-colors cursor-default select-none">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-poppins font-bold text-xl lg:text-2xl text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
