import React from "react";
import { motion } from "motion/react";
export function ScrollCue({ targetId = "why-darshai-section" }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col items-center gap-2 select-none motion-reduce:hidden">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll to discover"
        className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full p-1"
      >
        <div className="w-5 h-9 rounded-full border border-white/40 flex items-start justify-center p-1 group-hover:border-white transition-colors">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0.9, 0.2, 0.9],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 rounded-full bg-white"
          />
        </div>
      </button>
    </div>
  );
}
export default ScrollCue;
