import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
import { Sparkles } from "lucide-react";

const QUESTIONS = [
  {
    id: "centre",
    num: "01",
    question: "Which Centre?",
    pill: "Centre",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "Vetted Indian wellness sanctuary centre in tranquil nature",
  },
  {
    id: "programme",
    num: "02",
    question: "Which Programme?",
    pill: "Programme",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&auto=format&fit=crop&q=85",
    imageAlt:
      "Restorative wellness programme and therapeutic Ayurvedic treatment",
  },
  {
    id: "environment",
    num: "03",
    question: "Which Environment?",
    pill: "Environment",
    image:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "Atmospheric mountain ridges and bio-climatic sanctuary",
  },
  {
    id: "duration",
    num: "04",
    question: "Which Duration?",
    pill: "Duration",
    image:
      "https://images.unsplash.com/photo-1507525428033-b7228ec91e47?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "Serene horizon reflecting journey duration and natural recovery",
  },
  {
    id: "goals",
    num: "05",
    question: "Which Goals?",
    pill: "Goals",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=85",
    imageAlt:
      "Mindful individual meditation aligned with personal wellness goals",
  },
];

export function WhyDarshaiExistsInteractiveSection({
  id = "why-darshai-exists",
  onExploreClick,
}) {
  const containerRef = useRef(null);
  const questionNavRef = useRef(null);

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isClimaxActive, setIsClimaxActive] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.8,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.16) {
        setActiveStageIndex(0);
        setIsClimaxActive(false);
      } else if (latest < 0.32) {
        setActiveStageIndex(1);
        setIsClimaxActive(false);
      } else if (latest < 0.48) {
        setActiveStageIndex(2);
        setIsClimaxActive(false);
      } else if (latest < 0.64) {
        setActiveStageIndex(3);
        setIsClimaxActive(false);
      } else if (latest < 0.8) {
        setActiveStageIndex(4);
        setIsClimaxActive(false);
      } else {
        setIsClimaxActive(true);
      }
    });
  }, [scrollYProgress]);

  const activeQuestion = QUESTIONS[activeStageIndex];

  /* Keep the active mobile pill automatically tracked */
  useEffect(() => {
    const container = questionNavRef.current;
    if (!container || isClimaxActive) return;

    const activeButton = container.children[activeStageIndex];
    if (!activeButton) return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;

    const containerWidth = container.clientWidth;
    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;

    const targetLeft = buttonLeft + buttonWidth / 2 - containerWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeStageIndex, isClimaxActive]);

  const changeStage = (nextIndex) => {
    if (nextIndex === activeStageIndex && !isClimaxActive) return;

    setSlideDirection(nextIndex > activeStageIndex ? 1 : -1);
    setActiveStageIndex(nextIndex);
    setIsClimaxActive(false);
  };

  const scrollToStage = (stepIndex) => {
    if (!containerRef.current) return;

    const targetPercentages = [0.08, 0.24, 0.4, 0.56, 0.72];

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const containerTop = rect.top + scrollTop;

    const scrollDistance =
      containerRef.current.offsetHeight - window.innerHeight;

    const targetY =
      containerTop + scrollDistance * targetPercentages[stepIndex];

    changeStage(stepIndex);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const scrollToClimax = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const containerTop = rect.top + scrollTop;

    const scrollDistance =
      containerRef.current.offsetHeight - window.innerHeight;

    setIsClimaxActive(true);

    window.scrollTo({
      top: containerTop + scrollDistance * 0.92,
      behavior: "smooth",
    });
  };

  const resetToStart = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.scrollTo({
      top: rect.top + scrollTop,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative bg-white border-b border-[#D2D2D7] h-[220vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-white z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-6 lg:py-8">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-between h-full max-h-[860px]">
          <div className="mb-4 sm:mb-6 lg:mb-8 shrink-0 w-full pb-4 sm:pb-5 border-b border-[#D2D2D7]">
            <p className="typography-eyebrow text-[#0E4D3A] mb-2 sm:mb-3 uppercase tracking-[0.25em] font-semibold">
              WHY DARSHAI EXISTS
            </p>

            <h2 className="typography-section-h2 text-[#1D1D1F] font-semibold tracking-tight leading-[1.08]">
              <span>Finding Wellness Is Easy.</span>
              <br />
              <span className="text-[#0E4D3A]">
                Finding What Fits You Is Hard.
              </span>
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-12 flex-1 min-h-0 items-center">
            {/* MOBILE / TABLET IMAGE FIRST */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative w-full h-auto aspect-square sm:aspect-square lg:aspect-auto lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#1D1D1F] group shrink-0">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={isClimaxActive ? "climax-image" : activeQuestion.id}
                  custom={slideDirection}
                  initial={{
                    opacity: 0,
                    x: slideDirection > 0 ? 45 : -45,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: slideDirection > 0 ? -45 : 45,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <SmartImage
                    src={
                      isClimaxActive
                        ? "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=85"
                        : activeQuestion.image
                    }
                    alt={activeQuestion.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 bg-[#0E4D3A]/0 lg:group-hover:bg-[#0E4D3A]/10 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-10 text-white">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-[10px] border border-white/15 shadow-xs space-y-1">
                  <SignalBadge variant="dark" dot>
                    {isClimaxActive
                      ? "INDIVIDUAL CONVERGENCE"
                      : activeQuestion.pill.toUpperCase()}
                  </SignalBadge>

                  <p className="text-[11px] sm:text-[13px] text-white/90 font-medium leading-snug">
                    {isClimaxActive
                      ? "Harmonizing physiological baseline with environment microclimates."
                      : `Evaluating ${activeQuestion.pill.toLowerCase()} alignment across verified retreats.`}
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP LEFT / MOBILE BELOW IMAGE */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between h-full min-h-0 py-1 sm:py-2">
              <div className="w-full">
                <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-5">
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] border border-[#0E4D3A]/15 backdrop-blur-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A] animate-pulse" />

                    <span>
                      {isClimaxActive
                        ? "THE DARSHAI RESOLUTION"
                        : "UNANSWERED WELLNESS QUESTIONS"}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-semibold text-[#86868B] hidden sm:inline-block">
                    {isClimaxActive
                      ? "Resolved"
                      : "Scroll to resolve questions"}
                  </span>
                </div>

                {/* QUESTION TRACK */}
                <div
                  ref={questionNavRef}
                  className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 py-1 no-scrollbar scrollbar-none snap-x snap-mandatory touch-pan-x scroll-smooth w-full"
                >
                  {QUESTIONS.map((stg, idx) => {
                    const isActive =
                      !isClimaxActive && activeStageIndex === idx;

                    const isPassed = !isClimaxActive && activeStageIndex > idx;

                    return (
                      <button
                        type="button"
                        onClick={() => scrollToStage(idx)}
                        aria-label={`Select ${stg.pill}`}
                        aria-current={isActive ? "step" : undefined}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center gap-1 sm:gap-1.5 border backdrop-blur-[10px] shrink-0 snap-center ${
                          isActive
                            ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-xs scale-105"
                            : isPassed
                              ? "bg-[#0E4D3A]/10 text-[#0E4D3A] border-[#0E4D3A]/30 font-semibold"
                              : "bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5EA] hover:bg-white hover:text-[#111111]"
                        }`}
                        key={stg.id}
                      >
                        <span
                          className={isActive ? "text-[#34D399]" : "opacity-70"}
                        >
                          {isPassed ? "✓" : stg.num}
                        </span>

                        <span>{stg.pill}</span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={scrollToClimax}
                    aria-label="Go to Darshai resolution"
                    aria-current={isClimaxActive ? "step" : undefined}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all duration-300 cursor-pointer border backdrop-blur-[10px] shrink-0 snap-center ${
                      isClimaxActive
                        ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-xs scale-105"
                        : "bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5EA] hover:bg-white"
                    }`}
                  >
                    ✦ Resolution
                  </button>
                </div>
              </div>

              {/* QUESTION AREA */}
              <div className="relative my-4 sm:my-8 lg:my-10 min-h-[260px] sm:min-h-[360px] lg:min-h-[420px] flex items-center">
                {!isClimaxActive && (
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={activeQuestion.id}
                      custom={slideDirection}
                      initial={{
                        opacity: 0,
                        x: slideDirection > 0 ? 45 : -45,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: slideDirection > 0 ? -45 : 45,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full h-full flex items-center py-4 sm:py-6 lg:py-8"
                    >
                      <div className="w-full flex flex-col items-start justify-center gap-4 sm:gap-6 lg:gap-7">
                        <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-[#0E4D3A] text-white flex items-center justify-center font-bold text-lg sm:text-2xl shrink-0 shadow-md ring-4 ring-[#0E4D3A]/10">
                          <span>✓</span>
                        </div>

                        <div className="w-full max-w-3xl">
                          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#0E4D3A] font-semibold mb-2 sm:mb-3">
                            QUESTION {activeQuestion.num}
                          </p>

                          <h3 className="text-3xl sm:text-5xl lg:text-[68px] font-semibold text-[#111111] leading-[1.08] tracking-tight">
                            {activeQuestion.question}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {isClimaxActive && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full flex items-center"
                  >
                    <div className="w-full rounded-3xl bg-gradient-to-br from-[#0E4D3A]/18 via-[#0E4D3A]/10 to-[#0E4D3A]/5 backdrop-blur-[12px] border-2 border-[#0E4D3A] p-6 sm:p-9 lg:p-10 shadow-[0_16px_50px_rgba(14,77,58,0.22)] relative overflow-hidden">
                      <div className="relative z-10 space-y-3 sm:space-y-5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest bg-[#0E4D3A] text-white shadow-md">
                          <Sparkles className="w-3.5 h-3.5 text-[#C6A660]" />
                          <span>THE DARSHAI RESOLUTION</span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0E4D3A] tracking-tight leading-snug">
                          “This is where DARSHAI begins.”
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyDarshaiExistsInteractiveSection;
