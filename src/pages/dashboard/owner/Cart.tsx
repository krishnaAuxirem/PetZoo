import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Tag, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockProducts } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  brand: string;
}

const initialCart: CartItem[] = [
  { id: "pr1", name: "Royal Canin Adult Dog Food", price: 45.99, image: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=200", quantity: 2, category: "Food", brand: "Royal Canin" },
  { id: "pr3", name: "Interactive Dog Puzzle Toy", price: 24.99, image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=200", quantity: 1, category: "Toys", brand: "PawsPlay" },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "PETZOO20") {
      setDiscount(0.2);
      toast.success("Coupon applied! 20% discount");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal - discountAmount + shipping;

  if (cart.length === 0) {
    return (
      <DashboardLayout title="My Cart">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-light-hover dark:bg-dark-hover rounded-2xl flex items-center justify-center mb-4">
            <ShoppingCart className="w-10 h-10 text-light-muted dark:text-dark-muted" />
          </div>
          <h3 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-2">Your cart is empty</h3>
          <p className="text-light-muted dark:text-dark-muted mb-6">Add products from the marketplace to get started.</p>
          <Link to="/marketplace" className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">
            Browse Marketplace
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Cart">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{cart.length} item{cart.length > 1 ? "s" : ""} in cart</h3>
            <button onClick={() => { setCart([]); toast.success("Cart cleared"); }} className="text-xs text-red-500 hover:underline">Clear All</button>
          </div>
          {cart.map(item => (
            <div key={item.id} className="card-base p-4 flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{item.name}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">{item.brand} · {item.category}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-light-muted dark:text-dark-muted hover:text-red-500 transition-colors flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm text-light-text dark:text-dark-heading">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-poppins font-bold text-brand-orange">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Suggested Products */}
          <div className="card-base p-5">
            <h4 className="font-semibold text-sm text-light-text dark:text-dark-heading mb-3">You Might Also Like</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mockProducts.slice(3, 6).map(p => (
                <div key={p.id} className="text-center">
                  <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-xl mb-2" />
                  <p className="text-xs text-light-text dark:text-dark-body truncate">{p.name}</p>
                  <p className="text-xs font-bold text-brand-orange">{formatCurrency(p.price)}</p>
                  <button onClick={() => toast.success(`${p.name} added to cart!`)} className="mt-1 w-full py-1 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-lg hover:bg-brand-orange/20 transition-colors">
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="card-base p-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-light-muted dark:text-dark-muted">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Coupon Discount (20%)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-light-muted dark:text-dark-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-500">Free</span> : formatCurrency(shipping)}</span>
              </div>
              <div className="border-t border-light-border dark:border-dark-border pt-3 flex justify-between font-poppins font-bold text-light-text dark:text-dark-heading">
                <span>Total</span>
                <span className="text-brand-orange">{formatCurrency(total)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-light-muted dark:text-dark-muted mt-2">Add {formatCurrency(75 - subtotal)} more for free shipping</p>
            )}
          </div>

          {/* Coupon */}
          <div className="card-base p-5">
            <h4 className="font-semibold text-sm text-light-text dark:text-dark-heading mb-3 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-brand-orange" /> Coupon Code
            </h4>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code"
                className="flex-1 px-3 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
              <button onClick={applyCoupon} className="px-3 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">Apply</button>
            </div>
            <p className="text-xs text-light-muted dark:text-dark-muted mt-2">Try: PETZOO20</p>
          </div>

          <button onClick={() => toast.success("Order placed successfully! You'll receive a confirmation email.")}
            className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            <Package className="w-4 h-4" /> Place Order — {formatCurrency(total)}
          </button>
          <Link to="/marketplace" className="flex items-center justify-center gap-1.5 text-sm text-light-muted dark:text-dark-muted hover:text-brand-orange transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
