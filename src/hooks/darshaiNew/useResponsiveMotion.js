import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";
/**
 * Responsive Motion Hook
 *
 * Provides responsive breakpoints & respects user preference for reduced motion.
 * Used across DARSHAI animation layers to disable high-overhead scroll-driven
 * scenes on mobile devices and prevent vestibular discomfort when prefers-reduced-motion is active.
 */
export function useResponsiveMotion() {
    const prefersReduced = useReducedMotion();
    const [dimensions, setDimensions] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
    });
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const handleResize = () => {
            setDimensions({ width: window.innerWidth });
        };
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const isMobile = dimensions.width < 768;
    const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
    const isDesktop = dimensions.width >= 1024;
    return {
        isMobile,
        isTablet,
        isDesktop,
        shouldReduceMotion: Boolean(prefersReduced),
    };
}
export default useResponsiveMotion;
