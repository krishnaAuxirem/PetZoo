import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";

const jobs = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", type: "Full-time", location: "Remote / NYC", level: "Senior" },
  { title: "Veterinary Partnerships Manager", dept: "Business Development", type: "Full-time", location: "New York, NY", level: "Mid-Senior" },
  { title: "AI/ML Engineer – Pet Health", dept: "AI Team", type: "Full-time", location: "Remote", level: "Senior" },
  { title: "Product Designer (Mobile)", dept: "Design", type: "Full-time", location: "Remote / SF", level: "Mid-Level" },
  { title: "Customer Success Manager", dept: "Support", type: "Full-time", location: "Remote", level: "Mid-Level" },
  { title: "Content Marketing Manager", dept: "Marketing", type: "Full-time", location: "NYC / Remote", level: "Mid-Level" },
];

export default function Careers() {
  return (
    <div className="pt-16 min-h-screen bg-light-bg dark:bg-dark-bg">
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Careers</span>
          <h1 className="font-poppins text-4xl font-extrabold text-white mb-4">Join the PetZoo Team</h1>
          <p className="text-white/70">Help us build the future of pet care. We're hiring passionate people who love animals and technology.</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.title} className="card-base p-6 hover:shadow-card-hover transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading group-hover:text-brand-orange transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs text-light-muted dark:text-dark-muted bg-light-hover dark:bg-dark-hover px-2 py-0.5 rounded-lg">{job.dept}</span>
                    <span className="flex items-center gap-1 text-xs text-light-muted dark:text-dark-muted"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1 text-xs text-light-muted dark:text-dark-muted"><Clock className="w-3 h-3" />{job.type}</span>
                    <span className="text-xs text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-lg">{job.level}</span>
                  </div>
                </div>
                <button onClick={() => toast.success("Application form coming soon! Email careers@petzoo.com")}
                  className="flex items-center gap-2 px-5 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                  Apply <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 card-base p-8 text-center bg-gradient-to-br from-brand-orange/5 to-brand-blue/5">
          <h3 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-2">Don't see your role?</h3>
          <p className="text-light-muted dark:text-dark-muted mb-4">Send us your resume and we'll reach out when the right position opens up.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-all">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
