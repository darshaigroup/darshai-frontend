const PatientPreviewTable = () => {
  const patients = [
    { name: "John Doe", age: 32, status: "Recovered" },
    { name: "Jane Smith", age: 28, status: "Under Treatment" },
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="font-semibold mb-4">Recent Patients</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p, index) => (
            <tr key={index} className="border-t">
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientPreviewTable;