import { useState } from "react";
import { TrendingUp, Plus, Scale, Calendar, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets, chartDataMonthly } from "@/lib/mockData";
import toast from "react-hot-toast";

const growthData = {
  Max: [
    { month: "Jan", weight: 26.5, height: 57 },
    { month: "Feb", weight: 27.0, height: 57.5 },
    { month: "Mar", weight: 27.3, height: 58 },
    { month: "Apr", weight: 27.8, height: 58 },
    { month: "May", weight: 28.0, height: 58.5 },
    { month: "Jun", weight: 28.2, height: 58.5 },
    { month: "Jul", weight: 27.9, height: 58.5 },
    { month: "Aug", weight: 28.1, height: 58.5 },
    { month: "Sep", weight: 28.0, height: 58.5 },
    { month: "Oct", weight: 27.8, height: 58.5 },
    { month: "Nov", weight: 27.5, height: 58.5 },
    { month: "Dec", weight: 28.0, height: 58.5 },
  ],
  Luna: [
    { month: "Jan", weight: 3.8, height: 30 },
    { month: "Feb", weight: 3.9, height: 30 },
    { month: "Mar", weight: 4.0, height: 30 },
    { month: "Apr", weight: 4.0, height: 30 },
    { month: "May", weight: 4.1, height: 30 },
    { month: "Jun", weight: 4.0, height: 30 },
    { month: "Jul", weight: 4.0, height: 30 },
    { month: "Aug", weight: 4.1, height: 30 },
    { month: "Sep", weight: 4.0, height: 30 },
    { month: "Oct", weight: 4.0, height: 30 },
    { month: "Nov", weight: 3.9, height: 30 },
    { month: "Dec", weight: 4.0, height: 30 },
  ],
};

const idealRanges: Record<string, { minWeight: number; maxWeight: number; unit: string }> = {
  Max: { minWeight: 25, maxWeight: 34, unit: "kg" },
  Luna: { minWeight: 3.5, maxWeight: 5.5, unit: "kg" },
  Tweety: { minWeight: 0.015, maxWeight: 0.025, unit: "kg" },
};

export default function GrowthTracking() {
  const [selectedPet, setSelectedPet] = useState("Max");

  const data = growthData[selectedPet as keyof typeof growthData] || growthData.Max;
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  const weightChange = current ? current.weight - (previous?.weight || current.weight) : 0;
  const range = idealRanges[selectedPet];
  const isHealthy = range && current ? current.weight >= range.minWeight && current.weight <= range.maxWeight : true;

  return (
    <DashboardLayout title="Growth Tracking">
      {/* Pet Selector */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {mockPets.map(p => (
          <button key={p.name} onClick={() => setSelectedPet(p.name)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedPet === p.name ? "bg-brand-orange text-white shadow-orange" : "card-base text-light-text dark:text-dark-body hover:border-brand-orange"}`}>
            <img src={p.image} alt={p.name} className="w-6 h-6 rounded-lg object-cover" />
            {p.name}
          </button>
        ))}
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Current Weight", value: `${current?.weight || "N/A"} kg`, icon: Scale, color: "text-brand-orange" },
          { label: "Weight Change", value: `${weightChange >= 0 ? "+" : ""}${weightChange.toFixed(1)} kg`, icon: weightChange >= 0 ? ArrowUp : ArrowDown, color: weightChange >= 0 ? "text-green-500" : "text-red-500" },
          { label: "Health Status", value: isHealthy ? "Healthy" : "Monitor", icon: TrendingUp, color: isHealthy ? "text-green-500" : "text-amber-500" },
          { label: "Ideal Range", value: range ? `${range.minWeight}–${range.maxWeight} ${range.unit}` : "N/A", icon: Minus, color: "text-brand-blue" },
        ].map(s => (
          <div key={s.label} className="card-base p-4 text-center">
            <s.icon className={`w-8 h-8 mx-auto mb-2 ${s.color}`} />
            <p className={`font-poppins font-bold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Weight Chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{selectedPet}'s Weight Trend (2024)</h3>
            <button onClick={() => toast.success("Weight entry added!")}
              className="flex items-center gap-1 text-xs text-brand-orange font-semibold hover:underline">
              <Plus className="w-3 h-3" /> Add Entry
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="kg" />
              <Tooltip formatter={(v: number) => [`${v} kg`, "Weight"]} />
              <Area type="monotone" dataKey="weight" stroke="#F97316" strokeWidth={2} fill="url(#growthGrad)" dot={{ r: 3, fill: "#F97316" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-5">{selectedPet}'s Weight vs. Ideal Range</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="kg" />
              <Tooltip formatter={(v: number) => [`${v} kg`, ""]} />
              <Bar dataKey="weight" fill="#F97316" radius={[4, 4, 0, 0]} name="Weight" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Log Table */}
      <div className="card-base overflow-hidden">
        <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Weight History — {selectedPet}</h3>
          <button onClick={() => toast.success("New weight entry logged!")} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-semibold rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> Log Weight
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wide">Month</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wide">Weight</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wide">Change</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slice().reverse().map((entry, i, arr) => {
                const prev = arr[i + 1];
                const change = prev ? entry.weight - prev.weight : 0;
                const healthy = range && entry.weight >= range.minWeight && entry.weight <= range.maxWeight;
                return (
                  <tr key={entry.month} className="border-b border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover">
                    <td className="px-5 py-3 font-medium text-light-text dark:text-dark-heading">{entry.month}</td>
                    <td className="px-5 py-3 text-light-text dark:text-dark-body">{entry.weight} kg</td>
                    <td className="px-5 py-3">
                      {prev ? (
                        <span className={`flex items-center gap-1 ${change > 0 ? "text-amber-500" : change < 0 ? "text-red-400" : "text-green-500"}`}>
                          {change > 0 ? <ArrowUp className="w-3 h-3" /> : change < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {Math.abs(change).toFixed(1)} kg
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${healthy ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                        {healthy ? "Healthy" : "Monitor"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
