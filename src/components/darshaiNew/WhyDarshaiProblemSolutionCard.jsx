import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";

const ARCHITECTURE_FLOW = [
  { label: "YOU", desc: "Baseline Health & Biology" },
  { label: "GOALS", desc: "Primary Intent & Objectives" },
  { label: "CONTEXT", desc: "Lifestyle, Rhythm & Constraints" },
  { label: "ENVIRONMENT", desc: "Microclimate & Terrain Telemetry" },
  { label: "PROGRAMME", desc: "Clinical Sanctuary Protocol" },
];

export function WhyDarshaiProblemSolutionCard({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % ARCHITECTURE_FLOW.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative flex min-h-[490px] w-full select-none flex-col justify-between overflow-hidden rounded-[28px] border border-white bg-[#0A0D0C] p-6 text-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-[#34D399] hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] sm:min-h-[530px] sm:rounded-[36px] sm:p-9 lg:min-h-[550px] lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#0E4D3A]/20 blur-[90px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#34D399]/10 blur-[100px]" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(0,0,0,0.7)_100%]" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:px-3.5 sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-[#34D399] shadow-[0_0_10px_#34D399]" />
          <span>The Darshai Architecture</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
          {ARCHITECTURE_FLOW.map((_, idx) => {
            const isActive = activeStep === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                aria-label={`Jump to architecture step ${idx + 1}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-400 ${
                  isActive
                    ? "w-6 bg-[#34D399] shadow-[0_0_8px_#34D399]"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 my-auto flex flex-col justify-center py-5 sm:py-7">
        <div className="mb-5 text-left">
          <p className="mb-1 text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#34D399]">
            The Fit-First Paradigm
          </p>

          <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            The DARSHAI Architecture
          </h3>
        </div>

        <div className="flex w-full flex-col items-center">
          {ARCHITECTURE_FLOW.map((node, index) => {
            const isActive = activeStep === index;
            const isLast = index === ARCHITECTURE_FLOW.length - 1;

            return (
              <React.Fragment key={node.label}>
                <motion.div
                  initial={
                    isMobile
                      ? {
                          opacity: 0,
                          y: 35,
                          scale: 0.96,
                        }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isActive ? 1.015 : 1,
                  }}
                  transition={{
                    duration: isMobile ? 0.9 : 0.35,
                    delay: isMobile ? index * 0.16 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileTap={isMobile ? { scale: 0.985 } : undefined}
                  onClick={() => setActiveStep(index)}
                  className={`w-full cursor-pointer rounded-[16px] border px-4 py-3 transition-all duration-300 sm:px-5 ${
                    isActive
                      ? isLast
                        ? "border-[#C6A660] bg-[#1C1A14] shadow-[0_0_20px_rgba(198,166,96,0.35)] ring-1 ring-[#C6A660]/40"
                        : "border-[#34D399] bg-[#0E4D3A] shadow-[0_0_20px_rgba(52,211,153,0.35)] ring-1 ring-[#34D399]/40"
                      : isLast
                        ? "border-[#C6A660]/40 bg-white/[0.04] hover:border-[#C6A660]/70 hover:bg-white/[0.07]"
                        : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:flex sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-mono font-bold transition-all duration-300 ${
                          isActive
                            ? isLast
                              ? "bg-[#C6A660] text-black shadow-xs"
                              : "bg-[#34D399] text-black shadow-xs"
                            : "bg-white/15 text-white/80"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <span
                        className={`min-w-0 truncate font-display text-xs font-semibold tracking-wider transition-colors sm:text-sm ${
                          isActive ? "font-bold text-white" : "text-white/90"
                        }`}
                      >
                        {node.label}
                      </span>
                    </div>

                    <span
                      className={`min-w-0 text-right text-[9px] font-medium leading-tight transition-colors sm:text-xs sm:leading-normal ${
                        isActive
                          ? isLast
                            ? "font-semibold text-[#E5D7B7]"
                            : "font-semibold text-white"
                          : "text-white/60"
                      }`}
                    >
                      {node.desc}
                    </span>
                  </div>
                </motion.div>

                {index < ARCHITECTURE_FLOW.length - 1 && (
                  <div className="flex w-full items-center justify-center py-1.5">
                    <motion.div
                      animate={
                        activeStep === index
                          ? {
                              y: [0, 3, 0],
                              opacity: [0.7, 1, 0.7],
                              scale: [1, 1.15, 1],
                            }
                          : {
                              y: 0,
                              opacity: 0.35,
                              scale: 1,
                            }
                      }
                      transition={{
                        repeat: activeStep === index ? Infinity : 0,
                        duration: 1.2,
                        ease: "easeInOut",
                      }}
                      className={`transition-colors duration-300 ${
                        activeStep === index
                          ? "text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                          : "text-white/40"
                      }`}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/12 pt-4">
        <div className="min-w-0">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#C6A660] sm:text-[11px]">
            The Resolution
          </p>

          <p className="text-xs font-medium text-white/95 drop-shadow-sm sm:text-sm">
            That's where DARSHAI begins.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.("programs")}
          className="ml-3 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:border-[#34D399]/50 hover:bg-white/20 active:scale-95"
        >
          <span>Explore</span>
          <Sparkles className="h-3 w-3 text-[#34D399]" />
        </button>
      </div>
    </div>
  );
}

export default WhyDarshaiProblemSolutionCard;