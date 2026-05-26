import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, PawPrint, Heart, CheckCircle, XCircle, Clock, MapPin, Filter } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockListings = [
  { id: "l1", name: "Buddy", species: "Dog", breed: "Labrador Mix", age: "2 years", gender: "male", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=120", status: "available", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: true, applications: 5, views: 247 },
  { id: "l2", name: "Mittens", species: "Cat", breed: "Domestic Shorthair", age: "3 years", gender: "female", image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=120", status: "pending", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: false, applications: 3, views: 189 },
  { id: "l3", name: "Charlie", species: "Dog", breed: "Beagle", age: "1 year", gender: "male", image: "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=120", status: "available", vaccinated: true, neutered: false, goodWithKids: true, goodWithPets: true, applications: 8, views: 412 },
  { id: "l4", name: "Polly", species: "Bird", breed: "African Grey Parrot", age: "4 years", gender: "female", image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=120", status: "available", vaccinated: true, neutered: false, goodWithKids: false, goodWithPets: false, applications: 1, views: 98 },
  { id: "l5", name: "Snowball", species: "Rabbit", breed: "Holland Lop", age: "8 months", gender: "female", image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=120", status: "available", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: true, applications: 4, views: 321 },
  { id: "l6", name: "Rex", species: "Dog", breed: "German Shepherd", age: "5 years", gender: "male", image: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=120", status: "adopted", vaccinated: true, neutered: true, goodWithKids: true, goodWithPets: false, applications: 12, views: 534 },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  available: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", dot: "bg-emerald-400" },
  pending: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", dot: "bg-amber-400" },
  adopted: { color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", dot: "bg-sky-400" },
};

const speciesColors: Record<string, string> = {
  Dog: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Cat: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Bird: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Rabbit: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

export default function ShelterListings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockListings.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchSpecies = speciesFilter === "all" || p.species === speciesFilter;
    return matchSearch && matchStatus && matchSpecies;
  });

  return (
    <DashboardLayout title="Pet Listings">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Listed", value: mockListings.length, color: "from-pink-500 to-pink-600" },
          { label: "Available", value: mockListings.filter(p => p.status === "available").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Pending Adoption", value: mockListings.filter(p => p.status === "pending").length, color: "from-amber-500 to-amber-600" },
          { label: "Adopted This Month", value: 28, color: "from-sky-500 to-sky-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Pet Listings ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pets..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Species</option>
              {["Dog", "Cat", "Bird", "Rabbit"].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="adopted">Adopted</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Add Pet
            </button>
          </div>
        </div>

        {/* Card grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(pet => {
            const sc = statusConfig[pet.status];
            const speciesColor = speciesColors[pet.species] || speciesColors.Dog;
            return (
              <div key={pet.id} className="rounded-2xl border border-slate-200/80 dark:border-white/5 overflow-hidden hover:shadow-lg dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all group">
                <div className="relative">
                  <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={cn("px-2.5 py-1 rounded-xl text-xs font-bold backdrop-blur-sm", sc.color, sc.bg)}>{pet.status}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={cn("px-2.5 py-1 rounded-xl text-xs font-bold backdrop-blur-sm", speciesColor)}>{pet.species}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-poppins font-bold text-slate-900 dark:text-white">{pet.name}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{pet.gender}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{pet.breed} · {pet.age}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pet.vaccinated && <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">Vaccinated</span>}
                    {pet.neutered && <span className="px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold">Neutered</span>}
                    {pet.goodWithKids && <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">Good with Kids</span>}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-white/5">
                    <span>{pet.applications} applications</span>
                    <span>{pet.views} views</span>
                    <div className="flex gap-1.5">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">Add New Pet Listing</h3>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Pet Name", placeholder: "e.g. Buddy" }, { label: "Breed", placeholder: "e.g. Labrador" }, { label: "Age", placeholder: "e.g. 2 years" }, { label: "Weight", placeholder: "e.g. 15 kg" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Species</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {["Dog", "Cat", "Bird", "Rabbit", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea rows={2} placeholder="Tell potential adopters about this pet..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50 resize-none" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Add Listing</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
