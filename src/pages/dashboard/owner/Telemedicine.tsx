import { useState } from "react";
import { Video, Calendar, Clock, Stethoscope, MessageCircle, Star, ArrowRight, CheckCircle, Monitor } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockVets } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

const teleVets = mockVets.filter(v => v.available);
const upcomingTelemed = [
  { id: "t1", vetName: "Dr. Emily Davis", petName: "Luna", date: "Jan 05, 2025", time: "3:00 PM", type: "Follow-up", status: "Scheduled", fee: 45 },
];

const consultHistory = [
  { id: "tc1", vetName: "Dr. Michael Chen", petName: "Luna", date: "Nov 20, 2024", type: "Skin Condition", duration: "22 min", fee: 45, rating: 5 },
  { id: "tc2", vetName: "Dr. Sarah Johnson", petName: "Max", date: "Oct 15, 2024", type: "Diet Advice", duration: "18 min", fee: 45, rating: 5 },
];

export default function Telemedicine() {
  const [showBooking, setShowBooking] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [reason, setReason] = useState("");

  const handleBook = () => {
    if (!selectedDate || !selectedTime || !selectedPet || !reason) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Telemedicine consultation booked! You'll receive a video link via email.");
    setShowBooking(null);
    setSelectedDate(""); setSelectedTime(""); setSelectedPet(""); setReason("");
  };

  return (
    <DashboardLayout title="Telemedicine">
      {/* Hero Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading mb-2">24/7 Virtual Vet Consultations</h2>
            <p className="text-light-muted dark:text-dark-muted mb-4">Connect with licensed veterinarians via HD video from the comfort of your home. Available round the clock.</p>
            <div className="flex flex-wrap gap-3">
              {["HD Video Calls", "Instant Prescriptions", "Secure & Private", "Under 15min Wait"].map(f => (
                <div key={f} className="flex items-center gap-1.5 text-sm text-light-text dark:text-dark-body">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="w-24 h-24 bg-sky-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Monitor className="w-12 h-12 text-sky-500" />
          </div>
        </div>
      </div>

      {/* Upcoming Consultations */}
      {upcomingTelemed.length > 0 && (
        <div className="mb-8">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Upcoming Consultations</h3>
          <div className="space-y-3">
            {upcomingTelemed.map(appt => (
              <div key={appt.id} className="card-base p-4 flex items-center gap-4 border-l-4 border-sky-500">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-sky-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{appt.vetName}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{appt.petName} · {appt.type} · {appt.date} at {appt.time}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success("Joining video call... (demo)")} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" /> Join Call
                  </button>
                  <span className="px-3 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold rounded-xl flex items-center">{appt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Vets */}
      <div className="mb-8">
        <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Available for Telemedicine Now</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teleVets.map(vet => (
            <div key={vet.id} className="card-base p-5 hover:shadow-card-hover transition-all">
              <div className="flex items-start gap-3 mb-4">
                <img src={vet.image} alt={vet.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-poppins font-semibold text-sm text-light-text dark:text-dark-heading truncate">{vet.name}</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted truncate">{vet.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-light-text dark:text-dark-heading">{vet.rating}</span>
                    <span className="text-xs text-light-muted dark:text-dark-muted">({vet.reviews})</span>
                  </div>
                </div>
                <span className="flex-shrink-0 w-2.5 h-2.5 bg-green-400 rounded-full" title="Online" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-light-muted dark:text-dark-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {vet.experience} exp
                </span>
                <span className="font-poppins font-bold text-brand-orange">{formatCurrency(vet.fee / 2)}/session</span>
              </div>
              <button onClick={() => setShowBooking(vet.id)}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5">
                <Video className="w-4 h-4" /> Book Video Call
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation History */}
      <div className="card-base p-5">
        <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Consultation History</h3>
        {consultHistory.length === 0 ? (
          <p className="text-center text-light-muted dark:text-dark-muted py-8">No past consultations yet.</p>
        ) : (
          <div className="space-y-3">
            {consultHistory.map(c => (
              <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl bg-light-hover dark:bg-dark-hover">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{c.vetName}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{c.petName} · {c.type} · {c.date} · {c.duration}</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 mb-1 justify-end">
                    {Array.from({ length: c.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-sm font-bold text-brand-orange">{formatCurrency(c.fee)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-poppins font-bold text-lg text-light-text dark:text-dark-heading mb-1">Book Telemedicine Session</h3>
            <p className="text-light-muted dark:text-dark-muted text-sm mb-5">Schedule an HD video consultation with your vet.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Select Pet</label>
                <select value={selectedPet} onChange={e => setSelectedPet(e.target.value)} className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-sky-500">
                  <option value="">Choose pet...</option>
                  {["Max", "Luna", "Tweety"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Reason for Consultation</label>
                <input value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g., Skin rash, lethargy..." className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-sky-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Date</label>
                  <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-3 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-heading mb-1.5">Time</label>
                  <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full px-3 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text dark:text-dark-heading focus:outline-none focus:border-sky-500">
                    <option value="">Time...</option>
                    {["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowBooking(null)} className="flex-1 py-3 border border-light-border dark:border-dark-border rounded-xl text-sm font-medium text-light-text dark:text-dark-heading hover:bg-light-hover dark:hover:bg-dark-hover transition-colors">Cancel</button>
                <button onClick={handleBook} className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
