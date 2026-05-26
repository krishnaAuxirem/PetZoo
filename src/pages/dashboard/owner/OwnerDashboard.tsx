import { Link } from "react-router-dom";
import { PawPrint, Calendar, Bell, Heart, AlertCircle, CheckCircle, Info, TrendingUp, ShoppingBag, Activity, Sparkles, ArrowRight, Clock, MapPin, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { mockPets, mockAppointments, mockNotifications, chartDataMonthly } from "@/lib/mockData";
import { formatRelativeTime, formatCurrency } from "@/lib/utils";

const notifTypeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  warning: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/8" },
  success: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/8" },
  info: { icon: Info, color: "text-sky-500", bg: "bg-sky-500/8" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/8" },
};

const healthData = [
  { week: "W1", score: 88 },
  { week: "W2", score: 91 },
  { week: "W3", score: 89 },
  { week: "W4", score: 92 },
  { week: "W5", score: 94 },
  { week: "W6", score: 92 },
];

export default function OwnerDashboard() {
  const { user } = useAuth();
  const upcomingAppts = mockAppointments.filter(a => a.status === "scheduled" || a.status === "pending");
  const unreadNotifs = mockNotifications.filter(n => !n.read);

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome banner */}
      <div className="mb-6 relative overflow-hidden rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #EA6C0A 60%, #D97706 100%)",
          boxShadow: "0 8px 32px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)" }} />
        <div className="absolute top-0 right-0 bottom-0 w-64 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/70 text-sm">Welcome back</span>
            </div>
            <h2 className="font-poppins font-bold text-2xl text-white tracking-tight">
              {user?.name?.split(" ")[0]}, your pets are happy today!
            </h2>
            <p className="text-white/70 mt-1 text-sm">
              {upcomingAppts.length} upcoming appointment{upcomingAppts.length !== 1 ? "s" : ""} · {unreadNotifs.length} unread notification{unreadNotifs.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link to="/dashboard/owner/appointments"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl text-sm border border-white/20 transition-all backdrop-blur-sm whitespace-nowrap">
            <Calendar className="w-4 h-4" /> Book Appointment
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="My Pets"
          value={mockPets.length}
          change="+1 this month"
          trend="up"
          icon={PawPrint}
          gradient="linear-gradient(135deg, #F97316 0%, #EA6C0A 100%)"
        />
        <StatCard
          title="Appointments"
          value={mockAppointments.length}
          change="2 upcoming"
          trend="up"
          icon={Calendar}
          gradient="linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)"
        />
        <StatCard
          title="Health Score"
          value="92%"
          change="+5% this month"
          trend="up"
          icon={Heart}
          gradient="linear-gradient(135deg, #EC4899 0%, #DB2777 100%)"
        />
        <StatCard
          title="Notifications"
          value={unreadNotifs.length}
          change="unread alerts"
          trend="neutral"
          icon={Bell}
          gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Pet Health Overview</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Max's weekly health score</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3" /> Excellent
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} domain={[80, 100]} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ background: "rgba(9,11,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "12px" }}
                formatter={(v: number) => [`${v}%`, "Health Score"]}
              />
              <Area type="monotone" dataKey="score" stroke="#F97316" strokeWidth={2.5} fill="url(#healthGrad)" dot={{ r: 3, fill: "#F97316", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#F97316" }} />
            </AreaChart>
          </ResponsiveContainer>

          {/* Bottom stat pills */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
            {[
              { label: "Avg Score", value: "91.7%", color: "text-brand-orange" },
              { label: "Best Week", value: "W5 — 94%", color: "text-emerald-500" },
              { label: "Trend", value: "+4.5%", color: "text-emerald-500" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className={`font-poppins font-bold text-base ${s.color}`}>{s.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My Pets */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">My Pets</h3>
            <Link to="/dashboard/owner/pets" className="text-xs text-brand-orange font-semibold hover:underline flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {mockPets.map((pet) => (
              <Link key={pet.id} to="/dashboard/owner/pets"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/4 transition-colors group">
                <div className="relative flex-shrink-0">
                  <img src={pet.image} alt={pet.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-dark-card ${pet.vaccinated ? "bg-emerald-400" : "bg-amber-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">{pet.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{pet.breed} · {pet.age}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pet.vaccinated ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
                  {pet.vaccinated ? "Vaccinated" : "Due"}
                </span>
              </Link>
            ))}
            <Link to="/dashboard/owner/pets"
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-200 dark:border-white/8 hover:border-brand-orange text-slate-400 dark:text-slate-500 hover:text-brand-orange transition-all text-sm font-medium group">
              <span className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center">+</span>
              Add a Pet
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Upcoming Appointments */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Upcoming Appointments</h3>
            <Link to="/dashboard/owner/appointments" className="text-xs text-brand-orange font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-2.5">
            {upcomingAppts.slice(0, 3).map(appt => (
              <div key={appt.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/4 hover:border-brand-orange/20 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{appt.vetName}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <PawPrint className="w-3 h-3" /> {appt.petName}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" /> {appt.date} at {appt.time}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${appt.status === "scheduled" ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
                  {appt.status}
                </span>
              </div>
            ))}
            <Link to="/dashboard/owner/appointments"
              className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-slate-200 dark:border-white/8 hover:border-brand-orange text-slate-400 hover:text-brand-orange transition-colors text-sm font-medium">
              <Zap className="w-4 h-4" /> Book New Appointment
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Notifications</h3>
              {unreadNotifs.length > 0 && (
                <span className="bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadNotifs.length}
                </span>
              )}
            </div>
            <Link to="/dashboard/owner/notifications" className="text-xs text-brand-orange font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {mockNotifications.slice(0, 4).map(n => {
              const cfg = notifTypeConfig[n.type] || notifTypeConfig.info;
              const IconComp = cfg.icon;
              return (
                <div key={n.id}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!n.read ? "bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10" : "hover:bg-slate-50 dark:hover:bg-white/3"}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                    <IconComp className={`w-3.5 h-3.5 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{n.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{n.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0 mt-0.5">
                    {formatRelativeTime(n.createdAt)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
