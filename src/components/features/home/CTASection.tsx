import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, Star, Shield, Zap, Sparkles, CheckCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #090B12 0%, #0D1117 50%, #090B12 100%)" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute top-0 left-0 w-[400px] h-[400px]"
          style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px]"
          style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 65%)", filter: "blur(60px)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-3xl flex items-center justify-center"
            style={{ boxShadow: "0 8px 32px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 -m-3 rounded-3xl border border-brand-orange/20 animate-pulse" />
          <div className="absolute inset-0 -m-6 rounded-3xl border border-brand-orange/10 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3 h-3" /> The #1 Pet Care Platform
        </span>

        <h2 className="font-poppins text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Give Your Pet the{" "}
          <span className="shimmer-text">Life They Deserve</span>
        </h2>
        <p className="text-white/60 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 48,000+ pet families on PetZoo. Everything you need, starting free today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/register" className="btn-primary text-base px-10 py-4 rounded-2xl group">
            Start Free Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/services" className="btn-glass text-base px-10 py-4 rounded-2xl">
            Explore Services
          </Link>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: Shield, text: "No credit card required", color: "text-emerald-400" },
            { icon: Zap, text: "Setup in 2 minutes", color: "text-brand-orange" },
            { icon: Star, text: "4.9★ from 48K+ families", color: "text-amber-400" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-white/50 text-sm">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
