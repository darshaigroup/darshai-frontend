import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  UserCheck,
  CheckCircle2,
  LogOut,
  ChevronRight,
} from "lucide-react";

import logo from "@/assets/images/logo.png";
import { getDashboard, getLeads } from "../../services/salesService";

const menus = [
  {
    title: "Leads",
    icon: Users,
    path: "/sales-dashboard/leads",
    key: "lead",
  },
  {
    title: "Follow Ups",
    icon: CalendarClock,
    path: "/sales-dashboard/followups",
    key: "followups",
  },
  {
    title: "Assign Doctor",
    icon: UserCheck,
    path: "/sales-dashboard/assign-doctor",
    key: "purchased",
  },
  {
    title: "Closed Leads",
    icon: CheckCircle2,
    path: "/sales-dashboard/closed",
    key: "closed",
  },
];

export default function Sidebar({ mobile, close }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_leads: 0,
    lead: 0,
    contacted: 0,
    interested: 0,
    purchased: 0,
    assigned: 0,
    closed: 0,
    lost: 0,
    followups: 0,
  });

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadDashboard() {
    try {
      const [dashboard, leads] = await Promise.all([
        getDashboard(),
        getLeads(),
      ]);

      const followups = (leads || []).filter(
        (lead) =>
          lead.followup_date &&
          ["Lead", "Contacted", "Interested", "Purchased"].includes(
            lead.lead_status,
          ),
      ).length;

      setStats({
        total_leads: dashboard.total_leads || 0,
        lead: dashboard.lead || 0,
        contacted: dashboard.contacted || 0,
        interested: dashboard.interested || 0,
        purchased: dashboard.purchased || 0,
        assigned: dashboard.assigned || 0,
        closed: dashboard.closed || 0,
        lost: dashboard.lost || 0,
        followups,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  const progress = Math.min(
    (stats.closed / Math.max(stats.total_leads, 1)) * 100,
    100,
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#173C68] via-[#184A73] to-[#1E7A3A] text-white">
      <div className="border-b border-white/10 p-6">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.18)]"
        >
          <div className="flex items-center justify-center">
            <motion.img
              src={logo}
              alt="Darshai"
              animate={{
                y: [0, -6, 0],
                rotate: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="h-36 w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>

      <div className="px-5 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[30px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.12)]"
        >
          <p className="text-xs uppercase tracking-[3px] text-white/60">
            Today's Pipeline
          </p>

          <motion.h2
            key={stats.total_leads}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-3 text-5xl font-bold"
          >
            {stats.total_leads}
          </motion.h2>

          <p className="mt-2 text-white/75">Active Lifestyle Leads</p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-[#E7D6A4]"
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-white/70">
            <span>Converted</span>

            <span className="font-semibold">{progress.toFixed(0)}%</span>
          </div>
        </motion.div>
      </div>
      {/* ---------- Dashboard ---------- */}

      <div className="px-4 pt-7">
        <NavLink
          to="/sales-dashboard"
          onClick={() => {
            if (mobile) close?.();
          }}
        >
          {({ isActive }) => (
            <motion.div
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-[24px] transition-all ${
                isActive
                  ? "bg-white text-[#173C68] shadow-[0_20px_60px_rgba(0,0,0,.18)]"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebar"
                  className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-[#E7D6A4]"
                />
              )}

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-120%" }}
                whileHover={{ x: "120%" }}
                transition={{ duration: 0.8 }}
              />

              <div className="relative flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isActive ? "bg-[#173C68] text-white" : "bg-white/10"
                    }`}
                  >
                    <LayoutDashboard size={22} />
                  </motion.div>

                  <span className="text-lg font-semibold">Dashboard</span>
                </div>

                <motion.div animate={{ x: isActive ? 5 : 0 }}>
                  <ChevronRight size={18} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </NavLink>
      </div>

      {/* ---------- Navigation ---------- */}

      <nav className="mt-5 flex-1 overflow-y-auto px-4">
        <div className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;
            const value = stats[item.key] ?? 0;

            return (
              <NavLink key={item.path} to={item.path} onClick={()=>{if(mobile) close?.()}}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative overflow-hidden rounded-[24px] transition-all ${
                      isActive
                        ? "bg-white text-[#173C68] shadow-[0_20px_60px_rgba(0,0,0,.18)]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebar"
                        className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-[#E7D6A4]"
                      />
                    )}

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "120%" }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="relative flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 8, scale: 1.08 }}
                          transition={{ type: "spring", stiffness: 350 }}
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                            isActive ? "bg-[#173C68] text-white" : "bg-white/10"
                          }`}
                        >
                          <Icon size={21} />
                        </motion.div>

                        <div>
                          <p className="text-lg font-medium">{item.title}</p>

                          <p className="text-xs text-white/50">
                            {item.key === "lead" && "New Registrations"}
                            {item.key === "followups" && "Today's Follow-ups"}
                            {item.key === "purchased" && "Ready To Assign"}
                            {item.key === "closed" && "Completed Sales"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.span
                          key={value}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring" }}
                          className={`flex h-8 min-w-[34px] items-center justify-center rounded-full px-2 text-xs font-semibold ${
                            isActive ? "bg-[#1E7A3A] text-white" : "bg-white/15"
                          }`}
                        >
                          {value}
                        </motion.span>

                        <motion.div animate={{ x: isActive ? 5 : 0 }}>
                          <ChevronRight
                            size={18}
                            className={
                              isActive
                                ? ""
                                : "opacity-40 group-hover:opacity-100"
                            }
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ---------- Logout ---------- */}

      <div className="border-t border-white/10 p-5">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-[22px] bg-white/10 py-4 text-lg font-semibold backdrop-blur-xl transition-all hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600"
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </div>
    </div>
  );
}
