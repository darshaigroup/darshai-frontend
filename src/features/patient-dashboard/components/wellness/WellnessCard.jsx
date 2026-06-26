import { motion } from "motion/react";
import { TrendingUp, Activity } from "lucide-react";

export default function WellnessCard({
  title,
  value,
  status,
  trend = "+2%",
  icon: Icon,
  color = "emerald",
  className = "",
}) {
  const colors = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-500",
      progress: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700",
    },
    sky: {
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      text: "text-sky-500",
      progress: "bg-sky-500",
      badge: "bg-sky-50 text-sky-700",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-500",
      progress: "bg-amber-500",
      badge: "bg-amber-50 text-amber-700",
    },
    rose: {
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      text: "text-rose-500",
      progress: "bg-rose-500",
      badge: "bg-rose-50 text-rose-700",
    },
    teal: {
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
      text: "text-teal-500",
      progress: "bg-teal-500",
      badge: "bg-teal-50 text-teal-700",
    },
  };

  const theme = colors[color] || colors.emerald;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: .25 }}
      className={`group relative overflow-hidden rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,.08)] hover:shadow-[0_30px_70px_rgba(15,23,42,.12)] transition-all ${className}`}
    >
      {/* Glow */}
      <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all" />

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>

          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[.18em] uppercase ${theme.badge}`}>
            Live
          </span>

          <p className="mt-4 text-[11px] uppercase tracking-[.18em] font-mono text-slate-400">
            {title}
          </p>

        </div>

        {Icon && (
          <div
            className={`w-14 h-14 rounded-2xl border ${theme.border} ${theme.bg} flex items-center justify-center shadow-sm`}
          >
            <Icon className={`w-6 h-6 ${theme.text}`} />
          </div>
        )}

      </div>

      {/* Value */}
      <div className="mt-8">

        <h2 className="text-3xl font-bold text-slate-900">
          {value}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {status}
        </p>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-slate-400">
            Wellness Sync
          </span>

          <span className={`font-semibold ${theme.text}`}>
            96%
          </span>
        </div>

        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "96%" }}
            transition={{ duration: 1 }}
            className={`h-full rounded-full ${theme.progress}`}
          />

        </div>

      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2 text-xs text-slate-500">

          <TrendingUp className={`w-4 h-4 ${theme.text}`} />

          <span>{trend} Today</span>

        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">

          <Activity className="w-3.5 h-3.5" />

          <span>AI Synced</span>

        </div>

      </div>
    </motion.div>
  );
}