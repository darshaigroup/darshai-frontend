import { motion } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Activity,
  Brain,
  ArrowRight,
} from "lucide-react";
import VitalityScore from "./VitalityScore";

export default function WellnessHero({
  patientName = "Rupesh",
  vitalityScore = 88,
}) {
  const cards = [
    {
      title: "Primary Dosha",
      value: "Pitta • Vata",
      color: "text-emerald-400",
      icon: Brain,
    },
    {
      title: "Risk Index",
      value: "Low Risk",
      color: "text-sky-400",
      icon: ShieldCheck,
    },
    {
      title: "Recovery",
      value: "Excellent",
      color: "text-amber-400",
      icon: HeartPulse,
    },
  ];

  return (
    <section
      className="relative overflow-hidden rounded-[36px] border border-white/10 shadow-[0_35px_80px_rgba(6,21,42,.45)]"
      style={{
        background:
          "linear-gradient(135deg,#06152A 0%,#0C2441 45%,#17365D 100%)",
      }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(52,211,153,.18),transparent_40%)]" />

      <div className="absolute -left-32 -bottom-24 w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(transparent_97%,rgba(255,255,255,.12)_100%),linear-gradient(90deg,transparent_97%,rgba(255,255,255,.12)_100%)] bg-[size:40px_40px]" />

      <div className="relative z-10 p-6 md:p-8 xl:p-10">

        <div className="grid xl:grid-cols-12 gap-8 items-center">

          {/* Left */}

          <div className="xl:col-span-4 flex justify-center">

            <motion.div
              initial={{ opacity: 0, scale: .95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <VitalityScore score={vitalityScore} />
            </motion.div>

          </div>

          {/* Right */}

          <div className="xl:col-span-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">

              <Sparkles className="w-4 h-4 text-emerald-400" />

              <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-emerald-300">
                Live Bio Telemetry
              </span>

            </div>

            <h1 className="mt-6 text-3xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {patientName}
              <br />
              Longevity Diagnostics
            </h1>

            <p className="mt-5 max-w-3xl text-slate-300 leading-7">
              Your biological systems are continuously synchronized through
              DarshAI's Geo Wellness Intelligence. Review your constitutional
              balance, vitality metrics and AI-guided longevity recommendations.
            </p>

            {/* Cards */}

            <div className="grid md:grid-cols-3 gap-4 mt-8">

              {cards.map(card => {

                const Icon = card.icon;

                return (

                  <motion.div
                    whileHover={{ y: -4 }}
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5"
                  >
                    <div className="flex items-center justify-between">

                      <Icon className={`w-5 h-5 ${card.color}`} />

                      <Activity className="w-4 h-4 text-white/30" />

                    </div>

                    <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      {card.title}
                    </p>

                    <h3 className={`mt-2 text-lg font-semibold ${card.color}`}>
                      {card.value}
                    </h3>

                  </motion.div>

                );

              })}

            </div>

            {/* Recommendation */}

            <motion.div
              whileHover={{ y: -3 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6"
            >

              <div className="flex items-center justify-between flex-wrap gap-4">

                <div>

                  <p className="text-[11px] uppercase tracking-[0.2em] font-mono text-emerald-300">
                    Companion Recommendation
                  </p>

                  <p className="mt-3 max-w-2xl text-slate-300 leading-7">
                    Continue cooling nutrition, optimize circadian recovery,
                    practice guided breathing and maintain hydration to balance
                    your dominant Pitta-Vata constitution while improving
                    metabolic resilience.
                  </p>

                </div>

                <button className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition">

                  View Protocol

                  <ArrowRight className="w-4 h-4" />

                </button>

              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}