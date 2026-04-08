import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageCircle,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/doctor-dashboard" },
  { name: "Appointments", icon: Calendar, path: "/appointments" },
  { name: "Patients", icon: Users, path: "/patients" },
  { name: "Messages", icon: MessageCircle, path: "/messages" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-[#0f3b3f] text-white p-5">
      
      {/* Logo */}
      <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
        Neuro Pro
      </h1>

      {/* Menu */}
      <div className="space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#1f5c60]"
                    : "hover:bg-[#17484c]"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}