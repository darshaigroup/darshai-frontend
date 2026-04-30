const PatientOverviewChart = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      
      <h3 className="font-semibold text-[#1E293B] mb-4">
        Patient Overview
      </h3>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <span className="text-orange-500">• Child</span>
        <span className="text-blue-500">• Teen</span>
        <span className="text-purple-500">• Adult</span>
        <span className="text-green-500">• Older</span>
      </div>

      <div className="flex justify-center items-center h-44">
        <div className="w-36 h-36 rounded-full border-[12px] border-green-500 flex items-center justify-center">
          <div className="text-center">
            <p className="font-bold text-xl text-[#1E293B]">1450</p>
            <p className="text-xs text-gray-400">TOTAL PATIENTS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverviewChart;