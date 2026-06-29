import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaChartBar,
  FaFileMedical,
  FaCalendarAlt,
} from "react-icons/fa";

const Sidebar = ({ expanded }) => {
  const menu = [
    { name: "Overview", path: "/dashboard", icon: <FaHome /> },
    { name: "Patients", path: "/dashboard/patients", icon: <FaUserInjured /> },
    { name: "Geo Wellness", path: "/dashboard/geowellness", icon: <FaChartBar /> },
    { name: "Analytics", path: "/dashboard/analysis", icon: <FaChartBar /> },
    { name: "Reports", path: "/dashboard/reports", icon: <FaFileMedical /> },
    { name: "Questionnaires", path: "/dashboard/questionnaires", icon: <FaCalendarAlt /> },
  ];

  return (
    <aside
      className={`
        h-screen bg-[#F8FAF9]
        border-r border-[#E5ECE9]
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        transition-all duration-300 ease-out
        overflow-hidden
        ${expanded ? "w-[280px]" : "w-[72px]"}
      `}
    >
      {/* Logo */}
      <div className="h-[90px] flex items-center justify-center border-b border-[#E5ECE9]">
        <div className={`flex items-center ${expanded ? "gap-3" : ""}`}>
          <img
            src="/logo.png"
            className="w-12 h-12 object-contain"
            alt="logo"
          />

          <div
            className={`
              transition-all duration-300
              ${expanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
            `}
          >
            <h2 className="font-bold text-[#1E293B] text-lg">
              DARSHAI
            </h2>

            <p className="text-[10px] tracking-[2px] text-[#94A3B8]">
              GEO-WELLNESS
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `
              flex items-center
              ${expanded ? "justify-start" : "justify-center"}
              gap-4
              px-4 py-3
              rounded-2xl
              mb-2
              transition-all duration-300
              group
              ${
                isActive
                  ? "bg-gradient-to-r from-[#1E7A3A] to-[#4FDAB9] text-white shadow-lg"
                  : "text-[#64748B] hover:bg-white hover:shadow-md hover:text-[#1E293B]"
              }
            `
            }
          >
            <span
              className={`
                text-lg shrink-0
                transition-all duration-300
              `}
            >
              {item.icon}
            </span>

            <span
              className={`
                whitespace-nowrap font-medium text-[15px]
                transition-all duration-300
                ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
              `}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;