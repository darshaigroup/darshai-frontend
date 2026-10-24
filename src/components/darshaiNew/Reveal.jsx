import React from "react";
import { motion, useReducedMotion } from "motion/react";
const APPLE_EASE = [0.22, 1, 0.36, 1];
/**
 * Universal DARSHAI Reveal Component
 * - Standard directionals: up, left, right, none (fade)
 * - Scale variant: 0.98 → 1 combined with fade for hero/full-bleed imagery (one per page max)
 * - Pin variant: position: sticky (never JS-forced fixed) for scrollytelling without scroll hijacking
 * - Strict reduced-motion support: instant, no-transform static presentation
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  variant = "fade",
  className = "",
  distance = 24,
  duration = 0.5,
  pinHeight = "150vh",
  topOffset = "80px",
  id,
}) {
  const shouldReduceMotion = useReducedMotion();
  // Pin variant for scrollytelling without scroll hijacking
  if (variant === "pin") {
    if (shouldReduceMotion) {
      return (
        <div id={id} className={`relative ${className}`}>
          {children}
        </div>
      );
    }
    return (
      <div
        id={id}
        className={`relative ${className}`}
        style={{ minHeight: pinHeight }}
      >
        <div
          className="sticky will-change-transform"
          style={{ top: topOffset }}
        >
          {children}
        </div>
      </div>
    );
  }
  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }
  const isScale = variant === "scale" || direction === "scale";
  const getInitialTransform = () => {
    if (isScale) {
      return { opacity: 0, scale: 0.98, x: 0, y: 0 };
    }
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, x: 0 };
      case "left":
        return { opacity: 0, x: distance, y: 0 };
      case "right":
        return { opacity: 0, x: -distance, y: 0 };
      case "none":
      default:
        return { opacity: 0, x: 0, y: 0 };
    }
  };
  const getAnimateTarget = () => {
    if (isScale) {
      return { opacity: 1, scale: 1, x: 0, y: 0 };
    }
    return { opacity: 1, x: 0, y: 0 };
  };
  return (
    <motion.div
      id={id}
      initial={getInitialTransform()}
      whileInView={getAnimateTarget()}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: isScale ? Math.max(duration, 0.6) : duration,
        delay,
        ease: APPLE_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function RevealGroup({
  children,
  className = "",
  stagger = 0.06, // 60ms stagger (in 40–80ms range)
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.98 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.55,
                  ease: APPLE_EASE,
                },
              },
            }}
            className="h-full"
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
/**
 * CardReveal
 * Individual card entrance:
 * opacity: 0, translateY: 24px, scale: 0.98 -> opacity: 1, translateY: 0, scale: 1
 */
export function CardReveal({ children, className = "", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: APPLE_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export const CardRevealGroup = RevealGroup;
export default Reveal;
