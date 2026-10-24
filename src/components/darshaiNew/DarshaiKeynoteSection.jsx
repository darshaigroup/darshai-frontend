import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
export function DarshaiKeynoteSection({
  onNavigate,
  id = "darshai-keynote-moment",
}) {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  // Track scroll across the keynote sequence (320vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Background color transforms from Obsidian Black (#0A0A0B) to Deep Emerald Green (#0E4D3A)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.65, 0.78, 1],
    ["#0A0A0B", "#0A0A0B", "#0E4D3A", "#0E4D3A"],
  );
  // Beat 1: "Not a Marketplace." (0% - 25%)
  const beat1Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.22, 1],
    [1, 1, 0, 0],
  );
  const beat1Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.22, 1],
    [0, 0, -30, -30],
  );
  const beat1Scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.22, 1],
    [1, 1, 0.95, 0.95],
  );
  const beat1Display = useTransform(scrollYProgress, (v) =>
    v < 0.23 ? "flex" : "none",
  );
  // Beat 2: "Not a Directory." (25% - 50%)
  const beat2Opacity = useTransform(
    scrollYProgress,
    [0, 0.23, 0.28, 0.44, 0.49, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const beat2Y = useTransform(
    scrollYProgress,
    [0, 0.23, 0.28, 0.44, 0.49, 1],
    [30, 30, 0, 0, -30, -30],
  );
  const beat2Scale = useTransform(
    scrollYProgress,
    [0, 0.23, 0.28, 0.44, 0.49, 1],
    [0.95, 0.95, 1, 1, 0.95, 0.95],
  );
  const beat2Display = useTransform(scrollYProgress, (v) =>
    v >= 0.23 && v < 0.5 ? "flex" : "none",
  );
  // Beat 3: "Not a Booking Portal." (50% - 75%)
  const beat3Opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.55, 0.69, 0.74, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const beat3Y = useTransform(
    scrollYProgress,
    [0, 0.5, 0.55, 0.69, 0.74, 1],
    [30, 30, 0, 0, -30, -30],
  );
  const beat3Scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.55, 0.69, 0.74, 1],
    [0.95, 0.95, 1, 1, 0.95, 0.95],
  );
  const beat3Display = useTransform(scrollYProgress, (v) =>
    v >= 0.5 && v < 0.75 ? "flex" : "none",
  );
  // Beat 4 (Climax): Entire screen becomes green -> "An Intelligent Geo-Wellness Platform." (75% - 100%)
  const beat4Opacity = useTransform(
    scrollYProgress,
    [0, 0.75, 0.82, 1],
    [0, 0, 1, 1],
  );
  const beat4Y = useTransform(
    scrollYProgress,
    [0, 0.75, 0.82, 1],
    [35, 35, 0, 0],
  );
  const beat4Scale = useTransform(
    scrollYProgress,
    [0, 0.75, 0.82, 1],
    [0.96, 0.96, 1, 1],
  );
  const beat4Display = useTransform(scrollYProgress, (v) =>
    v >= 0.75 ? "flex" : "none",
  );
  return (
    <motion.section
      ref={containerRef}
      id={id}
      style={{ backgroundColor }}
      className="relative min-h-[300vh] lg:min-h-[340vh] text-white selection:bg-[#C6A660] selection:text-black overflow-hidden transition-colors duration-700"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
        <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono font-medium tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A660] animate-pulse" />
            <span>DARSHAI ADVISORY PRINCIPLE</span>
          </div>
        </header>
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 w-full max-w-5xl mx-auto text-center pointer-events-none">
          <motion.div
            style={{
              opacity: beat1Opacity,
              y: beat1Y,
              scale: beat1Scale,
              display: beat1Display,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-transform"
          >
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/40 mb-6 font-semibold">
              01 / 04
            </p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white/90 leading-[1.05] tracking-tight max-w-4xl mx-auto drop-shadow-2xl">
              Not a Marketplace.
            </h2>
          </motion.div>
          <motion.div
            style={{
              opacity: beat2Opacity,
              y: beat2Y,
              scale: beat2Scale,
              display: beat2Display,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-transform"
          >
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/40 mb-6 font-semibold">
              02 / 04
            </p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white/90 leading-[1.05] tracking-tight max-w-4xl mx-auto drop-shadow-2xl">
              Not a Directory.
            </h2>
          </motion.div>
          <motion.div
            style={{
              opacity: beat3Opacity,
              y: beat3Y,
              scale: beat3Scale,
              display: beat3Display,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-transform"
          >
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/40 mb-6 font-semibold">
              03 / 04
            </p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white/90 leading-[1.05] tracking-tight max-w-4xl mx-auto drop-shadow-2xl">
              Not a Booking Portal.
            </h2>
          </motion.div>
          <motion.div
            style={{
              opacity: beat4Opacity,
              y: beat4Y,
              scale: beat4Scale,
              display: beat4Display,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-transform pointer-events-auto"
          >
            <div className="mb-6 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#093527] border border-[#C6A660]/50 shadow-[0_0_40px_rgba(198,166,96,0.35)] flex items-center justify-center text-[#C6A660] mb-3 ring-4 ring-[#C6A660]/20">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#C6A660]" />
              </div>
              <span className="font-display text-xs sm:text-sm font-bold tracking-[0.3em] text-[#C6A660] uppercase">
                DARSHAI INTELLIGENCE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] tracking-tight max-w-4xl mx-auto drop-shadow-2xl mb-6">
              An Intelligent Geo-Wellness Platform.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
              Programs are recommended only after structured assessment and
              matching—ensuring your journey is calibrated specifically to your
              individual biology, lifestyle, and restorative goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  track("begin_journey", { source: "keynote_platform_cta" });
                  if (onNavigate) {
                    onNavigate("contact");
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C6A660] hover:bg-[#b0924e] text-black font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(198,166,96,0.4)] hover:scale-105 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>REQUEST STRUCTURED CONSULTATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
        <footer className="relative z-20 w-full max-w-xl mx-auto flex items-center justify-between gap-3 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-white/60">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white">
            DARSHAI KEYNOTE
          </span>
          <span className="text-[#C6A660]">04 / 04 PLATFORM</span>
        </footer>
      </div>
    </motion.section>
  );
}
export default DarshaiKeynoteSection;
