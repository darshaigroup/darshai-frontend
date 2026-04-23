import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPatientModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    occupation: "",
    location: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit → go to questionnaire page
  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill required fields");
      return;
    }

    // 👉 Navigate with data
    navigate("/dashboard/questionnaires", {
      state: { patient: formData },
    });

    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-[28px] w-[420px] shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Add New Patient
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Enter the basic information to start the wellness journey.
        </p>

        {/* FULL NAME */}
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-full mb-4"
        />

        {/* DOB + PHONE */}
        <div className="flex gap-3 mb-4">
          <input
            name="dob"
            type="date"
            onChange={handleChange}
            className="w-full p-3 border rounded-full"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded-full"
          />
        </div>

        {/* OCCUPATION */}
        <input
          name="occupation"
          placeholder="Occupation"
          onChange={handleChange}
          className="w-full p-3 border rounded-full mb-4"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-3 border rounded-full"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#3BAA9D] text-white"
        >
          Continue to Questionnaire →
        </button>

      </div>
    </div>
  );
};

export default AddPatientModal;