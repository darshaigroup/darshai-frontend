import { useNavigate } from "react-router-dom";

import {FaEnvelope,FaPhone} from "react-icons/fa";

import DefaultAvatar from "@/assets/images/profile.jpg";

const PatientCard = ({patient,}) => {

  const navigate =
    useNavigate();

  if (!patient)
    return null;

  const calculateAge = (dob) => {

  if (!dob) return "-";

  const birthDate =
    new Date(dob);

  const today =
    new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() >
      birthDate.getMonth() ||
    (
      today.getMonth() ===
        birthDate.getMonth() &&
      today.getDate() >=
        birthDate.getDate()
    );

  if (!hasBirthdayPassed) {
    age--;
  }

  return age;

};

  const handleNavigate =
    () => {

      navigate(
        `/dashboard/patients/${patient.id}`
      );

    };

  return (

    <div className="bg-white rounded-[32px] p-6 shadow-sm">

      <img
        src={
          patient.profile_image || DefaultAvatar  
        }
        alt={patient.name}
        className="w-16 h-16 rounded-full object-cover border-4 border-green-200"
      />

      <h2 className="mt-4 text-lg font-semibold text-[#1E293B]">
        {patient.name}
      </h2>

    <p className="text-sm text-gray-500">
  {calculateAge(patient.dob)}Y • {patient.gender}
</p>

      <div className="mt-4 space-y-2 text-sm text-gray-600">

        <p className="flex items-center gap-2">

          <FaEnvelope />

          {patient.email}

        </p>

        <p className="flex items-center gap-2">

          <FaPhone />

          {patient.phone}

        </p>

      </div>

      <button
        onClick={
          handleNavigate
        }
        className="mt-4 w-full py-2 rounded-full border text-sm hover:bg-gray-100"
      >

        View Profile →

      </button>

    </div>

  );

};

export default PatientCard;