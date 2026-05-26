import { useState } from "react";
import { DollarSign, TrendingUp, BarChart3, Download, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";

const monthlyData = [
  { month: "Jul", revenue: 2840, bookings: 43, avgTicket: 66 },
  { month: "Aug", revenue: 3120, bookings: 47, avgTicket: 66 },
  { month: "Sep", revenue: 2980, bookings: 45, avgTicket: 66 },
  { month: "Oct", revenue: 3450, bookings: 52, avgTicket: 66 },
  { month: "Nov", revenue: 3890, bookings: 59, avgTicket: 66 },
  { month: "Dec", revenue: 4210, bookings: 64, avgTicket: 66 },
];

const serviceRevenue = [
  { service: "Full Grooming", revenue: 1820, count: 28 },
  { service: "Cat Spa", revenue: 880, count: 16 },
  { service: "De-shedding", revenue: 540, count: 12 },
  { service: "Nail Trim", revenue: 360, count: 18 },
  { service: "Bath & Brush", revenue: 420, count: 12 },
  { service: "Massage", revenue: 190, count: 4 },
];

export default function GroomerEarnings() {
  return (
    <DashboardLayout title="Earnings">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "This Month", value: "$4,210", change: "+8% vs last", color: "from-purple-500 to-purple-600" },
          { label: "This Year", value: "$38,420", change: "+22% YoY", color: "from-brand-orange to-orange-600" },
          { label: "Avg Per Booking", value: "$65.80", change: "this month", color: "from-sky-500 to-sky-600" },
          { label: "Total Bookings", value: "64", change: "this month", color: "from-emerald-500 to-emerald-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Monthly Revenue Trend</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-white/8 rounded-xl text-xs text-slate-500 hover:border-brand-orange transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#A855F7" strokeWidth={2.5} fill="url(#earnGrad)" dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Revenue by Service</h3>
          <div className="space-y-3">
            {serviceRevenue.map(s => (
              <div key={s.service}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">{s.service}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">${s.revenue}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/6 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(s.revenue / 1820) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Payout History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Month", "Bookings", "Gross Revenue", "Platform Fee (10%)", "Net Payout", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map(m => (
                <tr key={m.month} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2">
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{m.month} 2024</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.bookings}</td>
                  <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">${m.revenue.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">${(m.revenue * 0.1).toFixed(0)}</td>
                  <td className="px-5 py-3 font-bold text-emerald-600 dark:text-emerald-400">${(m.revenue * 0.9).toFixed(0)}</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
