import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { ArrowRight, MapPin } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const ENVIRONMENTS = [
  {
    id: "coastal",
    label: "COASTAL",
    num: "01",
    tagline: "High Salinity & Negative Ion Sea Air",
    explanation:
      "Your surroundings can shape how you rest, recover and reconnect. Coastal sea air rich in natural salinity and negative ions supports deep respiratory recovery and nervous system calm.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Coastal sea air and open ocean horizon",
    elevation: "Sea Level (0 – 50m)",
    highlights: ["Ocean rhythms", "Open horizons", "Negative ion saturation"],
  },
  {
    id: "mountain",
    label: "MOUNTAIN",
    num: "02",
    tagline: "Sub-Alpine Elevation & Pure Atmospheric Air",
    explanation:
      "Cool, clean high-altitude air stimulates cellular resilience, deeper metabolic regulation, and profound mental clarity away from urban sensory overload.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Mountain sanctuary elevation and misty alpine ridges",
    elevation: "High Altitude (1,200m – 2,200m)",
    highlights: ["Alpine stillness", "Cool elevation", "Pure atmospheric air"],
  },
  {
    id: "forest",
    label: "FOREST",
    num: "03",
    tagline: "Dense Evergreen Canopy & Elevated Phytoncides",
    explanation:
      "Tree canopy phytoncides lower cortisol and blood pressure while natural acoustic stillness resets circadian rhythm and supports immune activity.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Dense evergreen forest canopy",
    elevation: "Sub-Alpine Canopy (400m – 900m)",
    highlights: [
      "Biophilic canopy",
      "Phytoncide saturation",
      "Natural stillness",
    ],
  },
  {
    id: "heritage",
    label: "HERITAGE",
    num: "04",
    tagline: "Vaidya Courtyard Estates & Passive Air Cooling",
    explanation:
      "Centuries-old courtyard architecture designed with natural cross-ventilation facilitates slow pacing, meditative routines, and classical Ayurvedic protocols.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Ancestral heritage Vaidya sanctuary",
    elevation: "Historic River Plains (100m – 250m)",
    highlights: [
      "Courtyard cross-ventilation",
      "Vaidya lineage",
      "Slow pacing",
    ],
  },
  {
    id: "urban-nature",
    label: "URBAN NATURE",
    num: "05",
    tagline: "Filtered Botanical Sanctuaries Near Metropolitan Hubs",
    explanation:
      "Protected botanical microclimates offering restorative seclusion and filtered green buffers without demanding complex transit logistics.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=900&fit=crop&auto=format&q=85",
    alt: "Urban nature biophilic garden sanctuary",
    elevation: "Metro Natural Buffer",
    highlights: [
      "Restorative green buffers",
      "Accessible transit",
      "Filtered microclimates",
    ],
  },
];
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Understand You",
    description: "Assessment of individual health baseline, biology and goals.",
  },
  {
    num: "02",
    title: "Understand Context",
    description: "Mapping life rhythm, constraints, schedule and pacing.",
  },
  {
    num: "03",
    title: "Map Environment",
    description:
      "Selecting microclimate, altitude, ocean air or forest terrain.",
  },
  {
    num: "04",
    title: "Match Centre",
    description: "Auditing accredited sanctuary capabilities and standards.",
  },
  {
    num: "05",
    title: "Match Programme",
    description:
      "Aligning therapeutic protocols, duration and daily dincharya.",
  },
  {
    num: "06",
    title: "Build Your Journey",
    description: "Complete pre-arrival, in-stay and post-stay coordination.",
  },
];
export default function GeoWellnessSignatureSection({ onNavigate }) {
  const [selectedEnvId, setSelectedEnvId] = useState("coastal");
  const currentEnv =
    ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ENVIRONMENTS[0];
  const handleSelectEnv = (env) => {
    setSelectedEnvId(env.id);
    track("filter_environment", { environment: env.label });
  };
  return (
    <section
      id="geo-wellness-signature-experience"
      aria-label="The Geo-Wellness Signature Experience"
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F]"
    >
      <div className="darshai-container w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mb-10 md:mb-14">
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
              <span className="block">
                Where You Go <span className="text-[#0E4D3A]">Matters.</span>
              </span>
            </h2>
            <p className="typography-body-large text-[#48484A] leading-relaxed font-normal">
              Your surroundings can shape how you rest, recover and reconnect.
              DARSHAI considers your goals, context and environment when
              matching your wellness journey.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex items-center justify-start overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none no-scrollbar">
            <div className="p-1.5 rounded-full bg-white border border-[#D2D2D7] shadow-xs flex items-center gap-1 sm:gap-2">
              {ENVIRONMENTS.map((env) => {
                const isSelected = env.id === selectedEnvId;
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectEnv(env)}
                    className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#0E4D3A] text-white shadow-md scale-[1.02]"
                        : "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                    }`}
                    key={env.id}
                  >
                    <span>{env.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative rounded-[28px] md:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#141416] text-white shadow-2xl min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 mb-16 md:mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0 bg-[#0A1612]"
                key={currentEnv.id}
              >
                <SmartImage
                  src={currentEnv.image}
                  alt={currentEnv.alt}
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
            <div className="relative z-10 mb-auto flex items-center justify-between gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white">
                <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{currentEnv.elevation}</span>
              </span>
              <span className="text-xs font-mono text-[#C6A660] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C6A660]/40 uppercase tracking-wider font-semibold">
                {currentEnv.tagline}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-3xl pt-6"
                key={currentEnv.id + "-explanation"}
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#34D399] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>
                    ENVIRONMENT {currentEnv.num} · {currentEnv.label}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight mb-3">
                  {currentEnv.label} SANCTUARY
                </h3>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal mb-6">
                  {currentEnv.explanation}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/20">
                  {currentEnv.highlights.map((item) => (
                    <span
                      className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-medium text-white/90"
                      key={item}
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="space-y-8 pt-4 border-t border-[#D2D2D7]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-bold text-[#0E4D3A] uppercase tracking-wider mb-1">
                  THE MATCHING PROCESS
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight">
                  How Your Journey Is Built
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("centres")}
                className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[#0E4D3A] hover:underline uppercase tracking-wider cursor-pointer"
              >
                <span>EXPLORE SANCTUARIES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#D2D2D7] hover:border-[#0E4D3A] shadow-xs hover:shadow-md transition-all duration-300 space-y-2 group"
                  key={step.title}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] font-mono text-xs font-bold flex items-center justify-center group-hover:bg-[#0E4D3A] group-hover:text-white transition-all">
                      {step.num}
                    </span>
                    {idx < PROCESS_STEPS.length - 1 && (
                      <span className="text-xs font-mono font-bold text-[#0E4D3A] opacity-40 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    )}
                  </div>
                  <h4 className="font-mono text-sm sm:text-base font-bold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
