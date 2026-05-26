import { useState } from "react";
import { Calendar, Clock, PawPrint, User, Plus, Search, CheckCircle, XCircle, Video } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockAppts = [
  { id: "a1", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Sarah Johnson", ownerAvatar: "https://i.pravatar.cc/40?img=1", type: "checkup", date: "2024-12-28", time: "10:00 AM", status: "scheduled", fee: 85, notes: "Annual checkup" },
  { id: "a2", petName: "Luna", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "David Kim", ownerAvatar: "https://i.pravatar.cc/40?img=2", type: "vaccination", date: "2024-12-28", time: "11:30 AM", status: "completed", fee: 65, notes: "Rabies booster" },
  { id: "a3", petName: "Charlie", petImage: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Emma Roberts", ownerAvatar: "https://i.pravatar.cc/40?img=3", type: "consultation", date: "2024-12-29", time: "2:00 PM", status: "scheduled", fee: 95, notes: "Skin irritation" },
  { id: "a4", petName: "Rex", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Alex Thompson", ownerAvatar: "https://i.pravatar.cc/40?img=4", type: "telemedicine", date: "2025-01-02", time: "3:30 PM", status: "pending", fee: 45, notes: "Follow-up check" },
  { id: "a5", petName: "Buddy", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Amanda Foster", ownerAvatar: "https://i.pravatar.cc/40?img=5", type: "surgery", date: "2025-01-05", time: "9:00 AM", status: "scheduled", fee: 450, notes: "ACL repair" },
  { id: "a6", petName: "Mittens", petImage: "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Kevin Park", ownerAvatar: "https://i.pravatar.cc/40?img=6", type: "checkup", date: "2024-12-27", time: "4:00 PM", status: "cancelled", fee: 85, notes: "" },
];

const typeColors: Record<string, string> = {
  checkup: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  vaccination: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  consultation: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
  telemedicine: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  surgery: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
};
const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  scheduled: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", dot: "bg-sky-400" },
  completed: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  pending: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", dot: "bg-amber-400" },
  cancelled: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400" },
};

export default function VetAppointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockAppts.filter(a => {
    const matchSearch = a.petName.toLowerCase().includes(search.toLowerCase()) || a.owner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const todayAppts = mockAppts.filter(a => a.date === "2024-12-28");
  const revenue = mockAppts.filter(a => a.status === "completed").reduce((s, a) => s + a.fee, 0);

  return (
    <DashboardLayout title="Appointments">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today's Appointments", value: todayAppts.length, color: "from-sky-500 to-sky-600" },
          { label: "Upcoming", value: mockAppts.filter(a => a.status === "scheduled").length, color: "from-violet-500 to-violet-600" },
          { label: "Completed Today", value: mockAppts.filter(a => a.status === "completed").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Revenue Today", value: `$${revenue}`, color: "from-brand-orange to-orange-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Today's timeline */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 mb-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Today's Schedule</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {todayAppts.map(a => {
            const sc = statusConfig[a.status];
            return (
              <div key={a.id} className={cn("flex-shrink-0 w-52 p-4 rounded-2xl border", a.status === "scheduled" ? "border-sky-200 dark:border-sky-500/20 bg-sky-50/50 dark:bg-sky-500/5" : a.status === "completed" ? "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5" : "border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/2")}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{a.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <img src={a.petImage} alt={a.petName} className="w-8 h-8 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.petName}</p>
                    <p className="text-xs text-slate-400">{a.owner}</p>
                  </div>
                </div>
                <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize", typeColors[a.type])}>{a.type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">All Appointments ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-700 dark:text-slate-300 outline-none">
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> New Appointment
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {filtered.map(a => {
            const sc = statusConfig[a.status];
            return (
              <div key={a.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                <img src={a.petImage} alt={a.petName} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{a.petName}</p>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize", typeColors[a.type])}>{a.type}</span>
                    {a.type === "telemedicine" && <Video className="w-3 h-3 text-sky-400" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.owner} · {a.date} at {a.time}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={cn("hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />{a.status}
                  </span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">${a.fee}</span>
                  {a.status === "scheduled" && (
                    <button className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-xl hover:bg-emerald-600 transition-colors">Start</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">New Appointment</h3>
            <div className="space-y-4">
              {[{ label: "Pet Name", placeholder: "e.g. Max" }, { label: "Owner Name", placeholder: "e.g. John Doe" }, { label: "Date", type: "date" }, { label: "Time", placeholder: "e.g. 10:00 AM" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
                  <input type={f.type || "text"} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {Object.keys(typeColors).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
