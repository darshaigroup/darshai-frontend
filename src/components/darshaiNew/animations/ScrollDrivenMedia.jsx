import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useResponsiveMotion } from "../../../hooks/darshaiNew/useResponsiveMotion";
export function ScrollDrivenMedia({
  src,
  alt,
  secondarySrc,
  secondaryAlt = "",
  progress: externalProgress,
  mediaType = "scale",
  slideDirection = "y",
  slideDistance = 40,
  clipDirection = "horizontal",
  duration,
  className = "",
  imageClassName = "w-full h-full object-cover",
  aspectRatio,
  triggerRef,
}) {
  const localContainerRef = useRef(null);
  const targetRef = triggerRef || localContainerRef;
  const { shouldReduceMotion } = useResponsiveMotion();
  const prefersReduced = useReducedMotion();
  const reduce = shouldReduceMotion || Boolean(prefersReduced);
  const { scrollYProgress: defaultScrollProgress } = useScroll(
    targetRef.current !== null
      ? {
          target: { current: targetRef.current },
          offset: ["start end", "end start"],
        }
      : {
          offset: ["start end", "end start"],
        },
  );
  // Normalize progress to MotionValue
  const isExternalMotionValue =
    typeof externalProgress === "object" &&
    externalProgress !== null &&
    "get" in externalProgress;
  const activeProgress = isExternalMotionValue
    ? externalProgress
    : defaultScrollProgress;
  // Subtle camera scale: 1.00 -> 1.04
  const scaleValue = useTransform(activeProgress, [0, 1], [1.0, 1.04]);
  // Subtle camera slide/pan: -1% -> +1% or custom offset
  const slideValue = useTransform(
    activeProgress,
    [0, 1],
    [-slideDistance, slideDistance],
  );
  const panPercentValue = useTransform(activeProgress, [0, 1], ["-1%", "1%"]);
  // Crossfade: opacity 1 -> 0 for primary, 0 -> 1 for secondary
  const primaryOpacity = useTransform(activeProgress, [0.35, 0.65], [1, 0]);
  const secondaryOpacity = useTransform(activeProgress, [0.35, 0.65], [0, 1]);
  // Clip: 0% -> 100% reveal
  const clipPercent = useTransform(activeProgress, [0, 1], [100, 0]);
  const clipPathStyle = useTransform(clipPercent, (val) => {
    if (clipDirection === "vertical") {
      return `inset(${val}% 0% 0% 0%)`;
    }
    return `inset(0% ${val}% 0% 0%)`;
  });
  const durationStyle = duration
    ? { height: typeof duration === "number" ? `${duration}vh` : duration }
    : {};
  if (reduce) {
    return (
      <div
        ref={localContainerRef}
        className={`relative overflow-hidden ${className}`}
        style={{ ...durationStyle, ...(aspectRatio ? { aspectRatio } : {}) }}
      >
        <img src={src} alt={alt} className={imageClassName} loading="lazy" />
      </div>
    );
  }
  return (
    <div
      ref={localContainerRef}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{ ...durationStyle, ...(aspectRatio ? { aspectRatio } : {}) }}
    >
      {mediaType === "scale" && (
        <motion.div
          style={{ scale: scaleValue }}
          className="w-full h-full origin-center"
        >
          <img src={src} alt={alt} className={imageClassName} loading="lazy" />
        </motion.div>
      )}
      {mediaType === "slide" && (
        <motion.div
          style={{
            x: slideDirection === "x" ? panPercentValue : 0,
            y: slideDirection === "y" ? slideValue : 0,
          }}
          className="w-full h-full origin-center"
        >
          <img src={src} alt={alt} className={imageClassName} loading="lazy" />
        </motion.div>
      )}
      {mediaType === "clip" && (
        <motion.div
          style={{ clipPath: clipPathStyle }}
          className="w-full h-full"
        >
          <img src={src} alt={alt} className={imageClassName} loading="lazy" />
        </motion.div>
      )}
      {mediaType === "crossfade" && (
        <div className="relative w-full h-full">
          <motion.img
            src={src}
            alt={alt}
            style={{ opacity: primaryOpacity }}
            className={`absolute inset-0 ${imageClassName}`}
            loading="lazy"
          />
          {secondarySrc && (
            <motion.img
              src={secondarySrc}
              alt={secondaryAlt}
              style={{ opacity: secondaryOpacity }}
              className={`absolute inset-0 ${imageClassName}`}
              loading="lazy"
            />
          )}
        </div>
      )}
    </div>
  );
}
export default ScrollDrivenMedia;
