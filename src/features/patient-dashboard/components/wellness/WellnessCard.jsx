import { motion } from "motion/react";

export default function WellnessCard({
  title,
  value,
  status,
  icon: Icon,
  color = "emerald",
  className = "",
}) {
  const colors = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    teal: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          {status && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {status}
            </p>
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