import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../../components/darshaiNew/Reveal";
import SmartImage from "../../components/darshaiNew/SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import {
  Shield,
  Lock,
  Server,
  FileCheck2,
  ChevronDown,
  ArrowRight,
  Globe,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  X,
  Cookie,
  User,
  Heart,
  Plane,
  Laptop,
} from "lucide-react";
// ============================================================================
// DATA DEFINITIONS (EXACT SPECIFICATION FROM PROMPT)
// ============================================================================
// SECTION 02: PHILOSOPHY CARDS
const PHILOSOPHY_CARDS = [
  {
    num: "01",
    tag: "PURPOSE",
    title: "Understand You",
    description:
      "We collect information to understand your wellness goals and preferences.",
  },
  {
    num: "02",
    tag: "CURATION",
    title: "Guide You",
    description: "We use information to build personalized recommendations.",
  },
  {
    num: "03",
    tag: "COORDINATION",
    title: "Coordinate You",
    description:
      "We use information to manage bookings, travel and wellness journeys.",
  },
  {
    num: "04",
    tag: "GOVERNANCE",
    title: "Protect You",
    description: "We never sell personal information.",
  },
];
// SECTION 03: 4 GIANT INFORMATION CARDS
const COLLECT_CARDS = [
  {
    id: "personal",
    title: "PERSONAL PROFILE",
    icon: User,
    accent: "#0F6B4A",
    items: [
      { name: "Name", detail: "Legal name for identity verification" },
      { name: "Email", detail: "Direct encrypted journey communications" },
      { name: "Mobile", detail: "Concierge coordination and alerts" },
      { name: "Country", detail: "Jurisdiction & travel logistics alignment" },
    ],
  },
  {
    id: "wellness",
    title: "WELLNESS INSIGHTS",
    icon: Heart,
    accent: "#C7A25A",
    items: [
      { name: "Goals", detail: "Detox, recovery, healthy ageing objectives" },
      { name: "Lifestyle", detail: "Sleep cycles, stress tolerance & pacing" },
      {
        name: "Journey Preferences",
        detail: "Atmospheric and duration parameters",
      },
      {
        name: "Programme Interests",
        detail: "Clinical ayurveda, longevity, panchakarma",
      },
    ],
  },
  {
    id: "travel",
    title: "TRAVEL COORDINATION",
    icon: Plane,
    accent: "#0F6B4A",
    items: [
      { name: "Flights", detail: "Arrival and departure synchronization" },
      {
        name: "Arrival Details",
        detail: "VIP tarmac and transfer coordination",
      },
      {
        name: "Emergency Contacts",
        detail: "Designated medical & personal proxies",
      },
      {
        name: "Accommodation Preferences",
        detail: "Sanctuary suite requirements",
      },
    ],
  },
  {
    id: "digital",
    title: "DIGITAL EXPERIENCE",
    icon: Laptop,
    accent: "#C7A25A",
    items: [
      { name: "Cookies", detail: "Essential session state preservation" },
      { name: "Analytics", detail: "Aggregated, non-identifiable telemetry" },
      { name: "Device Information", detail: "Responsive viewport calibration" },
      {
        name: "Website Usage",
        detail: "Exploration patterns to refine matching",
      },
    ],
  },
];
// SECTION 04: HORIZONTAL TIMELINE STEPS
const TIMELINE_STEPS = [
  {
    step: "01",
    name: "Assess",
    title: "Initial Diagnostic Inquiry",
    detail:
      "We evaluate baseline wellness intent, physiological pace, and medical recovery goals.",
  },
  {
    step: "02",
    name: "Understand",
    title: "Environmental Synthesis",
    detail:
      "Our intelligence synthesizes climate preferences, altitude tolerances, and therapeutic intensity.",
  },
  {
    step: "03",
    name: "Match",
    title: "Sanctuary Alignment",
    detail:
      "We filter verified sanctuaries to surface only the destinations clinically qualified for you.",
  },
  {
    step: "04",
    name: "Coordinate",
    title: "Frictionless Journey Logistics",
    detail:
      "We manage confidential scheduling, concierge transfers, and arrival health dossiers.",
  },
  {
    step: "05",
    name: "Support",
    title: "Continuous Care Supervision",
    detail:
      "Throughout your stay and post-programme recovery, our governance team remains active.",
  },
];
// SECTION 05: DATA SHARING GLASS CARDS
const SHARING_CARDS = [
  {
    title: "Internal Teams",
    role: "Assessment & Support",
    detail:
      "Restricted to certified clinical advisors and dedicated journey concierges.",
  },
  {
    title: "Wellness Partners",
    role: "Only when required",
    detail:
      "Shared strictly with your selected sanctuary doctors for programme tailoring.",
  },
  {
    title: "Technology Providers",
    role: "Payments & Hosting",
    detail:
      "Encrypted tier-1 infrastructure partners under strict data-protection agreements.",
  },
  {
    title: "Legal Compliance",
    role: "Where legally required",
    detail:
      "Disclosed only upon certified statutory judicial order or emergency safeguarding.",
  },
];
// SECTION 07: SECURITY DASHBOARD
const SECURITY_CONTROLS = [
  {
    icon: Shield,
    title: "Data Protection",
    desc: "AES-256 military-grade encryption for all data at rest and in transit.",
    metric: "256-bit AES",
  },
  {
    icon: Lock,
    title: "Secure Access",
    desc: "Strict multi-factor authentication and role-governed zero-trust boundaries.",
    metric: "Zero-Trust MFA",
  },
  {
    icon: Server,
    title: "Protected Infrastructure",
    desc: "Enterprise cloud hosting in isolated virtual networks with automatic failover.",
    metric: "ISO 27001",
  },
  {
    icon: FileCheck2,
    title: "Operational Controls",
    desc: "Continuous independent security penetration testing and clinical audit trails.",
    metric: "SOC2 Type II",
  },
];
// SECTION 08: YOUR RIGHTS
const USER_RIGHTS = [
  {
    id: "access",
    title: "Request Access",
    desc: "Obtain a comprehensive copy of all personal, diagnostic and journey data DARSHAI holds about you.",
  },
  {
    id: "update",
    title: "Update Information",
    desc: "Rectify inaccuracies in your profile, medical history notes, or contact preferences instantly.",
  },
  {
    id: "delete",
    title: "Delete Information",
    desc: "Exercise your right to be forgotten. Completely erase your digital footprint from our active systems.",
  },
  {
    id: "withdraw",
    title: "Withdraw Consent",
    desc: "Revoke permissions for non-essential communications, advisory matching, or analytical processing.",
  },
  {
    id: "understand",
    title: "Understand Processing",
    desc: "Request an explicit explanation of the matching algorithms, clinical logic, and partner coordination.",
  },
];
// SECTION 11: LEGAL ACCORDION CONTENT
const LEGAL_SECTIONS = [
  {
    id: "policy",
    title: "Privacy Policy Overview",
    content: `DARSHAI Group Private Limited ("DARSHAI", "we", "our" or "us") respects your privacy and is fundamentally committed to protecting the personal and wellness data you share with us. This Privacy Policy governs all interactions across darshai.com, our concierge consultation channels, our proprietary Geo-Wellness matching architecture, and all coordination services facilitated between you and our verified partner sanctuaries. By engaging our platform, you acknowledge the privacy practices delineated herein.`,
  },
  {
    id: "collect",
    title: "Information We Collect",
    content: `We collect information necessary to deliver clinically sound, personalized Geo-Wellness journeys. This includes Direct Identifiers (full name, email, phone number, nationality), Wellness Diagnostics (self-reported health goals, physiological constraints, treatment preferences), Travel Records (flight itineraries, airport transfer requirements, emergency contacts), and Technical Telemetry (IP address, browser type, cookies, and navigational actions to ensure portal stability). We do not collect biological biometric samples or unconsented medical records.`,
  },
  {
    id: "sharing",
    title: "Information Sharing & Third Parties",
    content: `DARSHAI maintains an uncompromising stance: WE NEVER SELL, LEASE, OR MONETIZE YOUR PERSONAL DATA. Information is transmitted strictly to verified sanctuary physicians and directors solely after you select a journey, to vetted payment gateways for transaction clearing under PCI-DSS standards, and to statutory authorities only when compelled by valid legal subpoenas. All third parties operate under legally binding data processing agreements enforcing identical confidentiality standards.`,
  },
  {
    id: "security",
    title: "Data Security Architecture",
    content: `We implement multi-layered administrative, physical, and technological safeguards. Data in transit is secured using Transport Layer Security (TLS 1.3), while all stored records are safeguarded via AES-256 block encryption. Access to patient files is restricted using principle-of-least-privilege role-based access control (RBAC), and every database query is recorded in immutable audit logs.`,
  },
  {
    id: "cookies",
    title: "Cookie Governance & Tracking",
    content: `We deploy cookies and similar local storage technologies to sustain secure user sessions, maintain linguistic and regional preferences, and gather aggregated performance telemetry. Essential cookies cannot be disabled as they are required for foundational platform integrity. Analytics and performance cookies can be customized at any time through our interactive preference manager. We do not use cross-site tracking or third-party advertising pixels.`,
  },
  {
    id: "rights",
    title: "Your Rights & Jurisdiction",
    content: `Depending on your country of residence (including GDPR, CCPA, and India's Digital Personal Data Protection Act 2023), you hold immutable legal rights: the right to data portability, the right to inspect all stored dossiers, the right to rectification of obsolete facts, the right to deletion, and the right to lodge a complaint with supervisory authorities. We process all data subject requests within 30 calendar days at zero cost.`,
  },
  {
    id: "contact",
    title: "Regulatory & Contact Disclosures",
    content: `For questions, formal legal notices, or supervisory inquiries, address our Data Protection Officer at privacy@darshai.com. DARSHAI Group Private Limited is incorporated under the laws of India, with primary administrative offices in Mangalore and Bengaluru, Karnataka. Physical inquiries may be addressed to: Data Protection Office, DARSHAI Group, Level 4, Prestige Meridian, MG Road, Bengaluru 560001, Karnataka, India.`,
  },
];
export function PrivacyPolicyPage({ onNavigate }) {
  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = `/${page}`;
    }
  };
  // State for Section 04: Interactive Timeline Step
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  // State for Section 08: Rights Request Modal
  const [selectedRight, setSelectedRight] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [requestNote, setRequestNote] = useState("");
  // State for Section 09: Cookies Preferences
  const [cookiePrefs, setCookiePrefs] = useState({
    essential: true, // always true
    analytics: true,
    security: true,
    performance: true,
  });
  // State for Section 11: Legal Accordion (only one open at a time)
  const [openLegalSection, setOpenLegalSection] = useState("policy");
  // Track page view
  useEffect(() => {
    track("view_privacy_page", { timestamp: Date.now() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleRightSubmit = (e) => {
    e.preventDefault();
    if (!requestEmail) return;
    track("submit_privacy_right_request", {
      right: selectedRight,
      email: requestEmail,
    });
    setRequestSubmitted(true);
    setTimeout(() => {
      setSelectedRight(null);
      setRequestSubmitted(false);
      setRequestEmail("");
      setRequestNote("");
    }, 2800);
  };
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-[#F5F5F7] selection:bg-[#0F6B4A] selection:text-white relative overflow-hidden">
      <section
        id="privacy-hero"
        className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-28 sm:py-36 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[340px] sm:h-[600px] md:h-[750px] bg-[#0F6B4A]/25 rounded-full blur-[140px] sm:blur-[180px] pointer-events-none animate-pulse duration-1000" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#C7A25A]/10 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-[#34D399]/40 rounded-full animate-ping duration-1000" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-[#C7A25A]/30 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-white/20 rounded-full" />
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
              DARSHAI PRIVACY
            </span>
          </motion.div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight text-white leading-[1.08]"
            >
              <span className="block">Your Wellness Data.</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-white/95"
              >
                Protected.
              </motion.span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8"
          >
            <span className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-[#34D399] tracking-tight block">
              Designed For Trust.
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            DARSHAI collects only the information required to understand your
            wellness goals, coordinate your journey, and deliver personalized
            Geo-Wellness recommendations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-14 sm:mt-20 flex flex-col items-center gap-2 text-xs font-mono text-[#A1A1AA]/60"
          >
            <span>DISCOVER THE ARCHITECTURE</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#0F6B4A]" />
          </motion.div>
        </div>
      </section>
      <section
        id="privacy-philosophy"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>FIRST PRINCIPLES</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Why Privacy Matters
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Health and wellness decisions are deeply personal. We start with
                why we touch data before we ever ask for it.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_CARDS.map((card, idx) => (
              <Reveal delay={idx * 0.1} key={card.title}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full bg-[#111113] rounded-[24px] border border-white/[0.08] hover:border-[#0F6B4A]/60 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#0F6B4A]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                      <span className="text-xs font-mono text-[#C7A25A] font-semibold">
                        {card.tag}
                      </span>
                      <span className="text-xs font-mono text-[#A1A1AA]/50">
                        {card.num}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3 group-hover:text-[#34D399] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-[#34D399] opacity-75 group-hover:opacity-100 transition-opacity">
                    <span>Guaranteed Principle</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="what-we-collect"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#0D0D0F]"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>DATA MINIMIZATION</span>
              </p>
              <h2 className="text-4xl sm:text-6xl font-display font-semibold tracking-tight text-white mb-4">
                What Information We Collect
              </h2>
              <p className="text-lg sm:text-xl text-[#A1A1AA] leading-relaxed">
                Structured into four clearly demarcated domains. Never
                ambiguous, never gathered without your explicit input.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {COLLECT_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal delay={idx * 0.08} key={card.id}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative rounded-[28px] sm:rounded-[32px] bg-[#141416] border border-white/15 hover:border-[#34D399] p-7 sm:p-10 shadow-2xl hover:shadow-[0_0_60px_rgba(52,211,153,0.45)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
                  >
                    <div
                      className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: card.accent }}
                    />
                    <div>
                      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#34D399]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-display font-semibold tracking-wider text-white">
                            {card.title}
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-[#A1A1AA]/60 uppercase">
                          Domain 0{idx + 1}
                        </span>
                      </div>
                      <div className="space-y-3.5">
                        {card.items.map((item) => (
                          <div
                            className="p-3.5 sm:p-4 rounded-[16px] bg-white/[0.03] group-hover:bg-white/[0.05] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 transition-colors"
                            key={item.name}
                          >
                            <span className="text-sm font-medium text-white group-hover:text-[#34D399] transition-colors">
                              {item.name}
                            </span>
                            <span className="text-xs sm:text-[13px] text-[#A1A1AA] font-normal">
                              {item.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#A1A1AA]/70">
                      <span>Zero Secondary Usage</span>
                      <span className="text-[#34D399]">100% Encrypted</span>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="how-darshai-uses-data"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>LIFECYCLE PIPELINE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                How DARSHAI Uses Data
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Step-by-step transparency from initial assessment to
                post-programme restoration.
              </p>
            </div>
          </Reveal>
          <div className="relative mb-14">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/[0.08]" />
            <div
              className="hidden lg:block absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#0F6B4A] shadow-[0_0_12px_#34D399] transition-all duration-500"
              style={{
                width: `${(activeTimelineStep / (TIMELINE_STEPS.length - 1)) * 100}%`,
              }}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
              {TIMELINE_STEPS.map((step, idx) => {
                const isActive = activeTimelineStep === idx;
                const isPast = activeTimelineStep > idx;
                return (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTimelineStep(idx);
                      track("privacy_timeline_step", { step: step.name });
                    }}
                    className={`p-4 sm:p-5 rounded-[20px] border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px] ${
                      isActive
                        ? "bg-[#141416] border-[#34D399] shadow-[0_0_24px_-4px_rgba(52,211,153,0.3)] ring-1 ring-[#34D399]"
                        : isPast
                          ? "bg-[#111113] border-[#0F6B4A]/50 text-white"
                          : "bg-[#111113] border-white/[0.08] hover:border-white/20 text-[#A1A1AA]"
                    }`}
                    key={step.name}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-[#C7A25A] font-semibold">
                        STEP {step.step}
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          isActive
                            ? "bg-[#34D399] shadow-[0_0_10px_#34D399]"
                            : isPast
                              ? "bg-[#0F6B4A]"
                              : "bg-white/20"
                        }`}
                      />
                    </div>
                    <span className="text-base sm:text-lg font-display font-semibold text-white">
                      {step.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-12 rounded-[28px] bg-[#141416] border border-[#0F6B4A]/50 relative overflow-hidden shadow-2xl"
              key={activeTimelineStep}
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F6B4A]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] font-semibold mb-2 block">
                  STAGE {TIMELINE_STEPS[activeTimelineStep].step} PIPELINE
                </span>
                <h3 className="text-2xl sm:text-4xl font-display font-semibold text-white mb-4">
                  {TIMELINE_STEPS[activeTimelineStep].title}
                </h3>
                <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-6">
                  {TIMELINE_STEPS[activeTimelineStep].detail}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pt-4 border-t border-white/[0.08]">
                  <span className="flex items-center gap-1.5 text-[#34D399]">
                    <Check className="w-3.5 h-3.5" /> Clinical Governance Active
                  </span>
                  <span>•</span>
                  <span>Zero Secondary Ad Marketing</span>
                  <span>•</span>
                  <span>Encrypted Channel</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <section
        id="data-sharing"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#0D0D0F]"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>ABSOLUTE FIDUCIARY RESPONSIBILITY</span>
              </p>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-white mb-6">
                We Don't Sell Data.
              </h2>
              <p className="text-base sm:text-xl text-[#A1A1AA] leading-relaxed">
                Ever. Information is exchanged strictly with explicit parties
                required to orchestrate your restorative journey.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHARING_CARDS.map((card, idx) => (
              <Reveal delay={idx * 0.1} key={card.title}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full rounded-[24px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-[#0F6B4A] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-radial-[circle_at_top,_rgba(15,107,74,0.12),_transparent_70%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <span className="text-[11px] font-mono text-[#C7A25A] uppercase tracking-wider font-semibold block mb-4">
                      {card.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3 group-hover:text-[#34D399] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#A1A1AA]/60">
                    <span>Authorized Scope</span>
                    <span className="text-[#34D399]">Restricted</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="international-privacy"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative overflow-hidden"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-14 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#0F6B4A]" />
                <span>CROSS-BORDER GOVERNANCE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Global Wellness. Responsible Data Handling.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Whether arriving from London, Zurich, Dubai, or Singapore, your
                information traverses encrypted international corridors anchored
                in India's sovereign privacy statutes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#0E0E11] border border-white/[0.08] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <SmartImage
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&auto=format&fit=crop&q=80"
                  alt="Global geographic network telemetry map"
                  className="w-full h-full object-cover object-center opacity-30 mix-blend-screen filter brightness-90 contrast-125"
                />
                <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_#0E0E11_95%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] via-transparent to-[#0E0E11]" />
              </div>
              <div className="absolute top-[48%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#0F6B4A]/40 rounded-full blur-[110px] pointer-events-none" />
              <div className="absolute top-[48%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#34D399]/25 rounded-full blur-[50px] pointer-events-none" />
              <div className="relative aspect-[16/9] sm:aspect-[16/7.5] w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 1000 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full select-none"
                >
                  <defs>
                    <radialGradient
                      id="indiaPulseGlow"
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
                      <stop
                        offset="40%"
                        stopColor="#0F6B4A"
                        stopOpacity="0.5"
                      />
                      <stop offset="100%" stopColor="#0F6B4A" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient
                      id="arcUsToIndia"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#A1A1AA" stopOpacity="0.4" />
                      <stop
                        offset="50%"
                        stopColor="#C7A25A"
                        stopOpacity="0.8"
                      />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient
                      id="arcEuToIndia"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#C7A25A" stopOpacity="0.4" />
                      <stop
                        offset="60%"
                        stopColor="#34D399"
                        stopOpacity="0.85"
                      />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient
                      id="arcGccToIndia"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#C7A25A" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient
                      id="arcApacToIndia"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#A1A1AA" stopOpacity="0.4" />
                      <stop
                        offset="50%"
                        stopColor="#34D399"
                        stopOpacity="0.8"
                      />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                    </linearGradient>
                    <pattern
                      id="dotGridMap"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="2"
                        cy="2"
                        r="0.75"
                        fill="rgba(255, 255, 255, 0.08)"
                      />
                    </pattern>
                    <filter
                      id="packetGlow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="2.5"
                        result="blur"
                      />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <rect
                    width="1000"
                    height="460"
                    fill="url(#dotGridMap)"
                    opacity="0.65"
                  />
                  <g
                    opacity="0.08"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    strokeDasharray="3 6"
                  >
                    <line x1="50" y1="230" x2="950" y2="230" />
                    <line x1="50" y1="120" x2="950" y2="120" />
                    <line x1="50" y1="340" x2="950" y2="340" />
                    <path d="M 500 20 Q 520 230 500 440" />
                    <path d="M 250 20 Q 280 230 250 440" />
                    <path d="M 750 20 Q 720 230 750 440" />
                  </g>
                  <g
                    fill="rgba(255, 255, 255, 0.035)"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  >
                    <path d="M 110 75 C 130 55, 180 50, 230 60 C 270 70, 310 85, 290 125 C 275 155, 250 185, 235 210 C 215 215, 195 190, 175 170 C 150 145, 125 120, 110 95 Z" />
                    <path d="M 330 40 C 355 35, 385 45, 375 70 C 360 85, 335 80, 330 55 Z" />
                    <path d="M 245 225 C 275 225, 315 240, 325 285 C 335 330, 310 380, 280 425 C 265 410, 250 350, 240 295 C 235 260, 240 235, 245 225 Z" />
                    <path d="M 450 90 C 475 75, 520 75, 545 95 C 555 120, 535 150, 505 160 C 475 160, 455 145, 445 125 C 440 110, 445 95, 450 90 Z" />
                    <path d="M 430 95 C 440 90, 445 105, 440 115 C 435 120, 428 115, 430 95 Z" />
                    <path d="M 460 175 C 500 165, 545 175, 565 215 C 580 260, 565 320, 530 365 C 500 375, 475 330, 465 280 C 455 240, 450 200, 460 175 Z" />
                    <path d="M 555 90 C 620 65, 750 60, 850 100 C 880 130, 850 190, 810 220 C 765 230, 720 180, 680 160 C 630 150, 580 145, 555 110 Z" />
                    <path d="M 770 310 C 815 295, 875 305, 875 350 C 865 390, 810 405, 765 375 C 755 350, 755 325, 770 310 Z" />
                  </g>
                  <g>
                    <path
                      d="M 632 185 L 685 190 L 678 255 L 658 278 L 640 230 Z"
                      fill="#0F6B4A"
                      fillOpacity="0.4"
                      stroke="#34D399"
                      strokeWidth="2"
                      className="transition-all"
                    />
                    <circle
                      cx="664"
                      cy="288"
                      r="3"
                      fill="#34D399"
                      opacity="0.8"
                    />
                  </g>
                  <path
                    id="pathAmericasToIndia"
                    d="M 215 145 Q 430 45 660 240"
                    stroke="url(#arcUsToIndia)"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                    opacity="0.85"
                  />
                  <circle r="3.5" fill="#34D399" filter="url(#packetGlow)">
                    <animateMotion
                      path="M 215 145 Q 430 45 660 240"
                      dur="3.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    id="pathEuToIndia"
                    d="M 455 120 Q 550 135 660 240"
                    stroke="url(#arcEuToIndia)"
                    strokeWidth="2.2"
                    strokeDasharray="4 4"
                    opacity="0.95"
                  />
                  <circle r="4" fill="#34D399" filter="url(#packetGlow)">
                    <animateMotion
                      path="M 455 120 Q 550 135 660 240"
                      dur="2.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    id="pathGccToIndia"
                    d="M 575 205 Q 615 205 660 240"
                    stroke="url(#arcGccToIndia)"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                  <circle r="3.5" fill="#C7A25A" filter="url(#packetGlow)">
                    <animateMotion
                      path="M 575 205 Q 615 205 660 240"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    id="pathApacToIndia"
                    d="M 795 260 Q 730 225 660 240"
                    stroke="url(#arcApacToIndia)"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                    opacity="0.85"
                  />
                  <circle r="3.5" fill="#34D399" filter="url(#packetGlow)">
                    <animateMotion
                      path="M 795 260 Q 730 225 660 240"
                      dur="3.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <g className="cursor-pointer group">
                    <circle
                      cx="215"
                      cy="145"
                      r="5"
                      fill="#1D1D20"
                      stroke="#A1A1AA"
                      strokeWidth="1.5"
                    />
                    <circle cx="215" cy="145" r="2.5" fill="#ffffff" />
                    <text
                      x="215"
                      y="172"
                      fill="#A1A1AA"
                      fontSize="11"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      AMERICAS CORRIDOR
                    </text>
                    <text
                      x="215"
                      y="185"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      New York • Silicon Valley
                    </text>
                  </g>
                  <g className="cursor-pointer group">
                    <circle
                      cx="455"
                      cy="120"
                      r="5.5"
                      fill="#1D1D20"
                      stroke="#C7A25A"
                      strokeWidth="1.5"
                    />
                    <circle cx="455" cy="120" r="2.5" fill="#C7A25A" />
                    <text
                      x="455"
                      y="98"
                      fill="#C7A25A"
                      fontSize="11"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      UK & EU HUB
                    </text>
                    <text
                      x="455"
                      y="110"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      London • Zurich • Frankfurt
                    </text>
                  </g>
                  <g className="cursor-pointer group">
                    <circle
                      cx="575"
                      cy="205"
                      r="5"
                      fill="#1D1D20"
                      stroke="#C7A25A"
                      strokeWidth="1.5"
                    />
                    <circle cx="575" cy="205" r="2.5" fill="#C7A25A" />
                    <text
                      x="575"
                      y="190"
                      fill="#C7A25A"
                      fontSize="10.5"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      GCC HUB
                    </text>
                    <text
                      x="575"
                      y="222"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      Dubai • Riyadh
                    </text>
                  </g>
                  <g className="cursor-pointer group">
                    <circle
                      cx="795"
                      cy="260"
                      r="5"
                      fill="#1D1D20"
                      stroke="#A1A1AA"
                      strokeWidth="1.5"
                    />
                    <circle cx="795" cy="260" r="2.5" fill="#ffffff" />
                    <text
                      x="795"
                      y="285"
                      fill="#A1A1AA"
                      fontSize="11"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      APAC CORRIDOR
                    </text>
                    <text
                      x="795"
                      y="298"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      Singapore • Tokyo • Sydney
                    </text>
                  </g>
                  <g>
                    <circle
                      cx="660"
                      cy="240"
                      r="55"
                      fill="url(#indiaPulseGlow)"
                    />
                    <circle
                      cx="660"
                      cy="240"
                      r="8"
                      stroke="#34D399"
                      strokeWidth="2"
                      opacity="0.9"
                    >
                      <animate
                        attributeName="r"
                        values="8;48"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.9;0"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="660"
                      cy="240"
                      r="16"
                      stroke="#0F6B4A"
                      strokeWidth="1.5"
                      opacity="0.7"
                    >
                      <animate
                        attributeName="r"
                        values="16;65"
                        dur="2.4s"
                        begin="0.8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.7;0"
                        dur="2.4s"
                        begin="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="660"
                      cy="240"
                      r="8"
                      fill="#34D399"
                      filter="url(#packetGlow)"
                    />
                    <circle cx="660" cy="240" r="3" fill="#0A0A0A" />
                    <text
                      x="660"
                      y="272"
                      fill="#34D399"
                      fontSize="12.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      letterSpacing="1"
                    >
                      DARSHAI SOVEREIGN NODE
                    </text>
                    <text
                      x="660"
                      y="288"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontFamily="monospace"
                      textAnchor="middle"
                      opacity="0.8"
                    >
                      India • Karnataka Gateway (Bengaluru & Mangalore)
                    </text>
                  </g>
                </svg>
              </div>
              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center relative z-10">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[11px] font-mono text-[#A1A1AA]/70 uppercase tracking-wider">
                    EU / UK
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    GDPR Compliant
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0F6B4A]/10 border border-[#34D399]/30">
                  <p className="text-[11px] font-mono text-[#34D399] uppercase tracking-wider font-semibold">
                    INDIA (SOVEREIGN)
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    DPDP Act 2023
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[11px] font-mono text-[#A1A1AA]/70 uppercase tracking-wider">
                    US & CANADA
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    CCPA & Privacy Shield
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[11px] font-mono text-[#A1A1AA]/70 uppercase tracking-wider">
                    ENCRYPTION
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#34D399] mt-0.5">
                    TLS 1.3 End-to-End
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section
        id="security-dashboard"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#0D0D0F]"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-mono uppercase tracking-widest text-[#34D399] mb-3 font-medium flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#34D399]" />
                <span>SECURITY ARCHITECTURE</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Enterprise Safeguards Dashboard
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Hardware-backed, mathematically isolated, and continuously
                verified.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECURITY_CONTROLS.map((control, idx) => {
              const Icon = control.icon;
              return (
                <Reveal delay={idx * 0.08} key={control.title}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative h-full rounded-[24px] bg-[#141416] border border-white/[0.08] hover:border-[#34D399]/60 p-7 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div>
                      <div className="relative mb-6 inline-block">
                        <span className="absolute inset-0 rounded-2xl bg-[#0F6B4A]/40 blur-md group-hover:blur-lg transition-all" />
                        <div className="relative w-14 h-14 rounded-2xl bg-[#1D1D20] border border-[#34D399]/40 flex items-center justify-center text-[#34D399] group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6 stroke-[1.8]" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-[10px] font-mono text-[#C7A25A] uppercase tracking-wider font-semibold">
                          {control.metric}
                        </span>
                        <h3 className="text-xl font-display font-semibold text-white mt-1 group-hover:text-[#34D399] transition-colors">
                          {control.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3">
                        {control.desc}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#34D399]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                        Active Enforced
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="your-rights"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative"
      >
        <div className="darshai-container max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>INDIVIDUAL AGENCY</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Your Data. Your Choice.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                You retain ultimate sovereignty. Exercise your rights with zero
                friction and guaranteed 30-day fulfillment.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {USER_RIGHTS.map((right, idx) => (
              <Reveal delay={idx * 0.08} key={right.id}>
                <motion.div
                  whileHover={{ scale: 1.025, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedRight(right.title)}
                  className="group relative h-full rounded-[24px] bg-[#111113] border border-white/[0.08] hover:border-[#0F6B4A] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F6B4A]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                      <span className="text-xs font-mono text-[#C7A25A] font-medium">
                        RIGHT 0{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-white/40">
                        Sovereign
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3 group-hover:text-[#34D399] transition-colors">
                      {right.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {right.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#34D399] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      <span>Submit Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      30-Day SLA
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="cookie-preferences"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#0D0D0F]"
      >
        <div className="darshai-container max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium inline-flex items-center gap-2">
                <Cookie className="w-3.5 h-3.5 text-[#0F6B4A]" />
                <span>LOCAL TELEMETRY</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Cookie Preferences
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Fine-grained control over local browser storage. No invasive
                cross-site advertising tags.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[28px] bg-[#141416] border border-white/[0.08] p-6 sm:p-10 shadow-2xl divide-y divide-white/[0.08]">
              <div className="py-5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base sm:text-lg font-display font-semibold text-white">
                      Essential Cookies
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C7A25A] bg-[#C7A25A]/15 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1AA]">
                    Enables core website navigation, CSRF security tokens, and
                    journey selection caching.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#34D399] shrink-0">
                  <Check className="w-4 h-4" />
                  <span>Always Active</span>
                </div>
              </div>
              <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-display font-semibold text-white mb-1">
                    Analytics Cookies
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A1A1AA]">
                    Helps us understand how visitors interact with Geo-Wellness
                    stories in anonymized aggregates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCookiePrefs((prev) => ({
                      ...prev,
                      analytics: !prev.analytics,
                    }))
                  }
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${cookiePrefs.analytics ? "bg-[#0F6B4A]" : "bg-white/20"}`}
                  aria-label="Toggle Analytics Cookies"
                >
                  <motion.div
                    animate={{ x: cookiePrefs.analytics ? 24 : 2 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>
              <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-display font-semibold text-white mb-1">
                    Security Cookies
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A1A1AA]">
                    Protects user sessions and prevents rate-limit abuse during
                    assessment submissions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCookiePrefs((prev) => ({
                      ...prev,
                      security: !prev.security,
                    }))
                  }
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${cookiePrefs.security ? "bg-[#0F6B4A]" : "bg-white/20"}`}
                  aria-label="Toggle Security Cookies"
                >
                  <motion.div
                    animate={{ x: cookiePrefs.security ? 24 : 2 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>
              <div className="py-5 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-display font-semibold text-white mb-1">
                    Performance Cookies
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A1A1AA]">
                    Optimizes asset compression, image delivery caching, and
                    fluid scrollytelling frame rates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCookiePrefs((prev) => ({
                      ...prev,
                      performance: !prev.performance,
                    }))
                  }
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${cookiePrefs.performance ? "bg-[#0F6B4A]" : "bg-white/20"}`}
                  aria-label="Toggle Performance Cookies"
                >
                  <motion.div
                    animate={{ x: cookiePrefs.performance ? 24 : 2 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section
        id="legal-disclosures"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#070707]"
      >
        <div className="darshai-container max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]" />
                <span>STATUTORY DISCLOSURES</span>
              </p>
              <h2 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-3">
                Complete Legal Terms & Provisions
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Full statutory clauses governing regulatory compliance,
                sub-processor frameworks, and legal liabilities.
              </p>
            </div>
          </Reveal>
          <div className="rounded-[24px] bg-[#0E0E10] border border-white/[0.08] divide-y divide-white/[0.08] overflow-hidden">
            {LEGAL_SECTIONS.map((sec) => {
              const isOpen = openLegalSection === sec.id;
              return (
                <div className="transition-colors" key={sec.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenLegalSection(isOpen ? null : sec.id);
                      track("toggle_legal_section", {
                        section: sec.id,
                        open: !isOpen,
                      });
                    }}
                    className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-display font-semibold text-white">
                      {sec.title}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[#A1A1AA]"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-7 pt-1 text-sm sm:text-[15px] text-[#A1A1AA] leading-relaxed border-t border-white/[0.04]">
                          <p>{sec.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center text-xs font-mono text-[#A1A1AA]/50">
            <span>
              Last Revised: October 2026 • DARSHAI Governance Protocol v4.2
            </span>
          </div>
        </div>
      </section>
      <section
        id="privacy-contact"
        className="py-24 sm:py-32 border-t border-white/[0.08] relative bg-[#0A0A0A]"
      >
        <div className="darshai-container max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F6B4A]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="max-w-2xl mb-10">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                    <span>DEDICATED CONCIERGE</span>
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                    Questions About Privacy?
                  </h2>
                  <p className="text-base text-[#A1A1AA] leading-relaxed">
                    Our compliance team and resident Data Protection Officer
                    (DPO) are available to address questions regarding data
                    sovereignty, clinical confidentiality, and rights
                    fulfillment.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#C7A25A] mb-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>DIRECT EMAIL</span>
                    </div>
                    <p className="text-sm font-medium text-white select-all">
                      privacy@darshai.com
                    </p>
                  </div>
                  <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#C7A25A] mb-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>PHONE</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      +91 80 4718 2000
                    </p>
                  </div>
                  <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#C7A25A] mb-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>RESPONSE TIME</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      Within 24 business hours
                    </p>
                  </div>
                  <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06] sm:col-span-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#C7A25A] mb-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>OFFICE LOCATIONS</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      DARSHAI Group Pvt Ltd • Mangalore & Bengaluru, Karnataka,
                      India
                    </p>
                  </div>
                  <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#C7A25A] mb-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>PRIVACY TEAM</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      Certified Resident DPO
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      track("contact_privacy_team_click", {});
                      navigateTo("contact");
                    }}
                    className="darshai-btn-primary uppercase cursor-pointer text-xs sm:text-sm inline-flex items-center gap-2"
                  >
                    <span>Contact Privacy Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-[#A1A1AA]/60">
                    Encrypted Concierge Channel
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <AnimatePresence>
        {selectedRight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-[28px] bg-[#141416] border border-white/15 p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                type="button"
                onClick={() => setSelectedRight(null)}
                aria-label="Close request modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              {requestSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#0F6B4A]/40 border border-[#34D399] text-[#34D399] flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white">
                    Request Lodged Securely
                  </h3>
                  <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto">
                    A confirmation ticket has been dispatched to{" "}
                    <strong>{requestEmail}</strong>. Our Data Protection Officer
                    will fulfill your request within 30 days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRightSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#34D399] font-semibold block mb-1">
                      DATA RIGHTS REQUEST
                    </span>
                    <h3 className="text-2xl font-display font-semibold text-white">
                      {selectedRight}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                      Please specify your registered email address to verify
                      identity and initiate this governance request.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-white/70 block">
                      Registered Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#34D399]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-white/70 block">
                      Specific Notes or Verification Parameters (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      placeholder="e.g. Please purge past journey inquiry records from 2025"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#34D399] resize-none"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRight(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-mono uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="darshai-btn-primary uppercase text-xs cursor-pointer px-6 py-2.5"
                    >
                      Submit Verification Request →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
export default PrivacyPolicyPage;
