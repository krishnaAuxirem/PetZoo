import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, Clock, MessageSquare, Filter, PawPrint } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockApplications = [
  { id: "app1", applicant: "Emma Roberts", avatar: "https://i.pravatar.cc/40?img=1", email: "emma@example.com", phone: "+1 555-0101", pet: "Buddy", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60", petSpecies: "Dog", submittedAt: "2024-12-26", status: "reviewing", homeType: "House with yard", experience: "First-time owner", adults: 2, children: 1, score: 85 },
  { id: "app2", applicant: "David Kim", avatar: "https://i.pravatar.cc/40?img=2", email: "david@example.com", phone: "+1 555-0102", pet: "Mittens", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=60", petSpecies: "Cat", submittedAt: "2024-12-25", status: "approved", homeType: "Apartment", experience: "2 years with cats", adults: 1, children: 0, score: 92 },
  { id: "app3", applicant: "Sarah Wilson", avatar: "https://i.pravatar.cc/40?img=3", email: "sarah@example.com", phone: "+1 555-0103", pet: "Charlie", petImage: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=60", petSpecies: "Dog", submittedAt: "2024-12-24", status: "pending", homeType: "House with yard", experience: "5+ years", adults: 3, children: 2, score: 78 },
  { id: "app4", applicant: "James Park", avatar: "https://i.pravatar.cc/40?img=4", email: "james@example.com", phone: "+1 555-0104", pet: "Polly", petImage: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=60", petSpecies: "Bird", submittedAt: "2024-12-23", status: "rejected", homeType: "Apartment", experience: "No experience with birds", adults: 2, children: 0, score: 41 },
  { id: "app5", applicant: "Lisa Chen", avatar: "https://i.pravatar.cc/40?img=5", email: "lisa@example.com", phone: "+1 555-0105", pet: "Snowball", petImage: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=60", petSpecies: "Rabbit", submittedAt: "2024-12-28", status: "pending", homeType: "House", experience: "Had a rabbit before", adults: 2, children: 1, score: 88 },
];

const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  pending: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", icon: Clock },
  reviewing: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", icon: Eye },
  approved: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: CheckCircle },
  rejected: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", icon: XCircle },
};

export default function ShelterApplications() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = mockApplications.filter(a => {
    const matchSearch = a.applicant.toLowerCase().includes(search.toLowerCase()) || a.pet.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const selectedApp = mockApplications.find(a => a.id === selected);

  return (
    <DashboardLayout title="Adoption Applications">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Applications", value: mockApplications.length, color: "from-pink-500 to-pink-600" },
          { label: "Pending Review", value: mockApplications.filter(a => a.status === "pending").length, color: "from-amber-500 to-amber-600" },
          { label: "Approved", value: mockApplications.filter(a => a.status === "approved").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Avg Score", value: `${Math.round(mockApplications.reduce((s, a) => s + a.score, 0) / mockApplications.length)}%`, color: "from-sky-500 to-sky-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Applications ({filtered.length})</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {filtered.map(app => {
              const sc = statusConfig[app.status];
              const StatusIcon = sc.icon;
              return (
                <div key={app.id} onClick={() => setSelected(selected === app.id ? null : app.id)}
                  className={cn("flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/2 transition-colors", selected === app.id && "bg-orange-50/50 dark:bg-orange-500/5")}>
                  <img src={app.petImage} alt={app.pet} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">For {app.pet}</p>
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold", sc.color, sc.bg)}>
                        <StatusIcon className="w-3 h-3" />{app.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Applicant: {app.applicant}</p>
                    <p className="text-xs text-slate-400">{app.submittedAt}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white", app.score >= 80 ? "bg-emerald-500" : app.score >= 60 ? "bg-amber-500" : "bg-red-500")}>
                        {app.score}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Score</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedApp && (
          <div className="w-72 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 h-fit" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h4 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Application Details</h4>
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-50 dark:bg-white/3">
              <img src={selectedApp.avatar} alt={selectedApp.applicant} className="w-10 h-10 rounded-xl" />
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{selectedApp.applicant}</p>
                <p className="text-xs text-slate-400">{selectedApp.email}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { label: "Pet Applied For", value: selectedApp.pet },
                { label: "Home Type", value: selectedApp.homeType },
                { label: "Experience", value: selectedApp.experience },
                { label: "Adults in Home", value: selectedApp.adults },
                { label: "Children", value: selectedApp.children },
                { label: "Submitted", value: selectedApp.submittedAt },
              ].map(d => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{d.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[140px]">{d.value}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Suitability Score</span>
                <span className={cn("text-sm font-bold", selectedApp.score >= 80 ? "text-emerald-500" : selectedApp.score >= 60 ? "text-amber-500" : "text-red-500")}>{selectedApp.score}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2">
                <div className={cn("h-2 rounded-full", selectedApp.score >= 80 ? "bg-emerald-500" : selectedApp.score >= 60 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${selectedApp.score}%` }} />
              </div>
            </div>
            {(selectedApp.status === "pending" || selectedApp.status === "reviewing") && (
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
                <button className="w-full py-2.5 border border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message Applicant
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
