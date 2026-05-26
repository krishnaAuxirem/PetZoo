import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Heart, PawPrint, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockAdoptions = [
  { id: "ad1", petName: "Buddy", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", species: "Dog", breed: "Labrador Mix", applicant: "Emma Roberts", applicantAvatar: "https://i.pravatar.cc/40?img=1", shelter: "Happy Tails Shelter", location: "New York, NY", date: "2024-12-20", status: "approved", age: "2 years" },
  { id: "ad2", petName: "Mittens", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=80", species: "Cat", breed: "Domestic Shorthair", applicant: "David Kim", applicantAvatar: "https://i.pravatar.cc/40?img=2", shelter: "City Cat Rescue", location: "Los Angeles, CA", date: "2024-12-22", status: "pending", age: "3 years" },
  { id: "ad3", petName: "Charlie", petImage: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=80", species: "Dog", breed: "Beagle", applicant: "Sarah Wilson", applicantAvatar: "https://i.pravatar.cc/40?img=3", shelter: "Paws & Claws", location: "Chicago, IL", date: "2024-12-18", status: "reviewing", age: "1 year" },
  { id: "ad4", petName: "Polly", petImage: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=80", species: "Bird", breed: "African Grey", applicant: "James Park", applicantAvatar: "https://i.pravatar.cc/40?img=4", shelter: "Wing & Song", location: "Miami, FL", date: "2024-12-15", status: "approved", age: "4 years" },
  { id: "ad5", petName: "Snowball", petImage: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=80", species: "Rabbit", breed: "Holland Lop", applicant: "Lisa Chen", applicantAvatar: "https://i.pravatar.cc/40?img=5", shelter: "Small Critters", location: "Seattle, WA", date: "2024-12-25", status: "pending", age: "8 months" },
  { id: "ad6", petName: "Rex", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=80", species: "Dog", breed: "German Shepherd", applicant: "Michael Brown", applicantAvatar: "https://i.pravatar.cc/40?img=6", shelter: "Forever Home", location: "Houston, TX", date: "2024-12-10", status: "rejected", age: "5 years" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", dot: "bg-amber-400", icon: Clock },
  reviewing: { label: "In Review", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", dot: "bg-sky-400", icon: Search },
  approved: { label: "Approved", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400", icon: XCircle },
};

const speciesColors: Record<string, string> = {
  Dog: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cat: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Bird: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Rabbit: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

export default function AdminAdoptions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockAdoptions.filter(a => {
    const matchSearch = a.petName.toLowerCase().includes(search.toLowerCase()) || a.applicant.toLowerCase().includes(search.toLowerCase()) || a.shelter.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { pending: 0, reviewing: 0, approved: 0, rejected: 0 };
  mockAdoptions.forEach(a => { if (a.status in counts) (counts as any)[a.status]++; });

  return (
    <DashboardLayout title="Adoption Management">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Adoptions", value: "3,421", color: "from-brand-orange to-orange-600" },
          { label: "Pending Review", value: counts.pending, color: "from-amber-500 to-amber-600" },
          { label: "Approved This Month", value: "147", color: "from-emerald-500 to-emerald-600" },
          { label: "Active Shelters", value: "207", color: "from-pink-500 to-pink-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["all", ...Object.keys(statusConfig)].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize", statusFilter === s ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 hover:border-brand-orange/50")}>
            {s === "all" ? "All Applications" : statusConfig[s].label} {s !== "all" && `(${(counts as any)[s]})`}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Adoption Applications ({filtered.length})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications..." className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50 w-52" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Pet", "Applicant", "Shelter", "Species", "Applied", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const sc = statusConfig[a.status];
                const StatusIcon = sc.icon;
                const speciesColor = speciesColors[a.species] || "bg-slate-100 text-slate-600";
                return (
                  <tr key={a.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={a.petImage} alt={a.petName} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.petName}</p>
                          <p className="text-xs text-slate-400">{a.breed} · {a.age}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={a.applicantAvatar} alt={a.applicant} className="w-8 h-8 rounded-xl" />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{a.applicant}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-slate-600 dark:text-slate-300">{a.shelter}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{a.location}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", speciesColor)}>{a.species}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{a.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>
                        <StatusIcon className="w-3 h-3" />{sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {a.status === "pending" && (
                          <>
                            <button className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"><CheckCircle className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><XCircle className="w-3.5 h-3.5" /></button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
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
