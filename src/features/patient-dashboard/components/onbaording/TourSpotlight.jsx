import { motion } from "motion/react";

export default function TourSpotlight({
  target,
}) {
  if (!target) return null;

  const rect = target.getBoundingClientRect();

  return (
    <motion.div
      layout
      transition={{ duration: .35 }}
      className="pointer-events-none fixed z-[991] rounded-[28px] border-2 border-emerald-400 shadow-[0_0_0_9999px_rgba(2,6,23,.72),0_0_35px_rgba(16,185,129,.45)]"
      style={{
        top: rect.top - 10,
        left: rect.left - 10,
        width: rect.width + 20,
        height: rect.height + 20,
      }}
    >
      <div className="absolute -inset-1 rounded-[30px] border border-emerald-300 animate-pulse" />
    </motion.div>
  );
}