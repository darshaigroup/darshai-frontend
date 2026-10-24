import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Target,
  Clock,
  HeartPulse,
  CreditCard,
  Plane,
  Compass,
  Sliders,
  ShieldCheck,
  Award,
  Cpu,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const ASSESSMENT_FACTORS = [
  { id: "goals", num: "01", label: "Wellness Goals", icon: Target },
  { id: "duration", num: "02", label: "Duration", icon: Clock },
  { id: "lifestyle", num: "03", label: "Lifestyle", icon: HeartPulse },
  { id: "budget", num: "04", label: "Budget", icon: CreditCard },
  { id: "travel", num: "05", label: "Travel Preferences", icon: Plane },
  {
    id: "environment",
    num: "06",
    label: "Environment Preferences",
    icon: Compass,
  },
  {
    id: "programme",
    num: "07",
    label: "Programme Requirements",
    icon: Sliders,
  },
  {
    id: "review",
    num: "08",
    label: "Professional Review Where Required",
    icon: ShieldCheck,
  },
  {
    id: "health",
    num: "09",
    label: "Relevant Health Requirements",
    icon: Award,
  },
];
export function AIMatchingScrollStorySection({ onScrollToForm }) {
  const sectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // =========================================================================
  // SLOW PROGRESSIVE SCROLL CHOREOGRAPHY (340vh Track)
  // Generously spaced animation ranges for silky, slow appearance of all cards:
  // 0.00–0.12: Headline & context settle
  // 0.06–0.18: "What exists?" directory paradigm card slowly appears
  // 0.08–0.52: 9 Assessment Factors slowly appear one by one with glide & settle
  // 0.34–0.52: Red strike-through line slowly crosses over "What exists?"
  // 0.45–0.65: Connecting lines fill & Central Matching Hub slowly illuminates
  // 0.54–0.68: Transformed dominant question ("What may fit me?") slowly reveals
  // 0.64–0.90: Personalized Journey Output cards slowly and sequentially appear
  // 0.84–0.92: CTA button slowly glides into position
  // 0.88–1.00: Full Convergence Plateau — ALL card content is completely displayed,
  //            vivid, and luminous until the next section displays!
  // =========================================================================
  // Scene 1: Header 0–5%
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.05],
    prefersReducedMotion ? [1, 1] : [0.5, 1],
  );
  const headerY = useTransform(
    scrollYProgress,
    [0.0, 0.05],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  // Scene 2: Directory Paradigm Question ("What exists?")
  const oldQuestionOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.08],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const oldQuestionY = useTransform(
    scrollYProgress,
    [0.02, 0.08],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  // Strike-through red line animation over "What wellness centres exist?" (10%–25% scroll)
  const strikeThroughScaleX = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  // Scene 3: Nine Assessment Factors Appear Across 0.05 -> 0.25
  const f1Opacity = useTransform(
    scrollYProgress,
    [0.05, 0.12],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f1Y = useTransform(
    scrollYProgress,
    [0.05, 0.12],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f2Opacity = useTransform(
    scrollYProgress,
    [0.07, 0.14],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f2Y = useTransform(
    scrollYProgress,
    [0.07, 0.14],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f3Opacity = useTransform(
    scrollYProgress,
    [0.09, 0.16],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f3Y = useTransform(
    scrollYProgress,
    [0.09, 0.16],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f4Opacity = useTransform(
    scrollYProgress,
    [0.11, 0.18],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f4Y = useTransform(
    scrollYProgress,
    [0.11, 0.18],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f5Opacity = useTransform(
    scrollYProgress,
    [0.13, 0.2],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f5Y = useTransform(
    scrollYProgress,
    [0.13, 0.2],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f6Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.22],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f6Y = useTransform(
    scrollYProgress,
    [0.15, 0.22],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f7Opacity = useTransform(
    scrollYProgress,
    [0.17, 0.24],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f7Y = useTransform(
    scrollYProgress,
    [0.17, 0.24],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f8Opacity = useTransform(
    scrollYProgress,
    [0.19, 0.26],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f8Y = useTransform(
    scrollYProgress,
    [0.19, 0.26],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const f9Opacity = useTransform(
    scrollYProgress,
    [0.21, 0.28],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const f9Y = useTransform(
    scrollYProgress,
    [0.21, 0.28],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const factorTransforms = [
    { opacity: f1Opacity, y: f1Y },
    { opacity: f2Opacity, y: f2Y },
    { opacity: f3Opacity, y: f3Y },
    { opacity: f4Opacity, y: f4Y },
    { opacity: f5Opacity, y: f5Y },
    { opacity: f6Opacity, y: f6Y },
    { opacity: f7Opacity, y: f7Y },
    { opacity: f8Opacity, y: f8Y },
    { opacity: f9Opacity, y: f9Y },
  ];
  // Scene 4: Connecting lines / Central Matching Logic Hub (0.20–0.32)
  const connectingLinesScaleX = useTransform(
    scrollYProgress,
    [0.2, 0.32],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const centerEngineOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.34],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const centerEngineY = useTransform(
    scrollYProgress,
    [0.22, 0.34],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const centerEngineScale = useTransform(
    scrollYProgress,
    [0.22, 0.34],
    prefersReducedMotion ? [1, 1] : [0.95, 1],
  );
  // Scene 5: Transformed Question ("What may fit me?") (0.25–0.36)
  const newQuestionOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.36],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const newQuestionY = useTransform(
    scrollYProgress,
    [0.25, 0.36],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const newQuestionScale = useTransform(
    scrollYProgress,
    [0.25, 0.36],
    prefersReducedMotion ? [1, 1] : [0.95, 1],
  );
  // Scene 6: Personalized Journey Output Cards (0.28–0.42)
  const journeyOutputOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.38],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const journeyOutputY = useTransform(
    scrollYProgress,
    [0.28, 0.38],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  // Output cards sequential rise completing by 0.42
  const out1Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.38],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const out1Y = useTransform(
    scrollYProgress,
    [0.3, 0.38],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const out2Opacity = useTransform(
    scrollYProgress,
    [0.32, 0.4],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const out2Y = useTransform(
    scrollYProgress,
    [0.32, 0.4],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const out3Opacity = useTransform(
    scrollYProgress,
    [0.34, 0.42],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const out3Y = useTransform(
    scrollYProgress,
    [0.34, 0.42],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  const out4Opacity = useTransform(
    scrollYProgress,
    [0.36, 0.44],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const out4Y = useTransform(
    scrollYProgress,
    [0.36, 0.44],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  // CTA Button fully visible by 0.45
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.38, 0.45],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const ctaY = useTransform(
    scrollYProgress,
    [0.38, 0.45],
    prefersReducedMotion ? [0, 0] : [10, 0],
  );
  // Stage tracking label for bottom status bar & mobile tab sync
  const [currentStepName, setCurrentStepName] = useState(
    "01 The Match Problem",
  );
  const [activeMobileTab, setActiveMobileTab] = useState("inputs");
  const [userToggledTab, setUserToggledTab] = useState(false);
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.1) {
        setCurrentStepName("01 The Match Problem");
        if (!userToggledTab) setActiveMobileTab("inputs");
      } else if (latest < 0.22) {
        setCurrentStepName("02 Assessment Inputs (09)");
        if (!userToggledTab) setActiveMobileTab("inputs");
      } else if (latest < 0.3) {
        setCurrentStepName("03 Matching Intelligence");
        if (!userToggledTab) setActiveMobileTab("inputs");
      } else if (latest < 0.38) {
        setCurrentStepName("04 Filtering & Fit");
        if (!userToggledTab) setActiveMobileTab("transformation");
      } else if (latest < 0.45) {
        setCurrentStepName("05 Personalized Journey Output");
        if (!userToggledTab) setActiveMobileTab("transformation");
      } else {
        setCurrentStepName("06 Verified Fit Complete");
        if (!userToggledTab) setActiveMobileTab("transformation");
      }
    });
  }, [scrollYProgress, userToggledTab]);
  return (
    <section
      ref={sectionRef}
      id="ai-matching"
      className="relative bg-[#18181A] text-white border-b border-white/10 h-[340vh]"
    >
      <div className="sticky top-0 min-h-screen lg:h-screen w-full flex flex-col justify-center overflow-y-auto lg:overflow-hidden bg-[#18181A] z-10 px-3.5 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-5">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0E4D3A]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="w-full max-w-[1640px] mx-auto flex flex-col min-h-0 relative z-10">
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="mb-3 sm:mb-4 shrink-0 max-w-5xl"
          >
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#C6A660] uppercase mb-1.5 sm:mb-2">
              AI-POWERED WELLNESS MATCHING
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-2 sm:mb-3 leading-[1.12]">
              Intelligence Behind the Match.
            </h2>
            <div className="space-y-1 sm:space-y-1.5 text-sm sm:text-base lg:text-lg leading-relaxed">
              <p className="text-white font-bold">
                Finding a wellness centre is easy. Finding the right one is
                harder.
              </p>
              <p className="text-white/85 font-medium">
                DARSHAI uses structured assessment and matching logic to
                identify relevant wellness journeys.
              </p>
            </div>
          </motion.div>
          <div className="w-full rounded-[20px] sm:rounded-[28px] border border-white/10 bg-[#232326] shadow-2xl overflow-hidden relative flex flex-col md:grid md:grid-cols-12 md:divide-x divide-white/10">
            <div className="flex md:hidden items-center justify-between gap-1.5 p-1.5 sm:p-2 bg-black/60 border-b border-white/10 z-20 shrink-0 text-xs sm:text-sm font-mono">
              <button
                type="button"
                onClick={() => {
                  setUserToggledTab(true);
                  setActiveMobileTab("inputs");
                }}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer truncate flex items-center justify-center gap-2 ${
                  activeMobileTab === "inputs"
                    ? "bg-[#0E4D3A] text-white shadow-xs"
                    : "text-white/75 hover:text-white bg-white/5"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C6A660]" />
                <span>1. Inputs (09)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserToggledTab(true);
                  setActiveMobileTab("transformation");
                }}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer truncate flex items-center justify-center gap-2 ${
                  activeMobileTab === "transformation"
                    ? "bg-[#C6A660] text-black shadow-xs font-bold"
                    : "text-white/75 hover:text-white bg-white/5"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>2. Transformation & Fit</span>
              </button>
            </div>
            <div
              className={`md:col-span-7 p-3.5 sm:p-5 lg:p-6 flex-col justify-start gap-3 sm:gap-4 bg-[#232326] min-h-0 max-h-[64vh] sm:max-h-[68vh] md:max-h-none overflow-y-auto md:overflow-visible ${activeMobileTab === "inputs" ? "flex" : "hidden md:flex"}`}
            >
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/10 border border-white/15 text-[#C6A660]">
                    <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                    <span>Structured Assessment Inputs</span>
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-white/75 font-semibold">
                    09 Parameters
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {ASSESSMENT_FACTORS.map((factor, idx) => {
                    const Icon = factor.icon;
                    const { opacity, y } = factorTransforms[idx];
                    return (
                      <motion.div
                        style={{ opacity, y }}
                        className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl border flex items-center gap-2 sm:gap-3 transition-all duration-300 ${
                          idx === 8
                            ? "col-span-2 bg-gradient-to-r from-white/10 to-[#0E4D3A]/40 border-[#0E4D3A]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                        key={factor.id}
                      >
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-[#C6A660]">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                        </span>
                        <div className="min-w-0 flex-1 flex items-center justify-between gap-1 sm:gap-2">
                          <span className="text-xs sm:text-xs lg:text-[13px] font-bold text-white tracking-wide uppercase truncate">
                            {factor.label}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono text-[#C6A660] font-bold px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                            {factor.num}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="pt-2 sm:pt-3 border-t border-white/10">
                <div className="relative mb-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      style={{ scaleX: connectingLinesScaleX }}
                      className="h-full bg-gradient-to-r from-[#C6A660] via-[#34D399] to-[#0E4D3A] origin-left"
                    />
                  </div>
                </div>
                <motion.div
                  style={{
                    opacity: centerEngineOpacity,
                    y: centerEngineY,
                    scale: centerEngineScale,
                  }}
                  className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#0E4D3A]/80 via-[#0A382A] to-[#0E4D3A]/80 border border-[#34D399]/40 text-white flex items-center justify-between gap-2 sm:gap-3 shadow-lg"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-[#C6A660] shrink-0 shadow-xs">
                      <Cpu className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-[#34D399]" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold tracking-widest text-[#C6A660] uppercase">
                        DARSHAI
                      </p>
                      <p className="font-display text-xs sm:text-base font-bold text-white tracking-tight">
                        Matching Intelligence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#34D399] bg-[#0E4D3A] px-2.5 py-1 rounded-full border border-[#34D399]/40 shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>Inputs Converged</span>
                  </div>
                </motion.div>
              </div>
            </div>
            <div
              className={`md:col-span-5 p-3.5 sm:p-5 lg:p-6 flex-col justify-start gap-3 sm:gap-4 bg-[#1D1D20] min-h-0 relative max-h-[64vh] sm:max-h-[68vh] md:max-h-none overflow-y-auto md:overflow-visible ${activeMobileTab === "transformation" ? "flex" : "hidden md:flex"}`}
            >
              <div className="flex flex-col gap-3">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0E4D3A]/20 text-[#34D399] border border-[#0E4D3A]">
                    <span>Transformation Engine</span>
                  </div>
                  <motion.div
                    style={{
                      opacity: oldQuestionOpacity,
                      y: oldQuestionY,
                    }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-3.5 text-center relative overflow-hidden"
                  >
                    <p className="text-xs font-mono font-bold text-white/70 uppercase tracking-widest mb-0.5">
                      WHAT EXISTS (DIRECTORY PARADIGM)
                    </p>
                    <span className="relative inline-block text-white/80 text-sm sm:text-base font-serif italic tracking-wide">
                      “What wellness centres exist?”
                      <motion.span
                        style={{ scaleX: strikeThroughScaleX }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] sm:h-[2.5px] w-full bg-[#EF4444] rounded-full origin-left pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                        aria-hidden="true"
                      />
                    </span>
                  </motion.div>
                  <motion.div
                    style={{
                      opacity: newQuestionOpacity,
                      y: newQuestionY,
                      scale: newQuestionScale,
                    }}
                    className="bg-gradient-to-r from-[#0E4D3A]/50 via-[#0A382A] to-[#0E4D3A]/50 border-2 border-[#34D399] rounded-2xl p-3.5 sm:p-4 text-center shadow-[0_0_30px_rgba(52,211,153,0.25)] relative overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                      <p className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-widest">
                        FILTERED & RELEVANT
                      </p>
                    </div>
                    <span className="text-white text-lg sm:text-xl font-serif font-bold italic tracking-wide">
                      “What may fit me?”
                    </span>
                  </motion.div>
                </div>
                <motion.div
                  style={{
                    opacity: journeyOutputOpacity,
                    y: journeyOutputY,
                  }}
                  className="py-1 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-[#C6A660] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>PERSONALIZED JOURNEY</span>
                    </span>
                    <span className="text-white/80">Verified Fit</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div
                      style={{ opacity: out1Opacity, y: out1Y }}
                      className="bg-white/10 rounded-xl p-2.5 sm:p-3 border border-white/15"
                    >
                      <p className="text-xs font-mono text-[#C6A660] uppercase font-bold tracking-wider">
                        PROGRAMME
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                        Executive Reset
                      </p>
                    </motion.div>
                    <motion.div
                      style={{ opacity: out2Opacity, y: out2Y }}
                      className="bg-white/10 rounded-xl p-2.5 sm:p-3 border border-white/15"
                    >
                      <p className="text-xs font-mono text-[#C6A660] uppercase font-bold tracking-wider">
                        ENVIRONMENT
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                        Coastal Environment
                      </p>
                    </motion.div>
                    <motion.div
                      style={{ opacity: out3Opacity, y: out3Y }}
                      className="bg-white/10 rounded-xl p-2.5 sm:p-3 border border-white/15"
                    >
                      <p className="text-xs font-mono text-[#C6A660] uppercase font-bold tracking-wider">
                        DURATION
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                        14 Days
                      </p>
                    </motion.div>
                    <motion.div
                      style={{ opacity: out4Opacity, y: out4Y }}
                      className="bg-white/10 rounded-xl p-2.5 sm:p-3 border border-white/15"
                    >
                      <p className="text-xs font-mono text-[#C6A660] uppercase font-bold tracking-wider">
                        WELLNESS CENTRE
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                        Selected Partner
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                style={{ opacity: ctaOpacity, y: ctaY }}
                className="pt-2.5 border-t border-white/10 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => {
                    track("begin_journey", {
                      source: "international_ai_matching",
                    });
                    onScrollToForm();
                  }}
                  className="w-full bg-[#0E4D3A] hover:bg-[#0A3B2C] text-white font-bold tracking-wider uppercase text-xs sm:text-sm py-3 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#34D399]/30 hover:border-[#34D399]"
                >
                  <span>SEE HOW THE MATCH WORKS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-mono text-white/70 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span className="font-bold uppercase tracking-wider text-white">
                {currentStepName}
              </span>
            </div>
            <span className="hidden sm:inline text-white/75 font-medium">
              Scroll to witness multidimensional matching logic assembly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AIMatchingScrollStorySection;
