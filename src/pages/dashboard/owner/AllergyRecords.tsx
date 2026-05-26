import { useState } from "react";
import { AlertCircle, Plus, Trash2, Info, Shield } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets } from "@/lib/mockData";
import toast from "react-hot-toast";

const commonAllergens = ["Wheat", "Corn", "Soy", "Chicken", "Beef", "Dairy", "Eggs", "Fish", "Pollen", "Dust Mites", "Mold", "Flea Saliva", "Certain Medications", "Cleaning Products"];
const commonSeverities = ["Mild", "Moderate", "Severe", "Life-threatening"];

interface AllergyRecord {
  id: string;
  petName: string;
  allergen: string;
  severity: string;
  reaction: string;
  diagnosedDate: string;
  notes: string;
}

const initialAllergies: AllergyRecord[] = [
  { id: "al1", petName: "Max", allergen: "Wheat", severity: "Moderate", reaction: "Skin irritation, itching, hair loss around paws", diagnosedDate: "2024-08-15", notes: "Confirmed by elimination diet. Avoid all wheat-based foods and treats." },
  { id: "al2", petName: "Luna", allergen: "Dust Mites", severity: "Mild", reaction: "Sneezing, mild eye discharge", diagnosedDate: "2024-05-20", notes: "Manage with regular bedding washing. Theophylline prescribed for asthma." },
];

const severityColors: Record<string, string> = {
  Mild: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Moderate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Severe: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Life-threatening": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AllergyRecords() {
  const [allergies, setAllergies] = useState(initialAllergies);
  const [showAdd, setShowAdd] = useState(false);
  const [newAllergy, setNewAllergy] = useState({ petName: "", allergen: "", severity: "Mild", reaction: "", diagnosedDate: "", notes: "" });

  const addAllergy = () => {
    if (!newAllergy.petName || !newAllergy.allergen) { toast.error("Please fill required fields"); return; }
    setAllergies(prev => [...prev, { ...newAllergy, id: `al${Date.now()}` }]);
    setShowAdd(false);
    setNewAllergy({ petName: "", allergen: "", severity: "Mild", reaction: "", diagnosedDate: "", notes: "" });
    toast.success("Allergy record added!");
  };

  const removeAllergy = (id: string) => {
    setAllergies(prev => prev.filter(a => a.id !== id));
    toast.success("Record removed");
  };

  return (
    <DashboardLayout title="Allergy Records">
      {/* Warning Banner */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-amber-700 dark:text-amber-400">Always inform your vet about known allergies</p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">Your pets currently have {allergies.length} recorded allergen{allergies.length > 1 ? "s" : ""}. This information is shared with your vets during consultations.</p>
          </div>
        </div>
      </div>

      {/* Summary by Pet */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {mockPets.map(p => {
          const petAllergies = allergies.filter(a => a.petName === p.name);
          return (
            <div key={p.name} className="card-base p-4 flex items-center gap-3">
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{p.name}</p>
                <p className={`text-xs ${petAllergies.length > 0 ? "text-amber-500" : "text-green-500"}`}>
                  {petAllergies.length > 0 ? `${petAllergies.length} known allergen${petAllergies.length > 1 ? "s" : ""}` : "No known allergies"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Allergy Record
        </button>
      </div>

      {/* Records */}
      <div className="space-y-4">
        {allergies.length === 0 ? (
          <div className="card-base p-12 text-center">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-green-500 font-semibold">No known allergies recorded</p>
            <p className="text-xs text-light-muted dark:text-dark-muted mt-1">Add any known allergens to keep your vet informed.</p>
          </div>
        ) : allergies.map(a => (
          <div key={a.id} className="card-base p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{a.allergen}</h3>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{a.petName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${severityColors[a.severity]}`}>{a.severity}</span>
                <button onClick={() => removeAllergy(a.id)} className="w-8 h-8 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center text-light-muted hover:text-red-500 hover:border-red-200 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-light-muted dark:text-dark-muted mb-1">Reaction</p>
                <p className="text-light-text dark:text-dark-body">{a.reaction}</p>
              </div>
              <div>
                <p className="text-xs text-light-muted dark:text-dark-muted mb-1">Diagnosed</p>
                <p className="text-light-text dark:text-dark-body">{a.diagnosedDate || "Unknown"}</p>
              </div>
            </div>
            {a.notes && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-sky-50 dark:bg-sky-900/10 rounded-xl">
                <Info className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-sky-700 dark:text-sky-400">{a.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Common Allergens Reference */}
      <div className="mt-8 card-base p-5">
        <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Common Pet Allergens Reference</h3>
        <div className="flex flex-wrap gap-2">
          {commonAllergens.map(a => (
            <span key={a} className="px-3 py-1.5 bg-light-hover dark:bg-dark-hover text-light-text dark:text-dark-body text-xs rounded-lg">{a}</span>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-5">Add Allergy Record</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Pet *</label>
                <select value={newAllergy.petName} onChange={e => setNewAllergy(p => ({ ...p, petName: e.target.value }))} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading">
                  <option value="">Select pet...</option>
                  {mockPets.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Allergen *</label>
                <input value={newAllergy.allergen} onChange={e => setNewAllergy(p => ({ ...p, allergen: e.target.value }))} placeholder="e.g., Wheat, Pollen" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Severity</label>
                <select value={newAllergy.severity} onChange={e => setNewAllergy(p => ({ ...p, severity: e.target.value }))} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading">
                  {commonSeverities.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Reaction Symptoms</label>
                <textarea value={newAllergy.reaction} onChange={e => setNewAllergy(p => ({ ...p, reaction: e.target.value }))} rows={2} placeholder="Describe the symptoms..." className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange resize-none text-light-text dark:text-dark-heading" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Notes</label>
                <input value={newAllergy.notes} onChange={e => setNewAllergy(p => ({ ...p, notes: e.target.value }))} placeholder="Additional notes or precautions" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-brand-orange text-light-text dark:text-dark-heading" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover transition-colors">Cancel</button>
                <button onClick={addAllergy} className="flex-1 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">Add Record</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
