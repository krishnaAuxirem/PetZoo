import { Users, PawPrint, DollarSign, Activity, Stethoscope, Scissors, GraduationCap, ShoppingCart, Building2, Package, AlertCircle, CheckCircle, Star, ShoppingBag } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { adminStats, vetRevenueData, revenueBreakdown, chartDataMonthly } from "@/lib/mockData";
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
  { time: "2 min ago", action: "New vet registered", user: "Dr. Priya Sharma", type: "vet", icon: Stethoscope, iconColor: "text-sky-500", bgColor: "bg-sky-50 dark:bg-sky-900/20" },
  { time: "8 min ago", action: "Adoption application submitted", user: "Jennifer Walsh — Buddy", type: "adoption", icon: PawPrint, iconColor: "text-pink-500", bgColor: "bg-pink-50 dark:bg-pink-900/20" },
  { time: "15 min ago", action: "New marketplace order", user: "Order #ORD-2024-1892 — $124.97", type: "order", icon: ShoppingBag, iconColor: "text-brand-orange", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  { time: "23 min ago", action: "Premium plan purchased", user: "Marcus Thompson", type: "subscription", icon: Star, iconColor: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-900/20" },
  { time: "34 min ago", action: "Community post flagged", user: "Report #1234", type: "moderation", icon: AlertCircle, iconColor: "text-red-500", bgColor: "bg-red-50 dark:bg-red-900/20" },
  { time: "1h ago", action: "New shelter registered", user: "Paws Forever Rescue", type: "shelter", icon: Building2, iconColor: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
];

const secondaryStats = [
  { label: "Vets", value: adminStats.vets.toLocaleString(), icon: Stethoscope, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20" },
  { label: "Groomers", value: adminStats.groomers.toLocaleString(), icon: Scissors, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { label: "Trainers", value: adminStats.trainers.toLocaleString(), icon: GraduationCap, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
  { label: "Vendors", value: adminStats.vendors.toLocaleString(), icon: ShoppingCart, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/20" },
  { label: "Shelters", value: adminStats.shelters.toLocaleString(), icon: Building2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
  { label: "Orders", value: adminStats.totalOrders.toLocaleString(), icon: Package, color: "text-brand-orange", bg: "bg-orange-50 dark:bg-orange-900/20" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Overview Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15)_0%,transparent_60%)]" />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Platform Health", value: "99.9%", sub: "Uptime", color: "text-brand-green" },
            { label: "Active Sessions", value: "2,847", sub: "Right now", color: "text-brand-blue" },
            { label: "Daily Revenue", value: formatCurrency(adminStats.monthlyRevenue / 30), sub: "Est. today", color: "text-brand-orange" },
            { label: "Support Tickets", value: "12", sub: "Open tickets", color: "text-amber-400" },
          ].map(s => (
            <div key={s.label}>
              <p className={`font-poppins font-extrabold text-2xl ${s.color}`}>{s.value}</p>
              <p className="text-white/80 text-sm font-medium">{s.label}</p>
              <p className="text-white/50 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Users" value={adminStats.totalUsers.toLocaleString()} change="+1,247 this month" trend="up" icon={Users} color="text-brand-blue" bgColor="bg-brand-blue/10" />
        <StatCard title="Active Pets" value={adminStats.activePets.toLocaleString()} change="+3,420 this month" trend="up" icon={PawPrint} color="text-brand-orange" bgColor="bg-brand-orange/10" />
        <StatCard title="Total Revenue" value={formatCurrency(adminStats.totalRevenue)} change="+22.4% YoY" trend="up" icon={DollarSign} color="text-brand-green" bgColor="bg-brand-green/10" />
        <StatCard title="Total Adoptions" value={adminStats.adoptions.toLocaleString()} change="+87 this month" trend="up" icon={Activity} color="text-pink-500" bgColor="bg-pink-100 dark:bg-pink-900/20" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {secondaryStats.map(s => (
          <div key={s.label} className="card-base p-4 text-center">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading">{s.value}</p>
            <p className="text-light-muted dark:text-dark-muted text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-5">Revenue Overview (2024)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={vetRevenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Revenue Breakdown</h3>
          <PieChart width={200} height={160}>
            <Pie data={revenueBreakdown} cx={100} cy={80} innerRadius={45} outerRadius={75} dataKey="value">
              {revenueBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip formatter={(v) => [`${v}%`, ""]} />
          </PieChart>
          <div className="mt-3 space-y-2">
            {revenueBreakdown.map(r => (
              <div key={r.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-xs text-light-text dark:text-dark-body">{r.name}</span>
                </div>
                <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Live Activity Feed</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                <div className={`w-8 h-8 rounded-lg ${a.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <a.icon className={`w-4 h-4 ${a.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-light-text dark:text-dark-heading">{a.action}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted truncate">{a.user}</p>
                </div>
                <span className="text-xs text-light-muted dark:text-dark-muted whitespace-nowrap flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">User Distribution</h3>
          <div className="space-y-3">
            {userBreakdown.map(u => (
              <div key={u.name} className="flex items-center gap-3">
                <span className="text-xs font-medium text-light-muted dark:text-dark-muted w-20 flex-shrink-0">{u.name}</span>
                <div className="flex-1 bg-light-hover dark:bg-dark-hover rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(u.value / adminStats.totalUsers) * 100}%`, backgroundColor: u.color }} />
                </div>
                <span className="text-xs font-semibold text-light-text dark:text-dark-heading w-16 text-right">{u.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-light-text dark:text-dark-heading">Total Users</span>
              <span className="text-sm font-bold text-brand-orange">{adminStats.totalUsers.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
