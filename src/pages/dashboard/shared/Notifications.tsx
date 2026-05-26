import { useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info, Package, Calendar, Syringe, MessageCircle, Star, Trash2, CheckCheck } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockNotifications } from "@/lib/mockData";
import { formatRelativeTime } from "@/lib/utils";
import toast from "react-hot-toast";
import type { Notification } from "@/types";

const extraNotifications: Notification[] = [
  { id: "n6", title: "Grooming Booking Confirmed", message: "Max's Full Grooming Package is confirmed for Jan 10 at 9:00 AM with Maria Santos.", type: "success", read: false, createdAt: "2024-12-22T14:00:00Z", link: "/grooming" },
  { id: "n7", title: "New Blog Post", message: "Dr. Sarah Johnson published: '10 Signs Your Dog Needs Immediate Vet Care'", type: "info", read: false, createdAt: "2024-12-21T10:00:00Z", link: "/blog" },
  { id: "n8", title: "Weight Alert", message: "Luna's weight increased by 0.3kg this month. Consider reviewing her diet.", type: "warning", read: true, createdAt: "2024-12-20T09:00:00Z", link: "/dashboard/owner/weight" },
];

const allNotifications = [...mockNotifications, ...extraNotifications];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20" },
  warning: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/20" },
  info: { icon: Info, color: "text-sky-500", bg: "bg-sky-100 dark:bg-sky-900/20" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20" },
};

const filterOptions = ["All", "Unread", "Appointments", "Orders", "Health", "Community"];

export default function Notifications() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState("All");

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification dismissed");
  };

  const filtered = notifications.filter(n => {
    if (filter === "Unread") return !n.read;
    if (filter === "Appointments") return n.title.toLowerCase().includes("appointment");
    if (filter === "Orders") return n.title.toLowerCase().includes("order");
    if (filter === "Health") return n.title.toLowerCase().includes("vaccination") || n.title.toLowerCase().includes("weight") || n.title.toLowerCase().includes("health");
    if (filter === "Community") return n.title.toLowerCase().includes("community") || n.title.toLowerCase().includes("blog");
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout title="Notifications">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading">All Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          <p className="text-light-muted dark:text-dark-muted text-sm mt-1">{unreadCount} unread, {notifications.length} total</p>
        </div>
        <button onClick={markAllRead} className="flex items-center gap-1.5 px-4 py-2 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
          <CheckCheck className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filterOptions.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${filter === f ? "bg-brand-orange text-white" : "bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-body hover:border-brand-orange"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card-base p-12 text-center">
            <Bell className="w-12 h-12 text-light-muted dark:text-dark-muted mx-auto mb-4" />
            <p className="text-light-muted dark:text-dark-muted">No notifications in this category</p>
          </div>
        ) : filtered.map(n => {
          const cfg = typeConfig[n.type] || typeConfig.info;
          const Icon = cfg.icon;
          return (
            <div key={n.id}
              onClick={() => markRead(n.id)}
              className={`card-base p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-md ${!n.read ? "border-brand-orange/30 bg-brand-orange/[0.02]" : ""}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                <Icon className={`w-5 h-5 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm font-semibold ${!n.read ? "text-light-text dark:text-dark-heading" : "text-light-muted dark:text-dark-muted"}`}>{n.title}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5 leading-relaxed">{n.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!n.read && <span className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />}
                    <span className="text-xs text-light-muted dark:text-dark-muted whitespace-nowrap">{formatRelativeTime(n.createdAt)}</span>
                  </div>
                </div>
              </div>
              <button onClick={e => { e.stopPropagation(); deleteNotif(n.id); }} className="p-1.5 rounded-lg text-light-muted dark:text-dark-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Notification Settings */}
      <div className="mt-8 card-base p-5">
        <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { label: "Appointment Reminders", desc: "Get notified 24h before appointments", enabled: true },
            { label: "Vaccination Due Alerts", desc: "Reminders for upcoming vaccinations", enabled: true },
            { label: "Order Updates", desc: "Shipping and delivery notifications", enabled: true },
            { label: "Community Activity", desc: "Mentions, comments, and likes", enabled: false },
            { label: "Health Alerts", desc: "AI-powered health monitoring alerts", enabled: true },
            { label: "Promotional Emails", desc: "Deals, discounts, and new features", enabled: false },
          ].map(pref => (
            <div key={pref.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-light-text dark:text-dark-heading">{pref.label}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted">{pref.desc}</p>
              </div>
              <button onClick={() => toast.success(`${pref.label} preference updated`)} className={`relative w-10 h-5 rounded-full transition-colors ${pref.enabled ? "bg-brand-orange" : "bg-light-hover dark:bg-dark-hover"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${pref.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
