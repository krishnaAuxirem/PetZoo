import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/features/ProtectedRoute";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Public Pages
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
import OwnerAppointments from "@/pages/dashboard/owner/Appointments";
import Orders from "@/pages/dashboard/owner/Orders";
import OwnerSettings from "@/pages/dashboard/owner/Settings";
import HealthRecords from "@/pages/dashboard/owner/HealthRecords";
import Vaccinations from "@/pages/dashboard/owner/Vaccinations";
import GrowthTracking from "@/pages/dashboard/owner/GrowthTracking";
import AllergyRecords from "@/pages/dashboard/owner/AllergyRecords";
import Telemedicine from "@/pages/dashboard/owner/Telemedicine";
import OwnerPrescriptions from "@/pages/dashboard/owner/Prescriptions";
import MedicationReminders from "@/pages/dashboard/owner/MedicationReminders";
import Nutrition from "@/pages/dashboard/owner/Nutrition";
import Cart from "@/pages/dashboard/owner/Cart";
import Wishlist from "@/pages/dashboard/owner/Wishlist";
import OwnerShop from "@/pages/dashboard/owner/Shop";
import OwnerAdoption from "@/pages/dashboard/owner/Adoption";
import OwnerCommunity from "@/pages/dashboard/owner/Community";
import OwnerGrooming from "@/pages/dashboard/owner/Grooming";
import OwnerTraining from "@/pages/dashboard/owner/Training";
import OwnerMembership from "@/pages/dashboard/owner/Membership";
import MedicalReports from "@/pages/dashboard/owner/MedicalReports";

// Shared
import Notifications from "@/pages/dashboard/shared/Notifications";
import SharedReviews from "@/pages/dashboard/shared/Reviews";
import SharedCustomers from "@/pages/dashboard/shared/Customers";
import GenericPage from "@/pages/dashboard/shared/GenericPage";

// Role Dashboards
import GenericDashboard from "@/pages/dashboard/GenericDashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import AdminUsers from "@/pages/dashboard/admin/Users";
import AdminRevenue from "@/pages/dashboard/admin/Revenue";
import AdminOrders from "@/pages/dashboard/admin/Orders";
import AdminVets from "@/pages/dashboard/admin/Vets";
import AdminProducts from "@/pages/dashboard/admin/Products";
import AdminAppointments from "@/pages/dashboard/admin/Appointments";
import AdminBlog from "@/pages/dashboard/admin/Blog";
import AdminAdoptions from "@/pages/dashboard/admin/Adoptions";
import AdminRoles from "@/pages/dashboard/admin/Roles";
import AdminCommunity from "@/pages/dashboard/admin/Community";
import AdminAIMonitor from "@/pages/dashboard/admin/AIMonitor";
import AdminSystem from "@/pages/dashboard/admin/System";
import AdminSubscriptions from "@/pages/dashboard/admin/Subscriptions";
import AdminRoleManagement from "@/pages/dashboard/admin/RoleManagement";

import VetDashboard from "@/pages/dashboard/vet/VetDashboard";
import VetAppointments from "@/pages/dashboard/vet/Appointments";
import VetPatients from "@/pages/dashboard/vet/Patients";

import GroomerDashboard from "@/pages/dashboard/groomer/GroomerDashboard";
import GroomerBookings from "@/pages/dashboard/groomer/Bookings";
import GroomerServices from "@/pages/dashboard/groomer/Services";
import GroomerEarnings from "@/pages/dashboard/groomer/Earnings";

import TrainerDashboard from "@/pages/dashboard/trainer/TrainerDashboard";
import TrainerSessions from "@/pages/dashboard/trainer/Sessions";
import TrainerEarnings from "@/pages/dashboard/trainer/Earnings";
import TrainerProgress from "@/pages/dashboard/trainer/Progress";

import VendorDashboard from "@/pages/dashboard/vendor/VendorDashboard";
import VendorProducts from "@/pages/dashboard/vendor/Products";
import VendorInventory from "@/pages/dashboard/vendor/Inventory";
import VendorAnalytics from "@/pages/dashboard/vendor/Analytics";

import ShelterDashboard from "@/pages/dashboard/shelter/ShelterDashboard";
import ShelterListings from "@/pages/dashboard/shelter/Listings";
import ShelterApplications from "@/pages/dashboard/shelter/Applications";

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

            {/* ══════════════════════════════════
                OWNER DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/owner" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/owner/pets" element={<ProtectedRoute allowedRoles={["owner"]}><MyPets /></ProtectedRoute>} />
            <Route path="/dashboard/owner/appointments" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerAppointments /></ProtectedRoute>} />
            <Route path="/dashboard/owner/orders" element={<ProtectedRoute allowedRoles={["owner"]}><Orders /></ProtectedRoute>} />
            <Route path="/dashboard/owner/settings" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/owner/health" element={<ProtectedRoute allowedRoles={["owner"]}><HealthRecords /></ProtectedRoute>} />
            <Route path="/dashboard/owner/vaccinations" element={<ProtectedRoute allowedRoles={["owner"]}><Vaccinations /></ProtectedRoute>} />
            <Route path="/dashboard/owner/growth" element={<ProtectedRoute allowedRoles={["owner"]}><GrowthTracking /></ProtectedRoute>} />
            <Route path="/dashboard/owner/weight" element={<ProtectedRoute allowedRoles={["owner"]}><GrowthTracking /></ProtectedRoute>} />
            <Route path="/dashboard/owner/allergies" element={<ProtectedRoute allowedRoles={["owner"]}><AllergyRecords /></ProtectedRoute>} />
            <Route path="/dashboard/owner/telemedicine" element={<ProtectedRoute allowedRoles={["owner"]}><Telemedicine /></ProtectedRoute>} />
            <Route path="/dashboard/owner/prescriptions" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerPrescriptions /></ProtectedRoute>} />
            <Route path="/dashboard/owner/medications" element={<ProtectedRoute allowedRoles={["owner"]}><MedicationReminders /></ProtectedRoute>} />
            <Route path="/dashboard/owner/nutrition" element={<ProtectedRoute allowedRoles={["owner"]}><Nutrition /></ProtectedRoute>} />
            <Route path="/dashboard/owner/cart" element={<ProtectedRoute allowedRoles={["owner"]}><Cart /></ProtectedRoute>} />
            <Route path="/dashboard/owner/wishlist" element={<ProtectedRoute allowedRoles={["owner"]}><Wishlist /></ProtectedRoute>} />
            <Route path="/dashboard/owner/shop" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerShop /></ProtectedRoute>} />
            <Route path="/dashboard/owner/adoption" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerAdoption /></ProtectedRoute>} />
            <Route path="/dashboard/owner/community" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerCommunity /></ProtectedRoute>} />
            <Route path="/dashboard/owner/grooming" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerGrooming /></ProtectedRoute>} />
            <Route path="/dashboard/owner/training" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerTraining /></ProtectedRoute>} />
            <Route path="/dashboard/owner/membership" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerMembership /></ProtectedRoute>} />
            <Route path="/dashboard/owner/reports" element={<ProtectedRoute allowedRoles={["owner"]}><MedicalReports /></ProtectedRoute>} />
            <Route path="/dashboard/owner/notifications" element={<ProtectedRoute allowedRoles={["owner"]}><Notifications /></ProtectedRoute>} />

            {/* ══════════════════════════════════
                VET DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/vet" element={<ProtectedRoute allowedRoles={["vet"]}><VetDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/vet/appointments" element={<ProtectedRoute allowedRoles={["vet"]}><VetAppointments /></ProtectedRoute>} />
            <Route path="/dashboard/vet/schedule" element={<ProtectedRoute allowedRoles={["vet"]}><VetAppointments /></ProtectedRoute>} />
            <Route path="/dashboard/vet/patients" element={<ProtectedRoute allowedRoles={["vet"]}><VetPatients /></ProtectedRoute>} />
            <Route path="/dashboard/vet/reviews" element={<ProtectedRoute allowedRoles={["vet"]}><SharedReviews /></ProtectedRoute>} />
            <Route path="/dashboard/vet/notifications" element={<ProtectedRoute allowedRoles={["vet"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/vet/profile" element={<ProtectedRoute allowedRoles={["vet"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/vet/*" element={<ProtectedRoute allowedRoles={["vet"]}><GenericPage /></ProtectedRoute>} />

            {/* ══════════════════════════════════
                GROOMER DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/groomer" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/bookings" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerBookings /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/calendar" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerBookings /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/services" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerServices /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/customers" element={<ProtectedRoute allowedRoles={["groomer"]}><SharedCustomers /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/reviews" element={<ProtectedRoute allowedRoles={["groomer"]}><SharedReviews /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/earnings" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerEarnings /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/reports" element={<ProtectedRoute allowedRoles={["groomer"]}><GroomerEarnings /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/notifications" element={<ProtectedRoute allowedRoles={["groomer"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/profile" element={<ProtectedRoute allowedRoles={["groomer"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/groomer/*" element={<ProtectedRoute allowedRoles={["groomer"]}><GenericPage /></ProtectedRoute>} />

            {/* ══════════════════════════════════
                TRAINER DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/trainer" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/sessions" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerSessions /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/programs" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerSessions /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/progress" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerProgress /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/earnings" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerEarnings /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/reports" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerEarnings /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/reviews" element={<ProtectedRoute allowedRoles={["trainer"]}><SharedReviews /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/assessments" element={<ProtectedRoute allowedRoles={["trainer"]}><TrainerProgress /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/notifications" element={<ProtectedRoute allowedRoles={["trainer"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/profile" element={<ProtectedRoute allowedRoles={["trainer"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/trainer/*" element={<ProtectedRoute allowedRoles={["trainer"]}><GenericPage /></ProtectedRoute>} />

            {/* ══════════════════════════════════
                VENDOR DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/vendor" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/products" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorProducts /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/inventory" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorInventory /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/analytics" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorAnalytics /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/revenue" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorAnalytics /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/customers" element={<ProtectedRoute allowedRoles={["vendor"]}><SharedCustomers /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/orders" element={<ProtectedRoute allowedRoles={["vendor"]}><AdminOrders /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/notifications" element={<ProtectedRoute allowedRoles={["vendor"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/store" element={<ProtectedRoute allowedRoles={["vendor"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/vendor/*" element={<ProtectedRoute allowedRoles={["vendor"]}><GenericPage /></ProtectedRoute>} />

            {/* ══════════════════════════════════
                SHELTER DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/shelter" element={<ProtectedRoute allowedRoles={["shelter"]}><ShelterDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/listings" element={<ProtectedRoute allowedRoles={["shelter"]}><ShelterListings /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/applications" element={<ProtectedRoute allowedRoles={["shelter"]}><ShelterApplications /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/tracking" element={<ProtectedRoute allowedRoles={["shelter"]}><ShelterApplications /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/notifications" element={<ProtectedRoute allowedRoles={["shelter"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/profile" element={<ProtectedRoute allowedRoles={["shelter"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/shelter/*" element={<ProtectedRoute allowedRoles={["shelter"]}><GenericPage /></ProtectedRoute>} />

            {/* ══════════════════════════════════
                ADMIN DASHBOARD
            ══════════════════════════════════ */}
            <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/dashboard/admin/revenue" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRevenue /></ProtectedRoute>} />
            <Route path="/dashboard/admin/orders" element={<ProtectedRoute allowedRoles={["admin"]}><AdminOrders /></ProtectedRoute>} />
            <Route path="/dashboard/admin/vets" element={<ProtectedRoute allowedRoles={["admin"]}><AdminVets /></ProtectedRoute>} />
            <Route path="/dashboard/admin/groomers" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRoleManagement type="groomers" /></ProtectedRoute>} />
            <Route path="/dashboard/admin/trainers" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRoleManagement type="trainers" /></ProtectedRoute>} />
            <Route path="/dashboard/admin/vendors" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRoleManagement type="vendors" /></ProtectedRoute>} />
            <Route path="/dashboard/admin/shelters" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRoleManagement type="shelters" /></ProtectedRoute>} />
            <Route path="/dashboard/admin/marketplace" element={<ProtectedRoute allowedRoles={["admin"]}><AdminProducts /></ProtectedRoute>} />
            <Route path="/dashboard/admin/products" element={<ProtectedRoute allowedRoles={["admin"]}><AdminProducts /></ProtectedRoute>} />
            <Route path="/dashboard/admin/appointments" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAppointments /></ProtectedRoute>} />
            <Route path="/dashboard/admin/adoptions" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAdoptions /></ProtectedRoute>} />
            <Route path="/dashboard/admin/community" element={<ProtectedRoute allowedRoles={["admin"]}><AdminCommunity /></ProtectedRoute>} />
            <Route path="/dashboard/admin/blog" element={<ProtectedRoute allowedRoles={["admin"]}><AdminBlog /></ProtectedRoute>} />
            <Route path="/dashboard/admin/subscriptions" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSubscriptions /></ProtectedRoute>} />
            <Route path="/dashboard/admin/ai" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAIMonitor /></ProtectedRoute>} />
            <Route path="/dashboard/admin/system" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSystem /></ProtectedRoute>} />
            <Route path="/dashboard/admin/roles" element={<ProtectedRoute allowedRoles={["admin"]}><AdminRoles /></ProtectedRoute>} />
            <Route path="/dashboard/admin/notifications" element={<ProtectedRoute allowedRoles={["admin"]}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><OwnerSettings /></ProtectedRoute>} />
            <Route path="/dashboard/admin/*" element={<ProtectedRoute allowedRoles={["admin"]}><GenericPage /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
