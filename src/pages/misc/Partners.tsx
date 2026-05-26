import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Heart, Globe, Briefcase, Award, ArrowRight, CheckCircle, Building2, Handshake, Star, MapPin, Mail } from "lucide-react";

const partnerTypes = [
  { icon: Building2, title: "Veterinary Clinics", desc: "Join 1,200+ verified vet clinics and expand your patient reach by 10x.", count: "1,200+", color: "text-sky-500", bg: "bg-sky-100 dark:bg-sky-900/20" },
  { icon: Users, title: "Grooming Salons", desc: "List your services and connect with thousands of pet owners nearby.", count: "890+", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/20" },
  { icon: Award, title: "Pet Trainers", desc: "Reach more students with our global trainer marketplace.", count: "630+", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/20" },
  { icon: Globe, title: "Pet Vendors", desc: "Sell to 48,000+ pet families through our marketplace.", count: "1,890+", color: "text-brand-orange", bg: "bg-brand-orange/10" },
  { icon: Heart, title: "Shelters & Rescues", desc: "Increase adoption rates with our dedicated rescue platform.", count: "200+", color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/20" },
  { icon: Briefcase, title: "Corporate Partners", desc: "White-label solutions, API access, and co-marketing opportunities.", count: "50+", color: "text-brand-green", bg: "bg-brand-green/10" },
];

const benefits = [
  "Access to 48,000+ verified pet families",
  "Advanced analytics and business insights",
  "Integrated payment processing",
  "Dedicated account manager support",
  "Custom branding options",
  "Priority listing in search results",
  "Marketing and promotional support",
  "API access for integration",
];

const featuredPartners = [
  { name: "Royal Canin", type: "Pet Food Brand", logo: "RC", color: "bg-blue-600", location: "Global" },
  { name: "VetCare Plus", type: "Veterinary Chain", logo: "VC", color: "bg-sky-500", location: "USA & Canada" },
  { name: "PetHome Accessories", type: "Product Vendor", logo: "PH", color: "bg-purple-600", location: "North America" },
  { name: "Seresto Health", type: "Healthcare Brand", logo: "SH", color: "bg-green-600", location: "Global" },
  { name: "Happy Tails Shelter", type: "Animal Rescue", logo: "HT", color: "bg-pink-600", location: "New York, NY" },
  { name: "Furbo Tech", type: "Pet Technology", logo: "FT", color: "bg-amber-600", location: "Global" },
];

export default function Partners() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formType) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Partner Program</span>
          <h1 className="font-poppins text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Grow Your Pet Business with PetZoo
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join 4,800+ businesses already using PetZoo to reach more customers, streamline operations, and grow their revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-2xl transition-all shadow-orange group">
              Become a Partner <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#types" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all border border-white/20">
              Learn More
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[{v:"4,800+", l:"Active Partners"}, {v:"$12M+", l:"Partner Revenue"}, {v:"48K+", l:"Shared Customers"}].map(s => (
              <div key={s.l}>
                <p className="font-poppins font-extrabold text-3xl text-brand-orange">{s.v}</p>
                <p className="text-white/60 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg" id="types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-3">Who Can Partner With PetZoo?</h2>
            <p className="text-light-muted dark:text-dark-muted">We welcome all types of pet industry businesses.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map(p => (
              <div key={p.title} className="card-base p-6 hover:shadow-card-hover transition-all hover:-translate-y-1 group">
                <div className={`w-12 h-12 ${p.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <p.icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{p.title}</h3>
                  <span className={`text-xs font-bold ${p.color}`}>{p.count}</span>
                </div>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Partner Benefits</span>
              <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-6">Everything You Need to Scale</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map(b => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-light-text dark:text-dark-body">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Featured Partners */}
            <div>
              <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Trusted by Leading Brands</h3>
              <div className="grid grid-cols-2 gap-3">
                {featuredPartners.map(p => (
                  <div key={p.name} className="card-base p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {p.logo}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-light-text dark:text-dark-heading truncate">{p.name}</p>
                      <p className="text-xs text-light-muted dark:text-dark-muted truncate">{p.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg" id="apply">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-3">Apply to Become a Partner</h2>
            <p className="text-light-muted dark:text-dark-muted">Fill out the form and our team will get in touch within 48 hours.</p>
          </div>
          {submitted ? (
            <div className="card-base p-10 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-2">Application Received!</h3>
              <p className="text-light-muted dark:text-dark-muted">Thank you {formName}! Our team will review your application and contact you at {formEmail} within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-base p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Full Name *</label>
                  <input value={formName} onChange={e => setFormName(e.target.value)} required placeholder="Your name" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email *</label>
                  <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} required placeholder="business@email.com" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Business Name</label>
                <input placeholder="Your business or organization name" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Partner Type *</label>
                <select value={formType} onChange={e => setFormType(e.target.value)} required className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
                  <option value="">Select type...</option>
                  {["Veterinary Clinic", "Grooming Salon", "Pet Trainer", "Pet Vendor/Brand", "Animal Shelter", "Corporate/Enterprise"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Tell us about your business</label>
                <textarea rows={3} placeholder="Brief description of your business and how you'd like to partner..." className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange resize-none" />
              </div>
              <button type="submit" className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Handshake className="w-4 h-4" /> Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange to-orange-400">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins text-3xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-white/80 mb-8">Our partnership team is ready to help you get started.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-orange font-bold rounded-2xl hover:bg-white/90 transition-all">
              <Mail className="w-4 h-4" /> Contact Us
            </Link>
            <a href="mailto:partners@petzoo.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all border border-white/30">
              partners@petzoo.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
