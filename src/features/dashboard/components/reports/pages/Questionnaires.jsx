import {useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectPatientModal from "../../Questionnaires/SelectPatientModal";
import { questionnaireData } from "../../../data/QuestionnarieData";
import QuestionnaireCard from "../../Questionnaires/QuestionnaireCard";
import PendingList from "../../Questionnaires/PendingList";
import { getPatients } from "../../../services/patientService";
console.log(getPatients);

const Questionnaires = () => {
  const location = useLocation();

  const navigate = useNavigate();

  /* PATIENT */
  const patient = location.state?.patient; 

  /* OPEN ASSESSMENT */
 const [selectedAssessment,setSelectedAssessment] = useState(null);

const [showPatientModal,setShowPatientModal] = useState(false);

const [pendingSubmissions,setPendingSubmissions] = useState([]);

useEffect(() => {
  loadPendingSubmissions();
}, []);

const loadPendingSubmissions = async () => {
  try {
    const patients = await getPatients();

    console.log("PATIENTS", patients);

    const formatted = patients.map(patient => ({
      id: patient.id,
      patientName: patient.name,
      type: patient.risk_band || "Assessment",
      time:
        patient.updated_at || patient.created_at
          ? new Date(
              patient.updated_at || patient.created_at
            ).toLocaleDateString()
          : "-",
      risk: patient.risk_band || "Low",
      patient
    }));

    console.log("FORMATTED", formatted);

    setPendingSubmissions(formatted);

  } catch (error) {
    console.error("LOAD ERROR", error);
  }
};

const handleAssessmentOpen =
  questionnaire => {

    setSelectedAssessment(
      questionnaire
    );

    setShowPatientModal(
      true
    );

};

const handlePatientSelect = patient => {

  navigate(
    selectedAssessment.route,
    {
      state:{
        patient,
        source:"questionnaire"
      }
    }
  );

  setShowPatientModal(false);

};

  return (
  <div className="p-8 bg-[#F6F9F8] min-h-screen space-y-8">

    <div>
      <h1 className="text-3xl font-semibold text-[#1E293B]">
        Clinical Questionnaires
      </h1>

      <p className="text-gray-500 mt-1">
        Assign standardized assessments to your patients
      </p>
    </div>

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

        <div className="text-sm font-medium text-green-600">
          Ready for Assignment
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {questionnaireData.map(item => (
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

    <div className="grid grid-cols-1 gap-6">

      <div className="xl:col-span-2">
        <PendingList data={pendingSubmissions} />
      </div>

      {/* <div className="bg-[#1E2F4F] text-white rounded-[32px] p-6 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-4">
          +
        </div>

        <h3 className="text-lg font-semibold mb-2">
          Form Builder
        </h3>

        <p className="text-sm text-gray-300 mb-5">
          Create custom AI-enhanced questionnaires for specific patient needs.
        </p>

        <button className="px-5 py-2 rounded-full bg-white text-[#1E2F4F] text-sm font-medium">
          Launch Builder
        </button>
      </div> */}

    </div>

    <SelectPatientModal
      isOpen={showPatientModal}
      onClose={() => setShowPatientModal(false)}
      onSelect={handlePatientSelect}
    />

  </div>
);
};

export default Questionnaires;