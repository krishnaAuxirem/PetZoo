import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, Star, Shield, Zap, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Image sets (pexels) ──────────────────────────────────────────────── */
const dogImages = [
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=280",
  "/src/assets/pet-dog-1.jpg",
];

const catImages = [
  "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=280",
  "/src/assets/pet-cat-1.jpg",
];

const birdImages = [
  "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=280",
  "/src/assets/pet-bird-1.jpg",
  "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=280",
];

const rabbitImages = [
  "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=280",
  "/src/assets/pet-rabbit-1.jpg",
  "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=280",
];

const careImages = [
  "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=280",
  "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=280",
  "/src/assets/vet-hero.jpg",
  "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=280",
];

/* ─── Slider labels mapping to icon text ─────────────────────────────── */
const sliderLabels: Record<string, string> = {
  "Dogs": "Dogs",
  "Cats": "Cats",
  "Birds": "Birds",
  "Rabbits": "Rabbits",
  "Care": "Vet Care",
};

/* ─── Count-up hook ────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─── Vertical auto-scroll slider ─────────────────────────────────────── */
function VerticalSlider({
  images,
  speed = 25,
  label,
  offset = 0,
}: {
  images: string[];
  speed?: number;
  label: string;
  offset?: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl flex-1"
      style={{ marginTop: offset }}
    >
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-900 to-transparent z-10 rounded-t-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent z-10 rounded-b-2xl" />
      <div className="absolute top-3 left-3 z-20">
        <span className="text-white text-[10px] font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
          {sliderLabels[label] || label}
        </span>
      </div>
      <div
        className="flex flex-col gap-2.5 px-1.5"
        style={{ animation: `scrollUp ${speed}s linear infinite` }}
      >
        {[...images, ...images, ...images].map((img, i) => (
          <div
            key={i}
            className="w-full aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0"
          >
            <img
              src={img}
              alt={label}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat badge ───────────────────────────────────────────────────────── */
function StatBadge({
  value,
  label,
  suffix = "",
  prefix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block text-2xl lg:text-3xl font-poppins font-extrabold text-white"
      >
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <p className="text-white/60 text-xs mt-0.5">{label}</p>
    </div>
  );
}

/* ─── Main hero ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex flex-col justify-center">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(249,115,22,0.12)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(14,165,233,0.10)_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating trust chips */}
      <div className="absolute top-24 left-6 xl:left-12 animate-float hidden lg:block" style={{ animationDelay: "0s" }}>
        <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
          <div className="w-8 h-8 bg-brand-orange rounded-xl flex items-center justify-center">
            <PawPrint className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">48K+ Pets Registered</p>
            <p className="text-white/50 text-xs">Across 150+ cities</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-36 left-6 xl:left-14 animate-float hidden lg:block" style={{ animationDelay: "1.8s" }}>
        <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-lg">
          <Shield className="w-5 h-5 text-brand-green" />
          <p className="text-white text-xs font-semibold">1,247+ Verified Vets Online</p>
        </div>
      </div>
      <div className="absolute top-1/3 right-6 xl:right-16 hidden xl:block animate-float" style={{ animationDelay: "0.9s" }}>
        <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 shadow-lg">
          <div className="flex items-center gap-1 mb-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white text-xs font-semibold ml-1">4.9</span>
          </div>
          <p className="text-white text-xs font-semibold">"Best pet platform ever!"</p>
          <p className="text-white/50 text-xs">— Jennifer W., Dog Mom</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-10 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 xl:gap-14 items-center min-h-[75vh]">

          {/* Left: Content */}
          <div className="space-y-7 lg:pr-4">
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/25 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-brand-orange text-xs font-semibold tracking-wide">
                AI-Powered Pet Care Platform
              </span>
            </div>

            <h1 className="font-poppins text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold text-white leading-[1.12] tracking-tight">
              Everything Your Pet{" "}
              <span className="bg-gradient-to-r from-brand-orange via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Deserves,
              </span>
              <br />
              All In One Place
            </h1>

            <p className="text-white/65 text-lg leading-relaxed max-w-[520px]">
              Connect with top veterinarians, book groomers, find trainers, adopt pets, shop premium products and join a vibrant community — all powered by AI for smarter, happier pet care.
            </p>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-2.5 max-w-[480px]">
              {[
                "Book vet appointments",
                "AI symptom checker",
                "Premium pet marketplace",
                "Expert grooming & training",
                "Pet adoption network",
                "24/7 pet care community",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-all shadow-orange hover:shadow-xl hover:-translate-y-0.5 group text-sm"
              >
                Start Free Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/14 border border-white/15 text-white font-semibold rounded-xl transition-all backdrop-blur-sm text-sm"
              >
                Learn More
              </Link>
            </div>

            {/* Social proof row */}
            <div className="flex items-center gap-5 pt-1">
              <div className="flex -space-x-2">
                {[11, 12, 13, 14, 15].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-white font-semibold text-xs ml-1">4.9/5</span>
                </div>
                <p className="text-white/55 text-xs">Loved by 48,000+ pet families</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-5">
                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                <span className="text-white/55 text-xs">340 vets online now</span>
              </div>
            </div>
          </div>

          {/* Right: Vertical sliders */}
          <div className="hidden lg:flex gap-2 h-[540px] xl:h-[600px] overflow-hidden">
            <VerticalSlider images={dogImages} speed={22} label="Dogs" offset={0} />
            <VerticalSlider images={catImages} speed={30} label="Cats" offset={60} />
            <VerticalSlider images={birdImages} speed={18} label="Birds" offset={28} />
            <VerticalSlider images={rabbitImages} speed={25} label="Rabbits" offset={80} />
            <VerticalSlider images={careImages} speed={27} label="Care" offset={44} />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-10 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-white/8">
          <StatBadge value={48291} label="Pet Families" suffix="+" />
          <StatBadge value={1247} label="Verified Vets" suffix="+" />
          <StatBadge value={72841} label="Pets Registered" suffix="+" />
          <StatBadge value={3421} label="Adoptions Made" suffix="+" />
        </div>
      </div>
    </section>
  );
}
