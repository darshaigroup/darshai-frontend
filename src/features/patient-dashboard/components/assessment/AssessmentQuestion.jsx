import { motion } from "motion/react";

export default function AssessmentQuestion({
  question,
  value,
  onChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6"
    >
      <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
        {question.title}
      </h3>

      {question.description && (
        <p className="mt-2 text-sm text-slate-500">
          {question.description}
        </p>
      )}

      <div className="mt-5 space-y-3">
        {question.options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full text-left p-4 rounded-2xl border transition-all ${
              value === option.value
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-slate-200 dark:border-slate-700 hover:border-emerald-300"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium text-slate-900 dark:text-white">
                {option.label}
              </span>

              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  value === option.value
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-300"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}