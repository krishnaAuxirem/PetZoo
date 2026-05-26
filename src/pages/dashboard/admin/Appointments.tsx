import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, Calendar, PawPrint, Stethoscope, Clock, CheckCircle, XCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockAppointments = [
  { id: "a1", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Sarah Johnson", vet: "Dr. Sarah Johnson", type: "checkup", date: "2024-12-28", time: "10:00 AM", status: "scheduled", fee: 85 },
  { id: "a2", petName: "Luna", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "David Kim", vet: "Dr. Michael Chen", type: "vaccination", date: "2024-12-28", time: "11:30 AM", status: "completed", fee: 65 },
  { id: "a3", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Sarah Johnson", vet: "Dr. Sarah Johnson", type: "consultation", date: "2024-12-29", time: "2:00 PM", status: "scheduled", fee: 95 },
  { id: "a4", petName: "Charlie", petImage: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Emma Roberts", vet: "Dr. Emily Davis", type: "telemedicine", date: "2025-01-02", time: "3:30 PM", status: "pending", fee: 45 },
  { id: "a5", petName: "Rex", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Alex Thompson", vet: "Dr. James Wilson", type: "surgery", date: "2025-01-05", time: "9:00 AM", status: "scheduled", fee: 450 },
  { id: "a6", petName: "Buddy", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", owner: "Amanda Foster", vet: "Dr. Robert Brown", type: "checkup", date: "2024-12-27", time: "4:00 PM", status: "cancelled", fee: 85 },
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

export default function AdminAppointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockAppointments.filter(a => {
    const matchSearch = a.petName.toLowerCase().includes(search.toLowerCase()) || a.owner.toLowerCase().includes(search.toLowerCase()) || a.vet.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { scheduled: 0, completed: 0, pending: 0, cancelled: 0 };
  mockAppointments.forEach(a => { if (a.status in counts) (counts as any)[a.status]++; });

  return (
    <DashboardLayout title="Appointments Management">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Scheduled", count: counts.scheduled, color: "from-sky-500 to-sky-600" },
          { label: "Completed Today", count: counts.completed, color: "from-emerald-500 to-emerald-600" },
          { label: "Pending", count: counts.pending, color: "from-amber-500 to-amber-600" },
          { label: "Cancelled", count: counts.cancelled, color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.count}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">All Appointments ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search appointments..." className="w-full sm:w-52 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-700 dark:text-slate-300 outline-none">
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Pet & Owner", "Veterinarian", "Type", "Date & Time", "Status", "Fee", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const sc = statusConfig[a.status];
                return (
                  <tr key={a.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={a.petImage} alt={a.petName} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.petName}</p>
                          <p className="text-xs text-slate-400">{a.owner}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{a.vet}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold capitalize", typeColors[a.type])}>{a.type}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.date}</p>
                      <p className="text-xs text-slate-400">{a.time}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />{a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-brand-orange">${a.fee}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
