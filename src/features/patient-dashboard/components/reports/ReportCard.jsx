import { FileText, Download, Eye, Calendar } from "lucide-react";
import { motion } from "motion/react";

export default function ReportCard({ report, onView, onDownload }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {report.name}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              {report.date}
            </div>

            <span className="inline-flex mt-3 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600">
              {report.type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onView(report)}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDownload(report)}
            className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}