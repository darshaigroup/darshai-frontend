import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const SLIDES = [
  {
    num: "01",
    statement:
      "A wellness program delivered in the wrong environment may not achieve the intended physiological outcome or restorative depth.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=1200&fit=crop&auto=format&q=85",
    alt: "Pristine sunlit alpine peaks and high-altitude mountain air",
    badge: "HIGH-ALTITUDE OXYGENATION & ALPINE STILLNESS",
    metric: "Geo-Alignment",
  },
  {
    num: "02",
    statement:
      "DARSHAI evaluates environmental suitability alongside program suitability when designing executive wellness journeys.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=1200&fit=crop&auto=format&q=85",
    alt: "Misty pine forest sanctuary with therapeutic biophilic microclimate",
    badge: "ATMOSPHERIC TELEMETRY & MICROCLIMATE PAIRING",
    metric: "Verified Resonance",
  },
  {
    num: "03",
    statement:
      "The result is a more personalized, context-aware and deeply transformative experience.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=1200&fit=crop&auto=format&q=85",
    alt: "Pristine emerald mountain lake and restorative executive sanctuary",
    badge: "CONTEXT-AWARE TRANSFORMATIVE RECOVERY",
    metric: "Target Reset",
  },
];
export function GeoWellnessDifferenceSection({
  id = "geo-wellness-difference",
  onNavigate,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    track("explore_environments", { action: "prev_slide" });
  };
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    track("explore_environments", { action: "next_slide" });
  };
  const current = SLIDES[activeSlide];
  return (
    <section
      id={id}
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F] scroll-mt-12 overflow-hidden"
    >
      <div className="darshai-container max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-between h-full py-2 order-2 lg:order-1">
              <div>
                <p className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-[#0E4D3A] uppercase mb-3">
                  THE GEO-WELLNESS DIFFERENCE
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] leading-[1.08] tracking-tight mb-6">
                  The Same Program Can Feel
                  <br />
                  Different In Different Environments.
                </h2>
                <div className="min-h-[110px] sm:min-h-[120px] flex items-start mb-8">
                  <AnimatePresence mode="wait">
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="typography-lead text-[#1D1D1F] font-semibold text-lg sm:text-xl lg:text-2xl leading-relaxed"
                      key={current.num}
                    >
                      {current.statement}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <div className="pt-6 border-t border-[#D2D2D7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-10 h-10 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#0E4D3A] hover:text-white hover:border-[#0E4D3A] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-10 h-10 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#0E4D3A] hover:text-white hover:border-[#0E4D3A] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                  </button>
                  <span className="text-xs font-mono font-semibold text-[#6E6E73] ml-3 tabular-nums">
                    0{activeSlide + 1} / 0{SLIDES.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {SLIDES.map((_, idx) => {
                    const isActive = activeSlide === idx;
                    return (
                      <button
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className="cursor-pointer py-2 focus:outline-none"
                        key={idx}
                      >
                        <div
                          className={`h-1.5 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive
                              ? "w-8 bg-[#0E4D3A] shadow-xs"
                              : "w-2 bg-[#D2D2D7] hover:bg-[#8E8E93]"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 relative aspect-[4/3] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#D2D2D7]/80 shadow-2xl bg-[#1D1D1F] group order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full absolute inset-0"
                  key={current.num}
                >
                  <SmartImage
                    src={current.image}
                    alt={current.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none z-10" />
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide image"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-[#1D1D1F] transition-all duration-300 flex items-center justify-center cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide image"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-[#1D1D1F] transition-all duration-300 flex items-center justify-center cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 z-20">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  <span>{current.badge}</span>
                </span>
                <span className="text-xs sm:text-[13px] font-mono font-bold tracking-wide text-[#C6A660] drop-shadow-md shrink-0">
                  {current.metric}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default GeoWellnessDifferenceSection;
