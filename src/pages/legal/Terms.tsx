export default function Terms() {
  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-poppins text-4xl font-bold text-light-text dark:text-dark-heading mb-2">Terms & Conditions</h1>
        <p className="text-light-muted dark:text-dark-muted mb-8">Last updated: December 1, 2024</p>
        <div className="card-base p-8 space-y-6 text-light-muted dark:text-dark-muted text-sm leading-relaxed">
          {[
            { title: "1. Acceptance of Terms", content: "By accessing and using PetZoo, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform." },
            { title: "2. Services Description", content: "PetZoo provides a platform connecting pet owners with veterinarians, groomers, trainers, vendors, and shelters. We facilitate bookings and transactions but are not directly responsible for the services provided by third-party professionals." },
            { title: "3. User Accounts", content: "You are responsible for maintaining account security, providing accurate information, and all activities under your account. Users must be 18 years or older to create an account." },
            { title: "4. Veterinary Disclaimer", content: "PetZoo's AI assistant and community content are for informational purposes only and do not constitute professional veterinary advice. Always consult a licensed veterinarian for medical concerns." },
            { title: "5. Payments and Refunds", content: "Payments for services are processed securely. Refund policies vary by service type. Marketplace products have a 30-day return policy. Subscription plans may be cancelled with a prorated refund within 30 days." },
            { title: "6. Prohibited Activities", content: "Users may not engage in fraudulent activities, impersonation, harassment, spam, or illegal activities. Violation may result in account suspension or termination." },
            { title: "7. Limitation of Liability", content: "PetZoo is not liable for indirect, incidental, or consequential damages arising from platform use. Our maximum liability is limited to amounts paid in the 12 months preceding the claim." },
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
