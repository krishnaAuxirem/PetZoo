import { useState } from "react";
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock, Filter, Download, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType; dot: string }> = {
  pending: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", icon: Clock, dot: "bg-amber-400" },
  processing: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", icon: RefreshCw, dot: "bg-sky-400" },
  shipped: { color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10", icon: Truck, dot: "bg-violet-400" },
  delivered: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: CheckCircle, dot: "bg-emerald-400" },
  cancelled: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", icon: XCircle, dot: "bg-red-400" },
};

const mockOrders = [
  { id: "ORD-7841", customer: "Sarah Johnson", email: "sarah@example.com", avatar: "https://i.pravatar.cc/40?img=1", items: 3, total: 124.97, status: "delivered", date: "2024-12-26", payment: "Visa •••• 4242", address: "123 Main St, NY" },
  { id: "ORD-7842", customer: "Marcus Thompson", email: "marcus@example.com", avatar: "https://i.pravatar.cc/40?img=2", items: 1, total: 79.99, status: "shipped", date: "2024-12-27", payment: "PayPal", address: "456 Oak Ave, CA" },
  { id: "ORD-7843", customer: "Priya Patel", email: "priya@example.com", avatar: "https://i.pravatar.cc/40?img=3", items: 5, total: 243.45, status: "processing", date: "2024-12-28", payment: "MasterCard •••• 8821", address: "789 Pine Rd, IL" },
  { id: "ORD-7844", customer: "Robert Chen", email: "rchen@example.com", avatar: "https://i.pravatar.cc/40?img=4", items: 2, total: 89.98, status: "pending", date: "2024-12-28", payment: "Amex •••• 3421", address: "321 Elm St, TX" },
  { id: "ORD-7845", customer: "Amanda Foster", email: "amanda@example.com", avatar: "https://i.pravatar.cc/40?img=5", items: 1, total: 45.99, status: "delivered", date: "2024-12-24", payment: "Visa •••• 7891", address: "654 Maple Dr, WA" },
  { id: "ORD-7846", customer: "Kevin Park", email: "kevin@example.com", avatar: "https://i.pravatar.cc/40?img=6", items: 4, total: 178.94, status: "cancelled", date: "2024-12-23", payment: "PayPal", address: "987 Cedar Ln, FL" },
  { id: "ORD-7847", customer: "Lily Zhang", email: "lily@example.com", avatar: "https://i.pravatar.cc/40?img=7", items: 2, total: 65.98, status: "shipped", date: "2024-12-27", payment: "Visa •••• 1234", address: "147 Birch St, MA" },
  { id: "ORD-7848", customer: "James Wilson", email: "james@example.com", avatar: "https://i.pravatar.cc/40?img=8", items: 1, total: 199.99, status: "processing", date: "2024-12-28", payment: "MC •••• 5678", address: "258 Walnut Ave, CO" },
];

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = mockOrders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);
  const selectedOrderData = mockOrders.find(o => o.id === selectedOrder);

  const statusCounts = statuses.reduce((acc, s) => ({ ...acc, [s]: mockOrders.filter(o => o.status === s).length }), {} as Record<string, number>);

  return (
    <DashboardLayout title="Order Management">
      {/* Status Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {statuses.map(s => {
          const cfg = statusConfig[s];
          const Icon = cfg.icon;
          return (
            <button key={s} onClick={() => setStatusFilter(s === statusFilter ? "all" : s)}
              className={cn("p-4 rounded-2xl border transition-all text-left", statusFilter === s ? `${cfg.bg} border-current` : "bg-white dark:bg-dark-card border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10")}
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-2", cfg.bg)}>
                <Icon className={cn("w-4 h-4", cfg.color)} />
              </div>
              <p className="font-poppins font-bold text-xl text-slate-900 dark:text-white">{statusCounts[s]}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{s}</p>
            </button>
          );
        })}
      </div>

      <div className="flex gap-5">
        {/* Orders Table */}
        <div className="flex-1 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">All Orders ({filtered.length})</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
                  className="w-full sm:w-52 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-white/8 rounded-xl text-sm text-slate-500 hover:border-brand-orange transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5">
                  {["Order ID", "Customer", "Items", "Total", "Status", "Date", ""].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(o => {
                  const sc = statusConfig[o.status];
                  const Icon = sc.icon;
                  return (
                    <tr key={o.id} className={cn("border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 cursor-pointer transition-colors", selectedOrder === o.id && "bg-orange-50/50 dark:bg-orange-500/5")}
                      onClick={() => setSelectedOrder(selectedOrder === o.id ? null : o.id)}>
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-sm text-brand-orange">{o.id}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={o.avatar} alt={o.customer} className="w-8 h-8 rounded-xl object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{o.customer}</p>
                            <p className="text-xs text-slate-400">{o.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{o.items} items</td>
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">${o.total.toFixed(2)}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} /> {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{o.date}</td>
                      <td className="px-5 py-3.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-brand-orange transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 dark:border-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-1.5">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-white/8 disabled:opacity-40 text-slate-600 dark:text-slate-300 hover:border-brand-orange transition-colors">Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} className={cn("w-8 h-8 rounded-lg text-sm font-medium transition-colors", p === page ? "bg-brand-orange text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5")}>{p}</button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-white/8 disabled:opacity-40 text-slate-600 dark:text-slate-300 hover:border-brand-orange transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* Order Detail Panel */}
        {selectedOrderData && (
          <div className="w-80 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 h-fit" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Order ID</p>
                <p className="font-mono font-bold text-brand-orange">{selectedOrderData.id}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Customer</p>
                <div className="flex items-center gap-2">
                  <img src={selectedOrderData.avatar} alt="" className="w-7 h-7 rounded-lg" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedOrderData.customer}</p>
                    <p className="text-xs text-slate-400">{selectedOrderData.email}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Items</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedOrderData.items}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Total</p>
                  <p className="font-bold text-brand-orange">${selectedOrderData.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Payment</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{selectedOrderData.payment}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Delivery Address</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{selectedOrderData.address}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Update Status</p>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {statuses.map(s => <option key={s} value={s} selected={s === selectedOrderData.status}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <button className="w-full py-2.5 bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                Update Order
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
