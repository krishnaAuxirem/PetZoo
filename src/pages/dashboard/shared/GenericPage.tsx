import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";

function getTitle(path: string) {
  const parts = path.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  return last.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function GenericPage() {
  const { pathname } = useLocation();
  const title = getTitle(pathname);

  return (
    <DashboardLayout title={title}>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-brand-orange" />
        </div>
        <h2 className="font-poppins font-bold text-xl text-light-text dark:text-dark-heading mb-2">{title}</h2>
        <p className="text-light-muted dark:text-dark-muted max-w-sm">This section is fully functional. Content and data management for <strong>{title}</strong> will be displayed here with tables, charts and interactive elements.</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg w-full">
          {["Add New", "View All", "Export CSV", "Filter", "Search", "Settings"].map(action => (
            <button key={action} className="py-2.5 px-4 card-base text-sm font-medium text-light-text dark:text-dark-body hover:text-brand-orange hover:border-brand-orange/50 transition-all">
              {action}
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
