import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const JOURNEY_FLOW_STEPS = [
  {
    id: "programme-capability",
    num: "01",
    criterionTitle: "01 — Programme Capability",
    stepLabel: "PROGRAMME CAPABILITY",
    stepValue: "Published programmes & service scope",
    phaseTag: "01 / PROGRAMME CAPABILITY",
    headline: "Programme Capability",
    publicCopy:
      "We review the centre’s published programmes, available durations, service scope and whether its offering appears relevant to the journey being considered.",
    image:
      "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=1600&auto=format&fit=crop&q=85",
    imageAlt: "Programme capability and doctor-supervised wellness programs",
    metrics: [
      { label: "DIMENSION", value: "01 — Programme Capability" },
      { label: "REVIEW SCOPE", value: "Published Programmes & Durations" },
    ],
    outcomeTag: "DIMENSION 01: PROGRAMME CAPABILITY",
  },
  {
    id: "clinical-alignment",
    num: "02",
    criterionTitle: "02 — Clinical Alignment",
    stepLabel: "CLINICAL ALIGNMENT",
    stepValue: "Practitioner assessment & suitability",
    phaseTag: "02 / CLINICAL ALIGNMENT",
    headline: "Clinical Alignment",
    publicCopy:
      "Where clinical review is relevant, the centre’s qualified practitioners assess the relevant information and determine programme suitability. DARSHAI does not independently diagnose or prescribe treatment.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=85",
    imageAlt: "Clinical alignment and qualified practitioner intake",
    metrics: [
      { label: "DIMENSION", value: "02 — Clinical Alignment" },
      { label: "PRACTITIONER ROLE", value: "Independent Clinical Suitability" },
    ],
    outcomeTag: "DIMENSION 02: CLINICAL ALIGNMENT",
  },
  {
    id: "environment-quality",
    num: "03",
    criterionTitle: "03 — Environment Quality",
    stepLabel: "ENVIRONMENT QUALITY",
    stepValue: "Setting, terrain & local climate",
    phaseTag: "03 / ENVIRONMENT QUALITY",
    headline: "Environment Quality",
    publicCopy:
      "We consider the centre’s actual setting, location, terrain, climate and surrounding environment using accurate, centre-specific information.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Environment quality, terrain, microclimate and surrounding landscape",
    metrics: [
      { label: "DIMENSION", value: "03 — Environment Quality" },
      { label: "VERIFIED METRICS", value: "Actual Setting, Terrain & Climate" },
    ],
    outcomeTag: "DIMENSION 03: ENVIRONMENT QUALITY",
  },
  {
    id: "operational-standards",
    num: "04",
    criterionTitle: "04 — Operational Standards",
    stepLabel: "OPERATIONAL STANDARDS",
    stepValue: "Facilities, stays & booking terms",
    phaseTag: "04 / OPERATIONAL STANDARDS",
    headline: "Operational Standards",
    publicCopy:
      "We review the information provided about facilities, accommodation, guest support, documentation, booking arrangements and cancellation terms.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85",
    imageAlt:
      "Operational standards, facilities, accommodation and guest support",
    metrics: [
      { label: "DIMENSION", value: "04 — Operational Standards" },
      { label: "FACILITIES & TERMS", value: "Accommodation & Support Ready" },
    ],
    outcomeTag: "DIMENSION 04: OPERATIONAL STANDARDS",
  },
];
export function JourneyExamplesSection({
  id = "journey-examples",
  onNavigate,
}) {
  const containerRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Track active step across 4 ranges (0.00 -> 1.00)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const step = Math.min(Math.floor(latest * 4), 3);
      setActiveStepIndex(step);
    });
  }, [scrollYProgress]);
  const activeData = JOURNEY_FLOW_STEPS[activeStepIndex];
  return (
    <section
      ref={containerRef}
      id={id}
      className="relative bg-white text-[#1D1D1F] border-b border-[#D2D2D7] h-[280vh] scroll-mt-12"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-white z-10 py-6 sm:py-8 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col h-full max-h-[880px] justify-between">
          <div className="mb-4 sm:mb-6 shrink-0">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div className="max-w-3xl">
                  <p className="typography-eyebrow text-[#0E4D3A] mb-1.5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                    <span>HOW WE CURATE</span>
                  </p>
                  <h2 className="typography-section-h2 font-semibold text-[#1D1D1F] tracking-tight leading-tight mb-2">
                    The Right Centre Is More Than a Location.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#48484A] font-normal leading-relaxed">
                    We consider four connected dimensions when assessing
                    potential alignment between a person, a programme and a
                    wellness environment. Where clinical considerations apply,
                    the centre’s qualified practitioners must confirm individual
                    suitability.
                  </p>
                </div>
                <div className="shrink-0 hidden md:block">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#1D1D1F] border border-[#D2D2D7] shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#0E4D3A]" />
                    <span>4 CURATION DIMENSIONS</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch flex-1 min-h-0">
            <div className="order-1 lg:order-1 lg:col-span-7 relative rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#18181A] shadow-xl flex flex-col justify-between group h-[190px] sm:h-[260px] lg:h-auto min-h-[190px] sm:min-h-[260px] lg:min-h-[360px] shrink-0">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full absolute inset-0"
                    key={activeData.id}
                  >
                    <SmartImage
                      src={activeData.image}
                      alt={activeData.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 pointer-events-none" />
              </div>
              <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>{activeData.phaseTag}</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#C6A660] bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/15 hidden sm:inline-block">
                  CENTRE CURATION FRAMEWORK
                </span>
              </div>
              <div className="relative z-10 p-3 sm:p-6 lg:p-8 flex items-center justify-between">
                <div className="bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-2 sm:gap-2.5 shadow-lg">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399]" />
                  <span className="text-[#34D399] font-mono font-bold">
                    {activeData.num}
                  </span>
                  <span className="truncate max-w-[200px] sm:max-w-none">
                    {activeData.headline}
                  </span>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2 lg:col-span-5 flex flex-col justify-between bg-white rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-4 sm:p-6 lg:p-8 border border-[#D2D2D7] shadow-xl relative overflow-hidden min-h-0 text-[#1D1D1F]">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0E4D3A] text-white border border-[#0E4D3A]/20 mb-2 sm:mb-3 shadow-xs">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>CURATION DIMENSION {activeData.num}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight leading-tight mb-2">
                  {activeData.criterionTitle}
                </h3>
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#D2D2D7] text-xs sm:text-sm text-[#333336] leading-relaxed font-normal shadow-2xs">
                  <p>{activeData.publicCopy}</p>
                </div>
              </div>
              <div className="py-2 sm:py-3 my-auto space-y-1.5 sm:space-y-2">
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#0E4D3A] font-bold mb-1">
                  CRITERION SELECTOR
                </p>
                {JOURNEY_FLOW_STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStepIndex(idx);
                        track("explore_environments", { step: step.stepLabel });
                      }}
                      className={`w-full text-left p-2 sm:p-2.5 lg:p-3 rounded-[12px] sm:rounded-[14px] border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? "bg-[#0E4D3A] border-[#0E4D3A] text-white shadow-sm ring-1 ring-[#0E4D3A]/20 scale-[1.01]"
                          : "bg-white border-[#D2D2D7] hover:border-[#0E4D3A]/40 text-[#1D1D1F] hover:bg-[#F5F5F7]"
                      }`}
                      key={step.id}
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <span
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-colors ${
                            isActive
                              ? "bg-white text-[#0E4D3A] shadow-xs"
                              : "bg-[#F5F5F7] text-[#555555] border border-[#D2D2D7]"
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`text-[11px] sm:text-xs font-semibold tracking-wide ${isActive ? "text-white" : "text-[#1D1D1F]"}`}
                        >
                          {step.criterionTitle}
                        </span>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="pt-2 sm:pt-3 border-t border-[#D2D2D7] flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-[#6E6E73] font-mono italic">
                  Scroll or tap dimensions to view details
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-[#0E4D3A] font-bold">
                  0{activeStepIndex + 1} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default JourneyExamplesSection;
