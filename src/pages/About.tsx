import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Zap, Users, Award, Globe } from "lucide-react";

const team = [
  { name: "James Carter", role: "CEO & Co-Founder", img: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Sofia Williams", role: "CTO & Co-Founder", img: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Dr. Marcus Lee", role: "Chief Veterinary Officer", img: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Emily Zhang", role: "Head of Product", img: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200" },
];

const values = [
  { icon: Heart, title: "Pet-First", desc: "Every decision starts with what's best for pets and their families.", color: "text-pink-500" },
  { icon: Shield, title: "Trust & Safety", desc: "All vets, groomers and trainers are verified. Data is encrypted and secure.", color: "text-blue-500" },
  { icon: Zap, title: "Innovation", desc: "We use cutting-edge AI to make pet care smarter and more accessible.", color: "text-amber-500" },
  { icon: Users, title: "Community", desc: "We believe pet owners are stronger together. Community is at our core.", color: "text-green-500" },
  { icon: Award, title: "Excellence", desc: "We only partner with the best vets, groomers and trainers in the industry.", color: "text-purple-500" },
  { icon: Globe, title: "Accessibility", desc: "Pet care should be accessible to everyone, everywhere.", color: "text-teal-500" },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">About PetZoo</span>
          <h1 className="font-poppins text-4xl sm:text-5xl font-extrabold text-white mb-6">
            We're on a Mission to Transform Pet Care
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Founded in 2022, PetZoo was born from a simple idea: every pet deserves the best possible care, and every pet owner deserves the tools to provide it.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-2xl transition-all shadow-orange group">
            Join Our Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{v:"2022", l:"Founded"}, {v:"48K+", l:"Pet Families"}, {v:"150+", l:"Cities"}, {v:"$12M+", l:"Funding Raised"}].map(s => (
            <div key={s.l}>
              <p className="font-poppins font-extrabold text-4xl text-brand-orange mb-1">{s.v}</p>
              <p className="text-light-muted dark:text-dark-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg" id="mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Our Mission</span>
              <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-4">
                Connecting Pet Families with the Best Care
              </h2>
              <p className="text-light-muted dark:text-dark-muted mb-4 leading-relaxed">
                We're building the world's most comprehensive pet care ecosystem — connecting pet owners, veterinarians, groomers, trainers, vendors, and shelters through a single, intelligent platform.
              </p>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed">
                Our AI-powered tools help pet owners make smarter decisions, prevent health issues before they arise, and provide the best quality of life for their beloved companions.
              </p>
            </div>
            <img src="/src/assets/vet-hero.jpg" alt="Our Mission" className="rounded-3xl shadow-xl w-full object-cover max-h-80" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-3">Our Core Values</h2>
            <p className="text-light-muted dark:text-dark-muted">The principles that guide every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-base p-6 hover:shadow-card-hover transition-shadow">
                <v.icon className={`w-8 h-8 ${v.color} mb-4`} />
                <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-2">{v.title}</h3>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-3">Leadership Team</h2>
            <p className="text-light-muted dark:text-dark-muted">Passionate people building the future of pet care.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name} className="card-base p-6 text-center hover:shadow-card-hover transition-shadow">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4" />
                <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{t.name}</h3>
                <p className="text-light-muted dark:text-dark-muted text-sm mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange to-orange-400">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins text-3xl font-bold text-white mb-4">Join the PetZoo Family</h2>
          <p className="text-white/80 mb-8">Be part of the revolution in pet care. Start your free account today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-orange font-bold rounded-2xl hover:bg-white/90 transition-all">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
