import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  addPatient,
  updatePatient,
} from "../../assessments/services/patientService";

const AddPatientModal = ({ onClose, patient = null, mode = "create" }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const [formData, setFormData] = useState({
    name: patient?.name || "",
    dob: patient?.dob ? patient.dob.split("T")[0] : "",
    gender: patient?.gender || "",
    email: patient?.email || "",
    phone: patient?.phone || "",
    occupation: patient?.occupation || "",
    location: patient?.location || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* INPUT CHANGE */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* SUBMIT */

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    try {
      if (!formData.name || !formData.phone || !formData.gender) {
        alert("Please fill all required fields");

        return;
      }

      // DOB VALIDATION

      if (formData.dob) {
        const today = new Date();

        const selectedDate = new Date(formData.dob);

        if (selectedDate > today) {
          alert("Date of birth cannot be a future date");

          return;
        }
      }

      setIsSubmitting(true);

      let savedPatient;

      if (mode === "create") {
        const response = await addPatient(formData);

        savedPatient = response.patient;

        navigate("/dashboard/lifestyle-matrix-assessment", {
          state: {
            patient: savedPatient,
            workflow: "new",
          },
        });
      } else {
        const response = await updatePatient(patient.id, formData);

        savedPatient = response.patient;

        // Edit Profile -> return to patients list
        if (mode === "edit") {
          alert("Patient profile updated successfully.");

          navigate("/dashboard/patients");

          return;
        }

        // Assign Assessment -> continue workflow
        navigate("/dashboard/lifestyle-matrix-assessment", {
          state: {
            patient: savedPatient,
            workflow: "new",
          },
        });
      }

      handleClose();
    } catch (error) {
      console.error("PATIENT ERROR:", error);

      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm overflow-y-auto px-4 py-8"
    >
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-[480px] rounded-[36px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* TOP */}

          <div className="px-8 pt-8 pb-6 border-b border-[#E8ECE9]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A75B] mb-3">
                  DARSHAI CLINICAL FLOW
                </p>

                <h2 className="text-[32px] leading-[1.1] font-serif text-[#1E7A3A]">
                  {mode === "create"
                    ? "Add New Patient"
                    : "Patient Information"}
                </h2>
              </div>

              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-[#1E7A3A]/10 text-[#1E7A3A] hover:bg-[#1E7A3A] hover:text-white transition-all duration-300"
              >
                ✕
              </button>
            </div>

            <p className="text-[#1E7A3A]/65 text-sm leading-[1.8] mt-5">
              {mode === "create"
                ? "Enter patient information to begin the precision wellness assessment journey."
                : "Review or update patient information before starting the assessment."}
            </p>
          </div>

          {/* FORM */}

          <div className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* NAME */}

            <input
              name="name"
              value={formData.name}
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
            />

            {/* DOB + GENDER */}

            <div className="grid grid-cols-2 gap-4">
              <input
                name="dob"
                type="date"
                value={formData.dob}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>

            {/* EMAIL */}

            <input
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
            />

            {/* PHONE */}

            <input
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
            />

            {/* OCCUPATION */}

            <input
              name="occupation"
              value={formData.occupation}
              placeholder="Occupation"
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
            />

            {/* LOCATION */}

            <input
              name="location"
              value={formData.location}
              placeholder="Location"
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-full border border-[#DDE5DF] bg-[#F8FAF9] outline-none focus:border-[#1E7A3A] text-[#1E293B]"
            />

            {/* SUBMIT BUTTON */}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="relative w-full h-14 mt-4 rounded-full overflow-hidden bg-gradient-to-r from-[#1E7A3A] to-[#174EA6] text-white tracking-[0.28em] uppercase text-[11px] shadow-[0_20px_50px_rgba(23,78,166,0.22)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_70%)]" />

              <span className="relative z-10">
                {isSubmitting
                  ? mode === "create"
                    ? "CREATING PATIENT..."
                    : "UPDATING PATIENT..."
                  : "CONTINUE TO ASSESSMENT"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
