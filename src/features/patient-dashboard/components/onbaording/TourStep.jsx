import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function TourStep({
  step,
  current,
  total,
  position,
  isLast,
  onNext,
  onPrev,
  onSkip,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-[101] w-[92vw] max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-600">
          Step {current + 1}/{total}
        </span>

        <button
          onClick={onSkip}
          className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          Skip
        </button>
      </div>

      <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
        {step.title}
      </h3>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {step.desc}
      </p>

      <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/10">
        <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
          {step.whyItMatters}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {isLast ? (
          <button
            onClick={onNext}
            className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            Finish
            <Check className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onNext}
            className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}