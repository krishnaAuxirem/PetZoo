import { useState } from "react";
import { Dumbbell, Clock, BookOpen, Users, Star, CheckCircle, TrendingUp, Award } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const trainingPrograms = [
  { id: "t1", name: "Basic Obedience Bootcamp", trainer: "Jake Miller", trainerImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=80", level: "beginner", duration: "4 weeks", sessions: 8, price: 199, rating: 4.9, image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=300", enrolled: 234, description: "Master the fundamentals: sit, stay, come, heel and leash manners." },
  { id: "t2", name: "Advanced Agility Training", trainer: "Sofia Rodriguez", trainerImage: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=80", level: "advanced", duration: "8 weeks", sessions: 16, price: 449, rating: 4.8, image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300", enrolled: 87, description: "Competition-level agility training including jumps, weave poles, and tunnels." },
  { id: "t3", name: "Puppy Socialization Class", trainer: "Tom Bradley", trainerImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=80", level: "beginner", duration: "3 weeks", sessions: 6, price: 149, rating: 4.7, image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300", enrolled: 312, description: "Essential socialization for puppies 8-16 weeks." },
  { id: "t4", name: "Behavior Correction Program", trainer: "Jake Miller", trainerImage: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=80", level: "intermediate", duration: "6 weeks", sessions: 12, price: 349, rating: 4.8, image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=300", enrolled: 156, description: "Address challenging behaviors: barking, jumping, aggression." },
];

const myEnrolled = [
  { programId: "t1", pet: "Max", progress: 62, sessionsCompleted: 5, totalSessions: 8, nextSession: "2024-12-28", status: "active" },
];

const levelColors: Record<string, string> = {
  beginner: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  intermediate: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function OwnerTraining() {
  const [tab, setTab] = useState<"browse" | "enrolled">("browse");
  const [enrolled, setEnrolled] = useState<string[]>(myEnrolled.map(e => e.programId));
  const [toast, setToast] = useState<string | null>(null);

  const handleEnroll = (id: string, name: string) => {
    setEnrolled(prev => [...prev, id]);
    setToast(`Enrolled in ${name}!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <DashboardLayout title="Training">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Enrolled Programs", value: enrolled.length, color: "from-amber-500 to-amber-600" },
          { label: "Sessions Completed", value: myEnrolled.reduce((s, e) => s + e.sessionsCompleted, 0), color: "from-emerald-500 to-emerald-600" },
          { label: "Skills Mastered", value: "12", color: "from-sky-500 to-sky-600" },
          { label: "Avg Progress", value: `${myEnrolled.length > 0 ? Math.round(myEnrolled.reduce((s, e) => s + e.progress, 0) / myEnrolled.length) : 0}%`, color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {[{ key: "browse", label: "Browse Programs" }, { key: "enrolled", label: "My Programs" }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all", tab === t.key ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 hover:border-brand-orange/50")} style={{ boxShadow: tab !== t.key ? "0 1px 3px rgba(0,0,0,0.04)" : "0 4px 12px rgba(249,115,22,0.3)" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingPrograms.map(prog => (
            <div key={prog.id} className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 overflow-hidden group hover:-translate-y-0.5 transition-all duration-300" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex">
                <img src={prog.image} alt={prog.name} className="w-36 object-cover group-hover:scale-105 transition-transform duration-500 flex-shrink-0" />
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-poppins font-bold text-slate-900 dark:text-white text-sm">{prog.name}</h4>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold flex-shrink-0", levelColors[prog.level])}>{prog.level}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">{prog.description}</p>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><Clock className="w-3 h-3" />{prog.duration}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><BookOpen className="w-3 h-3" />{prog.sessions} sessions</span>
                    <span className="flex items-center gap-1 text-xs text-amber-500"><Star className="w-3 h-3 fill-amber-400" />{prog.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-bold text-brand-orange">${prog.price}</span>
                    <button onClick={() => handleEnroll(prog.id, prog.name)} disabled={enrolled.includes(prog.id)}
                      className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all", enrolled.includes(prog.id) ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-brand-orange text-white hover:bg-orange-600")}>
                      {enrolled.includes(prog.id) ? <><CheckCircle className="w-3.5 h-3.5" />Enrolled</> : "Enroll"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "enrolled" && (
        <div className="space-y-4">
          {myEnrolled.map(e => {
            const prog = trainingPrograms.find(p => p.id === e.programId);
            if (!prog) return null;
            return (
              <div key={e.programId} className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start gap-4">
                  <img src={prog.image} alt={prog.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-poppins font-bold text-slate-900 dark:text-white mb-1">{prog.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{e.pet} · Trainer: {prog.trainer}</p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Progress ({e.sessionsCompleted}/{e.totalSessions} sessions)</span>
                        <span className="text-xs font-bold text-brand-orange">{e.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-white/8 rounded-full h-2">
                        <div className="bg-gradient-to-r from-brand-orange to-amber-400 h-2 rounded-full transition-all" style={{ width: `${e.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Next session: {e.nextSession}</span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {myEnrolled.length === 0 && (
            <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-12 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <Dumbbell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-slate-900 dark:text-white mb-2">No Programs Yet</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Browse and enroll in a training program to get started.</p>
              <button onClick={() => setTab("browse")} className="px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl">Browse Programs</button>
            </div>
          )}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 px-4 py-3 rounded-2xl bg-slate-900 text-white text-sm font-semibold" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)", zIndex: 100 }}>
          ✓ {toast}
        </div>
      )}
    </DashboardLayout>
  );
}
