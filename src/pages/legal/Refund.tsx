export default function Refund() {
  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-poppins text-4xl font-bold text-light-text dark:text-dark-heading mb-2">Refund Policy</h1>
        <p className="text-light-muted dark:text-dark-muted mb-8">Last updated: December 1, 2024</p>
        <div className="card-base p-8 space-y-6 text-light-muted dark:text-dark-muted text-sm leading-relaxed">
          {[
            { title: "Marketplace Products", content: "We offer a 30-day return policy for most products. Items must be unused and in original packaging. Certain items like opened food or personalized products are non-returnable. Refunds are processed within 5-7 business days." },
            { title: "Subscription Plans", content: "New subscribers receive a 30-day money-back guarantee. Monthly plans can be cancelled anytime with no further charges. Annual plans are refundable on a prorated basis if cancelled within 60 days." },
            { title: "Veterinary Appointments", content: "Appointments cancelled 24+ hours in advance receive a full refund. Cancellations within 24 hours may be subject to a 25% cancellation fee. No-shows are not eligible for refunds." },
            { title: "Grooming Services", content: "Cancellations 12+ hours in advance receive a full refund. Late cancellations may incur a 50% fee. If you're unsatisfied with the service, contact us within 24 hours for a resolution." },
            { title: "Training Programs", content: "Online programs can be refunded within 7 days if less than 20% of content has been accessed. In-person sessions follow a 48-hour cancellation policy." },
            { title: "How to Request a Refund", content: "Contact support@petzoo.com with your order number and reason for refund. Our team will respond within 24 hours. Approved refunds are processed to your original payment method within 5-10 business days." },
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
