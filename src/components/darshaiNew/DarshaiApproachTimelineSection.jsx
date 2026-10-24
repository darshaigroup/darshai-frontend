import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function DarshaiApproachTimelineSection({
  id = "darshai-approach-timeline",
  eyebrow = "THE DARSHAI APPROACH",
  headline = "Selected Through Understanding. Not Guesswork.",
  supportingLine = "Your goals, context and suitability guide the journey we recommend.",
  stages = [
    {
      num: "01",
      title: "Understand You",
      description: "Your goals, preferences and wellness context.",
    },
    {
      num: "02",
      title: "Review Suitability",
      description:
        "Relevant assessment and professional review where appropriate.",
    },
    {
      num: "03",
      title: "Match the Journey",
      description:
        "Duration, environment, programme requirements and partner-centre capability.",
    },
    {
      num: "04",
      title: "Plan Together",
      description: "A personalised recommendation and clear proposal.",
    },
    {
      num: "05",
      title: "Coordinate Your Journey",
      description:
        "Centre coordination, preparation, agreed support and follow-up.",
    },
  ],
}) {
  const [sectionEl, setSectionEl] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const sectionRef = useCallback((node) => {
    if (node !== null) setSectionEl(node);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll(
    sectionEl
      ? {
          target: { current: sectionEl },
          offset: ["start start", "end end"],
        }
      : {
          offset: ["start start", "end end"],
        },
  );

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const total = stages.length;
      const stepSize = 1 / total;
      const index = Math.min(Math.floor(latest / stepSize), total - 1);

      setActiveStageIndex(Math.max(0, index));
    });
  }, [scrollYProgress, stages.length]);

  const progressLine = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    ["0%", "100%"],
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative bg-[#F5F5F7] border-y border-[#D2D2D7] h-[340vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#F5F5F7] z-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="max-w-[1500px] mx-auto w-full flex flex-col justify-between h-full max-h-[92vh]">
          {/* HEADER */}
          <div className="max-w-4xl shrink-0 pt-2 sm:pt-4 mb-6 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#0E4D3A] uppercase mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              {eyebrow}
            </p>

            <h2 className="text-[46px] sm:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-tight mb-4 sm:mb-5">
              <span className="text-[#1D1D1F]">
                Selected Through Understanding.
              </span>{" "}
              <span className="text-[#0E4D3A]">Not Guesswork.</span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#2C2C2E] font-medium leading-relaxed max-w-3xl">
              {supportingLine}
            </p>
          </div>

          {/* TIMELINE */}
          <div className="relative my-auto w-full py-8 sm:py-12">
            {/* DESKTOP HORIZONTAL TIMELINE */}
            <div className="hidden lg:block absolute left-[10%] right-[10%] top-[32px] h-[3px] bg-[#D2D2D7] rounded-full z-0" />

            <div className="hidden lg:block absolute left-[10%] right-[10%] top-[32px] h-[3px] overflow-hidden rounded-full z-0 pointer-events-none">
              <motion.div
                className="h-full bg-[#0E4D3A] rounded-full shadow-[0_0_16px_#0E4D3A]"
                style={{ width: progressLine }}
              />
            </div>

            {/* MOBILE / TABLET VERTICAL TIMELINE */}
            <div className="lg:hidden absolute left-[21px] sm:left-[31px] top-[22px] sm:top-[32px] bottom-[22px] sm:bottom-[32px] w-[3px] bg-[#D2D2D7] rounded-full z-0" />

            <div className="lg:hidden absolute left-[21px] sm:left-[31px] top-[22px] sm:top-[32px] bottom-[22px] sm:bottom-[32px] w-[3px] overflow-hidden rounded-full z-0 pointer-events-none">
              <motion.div
                className="w-full bg-[#0E4D3A] rounded-full shadow-[0_0_16px_#0E4D3A]"
                style={{ height: progressLine }}
              />
            </div>

            {/* STAGES */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {stages.map((stage, index) => {
                const isActive = activeStageIndex === index;
                const isPassed = activeStageIndex >= index;

                return (
                  <motion.div
                    key={stage.num}
                    onClick={() => setActiveStageIndex(index)}
                    className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-5 cursor-pointer group"
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -3 }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                  >
                    {/* MOBILE CONNECTOR */}
                    {index < stages.length - 1 && (
                      <div className="lg:hidden absolute left-[21px] sm:left-[31px] top-[44px] sm:top-[64px] bottom-[-32px] w-[3px] pointer-events-none" />
                    )}

                    {/* NUMBER CIRCLE */}
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: isActive ? 1.1 : 1,
                            }
                      }
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative w-11 h-11 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-mono font-bold shrink-0 z-20 transition-all duration-500 ${
                        isActive
                          ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-lg shadow-[#0E4D3A]/35 ring-4 ring-[#0E4D3A]/20"
                          : isPassed
                            ? "bg-[#E5EFEC] text-[#0E4D3A] border-[#0E4D3A]/40"
                            : "bg-white text-[#86868B] border-[#D2D2D7] group-hover:border-[#0E4D3A]/50 group-hover:text-[#0E4D3A]"
                      }`}
                    >
                      {stage.num}
                    </motion.div>

                    {/* STAGE CONTENT */}
                    <div className="flex flex-col justify-start pt-0.5 sm:pt-1 lg:pt-0 lg:text-center lg:max-w-[230px]">
                      <span
                        className={`text-[11px] sm:text-xs font-mono tracking-widest uppercase font-bold mb-1.5 transition-colors duration-300 ${
                          isActive
                            ? "text-[#0E4D3A]"
                            : isPassed
                              ? "text-[#111111]"
                              : "text-[#86868B]"
                        }`}
                      >
                        STAGE {stage.num}
                      </span>

                      <h3
                        className={`text-lg sm:text-xl lg:text-[22px] font-semibold tracking-tight mb-2 leading-snug transition-colors duration-300 ${
                          isActive
                            ? "text-[#0E4D3A]"
                            : "text-[#111111] group-hover:text-[#0E4D3A]"
                        }`}
                      >
                        {stage.title}
                      </h3>

                      <p className="text-[15px] sm:text-base text-[#2C2C2E] font-medium leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          {/* <div className="shrink-0 pb-3 sm:pb-6 border-t border-[#D2D2D7] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm font-mono text-[#2C2C2E] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0E4D3A] animate-pulse" />
              <span>Slow scroll to navigate through stages 01 → 05</span>
            </div>

            <div className="font-bold text-[#0E4D3A]">
              Stage {stages[activeStageIndex]?.num || "01"}:{" "}
              {stages[activeStageIndex]?.title}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default DarshaiApproachTimelineSection;