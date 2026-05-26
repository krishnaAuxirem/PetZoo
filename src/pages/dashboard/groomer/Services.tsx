import { useState } from "react";
import { Scissors, Clock, Plus, Edit2, Trash2, Star, DollarSign, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockServices = [
  { id: "s1", name: "Full Grooming Package", description: "Bath, haircut, nail trim, ear cleaning, de-shedding", duration: "2-3 hours", price: 65, category: "Dog", rating: 4.9, bookings: 284, active: true },
  { id: "s2", name: "Cat Spa Treatment", description: "Gentle cat bath, blow dry, nail trim and ear cleaning", duration: "1.5-2 hours", price: 55, category: "Cat", rating: 4.8, bookings: 156, active: true },
  { id: "s3", name: "Express Bath & Brush", description: "Quick bath, blow dry and brush out", duration: "1 hour", price: 35, category: "Dog", rating: 4.7, bookings: 198, active: true },
  { id: "s4", name: "Nail Trim & Filing", description: "Professional nail trim and filing for dogs and cats", duration: "20 minutes", price: 20, category: "All", rating: 4.6, bookings: 342, active: true },
  { id: "s5", name: "De-shedding Treatment", description: "Intensive de-shedding treatment, reduces shedding by 80%", duration: "1.5 hours", price: 45, category: "Dog", rating: 4.8, bookings: 127, active: true },
  { id: "s6", name: "Pet Massage & Aromatherapy", description: "Relaxing aromatherapy massage using pet-safe oils", duration: "45 minutes", price: 40, category: "All", rating: 4.9, bookings: 89, active: false },
];

const categoryColors: Record<string, string> = {
  Dog: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cat: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  All: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export default function GroomerServices() {
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState<typeof mockServices[0] | null>(null);

  return (
    <DashboardLayout title="My Services">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Services", value: mockServices.length, color: "from-purple-500 to-purple-600" },
          { label: "Active Services", value: mockServices.filter(s => s.active).length, color: "from-emerald-500 to-emerald-600" },
          { label: "Total Bookings", value: mockServices.reduce((s, sv) => s + sv.bookings, 0).toLocaleString(), color: "from-sky-500 to-sky-600" },
          { label: "Avg Price", value: `$${(mockServices.reduce((s, sv) => s + sv.price, 0) / mockServices.length).toFixed(0)}`, color: "from-brand-orange to-orange-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Services</h3>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockServices.map(svc => {
          const catColor = categoryColors[svc.category] || categoryColors.All;
          return (
            <div key={svc.id} className={cn("rounded-2xl bg-white dark:bg-dark-card border transition-all duration-300 hover:-translate-y-0.5 p-5", svc.active ? "border-slate-200/80 dark:border-white/5" : "border-slate-200/50 dark:border-white/3 opacity-60")} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", catColor)}>{svc.category}</span>
                  <button onClick={() => setEditService(svc)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h4 className="font-poppins font-bold text-slate-900 dark:text-white mb-1">{svc.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{svc.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{svc.duration}</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{svc.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{svc.bookings} bookings</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="font-poppins font-bold text-xl text-brand-orange">${svc.price}</span>
                <button className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold transition-all", svc.active ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20" : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10")}>
                  {svc.active ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {(showModal || editService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">{editService ? "Edit Service" : "Add Service"}</h3>
            <div className="space-y-4">
              {[{ label: "Service Name", placeholder: "e.g. Full Grooming Package", value: editService?.name || "" }, { label: "Duration", placeholder: "e.g. 2-3 hours", value: editService?.duration || "" }, { label: "Price ($)", placeholder: "e.g. 65", value: editService?.price?.toString() || "" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
                  <input defaultValue={f.value} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Pet Type</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {["Dog", "Cat", "All"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea rows={2} defaultValue={editService?.description || ""} placeholder="Describe the service..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowModal(false); setEditService(null); }} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => { setShowModal(false); setEditService(null); }} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Save Service</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
