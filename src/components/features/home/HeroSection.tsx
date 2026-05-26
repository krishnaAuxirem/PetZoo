import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, Star, Shield, Zap, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Images ─────────────────────────────────────────────────────────── */
const dogImages = [
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300",
  "/src/assets/pet-dog-1.jpg",
];
const catImages = [
  "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=300",
  "/src/assets/pet-cat-1.jpg",
];
const birdImages = [
  "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=300",
  "/src/assets/pet-bird-1.jpg",
  "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=300",
];
const rabbitImages = [
  "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=300",
  "/src/assets/pet-rabbit-1.jpg",
  "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=300",
];
const careImages = [
  "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300",
  "/src/assets/vet-hero.jpg",
  "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=300",
];

/* ─── Count-up hook ───────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

/* ─── Vertical slider ─────────────────────────────────────────────────── */
function VerticalSlider({ images, speed = 25, label, offset = 0 }: { images: string[]; speed?: number; label: string; offset?: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl flex-1" style={{ marginTop: offset }}>
      {/* Fade top/bottom */}
      <div className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none rounded-t-2xl"
        style={{ background: "linear-gradient(to bottom, #090B12 0%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none rounded-b-2xl"
        style={{ background: "linear-gradient(to top, #090B12 0%, transparent 100%)" }} />
      {/* Label */}
      <div className="absolute top-4 left-3 z-20">
        <span className="text-white text-[10px] font-semibold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/8">
          {label}
        </span>
      </div>
      {/* Images */}
      <div className="flex flex-col gap-2 px-1"
        style={{ animation: `scrollUp ${speed}s linear infinite` }}>
        {[...images, ...images, ...images].map((img, i) => (
          <div key={i} className="w-full aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0 group/img">
            <img
              src={img}
              alt={label}
              loading="lazy"
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated stat ───────────────────────────────────────────────────── */
function AnimStat({ value, label, suffix = "", prefix = "" }: { value: number; label: string; suffix?: string; prefix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span ref={ref} className="block font-poppins font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <p className="text-white/45 text-xs mt-0.5">{label}</p>
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg, #090B12 0%, #0D1117 50%, #07090F 100%)" }}>

      {/* ── Aurora background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary orange glow */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] animate-orb"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 65%)", filter: "blur(60px)" }} />
        {/* Secondary blue glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] animate-orb-delayed"
          style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.1) 0%, transparent 65%)", filter: "blur(60px)" }} />
        {/* Tertiary purple glow */}
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] animate-orb-slow"
          style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      </div>

      {/* ── Floating trust cards ── */}
      <div className="absolute top-28 left-6 xl:left-14 animate-float hidden lg:block" style={{ animationDelay: "0s" }}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
            <PawPrint className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">48K+ Pets Registered</p>
            <p className="text-white/45 text-xs">Across 150+ cities</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-6 xl:left-16 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-white/8"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <Shield className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-white text-xs font-semibold">1,247+ Verified Vets</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <p className="text-white/45 text-xs">340 online now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-6 xl:right-18 hidden xl:block animate-float" style={{ animationDelay: "1s" }}>
        <div className="px-4 py-3 rounded-2xl border border-white/8"
          style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <div className="flex items-center gap-1 mb-1.5">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            <span className="text-white text-xs font-bold ml-1">4.9</span>
          </div>
          <p className="text-white text-xs font-semibold">"Best pet platform ever!"</p>
          <p className="text-white/40 text-xs mt-0.5">— Jennifer W., Dog Mom</p>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] gap-8 xl:gap-16 items-center min-h-[78vh]">

          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/25 text-brand-orange text-xs font-semibold"
              style={{ background: "rgba(249,115,22,0.08)", backdropFilter: "blur(12px)" }}>
              <Zap className="w-3.5 h-3.5" />
              <span>AI-Powered Pet Care Platform</span>
              <span className="w-1 h-1 rounded-full bg-brand-orange" />
              <span className="text-white/40">Trusted by 48K+ families</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-poppins font-extrabold text-white leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}>
                Everything Your Pet{" "}
                <span className="shimmer-text">Deserves,</span>
                <br />
                All In One Place
              </h1>
              <p className="text-white/55 text-lg leading-relaxed mt-5 max-w-[540px]">
                Connect with top vets, book groomers, find trainers, adopt pets, shop premium products and join a vibrant community — all powered by AI for smarter, happier pet care.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 max-w-[500px]">
              {[
                "Book vet appointments in seconds",
                "AI symptom checker 24/7",
                "Premium pet marketplace",
                "Expert grooming & training",
                "Pet adoption network",
                "Pet health records & passport",
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register" className="btn-primary text-sm px-7 py-3.5 rounded-xl group">
                Start Free Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-glass text-sm px-7 py-3.5 rounded-xl">
                Learn More
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 pt-1">
              <div className="flex -space-x-2.5">
                {[11, 12, 13, 14, 15].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 overflow-hidden" style={{ borderColor: "#0D1117" }}>
                    <img src={`https://i.pravatar.cc/40?img=${i}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  <span className="text-white font-semibold text-xs ml-1">4.9/5</span>
                </div>
                <p className="text-white/45 text-xs">Loved by 48,000+ pet families</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 border-l border-white/8 pl-5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/45 text-xs">340 vets online now</span>
              </div>
            </div>
          </div>

          {/* Right: Vertical sliders */}
          <div className="hidden lg:flex gap-2 h-[560px] xl:h-[620px] overflow-hidden">
            <VerticalSlider images={dogImages} speed={22} label="Dogs" offset={0} />
            <VerticalSlider images={catImages} speed={30} label="Cats" offset={64} />
            <VerticalSlider images={birdImages} speed={18} label="Birds" offset={28} />
            <VerticalSlider images={rabbitImages} speed={25} label="Rabbits" offset={84} />
            <VerticalSlider images={careImages} speed={27} label="Vet Care" offset={44} />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-10 border-t border-white/6">
          <AnimStat value={48291} label="Pet Families" suffix="+" />
          <AnimStat value={1247} label="Verified Vets" suffix="+" />
          <AnimStat value={72841} label="Pets Registered" suffix="+" />
          <AnimStat value={3421} label="Adoptions Made" suffix="+" />
        </div>
      </div>
    </section>
  );
}
