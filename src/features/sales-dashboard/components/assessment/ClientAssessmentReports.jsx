import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardList, LoaderCircle, RefreshCw } from "lucide-react";
import { getClientAssessmentReports } from "../../services/salesService";

const ASSESSMENTS = [
  { key: "lifestyle", title: "Lifestyle Matrix" },
  { key: "risk", title: "Risk Assessment" },
  { key: "ayurveda", title: "Ayurveda Assessment" },
  { key: "clinical", title: "Clinical Assessment" }
];

export default function ClientAssessmentReports({ patientId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReports = useCallback(async () => {
    if (!patientId) {
      setReport(null);
      setError("Patient ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getClientAssessmentReports(patientId);
      setReport(data);
    } catch (err) {
      setError(err.message || "Unable to load assessment status.");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  if (loading) {
    return (
      <section className="rounded-[24px] border border-[#ECE7DD] bg-white p-6">
        <div className="flex items-center gap-3 text-slate-500">
          <LoaderCircle className="animate-spin" size={20} />
          Loading assessment status...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-[24px] border border-red-200 bg-white p-6">
        <div className="flex items-start gap-3 text-red-600">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Unable to load assessments</p>
            <p className="mt-1 text-sm">{error}</p>
            <button
              type="button"
              onClick={loadReports}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium hover:bg-red-50"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  const status = report?.assessmentStatus || {};
  const completedCount = ASSESSMENTS.filter(
    (item) => status[item.key] === true
  ).length;

  return (
    <section className="space-y-5 rounded-[28px] border border-[#ECE7DD] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <ClipboardList className="text-[#1E7A3A]" size={22} />
          <h2 className="font-serif text-2xl text-[#173C68]">
            Client Assessments
          </h2>
        </div>

        <span className="w-fit rounded-full bg-[#EDF9F0] px-3 py-2 text-sm font-semibold text-[#1E7A3A]">
          {completedCount} of {ASSESSMENTS.length} completed
        </span>
      </div>

      <div className="space-y-3">
        {ASSESSMENTS.map((item) => {
          const completed = status[item.key] === true;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[#ECE7DD] p-4"
            >
              <h3 className="font-medium text-[#173C68]">
                {item.title}
              </h3>

              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  completed
                    ? "bg-[#EDF9F0] text-[#1E7A3A]"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {completed ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <AlertCircle size={14} />
                )}
                {completed ? "Completed" : "Pending"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}