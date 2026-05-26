import { useState } from "react";
import { Search, Users, Plus, Edit2, Trash2, Mail, Phone, Star, MapPin, ShoppingBag } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockCustomers = [
  { id: "c1", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555-0101", avatar: "https://i.pravatar.cc/40?img=1", totalOrders: 12, totalSpent: 847.50, lastOrder: "2024-12-26", status: "vip", location: "New York, NY" },
  { id: "c2", name: "Emma Roberts", email: "emma@example.com", phone: "+1 555-0102", avatar: "https://i.pravatar.cc/40?img=2", totalOrders: 8, totalSpent: 523.20, lastOrder: "2024-12-24", status: "regular", location: "Los Angeles, CA" },
  { id: "c3", name: "David Kim", email: "david@example.com", phone: "+1 555-0103", avatar: "https://i.pravatar.cc/40?img=3", totalOrders: 3, totalSpent: 178.90, lastOrder: "2024-12-20", status: "new", location: "Chicago, IL" },
  { id: "c4", name: "Alex Thompson", email: "alex@example.com", phone: "+1 555-0104", avatar: "https://i.pravatar.cc/40?img=4", totalOrders: 21, totalSpent: 1482.30, lastOrder: "2024-12-28", status: "vip", location: "Houston, TX" },
  { id: "c5", name: "Amanda Foster", email: "amanda@example.com", phone: "+1 555-0105", avatar: "https://i.pravatar.cc/40?img=5", totalOrders: 5, totalSpent: 312.75, lastOrder: "2024-12-15", status: "regular", location: "Seattle, WA" },
  { id: "c6", name: "Kevin Park", email: "kevin@example.com", phone: "+1 555-0106", avatar: "https://i.pravatar.cc/40?img=6", totalOrders: 2, totalSpent: 89.98, lastOrder: "2024-12-10", status: "new", location: "Miami, FL" },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  vip: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", label: "VIP" },
  regular: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", label: "Regular" },
  new: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", label: "New" },
};

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockCustomers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockCustomers.reduce((s, c) => s + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / mockCustomers.reduce((s, c) => s + c.totalOrders, 0);

  return (
    <DashboardLayout title="Customers">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Customers", value: mockCustomers.length, color: "from-sky-500 to-sky-600" },
          { label: "VIP Customers", value: mockCustomers.filter(c => c.status === "vip").length, color: "from-amber-500 to-amber-600" },
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(0)}`, color: "from-emerald-500 to-emerald-600" },
          { label: "Avg Order Value", value: `$${avgOrderValue.toFixed(2)}`, color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Customers ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Customers</option>
              <option value="vip">VIP</option>
              <option value="regular">Regular</option>
              <option value="new">New</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Customer", "Contact", "Orders", "Total Spent", "Last Order", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const sc = statusConfig[c.status];
                return (
                  <tr key={c.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs text-slate-600 dark:text-slate-300">{c.email}</p>
                      <p className="text-xs text-slate-400">{c.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">{c.totalOrders}</td>
                    <td className="px-5 py-3.5 font-bold text-brand-orange">${c.totalSpent.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{c.lastOrder}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>{sc.label}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-colors"><Mail className="w-3.5 h-3.5" /></button>
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
