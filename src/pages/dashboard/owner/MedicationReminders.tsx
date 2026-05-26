import { useState } from "react";
import { Bell, Clock, Pill, Plus, Check, Trash2, Edit, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets } from "@/lib/mockData";
import toast from "react-hot-toast";

interface MedicationReminder {
  id: string;
  petName: string;
  medication: string;
  dosage: string;
  frequency: string;
  time: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  taken: boolean;
}

const initialReminders: MedicationReminder[] = [
  { id: "m1", petName: "Max", medication: "Apoquel (Oclacitinib)", dosage: "16mg - 1 tablet", frequency: "Daily", time: "8:00 AM", startDate: "2024-12-15", endDate: "2025-01-15", active: true, taken: false },
  { id: "m2", petName: "Max", medication: "Bravecto (Flea/Tick)", dosage: "500mg - 1 chew", frequency: "Every 12 weeks", time: "Any time with food", startDate: "2024-12-01", active: true, taken: true },
  { id: "m3", petName: "Luna", medication: "Theophylline (Asthma)", dosage: "50mg - 1 capsule", frequency: "Twice daily", time: "8:00 AM, 8:00 PM", startDate: "2024-10-01", active: true, taken: false },
  { id: "m4", petName: "Luna", medication: "Prednisolone (Anti-inflammatory)", dosage: "5mg - 0.5 tablet", frequency: "Every 2 days", time: "Morning with food", startDate: "2024-11-20", endDate: "2025-01-20", active: true, taken: true },
];

export default function MedicationReminders() {
  const [reminders, setReminders] = useState(initialReminders);
  const [showAdd, setShowAdd] = useState(false);
  const [newMed, setNewMed] = useState({ petName: "", medication: "", dosage: "", frequency: "Daily", time: "" });

  const markTaken = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, taken: !r.taken } : r));
    toast.success("Medication logged!");
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success("Reminder removed");
  };

  const addReminder = () => {
    if (!newMed.petName || !newMed.medication || !newMed.dosage) { toast.error("Please fill required fields"); return; }
    const id = `m${Date.now()}`;
    setReminders(prev => [...prev, { ...newMed, id, startDate: new Date().toISOString().split("T")[0], active: true, taken: false }]);
    setShowAdd(false);
    setNewMed({ petName: "", medication: "", dosage: "", frequency: "Daily", time: "" });
    toast.success("Medication reminder added!");
  };

  const todayDue = reminders.filter(r => r.active && !r.taken);
  const todayDone = reminders.filter(r => r.active && r.taken);

  return (
    <DashboardLayout title="Medication Reminders">
      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card-base p-4 text-center">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="font-poppins font-bold text-2xl text-amber-500">{todayDue.length}</p>
          <p className="text-xs text-light-muted dark:text-dark-muted">Due Today</p>
        </div>
        <div className="card-base p-4 text-center">
          <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="font-poppins font-bold text-2xl text-green-500">{todayDone.length}</p>
          <p className="text-xs text-light-muted dark:text-dark-muted">Given Today</p>
        </div>
        <div className="card-base p-4 text-center">
          <Pill className="w-8 h-8 text-brand-orange mx-auto mb-2" />
          <p className="font-poppins font-bold text-2xl text-brand-orange">{reminders.length}</p>
          <p className="text-xs text-light-muted dark:text-dark-muted">Active Medications</p>
        </div>
      </div>

      {/* Due Today */}
      {todayDue.length > 0 && (
        <div className="mb-8">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" /> Due Today
          </h3>
          <div className="space-y-3">
            {todayDue.map(r => (
              <div key={r.id} className="card-base p-4 flex items-center gap-4 border-l-4 border-amber-400">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Pill className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{r.medication}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{r.petName} · {r.dosage} · {r.frequency}</p>
                  <p className="text-xs text-amber-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {r.time}</p>
                </div>
                <button onClick={() => markTaken(r.id)} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Mark Given
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Medications */}
      <div className="card-base overflow-hidden">
        <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">All Medication Reminders</h3>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-semibold rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Medication
          </button>
        </div>
        <div className="divide-y divide-light-border dark:divide-dark-border">
          {reminders.map(r => (
            <div key={r.id} className={`px-5 py-4 flex items-center gap-4 ${r.taken ? "opacity-60" : ""}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${r.taken ? "bg-green-100 dark:bg-green-900/20" : "bg-amber-100 dark:bg-amber-900/20"}`}>
                {r.taken ? <Check className="w-4 h-4 text-green-500" /> : <Bell className="w-4 h-4 text-amber-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${r.taken ? "text-light-muted dark:text-dark-muted line-through" : "text-light-text dark:text-dark-heading"}`}>{r.medication}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted">{r.petName} · {r.dosage} · {r.frequency}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted">{r.startDate}{r.endDate ? ` → ${r.endDate}` : " (Ongoing)"}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => markTaken(r.id)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${r.taken ? "bg-green-100 text-green-500 hover:bg-green-200" : "border border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover text-light-muted dark:text-dark-muted"}`}>
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteReminder(r.id)} className="w-7 h-7 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center text-light-muted dark:text-dark-muted hover:text-red-500 hover:border-red-200 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-5">Add Medication Reminder</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Pet *</label>
                <select value={newMed.petName} onChange={e => setNewMed(p => ({ ...p, petName: e.target.value }))} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading">
                  <option value="">Select pet...</option>
                  {mockPets.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Medication Name *</label>
                <input value={newMed.medication} onChange={e => setNewMed(p => ({ ...p, medication: e.target.value }))} placeholder="e.g., Apoquel" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Dosage *</label>
                <input value={newMed.dosage} onChange={e => setNewMed(p => ({ ...p, dosage: e.target.value }))} placeholder="e.g., 16mg - 1 tablet" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Frequency</label>
                  <select value={newMed.frequency} onChange={e => setNewMed(p => ({ ...p, frequency: e.target.value }))} className="w-full px-3 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading">
                    {["Daily", "Twice daily", "Weekly", "Every 2 weeks", "Monthly"].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Time</label>
                  <input value={newMed.time} onChange={e => setNewMed(p => ({ ...p, time: e.target.value }))} placeholder="e.g., 8:00 AM" className="w-full px-3 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Cancel</button>
                <button onClick={addReminder} className="flex-1 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">Add Reminder</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
