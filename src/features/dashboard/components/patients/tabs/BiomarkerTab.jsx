import { FaHeartbeat, FaLungs, FaThermometerHalf, FaTint } from "react-icons/fa";

const BiomarkerTab = () => {
  return (
    <div className="space-y-6">

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <p className="text-xs text-gray-400">AVG. HEART RATE</p>
          <h2 className="text-lg font-semibold mt-2">72 bpm</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <p className="text-xs text-gray-400">RESPIRATION</p>
          <h2 className="text-lg font-semibold mt-2">16 br/m</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <p className="text-xs text-gray-400">BODY TEMP</p>
          <h2 className="text-lg font-semibold mt-2">98.6 °F</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <p className="text-xs text-gray-400">HYDRATION</p>
          <h2 className="text-lg font-semibold mt-2">84%</h2>
        </div>

      </div>

      {/* TREND SECTION */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <h2 className="text-lg font-semibold mb-2">
          Biomarker Trends
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Continuous physiological monitoring data
        </p>

        {/* Placeholder chart */}
        <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
          Chart Coming Soon
        </div>

      </div>

    </div>
  );
};

export default BiomarkerTab;