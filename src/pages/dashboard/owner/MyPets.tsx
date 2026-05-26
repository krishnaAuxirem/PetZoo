import { useState } from "react";
import { Plus, Edit, Syringe, Activity, Scale, AlertCircle, QrCode } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets } from "@/lib/mockData";
import toast from "react-hot-toast";

export default function MyPets() {
  const [pets, setPets] = useState(mockPets);
  const [showAdd, setShowAdd] = useState(false);
  const [newPet, setNewPet] = useState({ name: "", species: "Dog", breed: "", age: "", gender: "male" as "male" | "female" });

  const addPet = () => {
    if (!newPet.name || !newPet.breed) { toast.error("Please fill required fields"); return; }
    const pet = { id: `p${Date.now()}`, ...newPet, weight: 0, color: "", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400", ownerId: "u1", vaccinated: false, microchipped: false, neutered: false, dob: "", allergies: [], conditions: [] };
    setPets(prev => [...prev, pet]);
    setShowAdd(false);
    toast.success(`${newPet.name} added to your pets`);
    setNewPet({ name: "", species: "Dog", breed: "", age: "", gender: "male" });
  };

  return (
    <DashboardLayout title="My Pets">
      <div className="flex items-center justify-between mb-6">
        <p className="text-light-muted dark:text-dark-muted text-sm">{pets.length} pets registered</p>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Pet
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map(pet => (
          <div key={pet.id} className="card-base overflow-hidden hover:shadow-card-hover transition-all group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">{pet.name}</h3>
                  <p className="text-white/80 text-sm">{pet.breed}</p>
                </div>
                <button onClick={() => toast.info("QR code feature coming soon!")} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: "Age", value: pet.age },
                  { label: "Gender", value: pet.gender },
                  { label: "Weight", value: `${pet.weight} kg` },
                  { label: "Species", value: pet.species },
                ].map(info => (
                  <div key={info.label} className="bg-light-hover dark:bg-dark-hover rounded-lg px-3 py-2">
                    <p className="text-xs text-light-muted dark:text-dark-muted">{info.label}</p>
                    <p className="text-sm font-semibold text-light-text dark:text-dark-heading capitalize">{info.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mb-3">
                {pet.vaccinated && <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg"><Syringe className="w-3 h-3" />Vaccinated</span>}
                {pet.microchipped && <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg">Microchipped</span>}
                {pet.neutered && <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-lg">Neutered</span>}
              </div>
              {pet.allergies.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-amber-600 dark:text-amber-400">Allergies: {pet.allergies.join(", ")}</span>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => toast.info("Edit coming soon!")} className="flex-1 py-2 border border-light-border dark:border-dark-border rounded-xl text-xs font-medium text-light-text dark:text-dark-body hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => toast.success("Health report generated!")} className="flex-1 py-2 bg-brand-orange/10 text-brand-orange rounded-xl text-xs font-medium hover:bg-brand-orange/20 transition-colors flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3" /> Health
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-5">Add New Pet</h3>
            <div className="space-y-4">
              {[{label: "Pet Name *", key: "name", placeholder: "e.g., Buddy"}, {label: "Breed *", key: "breed", placeholder: "e.g., Golden Retriever"}, {label: "Age", key: "age", placeholder: "e.g., 2 years"}].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">{f.label}</label>
                  <input value={(newPet as any)[f.key]} onChange={e => setNewPet({...newPet, [f.key]: e.target.value})} placeholder={f.placeholder}
                    className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Species</label>
                  <select value={newPet.species} onChange={e => setNewPet({...newPet, species: e.target.value})} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
                    {["Dog","Cat","Bird","Rabbit","Fish","Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Gender</label>
                  <select value={newPet.gender} onChange={e => setNewPet({...newPet, gender: e.target.value as "male"|"female"})} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
                    <option value="male">Male</option><option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Cancel</button>
                <button onClick={addPet} className="flex-1 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">Add Pet</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
