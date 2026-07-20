import { motion } from "motion/react";
import { Sparkles, ShieldCheck, HeartPulse, Activity, Brain, ArrowRight } from "lucide-react";
import VitalityScore from "./VitalityScore";

export default function WellnessHero({ patient }) {
  const report = patient?.report || {};
const assessment = patient?.assessment || {};

const display = (value, fallback) =>
  value !== null &&
  value !== undefined &&
  value !== ""
    ? value
    : fallback;

const riskScore =
  report?.composite_score ??
  assessment?.composite_score ??
  patient?.riskScore ??
  null;

const vitalityScore =
  riskScore !== null
    ? Math.max(0, 100 - Number(riskScore))
    : null;

const recommendation =
  report?.correlation_result?.summary ||
  patient?.clinicalSummary ||
  report?.clinical_summary ||
  "Complete your assessment to receive AI-powered personalized wellness recommendations.";

  const cards = [
  {
    title: "Dominant Dosha",
    value: display(
      patient?.primaryDosha ||
      report?.primary_dosha ||
      report?.dominant_dosha,
      "Not Assessed"
    ),
    color: "text-emerald-400",
    icon: Brain,
  },
  {
    title: "Wellness Index",
    value:
      vitalityScore !== null
        ? `${vitalityScore}%`
        : "Assessment Required",
    color: "text-sky-400",
    icon: Activity,
  },
  {
    title: "Prakriti",
    value: display(
      report?.prakriti_result?.prakriti_type ||
      patient?.finalAyurvedaResult?.prakriti?.prakriti_type,
      "Pending Analysis"
    ),
    color: "text-amber-400",
    icon: HeartPulse,
  },
];
  return (
    <section
      className="relative overflow-hidden rounded-[24px] md:rounded-[30px] xl:rounded-[36px] border border-white/10 shadow-[0_20px_50px_rgba(6,21,42,.35)] lg:shadow-[0_35px_80px_rgba(6,21,42,.45)]"
      style={{background:"linear-gradient(135deg,#06152A 0%,#0C2441 45%,#17365D 100%)"}}
    >

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(52,211,153,.18),transparent_40%)]"/>
      <div className="absolute -left-32 -bottom-24 w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-3xl"/>
      <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full bg-sky-500/10 blur-3xl"/>
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(transparent_97%,rgba(255,255,255,.12)_100%),linear-gradient(90deg,transparent_97%,rgba(255,255,255,.12)_100%)] bg-[size:40px_40px]"/>

      <div className="relative z-10 px-5 py-6 sm:px-6 md:px-8 xl:px-10 xl:py-10">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-center">

          <div className="xl:col-span-4 flex justify-center xl:justify-start order-1">
            <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}>
              <VitalityScore
  score={vitalityScore ?? 0}
  report={{
    ...report,
    risk_score: riskScore,
    wellness_score: vitalityScore,
    hasAssessment: riskScore !== null,
  }}
/>
            </motion.div>
          </div>

          <div className="xl:col-span-8 order-2 text-center xl:text-left">

            <div className="inline-flex items-center gap-2 mx-auto xl:mx-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <Sparkles className="w-4 h-4 text-emerald-400"/>
              <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-emerald-300">
                Live Bio Telemetry
              </span>
            </div>

            <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-white leading-tight">
              {display(patient?.full_name || patient?.name, "New Patient")}
              <br/>
              Longevity Diagnostics
            </h1>

            <p className="mt-5 max-w-3xl mx-auto xl:mx-0 text-sm md:text-base text-slate-300 leading-7">
              {patient?.clinicalSummary||
                "Your biological systems are continuously synchronized through DarshAI's Geo Wellness Intelligence. Review your constitutional balance, vitality metrics and AI-guided longevity recommendations."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">

              {cards.map(card=>{

                const Icon=card.icon;

                return(

                  <motion.div
                    key={card.title}
                    whileHover={{y:-4}}
                    className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-4 md:p-5"
                  >

                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${card.color}`}/>
                      <Activity className="w-4 h-4 text-white/30"/>
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

            <motion.div
              whileHover={{y:-3}}
              className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-6"
            >

              <div className="flex items-center justify-between flex-wrap gap-4">

                <div>

                  <p className="text-[11px] uppercase tracking-[0.2em] font-mono text-emerald-300">
                    Companion Recommendation
                  </p>

                  <p className="mt-3 max-w-2xl text-slate-300 leading-7">
                    {recommendation}
                  </p>

                </div>

                <button className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition">
                  View Protocol
                  <ArrowRight className="w-4 h-4"/>
                </button>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}