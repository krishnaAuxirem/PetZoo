import { useState } from "react";
import { Calendar, Clock, Search, Plus, Edit2, Trash2, Phone, Mail, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockBookings = [
  { id: "b1", client: "Sarah Johnson", clientAvatar: "https://i.pravatar.cc/40?img=1", pet: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", service: "Full Grooming Package", date: "2024-12-28", time: "10:00 AM", duration: "2-3 hours", price: 65, status: "upcoming", notes: "Extra brush treatment" },
  { id: "b2", client: "Emma Roberts", clientAvatar: "https://i.pravatar.cc/40?img=2", pet: "Bella", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=60", service: "De-shedding Treatment", date: "2024-12-28", time: "12:30 PM", duration: "1.5 hours", price: 45, status: "upcoming", notes: "" },
  { id: "b3", client: "David Kim", clientAvatar: "https://i.pravatar.cc/40?img=3", pet: "Luna", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=60", service: "Cat Spa Treatment", date: "2024-12-28", time: "2:30 PM", duration: "1.5-2 hours", price: 55, status: "upcoming", notes: "Sensitive to water" },
  { id: "b4", client: "Alex Thompson", clientAvatar: "https://i.pravatar.cc/40?img=4", pet: "Rex", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=60", service: "Full Grooming Package", date: "2024-12-27", time: "10:00 AM", duration: "2-3 hours", price: 65, status: "completed", notes: "" },
  { id: "b5", client: "Amanda Foster", clientAvatar: "https://i.pravatar.cc/40?img=5", pet: "Buddy", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", service: "Nail Trim & Filing", date: "2024-12-27", time: "3:00 PM", duration: "20 min", price: 20, status: "completed", notes: "" },
  { id: "b6", client: "Kevin Park", clientAvatar: "https://i.pravatar.cc/40?img=6", pet: "Mochi", petImage: "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=60", service: "Express Bath & Brush", date: "2024-12-26", time: "11:00 AM", duration: "1 hour", price: 35, status: "cancelled", notes: "" },
  { id: "b7", client: "Lisa Chen", clientAvatar: "https://i.pravatar.cc/40?img=7", pet: "Fluffy", petImage: "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=60", service: "Pet Massage & Aromatherapy", date: "2024-12-29", time: "1:00 PM", duration: "45 min", price: 40, status: "upcoming", notes: "" },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  upcoming: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", dot: "bg-sky-400" },
  completed: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  cancelled: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400" },
};

export default function GroomerBookings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockBookings.filter(b => {
    const matchSearch = b.client.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase()) || b.pet.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const todayRevenue = mockBookings.filter(b => b.date === "2024-12-28").reduce((s, b) => s + b.price, 0);
  const completedRevenue = mockBookings.filter(b => b.status === "completed").reduce((s, b) => s + b.price, 0);

  return (
    <DashboardLayout title="Bookings">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today's Bookings", value: mockBookings.filter(b => b.date === "2024-12-28").length, color: "from-purple-500 to-purple-600" },
          { label: "Today's Revenue", value: `$${todayRevenue}`, color: "from-brand-orange to-orange-600" },
          { label: "This Week Completed", value: mockBookings.filter(b => b.status === "completed").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Cancellations", value: mockBookings.filter(b => b.status === "cancelled").length, color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Timeline */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 mb-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Today — December 28</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockBookings.filter(b => b.date === "2024-12-28").map(b => (
            <div key={b.id} className="flex-shrink-0 w-52 p-4 rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-purple-50/50 dark:bg-purple-500/5">
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{b.time}</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <img src={b.petImage} alt={b.pet} className="w-8 h-8 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{b.pet}</p>
                  <p className="text-xs text-slate-400">{b.client}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{b.service}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{b.duration}</span>
                <span className="font-bold text-sm text-brand-orange">${b.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">All Bookings ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> New Booking
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {filtered.map(b => {
            const sc = statusConfig[b.status];
            return (
              <div key={b.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="relative">
                    <img src={b.petImage} alt={b.pet} className="w-12 h-12 rounded-2xl object-cover" />
                    <img src={b.clientAvatar} alt={b.client} className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg border-2 border-white dark:border-dark-card" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{b.pet}</p>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{b.client}</p>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", sc.color, sc.bg)}>{b.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{b.service}</p>
                  {b.notes && <p className="text-xs text-amber-500 dark:text-amber-400 mt-0.5">Note: {b.notes}</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{b.date}</p>
                  <p className="text-xs text-slate-400">{b.time} · {b.duration}</p>
                  <p className="font-bold text-brand-orange">${b.price}</p>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">New Booking</h3>
            <div className="space-y-4">
              {[{ label: "Client Name", placeholder: "e.g. John Doe" }, { label: "Pet Name", placeholder: "e.g. Buddy" }, { label: "Date", type: "date" }, { label: "Time", placeholder: "e.g. 10:00 AM" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
                  <input type={f.type || "text"} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Service</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {["Full Grooming Package", "Cat Spa Treatment", "Express Bath & Brush", "Nail Trim & Filing", "De-shedding Treatment", "Pet Massage & Aromatherapy"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Book</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
