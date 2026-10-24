import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Moon,
  Sparkles,
  Activity,
  Award,
  RefreshCw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const GOALS = [
  {
    id: "recovery",
    tabLabel: "Recovery",
    fullTitle: "Stress & Burnout Recovery",
    tag: "CALM RETREAT • DEEP REST",
    oneSentence:
      "Structured recovery from chronic fatigue, overload, and prolonged professional stress.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Peaceful nature retreat environment for stress recovery",
    icon: Brain,
  },
  {
    id: "sleep",
    tabLabel: "Sleep",
    fullTitle: "Sleep & Recovery",
    tag: "CIRCADIAN RESET • RESTFUL ROUTINES",
    oneSentence:
      "Programmes designed around rest, circadian recovery, and healthy routines.",
    image:
      "https://images.unsplash.com/photo-1511295742362-92c96b124e52?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Restful evening atmosphere in tranquil Indian wellness sanctuary",
    icon: Moon,
  },
  {
    id: "detox",
    tabLabel: "Detox",
    fullTitle: "Detox & Rejuvenation",
    tag: "PANCHAKARMA • CELLULAR CLEANSING",
    oneSentence:
      "Traditional Panchakarma and cellular detoxification protocols in clinical sanctuaries.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Ayurvedic herbal and botanical rejuvenation sanctuary",
    icon: Sparkles,
  },
  {
    id: "longevity",
    tabLabel: "Longevity",
    fullTitle: "Healthy Ageing & Longevity",
    tag: "VITALITY PRESERVATION • PREVENTIVE CARE",
    oneSentence:
      "Cellular rejuvenation, mobility preservation, and long-term vitality practices.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Serene coastal wellness landscape for long-term health and vitality",
    icon: Activity,
  },
  {
    id: "executive",
    tabLabel: "Executive",
    fullTitle: "Executive Wellness",
    tag: "EXECUTIVE RECOVERY • COGNITIVE RESET",
    oneSentence:
      "Structured recovery journeys for high-responsibility leaders.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Quiet luxurious microclimate sanctuary for executive reset",
    icon: Award,
  },
  {
    id: "lifestyle",
    tabLabel: "Lifestyle",
    fullTitle: "Lifestyle Reset",
    tag: "DAILY RHYTHMS • NUTRITION & MOVEMENT",
    oneSentence:
      "Resetting daily nutrition, mindful movement, and sustainable life habits.",
    image:
      "https://images.unsplash.com/photo-1512290900673-70020088825d?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Mindful daily routine and wholesome lifestyle environment in nature",
    icon: RefreshCw,
  },
];
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : dir < 0 ? "100%" : 0,
    opacity: 1,
  }),
};
export function ExploreByGoalSection({ onSelectGoal }) {
  const [[activeGoalIndex, direction], setGoalSlide] = useState([0, 0]);
  const containerRef = useRef(null);
  const tabButtonRefs = useRef([]);
  const isDraggingRef = useRef(false);
  const currentGoal = GOALS[activeGoalIndex];
  const navigateToGoal = (newIndex) => {
    if (newIndex === activeGoalIndex) return;
    const newDir = newIndex > activeGoalIndex ? 1 : -1;
    setGoalSlide([newIndex, newDir]);
    track("goal_select", { goal: GOALS[newIndex].fullTitle });
    // Scroll active tab into view smoothly
    tabButtonRefs.current[newIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  const handleNext = () => {
    const nextIdx = (activeGoalIndex + 1) % GOALS.length;
    setGoalSlide([nextIdx, 1]);
    track("goal_select", { action: "next", goal: GOALS[nextIdx].fullTitle });
    tabButtonRefs.current[nextIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  const handlePrev = () => {
    const prevIdx = (activeGoalIndex - 1 + GOALS.length) % GOALS.length;
    setGoalSlide([prevIdx, -1]);
    track("goal_select", { action: "prev", goal: GOALS[prevIdx].fullTitle });
    tabButtonRefs.current[prevIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <section
      ref={containerRef}
      id="explore-by-goal"
      className="py-20 md:py-28 bg-[#F5F5F7] border-y border-[#D2D2D7] relative overflow-hidden text-left"
    >
      <div className="darshai-container text-left">
        <div className="text-left max-w-3xl mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#0E4D3A] uppercase mb-2">
            EXPLORE BY WELLNESS GOAL
          </p>
          <h2 className="typography-section-h2 font-bold text-[#111111] tracking-tight mb-2 leading-[1.1]">
            What Are You Looking to Improve?
          </h2>
          <p className="text-base sm:text-lg text-[#2C2C2E] font-semibold">
            Different goals. Different journeys.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 scrollbar-none border-b border-[#D2D2D7]/80">
            {GOALS.map((goal, idx) => {
              const isActive = activeGoalIndex === idx;
              const Icon = goal.icon;
              return (
                <button
                  type="button"
                  ref={(el) => {
                    tabButtonRefs.current[idx] = el;
                  }}
                  onClick={() => navigateToGoal(idx)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-white text-[#0E4D3A] shadow-sm border border-[#0E4D3A]/30 scale-[1.02]"
                      : "text-[#2C2C2E] hover:text-black hover:bg-white/70 font-semibold"
                  }`}
                  key={goal.id}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#0E4D3A]" : "text-[#2C2C2E]"}`}
                  />
                  <span>{goal.tabLabel}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeGoalIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#2C2C2E] font-medium pt-3">
            <span className="hidden sm:inline">
              Select a goal or swipe left/right to explore matching environment
              & programme
            </span>
            <span className="sm:hidden">Swipe or tap to explore goals</span>
            <span className="font-bold text-[#0E4D3A]">
              0{activeGoalIndex + 1} / 06
            </span>
          </div>
        </div>
        <div className="relative flex items-center gap-2 sm:gap-4 md:gap-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous wellness goal"
            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white hover:bg-[#0E4D3A] text-[#111111] hover:text-white border border-[#D2D2D7] hover:border-[#0E4D3A] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer z-30"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <div className="flex-1 min-w-0 relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#111111] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] border border-[#D2D2D7] group/cardContainer">
            <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                      mass: 0.8,
                    },
                    opacity: { duration: 0.25 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => {
                    isDraggingRef.current = true;
                  }}
                  onDragEnd={(_e, { offset, velocity }) => {
                    setTimeout(() => {
                      isDraggingRef.current = false;
                    }, 120);
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -100 || offset.x < -60) {
                      handleNext();
                    } else if (swipe > 100 || offset.x > 60) {
                      handlePrev();
                    }
                  }}
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    track("begin_journey", {
                      source: "explore_goals_card_click",
                      goal: currentGoal.fullTitle,
                    });
                    onSelectGoal(currentGoal.fullTitle);
                  }}
                  className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 sm:p-10 lg:p-14 cursor-pointer select-none group/card"
                  key={currentGoal.id}
                >
                  <img
                    src={currentGoal.image}
                    alt={currentGoal.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05] pointer-events-none transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/15 pointer-events-none transition-opacity duration-300 group-hover/card:opacity-90" />
                  <div className="absolute top-5 sm:top-8 left-5 sm:left-8 z-20 pointer-events-none flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                      <span>{currentGoal.tag}</span>
                    </div>
                  </div>
                  <div className="absolute top-5 sm:top-8 right-5 sm:right-8 z-20 pointer-events-none hidden sm:block">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0E4D3A]/90 text-white backdrop-blur-md border border-white/30 shadow-lg transition-transform duration-300 group-hover/card:scale-105">
                      <span>CLICK CARD TO PLAN JOURNEY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="relative z-20 text-white max-w-3xl flex flex-col items-start gap-4 pointer-events-none">
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover/card:text-[#34D399] transition-colors duration-300">
                        {currentGoal.fullTitle}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-normal">
                        {currentGoal.oneSentence}
                      </p>
                    </div>
                    <div className="pt-2 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          track("begin_journey", {
                            source: "explore_goals_button",
                            goal: currentGoal.fullTitle,
                          });
                          onSelectGoal(currentGoal.fullTitle);
                        }}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all cursor-pointer group/btn hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>
                          EXPLORE {currentGoal.tabLabel.toUpperCase()} JOURNEYS
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                {GOALS.map((_, idx) => (
                  <button
                    type="button"
                    onClick={() => navigateToGoal(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all rounded-full cursor-pointer ${
                      activeGoalIndex === idx
                        ? "w-5 h-2 bg-[#C6A660]"
                        : "w-2 h-2 bg-white/40 hover:bg-white/70"
                    }`}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next wellness goal"
            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white hover:bg-[#0E4D3A] text-[#111111] hover:text-white border border-[#D2D2D7] hover:border-[#0E4D3A] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer z-30"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              track("begin_journey", {
                source: "explore_goals",
                goal: currentGoal.fullTitle,
              });
              onSelectGoal(currentGoal.fullTitle);
            }}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#0E4D3A] text-white hover:bg-[#0A382A] font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>EXPLORE {currentGoal.tabLabel.toUpperCase()} JOURNEYS</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
export default ExploreByGoalSection;
