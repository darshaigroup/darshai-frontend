import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UserCheck,
  Building2,
  Target,
  Compass,
  Layers,
  Plane,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";
import SignalBadge from "./SignalBadge";
import { track } from "../../lib/darshaiNew/analytics";
const ENGAGEMENT_STEPS = [
  {
    num: "01",
    stepName: "People",
    shortLabel: "UNDERSTAND PEOPLE",
    title: "Understand People & Individual Baselines",
    detail:
      "Every engagement begins with deep one-on-one intake evaluating physiological baselines, stress levels, and individual executive goals.",
    icon: UserCheck,
  },
  {
    num: "02",
    stepName: "Context",
    shortLabel: "ORGANIZATIONAL CONTEXT",
    title: "Understand Organizational Context",
    detail:
      "We align timing, privacy requirements, and retreat structure with corporate schedules to ensure zero operational friction.",
    icon: Building2,
  },
  {
    num: "03",
    stepName: "Objectives",
    shortLabel: "ASSESS OBJECTIVES",
    title: "Assess Wellness Objectives",
    detail:
      "Establishing clinical and wellness metrics tailored to individual leaders or executive cohorts.",
    icon: Target,
  },
  {
    num: "04",
    stepName: "Environment",
    shortLabel: "IDENTIFY ENVIRONMENTS",
    title: "Identify Suitable Environments",
    detail:
      "Pairing executive requirements with natural environments offering optimal air purity, natural quietude, and privacy.",
    icon: Compass,
  },
  {
    num: "05",
    stepName: "Programme",
    shortLabel: "MATCH PROGRAMS",
    title: "Match Programs & Therapies",
    detail:
      "Curating bespoke therapies, restorative routines, and dietary plans supervised by accredited master practitioners.",
    icon: Layers,
  },
  {
    num: "06",
    stepName: "Journey",
    shortLabel: "COORDINATE JOURNEYS",
    title: "Coordinate Journeys & Logistics",
    detail:
      "Our dedicated concierge handles all travel and sanctuary coordination so executives focus purely on rest and renewal.",
    icon: Plane,
  },
  {
    num: "07",
    stepName: "Continuity",
    shortLabel: "SUPPORT CONTINUITY",
    title: "Support Long-Term Continuity",
    detail:
      "Ensuring restorative gains translate into long-term resilience, decision clarity, and sustainable leadership back in the office.",
    icon: ShieldCheck,
  },
];
export function CorporateEngagementProcessSection({ onNavigate }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-28 lg:py-32 bg-[#07241A] text-white overflow-hidden scroll-mt-12 border-b border-[#0E4D3A]/80"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07241A]/95 via-[#0A2E22]/90 to-[#07241A]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07241A]/60 to-[#07241A]" />
      </div>
      <div className="darshai-container relative z-10">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="typography-eyebrow text-[#C6A660] mb-3 uppercase tracking-[0.2em] font-semibold text-xs flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HOW IT WORKS</span>
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.10] tracking-tight mb-6">
              A Structured Corporate Engagement Process.
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              Guided step-by-step through a progressive 7-stage corporate
              framework — grounded in environmental resonance and clinical
              governance.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="hidden lg:block max-w-6xl mx-auto mb-12">
            <div className="flex items-center justify-between relative px-2">
              {ENGAGEMENT_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStepIndex === idx;
                const isLast = idx === ENGAGEMENT_STEPS.length - 1;
                return (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none shrink-0 relative z-10"
                    >
                      <div
                        className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center relative transition-all duration-300 ${
                          isActive
                            ? "bg-white/15 text-[#34D399] border-2 border-[#C6A660] shadow-[0_0_30px_rgba(198,166,96,0.4)] scale-110 ring-4 ring-[#C6A660]/20"
                            : "bg-white/5 text-white/70 border border-white/20 hover:border-[#C6A660]/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-7 h-7 stroke-[2]" />
                        <span
                          className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center border transition-all ${
                            isActive
                              ? "bg-[#C6A660] text-black border-white"
                              : "bg-black/60 text-white/80 border-white/20"
                          }`}
                        >
                          {step.num}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider mt-3 transition-colors ${isActive ? "text-[#C6A660] font-bold" : "text-white/70 group-hover:text-white"}`}
                      >
                        {step.stepName}
                      </span>
                    </button>
                    {!isLast && (
                      <div className="flex-1 flex items-center justify-center mx-1 sm:mx-2 relative">
                        <div className="w-full h-[2px] bg-gradient-to-r from-[#C6A660]/30 via-[#C6A660] to-[#C6A660]/30 relative overflow-hidden rounded-full">
                          <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-90"
                          />
                        </div>
                        <div className="absolute w-7 h-7 rounded-full bg-[#041A13] border border-[#C6A660]/60 flex items-center justify-center text-[#C6A660] shadow-[0_0_12px_rgba(198,166,96,0.35)] shrink-0 z-10">
                          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[28px] p-8 sm:p-10 border border-[#C6A660]/60 bg-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(198,166,96,0.2)] relative overflow-hidden"
                  key={activeStepIndex}
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#C6A660] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {ENGAGEMENT_STEPS[activeStepIndex].num}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {ENGAGEMENT_STEPS[activeStepIndex].title}
                      </h3>
                    </div>
                    <SignalBadge variant="dark" dot>
                      {ENGAGEMENT_STEPS[activeStepIndex].shortLabel}
                    </SignalBadge>
                  </div>
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                    {ENGAGEMENT_STEPS[activeStepIndex].detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
        <div className="block lg:hidden max-w-md mx-auto">
          {ENGAGEMENT_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            const isLast = idx === ENGAGEMENT_STEPS.length - 1;
            return (
              <>
                <div
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-[24px] p-6 border transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-md ${
                    isActive
                      ? "bg-white/15 border-[#C6A660] shadow-[0_0_25px_rgba(198,166,96,0.25)] ring-1 ring-[#C6A660]/40"
                      : "bg-black/30 border-white/15 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 relative transition-all ${
                        isActive
                          ? "bg-white/20 text-[#34D399] border-2 border-[#C6A660]"
                          : "bg-white/5 text-white/80 border border-white/20"
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[2]" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C6A660] text-black text-[9px] font-mono font-bold flex items-center justify-center">
                        {step.num}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-display text-lg font-bold text-white tracking-tight">
                          {step.stepName}
                        </h3>
                        <span className="text-[10px] font-mono uppercase text-[#34D399] font-semibold bg-[#34D399]/10 px-2 py-0.5 rounded-full border border-[#34D399]/20">
                          STAGE {step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex flex-col items-center justify-center my-3 relative py-1">
                    <div className="w-[2px] h-9 bg-gradient-to-b from-[#C6A660]/40 via-[#C6A660] to-[#C6A660]/40 relative overflow-hidden rounded-full">
                      <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{
                          duration: 2.0,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-[#34D399] to-transparent opacity-90"
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#041A13] border border-[#C6A660]/60 flex items-center justify-center text-[#C6A660] shadow-[0_0_15px_rgba(198,166,96,0.35)] -mt-0.5 shrink-0">
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <Reveal>
          <div className="flex justify-center mt-12 sm:mt-16">
            <button
              type="button"
              onClick={() => {
                track("consultation_request", {
                  source: "corporate_engagement_bottom_cta",
                });
                track("begin_journey", {
                  source: "corporate_engagement_bottom_cta",
                });
                onNavigate("contact");
              }}
              className="px-8 py-4 rounded-full bg-[#C6A660] hover:bg-[#b59550] text-black text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>DISCUSS YOUR ENGAGEMENT PROCESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default CorporateEngagementProcessSection;
