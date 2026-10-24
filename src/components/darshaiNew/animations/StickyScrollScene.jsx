import React, { useRef } from "react";
import { useScroll, useReducedMotion } from "motion/react";
import { useResponsiveMotion } from "../../../hooks/darshaiNew/useResponsiveMotion";
export function StickyScrollScene({
  children,
  triggerElement,
  progress: externalProgress,
  height = "160vh",
  pinHeight = "100vh",
  topOffset = "0px",
  className = "",
  innerClassName = "",
  id,
}) {
  const internalRef = useRef(null);
  const containerRef = triggerElement || internalRef;
  const { shouldReduceMotion } = useResponsiveMotion();
  const prefersReduced = useReducedMotion();
  const reduce = shouldReduceMotion || Boolean(prefersReduced);
  // Compute scroll progress if not supplied externally
  const { scrollYProgress } = useScroll(
    containerRef.current
      ? {
          target: containerRef,
          offset: ["start start", "end end"],
        }
      : {
          offset: ["start start", "end end"],
        },
  );
  const activeMotionProgress =
    typeof externalProgress === "object" && "get" in externalProgress
      ? externalProgress
      : scrollYProgress;
  const [currentProgressNum, setCurrentProgressNum] = React.useState(() => {
    if (typeof externalProgress === "number") return externalProgress;
    try {
      return activeMotionProgress.get() || 0;
    } catch {
      return 0;
    }
  });
  React.useEffect(() => {
    if (typeof externalProgress === "number") {
      setCurrentProgressNum(externalProgress);
      return;
    }
    const unsubscribe = activeMotionProgress.on("change", (latest) => {
      setCurrentProgressNum(latest);
    });
    return () => unsubscribe();
  }, [activeMotionProgress, externalProgress]);
  // Reduced motion: unpinned, static layout
  if (reduce) {
    return (
      <div id={id} ref={internalRef} className={`relative w-full ${className}`}>
        <div className={`w-full ${innerClassName}`}>
          {typeof children === "function"
            ? children({ progress: 1, motionProgress: activeMotionProgress })
            : children}
        </div>
      </div>
    );
  }
  return (
    <div
      id={id}
      ref={internalRef}
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <div
        className={`sticky overflow-hidden will-change-transform ${innerClassName}`}
        style={{
          top: topOffset,
          height: pinHeight,
        }}
      >
        {typeof children === "function"
          ? children({
              progress: currentProgressNum,
              motionProgress: activeMotionProgress,
            })
          : children}
      </div>
    </div>
  );
}
export default StickyScrollScene;
