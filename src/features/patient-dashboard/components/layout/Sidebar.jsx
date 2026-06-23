import {
  LayoutDashboard,
  Brain,
  Scroll,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  currentTab,
  setCurrentTab,
  onLogout,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Wellness Overview",
      icon: LayoutDashboard,
    },
    {
      id: "assessment",
      label: "My Assessments",
      icon: Brain,
    },
    {
      id: "report",
      label: "Health Reports",
      icon: Scroll,
    },
    {
      id: "result",
      label: "Health Insights",
      icon: Activity,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 h-screen bg-[#081B34] text-white fixed">
      <div className="p-6">
        <h1 className="text-2xl font-black">
          DARSHAI
        </h1>
        <p className="text-xs text-emerald-400">
          GEO WELLNESS
        </p>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                currentTab === item.id
                  ? "bg-emerald-600"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}