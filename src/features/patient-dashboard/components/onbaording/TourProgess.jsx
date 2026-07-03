export default function TourProgress({
  current,
  total,
}) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-slate-400">
          Step {current} of {total}
        </span>

        <span className="text-xs font-medium text-emerald-300">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#C9A75B] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}