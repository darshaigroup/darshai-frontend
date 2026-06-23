import { motion } from "motion/react";
import {
  LayoutDashboard,
  Brain,
  Scroll,
  Activity,
  Settings,
} from "lucide-react";

export default function AppleDock({
  currentTab,
  setCurrentTab,
}) {
  const dockItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "assessment",
      icon: Brain,
    },
    {
      id: "report",
      icon: Scroll,
    },
    {
      id: "result",
      icon: Activity,
    },
    {
      id: "settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-full px-4 py-2 flex gap-2 md:gap-4">
        {dockItems.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentTab(item.id)}
              className={`w-11 h-11 flex items-center justify-center rounded-full ${
                currentTab === item.id
                  ? "bg-white text-black"
                  : "text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}