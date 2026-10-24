import React, { useState, useRef } from "react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
export const seasonalRetreatsList = [
  {
    num: "01",
    name: "KANASU OJAS",
    window: "January-March",
    durations: "7 / 14 / 21 days",
    focus: "Strength & Vitality",
    description:
      "A winter-season programme centred on nourishing practices, warming Ayurvedic therapies, nutrition and an energising yoga routine, with assessment and personalisation.",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&h=650&fit=crop&auto=format",
  },
  {
    num: "02",
    name: "KANASU LAGHAVA",
    window: "March-May",
    durations: "7 / 14 / 21 days",
    focus: "The Lightness Within",
    description:
      "A spring-season programme inspired by seasonal routine, lighter sattvik nutrition, cleansing yoga and selected Ayurvedic or naturopathic practices.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&h=650&fit=crop&auto=format",
  },
  {
    num: "03",
    name: "KANASU SOMA",
    window: "May-July",
    durations: "14 / 21 days",
    focus: "Calming & Mind Wellness",
    description:
      "A summer retreat focused on rest, calm, reduced stimulation and mind-body practices, including relaxation and selected cooling Ayurvedic practices.",
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1000&h=650&fit=crop&auto=format",
  },
  {
    num: "04",
    name: "KANASU SAMSODHANA",
    window: "July-September (Flagship)",
    durations: "14 / 21 days",
    focus: "Panchakarma Immersion",
    description:
      "The flagship monsoon retreat is organised around Panchakarma phases: preparation, procedures selected after assessment, and post-care under centre supervision.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1000&h=650&fit=crop&auto=format",
  },
  {
    num: "05",
    name: "KANASU TEJAS",
    window: "September-November",
    durations: "14 / 21 days",
    focus: "Radiance & Purification",
    description:
      "A seasonal programme combining external skin-wellness practices with internal wellness routines, nutrition and practitioner-selected activities.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&h=650&fit=crop&auto=format",
  },
  {
    num: "06",
    name: "KANASU RASAYANA",
    window: "November-December",
    durations: "14 / 21 days",
    focus: "Longevity & Vitality",
    description:
      "A longer, rejuvenation-focused Ayurvedic wellness programme centred on nourishment, strengthening practices and long-term vitality; no longevity outcome is guaranteed.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&h=650&fit=crop&auto=format",
  },
];
export function SeasonalRetreatsSection({ onRequestRecommendation }) {
  const [activeStep, setActiveStep] = useState(0);
  const carouselRef = useRef(null);
  // Sync active step on scroll
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const totalWidth = container.scrollWidth - container.clientWidth;
    if (totalWidth <= 0) return;
    const cardWidth = container.scrollWidth / seasonalRetreatsList.length;
    const calculatedStep = Math.min(
      Math.max(0, Math.round(scrollLeft / cardWidth)),
      seasonalRetreatsList.length - 1,
    );
    setActiveStep(calculatedStep);
  };
  // Scroll to a specific card
  const goToStep = (index) => {
    const clamped = Math.max(
      0,
      Math.min(index, seasonalRetreatsList.length - 1),
    );
    setActiveStep(clamped);
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.scrollWidth / seasonalRetreatsList.length;
      container.scrollTo({
        left: clamped * cardWidth,
        behavior: "smooth",
      });
    }
  };
  const handlePrev = () => goToStep(activeStep - 1);
  const handleNext = () => goToStep(activeStep + 1);
  return (
    <section
      id="seasonal-retreats-section"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#D2D2D7] relative overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <p className="typography-eyebrow text-[#0E4D3A] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              <span>06 | SEASONAL RETREATS</span>
            </p>
            <h2 className="typography-section-h2 tracking-tight">
              <span className="text-[#1D1D1F] block">
                A programme aligned with the season.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#0E4D3A] px-3.5 py-1.5 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/20">
                0{activeStep + 1} / 06
              </span>
              <span className="text-sm font-semibold text-[#1D1D1F] hidden sm:inline">
                {seasonalRetreatsList[activeStep].name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeStep === 0}
                aria-label="Previous retreat"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeStep === 0
                    ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                    : "bg-white hover:bg-[#0E4D3A] hover:text-white border-[#D2D2D7] text-[#1D1D1F] shadow-2xs"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeStep === seasonalRetreatsList.length - 1}
                aria-label="Next retreat"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeStep === seasonalRetreatsList.length - 1
                    ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                    : "bg-white hover:bg-[#0E4D3A] hover:text-white border-[#D2D2D7] text-[#1D1D1F] shadow-2xs"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {seasonalRetreatsList.map((ret, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                className="snap-start shrink-0 relative group"
                key={ret.name}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={onRequestRecommendation}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onRequestRecommendation();
                    }
                  }}
                  className={`w-[320px] sm:w-[420px] lg:w-[460px] h-[480px] lg:h-[520px] relative rounded-[32px] overflow-hidden border bg-[#1D1D1F] apple-product-card cursor-pointer focus-visible:outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.012] group-hover:-translate-y-1 ${
                    isCurrent
                      ? "border-[#0E4D3A] shadow-xl z-10"
                      : "border-[#D2D2D7]/80 hover:border-[#0E4D3A]/60"
                  }`}
                >
                  <div className="absolute inset-0 bg-[#0A1A14] overflow-hidden">
                    <SmartImage
                      src={ret.image}
                      alt={ret.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 pointer-events-none" />
                  </div>
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <SignalBadge variant="dark" dot>
                      RETREAT {ret.num}
                    </SignalBadge>
                    <SignalBadge variant="dark">{ret.window}</SignalBadge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-[#C6A660] uppercase tracking-wider">
                        {ret.focus}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-xs font-mono font-bold text-white/80">
                        {ret.durations}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1">
                      {ret.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 mt-2 line-clamp-3 leading-relaxed transition-opacity duration-500">
                      {ret.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6A660] mt-4 transition-all duration-300 group-hover:translate-x-1">
                      <span>CHECK SEASONAL DATES</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 pt-4">
          {seasonalRetreatsList.map((ret, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                type="button"
                onClick={() => goToStep(idx)}
                aria-label={`Jump to retreat ${ret.num}: ${ret.name}`}
                className="group relative focus:outline-none flex items-center justify-center cursor-pointer py-1 px-0.5"
                key={ret.name}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCurrent
                      ? "w-10 bg-[#0E4D3A]"
                      : "w-3 bg-[#1D1D1F]/20 group-hover:bg-[#1D1D1F]/40"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default SeasonalRetreatsSection;
