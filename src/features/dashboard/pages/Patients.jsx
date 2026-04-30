import PatientCard from "../components/patients/PatientCard";

const Patients = () => {

  const patients = [
    {
      id: "1",
      name: "Aria Montgomery",
      age: 28,
      gender: "Female",
      type: "VATA-PITTA",
      email: "aria@email.com",
      phone: "+91 98765 43210",
      img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200",
    },
    {
      id: "2",
      name: "Julian Thorne",
      age: 45,
      gender: "Male",
      type: "KAPHA",
      email: "julian@email.com",
      phone: "+91 99999 99999",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
  ];

  return (
    <div className="p-8 bg-[#F6F9F8] min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-[#1E293B] mb-6">
        Patient Directory
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">
        {patients.map((p) => (
          <PatientCard key={p.id} patient={p} />
        ))}
      </div>

    </div>
  );
};

export default Patients;