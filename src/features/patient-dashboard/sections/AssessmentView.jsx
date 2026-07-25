import { CheckCircle2, ClipboardList, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssessmentView({ report = {}, pendingAssessments = [] }) {
  const navigate = useNavigate();

  const completed = !!report?.matrix_answers;
  const completedDate =
    report?.updated_at || report?.created_at || new Date().toLocaleDateString();

  return (
    <div className="space-y-8">
      {completed && (
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Lifestyle Assessment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Completed during registration.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Completed
                  </span>

                  <span className="text-sm text-slate-500">
                    Completed on {new Date(completedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/patient-dashboard/reports/lifestyle")}
              className="flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-white transition hover:bg-emerald-700"
            >
              <Eye size={18} />
              View Assessment
            </button>
          </div>
        </div>
      )}

      {pendingAssessments.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-slate-500">
            <ClipboardList size={34} />
          </div>

          <h3 className="mt-6 text-2xl font-semibold">
            No Assessments Assigned
          </h3>

          <p className="mt-3 max-w-md text-slate-500">
            You don't have any pending assessments at the moment. Your care
            team will assign new assessments whenever required.
          </p>
        </div>
      )}
    </div>
  );
}