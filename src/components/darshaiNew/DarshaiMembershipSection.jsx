import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Crown } from "lucide-react";
import { Reveal } from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const MEMBERSHIP_PLANS = [
  {
    id: "basic",
    title: "BASIC",
    duration: "6 Months",
    subtitle: "For structured wellness maintenance.",
    features: [
      "Regular check-ins",
      "Maintenance planning",
      "Scheduled clinical review",
      "Diet / healthy-practice updates",
      "Platform tracking",
      "Periodic progress review",
    ],
    ctaText: "EXPLORE BASIC →",
  },
  {
    id: "gold",
    title: "GOLD",
    duration: "9 Months",
    badge: "RECOMMENDED",
    badgeColor: "bg-[#0E4D3A] text-white",
    subtitle: "Includes everything in Basic +",
    features: [
      "More frequent follow-up",
      "Personalised planning",
      "Clinical review",
      "Priority coordination",
      "Quarterly comprehensive review",
    ],
    ctaText: "EXPLORE GOLD →",
  },
  {
    id: "executive",
    title: "EXECUTIVE",
    duration: "12 Months",
    badge: "DARSHAI EXECUTIVE",
    badgeColor: "bg-[#C6A660] text-black font-extrabold",
    isExecutive: true,
    subtitle: "Full dedicated 1-year continuous journey management.",
    features: [
      "Dedicated journey manager",
      "Priority coordination",
      "Longitudinal wellness tracking",
      "Personalised diet & lifestyle planning",
      "Scheduled clinical reviews",
      "Quarterly comprehensive reviews",
      "Priority centre / programme coordination",
    ],
    ctaText: "DISCOVER EXECUTIVE →",
  },
];
export function DarshaiMembershipSection({
  id = "membership-plans",
  onNavigate,
}) {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const handlePlanSelect = (planId) => {
    track("membership_plan_select", { planId });
    onNavigate("contact");
  };
  return (
    <section
      id={id}
      className="section-editorial py-24 md:py-36 bg-[#1D1D1F] border-b border-white/10 relative overflow-hidden text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/25 via-[#34D399]/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="darshai-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Reveal>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#34D399] bg-[#0E4D3A]/50 px-4 py-1.5 rounded-full border border-[#34D399]/30 mb-4 inline-block">
              CONTINUE WITH DARSHAI
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="typography-section-h2 text-white tracking-tight font-semibold mb-4">
              Stay Connected to Your Wellness Journey.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="typography-body text-white/80 font-normal leading-relaxed">
              Long-term wellness requires continuous alignment and professional
              guidance. Choose a membership plan tailored to your long-term
              health and lifestyle commitments.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-[1280px] mx-auto">
          {MEMBERSHIP_PLANS.map((plan, idx) => {
            const isExecutive = plan.isExecutive;
            const isHovered = hoveredPlan === plan.id;
            const colSpanClass = isExecutive
              ? "md:col-span-12 lg:col-span-5"
              : plan.id === "gold"
                ? "md:col-span-6 lg:col-span-4"
                : "md:col-span-6 lg:col-span-3";
            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`${colSpanClass} rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative transition-all duration-300 border ${
                  isExecutive
                    ? "bg-gradient-to-b from-[#162721] to-[#0D1814] border-[#34D399] shadow-2xl lg:-translate-y-2 ring-1 ring-[#34D399]/30 hover:shadow-[0_24px_50px_rgba(52,211,153,0.25)] hover:border-[#34D399] overflow-visible hover:-translate-y-[14px] lg:hover:-translate-y-4"
                    : "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] overflow-hidden hover:-translate-y-2"
                } ${isHovered && !isExecutive ? "border-[#34D399]/40 ring-1 ring-[#34D399]/20" : ""}`}
                key={plan.id}
              >
                {isExecutive && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C6A660] text-black px-4.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase shadow-md z-30 whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                    EXECUTIVE MEMBERSHIP
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                          isExecutive
                            ? "text-[#C6A660] bg-[#C6A660]/15 border-[#C6A660]/30"
                            : "text-white/80 bg-white/10 border-white/15"
                        }`}
                      >
                        {plan.duration}
                      </span>
                      {plan.badge && !isExecutive && (
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-black bg-[#C6A660] font-semibold shadow-xs">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {isExecutive && (
                      <Crown className="w-5 h-5 text-[#C6A660]" />
                    )}
                    <h3
                      className={`typography-card-title font-semibold ${isExecutive ? "text-white" : "text-white/95"}`}
                    >
                      {plan.title}
                    </h3>
                  </div>
                  <div
                    className={`p-4 sm:p-5 rounded-2xl mb-6 border transition-colors duration-300 ${
                      isExecutive
                        ? "bg-[#0E4D3A]/40 border-[#34D399]/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="font-display text-lg sm:text-xl font-bold tracking-tight mb-1 text-[#34D399]">
                      {plan.duration} Engagement
                    </div>
                    {plan.subtitle && (
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-relaxed ${isExecutive ? "text-white/90" : "text-white/70"}`}
                      >
                        {plan.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="border-t border-white/10 pt-5 mb-6">
                    <p
                      className={`text-[11px] font-mono font-bold uppercase tracking-widest mb-3 ${isExecutive ? "text-[#C6A660]" : "text-[#34D399]"}`}
                    >
                      WHAT'S INCLUDED
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feat, fIdx) => (
                        <motion.li
                          animate={{
                            x: isHovered ? 2 : 0,
                            opacity: isHovered ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.2, delay: fIdx * 0.02 }}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-white/80"
                          key={feat}
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${isExecutive ? "text-[#C6A660]" : "text-[#34D399]"}`}
                          />
                          <span
                            className={
                              isExecutive ? "text-white/90" : "text-white/80"
                            }
                          >
                            {feat}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3.5 px-5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md group ${
                      isExecutive
                        ? "bg-[#C6A660] text-black hover:bg-[#D4B773] shadow-[#C6A660]/30 font-bold"
                        : "bg-[#0E4D3A] text-white hover:bg-[#12634B]"
                    }`}
                  >
                    <span>{plan.ctaText.replace(" →", "")}</span>
                    <span
                      className="group-hover:translate-x-1.5 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default DarshaiMembershipSection;
