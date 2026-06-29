import { motion } from "motion/react";
import { Sparkles, HeartPulse, ShieldCheck } from "lucide-react";

export default function VitalityScore({ score = 88 }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-[320px] h-[320px]">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-[80px]" />

      {/* Decorative Orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_#34D399]" />
      </motion.div>

      {/* SVG */}
      <svg
        className="absolute w-[250px] h-[250px] -rotate-90"
        viewBox="0 0 180 180"
      >
        {/* Outer Ring */}
        <circle
          cx="90"
          cy="90"
          r="78"
          fill="none"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="2"
        />

        {/* Track */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth="10"
        />

        {/* Progress */}
        <defs>
          <linearGradient id="vitalityGradient">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#C9A75B" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="url(#vitalityGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
        />
      </svg>

      {/* Pulse Ring */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [.35, .12, .35],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="absolute w-[210px] h-[210px] rounded-full border border-emerald-400/20"
      />

      {/* Center */}
      <div className="relative w-[170px] h-[170px] rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,.35)]">

        {/* AI Badge */}
        <div className="absolute -top-5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 flex items-center gap-1">

          <Sparkles className="w-3 h-3 text-emerald-300" />

          <span className="text-[9px] uppercase tracking-[0.18em] font-mono text-emerald-300">
            AI Sync
          </span>

        </div>

        <HeartPulse className="w-7 h-7 text-emerald-400" />

        <h1 className="mt-4 text-6xl font-bold text-white leading-none">
          {score}
        </h1>

        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] font-mono text-emerald-300">
          Vitality
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1">

          <ShieldCheck className="w-3 h-3 text-emerald-300" />

          <span className="text-[10px] text-white">
            Excellent
          </span>

        </div>

      </div>

      {/* Floating Stats */}
      <motion.div
        whileHover={{ y: -3 }}
        className="absolute left-0 top-10 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 px-4 py-3"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
          HRV
        </p>

        <h3 className="mt-2 text-lg font-semibold text-emerald-300">
          82 ms
        </h3>
      </motion.div>

      <motion.div
        whileHover={{ y: -3 }}
        className="absolute right-0 bottom-12 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 px-4 py-3"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Recovery
        </p>

        <h3 className="mt-2 text-lg font-semibold text-amber-300">
          94%
        </h3>
      </motion.div>

    </div>
  );
}