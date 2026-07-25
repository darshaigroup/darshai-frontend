import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, onClose, activePatient, onLogout }) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          />

          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <Sidebar
              idPrefix="mobile-sidebar"
              activePatient={activePatient}
              onLogout={() => {
                onClose();
                onLogout?.();
              }}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}