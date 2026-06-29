import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = "emerald",
  loading = false,
}) {
  const colors = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    teal: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
        <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-700" />
        <div className="mt-4 h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
        <div className="mt-3 h-8 bg-slate-200 dark:bg-slate-700 rounded w-20" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          {change !== undefined && (
            <div
              className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${
                change >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}

              {Math.abs(change)}%
            </div>
          )}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}