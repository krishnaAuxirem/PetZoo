import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color?: string;
  bgColor?: string;
}

export default function StatCard({ title, value, change, trend, icon: Icon, color = "text-brand-orange", bgColor = "bg-brand-orange/10" }: StatCardProps) {
  return (
    <div className="card-base p-5 hover:shadow-card-hover transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bgColor)}>
          <Icon className={cn("w-5 h-5", color)} />
        </div>
        {change && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold", trend === "up" ? "text-brand-green" : trend === "down" ? "text-red-500" : "text-light-muted dark:text-dark-muted")}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
            {change}
          </div>
        )}
      </div>
      <p className="font-poppins font-bold text-2xl text-light-text dark:text-dark-heading mb-1">{value}</p>
      <p className="text-light-muted dark:text-dark-muted text-sm">{title}</p>
    </div>
  );
}
