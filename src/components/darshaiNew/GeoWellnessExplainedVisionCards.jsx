import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

const ENVIRONMENT_CARDS = [
  {
    id: 1,
    label: "INDIVIDUAL CONTEXT",
    title: "Person",
    icon: "♙",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&h=1600&fit=crop&auto=format",
    dimensions: ["Health Goals", "Lifestyle", "Constraints", "Preferences"],
  },
  {
    id: 2,
    label: "GEOGRAPHIC INTELLIGENCE",
    title: "Environment",
    icon: "◎",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=1600&fit=crop&auto=format",
    dimensions: ["Coastal retreat", "Forest retreat", "Mountain retreat"],
  },
  {
    id: 3,
    label: "THERAPEUTIC MODULATION",
    title: "Experience",
    icon: "⌁",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=1600&fit=crop&auto=format",
    dimensions: ["Walking", "Meditation", "Ayurveda", "Sleep"],
  },
  {
    id: 4,
    label: "TRANSFORMATION TIMELINE",
    title: "Journey",
    icon: "✣",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=1600&fit=crop&auto=format",
    dimensions: ["Day 1", "Day 7", "Day 14", "Day 21"],
  },
];

export function GeoWellnessExplainedVisionCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => {
    const nextIndex =
      (index + ENVIRONMENT_CARDS.length) % ENVIRONMENT_CARDS.length;
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % ENVIRONMENT_CARDS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="geo-wellness-environment-section"
      className="section-editorial relative overflow-hidden bg-[#101112] text-white border-b border-white/10 py-16 sm:py-20 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0E4D3A]/20 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-[#C6A660]/10 blur-[140px]" />
      </div>

      <div className="darshai-container relative z-10">
        <Reveal>
          <div className="max-w-4xl mb-10 sm:mb-14 lg:mb-16">
            <p className="typography-eyebrow text-[#C6A660] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              <span>GEOGRAPHIC INTELLIGENCE</span>
            </p>

            <h2 className="typography-section-h2 tracking-tight leading-[1.02]">
              <span className="block text-white">Health Exists</span>
              <span className="block text-white">Within an</span>
              <span className="block text-white">Environment.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            {/* DESKTOP / TABLET */}
            <div className="hidden md:flex items-stretch justify-center gap-3 lg:gap-5 min-h-[500px] lg:min-h-[540px]">
              {ENVIRONMENT_CARDS.map((card, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.article
                    key={card.id}
                    layout
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    tabIndex={0}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    animate={{
                      flex: isActive ? 2.25 : 0.65,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    className="group relative min-w-0 h-[500px] lg:h-[540px] rounded-[26px] overflow-hidden border border-white/20 hover:border-[#C6A660] focus:border-[#C6A660] bg-[#171819] cursor-pointer outline-none shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] transition-[border-color,box-shadow] duration-500"
                  >
                    <SmartImage
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />

                    <div
                      className={`absolute inset-0 transition-all duration-700 ${
                        isActive
                          ? "bg-gradient-to-t from-black/95 via-black/50 to-black/10"
                          : "bg-black/55 group-hover:bg-black/35"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

                    {/* TOP */}
                    <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-500 ${
                          isActive
                            ? "bg-[#C6A660] text-[#111111]"
                            : "bg-black/65 text-white/90 border border-white/15"
                        }`}
                      >
                        {card.icon}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-black/65 border border-white/15 px-3 py-1.5 text-[11px] font-semibold tabular-nums">
                        0{card.id}
                      </span>
                    </div>

                    {/* INACTIVE LABEL */}
                    <div
                      className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap transition-all duration-500 ${
                        isActive
                          ? "opacity-0 translate-y-3 pointer-events-none"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      <span className="text-[10px] tracking-[0.18em] uppercase text-[#C6A660]">
                        PILL 0{card.id}
                      </span>
                    </div>

                    {/* ACTIVE CONTENT */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 35,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`absolute inset-x-0 bottom-0 z-20 p-5 lg:p-7 ${
                        isActive
                          ? "pointer-events-auto"
                          : "pointer-events-none"
                      }`}
                    >
                      <div className="max-w-[380px]">
                        <span className="inline-flex rounded-full border border-[#C6A660]/50 bg-[#C6A660]/10 backdrop-blur-md px-3 py-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#C6A660] mb-4">
                          {card.label}
                        </span>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.05] mb-5">
                          {card.title}
                        </h3>

                        <div className="rounded-[18px] border border-white/15 bg-black/70 backdrop-blur-xl p-4 sm:p-5">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#C6A660] font-semibold mb-3">
                            Key Dimensions
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            {card.dimensions.map((dimension) => (
                              <div
                                key={dimension}
                                className="flex items-start gap-2 text-xs sm:text-sm text-white/90"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C6A660] shrink-0 shadow-[0_0_8px_rgba(198,166,96,0.7)]" />
                                <span className="leading-snug">
                                  {dimension}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* HOVER BORDER */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-[#C6A660] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.article>
                );
              })}
            </div>

            {/* MOBILE */}
            <div className="md:hidden">
              <div className="relative flex items-stretch justify-center gap-2 h-[480px] xs:h-[500px]">
                {ENVIRONMENT_CARDS.map((card, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <motion.article
                      key={card.id}
                      onClick={() => goTo(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      initial={false}
                      animate={{
                        width: isActive ? "44%" : "16%",
                        opacity: isActive ? 1 : 0.72,
                        scale: isActive ? 1 : 0.97,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative h-full rounded-[22px] overflow-hidden border cursor-pointer ${
                        isActive
                          ? "border-[#C6A660] shadow-[0_15px_40px_-12px_rgba(198,166,96,0.35)]"
                          : "border-white/30"
                      } bg-[#18191A] outline-none`}
                    >
                      <SmartImage
                        src={card.image}
                        alt={card.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                          isActive ? "scale-[1.03]" : "scale-100"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-t from-black/95 via-black/45 to-black/10"
                            : "bg-black/65"
                        }`}
                      />

                      {/* TOP BADGES */}
                      <div
                        className={`absolute top-4 left-3 right-3 z-20 flex items-center ${
                          isActive
                            ? "justify-between"
                            : "justify-center"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center rounded-full shrink-0 ${
                            isActive
                              ? "w-10 h-10 bg-[#C6A660] text-[#111111] text-lg"
                              : "w-8 h-8 bg-black/65 border border-white/20 text-white/80 text-sm"
                          }`}
                        >
                          {card.icon}
                        </span>

                        {isActive && (
                          <span className="rounded-full bg-[#242526]/90 border border-white/10 px-2.5 py-1 text-[10px] font-bold tabular-nums">
                            0{card.id}
                          </span>
                        )}
                      </div>

                      {/* INACTIVE PILL */}
                      {!isActive && (
                        <div className="absolute inset-x-0 bottom-5 flex justify-center z-20">
                          <span className="text-[8px] text-[#C6A660] uppercase tracking-wider [writing-mode:vertical-rl] rotate-180">
                            PILL 0{card.id}
                          </span>
                        </div>
                      )}

                      {/* ACTIVE CONTENT */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 30,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`absolute inset-x-0 bottom-0 z-30 px-3 pb-3 ${
                          isActive
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                        }`}
                      >
                        <div className="w-full">
                          <div className="inline-flex max-w-full rounded-full border border-[#C6A660]/60 bg-[#C6A660]/15 backdrop-blur-md px-2.5 py-1.5 mb-2">
                            <span className="text-[8px] leading-tight uppercase tracking-wider text-[#C6A660] font-semibold">
                              {card.label}
                            </span>
                          </div>

                          <h3 className="text-[24px] leading-[1.05] font-semibold text-white mb-3 break-words">
                            {card.title}
                          </h3>

                          <div className="w-full rounded-[15px] border border-white/15 bg-black/75 backdrop-blur-xl px-3 py-3">
                            <p className="text-[8px] uppercase tracking-[0.15em] text-[#C6A660] font-bold mb-2">
                              Key Dimensions
                            </p>

                            <div className="space-y-1.5">
                              {card.dimensions.map((dimension) => (
                                <div
                                  key={dimension}
                                  className="flex items-start gap-1.5"
                                >
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C6A660] shrink-0" />
                                  <span className="text-[11px] leading-[1.15] font-medium text-white/95">
                                    {dimension}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* ACTIVE CARD GLOW */}
                      {isActive && (
                        <motion.div
                          layoutId="active-environment-glow"
                          className="absolute inset-0 rounded-[22px] ring-1 ring-[#C6A660]/60 pointer-events-none"
                        />
                      )}
                    </motion.article>
                  );
                })}
              </div>

              {/* MOBILE CONTROLS */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {ENVIRONMENT_CARDS.map((card, index) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Show ${card.title}`}
                      className={`h-7 min-w-7 px-2 rounded-full border text-[10px] font-semibold transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-[#C6A660] border-[#C6A660] text-[#111111] shadow-[0_0_14px_rgba(198,166,96,0.35)]"
                          : "bg-white/5 border-white/15 text-white/60"
                      }`}
                    >
                      0{card.id}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous environment"
                    className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next environment"
                    className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default GeoWellnessExplainedVisionCards;