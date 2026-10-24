import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const CURATED_PARTNERS = [
  {
    id: "kanasu",
    num: "01",
    shortName: "KANASU",
    fullName: "Kanasu Wellness",
    environmentType: "Coastal | Nature-led | Integrated wellness",
    location: "Udupi, Karnataka · Ayurveda · Naturopathy · Yoga",
    description:
      "A coastal, nature-led campus featuring doctor-supervised personalised programmes and dedicated spaces for Ayurvedic therapies, yoga, meditation, and sound-based relaxation.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Kanasu Wellness coastal sanctuary",
  },
  {
    id: "chithrakoota",
    num: "02",
    shortName: "CHITHRAKOOTA",
    fullName: "Chithrakoota Ayurveda",
    environmentType: "Heritage Wellness Environment",
    location:
      "Aloor, Kundapur, Udupi District, Karnataka · Ayurveda · Panchakarma",
    description:
      "An 18-acre green campus with over 150 medicinal plant varieties, an in-house Ayurvedic pharmacy, a Desi cow farm, and daily yoga and meditation. Residential Panchakarma programmes range from 7 to 21 days.",
    image:
      "https://images.unsplash.com/photo-1512290900673-70020088825d?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Chithrakoota Ayurveda authentic traditional sanctuary",
  },
  {
    id: "shathayu",
    num: "03",
    shortName: "SHATHAYU",
    fullName: "Shathayu Retreat",
    environmentType: "Urban Wellness + Nature",
    location:
      "Avathi, Devanahalli, Bengaluru, Karnataka · Ayurveda · Panchakarma · Yoga · Naturopathy",
    description:
      "A serene retreat surrounded by greenery, hills, and a lake, featuring dedicated therapy spaces, a yoga pavilion, and spiritual gardens.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Shathayu Retreat serene landscape",
  },
];
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : dir < 0 ? "100%" : 0,
    opacity: 1,
  }),
};
export function CuratedPartnersShowcaseSection({ onNavigate }) {
  const [[activePartnerIndex, direction], setPartnerSlide] = useState([0, 0]);
  const tabButtonRefs = useRef([]);
  const isDraggingRef = useRef(false);
  const currentPartner = CURATED_PARTNERS[activePartnerIndex];
  const navigateToPartner = (newIndex) => {
    if (newIndex === activePartnerIndex) return;
    const newDir = newIndex > activePartnerIndex ? 1 : -1;
    setPartnerSlide([newIndex, newDir]);
    track("centre_view", { centre: CURATED_PARTNERS[newIndex].fullName });
    tabButtonRefs.current[newIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  const handleNext = () => {
    const nextIdx = (activePartnerIndex + 1) % CURATED_PARTNERS.length;
    setPartnerSlide([nextIdx, 1]);
    track("centre_view", {
      action: "next",
      centre: CURATED_PARTNERS[nextIdx].fullName,
    });
    tabButtonRefs.current[nextIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  const handlePrev = () => {
    const prevIdx =
      (activePartnerIndex - 1 + CURATED_PARTNERS.length) %
      CURATED_PARTNERS.length;
    setPartnerSlide([prevIdx, -1]);
    track("centre_view", {
      action: "prev",
      centre: CURATED_PARTNERS[prevIdx].fullName,
    });
    tabButtonRefs.current[prevIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <section
      id="curated-partners"
      className="py-20 md:py-28 bg-[#18181A] text-white border-y border-white/10 relative overflow-hidden text-left"
    >
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#0E4D3A]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="darshai-container relative z-10 text-left">
        <div className="text-left max-w-3xl mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#C6A660] uppercase mb-2">
            CURATED WELLNESS PARTNERS
          </p>
          <h2 className="typography-section-h2 font-bold text-white tracking-tight mb-2 leading-[1.1]">
            Explore Curated Wellness Centres
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal">
            Carefully selected wellness environments across India.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 scrollbar-none border-b border-white/15">
            {CURATED_PARTNERS.map((partner, idx) => {
              const isActive = activePartnerIndex === idx;
              return (
                <button
                  type="button"
                  ref={(el) => {
                    tabButtonRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    navigateToPartner(idx);
                  }}
                  className={`relative px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? "bg-white text-[#111111] shadow-lg border border-white scale-[1.02]"
                      : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                  key={partner.id}
                >
                  <span
                    className={`text-[11px] font-mono font-bold ${isActive ? "text-[#0E4D3A]" : "text-[#C6A660]"}`}
                  >
                    {partner.num}
                  </span>
                  <span className="font-sans font-bold tracking-wider">
                    {partner.shortName}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activePartnerIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-white/60 font-medium pt-3">
            <span className="hidden sm:inline">
              Select a centre or swipe left/right to explore verified
              sanctuaries
            </span>
            <span className="sm:hidden">Swipe or tap to explore centres</span>
            <span className="font-bold text-[#C6A660]">
              0{activePartnerIndex + 1} / 03 Verified Sanctuaries
            </span>
          </div>
        </div>
        <div className="relative flex items-center gap-2 sm:gap-4 md:gap-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous curated centre"
            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white hover:bg-[#0E4D3A] text-[#111111] hover:text-white border border-white/30 hover:border-[#0E4D3A] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer z-30"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <div className="flex-1 min-w-0 relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#111111] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white hover:border-[#34D399] transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] group/cardContainer">
            <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                      mass: 0.8,
                    },
                    opacity: { duration: 0.25 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => {
                    isDraggingRef.current = true;
                  }}
                  onDragEnd={(_e, { offset, velocity }) => {
                    setTimeout(() => {
                      isDraggingRef.current = false;
                    }, 120);
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -100 || offset.x < -60) {
                      handleNext();
                    } else if (swipe > 100 || offset.x > 60) {
                      handlePrev();
                    }
                  }}
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    track("centre_view", {
                      source: "card_click",
                      centre: currentPartner.fullName,
                    });
                    onNavigate("centres");
                  }}
                  className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 sm:p-10 lg:p-14 cursor-pointer select-none group/card"
                  key={currentPartner.id}
                >
                  <img
                    src={currentPartner.image}
                    alt={currentPartner.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.82] contrast-[1.05] pointer-events-none transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 pointer-events-none transition-opacity duration-300 group-hover/card:opacity-90" />
                  <div className="absolute top-5 sm:top-8 left-5 sm:left-8 z-20 pointer-events-none flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A660]" />
                      <span>{currentPartner.location}</span>
                    </div>
                  </div>
                  <div className="absolute top-5 sm:top-8 right-5 sm:right-8 z-20 pointer-events-none hidden sm:block">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0E4D3A]/90 text-white backdrop-blur-md border border-white/30 shadow-lg transition-transform duration-300 group-hover/card:scale-105">
                      <span>CLICK CARD TO VIEW CENTRE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="relative z-20 text-white max-w-3xl flex flex-col items-start gap-4 pointer-events-none">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C6A660]">
                        <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse" />
                        <span>{currentPartner.environmentType}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase group-hover/card:text-[#34D399] transition-colors duration-300">
                        {currentPartner.fullName}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-white/85 font-normal leading-relaxed">
                        {currentPartner.description}
                      </p>
                    </div>
                    <div className="pt-2 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          track("centre_view", {
                            source: "view_centre_button",
                            centre: currentPartner.fullName,
                          });
                          onNavigate("centres");
                        }}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#111111] hover:bg-[#0E4D3A] hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all cursor-pointer group/btn hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>VIEW CENTRE DETAILS</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                {CURATED_PARTNERS.map((_, idx) => (
                  <button
                    type="button"
                    onClick={() => navigateToPartner(idx)}
                    aria-label={`Go to centre ${idx + 1}`}
                    className={`transition-all rounded-full cursor-pointer ${
                      activePartnerIndex === idx
                        ? "w-5 h-2 bg-[#C6A660]"
                        : "w-2 h-2 bg-white/40 hover:bg-white/70"
                    }`}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next curated centre"
            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white hover:bg-[#0E4D3A] text-[#111111] hover:text-white border border-white/30 hover:border-[#0E4D3A] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer z-30"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              track("explore_all_centres", {
                source: "curated_partners_bottom_cta",
              });
              onNavigate("centres");
            }}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#0E4D3A] text-white hover:bg-[#0A382A] font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20"
          >
            <span>EXPLORE ALL WELLNESS CENTRES</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
export default CuratedPartnersShowcaseSection;
