import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/mockData";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#090B12] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-orange/4 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/4 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label mb-5 inline-flex">Testimonials</span>
          <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Loved by Pet Families{" "}
            <span className="text-gradient-orange">Worldwide</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Real stories from real pet owners, vets, groomers and trainers who trust PetZoo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="group relative p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.04)" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "0 8px 32px rgba(249,115,22,0.08), inset 0 0 0 1px rgba(249,115,22,0.1)" }} />

              {/* Quote icon */}
              <div className="w-9 h-9 bg-orange-50 dark:bg-orange-500/8 rounded-xl flex items-center justify-center mb-4">
                <Quote className="w-4 h-4 text-brand-orange" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 relative">"{t.content}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-dark-card" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom social proof bar */}
        <div className="mt-14 p-6 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-dark-card text-center"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <p className="font-poppins font-bold text-3xl text-slate-900 dark:text-white">4.9/5</p>
              <div className="flex items-center justify-center gap-0.5 my-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Average Rating</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-white/8" />
            <div className="text-center">
              <p className="font-poppins font-bold text-3xl text-slate-900 dark:text-white">48K+</p>
              <div className="flex -space-x-2 justify-center my-1">
                {[11,12,13,14,15,16].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-dark-card overflow-hidden">
                    <img src={`https://i.pravatar.cc/32?img=${i}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Pet Families</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-white/8" />
            <div className="text-center">
              <p className="font-poppins font-bold text-3xl text-slate-900 dark:text-white">99%</p>
              <p className="text-emerald-500 text-sm font-semibold my-1">● Satisfaction Rate</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Would recommend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
