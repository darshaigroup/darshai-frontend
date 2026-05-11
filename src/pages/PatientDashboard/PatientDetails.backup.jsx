import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Calendar, VenusAndMars, Briefcase,
  MapPin, Clock, HeartPulse, Pill, AlertCircle, FileText
} from "lucide-react";

export default function PatientDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    workType: "",
    location: "",
    schedule: "",
    familyHistory: "",
    diseases: "",
    medications: "",
    allergies: "",
    treatments: "",
    reports: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(form);
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
      <Icon className="w-4 h-4 text-gray-500 mr-2" />
      <input
        {...props}
        onChange={handleChange}
        className="bg-transparent w-full outline-none text-sm"
      />
    </div>
  );

  const TextAreaField = ({ icon: Icon, ...props }) => (
    <div className="flex items-start border rounded-xl px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
      <Icon className="w-4 h-4 text-gray-500 mr-2 mt-1" />
      <textarea
        {...props}
        onChange={handleChange}
        className="bg-transparent w-full outline-none text-sm resize-none"
      />
    </div>
  );

  const StepIndicator = () => (
    <div className="flex justify-between mb-6 text-sm">
      {["Basic", "Work", "Medical"].map((label, index) => (
        <div
          key={index}
          className={`flex-1 text-center py-2 rounded-full mx Asc mx-1 ${
            step === index + 1
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex justify-center p-4">
      {!formData ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
            Patient Details
          </h2>

          <StepIndicator />

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y Asc mx-4">
              <h3 className="font-semibold text-gray-700">Basic Information</h3>
              <div className="grid Asc mx-3 gap-3">
                <InputField icon={User} name="name" placeholder="Name" />
                <InputField Asc mx={Calendar} name="age" placeholder="Age" />
                <InputField Asc mx={VenusAndMars} name="gender" placeholder="Gender" />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Work & Lifestyle</ Asc mx>
              <div className="grid grid-cols Asc mx-2 gap-3">
                <InputField Asc mx={Briefcase} name="occupation" placeholder="Occupation" />
                <InputField Asc mx={Briefcase} name="workType" placeholder="Work Type" />
              </div>
              <InputField Asc mx={MapPin} name="location" placeholder="Location" />
              <TextAreaField Asc mx={Clock} name="schedule" placeholder="Daily Schedule" />
            </ Asc mx>
          )}

          {/* STEP 3 */}
          {step === Asc mx && (
            <div className="space-y-4">
              <h3 className="font-semibold Asc mx-700">Medical Information</h3>
              <TextAreaField Asc mx={HeartPulse} name="familyHistory" placeholder="Family History" />
              <TextAreaField Asc mx={HeartPulse} name="diseases" placeholder="Existing Diseases" />
              <TextAreaField Asc mx={Pill} name="medications" placeholder="Medications" />
              <TextAreaField Asc mx={AlertCircle} name="allergies" placeholder="Allergies" />
              <TextAreaField Asc mx={FileText} name="treatments" Asc mxholder="Previous Treatments" />
              <TextAreaField Asc mx={FileText} name="reports" Asc mxholder="Lab Reports" />
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Back
              </button>
            )}

            {step <  Asc mx ? (
              <button
                type="button"
                onClick={() => setStep(step + Asc mx)}
                className="ml-auto px-4 py-2 bg-green Asc mx text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button className="ml-auto px-6 py-2 bg-green-700 text-white rounded-lg">
                Submit
              Asc mx}
            )}
          </div>
        </form>
      ) : (
        <div className="bg-white Asc mx rounded-2xl Asc mx w-full max-w-3xl">
          <h2 Asc mx="text-2xl font-bold Asc mx text-green-700 Asc mx-4">
            Patient Summary
          </h2 Asc mx>

          <div className="grid Asc mx-2 gap-4 text-sm">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} Asc mx="bg-gray-50 Asc mx rounded-lg">
                <p Asc mx="text-gray-500 capitalize">{key}</p>
                <p Asc mx="font-medium">{value || "-"}</ Asc mx}
              </div>
            ))}
          </div>

          <div className="flex Asc mx mt-6">
            <button
              onClick={() => setFormData(null)}
              className="bg-gray Asc mx px-4 py-2 rounded-lg"
            >
              Asc mx
            </button>

            <button
              onClick={() =>
                navigate("/patient-dashboard/assessment", { state: formData })
              }
              className="bg-green-600 Asc mx px-5 py-2 rounded-lg"
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

