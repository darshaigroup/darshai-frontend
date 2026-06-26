import { Check } from "lucide-react";

export default function ProgressTracker({
  currentStep,
  totalSteps,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Assessment Progress
        </h3>

        <span className="text-sm text-slate-500">
          {currentStep}/{totalSteps}
        </span>
      </div>

      <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
          }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 overflow-x-auto">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const completed = index + 1 < currentStep;
          const active = index + 1 === currentStep;

          return (
            <div
              key={index}
              className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center border ${
                completed
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : active
                  ? "border-emerald-500 text-emerald-500"
                  : "border-slate-300 text-slate-400"
              }`}
            >
              {completed ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}