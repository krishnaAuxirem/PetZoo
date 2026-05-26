import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, Star, Shield, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
      <div className="absolute top-10 left-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-orange">
          <PawPrint className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-poppins text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Give Your Pet the Life They Deserve
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Join 48,000+ pet families on PetZoo. Free to start. No credit card required. Cancel anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/register" className="flex items-center justify-center gap-2 px-10 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-2xl transition-all shadow-orange hover:shadow-xl hover:-translate-y-0.5 group text-lg">
            Start Free Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/services" className="flex items-center justify-center gap-2 px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl transition-all text-lg">
            Explore Services
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-brand-green" /><span>No credit card required</span></div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-brand-orange" /><span>Setup in under 2 minutes</span></div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span>4.9 rating from 48K+ families</span></div>
        </div>
      </div>
    </section>
  );
}
