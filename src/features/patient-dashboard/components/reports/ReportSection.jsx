import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function ReportSection({ report }) {
  const navigate = useNavigate();
  const Icon = report.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${report.color}`}>
            <Icon className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">{report.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{report.subtitle}</p>
          </div>
        </div>

        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
      </div>

      <div className="mb-5 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">Status</p>
          <p className="mt-1 font-semibold text-emerald-700">Completed</p>
        </div>

        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Ready
        </div>
      </div>

      <button
        onClick={() => navigate(report.route)}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-emerald-600"
      >
        View Report
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}