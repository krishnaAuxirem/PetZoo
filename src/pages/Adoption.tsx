import { useState } from "react";
import { Search, Heart, MapPin, CheckCircle, Dog, Cat, Bird, Rabbit, PawPrint } from "lucide-react";
import { mockAdoptionPets } from "@/lib/mockData";
import toast from "react-hot-toast";

const species = ["All", "Dog", "Cat", "Bird", "Rabbit", "Other"];
const ages = ["All Ages", "Puppy/Kitten", "Young", "Adult", "Senior"];

export default function Adoption() {
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appReason, setAppReason] = useState("");

  const filtered = mockAdoptionPets.filter(p =>
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase())) &&
    (selectedSpecies === "All" || p.species === selectedSpecies)
  );

  const handleApply = () => {
    if (!appName || !appEmail || !appReason) { toast.error("Please fill all fields"); return; }
    toast.success("Application submitted. The shelter will contact you within 2-3 business days.");
    setShowModal(null);
    setAppName(""); setAppEmail(""); setAppReason("");
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-pink-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/adoption-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-pink-500/20 text-pink-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Pet Adoption</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Give a Pet a Forever Home</h1>
          <p className="text-white/70 mb-8">Browse 2,500+ adoptable pets from 200+ verified shelters and rescue organizations nationwide.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or breed..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/40" />
          </div>
        </div>
      </section>

      {/* Species Filter */}
      <div className="bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {species.map(s => (
            <button key={s} onClick={() => setSelectedSpecies(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSpecies === s ? "bg-pink-500 text-white" : "bg-light-hover dark:bg-dark-hover text-light-muted dark:text-dark-muted hover:text-pink-500"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-light-muted dark:text-dark-muted text-sm mb-6"><strong className="text-light-text dark:text-dark-heading">{filtered.length}</strong> pets available for adoption</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pet) => (
            <div key={pet.id} className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={pet.image} alt={pet.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pet.status === "available" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>
                    {pet.status === "available" ? "Available" : "Pending"}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading">{pet.name}</h3>
                    <p className="text-light-muted dark:text-dark-muted text-sm">{pet.breed} · {pet.age} · {pet.gender}</p>
                  </div>
                  <span className="text-xl flex-shrink-0">
                  {pet.species === "Dog" ? <Dog className="w-5 h-5 text-amber-500" /> : pet.species === "Cat" ? <Cat className="w-5 h-5 text-purple-500" /> : pet.species === "Bird" ? <Bird className="w-5 h-5 text-sky-500" /> : pet.species === "Rabbit" ? <Rabbit className="w-5 h-5 text-pink-500" /> : <PawPrint className="w-5 h-5 text-brand-orange" />}
                </span>
                </div>
                <p className="text-light-muted dark:text-dark-muted text-sm mb-3 line-clamp-2">{pet.description}</p>
                <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted mb-3">
                  <MapPin className="w-3 h-3" /> {pet.shelter}, {pet.location}
                </div>
                <div className="flex gap-3 mb-4">
                  {pet.vaccinated && <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400"><CheckCircle className="w-3 h-3" /> Vaccinated</span>}
                  {pet.neutered && <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400"><CheckCircle className="w-3 h-3" /> Neutered</span>}
                </div>
                <button onClick={() => pet.status === "available" && setShowModal(pet.id)}
                  disabled={pet.status !== "available"}
                  className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" /> {pet.status === "available" ? "Apply to Adopt" : "Application Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-1">Adoption Application</h3>
            <p className="text-light-muted dark:text-dark-muted text-sm mb-5">Tell us about yourself and why you'd be a great pet parent.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Full Name</label>
                <input value={appName} onChange={e => setAppName(e.target.value)} placeholder="Your full name"
                  className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email Address</label>
                <input type="email" value={appEmail} onChange={e => setAppEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Why do you want to adopt?</label>
                <textarea value={appReason} onChange={e => setAppReason(e.target.value)} rows={3} placeholder="Tell us about your home environment and experience with pets..."
                  className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-pink-500 resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Cancel</button>
                <button onClick={handleApply} className="flex-1 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors">Submit Application</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
