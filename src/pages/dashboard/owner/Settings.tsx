import { useState } from "react";
import { Save, Bell, Shield, User, Palette } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [notifs, setNotifs] = useState({ appointments: true, vaccinations: true, orders: true, community: false, promotions: false });

  const saveProfile = () => {
    updateUser({ name, phone });
    toast.success("Profile updated successfully!");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-5">
            <User className="w-5 h-5 text-brand-orange" />
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Profile Information</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email (read-only)</label>
              <input value={email} readOnly className="w-full px-4 py-3 bg-light-hover dark:bg-dark-hover border border-light-border dark:border-dark-border rounded-xl text-sm text-light-muted dark:text-dark-muted cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Phone Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Role</label>
              <input value={user?.role || ""} readOnly className="w-full px-4 py-3 bg-light-hover dark:bg-dark-hover border border-light-border dark:border-dark-border rounded-xl text-sm text-light-muted dark:text-dark-muted cursor-not-allowed capitalize" />
            </div>
          </div>
          <button onClick={saveProfile} className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>

        {/* Appearance */}
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-5">
            <Palette className="w-5 h-5 text-brand-blue" />
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Appearance</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-light-hover dark:bg-dark-hover rounded-xl">
            <div>
              <p className="font-medium text-sm text-light-text dark:text-dark-heading">Dark Mode</p>
              <p className="text-xs text-light-muted dark:text-dark-muted">Currently: {theme === "dark" ? "Dark" : "Light"}</p>
            </div>
            <button onClick={toggleTheme} className={`w-12 h-6 rounded-full transition-colors relative ${theme === "dark" ? "bg-brand-orange" : "bg-light-border dark:bg-dark-border"}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${theme === "dark" ? "left-7" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Notification Preferences</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(notifs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-light-hover dark:bg-dark-hover rounded-xl">
                <p className="text-sm font-medium text-light-text dark:text-dark-heading capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                <button onClick={() => setNotifs(prev => ({...prev, [key]: !val}))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${val ? "bg-brand-orange" : "bg-light-border dark:bg-dark-border"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${val ? "left-5.5" : "left-0.5"}`} style={{left: val ? "22px" : "2px"}} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => toast.success("Notification preferences saved!")} className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>

        {/* Security */}
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="w-5 h-5 text-brand-green" />
            <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Security</h3>
          </div>
          <div className="space-y-3">
            <button onClick={() => toast.info("Password change email sent!")} className="w-full flex items-center justify-between p-4 bg-light-hover dark:bg-dark-hover rounded-xl hover:bg-light-border dark:hover:bg-dark-border transition-colors">
              <span className="text-sm font-medium text-light-text dark:text-dark-heading">Change Password</span>
              <span className="text-xs text-brand-orange font-semibold">Update →</span>
            </button>
            <button onClick={() => toast.info("2FA setup coming soon!")} className="w-full flex items-center justify-between p-4 bg-light-hover dark:bg-dark-hover rounded-xl hover:bg-light-border dark:hover:bg-dark-border transition-colors">
              <span className="text-sm font-medium text-light-text dark:text-dark-heading">Two-Factor Authentication</span>
              <span className="text-xs text-amber-500 font-semibold">Enable →</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
