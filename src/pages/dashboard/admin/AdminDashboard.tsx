import { Users, PawPrint, DollarSign, Activity, Stethoscope, Scissors, GraduationCap, ShoppingCart, Building2, Package, AlertCircle, Star, ShoppingBag, TrendingUp } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { adminStats, vetRevenueData, revenueBreakdown } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

const userBreakdown = [
  { name: "Pet Owners", value: adminStats.petOwners, color: "#F97316" },
  { name: "Vets", value: adminStats.vets, color: "#0EA5E9" },
  { name: "Groomers", value: adminStats.groomers, color: "#A855F7" },
  { name: "Trainers", value: adminStats.trainers, color: "#22C55E" },
  { name: "Vendors", value: adminStats.vendors, color: "#EC4899" },
  { name: "Shelters", value: adminStats.shelters, color: "#F59E0B" },
];

const recentActivity = [
  { time: "2 min ago", action: "New vet registered", user: "Dr. Priya Sharma", icon: Stethoscope, color: "text-sky-500", bg: "bg-sky-500/10" },
  { time: "8 min ago", action: "Adoption application submitted", user: "Jennifer Walsh — Buddy", icon: PawPrint, color: "text-pink-500", bg: "bg-pink-500/10" },
  { time: "15 min ago", action: "New marketplace order", user: "Order #ORD-2024-1892 — $124.97", icon: ShoppingBag, color: "text-orange-500", bg: "bg-orange-500/10" },
  { time: "23 min ago", action: "Premium plan purchased", user: "Marcus Thompson", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  { time: "34 min ago", action: "Community post flagged", user: "Report #1234", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  { time: "1h ago", action: "New shelter registered", user: "Paws Forever Rescue", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Overview">
      {/* Live metrics bar */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Platform Health", value: "99.9%", sub: "Uptime", color: "from-emerald-500 to-emerald-600", glow: "rgba(34,197,94,0.3)" },
          { label: "Active Sessions", value: "2,847", sub: "Right now", color: "from-sky-500 to-sky-600", glow: "rgba(14,165,233,0.3)" },
          { label: "Daily Revenue", value: formatCurrency(adminStats.monthlyRevenue / 30), sub: "Est. today", color: "from-orange-500 to-orange-600", glow: "rgba(249,115,22,0.3)" },
          { label: "Support Tickets", value: "12", sub: "Open tickets", color: "from-amber-500 to-amber-600", glow: "rgba(245,158,11,0.3)" },
        ].map(s => (
          <div key={s.label} className="relative overflow-hidden rounded-2xl p-5 text-white"
            style={{ background: `linear-gradient(135deg, ${s.color.replace("from-", "").replace(" to-", ", ")})`, boxShadow: `0 8px 24px ${s.glow}, inset 0 1px 0 rgba(255,255,255,0.1)` }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
            <p className="font-poppins font-extrabold text-3xl tracking-tight">{s.value}</p>
            <p className="text-white/90 text-sm font-semibold mt-0.5">{s.label}</p>
            <p className="text-white/60 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard title="Total Users" value={adminStats.totalUsers.toLocaleString()} change="+1,247 this month" trend="up" icon={Users} gradient="linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)" />
        <StatCard title="Active Pets" value={adminStats.activePets.toLocaleString()} change="+3,420 this month" trend="up" icon={PawPrint} gradient="linear-gradient(135deg, #F97316 0%, #EA6C0A 100%)" />
        <StatCard title="Total Revenue" value={formatCurrency(adminStats.totalRevenue)} change="+22.4% YoY" trend="up" icon={DollarSign} gradient="linear-gradient(135deg, #22C55E 0%, #16A34A 100%)" />
        <StatCard title="Total Adoptions" value={adminStats.adoptions.toLocaleString()} change="+87 this month" trend="up" icon={Activity} gradient="linear-gradient(135deg, #EC4899 0%, #DB2777 100%)" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {[
          { label: "Vets", value: adminStats.vets, icon: Stethoscope, gradient: "from-sky-500 to-sky-400" },
          { label: "Groomers", value: adminStats.groomers, icon: Scissors, gradient: "from-purple-500 to-purple-400" },
          { label: "Trainers", value: adminStats.trainers, icon: GraduationCap, gradient: "from-amber-500 to-amber-400" },
          { label: "Vendors", value: adminStats.vendors, icon: ShoppingCart, gradient: "from-pink-500 to-pink-400" },
          { label: "Shelters", value: adminStats.shelters, icon: Building2, gradient: "from-emerald-500 to-emerald-400" },
          { label: "Orders", value: adminStats.totalOrders, icon: Package, gradient: "from-orange-500 to-orange-400" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-4 text-center"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className={`w-10 h-10 bg-gradient-to-br ${s.gradient} rounded-xl flex items-center justify-center mx-auto mb-2`}
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-poppins font-bold text-xl text-slate-900 dark:text-white">{s.value.toLocaleString()}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Revenue Overview (2024)</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Monthly platform revenue</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3" /> +22.4% YoY
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={vetRevenueData}>
              <defs>
                <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} tickFormatter={v => `$${v/1000}k`} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }}
                formatter={(v: number) => [formatCurrency(v), "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2.5} fill="url(#adminRevGrad)" dot={false} activeDot={{ r: 5, fill: "#F97316" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-3">Revenue Split</h3>
          <div className="flex justify-center">
            <PieChart width={180} height={150}>
              <Pie data={revenueBreakdown} cx={90} cy={75} innerRadius={42} outerRadius={68} dataKey="value" strokeWidth={2} stroke="transparent">
                {revenueBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "11px" }}
                formatter={(v) => [`${v}%`, ""]} />
            </PieChart>
          </div>
          <div className="space-y-2 mt-1">
            {revenueBreakdown.map(r => (
              <div key={r.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-xs text-slate-600 dark:text-slate-300">{r.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Activity Feed */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Live Activity Feed</h3>
          </div>
          <div className="space-y-2.5">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/3 transition-colors">
                <div className={`w-8 h-8 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
                  <a.icon className={`w-4 h-4 ${a.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{a.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{a.user}</p>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">User Distribution</h3>
          <div className="space-y-3.5">
            {userBreakdown.map(u => (
              <div key={u.name} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 w-20 flex-shrink-0">{u.name}</span>
                <div className="flex-1 bg-slate-100 dark:bg-white/6 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(u.value / adminStats.totalUsers) * 100}%`, backgroundColor: u.color }} />
                </div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white w-14 text-right">{u.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Total Users</span>
            <span className="font-poppins font-bold text-brand-orange text-sm">{adminStats.totalUsers.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
