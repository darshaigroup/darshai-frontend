import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const ENVIRONMENTS = [
  {
    id: "coastal",
    name: "COASTAL",
    badge: "MARITIME MICROCLIMATE",
    tagline: "Ocean Aerosols & Tidal Rhythms",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Coastal sanctuary with ocean horizon and morning mist",
    explanation:
      "Ocean aerosol microclimates rich in negative ions and gentle tidal rhythms support deep respiratory recovery, circadian realignment, and nervous system calm.",
    keyFeatures: [
      "Negative ion saturation",
      "Low-frequency tidal acoustics",
      "Circadian light alignment",
    ],
  },
  {
    id: "mountain",
    name: "MOUNTAIN",
    badge: "SUB-ALPINE ELEVATION",
    tagline: "High Altitude & Pure Atmospheric Air",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Mountain sanctuary with pure elevation and misty ridges",
    explanation:
      "Cool, clean high-altitude air stimulates cellular resilience, deeper metabolic regulation, and profound mental clarity away from urban sensory overload.",
    keyFeatures: [
      "Sub-alpine atmospheric purity",
      "High altitude oxygen reset",
      "Panoramic stillness & focus",
    ],
  },
  {
    id: "forest",
    name: "FOREST",
    badge: "EVERGREEN CANOPY",
    tagline: "Dense Canopy & Phytoncides",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Forest sanctuary with dense evergreen canopy",
    explanation:
      "Tree canopy phytoncides lower cortisol and blood pressure while natural acoustic stillness resets autonomic nervous system balance.",
    keyFeatures: [
      "Botanical phytoncides",
      "Shaded biophilic canopy",
      "Cortisol down-regulation",
    ],
  },
  {
    id: "heritage",
    name: "HERITAGE",
    badge: "VAIDYA ANCESTRAL SANCTUARY",
    tagline: "Courtyard Architecture & Living Traditions",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Traditional Vaidya heritage courtyard sanctuary",
    explanation:
      "Historic courtyard architecture with natural cross-ventilation facilitates slow pacing, meditative routines, and classical Ayurvedic rejuvenation.",
    keyFeatures: [
      "Traditional Vaidya lineage",
      "Natural thermal cooling",
      "Acoustic courtyard seclusion",
    ],
  },
  {
    id: "urban-nature",
    name: "URBAN NATURE",
    badge: "BIOPHILIC METRO BUFFER",
    tagline: "Filtered Flora & Accessibility",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Urban nature biophilic garden sanctuary",
    explanation:
      "Protected botanical microclimates offering restorative seclusion without leaving the orbit of major travel and transportation hubs.",
    keyFeatures: [
      "Botanical garden microclimate",
      "HEPA air filtration buffer",
      "Effortless transit access",
    ],
  },
];
const PROCESS_STAGES = [
  {
    num: "01",
    title: "Understand You",
    desc: "Individual baseline health, biology & personal goals",
  },
  {
    num: "02",
    title: "Understand Context",
    desc: "Life rhythm, work constraints & schedule pacing",
  },
  {
    num: "03",
    title: "Map Environment",
    desc: "Microclimate, altitude & terrain suitability",
  },
  {
    num: "04",
    title: "Match Centre",
    desc: "Vetted, accredited sanctuaries aligned with needs",
  },
  {
    num: "05",
    title: "Match Programme",
    desc: "Clinically aligned protocols & therapies",
  },
  {
    num: "06",
    title: "Build Your Journey",
    desc: "Seamless coordination, travel & post-stay care",
  },
];
export default function HomeGeoWellnessSection({ onNavigate }) {
  const [selectedTab, setSelectedTab] = useState("coastal");
  const activeEnv =
    ENVIRONMENTS.find((e) => e.id === selectedTab) || ENVIRONMENTS[0];
  const handleTabSelect = (env) => {
    setSelectedTab(env.id);
    track("filter_environment", { environment: env.name });
  };
  return (
    <section
      id="geo-wellness-signature-experience"
      aria-label="What is Geo-Wellness"
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F]"
    >
      <div className="darshai-container w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mb-8 sm:mb-10">
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
              Where You Go <span className="text-[#0E4D3A]">Matters.</span>
            </h2>
            <p className="typography-lead text-[#48484A] leading-relaxed font-normal max-w-2xl">
              Your surroundings can shape how you rest, recover and reconnect.
              DARSHAI considers your goals, context and environment when
              matching your wellness journey.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex items-center justify-start overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none">
            <div className="bg-white/80 p-1.5 rounded-full border border-[#D2D2D7] shadow-xs flex items-center gap-1.5 sm:gap-2">
              {ENVIRONMENTS.map((env) => {
                const isActive = selectedTab === env.id;
                return (
                  <button
                    type="button"
                    onClick={() => handleTabSelect(env)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A] ${
                      isActive
                        ? "bg-[#0E4D3A] text-white shadow-md scale-[1.02]"
                        : "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5"
                    }`}
                    key={env.id}
                  >
                    <span>{env.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 md:mb-20">
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] w-full rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D2D2D7] bg-[#111112] text-white shadow-xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                    key={activeEnv.id}
                  >
                    <SmartImage
                      src={activeEnv.image}
                      alt={activeEnv.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-20 flex items-center justify-between gap-3 text-white">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold tracking-wider text-[#34D399] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    {activeEnv.badge}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 hidden sm:inline-block">
                    {activeEnv.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-white border border-[#D2D2D7] shadow-sm flex flex-col justify-between h-full space-y-6"
                  key={activeEnv.id + "-card"}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#D2D2D7]">
                      <span className="text-xs font-mono font-bold text-[#0E4D3A] uppercase tracking-wider">
                        ENVIRONMENT PROFILE
                      </span>
                      <span className="text-xs font-mono font-bold text-[#C6A660] uppercase tracking-wider">
                        {activeEnv.name}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                      {activeEnv.tagline}
                    </h3>
                    <p className="text-base text-[#48484A] leading-relaxed font-normal">
                      {activeEnv.explanation}
                    </p>
                    <div className="pt-2 space-y-2.5">
                      <p className="text-xs font-mono uppercase tracking-wider text-[#6E6E73] font-bold">
                        Key Environmental Features:
                      </p>
                      <ul className="space-y-2">
                        {activeEnv.keyFeatures.map((feat) => (
                          <li
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1D1D1F] font-medium"
                            key={feat}
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#D2D2D7]">
                    <button
                      type="button"
                      onClick={() => onNavigate("centres")}
                      className="w-full py-3.5 px-6 rounded-full bg-[#0E4D3A] hover:bg-[#083024] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                    >
                      <span>EXPLORE {activeEnv.name} CENTRES</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="pt-10 border-t border-[#D2D2D7]">
            <div className="max-w-3xl mb-8">
              <p className="text-xs font-mono font-bold text-[#0E4D3A] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>THE CONVERGED JOURNEY PROCESS</span>
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                How Your Match Converges.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {PROCESS_STAGES.map((st, idx) => (
                <div
                  className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#D2D2D7] hover:border-[#0E4D3A] shadow-xs hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between group"
                  key={st.num}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] font-mono text-xs font-bold flex items-center justify-center border border-[#0E4D3A]/20">
                        {st.num}
                      </span>
                      {idx < PROCESS_STAGES.length - 1 && (
                        <span className="text-[#0E4D3A] text-xs font-bold font-mono group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors">
                      {st.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6E6E73] font-normal leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-[16px] bg-white border border-[#D2D2D7] flex items-center justify-center overflow-x-auto">
              <p className="text-xs sm:text-sm font-mono font-bold text-[#0E4D3A] uppercase tracking-wider whitespace-nowrap flex items-center gap-2">
                <span>Understand You</span>
                <span className="text-[#C6A660]">→</span>
                <span>Understand Context</span>
                <span className="text-[#C6A660]">→</span>
                <span>Map Environment</span>
                <span className="text-[#C6A660]">→</span>
                <span>Match Centre</span>
                <span className="text-[#C6A660]">→</span>
                <span>Match Programme</span>
                <span className="text-[#C6A660]">→</span>
                <span>Build Your Journey</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
