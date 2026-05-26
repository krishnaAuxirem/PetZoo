import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  { title: "Veterinary Care", desc: "Book in-clinic or telemedicine appointments with 1,200+ licensed vets. Specialties include general practice, surgery, dentistry and more.", href: "/veterinarians", image: "/src/assets/vet-hero.jpg", color: "from-sky-500 to-sky-700", features: ["Online Booking", "Telemedicine", "Prescription Management", "Lab Reports", "Follow-up Tracking"] },
  { title: "Pet Grooming", desc: "Professional grooming services at a salon or your home. Bath, haircut, nail trim, de-shedding, spa treatments and more.", href: "/grooming", image: "/src/assets/grooming-hero.jpg", color: "from-purple-500 to-purple-700", features: ["Home Service Available", "Certified Groomers", "All Breeds", "Spa Packages", "Flexible Scheduling"] },
  { title: "Pet Training", desc: "Certified professional trainers offering puppy classes, obedience training, behavior correction and agility programs.", href: "/training", image: "/src/assets/training-hero.jpg", color: "from-amber-500 to-amber-700", features: ["Certified Trainers", "Virtual Sessions", "All Skill Levels", "Progress Tracking", "Behavior Assessment"] },
  { title: "Pet Adoption", desc: "Find your perfect pet companion from our network of 200+ verified shelters. Dogs, cats, birds, rabbits and exotic pets available.", href: "/adoption", image: "/src/assets/adoption-hero.jpg", color: "from-pink-500 to-pink-700", features: ["Verified Shelters", "Application Tracking", "Foster Programs", "Home Checks", "Post-Adoption Support"] },
  { title: "Pet Marketplace", desc: "Shop 25,000+ premium products from trusted brands. Pet food, accessories, toys, healthcare products and subscription boxes.", href: "/marketplace", image: "/src/assets/marketplace-hero.jpg", color: "from-orange-500 to-orange-700", features: ["25K+ Products", "Verified Brands", "Fast Delivery", "Easy Returns", "Subscription Boxes"] },
  { title: "AI Pet Assistant", desc: "Our AI-powered assistant provides 24/7 guidance on pet health, nutrition, behavior and emergency care for all types of pets.", href: "/#ai-assistant", image: "/src/assets/hero-bg.jpg", color: "from-indigo-500 to-indigo-700", features: ["Symptom Checker", "Nutrition Guide", "Emergency Advice", "Breed Info", "24/7 Available"] },
];

export default function Services() {
  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">All Services</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Complete Pet Care Under One Roof</h1>
          <p className="text-white/70">From daily health management to emergency care — everything your pet needs.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {services.map((s, i) => (
          <div key={s.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
            <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
              <div className={`inline-block bg-gradient-to-r ${s.color} text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4`}>{s.title}</div>
              <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-4">{s.title}</h2>
              <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">{s.desc}</p>
              <ul className="grid grid-cols-2 gap-2 mb-8">
                {s.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-light-text dark:text-dark-body"><span className="text-brand-green">✓</span>{f}</li>)}
              </ul>
              <Link to={s.href} className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${s.color} text-white font-semibold rounded-xl transition-all hover:opacity-90 group`}>
                Explore {s.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className={i % 2 === 1 ? "lg:col-start-1" : ""}>
              <img src={s.image} alt={s.title} loading="lazy" className="w-full rounded-3xl shadow-xl aspect-video object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
