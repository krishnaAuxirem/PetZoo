import { Home, Globe, Stethoscope, ShoppingCart, Heart, GraduationCap, Scissors, Star } from "lucide-react";

const stats = [
  { label: "Pet Families Served", value: "48,291+", icon: Home, color: "from-orange-500 to-orange-400", iconColor: "text-white" },
  { label: "Cities Covered", value: "150+", icon: Globe, color: "from-sky-500 to-sky-400", iconColor: "text-white" },
  { label: "Verified Veterinarians", value: "1,247+", icon: Stethoscope, color: "from-green-500 to-green-400", iconColor: "text-white" },
  { label: "Products Available", value: "25,000+", icon: ShoppingCart, color: "from-purple-500 to-purple-400", iconColor: "text-white" },
  { label: "Adoptions Facilitated", value: "3,421+", icon: Heart, color: "from-pink-500 to-pink-400", iconColor: "text-white" },
  { label: "Training Sessions", value: "12,800+", icon: GraduationCap, color: "from-yellow-500 to-yellow-400", iconColor: "text-white" },
  { label: "Grooming Bookings", value: "18,500+", icon: Scissors, color: "from-teal-500 to-teal-400", iconColor: "text-white" },
  { label: "App Rating", value: "4.9 / 5", icon: Star, color: "from-amber-500 to-amber-400", iconColor: "text-white" },
];

const logos = ["Petco", "Royal Canin", "Hill's", "Purina", "Merck", "Zoetis", "Bayer", "Chewy", "PetSmart", "Rover"];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden">
      {/* Logo Marquee */}
      <div className="mb-12">
        <p className="text-center text-light-muted dark:text-dark-muted text-sm mb-6 font-medium uppercase tracking-widest">
          Trusted by leading pet care brands
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="text-light-muted dark:text-dark-muted font-poppins font-bold text-lg opacity-50 hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <p className="font-poppins font-bold text-xl lg:text-2xl text-light-text dark:text-dark-heading">{stat.value}</p>
              <p className="text-light-muted dark:text-dark-muted text-xs mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
