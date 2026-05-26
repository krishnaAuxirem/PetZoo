import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Shield, Check, X, Users, Lock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const roles = [
  { id: "owner", name: "Pet Owner", description: "Manage pets, book services, shop marketplace", users: 38420, color: "from-orange-500 to-orange-600",
    permissions: { "View Dashboard": true, "Manage Pets": true, "Book Appointments": true, "View Health Records": true, "Shop Marketplace": true, "Access Community": true, "Telemedicine": true, "Manage Orders": true, "Admin Panel": false, "Manage Users": false, "View Analytics": false, "Manage Blog": false } },
  { id: "vet", name: "Veterinarian", description: "Manage patients, appointments, prescriptions", users: 1247, color: "from-sky-500 to-sky-600",
    permissions: { "View Dashboard": true, "Manage Pets": true, "Book Appointments": true, "View Health Records": true, "Shop Marketplace": false, "Access Community": true, "Telemedicine": true, "Manage Orders": false, "Admin Panel": false, "Manage Users": false, "View Analytics": true, "Manage Blog": false } },
  { id: "groomer", name: "Groomer", description: "Manage bookings, services, customers", users: 892, color: "from-purple-500 to-purple-600",
    permissions: { "View Dashboard": true, "Manage Pets": false, "Book Appointments": true, "View Health Records": false, "Shop Marketplace": false, "Access Community": true, "Telemedicine": false, "Manage Orders": true, "Admin Panel": false, "Manage Users": false, "View Analytics": true, "Manage Blog": false } },
  { id: "vendor", name: "Vendor", description: "Manage products, inventory, orders", users: 1891, color: "from-emerald-500 to-emerald-600",
    permissions: { "View Dashboard": true, "Manage Pets": false, "Book Appointments": false, "View Health Records": false, "Shop Marketplace": true, "Access Community": true, "Telemedicine": false, "Manage Orders": true, "Admin Panel": false, "Manage Users": false, "View Analytics": true, "Manage Blog": false } },
  { id: "admin", name: "Administrator", description: "Full platform access and management", users: 12, color: "from-violet-500 to-violet-600",
    permissions: { "View Dashboard": true, "Manage Pets": true, "Book Appointments": true, "View Health Records": true, "Shop Marketplace": true, "Access Community": true, "Telemedicine": true, "Manage Orders": true, "Admin Panel": true, "Manage Users": true, "View Analytics": true, "Manage Blog": true } },
];

const allPermissions = ["View Dashboard", "Manage Pets", "Book Appointments", "View Health Records", "Shop Marketplace", "Access Community", "Telemedicine", "Manage Orders", "Admin Panel", "Manage Users", "View Analytics", "Manage Blog"];

export default function AdminRoles() {
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const currentRole = roles.find(r => r.id === selectedRole) || roles[0];

  return (
    <DashboardLayout title="Roles & Permissions">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Roles", value: roles.length, color: "from-violet-500 to-violet-600" },
          { label: "Total Users", value: "48,291", color: "from-sky-500 to-sky-600" },
          { label: "Permissions", value: allPermissions.length, color: "from-emerald-500 to-emerald-600" },
          { label: "Admin Users", value: "12", color: "from-red-500 to-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Role List */}
        <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Roles</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange text-white text-xs font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              <Plus className="w-3.5 h-3.5" /> New Role
            </button>
          </div>
          <div className="space-y-2">
            {roles.map(role => (
              <button key={role.id} onClick={() => setSelectedRole(role.id)}
                className={cn("w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left", selectedRole === role.id ? "bg-orange-50 dark:bg-orange-500/8 border border-orange-200 dark:border-orange-500/20" : "hover:bg-slate-50 dark:hover:bg-white/3 border border-transparent")}>
                <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0", role.color)}
                  style={{ background: `linear-gradient(135deg, ${role.color.split(" ")[1]}, ${role.color.split(" ")[3]})` }}>
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{role.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{role.users.toLocaleString()} users</p>
                </div>
                {selectedRole === role.id && <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5 p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">{currentRole.name} — Permissions</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{currentRole.description}</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-white/8 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:border-brand-orange transition-colors">
              <Edit2 className="w-3.5 h-3.5" /> Edit Role
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {allPermissions.map(perm => {
              const hasPermission = currentRole.permissions[perm as keyof typeof currentRole.permissions];
              return (
                <div key={perm} className={cn("flex items-center justify-between p-3 rounded-xl border transition-colors", hasPermission ? "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5" : "border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/1")}>
                  <div className="flex items-center gap-2">
                    <Lock className={cn("w-3.5 h-3.5", hasPermission ? "text-emerald-500" : "text-slate-300 dark:text-slate-600")} />
                    <span className={cn("text-xs font-medium", hasPermission ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-500")}>{perm}</span>
                  </div>
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", hasPermission ? "bg-emerald-500" : "bg-slate-200 dark:bg-white/10")}>
                    {hasPermission ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-slate-400 dark:text-slate-500" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {Object.values(currentRole.permissions).filter(Boolean).length} of {allPermissions.length} permissions granted
            </p>
            <button className="px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl transition-all" style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>Save Changes</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
