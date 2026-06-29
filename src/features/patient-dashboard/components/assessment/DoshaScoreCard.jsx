import { motion } from "motion/react";

export default function DoshaScoreCard({
  dosha,
  score,
  color,
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-400">
            Dosha
          </p>

          <h3
            className="mt-2 text-xl font-bold"
            style={{ color }}
          >
            {dosha}
          </h3>
        </div>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: color }}
        >
          {score}%
        </div>
      </div>

      <div className="mt-5 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}