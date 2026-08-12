import { Activity, HeartPulse, Leaf, ShieldAlert, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReportSection from "./ReportSection";

export default function CompletedReports({ progress = {}, report = {} }) {
  const navigate = useNavigate();

  const reports = [
    {
      key: "lifestyleReport",
      title: "Lifestyle Assessment",
      subtitle: "Lifestyle Matrix & Wellness",
      icon: Activity,
      color: "bg-emerald-100 text-emerald-600",
      route: "/patient-dashboard/reports/lifestyle",
    },
    {
      key: "riskReport",
      title: "Risk Assessment",
      subtitle: "AI Health Risk Analysis",
      icon: ShieldAlert,
      color: "bg-rose-100 text-rose-600",
      route: "/patient-dashboard/reports/risk",
    },
    {
      key: "clinicalReport",
      title: "Clinical Assessment",
      subtitle: "Clinical Biomarker Analysis",
      icon: HeartPulse,
      color: "bg-sky-100 text-sky-600",
      route: "/patient-dashboard/reports/clinical",
    },
    {
      key: "ayurvedaReport",
      title: "Ayurveda Assessment",
      subtitle: "Dosha & Constitution Report",
      icon: Leaf,
      color: "bg-amber-100 text-amber-600",
      route: "/patient-dashboard/reports/ayurveda",
    },
  ].filter(r => progress?.[r.key]);

  if (!reports.length) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Completed Assessments</h2>
          <p className="mt-1 text-sm text-slate-500">
            Reports generated from your completed wellness assessments.
          </p>
        </div>

       <button type="button" onClick={() => navigate("/patient-dashboard/reports")} className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#0B2442] md:w-auto">
           Open Reports
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {reports.map(report => (
          <ReportSection key={report.key} report={report} />
        ))}
      </div>
    </section>
  );
}  