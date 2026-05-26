import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/features/ProtectedRoute";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Veterinarians from "@/pages/Veterinarians";
import Marketplace from "@/pages/Marketplace";
import Grooming from "@/pages/Grooming";
import Training from "@/pages/Training";
import Adoption from "@/pages/Adoption";
import Community from "@/pages/Community";
import Membership from "@/pages/Membership";
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Legal
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import Cookies from "@/pages/legal/Cookies";
import Refund from "@/pages/legal/Refund";

// Misc
import Careers from "@/pages/misc/Careers";
import Partners from "@/pages/misc/Partners";
import Accessibility from "@/pages/misc/Accessibility";
import HelpCenter from "@/pages/misc/HelpCenter";
import NotFound from "@/pages/misc/NotFound";

// Owner Dashboard
import OwnerDashboard from "@/pages/dashboard/owner/OwnerDashboard";
import MyPets from "@/pages/dashboard/owner/MyPets";
import Appointments from "@/pages/dashboard/owner/Appointments";
import Orders from "@/pages/dashboard/owner/Orders";
import Settings from "@/pages/dashboard/owner/Settings";
import HealthRecords from "@/pages/dashboard/owner/HealthRecords";
import Vaccinations from "@/pages/dashboard/owner/Vaccinations";
import GrowthTracking from "@/pages/dashboard/owner/GrowthTracking";
import AllergyRecords from "@/pages/dashboard/owner/AllergyRecords";
import Telemedicine from "@/pages/dashboard/owner/Telemedicine";
import Prescriptions from "@/pages/dashboard/owner/Prescriptions";
import MedicationReminders from "@/pages/dashboard/owner/MedicationReminders";
import Nutrition from "@/pages/dashboard/owner/Nutrition";
import Cart from "@/pages/dashboard/owner/Cart";
import Wishlist from "@/pages/dashboard/owner/Wishlist";

// Shared
import Notifications from "@/pages/dashboard/shared/Notifications";
import GenericPage from "@/pages/dashboard/shared/GenericPage";

// Role Dashboards
import GenericDashboard from "@/pages/dashboard/GenericDashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import VetDashboard from "@/pages/dashboard/vet/VetDashboard";
import GroomerDashboard from "@/pages/dashboard/groomer/GroomerDashboard";
import TrainerDashboard from "@/pages/dashboard/trainer/TrainerDashboard";
import VendorDashboard from "@/pages/dashboard/vendor/VendorDashboard";
import ShelterDashboard from "@/pages/dashboard/shelter/ShelterDashboard";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster position="top-right" toastOptions={{ duration: 3500, style: { borderRadius: "12px", padding: "12px 16px", fontSize: "14px" } }} />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/veterinarians" element={<PublicLayout><Veterinarians /></PublicLayout>} />
            <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
            <Route path="/grooming" element={<PublicLayout><Grooming /></PublicLayout>} />
            <Route path="/training" element={<PublicLayout><Training /></PublicLayout>} />
            <Route path="/adoption" element={<PublicLayout><Adoption /></PublicLayout>} />
            <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
            <Route path="/membership" element={<PublicLayout><Membership /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:id" element={<PublicLayout><BlogDetail /></PublicLayout>} />
            <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/help" element={<PublicLayout><HelpCenter /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
            <Route path="/partners" element={<PublicLayout><Partners /></PublicLayout>} />
            <Route path="/accessibility" element={<PublicLayout><Accessibility /></PublicLayout>} />
            <Route path="/press" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/investors" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/docs" element={<PublicLayout><HelpCenter /></PublicLayout>} />
            <Route path="/status" element={<PublicLayout><Contact /></PublicLayout>} />

            {/* Legal */}
            <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
            <Route path="/cookies" element={<PublicLayout><Cookies /></PublicLayout>} />
            <Route path="/refund" element={<PublicLayout><Refund /></PublicLayout>} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ForgotPassword />} />

            {/* ═══ OWNER DASHBOARD ═══ */}
            <Route path="/dashboard/owner" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/owner/pets" element={<ProtectedRoute allowedRoles={["owner"]}><MyPets /></ProtectedRoute>} />
            <Route path="/dashboard/owner/appointments" element={<ProtectedRoute allowedRoles={["owner"]}><Appointments /></ProtectedRoute>} />
            <Route path="/dashboard/owner/orders" element={<ProtectedRoute allowedRoles={["owner"]}><Orders /></ProtectedRoute>} />
            <Route path="/dashboard/owner/settings" element={<ProtectedRoute allowedRoles={["owner"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/owner/health" element={<ProtectedRoute allowedRoles={["owner"]}><HealthRecords /></ProtectedRoute>} />
            <Route path="/dashboard/owner/vaccinations" element={<ProtectedRoute allowedRoles={["owner"]}><Vaccinations /></ProtectedRoute>} />
            <Route path="/dashboard/owner/growth" element={<ProtectedRoute allowedRoles={["owner"]}><GrowthTracking /></ProtectedRoute>} />
            <Route path="/dashboard/owner/allergies" element={<ProtectedRoute allowedRoles={["owner"]}><AllergyRecords /></ProtectedRoute>} />
            <Route path="/dashboard/owner/telemedicine" element={<ProtectedRoute allowedRoles={["owner"]}><Telemedicine /></ProtectedRoute>} />
            <Route path="/dashboard/owner/prescriptions" element={<ProtectedRoute allowedRoles={["owner"]}><Prescriptions /></ProtectedRoute>} />
            <Route path="/dashboard/owner/medications" element={<ProtectedRoute allowedRoles={["owner"]}><MedicationReminders /></ProtectedRoute>} />
            <Route path="/dashboard/owner/nutrition" element={<ProtectedRoute allowedRoles={["owner"]}><Nutrition /></ProtectedRoute>} />
            <Route path="/dashboard/owner/cart" element={<ProtectedRoute allowedRoles={["owner"]}><Cart /></ProtectedRoute>} />
            <Route path="/dashboard/owner/wishlist" element={<ProtectedRoute allowedRoles={["owner"]}><Wishlist /></ProtectedRoute>} />
            <Route path="/dashboard/owner/notifications" element={<ProtectedRoute allowedRoles={["owner"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/owner/weight" element={<ProtectedRoute allowedRoles={["owner"]}><GrowthTracking /></ProtectedRoute>} />
            <Route path="/dashboard/owner/*" element={<ProtectedRoute allowedRoles={["owner"]}><GenericPage /></ProtectedRoute>} />

            {/* ═══ VET DASHBOARD ═══ */}
            <Route path="/dashboard/vet" element={<ProtectedRoute allowedRoles={["vet"]}><VetDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/vet/notifications" element={<ProtectedRoute allowedRoles={["vet"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/vet/profile" element={<ProtectedRoute allowedRoles={["vet"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/vet/*" element={<ProtectedRoute allowedRoles={["vet"]}><GenericPage /></ProtectedRoute>} />

            {/* ═══ GROOMER DASHBOARD ═══ */}
            <Route path="/dashboard/groomer" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/notifications" element={<ProtectedRoute allowedRoles={["groomer"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/profile" element={<ProtectedRoute allowedRoles={["groomer"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/*" element={<ProtectedRoute allowedRoles={["groomer"]}><GenericPage /></ProtectedRoute>} />

            {/* ═══ TRAINER DASHBOARD ═══ */}
            <Route path="/dashboard/trainer" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/notifications" element={<ProtectedRoute allowedRoles={["trainer"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/profile" element={<ProtectedRoute allowedRoles={["trainer"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/*" element={<ProtectedRoute allowedRoles={["trainer"]}><GenericPage /></ProtectedRoute>} />

            {/* ═══ VENDOR DASHBOARD ═══ */}
            <Route path="/dashboard/vendor" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/notifications" element={<ProtectedRoute allowedRoles={["vendor"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/store" element={<ProtectedRoute allowedRoles={["vendor"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/*" element={<ProtectedRoute allowedRoles={["vendor"]}><GenericPage /></ProtectedRoute>} />

            {/* ═══ SHELTER DASHBOARD ═══ */}
            <Route path="/dashboard/shelter" element={<ProtectedRoute allowedRoles={["shelter"]}><ShelterDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/notifications" element={<ProtectedRoute allowedRoles={["shelter"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/profile" element={<ProtectedRoute allowedRoles={["shelter"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/*" element={<ProtectedRoute allowedRoles={["shelter"]}><GenericPage /></ProtectedRoute>} />

            {/* ═══ ADMIN DASHBOARD ═══ */}
            <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin/notifications" element={<ProtectedRoute allowedRoles={["admin"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/admin/*" element={<ProtectedRoute allowedRoles={["admin"]}><GenericPage /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
