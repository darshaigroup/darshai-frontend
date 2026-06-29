import { useNavigate } from "react-router-dom";
import { FaEnvelope,FaPhone,FaHeartbeat } from "react-icons/fa";
import DefaultAvatar from "@/assets/images/profile.jpg";

const PatientCard=({patient})=>{
  const navigate=useNavigate();

  if(!patient) return null;

  const calculateAge=(dob)=>{
    if(!dob) return "-";

    const birthDate=new Date(dob);
    const today=new Date();

    let age=today.getFullYear()-birthDate.getFullYear();

    const hasBirthdayPassed=
      today.getMonth()>birthDate.getMonth()||
      (
        today.getMonth()===birthDate.getMonth() &&
        today.getDate()>=birthDate.getDate()
      );

    if(!hasBirthdayPassed) age--;

    return age;
  };

  return(
    <div
      className="
        relative overflow-hidden
        bg-white rounded-[36px]
        p-6
        shadow-[0_15px_40px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        hover:-translate-y-1
        transition-all duration-300
      "
    >

      {/* Top Accent */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#1E7A3A]/10 to-[#4FDAB9]/10"/>

      {/* Status */}
      <div className="absolute top-5 right-5">
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
          Active
        </span>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center relative z-10">
        <img
          src={patient.profile_image||DefaultAvatar}
          alt={patient.name}
          className="
            w-24 h-24 rounded-full
            object-cover
            border-4 border-white
            shadow-lg
          "
        />

        <h2 className="mt-4 text-xl font-bold text-[#1E293B] text-center">
          {patient.name}
        </h2>

        <p className="text-gray-500 text-sm">
          {calculateAge(patient.dob)}Y • {patient.gender}
        </p>
      </div>

      {/* Wellness Badge */}
      <div className="mt-5 flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3FBF8] text-[#1E7A3A] text-sm font-medium">
          <FaHeartbeat/>
          Wellness Journey Active
        </div>
      </div>

      {/* Contact */}
      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 bg-[#F8FAF9] p-3 rounded-2xl">
          <FaEnvelope className="text-[#1E7A3A]"/>
          <span className="text-sm text-gray-700 truncate">
            {patient.email}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-[#F8FAF9] p-3 rounded-2xl">
          <FaPhone className="text-[#1E7A3A]"/>
          <span className="text-sm text-gray-700">
            {patient.phone}
          </span>
        </div>

      </div>

      {/* CTA */}
      <button
        onClick={()=>navigate(`/dashboard/patients/${patient.id}`)}
        className="
          mt-6 w-full py-3
          rounded-2xl
          bg-gradient-to-r
          from-[#1E7A3A]
          to-[#4FDAB9]
          text-white
          font-semibold
          shadow-md
          hover:scale-[1.02]
          transition
        "
      >
        View Wellness Profile →
      </button>
    </div>
  );
};

export default PatientCard;