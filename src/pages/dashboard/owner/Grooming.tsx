import { useState } from "react";
import { Calendar, Scissors, Clock, Plus, Search, Star, MapPin, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const groomingServices = [
  { id: "s1", name: "Full Grooming Package", price: 65, duration: "2-3 hours", category: "Dog", rating: 4.9, image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { id: "s2", name: "Cat Spa Treatment", price: 55, duration: "1.5-2 hours", category: "Cat", rating: 4.8, image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { id: "s3", name: "Express Bath & Brush", price: 35, duration: "1 hour", category: "Dog", rating: 4.7, image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { id: "s4", name: "Nail Trim & Filing", price: 20, duration: "20 min", category: "All", rating: 4.6, image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { id: "s5", name: "De-shedding Treatment", price: 45, duration: "1.5 hours", category: "Dog", rating: 4.8, image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { id: "s6", name: "Pet Massage & Aromatherapy", price: 40, duration: "45 min", category: "All", rating: 4.9, image: "https://images.pexels.com/photos/7210513/pexels-photo-7210513.jpeg?auto=compress&cs=tinysrgb&w=300" },
];

const myBookings = [
  { id: "b1", service: "Full Grooming Package", pet: "Max", groomer: "Maria Santos", date: "2024-12-28", time: "10:00 AM", status: "upcoming", price: 65 },
  { id: "b2", service: "Nail Trim & Filing", pet: "Luna", groomer: "Tom Bradley", date: "2024-12-15", time: "2:00 PM", status: "completed", price: 20 },
  { id: "b3", service: "Cat Spa Treatment", pet: "Luna", groomer: "Sophie Williams", date: "2024-11-20", time: "3:30 PM", status: "completed", price: 55 },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  upcoming: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10" },
  completed: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  cancelled: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
};

export default function OwnerGrooming() {
  const [tab, setTab] = useState<"book" | "bookings">("book");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardLayout title="Grooming">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Upcoming Sessions", value: myBookings.filter(b => b.status === "upcoming").length, color: "from-purple-500 to-purple-600" },
          { label: "Total Sessions", value: myBookings.length, color: "from-sky-500 to-sky-600" },
          { label: "Total Spent", value: `$${myBookings.reduce((s, b) => s + b.price, 0)}`, color: "from-brand-orange to-orange-600" },
          { label: "Available Groomers", value: "24", color: "from-emerald-500 to-emerald-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {[{ key: "book", label: "Book Grooming" }, { key: "bookings", label: "My Bookings" }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all", tab === t.key ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 hover:border-brand-orange/50")} style={{ boxShadow: tab !== t.key ? "0 1px 3px rgba(0,0,0,0.04)" : "0 4px 12px rgba(249,115,22,0.3)" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "book" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groomingServices.map(svc => (
            <div key={svc.id} onClick={() => { setSelectedService(svc.id); setShowModal(true); }}
              className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <img src={svc.image} alt={svc.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <h4 className="font-poppins font-bold text-slate-900 dark:text-white mb-1">{svc.name}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{svc.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{svc.rating}</span>
                  <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", svc.category === "Dog" ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400" : svc.category === "Cat" ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400" : "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400")}>{svc.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-bold text-xl text-brand-orange">${svc.price}</span>
                  <button className="px-3 py-1.5 bg-brand-orange text-white text-xs font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "bookings" && (
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="p-5 border-b border-slate-100 dark:border-white/5">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">My Grooming Bookings</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {myBookings.map(b => {
              const sc = statusConfig[b.status];
              return (
                <div key={b.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scissors className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{b.service}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{b.pet} · {b.groomer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{b.date}</p>
                    <p className="text-xs text-slate-400">{b.time}</p>
                  </div>
                  <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>{b.status}</span>
                  <span className="font-bold text-brand-orange">${b.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">Book Grooming Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Select Pet</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  <option>Max (Dog)</option>
                  <option>Luna (Cat)</option>
                  <option>Tweety (Bird)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                <input type="date" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Time</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Notes (optional)</label>
                <textarea rows={2} placeholder="Any special instructions..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold flex items-center justify-center gap-2" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                <CheckCircle className="w-4 h-4" /> Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
