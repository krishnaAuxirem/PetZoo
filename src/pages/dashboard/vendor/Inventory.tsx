import { useState } from "react";
import { Package, Search, Plus, Edit2, Trash2, Eye, AlertCircle, TrendingDown, TrendingUp, BarChart3, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockInventory = [
  { id: "i1", name: "Royal Canin Adult Dog Food (5kg)", sku: "RC-AD-5KG", category: "Food", stock: 284, minStock: 50, price: 45.99, cost: 28.50, sold: 1247, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i2", name: "Premium Cat Tree Tower", sku: "PCT-001", category: "Accessories", stock: 47, minStock: 20, price: 89.99, cost: 52.00, sold: 834, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i3", name: "Interactive Dog Puzzle Toy", sku: "IDPT-M", category: "Toys", stock: 189, minStock: 30, price: 24.99, cost: 12.00, sold: 562, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i4", name: "Flea & Tick Collar", sku: "FTC-L", category: "Healthcare", stock: 12, minStock: 50, price: 19.99, cost: 9.50, sold: 423, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i5", name: "Wireless Pet Camera", sku: "WPC-HD", category: "Technology", stock: 63, minStock: 15, price: 79.99, cost: 45.00, sold: 721, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i6", name: "Organic Catnip Toys Set", sku: "OCT-SET6", category: "Toys", stock: 0, minStock: 25, price: 14.99, cost: 6.00, sold: 389, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i7", name: "Orthopedic Memory Foam Bed", sku: "OMFB-L", category: "Accessories", stock: 28, minStock: 15, price: 65.99, cost: 38.00, sold: 956, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { id: "i8", name: "Bird Seed Premium Mix (2kg)", sku: "BSP-2KG", category: "Food", stock: 312, minStock: 40, price: 18.99, cost: 9.50, sold: 214, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=60" },
];

const getStockStatus = (stock: number, minStock: number) => {
  if (stock === 0) return { label: "Out of Stock", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10", bar: "bg-red-400" };
  if (stock < minStock) return { label: "Low Stock", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", bar: "bg-amber-400" };
  return { label: "In Stock", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", bar: "bg-emerald-400" };
};

export default function VendorInventory() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const filtered = mockInventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchStock = stockFilter === "all" || (stockFilter === "low" && item.stock < item.minStock && item.stock > 0) || (stockFilter === "out" && item.stock === 0) || (stockFilter === "good" && item.stock >= item.minStock);
    return matchSearch && matchCategory && matchStock;
  });

  const lowStock = mockInventory.filter(i => i.stock > 0 && i.stock < i.minStock).length;
  const outOfStock = mockInventory.filter(i => i.stock === 0).length;
  const totalValue = mockInventory.reduce((s, i) => s + i.stock * i.cost, 0);

  return (
    <DashboardLayout title="Inventory Management">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total SKUs", value: mockInventory.length, color: "from-sky-500 to-sky-600" },
          { label: "Low Stock", value: lowStock, color: "from-amber-500 to-amber-600" },
          { label: "Out of Stock", value: outOfStock, color: "from-red-500 to-red-600" },
          { label: "Inventory Value", value: `$${(totalValue / 1000).toFixed(1)}K`, color: "from-emerald-500 to-emerald-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert Banner */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="flex items-start gap-3 p-4 mb-5 rounded-2xl bg-amber-50 dark:bg-amber-500/8 border border-amber-200 dark:border-amber-500/20">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">Inventory Alert</p>
            <p className="text-amber-600 dark:text-amber-500 text-xs mt-0.5">{outOfStock} items out of stock · {lowStock} items below minimum threshold. Restock soon to avoid lost sales.</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Inventory ({filtered.length} SKUs)</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="w-full sm:w-48 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Categories</option>
              {["Food", "Accessories", "Toys", "Healthcare", "Technology"].map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={stockFilter} onChange={e => setStockFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Stock</option>
              <option value="good">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5">
                {["Product", "SKU", "Category", "Stock Level", "Unit Cost", "Selling Price", "Units Sold", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const ss = getStockStatus(item.stock, item.minStock);
                const pct = Math.min(100, (item.stock / (item.minStock * 3)) * 100);
                return (
                  <tr key={item.id} className="border-b border-slate-50 dark:border-white/3 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                        <p className="text-sm font-semibold text-slate-900 dark:text-white max-w-[160px] truncate">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{item.sku}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-semibold text-slate-600 dark:text-slate-400">{item.category}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 dark:bg-white/8 rounded-full h-1.5">
                          <div className={cn("h-1.5 rounded-full", ss.bar)} style={{ width: `${pct}%` }} />
                        </div>
                        <span className={cn("text-xs font-bold", ss.color)}>{item.stock}</span>
                      </div>
                      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-1 inline-block", ss.color, ss.bg)}>{ss.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">${item.cost.toFixed(2)}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">${item.price.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{item.sold.toLocaleString()}</td>
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
    </DashboardLayout>
  );
}
