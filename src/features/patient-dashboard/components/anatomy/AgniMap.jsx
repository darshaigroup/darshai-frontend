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
      className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-stone-100 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 sm:px-4">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="font-mono text-[9px] uppercase tracking-[.22em] text-amber-700 sm:text-[11px]">
              Digestive Intelligence
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-serif font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Agni Assessment
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Your digestive fire determines metabolism, nutrient absorption and
            long-term vitality.
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0B2442] md:w-auto">
          Nutrition Plan
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 lg:p-8 xl:grid-cols-1">
        {/* Gauge */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[260px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-3xl" />

            <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="12"
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
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <Flame className="mx-auto h-7 w-7 text-orange-500 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
              </motion.div>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                {score}%
              </h2>

              <p className="mt-2 font-mono text-[9px] uppercase tracking-[.22em] text-amber-600 sm:text-[11px]">
                Agni Strength
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col">
          {/* Agni Stages */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stages.map((stage) => (
              <div
                key={stage.name}
                className={`rounded-xl sm:rounded-2xl border p-2 sm:p-4 text-center transition ${
                  stage.active
                    ? "border-amber-400 bg-amber-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[.15em] text-slate-500 break-words">
                  {stage.name}
                </p>

                {stage.active && (
                  <p className="mt-2 text-[11px] sm:text-xs font-semibold text-amber-600">
                    Active
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Biomarkers */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <Thermometer className="w-6 h-6 text-orange-500" />

              <p className="mt-3 text-sm text-slate-500">Metabolism</p>

              <h4 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                Optimal
              </h4>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <Droplets className="w-6 h-6 text-sky-500" />

              <p className="mt-3 text-sm text-slate-500">Hydration</p>

              <h4 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                Good
              </h4>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-6 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Soup className="w-5 h-5 text-orange-600 shrink-0" />

              <h4 className="text-base font-semibold text-slate-900">
                AI Nutrition Recommendation
              </h4>
            </div>

            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-700">
              Continue warm hydration, eat freshly prepared meals, avoid late
              dinners and maintain a consistent eating schedule to strengthen
              digestive resilience.
            </p>
          </div>

          {/* AI Observation */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                AI Observation
              </p>

              <p className="text-sm text-slate-600 leading-6">
                Digestive fire is stable and supports healthy recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
