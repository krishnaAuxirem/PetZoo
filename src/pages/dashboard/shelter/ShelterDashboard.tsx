import { Link } from "react-router-dom";
import { PawPrint, Heart, Users, TrendingUp, FileText, AlertCircle, CheckCircle, Clock, Home, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { mockAdoptionPets } from "@/lib/mockData";

const monthlyAdoptions = [
  { month: "Jul", adoptions: 12, applications: 28, rescues: 18 },
  { month: "Aug", adoptions: 15, applications: 33, rescues: 21 },
  { month: "Sep", adoptions: 14, applications: 30, rescues: 19 },
  { month: "Oct", adoptions: 17, applications: 38, rescues: 24 },
  { month: "Nov", adoptions: 16, applications: 35, rescues: 22 },
  { month: "Dec", adoptions: 18, applications: 42, rescues: 27 },
];

const recentApplications = [
  { applicant: "Jennifer Walsh", pet: "Buddy (Lab Mix)", status: "Review Needed", time: "2h ago", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", location: "New York, NY" },
  { applicant: "Marcus Thompson", pet: "Mittens (Cat)", status: "In Review", time: "5h ago", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", location: "LA, CA" },
  { applicant: "Emma Rodriguez", pet: "Charlie (Beagle)", status: "Approved", time: "Yesterday", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", location: "Chicago, IL" },
  { applicant: "David Kim", pet: "Polly (Parrot)", status: "Background Check", time: "2 days ago", statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", location: "Miami, FL" },
  { applicant: "Sarah Foster", pet: "Snowball (Rabbit)", status: "Approved", time: "2 days ago", statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", location: "Seattle, WA" },
];

const fosterFamilies = [
  { name: "The Johnsons", pets: 2, since: "Jan 2024", status: "Active" },
  { name: "Maria Santos", pets: 1, since: "Mar 2024", status: "Active" },
  { name: "The Chen Family", pets: 3, since: "Feb 2024", status: "Active" },
  { name: "David Park", pets: 1, since: "Apr 2024", status: "On Break" },
];

const speciesBreakdown = [
  { species: "Dogs", count: 18, available: 14, img: "🐕" },
  { species: "Cats", count: 16, available: 13, img: "🐈" },
  { species: "Birds", count: 7, available: 6, img: "🦜" },
  { species: "Rabbits", count: 4, available: 4, img: "🐇" },
  { species: "Others", count: 2, available: 2, img: "🐾" },
];

export default function ShelterDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Shelter Dashboard">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-transparent border border-pink-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">
              Welcome, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-light-muted dark:text-dark-muted mt-1">
              <strong className="text-amber-500">23 pending applications</strong> need review · <strong className="text-pink-500">47 pets</strong> awaiting their forever home
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/shelter/applications" className="px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Review Applications
            </Link>
            <Link to="/dashboard/shelter/listings" className="px-4 py-2.5 border border-pink-500/30 text-pink-500 hover:bg-pink-500/10 font-semibold rounded-xl text-sm transition-colors">
              Add Pet Listing
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Available Pets" value="47" change="+5 new rescues" trend="up" icon={PawPrint} color="text-pink-500" bgColor="bg-pink-100 dark:bg-pink-900/20" />
        <StatCard title="Pending Applications" value="23" change="Needs review" trend="down" icon={FileText} color="text-amber-500" bgColor="bg-amber-100 dark:bg-amber-900/20" />
        <StatCard title="Adoptions This Month" value="18" change="+6 from last month" trend="up" icon={Heart} color="text-brand-green" bgColor="bg-brand-green/10" />
        <StatCard title="Foster Families" value="34" change="Active fosters" trend="up" icon={Users} color="text-brand-blue" bgColor="bg-brand-blue/10" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Adoptions Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Adoptions & Applications (6 Months)</h3>
            <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +50% success rate
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyAdoptions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="applications" fill="#F9A8D4" radius={[4, 4, 0, 0]} name="Applications" />
              <Bar dataKey="adoptions" fill="#EC4899" radius={[4, 4, 0, 0]} name="Adoptions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Species Breakdown */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Pets by Species</h3>
          <div className="space-y-3">
            {speciesBreakdown.map(s => (
              <div key={s.species} className="flex items-center gap-3">
                <span className="text-xl">{s.img}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-text dark:text-dark-body">{s.species}</span>
                    <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{s.available}/{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-light-hover dark:bg-dark-hover rounded-full">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: `${(s.available / s.count) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-light-hover dark:bg-dark-hover rounded-xl">
              <p className="font-poppins font-bold text-xl text-pink-500">47</p>
              <p className="text-xs text-light-muted dark:text-dark-muted">Available</p>
            </div>
            <div className="text-center p-3 bg-light-hover dark:bg-dark-hover rounded-xl">
              <p className="font-poppins font-bold text-xl text-amber-500">5</p>
              <p className="text-xs text-light-muted dark:text-dark-muted">Pending Adoption</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Recent Applications</h3>
            <Link to="/dashboard/shelter/applications" className="text-xs text-pink-500 font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentApplications.map((app, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0 text-pink-500 font-bold text-sm">
                  {app.applicant[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading truncate">{app.applicant}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{app.pet} · {app.location}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${app.statusColor}`}>{app.status}</span>
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">{app.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foster Families */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Foster Families</h3>
            <Link to="/dashboard/shelter/foster" className="text-xs text-pink-500 font-semibold hover:underline">Manage Fosters</Link>
          </div>
          <div className="space-y-3">
            {fosterFamilies.map((family, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-light-border dark:border-dark-border">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-sm">
                  {family.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading">{family.name}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{family.pets} pet{family.pets > 1 ? "s" : ""} · Since {family.since}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${family.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                  {family.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/dashboard/shelter/foster" className="mt-3 flex items-center justify-center gap-1 text-sm text-pink-500 font-semibold hover:underline">
            Recruit More Fosters →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
