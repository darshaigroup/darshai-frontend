import { FaHeart, FaThermometerHalf, FaTint, FaBolt } from "react-icons/fa";

const OverviewTab = ({ patient }) => {
  return (
    <div className="grid grid-cols-3 gap-6">

      {/* LEFT CARDS */}
      <div className="col-span-2 grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full text-red-500">
            <FaHeart />
          </div>
          <div>
            <p className="text-xs text-gray-400">HEART RATE</p>
            <h2 className="text-xl font-semibold">72 bpm</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-full text-orange-500">
            <FaThermometerHalf />
          </div>
          <div>
            <p className="text-xs text-gray-400">BODY TEMP</p>
            <h2 className="text-xl font-semibold">98.6 °F</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-500">
            <FaTint />
          </div>
          <div>
            <p className="text-xs text-gray-400">HYDRATION</p>
            <h2 className="text-xl font-semibold">85%</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <FaBolt />
          </div>
          <div>
            <p className="text-xs text-gray-400">ENERGY</p>
            <h2 className="text-xl font-semibold">High</h2>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="bg-[#1E2F4F] text-white p-6 rounded-3xl flex flex-col justify-center">

        <h3 className="text-lg font-semibold mb-3">
          Next Appointment
        </h3>

        <p className="text-sm opacity-80">
          Tomorrow, 10:30 AM
        </p>

        <p className="text-xs opacity-60 mb-5">
          Follow-up Consultation
        </p>

        <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-sm">
          Reschedule
        </button>

      </div>

    </div>
  );
};

export default OverviewTab;