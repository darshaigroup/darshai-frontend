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
const menus = [
  {
    title: "Leads",
    icon: Users,
    path: "/sales-dashboard/leads",
    badge: "24",
  },
  {
    title: "Follow Ups",
    icon: CalendarClock,
    path: "/sales-dashboard/followups",
    badge: "6",
  },
  {
    title: "Assign Doctor",
    icon: UserCheck,
    path: "/sales-dashboard/assign-doctor",
  },
  {
    title: "Closed Leads",
    icon: CheckCircle2,
    path: "/sales-dashboard/closed",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-[#173C68] via-[#184A73] to-[#1E7A3A] text-white">

      {/* ---------- Logo Card ---------- */}

      <div className="border-b border-white/10 p-6">

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.18)]"
        >

          <div className="flex items-center gap-5">
 <img
                src={logo}
                alt="Darshai"
                className="h-70 w-70 object-contain"
              />
            

           

          </div>

        </motion.div>

      </div>

      {/* ---------- Pipeline ---------- */}

      <div className="px-5 pt-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="rounded-[30px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.12)]"
        >

          <p className="text-xs uppercase tracking-[3px] text-white/60">
            Today's Pipeline
          </p>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .6 }}
            className="mt-3 text-5xl font-bold"
          >
            24
          </motion.h2>

          <p className="mt-2 text-white/75">
            New Lifestyle Leads
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1.3 }}
              className="h-full rounded-full bg-[#E7D6A4]"
            />

          </div>

        </motion.div>

      </div>

      {/* ---------- Dashboard (Pinned) ---------- */}

      <div className="px-4 pt-7">

        <NavLink to="/sales-dashboard">

          {({ isActive }) => (

            <motion.div
              whileHover={{
                x: 6,
                scale: 1.02,
              }}
              whileTap={{
                scale: .98,
              }}
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

              <div className="flex items-center justify-between px-5 py-4">

                <div className="flex items-center gap-4">

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isActive
                        ? "bg-[#173C68] text-white"
                        : "bg-white/10"
                    }`}
                  >

                    <LayoutDashboard size={22} />

                  </motion.div>

                  <span className="text-lg font-semibold">
                    Dashboard
                  </span>

                </div>

                <motion.div
                  animate={{
                    x: isActive ? 5 : 0,
                  }}
                >
                  <ChevronRight size={18} />
                </motion.div>

              </div>

            </motion.div>

          )}

        </NavLink>

      </div>

      {/* ---------- Remaining Navigation ---------- */}

      <nav className="mt-5 flex-1 overflow-y-auto px-4">
        <div className="space-y-2">
                      {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{
                      x: 6,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`group relative overflow-hidden rounded-[24px] transition-all ${
                      isActive
                        ? "bg-white text-[#173C68] shadow-[0_20px_60px_rgba(0,0,0,.18)]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {/* Active Indicator */}

                    {isActive && (
                      <motion.div
                        layoutId="activeSidebar"
                        className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-[#E7D6A4]"
                      />
                    )}

                    {/* Hover Shine */}

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "120%" }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="relative flex items-center justify-between px-5 py-4">

                      <div className="flex items-center gap-4">

                        <motion.div
                          whileHover={{
                            rotate: 8,
                            scale: 1.08,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                          }}
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                            isActive
                              ? "bg-[#173C68] text-white"
                              : "bg-white/10"
                          }`}
                        >
                          <Icon size={21} />
                        </motion.div>

                        <span className="text-lg font-medium">
                          {item.title}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.15 }}
                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-full px-2 text-xs font-semibold ${
                              isActive
                                ? "bg-[#1E7A3A] text-white"
                                : "bg-white/15"
                            }`}
                          >
                            {item.badge}
                          </motion.span>
                        )}

                        <motion.div
                          animate={{
                            x: isActive ? 5 : 0,
                          }}
                        >
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
          whileHover={{
            scale: 1.02,
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
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