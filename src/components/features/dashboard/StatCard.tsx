import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color?: string;
  bgColor?: string;
  gradient?: string;
}

export default function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color = "text-brand-orange",
  bgColor = "bg-brand-orange/10",
  gradient,
}: StatCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-0.5",
      gradient
        ? "text-white"
        : "bg-white dark:bg-dark-card border border-slate-200/80 dark:border-white/5"
    )}
      style={gradient ? {
        background: gradient,
        boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
      } : {
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.04)"
      }}
    >
      {/* Subtle pattern */}
      {gradient && (
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
      )}

      <div className="relative flex items-start justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          gradient ? "bg-white/15" : bgColor
        )}>
          <Icon className={cn("w-5 h-5", gradient ? "text-white" : color)} />
        </div>

        {change && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
            gradient
              ? "bg-white/15 text-white"
              : trend === "up"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : trend === "down"
                  ? "bg-red-50 dark:bg-red-500/10 text-red-500"
                  : "bg-slate-100 dark:bg-white/6 text-slate-500 dark:text-slate-400"
          )}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> :
              trend === "down" ? <TrendingDown className="w-3 h-3" /> :
                <Minus className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>

      <p className={cn(
        "font-poppins font-bold text-2xl mb-0.5 tracking-tight",
        gradient ? "text-white" : "text-slate-900 dark:text-white"
      )}>
        {value}
      </p>
      <p className={cn(
        "text-sm",
        gradient ? "text-white/70" : "text-slate-500 dark:text-slate-400"
      )}>
        {title}
      </p>
    </div>
  );
}
