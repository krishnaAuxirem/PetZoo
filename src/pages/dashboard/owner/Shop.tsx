import { useState } from "react";
import { ShoppingBag, Search, Star, Heart, Filter, SlidersHorizontal, ShoppingCart, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const mockProducts = [
  { id: "pr1", name: "Royal Canin Adult Dog Food", category: "Food", price: 45.99, originalPrice: 59.99, rating: 4.8, reviews: 1247, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true, badge: "Best Seller" },
  { id: "pr2", name: "Premium Cat Tree Tower", category: "Accessories", price: 89.99, originalPrice: 119.99, rating: 4.6, reviews: 834, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true, badge: "20% Off" },
  { id: "pr3", name: "Interactive Dog Puzzle Toy", category: "Toys", price: 24.99, rating: 4.7, reviews: 562, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true },
  { id: "pr4", name: "Flea & Tick Collar", category: "Healthcare", price: 19.99, originalPrice: 27.99, rating: 4.5, reviews: 423, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true, badge: "New" },
  { id: "pr5", name: "Wireless Pet Camera", category: "Technology", price: 79.99, originalPrice: 99.99, rating: 4.9, reviews: 721, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true, badge: "Top Rated" },
  { id: "pr6", name: "Organic Catnip Toys Set", category: "Toys", price: 14.99, rating: 4.6, reviews: 389, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: false },
  { id: "pr7", name: "Orthopedic Memory Foam Bed", category: "Accessories", price: 65.99, originalPrice: 85.99, rating: 4.8, reviews: 956, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true, badge: "Premium" },
  { id: "pr8", name: "Bird Seed Premium Mix", category: "Food", price: 18.99, rating: 4.4, reviews: 214, image: "https://images.pexels.com/photos/7788657/pexels-photo-7788657.jpeg?auto=compress&cs=tinysrgb&w=300", inStock: true },
];

const categories = ["All", "Food", "Accessories", "Toys", "Healthcare", "Technology"];

export default function OwnerMarketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = mockProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const addToCart = (name: string, id: string) => {
    setCart(prev => [...prev, id]);
    setToast(`${name} added to cart!`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <DashboardLayout title="Marketplace">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Cart Items", value: cart.length, color: "from-brand-orange to-orange-600" },
          { label: "Wishlist", value: wishlist.length, color: "from-pink-500 to-pink-600" },
          { label: "Products Available", value: mockProducts.filter(p => p.inStock).length, color: "from-emerald-500 to-emerald-600" },
          { label: "My Orders", value: "3", color: "from-sky-500 to-sky-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={cn("px-3 py-2 rounded-xl text-sm font-semibold transition-all", category === c ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 hover:border-brand-orange/50")} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className={cn("rounded-2xl bg-white dark:bg-dark-card border overflow-hidden group transition-all duration-300 hover:-translate-y-1", p.inStock ? "border-slate-200/80 dark:border-white/5" : "border-slate-200/50 dark:border-white/3 opacity-70")} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="relative">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              {p.badge && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-lg bg-brand-orange text-white text-[10px] font-bold">{p.badge}</span>
                </div>
              )}
              {!p.inStock && (
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Out of Stock</span>
                </div>
              )}
              <button onClick={() => toggleWishlist(p.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
                <Heart className={cn("w-4 h-4", wishlist.includes(p.id) ? "text-red-500 fill-red-500" : "text-slate-400")} />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 mb-1">{p.name}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.rating}</span>
                <span className="text-xs text-slate-400">({p.reviews})</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-poppins font-bold text-base text-brand-orange">${p.price}</span>
                  {p.originalPrice && <span className="text-xs text-slate-400 line-through ml-1">${p.originalPrice}</span>}
                </div>
              </div>
              <button disabled={!p.inStock} onClick={() => addToCart(p.name, p.id)}
                className={cn("w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all", p.inStock ? "bg-brand-orange hover:bg-orange-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed")}>
                <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 px-4 py-3 rounded-2xl bg-slate-900 text-white text-sm font-semibold" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)", zIndex: 100 }}>
          ✓ {toast}
        </div>
      )}
    </DashboardLayout>
  );
}
