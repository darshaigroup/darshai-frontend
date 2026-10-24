import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import Reveal from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
export const JOURNEY_STAGES = [
  {
    id: "stage-1",
    step: 0,
    num: "01",
    phase: "PRE-DEPARTURE",
    title: "Journey Planning",
    headline: "Translating Health Baselines into an Actionable Itinerary.",
    description:
      "Before selecting any sanctuary, DARSHAI synthesizes your health baseline, biological pacing, and clinical priorities into a cohesive journey roadmap.",
    deliverables: [
      "Clinical Goal Mapping & Intake Review",
      "Biological & Seasonal Environment Fit",
      "Custom Journey Roadmap & Pacing Architecture",
    ],
    timing: "3-6 Weeks Prior",
  },
  {
    id: "stage-2",
    step: 1,
    num: "02",
    phase: "PRE-DEPARTURE",
    title: "Centre Coordination",
    headline: "Direct Clinical Alignment with Sanctuary MDs.",
    description:
      "We interface directly with resident medical directors, ensuring pre-arrival medical prescriptions, dietary plans, and therapeutic suites are reserved in advance.",
    deliverables: [
      "Resident Physician Pre-Consultation",
      "Dietary & Botanical Protocol Pre-Brief",
      "Sanctuary Room & Thermal Suite Allocation",
    ],
    timing: "2-3 Weeks Prior",
  },
  {
    id: "stage-3",
    step: 2,
    num: "03",
    phase: "TRANSIT & ROUTING",
    title: "Travel Guidance",
    headline: "Low-Friction Transit Corridors for Nervous System Protection.",
    description:
      "Long-haul fatigue disrupts physiological adaptation. We curate flight windows, connection buffers, and arrival pacing to protect your circadian rhythm.",
    deliverables: [
      "Optimized Rest Corridors & Flight Schedules",
      "Pre-Flight Circadian Hydration Protocols",
      "Luggage & Medical Documentation Clearance",
    ],
    timing: "1 Week Prior",
  },
  {
    id: "stage-4",
    step: 3,
    num: "04",
    phase: "TRANSIT & ROUTING",
    title: "Airport Transfer Coordination",
    headline: "Private Door-to-Sanctuary Chauffeur Transfers.",
    description:
      "From terminal arrival to the retreat gates, private climate-controlled transfers ensure smooth travel through regional terrain without logistical stress.",
    deliverables: [
      "Private Chauffeur Meet-and-Greet at Terminal",
      "Quiet-Cabin Climate-Controlled Fleet",
      "Real-Time Transit Tracking & Reception Alert",
    ],
    timing: "Day of Arrival",
  },
  {
    id: "stage-5",
    step: 4,
    num: "05",
    phase: "SANCTUARY IMMERSION",
    title: "Arrival Assistance",
    headline: "Frictionless Check-In & Immediate Down-Regulation.",
    description:
      "Skip administrative reception desks. Direct in-suite check-in, restorative botanical tea, and gentle somatic acclimation ease you into recovery.",
    deliverables: [
      "Direct-to-Suite Private Check-In",
      "Welcome Herbal Infusion & Somatic Brief",
      "Same-Day Physician Intake Schedule",
    ],
    timing: "Hours 0 - 6",
  },
  {
    id: "stage-6",
    step: 5,
    num: "06",
    phase: "SANCTUARY IMMERSION",
    title: "Programme Coordination",
    headline: "Daily Therapeutic Adjustments with Medical Staff.",
    description:
      "As your pulse, digestion, and stress markers adapt, DARSHAI coordinates with on-site clinicians to dynamically adjust therapies, herbs, and somatic pacing.",
    deliverables: [
      "Daily Diagnostic Schedule Synchronization",
      "Nutritional & Botanical Protocol Calibration",
      "Therapist Continuity & Modality Oversight",
    ],
    timing: "Days 1 - 14+",
  },
  {
    id: "stage-7",
    step: 6,
    num: "07",
    phase: "ACTIVE RECOVERY",
    title: "Journey Monitoring",
    headline: "Continuous Dedicated Concierge & Clinical Advocate.",
    description:
      "A single dedicated DARSHAI journey manager remains on call throughout your residency, bridging communication between you, the medical team, and your family.",
    deliverables: [
      "24/7 Dedicated Journey Manager Channel",
      "Intermediate Vital Signs & Progress Check",
      "Mid-Stay Comfort & Schedule Refinements",
    ],
    timing: "Throughout Residency",
  },
  {
    id: "stage-8",
    step: 7,
    num: "08",
    phase: "INTEGRATION & SUSTAINMENT",
    title: "Post-Programme Follow-Up",
    headline: "Home Environment Re-Entry & 90-Day Vitality Continuity.",
    description:
      "Healing is lost if re-entry causes immediate relapse. We deliver an integrated home continuity protocol, post-programme doctor follow-up, and quarterly check-ins.",
    deliverables: [
      "Discharge Medical Summary & Diet Plan",
      "30/60/90 Day Clinical Check-In Calls",
      "Home Microclimate & Habit Architecture",
    ],
    timing: "Post-Stay & Beyond",
  },
];
export function JourneyCoordinationTimeline({ onNavigate }) {
  const sectionRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end 40%"],
  });
  // Calculate animated fill of the vertical line
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  // Update the active stage based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * JOURNEY_STAGES.length);
    const clampedIndex = Math.min(
      JOURNEY_STAGES.length - 1,
      Math.max(0, rawIndex),
    );
    setActiveStageIndex(clampedIndex);
  });
  const activeStage = JOURNEY_STAGES[activeStageIndex];
  const handleStageClick = (idx) => {
    setActiveStageIndex(idx);
    track("journey_management_phase_selected", {
      phase: JOURNEY_STAGES[idx].title,
      step: idx + 1,
    });
  };
  return (
    <section
      ref={sectionRef}
      id="trust-governance-section"
      aria-label="Beyond Booking. Complete Journey Coordination."
      className="section-immersive bg-[#1D1D1F] border-b border-white/10 py-20 md:py-28 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0E4D3A]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#C6A660]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="darshai-container relative z-10">
        <Reveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <p
              id="trust-governance-eyebrow"
              className="typography-eyebrow text-[#C6A660] mb-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
              <span>TRUST & GOVERNANCE</span>
            </p>
            <h2
              id="trust-governance-heading"
              className="typography-section-h2 text-white tracking-tight mb-5"
            >
              <span className="block">Beyond Booking.</span>
              <span className="text-[#34D399] block mt-1 sm:mt-2">
                Complete Journey Coordination.
              </span>
            </h2>
            <p className="typography-body-large text-white/80 leading-relaxed max-w-2xl text-lg sm:text-xl font-normal">
              DARSHAI coordinates the journey before, during and after the
              programme.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 bg-[#141416]/80 rounded-[28px] border border-white/15 p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <p className="text-xs font-mono uppercase tracking-wider text-[#C6A660] font-semibold">
                  Journey Timeline
                </p>
              </div>
              <span className="text-xs font-mono text-white/60">
                08 Connected Stages
              </span>
            </div>
            <div className="relative pl-7 sm:pl-8 space-y-2">
              <div className="absolute left-[13px] sm:left-[15px] top-3 bottom-5 w-[2px] bg-white/15 rounded-full" />
              <motion.div
                style={{ scaleY: lineProgress }}
                className="absolute left-[13px] sm:left-[15px] top-3 bottom-5 w-[2px] bg-gradient-to-b from-[#34D399] via-[#34D399] to-[#0E4D3A] shadow-[0_0_12px_#34D399] origin-top rounded-full will-change-transform z-0"
              />
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                const isPassed = activeStageIndex >= idx;
                return (
                  <button
                    type="button"
                    onClick={() => handleStageClick(idx)}
                    className={`group/stage relative w-full text-left p-2.5 sm:p-3 rounded-xl transition-all duration-300 flex items-center gap-3 cursor-pointer focus:outline-none ${
                      isActive
                        ? "bg-[#0E4D3A]/30 border border-[#34D399]/50 shadow-[0_0_20px_-4px_rgba(52,211,153,0.3)]"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                    key={stage.id}
                  >
                    <span
                      className={`absolute -left-7 sm:-left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center ${
                        isActive
                          ? "bg-[#34D399] border-[#141416] ring-4 ring-[#34D399]/40 shadow-[0_0_12px_#34D399] scale-125"
                          : isPassed
                            ? "bg-[#0E4D3A] border-[#34D399] ring-2 ring-[#0E4D3A]"
                            : "bg-[#141416] border-white/30"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A1612]" />
                      )}
                    </span>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-md font-semibold shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#34D399] text-[#0A1612]"
                          : isPassed
                            ? "bg-white/15 text-white"
                            : "bg-white/5 text-white/40"
                      }`}
                    >
                      {stage.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs sm:text-sm font-medium transition-colors truncate ${
                          isActive
                            ? "text-[#34D399] font-bold"
                            : isPassed
                              ? "text-white"
                              : "text-white/60 group-hover/stage:text-white/80"
                        }`}
                      >
                        {stage.title}
                      </p>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        {stage.timing}
                      </p>
                    </div>
                    {isActive && (
                      <ArrowRight className="w-4 h-4 text-[#34D399] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Scroll page or click stage</span>
              <span className="text-[#34D399] font-semibold">
                Active: {activeStage.num}/08
              </span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative bg-[#141416] rounded-[28px] md:rounded-[32px] border border-white/20 p-8 sm:p-10 md:p-12 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#0E4D3A]/40 blur-[90px] pointer-events-none" />
              <div className="absolute top-4 right-8 text-8xl md:text-9xl font-display font-bold text-white/[0.04] select-none pointer-events-none">
                {activeStage.num}
              </div>
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E4D3A]/80 border border-[#34D399]/40 text-xs font-mono font-semibold text-[#34D399] tracking-wider uppercase shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    <span>{activeStage.phase}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                    STAGE {activeStage.num} OF 08
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#C6A660]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeStage.timing}</span>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 space-y-6"
                  key={activeStage.id}
                >
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-3">
                      {activeStage.title}
                    </h3>
                    <p className="text-lg sm:text-xl font-medium text-[#C6A660] leading-snug">
                      {activeStage.headline}
                    </p>
                  </div>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                    {activeStage.description}
                  </p>
                  <div className="pt-6 border-t border-white/15 space-y-3">
                    <p className="text-xs font-mono uppercase tracking-widest text-white/50 font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>Coordinated Touchpoints & Deliverables:</span>
                    </p>
                    <div className="space-y-2.5">
                      {activeStage.deliverables.map((item, idx) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08, duration: 0.3 }}
                          className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3.5 hover:bg-white/[0.07] transition-colors"
                          key={item}
                        >
                          <div className="w-6 h-6 rounded-full bg-[#0E4D3A]/60 border border-[#34D399]/40 text-[#34D399] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm sm:text-base text-white/90 font-medium">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                      <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                      <span>100% Verified Governance Standard</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        track("journey_management_cta_clicked", {
                          source: "journey_timeline",
                          stage: activeStage.title,
                        });
                        onNavigate("contact");
                      }}
                      className="darshai-btn-primary text-xs sm:text-sm py-3 px-6 cursor-pointer"
                    >
                      <span>BEGIN WITH THIS STAGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default JourneyCoordinationTimeline;
