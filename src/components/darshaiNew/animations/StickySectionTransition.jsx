import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { MOTION } from "../../../tokens/darshaiNew/motion";
import { useResponsiveMotion } from "../../../hooks/darshaiNew/useResponsiveMotion";
export function StickySectionTransition({
  sections,
  activeIndex,
  duration = MOTION.duration.accordion, // 300ms (range 250-350ms)
  className = "",
  contentClassName = "",
}) {
  const { shouldReduceMotion } = useResponsiveMotion();
  const prefersReduced = useReducedMotion();
  const reduce = shouldReduceMotion || Boolean(prefersReduced);
  const activeSection = sections[activeIndex] || sections[0];
  if (!activeSection) {
    return null;
  }
  // Reduced motion: instant swap
  if (reduce) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className={contentClassName} key={activeSection.id}>
          {activeSection.content}
        </div>
      </div>
    );
  }
  const durationSec = duration > 1 ? duration / 1000 : duration;
  return (
    <div className={`relative w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: durationSec,
            ease: MOTION.easing.entrance,
          }}
          className={`w-full will-change-transform ${contentClassName}`}
          key={activeSection.id}
        >
          {activeSection.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default StickySectionTransition;
