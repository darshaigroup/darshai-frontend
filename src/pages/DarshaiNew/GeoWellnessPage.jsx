import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import Reveal from "../../components/darshaiNew/Reveal";
import { GeoWellnessProcess } from "../../components/darshaiNew/GeoWellnessProcess";
import { GeoWellnessHeroSection } from "../../components/darshaiNew/GeoWellnessHeroSection";
import { GeoWellnessPrincipleSection } from "../../components/darshaiNew/GeoWellnessPrincipleSection";
import { GeoWellnessExplainedVisionCards } from "../../components/darshaiNew/GeoWellnessExplainedVisionCards";
import { WhyDarshaiExistsInteractiveSection } from "../../components/darshaiNew/WhyDarshaiExistsInteractiveSection";
import SignalBadge from "../../components/darshaiNew/SignalBadge";
import useCursorHighlight from "../../components/darshaiNew/useCursorHighlight";
import { track } from "../../lib/darshaiNew/analytics";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function GeoWellnessPage({ onNavigate }) {
  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  const coreDimensionsScrollRef = useRef(null);
  const autoPlayRef = useRef(null);
  const isSectionVisibleRef = useRef(false);

  const [envSectionEl, setEnvSectionEl] = useState(null);

  const envSectionRef = useCallback((node) => {
    if (node !== null) setEnvSectionEl(node);
  }, []);

  const { scrollYProgress } = useScroll(
    envSectionEl
      ? {
          target: { current: envSectionEl },
          offset: ["start start", "end end"],
        }
      : { offset: ["start start", "end end"] },
  );

  const [currentEnvIndex, setCurrentEnvIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const idx = Math.min(Math.floor(latest * 5), 4);
      setCurrentEnvIndex(idx);
    });
  }, [scrollYProgress]);

  const parallax = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  function CoreDimensionCard({
    type,
    slug,
    img,
    points,
    isSelected = false,
    onClick,
  }) {
    const {
      ref: cardRef,
      onPointerMove,
      onPointerLeave,
      coords,
      shouldShow,
    } = useCursorHighlight();

    return (
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={`relative bg-white rounded-[22px] md:rounded-[26px] p-5 sm:p-6 border transition-all duration-300 group flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A] overflow-hidden apple-product-card ${
          isSelected
            ? "border-[#0E4D3A] ring-2 ring-[#0E4D3A]/20 shadow-lg scale-[1.02]"
            : "border-[#D2D2D7] hover:border-[#1D1D1F]/40"
        }`}
      >
        {shouldShow && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-[22px] md:rounded-[26px]"
            style={{
              background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(14,77,58,0.08), transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        <div>
          <div className="mb-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#F5F5F7] border border-[#D2D2D7]/60">
              <SmartImage
                src={img}
                alt={`${type} environment`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <SignalBadge variant="dark" dot>
                  {type}
                </SignalBadge>
              </div>
            </div>
          </div>

          <h3 className="font-display text-xl font-semibold text-[#1D1D1F] mb-3 group-hover:text-[#0E4D3A] transition-colors">
            {type}
          </h3>

          <div className="space-y-1.5">
            {points.map((pt) => (
              <p
                className="text-sm text-[#6E6E73] flex items-center gap-1.5"
                key={pt}
              >
                <span className="w-1 h-1 rounded-full bg-[#0E4D3A]" />
                <span>{pt}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function GeoWellnessPracticeFlowComponent() {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const practiceScrollRef = useRef(null);

    const practiceSteps = [
      {
        step: "01",
        label: "Individual Need",
        value: "Executive Burnout",
        img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=700&h=520&fit=crop&auto=format",
        sub: "Mental fatigue, stress & circadian rhythm disruption",
      },
      {
        step: "02",
        label: "Environment Preference",
        value: "Coastal Recovery",
        img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&h=520&fit=crop&auto=format",
        sub: "Negative ion ocean air & calming sea rhythms",
      },
      {
        step: "03",
        label: "Programme",
        value: "Executive Reset",
        img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&h=520&fit=crop&auto=format",
        sub: "Nervous system regulation & sleep optimization",
      },
      {
        step: "04",
        label: "Recommended Journey",
        value: "7 Days",
        img: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=700&h=520&fit=crop&auto=format",
        sub: "Personalized clinical protocol & ongoing guidance",
      },
    ];

    const scrollToStep = (idx) => {
      setActiveStep(idx);
      setIsAutoPlaying(false);

      if (practiceScrollRef.current) {
        const container = practiceScrollRef.current;
        const cardWidth = container.scrollWidth / practiceSteps.length;

        container.scrollTo({
          left: idx * cardWidth,
          behavior: "smooth",
        });
      }
    };

    const handleMobileScroll = () => {
      if (!practiceScrollRef.current || window.innerWidth >= 1024) return;

      const container = practiceScrollRef.current;
      const cardWidth = container.scrollWidth / practiceSteps.length;

      if (cardWidth > 0) {
        const step = Math.round(container.scrollLeft / cardWidth);

        if (step >= 0 && step < practiceSteps.length) {
          setActiveStep(step);
        }
      }
    };

    useEffect(() => {
      if (!isAutoPlaying) return;

      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const nextStep = (prev + 1) % practiceSteps.length;

          if (practiceScrollRef.current && window.innerWidth < 1024) {
            const container = practiceScrollRef.current;
            const cardWidth = container.scrollWidth / practiceSteps.length;

            container.scrollTo({
              left: nextStep * cardWidth,
              behavior: "smooth",
            });
          }

          return nextStep;
        });
      }, 2800);

      return () => clearInterval(interval);
    }, [isAutoPlaying, practiceSteps.length]);

    return (
      <div
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="max-w-6xl mx-auto"
      >
        <div
          ref={practiceScrollRef}
          onScroll={handleMobileScroll}
          className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none no-scrollbar touch-pan-x scroll-smooth items-stretch"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {practiceSteps.map(({ step, label, value, img, sub }, index) => {
            const isActive = activeStep === index;
            const isPassed = activeStep > index;

            return (
              <div
                onClick={() => scrollToStep(index)}
                className="snap-center shrink-0 w-[82vw] sm:w-[320px] lg:w-auto relative flex flex-col cursor-pointer group"
                key={step}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    borderColor: isActive
                      ? "#0E4D3A"
                      : isPassed
                        ? "rgba(14,77,58,0.5)"
                        : "rgba(255,255,255,0.15)",
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative h-[390px] sm:h-[420px] bg-[#1D1D1F] rounded-[24px] overflow-hidden border flex flex-col justify-between p-6 transition-all duration-500 apple-product-card ${
                    isActive
                      ? "shadow-[0_16px_36px_-6px_rgba(14,77,58,0.28)] ring-2 ring-[#0E4D3A]/30 z-10"
                      : "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.3)] hover:border-white/30 opacity-90"
                  }`}
                >
                  <div className="absolute inset-0 bg-[#0A1A14] overflow-hidden">
                    <div className="w-full h-full">
                      <SmartImage
                        src={img}
                        alt={value}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div
                      className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                        isActive
                          ? "bg-gradient-to-t from-black/95 via-black/45 to-black/25"
                          : "bg-gradient-to-t from-black/85 via-black/40 to-black/20"
                      }`}
                    />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <SignalBadge variant="dark" dot>
                      Step {step}
                    </SignalBadge>

                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-2.5 py-1 rounded-full bg-[#C6A660] text-black text-[9px] font-bold uppercase tracking-wider shadow-xs"
                      >
                        FLOW MATCH
                      </motion.span>
                    )}
                  </div>

                  <div className="relative z-10 flex flex-col justify-end">
                    <SignalBadge
                      variant="dark"
                      dot
                      className="mb-2 w-fit bg-black/60 backdrop-blur-md border border-white/20"
                    >
                      {label}
                    </SignalBadge>

                    <h3
                      className={`font-display text-2xl sm:text-3xl font-semibold tracking-tight transition-colors mb-1.5 ${
                        isActive ? "text-[#C6A660]" : "text-white"
                      }`}
                    >
                      {value}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-medium">
                      {sub}
                    </p>
                  </div>
                </motion.div>

                {index < practiceSteps.length - 1 && (
                  <div className="absolute -right-3 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{
                        scale: activeStep === index ? 1.2 : 1,
                        backgroundColor:
                          activeStep === index ? "#0E4D3A" : "#1D1D1F",
                        color: activeStep === index ? "#FFFFFF" : "#C6A660",
                        borderColor:
                          activeStep === index
                            ? "#0E4D3A"
                            : "rgba(255,255,255,0.3)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow-md flex items-center justify-center text-xs font-bold backdrop-blur-sm"
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-[#D2D2D7] flex items-center justify-between">
          <div className="hidden sm:block w-24 shrink-0" />

          <div className="flex-1 flex justify-center items-center gap-2 sm:gap-2.5 py-1.5">
            {practiceSteps.map((s, idx) => (
              <button
                type="button"
                onClick={() => scrollToStep(idx)}
                aria-label={`Select flow step ${s.step}`}
                className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center py-1 px-0.5"
                key={s.step}
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeStep === idx
                      ? "w-8 sm:w-11 bg-[#0E4D3A] shadow-xs"
                      : "w-3.5 sm:w-4 bg-[#1D1D1F]/25 hover:bg-[#1D1D1F]/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              aria-label="Previous step"
              onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                activeStep === 0
                  ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                  : "bg-white hover:bg-[#0E4D3A] text-[#1D1D1F] hover:text-white border-[#D2D2D7] shadow-xs active:scale-95"
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              aria-label="Next step"
              onClick={() =>
                scrollToStep(Math.min(practiceSteps.length - 1, activeStep + 1))
              }
              disabled={activeStep === practiceSteps.length - 1}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                activeStep === practiceSteps.length - 1
                  ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                  : "bg-white hover:bg-[#0E4D3A] text-[#1D1D1F] hover:text-white border-[#D2D2D7] shadow-xs active:scale-95"
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <GeoWellnessHeroSection
        onDiscoverClick={() => scrollToSection("why-environment-matters")}
      />

      <GeoWellnessPrincipleSection id="why-environment-matters" />

      <GeoWellnessExplainedVisionCards />

      <section
        ref={envSectionRef}
        id="core-dimensions"
        className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28"
      >
        <div className="darshai-container">
          {(() => {
            const coreDimensionsList = [
              {
                type: "Coastal",
                slug: "coast",
                img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&h=900&fit=crop&auto=format",
                points: ["Ocean cliffs", "Sea breeze", "Salt air"],
                microclimate: "High Salinity & Negative Ion Sea Air",
                elevation: "Sea Level (0 – 50m)",
              },
              {
                type: "Mountain",
                slug: "mountain",
                img: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&h=900&fit=crop&auto=format",
                points: ["Cloud movement", "Elevation", "Silence"],
                microclimate: "Sub-Alpine Atmosphere & Pristine Air Quality",
                elevation: "High Altitude (1,200m – 2,200m)",
              },
              {
                type: "Forest",
                slug: "forest",
                img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=900&fit=crop&auto=format",
                points: ["Canopy immersion", "Bird sounds", "Negative ions"],
                microclimate: "Dense Evergreen Canopy & Elevated Phytoncides",
                elevation: "Sub-Alpine Canopy (400m – 900m)",
              },
              {
                type: "Heritage",
                slug: "heritage",
                img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1600&h=900&fit=crop&auto=format",
                points: ["Traditional architecture", "Slow rhythm", "Culture"],
                microclimate:
                  "Protected Cultural Enclave & Ancient Micro-Valley",
                elevation: "Foothill Sanctuary (200m – 600m)",
              },
              {
                type: "Urban-Nature",
                slug: "urban-nature",
                img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&h=900&fit=crop&auto=format",
                points: [
                  "Modern luxury",
                  "Green spaces",
                  "Controlled wellness",
                ],
                microclimate: "Filtered Biophilic Sanctuary & Pure Air Enclave",
                elevation: "Metro Natural Buffer",
              },
            ];

            const activeEnv = coreDimensionsList[activeEnvIndex];

            const handleEnvironmentChange = (idx) => {
              setActiveEnvIndex(idx);

              if (coreDimensionsScrollRef.current) {
                const container = coreDimensionsScrollRef.current;
                const item = container.children[idx];

                if (item) {
                  item.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }
              }
            };

            return (
              <div className="space-y-10">
                <Reveal>
                  <div className="max-w-3xl pb-6 border-b border-[#D2D2D7]">
                    <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                      CORE DIMENSIONS
                    </p>

                    <h2 className="typography-section-h2 text-[#1D1D1F]">
                      Every Environment Creates a Different Experience.
                    </h2>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <div
                    ref={coreDimensionsScrollRef}
                    className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory scroll-smooth touch-pan-x"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {coreDimensionsList.map((env, idx) => {
                      const isActive = activeEnvIndex === idx;

                      return (
                        <button
                          type="button"
                          onClick={() => handleEnvironmentChange(idx)}
                          aria-label={`Select ${env.type} environment`}
                          className={`typography-ui-button px-5 py-2.5 rounded-full uppercase tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-2.5 whitespace-nowrap cursor-pointer border shrink-0 snap-center ${
                            isActive
                              ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md scale-[1.02]"
                              : "bg-white text-[#6E6E73] border-[#D2D2D7] hover:border-[#1D1D1F]/40 hover:text-[#1D1D1F] hover:-translate-y-0.5"
                          }`}
                          key={env.type}
                        >
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                              isActive
                                ? "bg-[#C6A660] scale-110"
                                : "bg-[#D2D2D7]"
                            }`}
                          />

                          <span>{env.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </Reveal>

                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: activeEnvIndex > 0 ? 35 : -35,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: activeEnvIndex > 0 ? -35 : 35,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="space-y-8"
                    key={activeEnv.type}
                  >
                    <div>
                      <p className="typography-eyebrow text-[#0E4D3A] mb-1">
                        GEO-WELLNESS PROFILE
                      </p>

                      <h3 className="typography-h3 text-[#1D1D1F]">
                        {activeEnv.type} Environment
                      </h3>
                    </div>

                    <div className="pt-2">
                      <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[380px] sm:min-h-[280px] lg:min-h-0 rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#1D1D1F] border border-[#D2D2D7] shadow-2xl group">
                        <AnimatePresence mode="wait">
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 1.03,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.99,
                            }}
                            transition={{
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="w-full h-full absolute inset-0"
                            key={activeEnv.type}
                          >
                            <SmartImage
                              src={activeEnv.img}
                              alt={`${activeEnv.type} environment`}
                              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                            <div className="absolute inset-0 bg-[#0E4D3A]/0 group-hover:bg-[#0E4D3A]/10 transition-colors duration-700 pointer-events-none" />
                          </motion.div>
                        </AnimatePresence>

                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none gap-3">
                          <SignalBadge variant="dark" dot>
                            {activeEnv.type}
                          </SignalBadge>

                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C6A660] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                            Geo-Wellness Sanctuary
                          </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 z-10 text-white pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C6A660] mb-1 font-mono">
                              MICROCLIMATE PROFILE
                            </p>

                            <p className="text-base sm:text-xl font-medium text-white drop-shadow-md leading-snug">
                              {activeEnv.microclimate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-4">
                        KEY ENVIRONMENTAL DIMENSIONS
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {activeEnv.points.map((pt, pIdx) => (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 16,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.45,
                              delay: pIdx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white p-5 rounded-2xl border border-[#D2D2D7]/80 shadow-xs flex items-center gap-3.5 hover:border-[#0E4D3A]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                            key={pt}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0E4D3A] shrink-0" />

                            <span className="font-medium text-[#1D1D1F] text-base sm:text-lg leading-snug">
                              {pt}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="pt-6 border-t border-[#D2D2D7] flex flex-col items-center gap-4">
                  <div className="w-full flex items-center justify-center gap-4 sm:gap-6">
                    <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar max-w-[65%] sm:max-w-none">
                      {coreDimensionsList.map((env, idx) => {
                        const isActive = activeEnvIndex === idx;

                        return (
                          <button
                            type="button"
                            onClick={() => handleEnvironmentChange(idx)}
                            aria-label={`Select environment ${env.type}`}
                            className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center py-1 px-0.5 shrink-0"
                            key={env.type}
                          >
                            <div
                              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isActive
                                  ? "w-8 sm:w-11 bg-[#1D1D1F] shadow-xs"
                                  : "w-2 sm:w-3 bg-[#1D1D1F]/25 hover:bg-[#1D1D1F]/50"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                      <button
                        type="button"
                        aria-label="Previous environment"
                        onClick={() =>
                          handleEnvironmentChange(
                            activeEnvIndex === 0
                              ? coreDimensionsList.length - 1
                              : activeEnvIndex - 1,
                          )
                        }
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button
                        type="button"
                        aria-label="Next environment"
                        onClick={() =>
                          handleEnvironmentChange(
                            (activeEnvIndex + 1) % coreDimensionsList.length,
                          )
                        }
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center w-full">
                    <button
                      type="button"
                      id="explore-centres-universal-cta"
                      onClick={() => {
                        track("centre_view", { environment: activeEnv.slug });
                        navigateTo("centres");
                      }}
                      className="darshai-btn-primary uppercase cursor-pointer group text-xs sm:text-sm inline-flex items-center justify-center gap-2 px-8 py-4 shadow-lg"
                    >
                      <span>EXPLORE CENTRES</span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ x: [-2, 5, -2] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-flex items-center font-bold"
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <WhyDarshaiExistsInteractiveSection
        onExploreClick={() => scrollToSection("geo-wellness-process")}
      />

      <GeoWellnessProcess onNavigate={navigateTo} />

      <section
        id="geo-wellness-in-practice"
        className="section-editorial bg-white border-b border-[#D2D2D7] py-20 md:py-28"
      >
        <div className="darshai-container">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                GEO-WELLNESS IN PRACTICE
              </p>

              <h2 className="typography-section-h2 text-[#1D1D1F] mb-4">
                Real-World Journey Alignment.
              </h2>

              <p className="typography-lead text-[#4A4A4A]">
                Show real examples of how person, environment, and protocol
                converge.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GeoWellnessPracticeFlowComponent />
          </Reveal>
        </div>
      </section>

      <FinalCTA
        id="the-future-of-wellness"
        eyebrow="THE FUTURE OF WELLNESS"
        heading="The Future of Health Is Understanding Where You Are."
        description="Explore how personalized assessment and environmental intelligence can help shape a more relevant wellness journey."
        buttonText="BEGIN YOUR JOURNEY"
        buttonOnClick={() => {
          track("begin_journey", {
            source: "geowellness_combined_cta",
          });
          navigateTo("contact");
        }}
        secondaryButtonText="EXPLORE CENTRES"
        secondaryButtonOnClick={() => {
          track("centre_view", {
            source: "geowellness_combined_cta",
          });
          navigateTo("centres");
        }}
        bgImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&h=1000&fit=crop&auto=format"
      />
    </main>
  );
}

export default GeoWellnessPage;
