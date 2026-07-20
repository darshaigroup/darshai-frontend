import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck } from "lucide-react";

const getTheme = s => s >= 80 ? { c: "#10B981", glow: "bg-emerald-500/10", ring: "border-emerald-400/20", text: "text-emerald-300", badge: "bg-emerald-500/10 border-emerald-500/20", status: "Excellent" } : s >= 60 ? { c: "#FACC15", glow: "bg-yellow-500/10", ring: "border-yellow-400/20", text: "text-yellow-300", badge: "bg-yellow-500/10 border-yellow-500/20", status: "Good" } : s >= 40 ? { c: "#FB923C", glow: "bg-orange-500/10", ring: "border-orange-400/20", text: "text-orange-300", badge: "bg-orange-500/10 border-orange-500/20", status: "Fair" } : { c: "#EF4444", glow: "bg-red-500/10", ring: "border-red-400/20", text: "text-red-300", badge: "bg-red-500/10 border-red-500/20", status: "Needs Attention" };

export default function VitalityScore({ score = 88, report = {} }) {
  const radius = 68, circumference = 2 * Math.PI * radius, risk = Number(report?.risk_score ?? report?.overall_risk_score ?? report?.risk_percentage ?? report?.composite_score ?? 0), wellness = Number(report?.wellness_score ?? score ?? Math.max(0, 100 - risk)), offset = circumference - (wellness / 100) * circumference, theme = getTheme(wellness);

  return (
    <div className="relative flex h-[320px] w-[320px] items-center justify-center">
      <div className={`absolute h-72 w-72 rounded-full blur-[80px] ${theme.glow}`} />

      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }} className="absolute inset-0">
        <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full" style={{ background: theme.c, boxShadow: `0 0 18px ${theme.c}` }} />
      </motion.div>

      <svg className="absolute h-[250px] w-[250px] -rotate-90" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="2" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" />

        <defs>
          <linearGradient id="vitalityGradient">
            <stop offset="0%" stopColor={theme.c} />
            <stop offset="70%" stopColor={theme.c} />
            <stop offset="100%" stopColor="#ffffff22" />
          </linearGradient>
        </defs>

        <motion.circle cx="90" cy="90" r={radius} fill="none" stroke="url(#vitalityGradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.8, ease: "easeOut" }} />
      </svg>

      <motion.div animate={{ scale: [1, 1.06, 1], opacity: [.35, .12, .35] }} transition={{ repeat: Infinity, duration: 3 }} className={`absolute h-[210px] w-[210px] rounded-full border ${theme.ring}`} />

      <div className="relative flex h-[170px] w-[170px] flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        <HeartPulse className={`h-7 w-7 ${theme.text}`} />

        <h1 className="mt-4 text-6xl font-bold leading-none text-white">{wellness}</h1>

        <p className={`mt-2 text-[11px] font-mono uppercase tracking-[.22em] ${theme.text}`}>Wellness Index</p>

        <div className={`mt-6 flex items-center gap-2 rounded-full border px-3 py-1 ${theme.badge}`}>
          <ShieldCheck className={`h-3 w-3 ${theme.text}`} />
          <span className={`text-[10px] font-medium ${theme.text}`}>{theme.status}</span>
        </div>
      </div>
    </div>
  );
}