import { useLocation } from "react-router-dom";
import AddPatientModal from "../../components/patients/AddPatientModal";

export default function EditPatient() {
  const { state } = useLocation();

  return (
    <div className="min-h-screen bg-[#F6F9F8] p-8">
      <AddPatientModal
        patient={state.patient}
        mode="edit"
      />
    </div>
  );
}