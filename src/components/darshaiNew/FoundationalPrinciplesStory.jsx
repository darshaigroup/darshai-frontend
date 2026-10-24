import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
const PRINCIPLES = [
  {
    num: "01",
    id: "personalized",
    name: "Personalized",
    title: "Personalized.",
    desc: "Every journey begins with understanding the individual.",
    detail:
      "Intake evaluates baseline biology, mental exhaustion, and personal goals before any destination is suggested.",
    tag: "INDIVIDUAL BASELINE",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=85",
    imageAlt:
      "Individual in calm natural light reflecting personal wellness baseline",
    caption: "01 / BASELINE BIOLOGY",
  },
  {
    num: "02",
    id: "curated",
    name: "Curated",
    title: "Curated.",
    desc: "Suitable environments and programmes are selected around the journey.",
    detail:
      "Microclimates, clinical specialisations, and sanctuary standards are paired with clinical precision.",
    tag: "ENVIRONMENT & SANCTUARY",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85",
    imageAlt:
      "Curated Indian sanctuary pavilion in restorative natural surroundings",
    caption: "02 / SANCTUARY PLACEMENT",
  },
  {
    num: "03",
    id: "guided",
    name: "Guided",
    title: "Guided.",
    desc: "Human support throughout the journey process.",
    detail:
      "Dedicated navigators coordinate transit, clinical liaison, and itinerary requirements from start to finish.",
    tag: "HUMAN COORDINATION",
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&auto=format&fit=crop&q=85",
    imageAlt:
      "Private health navigator consultation pavilion for guided journey support",
    caption: "03 / CLINICAL LIAISON",
  },
  {
    num: "04",
    id: "continuous",
    name: "Continuous",
    title: "Continuous.",
    desc: "The journey does not end at check-out.",
    detail:
      "Sustained post-programme follow-up, lifestyle integration, and biomarker guidance extend restorative gains.",
    tag: "ENDURING VITALITY",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
    imageAlt:
      "Serene horizon reflecting enduring vitality and post-journey wellness continuity",
    caption: "04 / POST-PROGRAM CARE",
  },
];
export function FoundationalPrinciplesStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  // Auto-advance story every 4.8 seconds unless paused by user interaction/hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % PRINCIPLES.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);
  const goToIndex = (newIndex) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? PRINCIPLES.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === PRINCIPLES.length - 1 ? 0 : prev + 1));
  };
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };
  const activePrinciple = PRINCIPLES[activeIndex];
  const progressPercent = (activeIndex / (PRINCIPLES.length - 1)) * 100;
  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="pt-14 md:pt-20 border-t border-[#D2D2D7] select-none"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 sm:gap-6 mb-8 md:mb-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 justify-start">
            {PRINCIPLES.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs"
                      : "bg-[#F5F5F7] text-[#6E6E73] border-[#D2D2D7]/70 hover:border-[#1D1D1F]/40 hover:text-[#1D1D1F]"
                  }`}
                  key={item.id}
                >
                  <span className="text-[10px] opacity-60 mr-1.5 font-mono">
                    {item.num}
                  </span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
      <div className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="order-1 lg:order-2 lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#1D1D1F] border border-[#D2D2D7] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18)] group/img">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                  key={activePrinciple.id}
                >
                  <SmartImage
                    src={activePrinciple.image}
                    alt={activePrinciple.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: -6 }}
                    animate={{ opacity: 1, scale: 1.0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-[18px] sm:rounded-[20px] bg-black/55 backdrop-blur-md border border-white/20 shadow-lg"
                    key={activePrinciple.num}
                  >
                    <span className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                      {activePrinciple.num}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 flex items-center justify-between text-white pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-white uppercase"
                    key={activePrinciple.caption}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A660] shadow-[0_0_6px_#C6A660]" />
                    <span>{activePrinciple.caption}</span>
                  </motion.div>
                </AnimatePresence>
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest hidden sm:inline-block">
                  DARSHAI SANCTUARY
                </span>
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F5F7] border border-[#D2D2D7] typography-eyebrow text-[#0E4D3A] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>{activePrinciple.tag}</span>
              </div>
              <span className="typography-metadata text-[#777777] tabular-nums font-semibold">
                {activePrinciple.num} / 04
              </span>
            </div>
            <div className="py-1 min-h-[180px] sm:min-h-[200px] flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 32 : -32,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -32 : 32,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-3 sm:space-y-4"
                  key={activePrinciple.id}
                >
                  <h4 className="typography-section-h2 text-[#1D1D1F] tracking-tight leading-[1.05]">
                    {activePrinciple.title}
                  </h4>
                  <p className="typography-lead text-[#1D1D1F] leading-snug tracking-tight">
                    {activePrinciple.desc}
                  </p>
                  <p className="typography-body text-[#555555] font-normal leading-relaxed pt-1">
                    {activePrinciple.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="pt-6 border-t border-[#D2D2D7]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:max-w-xs md:max-w-sm flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#1D1D1F] shrink-0">
                  01
                </span>
                <div className="relative flex-1 h-1.5 bg-[#D2D2D7] rounded-full overflow-visible">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-[#0E4D3A] rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#0E4D3A] shadow-md -ml-2"
                    animate={{ left: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#8E8E93] shrink-0">
                  04
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous principle"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next principle"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FoundationalPrinciplesStory;
