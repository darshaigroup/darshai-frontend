import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, CalendarDays, Download, Printer } from "lucide-react";
import PatientInformation from "../components/reports/PatientInformation";
import ClinicalAssessment from "../components/reports/ClinicalAssessment";
import DoctorNotes from "../components/reports/DoctorNotes";
import MetricCard from "../components/reports/MetricCard";

export default function ClinicalReport() {
  const navigate = useNavigate();
  const { patientData } = useOutletContext();

  const patient = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};
  const clinical = report?.clinical_answers ?? {};
  const ai = assessment?.ai_response ?? report?.ai_response ?? {};

  const metrics = useMemo(
    () => [
      { label: "Health Score", value: report?.composite_score ?? assessment?.composite_score ?? "--", color: "emerald" },
      { label: "Risk Band", value: report?.risk_band ?? assessment?.risk_band ?? "--", color: "red" },
      { label: "Primary Goal", value: clinical?.primaryGoal ?? "--", color: "blue" },
      { label: "Medical Conditions", value: clinical?.medicalConditions?.length ?? 0, color: "amber" },
    ],
    [report, assessment, clinical]
  );

  const generatedDate = new Date(
    report?.updated_at ??
      report?.created_at ??
      assessment?.created_at ??
      patient?.updated_at ??
      Date.now()
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 border-b border-slate-200 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => navigate("/patient-dashboard/reports")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </button>

            <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#C9A75B]">
              Clinical Assessment
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Clinical Health Report
            </h1>

            <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">
              <span>
                <strong className="text-slate-700">Patient:</strong>{" "}
                {patient?.name ?? "--"}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {generatedDate}
              </span>

              <span>
                <strong className="text-slate-700">Report ID:</strong>{" "}
                {report?.assessment_id?.slice(0, 8) ?? "--"}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:bg-slate-100"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>

            <button
              className="flex items-center gap-2 rounded-xl bg-[#06152A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2342]"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid gap-5 border-b border-slate-200 p-8 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <MetricCard
              key={item.label}
              title={item.label}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        <div className="p-8">
          <PatientInformation patient={patient} />
        </div>

        <div className="border-t border-slate-200 p-8">
          <ClinicalAssessment clinical={clinical} />
        </div>

        {!!ai?.blocks?.length && (
          <div className="border-t border-slate-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Clinical Risk Snapshot
              </h2>
              <p className="mt-2 text-slate-500">
                AI-derived overview of the patient's major health domains.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {ai.blocks.map((block) => (
                <MetricCard
                  key={block.id}
                  title={block.title}
                  value={`${block.score}%`}
                  subtitle={block.risk_level}
                  color={
                    block.risk_level === "High"
                      ? "red"
                      : block.risk_level === "Moderate"
                      ? "amber"
                      : "emerald"
                  }
                />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-slate-200 p-8">
          <DoctorNotes doctor={report} />
        </div>
      </div>
    </div>
  );
}