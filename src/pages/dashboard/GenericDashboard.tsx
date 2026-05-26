import { Link } from "react-router-dom";
import { BarChart3, Calendar, Users, DollarSign, TrendingUp, Star, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { vetRevenueData } from "@/lib/mockData";

const roleConfig: Record<string, {
  stats: { title: string; value: string; change: string; trend: "up"|"down"|"neutral"; icon: React.ElementType; color: string; bgColor: string }[];
  chartTitle: string;
  recentTitle: string;
  recentItems: { label: string; sub: string; badge: string; badgeColor: string }[];
}> = {
  vet: {
    stats: [
      { title: "Today's Appointments", value: "8", change: "+2 from yesterday", trend: "up", icon: Calendar, color: "text-brand-blue", bgColor: "bg-brand-blue/10" },
      { title: "Total Patients", value: "1,284", change: "+47 this month", trend: "up", icon: Users, color: "text-brand-green", bgColor: "bg-brand-green/10" },
      { title: "Monthly Revenue", value: "$6,200", change: "+8.3%", trend: "up", icon: DollarSign, color: "text-brand-orange", bgColor: "bg-brand-orange/10" },
      { title: "Avg Rating", value: "4.9★", change: "312 reviews", trend: "up", icon: Star, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" },
    ],
    chartTitle: "Monthly Revenue & Patients",
    recentTitle: "Today's Appointments",
    recentItems: [
      { label: "Max (Golden Retriever)", sub: "Annual Checkup · 10:00 AM", badge: "Confirmed", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "Luna (Persian Cat)", sub: "Vaccination · 11:30 AM", badge: "Confirmed", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "Charlie (Beagle)", sub: "Skin Consultation · 2:00 PM", badge: "Pending", badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
      { label: "Birdie (Parrot)", sub: "Telemedicine · 3:30 PM", badge: "Video Call", badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    ],
  },
  groomer: {
    stats: [
      { title: "Today's Bookings", value: "6", change: "+1 from yesterday", trend: "up", icon: Calendar, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
      { title: "Monthly Customers", value: "187", change: "+23 this month", trend: "up", icon: Users, color: "text-brand-green", bgColor: "bg-brand-green/10" },
      { title: "Monthly Earnings", value: "$3,840", change: "+12%", trend: "up", icon: DollarSign, color: "text-brand-orange", bgColor: "bg-brand-orange/10" },
      { title: "Avg Rating", value: "4.8★", change: "94 reviews", trend: "up", icon: Star, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" },
    ],
    chartTitle: "Monthly Bookings & Earnings",
    recentTitle: "Today's Schedule",
    recentItems: [
      { label: "Max - Full Groom Package", sub: "Sarah M. · 9:00 AM · $65", badge: "In Progress", badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
      { label: "Fluffy - Cat Spa", sub: "David K. · 11:00 AM · $55", badge: "Confirmed", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "Rocky - Express Bath", sub: "Emma R. · 1:00 PM · $35", badge: "Confirmed", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
    ],
  },
  trainer: {
    stats: [
      { title: "Active Students", value: "42", change: "+5 this week", trend: "up", icon: Users, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
      { title: "Sessions This Week", value: "18", change: "3 remaining", trend: "neutral", icon: Calendar, color: "text-brand-blue", bgColor: "bg-brand-blue/10" },
      { title: "Monthly Earnings", value: "$5,200", change: "+18%", trend: "up", icon: DollarSign, color: "text-brand-orange", bgColor: "bg-brand-orange/10" },
      { title: "Avg Rating", value: "4.9★", change: "127 reviews", trend: "up", icon: Star, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" },
    ],
    chartTitle: "Monthly Sessions & Students",
    recentTitle: "Upcoming Sessions",
    recentItems: [
      { label: "Basic Obedience Bootcamp", sub: "8 students · Today 10:00 AM", badge: "Starting Soon", badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
      { label: "Advanced Agility", sub: "4 students · Today 2:00 PM", badge: "Confirmed", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "Puppy Socialization", sub: "12 students · Tomorrow 9:00 AM", badge: "Registered", badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    ],
  },
  vendor: {
    stats: [
      { title: "Total Products", value: "284", change: "+12 new", trend: "up", icon: Activity, color: "text-brand-orange", bgColor: "bg-brand-orange/10" },
      { title: "Pending Orders", value: "47", change: "Needs action", trend: "down", icon: Calendar, color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/20" },
      { title: "Monthly Revenue", value: "$28,400", change: "+22%", trend: "up", icon: DollarSign, color: "text-brand-green", bgColor: "bg-brand-green/10" },
      { title: "Total Customers", value: "1,847", change: "+134 this month", trend: "up", icon: Users, color: "text-brand-blue", bgColor: "bg-brand-blue/10" },
    ],
    chartTitle: "Monthly Revenue & Orders",
    recentTitle: "Recent Orders",
    recentItems: [
      { label: "Royal Canin Adult x2", sub: "Order #ORD-2024-1891 · $91.98", badge: "Processing", badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
      { label: "Pet Camera x1", sub: "Order #ORD-2024-1890 · $79.99", badge: "Shipped", badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
      { label: "Cat Tree Tower x1", sub: "Order #ORD-2024-1889 · $89.99", badge: "Delivered", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
    ],
  },
  shelter: {
    stats: [
      { title: "Available Pets", value: "47", change: "+5 new rescues", trend: "up", icon: Activity, color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/20" },
      { title: "Pending Applications", value: "23", change: "Needs review", trend: "down", icon: Calendar, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
      { title: "Adoptions This Month", value: "18", change: "+6 from last month", trend: "up", icon: TrendingUp, color: "text-brand-green", bgColor: "bg-brand-green/10" },
      { title: "Foster Families", value: "34", change: "Active fosters", trend: "up", icon: Users, color: "text-brand-blue", bgColor: "bg-brand-blue/10" },
    ],
    chartTitle: "Monthly Adoptions",
    recentTitle: "Recent Applications",
    recentItems: [
      { label: "Jennifer Walsh → Buddy (Lab Mix)", sub: "Applied 2h ago · New York, NY", badge: "Review Needed", badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
      { label: "Marcus T. → Mittens (Cat)", sub: "Applied 5h ago · LA, CA", badge: "In Review", badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
      { label: "Emma R. → Charlie (Beagle)", sub: "Applied yesterday · Chicago, IL", badge: "Approved", badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
    ],
  },
};

export default function GenericDashboard() {
  const { user } = useAuth();
  const role = user?.role || "vet";
  const config = roleConfig[role];

  if (!config) return <DashboardLayout><div className="text-center py-20 text-light-muted dark:text-dark-muted">Dashboard not configured</div></DashboardLayout>;

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-brand-orange/10 via-brand-orange/5 to-transparent border border-brand-orange/20">
        <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading capitalize">Welcome back, {user?.name?.split(" ")[0]}! 👋</h2>
        <p className="text-light-muted dark:text-dark-muted text-sm mt-1">Here's your {role} dashboard overview for today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {config.stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-5">{config.chartTitle}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vetRevenueData.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#F97316" radius={[4,4,0,0]} name="Revenue" />
              <Bar dataKey="consultations" fill="#0EA5E9" radius={[4,4,0,0]} name="Consultations" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">{config.recentTitle}</h3>
          <div className="space-y-3">
            {config.recentItems.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading leading-tight">{item.label}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${item.badgeColor}`}>{item.badge}</span>
                </div>
                <p className="text-xs text-light-muted dark:text-dark-muted">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
