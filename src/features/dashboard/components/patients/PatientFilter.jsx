import { FaSearch, FaPlus } from "react-icons/fa";

const PatientFilter = ({ onAdd }) => {
  return (
    <div className="bg-white p-5 rounded-[28px] shadow flex justify-between items-center">

      <div className="flex items-center gap-3 w-full max-w-xl bg-[#F4F7F6] px-4 py-3 rounded-full">
        <FaSearch className="text-gray-400" />
        <input
          placeholder="Search by name, ID, or biomarker..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button className="px-5 py-2 rounded-full bg-gray-100 text-sm">
          Filter
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#3BAA9D] text-white shadow"
        >
          <FaPlus /> Add Patient
        </button>
      </div>

    </div>
  );
};

export default PatientFilter;