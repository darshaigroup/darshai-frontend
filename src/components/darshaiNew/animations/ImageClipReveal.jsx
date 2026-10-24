import React from "react";
import { motion, useReducedMotion } from "motion/react";
const APPLE_EASE = [0.22, 1, 0.36, 1];
export function ImageClipReveal({
  children,
  className = "",
  duration = 0.75,
  delay = 0,
  direction = "top-to-bottom",
  scaleStart = 1.05,
  disabled = false,
}) {
  const shouldReduceMotion = useReducedMotion();
  if (disabled || shouldReduceMotion) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }
  const getInitialClip = () => {
    switch (direction) {
      case "bottom-to-top":
        return "inset(100% 0% 0% 0%)";
      case "left-to-right":
        return "inset(0% 100% 0% 0%)";
      case "top-to-bottom":
      default:
        return "inset(0% 0% 100% 0%)";
    }
  };
  return (
    <motion.div
      initial={{
        clipPath: getInitialClip(),
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
      }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{
        duration,
        delay,
        ease: APPLE_EASE,
      }}
      className={`overflow-hidden will-change-[clip-path] ${className}`}
    >
      <motion.div
        initial={{ scale: scaleStart }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{
          duration: duration + 0.08,
          delay,
          ease: APPLE_EASE,
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
export default ImageClipReveal;
