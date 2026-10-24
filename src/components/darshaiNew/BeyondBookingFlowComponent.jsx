import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";

const STEPS = [
  {
    step: "01",
    label: "ASSESSMENT & MATCH",
    value: "ASSESS & MATCH",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&h=900&fit=crop&auto=format",
    sub: "Physiological assessment & environmental intelligence matching",
  },
  {
    step: "02",
    label: "PLANNING & CONFIRMATION",
    value: "PLAN & CONFIRM",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&h=900&fit=crop&auto=format",
    sub: "Practitioner pre-arrival alignment, travel & custom itinerary",
  },
  {
    step: "03",
    label: "ACTIVE SUPPORT",
    value: "JOURNEY SUPPORT",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&h=900&fit=crop&auto=format",
    sub: "Real-time on-site concierge & direct centre communication",
  },
  {
    step: "04",
    label: "CONTINUITY & CARE",
    value: "FOLLOW-UP & CONTINUITY",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&h=900&fit=crop&auto=format",
    sub: "Post-programme health reviews & sustained habit guidance",
  },
];

export function BeyondBookingFlowComponent({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const autoplayRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleDeviceChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleDeviceChange();
    mediaQuery.addEventListener("change", handleDeviceChange);

    return () => {
      mediaQuery.removeEventListener("change", handleDeviceChange);
    };
  }, []);

  const getCardWidth = () => {
    if (!scrollRef.current) return 0;

    const container = scrollRef.current;
    const firstCard = container.querySelector("[data-step-card]");

    if (!firstCard) return 0;

    return firstCard.getBoundingClientRect().width + 16;
  };

  const scrollToStep = (index) => {
    const nextIndex = Math.max(
      0,
      Math.min(STEPS.length - 1, index),
    );

    setActiveStep(nextIndex);
    setIsAutoPlaying(false);

    if (!scrollRef.current || !isMobile) return;

    const cardWidth = getCardWidth();

    if (!cardWidth) return;

    scrollRef.current.scrollTo({
      left: nextIndex * cardWidth,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const handleMobileScroll = () => {
    if (!scrollRef.current || !isMobile) return;

    const cardWidth = getCardWidth();

    if (!cardWidth) return;

    const nextStep = Math.round(
      scrollRef.current.scrollLeft / cardWidth,
    );

    if (
      nextStep >= 0 &&
      nextStep < STEPS.length &&
      nextStep !== activeStep
    ) {
      setActiveStep(nextStep);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || shouldReduceMotion) return;

    autoplayRef.current = setInterval(() => {
      setActiveStep((previousStep) => {
        const nextStep =
          previousStep === STEPS.length - 1
            ? 0
            : previousStep + 1;

        if (scrollRef.current && isMobile) {
          const cardWidth = getCardWidth();

          if (cardWidth) {
            scrollRef.current.scrollTo({
              left: nextStep * cardWidth,
              behavior: "smooth",
            });
          }
        }

        return nextStep;
      });
    }, 2800);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoPlaying, isMobile, shouldReduceMotion]);

  const handlePointerEnter = () => {
    setIsAutoPlaying(false);
  };

  const handlePointerLeave = () => {
    setIsAutoPlaying(true);
  };

  const handleCTA = () => {
    track("journey_management_cta_clicked", {
      source: "beyond_booking_flow",
    });

    if (onNavigate) {
      onNavigate("journey-support");
    }
  };

  return (
    <div
      className="mx-auto max-w-6xl space-y-8"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <div
        ref={scrollRef}
        onScroll={handleMobileScroll}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x pb-4 pt-2 -mx-4 px-4 sm:gap-6 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-6 lg:pb-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {STEPS.map((item, index) => {
          const isActive = activeStep === index;
          const isPassed = activeStep > index;

          return (
            <div
              key={item.step}
              data-step-card
              onClick={() => scrollToStep(index)}
              className="relative flex w-[82vw] shrink-0 snap-center cursor-pointer flex-col sm:w-[320px] lg:w-auto"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  y: isActive ? -4 : 0,
                  borderColor: isActive
                    ? "#0E4D3A"
                    : isPassed
                      ? "rgba(14,77,58,0.5)"
                      : "rgba(255,255,255,0.15)",
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.025,
                        y: -6,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.985,
                        y: -1,
                      }
                }
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`apple-product-card relative flex h-[390px] flex-col justify-between overflow-hidden rounded-[24px] border bg-[#1D1D1F] p-6 transition-shadow duration-500 sm:h-[420px] ${
                  isActive
                    ? "z-10 shadow-[0_16px_36px_-6px_rgba(14,77,58,0.28)] ring-2 ring-[#0E4D3A]/30"
                    : "opacity-90 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.3)] hover:border-white/30"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden bg-[#0A1A14]">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : 1,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.1,
                          }
                    }
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full w-full"
                  >
                    <SmartImage
                      src={item.img}
                      alt={item.value}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-black/95 via-black/45 to-black/25"
                        : "bg-gradient-to-t from-black/85 via-black/40 to-black/20"
                    }`}
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <SignalBadge variant="dark" dot>
                    Step {item.step}
                  </SignalBadge>

                  {isActive && (
                    <motion.span
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.8 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-full bg-[#C6A660] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black shadow-xs"
                    >
                      FLOW MATCH
                    </motion.span>
                  )}
                </div>

                <div className="relative z-10 flex flex-col justify-end">
                  <SignalBadge
                    variant="dark"
                    dot
                    className="mb-2 w-fit border border-white/20 bg-black/60 backdrop-blur-md"
                  >
                    {item.label}
                  </SignalBadge>

                  <h3
                    className={`mb-1.5 font-display text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl ${
                      isActive
                        ? "text-[#C6A660]"
                        : "text-white"
                    }`}
                  >
                    {item.value}
                  </h3>

                  <p className="text-xs font-medium leading-relaxed text-white/85 sm:text-sm">
                    {item.sub}
                  </p>
                </div>
              </motion.div>

              {index < STEPS.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center sm:-right-3.5">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      backgroundColor: isActive
                        ? "#0E4D3A"
                        : "#1D1D1F",
                      color: isActive
                        ? "#FFFFFF"
                        : "#C6A660",
                      borderColor: isActive
                        ? "#0E4D3A"
                        : "rgba(255,255,255,0.3)",
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold shadow-md backdrop-blur-sm sm:h-8 sm:w-8"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-[#D2D2D7] pt-4">
        <div className="hidden w-24 shrink-0 sm:block" />

        <div className="flex flex-1 items-center justify-center gap-2 py-1.5 sm:gap-2.5">
          {STEPS.map((item, index) => (
            <button
              key={item.step}
              type="button"
              onClick={() => scrollToStep(index)}
              aria-label={`Select stage ${item.value}`}
              className="flex cursor-pointer items-center justify-center px-0.5 py-1 focus:outline-none"
            >
              <motion.div
                animate={{
                  width: isActive(index) ? 44 : 16,
                  opacity: activeStep === index ? 1 : 0.5,
                }}
                className={`h-1.5 rounded-full sm:h-2 ${
                  activeStep === index
                    ? "bg-[#0E4D3A] shadow-xs"
                    : "bg-[#1D1D1F]/25 hover:bg-[#1D1D1F]/50"
                }`}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            aria-label="Previous step"
            onClick={() =>
              scrollToStep(Math.max(0, activeStep - 1))
            }
            disabled={activeStep === 0}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-95 sm:h-10 sm:w-10 ${
              activeStep === 0
                ? "cursor-not-allowed border-[#D2D2D7] bg-[#E5E5EA] text-[#8E8E93] opacity-35"
                : "cursor-pointer border-[#D2D2D7] bg-white text-[#1D1D1F] shadow-xs hover:bg-[#0E4D3A] hover:text-white"
            }`}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            type="button"
            aria-label="Next step"
            onClick={() =>
              scrollToStep(
                Math.min(STEPS.length - 1, activeStep + 1),
              )
            }
            disabled={activeStep === STEPS.length - 1}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-95 sm:h-10 sm:w-10 ${
              activeStep === STEPS.length - 1
                ? "cursor-not-allowed border-[#D2D2D7] bg-[#E5E5EA] text-[#8E8E93] opacity-35"
                : "cursor-pointer border-[#D2D2D7] bg-white text-[#1D1D1F] shadow-xs hover:bg-[#0E4D3A] hover:text-white"
            }`}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <motion.button
          id="explore-journey-support-cta"
          type="button"
          onClick={handleCTA}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.01,
                }
          }
          whileTap={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 0.98,
                }
          }
          className="darshai-btn-primary group inline-flex cursor-pointer items-center gap-2 px-8 py-4 text-xs uppercase shadow-lg sm:text-sm"
        >
          <span>EXPLORE JOURNEY SUPPORT</span>

          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
}

<motion.div
  animate={{
    width: activeStep === index ? 44 : 16,
    opacity: activeStep === index ? 1 : 0.5,
  }}
  className={`h-1.5 rounded-full sm:h-2 ${
    activeStep === index
      ? "bg-[#0E4D3A] shadow-xs"
      : "bg-[#1D1D1F]/25 hover:bg-[#1D1D1F]/50"
  }`}
  transition={{
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  }}
/>


export default BeyondBookingFlowComponent;