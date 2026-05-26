import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, Pill, Scissors, GraduationCap, ShoppingBag, Heart, Bot, Users } from "lucide-react";

const features = [
  { icon: Stethoscope, title: "Veterinary Care", desc: "Book appointments with 1,200+ verified vets. In-clinic or telemedicine consultations available 24/7.", href: "/veterinarians", color: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800", iconBg: "bg-sky-100 dark:bg-sky-900/40", iconColor: "text-sky-600 dark:text-sky-400" },
  { icon: Pill, title: "Health Tracking", desc: "Vaccination records, medication reminders, weight and nutrition tracking — all in your pet's digital passport.", href: "/dashboard/owner/health", color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800", iconBg: "bg-green-100 dark:bg-green-900/40", iconColor: "text-green-600 dark:text-green-400" },
  { icon: Scissors, title: "Pet Grooming", desc: "Book professional groomers near you. Home visits available. Bath, haircut, nail trim and spa services.", href: "/grooming", color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800", iconBg: "bg-purple-100 dark:bg-purple-900/40", iconColor: "text-purple-600 dark:text-purple-400" },
  { icon: GraduationCap, title: "Expert Training", desc: "Join training programs led by certified trainers. Puppy classes, obedience, agility and behavior correction.", href: "/training", color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800", iconBg: "bg-amber-100 dark:bg-amber-900/40", iconColor: "text-amber-600 dark:text-amber-400" },
  { icon: ShoppingBag, title: "Pet Marketplace", desc: "Shop 25,000+ premium pet products. Food, toys, accessories, healthcare. Fast delivery to your door.", href: "/marketplace", color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800", iconBg: "bg-orange-100 dark:bg-orange-900/40", iconColor: "text-brand-orange" },
  { icon: Heart, title: "Pet Adoption", desc: "Give a pet a forever home. Browse adoptable pets from 200+ registered shelters across the country.", href: "/adoption", color: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800", iconBg: "bg-pink-100 dark:bg-pink-900/40", iconColor: "text-pink-600 dark:text-pink-400" },
  { icon: Bot, title: "AI Pet Assistant", desc: "Get instant AI-powered answers about your pet's health, nutrition, behavior and emergency care guidance.", href: "/#ai-assistant", color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800", iconBg: "bg-indigo-100 dark:bg-indigo-900/40", iconColor: "text-indigo-600 dark:text-indigo-400" },
  { icon: Users, title: "Pet Community", desc: "Connect with millions of pet owners. Share stories, join breed groups, attend events and competitions.", href: "/community", color: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800", iconBg: "bg-teal-100 dark:bg-teal-900/40", iconColor: "text-teal-600 dark:text-teal-400" },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Complete Ecosystem</span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">
            Everything Your Pet Needs, Simplified
          </h2>
          <p className="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            From daily health management to emergency care, grooming to adoption — PetZoo is the only platform you'll ever need for your beloved pets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Link key={i} to={f.href}
              className={`group p-6 rounded-2xl border ${f.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-2">{f.title}</h3>
              <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed mb-4">{f.desc}</p>
              <div className="flex items-center gap-1 text-brand-orange text-sm font-semibold group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
