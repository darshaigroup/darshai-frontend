import { AnimatePresence, motion } from "motion/react";

export default function TourOverlay({
  open,
  target,
}) {
  if (!open || !target) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: .72 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[990] bg-slate-950 backdrop-blur-[3px]"
      />
    </AnimatePresence>
  );
} 