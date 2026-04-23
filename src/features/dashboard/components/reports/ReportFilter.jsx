const ReportFilter = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-wrap gap-4 items-center">
      <select className="border p-2 rounded">
        <option>All Types</option>
        <option>Blood Test</option>
        <option>X-Ray</option>
      </select>

      <select className="border p-2 rounded">
        <option>Status</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>

      <input type="date" className="border p-2 rounded" />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Filter
      </button>
    </div>
  );
};

export default ReportFilter;