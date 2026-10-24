import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";
/**
 * useCursorHighlight hook: provides coordinates for restrained pointer-following highlight
 * strictly on desktop fine pointers. Capped and throttled via requestAnimationFrame.
 * Completely inert on touch and reduced motion.
 */
export function useCursorHighlight() {
  const elementRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
    active: false,
    isFinePointer: false,
  });
  const rafId = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fine = window.matchMedia("(pointer: fine)").matches;
      setCoords((prev) => ({ ...prev, isFinePointer: fine }));
    }
  }, []);
  const onPointerMove = useCallback(
    (e) => {
      if (shouldReduceMotion || !coords.isFinePointer) return;
      const el = elementRef.current;
      if (!el) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        setCoords((prev) => ({
          ...prev,
          x: clientX - rect.left,
          y: clientY - rect.top,
          active: true,
        }));
      });
    },
    [shouldReduceMotion, coords.isFinePointer],
  );
  const onPointerLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setCoords((prev) => ({ ...prev, active: false }));
  }, []);
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);
  return {
    ref: elementRef,
    onPointerMove,
    onPointerLeave,
    coords,
    shouldShow: coords.active && coords.isFinePointer && !shouldReduceMotion,
  };
}
export default useCursorHighlight;
