export default function Privacy() {
  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-poppins text-4xl font-bold text-light-text dark:text-dark-heading mb-2">Privacy Policy</h1>
        <p className="text-light-muted dark:text-dark-muted mb-8">Last updated: December 1, 2024</p>
        <div className="card-base p-8 space-y-6 text-light-muted dark:text-dark-muted text-sm leading-relaxed">
          {[
            { title: "1. Information We Collect", content: "We collect information you provide directly, such as when you register an account, create a pet profile, book appointments, or contact support. This includes your name, email address, phone number, and pet information. We also collect usage data and device information automatically." },
            { title: "2. How We Use Your Information", content: "We use your information to provide and improve our services, send notifications and reminders, process payments, personalize your experience, communicate with you about your account, ensure platform safety, and comply with legal obligations." },
            { title: "3. Data Security", content: "We implement industry-standard security measures including AES-256 encryption for sensitive data, secure HTTPS connections, regular security audits, and SOC 2 Type II compliance. Your pet's health data is stored on HIPAA-compliant infrastructure." },
            { title: "4. Data Sharing", content: "We do not sell your personal information. We share data only with verified service providers (vets, groomers, trainers) as necessary to fulfill your bookings, with your explicit consent, or as required by law." },
            { title: "5. Your Rights", content: "You have the right to access, correct, or delete your data. You can export your pet's health records at any time. You may opt out of marketing communications. Contact privacy@petzoo.com for any data requests." },
            { title: "6. Cookies", content: "We use essential cookies for platform functionality and optional analytics cookies to improve our services. You can manage cookie preferences in your browser settings." },
            { title: "7. Contact Us", content: "For privacy-related questions, contact our Data Protection Officer at privacy@petzoo.com or write to PetZoo Technologies Inc., 123 Pet Lane, New York, NY 10001." },
          ].map(s => (
            <div key={s.title}>
              <h2 className="font-poppins font-semibold text-lg text-light-text dark:text-dark-heading mb-2">{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
