import {
  useState,
  useEffect,
} from "react";

import PatientCard from "../components/patients/PatientCard";

import {getPatients} from "../services/patientService";

const Patients = () => {

  const [
    patients,
    setPatients,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [showAll, setShowAll] =
  useState(false);

  useEffect(() => {

    loadPatients();

  }, []);

  const loadPatients =
    async () => {

      try {

        const data =
          await getPatients();

        setPatients(data);

      } catch (error) {

        console.error(
          "PATIENT LOAD ERROR",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <div className="text-center py-10">
        Loading Patients...
      </div>
    );

  }

 return (

  <div className="space-y-8">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
      {(showAll
        ? patients
        : patients.slice(
            0,
            10
          )
      ).map(
        (patient) => (

          <PatientCard
            key={patient.id}
            patient={patient}
          />

        )
      )}

    </div>

    {patients.length > 6 && (

      <div className="flex justify-center">

        <button
          onClick={() =>
            setShowAll(
              !showAll
            )
          }
          className="px-8 py-3 rounded-full bg-white border border-slate-200 hover:border-green-500 shadow-sm transition-all"
        >

          {showAll
            ? "↑ Show Less"
            : `↓ View All (${patients.length})`}

        </button>

      </div>

    )}

  </div>

);

};

export default Patients;