import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
export function CorporateGeoWellnessSection({ onNavigate }) {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // Subtle restrained image zoom & entry transition (1.03 -> 1.00)
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.035, 1.0, 1.02],
  );
  const textY = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    prefersReducedMotion ? [0, 0] : [16, 0],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    prefersReducedMotion ? [1, 1] : [0.4, 1],
  );
  return (
    <section
      ref={containerRef}
      id="corporate"
      className="py-20 md:py-28 lg:py-32 bg-[#F5F5F7] border-y border-[#D2D2D7] relative overflow-hidden text-left"
    >
      <div className="darshai-container text-left">
        <div className="bg-[#18181A] text-white rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-2xl border-2 border-[#3B82F6] hover:border-[#60A5FA] transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] relative">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C6A660]/10 blur-3xl pointer-events-none z-0" />
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden bg-[#111111] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-end">
              <motion.img
                style={{ scale: imageScale }}
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80"
                alt="Executive leadership wellness retreat in pristine nature"
                className="w-full h-full object-cover object-center absolute inset-0 brightness-[0.85] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-10 pointer-events-none" />
              <div className="absolute top-5 sm:top-7 left-5 sm:left-7 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                  <span>EXECUTIVE RETREATS • RECOVERY ENVIRONMENTS</span>
                </div>
              </div>
              <div className="relative z-20 p-6 sm:p-8 text-white">
                <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#C6A660] font-bold">
                  STRUCTURED LEADERSHIP RETREATS
                </p>
                <p className="font-display text-base sm:text-lg text-white/90 font-medium mt-0.5">
                  Private bio-climatic environments engineered for cognitive
                  recalibration.
                </p>
              </div>
            </div>
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="lg:col-span-5 p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between bg-[#1D1D20]"
            >
              <div className="space-y-6">
                <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#C6A660] uppercase">
                  CORPORATE GEO-WELLNESS
                </p>
                <h2 className="typography-section-h2 font-bold text-white tracking-tight leading-[1.14]">
                  Wellness for Leaders. <br />
                  <span className="text-[#C6A660]">
                    Designed for Organizations.
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-[17px] text-white/80 leading-relaxed font-normal">
                  Personalized wellness journeys for founders, leaders and
                  organizations.
                </p>
                <div className="pt-2 pb-2">
                  <p className="text-xs sm:text-[13px] font-mono font-bold text-white/70 tracking-wide">
                    Executive Wellness · Leadership Recovery · Corporate
                    Wellness
                  </p>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    track("corporate_method_inquiry", {
                      source: "international_corporate_section",
                    });
                    onNavigate("corporate");
                  }}
                  className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#C6A660] hover:text-white transition-colors cursor-pointer group"
                >
                  <span>Explore Corporate Geo-Wellness</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CorporateGeoWellnessSection;
