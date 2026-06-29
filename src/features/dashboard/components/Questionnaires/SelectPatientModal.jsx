import { useEffect, useState } from "react";
import { getPatients } from "../../services-t/patientService";

const SelectPatientModal = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (isOpen) loadPatients();
  }, [isOpen]);

 const [loading,setLoading] = useState(false);

const loadPatients = async () => {

  try {

    setLoading(true);

    const data = await getPatients();

    setPatients(data);

  } catch(error){

    console.error(error);

  } finally {

    setLoading(false);

  }

};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-3xl bg-white rounded-[32px] p-6 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold text-[#173C68]">
            Select Patient
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border"
          >
            ✕
          </button>

        </div>

       <div className="max-h-[500px] overflow-y-auto space-y-3">

  {loading && (
    <p>Loading patients...</p>
  )}

  {!loading && patients.length === 0 && (
    <p>No patients found</p>
  )}

  {patients.map(patient => (
    <button
      key={patient.id}
      onClick={() => onSelect(patient)}
      className="w-full p-4 border rounded-2xl text-left hover:bg-slate-50 transition-all"
    >
      <h3 className="font-semibold">
        {patient.name}
      </h3>

      <p className="text-sm text-slate-500">
        {patient.phone}
      </p>
    </button>
  ))}

</div>

      </div>

    </div>
  );
};

export default SelectPatientModal;