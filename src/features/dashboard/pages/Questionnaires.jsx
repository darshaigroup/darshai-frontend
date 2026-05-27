import { useLocation, useNavigate } from "react-router-dom";

import { questionnaireData } from "../data/QuestionnarieData";
import { submissionsData } from "../data/submissionsData";

import QuestionnaireCard from "../components/Questionnaires/QuestionnaireCard";
import PendingList from "../components/Questionnaires/PendingList";

const Questionnaires = () => {
  const location = useLocation();

  const navigate = useNavigate();

  /* PATIENT */
  const patient = location.state?.patient;

  /* OPEN ASSESSMENT */
  const handleAssessmentOpen = (questionnaire) => {
    navigate("/dashboard/assessments", {
      state: {
        patient,
        questionnaire,
      },
    });
  };

  return (
    <div className="p-8 bg-[#F6F9F8] min-h-screen space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-3xl font-semibold text-[#1E293B]">
            Clinical Questionnaires
          </h1>

          <p className="text-gray-500 mt-1">
            Assign standardized assessments to your patients
          </p>

        </div>

        <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1E7A3A] to-[#5E9387] text-white shadow-md text-sm">
          + Create Template
        </button>

      </div>

      {/* SELECTED PATIENT */}
      {patient && (

        <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-[#1E293B]">
              Assigning Questionnaire To
            </h2>

            <p className="text-gray-600 text-sm mt-1">
              {patient.name} • {patient.phone}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {patient.occupation} • {patient.location}
            </p>

          </div>

          <div className="text-sm text-green-600 font-medium">
            Ready for Assignment
          </div>

        </div>

      )}

      {/* QUESTIONNAIRE CARDS */}
      <div className="grid grid-cols-4 gap-6">

        {questionnaireData.map((item) => (

          <div
            key={item.id}
            onClick={() => handleAssessmentOpen(item)}
            className="cursor-pointer"
          >

            <QuestionnaireCard
              data={item}
              patient={patient}
            />

          </div>

        ))}

      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* PENDING */}
        <div className="col-span-2">

          <PendingList data={submissionsData} />

        </div>

        {/* FORM BUILDER */}
        <div className="bg-[#1E2F4F] text-white rounded-[32px] p-6 flex flex-col justify-center items-center text-center">

          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-4">
            +
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Form Builder
          </h3>

          <p className="text-sm text-gray-300 mb-5">
            Create custom AI-enhanced questionnaires for specific patient needs.
          </p>

          <button className="bg-white text-[#1E2F4F] px-5 py-2 rounded-full text-sm font-medium">
            Launch Builder
          </button>

        </div>

      </div>

    </div>
  );
};

export default Questionnaires;