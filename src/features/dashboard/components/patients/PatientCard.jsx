import { FaEnvelope, FaPhone } from "react-icons/fa";

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

      {/* Top */}
      <div className="flex justify-between items-center">
        <img
          src={patient.img}
          className="w-16 h-16 rounded-full object-cover border-4 border-green-200"
        />

        <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
          STABLE
        </span>
      </div>

      {/* Name */}
      <h2 className="mt-4 text-lg font-semibold text-[#1E293B]">
        {patient.name}
      </h2>

      <p className="text-sm text-gray-500">
        {patient.age}Y • {patient.gender} • {patient.type}
      </p>

      {/* Contact */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaEnvelope /> {patient.email}
        </p>
        <p className="flex items-center gap-2">
          <FaPhone /> {patient.phone}
        </p>
      </div>

      {/* Button */}
      <button className="mt-4 w-full py-2 rounded-full border text-sm hover:bg-gray-100">
        View Health Journal →
      </button>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-4">
        Latest Sync: 2024-03-10
      </p>

    </div>
  );
};

export default PatientCard;