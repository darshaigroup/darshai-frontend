// src/components/layout/TopNavbar.jsx

import { Bell, Search, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctor from "../../assets/images/doctor.jpeg";

export default function TopNavbar() {
  // ✅ FIXED TYPO
  const navigate = useNavigate();

  const [notifications] = useState([
    "New appointment request",
    "Lab report uploaded",
    "Patient message received"
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ✅ SEARCH HANDLER
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 🔥 You can later connect this to patients list
    console.log("Searching:", value);
  };

  return (
    <div className="w-full h-[70px] bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#581c87] border-b border-white/10 flex items-center justify-between px-6 text-white">
      {/* 🔍 Search */}
      <div className="flex  bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg w-[320px]">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* 🔔 Notifications */}
        <div className="relative group cursor-pointer">
          <Bell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>

          <div className="absolute right-0 mt-3 w-64 bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#581c87] border-b border-white/10 flex items-center justify-between px-6 text-white shadow-lg rounded-lg p-3 hidden group-hover:block">
            {notifications.map((note, index) => (
              <p key={index} className="text-sm py-1 border-b last:border-none">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* 👤 Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={doctor}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Dr. Renjith</p>
            <p className="text-xs text-gray-500">Doctor</p>
          </div>
        </div>

        {/* 🔴 Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
}