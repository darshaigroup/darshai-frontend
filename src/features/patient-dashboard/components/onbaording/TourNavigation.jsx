import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

export default function TourNavigation({
  current,
  total,
  onBack,
  onNext,
  onSkip,
}) {
  const last = current === total;

  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        onClick={onSkip}
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
      >
        <X className="h-4 w-4" />
        Skip
      </button>

      <div className="flex gap-2">
        <button
          disabled={current === 1}
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-0.5 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          {last ? "Finish" : "Next"}

          {last ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}