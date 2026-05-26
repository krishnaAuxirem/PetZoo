import { Link } from "react-router-dom";
import { PawPrint, Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Mail, Phone, MapPin, ArrowRight, Sparkles } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press" },
  ],
  Services: [
    { label: "Veterinary Care", href: "/veterinarians" },
    { label: "Pet Grooming", href: "/grooming" },
    { label: "Pet Training", href: "/training" },
    { label: "Pet Adoption", href: "/adoption" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "AI Assistant", href: "/#ai-assistant" },
  ],
  Resources: [
    { label: "Help Center", href: "/help" },
    { label: "FAQ", href: "/faq" },
    { label: "Pet Health Library", href: "/blog" },
    { label: "Breed Guide", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Community", href: "/community" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #060810 0%, #040608 100%)" }}>
      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span className="text-brand-orange text-xs font-semibold uppercase tracking-widest">Newsletter</span>
              </div>
              <h3 className="font-poppins font-bold text-2xl text-white mb-1">Stay Updated with PetZoo</h3>
              <p className="text-slate-500 text-sm">Expert pet care tips, exclusive offers, and platform updates.</p>
            </div>
            <div className="flex gap-2.5 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none focus:border-brand-orange/50 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
              <button className="px-5 py-3 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-all whitespace-nowrap flex items-center gap-2"
                style={{ boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center"
                style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                <PawPrint className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
              </div>
              <span className="font-poppins font-bold text-2xl text-white tracking-tight">
                Pet<span className="text-brand-orange">Zoo</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              The world's most comprehensive AI-powered pet care ecosystem. Connecting pet owners, vets, groomers, trainers, vendors and shelters in one unified platform.
            </p>

            {/* Social */}
            <div className="flex gap-2 flex-wrap mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { icon: Mail, text: "hello@petzoo.com", href: "mailto:hello@petzoo.com" },
                { icon: Phone, text: "+1 800 PETZOO6", href: "tel:+18005738966" },
                { icon: MapPin, text: "123 Pet Lane, New York, NY 10001", href: "#" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                  <a href={item.href} className="text-slate-500 text-xs hover:text-slate-300 transition-colors">{item.text}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-poppins font-semibold text-white/80 text-xs uppercase tracking-widest mb-5">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-500 text-sm hover:text-slate-200 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} PetZoo Technologies Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/privacy" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">Terms</Link>
              <Link to="/cookies" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">Cookies</Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-slate-600 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
