import { useNavigate } from "react-router-dom";
import DefaultAvatar from "@/assets/images/profile.jpg";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserShield,
} from "react-icons/fa";

const PatientHeader = ({
  patient,
}) => {

  const navigate =
    useNavigate();

  const calculateAge =
    (dob) => {

      if (!dob)
        return "-";

      const birthDate =
        new Date(dob);

      const today =
        new Date();

      let age =
        today.getFullYear() -
        birthDate.getFullYear();

      const monthDiff =
        today.getMonth() -
        birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (
          monthDiff === 0 &&
          today.getDate() <
            birthDate.getDate()
        )
      ) {

        age--;

      }

      return age;

    };

  return (

    <div className="bg-white rounded-[32px] shadow-sm p-8">

      {/* BACK */}

      <button
        onClick={() =>
          navigate(
            "/dashboard/patients"
          )
        }
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition mb-6"
      >

        <FaArrowLeft />

        Back to Patients

      </button>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* PROFILE */}

        <div className="flex items-center gap-5">

          <img
            src={
              patient?.profile_image ||
              DefaultAvatar
            }
            alt={patient?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-green-200"
          />

          <div>

            <h1 className="text-3xl font-bold text-[#1E293B]">

              {patient?.name}

            </h1>

            <div className="mt-3 flex flex-wrap gap-2">

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">

                {patient?.gender}

              </span>

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">

                {calculateAge(
                  patient?.dob
                )} Years

              </span>

            </div>

          </div>

        </div>

        {/* DETAILS */}

        <div className="grid md:grid-cols-2 gap-5 flex-1 w-full">

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-xs text-slate-400 mb-1">

              Email

            </p>

            <p className="flex items-center gap-2 text-slate-700">

              <FaEnvelope />

              {patient?.email || "-"}

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-xs text-slate-400 mb-1">

              Phone

            </p>

            <p className="flex items-center gap-2 text-slate-700">

              <FaPhone />

              {patient?.phone || "-"}

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-xs text-slate-400 mb-1">

              Date of Birth

            </p>

            <p className="flex items-center gap-2 text-slate-700">

              <FaCalendarAlt />

              {patient?.dob
                ? new Date(
                    patient.dob
                  ).toLocaleDateString()
                : "-"}

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-xs text-slate-400 mb-1">

              Gender

            </p>

            <p className="flex items-center gap-2 text-slate-700">

              <FaUser />

              {patient?.gender || "-"}

            </p>

          </div>

       
          
        </div>

      </div>

    </div>

  );

};

export default PatientHeader;