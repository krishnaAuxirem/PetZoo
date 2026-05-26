import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, PawPrint, AlertCircle, Loader2, User, Stethoscope, Scissors, GraduationCap, ShoppingBag, Building2, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const demoCredentials = [
  { role: "Pet Owner", email: "owner@petzoo.com", password: "demo123", icon: PawPrint, color: "text-brand-orange" },
  { role: "Veterinarian", email: "vet@petzoo.com", password: "demo123", icon: Stethoscope, color: "text-sky-500" },
  { role: "Groomer", email: "groomer@petzoo.com", password: "demo123", icon: Scissors, color: "text-purple-500" },
  { role: "Trainer", email: "trainer@petzoo.com", password: "demo123", icon: GraduationCap, color: "text-amber-500" },
  { role: "Vendor", email: "vendor@petzoo.com", password: "demo123", icon: ShoppingBag, color: "text-pink-500" },
  { role: "Shelter", email: "shelter@petzoo.com", password: "demo123", icon: Building2, color: "text-green-500" },
  { role: "Admin", email: "admin@petzoo.com", password: "admin123", icon: Shield, color: "text-red-500" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const getDashboard = (email: string) => {
    if (email === "admin@petzoo.com") return "/dashboard/admin";
    if (email === "vet@petzoo.com") return "/dashboard/vet";
    if (email === "groomer@petzoo.com") return "/dashboard/groomer";
    if (email === "trainer@petzoo.com") return "/dashboard/trainer";
    if (email === "vendor@petzoo.com") return "/dashboard/vendor";
    if (email === "shelter@petzoo.com") return "/dashboard/shelter";
    return "/dashboard/owner";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      toast.success("Welcome back to PetZoo!");
      navigate(getDashboard(email));
    } else {
      setError("Invalid email or password. Try a demo credential below.");
    }
  };

  const loginDemo = async (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setLoading(true);
    const ok = await login(cred.email, cred.password);
    setLoading(false);
    if (ok) {
      toast.success(`Logged in as ${cred.role}`);
      navigate(getDashboard(cred.email));
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex">
      {/* Left visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.15)_0%,transparent_60%)]" />
        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-orange">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-poppins text-3xl font-bold text-white mb-4">Welcome Back to PetZoo</h2>
          <p className="text-white/60 mb-8">The world's most comprehensive AI-powered pet care platform.</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            {["48K+ Pet Families", "1,247+ Verified Vets", "AI-Powered Care", "24/7 Support"].map(f => (
              <div key={f} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white/80 text-sm flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-orange-400 rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading">Pet<span className="text-brand-orange">Zoo</span></span>
          </div>

          <h1 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mb-1">Sign In</h1>
          <p className="text-light-muted dark:text-dark-muted text-sm mb-8">
            Don't have an account? <Link to="/register" className="text-brand-orange hover:underline font-semibold">Register free</Link>
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl mb-5 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-heading placeholder-light-muted dark:placeholder-dark-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-heading placeholder-light-muted dark:placeholder-dark-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-heading">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-light-border dark:border-dark-border accent-brand-orange" />
                <span className="text-sm text-light-muted dark:text-dark-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-brand-orange hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</> : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
              <span className="text-light-muted dark:text-dark-muted text-xs">Or continue with</span>
              <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Google", "Facebook", "Apple"].map(s => (
                <button key={s} onClick={() => toast.info(`${s} login coming soon`)}
                  className="flex items-center justify-center gap-2 py-2.5 border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
                  <User className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted" /> {s}
                </button>
              ))}
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map((c) => (
                <button key={c.role} onClick={() => loginDemo(c)} disabled={loading}
                  className="flex items-center gap-2 p-2 bg-white dark:bg-dark-card rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors text-left border border-amber-200/50 dark:border-amber-800/50 group">
                  <c.icon className={`w-4 h-4 flex-shrink-0 ${c.color}`} />
                  <div>
                    <p className="text-xs font-semibold text-light-text dark:text-dark-heading group-hover:text-brand-orange transition-colors">{c.role}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">demo123</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
