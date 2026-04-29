import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WaitlistForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    workType: "",
    location: "",
    schedule: "",
    familyHistory: "",
    diseases: [],
    medications: "",
    allergies: "",
    treatments: "",
    reports: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        diseases: checked
          ? [...prev.diseases, value]
          : prev.diseases.filter((d) => d !== value),
      }));
    } else if (type === "file") {
      setFormData({ ...formData, reports: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
           Basic Information
        </h2>

        {/* BASIC DETAILS */}
        <div className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Name" onChange={handleChange} className="input" />
          <input name="age" placeholder="Age" onChange={handleChange} className="input" />
          <select name="gender" onChange={handleChange} className="input">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input name="occupation" placeholder="Occupation" onChange={handleChange} className="input" />
        </div>

        {/* WORK INFO */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input name="workType" placeholder="Work Type" onChange={handleChange} className="input" />
          <input name="location" placeholder="Location" onChange={handleChange} className="input" />
        </div>

        <textarea name="schedule" placeholder="Daily Schedule" onChange={handleChange} className="input mt-4 w-full" />

        <textarea name="familyHistory" placeholder="Family History" onChange={handleChange} className="input mt-4 w-full" />

        {/* MEDICAL */}
        <div className="mt-4">
          <label className="font-semibold">Existing Diseases:</label>
          <div className="flex gap-4 mt-2">
            <label><input type="checkbox" value="Diabetes" onChange={handleChange}/> Diabetes</label>
            <label><input type="checkbox" value="BP" onChange={handleChange}/> BP</label>
            <label><input type="checkbox" value="Thyroid" onChange={handleChange}/> Thyroid</label>
          </div>
        </div>

        <textarea name="medications" placeholder="Current Medications" onChange={handleChange} className="input mt-4 w-full" />
        <textarea name="allergies" placeholder="Allergies" onChange={handleChange} className="input mt-4 w-full" />
        <textarea name="treatments" placeholder="Previous Treatments" onChange={handleChange} className="input mt-4 w-full" />

        {/* FILE UPLOAD */}
        <div className="mt-4">
          <label className="block mb-1">Upload Lab Reports</label>
          <input type="file" name="reports" onChange={handleChange} />
        </div>

        <button
          onClick={() => navigate("/patient-dashboard/assessment")}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
}