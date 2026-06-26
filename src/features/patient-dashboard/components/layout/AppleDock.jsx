import { motion } from "motion/react";
import {
  LayoutDashboard,
  Brain,
  ScrollText,
  Activity,
  Settings,
} from "lucide-react";

export default function AppleDock({
  currentTab,
  setCurrentTab,
  activePatient,
}) {
  const items = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: activePatient?.alerts?.length || 0,
    },
    {
      id: "assessment",
      label: "Assessment",
      icon: Brain,
    },
    {
      id: "report",
      label: "Reports",
      icon: ScrollText,
    },
    {
      id: "result",
      label: "Insights",
      icon: Activity,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] w-full flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
        className="pointer-events-auto relative flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.45)]"
      >
        {/* Top Shine */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {items.map(item => {
          const Icon = item.icon;
          const active = currentTab === item.id;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
            >
              {/* Tooltip */}
              <div className="absolute -top-12 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                <div className="bg-slate-950 text-white text-[10px] font-semibold tracking-wide px-3 py-1.5 rounded-lg border border-white/10 shadow-lg whitespace-nowrap">
                  {item.label}
                </div>

                <div className="w-2 h-2 bg-slate-950 rotate-45 mx-auto -mt-1 border-r border-b border-white/10" />
              </div>

              {/* Button */}
              <motion.button
                whileHover={{
                  y: -7,
                  scale: 1.18,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                onClick={() => setCurrentTab(item.id)}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  active
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {/* Active Glow */}
                {active && (
                  <motion.div
                    layoutId="dockGlow"
                    className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-md"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  />
                )}

                <Icon className="relative z-10 w-5 h-5" />

                {/* Badge */}
                {!!item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border border-slate-900">
                    {item.badge}
                  </span>
                )}
              </motion.button>

              {/* Active Dot */}
              <div className="h-2 mt-1 flex items-center justify-center">
                {active ? (
                  <motion.div
                    layoutId="dockIndicator"
                    className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                    }}
                  />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-white/30 transition-colors" />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}