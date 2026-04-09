import { useState } from "react";

export default function PatientForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    occupation: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dummyPatient = {
      id: Date.now(),
      ...formData,
      status: "Active",
      createdAt: new Date().toISOString()
    };

    // 👉 store temporarily (for next page use)
    localStorage.setItem("newPatient", JSON.stringify(dummyPatient));

    // 👉 pass to parent (if needed)
    onSubmit(dummyPatient);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <input
        name="name"
        placeholder="Patient Name"
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
        required
      />

      {/* DOB */}
      <div>
        <label className="text-sm text-white/70 block mb-1">
          Date of Birth
        </label>
        <input
          name="dob"
          type="date"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
          required
        />
      </div>

      {/* Gender */}
      <select
        name="gender"
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 appearance-none"
        required
      >
        <option value="" className="bg-black">Select Gender</option>
        <option value="Male" className="bg-black">Male</option>
        <option value="Female" className="bg-black">Female</option>
      </select>

      {/* Phone */}
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
        required
      />

      {/* Occupation */}
      <input
        name="occupation"
        placeholder="Occupation"
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
      />

      {/* Location */}
      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold"
      >
        Save & Continue
      </button>

    </form>
  );
}