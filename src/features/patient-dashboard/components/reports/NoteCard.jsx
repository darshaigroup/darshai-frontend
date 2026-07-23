import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function NoteCard({title,value,icon: Icon = FileText,color = "emerald",className = "",}) {
  const colors = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-600",
    blue: "border-sky-200 bg-sky-50 text-sky-600",
    amber: "border-amber-200 bg-amber-50 text-amber-600",
    rose: "border-rose-200 bg-rose-50 text-rose-600",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };

  const theme = colors[color] ?? colors.emerald;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: .25 }} className={`rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${theme}`}>
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-slate-500">{title}</p>
          <p className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-700">{value ?? "-"}</p>
        </div>
      </div>
    </motion.div>
  );
}