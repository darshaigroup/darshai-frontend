const PatientRow = ({ patient }) => {
  return (
    <tr className="border-t">
      <td className="py-2">{patient.name}</td>
      <td>{patient.age}</td>
      <td>{patient.gender}</td>
      <td>{patient.condition}</td>

      <td>
        <span
          className={`px-2 py-1 rounded text-xs ${
            patient.status === "Recovered"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {patient.status}
        </span>
      </td>

      <td className="space-x-2">
        <button className="text-blue-500">View</button>
        <button className="text-green-600">Edit</button>
        <button className="text-red-500">Delete</button>
      </td>
    </tr>
  );
};

export default PatientRow;