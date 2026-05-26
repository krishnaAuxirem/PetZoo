import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, PawPrint, Heart, Calendar, ShoppingBag, Users,
  Settings, Bell, LogOut, Menu, X, ChevronRight, Sun, Moon,
  Stethoscope, Scissors, Dumbbell, Package, Home, Shield, TrendingUp,
  MessageSquare, FileText, Star, Gift, BarChart3, AlertCircle, Database,
  BookOpen, Syringe, Scale, Pill, Activity, ShoppingCart, Bookmark,
  Award, ClipboardList, DollarSign, Store, Tag, Truck, Globe
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
  children?: NavItem[];
}

const sidebarConfig: Record<UserRole, { title: string; icon: React.ElementType; items: NavItem[] }> = {
  owner: {
    title: "Pet Owner",
    icon: PawPrint,
    items: [
      { label: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
      { label: "My Pets", href: "/dashboard/owner/pets", icon: PawPrint },
      { label: "Health Records", href: "/dashboard/owner/health", icon: Heart },
      { label: "Vaccinations", href: "/dashboard/owner/vaccinations", icon: Syringe },
      { label: "Growth Tracking", href: "/dashboard/owner/growth", icon: TrendingUp },
      { label: "Allergy Records", href: "/dashboard/owner/allergies", icon: AlertCircle },
      { label: "Vet Appointments", href: "/dashboard/owner/appointments", icon: Calendar },
      { label: "Telemedicine", href: "/dashboard/owner/telemedicine", icon: MessageSquare },
      { label: "Prescriptions", href: "/dashboard/owner/prescriptions", icon: Pill },
      { label: "Weight Tracking", href: "/dashboard/owner/weight", icon: Scale },
      { label: "Nutrition", href: "/dashboard/owner/nutrition", icon: Activity },
      { label: "Medication Reminders", href: "/dashboard/owner/medications", icon: Bell },
      { label: "Marketplace", href: "/dashboard/owner/shop", icon: ShoppingBag },
      { label: "My Cart", href: "/dashboard/owner/cart", icon: ShoppingCart },
      { label: "Wishlist", href: "/dashboard/owner/wishlist", icon: Bookmark },
      { label: "My Orders", href: "/dashboard/owner/orders", icon: Package },
      { label: "Grooming", href: "/dashboard/owner/grooming", icon: Scissors },
      { label: "Training", href: "/dashboard/owner/training", icon: Dumbbell },
      { label: "Adoption", href: "/dashboard/owner/adoption", icon: Home },
      { label: "Community", href: "/dashboard/owner/community", icon: Users },
      { label: "Membership", href: "/dashboard/owner/membership", icon: Star },
      { label: "Notifications", href: "/dashboard/owner/notifications", icon: Bell, badge: 2 },
      { label: "Settings", href: "/dashboard/owner/settings", icon: Settings },
    ],
  },
  vet: {
    title: "Veterinarian",
    icon: Stethoscope,
    items: [
      { label: "Dashboard", href: "/dashboard/vet", icon: LayoutDashboard },
      { label: "Appointments", href: "/dashboard/vet/appointments", icon: Calendar },
      { label: "Patients", href: "/dashboard/vet/patients", icon: PawPrint },
      { label: "Consultations", href: "/dashboard/vet/consultations", icon: MessageSquare },
      { label: "Prescriptions", href: "/dashboard/vet/prescriptions", icon: Pill },
      { label: "Medical Records", href: "/dashboard/vet/records", icon: FileText },
      { label: "Vaccinations", href: "/dashboard/vet/vaccinations", icon: Syringe },
      { label: "Lab Reports", href: "/dashboard/vet/labs", icon: Activity },
      { label: "Follow-Ups", href: "/dashboard/vet/followups", icon: ClipboardList },
      { label: "Schedule", href: "/dashboard/vet/schedule", icon: Calendar },
      { label: "Analytics", href: "/dashboard/vet/analytics", icon: BarChart3 },
      { label: "Revenue", href: "/dashboard/vet/revenue", icon: DollarSign },
      { label: "Reviews", href: "/dashboard/vet/reviews", icon: Star },
      { label: "Notifications", href: "/dashboard/vet/notifications", icon: Bell },
      { label: "Profile", href: "/dashboard/vet/profile", icon: Settings },
    ],
  },
  groomer: {
    title: "Groomer",
    icon: Scissors,
    items: [
      { label: "Dashboard", href: "/dashboard/groomer", icon: LayoutDashboard },
      { label: "Bookings", href: "/dashboard/groomer/bookings", icon: Calendar },
      { label: "Services", href: "/dashboard/groomer/services", icon: Scissors },
      { label: "Calendar", href: "/dashboard/groomer/calendar", icon: Calendar },
      { label: "Customers", href: "/dashboard/groomer/customers", icon: Users },
      { label: "Reviews", href: "/dashboard/groomer/reviews", icon: Star },
      { label: "Earnings", href: "/dashboard/groomer/earnings", icon: DollarSign },
      { label: "Reports", href: "/dashboard/groomer/reports", icon: BarChart3 },
      { label: "Notifications", href: "/dashboard/groomer/notifications", icon: Bell },
      { label: "Profile", href: "/dashboard/groomer/profile", icon: Settings },
    ],
  },
  trainer: {
    title: "Trainer",
    icon: Dumbbell,
    items: [
      { label: "Dashboard", href: "/dashboard/trainer", icon: LayoutDashboard },
      { label: "Programs", href: "/dashboard/trainer/programs", icon: BookOpen },
      { label: "Sessions", href: "/dashboard/trainer/sessions", icon: Calendar },
      { label: "Assessments", href: "/dashboard/trainer/assessments", icon: ClipboardList },
      { label: "Progress Tracking", href: "/dashboard/trainer/progress", icon: TrendingUp },
      { label: "Reports", href: "/dashboard/trainer/reports", icon: BarChart3 },
      { label: "Earnings", href: "/dashboard/trainer/earnings", icon: DollarSign },
      { label: "Reviews", href: "/dashboard/trainer/reviews", icon: Star },
      { label: "Notifications", href: "/dashboard/trainer/notifications", icon: Bell },
      { label: "Profile", href: "/dashboard/trainer/profile", icon: Settings },
    ],
  },
  vendor: {
    title: "Vendor",
    icon: Store,
    items: [
      { label: "Dashboard", href: "/dashboard/vendor", icon: LayoutDashboard },
      { label: "Products", href: "/dashboard/vendor/products", icon: Package },
      { label: "Categories", href: "/dashboard/vendor/categories", icon: Tag },
      { label: "Inventory", href: "/dashboard/vendor/inventory", icon: Database },
      { label: "Orders", href: "/dashboard/vendor/orders", icon: ShoppingBag, badge: 5 },
      { label: "Customers", href: "/dashboard/vendor/customers", icon: Users },
      { label: "Coupons", href: "/dashboard/vendor/coupons", icon: Gift },
      { label: "Promotions", href: "/dashboard/vendor/promotions", icon: Award },
      { label: "Analytics", href: "/dashboard/vendor/analytics", icon: BarChart3 },
      { label: "Revenue", href: "/dashboard/vendor/revenue", icon: DollarSign },
      { label: "Store Settings", href: "/dashboard/vendor/store", icon: Store },
      { label: "Notifications", href: "/dashboard/vendor/notifications", icon: Bell },
    ],
  },
  shelter: {
    title: "Shelter",
    icon: Home,
    items: [
      { label: "Dashboard", href: "/dashboard/shelter", icon: LayoutDashboard },
      { label: "Pet Listings", href: "/dashboard/shelter/listings", icon: PawPrint },
      { label: "Applications", href: "/dashboard/shelter/applications", icon: FileText, badge: 3 },
      { label: "Rescue Requests", href: "/dashboard/shelter/rescue", icon: AlertCircle },
      { label: "Foster Programs", href: "/dashboard/shelter/foster", icon: Heart },
      { label: "Adoption Tracking", href: "/dashboard/shelter/tracking", icon: TrendingUp },
      { label: "Reports", href: "/dashboard/shelter/reports", icon: BarChart3 },
      { label: "Notifications", href: "/dashboard/shelter/notifications", icon: Bell },
      { label: "Organization Profile", href: "/dashboard/shelter/profile", icon: Settings },
    ],
  },
  admin: {
    title: "Admin",
    icon: Shield,
    items: [
      { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Pet Owners", href: "/dashboard/admin/owners", icon: PawPrint },
      { label: "Veterinarians", href: "/dashboard/admin/vets", icon: Stethoscope },
      { label: "Trainers", href: "/dashboard/admin/trainers", icon: Dumbbell },
      { label: "Groomers", href: "/dashboard/admin/groomers", icon: Scissors },
      { label: "Vendors", href: "/dashboard/admin/vendors", icon: Store },
      { label: "Shelters", href: "/dashboard/admin/shelters", icon: Home },
      { label: "Marketplace", href: "/dashboard/admin/marketplace", icon: ShoppingBag },
      { label: "Orders", href: "/dashboard/admin/orders", icon: Package, badge: 12 },
      { label: "Products", href: "/dashboard/admin/products", icon: Tag },
      { label: "Appointments", href: "/dashboard/admin/appointments", icon: Calendar },
      { label: "Adoptions", href: "/dashboard/admin/adoptions", icon: Heart },
      { label: "Community", href: "/dashboard/admin/community", icon: Globe },
      { label: "Blog", href: "/dashboard/admin/blog", icon: BookOpen },
      { label: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: Star },
      { label: "Revenue", href: "/dashboard/admin/revenue", icon: DollarSign },
      { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
      { label: "AI Monitor", href: "/dashboard/admin/ai", icon: Activity },
      { label: "System", href: "/dashboard/admin/system", icon: Database },
      { label: "Roles", href: "/dashboard/admin/roles", icon: Shield },
      { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
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
  const role = user?.role || "owner";
  const config = sidebarConfig[role];

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full z-50 w-64 xl:w-72 bg-light-sidebar dark:bg-dark-sidebar flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-orange-400 rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-white">Pet<span className="text-brand-orange">Zoo</span></span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {getInitials(user?.name || "U")}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
              <div className="flex items-center gap-1">
                <config.icon className="w-3 h-3 text-brand-orange" />
                <p className="text-slate-400 text-xs capitalize">{role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {config.items.map((item) => (
            <NavLink key={item.href} to={item.href} end={item.href === `/dashboard/${role}`}
              className={({ isActive }) => cn(isActive ? "sidebar-link-active" : "sidebar-link", "text-sm")}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-brand-orange text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/" className="sidebar-link text-sm">
            <Globe className="w-4 h-4" /> Back to Website
          </Link>
          <button onClick={handleLogout} className="sidebar-link text-sm w-full text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 xl:ml-72 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-light-border dark:border-dark-border px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover">
                <Menu className="w-5 h-5" />
              </button>
              {title && <h1 className="font-poppins font-semibold text-lg text-light-text dark:text-dark-heading">{title}</h1>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link to={`/dashboard/${role}/notifications`} className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full" />
              </Link>
              <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white text-xs font-bold">
                {getInitials(user?.name || "U")}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
