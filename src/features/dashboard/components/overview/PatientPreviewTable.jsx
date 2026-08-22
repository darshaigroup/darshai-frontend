import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../services/patientService";
import DafaultAvatar from "@/assets/images/profile.jpg";
import { getAssessmentProgress } from "../../services/reportService";

const PatientPreviewTable = () => {
  const navigate = useNavigate();
  const [patients,setPatients] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  },[]);

  const loadPatients = async () => {
    try {
      const data = await getPatients();

      const patientsWithProgress = await Promise.all(
        (data || []).map(async patient => {
          try {
            const progress = await getAssessmentProgress(patient.id);
            return {...patient,progress};
          } catch {
            return {...patient,progress:null};
          }
        }),
      );

      setPatients(patientsWithProgress);
    } catch (error) {
      console.error("PATIENT LOAD ERROR",error);
    } finally {
      setLoading(false);
    }
  };

  const getWorkflowButton = progress => {
    if (!progress) {
      return {
        label:"Assign Assessment",
        color:"bg-gradient-to-r from-[#1E7A3A] to-[#4FDAB9]",
      };
    }

    if (progress.completed) {
      return {
        label:"View Report",
        color:"bg-gradient-to-r from-[#173C68] to-[#295B94]",
      };
    }

    return {
      label:"Continue",
      color:"bg-gradient-to-r from-[#F59E0B] to-[#F97316]",
    };
  };

  const handleWorkflow = patient => {
    const progress = patient.progress;

    if (!progress) {
      navigate("/dashboard/patient-assessment",{
        state:{patient,mode:"assign"},
      });
      return;
    }

    if (progress.completed) {
      navigate(`/dashboard/patients/${patient.id}`);
      return;
    }

    switch (progress.currentStep) {
      case "lifestyle":
        navigate("/dashboard/lifestyle-matrix-assessment",{
          state:{patient,workflow:"resume"},
        });
        break;

      case "risk":
        navigate("/dashboard/assessments",{
          state:{
            patient,
            workflow:"resume",
            lifestyleMatrix:progress.lifestyleReport,
          },
        });
        break;

      case "ayurveda":
        navigate("/dashboard/ayurveda-assessment",{
          state:{
            patient,
            workflow:"resume",
            lifestyleMatrix:progress.lifestyleReport,
            riskReport:progress.riskReport,
          },
        });
        break;

      case "clinical":
        navigate("/dashboard/clinical-data-assessment",{
          state:{
            patient,
            workflow:"resume",
            lifestyleMatrix:progress.lifestyleReport,
            riskReport:progress.riskReport,
            ayurvedaReport:progress.ayurvedaReport,
          },
        });
        break;

      default:
        navigate("/dashboard/patient-assessment",{state:{patient}});
    }
  };

  const calculateAge = dob => {
    if (!dob) return "-";

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) age--;

    return age;
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-gray-500">
        Loading patients...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SUMMARY CARD */}
      <div className="bg-gradient-to-r from-[#1E7A3A] to-[#4FDAB9] rounded-[28px] p-6 sm:p-8 text-white shadow-xl">
        <p className="text-sm text-white/80">Patient Overview</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">My Patients</h2>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[28px] p-4 sm:p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B]">
            Patient Records
          </h2>

          <span className="bg-[#EEF2F1] px-4 py-2 rounded-full text-sm text-gray-600 w-fit">
            Total: {patients.length}
          </span>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="min-w-[1050px]">
            <div className="grid grid-cols-[40px_minmax(230px,2fr)_120px_minmax(150px,1.2fr)_110px_90px_290px] items-center gap-3 text-xs text-gray-400 px-4 uppercase tracking-wider mb-3">
              <span>#</span>
              <span>Patient Identity</span>
              <span>Age/Gender</span>
              <span>Email</span>
              <span>Date</span>
              <span>Status</span>
              <div className="flex justify-end gap-3">
                <span className="w-[130px] text-center">Profile</span>
                <span className="w-[150px] text-center">Workflow</span>
              </div>
            </div>

            {patients.map((p,index) => (
              <div
                key={p.id}
                className="grid grid-cols-[40px_minmax(230px,2fr)_120px_minmax(150px,1.2fr)_110px_90px_290px] items-center gap-3 bg-[#F7FAF9] px-4 py-4 rounded-xl hover:bg-[#EEF4F2] transition mb-2"
              >
                <span className="text-gray-500">{index + 1}</span>

                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.profile_image || DafaultAvatar}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1E293B] text-sm truncate">
                      {p.name}
                    </p>
                   
                  </div>
                </div>

                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {calculateAge(p.dob)}Y • {p.gender}
                </span>

                <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full w-fit max-w-full truncate">
                  {p.email || "-"}
                </span>

                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {p.created_at
                    ? new Date(p.created_at).toLocaleDateString()
                    : "-"}
                </span>

                <span className="text-xs px-3 py-1 rounded-full w-fit font-medium bg-gray-200 text-gray-600">
                  Active
                </span>

                <div className="flex justify-end items-center gap-3">
                  <button
                    onClick={() =>
                      navigate("/dashboard/edit-patient",{state:{patient:p}})
                    }
                    className="w-[130px] h-11 rounded-3xl border border-[#03A547]/20 bg-white text-[#03A547] text-sm font-semibold shadow-sm hover:bg-[#03A547] hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => handleWorkflow(p)}
                    className={`w-[150px] h-11 rounded-3xl text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ${getWorkflowButton(p.progress).color}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      {getWorkflowButton(p.progress).label}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABLET */}
        <div className="hidden md:block lg:hidden overflow-x-auto">
          <div className="min-w-[850px]">
            <div className="grid grid-cols-[40px_250px_120px_180px_110px_250px] items-center gap-3 text-xs text-gray-400 px-4 uppercase tracking-wider mb-3">
              <span>#</span>
              <span>Patient Identity</span>
              <span>Age/Gender</span>
              <span>Email</span>
              <span>Status</span>
              <span className="text-center">Actions</span>
            </div>

            {patients.map((p,index) => (
              <div
                key={p.id}
                className="grid grid-cols-[40px_250px_120px_180px_110px_250px] items-center gap-3 bg-[#F7FAF9] px-4 py-4 rounded-xl hover:bg-[#EEF4F2] transition mb-2"
              >
                <span className="text-gray-500">{index + 1}</span>

                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.profile_image || DafaultAvatar}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1E293B] text-sm truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{p.id}</p>
                  </div>
                </div>

                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {calculateAge(p.dob)}Y • {p.gender}
                </span>

                <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full w-fit max-w-full truncate">
                  {p.email || "-"}
                </span>

                <span className="text-xs px-3 py-1 rounded-full w-fit font-medium bg-gray-200 text-gray-600">
                  Active
                </span>

                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() =>
                      navigate("/dashboard/edit-patient",{state:{patient:p}})
                    }
                    className="h-10 px-4 rounded-3xl border border-[#03A547]/20 bg-white text-[#03A547] text-sm font-semibold shadow-sm hover:bg-[#03A547] hover:text-white transition-all"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleWorkflow(p)}
                    className={`h-10 px-5 rounded-3xl text-sm font-semibold text-white shadow-lg active:scale-95 transition-all ${getWorkflowButton(p.progress).color}`}
                  >
                    {getWorkflowButton(p.progress).label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-3">
          {patients.map((p,index) => (
            <div
              key={p.id}
              className="bg-[#F7FAF9] rounded-2xl p-4 hover:bg-[#EEF4F2] transition"
            >
              <div className="flex items-start gap-3">
                <img
                  src={p.profile_image || DafaultAvatar}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1E293B] truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{p.id}</p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-200 text-gray-600 shrink-0">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-xs">
                    <div>
                      <p className="text-gray-400">Age / Gender</p>
                      <p className="text-gray-600 mt-0.5">
                        {calculateAge(p.dob)}Y • {p.gender}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Date</p>
                      <p className="text-gray-600 mt-0.5">
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>

                    <div className="col-span-2 min-w-0">
                      <p className="text-gray-400">Email</p>
                      <p className="text-green-600 mt-0.5 truncate">
                        {p.email || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-[#E4ECE8]">
                <button
                  onClick={() =>
                    navigate("/dashboard/edit-patient",{state:{patient:p}})
                  }
                  className="flex-1 h-10 rounded-3xl border border-[#03A547]/20 bg-white text-[#03A547] text-sm font-semibold shadow-sm hover:bg-[#03A547] hover:text-white transition-all"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => handleWorkflow(p)}
                  className={`flex-1 h-10 rounded-3xl text-sm font-semibold text-white shadow-lg active:scale-95 transition-all ${getWorkflowButton(p.progress).color}`}
                >
                  {getWorkflowButton(p.progress).label}
                </button>
              </div>
            </div>
          ))}
        </div>

        {patients.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No patients found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPreviewTable;