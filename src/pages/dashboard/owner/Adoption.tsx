import { useState } from "react";
import { Search, Plus, Heart, MapPin, PawPrint, CheckCircle, Clock, Send } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const adoptionPets = [
  { id: "ad1", name: "Buddy", species: "Dog", breed: "Labrador Mix", age: "2 years", gender: "male", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300", shelter: "Happy Tails Shelter", location: "New York, NY", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: true, status: "available" },
  { id: "ad2", name: "Mittens", species: "Cat", breed: "Domestic Shorthair", age: "3 years", gender: "female", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=300", shelter: "City Cat Rescue", location: "Los Angeles, CA", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: false, status: "available" },
  { id: "ad3", name: "Charlie", species: "Dog", breed: "Beagle", age: "1 year", gender: "male", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=300", shelter: "Paws & Claws", location: "Chicago, IL", vaccinated: true, neutered: false, goodWithKids: true, goodWithPets: true, status: "pending" },
  { id: "ad4", name: "Polly", species: "Bird", breed: "African Grey", age: "4 years", gender: "female", image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=300", shelter: "Wing & Song", location: "Miami, FL", vaccinated: true, neutered: false, goodWithKids: false, goodWithPets: false, status: "available" },
  { id: "ad5", name: "Snowball", species: "Rabbit", breed: "Holland Lop", age: "8 months", gender: "female", image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=300", shelter: "Small Critters", location: "Seattle, WA", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: true, status: "available" },
  { id: "ad6", name: "Rex", species: "Dog", breed: "German Shepherd", age: "5 years", gender: "male", image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=300", shelter: "Forever Home", location: "Houston, TX", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: false, status: "available" },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  available: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  pending: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  adopted: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10" },
};

export default function OwnerAdoption() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [applied, setApplied] = useState<string[]>([]);

  const filtered = adoptionPets.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = species === "all" || p.species === species;
    return matchSearch && matchSpecies;
  });

  const selectedPet = adoptionPets.find(p => p.id === selected);

  return (
    <DashboardLayout title="Adoption">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Available Pets", value: adoptionPets.filter(p => p.status === "available").length, color: "from-pink-500 to-pink-600" },
          { label: "Applications Sent", value: applied.length, color: "from-brand-orange to-orange-600" },
          { label: "Shelters Near You", value: "12", color: "from-sky-500 to-sky-600" },
          { label: "Pets Saved This Month", value: "3,421", color: "from-emerald-500 to-emerald-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pets for adoption..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }} />
        </div>
        {["all", "Dog", "Cat", "Bird", "Rabbit"].map(s => (
          <button key={s} onClick={() => setSpecies(s)} className={cn("px-3 py-2 rounded-xl text-sm font-semibold transition-all capitalize", species === s ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 hover:border-brand-orange/50")} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {s === "all" ? "All Pets" : s + "s"}
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(pet => {
            const sc = statusConfig[pet.status];
            return (
              <div key={pet.id} onClick={() => setSelected(selected === pet.id ? null : pet.id)}
                className={cn("rounded-2xl bg-white dark:bg-dark-card border overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1", selected === pet.id ? "border-brand-orange/40 ring-1 ring-brand-orange/20" : "border-slate-200/80 dark:border-white/5")} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="relative">
                  <img src={pet.image} alt={pet.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                    <span className={cn("px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-sm", sc.color, sc.bg)}>{pet.status}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-poppins font-bold text-slate-900 dark:text-white">{pet.name}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{pet.gender}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{pet.breed} · {pet.age}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{pet.shelter}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pet.vaccinated && <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">Vaccinated</span>}
                    {pet.goodWithKids && <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">Kid-Friendly</span>}
                    {pet.goodWithPets && <span className="px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold">Pet-Friendly</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedPet && (
          <div className="w-72 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5 h-fit" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-40 rounded-xl object-cover mb-4" />
            <h4 className="font-poppins font-bold text-lg text-slate-900 dark:text-white">{selectedPet.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{selectedPet.breed} · {selectedPet.age} · {selectedPet.gender}</p>
            <div className="space-y-2 mb-4">
              {[
                { label: "Shelter", value: selectedPet.shelter },
                { label: "Location", value: selectedPet.location },
                { label: "Status", value: selectedPet.status },
              ].map(d => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{d.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">{d.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setApplied(prev => [...prev, selectedPet.id])} disabled={applied.includes(selectedPet.id) || selectedPet.status !== "available"}
              className={cn("w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all", applied.includes(selectedPet.id) ? "bg-emerald-500 text-white" : selectedPet.status === "available" ? "bg-brand-orange hover:bg-orange-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed")}>
              {applied.includes(selectedPet.id) ? <><CheckCircle className="w-4 h-4" />Applied!</> : <><Send className="w-4 h-4" />Apply to Adopt</>}
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
