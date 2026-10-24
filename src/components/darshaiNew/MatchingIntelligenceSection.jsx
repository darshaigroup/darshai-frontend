import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  ArrowRight,
  Sliders,
  Layers,
  Calendar,
  Activity,
  HeartPulse,
  Leaf,
  Compass,
  Wallet,
  Check,
  RefreshCw,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
const PRIMARY_INPUTS = [
  {
    id: "goals",
    key: "WELLNESS GOALS",
    label: "Wellness Goals",
    category: "Individual Priorities",
    icon: HeartPulse,
    value: "Nervous System Recovery & Sleep Restoration",
    detail: "High cortisol reduction, circadian rhythm realignment",
    step: 0,
  },
  {
    id: "lifestyle",
    key: "LIFESTYLE FACTORS",
    label: "Lifestyle Factors",
    category: "Biological Context",
    icon: Activity,
    value: "High Cognitive Load • 60+ Hour Workweek",
    detail: "Sedentary desk posture, fragmented sleep cycles",
    step: 1,
  },
  {
    id: "duration",
    key: "JOURNEY DURATION",
    label: "Journey Duration",
    category: "Clinical Pacing",
    icon: Calendar,
    value: "14-Day Immersive Reset & Restoration",
    detail: "7-day acute down-regulation + 7-day cellular restoration",
    step: 2,
  },
  {
    id: "environment",
    key: "ENVIRONMENT PREFERENCES",
    label: "Environment Preferences",
    category: "Geo-Atmosphere",
    icon: Leaf,
    value: "Coastal Sanctuary • Negative Ion Sea Air",
    detail: "Sea-level oxygen saturation, acoustic ocean rhythm",
    step: 3,
  },
  {
    id: "programme",
    key: "PROGRAMME REQUIREMENTS",
    label: "Programme Requirements",
    category: "Therapeutic Scope",
    icon: Layers,
    value: "Supervised Clinical Protocol (Ayurvedic & Modern)",
    detail: "Physician assessment, botanical therapies & nutritional pacing",
    step: 4,
  },
  {
    id: "travel",
    key: "TRAVEL PREFERENCES",
    label: "Travel Preferences",
    category: "Transit Logistics",
    icon: Compass,
    value: "Direct Route Access • Low-Friction Transit Corridor",
    detail: "Seamless transfers to protect post-treatment recovery",
    step: 5,
  },
  {
    id: "budget",
    key: "BUDGET CONSIDERATIONS",
    label: "Budget Considerations",
    category: "Scope & Allocation",
    icon: Wallet,
    value: "Comprehensive Tier • Fully Coordinated",
    detail: "Transparent sanctuary suite and continuous doctor care",
    step: 6,
  },
];
export function MatchingIntelligenceSection({ onNavigate }) {
  // Phases 0 to 6: Each corresponding to one of the 7 structured inputs
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // Auto-advance through the 7 inputs smoothly (0 to 6)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setPhase((prev) => (prev >= 6 ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying]);
  const handleRestart = () => {
    setPhase(0);
  };
  return (
    <section
      id="ai-wellness-matching-section"
      aria-label="The Intelligence Behind the Match"
      className="section-immersive bg-[#1D1D1F] border-b border-white/10 py-20 md:py-28 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0E4D3A]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C6A660]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="darshai-container relative z-10">
        <Reveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <p
              id="matching-eyebrow"
              className="typography-eyebrow text-[#C6A660] mb-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
              <span>AI-POWERED WELLNESS MATCHING</span>
            </p>
            <h2
              id="matching-heading"
              className="typography-section-h2 text-white tracking-tight mb-4"
            >
              <span className="block">The Intelligence</span>
              <span className="block text-[#34D399] mt-0.5 sm:mt-1">
                Behind the Match.
              </span>
            </h2>
            <div className="flex items-center gap-2 text-sm sm:text-base text-white/70 font-medium pt-0.5">
              <span className="w-4 sm:w-5 h-[2px] bg-[#34D399]" />
              <p className="font-semibold">
                DARSHAI uses structured assessment and matching logic to
                identify relevant wellness journeys.
              </p>
            </div>
            <div className="hidden space-y-3 text-white/70 typography-body-large leading-relaxed">
              <p>
                The wellness ecosystem is large and often difficult to navigate.
              </p>
              <p>
                DARSHAI uses structured assessment and matching logic to narrow
                a complex wellness ecosystem into a smaller set of relevant
                options.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-6 bg-[#141416] rounded-[28px] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[#0E4D3A]/40 border border-[#34D399]/30 text-[#34D399]">
                    <Sliders className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-mono text-[#C6A660] font-semibold">
                      Structured Matching Field
                    </p>
                    <p className="text-[11px] text-white/50">
                      Multi-dimensional input synthesis
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">
                    <span className="text-[#34D399] font-bold">
                      INPUT 0{phase + 1}/07
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={
                      isPlaying
                        ? "Pause system animation"
                        : "Play system animation"
                    }
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Restart matching animation"
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {PRIMARY_INPUTS.map((inp, idx) => {
                      const isVisible = phase >= idx;
                      const isCurrent = phase === idx;
                      return (
                        <button
                          type="button"
                          onClick={() => {
                            setPhase(idx);
                            setIsPlaying(false);
                          }}
                          aria-label={`Select ${inp.label}`}
                          className="h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
                          key={inp.id}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCurrent
                                ? "bg-[#34D399] shadow-[0_0_8px_#34D399]"
                                : isVisible
                                  ? "bg-[#0E4D3A]"
                                  : "bg-white/10"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#34D399] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      <span>{PRIMARY_INPUTS[phase].key}</span>
                    </span>
                    <span className="text-white/40 text-[11px]">
                      {PRIMARY_INPUTS[phase].category}
                    </span>
                  </div>
                </div>
                <div className="relative rounded-[20px] bg-black/40 border border-white/10 p-4 sm:p-5 overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2 mb-1">
                      <span>Inputs Entering Pipeline:</span>
                    </p>
                    <div className="space-y-2 max-h-[520px] overflow-y-auto no-scrollbar pr-0.5">
                      {PRIMARY_INPUTS.map((input, idx) => {
                        const hasJoined = phase >= idx;
                        const isLatest = phase === idx;
                        const Icon = input.icon;
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{
                              opacity: hasJoined ? 1 : 0.15,
                              y: hasJoined ? 0 : 6,
                              scale: isLatest ? 1.01 : 1,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] border transition-all duration-300 ${
                              isLatest
                                ? "bg-[#0E4D3A]/25 border-[#34D399] shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)]"
                                : hasJoined
                                  ? "bg-white/[0.05] border-white/15"
                                  : "bg-transparent border-dashed border-white/10"
                            }`}
                            key={input.id}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5 sm:gap-3">
                                <span
                                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono shrink-0 transition-colors ${
                                    isLatest
                                      ? "bg-[#34D399] text-[#0A1612] font-bold"
                                      : hasJoined
                                        ? "bg-white/15 text-white"
                                        : "bg-white/5 text-white/30"
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                                        isLatest
                                          ? "text-[#34D399]"
                                          : hasJoined
                                            ? "text-[#C6A660]"
                                            : "text-white/40"
                                      }`}
                                    >
                                      {input.label}
                                    </span>
                                    <span className="text-[10px] text-white/40 hidden sm:inline">
                                      • {input.category}
                                    </span>
                                  </div>
                                  <p
                                    className={`text-xs sm:text-[13px] font-medium leading-tight mt-0.5 transition-colors ${hasJoined ? "text-white" : "text-white/30"}`}
                                  >
                                    {hasJoined
                                      ? input.value
                                      : "Awaiting assessment input..."}
                                  </p>
                                </div>
                              </div>
                              {hasJoined && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-4 h-4 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center shrink-0"
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </motion.span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 bg-[#141416] rounded-[28px] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-lg bg-[#0E4D3A]/40 border border-[#34D399]/30 text-[#34D399]">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-mono text-[#C6A660] font-semibold">
                        Alignment Objective
                      </p>
                      <p className="text-[11px] text-white/50">
                        Biological & environmental fit
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    Fit-First Focus
                  </span>
                </div>
                <p className="typography-eyebrow text-[#C6A660] mb-5 font-medium">
                  The objective is simple:
                </p>
                <div className="space-y-4 mb-6">
                  <div className="p-4 sm:p-5 rounded-[16px] bg-white/5 border border-white/10 relative overflow-hidden">
                    <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                      Traditional Catalog Paradigm
                    </p>
                    <p className="typography-body-large font-display text-white/60 line-through decoration-[#E05252] decoration-[2px] leading-relaxed">
                      “What wellness centres exist?”
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-[16px] bg-[#0E4D3A]/30 border border-[#34D399]/70 shadow-[0_0_24px_-4px_rgba(14,77,58,0.5)]">
                    <p className="text-[11px] font-mono text-[#34D399] uppercase tracking-widest mb-1.5 font-semibold">
                      DARSHAI Geo-Wellness Paradigm
                    </p>
                    <p className="typography-h3 text-white flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399] shrink-0" />
                      <span>“What may fit me?”</span>
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 rounded-[16px] bg-black/40 border border-white/10 space-y-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#34D399] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    <span>Fit Evaluation Criteria</span>
                  </p>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Evaluates clinical depth, climate suitability, travel
                    friction and medical supervision to identify destinations
                    engineered specifically for your biological baseline.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  id="see-how-match-works-cta"
                  type="button"
                  onClick={() => {
                    track("begin_journey", { source: "matching_section" });
                    onNavigate("contact");
                  }}
                  className="w-full darshai-btn-primary text-white cursor-pointer justify-center"
                >
                  <span>SEE HOW THE MATCH WORKS</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default MatchingIntelligenceSection;
