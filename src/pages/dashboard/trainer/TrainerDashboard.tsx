import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, TrendingUp, BookOpen, CheckCircle, Video, BarChart3, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
  { month: "Jul", students: 32, sessions: 14, earnings: 4200 },
  { month: "Aug", students: 36, sessions: 16, earnings: 4800 },
  { month: "Sep", students: 38, sessions: 18, earnings: 5100 },
  { month: "Oct", students: 40, sessions: 20, earnings: 5500 },
  { month: "Nov", students: 39, sessions: 19, earnings: 5200 },
  { month: "Dec", students: 42, sessions: 18, earnings: 5800 },
];

const programs = [
  { name: "Basic Obedience Bootcamp", level: "Beginner", students: 12, sessions: 8, progress: 75, nextSession: "Today 10:00 AM", color: "bg-green-500" },
  { name: "Advanced Agility Training", level: "Advanced", students: 4, sessions: 16, progress: 50, nextSession: "Today 2:00 PM", color: "bg-red-500" },
  { name: "Puppy Socialization Class", level: "Beginner", students: 18, sessions: 6, progress: 33, nextSession: "Tomorrow 9:00 AM", color: "bg-sky-500" },
  { name: "Behavior Correction Program", level: "Intermediate", students: 8, sessions: 12, progress: 60, nextSession: "Thu 11:00 AM", color: "bg-amber-500" },
];

const upcomingSessions = [
  { program: "Basic Obedience Bootcamp", time: "Today 10:00 AM", students: 12, venue: "Studio A", status: "Starting Soon" },
  { program: "Advanced Agility Training", time: "Today 2:00 PM", students: 4, venue: "Outdoor Track", status: "Confirmed" },
  { program: "Puppy Socialization Class", time: "Tomorrow 9:00 AM", students: 18, venue: "Studio B", status: "Registered" },
  { program: "Virtual Session - Rex", time: "Tomorrow 3:00 PM", students: 1, venue: "Online", status: "Video Call" },
];

const studentProgress = [
  { name: "Max (Alex T.)", program: "Basic Obedience", progress: 80, milestone: "Sit & Stay mastered" },
  { name: "Buddy (Sarah M.)", program: "Agility", progress: 55, milestone: "Jumps completed" },
  { name: "Luna (David K.)", program: "Behavior", progress: 70, milestone: "No more barking" },
  { name: "Charlie (Emma R.)", program: "Puppy Class", progress: 40, milestone: "Socialized with 5 dogs" },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function TrainerDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Trainer Dashboard">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">
              Hey {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-light-muted dark:text-dark-muted mt-1">
              <strong className="text-amber-500">42 active students</strong> across 4 programs · <strong className="text-brand-orange">2 sessions today</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/trainer/sessions" className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-colors">
              Today's Sessions
            </Link>
            <Link to="/dashboard/trainer/programs" className="px-4 py-2.5 border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Active Students" value="42" change="+5 this week" trend="up" icon={Users} color="text-amber-500" bgColor="bg-amber-100 dark:bg-amber-900/20" />
        <StatCard title="Sessions This Week" value="18" change="3 remaining" trend="neutral" icon={Calendar} color="text-brand-blue" bgColor="bg-brand-blue/10" />
        <StatCard title="Monthly Earnings" value={formatCurrency(5800)} change="+18%" trend="up" icon={DollarSign} color="text-brand-orange" bgColor="bg-brand-orange/10" />
        <StatCard title="Avg Rating" value="4.9★" change="127 reviews" trend="up" icon={Star} color="text-yellow-500" bgColor="bg-yellow-100 dark:bg-yellow-900/20" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Monthly Earnings & Students</h3>
            <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18% MoM
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="earnings" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Earnings ($)" />
              <Bar yAxisId="right" dataKey="students" fill="#0EA5E9" radius={[4, 4, 0, 0]} name="Students" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Programs */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Active Programs</h3>
          <div className="space-y-3">
            {programs.map(prog => (
              <div key={prog.name} className="p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="flex items-start justify-between mb-1.5">
                  <p className="text-xs font-semibold text-light-text dark:text-dark-heading leading-tight flex-1 mr-2">{prog.name}</p>
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${levelColors[prog.level]}`}>{prog.level}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted mb-2">
                  <span>{prog.students} students</span>
                  <span>{prog.progress}%</span>
                </div>
                <div className="h-1.5 bg-white dark:bg-dark-bg rounded-full">
                  <div className={`h-full rounded-full ${prog.color}`} style={{ width: `${prog.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Upcoming Sessions</h3>
            <Link to="/dashboard/trainer/sessions" className="text-xs text-amber-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  {s.venue === "Online" ? <Video className="w-4 h-4 text-amber-500" /> : <BookOpen className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading truncate">{s.program}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{s.time} · {s.students} students · {s.venue}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${s.status === "Starting Soon" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : s.status === "Video Call" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Progress */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Student Progress</h3>
            <Link to="/dashboard/trainer/progress" className="text-xs text-amber-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {studentProgress.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-semibold text-light-text dark:text-dark-heading">{s.name}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">{s.program} · {s.milestone}</p>
                  </div>
                  <span className="text-sm font-bold text-amber-500">{s.progress}%</span>
                </div>
                <div className="h-2 bg-light-hover dark:bg-dark-hover rounded-full">
                  <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
