import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function InfoCard({label,value,icon: Icon = User,color = "emerald",className = "",}) {
  if (value === undefined || value === null || value === "" || value === "--")
    return null;

  const colors = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-600",
    blue: "border-sky-200 bg-sky-50 text-sky-600",
    amber: "border-amber-200 bg-amber-50 text-amber-600",
    rose: "border-rose-200 bg-rose-50 text-rose-600",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };

  const theme = colors[color] ?? colors.emerald;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: .25 }}
      className={`rounded-3xl border bg-white p-5 shadow-sm transition-all hover:shadow-lg ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${theme}`}>
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-slate-500">
            {label}
          </p>

          <h3 className="mt-2 break-words text-lg font-bold leading-7 text-slate-900">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}