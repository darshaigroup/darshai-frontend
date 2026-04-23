const reports = [
  {
    id: 1,
    patient: "John Doe",
    type: "Blood Test",
    date: "2026-04-20",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    type: "X-Ray",
    date: "2026-04-22",
    status: "Pending",
  },
];

const ReportTable = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-4">Reports List</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            <th>Patient</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2">{r.patient}</td>
              <td>{r.type}</td>
              <td>{r.date}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    r.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td>
                <button className="text-blue-500">View</button>
                <button className="ml-2 text-green-600">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;