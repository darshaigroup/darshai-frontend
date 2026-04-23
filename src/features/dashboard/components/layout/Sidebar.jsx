import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaChartBar,
  FaFileMedical,
  FaCalendarAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    { name: "Overview", path: "/dashboard", icon: <FaHome /> },
    { name: "Patients", path: "/dashboard/patients", icon: <FaUserInjured /> },
    { name: "Geo Wellness", path: "/dashboard/geowellness", icon: <FaChartBar /> },
    { name: "Analytics", path: "/dashboard/analysis", icon: <FaChartBar /> },
    { name: "Reports", path: "/dashboard/reports", icon: <FaFileMedical /> },
    { name: "Questionnaires", path: "/dashboard/questionnaires", icon: <FaCalendarAlt />},
   
  ];

  return (
    <div className="w-64 h-screen bg-[#F8FAF9] border-r flex flex-col justify-between p-5">
      
      {/* 🔹 Top Logo */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="font-bold text-gray-800">DARSHAl</h2>
            <p className="text-xs text-gray-400">GEO-WELLNESS</p>
          </div>
        </div>

        {/* 🔹 Menu */}
        <ul className="space-y-3">
          {menu.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-full transition text-sm ${
                    isActive
                      ? "bg-gradient-to-r from-[#1E7A3A] to-[#4fdab9] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <span className="text-sm">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;