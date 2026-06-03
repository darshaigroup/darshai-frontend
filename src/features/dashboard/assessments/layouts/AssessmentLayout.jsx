import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  ChevronRight,
  X,
} from "lucide-react";

const AssessmentLayout = ({
  sidebar,
  children,
}) => {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (

    <div className="min-h-screen relative overflow-hidden bg-[#F5F7F4]">

      {/* PREMIUM BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#F6FFF8] via-[#F8F7F3] to-[#EDF7EE]" />

      {/* GLOW ORBS */}

      <div className="absolute top-[-200px] left-[-120px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-green-200/30 blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-emerald-300/20 blur-[120px]" />

      {/* NOISE */}

      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* MOBILE NAV BUTTON */}

      <button
        onClick={() =>
          setSidebarOpen(true)
        }
        className="lg:hidden fixed left-4 top-1/2 -translate-y-1/2 z-[120] w-14 h-14 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex items-center justify-center"
      >

        <ChevronRight size={22} />

      </button>

      {/* MOBILE SIDEBAR */}

      <AnimatePresence>

        {sidebarOpen && (

          <>

            {/* OVERLAY */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setSidebarOpen(false)
              }
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[110]"
            />

            {/* DRAWER */}

            <motion.div
              initial={{
                x: -350,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -350,
              }}
              transition={{
                type: "spring",
                damping: 25,
              }}
              className="fixed left-0 top-0 h-screen w-[340px] max-w-[90vw] bg-white/80 backdrop-blur-3xl border-r border-white shadow-[0_25px_80px_rgba(0,0,0,0.15)] overflow-y-auto z-[120]"
            >

              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-5 flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold text-[#1D1D1F]">
                    Wellness Journey
                  </h3>

                  <p className="text-xs text-gray-500">
                    Assessment Flow
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
                >

                  <X size={18} />

                </button>

              </div>

              <div className="w-full lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">

                {sidebar}

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>

      {/* MAIN CONTENT */}

      <div className="relative z-10 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 max-w-[1700px] mx-auto">

        {/* DESKTOP SIDEBAR */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="hidden lg:block w-[320px] xl:w-[360px] shrink-0"
        >

          {sidebar}

        </motion.div>

        {/* PAGE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex-1 min-w-0"
        >

          {children}

        </motion.div>

      </div>

    </div>

  );

};

export default AssessmentLayout;