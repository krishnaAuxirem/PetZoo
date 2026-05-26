import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Video, Search, Filter, CheckCircle } from "lucide-react";
import { mockVets } from "@/lib/mockData";
import toast from "react-hot-toast";

const specializations = ["All", "General Practice", "Feline Medicine", "Exotic Animals", "Orthopedics", "Dermatology", "Emergency Care"];

export default function Veterinarians() {
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("All");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingType, setBookingType] = useState("consultation");

  const filtered = mockVets.filter(v =>
    (search === "" || v.name.toLowerCase().includes(search.toLowerCase()) || v.specialization.toLowerCase().includes(search.toLowerCase())) &&
    (spec === "All" || v.specialization.toLowerCase().includes(spec.toLowerCase()))
  );

  const handleBook = () => {
    if (!bookingDate || !bookingTime) { toast.error("Please select date and time"); return; }
    toast.success("Appointment booked successfully! Check your dashboard.");
    setShowModal(null);
    setBookingDate(""); setBookingTime("");
  };

  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-br from-sky-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <img src="/src/assets/vet-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-sky-500/20 text-sky-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Verified Veterinarians</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Expert Veterinary Care, On Your Schedule</h1>
          <p className="text-white/70 mb-8">Book in-clinic or telemedicine appointments with 1,200+ licensed veterinarians.</p>
          <div className="flex gap-3 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or specialization..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40" />
            </div>
            <button className="px-5 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </section>

      {/* Specialization Filter */}
      <div className="sticky top-16 z-10 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {specializations.map(s => (
            <button key={s} onClick={() => setSpec(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${spec === s ? "bg-brand-orange text-white" : "bg-light-hover dark:bg-dark-hover text-light-muted dark:text-dark-muted hover:text-brand-orange"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Vet Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-light-muted dark:text-dark-muted text-sm"><strong className="text-light-text dark:text-dark-heading">{filtered.length}</strong> veterinarians found</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vet) => (
            <div key={vet.id} className="card-base p-6 hover:shadow-card-hover transition-all hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <img src={vet.image} alt={vet.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading truncate">{vet.name}</h3>
                    <CheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  </div>
                  <p className="text-light-muted dark:text-dark-muted text-xs mb-1 truncate">{vet.specialization}</p>
                  <p className="text-light-muted dark:text-dark-muted text-xs">{vet.clinic}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-sm text-light-text dark:text-dark-heading">{vet.rating}</span>
                <span className="text-light-muted dark:text-dark-muted text-xs">({vet.reviews} reviews)</span>
                <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-lg ${vet.available ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {vet.available ? "Available" : "Busy"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted mb-4 flex-wrap gap-y-1">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vet.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{vet.experience} exp</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(vet.id)}
                  className="flex-1 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl text-center transition-colors">
                  Book – ${vet.fee}
                </button>
                <button onClick={() => { setShowModal(vet.id); setBookingType("telemedicine"); }}
                  className="flex items-center gap-1.5 py-2.5 px-3 border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-body hover:border-brand-orange hover:text-brand-orange transition-colors">
                  <Video className="w-3.5 h-3.5" /> Tele
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-4">Book Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Appointment Type</label>
                <select value={bookingType} onChange={e => setBookingType(e.target.value)}
                  className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
                  <option value="consultation">General Consultation</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="checkup">Routine Checkup</option>
                  <option value="telemedicine">Telemedicine</option>
                  <option value="surgery">Surgery Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Select Date</label>
                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange" />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Select Time</label>
                <select value={bookingTime} onChange={e => setBookingTime(e.target.value)}
                  className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-brand-orange">
                  <option value="">Choose time slot</option>
                  {["9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(null)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Cancel</button>
                <button onClick={handleBook} className="flex-1 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors">Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
