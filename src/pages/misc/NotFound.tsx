import { Link } from "react-router-dom";
import { PawPrint, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-3xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-6">
          <PawPrint className="w-12 h-12 text-brand-orange" />
        </div>
        <h1 className="font-poppins text-6xl font-extrabold text-brand-orange mb-3">404</h1>
        <h2 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mb-4">Page Not Found</h2>
        <p className="text-light-muted dark:text-dark-muted mb-8">This page doesn't exist or has been moved. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-all">
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <button onClick={() => window.history.back()} className="flex items-center justify-center gap-2 px-6 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
