import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { track } from "../../lib/darshaiNew/analytics";
export function CorporateChallengeSection({ onNavigate }) {
  const sectionRef = useRef(null);
  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Dynamic story stage label for bottom control bar
  const [currentStage, setCurrentStage] = useState("01 Challenge");
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.22) setCurrentStage("01 Challenge");
      else if (latest < 0.45) setCurrentStage("02 Recovery");
      else if (latest < 0.72) setCurrentStage("03 Environment");
      else setCurrentStage("04 DARSHAI Solution");
    });
  }, [scrollYProgress]);

  const perfOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.14, 0.22, 0.34],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1.0, 1.0, 0.28],
  );
  const perfY = useTransform(
    scrollYProgress,
    [0.06, 0.14],
    prefersReducedMotion ? [0, 0] : [12, 0],
  );
  // 2. Recovery statement:
  // Enters around 0.20, dominates 0.25–0.70 at 1.0 opacity, softens at 0.75+ when DARSHAI statement appears
  const recoveryOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.32, 0.72, 0.82],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1.0, 1.0, 0.3],
  );
  const recoveryY = useTransform(
    scrollYProgress,
    [0.2, 0.32],
    prefersReducedMotion ? [0, 0] : [18, 0],
  );
  // Supporting pressure explanation:
  const supportOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.72, 0.82],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1.0, 1.0, 0.28],
  );
  const supportY = useTransform(
    scrollYProgress,
    [0.36, 0.48],
    prefersReducedMotion ? [0, 0] : [14, 0],
  );
  // 3. Visual transformation: Pressure → Recovery (45% to 65%)
  const workOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.65],
    prefersReducedMotion ? [1, 0] : [1, 0],
  );
  const workScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65],
    prefersReducedMotion ? [1, 1, 1] : [1.02, 1.0, 1.03],
  );
  const workTranslateY = useTransform(
    scrollYProgress,
    [0, 0.65],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-1.5%"],
  );
  // Nature (Recovery) Image: reveals 0.45 → 0.65, dominates 0.65 → 1.0
  const natureOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.65],
    prefersReducedMotion ? [0, 1] : [0, 1],
  );
  const natureScale = useTransform(
    scrollYProgress,
    [0.45, 0.65, 0.85, 1.0],
    prefersReducedMotion ? [1, 1, 1, 1] : [1.05, 1.0, 1.02, 1.04],
  );
  const natureTranslateY = useTransform(
    scrollYProgress,
    [0.45, 0.85, 1.0],
    prefersReducedMotion ? ["0%", "0%", "0%"] : ["1.5%", "0%", "-1%"],
  );
  // 4. DARSHAI statement appears (0.72 – 0.86)
  const solutionOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.84],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const solutionY = useTransform(
    scrollYProgress,
    [0.72, 0.84],
    prefersReducedMotion ? [0, 0] : [16, 0],
  );
  return (
    <section
      ref={sectionRef}
      id="why-corporate-needs-to-evolve"
      className="relative bg-white border-t border-[#E5E5EA] h-[280vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-white z-10">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 flex-1 flex flex-col justify-center py-3 sm:py-4 lg:py-5 min-h-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-14 w-full flex-1 min-h-0">
            <div className="w-full lg:w-[40%] xl:w-[38%] 2xl:w-[36%] flex flex-col justify-center min-w-0 pr-0 lg:pr-6 xl:pr-8 order-2 lg:order-1">
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#0E4D3A] uppercase mb-2 sm:mb-2.5">
                THE CHALLENGE
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-[56px] xl:text-[66px] 2xl:text-[72px] font-bold text-[#111111] leading-[1.05] tracking-tight mb-2 sm:mb-3 max-w-xl">
                <span className="block">Performance Depends</span>
                <span className="block">On Recovery.</span>
              </h2>
              <motion.p
                style={{ opacity: perfOpacity, y: perfY }}
                className="font-display text-base sm:text-xl lg:text-2xl xl:text-[26px] font-normal text-[#111111] leading-snug tracking-tight my-2 sm:my-3 transition-opacity duration-300"
              >
                Modern organizations invest heavily in performance.
              </motion.p>
              <motion.p
                style={{ opacity: recoveryOpacity, y: recoveryY }}
                className="font-display text-base sm:text-xl lg:text-2xl xl:text-[26px] font-normal text-[#111111] leading-snug tracking-tight my-2 sm:my-3 transition-opacity duration-300"
              >
                Far fewer invest systematically in recovery, resilience and
                long-term human sustainability.
              </motion.p>
              <motion.p
                style={{ opacity: supportOpacity, y: supportY }}
                className="font-display text-base sm:text-xl lg:text-2xl xl:text-[26px] font-normal text-[#111111] leading-snug tracking-tight my-2 sm:my-3 transition-opacity duration-300"
              >
                Leadership roles operate under continuous pressure, decision
                fatigue and performance demands.
              </motion.p>
              <motion.p
                style={{ opacity: solutionOpacity, y: solutionY }}
                className="font-display text-base sm:text-xl lg:text-2xl xl:text-[26px] font-normal text-[#111111] leading-snug tracking-tight my-2 sm:my-3 transition-opacity duration-300"
              >
                <span className="text-[#0E4D3A] font-extrabold tracking-normal">
                  DARSHAI
                </span>{" "}
                helps organizations address these realities through structured
                wellness journeys and supportive environments.
              </motion.p>
            </div>
            <div className="w-full lg:w-[60%] xl:w-[62%] 2xl:w-[64%] flex items-center justify-center lg:justify-end min-w-0 order-1 lg:order-2">
              <div className="relative w-full lg:w-[56vw] xl:w-[58vw] 2xl:w-[60vw] max-w-[1180px] h-[26vh] sm:h-[34vh] md:h-[42vh] lg:h-[72vh] xl:h-[76vh] 2xl:h-[78vh] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] overflow-hidden bg-[#18181A] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] border border-black/5">
                <motion.div
                  style={{
                    opacity: workOpacity,
                    scale: workScale,
                    y: workTranslateY,
                  }}
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=85"
                    alt="High-pressure corporate work environment"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                </motion.div>
                <motion.div
                  style={{
                    opacity: natureOpacity,
                    scale: natureScale,
                    y: natureTranslateY,
                  }}
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85"
                    alt="Calm restorative recovery landscape"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-3 pb-3 sm:pb-4 border-t border-[#E5E5EA] max-w-[1780px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 shrink-0">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#111112] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              <span>DARSHAI</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6E6E73]">
              <span className="w-2 h-2 rounded-full bg-[#0E4D3A] animate-pulse" />
              <span className="uppercase tracking-wider font-semibold text-[#111111]">
                {currentStage}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                track("begin_journey", { source: "corporate_challenge" });
                onNavigate("contact");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#0E4D3A] hover:text-[#0A382A] uppercase cursor-pointer transition-colors group"
            >
              <span>BEGIN YOUR JOURNEY</span>
              <span
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CorporateChallengeSection;
