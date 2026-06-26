import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar({
  open,
  onClose,
  currentTab,
  setCurrentTab,
  activePatient,
  onLogout,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 lg:hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sidebar */}
            <Sidebar
              currentTab={currentTab}
              activePatient={activePatient}
              onLogout={() => {
                onClose();
                onLogout?.();
              }}
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                onClose();
              }}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}