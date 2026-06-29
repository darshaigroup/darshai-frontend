import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
} from "react-router-dom";

import PatientHeader from "../components/patients/PatientHeader";
import PatientTabs from "../components/patients/PatientTabs";

import {
  getPatientById,
} from "../services-t/patientService";

const PatientProfile = () => {

  const { id } =
    useParams();

  const [
    patient,
    setPatient,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    activeTab,
    setActiveTab,
  ] = useState("overview");

  useEffect(() => {

    loadPatient();

  }, [id]);

  const loadPatient =
  async () => {

    try {

      const data =
        await getPatientById(id);

      setPatient(data);

    } catch (error) {

      console.error(
        "PATIENT PROFILE ERROR",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="p-10">
        Loading Patient...
      </div>
    );

  }

  if (!patient) {

    return (
      <div className="p-10">
        Patient not found
      </div>
    );

  }

  return (

    <div className="space-y-6">

      <PatientHeader
        patient={patient}
      />

      <PatientTabs
        patient={patient}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

    </div>

  );

};

export default PatientProfile;