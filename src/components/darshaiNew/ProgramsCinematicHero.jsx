import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
export function ProgramsCinematicHero({ onExploreClick, onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Single photograph movement during scroll: scale 1.00 -> 1.06
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.0, 1.06]);
  // Content fades out during scroll as user leaves hero
  const heroContentOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const heroContentY = useTransform(heroScroll, [0, 0.65], [0, -20]);
  const handlePrimaryClick = () => {
    track("begin_journey", { source: "programs_hero_primary_cta" });
    onExploreClick();
  };
  return (
    <section
      ref={heroRef}
      id="programs-cinematic-hero"
      aria-label="DARSHAI Programs Hero"
      className="relative min-h-[100svh] h-[100svh] w-full flex items-center justify-center overflow-hidden text-center bg-[#1D1D1F]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ scale: heroImgScale }}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full will-change-transform"
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=85"
            alt="Pristine coastal landscape and atmospheric terrain"
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>
      <motion.div
        style={{ opacity: heroContentOpacity, y: heroContentY }}
        className="relative z-10 darshai-container w-full"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6 flex justify-center"
          >
            <span
              id="programs-hero-eyebrow"
              className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C6A660] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase shadow-lg"
            >
              DARSHAI PROGRAMS
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              id="programs-hero-heading"
              className="typography-hero-display font-semibold text-white leading-[1.05] tracking-tight mb-6 mx-auto text-center"
            >
              <span className="text-white">Find the Journey</span>
              <br />
              <span className="text-[#34D399]">That Fits You.</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              id="programs-hero-supporting-copy"
              className="text-lg sm:text-xl md:text-[22px] text-white/90 max-w-[740px] leading-relaxed mb-10 mx-auto text-center font-normal"
            >
              Three structured pathways for recovery, balance and long-term
              vitality—shaped around your goals and wellbeing priorities.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                id="programs-hero-primary-cta"
                onClick={handlePrimaryClick}
                className="typography-ui-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#146049] text-white font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(14,77,58,0.4)] hover:shadow-[0_12px_32px_rgba(14,77,58,0.6)] hover:scale-[1.02] cursor-pointer group"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              {onNavigate && (
                <button
                  type="button"
                  id="programs-hero-secondary-cta"
                  onClick={() => {
                    track("consultation_request", {
                      source: "programs_hero_consult",
                    });
                    onNavigate("contact");
                  }}
                  className="typography-ui-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/18 text-white font-semibold tracking-wider uppercase border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: heroContentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        className="absolute bottom-6 inset-x-0 flex justify-center z-10 pointer-events-none"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
          <span>SCROLL</span>
          <span className="text-[#34D399] animate-bounce">↓</span>
        </div>
      </motion.div>
    </section>
  );
}
export default ProgramsCinematicHero;
