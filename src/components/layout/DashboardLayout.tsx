import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, PawPrint, Heart, Calendar, ShoppingBag, Users,
  Settings, Bell, LogOut, Menu, X, Sun, Moon,
  Stethoscope, Scissors, Dumbbell, Package, Home, Shield, TrendingUp,
  MessageSquare, FileText, Star, Gift, BarChart3, AlertCircle, Database,
  BookOpen, Syringe, Scale, Pill, Activity, ShoppingCart, Bookmark,
  Award, ClipboardList, DollarSign, Store, Tag, Truck, Globe,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { cn, getInitials } from "@/lib/utils";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface SidebarGroup {
  title?: string;
  items: NavItem[];
}

const sidebarConfig: Record<UserRole, { title: string; icon: React.ElementType; color: string; groups: SidebarGroup[] }> = {
  owner: {
    title: "Pet Owner",
    icon: PawPrint,
    color: "from-orange-500 to-orange-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
        { label: "My Pets", href: "/dashboard/owner/pets", icon: PawPrint },
        { label: "Notifications", href: "/dashboard/owner/notifications", icon: Bell, badge: 2 },
      ]},
      { title: "Health", items: [
        { label: "Health Records", href: "/dashboard/owner/health", icon: Heart },
        { label: "Vaccinations", href: "/dashboard/owner/vaccinations", icon: Syringe },
        { label: "Growth Tracking", href: "/dashboard/owner/growth", icon: TrendingUp },
        { label: "Allergy Records", href: "/dashboard/owner/allergies", icon: AlertCircle },
        { label: "Telemedicine", href: "/dashboard/owner/telemedicine", icon: MessageSquare },
        { label: "Prescriptions", href: "/dashboard/owner/prescriptions", icon: Pill },
        { label: "Nutrition", href: "/dashboard/owner/nutrition", icon: Activity },
        { label: "Medications", href: "/dashboard/owner/medications", icon: Bell },
      ]},
      { title: "Services", items: [
        { label: "Vet Appointments", href: "/dashboard/owner/appointments", icon: Calendar },
        { label: "Grooming", href: "/dashboard/owner/grooming", icon: Scissors },
        { label: "Training", href: "/dashboard/owner/training", icon: Dumbbell },
        { label: "Adoption", href: "/dashboard/owner/adoption", icon: Home },
      ]},
      { title: "Shop", items: [
        { label: "Marketplace", href: "/dashboard/owner/shop", icon: ShoppingBag },
        { label: "My Cart", href: "/dashboard/owner/cart", icon: ShoppingCart },
        { label: "Wishlist", href: "/dashboard/owner/wishlist", icon: Bookmark },
        { label: "My Orders", href: "/dashboard/owner/orders", icon: Package },
      ]},
      { title: "Community", items: [
        { label: "Community", href: "/dashboard/owner/community", icon: Users },
        { label: "Membership", href: "/dashboard/owner/membership", icon: Star },
        { label: "Settings", href: "/dashboard/owner/settings", icon: Settings },
      ]},
    ],
  },
  vet: {
    title: "Veterinarian",
    icon: Stethoscope,
    color: "from-sky-500 to-sky-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/vet", icon: LayoutDashboard },
        { label: "Appointments", href: "/dashboard/vet/appointments", icon: Calendar },
        { label: "Schedule", href: "/dashboard/vet/schedule", icon: Calendar },
      ]},
      { title: "Patients", items: [
        { label: "Patients", href: "/dashboard/vet/patients", icon: PawPrint },
        { label: "Consultations", href: "/dashboard/vet/consultations", icon: MessageSquare },
        { label: "Prescriptions", href: "/dashboard/vet/prescriptions", icon: Pill },
        { label: "Medical Records", href: "/dashboard/vet/records", icon: FileText },
        { label: "Vaccinations", href: "/dashboard/vet/vaccinations", icon: Syringe },
        { label: "Lab Reports", href: "/dashboard/vet/labs", icon: Activity },
        { label: "Follow-Ups", href: "/dashboard/vet/followups", icon: ClipboardList },
      ]},
      { title: "Business", items: [
        { label: "Analytics", href: "/dashboard/vet/analytics", icon: BarChart3 },
        { label: "Revenue", href: "/dashboard/vet/revenue", icon: DollarSign },
        { label: "Reviews", href: "/dashboard/vet/reviews", icon: Star },
        { label: "Notifications", href: "/dashboard/vet/notifications", icon: Bell },
        { label: "Profile", href: "/dashboard/vet/profile", icon: Settings },
      ]},
    ],
  },
  groomer: {
    title: "Groomer",
    icon: Scissors,
    color: "from-purple-500 to-purple-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/groomer", icon: LayoutDashboard },
        { label: "Bookings", href: "/dashboard/groomer/bookings", icon: Calendar },
        { label: "Calendar", href: "/dashboard/groomer/calendar", icon: Calendar },
      ]},
      { title: "Business", items: [
        { label: "Services", href: "/dashboard/groomer/services", icon: Scissors },
        { label: "Customers", href: "/dashboard/groomer/customers", icon: Users },
        { label: "Reviews", href: "/dashboard/groomer/reviews", icon: Star },
        { label: "Earnings", href: "/dashboard/groomer/earnings", icon: DollarSign },
        { label: "Reports", href: "/dashboard/groomer/reports", icon: BarChart3 },
        { label: "Notifications", href: "/dashboard/groomer/notifications", icon: Bell },
        { label: "Profile", href: "/dashboard/groomer/profile", icon: Settings },
      ]},
    ],
  },
  trainer: {
    title: "Trainer",
    icon: Dumbbell,
    color: "from-amber-500 to-amber-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/trainer", icon: LayoutDashboard },
        { label: "Sessions", href: "/dashboard/trainer/sessions", icon: Calendar },
        { label: "Programs", href: "/dashboard/trainer/programs", icon: BookOpen },
      ]},
      { title: "Business", items: [
        { label: "Assessments", href: "/dashboard/trainer/assessments", icon: ClipboardList },
        { label: "Progress Tracking", href: "/dashboard/trainer/progress", icon: TrendingUp },
        { label: "Reports", href: "/dashboard/trainer/reports", icon: BarChart3 },
        { label: "Earnings", href: "/dashboard/trainer/earnings", icon: DollarSign },
        { label: "Reviews", href: "/dashboard/trainer/reviews", icon: Star },
        { label: "Notifications", href: "/dashboard/trainer/notifications", icon: Bell },
        { label: "Profile", href: "/dashboard/trainer/profile", icon: Settings },
      ]},
    ],
  },
  vendor: {
    title: "Vendor",
    icon: Store,
    color: "from-emerald-500 to-emerald-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/vendor", icon: LayoutDashboard },
        { label: "Orders", href: "/dashboard/vendor/orders", icon: ShoppingBag, badge: 5 },
        { label: "Products", href: "/dashboard/vendor/products", icon: Package },
      ]},
      { title: "Catalog", items: [
        { label: "Categories", href: "/dashboard/vendor/categories", icon: Tag },
        { label: "Inventory", href: "/dashboard/vendor/inventory", icon: Database },
        { label: "Coupons", href: "/dashboard/vendor/coupons", icon: Gift },
        { label: "Promotions", href: "/dashboard/vendor/promotions", icon: Award },
      ]},
      { title: "Business", items: [
        { label: "Customers", href: "/dashboard/vendor/customers", icon: Users },
        { label: "Analytics", href: "/dashboard/vendor/analytics", icon: BarChart3 },
        { label: "Revenue", href: "/dashboard/vendor/revenue", icon: DollarSign },
        { label: "Store Settings", href: "/dashboard/vendor/store", icon: Store },
        { label: "Notifications", href: "/dashboard/vendor/notifications", icon: Bell },
      ]},
    ],
  },
  shelter: {
    title: "Shelter",
    icon: Home,
    color: "from-pink-500 to-pink-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/shelter", icon: LayoutDashboard },
        { label: "Pet Listings", href: "/dashboard/shelter/listings", icon: PawPrint },
        { label: "Applications", href: "/dashboard/shelter/applications", icon: FileText, badge: 3 },
      ]},
      { title: "Operations", items: [
        { label: "Rescue Requests", href: "/dashboard/shelter/rescue", icon: AlertCircle },
        { label: "Foster Programs", href: "/dashboard/shelter/foster", icon: Heart },
        { label: "Adoption Tracking", href: "/dashboard/shelter/tracking", icon: TrendingUp },
        { label: "Reports", href: "/dashboard/shelter/reports", icon: BarChart3 },
        { label: "Notifications", href: "/dashboard/shelter/notifications", icon: Bell },
        { label: "Organization Profile", href: "/dashboard/shelter/profile", icon: Settings },
      ]},
    ],
  },
  admin: {
    title: "Admin",
    icon: Shield,
    color: "from-violet-500 to-violet-600",
    groups: [
      { title: "Overview", items: [
        { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Revenue", href: "/dashboard/admin/revenue", icon: DollarSign },
        { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
      ]},
      { title: "Users", items: [
        { label: "All Users", href: "/dashboard/admin/users", icon: Users },
        { label: "Veterinarians", href: "/dashboard/admin/vets", icon: Stethoscope },
        { label: "Groomers", href: "/dashboard/admin/groomers", icon: Scissors },
        { label: "Trainers", href: "/dashboard/admin/trainers", icon: Dumbbell },
        { label: "Vendors", href: "/dashboard/admin/vendors", icon: Store },
        { label: "Shelters", href: "/dashboard/admin/shelters", icon: Home },
      ]},
      { title: "Platform", items: [
        { label: "Marketplace", href: "/dashboard/admin/marketplace", icon: ShoppingBag },
        { label: "Orders", href: "/dashboard/admin/orders", icon: Package, badge: 12 },
        { label: "Appointments", href: "/dashboard/admin/appointments", icon: Calendar },
        { label: "Adoptions", href: "/dashboard/admin/adoptions", icon: Heart },
        { label: "Community", href: "/dashboard/admin/community", icon: Globe },
        { label: "Blog", href: "/dashboard/admin/blog", icon: BookOpen },
        { label: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: Star },
      ]},
      { title: "System", items: [
        { label: "AI Monitor", href: "/dashboard/admin/ai", icon: Activity },
        { label: "System", href: "/dashboard/admin/system", icon: Database },
        { label: "Roles & Permissions", href: "/dashboard/admin/roles", icon: Shield },
        { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
      ]},
    ],
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const role = (user?.role || "owner") as UserRole;
  const config = sidebarConfig[role];

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090B12] flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full z-50 w-64 flex flex-col transition-all duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )} style={{
        background: "linear-gradient(180deg, #060810 0%, #080A14 100%)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.4), 1px 0 0 rgba(255,255,255,0.03)"
      }}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={cn("w-8 h-8 bg-gradient-to-br rounded-xl flex items-center justify-center", config.color)}
              style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="font-poppins font-bold text-lg text-white tracking-tight">
              Pet<span className="text-brand-orange">Zoo</span>
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/4">
            <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0", config.color)}>
              {getInitials(user?.name || "U")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-semibold truncate leading-tight">{user?.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <config.icon className="w-3 h-3 text-slate-500" />
                <p className="text-slate-500 text-xs capitalize">{role}</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" title="Online" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4 smooth-scroll">
          {config.groups.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-3 mb-1.5">
                  {group.title}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href.split("/").length === 3}
                    className={({ isActive }) => cn(isActive ? "sidebar-link-active" : "sidebar-link")}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0 opacity-80" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="bg-brand-orange text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-0.5">
          <Link to="/" className="sidebar-link text-sm">
            <Globe className="w-4 h-4 opacity-70" /> Back to Website
          </Link>
          <button onClick={handleLogout} className="sidebar-link text-sm w-full text-red-400 hover:text-red-300" style={{ background: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}>
            <LogOut className="w-4 h-4 opacity-80" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#090B12]/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5 px-4 lg:px-6 h-14 flex items-center justify-between"
          style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            {title && (
              <div className="flex items-center gap-2">
                <h1 className="font-poppins font-semibold text-lg text-slate-900 dark:text-white">{title}</h1>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 hover:text-slate-900 dark:hover:text-white transition-all">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to={`/dashboard/${role}/notifications`}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 hover:text-slate-900 dark:hover:text-white transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full ring-2 ring-white dark:ring-[#090B12]" />
            </Link>
            <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold", config.color)}>
              {getInitials(user?.name || "U")}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
