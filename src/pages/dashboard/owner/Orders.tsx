import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockOrders } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  pending: { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock, label: "Pending" },
  processing: { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Package, label: "Processing" },
  shipped: { color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", icon: Truck, label: "Shipped" },
  delivered: { color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle, label: "Delivered" },
  cancelled: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle, label: "Cancelled" },
};

export default function Orders() {
  return (
    <DashboardLayout title="My Orders">
      <div className="space-y-5">
        {mockOrders.map(order => {
          const s = statusConfig[order.status];
          const StatusIcon = s.icon;
          return (
            <div key={order.id} className="card-base p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-light-border dark:border-dark-border">
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-heading">Order #{order.id.toUpperCase()}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">{formatDate(order.createdAt)} · {order.paymentMethod}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
                    <StatusIcon className="w-3 h-3" />{s.label}
                  </span>
                  <span className="font-poppins font-bold text-brand-orange">{formatCurrency(order.total)}</span>
                </div>
              </div>
              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-light-text dark:text-dark-heading truncate">{item.name}</p>
                      <p className="text-xs text-light-muted dark:text-dark-muted">{item.category} · Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                <p className="text-xs text-light-muted dark:text-dark-muted">📍 {order.address}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Track Order</button>
                  {order.status === "delivered" && <button className="px-3 py-1.5 text-xs font-medium bg-brand-orange/10 text-brand-orange rounded-lg hover:bg-brand-orange/20 transition-colors">Reorder</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
