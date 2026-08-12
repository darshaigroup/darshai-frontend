import { motion } from "framer-motion";
import { Flame, Sparkles, ArrowRight, Thermometer, Droplets, Soup, ShieldCheck } from "lucide-react";

export default function AgniMap({ patient }) {
  const report = patient?.report || {}, agni = report?.agni_result || {};
  const score = agni?.score ?? agni?.agni_score ?? patient?.compositeScore ?? null;
  const percentage = score !== null ? Math.min(100, Math.max(0, Number(score))) : 0;
  const rawAgni = String(agni?.agni_type || agni?.type || "").toLowerCase();

  const agniTypes = [
    { name: "Mandagni", color: "#3B82F6", description: "Slow digestive activity" },
    { name: "Samagni", color: "#10B981", description: "Balanced digestive activity" },
    { name: "Tikshnagni", color: "#F59E0B", description: "Strong digestive activity" },
    { name: "Vishamagni", color: "#EF4444", description: "Irregular digestive activity" }
  ];

  const agniIndex = rawAgni.includes("manda")
    ? 0
    : rawAgni.includes("sama")
    ? 1
    : rawAgni.includes("tiksh")
    ? 2
    : rawAgni.includes("vish")
    ? 3
    : -1;

  const currentAgni = agniTypes[agniIndex] || {
    name: "Pending Analysis",
    color: "#F97316",
    description: "Complete your Agni assessment"
  };

  const agniProgress = agniIndex >= 0 ? ((agniIndex + 1) / agniTypes.length) * 100 : 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (agniProgress / 100) * circumference;

  const recommendation = agni?.recommendation || report?.clinical_summary || "Complete your Agni assessment to receive personalized nutrition recommendations.";
  const observation = agni?.summary || report?.correlation_result?.summary || "Your digestive assessment has not been completed yet.";
  const metabolism = agni?.metabolism || (score !== null ? percentage >= 80 ? "Optimal" : percentage >= 60 ? "Moderate" : "Needs Attention" : "Pending Assessment");
  const hydration = agni?.hydration || "Pending Assessment";
  const goToReport = () => {
    window.location.href = "/patient-dashboard/reports/ayurveda";
  };
  return (
    <motion.section whileHover={{ y: -3 }} className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]">
      <div className="flex flex-col gap-5 border-b border-stone-100 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 sm:px-4">
            <Sparkles className="h-4 w-4 text-amber-600"/>
            <span className="font-mono text-[9px] uppercase tracking-[.22em] text-amber-700 sm:text-[11px]">Digestive Intelligence</span>
          </div>

          <h2 className="mt-4 font-serif text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Agni Assessment</h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Your digestive fire determines metabolism, nutrient absorption and long-term vitality.
          </p>
        </div>

        <button type="button" onClick={goToReport} className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#0B2442] md:w-auto">
          View Degestive Report
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-[210px] items-center justify-center sm:max-w-[240px] lg:max-w-[270px]">
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [.4, .65, .4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full blur-3xl"
              style={{ background: `${currentAgni.color}30` }}
            />

            <svg viewBox="0 0 220 220" className="relative h-full w-full -rotate-90">
              <defs>
                <linearGradient id="agniGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={currentAgni.color}/>
                  <stop offset="100%" stopColor={currentAgni.color}/>
                </linearGradient>
              </defs>

              <circle cx="110" cy="110" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="12"/>

              <motion.circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="url(#agniGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ filter: `drop-shadow(0 0 7px ${currentAgni.color}90)` }}
              />

              {agniTypes.map((type, index) => {
                const angle = (index / agniTypes.length) * Math.PI * 2 - Math.PI / 2;
                const x = 110 + Math.cos(angle) * radius;
                const y = 110 + Math.sin(angle) * radius;
                const active = index === agniIndex;

                return (
                  <motion.circle
                    key={type.name}
                    cx={x}
                    cy={y}
                    r={active ? 6 : 4}
                    fill={type.color}
                    animate={active ? { r: [6, 8, 6], opacity: [1, .55, 1] } : { opacity: .45 }}
                    transition={{ repeat: active ? Infinity : 0, duration: 1.8 }}
                    style={{ filter: active ? `drop-shadow(0 0 5px ${type.color})` : "none" }}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <Flame className="mx-auto h-10 w-10" style={{ color: currentAgni.color }}/>
              </motion.div>

              <motion.h2
                key={currentAgni.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl"
              >
                {currentAgni.name}
              </motion.h2>

              <p className="mt-2 font-mono text-[9px] uppercase tracking-[.2em]" style={{ color: currentAgni.color }}>
                Digestive Fire
              </p>
            </div>
          </div>

          <div className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {agniTypes.map((stage, index) => {
              const active = index === agniIndex;
              return (
                <motion.div
                  key={stage.name}
                  animate={active ? { y: [-2, 0, -2] } : { y: 0 }}
                  transition={{ repeat: active ? Infinity : 0, duration: 2 }}
                  className="relative rounded-2xl border p-3 text-center transition-all sm:p-4"
                  style={{
                    borderColor: active ? `${stage.color}70` : "#E7E5E4",
                    background: active ? `${stage.color}10` : "#FAFAF9",
                    boxShadow: active ? `0 8px 24px ${stage.color}18` : "none"
                  }}
                >
                  <div className="mx-auto h-2.5 w-2.5 rounded-full" style={{ background: stage.color, boxShadow: active ? `0 0 10px ${stage.color}` : "none" }}/>
                  <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[.12em] text-slate-500 sm:text-[10px]">{stage.name}</p>
                  {active && <p className="mt-1 text-[10px] font-semibold" style={{ color: stage.color }}>Current State</p>}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5">
              <Thermometer className="h-6 w-6 text-orange-500"/>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">Metabolism</p>
              <h4 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{metabolism}</h4>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md sm:p-5">
              <Droplets className="h-6 w-6 text-sky-500"/>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">Hydration</p>
              <h4 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{hydration}</h4>
            </div>
          </div> */}

          {/* <div className="mt-6 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Soup className="h-5 w-5 text-orange-600"/>
              <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-slate-900 sm:text-xs">Nutrition Recommendation</h4>
            </div>
            <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{recommendation}</p>
          </div> */}

          {/* <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600"/>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-slate-900">Clinical Observation</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{observation}</p>
            </div>
          </div> */}
        </div>
      </div>
    </motion.section>
  );
}