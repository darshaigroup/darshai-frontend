import { FaSearch, FaBell, FaCog, FaPlus } from "react-icons/fa";
import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";

const TopNavbar = () => {
  return (
    <div className="w-full bg-white px-6 py-4 flex items-center justify-between border-b">
      
      {/* 🔹 Left: Search */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full w-[300px]">
        <FaSearch className="text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Add Patients Button */}
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2">
          <FaPlus />
          Add Patients
        </Button>

        {/* Settings */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaCog className="text-gray-600" />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <FaBell className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-semibold">Dr. Renjith N Raj</p>
            <p className="text-xs text-gray-400">View Profile</p>
          </div>

          <Avatar src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150" />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;