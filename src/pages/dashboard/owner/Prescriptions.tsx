import { useState } from "react";
import { Pill, FileText, Download, AlertCircle, CheckCircle, Calendar, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

const prescriptions = [
  {
    id: "rx1", medication: "Apoquel (Oclacitinib)", dosage: "16mg", instructions: "1 tablet every 24 hours with food.", petName: "Max", vetName: "Dr. Sarah Johnson", clinic: "PetCare Plus Clinic",
    prescribedDate: "2024-12-15", expiryDate: "2025-01-15", refillsRemaining: 2, status: "active",
    sideEffects: ["Vomiting", "Diarrhea", "Increased infections"],
  },
  {
    id: "rx2", medication: "Theophylline", dosage: "50mg", instructions: "1 capsule twice daily, 8AM and 8PM.", petName: "Luna", vetName: "Dr. Michael Chen", clinic: "City Animal Hospital",
    prescribedDate: "2024-10-01", expiryDate: "2025-04-01", refillsRemaining: 4, status: "active",
    sideEffects: ["Vomiting", "Restlessness", "Increased thirst"],
  },
  {
    id: "rx3", medication: "Prednisolone", dosage: "5mg", instructions: "0.5 tablet every 48 hours with food.", petName: "Luna", vetName: "Dr. Emily Davis", clinic: "Cat Wellness Center",
    prescribedDate: "2024-11-20", expiryDate: "2025-01-20", refillsRemaining: 1, status: "active",
    sideEffects: ["Increased hunger", "Increased thirst", "Weight gain"],
  },
  {
    id: "rx4", medication: "Amoxicillin", dosage: "250mg", instructions: "1 tablet every 12 hours for 10 days. Complete full course.", petName: "Max", vetName: "Dr. Sarah Johnson", clinic: "PetCare Plus Clinic",
    prescribedDate: "2024-11-10", expiryDate: "2024-11-20", refillsRemaining: 0, status: "completed",
    sideEffects: ["Diarrhea", "Vomiting"],
  },
];

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400", icon: CheckCircle },
  expired: { label: "Expired", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
};

export default function Prescriptions() {
  const [filter, setFilter] = useState("All");
  const active = prescriptions.filter(p => p.status === "active");

  const filtered = prescriptions.filter(p => filter === "All" || p.petName === filter);

  return (
    <DashboardLayout title="Prescriptions">
      {/* Active Alert */}
      {active.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-brand-orange/5 border border-brand-orange/20 flex items-center gap-3">
          <Pill className="w-5 h-5 text-brand-orange flex-shrink-0" />
          <p className="text-sm text-light-text dark:text-dark-body"><strong className="text-brand-orange">{active.length} active prescriptions</strong> — remember to administer medications on schedule.</p>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["All", "Max", "Luna", "Tweety"].map(name => (
          <button key={name} onClick={() => setFilter(name)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === name ? "bg-brand-orange text-white" : "card-base text-light-text dark:text-dark-body hover:border-brand-orange"}`}>
            {name}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card-base p-4 text-center">
          <p className="font-poppins font-bold text-2xl text-green-500">{prescriptions.filter(p => p.status === "active").length}</p>
          <p className="text-xs text-light-muted dark:text-dark-muted">Active Prescriptions</p>
        </div>
        <div className="card-base p-4 text-center">
          <p className="font-poppins font-bold text-2xl text-amber-500">{prescriptions.filter(p => p.refillsRemaining === 1).length}</p>
          <p className="text-xs text-light-muted dark:text-dark-muted">Need Refill Soon</p>
        </div>
        <div className="card-base p-4 text-center">
          <p className="font-poppins font-bold text-2xl text-light-muted dark:text-dark-muted">{prescriptions.filter(p => p.status === "completed").length}</p>
          <p className="text-xs text-light-muted dark:text-dark-muted">Completed</p>
        </div>
      </div>

      {/* Prescription Cards */}
      <div className="space-y-4">
        {filtered.map(rx => {
          const cfg = statusConfig[rx.status as keyof typeof statusConfig];
          const StatusIcon = cfg.icon;
          return (
            <div key={rx.id} className="card-base overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{rx.medication}</h3>
                      <p className="text-sm text-light-muted dark:text-dark-muted">{rx.dosage} · {rx.petName}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3" /> {cfg.label}
                  </span>
                </div>
                <div className="bg-light-bg dark:bg-dark-bg rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-light-text dark:text-dark-heading mb-1">Instructions:</p>
                  <p className="text-sm text-light-muted dark:text-dark-muted">{rx.instructions}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
                  <div><p className="text-xs text-light-muted dark:text-dark-muted">Prescribed</p><p className="font-medium text-light-text dark:text-dark-heading">{formatDate(rx.prescribedDate)}</p></div>
                  <div><p className="text-xs text-light-muted dark:text-dark-muted">Expires</p><p className="font-medium text-light-text dark:text-dark-heading">{formatDate(rx.expiryDate)}</p></div>
                  <div><p className="text-xs text-light-muted dark:text-dark-muted">Prescribed by</p><p className="font-medium text-light-text dark:text-dark-heading">{rx.vetName}</p></div>
                  <div><p className="text-xs text-light-muted dark:text-dark-muted">Refills Left</p><p className={`font-semibold ${rx.refillsRemaining === 0 ? "text-red-500" : rx.refillsRemaining === 1 ? "text-amber-500" : "text-green-500"}`}>{rx.refillsRemaining}</p></div>
                </div>
                {rx.sideEffects.length > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl mb-4">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-400">Possible side effects: {rx.sideEffects.join(", ")}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => toast.success("Prescription downloaded!")} className="flex items-center gap-1.5 px-3 py-2 border border-light-border dark:border-dark-border rounded-xl text-xs font-medium text-light-text dark:text-dark-body hover:border-brand-orange hover:text-brand-orange transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                  {rx.refillsRemaining > 0 && rx.status === "active" && (
                    <button onClick={() => toast.success("Refill request sent to vet!")} className="flex items-center gap-1.5 px-3 py-2 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-xl hover:bg-brand-orange/20 transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Request Refill
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
