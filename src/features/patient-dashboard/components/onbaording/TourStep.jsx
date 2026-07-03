import TourProgress from "./TourProgess";
import TourNavigation from "./TourNavigation";

export default function TourStep({
  step,
  total,
  target,
  onNext,
  onBack,
  onSkip,
}) {
  if (!step || !target) return null;

  const cardWidth = 420;

  const left = Math.min(
    Math.max(20, target.left),
    window.innerWidth - cardWidth - 20
  );

  const top =
    target.bottom + 24 + 320 > window.innerHeight
      ? target.top - 300
      : target.bottom + 24;

  return (
    <div
      className="fixed z-[1005] w-[92vw] max-w-md rounded-3xl border border-white/10 bg-[#06152A] p-6 text-white shadow-[0_35px_80px_rgba(0,0,0,.55)]"
      style={{
        top,
        left,
      }}
    >
      <TourProgress
        current={step.id}
        total={total}
      />

      <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-300">
        {step.category}
      </span>

      <h2 className="mt-4 font-serif text-2xl font-bold">
        {step.title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-300">
        {step.description}
      </p>

      <TourNavigation
        current={step.id}
        total={total}
        onBack={onBack}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
  );
}