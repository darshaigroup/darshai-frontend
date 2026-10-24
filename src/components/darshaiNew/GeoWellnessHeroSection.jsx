import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
const ENVIRONMENTS = [
  {
    id: "coast",
    num: "01",
    label: "COAST",
    image:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&auto=format&fit=crop&q=85",
    alt: "Quiet open coastal horizon with gentle ocean rhythms",
  },
  {
    id: "forest",
    num: "02",
    label: "FOREST",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&auto=format&fit=crop&q=85",
    alt: "Western Ghats dense evergreen forest canopy and morning mist",
  },
  {
    id: "mountain",
    num: "03",
    label: "MOUNTAIN",
    image:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&auto=format&fit=crop&q=85",
    alt: "Pristine mountain environment with atmospheric ridges and cool elevation",
  },
  {
    id: "heritage",
    num: "04",
    label: "HERITAGE",
    image:
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1920&auto=format&fit=crop&q=85",
    alt: "Traditional Indian heritage architectural setting and quiet sanctuary courtyard",
  },
  {
    id: "urban-nature",
    num: "05",
    label: "URBAN NATURE",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1920&auto=format&fit=crop&q=85",
    alt: "Contemporary green botanical environment balancing modern life with nature",
  },
];
export function GeoWellnessHeroSection({ onDiscoverClick, onNavigate }) {
  const containerRef = useRef(null);
  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Camera Effect: Scale 1.00 -> 1.025, Position approx 0 -> -1%
  const cameraScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1.0, 1.0] : [1.0, 1.025],
  );
  const cameraY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-1%"],
  );
  // Controlled Crossfades for the 5 Environment Frames
  // Exact Timeline Specification:
  // 0–15%: Headline + Coast environment enters smoothly
  // 15–30%: Coast remains stable
  // 30–45%: Coast slowly dissolves into Forest
  // 45–60%: Forest dissolves into Mountain
  // 60–72%: Mountain dissolves into Heritage
  // 72–84%: Heritage dissolves into Urban Nature
  // 84–95%: “The right journey begins with understanding both the person and the place.” reveals
  // 95–100%: “This is Geo-Wellness.” + DISCOVER GEO-WELLNESS CTA locks into place
  const coastOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.3, 0.45],
    [1, 1, 0],
  );
  const forestOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.6],
    [0, 1, 0],
  );
  const mountainOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.72],
    [0, 1, 0],
  );
  const heritageOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.72, 0.84],
    [0, 1, 0],
  );
  const urbanNatureOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.84, 1.0],
    [0, 1, 1],
  );
  const envOpacities = [
    coastOpacity,
    forestOpacity,
    mountainOpacity,
    heritageOpacity,
    urbanNatureOpacity,
  ];
  // Active Label tracking
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.3) {
        setActiveEnvIndex(0);
      } else if (latest < 0.45) {
        setActiveEnvIndex(1);
      } else if (latest < 0.6) {
        setActiveEnvIndex(2);
      } else if (latest < 0.72) {
        setActiveEnvIndex(3);
      } else {
        setActiveEnvIndex(4);
      }
    });
  }, [scrollYProgress]);
  // Text Animation Timeline (Scroll-linked):
  // 0 - 15%: Headline + Coast environment enters smoothly
  const eyebrowOpacity = useTransform(scrollYProgress, [0.0, 0.1], [0.8, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0.0, 0.12], [0.85, 1]);
  const headlineY = useTransform(
    scrollYProgress,
    [0.0, 0.12],
    prefersReducedMotion ? [0, 0] : [6, 0],
  );
  // 15 - 30%: Supporting copy stable & fully legible
  const supportingOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.82, 0.9],
    [0.7, 1, 1, 0.45],
  );
  const supportingY = useTransform(
    scrollYProgress,
    [0.0, 0.15],
    prefersReducedMotion ? [0, 0] : [8, 0],
  );
  // 84 - 95%: "The right journey begins with understanding both the person and the place." reveals
  const finalStatementOpacity = useTransform(
    scrollYProgress,
    [0.82, 0.9, 1.0],
    [0, 1, 1],
  );
  const finalStatementY = useTransform(
    scrollYProgress,
    [0.82, 0.9],
    prefersReducedMotion ? [0, 0] : [16, 0],
  );
  // 95 - 100%: "This is Geo-Wellness." + DISCOVER GEO-WELLNESS CTA locks into place
  const closingOpacity = useTransform(
    scrollYProgress,
    [0.93, 0.98, 1.0],
    [0, 1, 1],
  );
  const closingY = useTransform(
    scrollYProgress,
    [0.93, 0.98],
    prefersReducedMotion ? [0, 0] : [12, 0],
  );
  // Progress cue indicator (fades out as user scrolls past 0.15)
  const scrollCueOpacity = useTransform(scrollYProgress, [0.0, 0.15], [1, 0]);
  const handleCtaClick = () => {
    track("begin_journey", { source: "geowellness_hero_cta" });
    if (onDiscoverClick) {
      onDiscoverClick();
    } else {
      const el = document.getElementById("why-environment-matters");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const scrollToEnv = (index) => {
    if (!containerRef.current) return;
    const targetProportions = [0.05, 0.38, 0.52, 0.66, 0.88];
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollDistance =
      containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + scrollDistance * targetProportions[index];
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };
  return (
    <section
      ref={containerRef}
      id="geo-wellness-hero"
      aria-label="Geo-Wellness Hero Experience"
      className="relative bg-[#000000] h-[280vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-10">
        <motion.div
          style={{ scale: cameraScale, y: cameraY }}
          className="absolute inset-0 z-0 origin-center will-change-transform"
        >
          {ENVIRONMENTS.map((env, index) => (
            <motion.div
              style={{ opacity: envOpacities[index] }}
              className="absolute inset-0 w-full h-full will-change-opacity pointer-events-none"
              key={env.id}
            >
              <SmartImage
                src={env.image}
                alt={env.alt}
                priority={index === 0}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />
        </motion.div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center items-center text-center my-auto">
          <div className="max-w-2xl sm:max-w-3xl mx-auto text-center flex flex-col items-center">
            <motion.div
              style={{ opacity: eyebrowOpacity }}
              className="mb-3 sm:mb-4"
            >
              <p
                id="geo-wellness-hero-eyebrow"
                className="typography-eyebrow text-[#C6A660] tracking-[0.25em]"
              >
                WHAT IS GEO-WELLNESS
              </p>
            </motion.div>
            <motion.div
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="mb-6 sm:mb-8"
            >
              <h1
                id="geo-wellness-hero-heading"
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-bold text-white max-w-4xl xl:max-w-5xl leading-[1.04] tracking-tight mx-auto text-center drop-shadow-lg"
              >
                Where You Go Matters.
              </h1>
            </motion.div>
            <motion.div
              style={{ opacity: supportingOpacity, y: supportingY }}
              className="space-y-3 sm:space-y-4 max-w-3xl sm:max-w-4xl mx-auto text-center"
            >
              <p className="text-xl sm:text-2xl md:text-[25px] font-semibold text-[#D2D2D7] leading-snug drop-shadow-md text-center">
                Wellness is not experienced in isolation.
              </p>
              <p className="text-base sm:text-lg md:text-[20px] lg:text-[21px] font-normal text-[#A1A1A6] leading-relaxed [word-spacing:0.03em] tracking-normal drop-shadow-sm max-w-3xl mx-auto text-center">
                Climate, geography and surroundings can shape the experience of
                rest, recovery and reconnection.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-6 sm:pb-8 lg:pb-10">
          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl sm:max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
              <motion.div
                style={{ opacity: finalStatementOpacity, y: finalStatementY }}
                className="space-y-2 text-center"
              >
                <p className="typography-h3 text-white drop-shadow-md text-center max-w-2xl mx-auto">
                  The right journey begins with understanding both the person
                  and the place.
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: closingOpacity, y: closingY }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 text-center"
              >
                <span className="font-display text-xl sm:text-2xl text-[#34D399] font-medium tracking-tight text-center">
                  This is Geo-Wellness.
                </span>
                <button
                  type="button"
                  id="geo-wellness-hero-cta"
                  onClick={handleCtaClick}
                  className="typography-ui-button bg-[#0E4D3A] hover:bg-[#093527] text-white tracking-wider uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-[#0E4D3A]/40 border border-emerald-500/20 inline-flex items-center justify-center gap-2 group transition-all duration-300 hover:gap-3 cursor-pointer w-fit"
                >
                  <span>DISCOVER GEO-WELLNESS</span>
                  <span
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </button>
              </motion.div>
            </div>
            <div className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 flex flex-col items-center lg:items-end">
              <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-2 hidden sm:block">
                ENVIRONMENT SEQUENCE
              </p>
              <nav
                aria-label="Geo-Wellness Environment Stages"
                className="flex flex-wrap justify-center sm:flex-nowrap lg:flex-col gap-2 sm:gap-3"
              >
                {ENVIRONMENTS.map((env, idx) => {
                  const isActive = activeEnvIndex === idx;
                  return (
                    <button
                      type="button"
                      onClick={() => scrollToEnv(idx)}
                      className={`text-center lg:text-right font-mono text-xs sm:text-[13px] tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer py-1 px-2 rounded-md ${
                        isActive
                          ? "text-[#34D399] font-bold drop-shadow-sm scale-[1.03] bg-white/5"
                          : "text-white/45 hover:text-white/80 font-medium"
                      }`}
                      key={env.id}
                    >
                      <span
                        className={
                          isActive ? "text-[#34D399]" : "text-white/30"
                        }
                      >
                        {env.num}
                      </span>
                      <span>{env.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse hidden lg:inline-block" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          <motion.div
            style={{ opacity: scrollCueOpacity }}
            className="absolute -bottom-1 inset-x-0 flex justify-center pointer-events-none"
          >
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
              <span>Scroll to explore environments</span>
              <span className="animate-bounce">↓</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default GeoWellnessHeroSection;
