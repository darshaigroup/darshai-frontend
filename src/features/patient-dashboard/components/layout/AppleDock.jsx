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
    <div className="fixed bottom-5 inset-x-0 z-[80] flex justify-center px-4 md:hidden">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
        }}
        className="relative flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,.45)]"
      >
        {/* Shine */}
        <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {items.map(item => {
          const Icon = item.icon;
          const active = currentTab === item.id;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
            >
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-11 scale-90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                <div className="rounded-lg border border-white/10 bg-slate-900 px-3 py-1 text-[10px] font-semibold text-white shadow-xl whitespace-nowrap">
                  {item.label}
                </div>

                <div className="mx-auto -mt-1 h-2 w-2 rotate-45 border-b border-r border-white/10 bg-slate-900" />
              </div>

              {/* Button */}
              <motion.button
                whileHover={{
                  y: -7,
                  scale: 1.18,
                }}
                whileTap={{
                  scale: .92,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 16,
                }}
                onClick={() => setCurrentTab(item.id)}
                className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                  active
                    ? "text-slate-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="dock-active"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 25,
                    }}
                    className="absolute inset-0 rounded-full bg-white shadow-lg"
                  />
                )}

                <Icon className="relative z-10 h-5 w-5" />

                {!!item.badge && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-900 bg-rose-500 text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </motion.button>

              {/* Indicator */}
              <div className="mt-1 h-2 flex items-center">
                {active ? (
                  <motion.div
                    layoutId="dock-dot"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                    }}
                    className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
                  />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-transparent transition-colors group-hover:bg-white/30" />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}