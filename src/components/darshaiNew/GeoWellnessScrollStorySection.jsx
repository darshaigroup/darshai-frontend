import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
const SCROLL_STATES = [
  {
    step: "01",
    title: "PERSON",
    pills: ["Goals", "Lifestyle", "Preferences"],
    headline: "Understanding your physiological baseline and recovery needs.",
    body: "",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Person practicing mindfulness in peaceful natural surroundings",
    tag: "INDIVIDUAL BASELINE",
    metadata: "PHYSIOLOGY • GOALS • LIFESTYLE",
  },
  {
    step: "02",
    title: "ENVIRONMENT",
    pills: ["Geography", "Climate", "Setting"],
    headline: "Matching microclimates to biological recovery.",
    body: "",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Pristine Western Ghats bio-climatic sanctuary with mist and lush flora",
    tag: "BIO-CLIMATIC RESONANCE",
    metadata: "COASTAL • FOREST • MOUNTAIN",
  },
  {
    step: "03",
    title: "WELLNESS APPROACH",
    pills: ["Programme", "Practices", "Professional Input"],
    headline: "Clinically verified protocols and authentic traditions.",
    body: "",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Therapeutic Ayurvedic rejuvenation and restorative wellness practice",
    tag: "CLINICAL PROTOCOLS",
    metadata: "AYURVEDA • YOGA • RECOVERY",
  },
  {
    step: "04",
    title: "JOURNEY",
    pills: ["Personalized", "Recommendation", "Guided Experience"],
    headline: "A completely coordinated international wellness journey.",
    body: "",
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&auto=format&fit=crop&q=80",
    imageAlt:
      "Serene Indian wellness sanctuary retreat overlooking peaceful nature",
    tag: "UNIFIED CONVERGENCE",
    metadata: "PERSON + ENVIRONMENT + APPROACH",
  },
];
export function GeoWellnessScrollStorySection() {
  const [sectionEl, setSectionEl] = useState(null);
  const sectionRef = useCallback((node) => {
    if (node !== null) setSectionEl(node);
  }, []);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll(
    sectionEl
      ? { target: { current: sectionEl }, offset: ["start start", "end end"] }
      : { offset: ["start start", "end end"] },
  );
  // Track active state across the 4 scroll ranges (0.00 – 1.00)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) {
        setActiveStateIndex(0);
      } else if (latest < 0.5) {
        setActiveStateIndex(1);
      } else if (latest < 0.75) {
        setActiveStateIndex(2);
      } else {
        setActiveStateIndex(3);
      }
    });
  }, [scrollYProgress]);
  // Subtle restrained image zoom & pan (1.00 → 1.03, translateY -1% → +1%)
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.01, 1.035],
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-1%", "1%"],
  );
  // Thin Progress Line width directly driven by scroll progress
  const progressLineWidth = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    ["0%", "100%"],
  );
  const currentState = SCROLL_STATES[activeStateIndex];
  return (
    <section
      ref={sectionRef}
      id="geo-wellness"
      className="relative bg-[#F5F5F7] border-b border-[#D2D2D7] py-16 sm:py-20 lg:py-0 lg:h-[280vh]"
    >
      <div className="w-full max-w-[1640px] mx-auto flex flex-col min-h-0 lg:sticky lg:top-0 lg:h-screen lg:justify-center lg:overflow-hidden z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-5">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col min-h-0">
          <div className="mb-3 sm:mb-5 shrink-0 max-w-4xl">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#0E4D3A] uppercase mb-1.5 sm:mb-2">
              WHAT IS GEO-WELLNESS?
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.12] tracking-tight mb-2 sm:mb-3">
              Where You Go <span className="text-[#0E4D3A]">Matters.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#2C2C2E] font-medium leading-relaxed max-w-3xl">
              Wellness is not only what you do. The environment around you can
              shape the experience of rest, recovery and reconnection.
            </p>
          </div>
          <div className="w-full rounded-[28px] sm:rounded-[36px] border border-[#D2D2D7] bg-white p-4 sm:p-6 lg:p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            <div className="order-1 lg:order-2 lg:col-span-7 rounded-[20px] sm:rounded-[24px] relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-[#111111] overflow-hidden">
              {SCROLL_STATES.map((state, idx) => {
                const isActive = activeStateIndex === idx;
                return (
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                    key={state.step}
                  >
                    <motion.img
                      style={{ scale: imageScale, y: imageY }}
                      src={state.image}
                      alt={state.imageAlt}
                      className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.04]"
                    />
                  </motion.div>
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 z-15 pointer-events-none" />
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                  <span>{currentState.tag}</span>
                </div>
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white z-20 space-y-1.5">
                <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#C6A660] font-bold">
                  {currentState.metadata}
                </p>
                <p className="font-display text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
                  {currentState.title} • {currentState.pills.join(" • ")}
                </p>
              </div>
            </div>
            <div className="order-2 lg:order-1 lg:col-span-5 bg-transparent p-2 sm:p-4 flex flex-col justify-between gap-5 z-10 min-h-[340px] lg:min-h-[420px]">
              <div className="flex flex-col gap-3.5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] border border-[#0E4D3A]/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0E4D3A] animate-pulse" />
                    <span>
                      {currentState.step} — {currentState.title}
                    </span>
                  </div>
                </div>
                <div className="py-1">
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
                      className="space-y-3"
                      key={currentState.step}
                    >
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111111] leading-[1.18] tracking-tight">
                        {currentState.headline}
                      </h3>
                      {currentState.body && (
                        <p className="text-lg sm:text-xl text-[#2C2C2E] leading-relaxed font-medium">
                          {currentState.body}
                        </p>
                      )}
                      <div className="pt-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {currentState.pills.map((pill) => (
                            <span
                              className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#C6A660]/15 border border-[#C6A660]/50 text-[#8C6D2B] shadow-2xs"
                              key={pill}
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="pt-3.5 mt-4 border-t border-[#D2D2D7] bg-[#F9F9FB] rounded-2xl p-4 border border-[#D2D2D7]/80">
                <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-[#2C2C2E] uppercase tracking-wider mb-1.5">
                  <span>Geo-Wellness Framework</span>
                  <span className="text-[#0E4D3A]">
                    Step {currentState.step} of 04
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-bold text-[#111111]">
                  <span
                    className={
                      activeStateIndex === 0
                        ? "text-[#0E4D3A] underline underline-offset-4"
                        : "text-[#2C2C2E]/60"
                    }
                  >
                    PERSON
                  </span>
                  <span className="text-[#0E4D3A] font-mono">→</span>
                  <span
                    className={
                      activeStateIndex === 1
                        ? "text-[#0E4D3A] underline underline-offset-4"
                        : "text-[#2C2C2E]/60"
                    }
                  >
                    ENVIRONMENT
                  </span>
                  <span className="text-[#0E4D3A] font-mono">→</span>
                  <span
                    className={
                      activeStateIndex === 2
                        ? "text-[#0E4D3A] underline underline-offset-4"
                        : "text-[#2C2C2E]/60"
                    }
                  >
                    WELLNESS
                  </span>
                  <span className="text-[#0E4D3A] font-mono">→</span>
                  <span
                    className={
                      activeStateIndex === 3
                        ? "text-[#0E4D3A] underline underline-offset-4"
                        : "text-[#2C2C2E]/60"
                    }
                  >
                    JOURNEY
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 sm:pt-4 shrink-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-2">
              {SCROLL_STATES.map((state, idx) => {
                const isActive = activeStateIndex === idx;
                const isPassed = activeStateIndex >= idx;
                return (
                  <div
                    onClick={() => setActiveStateIndex(idx)}
                    className={`cursor-pointer p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-between gap-2 ${
                      isActive
                        ? "bg-white border-[#0E4D3A] shadow-sm ring-1 ring-[#0E4D3A]/30 scale-[1.02]"
                        : isPassed
                          ? "bg-white/80 border-[#D2D2D7] text-[#111111]"
                          : "bg-[#F5F5F7] border-[#E5E5EA] text-[#86868B]"
                    }`}
                    key={state.step}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full font-mono text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#0E4D3A] text-white"
                            : isPassed
                              ? "bg-[#0E4D3A]/15 text-[#0E4D3A]"
                              : "bg-[#E5E5EA] text-[#86868B]"
                        }`}
                      >
                        {state.step}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-bold truncate transition-colors ${isActive ? "text-[#0E4D3A]" : isPassed ? "text-[#111111]" : "text-[#86868B]"}`}
                      >
                        {state.title}
                      </span>
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-all ${isActive ? "bg-[#0E4D3A] scale-125 animate-pulse" : isPassed ? "bg-[#C6A660]" : "bg-[#E5E5EA]"}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="relative h-1 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressLineWidth }}
                className="h-full bg-gradient-to-r from-[#0E4D3A] via-[#C6A660] to-[#0E4D3A] rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#2C2C2E] mt-2 font-medium">
              <span>
                Scroll to transform: Person → Environment → Wellness Approach →
                Journey
              </span>
              <span className="font-bold text-[#0E4D3A]">
                {activeStateIndex === 3
                  ? "Journey Ready ↓"
                  : "State 0" + (activeStateIndex + 1) + " Active"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default GeoWellnessScrollStorySection;
