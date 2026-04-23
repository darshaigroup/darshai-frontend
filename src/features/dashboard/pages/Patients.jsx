import { useState } from "react";
import PatientCard from "../components/patients/PatientCard";
import PatientFilter from "../components/patients/PatientFilter";
import AddPatientModal from "../components/patients/AddPatientModal";

const dummyPatients = [
  {
    id: 1,
    name: "Aria Montgomery",
    age: 28,
    gender: "Female",
    type: "VATA-PITTA",
    email: "aria@example.com",
    phone: "+1 (555) 000-0000",
    status: "Stable",
    img: "/patients/p1.jpg",
  },
  {
    id: 2,
    name: "Julian Thorne",
    age: 45,
    gender: "Male",
    type: "KAPHA",
    email: "julian@example.com",
    phone: "+1 (555) 000-0000",
    status: "Stable",
    img: "/patients/p2.jpg",
  },
];

const Patients = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[#1E293B]">
          Patient Directory
        </h1>
        <p className="text-gray-500">
          Precision health monitoring for your practice
        </p>
      </div>

      {/* Filter */}
      <PatientFilter onAdd={() => setShowModal(true)} />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummyPatients.map((p) => (
          <PatientCard key={p.id} patient={p} />
        ))}
      </div>

      {/* Modal */}
      {showModal && <AddPatientModal onClose={() => setShowModal(false)} />}

    </div>
  );
};

export default Patients;