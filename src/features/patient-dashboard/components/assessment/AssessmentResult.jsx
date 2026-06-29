import { Award } from "lucide-react";
import DoshaScoreCard from "./DoshaScoreCard";

export default function AssessmentResult({
  results,
  dominantDosha,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em]">
              Assessment Complete
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-1">
              Dominant Dosha: {dominantDosha}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <DoshaScoreCard
          dosha="Vata"
          score={results.vata}
          color="#38BDF8"
          description="Movement, nervous system and communication."
        />

        <DoshaScoreCard
          dosha="Pitta"
          score={results.pitta}
          color="#F59E0B"
          description="Digestion, metabolism and transformation."
        />

        <DoshaScoreCard
          dosha="Kapha"
          score={results.kapha}
          color="#10B981"
          description="Structure, immunity and stability."
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Personalized Recommendation
        </h3>

        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          Based on your assessment, focus on nutrition,
          sleep optimization, movement therapy and
          personalized botanical support to maintain
          doshic equilibrium and long-term vitality.
        </p>
      </div>
    </div>
  );
}