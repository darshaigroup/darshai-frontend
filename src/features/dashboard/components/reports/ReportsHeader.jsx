import { useNavigate } from "react-router-dom";



const ReportsHeader = () => {
  const navigate = useNavigate();
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

      

        <button onClick={() => navigate(`/dashboard/questionnaires`)}className="px-5 py-2 rounded-full border text-gray-600">
          Questionnaires
        </button>

      

      </div>
    </div>
  );
};

export default ReportsHeader;