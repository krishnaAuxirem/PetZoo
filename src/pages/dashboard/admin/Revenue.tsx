import { DollarSign, TrendingUp, ShoppingBag, Stethoscope, Scissors, Dumbbell, Star, Download, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";

const monthlyRevenue = [
  { month: "Jan", revenue: 98420, orders: 1847, vets: 24100, marketplace: 44290, memberships: 19200, grooming: 6800, training: 4030 },
  { month: "Feb", revenue: 87300, orders: 1621, vets: 21800, marketplace: 39450, memberships: 17400, grooming: 5720, training: 2930 },
  { month: "Mar", revenue: 112500, orders: 2103, vets: 28100, marketplace: 50600, memberships: 22500, grooming: 7400, training: 3900 },
  { month: "Apr", revenue: 105800, orders: 1980, vets: 26500, marketplace: 47600, memberships: 21100, grooming: 7000, training: 3600 },
  { month: "May", revenue: 124300, orders: 2319, vets: 31100, marketplace: 55900, memberships: 24900, grooming: 8200, training: 4200 },
  { month: "Jun", revenue: 118700, orders: 2211, vets: 29700, marketplace: 53400, memberships: 23700, grooming: 7800, training: 4100 },
  { month: "Jul", revenue: 132400, orders: 2471, vets: 33100, marketplace: 59600, memberships: 26500, grooming: 8700, training: 4500 },
  { month: "Aug", revenue: 128900, orders: 2403, vets: 32200, marketplace: 58000, memberships: 25800, grooming: 8500, training: 4400 },
  { month: "Sep", revenue: 141200, orders: 2634, vets: 35300, marketplace: 63500, memberships: 28200, grooming: 9300, training: 4900 },
  { month: "Oct", revenue: 135600, orders: 2528, vets: 33900, marketplace: 61000, memberships: 27100, grooming: 8900, training: 4700 },
  { month: "Nov", revenue: 128400, orders: 2394, vets: 32100, marketplace: 57800, memberships: 25700, grooming: 8400, training: 4400 },
  { month: "Dec", revenue: 148750, orders: 2774, vets: 37200, marketplace: 66900, memberships: 29800, grooming: 9800, training: 5050 },
];

const revenueBySource = [
  { name: "Marketplace", value: 45, amount: 578934, color: "#F97316" },
  { name: "Veterinary", value: 25, amount: 321630, color: "#0EA5E9" },
  { name: "Memberships", value: 15, amount: 192978, color: "#22C55E" },
  { name: "Grooming", value: 8, amount: 102922, color: "#A855F7" },
  { name: "Training", value: 7, amount: 90086, color: "#EC4899" },
];

const topVendors = [
  { name: "PetWorld Store", sales: 48291, revenue: 142840, growth: "+23%" },
  { name: "NaturaPet", sales: 34120, revenue: 98750, growth: "+18%" },
  { name: "Royal Canin Outlet", sales: 29840, revenue: 87320, growth: "+12%" },
  { name: "TechPet Gadgets", sales: 21930, revenue: 76540, growth: "+31%" },
  { name: "Organic Paws", sales: 18470, revenue: 54210, growth: "+9%" },
];

export default function AdminRevenue() {
  return (
    <DashboardLayout title="Revenue Analytics">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue" value="$1.28M" change="+18% YoY" trend="up" icon={DollarSign} gradient="linear-gradient(135deg, #F97316 0%, #EA6C0A 100%)" />
        <StatCard title="Monthly Revenue" value="$148.7K" change="+12% vs last" trend="up" icon={TrendingUp} gradient="linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)" />
        <StatCard title="Total Orders" value="24,891" change="+8% this month" trend="up" icon={ShoppingBag} gradient="linear-gradient(135deg, #22C55E 0%, #16A34A 100%)" />
        <StatCard title="Avg Order Value" value="$51.77" change="+4% vs last" trend="up" icon={Star} gradient="linear-gradient(135deg, #A855F7 0%, #9333EA 100%)" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Revenue Trend</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Monthly revenue over 12 months</p>
            </div>
            <select className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-xs text-slate-600 dark:text-slate-400 outline-none">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#F97316" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown Pie */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Revenue Sources</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Breakdown by category</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={revenueBySource} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {revenueBySource.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {revenueBySource.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{s.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">{s.value}%</span>
                  <span className="text-xs text-slate-400 ml-1">${(s.amount / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Category Revenue Bar */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Revenue by Category (Monthly)</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Stacked bar — last 6 months</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenue.slice(6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} />
              <Bar dataKey="marketplace" stackId="a" fill="#F97316" radius={[0, 0, 0, 0]} />
              <Bar dataKey="vets" stackId="a" fill="#0EA5E9" />
              <Bar dataKey="memberships" stackId="a" fill="#22C55E" />
              <Bar dataKey="grooming" stackId="a" fill="#A855F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Vendors */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Top Vendors</h3>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-orange transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <div className="space-y-3">
            {topVendors.map((v, i) => (
              <div key={v.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/3 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-sm">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{v.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{v.sales.toLocaleString()} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">${(v.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-emerald-500 font-semibold">{v.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Monthly Revenue Breakdown</h3>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-white/8 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:border-brand-orange transition-colors">
            <Download className="w-4 h-4" /> Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Month", "Total Revenue", "Marketplace", "Veterinary", "Memberships", "Grooming", "Training", "Orders"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.map(m => (
                <tr key={m.month} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2">
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{m.month}</td>
                  <td className="px-5 py-3 font-bold text-brand-orange">${m.revenue.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300 text-sm">${m.marketplace.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300 text-sm">${m.vets.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300 text-sm">${m.memberships.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300 text-sm">${m.grooming.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300 text-sm">${m.training.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-700 dark:text-slate-300 text-sm">{m.orders.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
