import { useState } from "react";
import { TrendingUp, AlertCircle, Target, Activity, BarChart3, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const clients = [
  { id: "c1", name: "Rex", petImage: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=80", owner: "Alex Thompson", program: "Advanced Agility Training", progress: 25, sessions: 4, totalSessions: 16, startDate: "2024-12-01", skills: { obedience: 70, agility: 35, focus: 60, recall: 80, socializing: 75 } },
  { id: "c2", name: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", owner: "Sarah Johnson", program: "Basic Obedience Bootcamp", progress: 62, sessions: 5, totalSessions: 8, startDate: "2024-11-15", skills: { obedience: 85, agility: 50, focus: 80, recall: 75, socializing: 90 } },
  { id: "c3", name: "Charlie", petImage: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=80", owner: "Emma Roberts", program: "Puppy Socialization Class", progress: 50, sessions: 3, totalSessions: 6, startDate: "2024-12-08", skills: { obedience: 55, agility: 40, focus: 50, recall: 45, socializing: 70 } },
  { id: "c4", name: "Buddy", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", owner: "Amanda Foster", program: "Basic Obedience Bootcamp", progress: 100, sessions: 8, totalSessions: 8, startDate: "2024-11-01", skills: { obedience: 95, agility: 65, focus: 90, recall: 95, socializing: 88 } },
];

const progressColors = (p: number) => p >= 80 ? "bg-emerald-500" : p >= 50 ? "bg-brand-orange" : "bg-sky-500";
const progressTextColors = (p: number) => p >= 80 ? "text-emerald-500" : p >= 50 ? "text-brand-orange" : "text-sky-500";

const weeklyProgress = [
  { week: "W1", rex: 10, max: 35, charlie: 15, buddy: 50 },
  { week: "W2", rex: 15, max: 50, charlie: 25, buddy: 65 },
  { week: "W3", rex: 18, max: 60, charlie: 35, buddy: 80 },
  { week: "W4", rex: 25, max: 62, charlie: 50, buddy: 100 },
];

export default function TrainerProgress() {
  const [selected, setSelected] = useState<string | null>("c2");
  const selectedClient = clients.find(c => c.id === selected);

  return (
    <DashboardLayout title="Progress Tracking">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Clients", value: clients.filter(c => c.progress < 100).length, color: "from-amber-500 to-amber-600" },
          { label: "Completed Programs", value: clients.filter(c => c.progress === 100).length, color: "from-emerald-500 to-emerald-600" },
          { label: "Avg Progress", value: `${Math.round(clients.reduce((s, c) => s + c.progress, 0) / clients.length)}%`, color: "from-sky-500 to-sky-600" },
          { label: "Total Clients", value: clients.length, color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Client List */}
        <div className="space-y-3">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Clients</h3>
          {clients.map(c => (
            <div key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              className={cn("p-4 rounded-2xl cursor-pointer transition-all border", selected === c.id ? "border-brand-orange/40 bg-orange-50/50 dark:bg-orange-500/5 ring-1 ring-brand-orange/20" : "bg-white dark:bg-dark-card border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10")} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-3">
                <img src={c.petImage} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{c.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.owner}</p>
                </div>
                <span className={cn("ml-auto text-sm font-bold", progressTextColors(c.progress))}>{c.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/8 rounded-full h-2">
                <div className={cn("h-2 rounded-full transition-all", progressColors(c.progress))} style={{ width: `${c.progress}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Session {c.sessions}/{c.totalSessions} · {c.program}</p>
            </div>
          ))}
        </div>

        {/* Progress Detail */}
        {selectedClient ? (
          <div className="lg:col-span-2 space-y-5">
            {/* Radar Chart */}
            <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h4 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">{selectedClient.name}'s Skill Assessment</h4>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={Object.entries(selectedClient.skills).map(([key, val]) => ({ subject: key.charAt(0).toUpperCase() + key.slice(1), value: val, fullMark: 100 }))}>
                  <PolarGrid stroke="rgba(148,163,184,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 11 }} />
                  <Radar name={selectedClient.name} dataKey="value" stroke="#F97316" fill="#F97316" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Progress */}
            <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h4 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">Weekly Progress — All Clients</h4>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="rex" stroke="#F97316" strokeWidth={2} dot={false} name="Rex" />
                  <Line type="monotone" dataKey="max" stroke="#0EA5E9" strokeWidth={2} dot={false} name="Max" />
                  <Line type="monotone" dataKey="charlie" stroke="#A855F7" strokeWidth={2} dot={false} name="Charlie" />
                  <Line type="monotone" dataKey="buddy" stroke="#22C55E" strokeWidth={2} dot={false} name="Buddy" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)", minHeight: 200 }}>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Select a client to view detailed progress</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
