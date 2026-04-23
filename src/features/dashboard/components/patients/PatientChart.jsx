const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h3 className="font-bold">{patient.name}</h3>
      <p className="text-sm text-gray-500">
        {patient.age} yrs • {patient.gender}
      </p>
      <p className="text-sm">{patient.condition}</p>

      <span className="text-xs text-green-600">{patient.status}</span>
    </div>
  );
};

export default PatientCard;