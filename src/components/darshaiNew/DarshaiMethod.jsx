import React, { useState, useRef, useEffect, useCallback } from "react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const STAGES = [
  {
    id: "understand-you",
    num: "01",
    title: "Understand You",
    eyebrow: "Individual Baseline",
    description:
      "Every recommendation begins with the individual. We conduct a thorough assessment of your baseline health, personal aspirations, and clinical objectives.",
    linkText: "Learn more about individual baseline",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=800&fit=crop&auto=format",
    imageAlt:
      "Serene individual reflecting on personal health baseline in warm natural light",
  },
  {
    id: "understand-context",
    num: "02",
    title: "Understand Context",
    eyebrow: "Life Rhythm & Circumstances",
    description:
      "Life rhythm, professional commitments, and daily constraints shape what is sustainable. We map your context to ensure effortless integration.",
    linkText: "Learn more about lifestyle pacing",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop&auto=format",
    imageAlt: "Reflective workspace representing lifestyle pacing and context",
  },
  {
    id: "map-environment",
    num: "03",
    title: "Map Environment",
    eyebrow: "Environmental Intelligence",
    description:
      "Climate, altitude, coastal air, and environmental microclimates profoundly impact recovery. We match your physiological needs with the ideal terrain.",
    linkText: "Learn more about geo-wellness",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&auto=format",
    imageAlt:
      "Pristine coastal microclimate and natural therapeutic sanctuary terrain",
  },
  {
    id: "match-centre",
    num: "04",
    title: "Match Centre",
    eyebrow: "Precision Alignment",
    description:
      "Using our proprietary wellness matching engine, we connect your unique profile with vetted sanctuary partners, medical specialists, and clinical centers.",
    linkText: "Learn more about centre matching",
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=800&fit=crop&auto=format",
    imageAlt:
      "Curated wellness sanctuary consultation pavilion for clinical alignment",
  },
  {
    id: "match-programme",
    num: "05",
    title: "Match Programme",
    eyebrow: "Targeted Protocol",
    description:
      "We evaluate evidence-based Ayurvedic and integrative protocols to match the exact programme duration and focus for your goals.",
    linkText: "Learn more about programme matching",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop&auto=format",
    imageAlt: "Targeted programme matching and protocol selection",
  },
  {
    id: "build-your-journey",
    num: "06",
    title: "Build Your Journey",
    eyebrow: "Tailored Trajectory",
    description:
      "We orchestrate a bespoke, end-to-end itinerary encompassing pre-arrival planning, private transit, accommodation, and continuous guidance.",
    linkText: "Learn more about journey orchestration",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop&auto=format",
    imageAlt:
      "Tailored wellness itinerary guide and bespoke travel documentation",
  },
];

export function DarshaiMethod({ onNavigate, hideHeader = false }) {
  const [activeStep, setActiveStep] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [_progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = sectionHeight - windowHeight;

    if (totalScrollableDistance <= 0) return;

    const currentProgress = Math.min(
      Math.max(0, -rect.top / totalScrollableDistance),
      1,
    );

    setProgress(currentProgress);

    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    const maxDistance = Math.max(
      0,
      trackWidth - viewportWidth + (viewportWidth < 640 ? 32 : 120),
    );

    setTranslateX(currentProgress * maxDistance);

    const step = Math.min(
      Math.floor(currentProgress * STAGES.length),
      STAGES.length - 1,
    );

    setActiveStep(step);
  }, []);

  useEffect(() => {
    let ticking = false;
    let resizeTimer = null;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        handleScroll();
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    handleScroll();

    const t1 = setTimeout(handleScroll, 200);
    const t2 = setTimeout(handleScroll, 600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (resizeTimer) clearTimeout(resizeTimer);

      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleScroll]);

  const goToStep = (index) => {
    const clamped = Math.max(0, Math.min(index, STAGES.length - 1));

    setActiveStep(clamped);

    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;

    const sectionTop = rect.top + currentScrollY;
    const scrollableDistance =
      sectionRef.current.offsetHeight - window.innerHeight;

    const targetScroll =
      sectionTop +
      (clamped / (STAGES.length - 1)) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (activeStep > 0) goToStep(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep < STAGES.length - 1) {
      goToStep(activeStep + 1);
    }
  };

  return (
    <section
      id="darshai-method-section"
      className="relative bg-[#F5F5F7] border-b border-[#D2D2D7]"
    >
      <div
        ref={sectionRef}
        className="relative h-[420vh] sm:h-[380vh] md:h-[340vh] lg:h-[300vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-between py-5 sm:py-6 lg:py-8 overflow-hidden z-10">
          {!hideHeader && (
            <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 shrink-0">
              <p
                id="darshai-method-eyebrow"
                className="typography-eyebrow text-[#0E4D3A] mb-2 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>THE DARSHAI METHOD</span>
              </p>

              <h2
                id="darshai-method-heading"
                className="typography-section-h2 tracking-tight mb-3"
              >
                <span className="text-[#1D1D1F] block">
                  Personalized Wellness
                </span>

                <span className="text-[#0E4D3A] block mt-0.5 sm:mt-1">
                  Starts with Understanding.
                </span>
              </h2>

              <p className="typography-lead text-[#4A4A4A] max-w-2xl leading-relaxed font-normal">
                Every recommendation begins with the individual. Then DARSHAI
                combines personal context, environmental intelligence and
                wellness expertise to build a journey designed around fit
                rather than availability.
              </p>
            </div>
          )}

          <div className="w-full relative my-auto overflow-hidden py-4 sm:py-6">
            <div
              className="w-full"
              style={{
                paddingLeft:
                  "max(1rem, calc((100vw - 1320px) / 2 + 2rem))",
              }}
            >
              <div
                ref={trackRef}
                style={{
                  transform: `translate3d(-${translateX}px, 0, 0)`,
                  transition: "transform 0.08s linear",
                }}
                className="flex items-stretch gap-4 sm:gap-5 lg:gap-6 will-change-transform pr-8 sm:pr-12 w-max"
              >
                {STAGES.map((stage, idx) => {
                  const isCurrent = activeStep === idx;

                  return (
                    <div
                      className="relative shrink-0 group"
                      key={stage.id}
                    >
                      <div
                        className={`w-[82vw] sm:w-[62vw] md:w-[46vw] lg:w-[480px] xl:w-[520px] h-[470px] sm:h-[500px] md:h-[510px] lg:h-[520px] xl:h-[560px] relative rounded-[28px] lg:rounded-[32px] overflow-hidden border-2 bg-[#1D1D1F] apple-product-card select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isCurrent
                            ? "border-[#34D399] shadow-[0_20px_50px_-12px_rgba(14,77,58,0.35)] scale-[1.015] -translate-y-1"
                            : "border-white/80 shadow-xl"
                        } hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:border-[#34D399] active:scale-[0.99]`}
                      >
                        <div className="absolute inset-0 bg-[#0A1A14] overflow-hidden">
                          <SmartImage
                            src={stage.image}
                            alt={stage.imageAlt}
                            className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isCurrent ? "scale-105" : "scale-100"
                            } group-hover:scale-[1.08] group-active:scale-[1.04]`}
                          />

                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none transition-opacity duration-500 ${
                              isCurrent
                                ? "opacity-100"
                                : "group-hover:opacity-70"
                            }`}
                          />

                          <div
                            className={`absolute inset-0 bg-[#0A1A14]/95 backdrop-blur-[2px] transition-all duration-500 ease-out p-6 sm:p-8 flex flex-col justify-between items-center text-center z-20 ${
                              isCurrent
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0"
                            }`}
                          >
                            <div className="space-y-3 pt-2 w-full flex flex-col items-center">
                              <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0E4D3A] text-white uppercase tracking-wider inline-block border border-[#34D399]/30">
                                STAGE {stage.num} · {stage.eyebrow}
                              </span>

                              <h3 className="typography-card-title text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
                                {stage.title}
                              </h3>

                              <div className="pt-3 border-t border-white/20 w-full">
                                <p className="typography-body text-white/95 leading-relaxed font-normal text-center text-xs sm:text-sm">
                                  {stage.description}
                                </p>
                              </div>
                            </div>

                            {/* <div className="pt-4 w-full flex justify-center">
                              <span className="py-2.5 px-5 sm:px-6 rounded-full bg-white text-[#1D1D1F] typography-ui-button font-semibold text-[10px] sm:text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-all duration-300 group-hover:bg-[#34D399] group-hover:text-black group-active:bg-[#34D399]">
                                <span>{stage.linkText}</span>
                                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div> */}
                          </div>
                        </div>

                        <div
                          className={`relative z-10 flex items-center justify-between p-5 sm:p-6 lg:p-6 transition-opacity duration-300 ${
                            isCurrent
                              ? "opacity-100"
                              : "group-hover:opacity-0 group-active:opacity-0"
                          }`}
                        >
                          <SignalBadge variant="dark" dot>
                            STAGE {stage.num}
                          </SignalBadge>

                          <SignalBadge variant="dark">
                            {stage.eyebrow}
                          </SignalBadge>
                        </div>

                        <div
                          className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-8 z-10 flex flex-col justify-end transition-all duration-500 ${
                            isCurrent
                              ? "opacity-0 translate-y-2"
                              : "opacity-100 translate-y-0 group-hover:opacity-0 group-hover:translate-y-2 group-active:opacity-0 group-active:translate-y-2"
                          }`}
                        >
                          <h3 className="typography-card-title sm:text-2xl font-semibold text-white tracking-tight leading-tight drop-shadow-md">
                            {stage.title}
                          </h3>

                          <p className="typography-body text-white/80 mt-2 line-clamp-2">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 shrink-0 pt-3 border-t border-[#D2D2D7] flex items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#0E4D3A] px-2.5 sm:px-3 py-1 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 shrink-0">
                0{activeStep + 1} / 06
              </span>

              <span className="hidden sm:block text-sm font-semibold text-[#1D1D1F] truncate">
                {STAGES[activeStep].title}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1 shrink-0">
              {STAGES.map((stage, idx) => {
                const isCurrent = activeStep === idx;

                return (
                  <button
                    type="button"
                    onClick={() => goToStep(idx)}
                    aria-label={`Jump to stage ${stage.num}: ${stage.title}`}
                    className="group relative focus:outline-none flex items-center justify-center cursor-pointer py-1 px-0.5"
                    key={stage.id}
                  >
                    <div
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCurrent
                          ? "w-7 sm:w-11 bg-[#1D1D1F]"
                          : "w-2.5 sm:w-4 bg-[#1D1D1F]/25 group-hover:bg-[#1D1D1F]/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeStep === 0}
                aria-label="Previous step"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeStep === 0
                    ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                    : "bg-white hover:bg-[#0E4D3A] active:bg-[#0E4D3A] hover:text-white active:text-white border-[#D2D2D7] text-[#1D1D1F] shadow-2xs"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeStep === STAGES.length - 1}
                aria-label="Next step"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeStep === STAGES.length - 1
                    ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                    : "bg-white hover:bg-[#0E4D3A] active:bg-[#0E4D3A] hover:text-white active:text-white border-[#D2D2D7] text-[#1D1D1F] shadow-2xs"
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DarshaiMethod;