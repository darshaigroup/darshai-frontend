import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { track } from "../../lib/darshaiNew/analytics";
export function AboutPurposeSection({ onNavigate }) {
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

  const [currentStage, setCurrentStage] = useState("01 Purpose");
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.22) setCurrentStage("01 Purpose");
      else if (latest < 0.45) setCurrentStage("02 Individual");
      else if (latest < 0.72) setCurrentStage("03 Context & Environment");
      else setCurrentStage("04 DARSHAI Matching");
    });
  }, [scrollYProgress]);
 
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.34],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.4, 1.0, 1.0, 0.28],
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.08],
    prefersReducedMotion ? [0, 0] : [16, 0],
  );
  
  const firstSentenceOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.14, 0.22, 0.34],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1.0, 1.0, 0.28],
  );
  const firstSentenceY = useTransform(
    scrollYProgress,
    [0.06, 0.14],
    prefersReducedMotion ? [0, 0] : [12, 0],
  );
  const dominantOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.32, 0.72, 0.82],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1.0, 1.0, 0.3],
  );
  const dominantY = useTransform(
    scrollYProgress,
    [0.2, 0.32],
    prefersReducedMotion ? [0, 0] : [18, 0],
  );
  // 3. Visual Transformation: Generic Wellness Search → Curated Microclimate Sanctuary (45% to 65%)
  const genericOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.65],
    prefersReducedMotion ? [1, 0] : [1, 0],
  );
  const genericScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65],
    prefersReducedMotion ? [1, 1, 1] : [1.02, 1.0, 1.03],
  );
  const genericTranslateY = useTransform(
    scrollYProgress,
    [0, 0.65],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-1.5%"],
  );
  // Nature / Curated Sanctuary Image: reveals 0.45 → 0.65, dominates 0.65 → 1.0
  const sanctuaryOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.65],
    prefersReducedMotion ? [0, 1] : [0, 1],
  );
  const sanctuaryScale = useTransform(
    scrollYProgress,
    [0.45, 0.65, 0.85, 1.0],
    prefersReducedMotion ? [1, 1, 1, 1] : [1.05, 1.0, 1.02, 1.04],
  );
  const sanctuaryTranslateY = useTransform(
    scrollYProgress,
    [0.45, 0.85, 1.0],
    prefersReducedMotion ? ["0%", "0%", "0%"] : ["1.5%", "0%", "-1%"],
  );
  // 4. DARSHAI Solution Statement Appears (0.72 – 0.86)
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
      id="our-purpose"
      className="relative bg-white border-t border-[#E5E5EA] h-[280vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-white z-10">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 flex-1 flex flex-col justify-center py-3 sm:py-4 lg:py-5 min-h-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 xl:gap-14 w-full flex-1 min-h-0">
            <div className="w-full lg:w-[42%] xl:w-[40%] 2xl:w-[38%] flex flex-col justify-center min-w-0 pr-0 lg:pr-6 xl:pr-8 order-2 lg:order-1">
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#0E4D3A] uppercase mb-2 sm:mb-2.5">
                OUR PURPOSE
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-[50px] xl:text-[58px] 2xl:text-[64px] font-bold text-[#111111] leading-[1.06] tracking-tight mb-2 sm:mb-3 max-w-xl">
                <span className="block">Finding Wellness Is Easy.</span>
                <span className="block text-[#0E4D3A]">
                  Finding What Fits You Is Hard.
                </span>
              </h2>
              <motion.p
                style={{ opacity: firstSentenceOpacity, y: firstSentenceY }}
                className="text-[#3A3A3C] font-light text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed my-1 sm:my-2 tracking-normal transition-opacity duration-300"
              >
                Wellness choices are often shaped by availability, popularity or
                marketing.
              </motion.p>
              <motion.div
                style={{ opacity: dominantOpacity, y: dominantY }}
                className="my-1.5 sm:my-3 transition-opacity duration-300"
              >
                <p className="font-display text-base sm:text-xl lg:text-[28px] xl:text-[32px] 2xl:text-[34px] font-light text-[#111111] leading-[1.2] tracking-tight">
                  Personalized outcomes require synthesizing biology, geography,
                  and environmental intelligence rather than one-size-fits-all
                  regimens.
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: solutionOpacity, y: solutionY }}
                className="mt-2 sm:mt-3 pt-0.5 transition-opacity duration-300"
              >
                <p className="font-display text-sm sm:text-lg lg:text-[22px] xl:text-[24px] font-light text-[#111111] leading-snug tracking-tight">
                  <span className="text-[#0E4D3A] font-normal tracking-normal">
                    DARSHAI
                  </span>{" "}
                  connects individual context, environmental intelligence,
                  wellness programmes and curated centres into one continuous
                  journey.
                </p>
              </motion.div>
            </div>
            <div className="w-full lg:w-[58%] xl:w-[60%] 2xl:w-[62%] flex items-center justify-center lg:justify-end min-w-0 order-1 lg:order-2">
              <div className="relative w-full lg:w-[54vw] xl:w-[56vw] 2xl:w-[58vw] max-w-[1180px] h-[26vh] sm:h-[34vh] md:h-[42vh] lg:h-[72vh] xl:h-[76vh] 2xl:h-[78vh] rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] overflow-hidden bg-[#18181A] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] border border-black/5">
                <motion.div
                  style={{
                    opacity: genericOpacity,
                    scale: genericScale,
                    y: genericTranslateY,
                  }}
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=85"
                    alt="Generic wellness choices and search"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                    <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white">
                      <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-white/70">
                        Challenge
                      </p>
                      <p className="text-xs sm:text-sm font-medium">
                        Standardized Routines & Marketing Noise
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  style={{
                    opacity: sanctuaryOpacity,
                    scale: sanctuaryScale,
                    y: sanctuaryTranslateY,
                  }}
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85"
                    alt="Calm restorative Geo-Wellness sanctuary"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                    <div className="backdrop-blur-md bg-[#0E4D3A]/80 border border-white/20 rounded-xl px-4 py-2 text-white">
                      <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-emerald-200">
                        The DARSHAI Standard
                      </p>
                      <p className="text-xs sm:text-sm font-medium">
                        Personalized Resonance & Environmental Alignment
                      </p>
                    </div>
                  </div>
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
                track("purpose_cta_click", { source: "about_purpose" });
                onNavigate("assessment");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#0E4D3A] hover:text-[#0A382A] uppercase cursor-pointer transition-colors group"
            >
              <span>EXPLORE GEO-WELLNESS</span>
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
export default AboutPurposeSection;
