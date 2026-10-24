import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const DURATION_OPTIONS = [
  {
    id: "7-days",
    tabLabel: "7 Days",
    daysTitle: "7 DAYS",
    badgeLabel: "INTRODUCE",
    description:
      "A focused introduction to wellness, recovery and lifestyle practices.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Calm introductory wellness sanctuary in lush surroundings",
    tag: "FOCUSED RESET",
    features: [
      "Personalized baseline assessment",
      "Daily therapeutic treatments",
      "Introductory lifestyle recalibration",
    ],
  },
  {
    id: "14-days",
    tabLabel: "14 Days",
    daysTitle: "14 DAYS",
    badgeLabel: "IMMERSE",
    description: "More time for structured routines, recovery and immersion.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Deep therapeutic wellness immersion retreat in peaceful nature",
    tag: "OPTIMAL PROTOCOL",
    features: [
      "Complete clinical Ayurveda cycle",
      "Integrated circadian alignment",
      "Sustained physiological restoration",
    ],
  },
  {
    id: "21-days",
    tabLabel: "21 Days",
    daysTitle: "21 DAYS",
    badgeLabel: "CONTINUE",
    description: "Extended time for deeper engagement and continuity.",
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Expansive holistic rejuvenation sanctuary for sustained retreat",
    tag: "DEEP TRANSFORMATION",
    features: [
      "Full classical Panchakarma detox",
      "Comprehensive cellular recalibration",
      "Long-term continuity guidance",
    ],
  },
];
export function ExploreByDurationSection({ onSelectDuration }) {
  return (
    <section
      id="explore-by-duration"
      className="py-20 md:py-28 bg-white border-y border-[#D2D2D7] relative overflow-hidden text-left"
    >
      <div className="darshai-container text-left">
        <div className="text-left max-w-3xl mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#0E4D3A] uppercase mb-2">
            EXPLORE BY DURATION
          </p>
          <h2 className="typography-section-h2 font-bold text-[#111111] tracking-tight mb-2 leading-[1.1]">
            Choose Your Duration.
          </h2>
          <p className="text-base sm:text-lg text-[#2C2C2E] font-semibold">
            Seven, fourteen or twenty-one days. Built around your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DURATION_OPTIONS.map((option, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                track("begin_journey", {
                  source: "explore_duration_card_click",
                  duration: option.tabLabel,
                });
                onSelectDuration(option.tabLabel);
              }}
              className="group relative rounded-[24px] overflow-hidden bg-[#111111] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] border border-[#D2D2D7] flex flex-col justify-end min-h-[420px] sm:min-h-[460px] cursor-pointer hover:border-[#0E4D3A] transition-all duration-300 hover:-translate-y-1"
              key={option.id}
            >
              <img
                src={option.image}
                alt={option.imageAlt}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute top-5 left-5 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A660]" />
                  <span>{option.tag}</span>
                </div>
              </div>
              <div className="relative z-20 text-white p-6 sm:p-8 flex flex-col justify-end gap-3 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#34D399] transition-colors duration-300">
                      {option.daysTitle}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest bg-white/20 text-[#C6A660] border border-white/25">
                      {option.badgeLabel}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                  {option.description}
                </p>
                <div className="space-y-1.5 pt-1">
                  {option.features.map((feat) => (
                    <div
                      className="flex items-center gap-2 text-xs text-white/90 font-medium"
                      key={feat}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      track("begin_journey", {
                        source: "explore_duration_button",
                        duration: option.tabLabel,
                      });
                      onSelectDuration(option.tabLabel);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white font-bold text-xs tracking-wider uppercase shadow-lg transition-all cursor-pointer group/btn hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Select {option.tabLabel} Journey</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ExploreByDurationSection;
