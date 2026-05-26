import { Link } from "react-router-dom";
import { PawPrint, Calendar, Bell, Heart, AlertCircle, CheckCircle, Info, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { mockPets, mockAppointments, mockNotifications, chartDataMonthly } from "@/lib/mockData";
import { formatRelativeTime, formatCurrency } from "@/lib/utils";

const notifTypeConfig: Record<string, { icon: React.ElementType; className: string }> = {
  warning: { icon: AlertCircle, className: "text-amber-500" },
  success: { icon: CheckCircle, className: "text-green-500" },
  info: { icon: Info, className: "text-sky-500" },
  error: { icon: AlertCircle, className: "text-red-500" },
};

export default function OwnerDashboard() {
  const { user } = useAuth();
  const upcomingAppts = mockAppointments.filter(a => a.status === "scheduled" || a.status === "pending");
  const unreadNotifs = mockNotifications.filter(n => !n.read);

  return (
    <DashboardLayout title="My Dashboard">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-brand-orange/10 via-brand-orange/5 to-transparent border border-brand-orange/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">
              Welcome back, {user?.name?.split(" ")[0]}
            </h2>
            <p className="text-light-muted dark:text-dark-muted mt-1">You have {upcomingAppts.length} upcoming appointments and {unreadNotifs.length} unread notifications.</p>
          </div>
          <Link to="/dashboard/owner/appointments" className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap">
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="My Pets" value={mockPets.length} change="+1 this month" trend="up" icon={PawPrint} color="text-brand-orange" bgColor="bg-brand-orange/10" />
        <StatCard title="Appointments" value={mockAppointments.length} change="2 upcoming" trend="up" icon={Calendar} color="text-brand-blue" bgColor="bg-brand-blue/10" />
        <StatCard title="Health Score" value="92%" change="+5%" trend="up" icon={Heart} color="text-pink-500" bgColor="bg-pink-100 dark:bg-pink-900/20" />
        <StatCard title="Notifications" value={unreadNotifs.length} change="unread" icon={Bell} color="text-amber-500" bgColor="bg-amber-100 dark:bg-amber-900/20" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Weight Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Max's Weight Trend</h3>
            <span className="text-xs text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Healthy
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartDataMonthly}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[24, 30]} unit="kg" />
              <Tooltip formatter={(v: number) => [`${v} kg`, "Weight"]} />
              <Area type="monotone" dataKey="weight" stroke="#F97316" strokeWidth={2} fill="url(#weightGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* My Pets */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">My Pets</h3>
            <Link to="/dashboard/owner/pets" className="text-xs text-brand-orange font-semibold hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {mockPets.map((pet) => (
              <Link key={pet.id} to="/dashboard/owner/pets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                <img src={pet.image} alt={pet.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading group-hover:text-brand-orange transition-colors">{pet.name}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted truncate">{pet.breed} · {pet.age}</p>
                </div>
                <span className={`flex items-center justify-center w-5 h-5 rounded-md text-xs ${pet.vaccinated ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                  {pet.vaccinated
                    ? <CheckCircle className="w-3.5 h-3.5" />
                    : <AlertCircle className="w-3.5 h-3.5" />}
                </span>
              </Link>
            ))}
            <Link to="/dashboard/owner/pets" className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-light-border dark:border-dark-border hover:border-brand-orange text-light-muted dark:text-dark-muted hover:text-brand-orange transition-all text-sm font-medium">
              Add Pet
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Upcoming Appointments</h3>
            <Link to="/dashboard/owner/appointments" className="text-xs text-brand-orange font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {upcomingAppts.map(appt => (
              <div key={appt.id} className="flex items-center gap-3 p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading truncate">{appt.vetName}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{appt.petName} · {appt.date} at {appt.time}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${appt.status === "scheduled" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Recent Notifications</h3>
            <Link to="/dashboard/owner/notifications" className="text-xs text-brand-orange font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {mockNotifications.map(n => {
              const cfg = notifTypeConfig[n.type] || notifTypeConfig.info;
              const IconComp = cfg.icon;
              return (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${!n.read ? "bg-brand-orange/5 border border-brand-orange/20" : "hover:bg-light-hover dark:hover:bg-dark-hover"}`}>
                  <IconComp className={`w-4 h-4 flex-shrink-0 mt-0.5 ${cfg.className}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-light-text dark:text-dark-heading">{n.title}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-1">{n.message}</p>
                  </div>
                  <span className="text-xs text-light-muted dark:text-dark-muted whitespace-nowrap">{formatRelativeTime(n.createdAt)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
