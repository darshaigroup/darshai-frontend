import { Flame } from "lucide-react";

export default function AgniMap({ score = 82 }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Flame className="w-5 h-5 text-amber-500" />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-mono text-slate-400">
            Digestive Fire
          </p>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Agni Status
          </h3>
        </div>
      </div>

      <div className="relative h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-slate-500">Mandagni</span>
        <span className="font-semibold text-amber-500">{score}%</span>
        <span className="text-slate-500">Tikshnagni</span>
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Digestive fire remains stable. Continue warm hydration,
        circadian eating patterns and metabolic recovery routines.
      </p>
    </div>
  );
}