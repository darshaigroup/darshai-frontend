import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useResponsiveMotion } from "../../../hooks/darshaiNew/useResponsiveMotion";
export function PageTransition({
  children,
  page,
  duration = 0.25,
  className = "",
}) {
  const { shouldReduceMotion } = useResponsiveMotion();
  const prefersReduced = useReducedMotion();
  const reduce = shouldReduceMotion || Boolean(prefersReduced);
  if (reduce) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }
  const durationSec =
    typeof duration === "number" && duration > 1 ? duration / 1000 : duration;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: durationSec,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full ${className}`}
      key={page}
    >
      {children}
    </motion.div>
  );
}
export default PageTransition;
