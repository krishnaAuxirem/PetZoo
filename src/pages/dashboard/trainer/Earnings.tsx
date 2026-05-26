import { useState } from "react";
import { DollarSign, TrendingUp, BarChart3, Download, Users, BookOpen } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";

const monthlyData = [
  { month: "Jul", revenue: 3840, sessions: 52, programs: 4 },
  { month: "Aug", revenue: 4120, sessions: 58, programs: 5 },
  { month: "Sep", revenue: 3950, sessions: 54, programs: 5 },
  { month: "Oct", revenue: 4680, sessions: 63, programs: 6 },
  { month: "Nov", revenue: 5290, sessions: 72, programs: 7 },
  { month: "Dec", revenue: 5840, sessions: 79, programs: 7 },
];

const programRevenue = [
  { program: "Basic Obedience", revenue: 2390, clients: 12 },
  { program: "Behavior Correction", revenue: 1749, clients: 5 },
  { program: "Advanced Agility", revenue: 899, clients: 2 },
  { program: "Puppy Socialization", revenue: 597, clients: 4 },
  { program: "Private Sessions", revenue: 205, clients: 3 },
];

export default function TrainerEarnings() {
  return (
    <DashboardLayout title="Earnings">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "This Month", value: "$5,840", change: "+10% vs last", color: "from-amber-500 to-amber-600" },
          { label: "This Year", value: "$47,560", change: "+28% YoY", color: "from-brand-orange to-orange-600" },
          { label: "Active Programs", value: "7", change: "this month", color: "from-sky-500 to-sky-600" },
          { label: "Total Sessions", value: "79", change: "this month", color: "from-emerald-500 to-emerald-600" },
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
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="trainerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} formatter={(v: number) => [`$${v}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2.5} fill="url(#trainerGrad)" dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Revenue by Program</h3>
          <div className="space-y-3">
            {programRevenue.map(p => (
              <div key={p.program}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[130px]">{p.program}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">${p.revenue}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/6 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(p.revenue / 2390) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Payout History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Month", "Sessions", "Programs", "Gross Revenue", "Platform Fee (10%)", "Net Payout", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map(m => (
                <tr key={m.month} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2">
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{m.month} 2024</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.sessions}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.programs}</td>
                  <td className="px-5 py-3 font-bold text-slate-900 dark:text-white">${m.revenue}</td>
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
