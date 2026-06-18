import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getPatients } from "../../Services/patientService";

import DafaultAvatar from "@/assets/images/profile.jpg";

const PatientPreviewTable = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getPatients();

      // console.log("PATIENTS", data);

      setPatients(data || []);
    } catch (error) {
      console.error("PATIENT LOAD ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  const calculateAge = (dob) => {
    if (!dob) return "-";

    const birthDate = new Date(dob);

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    return age;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

 return (
  <div className="space-y-6">

    {/* SUMMARY CARD */}
    <div className="bg-gradient-to-r from-[#1E7A3A] to-[#4FDAB9] rounded-[28px] p-8 text-white shadow-xl">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-white/80">Patient Overview</p>
          <h2 className="text-3xl font-bold mt-1">My Patients</h2>
        </div>

      </div>
    </div>

    {/* TABLE CARD */}
    <div className="bg-white rounded-[28px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-[#1E293B]">Patient Records</h2>

        <button className="bg-[#EEF2F1] px-4 py-2 rounded-full text-sm text-gray-600">
          Total: {patients.length}
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-8 text-xs text-gray-400 px-4 uppercase tracking-wider mb-3">
        <span>#</span>
        <span className="col-span-2">Patient Identity</span>
        <span>Age/Gender</span>
        <span>Email</span>
        <span>Date</span>
        <span>Status</span>
        <span></span>
      </div>

      {/* TABLE ROWS */}
      {patients.map((p, index) => (
        <div
          key={p.id}
          className="grid grid-cols-8 items-center bg-[#F7FAF9] px-4 py-4 rounded-xl hover:bg-[#EEF4F2] transition mb-2"
        >
          <span className="text-gray-500">{index + 1}</span>

          <div className="col-span-2 flex items-center gap-3">
            <img
              src={p.profile_image || DafaultAvatar}
              alt={p.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-[#1E293B] text-sm">{p.name}</p>
              <p className="text-xs text-gray-400">{p.id}</p>
            </div>
          </div>

          <span className="text-sm text-gray-600">
            {calculateAge(p.dob)}Y • {p.gender}
          </span>

          <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full w-fit truncate max-w-[140px]">
            {p.email || "-"}
          </span>

          <span className="text-sm text-gray-500">
            {p.created_at ? new Date(p.created_at).toLocaleDateString() : "-"}
          </span>

          <span className="text-xs px-3 py-1 rounded-full w-fit font-medium bg-gray-200 text-gray-600">
            Active
          </span>

          <button
            onClick={() => navigate(`/dashboard/patients/${p.id}`)}
            className="text-sm text-[#03A547] font-medium hover:underline"
          >
            View More
          </button>
        </div>
      ))}

    </div>

  </div>
);
};

export default PatientPreviewTable;
