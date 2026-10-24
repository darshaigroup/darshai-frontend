import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useResponsiveMotion } from "../../../hooks/darshaiNew/useResponsiveMotion";
export function ScrollProgress({
  targetElement,
  progress: externalProgress,
  label,
  orientation = "horizontal",
  styleVariant = "line",
  thickness = 3,
  color = "#0E4D3A",
  trackColor = "rgba(14, 77, 58, 0.12)",
  showDot = false,
  className = "",
}) {
  const { shouldReduceMotion } = useResponsiveMotion();
  const prefersReduced = useReducedMotion();
  const reduce = shouldReduceMotion || Boolean(prefersReduced);
  const { scrollYProgress: defaultScrollProgress } = useScroll(
    targetElement
      ? {
          target: targetElement,
          offset: ["start end", "end end"],
        }
      : {},
  );
  const activeProgress = externalProgress || defaultScrollProgress;
  const scaleX = activeProgress;
  const scaleY = activeProgress;
  // Dot position transforms
  const dotLeft = useTransform(activeProgress, [0, 1], ["0%", "100%"]);
  const dotTop = useTransform(activeProgress, [0, 1], ["0%", "100%"]);
  if (reduce) {
    // Hidden on reduced motion per specification
    return null;
  }
  const isHorizontal = orientation === "horizontal";
  return (
    <div
      className={`flex ${isHorizontal ? "flex-col w-full" : "flex-row h-full items-center"} ${className}`}
      role="progressbar"
      aria-label={label || "Section scroll progress"}
    >
      {label && (
        <div
          className={`text-[11px] font-mono tracking-widest uppercase text-stone-500 mb-1.5 ${!isHorizontal ? "writing-vertical mr-2" : ""}`}
        >
          {label}
        </div>
      )}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: isHorizontal ? "100%" : `${thickness}px`,
          height: isHorizontal ? `${thickness}px` : "100%",
          backgroundColor: trackColor,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: color,
            originX: 0,
            originY: 0,
            ...(isHorizontal ? { scaleX } : { scaleY }),
          }}
        />
        {showDot && (
          <motion.div
            className="absolute rounded-full shadow-sm"
            style={{
              width: `${thickness * 2.5}px`,
              height: `${thickness * 2.5}px`,
              backgroundColor: color,
              top: isHorizontal ? "50%" : dotTop,
              left: isHorizontal ? dotLeft : "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
      {styleVariant === "dotted" && (
        <div
          className={`flex justify-between mt-1 ${isHorizontal ? "w-full" : "flex-col h-full ml-1"}`}
        >
          {[0, 25, 50, 75, 100].map((pct) => (
            <span
              className="w-1 h-1 rounded-full bg-stone-300 inline-block"
              key={pct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default ScrollProgress;
