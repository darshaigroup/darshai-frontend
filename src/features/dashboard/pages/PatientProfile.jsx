import { useParams } from "react-router-dom";
import { useState } from "react";

import PatientHeader from "../components/patients/PatientHeader";
import PatientTabs from "../components/patients/PatientTabs";

const PatientProfile = () => {
  const { id } = useParams(); // 🔥 dynamic id

  const [activeTab, setActiveTab] = useState("overview");

  // 🔥 TEMP DATA (later from backend API)
  const patientData = {
    "1": {
      name: "Aria Montgomery",
      id: "DAR-1001",
      type: "VATA-PITTA",
      age: 28,
      gender: "Female",
      location: "Chennai, India",
      phone: "+91 98765 43210",
      email: "aria@email.com",
      img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200",
    },
    "2": {
      name: "Julian Thorne",
      id: "DAR-1002",
      type: "KAPHA",
      age: 45,
      gender: "Male",
      location: "Delhi, India",
      phone: "+91 99999 99999",
      email: "julian@email.com",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
  };

  const patient = patientData[id];

  if (!patient) {
    return <div className="p-10">Patient Not Found</div>;
  }

  return (
    <div className="p-8 bg-[#F6F9F8] min-h-screen space-y-6">

      {/* HEADER */}
      <PatientHeader patient={patient} />

      {/* TABS */}
      <PatientTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        patient={patient}
      />

    </div>
  );
};

export default PatientProfile;