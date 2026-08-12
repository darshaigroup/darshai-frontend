import { motion } from "motion/react";
import { Activity, HeartPulse, Sparkles } from "lucide-react";

export default function WellnessCard({ title, value, status, trend = "", color = "emerald", insight = "", className = "" }) {
  const colors = {
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500", glow: "bg-emerald-500/5", badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
    sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-500", glow: "bg-sky-500/5", badge: "bg-sky-50 text-sky-700", dot: "bg-sky-500" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500", glow: "bg-amber-500/5", badge: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-500", glow: "bg-rose-500/5", badge: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
    teal: { bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-500", glow: "bg-teal-500/5", badge: "bg-teal-50 text-teal-700", dot: "bg-teal-500" }
  };

  const theme = colors[color] || colors.emerald;
  const labels = {
    "Primary Dosha": "Natural Constitution",
    "Secondary Dosha": "Constitutional Influence",
    "Wellness Index": "Overall Wellness State",
    "Risk Tier": "Risk Assessment"
  };
  const syncLabel = {
    "Primary Dosha": "Constitution Aligned",
    "Secondary Dosha": "Current Influence",
    "Wellness Index": "Wellness Calculated",
    "Risk Tier": "Assessment Active"
  }[title] || "Profile Synchronized";

  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .25 }} className={`group relative overflow-hidden rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,.08)] transition-all hover:shadow-[0_28px_65px_rgba(15,23,42,.12)] ${className}`}>
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${theme.glow} transition-all duration-500 group-hover:scale-150`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-400">{title}</p>
          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${theme.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot} animate-pulse`} />
            {labels[title] || "Live Profile"}
          </div>
        </div>
        <motion.div whileHover={{ rotate: 8, scale: 1.08 }} className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${theme.border} ${theme.bg} shadow-sm`}>
          <HeartPulse className={`h-6 w-6 ${theme.text}`} />
        </motion.div>
      </div>
      <div className="relative mt-7">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{value}</h2>
      </div>
      <div className={`relative mt-6 rounded-2xl border ${theme.border} ${theme.bg} p-3.5 transition-all group-hover:shadow-sm`}>
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${theme.text}`}><HeartPulse className="h-4 w-4" /></div>
          <div className="min-w-0">
            <p className={`text-[10px] font-semibold uppercase tracking-[.15em] ${theme.text}`}>{syncLabel}</p>
        
          </div>
        </div>
      </div>
      <div className="relative mt-5 flex items-center gap-2 text-xs text-slate-400"><Activity className="h-3.5 w-3.5" /><span>{insight || "Personalized health profile synchronized"}</span></div>
    </motion.div>
  );
}