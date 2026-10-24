import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";

const CENTRES = [
  {
    number: "01",
    name: "Kanasu Wellness",
    locationEyebrow: "CENTRE 01 - UDUPI, KARNATAKA",
    specialties: "Ayurveda · Naturopathy · Yoga",
    heroHeadline: "A More Personal Way to Reconnect with Wellbeing.",
    introduction:
      "Set within a nature-led campus in Udupi, Kanasu brings together Ayurveda, Naturopathy, Yoga and meditation in personalised wellness programmes.",
    distinctPoints: [
      "Ayurveda, Naturopathy, Yoga and meditation",
      "Sound-based relaxation practices, including sound healing",
      "Wooden cottages, a private farmhouse, therapy spaces and a yoga shala",
      "A campus featuring a goshala, herbal garden and natural surroundings",
    ],
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&auto=format&q=85",
    ctaText: "Develop Kanasu profile",
    slug: "kanasu",
  },
  {
    number: "02",
    name: "Chithrakoota Ayurveda",
    locationEyebrow: "CENTRE 02 - ALOOR, KUNDAPUR, UDUPI DISTRICT",
    specialties: "Ayurveda · Panchakarma · Yoga and meditation",
    heroHeadline: "Rooted in Ayurveda. Connected to Nature.",
    introduction:
      "Chithrakoota combines traditional Ayurvedic care with a green, rural setting, an in-house pharmacy and a campus shaped around medicinal plants and nature.",
    distinctPoints: [
      "An in-house Ayurvedic pharmacy",
      "A dedicated Desi cow farm",
      "More than 150 medicinal plant varieties on campus",
      "Ayurvedic therapies with Yoga & meditation in daily activities",
      "A setting with farm-fresh produce and extensive green space",
    ],
    image:
      "https://images.unsplash.com/photo-1511497584788-87676104235f?w=1200&h=900&fit=crop&auto=format&q=85",
    ctaText: "Develop Chithrakoota profile",
    slug: "chithrakoota",
  },
  {
    number: "03",
    name: "Shathayu Retreat",
    locationEyebrow: "CENTRE 03 - NEAR BENGALURU, KARNATAKA",
    specialties: "Ayurveda · Panchakarma · Yoga · Naturopathy",
    heroHeadline: "A Restorative Retreat Surrounded by Nature.",
    introduction:
      "Shathayu brings together Ayurveda, Yoga and Naturopathy in a retreat setting surrounded by greenery, hills and a lake, with multiple accommodation categories.",
    distinctPoints: [
      "Ayurveda and Panchakarma offerings",
      "Yoga, meditation and Naturopathy",
      "Standard, Deluxe and Luxury accommodation categories",
      "A dedicated yoga hall, therapy centre and spiritual garden",
      "Located approximately 15 minutes from Bengaluru International Airport",
    ],
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&h=1200&fit=crop&auto=format&q=85",
    ctaText: "Develop Shathayu profile",
    slug: "shathayu",
  },
];

export function CuratedEnvironmentsChapters({
  id = "trusted-wellness-centres",
  onNavigate,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScrollX, setMaxScrollX] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [expandedSlug, setExpandedSlug] = useState(null);

  useEffect(() => {
    const calculateScroll = () => {
      if (!trackRef.current) return;

      const scrollAmount =
        trackRef.current.scrollWidth - trackRef.current.clientWidth;

      setMaxScrollX(Math.max(0, scrollAmount));
    };

    calculateScroll();
    window.addEventListener("resize", calculateScroll);

    return () => window.removeEventListener("resize", calculateScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, -maxScrollX],
  );

  const horizontalX = useSpring(rawX, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const total = CENTRES.length;
      const index = Math.min(
        Math.floor(latest * total),
        total - 1,
      );

      setActiveSlideIndex(Math.max(0, index));
    });
  }, [scrollYProgress]);

  const scrollToSlide = (index) => {
    if (!containerRef.current) return;

    const safeIndex = Math.max(
      0,
      Math.min(index, CENTRES.length - 1),
    );

    const sectionTop = containerRef.current.offsetTop;
    const scrollableHeight =
      containerRef.current.clientHeight - window.innerHeight;

    const targetProgress =
      0.05 +
      (safeIndex / Math.max(CENTRES.length - 1, 1)) * 0.9;

    const targetScrollY =
      sectionTop + scrollableHeight * targetProgress;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    if (activeSlideIndex === 0) return;
    scrollToSlide(activeSlideIndex - 1);
  };

  const handleNext = () => {
    if (activeSlideIndex === CENTRES.length - 1) return;
    scrollToSlide(activeSlideIndex + 1);
  };

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[220vh] lg:min-h-[260vh] bg-[#F5F5F7] border-b border-[#D2D2D7] scroll-mt-12"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 overflow-hidden">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 sm:mb-5 gap-6 border-b border-[#D2D2D7]/80 pb-4 sm:pb-6">
            <div className="max-w-3xl">
              <p className="typography-eyebrow text-[#0E4D3A] mb-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>OUR CENTRE NETWORK</span>
              </p>

              <h2 className="text-[48px] sm:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-tight text-[#1D1D1F] mb-2">
          <span className="block text-[#1D1D1F]">
            The Right Programme Needs
          </span>
          <span className="block text-[#0E4D3A]">
            the Right Setting.
          </span>
        </h2>

              <p className="typography-lead text-[#4A4A4A] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
                Explore curated wellness centres considered for their programme
                suitability, environment and ability to support your journey.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden my-auto py-2">
          <motion.div
            ref={trackRef}
            style={{ x: horizontalX }}
            className="flex gap-6 sm:gap-8 pl-4 sm:pl-8 lg:pl-[max(2rem,(100vw-1360px)/2)] pr-8 sm:pr-12 will-change-transform"
          >
            {CENTRES.map((centre, index) => {
              const isActive = activeSlideIndex === index;

              return (
                <motion.div
                  key={centre.number}
                  onClick={() => {
                    setActiveSlideIndex(index);

                    track("centre_view", {
                      centre: centre.name,
                      slug: centre.slug,
                    });

                    onNavigate(`/centres/${centre.slug}`);
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.985,
                    y: -3,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative h-[480px] sm:h-[520px] lg:h-[550px] w-[88vw] sm:w-[500px] md:w-[560px] lg:w-[600px] shrink-0 bg-[#0A0A0B] text-white rounded-[28px] overflow-hidden border border-[#27272A] hover:border-[#34D399] active:border-[#34D399] shadow-xl hover:shadow-2xl active:shadow-2xl group cursor-pointer transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 ${
                    isActive
                      ? "ring-2 ring-[#34D399]/40"
                      : "opacity-95"
                  }`}
                >
                  <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                    <SmartImage
                      src={centre.image}
                      alt={centre.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-active:scale-105 group-hover:opacity-20 group-active:opacity-20"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-300" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-300 pointer-events-none">
                    <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                      {centre.number} / 03
                    </span>

                    <span className="text-xs font-mono text-[#34D399] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 uppercase tracking-wider font-semibold">
                      {centre.specialties.split("·")[0]}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1.5 mt-auto text-center flex flex-col items-center group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-300 pointer-events-none">
                    <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest font-bold">
                      {centre.locationEyebrow}
                    </p>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {centre.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-[#34D399]">
                      {centre.specialties}
                    </p>
                  </div>

                  <div className="absolute inset-0 z-20 bg-black p-5 sm:p-7 flex flex-col justify-between items-center text-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-400 ease-out pointer-events-none group-hover:pointer-events-auto group-active:pointer-events-auto">
                    <div className="w-full flex items-center justify-between shrink-0">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/80 text-white border border-white/20 uppercase tracking-wider">
                        {centre.number} / 03
                      </span>

                      <span className="text-xs font-mono text-[#34D399] bg-black/80 px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider font-semibold">
                        {centre.specialties.split("·")[0]}
                      </span>
                    </div>

                    <div className="my-auto w-full max-w-md flex flex-col items-center text-center space-y-2.5 sm:space-y-3 py-2 overflow-y-auto no-scrollbar">
                      <p className="text-[11px] font-mono text-white/70 uppercase tracking-widest font-bold">
                        {centre.locationEyebrow}
                      </p>

                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#34D399] tracking-tight">
                        {centre.name}
                      </h3>

                      <p className="text-xs sm:text-sm font-semibold text-[#34D399]">
                        {centre.specialties}
                      </p>

                      <div className="w-full border-t border-white/20 my-1" />

                      <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug">
                        {centre.heroHeadline}
                      </p>

                      <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                        {centre.introduction}
                      </p>

                      {centre.distinctPoints &&
                        centre.distinctPoints.length > 0 && (
                          <div className="w-full pt-1.5 flex flex-col items-center">
                            <div className="w-full border-t border-white/20 my-1.5" />

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                setExpandedSlug(
                                  expandedSlug === centre.slug
                                    ? null
                                    : centre.slug,
                                );
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#34D399]/60 text-[#34D399] hover:bg-[#34D399] active:bg-[#34D399] hover:text-black active:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm my-1"
                            >
                              <span>
                                {expandedSlug === centre.slug
                                  ? "READ LESS —"
                                  : "READ MORE +"}
                              </span>
                            </button>

                            <AnimatePresence>
                              {expandedSlug === centre.slug && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  className="w-full pt-2 space-y-2 text-xs sm:text-sm text-white font-medium text-center leading-snug overflow-hidden"
                                >
                                  <p className="font-extrabold text-[#34D399] text-xs uppercase tracking-wider mb-2 text-center">
                                    WHAT MAKES IT DISTINCT
                                  </p>

                                  {centre.distinctPoints.map(
                                    (point, idx) => (
                                      <p
                                        className="flex items-center justify-center gap-2 text-white/95"
                                        key={idx}
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shrink-0" />
                                        <span>{point}</span>
                                      </p>
                                    ),
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                    </div>

                    <div className="w-full pt-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          track("centre_view", {
                            centre: centre.name,
                            slug: centre.slug,
                          });

                          onNavigate(`/centres/${centre.slug}`);
                        }}
                        className="w-full py-3.5 px-6 rounded-full bg-[#34D399] hover:bg-[#2EB886] active:bg-[#2EB886] text-black font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                      >
                        <span>{centre.ctaText}</span>

                        <motion.span
                          aria-hidden="true"
                          animate={{ x: [-2, 5, -2] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="inline-flex items-center font-bold"
                        >
                          <ArrowRight className="w-4 h-4 text-black" />
                        </motion.span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="border-t border-[#D2D2D7] pt-4 sm:pt-5">
            <div className="flex items-center justify-between gap-4">
              {/* SLIDE INDICATORS */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-x-auto no-scrollbar">
                {CENTRES.map((centre, index) => {
                  const isActive = activeSlideIndex === index;

                  return (
                    <button
                      key={centre.number}
                      type="button"
                      onClick={() => scrollToSlide(index)}
                      aria-label={`Go to ${centre.name}`}
                      className="group flex items-center justify-center py-1 px-0.5 shrink-0 cursor-pointer focus:outline-none"
                    >
                      <motion.span
                        animate={{
                          width: isActive ? 42 : 8,
                          opacity: isActive ? 1 : 0.45,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-2 rounded-full bg-[#1D1D1F] group-hover:opacity-100 group-active:opacity-100"
                      />
                    </button>
                  );
                })}
              </div>

              {/* ARROW CONTROLS */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <button
                  type="button"
                  aria-label="Previous centre"
                  onClick={handlePrevious}
                  disabled={activeSlideIndex === 0}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#0E4D3A] hover:text-white hover:border-[#0E4D3A] active:bg-[#0E4D3A] active:text-white active:border-[#0E4D3A] active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-35 disabled:pointer-events-none shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  aria-label="Next centre"
                  onClick={handleNext}
                  disabled={activeSlideIndex === CENTRES.length - 1}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#0E4D3A] hover:text-white hover:border-[#0E4D3A] active:bg-[#0E4D3A] active:text-white active:border-[#0E4D3A] active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-35 disabled:pointer-events-none shadow-xs"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CuratedEnvironmentsChapters;