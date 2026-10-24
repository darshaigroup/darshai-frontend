import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import SmartImage from "./SmartImage";
/**
 * EnvironmentalImage
 * Large media-led environmental storytelling image with subtle camera-like motion:
 * - Scale: 1.00 -> 1.04
 * - Pan: translateX: -1% -> +1%
 * - Feels like a real camera, never a slideshow
 * - Uses mask/clip entrance on view
 * - Respects prefers-reduced-motion
 */
export function EnvironmentalImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  containerClassName = "relative overflow-hidden",
  movement = "camera-both",
  priority = false,
  aspectRatio,
  children,
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll(
    containerRef.current
      ? {
          target: containerRef,
          offset: ["start end", "end start"],
        }
      : {
          offset: ["start end", "end start"],
        },
  );
  // Apple-style extremely subtle camera motion: scale 1.00 -> 1.04, translateX -1% -> +1%
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.04]);
  const translateX = useTransform(scrollYProgress, [0, 1], ["-1%", "1%"]);
  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        className={`${containerClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <SmartImage
          src={src}
          alt={alt}
          priority={priority}
          clipReveal={false}
          className={className}
        />
        {children}
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className={`overflow-hidden will-change-transform ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <motion.div
        style={{
          scale:
            movement === "camera-scale" || movement === "camera-both"
              ? scale
              : 1.0,
          x:
            movement === "camera-pan" || movement === "camera-both"
              ? translateX
              : 0,
        }}
        className="w-full h-full will-change-transform origin-center"
      >
        <SmartImage
          src={src}
          alt={alt}
          priority={priority}
          className={className}
        />
      </motion.div>
      {children}
    </div>
  );
}
export default EnvironmentalImage;
