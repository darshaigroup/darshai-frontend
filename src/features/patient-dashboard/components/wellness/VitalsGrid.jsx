import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import WellnessCard from "./WellnessCard";

export default function VitalsGrid({ patient = {} }) {
  const hasAssessment = !!(patient?.primaryDosha || patient?.secondaryDosha || patient?.compositeScore != null || patient?.riskTier);
  const riskScore = patient?.compositeScore != null ? Number(patient.compositeScore) : null;
  const wellnessIndex = riskScore !== null ? Math.max(0, 100 - riskScore) : null;

  const vitals = [
    { title: "Primary Dosha", value: patient?.primaryDosha || "Not Assessed", status: "Natural Constitution", trend: hasAssessment ? "Constitution Aligned" : "Complete assessment", color: "amber" },
    { title: "Secondary Dosha", value: patient?.secondaryDosha || "Not Assessed", status: "Constitutional Influence", trend: hasAssessment ? "Current Influence" : "Complete assessment", color: "rose" },
    { title: "Wellness Index", value: wellnessIndex !== null ? `${wellnessIndex}%` : "Unavailable", status: "Overall Wellness State", trend: riskScore !== null ? "Wellness Calculated" : "Assessment Required", color: "emerald" },
    { title: "Risk Tier", value: patient?.riskTier || "Pending Analysis", status: "Risk Assessment", trend: patient?.riskTier ? "Assessment Active" : "Waiting for Assessment", color: "sky" }
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2"><Sparkles className="h-4 w-4 text-emerald-500" /><span className="font-mono text-[11px] uppercase tracking-[.22em] text-emerald-600">Live Bio Intelligence</span></div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-slate-900">Vital Health Parameters</h2>
          <p className="mt-2 max-w-2xl text-slate-500">Physiological biomarkers aligned with your Ayurvedic constitution and personalized longevity profile.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {vitals.map((vital, index) => <motion.div key={vital.title} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}><WellnessCard {...vital} /></motion.div>)}
      </div>
    </section>
  );
}