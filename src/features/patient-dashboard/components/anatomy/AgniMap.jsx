import { motion } from "motion/react";
import {
  Flame,
  Sparkles,
  ArrowRight,
  Thermometer,
  Droplets,
  Soup,
  ShieldCheck,
} from "lucide-react";

export default function AgniMap({ score = 82 }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const stages = [
    { name: "Mandagni", active: score < 45 },
    { name: "Samagni", active: score >= 45 && score <= 80 },
    { name: "Tikshnagni", active: score > 80 },
  ];

  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 lg:px-8 py-6 border-b border-stone-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2">

            <Sparkles className="w-4 h-4 text-amber-600" />

            <span className="text-[11px] uppercase tracking-[.22em] font-mono text-amber-700">
              Digestive Intelligence
            </span>

          </div>

          <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900">
            Agni Assessment
          </h2>

          <p className="mt-2 text-slate-500 max-w-xl">
            Your digestive fire determines metabolism, nutrient absorption and
            long-term vitality.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-full bg-[#06152A] text-white px-5 py-3 hover:bg-[#0B2442] transition">
          Nutrition Plan
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">

        {/* Circular Gauge */}
        <div className="flex justify-center">

          <div className="relative w-[260px] h-[260px] flex items-center justify-center">

            <div className="absolute w-56 h-56 rounded-full bg-amber-400/10 blur-3xl" />

            <svg
              className="-rotate-90"
              width="220"
              height="220"
            >

              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />

              <motion.circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="url(#agni)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2 }}
              />

              <defs>
                <linearGradient id="agni">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
              </defs>

            </svg>

            <div className="absolute text-center">

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
              >
                <Flame className="mx-auto w-10 h-10 text-orange-500" />
              </motion.div>

              <h2 className="mt-3 text-5xl font-bold text-slate-900">
                {score}%
              </h2>

              <p className="mt-2 text-[11px] uppercase tracking-[.2em] text-amber-600 font-mono">
                Agni Strength
              </p>

            </div>

          </div>

        </div>

        {/* Right */}
        <div>

          <div className="grid grid-cols-3 gap-3">

            {stages.map(stage => (

              <div
                key={stage.name}
                className={`rounded-2xl border p-4 text-center transition ${
                  stage.active
                    ? "border-amber-400 bg-amber-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              >

                <p className="text-[10px] uppercase tracking-[.15em] text-slate-500">
                  {stage.name}
                </p>

                {stage.active && (
                  <p className="mt-2 text-xs font-semibold text-amber-600">
                    Active
                  </p>
                )}

              </div>

            ))}

          </div>

          {/* Biomarkers */}
          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">

              <Thermometer className="w-6 h-6 text-orange-500" />

              <p className="mt-3 text-sm text-slate-500">
                Metabolism
              </p>

              <h4 className="mt-2 text-2xl font-bold text-slate-900">
                Optimal
              </h4>

            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">

              <Droplets className="w-6 h-6 text-sky-500" />

              <p className="mt-3 text-sm text-slate-500">
                Hydration
              </p>

              <h4 className="mt-2 text-2xl font-bold text-slate-900">
                Good
              </h4>

            </div>

          </div>

          {/* Recommendation */}
          <div className="mt-6 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-6">

            <div className="flex items-center gap-2 mb-3">

              <Soup className="w-5 h-5 text-orange-600" />

              <h4 className="font-semibold text-slate-900">
                AI Nutrition Recommendation
              </h4>

            </div>

            <p className="text-slate-700 leading-7">
              Continue warm hydration, eat freshly prepared meals, avoid late
              dinners and maintain a consistent eating schedule to strengthen
              digestive resilience.
            </p>

          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-100 p-4">

            <ShieldCheck className="w-5 h-5 text-emerald-600" />

            <div>

              <p className="text-sm font-semibold text-slate-900">
                AI Observation
              </p>

              <p className="text-sm text-slate-600">
                Digestive fire is stable and supports healthy recovery.
              </p>

            </div>

          </div>

        </div>

      </div>

    </motion.section>
  );
}