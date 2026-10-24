import React from "react";
import { motion, useScroll } from "motion/react";
export function ScrollProgress({ orientation = "horizontal", className = "" }) {
  const { scrollYProgress } = useScroll();
  if (orientation === "vertical") {
    return (
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className={`fixed top-0 right-0 w-1 bg-[#0E4D3A] origin-top z-50 pointer-events-none ${className}`}
      />
    );
  }
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0E4D3A] via-[#C6A660] to-[#0E4D3A] origin-left z-50 pointer-events-none ${className}`}
    />
  );
}
export default ScrollProgress;
