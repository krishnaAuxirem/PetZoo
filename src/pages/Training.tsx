import { Star, Clock, Users } from "lucide-react";
import { mockTrainingPrograms } from "@/lib/mockData";
import toast from "react-hot-toast";

export default function Training() {
  const levelColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-amber-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/training-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Expert Training</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Transform Your Pet's Behavior</h1>
          <p className="text-white/70 mb-8">Join programs designed by certified professional trainers. In-person and virtual sessions available.</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[{v:"150+", l:"Trainers"}, {v:"4,500+", l:"Graduates"}, {v:"4.9 / 5", l:"Avg Rating"}].map(s => (
              <div key={s.l} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                <p className="font-poppins font-bold text-xl text-white">{s.v}</p>
                <p className="text-white/60 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockTrainingPrograms.map((p) => (
            <div key={p.id} className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group flex flex-col sm:flex-row">
              <div className="sm:w-48 aspect-video sm:aspect-auto overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg capitalize ${levelColors[p.level]}`}>{p.level}</span>
                  <span className="font-poppins font-bold text-brand-orange">${p.price}</span>
                </div>
                <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-2">{p.name}</h3>
                <p className="text-light-muted dark:text-dark-muted text-xs mb-3 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{p.enrolled} enrolled</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{p.rating}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <img src={p.trainerImage} alt={p.trainer} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs text-light-muted dark:text-dark-muted">by {p.trainer}</span>
                </div>
                <button onClick={() => toast.success("Enrolled in " + p.name)}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
