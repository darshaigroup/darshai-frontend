import React, { useState, useRef, useEffect, useCallback } from "react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  Compass,
  Building2,
  HeartHandshake,
  Briefcase,
  LineChart,
} from "lucide-react";
const ECOSYSTEM_MODULES = [
  {
    id: "precision-assessment",
    num: "01",
    title: "Precision Assessment",
    eyebrow: "DIAGNOSTIC INTELLIGENCE",
    category: "Biological Baseline",
    description:
      "DARSHAI begins with rigorous physiological and lifestyle evaluations to establish your biological baseline, metabolic status, and personal wellness aspirations.",
    expandedDetail:
      "Rather than relying on generic intake forms, our assessment evaluates circadian rhythm desynchrony, autonomic nervous system tone, and lifestyle pacing to build an accurate personal health dossier.",
    capabilities: [
      "Circadian Biomarkers",
      "Metabolic & Stress Load",
      "Health Intake Protocols",
      "Baseline Telemetry",
    ],
    linkText: "Explore Assessment",
    targetPage: "contact",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=1000&fit=crop&auto=format&q=85",
    imageAlt: "Precision diagnostic assessment and clinical health profiling",
    icon: Activity,
  },
  {
    id: "geo-wellness-matching",
    num: "02",
    title: "Geo-Wellness Matching",
    eyebrow: "ENVIRONMENTAL INTELLIGENCE",
    category: "Bioclimatic Synthesis",
    description:
      "DARSHAI evaluates individual goals, lifestyle, journey requirements and environmental preferences to narrow a complex wellness ecosystem into more relevant options.",
    expandedDetail:
      "Our matching engine synthesizes terrain elevation, atmospheric pressure, marine salinity, and forest phytoncide concentrations with your individual physiological recovery requirements.",
    capabilities: [
      "Microclimate Alignment",
      "Altitude & Salinity Index",
      "Bioclimatic Pacing",
      "Terrain Suitability",
    ],
    linkText: "Explore Matching",
    targetPage: "programmes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=1000&fit=crop&auto=format&q=85",
    imageAlt: "Intelligent geographical and climatic matching environment",
    icon: Compass,
  },
  {
    id: "curated-wellness-centres",
    num: "03",
    title: "Curated Wellness Centres",
    eyebrow: "VETTED SANCTUARIES",
    category: "Accredited Partners",
    description:
      "We partner exclusively with accredited wellness centres, traditional Ayurvedic retreats, and specialized medical sanctuaries audited for clinical rigor and authenticity.",
    expandedDetail:
      "Every sanctuary in the DARSHAI ecosystem undergoes continuous auditing for medical oversight, therapeutic purity, sovereign accommodation standards, and environmental suitability.",
    capabilities: [
      "NABH/Clinical Verification",
      "Master Physician Standards",
      "Dedicated Facilities",
      "Sovereign Pavilions",
    ],
    linkText: "Explore Curated Centres",
    targetPage: "centres",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&h=1000&fit=crop&auto=format&q=85",
    imageAlt: "Handpicked wellness retreats and clinical sanctuary centres",
    icon: Building2,
  },
  {
    id: "wellness-journey-coordination",
    num: "04",
    title: "Wellness Journey Coordination",
    eyebrow: "JOURNEY MANAGEMENT",
    category: "White-Glove Support",
    description:
      "Dedicated health navigators orchestrate your end-to-end journey—from confidential pre-arrival logistics and private transfers to arrival liaison and clinical coordination.",
    expandedDetail:
      "From sovereign airport escort and discreet transit liaisons to sanctuary check-in and on-site liaison, our coordination ensures your mental bandwidth remains focused on restoration.",
    capabilities: [
      "End-to-End Logistics",
      "Private Transit Liaison",
      "Sanctuary Check-In Care",
      "Continuous Monitoring",
    ],
    linkText: "Explore Journey Coordination",
    targetPage: "contact",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&h=1000&fit=crop&auto=format&q=85",
    imageAlt: "Personalized concierge guidance and white-glove health advisory",
    icon: HeartHandshake,
  },
  {
    id: "corporate-geo-wellness",
    num: "05",
    title: "Corporate Geo-Wellness",
    eyebrow: "EXECUTIVE LEADERSHIP",
    category: "Enterprise Resilience",
    description:
      "Bespoke restorative programmes and executive reset retreats tailored for high-performing founders, leadership teams, and enterprise burnout prevention.",
    expandedDetail:
      "Designed specifically for high-stress executive profiles, our corporate modules integrate bio-environmental matching with structured cognitive restoration and sustained leadership vitality.",
    capabilities: [
      "Executive Resilience",
      "Cohort & Solo Retreats",
      "Cognitive Recovery",
      "Sustainable Performance",
    ],
    linkText: "Explore Corporate",
    targetPage: "corporate",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=1000&fit=crop&auto=format&q=85",
    imageAlt: "Corporate leadership wellness programs and executive retreats",
    icon: Briefcase,
  },
  {
    id: "longevity-intelligence",
    num: "06",
    title: "Longevity Intelligence",
    eyebrow: "DATA & RESEARCH",
    category: "Continuous Trajectory",
    description:
      "Continuous post-programme guidance, biomarker tracking, and ongoing longitudinal research to sustain therapeutic gains and optimize long-term healthspan.",
    expandedDetail:
      "The journey does not end at check-out. We provide sustained biomarker tracking, longitudinal research perspectives, and actionable lifestyle integration guidance for enduring healthspan.",
    capabilities: [
      "Post-Programme Monitoring",
      "Biomarker Trends",
      "Lifestyle Pacing",
      "Longitudinal Research",
    ],
    linkText: "Explore Longevity Intelligence",
    targetPage: "insights",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=1000&fit=crop&auto=format&q=85",
    imageAlt: "Deep research, biomarker insights and longevity intelligence",
    icon: LineChart,
  },
];
export function DarshaiEcosystem({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [_progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  // High-performance scroll tracking for pinned horizontal scrollytelling
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !trackRef.current || window.innerWidth < 1024) {
      return;
    }
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = sectionHeight - windowHeight;
    if (totalScrollableDistance <= 0) return;
    // Progress normalized from 0 to 1 during the pinned viewport window
    const currentProgress = Math.min(
      Math.max(0, -rect.top / totalScrollableDistance),
      1,
    );
    setProgress(currentProgress);
    // Calculate maximum horizontal travel distance across cards
    const trackWidth = trackRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const maxDistance = Math.max(0, trackWidth - windowWidth + 100);
    setTranslateX(currentProgress * maxDistance);
    // Update active step based on progress (0 to 5)
    const step = Math.min(
      Math.floor(currentProgress * ECOSYSTEM_MODULES.length),
      ECOSYSTEM_MODULES.length - 1,
    );
    setActiveStep(step);
  }, []);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    let resizeTimer = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleScroll();
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Initial calculation
    handleScroll();
    const t1 = setTimeout(handleScroll, 200);
    const t2 = setTimeout(handleScroll, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleScroll]);
  // Navigate smoothly to step by scrolling the document
  const goToStep = (index) => {
    const clamped = Math.max(0, Math.min(index, ECOSYSTEM_MODULES.length - 1));
    setActiveStep(clamped);
    if (window.innerWidth >= 1024 && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - windowHeight;
      if (scrollableDistance > 0) {
        const targetScroll =
          sectionTop +
          (clamped / (ECOSYSTEM_MODULES.length - 1)) * scrollableDistance;
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    } else if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 320;
      carouselRef.current.scrollTo({
        left: clamped * (cardWidth + 16),
        behavior: "smooth",
      });
    }
    track("protocol_select", {
      protocol: ECOSYSTEM_MODULES[clamped].title,
      source: "ecosystem_horizontal_navigator",
    });
  };
  const handlePrev = () => {
    goToStep(activeStep - 1);
  };
  const handleNext = () => {
    goToStep(activeStep + 1);
  };
  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.children[0]?.clientWidth || 300;
    const newIndex = Math.round(scrollLeft / (cardWidth + 16));
    if (
      newIndex !== activeStep &&
      newIndex >= 0 &&
      newIndex < ECOSYSTEM_MODULES.length
    ) {
      setActiveStep(newIndex);
    }
  };
  return (
    <div
      ref={sectionRef}
      id="darshai-ecosystem-section"
      className="relative bg-[#1D1D1F] border-b border-white/10 text-white lg:h-[340vh]"
    >
      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col justify-between py-10 overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto px-6 lg:px-8 shrink-0">
          <div className="flex items-end justify-between gap-6 pb-5 border-b border-white/15">
            <div>
              <p
                id="ecosystem-eyebrow"
                className="typography-eyebrow text-[#34D399] mb-2 uppercase flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>THE DARSHAI ECOSYSTEM</span>
              </p>
              <h2
                id="ecosystem-heading"
                className="typography-section-h2 tracking-tight text-white"
              >
                <span className="text-white block">One System. </span>
                <span className="text-[#34D399] block mt-1">
                  Multiple Layers.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-[#141416] p-1 rounded-2xl border border-white/15 shadow-2xs">
              {ECOSYSTEM_MODULES.map((module, idx) => {
                const isCurrent = activeStep === idx;
                return (
                  <button
                    type="button"
                    onClick={() => goToStep(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isCurrent
                        ? "bg-[#0E4D3A] text-white shadow-xs border border-[#34D399]/40"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    key={module.id}
                  >
                    <span
                      className={`text-[10px] font-mono px-1 rounded ${
                        isCurrent
                          ? "bg-white/20 text-white font-bold"
                          : "text-[#34D399]"
                      }`}
                    >
                      {module.num}
                    </span>
                    <span>{module.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full my-auto overflow-hidden py-4">
          <div
            ref={trackRef}
            style={{
              transform: `translate3d(-${translateX}px, 0, 0)`,
              transition: "transform 0.08s linear",
            }}
            className="flex items-center gap-6 sm:gap-8 will-change-transform pl-8 sm:pl-16 pr-24"
          >
            {ECOSYSTEM_MODULES.map((module, idx) => {
              const isCurrent = activeStep === idx;
              const isNext = activeStep + 1 === idx;
              return (
                <div
                  onClick={() => goToStep(idx)}
                  className={`group relative shrink-0 rounded-[28px] overflow-hidden border bg-[#141416] text-white transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-between p-8 sm:p-10 ${
                    isCurrent
                      ? "w-[720px] xl:w-[780px] h-[480px] xl:h-[520px] border-[#34D399] shadow-2xl scale-[1.01]"
                      : isNext
                        ? "w-[500px] xl:w-[560px] h-[480px] xl:h-[520px] border-white/20 opacity-80 hover:opacity-100"
                        : "w-[420px] xl:w-[460px] h-[480px] xl:h-[520px] border-white/10 opacity-55 hover:opacity-85"
                  }`}
                  key={module.id}
                >
                  <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                    <SmartImage
                      src={module.image}
                      alt={module.imageAlt}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none" />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E4D3A]/90 backdrop-blur-md border border-[#34D399]/40 text-xs font-mono font-semibold tracking-wider uppercase text-white shadow-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCurrent
                              ? "bg-[#34D399] animate-pulse"
                              : "bg-white/60"
                          }`}
                        />
                        <span>LAYER {module.num}</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#C6A660] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider font-semibold">
                        {module.eyebrow}
                      </span>
                    </div>
                    <span className="text-3xl font-display font-bold text-white/30 font-mono">
                      {module.num}
                    </span>
                  </div>
                  <div className="relative z-10 pt-8 mt-auto space-y-3">
                    <h3 className="typography-h3 text-white tracking-tight leading-tight">
                      {module.title}
                    </h3>
                    <div className="space-y-3 opacity-0 translate-y-6 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out">
                      <p className="typography-body text-white/85 leading-relaxed max-w-xl line-clamp-3">
                        {module.description}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        {module.capabilities.map((cap) => (
                          <span
                            className="px-2.5 py-1 rounded-lg bg-black/55 border border-white/15 backdrop-blur-sm text-[11px] font-mono text-white/80"
                            key={cap}
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full max-w-[1320px] mx-auto px-6 lg:px-8 shrink-0 pt-3 border-t border-white/15 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#34D399] px-3 py-1 rounded-full bg-[#0E4D3A]/20 border border-[#34D399]/30">
              0{activeStep + 1} / 06
            </span>
            <span className="text-sm font-semibold text-white">
              {ECOSYSTEM_MODULES[activeStep].title}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 py-1">
            {ECOSYSTEM_MODULES.map((module, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  type="button"
                  onClick={() => goToStep(idx)}
                  aria-label={`Jump to ${module.title}`}
                  className="cursor-pointer py-1 px-0.5"
                  key={module.id}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? "w-9 bg-[#34D399]"
                        : "w-3 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeStep === 0}
              aria-label="Previous layer"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                activeStep === 0
                  ? "opacity-35 cursor-not-allowed bg-white/5 border-white/10 text-white/40"
                  : "bg-[#141416] hover:bg-[#0E4D3A] hover:text-white border-white/20 text-white shadow-xs"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeStep === ECOSYSTEM_MODULES.length - 1}
              aria-label="Next layer"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                activeStep === ECOSYSTEM_MODULES.length - 1
                  ? "opacity-35 cursor-not-allowed bg-white/5 border-white/10 text-white/40"
                  : "bg-[#141416] hover:bg-[#0E4D3A] hover:text-white border-white/20 text-white shadow-xs"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="block lg:hidden py-16 px-4 sm:px-6">
        <div className="mb-6">
          <p
            id="ecosystem-eyebrow-mobile"
            className="typography-eyebrow text-[#34D399] mb-2 uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <span>THE DARSHAI ECOSYSTEM</span>
          </p>
          <h2
            id="ecosystem-heading-mobile"
            className="typography-section-h2 tracking-tight mb-2 text-white"
          >
            <span className="text-white block">One System.</span>
            <span className="text-[#34D399] block mt-0.5">
              Multiple Layers.
            </span>
          </h2>
          <p className="typography-body text-white/80 leading-relaxed">
            DARSHAI brings assessment, matching, curated environments and
            ongoing journey support into one connected wellness architecture.
          </p>
        </div>
        <div
          ref={carouselRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ECOSYSTEM_MODULES.map((module, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                className="snap-center shrink-0 relative group"
                key={module.id}
              >
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => {
                    if (onNavigate) onNavigate(module.targetPage);
                  }}
                  className={`w-[85vw] sm:w-[72vw] h-[490px] relative rounded-[26px] overflow-hidden border bg-[#141416] cursor-pointer flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 ${isCurrent ? "border-[#0E4D3A] shadow-md" : "border-[#D2D2D7]"}`}
                >
                  <div className="absolute inset-0 bg-[#0A1612] overflow-hidden">
                    <SmartImage
                      src={module.image}
                      alt={module.imageAlt}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none" />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#0E4D3A]/90 text-[10px] font-mono font-semibold text-white uppercase border border-[#34D399]/40">
                      LAYER {module.num}
                    </span>
                    <span className="text-xl font-mono font-bold text-white/30">
                      {module.num}
                    </span>
                  </div>
                  <div className="relative z-10 space-y-2.5 pt-6 text-white">
                    <p className="text-[10px] font-mono text-[#C6A660] uppercase tracking-wider font-semibold">
                      {module.eyebrow}
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed line-clamp-3">
                      {module.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-[#0E4D3A] font-semibold">
            0{activeStep + 1} / 06 {ECOSYSTEM_MODULES[activeStep].title}
          </span>
          <div className="flex gap-1.5">
            {ECOSYSTEM_MODULES.map((_, idx) => (
              <div
                className={`h-1.5 rounded-full transition-all ${activeStep === idx ? "w-6 bg-[#0E4D3A]" : "w-1.5 bg-[#D2D2D7]"}`}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DarshaiEcosystem;
