import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Compass, Award, Users, Activity, Sparkles } from "lucide-react";
import { SignalBadge } from "./SignalBadge";
const FOUR_PRINCIPLES = [
  {
    id: "personalized",
    num: "01",
    title: "PERSONALIZED",
    desc: "Every journey begins with understanding you.",
    icon: Compass,
  },
  {
    id: "curated",
    num: "02",
    title: "CURATED",
    desc: "Carefully selected wellness partners and programmes.",
    icon: Award,
  },
  {
    id: "guided",
    num: "03",
    title: "GUIDED",
    desc: "Human support throughout the journey.",
    icon: Users,
  },
  {
    id: "continuous",
    num: "04",
    title: "CONTINUOUS",
    desc: "post-program follow-up and wellness continuity.",
    icon: Activity,
  },
];
export function FourPrinciplesInternationalSection() {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  // Track scroll across the pinned 260vh track for slow progressive reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Slow horizontal reveal timeline across desktop and tablet views
  // All cards reveal by 0.65 and stay fully visible until the section ends (1.0).
  const card1Opacity = useTransform(
    scrollYProgress,
    [0.02, 0.15, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const card1Y = useTransform(
    scrollYProgress,
    [0.02, 0.15, 1],
    prefersReducedMotion ? [0, 0, 0] : [24, 0, 0],
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0.02, 0.15, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.96, 1, 1],
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.32, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const card2Y = useTransform(
    scrollYProgress,
    [0.18, 0.32, 1],
    prefersReducedMotion ? [0, 0, 0] : [24, 0, 0],
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0.18, 0.32, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.96, 1, 1],
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.48, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const card3Y = useTransform(
    scrollYProgress,
    [0.35, 0.48, 1],
    prefersReducedMotion ? [0, 0, 0] : [24, 0, 0],
  );
  const card3Scale = useTransform(
    scrollYProgress,
    [0.35, 0.48, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.96, 1, 1],
  );
  const card4Opacity = useTransform(
    scrollYProgress,
    [0.52, 0.65, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const card4Y = useTransform(
    scrollYProgress,
    [0.52, 0.65, 1],
    prefersReducedMotion ? [0, 0, 0] : [24, 0, 0],
  );
  const card4Scale = useTransform(
    scrollYProgress,
    [0.52, 0.65, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.96, 1, 1],
  );
  const cardMotionStates = [
    { opacity: card1Opacity, y: card1Y, scale: card1Scale },
    { opacity: card2Opacity, y: card2Y, scale: card2Scale },
    { opacity: card3Opacity, y: card3Y, scale: card3Scale },
    { opacity: card4Opacity, y: card4Y, scale: card4Scale },
  ];
  // Synchronize active card highlight based on current scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.18) {
        setActiveCardIndex(0);
      } else if (latest < 0.35) {
        setActiveCardIndex(1);
      } else if (latest < 0.52) {
        setActiveCardIndex(2);
      } else {
        setActiveCardIndex(3);
      }
    });
  }, [scrollYProgress]);
  return (
    <section
      ref={containerRef}
      id="four-principles"
      className="relative bg-white border-b border-[#D2D2D7]/80 md:h-[140vh]"
    >
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-center overflow-hidden bg-white z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0E4D3A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A660]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="darshai-container text-left relative z-10 w-full max-w-[1540px] mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] border border-[#0E4D3A]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FOUR PRINCIPLES</span>
            </div>
            <h2 className="typography-section-h2 font-bold text-[#111111] tracking-tight leading-tight mb-2">
              The Foundation of Every International Journey.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left items-stretch">
            {FOUR_PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon;
              const { opacity, y, scale } = cardMotionStates[idx];
              const isEmphasized = activeCardIndex === idx;
              return (
                <motion.div
                  style={{ opacity, y, scale }}
                  className={`rounded-[24px] p-6 sm:p-7 md:p-8 border flex flex-col justify-between transition-all duration-500 relative group overflow-hidden min-h-[220px] sm:min-h-[240px] md:min-h-[260px] ${
                    isEmphasized
                      ? "bg-[#F9FBF9] border-[#0E4D3A] shadow-[0_14px_36px_-8px_rgba(14,77,58,0.20)] ring-1 ring-[#0E4D3A]/25 -translate-y-1"
                      : "bg-[#F5F5F7] border-[#D2D2D7] shadow-xs hover:border-[#0E4D3A]/50 hover:bg-white"
                  }`}
                  key={principle.id}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 ${
                      isEmphasized
                        ? "bg-gradient-to-r from-[#0E4D3A] via-[#C6A660] to-[#0E4D3A] opacity-100"
                        : "bg-[#0E4D3A]/25 opacity-30 group-hover:opacity-100"
                    }`}
                  />
                  <div>
                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                      <SignalBadge
                        variant={isEmphasized ? "dark" : "light"}
                        dot
                      >
                        {principle.title}
                      </SignalBadge>
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-2xs ${
                          isEmphasized
                            ? "bg-[#0E4D3A] text-white scale-110 shadow-md"
                            : "bg-white border border-[#D2D2D7] text-[#0E4D3A] group-hover:bg-[#0E4D3A] group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
                      </div>
                    </div>
                    <p
                      className={`font-display text-lg sm:text-xl md:text-2xl font-bold leading-[1.3] transition-colors duration-300 ${isEmphasized ? "text-[#0E4D3A]" : "text-[#111111]"}`}
                    >
                      {principle.desc}
                    </p>
                  </div>
                  <div className="pt-5 mt-6 border-t border-[#D2D2D7]/70 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all ${isEmphasized ? "bg-[#0E4D3A] scale-125" : "bg-[#D2D2D7]"}`}
                      />
                      <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#2C2C2E]">
                        Phase {principle.num}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isEmphasized ? "text-[#0E4D3A]" : "text-transparent"}`}
                    >
                      Active
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export default FourPrinciplesInternationalSection;
