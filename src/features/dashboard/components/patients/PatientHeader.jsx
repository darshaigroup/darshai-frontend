import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PatientHeader = ({ patient }) => {
  const navigate = useNavigate(); // ✅ inside component

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm">

      {/* 🔹 BACK BUTTON */}
      <button
        onClick={() => navigate("/dashboard/patients")}
        className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        <FaArrowLeft /> Back
      </button>

      {/* 🔹 PATIENT INFO */}
      <h1 className="text-xl font-semibold">{patient.name}</h1>

    </div>
  );
};

export default PatientHeader;