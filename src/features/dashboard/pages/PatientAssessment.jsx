import { useLocation } from "react-router-dom";
import AddPatientModal from "../components/patients/AddPatientModal";

export default function PatientAssessment() {
  const location = useLocation();

  const patient = location.state?.patient || null;

  return (
    <div className="min-h-screen bg-[#F6F9F8] p-4 md:p-8 lg:p-10">
      <AddPatientModal
        patient={patient}
        mode="assign"
      />
    </div>
  );
}