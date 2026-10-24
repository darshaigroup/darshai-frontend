import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const INVESTMENT_COLUMNS = [
  {
    id: "executive-reset",
    badge: "PROTOCOL 01",
    title: "01 — EXECUTIVE RESET",
    duration: "7–14 Days",
    price: "₹90,999*",
    managementLabel: "DARSHAI Management / person",
    description:
      "Targeted physiological and cognitive recovery engineered for decision makers.",
    includedServices: [
      "Registration & Onboarding",
      "Wellness Assessment",
      "Wellness Readiness & Risk Assessment",
      "Geo-Wellness Consultation",
      "Protocol Identification",
      "Retreat / Centre Matching",
      "Recommendation",
      "Booking & Coordination",
      "Platform Access",
      "Travel Guidance",
      "Arrival Planning",
      "Transfer Coordination",
      "Pre-Arrival Instructions",
      "Standard Follow-Up",
    ],
    ctaText: "EXPLORE EXECUTIVE RESET →",
  },
  {
    id: "deep-detox",
    badge: "PROTOCOL 02",
    title: "02 — DEEP DETOX",
    duration: "14–21 Days",
    price: "₹90,999*",
    managementLabel: "DARSHAI Management / person",
    description:
      "Metabolic and cellular purification combining clinical monitoring with Panchakarma.",
    includedServices: [
      "Registration & Onboarding",
      "Wellness Assessment",
      "Wellness Readiness & Risk Assessment",
      "Geo-Wellness Consultation",
      "Protocol Identification",
      "Retreat / Centre Matching",
      "Recommendation",
      "Booking & Coordination",
      "Platform Access",
      "Travel Guidance",
      "Arrival Planning",
      "Transfer Coordination",
      "Pre-Arrival Instructions",
      "Standard Follow-Up",
    ],
    ctaText: "EXPLORE DEEP DETOX →",
  },
  {
    id: "longevity",
    badge: "PROTOCOL 03",
    title: "03 — LONGEVITY",
    duration: "7–21 Days",
    price: "₹90,999*",
    managementLabel: "DARSHAI Management / person",
    description:
      "Cellular rejuvenation and sub-alpine oxygen adaptation for healthspan optimization.",
    includedServices: [
      "Registration & Onboarding",
      "Wellness Assessment",
      "Wellness Readiness & Risk Assessment",
      "Geo-Wellness Consultation",
      "Protocol Identification",
      "Retreat / Centre Matching",
      "Recommendation",
      "Booking & Coordination",
      "Platform Access",
      "Travel Guidance",
      "Arrival Planning",
      "Transfer Coordination",
      "Pre-Arrival Instructions",
      "Standard Follow-Up",
    ],
    ctaText: "EXPLORE LONGEVITY →",
  },
  {
    id: "sovereign",
    badge: "PROTOCOL 04",
    specialBadge: "MOST PERSONALIZED",
    title: "04 — SOVEREIGN",
    duration: "7–12 Days",
    price: "₹1,49,999*",
    managementLabel: "Full DARSHAI Journey Management / person",
    description:
      "The definitive bespoke journey with full 360° multi-layer active journey management.",
    isElevated: true,
    includedServices: [
      "Registration & Onboarding",
      "Wellness Assessment",
      "Wellness Readiness & Risk Assessment",
      "Geo-Wellness Consultation",
      "Protocol Identification",
      "Retreat / Centre Matching",
      "Recommendation",
      "Booking & Coordination",
      "Platform Access",
      "Travel Guidance",
      "Arrival Planning",
      "Transfer Coordination",
      "Pre-Arrival Instructions",
      "Full Journey Management",
      "Active Journey Support",
      "Issue Escalation Coordination",
      "Post-Journey Review",
      "Continuity Planning",
      "Extended Wellness Tracking",
    ],
    ctaText: "DISCOVER SOVEREIGN →",
  },
];
export function JourneyInvestmentSection({
  id = "journey-investment",
  onNavigate,
}) {
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [expandedMobileServices, setExpandedMobileServices] = useState({});
  const toggleMobileServices = (colId) => {
    setExpandedMobileServices((prev) => ({
      ...prev,
      [colId]: !prev[colId],
    }));
  };
  return (
    <section
      id={id}
      className="section-editorial py-24 md:py-36 bg-[#1D1D1F] border-b border-white/10 relative overflow-hidden text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/25 via-[#34D399]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="darshai-container relative z-10">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <p className="typography-eyebrow text-[#C6A660] mb-3 uppercase tracking-[0.2em] font-bold text-xs">
              JOURNEY INVESTMENT
            </p>
            <h2 className="typography-section-h2 text-white leading-[1.08] tracking-tight mb-4">
              One DARSHAI Layer. <br />
              <span className="text-[#34D399]">Four Ways to Journey.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-normal">
              Every journey begins with a DARSHAI assessment and matching
              process. Your centre and programme are selected according to
              suitability, requirements and availability.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 items-stretch mb-12">
          {INVESTMENT_COLUMNS.map((col, idx) => {
            const isSovereign = col.isElevated;
            const isHovered = hoveredColumn === col.id;
            const isMobileExpanded = expandedMobileServices[col.id] ?? false;
            // Sovereign enters last in animation sequence
            const entranceDelay = isSovereign ? 0.4 : 0.1 * (idx + 1);
            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: entranceDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredColumn(col.id)}
                onMouseLeave={() => setHoveredColumn(null)}
                className={`rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 border ${
                  isSovereign
                    ? "bg-gradient-to-b from-[#162721] to-[#0D1814] border-[#34D399] shadow-2xl lg:-translate-y-2 ring-1 ring-[#34D399]/30 hover:shadow-[0_24px_50px_rgba(52,211,153,0.25)] hover:border-[#34D399] overflow-visible hover:-translate-y-[14px] lg:hover:-translate-y-4"
                    : "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] overflow-hidden hover:-translate-y-2"
                } ${isHovered && !isSovereign ? "border-[#34D399]/40 ring-1 ring-[#34D399]/20" : ""}`}
                key={col.id}
              >
                {isSovereign && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C6A660] text-black px-4.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase shadow-md z-30 whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                    MOST POPULAR
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                          isSovereign
                            ? "text-[#34D399] bg-[#0E4D3A]/40 border-[#34D399]/30"
                            : "text-white/80 bg-white/10 border-white/15"
                        }`}
                      >
                        {col.badge}
                      </span>
                      {col.specialBadge && !isSovereign && (
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#C6A660] px-3 py-1.5 rounded-full font-semibold shadow-xs">
                          {col.specialBadge}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ml-auto ${
                        isSovereign
                          ? "text-[#34D399] bg-[#0E4D3A]/40 border-[#34D399]/30"
                          : "text-white/85 bg-white/5 border-white/10"
                      }`}
                    >
                      {col.duration}
                    </span>
                  </div>
                  <h3
                    className={`typography-card-title font-semibold mb-3 ${isSovereign ? "text-white" : "text-white/95"}`}
                  >
                    {col.title}
                  </h3>
                  <div
                    className={`p-4 rounded-2xl mb-6 border transition-colors duration-300 ${
                      isSovereign
                        ? "bg-[#0E4D3A]/40 border-[#34D399]/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
                      <span
                        className={`transition-all duration-300 ${
                          isSovereign
                            ? isHovered
                              ? "text-[#34D399] drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                              : "text-[#C6A660]"
                            : isHovered
                              ? "text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                              : "text-white"
                        }`}
                      >
                        {col.price}
                      </span>
                    </div>
                    <p
                      className={`text-xs font-semibold leading-snug ${isSovereign ? "text-white/80" : "text-white/70"}`}
                    >
                      {col.managementLabel}
                    </p>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${isSovereign ? "text-white/70" : "text-white/60"}`}
                  >
                    {col.description}
                  </p>
                  <div className="hidden sm:block border-t border-white/10 pt-5 mb-6">
                    <p
                      className={`text-[11px] font-mono font-bold uppercase tracking-widest mb-3 ${isSovereign ? "text-[#C6A660]" : "text-[#34D399]"}`}
                    >
                      INCLUDED SERVICES
                    </p>
                    <ul className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
                      {col.includedServices.map((service) => (
                        <li
                          className="flex items-start gap-2.5 text-xs"
                          key={service}
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${isSovereign ? "text-[#C6A660]" : "text-[#34D399]"}`}
                          />
                          <span
                            className={
                              isSovereign ? "text-white/90" : "text-white/80"
                            }
                          >
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="block sm:hidden border-t border-white/10 pt-4 mb-4">
                    <button
                      type="button"
                      onClick={() => toggleMobileServices(col.id)}
                      className={`w-full flex items-center justify-between text-xs font-bold tracking-wider uppercase py-2 transition-colors cursor-pointer ${isSovereign ? "text-[#C6A660]" : "text-[#34D399]"}`}
                    >
                      <span>
                        {isMobileExpanded
                          ? "HIDE INCLUDED SERVICES −"
                          : "VIEW INCLUDED SERVICES +"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isMobileExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden pt-2"
                        >
                          <ul className="space-y-2 pb-2">
                            {col.includedServices.map((service) => (
                              <li
                                className="flex items-start gap-2 text-xs"
                                key={service}
                              >
                                <Check
                                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSovereign ? "text-[#C6A660]" : "text-[#34D399]"}`}
                                />
                                <span
                                  className={
                                    isSovereign
                                      ? "text-white/90"
                                      : "text-white/80"
                                  }
                                >
                                  {service}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      track("journey_investment_select", { protocol: col.id });
                      onNavigate("contact");
                    }}
                    className={`w-full py-3 px-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs group ${
                      isSovereign
                        ? "bg-[#C6A660] text-black hover:bg-[#D4B773] shadow-[#C6A660]/30 font-bold"
                        : "bg-[#0E4D3A] text-white hover:bg-[#12634B]"
                    }`}
                  >
                    <span>{col.ctaText}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto text-center pt-6 border-t border-white/10">
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-normal">
              Management fee is per person, per journey. Centre programme
              charges and accommodation are priced separately. Travel guidance
              and coordination are included; actual travel and third-party costs
              are not.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default JourneyInvestmentSection;
