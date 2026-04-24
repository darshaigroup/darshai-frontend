import { Search, Settings, Bell } from "lucide-react";

const TopNavbar = ({ openModal }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white px-4 py-2 rounded-full w-[350px] shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search..."
            className="ml-2 outline-none text-sm w-full bg-transparent"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🔥 BUTTON FIXED */}
        <button
          onClick={openModal}
          className="bg-[#8BC34A] text-white px-5 py-2 rounded-full shadow hover:bg-[#7CB342]"
        >
          + Add Patient
        </button>

        <Settings size={18} className="text-gray-500" />
        <Bell size={18} className="text-gray-500" />

        <img
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default TopNavbar;