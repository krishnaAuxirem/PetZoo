import { useState } from "react";
import { Calendar, Clock, Video, CheckCircle, XCircle, AlertCircle, Plus, PawPrint } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockAppointments } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const typeIcons: Record<string, React.ElementType> = {
  telemedicine: Video,
  consultation: AlertCircle,
  vaccination: CheckCircle,
  checkup: CheckCircle,
  surgery: XCircle,
};

export default function Appointments() {
  const [filter, setFilter] = useState("all");
  const filtered = mockAppointments.filter(a => filter === "all" || a.status === filter);

  return (
    <DashboardLayout title="Vet Appointments">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {["all","scheduled","completed","pending","cancelled"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? "bg-brand-orange text-white" : "bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-brand-orange"}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => toast.success("Redirecting to book appointment")}
          className="flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> Book New
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map(appt => {
          const TypeIcon = typeIcons[appt.type] || CheckCircle;
          return (
            <div key={appt.id} className="card-base p-5 hover:shadow-card-hover transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${appt.type === "telemedicine" ? "bg-brand-blue/10" : "bg-brand-orange/10"}`}>
                    <TypeIcon className={`w-5 h-5 ${appt.type === "telemedicine" ? "text-brand-blue" : "text-brand-orange"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-light-text dark:text-dark-heading">{appt.vetName}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${statusColors[appt.status]}`}>{appt.status}</span>
                      <span className="text-xs text-light-muted dark:text-dark-muted bg-light-hover dark:bg-dark-hover px-2 py-0.5 rounded-lg capitalize">{appt.type}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-light-muted dark:text-dark-muted flex-wrap">
                      <span className="flex items-center gap-1"><PawPrint className="w-3.5 h-3.5 text-brand-orange" />{appt.petName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{appt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{appt.time}</span>
                    </div>
                    {appt.notes && <p className="text-xs text-light-muted dark:text-dark-muted mt-1 italic">Note: {appt.notes}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-poppins font-bold text-brand-orange">{formatCurrency(appt.fee)}</span>
                  {appt.status === "scheduled" && (
                    <div className="flex gap-2">
                      {appt.type === "telemedicine" && (
                        <button onClick={() => toast.success("Joining video call")} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold rounded-lg transition-colors">
                          <Video className="w-3 h-3" /> Join Call
                        </button>
                      )}
                      <button onClick={() => toast.success("Appointment cancelled")} className="px-3 py-1.5 border border-red-200 dark:border-red-800 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
