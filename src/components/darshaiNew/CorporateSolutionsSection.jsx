import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const SOLUTIONS = [
  {
    num: "01",
    title: "Executive Reset",
    tag: "COGNITIVE RECOVERY",
    desc: "For founders, executives and leadership teams experiencing sustained pressure and decision fatigue.",
    image:
      "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Executive cognitive recovery and decision clarity sanctuary",
  },
  {
    num: "02",
    title: "Leadership Recovery",
    tag: "SUSTAINED VITALITY",
    desc: "For senior teams requiring focused recovery, nervous system regulation, and physiological restoration.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Senior leadership physical restoration and stress relief estate",
  },
  {
    num: "03",
    title: "Organizational Wellbeing",
    tag: "KEY TALENT SUPPORT",
    desc: "Supporting targeted wellbeing initiatives for high-value talent, key contributors, and critical decision makers.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Enterprise key talent support and organizational health",
  },
  {
    num: "04",
    title: "Leadership Retreats",
    tag: "STRATEGIC ALIGNMENT",
    desc: "Curated wellness environments designed for strategic reflection, team alignment, and executive cohesion.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Executive leadership retreat and strategic alignment sanctuary",
  },
  {
    num: "05",
    title: "Corporate Longevity",
    tag: "PREVENTATIVE LONGEVITY",
    desc: "Long-term wellbeing strategies and biomarker tracking supporting sustainable leadership performance over years.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Corporate longevity and preventative health roadmap",
  },
];
export function CorporateSolutionsSection({ onNavigate }) {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const activeSolution = SOLUTIONS[activeSolutionIndex];
  return (
    <section
      id="corporate-solutions"
      className="py-24 sm:py-28 md:py-32 bg-white border-y border-[#D2D2D7] relative overflow-hidden text-left"
    >
      <div className="darshai-container text-left">
        <div className="max-w-4xl mb-14 sm:mb-16 md:mb-20">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1D4ED8] uppercase mb-3">
            SOLUTIONS
          </p>
          <h2 className="typography-section-h2 font-bold text-[#111111] leading-[1.08] tracking-tight mb-6">
            Designed Around Different <br className="hidden sm:inline" />
            <span className="text-[#111111]">Organizational Needs.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-[21px] lg:text-[22px] text-[#2C2C2E] font-medium leading-[1.48] max-w-3xl">
            Tailored Geo-Wellness solutions structured for executive cohorts,
            leadership teams, and enterprise talent.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3 order-2 lg:order-1">
            {SOLUTIONS.map((sol, idx) => {
              const isActive = activeSolutionIndex === idx;
              return (
                <div
                  className={`rounded-[20px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-[#1D4ED8]/5 border-[#1D4ED8] shadow-md ring-1 ring-[#1D4ED8]/20"
                      : "bg-[#F5F5F7]/80 border-[#D2D2D7] hover:border-[#1D4ED8]/40 hover:bg-white"
                  }`}
                  key={sol.num}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSolutionIndex(idx);
                      track("solution_select", {
                        source: "corporate_solutions",
                        item: sol.title,
                      });
                    }}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#1D4ED8] text-white"
                            : "bg-white text-[#111111] border border-[#D2D2D7]"
                        }`}
                      >
                        {sol.num}
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={`font-display text-sm sm:text-base md:text-lg font-bold truncate transition-colors ${isActive ? "text-[#1D4ED8]" : "text-[#111111]"}`}
                        >
                          {sol.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-[#D2D2D7] text-[#2C2C2E]">
                        {sol.tag}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#2C2C2E] transition-transform duration-300 ${isActive ? "rotate-180 text-[#1D4ED8]" : ""}`}
                      />
                    </div>
                  </button>
                  {isActive && (
                    <div className="px-5 pb-5 pt-1 text-left border-t border-[#1D4ED8]/15">
                      <p className="text-sm sm:text-[15px] text-[#2C2C2E] leading-relaxed font-medium mb-4">
                        {sol.desc}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          track("consultation_request", {
                            source: `solution_accordion_${sol.title}`,
                          });
                          track("begin_journey", {
                            source: `solution_accordion_${sol.title}`,
                          });
                          onNavigate("contact");
                        }}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D4ED8] hover:underline cursor-pointer"
                      >
                        <span>
                          REQUEST CONSULTATION FOR {sol.title.toUpperCase()}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] lg:min-h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#111111] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] flex flex-col justify-end order-1 lg:order-2">
            {SOLUTIONS.map((sol, idx) => {
              const isActive = activeSolutionIndex === idx;
              return (
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 10 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                  key={sol.num}
                >
                  <img
                    src={sol.image}
                    alt={sol.imageAlt}
                    className="w-full h-full object-cover brightness-[0.88] contrast-[1.04]"
                  />
                </motion.div>
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-15 pointer-events-none" />
            <div className="absolute top-5 sm:top-7 left-5 sm:left-7 z-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse" />
                <span>{activeSolution.tag}</span>
              </div>
            </div>
            <div className="relative z-20 p-6 sm:p-8 text-white max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-3"
                  key={activeSolution.num}
                >
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#1D4ED8] font-bold">
                    MODULE {activeSolution.num} OF 05
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeSolution.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    {activeSolution.desc}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        track("consultation_request", {
                          source: `solution_canvas_${activeSolution.title}`,
                        });
                        track("begin_journey", {
                          source: `solution_canvas_${activeSolution.title}`,
                        });
                        onNavigate("contact");
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-md"
                    >
                      <span>REQUEST CORPORATE CONSULTATION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CorporateSolutionsSection;
