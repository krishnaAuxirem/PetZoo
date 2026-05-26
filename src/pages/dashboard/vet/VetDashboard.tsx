import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, Clock, Video, CheckCircle, FileText, Pill, Activity, TrendingUp, Phone } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { vetRevenueData, mockAppointments } from "@/lib/mockData";
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

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  video: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function VetDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Vet Dashboard">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border border-sky-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">
              Good morning, {user?.name?.split(" ")[0]}
            </h2>
            <p className="text-light-muted dark:text-dark-muted mt-1">You have <strong className="text-sky-500">5 appointments</strong> today and <strong className="text-brand-orange">3 follow-ups</strong> pending.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/vet/appointments" className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-colors">
              View Schedule
            </Link>
            <Link to="/dashboard/vet/consultations" className="px-4 py-2.5 border border-sky-500/30 text-sky-500 hover:bg-sky-500/10 font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5">
              <Video className="w-4 h-4" /> Start Video
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Today's Appointments" value="5" change="+2 from yesterday" trend="up" icon={Calendar} color="text-sky-500" bgColor="bg-sky-100 dark:bg-sky-900/20" />
        <StatCard title="Total Patients" value="1,284" change="+47 this month" trend="up" icon={Users} color="text-brand-green" bgColor="bg-brand-green/10" />
        <StatCard title="Monthly Revenue" value={formatCurrency(6200)} change="+8.3%" trend="up" icon={DollarSign} color="text-brand-orange" bgColor="bg-brand-orange/10" />
        <StatCard title="Avg Rating" value="4.9" change="312 reviews" trend="up" icon={Star} color="text-yellow-500" bgColor="bg-yellow-100 dark:bg-yellow-900/20" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Revenue & Patients (2024)</h3>
            <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +22.4% YoY
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={vetRevenueData}>
              <defs>
                <linearGradient id="vetRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number, name: string) => [name === "revenue" ? formatCurrency(v) : v, name === "revenue" ? "Revenue" : "Patients"]} />
              <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={2} fill="url(#vetRevGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">This Week's Summary</h3>
          <div className="space-y-4">
            {[
              { label: "Consultations", value: 18, total: 22, color: "bg-sky-500", icon: FileText },
              { label: "Prescriptions", value: 12, total: 18, color: "bg-purple-500", icon: Pill },
              { label: "Follow-ups Done", value: 8, total: 12, color: "bg-green-500", icon: CheckCircle },
              { label: "Telemedicine", value: 5, total: 8, color: "bg-amber-500", icon: Video },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted" />
                    <span className="text-sm text-light-text dark:text-dark-body">{item.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{item.value}/{item.total}</span>
                </div>
                <div className="h-1.5 bg-light-hover dark:bg-dark-hover rounded-full">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.value / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-light-border dark:border-dark-border grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
              <p className="font-poppins font-bold text-xl text-sky-500">99.2%</p>
              <p className="text-xs text-light-muted dark:text-dark-muted">Satisfaction</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
              <p className="font-poppins font-bold text-xl text-brand-orange">4.2 min</p>
              <p className="text-xs text-light-muted dark:text-dark-muted">Avg Response</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Appointments */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Today's Appointments</h3>
            <Link to="/dashboard/vet/appointments" className="text-xs text-sky-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {todayAppts.map(appt => (
              <div key={appt.id} className="flex items-center gap-3 p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                  {appt.type === "telemedicine" ? <Video className="w-4 h-4 text-sky-500" /> : <Calendar className="w-4 h-4 text-sky-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading truncate">{appt.pet}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{appt.owner} · {appt.time} · {formatCurrency(appt.fee)}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg capitalize ${statusColors[appt.status]}`}>
                  {appt.status === "video" ? "Video Call" : appt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Recent Patients</h3>
            <Link to="/dashboard/vet/patients" className="text-xs text-sky-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentPatients.map(pt => (
              <div key={pt.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors cursor-pointer">
                <img src={pt.img} alt={pt.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading">{pt.name}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{pt.breed} · {pt.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-light-muted dark:text-dark-muted">{pt.lastVisit}</p>
                  <span className={`text-xs font-semibold ${pt.condition === "Healthy" ? "text-green-500" : "text-amber-500"}`}>{pt.condition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "New Prescription", icon: Pill, href: "/dashboard/vet/prescriptions", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
          { label: "Add Medical Record", icon: FileText, href: "/dashboard/vet/records", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
          { label: "Start Consultation", icon: Video, href: "/dashboard/vet/consultations", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
          { label: "View Analytics", icon: Activity, href: "/dashboard/vet/analytics", color: "bg-orange-500/10 text-brand-orange" },
        ].map(action => (
          <Link key={action.label} to={action.href} className="card-base p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5 group">
            <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-light-text dark:text-dark-body">{action.label}</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
