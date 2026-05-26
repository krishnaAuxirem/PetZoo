import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, PawPrint, Loader2, Check, Stethoscope, Scissors, GraduationCap, ShoppingBag, Building2, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";
import toast from "react-hot-toast";

const roles: { value: UserRole; label: string; icon: React.ElementType; iconColor: string; desc: string }[] = [
  { value: "owner", label: "Pet Owner", icon: PawPrint, iconColor: "text-brand-orange", desc: "Manage your pets' health & care" },
  { value: "vet", label: "Veterinarian", icon: Stethoscope, iconColor: "text-sky-500", desc: "Consult & manage patients" },
  { value: "groomer", label: "Groomer", icon: Scissors, iconColor: "text-purple-500", desc: "Offer grooming services" },
  { value: "trainer", label: "Trainer", icon: GraduationCap, iconColor: "text-amber-500", desc: "Run training programs" },
  { value: "vendor", label: "Vendor", icon: ShoppingBag, iconColor: "text-pink-500", desc: "Sell pet products" },
  { value: "shelter", label: "Shelter", icon: Building2, iconColor: "text-green-500", desc: "Manage adoptions" },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("owner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("Please fill all fields"); return; }
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setStep(3);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      toast.success("OTP sent to " + email + " (use 123456 for demo)");
      return;
    }
    if (otp !== "123456") { toast.error("Invalid OTP. Use 123456 for demo."); return; }
    setLoading(true);
    await register({ name, email, password, role, phone });
    setLoading(false);
    toast.success("Account created. Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-orange-400 rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">Pet<span className="text-brand-orange">Zoo</span></span>
          </Link>
          <h1 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading">Create Your Account</h1>
          <p className="text-light-muted dark:text-dark-muted text-sm mt-1">Already have an account? <Link to="/login" className="text-brand-orange hover:underline font-semibold">Sign in</Link></p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {["Choose Role", "Your Details", "Verify"].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i+1 ? "bg-brand-green text-white" : step === i+1 ? "bg-brand-orange text-white" : "bg-light-border dark:bg-dark-border text-light-muted dark:text-dark-muted"}`}>
                {step > i+1 ? <Check className="w-4 h-4" /> : i+1}
              </div>
              <span className={`text-sm hidden sm:block ${step === i+1 ? "text-light-text dark:text-dark-heading font-medium" : "text-light-muted dark:text-dark-muted"}`}>{s}</span>
              {i < 2 && <div className="w-8 h-px bg-light-border dark:bg-dark-border" />}
            </div>
          ))}
        </div>

        <div className="card-base p-8">
          {step === 1 && (
            <div>
              <h2 className="font-poppins font-semibold text-lg text-light-text dark:text-dark-heading mb-5">I am a...</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {roles.map((r) => (
                  <button key={r.value} onClick={() => setRole(r.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${role === r.value ? "border-brand-orange bg-brand-orange/5" : "border-light-border dark:border-dark-border hover:border-brand-orange/50"}`}>
                    <div className={`w-8 h-8 rounded-lg bg-light-hover dark:bg-dark-hover flex items-center justify-center mb-2`}>
                      <r.icon className={`w-4 h-4 ${r.iconColor}`} />
                    </div>
                    <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{r.label}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">{r.desc}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">
                Continue as {roles.find(r => r.value === role)?.label}
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <h2 className="font-poppins font-semibold text-lg text-light-text dark:text-dark-heading mb-2">Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Full Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Phone (optional)</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555-0100" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
                </div>
                <div />
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Password *</label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange pr-11" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Confirm Password *</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Back</button>
                <button type="submit" className="flex-1 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">Continue</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleStep2} className="space-y-5">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-brand-orange" />
                </div>
                <h2 className="font-poppins font-semibold text-lg text-light-text dark:text-dark-heading mb-1">Verify Your Email</h2>
                <p className="text-light-muted dark:text-dark-muted text-sm">We'll send a 6-digit OTP to <strong>{email}</strong></p>
              </div>
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Enter OTP</label>
                  <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" maxLength={6}
                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-1 text-center">Use <strong>123456</strong> for demo</p>
                </div>
              )}
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</> : otpSent ? "Verify & Create Account" : "Send OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
