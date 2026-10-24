import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Building,
  Plane,
  Shield,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import SignalBadge from "./SignalBadge";
import EditorialQuote from "./EditorialQuote";
const JOURNEY_STAGES = [
  {
    num: "01",
    title: "Wellness Journey Planning",
    badge: "STAGE 01 — PLANNING",
    tag: "Assessment & Strategy",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Customized Journey Architecture",
    description:
      "Personalized itinerary creation aligning clinical needs, microclimate preferences, and travel schedules.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Centre Coordination",
    badge: "STAGE 02 — CENTRES",
    tag: "Sanctuary Alignment",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Direct Accredited Facility Intake",
    description:
      "Seamless synchronization with accredited wellness centres and master practitioners prior to arrival.",
    icon: Building,
  },
  {
    num: "03",
    title: "Travel Support",
    badge: "STAGE 03 — TRAVEL",
    tag: "Seamless Logistics",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Visa & International Flight Guidance",
    description:
      "Dedicated assistance with e-visas, medical clearance documentation, and travel flight arrangements.",
    icon: Plane,
  },
  {
    num: "04",
    title: "Airport Transfer Coordination",
    badge: "STAGE 04 — TRANSFERS",
    tag: "Private Chauffeur",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Private Terminal Tarmac & Transfers",
    description:
      "Private luxury chauffeur pick-up upon arrival ensuring comfortable and stress-free transit.",
    icon: Shield,
  },
  {
    num: "05",
    title: "Arrival Assistance",
    badge: "STAGE 05 — ARRIVAL",
    tag: "On-Ground Reception",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Sanctuary Reception & Orientation",
    description:
      "Dedicated DARSHAI host welcomes you at the sanctuary to oversee smooth check-in and room placement.",
    icon: Users,
  },
  {
    num: "06",
    title: "Programme Coordination",
    badge: "STAGE 06 — PROGRAMME",
    tag: "Clinical Supervision",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Real-Time Schedule Management",
    description:
      "Continuous daily alignment between your personal preferences and the clinical therapy schedule.",
    icon: Activity,
  },
  {
    num: "07",
    title: "Journey Monitoring",
    badge: "STAGE 07 — MONITORING",
    tag: "Concierge Telemetry",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=900&fit=crop&q=80",
    visualTitle: "24/7 Care Navigator Desk",
    description:
      "Around-the-clock liaison to assist with dietary requests, extra therapies, and personal concierge needs.",
    icon: Clock,
  },
  {
    num: "08",
    title: "Post-Programme Follow-Up",
    badge: "STAGE 08 — CONTINUITY",
    tag: "Sustained Resilience",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop&q=80",
    visualTitle: "Tele-Health & Re-Integration",
    description:
      "Comprehensive health discharge summary, remote practitioner check-ins, and home maintenance roadmap.",
    icon: CheckCircle2,
  },
];
export function GlobalJourneyManagementSection() {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  return (
    <section
      id="journey-management"
      className="py-20 md:py-28 bg-[#F5F5F7] border-y border-[#D2D2D7]"
    >
      <div className="darshai-container">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative">
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="typography-eyebrow text-[#0E4D3A] mb-2 uppercase tracking-[0.2em] font-semibold text-xs">
                  GLOBAL PRIVATE JOURNEY MANAGEMENT
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1D1D1F] leading-[1.15] tracking-tight mb-2">
                  Beyond Booking. <br />
                  <span className="text-[#0E4D3A] font-normal">
                    Complete Journey Coordination.
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6E73] font-medium leading-relaxed mb-6">
                  DARSHAI manages the operational logistics around your health
                  stay with dedicated India-based private care navigation.
                </p>
                <div className="divide-y divide-[#D2D2D7] border-y border-[#D2D2D7]">
                  {JOURNEY_STAGES.map((stage, idx) => {
                    const isSelected = selectedStageIndex === idx;
                    const Icon = stage.icon;
                    return (
                      <button
                        type="button"
                        onClick={() => setSelectedStageIndex(idx)}
                        onMouseEnter={() => setSelectedStageIndex(idx)}
                        className={`w-full text-left py-3 sm:py-3.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "bg-[#0E4D3A]/8 text-[#0E4D3A]"
                            : "hover:bg-white/60 text-[#1D1D1F]"
                        }`}
                        key={stage.num}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`text-xs font-mono font-bold tracking-wider shrink-0 transition-colors ${isSelected ? "text-[#0E4D3A]" : "text-[#86868B]"}`}
                          >
                            {stage.num}
                          </span>
                          <span
                            className={`text-sm sm:text-base tracking-tight truncate transition-colors ${
                              isSelected
                                ? "text-[#0E4D3A] font-bold"
                                : "text-[#1D1D1F] font-medium group-hover:text-[#0E4D3A]"
                            }`}
                          >
                            {stage.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isSelected
                                ? "text-[#0E4D3A] stroke-[2.2]"
                                : "text-[#86868B] group-hover:text-[#0E4D3A]"
                            }`}
                          />
                          <ChevronRight
                            className={`w-4 h-4 transition-all duration-200 ${
                              isSelected
                                ? "text-[#0E4D3A] translate-x-0.5 opacity-100"
                                : "text-[#86868B]/40 opacity-0 group-hover:opacity-100"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pt-6">
                <EditorialQuote
                  variant="light"
                  className="my-0 py-1 pl-4 border-[#0E4D3A] text-xs sm:text-sm"
                >
                  You focus on your journey. DARSHAI coordinates the details
                  around it.
                </EditorialQuote>
              </div>
              <div className="pt-4 hidden lg:flex items-center justify-between text-xs text-[#86868B]">
                <span>Select any phase to review coordination proof</span>
                <span className="font-mono text-[#0E4D3A] font-semibold">
                  {String(selectedStageIndex + 1).padStart(2, "0")} / 08
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[620px] bg-[#111112] rounded-[24px] sm:rounded-[32px] overflow-hidden flex flex-col justify-end shadow-xl border border-[#D2D2D7]/50">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                  key={selectedStageIndex}
                >
                  <SmartImage
                    src={JOURNEY_STAGES[selectedStageIndex].image}
                    alt={JOURNEY_STAGES[selectedStageIndex].visualTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0B192C]/75 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#132A4A]/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/35 pointer-events-none" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-5 right-5 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>{JOURNEY_STAGES[selectedStageIndex].badge}</span>
                </div>
              </div>
              <div className="relative z-20 p-6 sm:p-8 lg:p-10 text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    key={selectedStageIndex}
                  >
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <SignalBadge variant="dark" dot>
                        {JOURNEY_STAGES[selectedStageIndex].tag}
                      </SignalBadge>
                      <span className="text-xs text-white/60 font-mono tracking-wider">
                        Managed Concierge Stage
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                      {JOURNEY_STAGES[selectedStageIndex].visualTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl font-normal">
                      {JOURNEY_STAGES[selectedStageIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default GlobalJourneyManagementSection;
