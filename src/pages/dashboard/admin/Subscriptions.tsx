import { useState } from "react";
import { Search, Star, CreditCard, CheckCircle, XCircle, Edit2, Trash2, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockSubscriptions = [
  { id: "sub1", user: "Sarah Johnson", email: "sarah@example.com", avatar: "https://i.pravatar.cc/40?img=1", plan: "Premium Guardian", price: 24.99, billing: "monthly", status: "active", nextBilling: "2025-01-15", started: "2024-06-15", pets: 3 },
  { id: "sub2", user: "Marcus Thompson", email: "marcus@example.com", avatar: "https://i.pravatar.cc/40?img=2", plan: "Pet Care Plus", price: 9.99, billing: "yearly", status: "active", nextBilling: "2025-08-22", started: "2024-08-22", pets: 1 },
  { id: "sub3", user: "Priya Patel", email: "priya@example.com", avatar: "https://i.pravatar.cc/40?img=3", plan: "Enterprise Pack", price: 99.99, billing: "monthly", status: "active", nextBilling: "2025-01-10", started: "2024-01-10", pets: 8 },
  { id: "sub4", user: "Robert Chen", email: "rchen@example.com", avatar: "https://i.pravatar.cc/40?img=4", plan: "Premium Guardian", price: 24.99, billing: "yearly", status: "cancelled", nextBilling: "2025-02-18", started: "2024-02-18", pets: 2 },
  { id: "sub5", user: "Amanda Foster", email: "amanda@example.com", avatar: "https://i.pravatar.cc/40?img=5", plan: "Pet Care Plus", price: 9.99, billing: "monthly", status: "past_due", nextBilling: "2024-12-22", started: "2023-12-22", pets: 1 },
  { id: "sub6", user: "Kevin Park", email: "kevin@example.com", avatar: "https://i.pravatar.cc/40?img=6", plan: "Premium Guardian", price: 24.99, billing: "monthly", status: "active", nextBilling: "2025-01-20", started: "2024-09-20", pets: 4 },
];

const planColors: Record<string, string> = {
  "Paw Starter": "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400",
  "Pet Care Plus": "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Premium Guardian": "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Enterprise Pack": "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  active: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  cancelled: { color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-100 dark:bg-white/5", dot: "bg-slate-400" },
  past_due: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400" },
};

export default function AdminSubscriptions() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const filtered = mockSubscriptions.filter(s => {
    const matchSearch = s.user.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    const matchPlan = planFilter === "all" || s.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalMRR = mockSubscriptions.filter(s => s.status === "active").reduce((sum, s) => sum + (s.billing === "yearly" ? s.price / 12 : s.price), 0);
  const activeCount = mockSubscriptions.filter(s => s.status === "active").length;

  return (
    <DashboardLayout title="Subscription Management">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "MRR", value: `$${totalMRR.toFixed(0)}`, sub: "monthly recurring", color: "from-brand-orange to-orange-600" },
          { label: "Active Subscribers", value: activeCount, sub: `of ${mockSubscriptions.length} total`, color: "from-emerald-500 to-emerald-600" },
          { label: "Cancelled", value: mockSubscriptions.filter(s => s.status === "cancelled").length, sub: "this month", color: "from-slate-500 to-slate-600" },
          { label: "Past Due", value: mockSubscriptions.filter(s => s.status === "past_due").length, sub: "need attention", color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Subscriptions ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subscribers..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="past_due">Past Due</option>
            </select>
            <select value={planFilter} onChange={e => setPlanFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Plans</option>
              <option>Pet Care Plus</option>
              <option>Premium Guardian</option>
              <option>Enterprise Pack</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-white/8 rounded-xl text-sm text-slate-500 hover:border-brand-orange transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Subscriber", "Plan", "Amount", "Billing", "Status", "Next Billing", "Started", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(sub => {
                const sc = statusConfig[sub.status];
                const pc = planColors[sub.plan] || planColors["Pet Care Plus"];
                return (
                  <tr key={sub.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={sub.avatar} alt={sub.user} className="w-9 h-9 rounded-xl" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{sub.user}</p>
                          <p className="text-xs text-slate-400">{sub.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap", pc)}>{sub.plan}</span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">${sub.price}/mo</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-semibold text-slate-600 dark:text-slate-400 capitalize">{sub.billing}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize", sc.color, sc.bg)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />{sub.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{sub.nextBilling}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{sub.started}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><XCircle className="w-3.5 h-3.5" /></button>
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
