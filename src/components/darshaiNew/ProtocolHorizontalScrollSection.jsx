import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";

export const VALID_PROTOCOLS = ["restore", "rebalance", "longevity"];

export const PROTOCOL_DATA = {
  restore: {
    badge: "PROTOCOL 01",
    title: "DARSHAI RESTORE",
    shortTitle: "Restore",
    subtitle:
      "A focused week to step away from daily demands, reset your routine, and begin restoring energy.",
    focusAreas: ["Recovery", "Rest", "Daily routine"],
    duration: "7 DAYS",
    ctaText: "EXPLORE RESTORE",
    image:
      "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "Restorative Sanctuary",
    imageAlt: "Darshai Restore restorative environment and therapies",
  },
  rebalance: {
    badge: "PROTOCOL 02",
    title: "DARSHAI REBALANCE",
    shortTitle: "Rebalance",
    subtitle:
      "Two weeks for a deeper, structured wellness immersion designed to build balance through sustained care and restorative practices.",
    focusAreas: [
      "Structured care",
      "Restorative practices",
      "Wellbeing routines",
    ],
    duration: "14 DAYS",
    ctaText: "EXPLORE REBALANCE",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "Balanced Rejuvenation Sanctuary",
    imageAlt: "Darshai Rebalance structured wellness sanctuary",
  },
  longevity: {
    badge: "PROTOCOL 03",
    title: "DARSHAI LONGEVITY",
    shortTitle: "Longevity",
    subtitle:
      "Three weeks for a more comprehensive wellness journey focused on healthy-ageing foundations, lasting habits, and long-term vitality.",
    focusAreas: [
      "Healthy-ageing foundations",
      "Sustainable habits",
      "Long-term vitality",
    ],
    duration: "21 DAYS",
    ctaText: "EXPLORE LONGEVITY",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "Longevity & Vitality Sanctuary",
    imageAlt: "Darshai Longevity comprehensive wellness journey",
  },
};

export const PROTOCOL_DEEP_DIVE = {
  restore: {
    overview:
      "A focused week to step away from daily demands, reset your routine, and begin restoring energy through targeted recovery and restorative practices.",
    clinicalTherapies: [
      "Nervous System Regulation",
      "Somatic Bio-Reset",
      "Targeted Hydro-Therapy",
      "Circadian Alignment",
    ],
    diagnosticBaseline: [
      "HRV Telemetry",
      "Sleep Architecture Analysis",
      "Stress & Fatigue Index",
    ],
    dailyRhythm: [
      { time: "07:00 AM", activity: "Circadian Sunlight & Gentle Movement" },
      { time: "10:00 AM", activity: "Restorative Bodywork & Thermal Care" },
      { time: "03:00 PM", activity: "Microclimate Immersion" },
      { time: "07:00 PM", activity: "Wind-down & Sleep Hygiene Protocol" },
    ],
    geoAlignment:
      "Calm natural environments chosen to ease sympathetic nervous system activation.",
    includedServices: [
      "Private Sanctuary Suite",
      "Dedicated Protocol Practitioner",
      "Personalized Bio-Nutritional Dining",
    ],
  },
  rebalance: {
    overview:
      "Two weeks for a deeper, structured wellness immersion designed to build balance through sustained care and restorative practices.",
    clinicalTherapies: [
      "Structured Care Sessions",
      "Restorative Bodywork",
      "Metabolic Reset",
      "Circadian Rhythm Re-alignment",
    ],
    diagnosticBaseline: [
      "Comprehensive Biomarker Assessment",
      "Metabolic Profile",
      "Gut-Health Evaluation",
    ],
    dailyRhythm: [
      { time: "07:30 AM", activity: "Mindfulness & Morning Circulation" },
      { time: "10:30 AM", activity: "Structured Rebalance Therapy" },
      { time: "03:00 PM", activity: "Terrain Walk & Hydro-Thermal Care" },
      { time: "06:30 PM", activity: "Evening Integration Circle" },
    ],
    geoAlignment:
      "Sanctuaries with balanced microclimates supporting sustained equilibrium and restorative calm.",
    includedServices: [
      "Private Sanctuary Suite",
      "Dedicated Medical & Wellness Team",
      "Custom Nutritional Planning",
    ],
  },
  longevity: {
    overview:
      "Three weeks for a more comprehensive wellness journey focused on healthy-ageing foundations, lasting habits, and long-term vitality.",
    clinicalTherapies: [
      "Cellular Healthspan Therapies",
      "Sub-Alpine Adaptation",
      "Metabolic Optimization",
      "Advanced Hydro-Thermal Rest",
    ],
    diagnosticBaseline: [
      "Biological Age & Vitality Assessment",
      "Mitochondrial Function Analysis",
      "Comprehensive Metabolic Profiling",
    ],
    dailyRhythm: [
      { time: "07:00 AM", activity: "Altitude Adaptive Breathwork" },
      { time: "10:00 AM", activity: "Longevity Clinical Therapies" },
      { time: "03:30 PM", activity: "Terrain Conditioning & Conditioning" },
      {
        time: "07:00 PM",
        activity: "Vitality Nutrition & Longevity Education",
      },
    ],
    geoAlignment:
      "Sub-alpine and oxygen-rich nature terrains supporting cellular rejuvenation and healthspan.",
    includedServices: [
      "Private Rejuvenation Villa",
      "Longevity Specialist Team",
      "Long-term Healthspan Roadmap",
    ],
  },
};

export function ProtocolHorizontalScrollSection({
  id = "protocols-showcase",
  onNavigate,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const navRef = useRef(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeDeepDive, setActiveDeepDive] = useState(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateScrollRange = () => {
      if (!trackRef.current) return;

      const totalWidth = trackRef.current.scrollWidth;
      const visibleWidth = window.innerWidth;
      const maxRange = Math.max(0, totalWidth - visibleWidth);

      setScrollRange(maxRange);
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

  const rawX = useTransform(
    scrollYProgress,
    [0.02, 0.98],
    [0, -scrollRange],
  );

  const horizontalX = useSpring(rawX, {
    stiffness: 180,
    damping: 26,
    mass: 0.2,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const total = VALID_PROTOCOLS.length;

      const index = Math.min(
        total - 1,
        Math.max(0, Math.floor(latest * total)),
      );

      setActiveCardIndex(index);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (!navRef.current) return;

    const activeButton = navRef.current.children[activeCardIndex];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCardIndex]);

  const scrollToCard = (index) => {
    if (!containerRef.current) return;

    const safeIndex = Math.min(
      VALID_PROTOCOLS.length - 1,
      Math.max(0, index),
    );

    setActiveCardIndex(safeIndex);

    const sectionTop =
      window.scrollY + containerRef.current.getBoundingClientRect().top;

    const scrollableHeight =
      containerRef.current.offsetHeight - window.innerHeight;

    const targetProgress =
      0.02 + (safeIndex / (VALID_PROTOCOLS.length - 1)) * 0.94;

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
           <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#0E4D3A] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>THE DARSHAI METHOD</span>
              </p>

              <h2 className="text-[46px] sm:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-tight mb-3">
                <span className="text-[#1D1D1F] block">Different Goals.</span>
                <span className="text-[#0E4D3A] block">Different Journeys.</span>
              </h2>

              <p className="typography-lead text-[#48484A] font-normal leading-relaxed">
                Choose a starting point. We help shape the journey around you.
              </p>
            </div>

            <div
              ref={navRef}
              className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory scroll-smooth touch-pan-x"
            >
              {VALID_PROTOCOLS.map((idKey, idx) => {
                const protocol = PROTOCOL_DATA[idKey];
                const isSelected = activeCardIndex === idx;

                return (
                  <button
                    type="button"
                    onClick={() => {
                      track("protocol_select", { protocol: idKey });
                      scrollToCard(idx);
                    }}
                    aria-current={isSelected ? "step" : undefined}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap border shrink-0 snap-center ${
                      isSelected
                        ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md scale-[1.02]"
                        : "bg-white text-[#6E6E73] border-[#D2D2D7] hover:border-[#1D1D1F]/40 hover:text-[#1D1D1F]"
                    }`}
                    key={idKey}
                  >
                    <span className="opacity-60 mr-1 font-mono">
                      0{idx + 1}
                    </span>
                    <span>{protocol.shortTitle}</span>
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
            {VALID_PROTOCOLS.map((idKey, idx) => {
              const protocol = PROTOCOL_DATA[idKey];
              const isActive = activeCardIndex === idx;

              return (
                <motion.div
                  className={`w-[88vw] sm:w-[560px] lg:w-[620px] shrink-0 bg-[#1D1D1F] rounded-[28px] sm:rounded-[36px] border p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group min-h-[460px] sm:min-h-[520px] transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-[#34D399]/40 shadow-[0_0_35px_rgba(52,211,153,0.18)] scale-100 opacity-100"
                      : "border-white/20 scale-[0.98] opacity-90 hover:opacity-100"
                  }`}
                  onClick={() => {
                    track("protocol_select", { protocol: idKey });
                    onNavigate(`/programs/${idKey}`);
                  }}
                  key={idKey}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <SmartImage
                      src={protocol.image}
                      alt={protocol.imageAlt}
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isActive
                          ? "scale-108 brightness-[0.72]"
                          : "scale-100 brightness-[0.88] group-hover:scale-108"
                      }`}
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 transition-all duration-500 ${
                        isActive
                          ? "via-black/75"
                          : "group-hover:via-black/75"
                      }`}
                    />

                    <div
                      className={`absolute inset-0 bg-[#0E4D3A]/10 transition-opacity duration-500 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  <div className="relative z-10 flex items-center justify-between gap-2 mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      {protocol.badge}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      <Clock className="w-4 h-4 text-[#34D399]" />
                      <span>{protocol.duration}</span>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-2 mt-auto pb-3 text-white text-center flex flex-col items-center">
                    <h3
                      className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white drop-shadow-md transition-colors duration-300 ${
                        isActive
                          ? "text-[#34D399]"
                          : "group-hover:text-[#34D399]"
                      }`}
                    >
                      {protocol.title}
                    </h3>

                    <div
                      className={`max-h-[360px] opacity-100 pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden space-y-4 pt-3 w-full flex flex-col items-center ${
                        isActive
                          ? "translate-y-0"
                          : "lg:max-h-0 lg:opacity-0 lg:pointer-events-none lg:pt-0 lg:translate-y-4 lg:group-hover:max-h-[360px] lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto lg:group-hover:pt-3 lg:group-hover:translate-y-0"
                      }`}
                    >
                      <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal max-w-lg drop-shadow-xs text-center mx-auto">
                        {protocol.subtitle}
                      </p>

                      {protocol.focusAreas &&
                        protocol.focusAreas.length > 0 && (
                          <div className="pt-3 border-t border-white/20 w-full flex flex-col items-center">
                            <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider mb-2 font-semibold text-center">
                              Journey focus:
                            </p>

                            <div className="flex flex-wrap justify-center gap-2">
                              {protocol.focusAreas.map((area) => (
                                <span
                                  className="text-xs sm:text-sm font-medium text-white bg-black/60 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full shadow-xs transition-colors duration-300 group-hover:border-[#34D399]/60"
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
                            track("protocol_select", { protocol: idKey });
                            onNavigate(`/programs/${idKey}`);
                          }}
                          className="px-6 py-3.5 rounded-full bg-white text-[#1D1D1F] hover:bg-[#34D399] hover:text-black text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md group/btn"
                        >
                          <span>{protocol.ctaText}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-center gap-4">
                    <span className="text-xs font-mono text-white/70 group-hover:text-white transition-colors uppercase tracking-wider text-center">
                      <span className="lg:inline hidden">
                        {/* Hover to explore pathway •{" "} */}
                      </span>
                      <span className="lg:hidden">
                        {/* Tap to explore pathway •{" "} */}
                      </span>
                      {/* <span className="font-bold text-white">
                        {protocol.duration}
                      </span> */}
                    </span>
                  </div>
                </motion.div>
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
                  animate={{
                    width: `${(activeCardIndex / (VALID_PROTOCOLS.length - 1)) * 100}%`,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <span className="text-xs font-mono font-bold text-[#8E8E93]">
                0{VALID_PROTOCOLS.length}
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
                aria-label="Previous protocol card"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const newIdx = Math.min(
                    VALID_PROTOCOLS.length - 1,
                    activeCardIndex + 1,
                  );
                  scrollToCard(newIdx);
                }}
                disabled={activeCardIndex === VALID_PROTOCOLS.length - 1}
                aria-label="Next protocol card"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeDeepDive && PROTOCOL_DEEP_DIVE[activeDeepDive] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveDeepDive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[32px] border border-[#D2D2D7] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-[#1D1D1F]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:col-span-7 p-6 sm:p-10 overflow-y-auto space-y-6">
                <div className="flex items-center justify-between border-b border-[#D2D2D7]/80 pb-4">
                  <div className="px-3.5 py-1 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] text-xs font-bold uppercase tracking-wider">
                    <span>{PROTOCOL_DATA[activeDeepDive].badge}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveDeepDive(null)}
                    className="w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#1D1D1F] hover:text-white text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close protocol details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1D1D1F] tracking-tight mb-2">
                    {PROTOCOL_DATA[activeDeepDive].title}
                  </h2>

                  <p className="font-display text-lg text-[#0E4D3A] font-medium leading-relaxed">
                    {PROTOCOL_DATA[activeDeepDive].subtitle}
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-5 rounded-[20px] border border-[#D2D2D7]/80">
                  <p className="text-xs font-mono text-[#0E4D3A] uppercase tracking-wider mb-2 font-semibold">
                    Clinical Protocol Overview
                  </p>

                  <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
                    {PROTOCOL_DEEP_DIVE[activeDeepDive].overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[18px] border border-[#D2D2D7] bg-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0E4D3A] uppercase mb-2">
                      <Activity className="w-4 h-4" />
                      <span>Clinical Therapies</span>
                    </div>

                    <ul className="space-y-1.5">
                      {PROTOCOL_DEEP_DIVE[
                        activeDeepDive
                      ].clinicalTherapies.map((item) => (
                        <li
                          className="text-xs text-[#1D1D1F] flex items-start gap-1.5"
                          key={item}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E4D3A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-[18px] border border-[#D2D2D7] bg-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0E4D3A] uppercase mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Diagnostic Baseline</span>
                    </div>

                    <ul className="space-y-1.5">
                      {PROTOCOL_DEEP_DIVE[
                        activeDeepDive
                      ].diagnosticBaseline.map((item) => (
                        <li
                          className="text-xs text-[#1D1D1F] flex items-start gap-1.5"
                          key={item}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E4D3A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 rounded-[20px] border border-[#D2D2D7] bg-white">
                  <p className="text-xs font-mono text-[#0E4D3A] uppercase tracking-wider mb-3 font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Daily Protocol Rhythm</span>
                  </p>

                  <div className="space-y-2.5">
                    {PROTOCOL_DEEP_DIVE[activeDeepDive].dailyRhythm.map(
                      ({ time, activity }) => (
                        <div
                          className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-[#D2D2D7]/50 last:border-b-0"
                          key={time}
                        >
                          <span className="font-mono text-[#0E4D3A] font-semibold">
                            {time}
                          </span>

                          <span className="text-[#1D1D1F] font-medium">
                            {activity}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-5 rounded-[20px] bg-[#0E4D3A]/5 border border-[#0E4D3A]/20">
                  <p className="text-xs font-mono text-[#0E4D3A] uppercase tracking-wider mb-1.5 font-semibold">
                    Microclimate & Geo-Wellness Alignment
                  </p>

                  <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed mb-3">
                    {PROTOCOL_DEEP_DIVE[activeDeepDive].geoAlignment}
                  </p>

                  <p className="text-xs font-mono text-[#0E4D3A] uppercase tracking-wider mb-2 font-semibold">
                    Included Journey Services
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROTOCOL_DEEP_DIVE[
                      activeDeepDive
                    ].includedServices.map((service) => (
                      <div
                        className="flex items-center gap-1.5 text-xs text-[#1D1D1F]"
                        key={service}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D2D2D7] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#6E6E73] block uppercase tracking-wider font-semibold">
                      JOURNEY DURATION
                    </span>

                    <span className="text-sm font-bold text-[#1D1D1F]">
                      {PROTOCOL_DATA[activeDeepDive].duration}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDeepDive(null);
                      track("begin_journey", {
                        source: `deep_dive_${activeDeepDive}_cta`,
                      });
                      onNavigate("contact");
                    }}
                    className="px-6 py-3 rounded-full bg-[#0E4D3A] text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#0A3C2D] transition-all cursor-pointer flex items-center gap-2 shadow-xs focus-visible:outline-2 focus-visible:outline-[#0E4D3A]"
                  >
                    <span>REQUEST CONSULTATION FOR PROTOCOL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative bg-[#1D1D1F] overflow-hidden min-h-[320px] lg:min-h-full">
                <SmartImage
                  src={PROTOCOL_DATA[activeDeepDive].image}
                  alt={PROTOCOL_DATA[activeDeepDive].imageAlt}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-xs font-mono font-semibold tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase">
                    {PROTOCOL_DATA[activeDeepDive].imageCaption}
                  </span>

                  <p className="text-xl font-display font-semibold leading-tight text-white pt-2">
                    {PROTOCOL_DATA[activeDeepDive].title}
                  </p>

                  <p className="text-xs text-white/80 leading-relaxed">
                    {PROTOCOL_DATA[activeDeepDive].subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProtocolHorizontalScrollSection;