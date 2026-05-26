import { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent!");
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-orange-400 rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading">Pet<span className="text-brand-orange">Zoo</span></span>
          </Link>
        </div>
        <div className="card-base p-8">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-4" />
              <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-2">Email Sent!</h2>
              <p className="text-light-muted dark:text-dark-muted text-sm mb-6">Check your inbox at <strong>{email}</strong> for the password reset link.</p>
              <Link to="/login" className="inline-flex items-center gap-2 text-brand-orange hover:underline font-semibold text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-1">Forgot Password?</h1>
              <p className="text-light-muted dark:text-dark-muted text-sm mb-6">No worries! Enter your email and we'll send a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Reset Link"}
                </button>
              </form>
              <div className="mt-5 text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-orange text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
