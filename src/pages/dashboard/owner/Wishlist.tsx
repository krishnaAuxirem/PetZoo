import { useState } from "react";
import { Heart, ShoppingCart, Trash2, Star, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockProducts } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(mockProducts.slice(0, 5));

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
    toast.success("Removed from wishlist");
  };

  const addToCart = (name: string) => {
    toast.success(`${name} added to cart!`);
  };

  return (
    <DashboardLayout title="My Wishlist">
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-pink-400" />
          </div>
          <h3 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-2">Your wishlist is empty</h3>
          <p className="text-light-muted dark:text-dark-muted mb-6">Save items you love for later.</p>
          <Link to="/marketplace" className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-light-muted dark:text-dark-muted"><strong className="text-light-text dark:text-dark-heading">{wishlist.length}</strong> saved items</p>
            <button onClick={() => toast.success("All items added to cart!")} className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4" /> Add All to Cart
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlist.map(product => (
              <div key={product.id} className="card-base overflow-hidden hover:shadow-card-hover transition-all group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded-lg">{product.badge}</span>
                  )}
                  <button onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-dark-card rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-light-muted dark:text-dark-muted mb-1">{product.category} · {product.brand}</p>
                  <h3 className="font-semibold text-sm text-light-text dark:text-dark-heading mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-poppins font-bold text-brand-orange">{formatCurrency(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-light-muted dark:text-dark-muted line-through">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{product.rating}</span>
                      <span className="text-xs text-light-muted dark:text-dark-muted">({product.reviews})</span>
                    </div>
                    <span className={`text-xs font-semibold ${product.inStock ? "text-green-500" : "text-red-500"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(product.name)} disabled={!product.inStock}
                      className="flex-1 py-2 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                    <button onClick={() => removeFromWishlist(product.id)}
                      className="w-9 h-9 border border-light-border dark:border-dark-border rounded-xl flex items-center justify-center text-light-muted dark:text-dark-muted hover:text-red-500 hover:border-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
