import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { ArrowRight, ChevronRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const ENVIRONMENTS = [
  {
    id: "coastal",
    name: "COASTAL",
    tagline: "High Salinity & Negative Ion Sea Air",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Coastal sanctuary with ocean horizon and morning mist",
    summary:
      "Ocean air rich in natural salinity and negative ions supports deep respiratory recovery and nervous system calm.",
  },
  {
    id: "mountain",
    name: "MOUNTAIN",
    tagline: "Sub-Alpine Elevation & Pure Atmospheric Air",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Mountain sanctuary with pure elevation and misty ridges",
    summary:
      "Cool, clean high-altitude air stimulates cellular resilience, deeper metabolic regulation, and profound mental clarity.",
  },
  {
    id: "forest",
    name: "FOREST",
    tagline: "Dense Evergreen Canopy & Elevated Phytoncides",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Forest sanctuary with dense evergreen canopy",
    summary:
      "Tree canopy phytoncides lower cortisol and blood pressure while natural acoustic stillness resets circadian rhythm.",
  },
  {
    id: "heritage",
    name: "HERITAGE",
    tagline: "Protected Cultural Enclaves & Ancient Courtyards",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Heritage sanctuary with quiet courtyards and ancient architecture",
    summary:
      "Centuries-old therapeutic architecture and slow traditional rhythms create an environment insulated from modern noise.",
  },
  {
    id: "urban-nature",
    name: "URBAN NATURE",
    tagline: "Filtered Biophilic Sanctuary & Pure Air Enclave",
    image:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Urban nature biophilic garden sanctuary",
    summary:
      "Protected botanical microclimates offering restorative seclusion without leaving the orbit of major travel hubs.",
  },
];
const SIX_STAGE_PROCESS = [
  {
    num: "01",
    title: "Understand You",
    detail:
      "Individual baseline health, personal aspirations, and clinical objectives.",
  },
  {
    num: "02",
    title: "Understand Context",
    detail:
      "Life rhythm, commitments, and daily constraints to ensure sustainable integration.",
  },
  {
    num: "03",
    title: "Map Environment",
    detail:
      "Microclimates, altitude, air purity, and terrain matching for optimal recovery.",
  },
  {
    num: "04",
    title: "Match Centre",
    detail:
      "Vetted, accredited partner sanctuaries aligned with your physiological needs.",
  },
  {
    num: "05",
    title: "Match Programme",
    detail:
      "Specific protocol, therapies, nutrition, and structured daily rhythm.",
  },
  {
    num: "06",
    title: "Build Your Journey",
    detail:
      "Coordinated travel, itinerary, on-site support, and post-stay care plan.",
  },
];
export function GeoWellnessExperienceSection({ onNavigate }) {
  const [activeEnvIdx, setActiveEnvIdx] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const currentEnv = ENVIRONMENTS[activeEnvIdx];
  const handleSelectEnv = (idx, name) => {
    setActiveEnvIdx(idx);
    track("filter_environment", {
      environment: name,
      source: "signature_geo_wellness",
    });
  };
  return (
    <section
      id="geo-wellness-signature-experience"
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F]"
    >
      <div className="darshai-container">
        <Reveal>
          <div className="max-w-3xl mb-10 md:mb-12">
            <p className="typography-eyebrow text-[#0E4D3A] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              <span>03 | WHAT IS GEO-WELLNESS?</span>
            </p>
            <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-4">
              Where You Go <span className="text-[#0E4D3A]">Matters.</span>
            </h2>
            <p className="typography-body-large text-[#48484A] leading-relaxed font-normal">
              Your surroundings can shape how you rest, recover and reconnect.
              DARSHAI considers your goals, context and environment when
              matching your wellness journey.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mb-12">
            <div className="flex items-center justify-start overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none border-b border-[#D2D2D7]">
              <div className="flex items-center gap-2 sm:gap-3">
                {ENVIRONMENTS.map((env, idx) => {
                  const isActive = activeEnvIdx === idx;
                  return (
                    <button
                      type="button"
                      onClick={() => handleSelectEnv(idx, env.name)}
                      className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-[#0E4D3A] text-white shadow-md scale-[1.02]"
                          : "bg-white text-[#48484A] border border-[#D2D2D7] hover:border-[#0E4D3A] hover:text-[#1D1D1F]"
                      }`}
                      key={env.id}
                    >
                      <span>{env.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative rounded-[24px] md:rounded-[28px] overflow-hidden bg-[#141416] border border-[#D2D2D7] shadow-xl text-white min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0"
                  key={currentEnv.id}
                >
                  <SmartImage
                    src={currentEnv.image}
                    alt={currentEnv.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E4D3A] text-[#34D399] text-[11px] font-mono font-bold tracking-wider uppercase border border-[#34D399]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    <span>ENVIRONMENT TYPE</span>
                  </span>
                  <span className="text-xs font-mono text-white/70 uppercase tracking-wider font-semibold">
                    {currentEnv.tagline}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight uppercase mb-3">
                  {currentEnv.name} SANCTUARY
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal bg-black/40 backdrop-blur-md p-4 rounded-[16px] border border-white/15">
                  {currentEnv.summary}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate("centres")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1D1D1F] hover:bg-[#0E4D3A] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md group"
                  >
                    <span>EXPLORE {currentEnv.name} CENTRES</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-xs font-mono text-white/50 hidden sm:inline">
                    Select tabs above to inspect microclimates
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="pt-10 border-t border-[#D2D2D7]">
            <div className="max-w-3xl mb-8">
              <p className="text-xs font-mono font-bold text-[#0E4D3A] uppercase tracking-wider mb-2">
                PERSONALISATION & MATCHING SEQUENCE
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
                How Your Journey Is Matched
              </h3>
            </div>
            <div className="hidden md:flex items-center justify-between gap-2 overflow-x-auto pb-6 mb-8 scrollbar-none">
              {SIX_STAGE_PROCESS.map((stage, idx, arr) => {
                const isActive = activeStageIdx === idx;
                return (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={`p-3.5 rounded-[16px] border transition-all duration-300 text-left flex-1 min-w-[140px] cursor-pointer ${
                        isActive
                          ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-md"
                          : "bg-white text-[#1D1D1F] border-[#D2D2D7] hover:border-[#0E4D3A]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] font-bold block mb-1 ${isActive ? "text-[#34D399]" : "text-[#0E4D3A]"}`}
                      >
                        {stage.num}
                      </span>
                      <p className="font-mono text-xs font-bold uppercase tracking-wider leading-tight">
                        {stage.title}
                      </p>
                    </button>
                    {idx < arr.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#0E4D3A] shrink-0 opacity-60" />
                    )}
                  </>
                );
              })}
            </div>
            <div className="p-6 rounded-[20px] bg-white border border-[#D2D2D7] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0E4D3A] text-[#34D399] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {SIX_STAGE_PROCESS[activeStageIdx].num}
                </span>
                <div>
                  <p className="font-mono text-xs font-bold text-[#0E4D3A] uppercase tracking-wider">
                    {SIX_STAGE_PROCESS[activeStageIdx].title}
                  </p>
                  <p className="text-sm text-[#1D1D1F] font-medium mt-0.5">
                    {SIX_STAGE_PROCESS[activeStageIdx].detail}
                  </p>
                </div>
              </div>
              <div className="flex md:hidden items-center gap-2 self-end sm:self-auto">
                {SIX_STAGE_PROCESS.map((stg, i) => (
                  <button
                    type="button"
                    onClick={() => setActiveStageIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${activeStageIdx === i ? "bg-[#0E4D3A] w-6" : "bg-[#D2D2D7]"}`}
                    key={stg.num}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default GeoWellnessExperienceSection;
