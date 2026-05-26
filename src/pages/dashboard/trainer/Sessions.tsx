import { useState } from "react";
import { Calendar, Search, Plus, Edit2, Trash2, Clock, BookOpen, Users, Star } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockSessions = [
  { id: "s1", program: "Basic Obedience Bootcamp", client: "Sarah Johnson", clientAvatar: "https://i.pravatar.cc/40?img=1", pet: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", date: "2024-12-28", time: "10:00 AM", duration: "60 min", session: 5, totalSessions: 8, location: "Park", status: "upcoming", progress: 62 },
  { id: "s2", program: "Puppy Socialization Class", client: "Emma Roberts", clientAvatar: "https://i.pravatar.cc/40?img=2", pet: "Charlie", petImage: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=60", date: "2024-12-28", time: "2:00 PM", duration: "45 min", session: 3, totalSessions: 6, location: "Training Center", status: "upcoming", progress: 50 },
  { id: "s3", program: "Behavior Correction Program", client: "David Kim", clientAvatar: "https://i.pravatar.cc/40?img=3", pet: "Luna", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=60", date: "2024-12-27", time: "11:00 AM", duration: "90 min", session: 8, totalSessions: 12, location: "Home Visit", status: "completed", progress: 67 },
  { id: "s4", program: "Advanced Agility Training", client: "Alex Thompson", clientAvatar: "https://i.pravatar.cc/40?img=4", pet: "Rex", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=60", date: "2024-12-30", time: "9:00 AM", duration: "120 min", session: 4, totalSessions: 16, location: "Agility Course", status: "upcoming", progress: 25 },
  { id: "s5", program: "Basic Obedience Bootcamp", client: "Amanda Foster", clientAvatar: "https://i.pravatar.cc/40?img=5", pet: "Buddy", petImage: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=60", date: "2024-12-26", time: "3:00 PM", duration: "60 min", session: 8, totalSessions: 8, location: "Park", status: "completed", progress: 100 },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  upcoming: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", dot: "bg-sky-400" },
  completed: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  cancelled: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400" },
};

const progressColor = (p: number) => p === 100 ? "bg-emerald-500" : p >= 50 ? "bg-brand-orange" : "bg-sky-500";

export default function TrainerSessions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockSessions.filter(s => {
    const matchSearch = s.client.toLowerCase().includes(search.toLowerCase()) || s.program.toLowerCase().includes(search.toLowerCase()) || s.pet.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const today = mockSessions.filter(s => s.date === "2024-12-28");

  return (
    <DashboardLayout title="Training Sessions">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today's Sessions", value: today.length, color: "from-amber-500 to-amber-600" },
          { label: "Upcoming", value: mockSessions.filter(s => s.status === "upcoming").length, color: "from-sky-500 to-sky-600" },
          { label: "Completed", value: mockSessions.filter(s => s.status === "completed").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Active Clients", value: [...new Set(mockSessions.map(s => s.client))].length, color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Today's schedule */}
      {today.length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 mb-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Today's Schedule</h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {today.map(s => (
              <div key={s.id} className="flex-shrink-0 w-60 p-4 rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{s.time}</span>
                  <span className="text-xs text-slate-400">· {s.duration}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <img src={s.petImage} alt={s.pet} className="w-8 h-8 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.pet}</p>
                    <p className="text-xs text-slate-400">{s.client}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{s.program}</p>
                <p className="text-xs text-slate-400 mt-0.5">Session {s.session}/{s.totalSessions}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">All Sessions ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sessions..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Book Session
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {filtered.map(s => {
            const sc = statusConfig[s.status];
            return (
              <div key={s.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                <img src={s.petImage} alt={s.pet} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{s.pet}</p>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{s.client}</p>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", sc.color, sc.bg)}>{s.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{s.program}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 max-w-[120px]">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-slate-400">Session {s.session}/{s.totalSessions}</span>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{s.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-white/8 rounded-full h-1.5">
                        <div className={cn("h-1.5 rounded-full", progressColor(s.progress))} style={{ width: `${s.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.date}</p>
                  <p className="text-xs text-slate-400">{s.time} · {s.duration}</p>
                  <p className="text-xs text-slate-400">{s.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
