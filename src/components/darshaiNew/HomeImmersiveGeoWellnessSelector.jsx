import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import SmartImage from "./SmartImage";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";

const ENVIRONMENTS = [
  {
    id: "coast",
    name: "COASTAL",
    num: "01",
    tagline: "High Salinity & Negative Ion Sea Air",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Coastal sanctuary with ocean horizon and morning mist",
    elevation: "Sea Level (0 – 50m)",
    dimensions: [
      "Ocean rhythms",
      "Open horizons",
      "High salinity & negative ion sea air",
    ],
    summary:
      "Ocean air rich in natural salinity and negative ions supports deep respiratory recovery and nervous system calm.",
  },
  {
    id: "mountain",
    name: "MOUNTAIN",
    num: "02",
    tagline: "Sub-Alpine Elevation & Pure Atmospheric Air",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Mountain sanctuary with pure elevation and misty ridges",
    elevation: "High Altitude (1,200m – 2,200m)",
    dimensions: [
      "Altitude",
      "Alpine stillness",
      "Sub-alpine atmosphere & pure air",
    ],
    summary:
      "Cool, clean high-altitude air stimulates cellular resilience, deeper metabolic regulation, and profound mental clarity.",
  },
  {
    id: "forest",
    name: "FOREST",
    num: "03",
    tagline: "Dense Evergreen Canopy & Elevated Phytoncides",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Forest sanctuary with dense evergreen canopy",
    elevation: "Sub-Alpine Canopy (400m – 900m)",
    dimensions: [
      "Biodiversity",
      "Deep natural immersion",
      "Dense evergreen canopy & elevated phytoncides",
    ],
    summary:
      "Tree canopy phytoncides lower cortisol and blood pressure while natural acoustic stillness resets circadian rhythm.",
  },
  {
    id: "heritage",
    name: "HERITAGE",
    num: "04",
    tagline: "Protected Cultural Enclaves & Ancient Courtyards",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Heritage sanctuary with quiet courtyards and ancient architecture",
    elevation: "Foothill Sanctuary (200m – 600m)",
    dimensions: [
      "Living traditions",
      "Slow rhythms",
      "Ancient courtyard seclusion",
    ],
    summary:
      "Centuries-old therapeutic architecture and slow traditional rhythms create an environment insulated from modern noise.",
  },
  {
    id: "urban-nature",
    name: "URBAN NATURE",
    num: "05",
    tagline: "Filtered Biophilic Sanctuary & Pure Air Enclave",
    image:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Urban nature biophilic garden sanctuary",
    elevation: "Metro Natural Buffer",
    dimensions: [
      "Restorative green buffers",
      "Modern accessibility",
      "Filtered biophilic sanctuaries",
    ],
    summary:
      "Protected botanical microclimates offering restorative seclusion without leaving the orbit of major travel hubs.",
  },
];

export function HomeImmersiveGeoWellnessSelector({ onNavigate }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.2) {
        setActiveIndex(0);
      } else if (latest < 0.4) {
        setActiveIndex(1);
      } else if (latest < 0.6) {
        setActiveIndex(2);
      } else if (latest < 0.8) {
        setActiveIndex(3);
      } else {
        setActiveIndex(4);
      }
    });
  }, [scrollYProgress]);

  const scrollToEnvironment = (index) => {
    if (!containerRef.current) return;

    const sectionTop =
      window.scrollY + containerRef.current.getBoundingClientRect().top;

    const scrollableHeight =
      containerRef.current.offsetHeight - window.innerHeight;

    const targetProgress = (index / (ENVIRONMENTS.length - 1)) * 0.95;

    const targetScrollY = sectionTop + scrollableHeight * targetProgress;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const activeEnv = ENVIRONMENTS[activeIndex];

  const handlePrev = () => {
    const newIdx =
      activeIndex === 0 ? ENVIRONMENTS.length - 1 : activeIndex - 1;

    scrollToEnvironment(newIdx);
  };

  const handleNext = () => {
    const newIdx =
      activeIndex === ENVIRONMENTS.length - 1 ? 0 : activeIndex + 1;

    scrollToEnvironment(newIdx);
  };

  return (
    <section
      ref={containerRef}
      id="what-is-geo-wellness-section"
      aria-label="What is Geo-Wellness"
      className="relative min-h-[300vh] bg-[#F5F5F7] border-b border-[#D2D2D7]"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden">
        <div className="darshai-container w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-between">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 shrink-0">
            <div>
              <p
                id="geo-wellness-eyebrow"
                className="typography-eyebrow text-[#0E4D3A] mb-3 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>WHAT IS GEO-WELLNESS?</span>
              </p>

              <h2
                id="geo-wellness-heading"
                className="typography-section-h2 tracking-tight"
              >
                <span className="text-[#1D1D1F] block">Where You Go</span>
                <span className="text-[#0E4D3A] block mt-0.5 sm:mt-1">
                  Matters.
                </span>
              </h2>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-[#D2D2D7] shadow-xs">
              {ENVIRONMENTS.map((env, idx) => {
                const isSelected = activeIndex === idx;

                return (
                  <button
                    type="button"
                    onClick={() => scrollToEnvironment(idx)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[#1D1D1F] text-white shadow-xs"
                        : "text-[#6E6E73] hover:text-[#1D1D1F]"
                    }`}
                    key={env.id}
                  >
                    0{idx + 1} {env.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] rounded-[24px] sm:rounded-[30px] lg:rounded-[36px] overflow-hidden bg-[#0A0D0C] border border-[#D2D2D7] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.25)] flex flex-col justify-between p-4 sm:p-7 md:p-9 lg:p-12 text-white my-auto">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <AnimatePresence mode="sync">
                <motion.div
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.7, ease: "easeInOut" },
                    scale: {
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  className="absolute inset-0 w-full h-full"
                  key={activeEnv.id}
                >
                  <SmartImage
                    src={activeEnv.image}
                    alt={activeEnv.alt}
                    priority
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_35%,_rgba(0,0,0,0.6)_100%] pointer-events-none" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] sm:text-[11px] font-mono font-semibold tracking-wider text-white uppercase max-w-[82%]"
                  key={activeEnv.name}
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
                  <span className="truncate">
                    {activeEnv.num} / {activeEnv.name} SANCTUARY
                  </span>
                </motion.div>
              </AnimatePresence>

              <span className="hidden sm:inline-block text-[10px] md:text-[11px] font-mono text-white/75 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
                {activeEnv.elevation}
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-4 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-1 max-w-xl"
                  key={activeEnv.id}
                >
                  <p className="typography-eyebrow font-semibold text-[#C6A660]">
                    GEO-WELLNESS SANCTUARY
                  </p>

                  <h3 className="typography-subsection-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#34D399] tracking-tight drop-shadow-md">
                    {activeEnv.name} Environment
                  </h3>

                  <p className="text-[11px] sm:text-xs md:text-sm text-white/80 font-normal leading-relaxed pt-1 max-w-2xl">
                    {activeEnv.summary}
                  </p>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => {
                  track("centre_view", {
                    environment: activeEnv.id,
                  });

                  onNavigate(`centres?environment=${activeEnv.id}`);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#1D1D1F] hover:bg-[#34D399] hover:text-black typography-ui-button font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer group shrink-0"
              >
                <span className="truncate">
                  EXPLORE {activeEnv.name} CENTRES
                </span>

                
              </button>
            </div>
          </div>

          {/* Mobile / Tablet controls */}
          <div className="lg:hidden flex flex-col items-center gap-4 sm:gap-5 pt-4 sm:pt-5 shrink-0">
            <div className="relative w-full flex items-center justify-center">
              {/* Centered pagination */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                {ENVIRONMENTS.map((env, idx) => (
                  <button
                    type="button"
                    onClick={() => scrollToEnvironment(idx)}
                    aria-label={`Go to ${env.name}`}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                      activeIndex === idx
                        ? "w-7 sm:w-8 bg-[#0E4D3A]"
                        : "w-1.5 sm:w-2 bg-[#D2D2D7]"
                    }`}
                    key={env.id}
                  />
                ))}
              </div>

              {/* Right-aligned arrows */}
              <div className="absolute right-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous environment"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next environment"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Discover CTA */}
           <button
            id="discover-geo-wellness-cta"
            type="button"
            onClick={() => onNavigate("geo-wellness")}
            className="darshai-btn-primary uppercase inline-flex items-center justify-center gap-2 w-full max-w-[290px] sm:max-w-[320px] px-6 py-3 shadow-md cursor-pointer group transition-all duration-200 active:scale-[0.98]"
          >
            <span>DISCOVER GEO-WELLNESS</span>
            <motion.div
              animate={{ x: [-2, 5, -2] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </button>
          </div>

          {/* Desktop controls */}
          <div className="hidden lg:flex items-center justify-between pt-2 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous environment"
                className="w-10 h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next environment"
                className="w-10 h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {ENVIRONMENTS.map((env, idx) => (
                <button
                  type="button"
                  onClick={() => scrollToEnvironment(idx)}
                  aria-label={`Go to ${env.name}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-[#0E4D3A]"
                      : "w-2 bg-[#D2D2D7]"
                  }`}
                  key={env.id}
                />
              ))}
            </div>

           <button
            id="discover-geo-wellness-cta"
            type="button"
            onClick={() => onNavigate("geo-wellness")}
            className="darshai-btn-primary uppercase inline-flex items-center justify-center gap-2 w-full max-w-[290px] sm:max-w-[320px] px-6 py-3 shadow-md cursor-pointer group transition-all duration-200 active:scale-[0.98]"
          >
            <span>DISCOVER GEO-WELLNESS</span>
            <motion.div
              animate={{ x: [-2, 5, -2] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeImmersiveGeoWellnessSelector;