import { motion } from "framer-motion";
import { Flame, Sparkles, ArrowRight, Thermometer, Droplets, Soup, ShieldCheck } from "lucide-react";

export default function AgniMap({ patient }) {
  const report = patient?.report || {}, agni = report?.agni_result || {};
  const score = agni?.score ?? agni?.agni_score ?? patient?.compositeScore ?? null;
  const percentage = score !== null ? Number(score) : 0;
  const rawAgni = agni?.agni_type || agni?.type || "";

  const normalizedAgni = rawAgni.toLowerCase();

  const agniType = normalizedAgni.includes("vish")
    ? "Vishamagni"
    : normalizedAgni.includes("manda")
    ? "Mandagni"
    : normalizedAgni.includes("tiksh")
    ? "Tikshnagni"
    : normalizedAgni.includes("sama")
    ? "Samagni"
    : "Pending Analysis";

  const recommendation = agni?.recommendation || report?.clinical_summary || "Complete your Agni assessment to receive personalized nutrition recommendations.";
  const observation = agni?.summary || report?.correlation_result?.summary || "Your digestive assessment has not been completed yet.";

  const metabolism = agni?.metabolism || (score !== null ? percentage >= 80 ? "Optimal" : percentage >= 60 ? "Moderate" : "Needs Attention" : "Pending Assessment");
  const hydration = agni?.hydration || "Pending Assessment";

  const stages = [
    { name: "Mandagni", active: agniType === "Mandagni" },
    { name: "Vishamagni", active: agniType === "Vishamagni" },
    { name: "Samagni", active: agniType === "Samagni" },
    { name: "Tikshnagni", active: agniType === "Tikshnagni" },
  ];

  const radius = 60, circumference = 2 * Math.PI * radius, offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.section whileHover={{ y: -3 }} className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]">
      <div className="flex flex-col gap-5 border-b border-stone-100 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 sm:px-4">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="font-mono text-[9px] uppercase tracking-[.22em] text-amber-700 sm:text-[11px]">Digestive Intelligence</span>
          </div>

          <h2 className="mt-4 font-serif text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Agni Assessment</h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Your digestive fire determines metabolism, nutrient absorption and long-term vitality.
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0B2442] md:w-auto">
          Nutrition Plan
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-[180px] items-center justify-center sm:max-w-[220px] lg:max-w-[260px]">
            <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-3xl" />

            <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
              <circle cx="110" cy="110" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="12" />

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

            <div className="absolute px-6 text-center">
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Flame className="mx-auto h-10 w-10 text-orange-500" />
              </motion.div>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">{agniType}</h2>
              <p className="mt-2 text-[11px] uppercase tracking-[.22em] text-amber-600">Digestive Fire</p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stages.map(stage => (
              <div key={stage.name} className={`rounded-xl border p-2 text-center transition sm:rounded-2xl sm:p-4 ${stage.active ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-stone-50"}`}>
                <p className="text-[9px] uppercase tracking-[.15em] text-slate-500 sm:text-[10px]">{stage.name}</p>
                {stage.active && <p className="mt-2 text-[11px] font-semibold text-amber-600 sm:text-xs">Active</p>}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <Thermometer className="h-6 w-6 text-orange-500" />
              <p className="mt-3 text-sm text-slate-500">Metabolism</p>
              <h4 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{metabolism}</h4>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <Droplets className="h-6 w-6 text-sky-500" />
              <p className="mt-3 text-sm text-slate-500">Hydration</p>
              <h4 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{hydration}</h4>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Soup className="h-5 w-5 text-orange-600" />
              <h4 className="text-base font-semibold text-slate-900">AI Nutrition Recommendation</h4>
            </div>

            <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{recommendation}</p>
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />

            <div>
              <p className="text-sm font-semibold text-slate-900">AI Observation</p>
              <p className="text-sm leading-6 text-slate-600">{observation}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}