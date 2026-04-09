import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  HeartPulse,
  AlertCircle,
  FileText,
  Calendar,
  MessageCircle,
  Settings,
  Leaf,
  Activity,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/doctor-dashboard" },
  { name: "Patients", icon: User, path: "/patients" },
  { name: "Biometrics", icon: HeartPulse, path: "/biometrics" },
  { name: "Alerts", icon: AlertCircle, path: "/alerts" },
  { name: "Protocols", icon: FileText, path: "/protocols" },
  { name: "Retreats", icon: Calendar, path: "/retreats" },
  { name: "Dosha Engine", icon: Leaf, path: "/dosha" },
  { name: "Reports", icon: Activity, path: "/reports" },
  { name: "Messages", icon: MessageCircle, path: "/messages" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function DarshaiSidebar() {
  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="p-8 text-center border-b border-white/10">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
          Darshai
        </h1>
        <p className="text-emerald-200/80 text-sm mt-1">Ayurvedic Intelligence</p>
      </div>

      {/* Menu */}
      <div className="p-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = window.location.pathname === item.path;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={`
                group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-medium cursor-pointer
                ${isActive
                  ? "bg-white/10 backdrop-blur-sm border border-white/20 shadow-glow bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white"
                  : "hover:bg-white/5 hover:shadow-glow hover:scale-[1.02] text-white/80 hover:text-white"
                }
              `}
            >
              <div className={`p-3 rounded-xl transition-all ${isActive ? 'bg-white/20 shadow-inner' : 'group-hover:bg-white/20'}`}>
                <Icon size={20} />
              </div>
              <span className="flex-1">{item.name}</span>
              {isActive && (
                <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full shadow-lg animate-pulse"></div>
              )}
            </NavLink>
          );
        })}
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
