import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, CalendarDays, Download, Printer } from "lucide-react";
import PatientInformation from "../components/reports/PatientInformation";
import AyurvedaAssessment from "../components/reports/AyurvedaAssessment";
import DoctorNotes from "../components/reports/DoctorNotes";
import MetricCard from "../components/reports/MetricCard";

export default function AyurvedaReport() {
  const navigate = useNavigate();
  const { patientData } = useOutletContext();

  const patient = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};
  const ayurveda = report?.final_ayurveda_result ?? {};

  const metrics = useMemo(
    () => [
      { title: "Prakriti", value: ayurveda?.prakriti?.prakriti_type ?? "--", color: "emerald" },
      { title: "Primary Dosha", value: ayurveda?.primary_dosha ?? "--", color: "red" },
      { title: "Agni", value: ayurveda?.agni?.agni_type?.split("(")[0]?.trim() ?? "--", color: "amber" },
      { title: "Ama", value: ayurveda?.ama?.severity ?? "--", color: "blue" },
    ],
    [ayurveda]
  );

  const generatedDate = new Date(
    report?.updated_at ??
      report?.created_at ??
      assessment?.created_at ??
      Date.now()
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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
              Ayurveda Assessment
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Ayurveda Health Report
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

            <button className="flex items-center gap-2 rounded-xl bg-[#06152A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2342]">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid gap-5 border-b border-slate-200 p-8 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <MetricCard
              key={item.title}
              title={item.title}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        <div className="p-8">
          <PatientInformation patient={patient} />
        </div>

        <div className="border-t border-slate-200 p-8">
          <AyurvedaAssessment ayurveda={ayurveda} />
        </div>

        <div className="border-t border-slate-200 p-8">
          <DoctorNotes doctor={report} />
        </div>
      </div>
    </div>
  );
}