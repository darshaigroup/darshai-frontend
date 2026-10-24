import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Reveal from "../../components/darshaiNew/Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  ArrowRight,
  FileText,
  Building,
  Sparkles,
  Lock,
  Layers,
  Info,
  CheckCircle2,
  Clock,
  Compass,
} from "lucide-react";
const TOPICS = [
  {
    num: "01",
    id: "section-services",
    title: "Services",
    subtitle: "What DARSHAI provides",
  },
  {
    num: "02",
    id: "section-responsibilities",
    title: "Your Responsibilities",
    subtitle: "User obligations",
  },
  {
    num: "03",
    id: "section-assessments",
    title: "Assessments",
    subtitle: "Informational scope",
  },
  {
    num: "04",
    id: "section-recommendations",
    title: "Recommendations",
    subtitle: "Suitability criteria",
  },
  {
    num: "05",
    id: "section-payments",
    title: "Payments",
    subtitle: "Fees & settlement",
  },
  {
    num: "06",
    id: "section-cancellation",
    title: "Cancellation & Refunds",
    subtitle: "Timelines & policy",
  },
  {
    num: "07",
    id: "section-partners",
    title: "Partner Centres",
    subtitle: "Independent delivery",
  },
  {
    num: "08",
    id: "section-ip",
    title: "Intellectual Property",
    subtitle: "Proprietary systems",
  },
  {
    num: "09",
    id: "section-liability",
    title: "Liability",
    subtitle: "Scope & boundaries",
  },
  {
    num: "10",
    id: "section-privacy-law",
    title: "Privacy Policy",
    subtitle: "Data governance",
  },
];
const RESPONSIBILITY_CARDS = [
  {
    id: "resp-1",
    title: "Provide Accurate Information",
    summary:
      "Your assessment and onboarding information must be truthful and complete.",
    legalText:
      "Users must provide truthful, accurate, and complete information during all digital assessments, consultations, and onboarding processes. Accurate biological and lifestyle inputs are critical to the safety, relevance, and clinical integrity of DARSHAI recommendations.",
  },
  {
    id: "resp-2",
    title: "Protect Your Account",
    summary: "Keep credentials and access information secure.",
    legalText:
      "You are solely responsible for maintaining the confidentiality of any access credentials, booking tokens, and verification codes associated with your DARSHAI profile. You must promptly notify DARSHAI of any unauthorized use or security breach.",
  },
  {
    id: "resp-3",
    title: "Use DARSHAI Responsibly",
    summary:
      "Do not misuse the platform, impersonate others or attempt unauthorized access.",
    legalText:
      "You agree not to misrepresent health statuses, impersonate any individual or entity, attempt unauthorized access to platform infrastructure, scrape proprietary data, or disrupt normal service operations. Any breach will result in immediate termination of access.",
  },
  {
    id: "resp-4",
    title: "Follow Centre Policies",
    summary: "Partner-centre rules continue to apply.",
    legalText:
      "Guests must strictly adhere to the individual code of conduct, medical guidelines, clinical schedules, and facility rules established by partner wellness centres. Centre policies operate concurrently with DARSHAI terms.",
  },
];
const IP_LAYERS = [
  {
    label: "BRAND",
    desc: "DARSHAI trademark, design language & visual identity",
  },
  {
    label: "FRAMEWORK",
    desc: "Bioclimatic matching & Geo-Wellness index models",
  },
  {
    label: "ASSESSMENT",
    desc: "Proprietary intake algorithms & physiological telemetry",
  },
  { label: "MATCHING", desc: "Multi-parameter destination alignment engine" },
  {
    label: "SOFTWARE",
    desc: "Web architecture, client concierge portal & booking APIs",
  },
  { label: "RESEARCH", desc: "Biometeorology datasets & clinical literature" },
  {
    label: "CONTENT",
    desc: "Editorial publications, guides & multimedia stories",
  },
  {
    label: "AI OUTPUTS",
    desc: "Real-time algorithmic recommendations & generated summaries",
  },
];
export function TermsPage({ onNavigate }) {
  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTopicId, setActiveTopicId] = useState("section-services");
  const [expandedResponsibility, setExpandedResponsibility] = useState(null);
  const { scrollYProgress } = useScroll();
  const navItemRefs = useRef({});
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setReadingProgress(Math.min(100, Math.max(0, Math.round(latest * 100))));
    });
  }, [scrollYProgress]);
  // Scroll spy to detect active section in viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Offset for sticky navbar + header
      let currentSectionId = TOPICS[0].id;
      for (const topic of TOPICS) {
        const el = document.getElementById(topic.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSectionId = topic.id;
          }
        }
      }
      setActiveTopicId(currentSectionId);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Smoothly keep the active navigation item visible in the horizontal rail
  useEffect(() => {
    const btn = navItemRefs.current[activeTopicId];
    if (btn) {
      btn.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "nearest",
      });
    }
  }, [activeTopicId]);
  const scrollToAnchor = (id, name) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveTopicId(id);
      track("terms_topic_click", { topic: name, id });
    }
  };
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F7] min-h-screen selection:bg-[#0F6B4A] selection:text-white relative">
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10 pointer-events-none">
        <motion.div
          style={{ width: `${readingProgress}%` }}
          className="h-full bg-gradient-to-r from-[#0F6B4A] via-[#34D399] to-[#C7A25A] shadow-[0_0_8px_#34D399]"
        />
      </div>
      <section
        id="terms-hero"
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-20 border-b border-white/10"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0F6B4A]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#C7A25A]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 darshai-container max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
            <p className="typography-eyebrow text-[#C7A25A] tracking-[0.25em] text-xs font-semibold uppercase">
              LEGAL & GOVERNANCE
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6"
          >
            Clear Terms. <br />
            <span className="text-[#34D399]">A Better Journey.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            These Terms govern your access to DARSHAI Geo-Wellness, including
            assessments, recommendations, journey coordination, partner-centre
            services and related offerings.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 border-t border-white/10 text-xs font-mono text-[#A1A1AA]"
          >
            <div>
              <span className="text-[#C7A25A] uppercase tracking-wider block font-semibold mb-1">
                Last Updated
              </span>
              <span className="text-white font-medium">October 2025</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/15" />
            <div>
              <span className="text-[#C7A25A] uppercase tracking-wider block font-semibold mb-1">
                Applies To
              </span>
              <span className="text-white font-medium">
                DARSHAI Geo-Wellness
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/15" />
            <div>
              <span className="text-[#C7A25A] uppercase tracking-wider block font-semibold mb-1">
                Jurisdiction
              </span>
              <span className="text-white font-medium">
                Mangalore, Karnataka, India
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        id="explore-terms"
        className="sticky top-16 z-30 bg-[#F5F5F7]/95 backdrop-blur-md border-b border-[#D2D2D7] py-3.5 transition-all shadow-xs"
      >
        <div className="darshai-container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl bg-white border border-[#D2D2D7] p-1.5 sm:p-2 shadow-sm">
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 px-1 scroll-smooth scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
              {TOPICS.map((topic, idx) => {
                const isActive = activeTopicId === topic.id;
                return (
                  <>
                    <button
                      ref={(el) => {
                        navItemRefs.current[topic.id] = el;
                      }}
                      type="button"
                      onClick={() => scrollToAnchor(topic.id, topic.title)}
                      className={`group flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all duration-200 text-left whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-[#0E4D3A] text-white shadow-xs border border-[#0E4D3A]"
                          : "border border-transparent hover:border-[#0E4D3A]/20 hover:bg-[#0E4D3A]/5 active:bg-[#0E4D3A]/10 text-[#1D1D1F]"
                      }`}
                    >
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#F5F5F7] text-[#0E4D3A] group-hover:bg-[#0E4D3A] group-hover:text-white"
                        }`}
                      >
                        {topic.num}
                      </span>
                      <span
                        className={`text-xs sm:text-[13px] transition-colors ${
                          isActive
                            ? "font-bold text-white"
                            : "font-semibold text-[#1D1D1F] group-hover:text-[#0E4D3A]"
                        }`}
                      >
                        {topic.title}
                      </span>
                      <span
                        className={`transition-all duration-200 text-xs font-bold -ml-0.5 ${
                          isActive
                            ? "text-white opacity-100 translate-x-0.5"
                            : "text-[#0E4D3A] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                        }`}
                      >
                        ↓
                      </span>
                    </button>
                    {idx < TOPICS.length - 1 && (
                      <span
                        className="text-[#D2D2D7] text-xs select-none shrink-0"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section
        id="section-services"
        className="py-24 md:py-32 bg-[#0E0E10] border-b border-white/10 relative"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                01 — SERVICE DESCRIPTION
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                What These Terms Cover.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                DARSHAI helps coordinate the journey through five structured
                disciplines.
              </p>
            </div>
          </Reveal>
          <div className="space-y-4 mb-12">
            {[
              {
                title: "Assessment",
                desc: "Structured evaluation to understand your health goals, biometeorological preferences, lifestyle factors, and journey requirements.",
                badge: "EVALUATION",
                icon: Compass,
              },
              {
                title: "Recommendations",
                desc: "Algorithmic and human-verified suitability matches connecting you to accredited sanctuaries and clinical pathways.",
                badge: "INTELLIGENCE",
                icon: Sparkles,
              },
              {
                title: "Coordination",
                desc: "Dedicated private concierge support before, during, and after your journey, from visa clearance to arrival chauffeurs.",
                badge: "CONCIERGE",
                icon: Clock,
              },
              {
                title: "Corporate",
                desc: "Executive wellness architectures, leadership recovery programs, and institutional Geo-Wellness services.",
                badge: "ENTERPRISE",
                icon: Building,
              },
              {
                title: "Insights",
                desc: "Educational literature, biometeorology research, and evidence-based perspectives exploring environmental longevity.",
                badge: "EDITORIAL",
                icon: FileText,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  className="p-6 sm:p-7 rounded-[22px] bg-[#141416] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  key={item.title}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F6B4A]/20 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C7A25A] font-bold">
                          {item.badge}
                        </span>
                        <span className="text-white/30 text-xs">·</span>
                        <h3 className="font-display text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-2xl font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-6 sm:p-8 rounded-[24px] border border-[#0F6B4A] bg-[#0F6B4A]/10 shadow-[0_0_30px_-5px_rgba(15,107,74,0.2)]">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0F6B4A] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-lg sm:text-xl font-semibold text-white mb-1">
                  DARSHAI ≠ Wellness Centre
                </h4>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  DARSHAI does not own, operate, or manage wellness centres
                  unless explicitly stated in writing. We operate as an
                  independent matching and private journey coordination
                  platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="section-responsibilities"
        className="py-24 md:py-32 bg-[#F5F5F7] text-[#1D1D1F] border-b border-[#D2D2D7]"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="typography-eyebrow text-[#0E4D3A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                02 — USER RESPONSIBILITIES
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
                Your Part in The Journey.
              </h2>
              <p className="text-base sm:text-lg text-[#48484A] leading-relaxed">
                Clear recommendations require honest collaboration. Four
                commitments ensure a safe and effective journey.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {RESPONSIBILITY_CARDS.map((card) => {
              const isExpanded = expandedResponsibility === card.id;
              return (
                <div
                  className={`p-6 sm:p-8 rounded-[24px] bg-white border transition-all duration-300 ${
                    isExpanded
                      ? "border-[#0E4D3A] shadow-lg ring-1 ring-[#0E4D3A]/30"
                      : "border-[#D2D2D7] hover:border-[#0E4D3A]/50 hover:shadow-sm"
                  }`}
                  key={card.id}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-xl font-semibold text-[#1D1D1F] tracking-tight">
                      {card.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedResponsibility(isExpanded ? null : card.id)
                      }
                      className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#0E4D3A] hover:text-white text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      aria-label="Toggle legal clause"
                    >
                      <span className="text-base font-bold">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed mb-4">
                    {card.summary}
                  </p>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-[#D2D2D7] text-xs text-[#6E6E73] leading-relaxed font-mono bg-[#F5F5F7]/80 p-3.5 rounded-xl">
                          <span className="text-[#0E4D3A] font-bold block mb-1">
                            Contractual Provision:
                          </span>
                          {card.legalText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="section-assessments"
        className="py-24 md:py-32 bg-[#0E0E10] border-b border-white/10"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-3">
                03 & 04 — SCOPE & LIMITATIONS
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-4">
                Guidance. <br />
                <span className="text-[#34D399]">Not A Guarantee.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
                DARSHAI assessments provide environmental and lifestyle
                orientation. They do not replace clinical physician care.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#141416]/90 backdrop-blur-2xl border-2 border-white hover:border-[#C7A25A] shadow-[0_0_35px_rgba(199,162,90,0.18)] hover:shadow-[0_0_45px_rgba(199,162,90,0.35)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 group">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C7A25A]/15 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#C7A25A]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] font-semibold">
                    ASSESSMENT BOUNDARY
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-4">
                  DARSHAI Assessment
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-4">
                  Not intended to:
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-white/85">
                  {[
                    "Diagnose disease or acute pathology",
                    "Prescribe pharmaceutical medication",
                    "Replace primary medical consultation",
                    "Provide emergency medical guidance",
                    "Deliver psychiatric treatment",
                  ].map((item) => (
                    <li className="flex items-start gap-3" key={item}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#A1A1AA] relative z-10">
                Assessments are educational & informational in scope.
              </div>
            </div>
            <div
              id="section-recommendations"
              className="p-8 sm:p-10 rounded-[28px] bg-[#141416]/90 backdrop-blur-2xl border-2 border-white hover:border-[#34D399] shadow-[0_0_35px_rgba(52,211,153,0.18)] hover:shadow-[0_0_45px_rgba(52,211,153,0.35)] flex flex-col justify-between scroll-mt-28 relative overflow-hidden transition-all duration-300 group"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#34D399]/15 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] font-semibold">
                    RECOMMENDATION METHODOLOGY
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-4">
                  DARSHAI Recommendations
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#A1A1AA] font-mono mb-4">
                  Based on:
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-white/85">
                  {[
                    "Structured personal assessment telemetry",
                    "Validated Geo-Wellness biometeorology frameworks",
                    "Strict sanctuary suitability & hygiene criteria",
                    "Human clinical navigator review processes",
                    "Audited partner sanctuary disclosures",
                  ].map((item) => (
                    <li className="flex items-start gap-3" key={item}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-[#A1A1AA]">
                Suitability determinations · Not guaranteed outcomes.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="section-payments"
        className="py-24 md:py-32 bg-[#F5F5F7] text-[#1D1D1F] border-b border-[#D2D2D7]"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="typography-eyebrow text-[#0E4D3A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                05 — PAYMENT TERMS
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
                How Payment Works.
              </h2>
              <p className="text-base sm:text-lg text-[#48484A] leading-relaxed">
                Clear pricing, transparent taxes, and verified written
                confirmations across all journey stages.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
            {[
              {
                step: "01",
                name: "SERVICE",
                desc: "Select assessment, concierge, or sanctuary itinerary",
              },
              {
                step: "02",
                name: "PRICE",
                desc: "Transparent quote with applicable statutory GST/taxes",
              },
              {
                step: "03",
                name: "PAYMENT",
                desc: "Direct centre, authorized coordinator, or split model",
              },
              {
                step: "04",
                name: "CONFIRMATION",
                desc: "Legally confirmed upon successful payment & voucher",
              },
              {
                step: "05",
                name: "JOURNEY",
                desc: "Seamless on-ground concierge support commences",
              },
            ].map((node) => (
              <div
                className="p-5 rounded-2xl bg-white border border-[#D2D2D7] shadow-sm flex flex-col justify-between"
                key={node.step}
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#0E4D3A] block mb-1">
                    STEP {node.step}
                  </span>
                  <h3 className="font-display text-base font-semibold text-[#1D1D1F] mb-2">
                    {node.name}
                  </h3>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#D2D2D7] text-xs sm:text-sm text-[#48484A] leading-relaxed">
            <span className="font-semibold text-[#1D1D1F]">
              Payment Settlement Structure:
            </span>{" "}
            Depending on the journey structure, payment may be collected
            directly by a partner centre, through DARSHAI as an authorized
            billing coordinator, or through a split-payment model. Exact
            settlement details are disclosed prior to final authorization.
          </div>
        </div>
      </section>
      <section
        id="section-cancellation"
        className="py-24 md:py-32 bg-[#0E0E10] border-b border-white/10"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                06 — REFUND FRAMEWORK
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                Cancellation & Refunds.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                General DARSHAI policy framework for coordination services.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                window: "30+ DAYS",
                headline: "Refund may apply",
                desc: "Eligible after deducting completed assessment fees, admin costs, and non-refundable vendor commitments.",
                badge: "STANDARD",
              },
              {
                window: "15–30 DAYS",
                headline: "Partial refund may apply",
                desc: "Partial refund provided after deducting scheduled concierge hours and partner reservation retainers.",
                badge: "PARTIAL",
              },
              {
                window: "<15 DAYS",
                headline: "Centre & travel policies apply",
                desc: "Subject strictly to sanctuary terms, airline penalties, and on-ground partner obligations.",
                badge: "COMMITTED",
              },
              {
                window: "NO-SHOW",
                headline: "Payments may be forfeited",
                desc: "Failure to arrive without prior written notice results in total forfeiture of paid amounts.",
                badge: "FORFEITURE",
              },
            ].map((col) => (
              <div
                className="p-6 rounded-[22px] bg-[#141416] border border-white/10 flex flex-col justify-between"
                key={col.window}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#34D399] font-bold mb-2">
                    <span>{col.window}</span>
                    <span className="text-[10px] text-[#C7A25A]">
                      {col.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {col.headline}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal">
                    {col.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141416] border-2 border-[#34D399] text-xs sm:text-sm text-white/90 leading-relaxed shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300">
            <span className="text-[#34D399] font-semibold uppercase tracking-wider block mb-1 font-mono">
              Important Legal Consideration
            </span>
            Each partner centre maintains sovereign cancellation, refund, and
            rescheduling rules. Where sanctuary terms differ from the general
            DARSHAI coordination policy framework, the centre’s terms govern the
            accommodation and clinical portion of your booking.
          </div>
        </div>
      </section>
      <section
        id="section-partners"
        className="py-24 md:py-32 bg-[#F5F5F7] text-[#1D1D1F] border-b border-[#D2D2D7]"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="typography-eyebrow text-[#0E4D3A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                07 — INSTITUTIONAL ROLES
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight leading-tight mb-4">
                DARSHAI Coordinates. <br />
                <span className="text-[#0E4D3A]">Partners Deliver.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#48484A]">
                A clear legal and operational division of responsibilities
                ensures uncompromising quality and accountability.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-6">
            <div className="md:col-span-5 p-8 rounded-[24px] bg-white border border-[#D2D2D7] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0E4D3A]" />
                <h3 className="font-display text-2xl font-bold text-[#1D1D1F]">
                  DARSHAI
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#48484A]">
                {[
                  "Assessment & Bioclimatic Telemetry",
                  "Environmental & Clinical Matching",
                  "Personalized Suitability Recommendations",
                  "Private Concierge & Journey Coordination",
                ].map((item) => (
                  <li className="flex items-center gap-2.5" key={item}>
                    <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-1 text-center flex flex-col items-center justify-center">
              <div className="w-px h-8 md:h-12 bg-[#0E4D3A]/40" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0E4D3A] font-bold py-1">
                COORDINATION
              </span>
              <div className="w-px h-8 md:h-12 bg-[#0E4D3A]/40" />
            </div>
            <div className="md:col-span-5 p-8 rounded-[24px] bg-white border border-[#D2D2D7] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C7A25A]" />
                <h3 className="font-display text-2xl font-bold text-[#1D1D1F]">
                  PARTNER CENTRE
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#48484A]">
                {[
                  "Therapeutic Programme Delivery",
                  "Clinical & Ayurvedic Medical Interventions",
                  "Sanctuary Accommodation & Diet",
                  "On-Site Safety & Regulatory Compliance",
                ].map((item) => (
                  <li className="flex items-center gap-2.5" key={item}>
                    <CheckCircle2 className="w-4 h-4 text-[#C7A25A] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        id="section-ip"
        className="py-24 md:py-32 bg-[#0E0E10] border-b border-white/10"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                08 — INTELLECTUAL PROPERTY
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                Built By DARSHAI. <br />
                <span className="text-[#34D399]">Protected As DARSHAI.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                All platform algorithms, spatial indexes, and editorial
                publications remain the exclusive intellectual property of
                DARSHAI Group Pvt. Ltd.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {IP_LAYERS.map((layer, idx) => (
              <div
                className="p-5 rounded-[20px] bg-[#141416] border border-white/10 hover:border-[#0F6B4A]/50 transition-all"
                key={layer.label}
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#34D399] font-bold mb-2">
                  <span>LAYER {String(idx + 1).padStart(2, "0")}</span>
                  <Layers className="w-3.5 h-3.5 text-[#34D399]" />
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-1">
                  {layer.label}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed font-normal">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="section-liability"
        className="py-24 md:py-32 bg-[#0A0A0A] border-b border-white/10"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                09 — LIABILITY BOUNDARIES
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                What DARSHAI Is Responsible For.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Clear boundary definitions protecting both guests and platform
                governance.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            <div className="p-8 rounded-[26px] bg-[#141416] border border-[#0F6B4A]/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                <h3 className="font-display text-xl font-semibold text-white">
                  DARSHAI Core Responsibilities
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-white/85">
                {[
                  "Assessment fidelity & objective analysis",
                  "Transparent suitability matching logic",
                  "Sanctuary partner accreditation auditing",
                  "Coordination communication & booking transmission",
                ].map((item) => (
                  <li className="flex items-start gap-2.5" key={item}>
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-[26px] bg-[#141416] border border-white/15">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C7A25A]" />
                <h3 className="font-display text-xl font-semibold text-white">
                  Outside DARSHAI's Direct Control
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#A1A1AA]">
                {[
                  "Airline schedule disruptions & airport ground delays",
                  "Regional weather variations & environmental forces",
                  "Partner-centre clinical responses & medical outcomes",
                  "Third-party property damages or personal injury",
                ].map((item) => (
                  <li className="flex items-start gap-2.5" key={item}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        id="section-privacy-law"
        className="py-24 md:py-32 bg-[#F5F5F7] text-[#1D1D1F]"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-[28px] bg-white border border-[#D2D2D7] text-center max-w-3xl mx-auto shadow-sm">
            <Lock className="w-8 h-8 text-[#0E4D3A] mx-auto mb-4" />
            <p className="typography-eyebrow text-[#0E4D3A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
              DATA GOVERNANCE
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1D1D1F] mb-3">
              Your Privacy Is Covered Separately.
            </h3>
            <p className="text-sm sm:text-base text-[#48484A] max-w-lg mx-auto mb-6">
              Your personal and health information is governed under our
              dedicated Apple-grade Privacy Policy.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.("privacy")}
              className="darshai-btn-primary uppercase text-xs !h-12 !px-7 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>VIEW PRIVACY POLICY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default TermsPage;
