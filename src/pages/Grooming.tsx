import { useState } from "react";
import { Clock, Star, CheckCircle, Home } from "lucide-react";
import { mockGroomingServices } from "@/lib/mockData";
import toast from "react-hot-toast";

export default function Grooming() {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [petName, setPetName] = useState("");

  const handleBook = () => {
    if (!date || !time || !petName) { toast.error("Please fill all fields"); return; }
    toast.success("Grooming appointment booked successfully");
    setShowModal(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/grooming-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-purple-500/20 text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Professional Grooming</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Pamper Your Pet in Style</h1>
          <p className="text-white/70 mb-8">Book professional grooming services with certified groomers. Home visits available.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white/70 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" /> Certified Groomers
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white/70 text-sm">
              <Home className="w-4 h-4 text-sky-400" /> Home Service Available
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white/70 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Best Price Guarantee
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-poppins text-2xl font-bold text-light-text dark:text-dark-heading mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGroomingServices.map((s) => (
            <div key={s.id} className="card-base overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 group">
              <div className="relative aspect-video overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">{s.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">{s.name}</h3>
                  <span className="font-poppins font-bold text-brand-orange whitespace-nowrap ml-2">${s.price}</span>
                </div>
                <p className="text-light-muted dark:text-dark-muted text-sm mb-3 line-clamp-2">{s.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-light-text dark:text-dark-heading">{s.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-light-muted dark:text-dark-muted text-xs">
                    <Clock className="w-3 h-3" /> {s.duration}
                  </div>
                </div>
                <button onClick={() => setShowModal(s.id)} className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-5">Book Grooming Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Pet Name</label>
                <input value={petName} onChange={e => setPetName(e.target.value)} placeholder="e.g., Max" className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Time</label>
                <select value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-purple-500">
                  <option value="">Select time</option>
                  {["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover transition-colors text-light-text dark:text-dark-heading">Cancel</button>
                <button onClick={handleBook} className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
