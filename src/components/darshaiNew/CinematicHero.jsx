import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Compass,
  Sparkles,
  Shield,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
export function CinematicHero({ onNavigate }) {
  const [containerEl, setContainerEl] = useState(null);
  const containerRef = useCallback((node) => {
    if (node !== null) setContainerEl(node);
  }, []);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll(
    containerEl
      ? {
          target: { current: containerEl },
          offset: ["start start", "end start"],
        }
      : { offset: ["start start", "end start"] },
  );
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const handleScrollDown = () => {
    const nextSection = document.getElementById("why-darshai-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      ref={containerRef}
      id="home-cinematic-hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between bg-black text-white selection:bg-[#34D399] selection:text-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          style={{ scale: prefersReducedMotion ? 1 : bgScale }}
          className="w-full h-full will-change-transform"
        >
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={() => setVideoError(true)}
              poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=85"
              className="w-full h-full object-cover opacity-85 scale-105"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-sea-water-waves-slow-motion-41316-large.mp4"
                type="video/mp4"
              />
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-in-the-sea-41315-large.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=85"
              alt="Serene ocean horizon"
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/30 via-[#34D399]/15 to-transparent blur-[140px] pointer-events-none" />
      </div>
      <header className="relative z-20 w-full pt-8 sm:pt-10 px-6 sm:px-10 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
          <span>PRECISION GEO-WELLNESS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-white/70 tracking-wider">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A660]" />
            <span>CURATED SANCTUARIES ACROSS INDIA</span>
          </span>
        </div>
      </header>
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : contentY,
          opacity: prefersReducedMotion ? 1 : contentOpacity,
        }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 max-w-5xl mx-auto my-auto py-12"
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#0E4D3A] via-[#093527] to-black border border-[#34D399]/40 shadow-[0_0_24px_rgba(52,211,153,0.3)] flex items-center justify-center text-white mb-2.5 ring-4 ring-[#34D399]/15">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#C6A660]" />
          </div>
          <p className="font-display text-sm sm:text-base font-bold tracking-[0.28em] text-[#C6A660] uppercase">
            DARSHAI
          </p>
        </div>
        <h1 className="typography-hero-display text-white max-w-4xl mx-auto drop-shadow-2xl mb-6">
          Personalized Geo-Wellness Journeys.
        </h1>
        <p className="typography-lead text-white/85 max-w-2xl mx-auto mb-9 font-normal leading-relaxed">
          Matching individual physiological profiles with accredited wellness
          sanctuaries, authentic therapies, and distinct Indian microclimates.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              track("begin_journey", { source: "homepage_hero_programs" });
              onNavigate("programs");
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#0E4D3A] to-[#12634C] hover:from-[#12634C] hover:to-[#0E4D3A] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase border border-[#34D399]/40 shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:shadow-[0_0_36px_rgba(52,211,153,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center gap-3 group"
          >
            <span>EXPLORE PROTOCOLS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#34D399]" />
          </button>
          {onNavigate && (
            <button
              type="button"
              onClick={() => {
                track("explore_all_centres", {
                  source: "homepage_hero_centres",
                });
                onNavigate("centres");
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm tracking-wider border border-white/20 backdrop-blur-md transition-all duration-300 hover:border-white/40 cursor-pointer"
            >
              Discover Sanctuaries
            </button>
          )}
        </div>
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-white/70">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Clinical Due Diligence</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#C6A660]" />
            <span>Microclimate Alignment</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Tailored Recovery Frameworks</span>
          </div>
        </div>
      </motion.div>
      <footer className="relative z-20 w-full pb-6 sm:pb-8 px-6 text-center pointer-events-auto">
        <button
          type="button"
          onClick={handleScrollDown}
          className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#34D399]" />
        </button>
      </footer>
    </section>
  );
}
export default CinematicHero;
