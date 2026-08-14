import { AnimatePresence, motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function WelcomeModal({
  open,
  onStart,
  onSkip,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: .95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: .95, opacity: 0 }}
            transition={{ duration: .3 }}
            className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#10192C] p-8 shadow-[0_40px_100px_rgba(0,0,0,.55)]"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="h-8 w-8 text-emerald-400" />
            </div>

            <div className="mt-6 text-center">
              <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.22em] text-emerald-300">
                Welcome To DarshAI
              </span>

              <h2 className="mt-6 font-serif text-4xl font-bold text-white">
                Begin Your
                <br />
                Wellness Journey
              </h2>

              <p className="mx-auto mt-5 max-w-md leading-7 text-slate-300">
                Take a guided walkthrough of your personalized
                patient dashboard and discover every important
                feature.
              </p>
            </div>

            <button
              onClick={onStart}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Begin Interactive Journey
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onSkip}
              className="mt-5 w-full text-sm text-slate-400 transition hover:text-white"
            >
              Skip Tour
            </button>

            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                HIPAA • Secure •  Guided
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}