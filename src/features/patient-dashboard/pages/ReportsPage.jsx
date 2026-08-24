import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Activity, Brain, HeartPulse, ScrollText, ChevronRight } from "lucide-react";

export default function ReportsPage() {
  const navigate = useNavigate();
  const { patientData } = useOutletContext();

  const profile = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};

  const completed = Boolean(
    report?.composite_score ??
      assessment?.composite_score ??
      report?.final_ayurveda_result
  );

  const completedDate = useMemo(() => {
    const date =
      report?.updated_at ??
      report?.created_at ??
      assessment?.completed_at ??
      assessment?.updated_at ??
      profile?.updated_at ??
      profile?.created_at;

    return date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";
  }, [profile, report, assessment]);

  const reports = [
    {
      id: "clinical",
      title: "Clinical Assessment",
      description: "Clinical history, symptoms and physician evaluation.",
      icon: HeartPulse,
      path: "/patient-dashboard/reports/clinical",
    },
    {
      id: "risk",
      title: "Risk Assessment",
      description: "AI risk scoring, biomarkers and health intelligence.",
      icon: Activity,
      path: "/patient-dashboard/reports/risk",
    },
    {
      id: "ayurveda",
      title: "Ayurveda Assessment",
      description: "Prakriti, Vikriti, Agni and Ama analysis.",
      icon: Brain,
      path: "/patient-dashboard/reports/ayurveda",
    },
    {
      id: "lifestyle",
      title: "Lifestyle Assessment",
      description: "Lifestyle matrix and wellness recommendations.",
      icon: ScrollText,
      path: "/patient-dashboard/reports/lifestyle",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[.25em] text-[#C9A75B]">Assessment Reports</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Health Reports</h1>
        <p className="mt-2 text-slate-500">View your completed assessment reports individually or as a complete health report.</p>
      </div>

      <div className="grid gap-6">
        {reports.map(({ id, title, description, icon: Icon, path }) => (
          <div key={id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-500/30 hover:shadow-lg md:flex-row md:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                <Icon className="h-7 w-7 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(path)}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#06152A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2442] md:mt-0"
            >
              View Report
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}

        <div className="flex flex-col justify-between rounded-3xl border border-[#1E7A3A]/20 bg-gradient-to-r from-[#06152A] to-[#0A2342] p-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">Complete Health Report</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              View your complete clinical, lifestyle, risk and Ayurveda assessment in a single consolidated report.
            </p>
          </div>

          <button
            onClick={() => navigate("/patient-dashboard/reports/full")}
            className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 md:mt-0"
          >
            View Complete Report
          </button>
        </div>
      </div>
    </div>
  );
}