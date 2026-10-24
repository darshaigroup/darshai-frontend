import { useState, useEffect } from "react";
import { useScroll, useInView, } from "motion/react";
/**
 * Scroll Progress Hook (L4: Scroll Choreography)
 *
 * Tracks scroll progress (0 → 1) of a target container using motion/react's useScroll
 * and detects viewport entry/exit with useInView.
 */
export function useScrollProgress(targetRef, offset = ["start end", "end start"]) {
    const { scrollYProgress } = useScroll(targetRef.current
        ? {
            target: targetRef,
            offset: offset,
        }
        : {
            offset: offset,
        });
    const isInView = useInView(targetRef, {
        margin: "-5% 0px",
    });
    const [progressNumber, setProgressNumber] = useState(() => {
        try {
            return scrollYProgress.get() || 0;
        }
        catch {
            return 0;
        }
    });
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setProgressNumber(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);
    return {
        progress: scrollYProgress,
        progressNumber,
        isInView,
    };
}
export default useScrollProgress;
