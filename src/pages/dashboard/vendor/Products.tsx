import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, Star, Package, Tag, AlertCircle, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockProducts = [
  { id: "pr1", name: "Royal Canin Adult Dog Food (5kg)", category: "Food", price: 45.99, originalPrice: 59.99, stock: 284, sold: 1247, rating: 4.8, reviews: 1247, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=80", status: "active", badge: "Best Seller" },
  { id: "pr2", name: "Premium Cat Tree Tower", category: "Accessories", price: 89.99, originalPrice: 119.99, stock: 47, sold: 834, rating: 4.6, reviews: 834, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=80", status: "active", badge: "20% Off" },
  { id: "pr3", name: "Interactive Dog Puzzle Toy", category: "Toys", price: 24.99, stock: 189, sold: 562, rating: 4.7, reviews: 562, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=80", status: "active" },
  { id: "pr4", name: "Flea & Tick Collar", category: "Healthcare", price: 19.99, originalPrice: 27.99, stock: 12, sold: 423, rating: 4.5, reviews: 423, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=80", status: "active", badge: "New" },
  { id: "pr5", name: "Wireless Pet Camera", category: "Technology", price: 79.99, originalPrice: 99.99, stock: 63, sold: 721, rating: 4.9, reviews: 721, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=80", status: "active", badge: "Top Rated" },
  { id: "pr6", name: "Organic Catnip Toys Set", category: "Toys", price: 14.99, stock: 0, sold: 389, rating: 4.6, reviews: 389, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=80", status: "out_of_stock" },
  { id: "pr7", name: "Orthopedic Memory Foam Bed", category: "Accessories", price: 65.99, originalPrice: 85.99, stock: 28, sold: 956, rating: 4.8, reviews: 956, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=80", status: "active", badge: "Premium" },
  { id: "pr8", name: "Bird Seed Premium Mix", category: "Food", price: 18.99, stock: 312, sold: 214, rating: 4.4, reviews: 214, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=80", status: "inactive" },
];

const categories = ["All", "Food", "Accessories", "Toys", "Healthcare", "Technology"];
const statusConfig: Record<string, { color: string; bg: string }> = {
  active: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  inactive: { color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-100 dark:bg-white/5" },
  out_of_stock: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
};

export default function VendorProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalRevenue = mockProducts.reduce((s, p) => s + p.price * p.sold, 0);

  return (
    <DashboardLayout title="My Products">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Products", value: mockProducts.length, color: "from-emerald-500 to-emerald-600" },
          { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, color: "from-brand-orange to-orange-600" },
          { label: "Total Units Sold", value: mockProducts.reduce((s, p) => s + p.sold, 0).toLocaleString(), color: "from-sky-500 to-sky-600" },
          { label: "Out of Stock", value: mockProducts.filter(p => p.stock === 0).length, color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Products ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Product", "Category", "Price", "Stock", "Sold", "Rating", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const sc = statusConfig[p.status];
                return (
                  <tr key={p.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white max-w-[160px] truncate">{p.name}</p>
                          {p.badge && <span className="text-[10px] font-bold text-brand-orange">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-semibold text-slate-600 dark:text-slate-400">{p.category}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-slate-900 dark:text-white">${p.price}</p>
                      {p.originalPrice && <p className="text-xs text-slate-400 line-through">${p.originalPrice}</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("font-semibold text-sm", p.stock === 0 ? "text-red-500" : p.stock < 20 ? "text-amber-500" : "text-emerald-500")}>{p.stock}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{p.sold.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-amber-500 font-bold text-sm"><Star className="w-3.5 h-3.5 fill-amber-400" />{p.rating}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", sc.color, sc.bg)}>
                        {p.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 p-6" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-5">Add New Product</h3>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Product Name", placeholder: "e.g. Dog Food" }, { label: "Brand", placeholder: "e.g. Royal Canin" }, { label: "Price", placeholder: "$29.99" }, { label: "Stock Quantity", placeholder: "100" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none">
                  {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea rows={2} placeholder="Product description..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white outline-none focus:border-brand-orange/50 resize-none" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/8 text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-semibold" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
