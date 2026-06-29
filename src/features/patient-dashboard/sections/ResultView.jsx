import DoshaScoreCard from "../components/assessment/DoshaScoreCard";
import WellnessMetrics from "../components/wellness/WellnessMetrics";

export default function ResultView({ activePatient }) {
  return (
    <div className="space-y-6">
      <WellnessMetrics />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <DoshaScoreCard
          dosha="Vata"
          score={72}
          color="#38BDF8"
          description="Movement and nervous system."
        />

        <DoshaScoreCard
          dosha="Pitta"
          score={86}
          color="#F59E0B"
          description="Metabolism and digestion."
        />

        <DoshaScoreCard
          dosha="Kapha"
          score={58}
          color="#10B981"
          description="Structure and immunity."
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-xl font-semibold">
          Personalized Recommendation
        </h2>

        <p className="mt-3 text-slate-500 leading-relaxed">
          Based on your assessment, focus on nutrition,
          sleep recovery, circadian alignment and daily
          movement practices to maintain longevity.
        </p>
      </div>
    </div>
  );
}