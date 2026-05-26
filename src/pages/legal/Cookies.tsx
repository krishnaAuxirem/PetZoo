export default function Cookies() {
  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-poppins text-4xl font-bold text-light-text dark:text-dark-heading mb-2">Cookie Policy</h1>
        <p className="text-light-muted dark:text-dark-muted mb-8">Last updated: December 1, 2024</p>
        <div className="card-base p-8 space-y-6 text-light-muted dark:text-dark-muted text-sm leading-relaxed">
          <p>PetZoo uses cookies and similar tracking technologies to provide, improve and protect our services.</p>
          {[
            { type: "Essential Cookies", purpose: "Required for the platform to function", examples: "Authentication tokens, session management, security", canDisable: "No" },
            { type: "Analytics Cookies", purpose: "Help us understand how users interact with PetZoo", examples: "Page views, feature usage, error tracking", canDisable: "Yes" },
            { type: "Preference Cookies", purpose: "Remember your settings and preferences", examples: "Theme preference, language, notification settings", canDisable: "Yes" },
            { type: "Marketing Cookies", purpose: "Deliver relevant advertisements", examples: "Ad targeting, campaign tracking", canDisable: "Yes" },
          ].map(c => (
            <div key={c.type} className="p-4 bg-light-hover dark:bg-dark-hover rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-light-text dark:text-dark-heading">{c.type}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.canDisable === "No" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"}`}>
                  {c.canDisable === "No" ? "Required" : "Optional"}
                </span>
              </div>
              <p className="mb-1"><strong className="text-light-text dark:text-dark-body">Purpose:</strong> {c.purpose}</p>
              <p><strong className="text-light-text dark:text-dark-body">Examples:</strong> {c.examples}</p>
            </div>
          ))}
          <p>To manage cookies, visit your browser settings or contact privacy@petzoo.com.</p>
        </div>
      </div>
    </div>
  );
}
