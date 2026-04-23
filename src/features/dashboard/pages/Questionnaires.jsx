import { questionnaireData } from "../data/questionnaireData";
import { submissionsData } from "../data/submissionsData";
import QuestionnaireCard from "../components/QuestionnaireCard";

const Questionnaires = () => {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B]">
          Clinical Questionnaires
        </h1>
        <p className="text-gray-500">
          Assign standardized assessments to your patients
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-6">
        {questionnaireData.map((item) => (
          <QuestionnaireCard key={item.id} data={item} />
        ))}
      </div>

      {/* PENDING */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Pending Submissions
        </h2>

        {submissionsData.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b"
          >
            <div>
              <p className="font-medium">{item.patientName}</p>
              <p className="text-sm text-gray-400">
                {item.type} • {item.time}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.risk === "Low"
                    ? "bg-green-100 text-green-600"
                    : item.risk === "Medium"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.risk} Risk
              </span>

              <button className="text-sm text-blue-600">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionnaires;