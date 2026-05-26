import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, Dog, Cat, Bird, Rabbit, Stethoscope, ShoppingBag, Scissors, GraduationCap, Heart, Bot, Users, Star, MapPin, Clock, Video, CheckCircle } from "lucide-react";
import HeroSection from "@/components/features/home/HeroSection";
import StatsSection from "@/components/features/home/StatsSection";
import FeaturesSection from "@/components/features/home/FeaturesSection";
import MembershipSection from "@/components/features/home/MembershipSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import FAQHomeSection from "@/components/features/home/FAQHomeSection";
import CTASection from "@/components/features/home/CTASection";
import { AISection } from "@/components/features/home/AISection";
import { mockVets, mockAdoptionPets, mockCommunityPosts } from "@/lib/mockData";
import { formatRelativeTime } from "@/lib/utils";
import toast from "react-hot-toast";

function VetSection() {
  return (
    <section className="py-20 bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Veterinary Services</span>
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading">Meet Our Top Veterinarians</h2>
          </div>
          <Link to="/veterinarians" className="flex items-center gap-2 text-brand-orange hover:text-brand-orange-dark font-semibold text-sm group">
            View All Vets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVets.slice(0, 3).map((vet) => (
            <div key={vet.id} className="card-base p-5 hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="flex items-start gap-4 mb-4">
                <img src={vet.image} alt={vet.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading truncate">{vet.name}</h3>
                  <p className="text-light-muted dark:text-dark-muted text-sm truncate">{vet.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-light-text dark:text-dark-heading">{vet.rating}</span>
                    <span className="text-light-muted dark:text-dark-muted text-xs">({vet.reviews})</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0 ${vet.available ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {vet.available ? "Available" : "Busy"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vet.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{vet.experience} exp</span>
              </div>
              <div className="flex gap-2">
                <Link to="/veterinarians" className="flex-1 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl text-center transition-colors">
                  Book ${vet.fee}
                </Link>
                <Link to="/veterinarians" className="flex items-center gap-1.5 py-2 px-3 border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-body hover:border-brand-orange hover:text-brand-orange transition-colors">
                  <Video className="w-3.5 h-3.5" /> Tele
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketplaceSection() {
  const products = [
    { id: 1, name: "Royal Canin Adult", category: "Food", price: 45.99, rating: 4.8, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=300", badge: "Best Seller" },
    { id: 2, name: "Cat Tree Tower", category: "Accessories", price: 89.99, rating: 4.6, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=300", badge: "20% Off" },
    { id: 3, name: "Interactive Dog Toy", category: "Toys", price: 24.99, rating: 4.7, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 4, name: "Wireless Pet Camera", category: "Technology", price: 79.99, rating: 4.9, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=300", badge: "Top Rated" },
  ];
  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Marketplace</span>
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading">Premium Pet Products</h2>
          </div>
          <Link to="/marketplace" className="flex items-center gap-2 text-brand-orange hover:text-brand-orange-dark font-semibold text-sm group">
            Shop All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link key={p.id} to="/marketplace" className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.badge && <span className="absolute top-2 left-2 bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded-lg">{p.badge}</span>}
              </div>
              <div className="p-4">
                <p className="text-xs text-light-muted dark:text-dark-muted mb-1">{p.category}</p>
                <h3 className="font-semibold text-sm text-light-text dark:text-dark-heading mb-2 line-clamp-1">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-bold text-brand-orange">${p.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-light-muted dark:text-dark-muted">{p.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdoptionSection() {
  const adoptStats = [
    { label: "Dogs", value: "1,284", icon: Dog },
    { label: "Cats", value: "967", icon: Cat },
    { label: "Others", value: "342", icon: Bird },
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-pink-900/10 dark:via-dark-bg dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Pet Adoption</span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">Find Your Perfect Companion</h2>
            <p className="text-light-muted dark:text-dark-muted mb-8 leading-relaxed">
              Thousands of loving pets are waiting for their forever home. Browse our network of 200+ registered shelters.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {adoptStats.map(s => (
                <div key={s.label} className="card-base p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto mb-2">
                    <s.icon className="w-5 h-5 text-pink-500" />
                  </div>
                  <p className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading">{s.value}</p>
                  <p className="text-light-muted dark:text-dark-muted text-xs">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/adoption" className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-2xl transition-all">
              Find Adoptable Pets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockAdoptionPets.slice(0, 4).map((pet) => (
              <Link key={pet.id} to="/adoption" className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group">
                <div className="aspect-square overflow-hidden">
                  <img src={pet.image} alt={pet.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-light-text dark:text-dark-heading">{pet.name}</h3>
                  <p className="text-light-muted dark:text-dark-muted text-xs">{pet.breed} · {pet.age}</p>
                  <span className="inline-block mt-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg">
                    {pet.status === "available" ? "Available" : "Pending"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GroomingSection() {
  const services = [
    { icon: Scissors, label: "Full Groom Package" },
    { icon: Heart, label: "Express Bath" },
    { icon: PawPrint, label: "Nail Trim & Filing" },
    { icon: Stethoscope, label: "Aromatherapy Spa" },
    { icon: Cat, label: "Cat Spa Treatment" },
    { icon: Dog, label: "De-shedding" },
  ];
  return (
    <section className="py-20 bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src="/src/assets/grooming-hero.jpg" alt="Grooming" loading="lazy" className="w-full rounded-3xl shadow-xl aspect-video object-cover" />
          <div>
            <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Pet Grooming</span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">Professional Grooming at Your Convenience</h2>
            <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">Book certified groomers for salon or home visits. Full grooming packages, express baths, spa treatments and more.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {services.map(s => (
                <div key={s.label} className="flex items-center gap-2 text-sm text-light-text dark:text-dark-body">
                  <s.icon className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  {s.label}
                </div>
              ))}
            </div>
            <Link to="/grooming" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-2xl transition-all">
              Book Grooming <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrainingSection() {
  const programs = [
    { icon: GraduationCap, label: "Basic Obedience" },
    { icon: PawPrint, label: "Agility Training" },
    { icon: Dog, label: "Puppy Classes" },
    { icon: Bot, label: "Behavior Correction" },
    { icon: Video, label: "Virtual Sessions" },
    { icon: ArrowRight, label: "Progress Tracking" },
  ];
  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Pet Training</span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">Transform Your Pet's Behavior</h2>
            <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">Join programs led by 150+ certified professional trainers. Puppy classes, obedience, agility, behavior correction and more.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {programs.map(s => (
                <div key={s.label} className="flex items-center gap-2 text-sm text-light-text dark:text-dark-body">
                  <s.icon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  {s.label}
                </div>
              ))}
            </div>
            <Link to="/training" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl transition-all">
              Browse Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <img src="/src/assets/training-hero.jpg" alt="Training" loading="lazy" className="w-full rounded-3xl shadow-xl aspect-video object-cover" />
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="py-20 bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">Community</span>
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading">Join Our Pet Lover Community</h2>
          </div>
          <Link to="/community" className="flex items-center gap-2 text-brand-orange hover:text-brand-orange-dark font-semibold text-sm group">
            View Community <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCommunityPosts.slice(0, 2).map((post) => (
            <div key={post.id} className="card-base p-5 hover:shadow-card-hover transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{post.author}</p>
                  <p className="text-light-muted dark:text-dark-muted text-xs">{formatRelativeTime(post.createdAt)}</p>
                </div>
              </div>
              {post.image && <img src={post.image} alt="post" loading="lazy" className="w-full rounded-xl mb-4 aspect-video object-cover" />}
              <p className="text-sm text-light-text dark:text-dark-body leading-relaxed mb-3 line-clamp-3">{post.content}</p>
              <div className="flex gap-4 text-sm text-light-muted dark:text-dark-muted">
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {post.likes}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {post.comments}</span>
                <span className="flex items-center gap-1"><ArrowRight className="w-3.5 h-3.5" /> {post.shares}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileAppSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-orange/5 via-white to-brand-blue/5 dark:from-brand-orange/10 dark:via-dark-bg dark:to-brand-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Mobile App</span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">Manage Your Pet On The Go</h2>
            <p className="text-light-muted dark:text-dark-muted mb-8 leading-relaxed">The PetZoo app brings the full platform to your fingertips. iOS and Android — free to download.</p>
            <div className="space-y-3 mb-8">
              {[
                "Instant vet video consultations",
                "Real-time notifications & reminders",
                "Barcode scan for product safety",
                "QR code pet ID for emergencies",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-md bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-orange" />
                  </div>
                  <span className="text-sm text-light-text dark:text-dark-body">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => toast.info("iOS app coming soon!")}
                className="flex items-center gap-3 px-5 py-3 bg-light-text dark:bg-dark-heading text-white dark:text-dark-bg rounded-xl hover:opacity-90 transition-opacity">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                  <PawPrint className="w-3.5 h-3.5 text-white dark:text-dark-bg" />
                </div>
                <div className="text-left"><p className="text-xs opacity-70">Download on the</p><p className="font-semibold text-sm">App Store</p></div>
              </button>
              <button onClick={() => toast.info("Android app coming soon!")}
                className="flex items-center gap-3 px-5 py-3 bg-light-text dark:bg-dark-heading text-white dark:text-dark-bg rounded-xl hover:opacity-90 transition-opacity">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white dark:text-dark-bg" />
                </div>
                <div className="text-left"><p className="text-xs opacity-70">Get it on</p><p className="font-semibold text-sm">Google Play</p></div>
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="/src/assets/mobile-app.jpg" alt="PetZoo Mobile App" loading="lazy" className="max-w-xs w-full rounded-3xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <VetSection />
      <MarketplaceSection />
      <GroomingSection />
      <TrainingSection />
      <AdoptionSection />
      <AISection />
      <CommunitySection />
      <TestimonialsSection />
      <FAQHomeSection />
      <MobileAppSection />
      <MembershipSection />
      <CTASection />
    </div>
  );
}
