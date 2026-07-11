import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getPatients } from "../../services/patientService";

import DafaultAvatar from "@/assets/images/profile.jpg";

import { getAssessmentProgress } from "../../services/reportService";

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

      const patientsWithProgress = await Promise.all(
        (data || []).map(async (patient) => {
          try {
            const progress = await getAssessmentProgress(patient.id);

            return {
              ...patient,
              progress,
            };
          } catch {
            return {
              ...patient,
              progress: null,
            };
          }
        }),
      );

      setPatients(patientsWithProgress);
    } catch (error) {
      console.error("PATIENT LOAD ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const getWorkflowButton = (progress) => {
    if (!progress) {
      return {
        label: "Assign Assessment",
        color: "bg-gradient-to-r from-[#1E7A3A] to-[#4FDAB9]",
      };
    }

    if (progress.completed) {
      return {
        label: "View Report",
        color: "bg-gradient-to-r from-[#173C68] to-[#295B94]",
      };
    }

    return {
      label: "Continue",
      color: "bg-gradient-to-r from-[#F59E0B] to-[#F97316]",
    };
  };

  const handleWorkflow = (patient) => {
    const progress = patient.progress;

    // Existing patient but no assessment started
    if (!progress) {
      navigate("/dashboard/patient-assessment", {
        state: {
          patient,
          mode: "assign",
        },
      });
      return;
    }

    // Assessment completed
    if (progress.completed) {
      navigate(`/dashboard/patients/${patient.id}`);
      return;
    }

    // Resume assessment
    switch (progress.currentStep) {
      case "lifestyle":
        navigate("/dashboard/lifestyle-matrix-assessment", {
          state: {
            patient,
            workflow: "resume",
          },
        });
        break;

      case "risk":
        navigate("/dashboard/assessments", {
          state: {
            patient,
            workflow: "resume",
            lifestyleMatrix: progress.lifestyleReport,
          },
        });
        break;

      case "ayurveda":
        navigate("/dashboard/ayurveda-assessment", {
          state: {
            patient,
            workflow: "resume",
            lifestyleMatrix: progress.lifestyleReport,
            riskReport: progress.riskReport,
          },
        });
        break;

      case "clinical":
        navigate("/dashboard/clinical-data-assessment", {
          state: {
            patient,
            workflow: "resume",
            lifestyleMatrix: progress.lifestyleReport,
            riskReport: progress.riskReport,
            ayurvedaReport: progress.ayurvedaReport,
          },
        });
        break;

      default:
        navigate("/dashboard/patient-assessment", {
          state: {
            patient,
          },
        });
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
          <h2 className="text-xl font-semibold text-[#1E293B]">
            Patient Records
          </h2>

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
          <div className="flex justify-end gap-20">
            <span>Profile</span>
            <span>Workflow</span>
          </div>
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

            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() =>
                  navigate("/dashboard/edit-patient", {
                    state: {
                      patient: p,
                    },
                  })
                }
                className="
    group
    h-11
    px-5
    rounded-3xl
    border border-[#03A547]/20
    bg-white
    text-[#03A547]
    text-sm
    font-semibold
    shadow-sm
    hover:bg-[#03A547]
    hover:text-white
    hover:shadow-lg
    hover:-translate-y-0.5
    transition-all duration-300
  "
              >
                Edit Profile
              </button>

              <button
                onClick={() => handleWorkflow(p)}
                className={`
      group
      relative
      overflow-hidden
      h-11
      px-6
      rounded-3xl
      text-sm
      font-semibold
      text-white
      shadow-lg
      hover:shadow-xl
      hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      ${getWorkflowButton(p.progress).color}
    `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>

                  {getWorkflowButton(p.progress).label}
                </span>

                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all"></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPreviewTable;
