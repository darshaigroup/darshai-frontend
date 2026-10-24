import React, { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
/**
 * StatCounter: animates digits counting up once when scrolled into view.
 * Uses tabular-nums Inter typography, degrades immediately under reduced motion.
 * Respects strict content freeze: strictly for existing approved copy numbers.
 */
export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 1400,
  decimals = 0,
  className = "",
  id,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(() =>
    shouldReduceMotion ? value : 0,
  );
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }
    if (!isInView) return;
    let startTime = null;
    let frameId;
    // Cubic-bezier(0.22, 1, 0.36, 1) easeOut approximation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * value;
      setDisplayValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration, shouldReduceMotion]);
  const formattedNumber =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toString();
  return (
    <span
      ref={ref}
      id={id}
      className={`inline-flex items-baseline tabular-nums ${className}`.trim()}
    >
      {prefix && <span className="select-none mr-0.5">{prefix}</span>}
      <span className="font-semibold tracking-tight">{formattedNumber}</span>
      {suffix && <span className="select-none ml-0.5">{suffix}</span>}
      {label && <span className="ml-1.5">{label}</span>}
    </span>
  );
}
export default StatCounter;
