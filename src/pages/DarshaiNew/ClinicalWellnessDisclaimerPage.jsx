import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Reveal from "../../components/darshaiNew/Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  ShieldAlert,
  Stethoscope,
  Activity,
  Building2,
  AlertTriangle,
  HeartPulse,
  CheckCircle2,
  ChevronDown,
  Plus,
  Minus,
  Info,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Award,
  FileText,
} from "lucide-react";
// Table of Contents Topics
const TOPICS = [
  { id: "role-of-darshai", label: "Role of DARSHAI" },
  { id: "not-a-substitute", label: "Medical Care Disclaimer" },
  { id: "professional-review", label: "Programme Suitability" },
  { id: "partner-centres", label: "Partner Centres" },
  { id: "individual-results", label: "Individual Results" },
  { id: "emergency-care", label: "Emergency Care" },
  { id: "need-clarification", label: "Suitability Support" },
];
// Section 02: What DARSHAI Does NOT Provide
const NON_PROVIDED_SERVICES = [
  {
    title: "Medical Diagnosis",
    desc: "Identifying, classifying or diagnosing clinical diseases or pathological health conditions.",
    icon: Stethoscope,
  },
  {
    title: "Prescription of Medicines",
    desc: "Issuing prescriptions, pharmaceutical regimens or clinical drug therapies.",
    icon: FileText,
  },
  {
    title: "Medical Treatment",
    desc: "Administering direct clinical treatments, surgical procedures or invasive therapies.",
    icon: Activity,
  },
  {
    title: "Emergency Medical Advice",
    desc: "Providing acute triage, emergency medical response or urgent crisis management.",
    icon: AlertTriangle,
  },
  {
    title: "Psychiatric Care",
    desc: "Clinical psychiatric evaluation, mental health diagnosis or psychiatric intervention.",
    icon: HeartPulse,
  },
];
// Section 03: Interactive Suitability Accordion Items
const SUITABILITY_ACCORDION = [
  {
    title: "Professional Review Alignment",
    tag: "CLINICAL BOUNDARIES",
    icon: UserCheck,
    content:
      "Where appropriate, programme recommendations may be reviewed by qualified professionals. Any diagnosis, treatment decision or clinical intervention must be made by the relevant qualified professional within their scope of practice.",
  },
  {
    title: "Individual Suitability Determination",
    tag: "PERSONAL EVALUATION",
    icon: Award,
    content:
      "The final suitability of a programme depends on the individual's circumstances and the assessment of the relevant practitioner or partner centre.",
  },
  {
    title: "Client Disclosure Mandate",
    tag: "ACCURATE INFORMATION",
    icon: ShieldCheck,
    content:
      "Clients should provide accurate information and disclose relevant medical conditions, medications, allergies, pregnancy or other requirements directly to the appropriate healthcare professional and selected centre.",
  },
];
// Section 04: Partner Centre Responsibilities
const PARTNER_RESPONSIBILITIES = [
  "Delivery of their programmes and therapies",
  "Clinical and therapeutic services offered at their facilities",
  "Qualifications and professional responsibilities of their practitioners",
  "Accommodation, facilities and on-site operations",
  "Applicable licences, registrations and regulatory compliance",
];
export function ClinicalWellnessDisclaimerPage({ onNavigate }) {
  const [activeTopicId, setActiveTopicId] = useState("role-of-darshai");
  const [expandedExclusion, setExpandedExclusion] = useState(null);
  const [expandedSuitability, setExpandedSuitability] = useState(null);
  const navItemRefs = useRef({});
  const { scrollYProgress } = useScroll();
  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = page;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Scroll to section smoothly
  const scrollToSection = (id) => {
    setActiveTopicId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTopicId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      },
    );
    TOPICS.forEach((topic) => {
      const el = document.getElementById(topic.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#0F6B4A] selection:text-white font-sans relative overflow-x-hidden">
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
              CLINICAL & WELLNESS DISCLAIMER
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08] mb-8"
          >
            Wellness Guidance, With Clear Boundaries.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed font-normal space-y-6 mb-10 text-center"
          >
            <p>
              DARSHAI supports personalised wellness discovery, suitability
              matching and journey coordination. Our approach is designed to
              help individuals explore wellness environments and programmes that
              align with their goals, preferences and requirements.
            </p>
            <p className="text-white font-medium text-lg sm:text-2xl text-center my-4">
              DARSHAI does not replace qualified healthcare professionals or
              direct clinical care.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 flex flex-col items-center gap-2 text-xs font-mono text-[#A1A1AA]/60"
          >
            <span>EXPLORE CLINICAL DISCLAIMER PROVISIONS</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#0F6B4A]" />
          </motion.div>
        </div>
      </section>
      <div className="darshai-container max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        <section id="role-of-darshai" className="scroll-mt-32">
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>SERVICE SCOPE & BOUNDARIES</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                The Role of DARSHAI
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-[#0A1C14]/90 backdrop-blur-2xl rounded-[28px] p-8 sm:p-12 border-2 border-white/80 hover:border-[#34D399] shadow-[0_0_50px_rgba(52,211,153,0.3)] hover:shadow-[0_0_65px_rgba(52,211,153,0.45)] space-y-8 relative overflow-hidden transition-all duration-500 group">
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#34D399]/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-[#C7A25A]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.22)_0%,rgba(14,77,58,0.45)_50%,transparent_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 backdrop-blur-xs pointer-events-none" />
              <p className="text-lg sm:text-xl text-white font-medium leading-relaxed relative z-10">
                DARSHAI provides Geo-Wellness assessment, environmental and
                programme matching, recommendations, coordination and follow-up
                services according to the agreed service scope.
              </p>
              <div className="p-6 sm:p-8 rounded-[20px] bg-black/30 backdrop-blur-md border border-[#C7A25A]/50 flex items-start gap-4 relative z-10 shadow-lg">
                <Info className="w-6 h-6 text-[#C7A25A] shrink-0 mt-0.5" />
                <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                  Our recommendations are intended to support informed wellness
                  decisions. They should not be interpreted as a medical
                  diagnosis, prescription or guarantee of a particular outcome.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
        <section
          id="not-a-substitute"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>CLINICAL CARE EXCLUSIONS</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Not a Substitute for Medical Care
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                The DARSHAI platform does not independently provide clinical
                medical services:
              </p>
            </div>
          </Reveal>
          <div className="space-y-4 mb-10">
            {NON_PROVIDED_SERVICES.map((item, idx) => {
              const IconComp = item.icon;
              const isExpanded = expandedExclusion === idx;
              return (
                <Reveal delay={idx * 0.06} key={item.title}>
                  <div
                    onClick={() =>
                      setExpandedExclusion(isExpanded ? null : idx)
                    }
                    className={`bg-[#141416] rounded-[24px] border p-6 sm:p-8 transition-all duration-300 cursor-pointer shadow-xl ${
                      isExpanded
                        ? "border-[#0F6B4A] bg-[#161619] ring-1 ring-[#0F6B4A]/50"
                        : "border-white/[0.08] hover:border-[#0F6B4A]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#34D399] shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C7A25A] block mb-1">
                            EXCLUDED FROM SCOPE
                          </span>
                          <h3 className="text-lg sm:text-xl font-display font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isExpanded
                            ? "bg-[#0F6B4A] text-white border-[#34D399]/40"
                            : "bg-white/[0.06] text-[#34D399] border-white/10"
                        }`}
                      >
                        {isExpanded ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </div>
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
                          <div className="pt-5 mt-5 border-t border-white/[0.06] space-y-3">
                            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                              {item.desc}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              <span>
                                Clinical service not independently provided by
                                DARSHAI
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.3}>
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#141416] border border-[#0F6B4A]/50 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#34D399] font-mono text-xs font-semibold tracking-widest uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                <span>INFORMATIONAL & EDUCATIONAL NATURE</span>
              </div>
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                Assessment results and recommendations are informational and
                educational in nature. They do not replace consultation with a
                qualified healthcare professional.
              </p>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                If you have a medical concern, seek advice from an appropriately
                qualified healthcare professional.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="professional-review"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>SUITABILITY & MEDICAL DISCLOSURE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Professional Review & Programme Suitability
              </h2>
            </div>
          </Reveal>
          <div className="space-y-4 mb-10">
            {SUITABILITY_ACCORDION.map((item, idx) => {
              const IconComp = item.icon;
              const isExpanded = expandedSuitability === idx;
              return (
                <Reveal delay={idx * 0.08} key={item.title}>
                  <div
                    onClick={() =>
                      setExpandedSuitability(isExpanded ? null : idx)
                    }
                    className={`bg-[#141416] rounded-[24px] border p-6 sm:p-8 transition-all duration-300 cursor-pointer shadow-xl ${
                      isExpanded
                        ? "border-[#0F6B4A] bg-[#161619] ring-1 ring-[#0F6B4A]/50"
                        : "border-white/[0.08] hover:border-[#0F6B4A]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#34D399] shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C7A25A] block mb-1">
                            {item.tag}
                          </span>
                          <h3 className="text-lg sm:text-xl font-display font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isExpanded
                            ? "bg-[#0F6B4A] text-white border-[#34D399]/40"
                            : "bg-white/[0.06] text-[#34D399] border-white/10"
                        }`}
                      >
                        {isExpanded ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </div>
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
                          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed pt-5 mt-5 border-t border-white/[0.06]">
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
        <section
          id="partner-centres"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>FACILITY & PRACTITIONER INDEPENDENCE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Partner Wellness Centres
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border border-white/[0.08] shadow-2xl space-y-6 mb-8">
              <div className="flex items-center gap-4 text-[#C7A25A]">
                <Building2 className="w-8 h-8 text-[#C7A25A] shrink-0" />
                <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                  DARSHAI works with curated wellness centres and retreat
                  partners. DARSHAI does not own or operate these facilities.
                </p>
              </div>
              <div className="pt-6 border-t border-white/[0.08]">
                <p className="text-xs font-mono uppercase tracking-widest text-[#34D399] mb-4 font-semibold">
                  PARTNER CENTRES ARE INDEPENDENTLY RESPONSIBLE FOR:
                </p>
                <ul className="space-y-3.5">
                  {PARTNER_RESPONSIBILITIES.map((resp) => (
                    <li
                      className="flex items-start gap-3.5 text-base sm:text-lg text-[#A1A1AA] leading-relaxed"
                      key={resp}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#34D399] mt-2.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-6 sm:p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
              <Info className="w-6 h-6 text-[#34D399] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                The selected centre's programme details and applicable terms
                will be communicated as part of the journey-planning process.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="individual-results"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>VARIABILITY & OUTCOME DISCLAIMER</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Individual Results & Limitations
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-[#141416] rounded-[28px] p-8 sm:p-12 border border-white/[0.08] shadow-2xl space-y-6">
              <p className="text-xl sm:text-2xl font-display font-semibold text-[#34D399]">
                Wellness experiences and individual responses vary.
              </p>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                DARSHAI does not guarantee specific medical outcomes, recovery,
                weight loss, longevity improvements or other health outcomes.
              </p>
              <div className="p-6 sm:p-8 rounded-[20px] bg-[#111113] border border-white/[0.08]">
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                  A recommendation indicates potential suitability based on the
                  available information; it does not guarantee programme
                  effectiveness or an individual's response.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
        <section
          id="emergency-care"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-red-400 mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <span>URGENT MEDICAL NOTICE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Emergency Care
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 sm:p-12 rounded-[28px] bg-red-500/10 border border-red-500/30 text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 text-red-400 font-mono text-sm font-semibold tracking-wider uppercase">
                <ShieldAlert className="w-6 h-6 text-red-400" />
                <span>NOT INTENDED FOR EMERGENCY SERVICES</span>
              </div>
              <p className="text-xl sm:text-2xl font-display font-semibold text-white leading-relaxed">
                DARSHAI's platform and journey-coordination services are not
                intended for emergencies.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                If you experience urgent or potentially serious symptoms,
                contact local emergency services or seek immediate medical
                attention from a qualified healthcare provider.
              </p>
              <div className="p-5 rounded-[18px] bg-red-950/40 border border-red-500/20 text-sm sm:text-base text-red-200 font-medium">
                Do not delay necessary medical care while awaiting a
                recommendation or response from DARSHAI.
              </div>
            </div>
          </Reveal>
        </section>
        <section
          id="need-clarification"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>CLARIFICATION & GUIDANCE SUPPORT</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Questions About Suitability?
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 sm:p-12 rounded-[28px] bg-gradient-to-r from-[#0F6B4A]/30 via-[#0E4D3A]/50 to-[#0F6B4A]/30 backdrop-blur-xl border border-[#34D399]/40 shadow-2xl space-y-6 text-white relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#C7A25A] font-mono text-xs font-semibold tracking-widest uppercase mb-2">
                <Sparkles className="w-4 h-4 text-[#C7A25A]" />
                <span>PRE-CONFIRMATION GUIDANCE</span>
              </div>
              <p className="text-lg sm:text-xl font-medium leading-relaxed">
                If you have questions about a proposed wellness journey, its
                scope or its suitability requirements, contact DARSHAI before
                confirming your booking.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                For medical diagnosis, treatment or clinical advice, consult an
                appropriately qualified healthcare professional.
              </p>
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => {
                    track("begin_journey", { source: "disclaimer_cta" });
                    navigateTo("/contact");
                  }}
                  className="px-8 py-4 rounded-2xl bg-[#0F6B4A] hover:bg-[#12825A] text-white font-semibold text-base tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] flex items-center gap-3 cursor-pointer group"
                >
                  <span>BEGIN YOUR JOURNEY</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-xs font-mono text-[#34D399]">
                  Personalised Geo-Wellness Concierge Support
                </span>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
export default ClinicalWellnessDisclaimerPage;
