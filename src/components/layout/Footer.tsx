import { Link } from "react-router-dom";
import { PawPrint, Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about#mission" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Press Kit", href: "/press" },
    { label: "Investors", href: "/investors" },
  ],
  Services: [
    { label: "Veterinary Care", href: "/veterinarians" },
    { label: "Pet Grooming", href: "/grooming" },
    { label: "Pet Training", href: "/training" },
    { label: "Pet Adoption", href: "/adoption" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Community", href: "/community" },
    { label: "AI Assistant", href: "/#ai-assistant" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Pet Health Library", href: "/blog" },
    { label: "Breed Guide", href: "/blog" },
    { label: "Membership Plans", href: "/membership" },
    { label: "Pricing", href: "/pricing" },
    { label: "API Docs", href: "/docs" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Live Chat", href: "/contact" },
    { label: "Report an Issue", href: "/contact" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Status Page", href: "/status" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
    { label: "GDPR Compliance", href: "/privacy" },
    { label: "Data Security", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20" },
  { icon: Twitter, href: "#", label: "Twitter/X", color: "hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" },
  { icon: MessageCircle, href: "#", label: "WhatsApp", color: "hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20" },
];

export default function Footer() {
  return (
    <footer className="bg-light-sidebar dark:bg-dark-sidebar text-slate-300">
      {/* Newsletter */}
      <div className="border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-poppins font-bold text-2xl text-white mb-2">Stay Updated with PetZoo</h3>
              <p className="text-slate-400 text-sm">Get expert pet care tips, exclusive offers and platform updates.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input type="email" placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange" />
              <button className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-orange-400 rounded-xl flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="font-poppins font-bold text-2xl text-white">Pet<span className="text-brand-orange">Zoo</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The world's most comprehensive AI-powered pet care ecosystem. Connecting pet owners, vets, groomers, trainers, vendors and shelters through one unified platform.
            </p>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} aria-label={label}
                  className={`p-2.5 rounded-lg bg-slate-700/50 text-slate-400 transition-all ${color}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href="mailto:hello@petzoo.com" className="hover:text-white transition-colors">hello@petzoo.com</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href="tel:+18005738966" className="hover:text-white transition-colors">+1 800 PETZOO6</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>123 Pet Lane, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-poppins font-semibold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-400 text-sm hover:text-brand-orange transition-colors">
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
      <div className="border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} PetZoo Technologies Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Terms</Link>
              <Link to="/cookies" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Cookies</Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-slate-500 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
