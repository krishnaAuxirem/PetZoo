import { useState } from "react";
import { Heart, AlertCircle, CheckCircle, Syringe, TrendingUp, FileText, Calendar, Plus, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets, chartDataMonthly } from "@/lib/mockData";
import toast from "react-hot-toast";

const healthEvents = [
  { date: "2024-12-28", event: "Annual Checkup (Max)", vet: "Dr. Sarah Johnson", result: "Healthy", type: "checkup" },
  { date: "2024-12-20", event: "Rabies Booster (Luna)", vet: "Dr. Michael Chen", result: "Completed", type: "vaccination" },
  { date: "2024-12-15", event: "Skin Irritation Consult (Max)", vet: "Dr. Sarah Johnson", result: "Prescribed Apoquel", type: "consultation" },
  { date: "2024-11-10", event: "Dental Cleaning (Max)", vet: "Dr. Emily Davis", result: "Good Dental Health", type: "procedure" },
  { date: "2024-10-05", event: "Deworming (Luna)", vet: "Dr. Michael Chen", result: "Completed", type: "treatment" },
];

const typeColors: Record<string, string> = {
  checkup: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  vaccination: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  consultation: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  procedure: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  treatment: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

const healthMetrics = [
  { pet: "Max", score: 92, weight: "28 kg", lastVaccine: "Oct 2024", nextVaccine: "Oct 2025", conditions: ["Wheat Allergy"], status: "Healthy" },
  { pet: "Luna", score: 78, weight: "4 kg", lastVaccine: "Dec 2024", nextVaccine: "Dec 2025", conditions: ["Asthma"], status: "Managed" },
  { pet: "Tweety", score: 95, weight: "0.02 kg", lastVaccine: "N/A", nextVaccine: "N/A", conditions: [], status: "Healthy" },
];

export default function HealthRecords() {
  const [selectedPet, setSelectedPet] = useState("All");

  return (
    <DashboardLayout title="Health Records">
      {/* Pet Selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", ...mockPets.map(p => p.name)].map(name => (
          <button key={name} onClick={() => setSelectedPet(name)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedPet === name ? "bg-brand-orange text-white" : "bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-body hover:border-brand-orange"}`}>
            {name}
          </button>
        ))}
        <button onClick={() => toast.success("Report generated successfully!")}
          className="ml-auto px-4 py-2 rounded-xl text-sm font-medium border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> Export Records
        </button>
      </div>

      {/* Health Score Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {healthMetrics.filter(m => selectedPet === "All" || m.pet === selectedPet).map(m => (
          <div key={m.pet} className="card-base p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading">{m.pet}</h3>
                <p className="text-sm text-light-muted dark:text-dark-muted">{m.weight}</p>
              </div>
              <div className="text-right">
                <p className={`font-poppins font-extrabold text-3xl ${m.score >= 90 ? "text-green-500" : m.score >= 70 ? "text-amber-500" : "text-red-500"}`}>{m.score}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted">Health Score</p>
              </div>
            </div>
            <div className="h-2 bg-light-hover dark:bg-dark-hover rounded-full mb-4">
              <div className={`h-full rounded-full ${m.score >= 90 ? "bg-green-500" : m.score >= 70 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${m.score}%` }} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-light-muted dark:text-dark-muted">Last Vaccine</span>
                <span className="font-medium text-light-text dark:text-dark-heading">{m.lastVaccine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-muted dark:text-dark-muted">Next Vaccine</span>
                <span className="font-medium text-light-text dark:text-dark-heading">{m.nextVaccine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-muted dark:text-dark-muted">Status</span>
                <span className={`font-semibold ${m.status === "Healthy" ? "text-green-500" : "text-amber-500"}`}>{m.status}</span>
              </div>
              {m.conditions.length > 0 && (
                <div className="flex gap-1 flex-wrap mt-2">
                  {m.conditions.map(c => (
                    <span key={c} className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg">{c}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weight Chart */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-5">Max's Weight Trend (2024)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartDataMonthly}>
              <defs>
                <linearGradient id="healthWeightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[25, 30]} unit="kg" />
              <Tooltip formatter={(v: number) => [`${v} kg`, "Weight"]} />
              <Area type="monotone" dataKey="weight" stroke="#F97316" strokeWidth={2} fill="url(#healthWeightGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment History */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-5">Vet Visits (2024)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartDataMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [v, "Appointments"]} />
              <Bar dataKey="appointments" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="card-base p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Health History Timeline</h3>
          <button onClick={() => toast.success("New health record added!")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-semibold rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Record
          </button>
        </div>
        <div className="space-y-4">
          {healthEvents.map((e, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-brand-orange mt-1 flex-shrink-0" />
                {i < healthEvents.length - 1 && <div className="w-0.5 bg-light-border dark:bg-dark-border flex-1 mt-1" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{e.event}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">{e.vet} · {e.date}</p>
                    <p className="text-xs text-brand-green mt-1">Result: {e.result}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg capitalize flex-shrink-0 ${typeColors[e.type]}`}>{e.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
