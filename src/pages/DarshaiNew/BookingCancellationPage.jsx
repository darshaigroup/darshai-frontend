import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Reveal from "../../components/darshaiNew/Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  Calendar,
  CreditCard,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Info,
  ChevronDown,
  Building,
  Plane,
  FileCheck2,
  Compass,
  DollarSign,
  Plus,
  Minus,
} from "lucide-react";
const TOPICS = [
  {
    num: "01",
    id: "section-01",
    title: "Before You Book",
    subtitle: "Proposal checklist & inclusions",
  },
  {
    num: "02",
    id: "section-02",
    title: "Booking & Payment",
    subtitle: "Confirmation & payment models",
  },
  {
    num: "03",
    id: "section-03",
    title: "Cancellation & Refunds",
    subtitle: "DARSHAI, centres & travel",
  },
  {
    num: "04",
    id: "section-04",
    title: "Rescheduling",
    subtitle: "Written requests & approvals",
  },
  {
    num: "05",
    id: "section-05",
    title: "Exceptional Circumstances",
    subtitle: "Medical & travel review",
  },
  {
    num: "06",
    id: "section-06",
    title: "Need Clarification?",
    subtitle: "Pre-payment concierge guidance",
  },
];
// Proposal Checklist items for Section 01
const PROPOSAL_CHECKLIST = [
  {
    title: "Recommended Wellness Journey & Centre",
    desc: "Your tailor-made clinical pathway paired with our vetted sanctuary destination.",
    icon: Compass,
  },
  {
    title: "Programme Duration & Accommodation",
    desc: "Exact residency timeline, suite categories, and climate-aligned living quarters.",
    icon: Calendar,
  },
  {
    title: "DARSHAI Management Services",
    desc: "End-to-end concierge coordination, intake analysis, and continuous health oversight.",
    icon: ShieldCheck,
  },
  {
    title: "Inclusions & Exclusions",
    desc: "Transparent breakdown of therapeutic treatments, meals, diagnostics, and separate add-ons.",
    icon: FileCheck2,
  },
  {
    title: "Fees & Applicable Taxes",
    desc: "Itemized costs including statutory GST and regional medical levies where applicable.",
    icon: DollarSign,
  },
  {
    title: "Payment Schedule",
    desc: "Structured deposit milestones, split-payment options, and balance due dates.",
    icon: CreditCard,
  },
  {
    title: "Cancellation, Rescheduling & Refund Terms",
    desc: "Explicit timelines and centre-specific policy terms governing your specific booking.",
    icon: RotateCcw,
  },
];
// Cancellation Tiers for Section 03
const REFUND_TIERS = [
  {
    horizon: "More than 30 Days",
    tag: "MAXIMUM ELIGIBILITY",
    accent: "#34D399",
    bgGlow: "rgba(52, 211, 153, 0.15)",
    summary:
      "Refund eligibility applies after standard statutory and service offsets.",
    badge: "30+ Days Prior",
  },
  {
    horizon: "15 to 30 Days",
    tag: "PARTIAL REFUND HORIZON",
    accent: "#C7A25A",
    bgGlow: "rgba(199, 162, 90, 0.15)",
    summary:
      "A partial refund may be provided following mandatory service deductions.",
    badge: "15–30 Days Prior",
  },
  {
    horizon: "Less than 15 Days",
    tag: "CENTRE & VENDOR DEPENDENT",
    accent: "#A78BFA",
    bgGlow: "rgba(167, 139, 250, 0.15)",
    summary:
      "Refund eligibility is dictated strictly by partner-centre policies.",
    badge: "< 15 Days Prior",
  },
  {
    horizon: "No-Show / Unannounced",
    tag: "FORFEITURE OF PAYMENTS",
    accent: "#F87171",
    bgGlow: "rgba(248, 113, 113, 0.15)",
    summary:
      "Failure to attend without written notice results in forfeiture of funds.",
    badge: "Departure Date",
  },
];
export function BookingCancellationPage({ onNavigate }) {
  const [activeTopicId, setActiveTopicId] = useState("section-01");
  const [activeServiceTab, setActiveServiceTab] = useState("darshai");
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedChecklist, setExpandedChecklist] = useState(null);
  const { scrollYProgress } = useScroll();
  const navItemRefs = useRef({});
  // Scroll spy effect
  useEffect(() => {
    track("view_booking_cancellation_page", { timestamp: Date.now() });
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = TOPICS.length - 1; i >= 0; i--) {
        const topic = TOPICS[i];
        const element = document.getElementById(topic.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveTopicId(topic.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveTopicId(id);
      track("policy_jump_clicked", { section: id });
    }
  };
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      track("policy_link_copied", { page: "booking-cancellation" });
    }
  };
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
      track("policy_printed", { page: "booking-cancellation" });
    }
  };
  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = `/${page}`;
    }
  };
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-[#F5F5F7] selection:bg-[#0F6B4A] selection:text-white relative overflow-hidden">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F6B4A] via-[#C7A25A] to-[#34D399] origin-left z-50 shadow-[0_0_12px_#34D399]"
      />
      <section className="relative min-h-[75vh] sm:min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-28 sm:py-36 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[340px] sm:h-[600px] md:h-[750px] bg-[#0F6B4A]/25 rounded-full blur-[140px] sm:blur-[180px] pointer-events-none animate-pulse duration-1000" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#C7A25A]/10 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-[#34D399]/40 rounded-full animate-ping duration-1000" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-[#C7A25A]/30 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#0F6B4A]/40 rounded-full animate-bounce duration-1000" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#C7A25A] font-medium">
              BOOKING & CANCELLATION
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08] mb-6"
          >
            Clear Terms Before You Confirm.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8"
          >
            <span className="text-2xl sm:text-4xl font-display font-medium text-[#34D399] tracking-tight block">
              Transparent Fiduciary Governance
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed font-normal mb-10"
          >
            Every DARSHAI journey is planned around your goals, selected
            wellness centre, programme, duration and service requirements.
            Before confirmation, you will receive the applicable service
            details, charges, payment instructions and cancellation terms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-xs font-mono text-[#A1A1AA]/60"
          >
            <span>EXPLORE BOOKING PROVISIONS</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#0F6B4A]" />
          </motion.div>
        </div>
      </section>
      <section className="sticky top-16 z-40 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl transition-all">
        <div className="darshai-container max-w-6xl mx-auto px-6 py-3.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {TOPICS.map((topic) => {
              const isActive = activeTopicId === topic.id;
              return (
                <button
                  ref={(el) => {
                    navItemRefs.current[topic.id] = el;
                  }}
                  type="button"
                  onClick={() => scrollToSection(topic.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? "bg-[#0F6B4A] text-white border border-[#34D399]/40 shadow-[0_0_16px_rgba(52,211,153,0.3)] ring-1 ring-[#34D399]"
                      : "bg-[#111113] text-[#A1A1AA] hover:bg-white/10 hover:text-white border border-white/[0.08]"
                  }`}
                  key={topic.id}
                >
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <div className="darshai-container max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-24 sm:space-y-32">
        <section id="section-01" className="scroll-mt-32">
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>PRE-CONFIRMATION TRANSPARENCY</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                BEFORE YOU BOOK
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Your personalised proposal will outline the applicable details,
                including:
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {PROPOSAL_CHECKLIST.map((item, idx) => {
              const IconComp = item.icon;
              const isExpanded = expandedChecklist === idx;
              return (
                <Reveal delay={idx * 0.06} key={item.title}>
                  <motion.div
                    layout
                    whileHover={{ scale: 1.015, y: -2 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() =>
                      setExpandedChecklist(isExpanded ? null : idx)
                    }
                    className={`group relative h-full bg-[#111113] rounded-[24px] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer ${
                      isExpanded
                        ? "border-[#0F6B4A] bg-[#141416] ring-1 ring-[#0F6B4A]/50"
                        : "border-white/[0.08] hover:border-[#0F6B4A]/60"
                    }`}
                  >
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-[#0F6B4A]/15 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    />
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#34D399] group-hover:bg-[#0F6B4A] group-hover:text-white transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isExpanded
                              ? "bg-[#0F6B4A] text-white border-[#34D399]/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                              : "bg-white/[0.06] text-[#34D399] border-white/10 group-hover:bg-[#0F6B4A] group-hover:text-white"
                          }`}
                        >
                          {isExpanded ? (
                            <Minus className="w-4 h-4 transition-transform duration-200" />
                          ) : (
                            <Plus className="w-4 h-4 transition-transform duration-200" />
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-[#34D399] transition-colors">
                        {item.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-[#A1A1AA] leading-relaxed pt-3 border-t border-white/[0.06] mt-3">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#34D399]">
                      <span>
                        {isExpanded
                          ? "Expanded Provision"
                          : "Tap to View Details"}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.3}>
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#141416] border-2 border-[#34D399] flex items-start gap-4 shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300">
              <Info className="w-6 h-6 text-[#34D399] shrink-0 mt-0.5" />
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                Please review the proposal and applicable centre policies before
                confirming your booking.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="section-02"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>CONFIRMATION MANDATE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                BOOKING & PAYMENT
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 sm:p-12 rounded-[28px] bg-[#141416] border border-[#0F6B4A]/50 shadow-2xl mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F6B4A]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 text-[#C7A25A] font-mono text-xs font-semibold tracking-widest uppercase mb-4">
                  <AlertCircle className="w-4 h-4 text-[#C7A25A]" />
                  <span>CONFIRMATION STATUS MANDATE</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-semibold text-white mb-4 leading-tight">
                  A recommendation or enquiry does not by itself constitute a
                  confirmed booking.
                </h3>
                <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-normal">
                  Bookings are subject to programme availability, partner-centre
                  confirmation, the required payment and written confirmation
                  from DARSHAI or the relevant service provider.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border border-white/[0.08] shadow-2xl space-y-4 mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-[#34D399] mb-4 font-semibold">
                DEPENDING ON THE JOURNEY STRUCTURE:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5 text-base sm:text-lg text-white font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] mt-2.5 shrink-0" />
                  <span>
                    Payments may be collected by DARSHAI or directly by the
                    partner centre.
                  </span>
                </li>
                <li className="flex items-start gap-3.5 text-base sm:text-lg text-white font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#C7A25A] mt-2.5 shrink-0" />
                  <span>Split-payment arrangements may apply.</span>
                </li>
                <li className="flex items-start gap-3.5 text-base sm:text-lg text-white font-medium leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] mt-2.5 shrink-0" />
                  <span>
                    Applicable GST and other taxes will be charged as required
                    by law.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="p-5 rounded-[20px] bg-white/[0.03] border-2 border-[#34D399] text-sm text-white/90 flex items-center gap-3 shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:shadow-[0_0_35px_rgba(52,211,153,0.45)] transition-all duration-300">
              <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
              <span>
                Your payment instructions will be communicated before
                confirmation.
              </span>
            </div>
          </Reveal>
        </section>
        <section
          id="section-03"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>REFUND & CANCELLATION CRITERIA</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                CANCELLATION & REFUNDS
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Different components of your wellness journey are governed by
                specific service criteria. Explore the respective terms below:
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-[#141416] border border-white/[0.08] rounded-2xl mb-10 max-w-2xl">
              <button
                type="button"
                onClick={() => setActiveServiceTab("darshai")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeServiceTab === "darshai"
                    ? "bg-[#0F6B4A] text-white shadow-lg border border-[#34D399]/40"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                <span>DARSHAI Services</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveServiceTab("centre")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeServiceTab === "centre"
                    ? "bg-[#0F6B4A] text-white shadow-lg border border-[#34D399]/40"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                <Building className="w-4 h-4 text-[#C7A25A]" />
                <span>Partner Centres</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveServiceTab("travel")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeServiceTab === "travel"
                    ? "bg-[#0F6B4A] text-white shadow-lg border border-[#34D399]/40"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                <Plane className="w-4 h-4 text-[#34D399]" />
                <span>Travel & Third-Party</span>
              </button>
            </div>
          </Reveal>
          {activeServiceTab === "darshai" && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#34D399] mb-6 font-semibold">
                    FOR ELIGIBLE CANCELLATIONS OF DARSHAI SERVICES, THE
                    FOLLOWING GENERAL TERMS APPLY, SUBJECT TO THE CONFIRMED
                    PROPOSAL:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {REFUND_TIERS.map((tier, idx) => (
                      <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ duration: 0.35 }}
                        className="group relative bg-[#111113] rounded-[24px] border border-white/[0.08] hover:border-[#0F6B4A]/60 p-7 sm:p-8 flex flex-col justify-between shadow-xl transition-all overflow-hidden"
                        key={tier.horizon}
                      >
                        <div
                          className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-15 pointer-events-none"
                          style={{ backgroundColor: tier.accent }}
                        />
                        <div>
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                            <span
                              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                              style={{
                                color: tier.accent,
                                backgroundColor: tier.bgGlow,
                              }}
                            >
                              {tier.tag}
                            </span>
                            <span className="text-xs font-mono text-[#A1A1AA]/60">
                              {tier.badge}
                            </span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3">
                            {tier.horizon}
                          </h4>
                          <p className="text-base sm:text-lg font-medium text-[#34D399] leading-relaxed">
                            {tier.summary}
                          </p>
                        </div>
                        <div className="pt-5 mt-5 border-t border-white/[0.06] text-xs font-mono text-[#A1A1AA]/60">
                          Subject to Confirmed Proposal
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          {activeServiceTab === "centre" && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border border-white/[0.08] shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-4 text-[#C7A25A]">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-[#C7A25A]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-white">
                      Partner Wellness-Centre Programmes
                    </h3>
                    <p className="text-xs font-mono text-[#A1A1AA]">
                      Independent Sanctuary Governance
                    </p>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Each partner wellness centre maintains its own cancellation,
                  refund and rescheduling policies. These policies may differ
                  according to the programme, accommodation, reservation
                  commitments and timing of the cancellation.
                </p>
                <div className="p-6 rounded-[20px] bg-white/[0.03] border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#34D399]">
                    <Info className="w-4 h-4" />
                    <span>Communication & Policy Standard</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    The applicable centre-specific terms will be communicated
                    before confirmation whenever available. Refunds for centre
                    services remain subject to the applicable centre policy.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          {activeServiceTab === "travel" && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border border-white/[0.08] shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-4 text-[#34D399]">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-[#34D399]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-white">
                      Travel & Third-Party Services
                    </h3>
                    <p className="text-xs font-mono text-[#A1A1AA]">
                      Airlines, Transfers, Insurance & Visas
                    </p>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                  Flights, train tickets, transfers, accommodation booked
                  separately, travel insurance, visas and other third-party
                  services are subject to the relevant provider's terms.
                </p>
                <div className="p-6 rounded-[20px] bg-red-500/10 border border-red-500/30 text-white space-y-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-red-400 block">
                    Third-Party Provider Deductions Notice
                  </span>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    Amounts paid to third-party providers may be non-refundable
                    or subject to provider-imposed deductions.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </section>
        <section
          id="section-04"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>JOURNEY ADJUSTMENT GOVERNANCE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                RESCHEDULING
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border-2 border-[#34D399] shadow-[0_0_35px_rgba(52,211,153,0.35)] hover:shadow-[0_0_50px_rgba(52,211,153,0.5)] transition-all duration-300 space-y-6">
              <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                Rescheduling requests must be submitted to DARSHAI in writing.
              </p>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Approval depends on the availability of the selected centre and
                programme, the relevant partner and vendor policies, and any
                applicable rescheduling charges.
              </p>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                A revised date or programme is not confirmed until written
                confirmation has been provided.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="section-05"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>EMERGENCY GOVERNANCE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                EXCEPTIONAL CIRCUMSTANCES
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border border-white/[0.08] shadow-2xl space-y-6">
              <div className="flex items-center gap-3 text-[#34D399]">
                <ShieldCheck className="w-7 h-7 text-[#34D399]" />
                <h3 className="text-2xl font-display font-semibold text-white">
                  Individual Case Review Governance
                </h3>
              </div>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Requests arising from medical emergencies, government travel
                restrictions or other exceptional circumstances may be reviewed
                individually.
              </p>
              <p className="text-sm sm:text-base text-[#A1A1AA]/80 leading-relaxed font-normal">
                Any refund, rescheduling or adjustment remains subject to the
                applicable contractual terms, partner-centre policies and
                third-party commitments.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 p-8 sm:p-10 rounded-[28px] bg-gradient-to-r from-[#0F6B4A]/40 via-[#0E4D3A]/60 to-[#0F6B4A]/40 backdrop-blur-xl border border-[#34D399]/30 shadow-2xl text-white relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#C7A25A] font-mono text-xs font-semibold tracking-widest uppercase mb-3">
                <Sparkles className="w-4 h-4 text-[#C7A25A]" />
                <span>PROPOSAL CONSISTENCY MANDATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3">
                Proposal Alignment Guarantee
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                The terms in the confirmed proposal and applicable
                partner-centre policies must be consistent with this page. Do
                not promise a universal refund where the centre or third-party
                provider's terms differ.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="section-06"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>PRE-PAYMENT CONCIERGE SUPPORT</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                NEED CLARIFICATION?
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[32px] bg-[#0A1C14]/90 backdrop-blur-2xl border-2 border-white/80 hover:border-[#34D399] p-8 sm:p-12 md:p-16 shadow-[0_0_50px_rgba(52,211,153,0.3)] hover:shadow-[0_0_65px_rgba(52,211,153,0.45)] text-center max-w-4xl mx-auto relative overflow-hidden transition-all duration-500 group">
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#34D399]/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-[#C7A25A]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.22)_0%,rgba(14,77,58,0.45)_50%,transparent_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 backdrop-blur-xs pointer-events-none" />
              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 text-[#34D399] flex items-center justify-center mx-auto">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <p className="text-lg sm:text-2xl text-white leading-relaxed font-display font-medium max-w-2xl mx-auto">
                  We encourage every client to understand the applicable terms
                  before making a payment. For clarification about your
                  proposal, booking, cancellation or refund eligibility, contact
                  DARSHAI before confirming your journey.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      track("booking_policy_contact_click", {
                        page: "booking-cancellation",
                      });
                      navigateTo("contact");
                    }}
                    className="darshai-btn-primary uppercase text-xs sm:text-sm font-semibold tracking-widest px-10 py-4 inline-flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all"
                  >
                    <span>CONTACT DARSHAI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs font-mono text-[#A1A1AA]/60">
                  Encrypted Direct Concierge Channel
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
export default BookingCancellationPage;
