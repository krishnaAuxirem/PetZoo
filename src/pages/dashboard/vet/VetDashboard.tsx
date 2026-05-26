import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, Video, CheckCircle, FileText, Pill, Activity, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { vetRevenueData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

const todayAppts = [
  { id: 1, pet: "Max (Golden Retriever)", owner: "Alex Thompson", time: "10:00 AM", type: "checkup", status: "confirmed", fee: 85 },
  { id: 2, pet: "Luna (Persian Cat)", owner: "Sarah M.", time: "11:30 AM", type: "vaccination", status: "confirmed", fee: 65 },
  { id: 3, pet: "Charlie (Beagle)", owner: "David K.", time: "2:00 PM", type: "consultation", status: "pending", fee: 95 },
  { id: 4, pet: "Birdie (Parrot)", owner: "Emma R.", time: "3:30 PM", type: "telemedicine", status: "video", fee: 45 },
  { id: 5, pet: "Rex (German Shepherd)", owner: "Marcus T.", time: "5:00 PM", type: "follow-up", status: "confirmed", fee: 55 },
];

const recentPatients = [
  { name: "Max", breed: "Golden Retriever", owner: "Alex T.", lastVisit: "Dec 28", condition: "Healthy", img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { name: "Luna", breed: "Persian Cat", owner: "Sarah M.", lastVisit: "Dec 20", condition: "Asthma", img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { name: "Charlie", breed: "Beagle", owner: "David K.", lastVisit: "Dec 18", condition: "Skin Issue", img: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { name: "Rex", breed: "German Shepherd", owner: "Marcus T.", lastVisit: "Dec 15", condition: "Healthy", img: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=60" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  pending: { label: "Pending", className: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  video: { label: "Video Call", className: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400" },
};

export default function VetDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Vet Dashboard">
      {/* Welcome Banner */}
      <div className="mb-6 relative overflow-hidden rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 60%, #0369A1 100%)", boxShadow: "0 8px 32px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)" }} />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sky-200 text-sm mb-1">Good morning 👋</p>
            <h2 className="font-poppins font-bold text-2xl text-white tracking-tight">Dr. {user?.name?.split(" ")[0] || "Smith"}</h2>
            <p className="text-sky-200/80 mt-1 text-sm">
              <strong className="text-white">5 appointments</strong> today · <strong className="text-white">3 follow-ups</strong> pending
            </p>
          </div>
          <div className="flex gap-2.5">
            <Link to="/dashboard/vet/appointments"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl text-sm border border-white/20 transition-all backdrop-blur-sm">
              View Schedule
            </Link>
            <Link to="/dashboard/vet/consultations"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-sky-700 font-semibold rounded-xl text-sm hover:bg-sky-50 transition-all">
              <Video className="w-4 h-4" /> Start Video
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today's Appointments" value="5" change="+2 from yesterday" trend="up" icon={Calendar} gradient="linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)" />
        <StatCard title="Total Patients" value="1,284" change="+47 this month" trend="up" icon={Users} gradient="linear-gradient(135deg, #22C55E 0%, #16A34A 100%)" />
        <StatCard title="Monthly Revenue" value={formatCurrency(6200)} change="+8.3%" trend="up" icon={DollarSign} gradient="linear-gradient(135deg, #F97316 0%, #EA6C0A 100%)" />
        <StatCard title="Avg Rating" value="4.9★" change="312 reviews" trend="up" icon={Star} gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Revenue Overview (2024)</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Monthly consultation revenue</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3" /> +22.4% YoY
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={vetRevenueData}>
              <defs>
                <linearGradient id="vetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} tickFormatter={v => `$${v/1000}k`} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }}
                formatter={(v: number) => [formatCurrency(v), "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={2.5} fill="url(#vetGrad)" dot={false} activeDot={{ r: 5, fill: "#0EA5E9" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Week Summary */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white mb-4">This Week</h3>
          <div className="space-y-4">
            {[
              { label: "Consultations", value: 18, total: 22, color: "#0EA5E9", icon: FileText },
              { label: "Prescriptions", value: 12, total: 18, color: "#A855F7", icon: Pill },
              { label: "Follow-ups", value: 8, total: 12, color: "#22C55E", icon: CheckCircle },
              { label: "Telemedicine", value: 5, total: 8, color: "#F59E0B", icon: Video },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">{item.value}/{item.total}</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(item.value / item.total) * 100}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-3">
            {[
              { label: "Satisfaction", value: "99.2%", color: "text-emerald-500" },
              { label: "Avg Response", value: "4.2 min", color: "text-sky-500" },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-white/3">
                <p className={`font-poppins font-bold text-xl ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Today's Schedule */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Today's Schedule</h3>
            <Link to="/dashboard/vet/appointments" className="text-xs text-sky-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-2.5">
            {todayAppts.map(appt => (
              <div key={appt.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/4">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  {appt.type === "telemedicine" ? <Video className="w-4 h-4 text-sky-500" /> : <Calendar className="w-4 h-4 text-sky-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{appt.pet}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{appt.owner} · {appt.time} · {formatCurrency(appt.fee)}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[appt.status]?.className || ""}`}>
                  {statusConfig[appt.status]?.label || appt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Recent Patients</h3>
            <Link to="/dashboard/vet/patients" className="text-xs text-sky-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-2.5">
            {recentPatients.map(pt => (
              <div key={pt.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/3 transition-colors cursor-pointer group">
                <img src={pt.img} alt={pt.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">{pt.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{pt.breed} · {pt.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">{pt.lastVisit}</p>
                  <span className={`text-xs font-semibold ${pt.condition === "Healthy" ? "text-emerald-500" : "text-amber-500"}`}>{pt.condition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
