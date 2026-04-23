const ReportsHeader = () => {
  return (
    <div className="flex justify-between items-start">

      {/* LEFT */}
      <div>
        <h1 className="text-3xl font-semibold text-[#1E3A5F]">
          Clinical Reports
        </h1>
        <p className="text-gray-500 text-sm">
          Comprehensive wellness documentation and AI analysis
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3">

        <button className="px-5 py-2 rounded-full bg-[#8DC63F] text-white shadow">
          + Add Patients
        </button>

        <button className="px-5 py-2 rounded-full border text-gray-600">
          Questionnaires
        </button>

        <button className="px-5 py-2 rounded-full border text-gray-600">
          Archive
        </button>

        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#3BAA9D] text-white shadow-md">
          Generate AI Report
        </button>

      </div>
    </div>
  );
};

export default ReportsHeader;