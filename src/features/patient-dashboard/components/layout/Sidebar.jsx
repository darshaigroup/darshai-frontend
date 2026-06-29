import { motion } from "motion/react";
import {
  LayoutDashboard,
  Brain,
  ScrollText,
  Activity,
  Settings,
  LogOut,
  MapPin,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function Sidebar({
  currentTab,
  setCurrentTab,
  activePatient,
  onLogout,
}) {
  const menu = [
    { id: "dashboard", label: "Wellness Overview", icon: LayoutDashboard },
    { id: "assessment", label: "My Assessments", icon: Brain },
    { id: "report", label: "Health Reports", icon: ScrollText },
    { id: "result", label: "Health Insights", icon: Activity },
    { id: "settings", label: "Profile & Settings", icon: Settings },
  ];

  const vitality =
    activePatient?.biometrics?.vitalityScore ||
    activePatient?.vitalityScore ||
    88;

  return (
    <aside
      className="relative w-72 h-screen overflow-hidden border-r border-white/5"
      style={{
        background:
          "linear-gradient(180deg,#06152A 0%,#081B34 45%,#0A2342 100%)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute -top-20 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl" />

      {/* Topographic Pattern */}
      <svg
        className="absolute inset-0 opacity-[0.04]"
        viewBox="0 0 300 900"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80C80 40 160 140 300 70M0 220C90 270 210 120 300 190M0 430C120 470 180 360 300 390M0 640C90 690 190 560 300 620M0 820C110 760 210 880 300 810"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </svg>

      <div className="relative flex flex-col h-full">

        {/* Logo */}
        <div className="px-6 pt-7">
          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5"
          >
            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full border border-emerald-400/30 bg-slate-900 flex items-center justify-center shadow-lg">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-[#C9A75B]" />
              </div>

              <div>
                <h1 className="font-black tracking-[0.18em] text-white text-lg">
                  DARSHAI
                </h1>

                <div className="mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />

                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-emerald-300">
                    Geo Wellness
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Wellness Card */}
        <div className="px-6 mt-5">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#C9A75B]">
                  Health Intelligence
                </p>

                <h2 className="mt-2 text-xl text-white font-serif">
                  Wellness Alignment
                </h2>

                <h3 className="mt-1 text-3xl font-bold text-emerald-400">
                  {vitality}%
                </h3>

              </div>

              <div className="relative mt-1">

                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />

                <span className="relative w-3 h-3 rounded-full bg-emerald-400 block" />

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-300">
              <Compass className="w-4 h-4 text-emerald-400" />
              {activePatient?.city || "Bangalore"} • Synced
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-8 space-y-2 overflow-y-auto">

          {menu.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentTab(item.id)}
                className={`relative flex items-center justify-between w-full rounded-2xl px-5 py-3.5 transition-all ${
                  active
                    ? "bg-gradient-to-r from-[#173C68] to-[#1E7A3A] text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                  <span className="absolute left-2 w-1 h-8 rounded-full bg-[#C9A75B]" />
                )}

                <div className="flex items-center gap-3">

                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-[#C9A75B]" : ""
                    }`}
                  />

                  <span className="text-xs uppercase tracking-[0.14em] font-medium">
                    {item.label}
                  </span>

                </div>

                {active && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </motion.button>
            );
          })}

        </nav>

        {/* Footer */}
        <div className="px-5 pb-5">

          <button
            onClick={onLogout}
            className="mb-5 flex items-center gap-3 w-full rounded-2xl px-5 py-3 text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="uppercase tracking-[0.14em] text-xs">
              Sign Out
            </span>
          </button>

          <div className="rounded-2xl border border-white/5 bg-black/20 py-4 text-center">

            <div className="flex justify-center items-center gap-2">

              <ShieldCheck className="w-4 h-4 text-emerald-400" />

              <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A75B]">
                Vaidya Protocol v1.1
              </span>

            </div>

          </div>

        </div>

      </div>
    </aside>
  );
}