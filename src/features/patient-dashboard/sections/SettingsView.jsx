import { useState } from "react";

export default function SettingsView({
  activePatient,
  onUpdatePatient,
}) {
  const [form, setForm] = useState({
    full_name: activePatient?.full_name || "",
    email: activePatient?.email || "",
    phone: activePatient?.phone || "",
    location: activePatient?.location || "",
  });

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
      <h2 className="text-xl font-semibold mb-6">
        Profile Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="h-11 px-4 rounded-xl border border-slate-300"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="h-11 px-4 rounded-xl border border-slate-300"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="h-11 px-4 rounded-xl border border-slate-300"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="h-11 px-4 rounded-xl border border-slate-300"
        />
      </div>

      <button
        onClick={() => onUpdatePatient?.(form)}
        className="mt-6 h-11 px-6 rounded-xl bg-emerald-600 text-white"
      >
        Save Changes
      </button>
    </div>
  );
}