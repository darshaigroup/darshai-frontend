import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import {
  Compass,
  ArrowRight,
  Waves,
  Mountain,
  TreePine,
  Activity,
} from "lucide-react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
import { track } from "../../lib/darshaiNew/analytics";
const STAGES = [
  {
    id: "coastal",
    num: "01",
    name: "Coastal Environment",
    tagline: "COASTAL ENVIRONMENT",
    icon: Waves,
    outcome: "Recovery Experience",
    outcomeTag: "RESULTING OUTCOME",
    protocol: "Executive Reset",
    description:
      "Maritime microclimate tailored for targeted recovery and circadian restoration.",
    metrics: [
      { label: "ENVIRONMENT", value: "Coastal Environment" },
      { label: "MATCHED PROTOCOL", value: "Executive Reset" },
    ],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Coastal Environment maritime sanctuary",
  },
  {
    id: "mountain",
    num: "02",
    name: "Mountain Environment",
    tagline: "MOUNTAIN ENVIRONMENT",
    icon: Mountain,
    outcome: "Recovery Experience",
    outcomeTag: "RESULTING OUTCOME",
    protocol: "Executive Reset",
    description:
      "Alpine altitude purity tailored for targeted recovery and oxygen renewal.",
    metrics: [
      { label: "ENVIRONMENT", value: "Mountain Environment" },
      { label: "MATCHED PROTOCOL", value: "Executive Reset" },
    ],
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Mountain Environment alpine sanctuary",
  },
  {
    id: "nature",
    num: "03",
    name: "Nature-Based Sanctuary",
    tagline: "NATURE-BASED SANCTUARY",
    icon: TreePine,
    outcome: "Restoration Experience",
    outcomeTag: "RESULTING OUTCOME",
    protocol: "Deep Detox",
    description:
      "Botanical canopy biosphere tailored for cellular purification and deep restoration.",
    metrics: [
      { label: "ENVIRONMENT", value: "Nature-Based Sanctuary" },
      { label: "MATCHED PROTOCOL", value: "Deep Detox" },
    ],
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Nature-Based Sanctuary canopy immersion",
  },
];
export function GeoWellnessDifferenceStickySection({
  onNavigate,
  id = "geo-wellness-difference",
}) {
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
  // Track vertical scroll progress across the pinned track (280vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        STAGES.length - 1,
        Math.floor(latest * STAGES.length),
      );
      setActiveStageIndex(idx);
    });
  }, [scrollYProgress]);
  const activeStage = STAGES[activeStageIndex];
  // Helper function for user manual tab navigation
  const scrollToStage = (index) => {
    setActiveStageIndex(index);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = rect.top + currentScrollY;
      const totalScrollableDistance =
        containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll =
        sectionTop + (index / (STAGES.length - 1)) * totalScrollableDistance;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };
  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[260vh] lg:min-h-[300vh] bg-[#141416] text-white border-b border-white/10"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-3 sm:py-6 lg:py-12 overflow-y-auto lg:overflow-hidden scrollbar-none bg-[#141416] z-10">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#0E4D3A]/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="darshai-container w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-3xl mb-3 sm:mb-6 text-left">
            <p className="typography-eyebrow text-[#34D399] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span>THE GEO-WELLNESS DIFFERENCE</span>
            </p>
            <h2 className="typography-section-h2 text-white leading-[1.08] tracking-tight">
              The Same Program Can Feel Different In Different Environments.
            </h2>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto pb-2 sm:pb-4 mb-3 sm:mb-6 scrollbar-none no-scrollbar touch-pan-x">
            {STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              const Icon = stage.icon;
              return (
                <button
                  type="button"
                  onClick={() => {
                    scrollToStage(idx);
                    track("protocol_select", { stage: stage.name });
                  }}
                  className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer border ${
                    isActive
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]"
                      : "bg-white/10 text-white/70 hover:text-white border-white/15 hover:bg-white/15"
                  }`}
                  key={stage.id}
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-[#0E4D3A]" : "text-white/60"}`}
                  />
                  <span>{stage.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 order-1 lg:order-2 relative min-h-[220px] sm:min-h-[360px] lg:min-h-[520px] rounded-[20px] sm:rounded-[32px] overflow-hidden border border-white/15 bg-[#18181A] shadow-2xl flex flex-col justify-end">
              {STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                    key={stage.id}
                  >
                    <SmartImage
                      src={stage.image}
                      alt={stage.imageAlt}
                      className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
                    />
                  </motion.div>
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/15 z-15 pointer-events-none" />
              <div className="absolute top-3 sm:top-7 left-3 sm:left-7 right-3 sm:right-7 z-20 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#34D399]" />
                  <span>{activeStage.name}</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {activeStage.tagline}
                </span>
              </div>
              <div className="relative z-20 p-4 sm:p-8 lg:p-10 text-white max-w-2xl text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 sm:space-y-4"
                    key={activeStage.id}
                  >
                    <div className="pt-2 sm:pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        {activeStage.metrics.map((m) => (
                          <div key={m.label}>
                            <span className="text-[9px] sm:text-xs font-mono uppercase text-white/60 block tracking-wider font-semibold">
                              {m.label}
                            </span>
                            <span className="text-[11px] sm:text-sm font-bold text-white">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => {
                            track("centre_view", {
                              source: `geo_wellness_diff_${activeStage.id}`,
                            });
                            onNavigate("centres");
                          }}
                          className="px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white hover:bg-[#34D399] text-black text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center gap-1 sm:gap-1.5 shadow-lg group/btn shrink-0"
                        >
                          <span>EXPLORE CENTRES</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between space-y-3 sm:space-y-4 text-left">
              <div className="p-3.5 sm:p-6 rounded-[18px] sm:rounded-[26px] bg-[#1E1E22] border border-white/15 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-[#34D399] font-bold">
                    MATCHED PROTOCOL
                  </span>
                  <SignalBadge variant="dark" dot>
                    ACTIVE
                  </SignalBadge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs text-white/60 uppercase font-mono tracking-wider">
                      Program
                    </p>
                    <h3 className="font-display text-lg sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                      {activeStage.protocol}
                    </h3>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0E4D3A]/40 border border-[#34D399]/40 flex items-center justify-center text-[#34D399] shrink-0">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-white/70">
                  <span>Environment: {activeStage.name}</span>
                  <span className="font-mono text-[#34D399]">
                    {activeStage.outcome}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-7 rounded-[18px] sm:rounded-[26px] bg-gradient-to-br from-[#0E4D3A]/60 via-[#0A3225] to-[#121214] border-2 border-[#34D399]/60 shadow-[0_0_40px_rgba(52,211,153,0.18)] flex-1 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-black/50 text-[#34D399] border border-[#34D399]/40 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    <span>RESULTING OUTCOME</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-white/60">
                    Stage {activeStage.num} of 03
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-2 sm:space-y-3 my-1 sm:my-2"
                    key={activeStage.id}
                  >
                    <div className="inline-block text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-[#C6A660] font-bold px-2 py-0.5 rounded bg-white/10">
                      {activeStage.name}
                    </div>
                    <h4 className="font-display text-lg sm:text-3xl font-bold text-white tracking-tight leading-snug">
                      {activeStage.outcome}
                    </h4>
                    <p className="text-xs sm:text-base text-white/85 font-normal leading-relaxed">
                      {activeStage.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="pt-2 sm:pt-4 border-t border-white/15 mt-2 sm:mt-4 flex items-center justify-between text-[10px] sm:text-sm font-mono">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-white/70">
                    <span className="font-bold text-white">
                      {activeStage.name}
                    </span>
                    <span className="text-[#34D399] font-bold">→</span>
                    <span className="text-[#34D399] font-bold">
                      {activeStage.outcome}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#34D399] font-bold">
                    <span>{activeStage.protocol}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-8 pt-2 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/60">
            <span className="hidden sm:inline">
              Scroll vertically to traverse environments
            </span>
            <div className="flex items-center gap-2">
              {STAGES.map((s, idx) => (
                <button
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeStageIndex === idx ? "w-6 sm:w-8 bg-[#34D399]" : "w-2.5 sm:w-3 bg-white/20"}`}
                  aria-label={`Jump to stage ${s.name}`}
                  key={s.id}
                />
              ))}
            </div>
            <span className="font-bold text-[#34D399]">
              0{activeStageIndex + 1} / 03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default GeoWellnessDifferenceStickySection;
