import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";

const AssessmentLayout = ({ sidebar, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#F5F7F4]">
      {/* PREMIUM BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F6FFF8] via-[#F8F7F3] to-[#EDF7EE]" />

      {/* GLOW ORBS */}
      <div className="fixed top-[-200px] left-[-120px] w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-green-200/30 blur-[120px] pointer-events-none" />

      <div className="fixed bottom-[-200px] right-[-100px] w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-emerald-300/20 blur-[120px] pointer-events-none" />

      {/* NOISE */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* MOBILE / TABLET NAV BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-[100] w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open assessment navigation"
      >
        <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
      </button>

      {/* MOBILE + TABLET SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[110]"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 220,
              }}
              className="fixed left-0 top-0 h-dvh w-[88vw] max-w-[380px] sm:w-[360px] bg-white/90 backdrop-blur-3xl border-r border-white shadow-[0_25px_80px_rgba(0,0,0,0.15)] overflow-hidden z-[120]"
            >
              {/* DRAWER HEADER */}
              <div className="sticky top-0 z-10 bg-white/85 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-5 py-4 sm:py-5 flex items-center justify-between">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F] truncate">
                    Wellness Journey
                  </h3>

                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Assessment Flow
                  </p>
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition"
                  aria-label="Close assessment navigation"
                >
                  <X size={17} />
                </button>
              </div>

              {/* SIDEBAR */}
              <div className="h-[calc(100dvh-81px)] sm:h-[calc(100dvh-89px)] overflow-y-auto overscroll-contain">
                {sidebar}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 w-full min-h-screen">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 xl:gap-10 px-3 sm:px-5 md:px-7 lg:px-8 xl:px-10 py-4 sm:py-6 md:py-8 lg:py-8 xl:py-10 w-full">
          
          {/* DESKTOP SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-[300px] xl:w-[320px] 2xl:w-[350px] shrink-0"
          >
            <div className="sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto scrollbar-thin">
              {sidebar}
            </div>
          </motion.aside>

          {/* MAIN CONTENT */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-w-0 w-full"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default AssessmentLayout;