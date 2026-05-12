import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users, 
  HeartPulse,
  TrendingUp, 
  Shield,
  Activity,
  Settings
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/patient-dashboard" },
  { name: "Profile", icon: Users, path: "/patient-dashboard/profile" },
  { name: "Biometrics", icon: HeartPulse, path: "/patient-dashboard/biometrics" },
  { name: "Assessment", icon: TrendingUp, path: "/patient-dashboard/assessment" },
  { name: "Results", icon: Shield, path: "/patient-dashboard/result" },
  { name: "Reports", icon: Activity, path: "/patient-dashboard/reports" },
  { name: "Settings", icon: Settings, path: "/patient-dashboard/settings" },
];

export default function PatientSidebar() {
  return (
    <div className="w-72 min-h-screen bg-white shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="p-8 text-center border-b border-gray-200">
        <div className="flex items-center justify-center mb-4">
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Patient Portal
        </h1>
        <p className="text-gray-600 text-sm mt-1">Your Wellness Portal</p>
      </div>

      {/* Menu */}
      <div className="p-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = window.location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={index}
              to={item.path}
              className={`group flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 font-medium cursor-pointer ${
                isActive
                  ? "bg-gray-100 text-gray-800 shadow-md border border-gray-300"
                  : "text-gray-700 hover:bg-gray-50 hover:shadow-md hover:border hover:border-gray-200"
              }`}
            >
              <div className={`p-3 rounded-lg transition-all ${isActive ? 'bg-white shadow-inner' : 'group-hover:bg-gray-100'}`}>
                <Icon size={20} />
              </div>
              <span className="flex-1">{item.name}</span>
              {isActive && (
                <div className="w-2 h-8 bg-gray-400 rounded-full shadow-lg"></div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

