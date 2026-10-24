import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import { ArrowRight, ChevronDown } from "lucide-react";
export function HomeHeroSection({ onNavigate, onDiscoverClick }) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Timeline transformations:
  // 0–20%: Black background. Headline enters (opacity: 0 -> 1, translateY: 28px -> 0).
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.15],
    prefersReduced ? [1, 1] : [0.2, 1],
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0.0, 0.15],
    prefersReduced ? [0, 0] : [28, 0],
  );
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.1],
    prefersReduced ? [1, 1] : [0.4, 1],
  );
  const eyebrowY = useTransform(
    scrollYProgress,
    [0.0, 0.1],
    prefersReduced ? [0, 0] : [14, 0],
  );
  const supportingOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    prefersReduced ? [1, 1] : [0.2, 1],
  );
  const supportingY = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    prefersReduced ? [0, 0] : [18, 0],
  );
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.22],
    prefersReduced ? [1, 1] : [0.3, 1],
  );
  const ctaY = useTransform(
    scrollYProgress,
    [0.08, 0.22],
    prefersReduced ? [0, 0] : [14, 0],
  );
  // 20–50%: Subtle environmental visual begins appearing behind the black (faint landscape texture / barely visible terrain)
  // 50–100%: Background slowly reveals more environmental detail (organic coastline / forest canopy / mountain elevation)
  const bgOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.5, 0.9, 1.0],
    [0.0, 0.05, 0.35, 0.65, 0.75],
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0.2, 1.0],
    prefersReduced ? [1.0, 1.0] : [1.0, 1.04],
  );
  // Scroll cue indicator at the bottom (fades out past 15%)
  const scrollCueOpacity = useTransform(scrollYProgress, [0.0, 0.14], [1, 0]);
  const handlePrimaryClick = () => {
    track("begin_journey", { source: "homepage_hero_primary_cta" });
    if (onNavigate) {
      onNavigate("contact");
    }
  };
  const handleSecondaryClick = () => {
    track("explore_environments", { source: "homepage_hero_secondary_cta" });
    if (onDiscoverClick) {
      onDiscoverClick();
    } else {
      const target = document.getElementById("why-darshai-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else if (onNavigate) {
        onNavigate("geo-wellness");
      }
    }
  };
  return (
    <section
      ref={containerRef}
      id="homepage-hero"
      aria-label="DARSHAI Geo-Wellness Hero"
      className="relative bg-[#000000] h-[220vh] text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#000000]">
          <motion.div
            style={{
              opacity: bgOpacity,
              scale: bgScale,
            }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <SmartImage
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=85"
              alt="Pristine coastal landscape and atmospheric terrain"
              priority
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_35%,_rgba(0,0,0,0.65)_100%] pointer-events-none" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto px-2 sm:px-4">
          <motion.div
            style={{ opacity: eyebrowOpacity, y: eyebrowY }}
            className="mb-4 sm:mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C6A660] typography-eyebrow font-semibold tracking-[0.25em] uppercase shadow-lg">
              DARSHAI GEO-WELLNESS
            </span>
          </motion.div>
          <motion.h1
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="typography-hero-display text-white mb-6 sm:mb-7 max-w-3xl drop-shadow-md"
          >
            <span>Your Wellness Journey</span>
            <br />
            <span className="text-[#34D399] drop-shadow-[0_0_18px_rgba(52,211,153,0.35)]">
              Should Start With You.
            </span>
          </motion.h1>
          <motion.div
            style={{ opacity: supportingOpacity, y: supportingY }}
            className="space-y-3 max-w-3xl mx-auto mb-8 sm:mb-10 text-center"
          >
            <p className="typography-lead text-white font-medium leading-relaxed tracking-tight">
              Wellness isn't one-size-fits-all.
            </p>
            <p className="typography-lead text-white/72 font-normal leading-relaxed max-w-2xl mx-auto">
              DARSHAI helps you find a journey shaped around your goals, context
              and wellbeing priorities.
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              id="home-hero-primary-cta"
              onClick={handlePrimaryClick}
              className="typography-ui-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#146049] text-white font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(14,77,58,0.4)] hover:shadow-[0_12px_32px_rgba(14,77,58,0.6)] hover:scale-[1.02] cursor-pointer group"
            >
              <span>BEGIN YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              id="home-hero-secondary-cta"
              onClick={handleSecondaryClick}
              className="typography-ui-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/18 text-white font-semibold tracking-wider uppercase border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <span>DISCOVER GEO-WELLNESS</span>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="relative z-10 w-full flex flex-col items-center justify-center text-center text-white/50 typography-metadata tracking-widest uppercase pointer-events-none"
        >
          <span className="mb-1.5">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white/60" />
        </motion.div>
      </div>
    </section>
  );
}
export default HomeHeroSection;
