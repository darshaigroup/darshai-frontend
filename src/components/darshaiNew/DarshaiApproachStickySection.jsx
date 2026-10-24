import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
const PARAGRAPHS = [
  {
    id: "p1",
    primary: "Not every wellness experience serves the same purpose.",
    secondary: "Some individuals seek recovery.",
  },
  {
    id: "p2",
    primary:
      "Others seek metabolic restoration, longevity support, resilience or preventative wellness.",
    secondary: "",
  },
  {
    id: "p3",
    primary:
      "DARSHAI organizes these objectives into structured Geo-Wellness protocols.",
    secondary: "",
  },
];
export function DarshaiApproachStickySection({ id = "why-programs-exist" }) {
  const [containerEl, setContainerEl] = useState(null);
  const containerRef = useCallback((node) => {
    if (node !== null) setContainerEl(node);
  }, []);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll(
    containerEl
      ? { target: { current: containerEl }, offset: ["start start", "end end"] }
      : { offset: ["start start", "end end"] },
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.25, 0.33],
    prefersReducedMotion ? [1, 1, 1, 0] : [0, 1, 1, 0],
  );
  const y1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.25, 0.33],
    prefersReducedMotion ? [0, 0, 0, 0] : [35, 0, 0, -35],
  );
  const blur1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.25, 0.33],
    prefersReducedMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"],
  );
  // Paragraph 2 transforms
  const opacity2 = useTransform(
    scrollYProgress,
    [0.33, 0.41, 0.58, 0.66],
    prefersReducedMotion ? [0, 1, 1, 0] : [0, 1, 1, 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.33, 0.41, 0.58, 0.66],
    prefersReducedMotion ? [0, 0, 0, 0] : [35, 0, 0, -35],
  );
  const blur2 = useTransform(
    scrollYProgress,
    [0.33, 0.41, 0.58, 0.66],
    prefersReducedMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"],
  );
  // Paragraph 3 transforms
  const opacity3 = useTransform(
    scrollYProgress,
    [0.66, 0.74, 0.95, 1.0],
    prefersReducedMotion ? [0, 1, 1, 1] : [0, 1, 1, 1],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.66, 0.74, 0.95, 1.0],
    prefersReducedMotion ? [0, 0, 0, 0] : [35, 0, 0, 0],
  );
  const blur3 = useTransform(
    scrollYProgress,
    [0.66, 0.74, 0.95, 1.0],
    prefersReducedMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(4px)", "blur(0px)", "blur(0px)", "blur(0px)"],
  );
  // Right side sticky image subtle scale parallax
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.0, 1.06],
  );
  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[260vh] lg:min-h-[300vh] bg-[#F5F5F7] border-b border-[#D2D2D7] scroll-mt-12"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between lg:justify-center py-4 sm:py-8 lg:py-16 overflow-y-auto lg:overflow-hidden scrollbar-none">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
              <div className="mb-8 sm:mb-12 lg:mb-14 max-w-2xl">
                <p className="typography-eyebrow text-[#0E4D3A] mb-2 sm:mb-3">
                  THE DARSHAI APPROACH
                </p>
                <h2 className="typography-section-h2 text-[#1D1D1F] leading-[1.08] tracking-tight">
                  <span>Different Goals Require </span>
                  <span className="text-[#0E4D3A]">Different Journeys.</span>
                </h2>
              </div>
              <div className="relative min-h-[140px] sm:min-h-[180px] md:min-h-[200px] flex items-center">
                <motion.div
                  style={{
                    opacity: opacity1,
                    y: y1,
                    filter: blur1,
                  }}
                  className="absolute inset-x-0 top-0 sm:top-2 flex flex-col justify-center space-y-2"
                >
                  <p className="text-lg sm:text-2xl lg:text-3xl font-medium text-[#1D1D1F] leading-snug tracking-tight">
                    {PARAGRAPHS[0].primary}
                  </p>
                  {PARAGRAPHS[0].secondary && (
                    <p className="text-base sm:text-lg lg:text-xl text-[#1D1D1F] font-normal leading-relaxed">
                      {PARAGRAPHS[0].secondary}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  style={{
                    opacity: opacity2,
                    y: y2,
                    filter: blur2,
                  }}
                  className="absolute inset-x-0 top-0 sm:top-2 flex flex-col justify-center space-y-2"
                >
                  <p className="text-lg sm:text-2xl lg:text-3xl font-medium text-[#1D1D1F] leading-snug tracking-tight">
                    {PARAGRAPHS[1].primary}
                  </p>
                  {PARAGRAPHS[1].secondary && (
                    <p className="text-base sm:text-lg lg:text-xl text-[#1D1D1F] font-normal leading-relaxed">
                      {PARAGRAPHS[1].secondary}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  style={{
                    opacity: opacity3,
                    y: y3,
                    filter: blur3,
                  }}
                  className="absolute inset-x-0 top-0 sm:top-2 flex flex-col justify-center space-y-2"
                >
                  <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-[#1D1D1F] leading-snug tracking-tight">
                    {PARAGRAPHS[2].primary}
                  </p>
                  {PARAGRAPHS[2].secondary && (
                    <p className="text-base sm:text-lg lg:text-xl text-[#1D1D1F] font-normal leading-relaxed">
                      {PARAGRAPHS[2].secondary}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative rounded-[20px] sm:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#1D1D1F] aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/4.5] apple-product-card shadow-xl">
                <motion.div
                  style={{ scale: imageScale }}
                  className="w-full h-full will-change-transform"
                >
                  <SmartImage
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=1200&fit=crop&auto=format"
                    alt="Restorative Geo-Wellness consultation and natural sanctuary environment"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between z-10 pointer-events-none">
                  <SignalBadge variant="dark" dot>
                    Precision Environment
                  </SignalBadge>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#C6A660] bg-black/60 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/15">
                    Geo-Wellness Alignment
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7 text-white pointer-events-none z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#34D399]">
                      Targeted Environmental Selection
                    </p>
                    <p className="typography-body text-xs sm:text-sm text-white/95 leading-snug">
                      Integrating clinical assessment with natural geographic
                      sanctuaries across India.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DarshaiApproachStickySection;
