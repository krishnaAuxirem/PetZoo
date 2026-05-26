import { useState } from "react";
import { Search, Filter, Plus, Edit2, Trash2, Eye, MoreVertical, Shield, PawPrint, Stethoscope, Scissors, Dumbbell, Store, Home, CheckCircle, XCircle, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const roleConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  owner: { label: "Pet Owner", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10", icon: PawPrint },
  vet: { label: "Veterinarian", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", icon: Stethoscope },
  groomer: { label: "Groomer", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", icon: Scissors },
  trainer: { label: "Trainer", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", icon: Dumbbell },
  vendor: { label: "Vendor", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: Store },
  shelter: { label: "Shelter", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10", icon: Home },
  admin: { label: "Admin", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10", icon: Shield },
};

const mockUsers = [
  { id: "u1", name: "Sarah Johnson", email: "sarah@example.com", role: "owner", status: "active", joinDate: "2024-01-15", pets: 3, lastSeen: "2 hours ago", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: "u2", name: "Dr. Michael Chen", email: "mchen@petcare.com", role: "vet", status: "active", joinDate: "2023-08-22", pets: 0, lastSeen: "10 min ago", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: "u3", name: "Maria Groomer", email: "maria@groomstudio.com", role: "groomer", status: "active", joinDate: "2024-03-10", pets: 0, lastSeen: "1 day ago", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: "u4", name: "Jake Miller", email: "jake@pettrainer.com", role: "trainer", status: "active", joinDate: "2023-11-05", pets: 0, lastSeen: "3 hours ago", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: "u5", name: "PetWorld Store", email: "info@petworld.com", role: "vendor", status: "active", joinDate: "2024-02-18", pets: 0, lastSeen: "5 hours ago", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: "u6", name: "Happy Tails Shelter", email: "admin@happytails.org", role: "shelter", status: "active", joinDate: "2023-06-30", pets: 45, lastSeen: "1 hour ago", avatar: "https://i.pravatar.cc/40?img=6" },
  { id: "u7", name: "Emily Davis", email: "emily@example.com", role: "owner", status: "inactive", joinDate: "2024-05-12", pets: 1, lastSeen: "1 week ago", avatar: "https://i.pravatar.cc/40?img=7" },
  { id: "u8", name: "Robert Park", email: "rpark@example.com", role: "owner", status: "suspended", joinDate: "2024-04-01", pets: 2, lastSeen: "3 weeks ago", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: "u9", name: "Sofia Rodriguez", email: "sofia@trainer.com", role: "trainer", status: "active", joinDate: "2024-01-20", pets: 0, lastSeen: "30 min ago", avatar: "https://i.pravatar.cc/40?img=9" },
  { id: "u10", name: "Tom Bradley", email: "tom@petshop.com", role: "vendor", status: "active", joinDate: "2023-09-14", pets: 0, lastSeen: "2 days ago", avatar: "https://i.pravatar.cc/40?img=10" },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  active: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  inactive: { color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-100 dark:bg-white/5", dot: "bg-slate-400" },
  suspended: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400" },
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const perPage = 8;

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <DashboardLayout title="User Management">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: "48,291", change: "+12% this month", color: "from-violet-500 to-violet-600" },
          { label: "Active Today", value: "3,847", change: "Online now", color: "from-emerald-500 to-emerald-600" },
          { label: "New This Week", value: "284", change: "+18% vs last week", color: "from-sky-500 to-sky-600" },
          { label: "Suspended", value: "47", change: "Need review", color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">All Users ({filtered.length})</h3>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50 transition-colors" />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-brand-orange/50">
              <option value="all">All Roles</option>
              {Object.keys(roleConfig).map(r => <option key={r} value={r}>{roleConfig[r].label}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-brand-orange/50">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Add User
            </button>
            <button className="p-2 rounded-xl border border-slate-200 dark:border-white/8 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/15 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["User", "Role", "Status", "Pets", "Joined", "Last Seen", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(u => {
                const rc = roleConfig[u.role];
                const sc = statusConfig[u.status];
                const RoleIcon = rc.icon;
                return (
                  <tr key={u.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{u.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", rc.color, rc.bg)}>
                        <RoleIcon className="w-3 h-3" /> {rc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} /> {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300">{u.pets}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{u.joinDate}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{u.lastSeen}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 dark:border-white/5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
          <div className="flex items-center gap-1.5">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/8 hover:border-brand-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={cn("w-8 h-8 rounded-lg text-sm font-medium transition-colors", p === page ? "bg-brand-orange text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5")}>
                {p}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/8 hover:border-brand-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">Add New User</h3>
            <div className="space-y-4">
              {[{ label: "Full Name", placeholder: "John Doe" }, { label: "Email", placeholder: "john@example.com" }].map(f => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-orange/50 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-900 dark:text-white text-sm outline-none focus:border-brand-orange/50">
                  {Object.entries(roleConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Temporary Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-orange/50 transition-colors" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:border-slate-300 transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
