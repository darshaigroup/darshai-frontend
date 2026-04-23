import { useState } from "react";
import PatientFilter from "../components/PatientFilter";
import PatientTable from "../components/PatientTable";

const dummyPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
    gender: "Male",
    condition: "Diabetes",
    status: "Under Treatment",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    condition: "Cardio",
    status: "Recovered",
  },
];

const Patients = () => {
  const [patients, setPatients] = useState(dummyPatients);

  const handleSearch = (query) => {
    const filtered = dummyPatients.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setPatients(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <PatientFilter onSearch={handleSearch} />

      {/* Table */}
      <PatientTable patients={patients} />
    </div>
  );
};

export default Patients;