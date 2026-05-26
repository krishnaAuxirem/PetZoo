import { Link } from "react-router-dom";
import { Package, ShoppingBag, DollarSign, Users, TrendingUp, AlertCircle, Tag, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency, formatDate } from "@/lib/utils";

const revenueData = [
  { month: "Jul", revenue: 21400, orders: 187, customers: 143 },
  { month: "Aug", revenue: 24200, orders: 214, customers: 161 },
  { month: "Sep", revenue: 26800, orders: 241, customers: 178 },
  { month: "Oct", revenue: 25600, orders: 228, customers: 169 },
  { month: "Nov", revenue: 29400, orders: 267, customers: 198 },
  { month: "Dec", revenue: 32100, orders: 294, customers: 218 },
];

const categoryData = [
  { name: "Pet Food", value: 38, color: "#F97316" },
  { name: "Accessories", value: 24, color: "#0EA5E9" },
  { name: "Toys", value: 18, color: "#22C55E" },
  { name: "Healthcare", value: 12, color: "#A855F7" },
  { name: "Technology", value: 8, color: "#EC4899" },
];

const recentOrders = [
  { id: "ORD-2024-1891", customer: "Alex T.", items: "Royal Canin Adult x2", total: 91.98, status: "Processing", date: "2024-12-26" },
  { id: "ORD-2024-1890", customer: "Sarah M.", items: "Wireless Pet Camera x1", total: 79.99, status: "Shipped", date: "2024-12-25" },
  { id: "ORD-2024-1889", customer: "David K.", items: "Premium Cat Tree x1", total: 89.99, status: "Delivered", date: "2024-12-24" },
  { id: "ORD-2024-1888", customer: "Emma R.", items: "Dog Puzzle Toy x3", total: 74.97, status: "Pending", date: "2024-12-26" },
  { id: "ORD-2024-1887", customer: "Marcus T.", items: "Orthopedic Bed x1", total: 65.99, status: "Processing", date: "2024-12-25" },
];

const lowStockProducts = [
  { name: "Royal Canin Adult", stock: 3, threshold: 10, img: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { name: "Flea & Tick Collar", stock: 5, threshold: 15, img: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=60" },
  { name: "Orthopedic Bed", stock: 1, threshold: 5, img: "https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=60" },
];

const statusColors: Record<string, string> = {
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function VendorDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Vendor Dashboard">
      {/* Welcome */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-brand-orange/10 via-brand-orange/5 to-transparent border border-brand-orange/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">
              Welcome, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-light-muted dark:text-dark-muted mt-1">
              <strong className="text-red-500">47 pending orders</strong> need your attention · Today's revenue: <strong className="text-brand-orange">{formatCurrency(4280)}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/vendor/orders" className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5">
              <Package className="w-4 h-4" /> Process Orders
            </Link>
            <Link to="/dashboard/vendor/products" className="px-4 py-2.5 border border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10 font-semibold rounded-xl text-sm transition-colors">
              Add Product
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Products" value="284" change="+12 new" trend="up" icon={Package} color="text-brand-orange" bgColor="bg-brand-orange/10" />
        <StatCard title="Pending Orders" value="47" change="Needs action" trend="down" icon={ShoppingBag} color="text-red-500" bgColor="bg-red-100 dark:bg-red-900/20" />
        <StatCard title="Monthly Revenue" value={formatCurrency(32100)} change="+22%" trend="up" icon={DollarSign} color="text-brand-green" bgColor="bg-brand-green/10" />
        <StatCard title="Total Customers" value="1,847" change="+134 this month" trend="up" icon={Users} color="text-brand-blue" bgColor="bg-brand-blue/10" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Revenue & Orders (Last 6 Months)</h3>
            <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +22% growth
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="vendRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number, name: string) => [name === "revenue" ? formatCurrency(v) : v, name === "revenue" ? "Revenue" : "Orders"]} />
              <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#vendRevGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Sales by Category</h3>
          <div className="flex justify-center mb-3">
            <PieChart width={160} height={140}>
              <Pie data={categoryData} cx={80} cy={70} innerRadius={40} outerRadius={65} dataKey="value">
                {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, ""]} />
            </PieChart>
          </div>
          <div className="space-y-2">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-light-text dark:text-dark-body">{c.name}</span>
                </div>
                <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Recent Orders</h3>
            <Link to="/dashboard/vendor/orders" className="text-xs text-brand-orange font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-brand-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-mono text-light-muted dark:text-dark-muted">{order.id}</p>
                  </div>
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading truncate">{order.items}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{order.customer} · {formatCurrency(order.total)}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${statusColors[order.status]}`}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" /> Low Stock Alerts
            </h3>
            <Link to="/dashboard/vendor/inventory" className="text-xs text-brand-orange font-semibold hover:underline">Manage Inventory</Link>
          </div>
          <div className="space-y-3 mb-5">
            {lowStockProducts.map(p => (
              <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10">
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading">{p.name}</p>
                  <p className="text-xs text-red-500">Only {p.stock} left (threshold: {p.threshold})</p>
                </div>
                <button className="text-xs font-semibold text-brand-orange hover:underline">Restock</button>
              </div>
            ))}
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "In Stock", value: "267", color: "text-green-500" },
              { label: "Low Stock", value: "12", color: "text-amber-500" },
              { label: "Out of Stock", value: "5", color: "text-red-500" },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-light-hover dark:bg-dark-hover">
                <p className={`font-bold text-xl font-poppins ${s.color}`}>{s.value}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
