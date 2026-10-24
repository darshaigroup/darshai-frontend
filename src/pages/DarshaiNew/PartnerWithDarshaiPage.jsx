import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal, { RevealGroup } from "../../components/darshaiNew/Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  ChevronDown,
  ArrowRight,
  FileText,
  Users,
  Compass,
  Award,
  Lock,
  Mail,
  HeartPulse,
  Trees,
  Sun,
  Flame,
} from "lucide-react";
// Section 02 Categories
const PARTNER_CATEGORIES = [
  {
    num: "01",
    title: "Ayurveda & Traditional Wellness",
    desc: "Centres providing authentic, lineage-backed Ayurvedic therapies, clinical Panchakarma, and traditional herbal formulations.",
    icon: Flame,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80",
    imageAlt:
      "Authentic Ayurvedic therapies and clinical Panchakarma sanctuary",
  },
  {
    num: "02",
    title: "Yoga & Holistic Retreats",
    desc: "Sanctuaries offering structured yogic immersion, breathwork, meditative practices, and mindful movement protocols.",
    icon: Sun,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Structured yogic immersion and meditative movement sanctuary",
  },
  {
    num: "03",
    title: "Nature-Led Wellness Destinations",
    desc: "High-altitude, coastal, or forest sanctuaries leveraging pristine biophilic resonance and environmental microclimates.",
    icon: Trees,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Pristine nature-led forest and coastal wellness estate",
  },
  {
    num: "04",
    title: "Longevity & Preventive Wellness",
    desc: "Facilities integrating cellular recovery, metabolic optimization, hydrotherapy, and longevity-focused health protocols.",
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Preventive longevity and cellular recovery sanctuary",
  },
  {
    num: "05",
    title: "Integrated Wellness Campuses",
    desc: "Comprehensive sanctuaries combining medical assessment, therapeutic dining, thermal facilities, and residential suites.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Integrated medical and thermal wellness sanctuary campus",
  },
];
// Section 03 Benefits Pillars
const WHY_PARTNER_PILLARS = [
  {
    title: "Suitability-Led Client Matching",
    desc: "DARSHAI considers client goals, preferences, programme requirements, location, environment, duration and other relevant factors before recommending suitable partner options.",
    icon: Compass,
  },
  {
    title: "A Curated Digital Presence",
    desc: "Approved partner centres may be presented within the DARSHAI ecosystem through structured programme information, centre profiles, approved imagery and relevant details about the guest experience.",
    icon: Sparkles,
  },
  {
    title: "Coordinated Client Enquiries & Bookings",
    desc: "Depending on the agreed partnership scope, DARSHAI can support client enquiries, recommendations, onboarding and booking coordination.",
    icon: Users,
  },
  {
    title: "Structured Programme Presentation",
    desc: "Present your approved programmes, durations, inclusions, exclusions, facilities and accommodation arrangements through clear, organised information.",
    icon: FileText,
  },
  {
    title: "International Guest Readiness",
    desc: "Where applicable, partner information can include international guest acceptance, accommodation arrangements, communication support, booking requirements and other relevant operational details.",
    icon: ShieldCheck,
  },
  {
    title: "Continued Journey Coordination",
    desc: "Where included in the agreed service scope, DARSHAI can support pre-programme guidance and post-programme engagement.",
    icon: Award,
  },
];
// Section 04 Review Criteria Cards
const PARTNER_STANDARDS = [
  {
    title: "Programme Capability",
    desc: "Clear programme descriptions, durations, eligibility requirements, inclusions, exclusions and service delivery arrangements.",
  },
  {
    title: "Environment & Location",
    desc: "Accurate location information, environmental characteristics, accessibility and the overall setting in which wellness experiences take place.",
  },
  {
    title: "Professional & Operational Readiness",
    desc: "Appropriately qualified professionals, relevant registrations and licences, suitable facilities, guest support and clearly defined operational responsibilities.",
  },
  {
    title: "Client Experience",
    desc: "Clear communication, accommodation information, dietary arrangements where applicable, guest-care practices and a defined point of contact.",
  },
  {
    title: "Commercial Transparency",
    desc: "Agreed programme pricing, room categories, payment arrangements, cancellation and refund policies, and any applicable referral or commercial terms.",
  },
  {
    title: "Documentation & Information Quality",
    desc: "Complete organisation details, relevant business documents, practitioner profiles, programme information and authorised photographs or videos.",
  },
];
// Section 05 Onboarding Process
const ONBOARDING_STAGES = [
  { step: "01", label: "Submit Partnership Enquiry" },
  { step: "02", label: "Initial Review" },
  { step: "03", label: "Discussion" },
  { step: "04", label: "Documentation & Commercial Alignment" },
  { step: "05", label: "Verification" },
  { step: "06", label: "Approval & Go-Live" },
];
// Section 07 FAQ Items
const PARTNERSHIP_FAQS = [
  {
    q: "Who can apply to partner with DARSHAI?",
    a: "Wellness centres, retreat operators and relevant wellness organisations may enquire if their programmes, environment and operational capabilities align with DARSHAI's Geo-Wellness approach. Every enquiry is subject to review.",
  },
  {
    q: "Does DARSHAI guarantee client bookings?",
    a: "No. Partnership acceptance does not guarantee a minimum number of enquiries, bookings, occupancy or revenue.",
  },
  {
    q: "Does DARSHAI own or operate partner wellness centres?",
    a: "No. DARSHAI operates as a Geo-Wellness assessment, matching, recommendation and coordination platform. Partner centres independently deliver their agreed programmes and on-site services.",
  },
  {
    q: "How does DARSHAI select partner centres?",
    a: "Our review considers programme capability, environment, location, facilities, professional information, operational readiness, client experience, commercial transparency and documentation.",
  },
  {
    q: "Is there a fixed commission or commercial fee for every partner?",
    a: "Commercial arrangements depend on the agreed collaboration model. Applicable pricing, referral terms, payment arrangements and other conditions are documented separately in writing.",
  },
  {
    q: "What documents are required?",
    a: "Requirements may include business registration documents, applicable licences, authorised signatory details, practitioner profiles, programme information, commercial pricing, cancellation policies and media assets. The exact requirements depend on the organisation and proposed arrangement.",
  },
  {
    q: "Can a centre work with international clients?",
    a: "Potentially, subject to its capabilities and operating arrangements. Where relevant, international readiness may include guest communication, accommodation, booking processes, travel coordination and other applicable requirements.",
  },
  {
    q: "How long does onboarding take?",
    a: "The timeline depends on the completeness of submitted information, verification requirements, commercial alignment, technical readiness and the responsiveness of both parties. A specific timeline can be discussed during the onboarding process.",
  },
  {
    q: "When will our centre appear on the DARSHAI website?",
    a: "A centre can proceed to publication after the applicable review, documentation, commercial approval and onboarding requirements have been completed.",
  },
  {
    q: "How do we start?",
    a: "Submit the partnership enquiry form below. Our team will review the information and contact you if there is a potential fit.",
  },
];
function ExpandablePillarCard({ pillar, idx }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComp = pillar.icon;
  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-[#141416] rounded-[24px] border-2 border-white hover:border-[#34D399] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-2xl hover:shadow-[0_0_55px_rgba(52,211,153,0.55)] hover:-translate-y-2 hover:bg-[#18181f] group cursor-pointer ${isExpanded ? "ring-2 ring-[#34D399]/40 bg-[#18181f]" : ""}`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C7A25A] group-hover:bg-[#34D399] group-hover:text-black transition-colors">
            <IconComp className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-xs ${
              isExpanded
                ? "bg-[#34D399] text-black border-[#34D399]"
                : "bg-white/10 text-white border-white/20 group-hover:bg-[#34D399] group-hover:text-black group-hover:border-[#34D399]"
            }`}
            aria-label={
              isExpanded ? "Shrink description" : "Display description"
            }
          >
            {isExpanded ? (
              <Minus className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
        <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-2 group-hover:text-[#34D399] transition-colors">
          {pillar.title}
        </h3>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-[#A1A1AA] leading-relaxed pt-3 border-t border-white/10 font-normal">
                {pillar.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
function ExpandableStandardCard({ std, idx }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-[#141416] rounded-[24px] border-2 border-white hover:border-[#34D399] p-6 sm:p-8 h-full flex flex-col justify-between transition-all duration-300 shadow-2xl hover:shadow-[0_0_55px_rgba(52,211,153,0.55)] hover:-translate-y-2 hover:bg-[#18181f] group cursor-pointer ${isExpanded ? "ring-2 ring-[#34D399]/40 bg-[#18181f]" : ""}`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-8 h-8 rounded-xl bg-[#0F6B4A]/20 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] font-mono text-xs font-bold group-hover:bg-[#34D399] group-hover:text-black transition-colors">
            {idx + 1}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-xs ${
              isExpanded
                ? "bg-[#34D399] text-black border-[#34D399]"
                : "bg-white/10 text-white border-white/20 group-hover:bg-[#34D399] group-hover:text-black group-hover:border-[#34D399]"
            }`}
            aria-label={
              isExpanded ? "Shrink description" : "Display description"
            }
          >
            {isExpanded ? (
              <Minus className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
        <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-[#34D399] transition-colors">
          {std.title}
        </h3>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-[#A1A1AA] leading-relaxed pt-3 border-t border-white/10 font-normal">
                {std.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export function PartnerWithDarshaiPage({ onNavigate }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  // Form State
  const [formData, setFormData] = useState({
    centreName: "",
    legalName: "",
    websiteUrl: "",
    cityState: "",
    country: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    orgType: "Ayurveda & Traditional Wellness",
    programmes: "",
    durations: "7 days",
    intlAccepted: "Yes",
    description: "",
    consent: false,
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = page;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.centreName.trim()) {
      setErrorMessage("Please enter your Centre / Organisation Name.");
      setFormStatus("error");
      return;
    }
    if (!formData.cityState.trim() || !formData.country.trim()) {
      setErrorMessage("Please enter your City/State and Country.");
      setFormStatus("error");
      return;
    }
    if (!formData.contactName.trim() || !formData.designation.trim()) {
      setErrorMessage("Please enter Primary Contact Name and Designation.");
      setFormStatus("error");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid Business Email Address.");
      setFormStatus("error");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter a valid Contact Number with Country Code.");
      setFormStatus("error");
      return;
    }
    if (!formData.programmes.trim()) {
      setErrorMessage(
        "Please describe your Main Wellness Programmes / Services.",
      );
      setFormStatus("error");
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("Please describe your centre and partnership goals.");
      setFormStatus("error");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please confirm accuracy and consent to be contacted.");
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    setErrorMessage("");
    // Analytics tracking
    track("partner_enquiry_submit", {
      centreName: formData.centreName,
      orgType: formData.orgType,
      country: formData.country,
    });
    // Simulate backend submission delay
    setTimeout(() => {
      setFormStatus("success");
    }, 1200);
  };
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#0F6B4A] selection:text-white font-sans relative overflow-x-hidden">
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-28 sm:py-36 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[340px] sm:h-[600px] md:h-[750px] bg-[#0F6B4A]/25 rounded-full blur-[140px] sm:blur-[180px] pointer-events-none animate-pulse duration-1000" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#C7A25A]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#C7A25A] font-medium">
              PARTNER WITH DARSHAI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08] mb-8"
          >
            Your Wellness Expertise.
            <br />A More Personalised Journey.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed font-normal space-y-4 mb-10 text-center"
          >
            <p>
              DARSHAI brings together individual wellness needs, environmental
              intelligence and curated wellness experiences to help people
              discover journeys that fit them.
            </p>
            <p>
              We collaborate with wellness centres and retreat partners whose
              programmes, environments and guest experiences align with our
              approach to personalised Geo-Wellness.
            </p>
            <p className="text-white font-medium text-lg sm:text-xl">
              Together, we aim to make wellness discovery more informed,
              recommendations more relevant and client journeys more
              coordinated.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <button
              type="button"
              onClick={() => scrollToElement("final-cta")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F6B4A] hover:bg-[#12825A] text-white border border-white/30 hover:border-white/60 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>BECOME A DARSHAI PARTNER</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => scrollToElement("why-partner")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 hover:border-white/40 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPLORE OUR PARTNERSHIP MODEL</span>
              <ChevronDown className="w-4 h-4 text-[#C7A25A]" />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-8 border-t border-white/10 w-full text-xs sm:text-sm font-mono text-[#A1A1AA] flex flex-wrap justify-center items-center gap-x-6 gap-y-2"
          >
            <span>Curated Wellness Partners</span>
            <span className="text-[#0F6B4A]">•</span>
            <span>Suitability-Led Matching</span>
            <span className="text-[#0F6B4A]">•</span>
            <span>Structured Onboarding</span>
            <span className="text-[#0F6B4A]">•</span>
            <span>Transparent Commercial Terms</span>
          </motion.div>
        </div>
      </section>
      <div className="darshai-container max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-24 sm:space-y-32">
        <section id="partner-ecosystem" className="scroll-mt-32">
          <Reveal>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>OUR PARTNER ECOSYSTEM</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Different Environments. A Shared Approach to Wellness.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                We look for wellness organisations that offer meaningful
                programmes, thoughtful environments and a clear commitment to
                guest care. Partnership enquiries are welcome from organisations
                whose capabilities align with DARSHAI's Geo-Wellness framework.
              </p>
            </div>
          </Reveal>
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10"
          >
            {PARTNER_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  className="bg-[#141416] rounded-[24px] border-2 border-white hover:border-[#34D399] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-2xl group hover:-translate-y-2 hover:shadow-[0_0_55px_rgba(52,211,153,0.55)] hover:bg-[#18181f]"
                  key={cat.title}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold text-[#C7A25A] bg-[#C7A25A]/10 px-3 py-1 rounded-full border border-[#C7A25A]/20">
                        {cat.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#34D399] group-hover:bg-[#0F6B4A] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-3 group-hover:text-[#34D399] transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#C7A25A]">
                    <span>GEO-WELLNESS VERIFIED</span>
                    <ArrowRight className="w-4 h-4 text-[#34D399] transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              );
            })}
          </RevealGroup>
          <Reveal delay={0.3}>
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#141416] border-2 border-[#34D399] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300">
              <p className="text-lg sm:text-xl font-display font-medium text-white text-center sm:text-left">
                The right partnership starts with suitability—not simply
                availability.
              </p>
              <button
                type="button"
                onClick={() => scrollToElement("final-cta")}
                className="px-7 py-3.5 rounded-full bg-[#0F6B4A] hover:bg-[#12825A] text-white border border-white/30 hover:border-white/60 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shrink-0 shadow-lg flex items-center gap-2.5 cursor-pointer"
              >
                <span>DISCUSS A PARTNERSHIP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </section>
        <section
          id="why-partner"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>THE DARSHAI APPROACH</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Be Part of a More Considered Wellness Journey.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed space-y-2">
                <span>
                  DARSHAI approaches wellness discovery by starting with the
                  individual—their goals, preferences, requirements and the
                  environments they wish to explore.
                </span>
                <br />
                <span>
                  Our partnership model is designed to bring suitable clients
                  and approved wellness centres together through structured
                  assessment, Geo-Wellness matching and journey coordination.
                </span>
              </p>
            </div>
          </Reveal>
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {WHY_PARTNER_PILLARS.map((pillar, idx) => (
              <ExpandablePillarCard
                pillar={pillar}
                idx={idx}
                key={pillar.title}
              />
            ))}
          </RevealGroup>
          <Reveal delay={0.3}>
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#141416] border-2 border-[#F97316] hover:border-[#FB923C] flex items-start gap-4 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              <ShieldCheck className="w-6 h-6 text-[#34D399] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                <span className="font-semibold text-[#34D399] block mb-1">
                  Transparency Note:
                </span>
                Partnerships do not guarantee a minimum number of enquiries,
                bookings, occupancy or revenue. Commercial arrangements and
                service responsibilities are agreed separately in writing.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="partner-standards"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>PARTNER STANDARDS</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Quality Begins Before the Journey.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Our partner review considers the organisation as a whole—not
                just its location or promotional material. Programme capability,
                operational readiness, environment and client experience all
                matter.
              </p>
            </div>
          </Reveal>
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {PARTNER_STANDARDS.map((std, idx) => (
              <ExpandableStandardCard std={std} idx={idx} key={std.title} />
            ))}
          </RevealGroup>
          <Reveal delay={0.3}>
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#141416] border-2 border-[#34D399] text-sm sm:text-base text-white/90 leading-relaxed text-center sm:text-left shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300">
              Partner approval is subject to DARSHAI's review, verification and
              onboarding requirements. Approval does not replace statutory
              licences, professional qualifications or other legal requirements.
            </div>
          </Reveal>
        </section>
        <section
          id="how-it-works"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>FROM ENQUIRY TO ONBOARDING</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                A Clear Process. Built on Mutual Alignment.
              </h2>
            </div>
          </Reveal>
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {ONBOARDING_STAGES.map((stage, idx) => (
              <div
                className="bg-[#141416] rounded-[24px] border-2 border-white hover:border-[#34D399] p-6 sm:p-8 relative overflow-hidden h-full flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-[0_0_55px_rgba(52,211,153,0.55)] hover:-translate-y-2 hover:bg-[#18181f] group"
                key={stage.step}
              >
                <div>
                  <span className="text-3xl font-display font-bold text-[#0F6B4A]/60 group-hover:text-[#34D399] transition-colors block mb-4">
                    {stage.step}
                  </span>
                  <h3 className="text-lg font-display font-semibold text-white leading-snug group-hover:text-white transition-colors">
                    {stage.label}
                  </h3>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#34D399]">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                  <span>Stage {idx + 1} of 6</span>
                </div>
              </div>
            ))}
          </RevealGroup>
          <Reveal delay={0.3}>
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#141416] border-2 border-[#34D399] flex items-start gap-4 shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300">
              <Lock className="w-6 h-6 text-[#34D399] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                <span className="font-semibold text-[#34D399] block mb-1">
                  Important Note:
                </span>
                Submitting an enquiry does not guarantee acceptance or
                publication. A partner centre must not be marked as approved or
                live until the required information has been reviewed and
                approved.
              </p>
            </div>
          </Reveal>
        </section>
        <section
          id="commercial-alignment"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0F6B4A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
                <span>COMMERCIAL ALIGNMENT</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Clear Expectations. Mutually Agreed Terms.
              </h2>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                Every partnership is structured around the nature of the
                collaboration, the services involved and the responsibilities of
                each organisation.
              </p>
            </div>
          </Reveal>
          <RevealGroup stagger={0.15} className="space-y-8">
            <div className="bg-[#141416] rounded-[28px] p-8 sm:p-10 border-2 border-white hover:border-[#34D399] shadow-2xl space-y-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]">
              <p className="text-xs font-mono uppercase tracking-widest text-[#34D399] font-semibold">
                DEPENDING ON THE AGREED MODEL, COLLABORATION MAY INCLUDE:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Client assessment and suitability matching",
                  "Wellness programme recommendations and referrals",
                  "Client onboarding and journey coordination",
                  "Delivery of wellness programmes by the partner centre",
                  "Post-programme engagement, where agreed",
                  "Wellness content, research and knowledge-sharing initiatives",
                ].map((item) => (
                  <li
                    className="flex items-start gap-3 text-base text-[#A1A1AA] leading-relaxed"
                    key={item}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#34D399] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#141416] rounded-[28px] p-8 border-2 border-white hover:border-[#34D399] shadow-2xl space-y-4 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:-translate-y-1 group">
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-[#34D399] transition-colors">
                    Commercial Arrangements
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed space-y-3">
                    <span>
                      Commercial terms are discussed individually and documented
                      through the applicable partnership agreement, Memorandum
                      of Understanding and Commercial Pricing Schedule.
                    </span>
                    <br />
                    <span>
                      Where applicable, agreements specify referral
                      arrangements, pricing, payment processes, responsibilities
                      and other relevant commercial conditions.
                    </span>
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-[#C7A25A] font-mono">
                  No minimum volume guarantees promised.
                </div>
              </div>
              <div className="bg-[#141416] rounded-[28px] p-8 border-2 border-white hover:border-[#34D399] shadow-2xl space-y-4 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:-translate-y-1 group">
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-[#34D399] transition-colors">
                    Independent Responsibilities
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed space-y-3">
                    <span>
                      DARSHAI provides assessment, Geo-Wellness matching,
                      recommendations and agreed journey-coordination services.
                    </span>
                    <br />
                    <span>
                      Partner centres remain independently responsible for
                      delivering their programmes and services, maintaining
                      required professional and operational standards, and
                      fulfilling their contractual and regulatory obligations.
                    </span>
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-[#34D399] font-mono">
                  Autonomous facility & clinical operations.
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#141416] border-2 border-[#34D399] text-base text-white font-medium text-center sm:text-left shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_45px_rgba(52,211,153,0.5)] transition-all duration-300">
              Our objective is to build partnerships around clear expectations,
              responsible collaboration and a well-coordinated client
              experience.
            </div>
          </RevealGroup>
        </section>
        <section
          id="partnership-faq"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C7A25A] mb-3 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                <span>PARTNERSHIP FAQ</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4">
                Before We Begin.
              </h2>
            </div>
          </Reveal>
          <RevealGroup stagger={0.06} className="space-y-4 mb-10">
            {PARTNERSHIP_FAQS.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className={`bg-[#141416] rounded-[24px] border-2 p-6 sm:p-8 transition-all duration-300 cursor-pointer shadow-xl ${
                    isExpanded
                      ? "border-[#34D399] bg-[#161619] shadow-[0_0_25px_rgba(52,211,153,0.35)]"
                      : "border-white hover:border-[#34D399]"
                  }`}
                  key={faq.q}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C7A25A] shrink-0 font-mono text-xs font-semibold">
                        {idx + 1}
                      </div>
                      <h3 className="text-base sm:text-xl font-display font-semibold text-white">
                        {faq.q}
                      </h3>
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
                        <p className="text-base text-[#A1A1AA] leading-relaxed pt-5 mt-5 border-t border-white/[0.06]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </RevealGroup>
        </section>
        <section
          id="final-cta"
          className="scroll-mt-32 pt-12 border-t border-white/[0.08]"
        >
          <Reveal>
            <div className="p-8 sm:p-14 rounded-[32px] bg-[#0A1C14]/90 backdrop-blur-2xl border-2 border-white/80 hover:border-[#34D399] shadow-[0_0_50px_rgba(52,211,153,0.3)] hover:shadow-[0_0_65px_rgba(52,211,153,0.45)] text-white text-center relative overflow-hidden transition-all duration-500 group">
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#34D399]/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-[#C7A25A]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.22)_0%,rgba(14,77,58,0.45)_50%,transparent_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 backdrop-blur-xs pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-2 shadow-xs backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A]" />
                  <span className="text-xs font-mono uppercase text-[#C7A25A] font-semibold tracking-widest">
                    BUILD WITH DARSHAI
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white max-w-2xl mx-auto drop-shadow-sm">
                  Let's Build More Considered Wellness Journeys Together.
                </h2>
                <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal">
                  If your centre offers a thoughtful wellness experience and
                  shares our commitment to suitability, transparent
                  communication and coordinated client care, we invite you to
                  begin a conversation.
                </p>
                <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToElement("final-cta")}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F6B4A] hover:bg-[#12825A] text-white border border-white/30 hover:border-white/60 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] flex items-center justify-center gap-3 cursor-pointer group/btn"
                  >
                    <span>BECOME A DARSHAI PARTNER</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <a
                    href="mailto:partnerships@darshai.in"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/20 hover:border-white/40 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#C7A25A]" />
                    <span>CONTACT OUR PARTNERSHIPS TEAM</span>
                  </a>
                </div>
                <div className="text-xs font-mono text-[#34D399] pt-2">
                  Direct Partnership Inquiry: partnerships@darshai.in
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
export default PartnerWithDarshaiPage;
