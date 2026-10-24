import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
export const GEO_DIMENSIONS = [
  {
    badge: "01 — PERSON",
    title: "Understanding Your Physiological Baseline",
    shortTitle: "Person",
    subtitle:
      "Wellness begins by understanding your individual physiology, lifestyle, daily stress markers, health priorities, and preferences.",
    tag: "INDIVIDUAL BASELINE",
    focusAreas: ["Health Baseline", "Stress Profile", "Lifestyle & Goals"],
    ctaText: "EXPLORE PERSON MATCHING",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=900&fit=crop&auto=format",
    imageAlt: "Person practicing mindfulness in peaceful natural surroundings",
  },
  {
    badge: "02 — ENVIRONMENT",
    title: "Matching Microclimates to Biological Recovery",
    shortTitle: "Environment",
    subtitle:
      "Aligning natural ambient humidity, negative-ion air quality, altitude, and surroundings to your specific biological restoration needs.",
    tag: "BIO-CLIMATIC RESONANCE",
    focusAreas: [
      "Coastal Sanctuaries",
      "Forest Retreats",
      "Sub-Alpine Altitude",
    ],
    ctaText: "EXPLORE ENVIRONMENTS",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&auto=format",
    imageAlt:
      "Pristine Western Ghats bio-climatic sanctuary with mist and lush flora",
  },
  {
    badge: "03 — WELLNESS APPROACH",
    title: "Clinically Verified Protocols & Authentic Care",
    shortTitle: "Wellness Approach",
    subtitle:
      "Integrating structured Ayurvedic Panchakarma, modern clinical neuro-resilience protocols, and daily restorative rhythms.",
    tag: "CLINICAL & AUTHENTIC",
    focusAreas: ["Panchakarma Detox", "Circadian Reset", "Restorative Care"],
    ctaText: "EXPLORE WELLNESS APPROACH",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=900&fit=crop&auto=format",
    imageAlt:
      "Therapeutic Ayurvedic rejuvenation and restorative wellness sanctuary",
  },
];
export function GeoWellnessHorizontalScrollSection({
  id = "what-is-geo-wellness",
  onNavigate,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollRange, setScrollRange] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const visibleWidth = window.innerWidth;
        const maxRange = Math.max(0, totalWidth - visibleWidth);
        setScrollRange(maxRange);
      }
    };
    updateScrollRange();
    const timer = setTimeout(updateScrollRange, 100);
    window.addEventListener("resize", updateScrollRange);
    let resizeObserver = null;
    if (trackRef.current) {
      resizeObserver = new ResizeObserver(updateScrollRange);
      resizeObserver.observe(trackRef.current);
    }
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollRange);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);
  const rawX = useTransform(scrollYProgress, [0.02, 0.98], [0, -scrollRange]);
  const horizontalX = useSpring(rawX, {
    stiffness: 180,
    damping: 26,
    mass: 0.2,
  });
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setActiveCardIndex(0);
      } else if (latest < 0.7) {
        setActiveCardIndex(1);
      } else {
        setActiveCardIndex(2);
      }
    });
  }, [scrollYProgress]);
  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const sectionTop =
      window.scrollY + containerRef.current.getBoundingClientRect().top;
    const scrollableHeight =
      containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = 0.02 + (index / 2) * 0.94;
    const targetScrollY = sectionTop + scrollableHeight * targetProgress;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };
  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[240vh] lg:min-h-[280vh] bg-[#F5F5F7] border-b border-[#D2D2D7] scroll-mt-12"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-4 sm:py-8 lg:py-12 overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#D2D2D7]/80 pb-4 sm:pb-6">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#0E4D3A] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>WHAT IS GEO-WELLNESS?</span>
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.12] tracking-tight mb-3">
                Where You Go <span className="text-[#0E4D3A]">Matters.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#2C2C2E] font-normal leading-relaxed">
                Wellness is not only what you do. The environment around you can
                shape the experience of rest, recovery and reconnection.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
              {GEO_DIMENSIONS.map((dim, idx) => {
                const isSelected = activeCardIndex === idx;
                return (
                  <button
                    type="button"
                    onClick={() => {
                      track("geo_dimension_select", {
                        dimension: dim.shortTitle,
                      });
                      scrollToCard(idx);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs"
                        : "bg-white text-[#6E6E73] border-[#D2D2D7] hover:border-[#1D1D1F]/40 hover:text-[#1D1D1F]"
                    }`}
                    key={dim.badge}
                  >
                    <span className="opacity-60 mr-1 font-mono">
                      0{idx + 1}
                    </span>
                    <span>{dim.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden my-auto py-4">
          <motion.div
            ref={trackRef}
            style={{ x: horizontalX }}
            className="flex gap-6 sm:gap-8 pl-4 sm:pl-8 lg:pl-[max(2rem,(100vw-1320px)/2)] pr-4 sm:pr-8 will-change-transform"
          >
            {GEO_DIMENSIONS.map((dim, idx) => {
              const isActive = activeCardIndex === idx;
              return (
                <div
                  className={`w-[88vw] sm:w-[560px] lg:w-[620px] shrink-0 bg-[#1D1D1F] rounded-[28px] sm:rounded-[36px] border border-white/20 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group min-h-[460px] sm:min-h-[520px] transition-all duration-500 cursor-pointer ${isActive ? "ring-2 ring-[#34D399]/40 shadow-2xl scale-100 opacity-100" : "scale-[0.98] opacity-90 hover:opacity-100"}`}
                  onClick={() => {
                    track("geo_dimension_select", {
                      dimension: dim.shortTitle,
                    });
                    onNavigate("centres");
                  }}
                  key={dim.badge}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <SmartImage
                      src={dim.image}
                      alt={dim.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 group-hover:via-black/75 transition-colors duration-500 pointer-events-none" />
                  </div>
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      {dim.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#34D399] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      <Sparkles className="w-4 h-4 text-[#34D399]" />
                      <span>{dim.tag}</span>
                    </div>
                  </div>
                  <div className="relative z-10 space-y-2 mt-auto pb-3 text-white text-center flex flex-col items-center">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white drop-shadow-md group-hover:text-[#34D399] transition-colors duration-300">
                      {dim.title}
                    </h3>
                    <div className="max-h-0 opacity-0 pointer-events-none group-hover:max-h-[360px] group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden space-y-4 pt-0 group-hover:pt-3 w-full flex flex-col items-center">
                      <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal max-w-lg drop-shadow-xs text-center mx-auto">
                        {dim.subtitle}
                      </p>
                      {dim.focusAreas && dim.focusAreas.length > 0 && (
                        <div className="pt-3 border-t border-white/20 w-full flex flex-col items-center">
                          <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider mb-2 font-semibold text-center">
                            Key Dimensions:
                          </p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {dim.focusAreas.map((area) => (
                              <span
                                className="text-xs sm:text-sm font-medium text-white bg-black/60 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full shadow-xs group-hover:border-[#34D399]/60 transition-colors"
                                key={area}
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="pt-2 flex justify-center w-full">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            track("geo_dimension_click", {
                              dimension: dim.shortTitle,
                            });
                            onNavigate("centres");
                          }}
                          className="px-6 py-3.5 rounded-full bg-white text-[#1D1D1F] hover:bg-[#34D399] hover:text-black text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md group/btn"
                        >
                          <span>{dim.ctaText}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-center gap-4">
                    <span className="text-xs font-mono text-white/70 group-hover:text-white transition-colors uppercase tracking-wider text-center">
                      Hover to explore dimension •{" "}
                      <span className="font-bold text-white">
                        {dim.shortTitle}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="pt-3 sm:pt-5 border-t border-[#D2D2D7]/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1D1D1F]">
                01
              </span>
              <div className="w-32 sm:w-48 h-1 bg-[#D2D2D7] rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-[#0E4D3A] rounded-full"
                  style={{
                    width: `${(activeCardIndex / 2) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#8E8E93]">
                03
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newIdx = Math.max(0, activeCardIndex - 1);
                  scrollToCard(newIdx);
                }}
                disabled={activeCardIndex === 0}
                aria-label="Previous Geo-Wellness card"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const newIdx = Math.min(2, activeCardIndex + 1);
                  scrollToCard(newIdx);
                }}
                disabled={activeCardIndex === 2}
                aria-label="Next Geo-Wellness card"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default GeoWellnessHorizontalScrollSection;
