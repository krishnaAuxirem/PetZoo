import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/mockData";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Testimonials</span>
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-heading mb-4">
            Loved by Pet Families Worldwide
          </h2>
          <p className="text-light-muted dark:text-dark-muted">
            Real stories from real pet owners, vets, groomers and trainers who trust PetZoo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="card-base p-6 hover:shadow-card-hover transition-shadow group">
              <Quote className="w-8 h-8 text-brand-orange/30 mb-4 group-hover:text-brand-orange/50 transition-colors" />
              <p className="text-light-text dark:text-dark-body text-sm leading-relaxed mb-5">"{t.content}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-light-border dark:border-dark-border">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{t.name}</p>
                  <p className="text-light-muted dark:text-dark-muted text-xs">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
