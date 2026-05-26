import { useState } from "react";
import { FileText, Download, Eye, Activity, Heart, AlertCircle, Syringe, TrendingUp, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const medicalReports = [
  { id: "mr1", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", title: "Annual Blood Panel Report", date: "2024-12-28", vet: "Dr. Sarah Johnson", type: "Blood Test", summary: "All values within normal range. CBC, BMP, and lipid panel results are healthy.", status: "normal", size: "2.4 MB" },
  { id: "mr2", petName: "Luna", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=80", title: "Respiratory Assessment Report", date: "2024-12-20", vet: "Dr. Michael Chen", type: "Respiratory", summary: "Mild asthma confirmed. Recommended inhaler and monthly follow-ups.", status: "attention", size: "1.8 MB" },
  { id: "mr3", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", title: "X-Ray Scan — Left Hip", date: "2024-11-15", vet: "Dr. James Wilson", type: "Imaging", summary: "No structural abnormalities detected. Hips appear healthy for age.", status: "normal", size: "8.2 MB" },
  { id: "mr4", petName: "Luna", petImage: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=80", title: "Vaccination Certificate", date: "2024-10-05", vet: "Dr. Emily Davis", type: "Vaccination", summary: "Annual vaccinations completed. Rabies, FPV, FHV, FCV all up to date.", status: "normal", size: "0.8 MB" },
  { id: "mr5", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", title: "Skin Allergy Test Results", date: "2024-09-18", vet: "Dr. Priya Sharma", type: "Allergy Test", summary: "Positive reaction to wheat and corn derivatives. Recommended grain-free diet.", status: "attention", size: "3.1 MB" },
  { id: "mr6", petName: "Max", petImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80", title: "Annual Physical Examination", date: "2024-08-12", vet: "Dr. Sarah Johnson", type: "Physical Exam", summary: "Overall health excellent. Weight, heart, and lungs all normal.", status: "normal", size: "1.2 MB" },
];

const typeColors: Record<string, string> = {
  "Blood Test": "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  "Respiratory": "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Imaging": "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Vaccination": "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Allergy Test": "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Physical Exam": "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export default function MedicalReports() {
  const [search, setSearch] = useState("");
  const [petFilter, setPetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = medicalReports.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.vet.toLowerCase().includes(search.toLowerCase());
    const matchPet = petFilter === "all" || r.petName === petFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchPet && matchStatus;
  });

  return (
    <DashboardLayout title="Medical Reports">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Reports", value: medicalReports.length, color: "from-sky-500 to-sky-600" },
          { label: "Normal Results", value: medicalReports.filter(r => r.status === "normal").length, color: "from-emerald-500 to-emerald-600" },
          { label: "Need Attention", value: medicalReports.filter(r => r.status === "attention").length, color: "from-amber-500 to-amber-600" },
          { label: "This Year", value: medicalReports.filter(r => r.date.startsWith("2024")).length, color: "from-violet-500 to-violet-600" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${s.color.split(" ")[1]}, ${s.color.split(" ")[3]})`, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            <p className="text-white/70 text-xs mb-1">{s.label}</p>
            <p className="font-poppins font-bold text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Attention Reports */}
      {medicalReports.filter(r => r.status === "attention").length > 0 && (
        <div className="mb-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/8 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">Reports Requiring Attention</p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">{medicalReports.filter(r => r.status === "attention").length} reports have findings that may require follow-up. Please consult your vet.</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-white/5">
          <h3 className="font-poppins font-semibold text-slate-900 dark:text-white">Medical Reports ({filtered.length})</h3>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..." className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-orange/50" />
            </div>
            <select value={petFilter} onChange={e => setPetFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Pets</option>
              <option>Max</option>
              <option>Luna</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-sm outline-none text-slate-700 dark:text-slate-300">
              <option value="all">All Status</option>
              <option value="normal">Normal</option>
              <option value="attention">Needs Attention</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {filtered.map(report => (
            <div key={report.id} className={cn("flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors", report.status === "attention" && "bg-amber-50/30 dark:bg-amber-500/5")}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", report.status === "normal" ? "bg-sky-50 dark:bg-sky-500/10" : "bg-amber-50 dark:bg-amber-500/10")}>
                <FileText className={cn("w-5 h-5", report.status === "normal" ? "text-sky-500" : "text-amber-500")} />
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <img src={report.petImage} alt={report.petName} className="w-8 h-8 rounded-xl object-cover" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{report.petName}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{report.title}</p>
                  <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-bold", typeColors[report.type] || "")}>{report.type}</span>
                  {report.status === "attention" && <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">⚠ Attention</span>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{report.summary}</p>
                <p className="text-xs text-slate-400 mt-0.5">{report.vet} · {report.date}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-slate-400">{report.size}</span>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-colors"><Eye className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"><Download className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
