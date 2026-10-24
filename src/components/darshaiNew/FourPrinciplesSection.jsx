import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Compass, Award, Users, Activity } from "lucide-react";
import SignalBadge from "./SignalBadge";

const PRINCIPLES = [
  {
    id: "personalized",
    num: "01",
    title: "PERSONALIZED",
    tag: "Individual Baseline",
    desc: "Every journey begins with understanding you.",
    highlight:
      "Comprehensive health assessment and personal lifestyle alignment.",
    icon: Compass,
  },
  {
    id: "curated",
    num: "02",
    title: "CURATED",
    tag: "Institutional Quality",
    desc: "Carefully selected wellness partners and programmes.",
    highlight:
      "Verified clinical standards, authentic Ayurveda, and master practitioners.",
    icon: Award,
  },
  {
    id: "guided",
    num: "03",
    title: "GUIDED",
    tag: "Human Stewardship",
    desc: "Human support throughout the journey.",
    highlight:
      "Dedicated travel coordinators and wellness advisors from arrival to departure.",
    icon: Users,
  },
  {
    id: "continuous",
    num: "04",
    title: "CONTINUOUS",
    tag: "Longevity Trajectory",
    desc: "Post-program follow-up and wellness continuity.",
    highlight:
      "Structured integration protocols and sustained health recalibration.",
    icon: Activity,
  },
];

export function FourPrinciplesSection() {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  /*
   * Header / upper bar animation.
   * The header now moves together with the section's scroll progress.
   * Desktop and tablet retain the original visual design.
   */
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.14],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );

  const headerY = useTransform(
    scrollYProgress,
    [0.02, 0.14],
    prefersReducedMotion ? [0, 0] : [28, 0],
  );

  const headerScale = useTransform(
    scrollYProgress,
    [0.02, 0.14],
    prefersReducedMotion ? [1, 1] : [0.97, 1],
  );

  /*
   * Card entrance animation.
   * Kept the same scroll-linked behaviour as the existing implementation.
   */
  const c1Opacity = useTransform(
    scrollYProgress,
    [0.05, 0.18],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );

  const c1Y = useTransform(
    scrollYProgress,
    [0.05, 0.18],
    prefersReducedMotion ? [0, 0] : [24, 0],
  );

  const c2Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.24],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );

  const c2Y = useTransform(
    scrollYProgress,
    [0.12, 0.24],
    prefersReducedMotion ? [0, 0] : [24, 0],
  );

  const c3Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.3],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );

  const c3Y = useTransform(
    scrollYProgress,
    [0.18, 0.3],
    prefersReducedMotion ? [0, 0] : [24, 0],
  );

  const c4Opacity = useTransform(
    scrollYProgress,
    [0.24, 0.35],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );

  const c4Y = useTransform(
    scrollYProgress,
    [0.24, 0.35],
    prefersReducedMotion ? [0, 0] : [24, 0],
  );

  const cardEntrances = [
    { opacity: c1Opacity, y: c1Y },
    { opacity: c2Opacity, y: c2Y },
    { opacity: c3Opacity, y: c3Y },
    { opacity: c4Opacity, y: c4Y },
  ];

  /*
   * Scroll-linked active card.
   */
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.45) {
        setActiveScrollIndex(0);
      } else if (latest < 0.6) {
        setActiveScrollIndex(1);
      } else if (latest < 0.75) {
        setActiveScrollIndex(2);
      } else {
        setActiveScrollIndex(3);
      }
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      id="four-principles"
      className="py-20 sm:py-24 lg:py-28 bg-white border-b border-[#D2D2D7]/80 relative overflow-hidden"
    >
      <div className="darshai-container text-left">
        {/* Upper section bar moves with scroll animation */}
        <motion.div
          style={{
            opacity: headerOpacity,
            y: headerY,
            scale: headerScale,
          }}
          className="mb-12 sm:mb-16 max-w-3xl origin-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] border border-[#0E4D3A]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
            <span>FOUR PRINCIPLES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#111111] leading-[1.08] tracking-tight mb-4">
            The Foundation of Every International Journey.
          </h2>

          <p className="text-base sm:text-lg text-[#6E6E73] font-medium leading-relaxed">
            Four guiding commitments that distinguish DARSHAI from standard
            travel aggregators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            const { opacity, y } = cardEntrances[idx];

            const isEmphasized =
              hoveredCard !== null
                ? hoveredCard === idx
                : activeScrollIndex === idx;

            return (
              <motion.div
                key={principle.id}
                style={{ opacity, y }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-[24px] p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between cursor-pointer border ${
                  isEmphasized
                    ? "bg-[#F5F5F7] border-[#0E4D3A] shadow-[0_16px_36px_-6px_rgba(14,77,58,0.18)] -translate-y-1.5"
                    : "bg-[#FAFAFC] border-[#D2D2D7]/80 hover:border-[#0E4D3A]/40 hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div
                  className={`absolute top-0 inset-x-6 h-[2px] rounded-full bg-[#0E4D3A] transition-opacity duration-500 ${
                    isEmphasized
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-40"
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    {/* Number removed — title remains */}
                    <SignalBadge
                      variant={isEmphasized ? "dark" : "light"}
                      dot
                    >
                      {principle.title}
                    </SignalBadge>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isEmphasized
                          ? "bg-[#0E4D3A] text-white shadow-xs scale-105"
                          : "bg-[#0E4D3A]/10 text-[#0E4D3A] group-hover:bg-[#0E4D3A]/20"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] leading-snug tracking-tight mb-2.5">
                    {principle.desc}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6E6E73] font-normal leading-relaxed">
                    {principle.highlight}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D2D2D7]/60 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={`transition-colors ${
                      isEmphasized
                        ? "text-[#0E4D3A] font-bold"
                        : "text-[#86868B]"
                    }`}
                  >
                    {principle.tag}
                  </span>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isEmphasized
                        ? "bg-[#0E4D3A] text-white scale-110"
                        : "bg-[#E5E5EA] text-[#86868B]"
                    }`}
                  >
                    ✓
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FourPrinciplesSection;