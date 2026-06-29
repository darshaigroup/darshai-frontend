import { motion } from "motion/react";

export default function Loader({
  title = "Loading",
  description = "Preparing your wellness experience...",
  fullScreen = false,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-14 h-14 rounded-full border-[3px] border-slate-200 border-t-emerald-500"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[300px] flex items-center justify-center">
      {content}
    </div>
  );
}