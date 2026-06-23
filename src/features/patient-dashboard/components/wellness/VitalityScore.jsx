import { motion } from "motion/react";

export default function VitalityScore({ score = 88 }) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-40 h-40 rotate-[-90deg]" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth="8"
        />

        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#34D399"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5 }}
        />
      </svg>

      <div className="absolute text-center">
        <h2 className="text-4xl font-bold text-white">{score}</h2>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-emerald-400">
          Vitality
        </p>
      </div>
    </div>
  );
}