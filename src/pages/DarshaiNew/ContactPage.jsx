import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  MapPin,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  User,
  Briefcase,
  Handshake,
  HelpCircle,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
const PURPOSE_OPTIONS = [
  {
    id: "personal",
    title: "Personal Wellness Journey",
    desc: "Planning a personalised Geo-Wellness journey.",
    badge: "INDIVIDUAL",
    icon: User,
  },
  {
    id: "corporate",
    title: "Corporate Wellness",
    desc: "Leadership, executive or organisational wellness.",
    badge: "ENTERPRISE",
    icon: Briefcase,
  },
  {
    id: "partnership",
    title: "Partnership",
    desc: "Wellness-centre, travel, referral or strategic partnerships.",
    badge: "PARTNERS",
    icon: Handshake,
  },
  {
    id: "general",
    title: "General Enquiry",
    desc: "Questions about DARSHAI or its services.",
    badge: "CONCIERGE",
    icon: HelpCircle,
  },
];
const DIRECT_CHANNELS = [
  {
    id: "general",
    title: "GENERAL ENQUIRIES",
    value: "info@darshai.in",
    href: "mailto:info@darshai.in",
    actionLabel: "Email →",
    icon: Mail,
  },
  {
    id: "support",
    title: "WELLNESS JOURNEY SUPPORT",
    value: "support@darshai.in",
    href: "mailto:support@darshai.in",
    actionLabel: "Email →",
    icon: Mail,
  },
  {
    id: "partnerships",
    title: "PARTNERSHIPS",
    value: "partnerships@darshai.in",
    href: "mailto:partnerships@darshai.in",
    actionLabel: "Email →",
    icon: Mail,
  },
  {
    id: "corporate",
    title: "CORPORATE",
    value: "corporate@darshai.in",
    href: "mailto:corporate@darshai.in",
    actionLabel: "Email →",
    icon: Mail,
  },
];
export function ContactPage({ onNavigate }) {
  const [searchParams] = useSearchParams();
  const contactOptionsRef = useRef(null);
  const formContainerRef = useRef(null);
  // Initialize purpose from URL query (?purpose=corporate / ?centre=kanasu)
  const initialPurpose = () => {
    const p = searchParams.get("purpose")?.toLowerCase();
    if (p === "corporate") return "corporate";
    if (p === "partnership") return "partnership";
    if (p === "general") return "general";
    return "personal";
  };
  const [selectedPurpose, setSelectedPurpose] = useState(initialPurpose);
  // Unified Form Field State across all 4 Contextual Forms
  const [formData, setFormData] = useState({
    // Common / Personal
    name: "",
    email: "",
    phone: "",
    country: "",
    lookingFor: "",
    // Corporate
    companyName: "",
    designation: "",
    requirement: "Executive Retreat (1–10 leaders)",
    corporateMessage: "",
    // Partnership
    organisation: "",
    website: "",
    partnershipType: "Wellness Sanctuary / Retreat Partner",
    partnershipMessage: "",
    // General
    generalMessage: "",
  });
  // Pre-fill enquiry if arriving from a specific sanctuary card (e.g. ?centre=kanasu) or programme (e.g. ?program=restore)
  useEffect(() => {
    const centreParam = searchParams.get("centre");
    const programParam =
      searchParams.get("program") || searchParams.get("programme");
    const purposeParam = searchParams.get("purpose");
    if (programParam) {
      setSelectedPurpose("personal");
      const progKey = programParam.toLowerCase();
      let progName = "DARSHAI RESTORE";
      let progDuration = "7 Days";
      if (progKey.includes("rebalance")) {
        progName = "DARSHAI REBALANCE";
        progDuration = "14 Days";
      } else if (progKey.includes("longevity")) {
        progName = "DARSHAI LONGEVITY";
        progDuration = "21 Days";
      } else if (progKey.includes("restore")) {
        progName = "DARSHAI RESTORE";
        progDuration = "7 Days";
      }
      setFormData((prev) => ({
        ...prev,
        lookingFor: prev.lookingFor
          ? prev.lookingFor
          : `Requesting a personalised recommendation for ${progName} (${progDuration}).`,
      }));
    } else if (centreParam) {
      setSelectedPurpose("personal");
      const formattedCentre =
        centreParam.charAt(0).toUpperCase() + centreParam.slice(1);
      setFormData((prev) => ({
        ...prev,
        lookingFor: prev.lookingFor
          ? prev.lookingFor
          : `Inquiring about ${formattedCentre} sanctuary journey coordination and assessment.`,
      }));
    } else if (
      purposeParam &&
      (purposeParam === "personal" ||
        purposeParam === "corporate" ||
        purposeParam === "partnership" ||
        purposeParam === "general")
    ) {
      setSelectedPurpose(purposeParam);
    }
  }, [searchParams]);
  // Touched state for realtime validation
  const [touched, setTouched] = useState({});
  // Submission State
  const [submissionState, setSubmissionState] = useState("idle");
  const [referenceId, setReferenceId] = useState("");
  // Validation Rules
  const validateEmail = (email) => {
    if (!email.trim()) return "Email address is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return null;
  };
  const validateName = (name) => {
    if (!name.trim()) return "Please enter your full name.";
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    return null;
  };
  const validatePhone = (phone) => {
    if (!phone.trim()) return null; // Optional
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    if (!phoneRegex.test(phone.trim()))
      return "Enter a valid phone number with country code.";
    return null;
  };
  const validateRequired = (val, fieldName, minLength = 2) => {
    if (!val.trim()) return `${fieldName} is required.`;
    if (val.trim().length < minLength)
      return `${fieldName} must be at least ${minLength} characters.`;
    return null;
  };
  // Realtime Errors computed conditionally based on active purpose
  const getErrors = () => {
    const errs = {};
    errs.name = touched.name ? validateName(formData.name) : null;
    errs.email = touched.email ? validateEmail(formData.email) : null;
    if (selectedPurpose === "personal") {
      errs.phone = touched.phone ? validatePhone(formData.phone) : null;
      errs.lookingFor = touched.lookingFor
        ? validateRequired(formData.lookingFor, "Requirements description", 8)
        : null;
    } else if (selectedPurpose === "corporate") {
      errs.companyName = touched.companyName
        ? validateRequired(formData.companyName, "Company Name", 2)
        : null;
    } else if (selectedPurpose === "partnership") {
      errs.organisation = touched.organisation
        ? validateRequired(formData.organisation, "Organisation", 2)
        : null;
    } else if (selectedPurpose === "general") {
      errs.generalMessage = touched.generalMessage
        ? validateRequired(formData.generalMessage, "Message", 8)
        : null;
    }
    return errs;
  };
  const errors = getErrors();
  const isFormValid = () => {
    if (validateName(formData.name) !== null) return false;
    if (validateEmail(formData.email) !== null) return false;
    if (selectedPurpose === "personal") {
      if (validatePhone(formData.phone) !== null) return false;
      if (validateRequired(formData.lookingFor, "Requirements", 8) !== null)
        return false;
    } else if (selectedPurpose === "corporate") {
      if (validateRequired(formData.companyName, "Company Name", 2) !== null)
        return false;
    } else if (selectedPurpose === "partnership") {
      if (validateRequired(formData.organisation, "Organisation", 2) !== null)
        return false;
    } else if (selectedPurpose === "general") {
      if (validateRequired(formData.generalMessage, "Message", 8) !== null)
        return false;
    }
    return true;
  };
  const scrollToCards = () => {
    contactOptionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToForm = () => {
    formContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: selectedPurpose === "personal",
      lookingFor: selectedPurpose === "personal",
      companyName: selectedPurpose === "corporate",
      organisation: selectedPurpose === "partnership",
      generalMessage: selectedPurpose === "general",
    });
    if (!isFormValid()) {
      return;
    }
    setSubmissionState("submitting");
    track("contact_submit_start", { purpose: selectedPurpose });
    setTimeout(() => {
      const prefixMap = {
        personal: "JNY",
        corporate: "CORP",
        partnership: "PTR",
        general: "GEN",
      };
      const refCode = `DARSHAI-${prefixMap[selectedPurpose]}-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(refCode);
      setSubmissionState("success");
      track("contact_submit_success", {
        purpose: selectedPurpose,
        trackingId: refCode,
      });
    }, 900);
  };
  const handleResetForm = () => {
    setSubmissionState("idle");
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      lookingFor: "",
      companyName: "",
      designation: "",
      requirement: "Executive Retreat (1–10 leaders)",
      corporateMessage: "",
      organisation: "",
      website: "",
      partnershipType: "Wellness Sanctuary / Retreat Partner",
      partnershipMessage: "",
      generalMessage: "",
    });
    setTouched({});
  };
  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    track("filter_theme", { theme: purpose });
    // Keep focus and gently cue form scroll
  };
  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <section
        id="contact-hero"
        className="relative text-center min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between py-24 md:py-32 overflow-hidden bg-[#0A0A0A] border-b border-white/10"
      >
        <motion.div
          initial={{ scale: 1.02, opacity: 0.8 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-20 stroke-white/25 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 700"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-100,100 C150,20 400,220 700,80 C900,-20 1100,180 1200,100"
              strokeWidth="1"
            />
            <path
              d="M-100,180 C200,80 450,300 750,150 C950,50 1150,260 1200,180"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path
              d="M-100,260 C250,160 500,380 800,220 C1000,120 1150,340 1200,260"
              strokeWidth="1.2"
            />
            <path
              d="M-100,340 C300,240 550,460 850,290 C1050,190 1150,420 1200,340"
              strokeWidth="1"
            />
            <path
              d="M-100,420 C350,320 600,540 900,360 C1100,260 1150,500 1200,420"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M-100,500 C400,400 650,620 950,430 C1150,330 1150,580 1200,500"
              strokeWidth="1"
            />
            <path
              d="M-100,580 C450,480 700,700 1000,500 C1200,400 1150,660 1200,580"
              strokeWidth="1.2"
            />
          </svg>
          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-15, 15, -15],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#0F6B4A]/25 blur-[140px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A] pointer-events-none" />
        </motion.div>
        <div className="hidden sm:block" />
        <div className="relative z-10 darshai-container max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <p className="typography-eyebrow text-[#C7A25A] tracking-[0.25em] text-xs font-semibold uppercase">
              CONTACT DARSHAI
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6 max-w-3xl mx-auto"
          >
            Tell Us What <br />
            You <span className="text-[#34D399]">Need.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
          >
            Whether you're planning a personal wellness journey, exploring
            corporate wellness, or considering a partnership, we'll help you
            find the right next step.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="relative z-10 pt-4"
        >
          <button
            type="button"
            onClick={scrollToForm}
            className="typography-ui-button text-xs font-mono tracking-widest text-[#A1A1AA] hover:text-white transition-colors uppercase inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer"
          >
            <span>Explore ways to reach DARSHAI</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </motion.div>
      </section>
      <section className="pt-16 sm:pt-20 pb-24 md:pb-32 bg-[#F5F5F7] border-b border-[#D2D2D7]">
        <div className="darshai-container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-[28px] border border-[#D2D2D7] p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <p className="typography-eyebrow text-[#0E4D3A] uppercase tracking-[0.2em] font-semibold text-xs mb-1.5">
                    DIRECT CONTACT SYSTEM
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-[#1D1D1F] tracking-tight">
                    Reach DARSHAI Directly.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] mt-1 leading-relaxed">
                    Our specialized desks route your message directly to
                    dedicated coordinators.
                  </p>
                </div>
                <div className="space-y-3">
                  {DIRECT_CHANNELS.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <a
                        href={channel.href}
                        className="block p-4 sm:p-4.5 rounded-2xl bg-[#F8F9FA] hover:bg-white border border-[#E5E5EA] hover:border-[#0E4D3A] transition-all duration-200 hover:-translate-y-1 group cursor-pointer shadow-2xs"
                        key={channel.id}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-white text-[#0E4D3A] border border-[#D2D2D7]/60 group-hover:bg-[#0E4D3A] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-mono uppercase tracking-wider text-[#6E6E73] font-bold">
                                {channel.title}
                              </p>
                              <span className="text-sm sm:text-base font-semibold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors block truncate">
                                {channel.value}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-[#0E4D3A] shrink-0">
                            <span>Email</span>
                            <span className="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="bg-[#141416] text-white rounded-[28px] border border-white/10 p-6 sm:p-8 shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                    <p className="typography-eyebrow text-[#34D399] uppercase tracking-[0.2em] font-semibold text-xs">
                      OFFICE
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    Mangaluru, Karnataka.
                  </span>
                </div>
                <h4 className="font-display text-xl font-semibold text-white mb-1">
                  Registered Office
                </h4>
                <p className="text-xs text-[#A1A1AA] mb-4 font-mono uppercase tracking-wider">
                  Full address below.
                </p>
                <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed mb-6 font-normal bg-white/5 p-4 rounded-xl border border-white/10">
                  MILESTONE- 25, 5th Floor Shop No. 514, Door No. 15-5-223/140,
                  Collectors Gate Junction Balmatta, Mangalore-575 001,
                  Karnataka, India
                </p>
                <a
                  href="https://maps.google.com/?q=MILESTONE-+25+Collectors+Gate+Junction+Balmatta+Mangalore+575001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="typography-ui-button text-xs font-mono tracking-wider text-white hover:text-[#34D399] uppercase inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer font-bold"
                >
                  <span>OPEN IN MAPS →</span>
                </a>
              </div>
            </div>
            <div
              ref={formContainerRef}
              className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[28px] border border-[#D2D2D7] shadow-xl"
            >
              <AnimatePresence mode="wait">
                {submissionState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 sm:p-10 rounded-[24px] bg-[#F5F5F7] border border-[#0E4D3A]/30 text-center space-y-6 shadow-inner"
                    key={"contact-success"}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                      }}
                      className="w-16 h-16 rounded-full bg-[#0E4D3A] text-white flex items-center justify-center mx-auto shadow-md shadow-[#0E4D3A]/20"
                    >
                      <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                    </motion.div>
                    <div className="space-y-2 max-w-lg mx-auto">
                      <p className="typography-eyebrow text-[#0E4D3A] uppercase tracking-[0.2em] font-semibold text-xs">
                        MESSAGE RECEIVED
                      </p>
                      <h4 className="font-display text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
                        Your inquiry has been routed to DARSHAI.
                      </h4>
                      <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed">
                        Thank you,{" "}
                        <span className="font-semibold text-[#1D1D1F]">
                          {formData.name}
                        </span>
                        . A dedicated coordinator specializing in{" "}
                        <span className="font-semibold text-[#0E4D3A]">
                          {selectedPurpose === "personal" &&
                            "Personal Wellness Journeys"}
                          {selectedPurpose === "corporate" &&
                            "Corporate Wellness"}
                          {selectedPurpose === "partnership" &&
                            "Strategic Partnerships"}
                          {selectedPurpose === "general" && "General Inquiries"}
                        </span>{" "}
                        has received your submission and will respond promptly.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#D2D2D7] text-xs font-mono font-bold text-[#0E4D3A] tracking-wider shadow-2xs">
                      <span className="text-[#6E6E73] font-normal">
                        TRACKING ID:
                      </span>{" "}
                      {referenceId}
                    </div>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate("assessment");
                          } else {
                            handleResetForm();
                          }
                        }}
                        className="w-full sm:w-auto darshai-btn-primary uppercase text-xs !h-12 !px-7 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>BEGIN YOUR JOURNEY</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto text-xs font-mono tracking-wider uppercase text-[#48484A] hover:text-[#1D1D1F] py-3 px-5 rounded-xl border border-[#D2D2D7] hover:border-[#1D1D1F] transition-all bg-white cursor-pointer"
                      >
                        <span>SEND ANOTHER MESSAGE</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    key={"contextual-intake-form"}
                  >
                    <div className="border-b border-[#D2D2D7] pb-6 mb-7">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] text-xs font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                          <span>CONCIERGE INTAKE</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#6E6E73] block font-mono">
                            DIRECT ROUTING:
                          </span>
                          <a
                            href="mailto:info@darshaigroup.com"
                            className="text-xs font-mono font-semibold text-[#0E4D3A] hover:underline"
                          >
                            info@darshaigroup.com
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#F5F5F7] rounded-2xl border border-[#D2D2D7]/80 mb-5">
                        {PURPOSE_OPTIONS.map((opt) => {
                          const isSelected = selectedPurpose === opt.id;
                          const Icon = opt.icon;
                          return (
                            <button
                              type="button"
                              onClick={() => handlePurposeSelect(opt.id)}
                              className={`group flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#0E4D3A] text-white shadow-sm ring-1 ring-[#0E4D3A]"
                                  : "bg-transparent text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white"
                              }`}
                              key={opt.id}
                            >
                              <Icon
                                className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#C7A25A]" : "text-[#8E8E93] group-hover:text-[#0E4D3A]"}`}
                              />
                              <span className="text-xs font-semibold tracking-tight truncate">
                                {opt.id === "personal" && "Personal"}
                                {opt.id === "corporate" && "Corporate"}
                                {opt.id === "partnership" && "Partnership"}
                                {opt.id === "general" && "General"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
                          {selectedPurpose === "personal" &&
                            "Personal Wellness Journey"}
                          {selectedPurpose === "corporate" &&
                            "Corporate Wellness Inquiry"}
                          {selectedPurpose === "partnership" &&
                            "Partnership Proposal"}
                          {selectedPurpose === "general" && "General Enquiry"}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                          {selectedPurpose === "personal" &&
                            "Planning a personalised Geo-Wellness journey."}
                          {selectedPurpose === "corporate" &&
                            "Leadership, executive or organisational wellness."}
                          {selectedPurpose === "partnership" &&
                            "Wellness-centre, travel, referral or strategic partnerships."}
                          {selectedPurpose === "general" &&
                            "Questions about DARSHAI or its services."}
                        </p>
                      </div>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                          Name <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          onBlur={() => setTouched({ ...touched, name: true })}
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                            errors.name
                              ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                              : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>
                      {selectedPurpose === "personal" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Email <span className="text-[#DC2626]">*</span>
                              </label>
                              <input
                                type="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                onBlur={() =>
                                  setTouched({ ...touched, email: true })
                                }
                                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                  errors.email
                                    ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                    : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                                }`}
                              />
                              {errors.email && (
                                <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.email}</span>
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Phone / WhatsApp Number{" "}
                                <span className="text-[#6E6E73] font-normal">
                                  (Optional)
                                </span>
                              </label>
                              <input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                onBlur={() =>
                                  setTouched({ ...touched, phone: true })
                                }
                                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                  errors.phone
                                    ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                    : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                                }`}
                              />
                              {errors.phone && (
                                <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.phone}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                              Country
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. India, United Kingdom, United States, UAE"
                              value={formData.country}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  country: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                              What are you looking for?{" "}
                              <span className="text-[#DC2626]">*</span>
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Describe your wellness objectives, health focus, preferred terrain or retreat duration..."
                              value={formData.lookingFor}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lookingFor: e.target.value,
                                })
                              }
                              onBlur={() =>
                                setTouched({ ...touched, lookingFor: true })
                              }
                              className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white resize-none ${
                                errors.lookingFor
                                  ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                  : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                              }`}
                            />
                            {errors.lookingFor && (
                              <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.lookingFor}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {selectedPurpose === "corporate" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Work Email{" "}
                                <span className="text-[#DC2626]">*</span>
                              </label>
                              <input
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                onBlur={() =>
                                  setTouched({ ...touched, email: true })
                                }
                                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                  errors.email
                                    ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                    : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                                }`}
                              />
                              {errors.email && (
                                <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.email}</span>
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Company Name{" "}
                                <span className="text-[#DC2626]">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Apex Global Industries"
                                value={formData.companyName}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    companyName: e.target.value,
                                  })
                                }
                                onBlur={() =>
                                  setTouched({ ...touched, companyName: true })
                                }
                                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                  errors.companyName
                                    ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                    : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                                }`}
                              />
                              {errors.companyName && (
                                <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.companyName}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Role / Designation
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Head of HR, Managing Director, Founder"
                                value={formData.designation}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    designation: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Estimated requirement
                              </label>
                              <select
                                value={formData.requirement}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    requirement: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white transition-all cursor-pointer"
                              >
                                <option value="Executive Retreat (1–10 leaders)">
                                  Executive Retreat (1–10 leaders)
                                </option>
                                <option value="Team Vitality Program (10–50 members)">
                                  Team Vitality Program (10–50 members)
                                </option>
                                <option value="Enterprise Health Architecture (50+ employees)">
                                  Enterprise Health Architecture (50+ employees)
                                </option>
                                <option value="Bespoke Leadership Consultation">
                                  Bespoke Leadership Consultation
                                </option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                              Message
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Share your organization's wellness objectives, team size, preferred dates..."
                              value={formData.corporateMessage}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  corporateMessage: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white resize-none transition-all"
                            />
                          </div>
                        </div>
                      )}
                      {selectedPurpose === "partnership" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Work Email{" "}
                                <span className="text-[#DC2626]">*</span>
                              </label>
                              <input
                                type="email"
                                placeholder="name@organization.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                onBlur={() =>
                                  setTouched({ ...touched, email: true })
                                }
                                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                  errors.email
                                    ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                    : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                                }`}
                              />
                              {errors.email && (
                                <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.email}</span>
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Organisation{" "}
                                <span className="text-[#DC2626]">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Himalayan Ayurvedic Sanctuary"
                                value={formData.organisation}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    organisation: e.target.value,
                                  })
                                }
                                onBlur={() =>
                                  setTouched({ ...touched, organisation: true })
                                }
                                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                  errors.organisation
                                    ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                    : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                                }`}
                              />
                              {errors.organisation && (
                                <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{errors.organisation}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Website
                              </label>
                              <input
                                type="url"
                                placeholder="https://yourwebsite.com"
                                value={formData.website}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    website: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                                Partnership Type
                              </label>
                              <select
                                value={formData.partnershipType}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    partnershipType: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white transition-all cursor-pointer"
                              >
                                <option value="Wellness Sanctuary / Retreat Partner">
                                  Wellness Sanctuary / Retreat Partner
                                </option>
                                <option value="Medical / Clinical Collaboration">
                                  Medical / Clinical Collaboration
                                </option>
                                <option value="Travel & Concierge Partner">
                                  Travel & Concierge Partner
                                </option>
                                <option value="Institutional / Referral Partner">
                                  Institutional / Referral Partner
                                </option>
                                <option value="Strategic / Other">
                                  Strategic / Other
                                </option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                              Message
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Tell us about your facility or services and the type of partnership you are looking for..."
                              value={formData.partnershipMessage}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  partnershipMessage: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3.5 rounded-xl border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0E4D3A] focus:bg-white resize-none transition-all"
                            />
                          </div>
                        </div>
                      )}
                      {selectedPurpose === "general" && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                              Email <span className="text-[#DC2626]">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="name@domain.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              onBlur={() =>
                                setTouched({ ...touched, email: true })
                              }
                              className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white ${
                                errors.email
                                  ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                  : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                              }`}
                            />
                            {errors.email && (
                              <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.email}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-1.5">
                              Message <span className="text-[#DC2626]">*</span>
                            </label>
                            <textarea
                              rows={4}
                              placeholder="How can we assist you with DARSHAI services?"
                              value={formData.generalMessage}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  generalMessage: e.target.value,
                                })
                              }
                              onBlur={() =>
                                setTouched({ ...touched, generalMessage: true })
                              }
                              className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all bg-[#F5F5F7] text-[#1D1D1F] focus:outline-none focus:bg-white resize-none ${
                                errors.generalMessage
                                  ? "border-[#DC2626] focus:border-[#DC2626] bg-[#FEF2F2]"
                                  : "border-[#D2D2D7] focus:border-[#0E4D3A]"
                              }`}
                            />
                            {errors.generalMessage && (
                              <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errors.generalMessage}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={submissionState === "submitting"}
                          className="w-full darshai-btn-primary uppercase cursor-pointer !h-14 !px-8 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                        >
                          {submissionState === "submitting" ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>TRANSMITTING MESSAGE...</span>
                            </>
                          ) : (
                            <>
                              <span>SEND MESSAGE</span>
                              <span aria-hidden="true" className="text-sm">
                                →
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full bg-[#0A0A0A] overflow-hidden">
        <div className="relative w-full h-[400px] sm:h-[480px] bg-[#0A0A0A] overflow-hidden">
          <iframe
            title="DARSHAI Registered Office Location - Mangalore"
            src="https://maps.google.com/maps?q=MILESTONE-%2025%20Collectors%20Gate%20Junction%20Balmatta%20Mangalore%20575001&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] brightness-[0.78] contrast-[1.2] transition-all duration-700"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A] pointer-events-none" />
          <div className="absolute bottom-8 left-6 sm:left-10 z-10 p-5 rounded-[22px] bg-[#141416]/95 backdrop-blur-md border border-white/15 shadow-2xl max-w-sm">
            <div className="flex items-center gap-2.5 text-[#34D399] font-bold text-xs uppercase tracking-wider mb-1.5">
              <MapPin className="w-4 h-4" />
              <span>DARSHAI Registered Office</span>
            </div>
            <p className="text-xs text-white/90 font-medium leading-relaxed mb-3">
              MILESTONE- 25, Collectors Gate Junction Balmatta, Mangalore-575
              001, Karnataka, India
            </p>
            <a
              href="https://maps.google.com/?q=MILESTONE-+25+Collectors+Gate+Junction+Balmatta+Mangalore+575001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#34D399] hover:text-white uppercase inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
      <FinalCTA
        id="need-a-human-cta"
        variant="black"
        eyebrow="NEED A HUMAN?"
        heading="We're Here When You Need Us."
        description={
          <a
            href="mailto:support@darshai.in"
            className="text-[#34D399] hover:underline font-mono text-xl sm:text-2xl font-medium tracking-wide inline-block transition-colors"
          >
            support@darshai.in
          </a>
        }
        buttonText="Contact DARSHAI"
        buttonOnClick={scrollToForm}
        bgImage="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&auto=format&fit=crop&q=80"
      />
    </main>
  );
}
export default ContactPage;
