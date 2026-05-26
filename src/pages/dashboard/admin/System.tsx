import { useState } from "react";
import { Star, Shield, CheckCircle, TrendingUp, Activity, Cpu, HardDrive, Wifi, AlertCircle, RefreshCw, Server } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const uptimeData = [
  { time: "00:00", cpu: 42, memory: 61, requests: 1240 },
  { time: "04:00", cpu: 28, memory: 58, requests: 843 },
  { time: "08:00", cpu: 71, memory: 74, requests: 3847 },
  { time: "12:00", cpu: 85, memory: 82, requests: 6241 },
  { time: "16:00", cpu: 78, memory: 79, requests: 5823 },
  { time: "20:00", cpu: 63, memory: 71, requests: 4127 },
  { time: "23:59", cpu: 48, memory: 64, requests: 2341 },
];

const services = [
  { name: "API Gateway", status: "operational", latency: "12ms", uptime: "99.98%", region: "us-east-1" },
  { name: "Database (PostgreSQL)", status: "operational", latency: "3ms", uptime: "99.99%", region: "us-east-1" },
  { name: "File Storage (S3)", status: "operational", latency: "28ms", uptime: "99.95%", region: "global" },
  { name: "Edge Functions", status: "operational", latency: "45ms", uptime: "99.92%", region: "global" },
  { name: "Email Service", status: "degraded", latency: "124ms", uptime: "98.41%", region: "us-east-1" },
  { name: "SMS Notifications", status: "operational", latency: "89ms", uptime: "99.87%", region: "global" },
  { name: "CDN", status: "operational", latency: "8ms", uptime: "99.99%", region: "global" },
  { name: "Auth Service", status: "operational", latency: "15ms", uptime: "99.98%", region: "us-east-1" },
];

const recentIncidents = [
  { id: 1, title: "Email delivery delays", severity: "minor", status: "ongoing", started: "2024-12-28 14:20", description: "Some users experiencing email delivery delays of 2-5 minutes." },
  { id: 2, title: "API latency spike", severity: "minor", status: "resolved", started: "2024-12-27 09:15", description: "Brief latency increase in API responses. Resolved within 8 minutes." },
  { id: 3, title: "Database connection pool saturation", severity: "major", status: "resolved", started: "2024-12-25 16:40", description: "High traffic caused connection pool exhaustion. Scaled up and resolved." },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  operational: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  degraded: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", dot: "bg-amber-400 animate-pulse" },
  outage: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", dot: "bg-red-400" },
};

const severityConfig: Record<string, { color: string; bg: string }> = {
  minor: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  major: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
  critical: { color: "text-red-700 dark:text-red-300", bg: "bg-red-100 dark:bg-red-500/20" },
};

export default function AdminSystem() {
  const operational = services.filter(s => s.status === "operational").length;

  return (
    <DashboardLayout title="System Monitoring">
      {/* Health Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "System Status", value: operational === services.length ? "All Operational" : `${operational}/${services.length}`, color: operational === services.length ? "from-emerald-500 to-emerald-600" : "from-amber-500 to-amber-600" },
          { label: "Overall Uptime", value: "99.94%", color: "from-sky-500 to-sky-600" },
          { label: "Avg Response Time", value: "28ms", color: "from-violet-500 to-violet-600" },
          { label: "Active Incidents", value: recentIncidents.filter(i => i.status === "ongoing").length, color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Resource Usage */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-1">Resource Usage (24h)</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">CPU & Memory utilization</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} />
              <Line type="monotone" dataKey="cpu" stroke="#F97316" strokeWidth={2} dot={false} name="CPU" />
              <Line type="monotone" dataKey="memory" stroke="#0EA5E9" strokeWidth={2} dot={false} name="Memory" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brand-orange inline-block" />CPU 78%</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-sky-500 inline-block" />Memory 79%</span>
          </div>
        </div>

        {/* Service Status */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Service Health</h3>
          <div className="space-y-2">
            {services.map(svc => {
              const sc = statusConfig[svc.status];
              return (
                <div key={svc.name} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("w-2 h-2 rounded-full flex-shrink-0", sc.dot)} />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{svc.name}</p>
                      <p className="text-xs text-slate-400">{svc.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{svc.latency}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{svc.uptime}</span>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize", sc.color, sc.bg)}>{svc.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Incidents */}
      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Incident History</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {recentIncidents.map(incident => {
            const sev = severityConfig[incident.severity];
            return (
              <div key={incident.id} className="p-5 flex items-start gap-4">
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5", sev.bg)}>
                  <AlertCircle className={cn("w-4 h-4", sev.color)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{incident.title}</p>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize", sev.color, sev.bg)}>{incident.severity}</span>
                    <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize", incident.status === "ongoing" ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10" : "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10")}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{incident.description}</p>
                  <p className="text-xs text-slate-400 mt-1">Started: {incident.started}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
