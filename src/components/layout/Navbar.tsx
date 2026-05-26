import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu, X, Sun, Moon, ChevronDown, Bell, ShoppingCart,
  LogOut, Settings, LayoutDashboard, PawPrint,
  Stethoscope, Scissors, Dumbbell, Heart, Home, Package,
  ShoppingBag, Cpu, Apple, Pill, Gift, Users, Calendar,
  BookOpen, MessageCircle, HelpCircle, Phone, Trophy,
  Zap, ArrowRight
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
        { icon: Stethoscope, label: "Veterinarians", desc: "Book vet appointments & telemedicine", href: "/veterinarians", color: "text-sky-500" },
        { icon: Pill, label: "Pet Wellness", desc: "Vaccination & medication reminders", href: "/services#wellness", color: "text-green-500" },
        { icon: Cpu, label: "Telemedicine", desc: "Virtual vet consultations 24/7", href: "/veterinarians#tele", color: "text-indigo-500" },
      ],
    },
    {
      heading: "Services",
      items: [
        { icon: Scissors, label: "Grooming", desc: "Premium grooming & spa services", href: "/grooming", color: "text-pink-500" },
        { icon: Dumbbell, label: "Training", desc: "Expert behavioural training programs", href: "/training", color: "text-amber-500" },
        { icon: Home, label: "Pet Boarding", desc: "Safe boarding & sitting services", href: "/services#boarding", color: "text-teal-500" },
      ],
    },
    {
      heading: "More",
      items: [
        { icon: Heart, label: "Adoption", desc: "Find your perfect companion", href: "/adoption", color: "text-rose-500" },
        { icon: Package, label: "Pet Transportation", desc: "Safe door-to-door pet transport", href: "/services#transport", color: "text-purple-500" },
        { icon: Zap, label: "AI Assistant", desc: "24/7 intelligent pet care advisor", href: "/#ai-assistant", color: "text-orange-500" },
      ],
    },
  ],
};

const marketplaceMenu = {
  label: "Marketplace",
  items: [
    { icon: Apple, label: "Pet Food", desc: "Premium nutrition for all pets", href: "/marketplace?cat=Food", color: "text-green-500" },
    { icon: ShoppingBag, label: "Accessories", desc: "Collars, leashes, beds & more", href: "/marketplace?cat=Accessories", color: "text-sky-500" },
    { icon: Gift, label: "Toys", desc: "Interactive & enrichment toys", href: "/marketplace?cat=Toys", color: "text-pink-500" },
    { icon: Pill, label: "Healthcare Products", desc: "Supplements, flea & tick control", href: "/marketplace?cat=Healthcare", color: "text-amber-500" },
    { icon: Package, label: "Subscription Boxes", desc: "Monthly curated pet boxes", href: "/marketplace?cat=Subscription", color: "text-purple-500" },
    { icon: ShoppingCart, label: "All Products", desc: "Browse 25,000+ products", href: "/marketplace", color: "text-brand-orange" },
  ],
};

const communityMenu = {
  label: "Community",
  items: [
    { icon: Users, label: "Groups", desc: "Breed-specific communities", href: "/community#groups", color: "text-sky-500" },
    { icon: Calendar, label: "Events", desc: "Pet meetups & competitions", href: "/community#events", color: "text-green-500" },
    { icon: BookOpen, label: "Stories", desc: "Pet owner stories & tips", href: "/community#stories", color: "text-pink-500" },
    { icon: Trophy, label: "Competitions", desc: "Monthly pet contests & prizes", href: "/community#competitions", color: "text-amber-500" },
  ],
};

const resourcesMenu = {
  label: "Resources",
  items: [
    { icon: BookOpen, label: "Blog", desc: "Expert pet care articles & guides", href: "/blog", color: "text-sky-500" },
    { icon: HelpCircle, label: "FAQ", desc: "Frequently asked questions", href: "/faq", color: "text-purple-500" },
    { icon: MessageCircle, label: "Help Center", desc: "Guides, tutorials & support docs", href: "/faq#help", color: "text-green-500" },
    { icon: Phone, label: "Contact Us", desc: "Reach our support team", href: "/contact", color: "text-brand-orange" },
  ],
};

/* ─── Announcement Bar ─────────────────────────────────────────────────── */
const announcements = [
  "Trusted by 48,000+ Pet Families Across India",
  "Flat 20% Off on Your First Vet Consultation — Use Code: PETZOO20",
  "New Feature: AI Health Reports Now Available for Premium Members",
];

function AnnouncementBar({ visible }: { visible: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={cn(
      "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-center py-2 px-4 text-xs font-medium overflow-hidden transition-all duration-300",
      visible ? "h-9 opacity-100" : "h-0 opacity-0 py-0"
    )}>
      <span className="inline-flex items-center gap-2 transition-all">
        {announcements[idx]}
        <Link to="/register" className="inline-flex items-center gap-1 text-brand-orange hover:text-orange-300 font-semibold ml-1">
          Get Started <ArrowRight className="w-3 h-3" />
        </Link>
      </span>
    </div>
  );
}

/* ─── Mega Menu Panel ───────────────────────────────────────────────────── */
interface ServicesDropProps { data: typeof servicesMenu; onClose: () => void }
function ServicesDrop({ data, onClose }: ServicesDropProps) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[740px] bg-white dark:bg-[#111827] border border-light-border dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-50">
      {/* Header strip */}
      <div className="bg-gradient-to-r from-brand-orange/5 to-sky-500/5 dark:from-brand-orange/10 dark:to-sky-500/10 px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
        <div>
          <p className="font-poppins font-semibold text-light-text dark:text-dark-heading text-sm">Our Services</p>
          <p className="text-light-muted dark:text-dark-muted text-xs">Comprehensive pet care solutions under one roof</p>
        </div>
        <Link to="/services" onClick={onClose}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-orange-500 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-3 divide-x divide-light-border dark:divide-dark-border">
        {data.cols.map((col) => (
          <div key={col.heading} className="p-5 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-light-muted dark:text-dark-muted mb-3 px-2">{col.heading}</p>
            {col.items.map((item) => (
              <Link key={item.label} to={item.href} onClick={onClose}
                className="flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-current/10", item.color.replace("text-", "bg-").replace("-500", "-100").replace("-orange", "-orange/10"))}>
                  <item.icon className={cn("w-4 h-4", item.color)} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-light-text dark:text-dark-heading group-hover:text-brand-orange transition-colors leading-tight">{item.label}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted leading-tight mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SimpleDropProps {
  items: { icon: React.ElementType; label: string; desc: string; href: string; color: string }[];
  onClose: () => void;
  viewAllHref: string;
  viewAllLabel: string;
  columns?: number;
}
function SimpleDrop({ items, onClose, viewAllHref, viewAllLabel, columns = 1 }: SimpleDropProps) {
  return (
    <div className={cn(
      "absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white dark:bg-[#111827] border border-light-border dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-50",
      columns === 2 ? "w-[440px]" : "w-[280px]"
    )}>
      <div className={cn("p-3", columns === 2 ? "grid grid-cols-2 gap-1" : "space-y-1")}>
        {items.map((item) => (
          <Link key={item.label} to={item.href} onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-light-hover dark:bg-dark-hover flex items-center justify-center flex-shrink-0">
              <item.icon className={cn("w-4 h-4", item.color)} />
            </div>
            <div>
              <p className="text-sm font-semibold text-light-text dark:text-dark-heading group-hover:text-brand-orange transition-colors leading-tight">{item.label}</p>
              <p className="text-xs text-light-muted dark:text-dark-muted leading-tight mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t border-light-border dark:border-dark-border px-4 py-3">
        <Link to={viewAllHref} onClick={onClose}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-orange-500 transition-colors">
          {viewAllLabel} <ArrowRight className="w-3 h-3" />
        </Link>
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
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
        {label}
        <ChevronDown className={cn("w-4 h-4 text-light-muted dark:text-dark-muted transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-orange/20 pl-3">{children}</div>}
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
  const unread = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setAnnouncementVisible(y < 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-area]")) {
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
    dropTimer.current = setTimeout(() => setActiveDropdown(null), 150);
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

  const navItemCls = (active?: boolean) => cn(
    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors select-none cursor-pointer whitespace-nowrap",
    active
      ? "text-brand-orange"
      : "text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-heading"
  );

  return (
    <>
      <AnnouncementBar visible={announcementVisible} />
      <nav
        data-nav-area
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "bg-white dark:bg-dark-bg border-b border-light-border dark:border-dark-border"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-14" : "h-16")}>

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-orange to-orange-500 rounded-xl flex items-center justify-center shadow-orange group-hover:scale-105 transition-transform">
                <PawPrint className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
              </div>
              <span className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading tracking-tight">
                Pet<span className="text-brand-orange">Zoo</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5" data-nav-area>
              {/* Home */}
              <NavLink to="/" end
                className={({ isActive }) => cn(navItemCls(isActive), isActive && "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-orange after:rounded-full")}>
                Home
              </NavLink>

              {/* Services mega */}
              <div className="relative"
                onMouseEnter={() => openDrop("services")}
                onMouseLeave={closeDrop}>
                <button className={cn(navItemCls(activeDropdown === "services"))}>
                  Services
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "services" && "rotate-180")} />
                  {activeDropdown === "services" && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-orange rounded-full" />}
                </button>
                {activeDropdown === "services" && (
                  <ServicesDrop data={servicesMenu} onClose={() => setActiveDropdown(null)} />
                )}
              </div>

              {/* Marketplace dropdown */}
              <div className="relative"
                onMouseEnter={() => openDrop("marketplace")}
                onMouseLeave={closeDrop}>
                <button className={cn(navItemCls(activeDropdown === "marketplace"))}>
                  Marketplace
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "marketplace" && "rotate-180")} />
                  {activeDropdown === "marketplace" && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-orange rounded-full" />}
                </button>
                {activeDropdown === "marketplace" && (
                  <SimpleDrop items={marketplaceMenu.items} onClose={() => setActiveDropdown(null)}
                    viewAllHref="/marketplace" viewAllLabel="Browse all products" columns={2} />
                )}
              </div>

              {/* Community dropdown */}
              <div className="relative"
                onMouseEnter={() => openDrop("community")}
                onMouseLeave={closeDrop}>
                <button className={cn(navItemCls(activeDropdown === "community"))}>
                  Community
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "community" && "rotate-180")} />
                  {activeDropdown === "community" && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-orange rounded-full" />}
                </button>
                {activeDropdown === "community" && (
                  <SimpleDrop items={communityMenu.items} onClose={() => setActiveDropdown(null)}
                    viewAllHref="/community" viewAllLabel="Explore community" />
                )}
              </div>

              {/* Pricing */}
              <NavLink to="/pricing"
                className={({ isActive }) => cn(navItemCls(isActive), isActive && "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-orange after:rounded-full")}>
                Pricing
              </NavLink>

              {/* Resources dropdown */}
              <div className="relative"
                onMouseEnter={() => openDrop("resources")}
                onMouseLeave={closeDrop}>
                <button className={cn(navItemCls(activeDropdown === "resources"))}>
                  Resources
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === "resources" && "rotate-180")} />
                  {activeDropdown === "resources" && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-orange rounded-full" />}
                </button>
                {activeDropdown === "resources" && (
                  <SimpleDrop items={resourcesMenu.items} onClose={() => setActiveDropdown(null)}
                    viewAllHref="/blog" viewAllLabel="Visit blog" />
                )}
              </div>
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1.5" data-nav-area>
              {/* Theme toggle */}
              <button onClick={toggleTheme}
                className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover hover:text-light-text dark:hover:text-dark-heading transition-colors"
                title="Toggle theme">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {isAuthenticated ? (
                <>
                  {/* Cart */}
                  <Link to="/marketplace" className="hidden md:flex p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover hover:text-light-text dark:hover:text-dark-heading transition-colors relative" title="Cart">
                    <ShoppingCart className="w-4 h-4" />
                  </Link>
                  {/* Notifications */}
                  <Link to={`${getDashboardPath()}/notifications`}
                    className="hidden md:flex p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover hover:text-light-text dark:hover:text-dark-heading transition-colors relative"
                    title="Notifications">
                    <Bell className="w-4 h-4" />
                    {unread > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full ring-1 ring-white dark:ring-dark-bg" />
                    )}
                  </Link>

                  {/* Profile dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group ml-1">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-orange to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {getInitials(user?.name || "U")}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-xs font-semibold text-light-text dark:text-dark-heading leading-tight">{user?.name?.split(" ")[0]}</p>
                        <p className="text-[10px] text-light-muted dark:text-dark-muted capitalize leading-tight">{user?.role}</p>
                      </div>
                      <ChevronDown className={cn("w-3 h-3 text-light-muted dark:text-dark-muted transition-transform hidden md:block", profileOpen && "rotate-180")} />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111827] border border-light-border dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-50">
                        <div className="p-4 bg-gradient-to-br from-brand-orange/5 to-transparent border-b border-light-border dark:border-dark-border">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                              {getInitials(user?.name || "U")}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-light-text dark:text-dark-heading leading-tight">{user?.name}</p>
                              <p className="text-xs text-light-muted dark:text-dark-muted capitalize">{user?.role} Account</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <Link to={getDashboardPath()} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                            <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                            <span>Dashboard</span>
                          </Link>
                          <Link to={`${getDashboardPath()}/settings`} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                            <Settings className="w-4 h-4 text-sky-500" />
                            <span>Settings</span>
                          </Link>
                        </div>
                        <div className="border-t border-light-border dark:border-dark-border py-2">
                          <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2 ml-1">
                  <Link to="/login"
                    className="px-4 py-2 text-sm font-medium text-light-text dark:text-dark-heading hover:text-brand-orange dark:hover:text-brand-orange transition-colors rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover">
                    Login
                  </Link>
                  <Link to="/register"
                    className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl transition-all hover:shadow-orange">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-hover dark:hover:bg-dark-hover transition-colors ml-1">
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-dark-card border-t border-light-border dark:border-dark-border",
          isOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-4 space-y-1 overflow-y-auto max-h-[80vh]">
            <NavLink to="/" end onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive ? "text-brand-orange bg-brand-orange/10" : "text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover"
              )}>
              Home
            </NavLink>

            <MobileAccordion label="Services">
              {servicesMenu.cols.flatMap(col => col.items).map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                  {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion label="Marketplace">
              {marketplaceMenu.items.map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                  {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <MobileAccordion label="Community">
              {communityMenu.items.map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                  {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <NavLink to="/pricing" onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive ? "text-brand-orange bg-brand-orange/10" : "text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover"
              )}>
              Pricing
            </NavLink>

            <MobileAccordion label="Resources">
              {resourcesMenu.items.map(item => (
                <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-light-text dark:text-dark-body hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                  {item.label}
                </Link>
              ))}
            </MobileAccordion>

            {/* Mobile Auth */}
            <div className="pt-3 border-t border-light-border dark:border-dark-border flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-brand-orange/5 rounded-xl">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(user?.name || "U")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-light-text dark:text-dark-heading">{user?.name}</p>
                      <p className="text-xs text-light-muted dark:text-dark-muted capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <Link to={getDashboardPath()} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 bg-brand-orange/10 text-brand-orange rounded-xl font-medium text-sm">
                    <LayoutDashboard className="w-4 h-4" /> My Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-medium text-sm">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-center text-light-text dark:text-dark-heading hover:border-brand-orange hover:text-brand-orange transition-colors">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-sm font-semibold text-center transition-colors">
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
