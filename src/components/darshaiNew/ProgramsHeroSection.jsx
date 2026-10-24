import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import { ArrowRight } from "lucide-react";
export function ProgramsHeroSection({ onExploreClick, onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.05]);
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1.0, 0.94]);
  const handlePrimaryClick = () => {
    track("protocol_select", { source: "programs_hero_primary_cta" });
    onExploreClick();
  };
  const handleSecondaryClick = () => {
    track("request_personalised_recommendation", {
      source: "programs_hero_secondary_cta",
    });
    onNavigate("contact");
  };
  return (
    <section
      ref={heroRef}
      id="programs-hero-section"
      aria-label="DARSHAI Programs Hero"
      className="section-hero relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 text-white bg-[#0B0B0C] origin-center will-change-transform"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          style={{
            y: heroParallax,
            scale: heroImageScale,
            opacity: heroOpacity,
          }}
          initial={{ scale: 1.06, opacity: 0.55 }}
          animate={{ scale: 1.0, opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full will-change-transform"
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=85"
            alt="Pristine coastal terrain and therapeutic sanctuary environment"
            priority
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-black/60 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-black/10 via-black/50 to-black/85 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B0B0C] to-transparent pointer-events-none" />
      </motion.div>
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center text-center py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#34D399] text-xs font-semibold tracking-[0.25em] uppercase shadow-lg">
            DARSHAI PROGRAMS
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mb-6"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-semibold tracking-tight text-white drop-shadow-md leading-[1.03] mb-4">
            Find the Journey
            <br className="hidden sm:inline" /> That Fits You.
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <p className="text-lg sm:text-xl lg:text-[22px] leading-relaxed text-white/95 drop-shadow-sm font-normal">
            Three structured pathways for recovery, balance and long-term
            vitality—shaped around your goals and wellbeing priorities.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <button
            type="button"
            id="programs-hero-primary-cta"
            onClick={handlePrimaryClick}
            className="typography-ui-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#146049] text-white font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(14,77,58,0.4)] hover:shadow-[0_12px_32px_rgba(14,77,58,0.6)] hover:scale-[1.02] cursor-pointer group"
          >
            <span>EXPLORE PROGRAMS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            id="programs-hero-secondary-cta"
            onClick={handleSecondaryClick}
            className="typography-ui-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/18 text-white font-semibold tracking-wider uppercase border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <span>REQUEST A PERSONALISED RECOMMENDATION</span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/50 text-xs font-mono tracking-widest uppercase pt-4">
        <span>EXECUTIVE RESET • DEEP DETOX • LONGEVITY • SOVEREIGN</span>
      </div>
    </section>
  );
}
export default ProgramsHeroSection;
