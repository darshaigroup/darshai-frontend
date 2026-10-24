import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const ADVANTAGES = [
  {
    num: "01",
    title: "India-Based Concierge Coordination",
    tag: "CONCIERGE SUPPORT",
    desc: "Local on-ground coordination before departure, throughout your stay, and post-retreat.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "India-based concierge coordination and seamless travel liaison",
  },
  {
    num: "02",
    title: "Curated Wellness Network",
    tag: "VERIFIED NETWORK",
    desc: "Carefully selected wellness partners rather than an open directory.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Curated verified network of accredited Ayurvedic sanctuaries",
  },
  {
    num: "03",
    title: "Personalized Recommendations",
    tag: "INDIVIDUAL MATCHING",
    desc: "Recommendations based on individual requirements, not simply ratings or popularity.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Personalized clinical matching and protocol recommendation",
  },
  {
    num: "04",
    title: "End-to-End Journey Coordination",
    tag: "SEAMLESS TRAVEL",
    desc: "From initial enquiry and matching to booking, airport liaisons and follow-up.",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "End-to-end journey logistics and arrival assistance",
  },
  {
    num: "05",
    title: "Professional Review Where Required",
    tag: "CLINICAL INTEGRITY",
    desc: "Appropriate recommendations may be reviewed by qualified professionals where required.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Medical validation and professional clinical oversight",
  },
  {
    num: "06",
    title: "Post-Program Continuity",
    tag: "SUSTAINED VITALITY",
    desc: "Support and wellness monitoring continue beyond the retreat experience.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Post-retreat lifestyle integration and quarterly continuity tracking",
  },
];
export function DarshaiAdvantageSection({ onScrollToForm }) {
  const [activeAdvantageIndex, setActiveAdvantageIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const activeAdvantage = ADVANTAGES[activeAdvantageIndex];
  return (
    <section
      id="why-choose"
      className="py-24 sm:py-28 md:py-32 bg-white border-y border-[#D2D2D7] relative overflow-hidden text-left"
    >
      <div className="darshai-container text-left">
        <div className="max-w-4xl mb-14 sm:mb-16 md:mb-20">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#0E4D3A] uppercase mb-3">
            THE DARSHAI ADVANTAGE
          </p>
          <h2 className="typography-section-h2 font-bold text-[#111111] leading-[1.08] tracking-tight mb-6">
            Wellness in India. <br className="hidden sm:inline" />
            <span className="text-[#0E4D3A]">Without the Guesswork.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-[21px] lg:text-[22px] text-[#2C2C2E] font-medium leading-[1.48] max-w-3xl">
            DARSHAI helps international travellers discover curated wellness
            journeys in India—from assessment and centre matching to travel
            coordination and follow-up.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {ADVANTAGES.map((adv, idx) => {
              const isActive = activeAdvantageIndex === idx;
              return (
                <div
                  className={`rounded-[20px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-[#F9FBF9] border-[#0E4D3A] shadow-md ring-1 ring-[#0E4D3A]/20"
                      : "bg-[#F5F5F7]/80 border-[#D2D2D7] hover:border-[#0E4D3A]/40 hover:bg-white"
                  }`}
                  key={adv.num}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveAdvantageIndex(idx);
                      track("begin_journey", {
                        source: "advantage_accordion",
                        item: adv.title,
                      });
                    }}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#0E4D3A] text-white"
                            : "bg-white text-[#111111] border border-[#D2D2D7]"
                        }`}
                      >
                        {adv.num}
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`font-display text-sm sm:text-base md:text-lg font-bold truncate transition-colors ${isActive ? "text-[#0E4D3A]" : "text-[#111111]"}`}
                        >
                          {adv.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-[#D2D2D7] text-[#2C2C2E]">
                        {adv.tag}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#2C2C2E] transition-transform duration-300 ${isActive ? "rotate-180 text-[#0E4D3A]" : ""}`}
                      />
                    </div>
                  </button>
                  {isActive && (
                    <div className="px-5 pb-5 pt-1 text-left border-t border-[#0E4D3A]/15">
                      <p className="text-sm sm:text-[15px] text-[#2C2C2E] leading-relaxed font-medium">
                        {adv.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] lg:min-h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#111111] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] flex flex-col justify-end">
            {ADVANTAGES.map((adv, idx) => {
              const isActive = activeAdvantageIndex === idx;
              return (
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 10 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                  key={adv.num}
                >
                  <img
                    src={adv.image}
                    alt={adv.imageAlt}
                    className="w-full h-full object-cover brightness-[0.88] contrast-[1.04]"
                  />
                </motion.div>
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-15 pointer-events-none" />
            <div className="absolute top-5 sm:top-7 left-5 sm:left-7 z-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                <span>{activeAdvantage.tag}</span>
              </div>
            </div>
            <div className="relative z-20 p-6 sm:p-8 text-white max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -10 }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-2"
                  key={activeAdvantage.num}
                >
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#C6A660] font-bold">
                    ADVANTAGE {activeAdvantage.num} OF 06
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeAdvantage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    {activeAdvantage.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DarshaiAdvantageSection;
