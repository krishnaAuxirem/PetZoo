import { useState } from "react";
import { Search, PawPrint, Plus, Eye, Heart, Syringe, FileText, AlertCircle, Activity } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockPatients = [
  { id: "p1", name: "Max", species: "Dog", breed: "Golden Retriever", age: "3 years", weight: "28 kg", owner: "Sarah Johnson", ownerAvatar: "https://i.pravatar.cc/40?img=1", lastVisit: "2024-12-28", nextVisit: "2025-03-28", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", conditions: [], vaccinated: true, visits: 8 },
  { id: "p2", name: "Luna", species: "Cat", breed: "Persian", age: "2 years", weight: "4 kg", owner: "David Kim", ownerAvatar: "https://i.pravatar.cc/40?img=2", lastVisit: "2024-12-20", nextVisit: "2025-01-05", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=80", conditions: ["Asthma"], vaccinated: true, visits: 5 },
  { id: "p3", name: "Charlie", species: "Dog", breed: "Beagle", age: "1 year", weight: "12 kg", owner: "Emma Roberts", ownerAvatar: "https://i.pravatar.cc/40?img=3", lastVisit: "2024-12-15", nextVisit: "2025-06-15", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=80", conditions: [], vaccinated: false, visits: 2 },
  { id: "p4", name: "Rex", species: "Dog", breed: "German Shepherd", age: "5 years", weight: "35 kg", owner: "Alex Thompson", ownerAvatar: "https://i.pravatar.cc/40?img=4", lastVisit: "2024-11-28", nextVisit: "2025-02-28", image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=80", conditions: ["Hip Dysplasia"], vaccinated: true, visits: 12 },
  { id: "p5", name: "Polly", species: "Bird", breed: "African Grey", age: "4 years", weight: "0.4 kg", owner: "Amanda Foster", ownerAvatar: "https://i.pravatar.cc/40?img=5", lastVisit: "2024-12-10", nextVisit: "2025-06-10", image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=80", conditions: [], vaccinated: true, visits: 4 },
  { id: "p6", name: "Buddy", species: "Dog", breed: "Labrador", age: "2 years", weight: "30 kg", owner: "Kevin Park", ownerAvatar: "https://i.pravatar.cc/40?img=6", lastVisit: "2024-12-22", nextVisit: "2025-03-22", image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=80", conditions: ["Allergies"], vaccinated: true, visits: 6 },
];

const speciesColors: Record<string, string> = {
  Dog: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cat: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Bird: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export default function VetPatients() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState("all");

  const filtered = mockPatients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = speciesFilter === "all" || p.species === speciesFilter;
    return matchSearch && matchSpecies;
  });

  const selectedPatient = mockPatients.find(p => p.id === selected);

  return (
    <DashboardLayout title="Patients">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Patients", value: mockPatients.length, color: "from-sky-500 to-sky-600" },
          { label: "Dogs", value: mockPatients.filter(p => p.species === "Dog").length, color: "from-amber-500 to-amber-600" },
          { label: "Cats", value: mockPatients.filter(p => p.species === "Cat").length, color: "from-purple-500 to-purple-600" },
          { label: "With Conditions", value: mockPatients.filter(p => p.conditions.length > 0).length, color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        {/* Patient List */}
        <div className="flex-1 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Patients ({filtered.length})</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
              </div>
              <select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
                <option value="all">All Species</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {filtered.map(p => {
              const sc = speciesColors[p.species] || speciesColors.Dog;
              return (
                <div key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
                  className={cn("flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/2 transition-colors", selected === p.id && "bg-orange-50/50 dark:bg-orange-500/5")}>
                  <div className="relative flex-shrink-0">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-2xl object-cover" />
                    {!p.vaccinated && <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center"><AlertCircle className="w-3 h-3 text-white" /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                      <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", sc)}>{p.species}</span>
                      {p.conditions.length > 0 && <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-red-50 dark:bg-red-500/10 text-red-500">{p.conditions[0]}</span>}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.breed} · {p.age} · {p.weight}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Owner: {p.owner} · Last visit: {p.lastVisit}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{p.visits} visits</p>
                    <p className="text-xs text-slate-400">Next: {p.nextVisit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patient Detail */}
        {selectedPatient && (
          <div className="w-72 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 h-fit" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="text-center mb-4">
              <img src={selectedPatient.image} alt={selectedPatient.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3" />
              <h4 className="font-poppins font-bold text-lg text-slate-900 dark:text-white">{selectedPatient.name}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedPatient.breed} · {selectedPatient.age}</p>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { label: "Species", value: selectedPatient.species },
                { label: "Weight", value: selectedPatient.weight },
                { label: "Gender", value: "Male" },
                { label: "Owner", value: selectedPatient.owner },
                { label: "Vaccinated", value: selectedPatient.vaccinated ? "Yes" : "No" },
                { label: "Total Visits", value: selectedPatient.visits },
              ].map(d => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{d.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{d.value}</span>
                </div>
              ))}
            </div>
            {selectedPatient.conditions.length > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/8 border border-red-100 dark:border-red-500/15">
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Conditions</p>
                {selectedPatient.conditions.map(c => (
                  <span key={c} className="text-xs text-red-500">{c}</span>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <button className="w-full py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>View Full Record</button>
              <button className="w-full py-2.5 border border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl">Book Appointment</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
