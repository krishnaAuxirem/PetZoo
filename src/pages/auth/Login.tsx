import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, PawPrint, AlertCircle, Loader2, Stethoscope, Scissors, GraduationCap, ShoppingBag, Building2, Shield, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const demoCredentials = [
  { role: "Pet Owner", email: "owner@petzoo.com", password: "demo123", icon: PawPrint, color: "text-brand-orange", bg: "bg-orange-500/10" },
  { role: "Veterinarian", email: "vet@petzoo.com", password: "demo123", icon: Stethoscope, color: "text-sky-500", bg: "bg-sky-500/10" },
  { role: "Groomer", email: "groomer@petzoo.com", password: "demo123", icon: Scissors, color: "text-purple-500", bg: "bg-purple-500/10" },
  { role: "Trainer", email: "trainer@petzoo.com", password: "demo123", icon: GraduationCap, color: "text-amber-500", bg: "bg-amber-500/10" },
  { role: "Vendor", email: "vendor@petzoo.com", password: "demo123", icon: ShoppingBag, color: "text-pink-500", bg: "bg-pink-500/10" },
  { role: "Shelter", email: "shelter@petzoo.com", password: "demo123", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { role: "Admin", email: "admin@petzoo.com", password: "admin123", icon: Shield, color: "text-violet-500", bg: "bg-violet-500/10" },
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

  const getDashboard = (em: string) => {
    if (em === "admin@petzoo.com") return "/dashboard/admin";
    if (em === "vet@petzoo.com") return "/dashboard/vet";
    if (em === "groomer@petzoo.com") return "/dashboard/groomer";
    if (em === "trainer@petzoo.com") return "/dashboard/trainer";
    if (em === "vendor@petzoo.com") return "/dashboard/vendor";
    if (em === "shelter@petzoo.com") return "/dashboard/shelter";
    return "/dashboard/owner";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) { toast.success("Welcome back to PetZoo!"); navigate(getDashboard(email)); }
    else setError("Invalid credentials. Try a demo account below.");
  };

  const loginDemo = async (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setLoading(true);
    const ok = await login(cred.email, cred.password);
    setLoading(false);
    if (ok) { toast.success(`Logged in as ${cred.role}`); navigate(getDashboard(cred.email)); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(145deg, #090B12 0%, #0D1117 100%)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px]"
            style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 60%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px]"
            style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>
        <div className="relative text-center max-w-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
            style={{ boxShadow: "0 8px 32px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-poppins text-3xl font-bold text-white mb-4 tracking-tight">Welcome Back to PetZoo</h2>
          <p className="text-white/50 mb-10 leading-relaxed">The world's most comprehensive AI-powered pet care platform. Trusted by 48K+ pet families.</p>
          <div className="space-y-3 text-left">
            {["48K+ Pet Families Worldwide", "1,247+ Verified Veterinarians", "AI-Powered Health Insights", "24/7 Expert Support"].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-white">Pet<span className="text-brand-orange">Zoo</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="font-poppins text-3xl font-bold text-white mb-2 tracking-tight">Sign In</h1>
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-orange hover:text-orange-400 font-semibold transition-colors">
                Create one free
              </Link>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl mb-5 text-sm border border-red-500/20 bg-red-500/8 text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-brand-orange" />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-brand-orange hover:text-orange-400 transition-colors">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-xl text-sm group">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-2xl border border-white/6"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-brand-orange" /> Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map(c => (
                <button key={c.role} onClick={() => loginDemo(c)} disabled={loading}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    <c.icon className={`w-3.5 h-3.5 ${c.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-brand-orange transition-colors">{c.role}</p>
                    <p className="text-[10px] text-slate-500">demo123</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-slate-500 hover:text-slate-300 transition-colors underline">Terms</Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
