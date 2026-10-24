import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import {
  Compass,
  FileCheck,
  BrainCircuit,
  MapPin,
  CalendarCheck,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";

const STAGES = [
  {
    id: "stage-1",
    stageNumber: 1,
    stageNumStr: "01",
    title: "Understand You",
    tagline: "Assessment.",
    description:
      "We begin by understanding what matters to you — your health goals, lifestyle, preferences and personal context.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Personalized clinical wellness assessment and individual discovery",
    icon: FileCheck,
  },
  {
    id: "stage-2",
    stageNumber: 2,
    stageNumStr: "02",
    title: "Understand Context",
    tagline: "Environmental analysis.",
    description:
      "We consider your current health condition, routine, constraints, travel preferences and other relevant factors that shape your journey.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Reflective journaling notebook detailing lifestyle factors and medical constraints",
    icon: Activity,
  },
  {
    id: "stage-3",
    stageNumber: 3,
    stageNumStr: "03",
    title: "Map Environment",
    tagline: "Geographic intelligence.",
    description:
      "We identify environments that may support your goals — from serene coastal regions and forest retreats to mountain settings, heritage destinations and urban nature.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Atmospheric coastal sanctuary and bioclimatic environment mapping",
    icon: MapPin,
  },
  {
    id: "stage-4",
    stageNumber: 4,
    stageNumStr: "04",
    title: "Match",
    tagline: "AI + Clinical Review.",
    description:
      "Our intelligence layer combines your profile, context and environmental data to identify suitable centres and programmes.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Intelligent multi-variable data synthesis combined with clinical medical review",
    icon: BrainCircuit,
  },
  {
    id: "stage-5",
    stageNumber: 5,
    stageNumStr: "05",
    title: "Build Journey",
    tagline: "Program design.",
    description:
      "We shape your personalised journey — including programme recommendations, centre coordination and travel guidance.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1600&auto=format&fit=crop&q=85",
    imageAlt: "Personalized wellness itinerary and curated health guidebook",
    icon: CalendarCheck,
  },
  {
    id: "stage-6",
    stageNumber: 6,
    stageNumStr: "06",
    title: "Continue",
    tagline: "Follow-up.",
    description:
      "Our relationship continues with journey monitoring, guidance and support to help you stay on track.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Meditative contemplation in morning mountain air fostering long-term wellness continuity",
    icon: Compass,
  },
];

export function GeoWellnessProcess({ onNavigate }) {
  const containerRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
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

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const stageIdx = Math.min(
        STAGES.length - 1,
        Math.max(0, Math.floor(latest * STAGES.length)),
      );

      setActiveStageIndex(stageIdx);
    });
  }, [scrollYProgress]);

  const scrollToMilestone = (index) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = rect.height;

    const targetScroll =
      containerTop +
      (index / (STAGES.length - 0.5)) *
        (containerHeight - window.innerHeight);

    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth",
    });

    setActiveStageIndex(index);

    track("journey_management_phase_selected", {
      stage: STAGES[index].title,
      index,
    });
  };

  const laserFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const currentStage = STAGES[activeStageIndex] || STAGES[0];

  return (
    <section
      ref={containerRef}
      id="geo-wellness-process"
      className="relative bg-[#111112] text-white selection:bg-[#34D399] selection:text-black border-t border-b border-white/10"
    >
      <div className="hidden lg:block relative min-h-[520vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#111112]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#0E4D3A]/25 via-[#34D399]/10 to-transparent blur-[140px] opacity-70 transition-all duration-1000" />
            <div className="absolute -bottom-24 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/20 via-transparent to-transparent blur-[120px] opacity-50" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <header className="relative z-20 w-full pt-8 pb-4 px-8 lg:px-12 border-b border-white/10 backdrop-blur-xl bg-[#111112]/90">
            <div className="max-w-[1500px] mx-auto flex items-end justify-between gap-8">
              <div className="text-left">
                <p
                  id="geo-wellness-process-eyebrow"
                  className="typography-eyebrow text-[#C6A660] mb-2 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                  <span>THE DARSHAI METHOD</span>
                </p>

                <h2
                  id="geo-wellness-process-heading"
                  className="typography-section-h2"
                >
                  <span className="text-white block">
                    A Structured Approach to
                  </span>
                  <span className="text-white/90 block mt-0.5 sm:mt-1">
                    Environmental Matching.
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-6 pb-1">
                <div className="hidden xl:flex items-center gap-2 text-xs text-white/50 tracking-wider font-mono">
                  <span>STAGE</span>
                  <span className="text-white font-bold text-sm">
                    {currentStage.stageNumStr}
                  </span>
                  <span>/ 06</span>
                  <span className="mx-2 text-white/20">|</span>
                  <span className="text-[#34D399] font-medium tracking-normal">
                    {currentStage.tagline}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="relative z-10 flex-1 max-w-[1500px] w-full mx-auto px-8 lg:px-12 flex items-center py-5">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 w-full items-center">
              <div className="col-span-5 flex gap-6 lg:gap-8 items-center">
                <div className="relative h-[300px] xl:h-[340px] flex flex-col items-center justify-between shrink-0 select-none">
                  <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-white/10 rounded-full" />

                  <motion.div
                    style={{
                      height: laserFill,
                      originY: 0,
                    }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#34D399] via-[#10B981] to-[#34D399] rounded-full shadow-[0_0_12px_#34D399]"
                  />

                  <div className="relative z-10 flex flex-col items-center justify-between h-full">
                    {STAGES.map((stage, idx) => {
                      const isPassed = activeStageIndex >= idx;
                      const isCurrent = activeStageIndex === idx;

                      return (
                        <button
                          type="button"
                          onClick={() => scrollToMilestone(idx)}
                          className="group relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] rounded-full"
                          aria-label={`Jump to Stage ${stage.stageNumber}: ${stage.title}`}
                          key={stage.id}
                        >
                          <motion.div
                            animate={{
                              scale: isCurrent ? 1.25 : 1,
                            }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-500 cursor-pointer ${
                              isCurrent
                                ? "bg-[#0E4D3A] text-[#34D399] border-2 border-[#34D399] shadow-[0_0_24px_rgba(52,211,153,0.7)] ring-4 ring-[#34D399]/25"
                                : isPassed
                                  ? "bg-[#0E4D3A] text-white border border-[#34D399]/60 shadow-[0_0_10px_rgba(14,77,58,0.5)]"
                                  : "bg-[#1C1C1E] text-white/40 border border-white/15 hover:border-white/40 hover:text-white"
                            }`}
                          >
                            {stage.stageNumStr}
                          </motion.div>

                          <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1C1E] border border-white/15 px-2.5 py-1 rounded text-[11px] font-mono text-white whitespace-nowrap z-30 shadow-lg">
                            {stage.title} · {stage.tagline}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={
                        prefersReducedMotion ? {} : { opacity: 0, y: 16 }
                      }
                      animate={
                        prefersReducedMotion ? {} : { opacity: 1, y: 0 }
                      }
                      exit={
                        prefersReducedMotion ? {} : { opacity: 0, y: -16 }
                      }
                      transition={{
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="space-y-4"
                      key={currentStage.id}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#34D399] bg-[#0E4D3A]/30 border border-[#34D399]/25 px-2.5 py-0.5 rounded-full font-semibold">
                          STAGE {currentStage.stageNumber}
                        </span>

                       
                      </div>

                      <h3 className="typography-h3 text-white">
                        {currentStage.title}
                      </h3>

                      <div className="text-base xl:text-lg font-medium text-[#34D399] tracking-normal">
                        {currentStage.tagline}
                      </div>

                      <div className="pt-2">
                        <p className="text-base sm:text-lg xl:text-[19px] text-[#D2D2D7] leading-relaxed font-normal max-w-xl">
                          {currentStage.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="col-span-7 relative h-[520px] xl:h-[580px] w-full rounded-[28px] sm:rounded-[32px] overflow-hidden border border-white/30 shadow-[0_0_35px_rgba(52,211,153,0.35)] hover:shadow-[0_0_50px_rgba(52,211,153,0.5)] bg-[#1C1C1E] group transition-all duration-500">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-full h-full"
                    key={currentStage.id}
                  >
                    <SmartImage
                      src={currentStage.image}
                      alt={currentStage.imageAlt}
                      className="w-full h-full object-cover"
                      priority={activeStageIndex === 0}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-6 right-6 px-4 py-2 rounded-2xl bg-[#111112]/80 backdrop-blur-xl border border-white/20 text-white flex items-center gap-3 shadow-2xl">
                      <currentStage.icon className="w-4 h-4 text-[#34D399]" />

                      <div className="text-left font-mono">
                        <div className="text-[10px] text-white/50 tracking-widest uppercase">
                          METHOD PROTOCOL
                        </div>

                        <div className="text-xs font-bold text-white tracking-wide">
                          STAGE {currentStage.stageNumStr} ·{" "}
                          {currentStage.tagline}
                        </div>
                      </div>
                    </div>

                    {/* <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#111112]/80 backdrop-blur-xl border border-white/20 flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0E4D3A] border border-[#34D399]/40 flex items-center justify-center text-[#34D399]">
                          <Sparkles className="w-4 h-4" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-white">
                            {currentStage.title}
                          </p>

                          <p className="text-[11px] text-[#A1A1A6]">
                            {currentStage.tagline} — Guided by clinical experts
                            & geographic analysis.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#34D399]">
                        <span>ACTIVE MILESTONE</span>
                        <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                      </div>
                    </div> */}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden relative py-16 px-4 sm:px-6 bg-[#111112]">
        <Reveal>
          <div className="max-w-xl text-left mb-12">
            <p
              id="geo-wellness-process-eyebrow-mobile"
              className="text-xs sm:text-[13px] font-semibold text-[#C6A660] tracking-[0.2em] uppercase mb-3"
            >
              THE DARSHAI METHOD
            </p>

            <h2
              id="geo-wellness-process-heading-mobile"
              className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.12] mb-4"
            >
              <span className="text-white block">
                A Structured Approach to
              </span>

              <span className="text-white/90 block mt-1 sm:mt-1.5">
                Environmental Matching.
              </span>
            </h2>

            <p className="typography-body-large text-[#A1A1A6] text-sm sm:text-base leading-relaxed font-normal">
              Every recommendation begins with the individual, then combines
              personal context, environmental intelligence and wellness
              expertise.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-xl mx-auto pl-10 sm:pl-12">
          <div className="absolute top-6 bottom-10 left-3.5 sm:left-4 w-[2px] bg-white/15 rounded-full" />

          <motion.div
            style={{
              height: laserFill,
              originY: 0,
            }}
            className="absolute top-6 left-3.5 sm:left-4 w-[2px] bg-[#34D399] rounded-full shadow-[0_0_12px_#34D399]"
          />

          <div className="space-y-12">
            {STAGES.map((stage) => (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
                key={stage.id}
              >
                <div className="absolute -left-10 sm:-left-12 top-6 w-8 h-8 rounded-full bg-[#0E4D3A] border-2 border-[#34D399] text-[#34D399] font-mono font-bold text-xs flex items-center justify-center tabular-nums shadow-[0_0_16px_rgba(52,211,153,0.5)] z-10">
                  {stage.stageNumStr}
                </div>

                <div className="bg-[#1C1C1E] rounded-[28px] sm:rounded-[32px] border border-white/30 overflow-hidden shadow-[0_0_30px_rgba(52,211,153,0.35)]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111112]">
                    <SmartImage
                      src={stage.image}
                      alt={stage.imageAlt}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[#34D399] text-[10px] font-mono font-bold uppercase tracking-wider">
                      STAGE {stage.stageNumStr}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-medium tracking-wide">
                      {stage.tagline}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs font-semibold text-[#34D399] tracking-wider uppercase">
                      {stage.tagline}
                    </div>

                    <h3 className="font-display text-xl font-semibold text-white tracking-tight">
                      {stage.title}
                    </h3>

                    <p className="text-sm text-[#D2D2D7] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) {
                track("begin_journey", {
                  source: "method_mobile_bottom",
                });
                onNavigate("contact");
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#34D399] hover:bg-[#10B981] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)]"
          >
            <span>Begin Your Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </section>
  );
}

export default GeoWellnessProcess;