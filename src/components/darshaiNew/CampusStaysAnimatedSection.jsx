import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import SmartImage from "./SmartImage";
export const CAMPUS_SENTENCES = [
  {
    id: "cottages",
    category: "Cottage Accommodation",
    badge: "6 UNITS",
    title: "Wooden Pool-Facing Cottages",
    sentence:
      "Handcrafted wooden cottages designed for double occupancy, with direct pool views and warm, comfortable handcrafted interiors.",
  },
  {
    id: "farmhouse",
    category: "Private Family Suite",
    badge: "UP TO 6 GUESTS",
    title: "Three-Bedroom En-Suite Farmhouse",
    sentence:
      "Private three-bedroom farmhouse with en-suite bedrooms and its own dedicated swimming pool for complete family and executive privacy.",
  },
  {
    id: "dining",
    category: "Sattvik Nutrition",
    badge: "ORGANIC TABLE",
    title: "Annamaya Dining Hall",
    sentence:
      "Annamaya dining hall offering freshly prepared, constitution-tailored organic sattvik meals under resident practitioner guidance.",
  },
  {
    id: "therapy",
    category: "Ayurvedic Sanctuary",
    badge: "CLASSICAL CARE",
    title: "Vishuddhi Therapy Centre",
    sentence:
      "Vishuddhi Ayurvedic therapy centre featuring quiet acoustic seclusion, medicated oil cauldrons, and dedicated treatment suites.",
  },
  {
    id: "yoga",
    category: "Mind & Breathwork",
    badge: "MEDITATION SHALA",
    title: "Yaga & Yoga Shala Pavilions",
    sentence:
      "Open-air Yaga & Yoga Shala pavilions set amidst aromatic Samvasa medicinal plant gardens and refreshing coastal microclimates.",
  },
  {
    id: "grounds",
    category: "Campus Grounds",
    badge: "NATURE CONNECTION",
    title: "Restorative Pools & Gokulam",
    sentence:
      "Restorative swimming pools, Gokulam cow-shelter sanctuary, cold-pressed oil facility, and lush coconut palm groves.",
  },
  {
    id: "amenities",
    category: "In-Room Comforts",
    badge: "SUITE INCLUSIONS",
    title: "In-Room Amenities & Suite Inclusions",
    sentence:
      "High-speed Wi-Fi, ergonomic work desk, spacious wardrobe, climate control lounge, and a daily restorative herbal-tea station.",
  },
];
export function CampusStaysAnimatedSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Auto-advancing interval for continuous fade in / fade out looping animation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAMPUS_SENTENCES.length);
    }, 4500); // 4.5 seconds per sentence cycle
    return () => clearInterval(timer);
  }, [isPaused]);
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? CAMPUS_SENTENCES.length - 1 : prev - 1,
    );
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAMPUS_SENTENCES.length);
  };
  const currentItem = CAMPUS_SENTENCES[activeIndex];
  return (
    <section
      id="campus-stays-section"
      className="py-20 sm:py-28 bg-[#F5F5F7] border-b border-[#D2D2D7] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <p className="typography-eyebrow text-[#0E4D3A] mb-3 uppercase tracking-[0.2em] font-bold text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0E4D3A] animate-pulse" />
                <span>09 | CAMPUS & STAYS</span>
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#1D1D1F] leading-[1.08] mb-6">
                Explore where <br />
                <span className="text-[#0E4D3A]">you will stay.</span>
              </h2>
              <p className="text-[#4A4A4A] font-bold text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Set along the coastal belt of Udupi, Kanasu's campus is built
                around biophilic harmony, private wooden stays, and quiet
                restorative spaces.
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#D2D2D7] shadow-lg relative min-h-[260px] flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                  key={currentItem.id}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#E5E5EA] pb-3">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#0E4D3A] bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 px-3 py-1 rounded-full">
                      {currentItem.badge}
                    </span>
                    <span className="text-xs font-bold text-[#777777] uppercase tracking-wider">
                      {currentItem.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
                    {currentItem.title}
                  </h3>
                  <p className="text-[#4A4A4A] font-bold text-base sm:text-lg lg:text-xl leading-relaxed">
                    "{currentItem.sentence}"
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="pt-6 border-t border-[#E5E5EA] flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#0E4D3A] bg-[#0E4D3A]/10 px-3 py-1 rounded-full border border-[#0E4D3A]/20">
                    0{activeIndex + 1} / 07
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {CAMPUS_SENTENCES.map((_, idx) => (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Jump to sentence ${idx + 1}`}
                      className="cursor-pointer py-1 px-0.5 focus:outline-none"
                      key={idx}
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === idx
                            ? "w-7 bg-[#0E4D3A]"
                            : "w-2.5 bg-[#1D1D1F]/20 hover:bg-[#1D1D1F]/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? "Play animation" : "Pause animation"}
                    className="w-8 h-8 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#0E4D3A] hover:text-white flex items-center justify-center text-[#1D1D1F] transition-all cursor-pointer shadow-2xs"
                  >
                    {isPaused ? (
                      <Play className="w-3.5 h-3.5" />
                    ) : (
                      <Pause className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous sentence"
                    className="w-8 h-8 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#0E4D3A] hover:text-white flex items-center justify-center text-[#1D1D1F] transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next sentence"
                    className="w-8 h-8 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#0E4D3A] hover:text-white flex items-center justify-center text-[#1D1D1F] transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden border border-[#D2D2D7] shadow-2xl bg-[#1D1D1F] aspect-[4/3] lg:aspect-[1/1] w-full group">
              <SmartImage
                src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&h=1200&fit=crop&auto=format"
                alt="Kanasu Coastal Campus & Handcrafted Wooden Cottages"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  KANASU CAMPUS & STAYS
                </span>
                <span className="text-xs font-mono font-bold text-[#34D399] bg-[#0E4D3A]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#34D399]/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>UDUPI COASTAL BELT</span>
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <p className="text-base sm:text-lg font-bold drop-shadow-md">
                  Handcrafted Wooden Cottages & Restorative Pool Sanctuary
                </p>
                <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium leading-relaxed">
                  Accredited coastal sanctuary integrating Ayurveda,
                  naturopathy, and biophilic cottage architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CampusStaysAnimatedSection;
