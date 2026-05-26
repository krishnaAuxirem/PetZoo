import { useState } from "react";
import { Star, CheckCircle, TrendingUp, Activity, Zap, Cpu, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const aiUsageData = [
  { day: "Mon", queries: 8420, tokens: 1284000, cost: 12.84 },
  { day: "Tue", queries: 9230, tokens: 1387000, cost: 13.87 },
  { day: "Wed", queries: 7890, tokens: 1189000, cost: 11.89 },
  { day: "Thu", queries: 11240, tokens: 1712000, cost: 17.12 },
  { day: "Fri", queries: 13480, tokens: 2048000, cost: 20.48 },
  { day: "Sat", queries: 9870, tokens: 1498000, cost: 14.98 },
  { day: "Sun", queries: 8140, tokens: 1241000, cost: 12.41 },
];

const featureUsage = [
  { feature: "Symptom Checker", uses: 34218, percentage: 38 },
  { feature: "Nutrition Advisor", uses: 21847, percentage: 24 },
  { feature: "Behavior Guide", uses: 16429, percentage: 18 },
  { feature: "Breed Info", uses: 9284, percentage: 10 },
  { feature: "Emergency Help", uses: 5412, percentage: 6 },
  { feature: "Care Reminders", uses: 3729, percentage: 4 },
];

const recentCalls = [
  { id: 1, user: "Sarah M.", query: "My dog has been scratching excessively for 3 days...", feature: "Symptom Checker", tokens: 1284, latency: "1.2s", status: "success", time: "2 min ago" },
  { id: 2, user: "David K.", query: "What is the best diet for a 2-year-old Persian cat?", feature: "Nutrition Advisor", tokens: 892, latency: "0.9s", status: "success", time: "5 min ago" },
  { id: 3, user: "Emma R.", query: "My puppy won't stop barking at night...", feature: "Behavior Guide", tokens: 1047, latency: "1.4s", status: "success", time: "8 min ago" },
  { id: 4, user: "Anonymous", query: "Emergency: dog ate chocolate 30 min ago...", feature: "Emergency Help", tokens: 1521, latency: "1.1s", status: "success", time: "12 min ago" },
  { id: 5, user: "Alex T.", query: "Tell me about Golden Retriever health issues", feature: "Breed Info", tokens: 763, latency: "3.8s", status: "timeout", time: "15 min ago" },
];

export default function AdminAIMonitor() {
  const totalQueries = aiUsageData.reduce((s, d) => s + d.queries, 0);
  const totalTokens = aiUsageData.reduce((s, d) => s + d.tokens, 0);
  const totalCost = aiUsageData.reduce((s, d) => s + d.cost, 0);

  return (
    <DashboardLayout title="AI Monitoring">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Queries This Week", value: totalQueries.toLocaleString(), sub: "+18% vs last week", color: "from-violet-500 to-violet-600" },
          { label: "Tokens Used", value: `${(totalTokens / 1000000).toFixed(1)}M`, sub: "total this week", color: "from-sky-500 to-sky-600" },
          { label: "AI Cost", value: `$${totalCost.toFixed(2)}`, sub: "this week", color: "from-emerald-500 to-emerald-600" },
          { label: "Avg Latency", value: "1.2s", sub: "p95 latency", color: "from-amber-500 to-amber-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Query Trend */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Daily AI Queries</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Query volume this week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={aiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} formatter={(v: number) => [v.toLocaleString(), "Queries"]} />
              <Bar dataKey="queries" fill="#A855F7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Usage */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Feature Usage</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">By AI feature type</p>
          <div className="space-y-3">
            {featureUsage.map(f => (
              <div key={f.feature}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">{f.feature}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{f.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/6 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-400 h-1.5 rounded-full transition-all" style={{ width: `${f.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent API calls */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Recent AI Calls</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Live stream of AI API requests</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["User", "Query Preview", "Feature", "Tokens", "Latency", "Status", "Time"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentCalls.map(call => (
                <tr key={call.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-sm font-semibold text-slate-900 dark:text-white">{call.user}</td>
                  <td className="px-5 py-3 max-w-xs">
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{call.query}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold whitespace-nowrap">{call.feature}</span>
                  </td>
                  <td className="px-5 py-3 text-sm font-mono text-slate-600 dark:text-slate-300">{call.tokens.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm font-mono text-slate-600 dark:text-slate-300">{call.latency}</td>
                  <td className="px-5 py-3">
                    <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", call.status === "success" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400")}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">{call.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
