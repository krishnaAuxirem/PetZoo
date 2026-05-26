import { useState } from "react";
import { Syringe, CheckCircle, AlertCircle, Clock, Plus, Calendar, Shield } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets } from "@/lib/mockData";
import toast from "react-hot-toast";

const vaccinationRecords = [
  {
    pet: "Max",
    vaccines: [
      { name: "Rabies", lastDate: "Oct 15, 2024", nextDate: "Oct 15, 2025", status: "current", vet: "Dr. Sarah Johnson" },
      { name: "DHPP (Distemper/Parvovirus)", lastDate: "Apr 20, 2024", nextDate: "Apr 20, 2025", status: "current", vet: "Dr. Sarah Johnson" },
      { name: "Bordetella", lastDate: "Jul 10, 2024", nextDate: "Jul 10, 2025", status: "current", vet: "Dr. Emily Davis" },
      { name: "Leptospirosis", lastDate: "Mar 05, 2024", nextDate: "Mar 05, 2025", status: "due_soon", vet: "Dr. Sarah Johnson" },
      { name: "Lyme Disease", lastDate: "Jun 15, 2023", nextDate: "Jun 15, 2024", status: "overdue", vet: "Dr. Sarah Johnson" },
    ]
  },
  {
    pet: "Luna",
    vaccines: [
      { name: "Rabies", lastDate: "Dec 20, 2024", nextDate: "Dec 20, 2025", status: "current", vet: "Dr. Michael Chen" },
      { name: "FVRCP (Feline 3-in-1)", lastDate: "Aug 15, 2024", nextDate: "Aug 15, 2025", status: "current", vet: "Dr. Emily Davis" },
      { name: "FeLV (Feline Leukemia)", lastDate: "Feb 10, 2024", nextDate: "Feb 10, 2025", status: "due_soon", vet: "Dr. Michael Chen" },
    ]
  },
  {
    pet: "Tweety",
    vaccines: [
      { name: "Polyomavirus", lastDate: "N/A", nextDate: "Consult Vet", status: "not_done", vet: "-" },
    ]
  }
];

const statusConfig = {
  current: { label: "Up to Date", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle, iconColor: "text-green-500" },
  due_soon: { label: "Due Soon", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock, iconColor: "text-amber-500" },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle, iconColor: "text-red-500" },
  not_done: { label: "Not Done", color: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400", icon: AlertCircle, iconColor: "text-gray-400" },
};

export default function Vaccinations() {
  const [selectedPet, setSelectedPet] = useState("All");

  const allDueSoon = vaccinationRecords.flatMap(r => r.vaccines.filter(v => v.status === "due_soon" || v.status === "overdue").map(v => ({ ...v, pet: r.pet })));

  return (
    <DashboardLayout title="Vaccination Records">
      {/* Alert Banner */}
      {allDueSoon.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-amber-700 dark:text-amber-400">Vaccination Reminders</p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
              {allDueSoon.length} vaccine{allDueSoon.length > 1 ? "s" : ""} need attention: {allDueSoon.map(v => `${v.name} (${v.pet})`).join(", ")}
            </p>
          </div>
          <button onClick={() => toast.info("Opening vet booking...")} className="ml-auto flex-shrink-0 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-lg">
            Book Now
          </button>
        </div>
      )}

      {/* Pet Filter */}
      <div className="flex gap-2 mb-6">
        {["All", ...mockPets.map(p => p.name)].map(name => (
          <button key={name} onClick={() => setSelectedPet(name)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedPet === name ? "bg-brand-orange text-white" : "card-base text-light-text dark:text-dark-body hover:border-brand-orange"}`}>
            {name}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Up to Date", value: vaccinationRecords.flatMap(r => r.vaccines).filter(v => v.status === "current").length, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20" },
          { label: "Due Soon", value: vaccinationRecords.flatMap(r => r.vaccines).filter(v => v.status === "due_soon").length, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/20" },
          { label: "Overdue", value: vaccinationRecords.flatMap(r => r.vaccines).filter(v => v.status === "overdue").length, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20" },
          { label: "Total Vaccines", value: vaccinationRecords.flatMap(r => r.vaccines).length, color: "text-brand-blue", bg: "bg-brand-blue/10" },
        ].map(s => (
          <div key={s.label} className="card-base p-4 text-center">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Shield className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className={`font-poppins font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-xs text-light-muted dark:text-dark-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Records by Pet */}
      <div className="space-y-6">
        {vaccinationRecords.filter(r => selectedPet === "All" || r.pet === selectedPet).map(record => (
          <div key={record.pet} className="card-base overflow-hidden">
            <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
              <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading flex items-center gap-2">
                <Syringe className="w-4 h-4 text-brand-orange" /> {record.pet}'s Vaccines
              </h3>
              <button onClick={() => toast.success("New vaccination record added!")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-orange border border-brand-orange/30 rounded-lg hover:bg-brand-orange/10 transition-colors">
                <Plus className="w-3 h-3" /> Add Vaccine
              </button>
            </div>
            <div className="divide-y divide-light-border dark:divide-dark-border">
              {record.vaccines.map((v, i) => {
                const cfg = statusConfig[v.status as keyof typeof statusConfig];
                const StatusIcon = cfg.icon;
                return (
                  <div key={i} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-light-hover dark:bg-dark-hover flex items-center justify-center flex-shrink-0">
                      <StatusIcon className={`w-5 h-5 ${cfg.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{v.name}</p>
                      <p className="text-xs text-light-muted dark:text-dark-muted">Last: {v.lastDate} · By: {v.vet}</p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-xs text-light-muted dark:text-dark-muted">Next Due</p>
                      <p className="text-sm font-medium text-light-text dark:text-dark-heading">{v.nextDate}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${cfg.color}`}>{cfg.label}</span>
                    {(v.status === "due_soon" || v.status === "overdue") && (
                      <button onClick={() => toast.info("Redirecting to vet booking...")}
                        className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:underline whitespace-nowrap">
                        <Calendar className="w-3 h-3" /> Book
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
