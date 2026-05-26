import { Link } from "react-router-dom";
import { Calendar, Users, DollarSign, Star, Scissors, CheckCircle, Clock, TrendingUp, MessageSquare } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
  { month: "Jul", bookings: 48, earnings: 2880, customers: 38 },
  { month: "Aug", bookings: 55, earnings: 3300, customers: 44 },
  { month: "Sep", bookings: 61, earnings: 3660, customers: 50 },
  { month: "Oct", bookings: 58, earnings: 3480, customers: 47 },
  { month: "Nov", bookings: 64, earnings: 3840, customers: 52 },
  { month: "Dec", bookings: 72, earnings: 4320, customers: 59 },
];

const todaySchedule = [
  { time: "9:00 AM", pet: "Max - Full Groom Package", owner: "Sarah M.", service: "Full Grooming", price: 65, status: "In Progress", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { time: "11:00 AM", pet: "Fluffy - Cat Spa", owner: "David K.", service: "Cat Spa Treatment", price: 55, status: "Confirmed", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { time: "1:00 PM", pet: "Rocky - Express Bath", owner: "Emma R.", service: "Express Bath", price: 35, status: "Confirmed", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { time: "2:30 PM", pet: "Bella - De-shedding", owner: "Marcus T.", service: "De-shedding Treatment", price: 45, status: "Pending", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { time: "4:00 PM", pet: "Luna - Nail Trim", owner: "Jennifer W.", service: "Nail Trim & Filing", price: 20, status: "Confirmed", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
];

const topServices = [
  { name: "Full Grooming Package", bookings: 87, revenue: 5655, pct: 35 },
  { name: "Cat Spa Treatment", bookings: 64, revenue: 3520, pct: 26 },
  { name: "Express Bath & Brush", bookings: 53, revenue: 1855, pct: 21 },
  { name: "De-shedding Treatment", bookings: 41, revenue: 1845, pct: 16 },
  { name: "Nail Trim & Filing", bookings: 28, revenue: 560, pct: 11 },
];

const recentReviews = [
  { name: "Sarah M.", rating: 5, comment: "Max looks absolutely gorgeous! Maria is so gentle and professional.", date: "2 days ago" },
  { name: "David K.", rating: 5, comment: "Fluffy was so relaxed after the cat spa. Incredible service!", date: "3 days ago" },
  { name: "Emma R.", rating: 4, comment: "Great job on Rocky's bath. Highly recommend!", date: "5 days ago" },
];

export default function GroomerDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Groomer Dashboard">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">
              Welcome, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-light-muted dark:text-dark-muted mt-1">
              You have <strong className="text-purple-500">5 bookings</strong> today · Earnings so far: <strong className="text-brand-orange">{formatCurrency(220)}</strong>
            </p>
          </div>
          <Link to="/dashboard/groomer/bookings" className="px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl text-sm transition-colors">
            Manage Bookings
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Today's Bookings" value="5" change="+1 from yesterday" trend="up" icon={Calendar} color="text-purple-500" bgColor="bg-purple-100 dark:bg-purple-900/20" />
        <StatCard title="Monthly Customers" value="187" change="+23 this month" trend="up" icon={Users} color="text-brand-green" bgColor="bg-brand-green/10" />
        <StatCard title="Monthly Earnings" value={formatCurrency(3840)} change="+12%" trend="up" icon={DollarSign} color="text-brand-orange" bgColor="bg-brand-orange/10" />
        <StatCard title="Avg Rating" value="4.8★" change="94 reviews" trend="up" icon={Star} color="text-yellow-500" bgColor="bg-yellow-100 dark:bg-yellow-900/20" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Monthly Earnings & Bookings</h3>
            <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% this month
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number, name: string) => [name === "earnings" ? formatCurrency(v) : v, name === "earnings" ? "Earnings" : "Bookings"]} />
              <Bar yAxisId="left" dataKey="earnings" fill="#A855F7" radius={[4, 4, 0, 0]} name="earnings" />
              <Bar yAxisId="right" dataKey="bookings" fill="#F97316" radius={[4, 4, 0, 0]} name="bookings" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Services */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Top Services</h3>
          <div className="space-y-3">
            {topServices.slice(0, 4).map(svc => (
              <div key={svc.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-light-text dark:text-dark-body truncate flex-1 mr-2">{svc.name}</span>
                  <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{svc.bookings}</span>
                </div>
                <div className="h-1.5 bg-light-hover dark:bg-dark-hover rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${svc.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
            <div className="text-center">
              <p className="font-poppins font-bold text-2xl text-purple-500">{formatCurrency(13435)}</p>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">Total Revenue (6 months)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Schedule */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Today's Schedule</h3>
            <Link to="/dashboard/groomer/calendar" className="text-xs text-purple-500 font-semibold hover:underline">Full Calendar</Link>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading truncate">{item.pet}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{item.owner} · {item.time} · {formatCurrency(item.price)}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${item.statusColor}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Recent Reviews</h3>
            <Link to="/dashboard/groomer/reviews" className="text-xs text-purple-500 font-semibold hover:underline">All Reviews</Link>
          </div>
          <div className="space-y-4">
            {recentReviews.map((review, i) => (
              <div key={i} className="p-3 rounded-xl border border-light-border dark:border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 font-bold text-xs">
                      {review.name[0]}
                    </div>
                    <span className="font-semibold text-sm text-light-text dark:text-dark-heading">{review.name}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-light-muted dark:text-dark-muted italic">"{review.comment}"</p>
                <p className="text-xs text-light-muted dark:text-dark-muted mt-1">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
