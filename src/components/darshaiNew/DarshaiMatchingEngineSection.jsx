import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import {
  ClipboardCheck,
  Building2,
  Compass,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import SmartImage from "./SmartImage";
import SignalBadge from "./SignalBadge";
import { track } from "../../lib/darshaiNew/analytics";
const SERVICE_GROUPS = [
  {
    id: "assessment-matching",
    step: "01",
    label: "Assessment & Matching",
    desc: "Wellness assessment, consultation and suitable programme recommendations.",
    icon: ClipboardCheck,
    image:
      "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=1200&h=1200&fit=crop&auto=format",
    imageCaption: "Individual Assessment & Suitability Engine",
    recommendedProtocol: "Wellness Consultation & Assessment",
    recommendedEnvironment: "Personalised Programme Matching",
  },
  {
    id: "centre-booking",
    step: "02",
    label: "Centre & Booking Coordination",
    desc: "Matched-centre selection, availability checks, booking coordination and confirmation.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=1200&fit=crop&auto=format",
    imageCaption: "Curated Sanctuary & Reservation Desk",
    recommendedProtocol: "Direct Centre Allocation",
    recommendedEnvironment: "Seamless Booking Coordination",
  },
  {
    id: "preparation-support",
    step: "03",
    label: "Preparation & Journey Support",
    desc: "Pre-arrival instructions, travel guidance, arrival planning and agreed coordination.",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=1200&fit=crop&auto=format",
    imageCaption: "Pre-Arrival & Travel Coordination",
    recommendedProtocol: "Journey Preparation Protocol",
    recommendedEnvironment: "Door-to-Door Travel Care",
  },
  {
    id: "followup-continuity",
    step: "04",
    label: "Follow-Up & Continuity",
    desc: "Post-journey review, follow-up and ongoing wellness guidance according to the agreed service scope.",
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=1200&fit=crop&auto=format",
    imageCaption: "Post-Stay Continuity & Long-Term Guidance",
    recommendedProtocol: "Continuous Wellness Guidance",
    recommendedEnvironment: "Integrated Aftercare Support",
  },
];
export function DarshaiMatchingEngineSection({
  onNavigate,
  id = "darshai-matching-engine",
}) {
  const containerRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  // Track vertical scroll across the interactive section (220vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Calculate dynamic step index (0 to 3) based on scroll
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const step = Math.min(
        SERVICE_GROUPS.length - 1,
        Math.floor(latest * SERVICE_GROUPS.length),
      );
      setActiveStepIndex(step);
    });
  }, [scrollYProgress]);
  const activeGroup = SERVICE_GROUPS[activeStepIndex];
  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[220vh] lg:min-h-[260vh] bg-white border-b border-[#D2D2D7] text-[#1D1D1F]"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between lg:justify-center py-4 sm:py-8 lg:py-12 overflow-y-auto lg:overflow-hidden scrollbar-none">
        <div className="darshai-container w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="max-w-3xl mb-4 sm:mb-8 text-left">
            <p className="typography-eyebrow text-[#0E4D3A] mb-2 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#0E4D3A] animate-pulse" />
              <span>JOURNEY MANAGEMENT</span>
            </p>
           <h2 className="text-[48px] sm:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-tight mb-2">
            <span className="block text-[#1D1D1F]">
              More Than a
            </span>
            <span className="block text-[#0E4D3A]">
              Programme Booking.
            </span>
          </h2>
            <p className="typography-lead text-[#4A4A4A] font-normal leading-relaxed">
              DARSHAI coordinates the journey around the programme—not just the
              stay.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-[22px] sm:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#111112] text-white p-5 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[260px] sm:min-h-[380px] lg:min-h-[480px] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/4] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full will-change-transform"
                    key={activeStepIndex}
                  >
                    <SmartImage
                      src={activeGroup.image}
                      alt={activeGroup.label}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <SignalBadge variant="dark" dot>
                    Journey Coordination
                  </SignalBadge>
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {activeGroup.imageCaption}
                  </span>
                </div>
                <div className="relative z-10 space-y-2 sm:space-y-3 pt-3 border-t border-white/20 mt-auto">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                     
                      <p className="text-base sm:text-xl font-display font-semibold text-white">
                        {activeGroup.recommendedProtocol}
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-white/90 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 hidden sm:inline-block">
                      {activeGroup.recommendedEnvironment}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    {/* <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/80 font-mono">
                      <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                      <span>End-to-End Governance</span>
                    </div> */}
                    {/* {onNavigate && (
                      <button
                        type="button"
                        onClick={() => {
                          track("begin_journey", {
                            source: `journey_management_${activeGroup.id}`,
                          });
                          onNavigate("contact");
                        }}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#34D399] hover:bg-[#10B981] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer group shrink-0"
                      >
                        <span>DISCUSS JOURNEY</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D2D2D7]/70 text-xs font-mono uppercase tracking-wider text-[#6E6E73]">
                {/* <span>Journey Service Scope</span>
                <span className="font-bold text-[#0E4D3A]">
                  Group 0{activeStepIndex + 1} / 04
                </span> */}
              </div>
             {SERVICE_GROUPS.map((group, idx) => {
  const isCurrent = activeStepIndex === idx;
  const isPassed = activeStepIndex > idx;
  const IconComponent = group.icon;

  return (
    <motion.div
      onClick={() => setActiveStepIndex(idx)}
      animate={{
        scale: isCurrent ? 1.01 : 1,
        x: isCurrent ? 4 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`p-4 sm:p-5 rounded-[18px] sm:rounded-[22px] transition-all duration-300 border flex items-start justify-between gap-4 cursor-pointer ${
        isCurrent
          ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-xl ring-2 ring-[#0E4D3A]/20"
          : isPassed
            ? "bg-[#F5F5F7] text-[#1D1D1F] border-[#D2D2D7]/80 hover:bg-[#EAEAEA]"
            : "bg-white text-[#8E8E93] border-[#E5E5EA] hover:border-[#D2D2D7]"
      }`}
      key={group.id}
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-bold shrink-0 transition-colors mt-0.5 ${
            isCurrent
              ? "bg-[#34D399] text-black shadow-[0_0_12px_#34D399]"
              : isPassed
                ? "bg-[#0E4D3A]/10 text-[#0E4D3A]"
                : "bg-[#E5E5EA] text-[#8E8E93]"
          }`}
        >
          {isPassed ? (
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0E4D3A]" />
          ) : (
            group.step
          )}
        </div>

        <div>
          <h3
            className={`text-lg sm:text-xl lg:text-[22px] font-semibold leading-[1.1] tracking-tight ${
              isCurrent
                ? "text-white"
                : isPassed
                  ? "text-[#1D1D1F]"
                  : "text-[#1D1D1F]/70"
            }`}
          >
            {group.label}
          </h3>

          <p
            className={`text-sm sm:text-base lg:text-[17px] font-normal mt-1.5 leading-relaxed ${
              isCurrent ? "text-white/90" : "text-[#555555]"
            }`}
          >
            {group.desc}
          </p>
        </div>
      </div>

      <div className="shrink-0 mt-1">
        <IconComponent
          className={`w-5 h-5 sm:w-6 sm:h-6 ${
            isCurrent
              ? "text-[#34D399] animate-pulse"
              : isPassed
                ? "text-[#0E4D3A]"
                : "text-[#8E8E93]"
          }`}
        />
      </div>
    </motion.div>
  );
})}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DarshaiMatchingEngineSection;
