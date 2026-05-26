import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Star, CheckCircle, XCircle, MapPin, Calendar, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockVets = [
  { id: "v1", name: "Dr. Sarah Johnson", email: "sarah@petcare.com", avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=80", specialization: "General Practice & Surgery", clinic: "PetCare Plus Clinic", location: "New York, NY", rating: 4.9, reviews: 284, experience: "12 years", fee: 85, available: true, verified: true, patients: 1247, joinDate: "2023-01-15" },
  { id: "v2", name: "Dr. Michael Chen", email: "mchen@cityanimal.com", avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=80", specialization: "Exotic Animals & Avian", clinic: "City Animal Hospital", location: "Los Angeles, CA", rating: 4.8, reviews: 196, experience: "9 years", fee: 95, available: true, verified: true, patients: 892, joinDate: "2023-04-22" },
  { id: "v3", name: "Dr. Emily Davis", email: "emily@catwellness.com", avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=80", specialization: "Feline Medicine", clinic: "Cat Wellness Center", location: "Chicago, IL", rating: 4.7, reviews: 152, experience: "7 years", fee: 75, available: false, verified: true, patients: 634, joinDate: "2023-07-10" },
  { id: "v4", name: "Dr. James Wilson", email: "jwilson@advvet.com", avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=80", specialization: "Orthopedics & Neurology", clinic: "Advanced Vet Specialists", location: "Houston, TX", rating: 4.9, reviews: 341, experience: "18 years", fee: 150, available: true, verified: true, patients: 1891, joinDate: "2022-09-05" },
  { id: "v5", name: "Dr. Priya Sharma", email: "priya@skincoat.com", avatar: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=80", specialization: "Dermatology & Allergy", clinic: "Skin & Coat Specialists", location: "Seattle, WA", rating: 4.8, reviews: 217, experience: "11 years", fee: 110, available: true, verified: false, patients: 748, joinDate: "2024-01-18" },
  { id: "v6", name: "Dr. Robert Brown", email: "rbrown@247animal.com", avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=80", specialization: "Emergency & Critical Care", clinic: "24/7 Animal Emergency", location: "Miami, FL", rating: 4.6, reviews: 98, experience: "14 years", fee: 120, available: true, verified: true, patients: 421, joinDate: "2023-11-02" },
];

export default function AdminVets() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockVets.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.specialization.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "available" && v.available) || (filter === "verified" && v.verified) || (filter === "pending" && !v.verified);
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout title="Veterinarian Management">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Vets", value: "1,247", color: "from-sky-500 to-sky-600" },
          { label: "Active / Available", value: "1,104", color: "from-emerald-500 to-emerald-600" },
          { label: "Pending Verification", value: "43", color: "from-amber-500 to-amber-600" },
          { label: "Avg Rating", value: "4.8 ★", color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1].replace("to-", "")}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Veterinarians ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vets..." className="w-full sm:w-52 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-700 dark:text-slate-300 outline-none">
              <option value="all">All Vets</option>
              <option value="available">Available</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Add Vet
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Veterinarian", "Specialization", "Clinic", "Rating", "Patients", "Fee", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={v.avatar} alt={v.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{v.name}</p>
                          {v.verified && <CheckCircle className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{v.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300 max-w-[180px] truncate">{v.specialization}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{v.clinic}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {v.rating}
                    </span>
                    <p className="text-xs text-slate-400">{v.reviews} reviews</p>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">{v.patients.toLocaleString()}</td>
                  <td className="px-5 py-3.5 font-bold text-brand-orange">${v.fee}</td>
                  <td className="px-5 py-3.5">
                    <div className="space-y-1">
                      <span className={cn("block px-2 py-0.5 rounded-md text-[10px] font-bold w-fit", v.available ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-white/5 text-slate-500")}>
                        {v.available ? "Available" : "Unavailable"}
                      </span>
                      <span className={cn("block px-2 py-0.5 rounded-md text-[10px] font-bold w-fit", v.verified ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400")}>
                        {v.verified ? "Verified" : "Pending"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">Add Veterinarian</h3>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Full Name", placeholder: "Dr. John Doe" }, { label: "Email", placeholder: "dr@clinic.com" }, { label: "Specialization", placeholder: "General Practice" }, { label: "Clinic Name", placeholder: "City Vet Clinic" }, { label: "Location", placeholder: "New York, NY" }, { label: "Consultation Fee", placeholder: "$85" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-orange/50" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-slate-300 transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Add Vet</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
