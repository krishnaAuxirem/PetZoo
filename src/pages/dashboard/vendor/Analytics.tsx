import { DollarSign, TrendingUp, ShoppingBag, Package, Users, BarChart3, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";

const monthlyRevenue = [
  { month: "Jul", revenue: 12840, orders: 287, visitors: 4821 },
  { month: "Aug", revenue: 14200, orders: 318, visitors: 5341 },
  { month: "Sep", revenue: 13580, orders: 304, visitors: 5012 },
  { month: "Oct", revenue: 16240, orders: 365, visitors: 6124 },
  { month: "Nov", revenue: 18950, orders: 424, visitors: 7218 },
  { month: "Dec", revenue: 21480, orders: 481, visitors: 8420 },
];

const topProducts = [
  { name: "Royal Canin Adult Dog Food", sales: 1247, revenue: 57345 },
  { name: "Wireless Pet Camera", sales: 721, revenue: 57680 },
  { name: "Orthopedic Memory Foam Bed", sales: 956, revenue: 63106 },
  { name: "Premium Cat Tree Tower", sales: 834, revenue: 75065 },
  { name: "Interactive Dog Puzzle Toy", sales: 562, revenue: 14044 },
];

export default function VendorAnalytics() {
  return (
    <DashboardLayout title="Analytics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "$142.8K", change: "+31% YoY", color: "from-emerald-500 to-emerald-600" },
          { label: "Total Orders", value: "2,179", change: "+18% this month", color: "from-brand-orange to-orange-600" },
          { label: "Store Visitors", value: "36.9K", change: "+22% this month", color: "from-sky-500 to-sky-600" },
          { label: "Conversion Rate", value: "5.9%", change: "+0.8% vs last", color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Revenue Trend</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Last 6 months</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="vendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={2.5} fill="url(#vendGrad)" dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Orders vs Visitors</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Traffic & conversion trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} />
              <Bar dataKey="orders" fill="#F97316" radius={[4, 4, 0, 0]} name="Orders" />
              <Bar dataKey="visitors" fill="rgba(14,165,233,0.3)" radius={[4, 4, 0, 0]} name="Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Top Performing Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["#", "Product", "Units Sold", "Revenue", "Share"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => {
                const totalRevenue = topProducts.reduce((s, pp) => s + pp.revenue, 0);
                const share = ((p.revenue / totalRevenue) * 100).toFixed(1);
                return (
                  <tr key={p.name} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2">
                    <td className="px-5 py-3">
                      <div className="w-6 h-6 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-xs">{i + 1}</div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white text-sm">{p.name}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{p.sales.toLocaleString()}</td>
                    <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">${p.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 dark:bg-white/6 rounded-full h-1.5">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${share}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{share}%</span>
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
