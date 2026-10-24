import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { User, Compass, HeartHandshake, Sparkles, Check } from "lucide-react";
import { SignalBadge } from "./SignalBadge";
const GEO_STEPS = [
  {
    id: "person",
    num: "01",
    tabLabel: "PERSON",
    title: "PERSON",
    subtitle: "Understanding You First",
    summary:
      "Wellness starts with your physiological baseline, vitality goals, and personal lifestyle rhythm.",
    tags: ["Goals", "Lifestyle", "Preferences"],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=85",
    caption: "PHYSIOLOGICAL BASELINE • VITALITY & STRESS RECOVERY",
    icon: User,
  },
  {
    id: "environment",
    num: "02",
    tabLabel: "ENVIRONMENT",
    title: "ENVIRONMENT",
    subtitle: "The Power of Microclimates",
    summary:
      "Air purity, elevation, coastal breezes, and biophilic resonance profoundly modulate biological recovery.",
    tags: ["Geography", "Climate", "Setting"],
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85",
    caption: "WESTERN GHATS & SOUTHERN COASTAL SANCTUARIES",
    icon: Compass,
  },
  {
    id: "wellness_approach",
    num: "03",
    tabLabel: "WELLNESS",
    title: "WELLNESS APPROACH",
    subtitle: "Clinical & Ancient Wisdom",
    summary:
      "Traditional Ayurveda, restorative Yoga, longevity protocols, and medically supervised detox interventions.",
    tags: ["Programme", "Practices", "Professional Input"],
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&auto=format&fit=crop&q=85",
    caption: "AUTHENTIC AYURVEDA • NABH ACCREDITED CLINICAL PROTOCOLS",
    icon: HeartHandshake,
  },
  {
    id: "journey",
    num: "04",
    tabLabel: "JOURNEY",
    title: "JOURNEY",
    subtitle: "Your Tailored Retreat",
    summary:
      "A seamless, guided itinerary matching the right person with the right healing sanctuary in India.",
    tags: ["Personalized", "Recommendation", "Guided Experience"],
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&auto=format&fit=crop&q=85",
    caption: "END-TO-END COORDINATION • PRECISION MATCHING",
    icon: Sparkles,
  },
];
export function GeoWellnessScrollStory() {
  const sectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
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
  // Track progress line underneath navigation rail
  const progressLineScaleX = useTransform(
    scrollYProgress,
    [0.08, 0.88],
    [0.05, 1.0],
  );
  // Image Crossfade opacities across the 4 states:
  // State 1 (Person): 0.00 -> 0.32
  // State 2 (Environment): 0.28 -> 0.54
  // State 3 (Wellness Approach): 0.50 -> 0.76
  // State 4 (Journey): 0.72 -> 1.00
  const img1Opacity = useTransform(
    scrollYProgress,
    [0.0, 0.28, 0.36],
    [1, 1, 0],
  );
  const img2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.52, 0.6],
    [0, 1, 1, 0],
  );
  const img3Opacity = useTransform(
    scrollYProgress,
    [0.52, 0.6, 0.72, 0.8],
    [0, 1, 1, 0],
  );
  const img4Opacity = useTransform(
    scrollYProgress,
    [0.72, 0.82, 1.0],
    [0, 1, 1],
  );
  const imgOpacities = [img1Opacity, img2Opacity, img3Opacity, img4Opacity];
  // Subtle camera scale (1.00 -> 1.03) without aggressive movement
  const cameraScale = useTransform(
    scrollYProgress,
    [0.0, 1.0],
    prefersReducedMotion ? [1.0, 1.0] : [1.0, 1.03],
  );
  // Payoff bottom message reveals at 0.90 -> 0.98
  const payoffOpacity = useTransform(
    scrollYProgress,
    [0.88, 0.96],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const payoffY = useTransform(
    scrollYProgress,
    [0.88, 0.96],
    prefersReducedMotion ? [0, 0] : [14, 0],
  );
  // Synchronize active step index
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.3) {
        setActiveStepIndex(0);
      } else if (latest < 0.54) {
        setActiveStepIndex(1);
      } else if (latest < 0.76) {
        setActiveStepIndex(2);
      } else {
        setActiveStepIndex(3);
      }
    });
  }, [scrollYProgress]);
  const activeStep = GEO_STEPS[activeStepIndex];
  const ActiveIcon = activeStep.icon;
  return (
    <section
      ref={sectionRef}
      id="geo-wellness"
      className="relative bg-[#F5F5F7] border-b border-[#D2D2D7] h-[280vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F5F5F7] z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-14 sm:pt-16 lg:pt-18 pb-4">
        <div className="w-full max-w-[1640px] mx-auto flex-1 flex flex-col justify-between min-h-0">
          <div className="mb-2 sm:mb-3 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <div>
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#0E4D3A] uppercase mb-0.5">
                  WHAT IS GEO-WELLNESS?
                </p>
                <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-[#111111] leading-tight tracking-tight">
                  Where You Go <span className="text-[#0E4D3A]">Matters.</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6E6E73] max-w-xl font-medium leading-snug">
                Wellness is not only what you do. The environment around you can
                shape the experience of rest, recovery and reconnection.
              </p>
            </div>
            <div className="mt-3 sm:mt-4 relative">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-left">
                {GEO_STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isPassed = activeStepIndex >= idx;
                  return (
                    <div
                      className={`pb-2 transition-all duration-300 relative ${
                        isActive
                          ? "opacity-100 scale-[1.01]"
                          : isPassed
                            ? "opacity-80"
                            : "opacity-45"
                      }`}
                      key={step.id}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <span
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-[#0E4D3A] text-white shadow-xs"
                              : isPassed
                                ? "bg-[#0E4D3A]/20 text-[#0E4D3A]"
                                : "bg-[#D2D2D7] text-[#555555]"
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors ${isActive ? "text-[#0E4D3A]" : "text-[#111111]"}`}
                        >
                          {step.tabLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="h-1 w-full bg-[#D2D2D7] rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: progressLineScaleX }}
                  className="h-full bg-gradient-to-r from-[#0E4D3A] via-[#C6A660] to-[#0E4D3A] origin-left"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 min-h-0 rounded-[22px] sm:rounded-[28px] border border-[#D2D2D7] bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D2D2D7]">
            <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#F9F9FB] relative z-10 min-h-0 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] border border-[#0E4D3A]/20">
                    <span className="w-2 h-2 rounded-full bg-[#0E4D3A] animate-pulse" />
                    <span>
                      Phase {activeStep.num} — {activeStep.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#86868B]">
                    0{activeStepIndex + 1} / 04
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-[32px] font-bold text-[#111111] leading-tight tracking-tight mb-2">
                  {activeStep.subtitle}
                </h3>
                <p className="text-sm sm:text-base text-[#555555] font-medium leading-relaxed mb-6">
                  {activeStep.summary}
                </p>
                <div className="space-y-2.5">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#86868B]">
                    Core Considerations:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                    {activeStep.tags.map((tag) => (
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#D2D2D7] shadow-2xs"
                        key={tag}
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#0E4D3A]/10 text-[#0E4D3A] flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className="text-sm font-bold text-[#111111]">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {activeStepIndex === 3 && (
                <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-[#0E4D3A] to-[#0A382A] text-white shadow-md">
                  <div className="flex items-center justify-between text-xs font-mono text-[#C6A660] font-bold mb-1">
                    <span>GEO-WELLNESS SYNTHESIS</span>
                    <span>100% MATCH</span>
                  </div>
                  <p className="text-xs text-white/90 font-medium">
                    PERSON + ENVIRONMENT + WELLNESS APPROACH = PERSONALIZED
                    JOURNEY
                  </p>
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-[#D2D2D7] flex items-center justify-between text-xs text-[#86868B] font-mono">
                <span>Scroll to see next environment transition</span>
                <span className="text-[#0E4D3A] font-bold">↓</span>
              </div>
            </div>
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full bg-[#18181A] overflow-hidden">
              {GEO_STEPS.map((step, idx) => (
                <motion.div
                  style={{ opacity: imgOpacities[idx], scale: cameraScale }}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  key={step.id}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover brightness-[0.92]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />
                </motion.div>
              ))}
              <div className="absolute top-6 left-6 z-20">
                <SignalBadge variant="dark" dot>
                  {activeStep.title}
                </SignalBadge>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C6A660] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                    <span>{activeStep.subtitle}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-mono text-white/80 uppercase tracking-widest">
                    {activeStep.caption}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
                  <ActiveIcon className="w-3.5 h-3.5 text-[#C6A660]" />
                  <span>Verified Indian Sanctuary</span>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            style={{ opacity: payoffOpacity, y: payoffY }}
            className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#111111] shrink-0"
          >
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E4D3A]" />
              <span className="font-display font-bold text-sm sm:text-base text-[#111111]">
                The right journey begins with understanding the person and the
                environment.
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E4D3A] text-white font-bold text-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A660]" />
              <span>This is Geo-Wellness.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default GeoWellnessScrollStory;
