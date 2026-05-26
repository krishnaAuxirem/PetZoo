import { useState } from "react";
import { Search, ShoppingCart, Star, Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { mockProducts } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

const categories = ["All", "Food", "Accessories", "Toys", "Healthcare", "Technology"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Best Rating", "Most Reviews"];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Relevance");
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filtered = mockProducts.filter(p =>
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (cat === "All" || p.category === cat)
  ).sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Best Rating") return b.rating - a.rating;
    if (sort === "Most Reviews") return b.reviews - a.reviews;
    return 0;
  });

  const addToCart = (id: string, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`${name} added to cart`);
  };

  const toggleWish = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
    toast.success(wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Hero */}
      <section className="py-14 bg-gradient-to-br from-orange-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/marketplace-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/20 text-orange-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">PetZoo Marketplace</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Premium Pet Products, Delivered</h1>
          <p className="text-white/70 mb-8">25,000+ products from trusted brands. Free shipping on orders over $50.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/40" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-brand-orange"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-light-muted dark:text-dark-muted" />
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl px-3 py-1.5 text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <p className="text-light-muted dark:text-dark-muted text-sm mb-6"><strong className="text-light-text dark:text-dark-heading">{filtered.length}</strong> products found {cart.length > 0 && <span className="ml-3 text-brand-orange font-semibold flex items-center gap-1 inline-flex"><ShoppingCart className="w-3.5 h-3.5" />{cart.length} in cart</span>}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div key={product.id} className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.badge && <span className="absolute top-2 left-2 bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded-lg">{product.badge}</span>}
                {!product.inStock && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-lg">Out of Stock</span></div>}
                <button onClick={() => toggleWish(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 dark:bg-dark-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-light-muted dark:text-dark-muted"}`} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-light-muted dark:text-dark-muted mb-1">{product.category} · {product.brand}</p>
                <h3 className="font-semibold text-sm text-light-text dark:text-dark-heading mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{product.rating}</span>
                  <span className="text-xs text-light-muted dark:text-dark-muted">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-poppins font-bold text-brand-orange">{formatCurrency(product.price)}</span>
                  {product.originalPrice && <span className="text-light-muted dark:text-dark-muted text-xs line-through">{formatCurrency(product.originalPrice)}</span>}
                </div>
                <button onClick={() => product.inStock && addToCart(product.id, product.name)}
                  disabled={!product.inStock}
                  className="w-full py-2 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5">
                  <ShoppingCart className="w-3.5 h-3.5" /> {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
