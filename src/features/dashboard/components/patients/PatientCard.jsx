import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();

  // 🔥 SAFETY CHECK (IMPORTANT)
  if (!patient) return null;

  const handleNavigate = () => {
    if (!patient.id) {
      console.error("Patient ID missing");
      return;
    }

    navigate(`/dashboard/patients/${patient.id}`);
  };

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm">

      {/* IMAGE */}
      <img
        src={patient.img || "https://via.placeholder.com/150"}
        alt={patient.name}
        className="w-16 h-16 rounded-full object-cover border-4 border-green-200"
      />

      {/* NAME */}
      <h2 className="mt-4 text-lg font-semibold text-[#1E293B]">
        {patient.name}
      </h2>

      <p className="text-sm text-gray-500">
        {patient.age}Y • {patient.gender} • {patient.type}
      </p>

      {/* CONTACT */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaEnvelope /> {patient.email}
        </p>
        <p className="flex items-center gap-2">
          <FaPhone /> {patient.phone}
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleNavigate}
        className="mt-4 w-full py-2 rounded-full border text-sm hover:bg-gray-100"
      >
        View Profile →
      </button>

    </div>
  );
};

export default PatientCard;