import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Star,
  MessageSquare,
  MapPin,
  Sparkles,
  Target,
  Award,
  Clock,
  Compass,
  Plane,
  CreditCard,
  Sliders,
  Check,
  ShieldCheck,
} from "lucide-react";
export const STANDARD_FACTORS = [
  { id: "ratings", label: "Ratings", icon: Star },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "location", label: "Location", icon: MapPin },
  { id: "luxury", label: "Luxury", icon: Sparkles },
];
export const DARSHAI_FACTORS = [
  { id: "goals", num: "01", label: "Wellness Goals", icon: Target },
  { id: "suitability", num: "02", label: "Programme Suitability", icon: Award },
  { id: "duration", num: "03", label: "Duration", icon: Clock },
  { id: "environment", num: "04", label: "Environment", icon: Compass },
  { id: "travel", num: "05", label: "Travel Preferences", icon: Plane },
  { id: "budget", num: "06", label: "Budget", icon: CreditCard },
  {
    id: "requirements",
    num: "07",
    label: "Personal Requirements",
    icon: Sliders,
  },
];
function StandardPointItem({
  item,
  index,
  scrollYProgress,
  prefersReducedMotion,
}) {
  const Icon = item.icon;
  // Animation: As beam sweeps across, point shifts softly and remains visible
  const fadeStart = 0.12 + index * 0.04;
  const fadeEnd = fadeStart + 0.05;
  // The text softens slightly during filter sweep then returns to 100% solid opacity
  // so all text remains fully visible through the finish of the section
  const opacity = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd, 0.4, 0.6],
    prefersReducedMotion ? [1, 1, 1, 1] : [1, 0.65, 0.65, 1],
  );
  const y = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd, 0.4, 0.6],
    prefersReducedMotion ? [0, 0, 0, 0] : [0, 3, 3, 0],
  );
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex-1 min-w-[160px] border-b border-dashed border-[#D2D2D7] pb-3 pr-2"
    >
      <div className="flex items-center gap-2.5 text-[#111111]">
        <Icon className="w-5 h-5 text-[#111111] stroke-[2.2]" />
        <span className="text-base sm:text-lg font-bold tracking-wide uppercase font-mono text-[#111111]">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}
function FilterBeam({ scrollYProgress, prefersReducedMotion }) {
  // Sweeps from 0% to 100% between scroll 0.10 and 0.36
  const beamLeft = useTransform(scrollYProgress, [0.1, 0.36], ["0%", "100%"]);
  const beamOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.12, 0.36, 0.42],
    prefersReducedMotion ? [0, 0, 0, 0] : [0, 1, 1, 0],
  );
  if (prefersReducedMotion) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ left: beamLeft, opacity: beamOpacity }}
      className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C6A660]/20 via-[#C6A660] to-[#0E4D3A] shadow-[0_0_16px_rgba(198,166,96,0.8)] pointer-events-none z-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#C6A660] shadow-[0_0_10px_#C6A660]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0E4D3A] shadow-[0_0_10px_#0E4D3A]" />
    </motion.div>
  );
}
function DarshaiInputSlot({
  factor,
  index,
  scrollYProgress,
  prefersReducedMotion,
}) {
  const Icon = factor.icon;
  // Staggered entrance: enters from left (-30px) to slot (0px) by 0.26 to 0.55
  const enterStart = 0.26 + index * 0.04;
  const enterEnd = enterStart + 0.035;
  const x = useTransform(
    scrollYProgress,
    [enterStart, enterEnd],
    prefersReducedMotion ? [0, 0] : [-30, 0],
  );
  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterEnd],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  // Check marker: scales 0.8 -> 1 upon locking into place
  const checkStart = enterEnd;
  const checkEnd = checkStart + 0.02;
  const checkOpacity = useTransform(
    scrollYProgress,
    [checkStart, checkEnd],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  const checkScale = useTransform(
    scrollYProgress,
    [checkStart, checkEnd],
    prefersReducedMotion ? [1, 1] : [0.8, 1],
  );
  return (
    <div className="flex-1 min-w-[170px] relative pt-6 pb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-xs font-bold text-[#0E4D3A] bg-[#0E4D3A]/10 px-2 py-0.5 rounded-md">
          {factor.num}
        </span>
        <motion.span
          aria-hidden="true"
          style={{ opacity: checkOpacity, scale: checkScale }}
          className="w-4 h-4 rounded-full bg-[#0E4D3A] text-white flex items-center justify-center shrink-0 shadow-xs"
        >
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </motion.span>
      </div>
      <motion.div style={{ x, opacity }} className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-[#0E4D3A]">
          <Icon className="w-4 h-4 stroke-[2.2] shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-[#1D1D1F] tracking-tight leading-snug">
            {factor.label}
          </h4>
        </div>
      </motion.div>
    </div>
  );
}
function ProgressRail({ scrollYProgress, prefersReducedMotion }) {
  // Rail fills from left to right when all seven inputs lock
  const scaleX = useTransform(
    scrollYProgress,
    [0.55, 0.68],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-[2px] bg-[#D2D2D7]/60 overflow-hidden rounded-full my-6"
    >
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-[#0E4D3A] via-[#C6A660] to-[#0E4D3A]"
      />
    </div>
  );
}
// -------------------------------------------------------------
// MAIN SECTION EXPORT
// -------------------------------------------------------------
export function WhyDarshaiInternationalSection() {
  const sectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Footer opacity at the end of the matching track (reaches 1.0 by 0.72 and stays visible)
  const footerOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.72],
    prefersReducedMotion ? [1, 1] : [0, 1],
  );
  return (
    <section
      ref={sectionRef}
      id="why-darshai"
      className="relative bg-[#F5F5F7] border-b border-[#D2D2D7]/80 lg:h-[200vh]"
    >
      <div className="hidden lg:flex sticky top-0 h-screen flex-col justify-between overflow-hidden py-10 sm:py-14 max-w-[1640px] mx-auto px-8 lg:px-12 w-full">
        <div className="shrink-0 text-left max-w-4xl">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#0E4D3A] uppercase mb-1 sm:mb-2">
            WHY DARSHAI EXISTS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-2 sm:mb-3">
            <span className="block text-[#111111]">
              Finding Wellness Is Easy.
            </span>
            <span className="block text-[#0E4D3A] mt-0.5">
              Finding What Fits You Is Hard.
            </span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#2C2C2E] font-medium">
            <span className="w-4 h-[2px] bg-[#0E4D3A]" />
            <p className="font-semibold text-[#0E4D3A]">
              DARSHAI looks beyond ratings, reviews and luxury.
            </p>
          </div>
        </div>
        <div className="w-full h-[320px] sm:h-[360px] lg:h-[400px] xl:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-[#D2D2D7] shadow-xl my-4 shrink-0 bg-[#0E4D3A]">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85"
            alt="Darshai luxury wellness sanctuary and multidimensional matching ecosystem"
            className="w-full h-full object-cover object-center brightness-[0.96] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E4D3A]/95 via-[#0E4D3A]/40 to-transparent" />
          <div className="absolute inset-0 p-4 sm:p-5 lg:p-6 flex flex-col justify-between z-10 text-white">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A660]" />
                <span>Sanctuary & Protocol Alignment</span>
              </span>
              <span className="text-xs font-mono text-[#C6A660] font-bold px-2.5 py-0.5 rounded-full bg-black/40 border border-[#C6A660]/40 shadow-sm">
                100% Fit
              </span>
            </div>
            <div className="space-y-1 max-w-3xl">
              <p className="text-[11px] sm:text-xs font-mono tracking-widest text-[#C6A660] uppercase font-bold">
                Multidimensional Intelligence
              </p>
              <h3 className="font-display text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-white leading-tight">
                Matched with wellness centres engineered for your journey.
              </h3>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed hidden sm:block">
                Beyond surface reviews. We synchronize clinical protocol,
                microclimate resonance, and therapeutic timeline pacing.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center relative w-full pt-2">
          <div className="relative w-full border-t border-[#D2D2D7]/80 pt-4">
            <FilterBeam
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#C6A660]/15 text-[#7A6125] border border-[#C6A660]/40 shadow-2xs">
                  Standard Comparison
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#1D1D1F] tracking-tight">
                  Many travellers compare only:
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#2C2C2E]/60 font-semibold">
                Surface Metrics
              </span>
            </div>
            <div className="flex items-start justify-between gap-6 w-full mb-3">
              {STANDARD_FACTORS.map((item, index) => (
                <StandardPointItem
                  item={item}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  prefersReducedMotion={prefersReducedMotion}
                  key={item.id}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mb-1.5 mt-3 pt-3 border-t border-[#D2D2D7]/60">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#C6A660]/15 text-[#7A6125] border border-[#C6A660]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A660]" />
                  <span>The DARSHAI System</span>
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#0E4D3A] tracking-tight">
                  DARSHAI goes further
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#0E4D3A] font-bold">
                07 Inputs Synced
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 w-full">
              {DARSHAI_FACTORS.map((factor, index) => (
                <DarshaiInputSlot
                  factor={factor}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  prefersReducedMotion={prefersReducedMotion}
                  key={factor.id}
                />
              ))}
            </div>
            <ProgressRail
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
            <motion.div
              style={{ opacity: footerOpacity }}
              className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-[#1D1D1F] pt-1"
            >
              <div className="flex items-center gap-2 text-[#0E4D3A]">
                <span className="w-2 h-2 rounded-full bg-[#0E4D3A]" />
                <span>07 Inputs Connected</span>
              </div>
              <span className="text-[#2C2C2E]/70 font-medium">
                Geo-Environment & Microclimate Synced
              </span>
              <div className="flex items-center gap-2 text-[#C6A660]">
                <span>100% Match Precision</span>
                <span className="w-2 h-2 rounded-full bg-[#C6A660]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="lg:hidden py-12 sm:py-16 px-4 sm:px-6 max-w-2xl mx-auto text-left space-y-10">
        <div>
          <p className="text-[11px] font-bold tracking-[0.25em] text-[#0E4D3A] uppercase mb-1">
            WHY DARSHAI EXISTS
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-[#111111] mb-2">
            Finding Wellness Is Easy.
            <span className="block text-[#0E4D3A]">
              Finding What Fits You Is Hard.
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#0E4D3A]">
            DARSHAI looks beyond ratings, reviews and luxury.
          </p>
        </div>
        <div className="w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden relative border border-[#D2D2D7] shadow-md bg-[#0E4D3A]">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=85"
            alt="Darshai luxury wellness sanctuary and multidimensional matching ecosystem"
            className="w-full h-full object-cover object-center brightness-[0.96] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E4D3A]/95 via-[#0E4D3A]/40 to-transparent" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-white">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/25 text-white">
                <ShieldCheck className="w-3 h-3 text-[#C6A660]" />
                <span>Sanctuary & Protocol Alignment</span>
              </span>
              <span className="text-[11px] font-mono text-[#C6A660] font-bold px-2 py-0.5 rounded-full bg-black/40 border border-[#C6A660]/40">
                100% Fit
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono tracking-widest text-[#C6A660] uppercase font-bold">
                Multidimensional Intelligence
              </p>
              <h3 className="font-display text-sm font-bold text-white leading-tight">
                Matched with wellness centres engineered for your journey.
              </h3>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C6A660]/15 text-[#7A6125] border border-[#C6A660]/40">
              Standard Comparison
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#1D1D1F]">
              Many travellers compare only:
            </p>
          </div>
          <div className="relative pl-3 space-y-2.5">
            {STANDARD_FACTORS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="relative flex items-center justify-between gap-3 text-sm text-[#111111]"
                  key={item.id}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 stroke-[2.2] text-[#111111]" />
                    <span className="font-bold text-sm sm:text-base text-[#111111] line-through decoration-[#C6A660]/70 decoration-2">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-4 pt-2 border-t border-[#D2D2D7]/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C6A660]/15 text-[#7A6125] border border-[#C6A660]/40">
              <span className="w-1 h-1 rounded-full bg-[#C6A660]" />
              <span>The DARSHAI System</span>
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#0E4D3A]">
              DARSHAI goes further
            </p>
          </div>
          <div className="relative pl-6 space-y-3.5">
            <div
              aria-hidden="true"
              className="absolute left-2.5 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#0E4D3A] via-[#C6A660] to-[#0E4D3A]"
            />
            {DARSHAI_FACTORS.map((factor, idx) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="relative flex items-start gap-3"
                  key={factor.id}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#0E4D3A] text-white flex items-center justify-center shrink-0 text-[10px] shadow-xs"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#0E4D3A] bg-[#0E4D3A]/10 px-1.5 py-0.2 rounded">
                      {factor.num}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-[#0E4D3A] stroke-[2]" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111]">
                      {factor.label}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="pt-4 border-t border-[#D2D2D7] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#0E4D3A]">07 Inputs Connected</span>
            <span className="text-[#C6A660]">100% Match Precision</span>
          </div>
          <p className="text-[11px] font-mono text-[#2C2C2E]/60 text-center">
            Geo-Environment & Microclimate Synced
          </p>
        </div>
      </div>
    </section>
  );
}
export default WhyDarshaiInternationalSection;
