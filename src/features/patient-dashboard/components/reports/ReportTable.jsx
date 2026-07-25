import { Activity, ArrowRight, HeartPulse, Leaf, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReportCard from "./ReportCard";

const REPORT_CONFIG = [
  {
    key: "clinicalReport",
    id: "clinical",
    name: "Clinical Assessment",
    type: "Clinical",
    icon: HeartPulse,
    color: "text-sky-600 bg-sky-100 dark:bg-sky-500/10",
  },
  {
    key: "riskReport",
    id: "risk",
    name: "Risk Assessment",
    type: "Risk",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10",
  },
  {
    key: "ayurvedaReport",
    id: "ayurveda",
    name: "Ayurveda Assessment",
    type: "Ayurveda",
    icon: Leaf,
    color: "text-amber-600 bg-amber-100 dark:bg-amber-500/10",
  },
  {
    key: "lifestyleReport",
    id: "lifestyle",
    name: "Lifestyle Assessment",
    type: "Lifestyle",
    icon: Activity,
    color: "text-violet-600 bg-violet-100 dark:bg-violet-500/10",
  },
];

export default function ReportsTable({
  progress = {},
  report = {},
  onViewReports,
}) {
  const navigate = useNavigate();

  const reports = REPORT_CONFIG.filter(({ key }) => progress?.[key]).map(item => ({
    ...item,
    date: report?.updated_at
      ? new Date(report.updated_at).toLocaleDateString()
      : "--",
    summary:
      report?.clinical_summary || "Assessment completed successfully.",
    findings:
      report?.clinical_summary || "No detailed findings available.",
    recommendations:
      report?.correlation_result?.summary ||
      "Follow your physician's recommendations.",
  }));

  const handleViewReports = () => {
    if (onViewReports) return onViewReports();
    navigate("/patient-dashboard/reports");
  };

  if (!reports.length)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No Assessments Available
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Assessment reports will appear once completed by your physician.
        </p>
      </div>
    );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Completed Assessments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your completed health assessments are listed below. Open the
            Reports section to view the complete report.
          </p>
        </div>

        <button
          onClick={handleViewReports}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Open Wellness Reports
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </section>
  );
}