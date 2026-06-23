import { Sparkles } from "lucide-react";
import VitalityScore from "./VitalityScore";

export default function WellnessHero({
  patientName = "Rupesh",
  vitalityScore = 88,
}) {
  return (
    <section
      id="hero-wellness-centering"
      className="relative overflow-hidden rounded-[32px] border border-white/10 p-5 md:p-8 lg:p-10 text-white shadow-[0_20px_50px_rgba(8,23,42,.4)]"
      style={{
        background:
          "linear-gradient(135deg,#06152A 0%,#0D2341 50%,#162E52 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(74,222,128,.15),transparent_45%)]" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex justify-center">
          <VitalityScore score={vitalityScore} />
        </div>

        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400">
              Live Health Companion Sync
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
            {patientName} Longevity Diagnostics
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Primary Dosha
              </p>

              <h3 className="mt-2 text-emerald-400 font-semibold">
                Pitta-Vata
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Risk Index
              </p>

              <h3 className="mt-2 text-white font-semibold">
                Low Risk
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Onboarding
              </p>

              <h3 className="mt-2 text-amber-400 font-semibold">
                80% Complete
              </h3>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-mono">
              Companion Recommendation
            </p>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Based on your dominant Pitta-Vata constitution and current Agni
              activity, prioritize cooling foods, restorative sleep and guided
              breathing to maintain physiological balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}