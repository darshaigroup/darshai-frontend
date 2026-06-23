import { motion } from "motion/react";
import { Sparkles, ChevronRight, X } from "lucide-react";

export default function WelcomeModal({ onStart, onSkip }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-emerald-600" />
          </div>

          <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400">
            DarshAI Wellness Companion
          </span>

          <h2 className="mt-4 text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Welcome To Your Health Sanctuary
          </h2>

          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            Explore assessments, wellness reports, bio-telemetry insights and personalized longevity recommendations.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStart}
              className="flex-1 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-2 transition-all"
            >
              Begin Tour
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onSkip}
              className="flex-1 h-12 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Skip Tour
            </button>
          </div>
        </div>

        <button
          onClick={onSkip}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}