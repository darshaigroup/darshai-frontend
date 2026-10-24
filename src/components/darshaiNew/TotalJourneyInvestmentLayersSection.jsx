import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  ArrowRight,
  FileText,
  Building2,
  ClipboardCheck,
} from "lucide-react";
import Reveal from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const COST_LAYERS = [
  {
    id: "management",
    title: "DARSHAI Management",
    description:
      "Assessment, matching, coordination and the services specified in your proposal.",
    icon: ClipboardCheck,
  },
  {
    id: "programme",
    title: "Wellness-Centre Programme & Accommodation",
    description:
      "Priced separately according to the selected centre, programme, duration and stay arrangements.",
    icon: Building2,
  },
  {
    id: "travel",
    title: "Travel & Third-Party Costs",
    description:
      "Travel bookings, transfers and other applicable external costs, as specified in your proposal. Applicable taxes should also be stated clearly.",
    icon: FileText,
  },
];
export function TotalJourneyInvestmentLayersSection({
  id = "your-journey-investment",
  onNavigate,
}) {
  const [expandedLayer, setExpandedLayer] = useState(null);
  const toggleLayer = (idx) => {
    const nextState = expandedLayer === idx ? null : idx;
    setExpandedLayer(nextState);
    if (nextState !== null) {
      track("explore_environments", { layer: COST_LAYERS[idx].title });
    }
  };
  return (
    <section
      id={id}
      className="py-20 md:py-28 bg-[#111112] border-b border-white/10 relative overflow-hidden text-white"
    >
      <div className="darshai-container w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl text-left mb-12 md:mb-16">
            <p className="typography-eyebrow text-[#34D399] mb-3 uppercase tracking-[0.2em] font-bold text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span>YOUR JOURNEY INVESTMENT</span>
            </p>
            <h2 className="typography-section-h2 text-white leading-[1.08] tracking-tight mb-4">
              A Personalised Proposal. With Clear Inclusions.
            </h2>
            <p className="typography-lead text-[#A1A1A6] font-normal leading-relaxed">
              Your total journey investment is confirmed after assessment,
              matching and centre selection.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 items-start">
          {COST_LAYERS.map((layer, idx) => {
            const IconComponent = layer.icon;
            const isExpanded = expandedLayer === idx;
            return (
              <Reveal delay={idx * 0.1} key={layer.id}>
                <div
                  onClick={() => toggleLayer(idx)}
                  className={`bg-[#1C1C1E] border rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-full shadow-lg transition-all duration-300 group cursor-pointer ${
                    isExpanded
                      ? "border-[#34D399] ring-2 ring-[#34D399]/30 shadow-[0_0_25px_rgba(52,211,153,0.45)]"
                      : "border-white hover:border-[#34D399] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-[#34D399]/10 border border-[#34D399]/20 flex items-center justify-center text-[#34D399] group-hover:bg-[#34D399] group-hover:text-black transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLayer(idx);
                        }}
                        aria-label={
                          isExpanded ? "Shrink details" : "Expand details"
                        }
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-base font-bold transition-all duration-300 cursor-pointer shadow-md ${
                          isExpanded
                            ? "bg-[#34D399] text-black"
                            : "bg-[#27272A] border border-white/20 text-white group-hover:bg-[#34D399] group-hover:text-black group-hover:border-[#34D399]"
                        }`}
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    </div>
                    <h3 className="typography-card-title text-xl sm:text-2xl font-bold text-white group-hover:text-[#34D399] transition-colors leading-snug">
                      {layer.title}
                    </h3>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-3 border-t border-white/10 space-y-3">
                            <p className="typography-body text-[#D2D2D7] font-normal leading-relaxed text-sm sm:text-base">
                              {layer.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#A1A1A6]">
                    <span>Cost Scope</span>
                    <span className="text-[#34D399] font-semibold flex items-center gap-1">
                      <span>{isExpanded ? "COLLAPSE" : "EXPAND"}</span>
                      <span>{isExpanded ? "−" : "+"}</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.3}>
          <div className="bg-[#1C1C1E] border-2 border-white hover:border-[#34D399] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] ring-1 ring-[#34D399]/50 mb-10 text-left relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-full bg-[#34D399]/10 text-[#34D399] flex items-center justify-center shrink-0 border border-[#34D399]/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#34D399] mb-1">
                  TRANSPARENCY STATEMENT
                </p>
                <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                  Your personalised proposal will outline DARSHAI's Management
                  Fee, centre and accommodation charges, applicable taxes and
                  additional costs before you confirm your journey.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                track("begin_journey", { source: "journey_investment_cta" });
                if (onNavigate) {
                  onNavigate("contact");
                } else {
                  window.location.href = "/darshai-new/contact";
                }
              }}
              className="typography-ui-button inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#146049] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group border border-[#34D399]/30"
            >
              <span>REQUEST A PERSONALISED RECOMMENDATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => {
                track("explore_full_centre_click", {
                  source: "journey_investment_section",
                });
                if (onNavigate) {
                  onNavigate("journey-investment");
                } else {
                  window.location.href = "/darshai-new/journey-investment";
                }
              }}
              className="typography-ui-button inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/90 hover:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 border border-white/15 cursor-pointer"
            >
              <span>FULL INVESTMENT DISCLOSURE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default TotalJourneyInvestmentLayersSection;
