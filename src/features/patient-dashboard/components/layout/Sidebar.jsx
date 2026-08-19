import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/logo.png";
import { LayoutDashboard, Brain, ScrollText, Activity, Settings, LogOut, ShieldCheck, Compass } from "lucide-react";

export default function Sidebar({ activePatient, onLogout, idPrefix = "sidebar" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menu = [
    { id: "dashboard", label: "Wellness Overview", icon: LayoutDashboard, path: "/patient-dashboard" },
    { id: "assessment", label: "My Assessments", icon: Brain, path: "/patient-dashboard/assessment" },
    { id: "reports", label: "Health Reports", icon: ScrollText, path: "/patient-dashboard/reports" },
    { id: "results", label: "Health Insights", icon: Activity, path: "/patient-dashboard/results" },
    { id: "settings", label: "Profile & Settings", icon: Settings, path: "/patient-dashboard/settings" },
  ];

  const vitality = activePatient?.biometrics?.vitalityScore ?? activePatient?.vitalityScore ?? 88;

  return (
    <aside className="relative flex h-screen w-[290px] flex-col overflow-hidden border-r border-white/5" style={{ background: "linear-gradient(180deg,#06152A 0%,#081B34 45%,#0A2342 100%)" }}>
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-500/5 blur-3xl" />

      <svg className="absolute inset-0 opacity-[0.035]" viewBox="0 0 300 900" preserveAspectRatio="none">
        <path d="M0 80C80 40 160 140 300 70M0 220C90 270 210 120 300 190M0 430C120 470 180 360 300 390M0 640C90 690 190 560 300 620M0 820C110 760 210 880 300 810" fill="none" stroke="white" strokeWidth="1" />
      </svg>

      <div className="relative flex h-full flex-col">
        <div className="px-6 pt-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute h-36 w-36 rounded-full bg-emerald-400/25 blur-[70px]" />
              <div className="absolute h-28 w-28 rounded-full bg-cyan-300/90 blur-[55px]" />
              <div className="absolute h-44 w-44 rounded-full bg-emerald-300/10 blur-[90px] animate-pulse" />
            </div>

            <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: "0 0 30px rgba(16,185,129,.18), inset 0 0 20px rgba(16,185,129,.08)" }} />

            <div className="relative z-10 flex justify-center px-4 pt-5">
              <img src={Logo} alt="DarshAI" className="w-full max-w-[210px] object-contain select-none" draggable={false} />
            </div>

            <div className="relative z-10 flex justify-center pb-4 pt-3">
              <div className="h-[3px] w-28 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#34d399]" />
            </div>
          </div>
        </div>

        {/* <div className="px-6 pt-5">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-5 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#C9A75B]">Health Intelligence</p>
                <h3 className="mt-2 font-serif text-xl text-white">Wellness Alignment</h3>
                <h2 className="mt-1 text-3xl font-bold text-emerald-400">{vitality}%</h2>
              </div>

              <div className="relative mt-1">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping" />
                <span className="relative block h-3 w-3 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
              <Compass className="h-4 w-4 text-emerald-400" />
              {activePatient?.city || "Bangalore"} • Synced
            </div>
          </div>
        </div> */}

        <nav className="mt-8 flex-1 space-y-2 overflow-y-auto px-4">
          {menu.map(item => {
            const Icon = item.icon;
            const active = item.path === "/patient-dashboard" ? pathname === "/patient-dashboard" : pathname.startsWith(item.path);

            return (
              <motion.button
                key={item.id}
                id={`${idPrefix}-${item.id}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(item.path)}
                className="relative flex w-full items-center rounded-2xl px-4 py-3 text-left"
              >
                {active && <motion.div layoutId={`${idPrefix}-active`} transition={{ type: "spring", stiffness: 320, damping: 28 }} className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#173C68] to-[#1E7A3A] shadow-xl" />}
                {active && <motion.div layoutId={`${idPrefix}-line`} className="absolute left-0 h-8 w-1 rounded-r-full bg-[#C9A75B]" />}

                <div className="relative z-10 flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${active ? "text-[#C9A75B]" : "text-slate-400"}`} />
                    <span className={`text-xs font-medium uppercase tracking-[.14em] ${active ? "text-white" : "text-slate-300"}`}>{item.label}</span>
                  </div>

                  {active && <motion.div layoutId={`${idPrefix}-dot`} className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />}
                </div>
              </motion.button>
            );
          })}
        </nav>

        <div className="px-5 pb-5">
          <button onClick={onLogout} className="mb-5 flex w-full items-center gap-3 rounded-2xl px-5 py-3 text-rose-400 transition hover:bg-rose-500/10">
            <LogOut className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[.14em]">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}