import { useState } from "react";
import { Star, Shield, Stethoscope, Scissors, Dumbbell, Store, Home, Search, Plus, Edit2, Trash2, CheckCircle, XCircle, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

// Generic admin management component for Groomers, Trainers, Vendors, Shelters
const mockGroomers = [
  { id: "g1", name: "Maria Santos", email: "maria@groomstudio.com", avatar: "https://i.pravatar.cc/40?img=1", business: "Pawfect Grooming Studio", location: "New York, NY", rating: 4.9, reviews: 342, bookings: 1247, revenue: 42890, status: "active", verified: true },
  { id: "g2", name: "Tom Bradley", email: "tom@petlooks.com", avatar: "https://i.pravatar.cc/40?img=2", business: "Pet Looks Salon", location: "Los Angeles, CA", rating: 4.7, reviews: 218, bookings: 892, revenue: 31240, status: "active", verified: true },
  { id: "g3", name: "Sophie Williams", email: "sophie@furever.com", avatar: "https://i.pravatar.cc/40?img=3", business: "Furever Fresh", location: "Chicago, IL", rating: 4.8, reviews: 156, bookings: 634, revenue: 22180, status: "active", verified: false },
  { id: "g4", name: "Carlos Martinez", email: "carlos@groomspot.com", avatar: "https://i.pravatar.cc/40?img=4", business: "The Groom Spot", location: "Miami, FL", rating: 4.5, reviews: 89, bookings: 421, revenue: 14750, status: "inactive", verified: true },
  { id: "g5", name: "Emily Chen", email: "emily@pawsandwash.com", avatar: "https://i.pravatar.cc/40?img=5", business: "Paws & Wash", location: "Seattle, WA", rating: 4.6, reviews: 124, bookings: 512, revenue: 17890, status: "active", verified: true },
];

const mockTrainers = [
  { id: "t1", name: "Jake Miller", email: "jake@pettrainer.com", avatar: "https://i.pravatar.cc/40?img=6", business: "Alpha Dog Training", location: "New York, NY", rating: 4.9, reviews: 284, clients: 234, revenue: 58920, status: "active", verified: true },
  { id: "t2", name: "Sofia Rodriguez", email: "sofia@agility.com", avatar: "https://i.pravatar.cc/40?img=7", business: "Sofia's Agility Academy", location: "Los Angeles, CA", rating: 4.8, reviews: 167, clients: 87, revenue: 39150, status: "active", verified: true },
  { id: "t3", name: "Tom Bradley", email: "tom@puppyclass.com", avatar: "https://i.pravatar.cc/40?img=8", business: "Puppy School Pro", location: "Chicago, IL", rating: 4.7, reviews: 198, clients: 312, revenue: 46560, status: "active", verified: false },
];

const mockVendors = [
  { id: "v1", name: "PetWorld Store", email: "info@petworld.com", avatar: "https://i.pravatar.cc/40?img=9", business: "PetWorld Inc.", location: "New York, NY", rating: 4.8, reviews: 1247, products: 284, revenue: 142840, status: "active", verified: true },
  { id: "v2", name: "NaturaPet", email: "sales@naturapet.com", avatar: "https://i.pravatar.cc/40?img=10", business: "NaturaPet Organics", location: "California, CA", rating: 4.7, reviews: 892, products: 156, revenue: 98750, status: "active", verified: true },
  { id: "v3", name: "TechPet Gadgets", email: "info@techpet.com", avatar: "https://i.pravatar.cc/40?img=11", business: "TechPet Solutions", location: "Texas, TX", rating: 4.9, reviews: 634, products: 87, revenue: 76540, status: "active", verified: true },
];

const mockShelters = [
  { id: "s1", name: "Happy Tails Shelter", email: "admin@happytails.org", avatar: "https://i.pravatar.cc/40?img=12", business: "Happy Tails Animal Rescue", location: "New York, NY", rating: 4.9, reviews: 284, pets: 45, adoptions: 1247, status: "active", verified: true },
  { id: "s2", name: "City Cat Rescue", email: "info@citycatrescue.org", avatar: "https://i.pravatar.cc/40?img=13", business: "City Cat Rescue Inc.", location: "Los Angeles, CA", rating: 4.8, reviews: 156, pets: 32, adoptions: 892, status: "active", verified: true },
  { id: "s3", name: "Paws & Claws", email: "contact@pawsandclaws.org", avatar: "https://i.pravatar.cc/40?img=14", business: "Paws & Claws Rescue", location: "Chicago, IL", rating: 4.7, reviews: 98, pets: 28, adoptions: 634, status: "active", verified: false },
];

const typeConfig = {
  groomers: { title: "Groomers", icon: Scissors, color: "from-purple-500 to-purple-600", data: mockGroomers, col1: "Bookings", col2: "Revenue", key1: "bookings", key2: "revenue" },
  trainers: { title: "Trainers", icon: Dumbbell, color: "from-amber-500 to-amber-600", data: mockTrainers, col1: "Clients", col2: "Revenue", key1: "clients", key2: "revenue" },
  vendors: { title: "Vendors", icon: Store, color: "from-emerald-500 to-emerald-600", data: mockVendors, col1: "Products", col2: "Revenue", key1: "products", key2: "revenue" },
  shelters: { title: "Shelters", icon: Home, color: "from-pink-500 to-pink-600", data: mockShelters, col1: "Pets", col2: "Adoptions", key1: "pets", key2: "adoptions" },
};

interface AdminRoleManagementProps { type: keyof typeof typeConfig; }

export default function AdminRoleManagement({ type }: AdminRoleManagementProps) {
  const config = typeConfig[type];
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const Icon = config.icon;

  const filtered = config.data.filter((item: any) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.business.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "verified" && item.verified) || (filter === "pending" && !item.verified) || item.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = (config.data as any[]).filter((i: any) => i.revenue).reduce((s: number, i: any) => s + i.revenue, 0);

  return (
    <DashboardLayout title={`${config.title} Management`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: `Total ${config.title}`, value: config.data.length, color: config.color },
          { label: "Active", value: config.data.filter((i: any) => i.status === "active").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Pending Verification", value: config.data.filter((i: any) => !i.verified).length, color: "from-amber-500 to-amber-600" },
          { label: totalRevenue > 0 ? "Total Revenue" : "Total Adoptions", value: totalRevenue > 0 ? `$${(totalRevenue / 1000).toFixed(0)}K` : config.data.reduce((s: number, i: any) => s + (i.adoptions || 0), 0), color: "from-sky-500 to-sky-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">{config.title} ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}...`} className="w-full sm:w-48 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Add {config.title.slice(0, -1)}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {[config.title.slice(0, -1), "Business", "Rating", config.col1, config.col2, "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item: any) => (
                <tr key={item.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                          {item.verified && <CheckCircle className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{item.business}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />{item.rating}
                    </span>
                    <p className="text-xs text-slate-400">{item.reviews} reviews</p>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">{(item[config.key1] || 0).toLocaleString()}</td>
                  <td className="px-5 py-3.5 font-bold text-brand-orange">{config.key2 === "revenue" ? `$${(item[config.key2] / 1000).toFixed(0)}K` : (item[config.key2] || 0).toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", item.status === "active" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-white/5 text-slate-500")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
