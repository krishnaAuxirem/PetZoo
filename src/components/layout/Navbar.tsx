import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu, X, Sun, Moon, ChevronDown, Bell, ShoppingCart,
  LogOut, Settings, LayoutDashboard, PawPrint,
  Stethoscope, Scissors, Dumbbell, Heart, Home, Package,
  ShoppingBag, Cpu, Apple, Pill, Gift, Users, Calendar,
  BookOpen, MessageCircle, HelpCircle, Phone, Trophy,
  Zap, ArrowRight, Sparkles
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { cn, getInitials } from "@/lib/utils";
import { mockNotifications } from "@/lib/mockData";

/* ─── Mega Menu Data ───────────────────────────────────────────────────── */
const servicesMenu = {
  label: "Services",
  cols: [
    {
      heading: "Health & Care",
      items: [
        { icon: Stethoscope, label: "Veterinarians", desc: "Book vet appointments & telemedicine", href: "/veterinarians", color: "text-sky-500", bg: "bg-sky-500/10" },
        { icon: Pill, label: "Pet Wellness", desc: "Vaccination & medication reminders", href: "/services#wellness", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { icon: Cpu, label: "Telemedicine", desc: "Virtual vet consultations 24/7", href: "/veterinarians#tele", color: "text-violet-500", bg: "bg-violet-500/10" },
      ],
    },
    {
      heading: "Services",
      items: [
        { icon: Scissors, label: "Grooming", desc: "Premium grooming & spa services", href: "/grooming", color: "text-pink-500", bg: "bg-pink-500/10" },
        { icon: Dumbbell, label: "Training", desc: "Expert behavioural training programs", href: "/training", color: "text-amber-500", bg: "bg-amber-500/10" },
        { icon: Home, label: "Pet Boarding", desc: "Safe boarding & sitting services", href: "/services#boarding", color: "text-teal-500", bg: "bg-teal-500/10" },
      ],
    },
    {
      heading: "More",
      items: [
        { icon: Heart, label: "Adoption", desc: "Find your perfect companion", href: "/adoption", color: "text-rose-500", bg: "bg-rose-500/10" },
        { icon: Package, label: "Pet Transportation", desc: "Safe door-to-door pet transport", href: "/services#transport", color: "text-purple-500", bg: "bg-purple-500/10" },
        { icon: Zap, label: "AI Assistant", desc: "24/7 intelligent pet care advisor", href: "/#ai-assistant", color: "text-orange-500", bg: "bg-orange-500/10" },
      ],
    },
  ],
};

const marketplaceMenu = {
  items: [
    { icon: Apple, label: "Pet Food", desc: "Premium nutrition for all pets", href: "/marketplace?cat=Food", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: ShoppingBag, label: "Accessories", desc: "Collars, leashes, beds & more", href: "/marketplace?cat=Accessories", color: "text-sky-500", bg: "bg-sky-500/10" },
    { icon: Gift, label: "Toys", desc: "Interactive & enrichment toys", href: "/marketplace?cat=Toys", color: "text-pink-500", bg: "bg-pink-500/10" },
    { icon: Pill, label: "Healthcare Products", desc: "Supplements, flea & tick control", href: "/marketplace?cat=Healthcare", color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Package, label: "Subscription Boxes", desc: "Monthly curated pet boxes", href: "/marketplace?cat=Subscription", color: "text-violet-500", bg: "bg-violet-500/10" },
    { icon: ShoppingCart, label: "All Products", desc: "Browse 25,000+ products", href: "/marketplace", color: "text-brand-orange", bg: "bg-orange-500/10" },
  ],
};

const communityMenu = {
  items: [
    { icon: Users, label: "Groups", desc: "Breed-specific communities", href: "/community#groups", color: "text-sky-500", bg: "bg-sky-500/10" },
    { icon: Calendar, label: "Events", desc: "Pet meetups & competitions", href: "/community#events", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: BookOpen, label: "Stories", desc: "Pet owner stories & tips", href: "/community#stories", color: "text-pink-500", bg: "bg-pink-500/10" },
    { icon: Trophy, label: "Competitions", desc: "Monthly pet contests & prizes", href: "/community#competitions", color: "text-amber-500", bg: "bg-amber-500/10" },
  ],
};

const resourcesMenu = {
  items: [
    { icon: BookOpen, label: "Blog", desc: "Expert pet care articles & guides", href: "/blog", color: "text-sky-500", bg: "bg-sky-500/10" },
    { icon: HelpCircle, label: "FAQ", desc: "Frequently asked questions", href: "/faq", color: "text-violet-500", bg: "bg-violet-500/10" },
    { icon: MessageCircle, label: "Help Center", desc: "Guides, tutorials & support docs", href: "/help", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: Phone, label: "Contact Us", desc: "Reach our support team", href: "/contact", color: "text-orange-500", bg: "bg-orange-500/10" },
  ],
};

/* ─── Announcement Bar ─────────────────────────────────────────────────── */
const announcements = [
  "✦ Trusted by 48,000+ Pet Families — Join the world's most loved pet platform",
  "✦ 20% Off First Vet Consultation — Use Code: PETZOO20",
  "✦ New: AI Health Reports now available for Premium Members",
];

function AnnouncementBar({ visible }: { visible: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={cn(
      "relative overflow-hidden transition-all duration-500",
      visible ? "h-9 opacity-100" : "h-0 opacity-0 pointer-events-none"
    )}>
      <div className="h-9 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent" />
        <span className="relative text-white/75 text-xs font-medium tracking-wide">
          {announcements[idx]}
          <Link to="/register" className="ml-3 text-brand-orange font-semibold hover:text-orange-400 inline-flex items-center gap-1 transition-colors">
            Get Started <ArrowRight className="w-3 h-3" />
          </Link>
        </span>
      </div>
    </div>
  );
}

/* ─── Mega Menu Panels ──────────────────────────────────────────────────── */
function ServicesDrop({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[720px] rounded-2xl overflow-hidden z-50"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)" }}>
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-white/6 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-sky-50 dark:from-orange-500/5 dark:to-sky-500/5 px-6 py-4 border-b border-slate-200/80 dark:border-white/6 flex items-center justify-between">
          <div>
            <p className="font-poppins font-semibold text-slate-900 dark:text-white text-sm">Our Services</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Comprehensive pet care solutions</p>
          </div>
          <Link to="/services" onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-orange-500 transition-colors bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-lg">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-white/5">
          {servicesMenu.cols.map(col => (
            <div key={col.heading} className="p-4 space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-3">{col.heading}</p>
              {col.items.map(item => (
                <Link key={item.label} to={item.href} onClick={onClose}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/4 transition-colors group">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                    <item.icon className={cn("w-4 h-4", item.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">{item.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimpleDrop({ items, onClose, viewAllHref, viewAllLabel, columns = 1 }: {
  items: { icon: React.ElementType; label: string; desc: string; href: string; color: string; bg: string }[];
  onClose: () => void; viewAllHref: string; viewAllLabel: string; columns?: number;
}) {
  return (
    <div className={cn(
      "absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-2xl overflow-hidden z-50",
      columns === 2 ? "w-[420px]" : "w-[260px]"
    )} style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)" }}>
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-white/6 rounded-2xl overflow-hidden">
        <div className={cn("p-3", columns === 2 ? "grid grid-cols-2 gap-0.5" : "space-y-0.5")}>
          {items.map(item => (
            <Link key={item.label} to={item.href} onClick={onClose}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/4 transition-colors group">
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                <item.icon className={cn("w-3.5 h-3.5", item.color)} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors leading-tight">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="border-t border-slate-100 dark:border-white/5 px-4 py-3">
          <Link to={viewAllHref} onClick={onClose}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-orange-500 transition-colors">
            {viewAllLabel} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Accordion ──────────────────────────────────────────────────── */
function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 transition-colors">
        {label}
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-orange/20 pl-3">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────────────────── */
type DropKey = "services" | "marketplace" | "community" | "resources" | null;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<DropKey>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const unread = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setAnnouncementVisible(window.scrollY < 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-nav-area]")) {
        setActiveDropdown(null);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openDrop = (key: DropKey) => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setActiveDropdown(key);
  };
  const closeDrop = () => {
    dropTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    const paths: Record<string, string> = {
      owner: "/dashboard/owner", vet: "/dashboard/vet",
      groomer: "/dashboard/groomer", trainer: "/dashboard/trainer",
      vendor: "/dashboard/vendor", shelter: "/dashboard/shelter",
      admin: "/dashboard/admin",
    };
    return paths[user.role] || "/dashboard/owner";
  };

  const handleLogout = () => { logout(); setProfileOpen(false); navigate("/"); };

  const navLinkCls = (active?: boolean) => cn(
    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 select-none cursor-pointer whitespace-nowrap",
    active
      ? "text-slate-900 dark:text-white"
      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
  );

  return (
    <>
      <AnnouncementBar visible={announcementVisible} />

      <nav
        data-nav-area
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-[#090B12]/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5"
            : "bg-white/70 dark:bg-transparent backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5",
        )}
        style={scrolled ? {
          boxShadow: theme === "dark"
            ? "0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)"
            : "0 1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)"
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-14" : "h-16")}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center shadow-orange group-hover:scale-105 transition-transform">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <span className="font-poppins font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Pet<span className="text-brand-orange">Zoo</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5" data-nav-area>
              <NavLink to="/" end className={({ isActive }) => cn(navLinkCls(isActive), isActive && "font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-orange after:rounded-full")}>
                Home
              </NavLink>

              {(["services", "marketplace", "community"] as DropKey[]).map((key) => {
                const labels: Record<string, string> = { services: "Services", marketplace: "Marketplace", community: "Community" };
                return (
                  <div key={key} className="relative"
                    onMouseEnter={() => openDrop(key)}
                    onMouseLeave={closeDrop}>
                    <button className={cn(navLinkCls(activeDropdown === key), activeDropdown === key && "font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-orange after:rounded-full")}>
                      {labels[key]}
                      <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", activeDropdown === key && "rotate-180 text-brand-orange")} />
                    </button>
                    {activeDropdown === key && key === "services" && <ServicesDrop onClose={() => setActiveDropdown(null)} />}
                    {activeDropdown === key && key === "marketplace" && (
                      <SimpleDrop items={marketplaceMenu.items} onClose={() => setActiveDropdown(null)} viewAllHref="/marketplace" viewAllLabel="Browse all 25,000+ products" columns={2} />
                    )}
                    {activeDropdown === key && key === "community" && (
                      <SimpleDrop items={communityMenu.items} onClose={() => setActiveDropdown(null)} viewAllHref="/community" viewAllLabel="Explore the community" />
                    )}
                  </div>
                );
              })}

              <NavLink to="/pricing" className={({ isActive }) => cn(navLinkCls(isActive), isActive && "font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-orange after:rounded-full")}>
                Pricing
              </NavLink>

              <div className="relative" onMouseEnter={() => openDrop("resources")} onMouseLeave={closeDrop}>
                <button className={cn(navLinkCls(activeDropdown === "resources"), activeDropdown === "resources" && "font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-orange after:rounded-full")}>
                  Resources
                  <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", activeDropdown === "resources" && "rotate-180 text-brand-orange")} />
                </button>
                {activeDropdown === "resources" && (
                  <SimpleDrop items={resourcesMenu.items} onClose={() => setActiveDropdown(null)} viewAllHref="/blog" viewAllLabel="Visit the blog" />
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1" data-nav-area>
              <button onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 hover:text-slate-900 dark:hover:text-white transition-all"
                title="Toggle theme">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {isAuthenticated ? (
                <>
                  <Link to="/marketplace"
                    className="hidden md:flex p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 hover:text-slate-900 dark:hover:text-white transition-all relative">
                    <ShoppingCart className="w-4 h-4" />
                  </Link>
                  <Link to={`${getDashboardPath()}/notifications`}
                    className="hidden md:flex p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 hover:text-slate-900 dark:hover:text-white transition-all relative">
                    <Bell className="w-4 h-4" />
                    {unread > 0 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full ring-2 ring-white dark:ring-dark-bg" />}
                  </Link>

                  <div className="relative">
                    <button onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/6 transition-all ml-0.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-orange to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-orange">
                        {getInitials(user?.name || "U")}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{user?.name?.split(" ")[0]}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize leading-tight">{user?.role}</p>
                      </div>
                      <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform hidden md:block", profileOpen && "rotate-180")} />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden z-50 animate-scale-in"
                        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)" }}>
                        <div className="bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-white/6 rounded-2xl overflow-hidden">
                          <div className="p-4 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-500/5 border-b border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-orange">
                                {getInitials(user?.name || "U")}
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">{user?.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role} Account</p>
                              </div>
                            </div>
                          </div>
                          <div className="py-1.5">
                            <Link to={getDashboardPath()} onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 hover:text-slate-900 dark:hover:text-white transition-colors">
                              <LayoutDashboard className="w-4 h-4 text-brand-orange" /> Dashboard
                            </Link>
                            <Link to={`${getDashboardPath()}/settings`} onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 hover:text-slate-900 dark:hover:text-white transition-colors">
                              <Settings className="w-4 h-4 text-slate-400" /> Settings
                            </Link>
                          </div>
                          <div className="border-t border-slate-100 dark:border-white/5 py-1.5">
                            <button onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors">
                              <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2 ml-1">
                  <Link to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/6 transition-all">
                    Sign In
                  </Link>
                  <Link to="/register"
                    className="px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all btn-primary">
                    Get Started
                  </Link>
                </div>
              )}

              <button onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/6 transition-all ml-1">
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[88vh] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="bg-white dark:bg-[#090B12] border-t border-slate-200/60 dark:border-white/5 p-4 space-y-1 overflow-y-auto max-h-[85vh]">
            <NavLink to="/" end onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn("block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive ? "text-brand-orange bg-orange-50 dark:bg-orange-500/8 font-semibold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4")}>
              Home
            </NavLink>

            <MobileAccordion label="Services">
              {servicesMenu.cols.flatMap(c => c.items).map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 transition-colors">
                  <item.icon className={cn("w-4 h-4", item.color)} /> {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion label="Marketplace">
              {marketplaceMenu.items.map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 transition-colors">
                  <item.icon className={cn("w-4 h-4", item.color)} /> {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion label="Community">
              {communityMenu.items.map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 transition-colors">
                  <item.icon className={cn("w-4 h-4", item.color)} /> {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <NavLink to="/pricing" onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn("block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive ? "text-brand-orange bg-orange-50 dark:bg-orange-500/8 font-semibold" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4")}>
              Pricing
            </NavLink>

            <MobileAccordion label="Resources">
              {resourcesMenu.items.map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/4 transition-colors">
                  <item.icon className={cn("w-4 h-4", item.color)} /> {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <div className="pt-3 border-t border-slate-100 dark:border-white/6 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 dark:bg-orange-500/8 rounded-xl">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(user?.name || "U")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <Link to={getDashboardPath()} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 bg-brand-orange text-white rounded-xl font-semibold text-sm justify-center">
                    <LayoutDashboard className="w-4 h-4" /> My Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-500 bg-red-50 dark:bg-red-500/8 rounded-xl font-medium text-sm justify-center">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 border border-slate-200 dark:border-white/8 rounded-xl text-sm font-medium text-center text-slate-700 dark:text-slate-300 hover:border-brand-orange hover:text-brand-orange transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-brand-orange text-white rounded-xl text-sm font-semibold text-center hover:bg-orange-600 transition-colors">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
