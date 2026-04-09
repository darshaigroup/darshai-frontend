// src/components/layout/TopNavbar.jsx

import { Bell, Search, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const navigate = useNavigate();

  const [notifications] = useState([
    "New appointment request",
    "Lab report uploaded",
    "Patient message received"
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="w-full h-[70px] bg-white border-b flex items-center justify-between px-6">

      {/* Search */}
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-[320px]">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search patients..."
          className="bg-transparent outline-none ml-2 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <div className="relative group cursor-pointer">
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>

          <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block">
            {notifications.map((note, index) => (
              <p key={index} className="text-sm py-1 border-b last:border-none">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Dr. Renjith</p>
            <p className="text-xs text-gray-500">Doctor</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
}