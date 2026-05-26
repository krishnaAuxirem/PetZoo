import { Link } from "react-router-dom";
import { Eye, Ear, Hand, Brain, Globe, CheckCircle, Monitor, Keyboard, Volume2, ZoomIn, Mail, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    color: "text-sky-500",
    bg: "bg-sky-100 dark:bg-sky-900/20",
    items: [
      "High contrast mode support for better readability",
      "All images include descriptive alt text",
      "Text can be resized up to 200% without loss of content",
      "Color is never used as the sole means of conveying information",
      "Focus indicators are clearly visible on all interactive elements",
    ]
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
    items: [
      "All functionality is available via keyboard navigation",
      "Logical tab order throughout all pages",
      "Skip navigation links on every page",
      "No keyboard traps — users can always navigate away",
      "Keyboard shortcuts for frequently used features",
    ]
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/20",
    items: [
      "Compatible with NVDA, JAWS, VoiceOver, and TalkBack",
      "Proper ARIA labels on all interactive elements",
      "Live regions for dynamic content updates",
      "Semantic HTML structure throughout the platform",
      "Form inputs have associated labels and error messages",
    ]
  },
  {
    icon: Brain,
    title: "Cognitive Accessibility",
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/20",
    items: [
      "Clear, plain-language content across all pages",
      "Consistent navigation and layout patterns",
      "Progress indicators on multi-step processes",
      "Sufficient time for timed interactions",
      "Error messages are clear and provide resolution guidance",
    ]
  },
  {
    icon: Hand,
    title: "Motor Accessibility",
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-900/20",
    items: [
      "Touch targets are at least 44x44 pixels",
      "Drag-and-drop interfaces have keyboard alternatives",
      "No time-based interactions required for core functionality",
      "Multi-touch gestures have single-pointer alternatives",
      "Forms can be completed without mouse usage",
    ]
  },
  {
    icon: Monitor,
    title: "Technology Support",
    color: "text-teal-500",
    bg: "bg-teal-100 dark:bg-teal-900/20",
    items: [
      "Tested on Chrome, Firefox, Safari, and Edge",
      "Mobile-responsive on iOS and Android devices",
      "Works with OS-level accessibility settings",
      "Compatible with browser zoom up to 400%",
      "No content relies on CSS or JavaScript exclusively",
    ]
  },
];

const standards = [
  { label: "WCAG 2.1 AA", desc: "We aim to meet WCAG 2.1 Level AA guidelines.", status: "Partial Compliance" },
  { label: "ADA Compliant", desc: "Designed in accordance with the Americans with Disabilities Act.", status: "In Progress" },
  { label: "Section 508", desc: "Federal accessibility standards for electronic content.", status: "In Progress" },
  { label: "EN 301 549", desc: "European accessibility standard for ICT products.", status: "In Progress" },
];

export default function Accessibility() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-sky-500/20 text-sky-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Accessibility</span>
          <h1 className="font-poppins text-4xl sm:text-5xl font-extrabold text-white mb-6">
            PetZoo is Accessible to Everyone
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            We are committed to making PetZoo accessible to all users, regardless of disability or how they access the web. Our goal is WCAG 2.1 Level AA compliance.
          </p>
          <a href="#features" className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-2xl transition-all group">
            View Our Accessibility Features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-base p-8">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-sky-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-3">Our Commitment</h2>
                <p className="text-light-muted dark:text-dark-muted leading-relaxed mb-4">
                  At PetZoo, we believe that every pet lover deserves equal access to our platform, regardless of ability. We are actively working to ensure our website, mobile apps, and digital content are accessible and inclusive.
                </p>
                <p className="text-light-muted dark:text-dark-muted leading-relaxed">
                  Our accessibility program is ongoing. We regularly audit our platform, address known issues, and test with users who rely on assistive technologies. If you encounter any barriers, please let us know — your feedback directly improves our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-3">Accessibility Features</h2>
            <p className="text-light-muted dark:text-dark-muted">What we've implemented to make PetZoo more accessible.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="card-base p-6">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-3">{f.title}</h3>
                <ul className="space-y-2">
                  {f.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-light-text dark:text-dark-heading mb-3">Compliance Standards</h2>
            <p className="text-light-muted dark:text-dark-muted">Standards we're working toward.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {standards.map(s => (
              <div key={s.label} className="card-base p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-light-text dark:text-dark-heading">{s.label}</h3>
                  <p className="text-sm text-light-muted dark:text-dark-muted mt-1">{s.desc}</p>
                  <span className="inline-block mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-lg">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-poppins text-3xl font-bold text-white mb-4">Found an Accessibility Issue?</h2>
          <p className="text-white/80 mb-8">
            If you encounter accessibility barriers on our platform, please let us know. We take all reports seriously and prioritize quick resolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 font-bold rounded-2xl hover:bg-white/90 transition-all">
              <Mail className="w-4 h-4" /> Report an Issue
            </Link>
            <a href="mailto:accessibility@petzoo.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/30 transition-all">
              accessibility@petzoo.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
