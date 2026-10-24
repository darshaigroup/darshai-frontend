import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const ENVIRONMENTS = [
  {
    id: "coastal",
    name: "COASTAL",
    badge: "COASTAL",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Coastal sanctuary with ocean horizon and morning mist",
    explanation:
      "Ocean air rich in natural salinity and negative ion saturation down-regulates the sympathetic nervous system, supporting deep respiratory recovery and nervous system calm.",
    highlights: "Maritime Microclimate • Sea Level • Negative Ions",
  },
  {
    id: "mountain",
    name: "MOUNTAIN",
    badge: "MOUNTAIN",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Mountain sanctuary with pure elevation and misty ridges",
    explanation:
      "Cool, clean high-altitude air stimulates cellular resilience, deeper oxygenation, and profound mental clarity away from urban sensory overload.",
    highlights:
      "Sub-Alpine • High Altitude (1,200m – 2,200m) • Alpine Stillness",
  },
  {
    id: "forest",
    name: "FOREST",
    badge: "FOREST",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Forest sanctuary with dense evergreen canopy",
    explanation:
      "Dense evergreen canopy phytoncides lower cortisol and blood pressure while natural forest canopy acoustics reset natural circadian rhythms.",
    highlights: "Evergreen Canopy • Elevated Phytoncides • Biophilic Seclusion",
  },
  {
    id: "heritage",
    name: "HERITAGE",
    badge: "HERITAGE",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Traditional heritage courtyard sanctuary",
    explanation:
      "Centuries-old courtyard architecture with passive thermal cooling facilitates slow pacing, meditative routines, and traditional Ayurvedic rejuvenation.",
    highlights: "Heritage Estate • Courtyard Microclimate • Vaidya Lineage",
  },
  {
    id: "urban-nature",
    name: "URBAN NATURE",
    badge: "URBAN NATURE",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Urban nature biophilic garden sanctuary",
    explanation:
      "Protected botanical microclimates offering restorative seclusion and executive wellness diagnostics without leaving the orbit of major travel hubs.",
    highlights: "Botanical Buffer • Metro Proximity • Executive Care",
  },
];
const PROCESS_STEPS = [
  { num: "01", name: "Understand You", desc: "Individual Baseline & Goals" },
  { num: "02", name: "Understand Context", desc: "Life Rhythm & Constraints" },
  { num: "03", name: "Map Environment", desc: "Climate & Bio-Terrain" },
  { num: "04", name: "Match Centre", desc: "Vetted Sanctuary" },
  { num: "05", name: "Match Programme", desc: "Clinically Aligned Protocol" },
  {
    num: "06",
    name: "Build Your Journey",
    desc: "Coordinated Care & Follow-Up",
  },
];
export function HomeGeoWellnessConvergedSection({ onNavigate }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeEnv = ENVIRONMENTS[activeIdx];
  const handleTabChange = (idx) => {
    setActiveIdx(idx);
    track("filter_environment", {
      environment: ENVIRONMENTS[idx].name,
      source: "homepage_converged_geo",
    });
  };
  return (
    <section
      id="geo-wellness-signature-experience"
      aria-label="What is Geo-Wellness"
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F]"
    >
      <div className="darshai-container">
        <Reveal>
          <div className="max-w-3xl mb-10 md:mb-12">
            <p
              id="geo-wellness-eyebrow"
              className="typography-eyebrow text-[#0E4D3A] mb-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              <span>03 | WHAT IS GEO-WELLNESS?</span>
            </p>
            <h2
              id="geo-wellness-heading"
              className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-4"
            >
              Where You Go Matters.
            </h2>
            <p className="typography-body-large text-[#48484A] leading-relaxed font-normal">
              Your surroundings can shape how you rest, recover and reconnect.
              DARSHAI considers your goals, context and environment when
              matching your wellness journey.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex items-center justify-start overflow-x-auto pb-3 pt-1 mb-8 scrollbar-none">
            <div className="p-1.5 rounded-full bg-white border border-[#D2D2D7] shadow-xs flex items-center gap-1 sm:gap-2">
              {ENVIRONMENTS.map((env, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    type="button"
                    onClick={() => handleTabChange(idx)}
                    className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A] ${
                      isActive
                        ? "bg-[#0E4D3A] text-white shadow-md scale-[1.02]"
                        : "text-[#0E4D3A] bg-[#E8F5F1] hover:text-[#0E4D3A] hover:bg-[#D1EBE2]"
                    }`}
                    key={env.id}
                  >
                    <span>{env.name} ENVIRONMENT</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative rounded-[28px] overflow-hidden border border-[#D2D2D7] bg-[#141416] text-white shadow-xl min-h-[460px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-10 mb-14 group">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0 bg-[#0A1612]"
                key={activeEnv.id}
              >
                <SmartImage
                  src={activeEnv.image}
                  alt={activeEnv.alt}
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
            <div className="relative z-10 mb-auto flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold tracking-wider text-[#34D399] uppercase shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{activeEnv.badge} SANCTUARY</span>
              </span>
              <span className="text-xs font-mono text-white/70 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wider hidden sm:inline-block">
                0{activeIdx + 1} / 05
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-3xl space-y-3 pt-6"
                key={activeEnv.id + "-info"}
              >
                <p className="text-xs font-mono text-[#C6A660] font-bold uppercase tracking-wider">
                  {activeEnv.highlights}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight uppercase">
                  {activeEnv.name} ENVIRONMENT
                </h3>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                  {activeEnv.explanation}
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      track("explore_environments", {
                        environment: activeEnv.name,
                        source: "homepage_converged",
                      });
                      onNavigate("centres");
                    }}
                    className="darshai-btn-primary cursor-pointer text-xs sm:text-sm inline-flex items-center gap-2 bg-white text-[#1D1D1F] hover:bg-[#34D399] hover:text-[#121214] transition-all shadow-lg"
                  >
                    <span>EXPLORE SANCTUARIES</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="pt-8 border-t border-[#D2D2D7]">
            <div className="mb-6">
              <p className="text-xs font-mono font-bold text-[#0E4D3A] uppercase tracking-wider mb-1">
                OUR MATCHING PROCESS
              </p>
              <h3 className="typography-h3 text-[#1D1D1F]">
                How DARSHAI Builds Your Journey
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
              {PROCESS_STEPS.map((step, idx, arr) => (
                <div
                  className="p-4 rounded-[18px] bg-white border border-[#D2D2D7] hover:border-[#0E4D3A] transition-all duration-300 shadow-xs flex flex-col justify-between group"
                  key={step.name}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#0E4D3A] px-2 py-0.5 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/20">
                        {step.num}
                      </span>
                      {idx < arr.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-[#0E4D3A] hidden lg:block opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>
                    <h4 className="font-mono text-xs font-bold text-[#1D1D1F] uppercase tracking-wider group-hover:text-[#0E4D3A] transition-colors">
                      {step.name}
                    </h4>
                    <p className="text-[11px] text-[#6E6E73] font-normal leading-tight">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-[12px] bg-white/60 border border-[#D2D2D7]/80 text-center font-mono text-[11px] font-bold text-[#0E4D3A] uppercase tracking-wider overflow-x-auto whitespace-nowrap">
              <span>Understand You</span>
              <span className="mx-2 text-[#8E8E93]">→</span>
              <span>Understand Context</span>
              <span className="mx-2 text-[#8E8E93]">→</span>
              <span>Map Environment</span>
              <span className="mx-2 text-[#8E8E93]">→</span>
              <span>Match Centre</span>
              <span className="mx-2 text-[#8E8E93]">→</span>
              <span>Match Programme</span>
              <span className="mx-2 text-[#8E8E93]">→</span>
              <span>Build Your Journey</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default HomeGeoWellnessConvergedSection;
