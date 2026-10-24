import React, { useState, useEffect, useRef } from "react";
import Reveal from "../../components/darshaiNew/Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  ShieldCheck,
  Building2,
  Plane,
  Check,
  Copy,
  Printer,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Compass,
  FileText,
  UserCheck,
  Activity,
  Award,
  Sliders,
  Calendar,
  Globe,
  Navigation,
  CheckCircle2,
} from "lucide-react";
const QUICK_NAV = [
  { id: "management", num: "01", title: "DARSHAI Management" },
  { id: "programme", num: "02", title: "Programme & Accommodation" },
  { id: "travel", num: "03", title: "Travel & Third-Party Costs" },
  { id: "transparency", num: "04", title: "Transparency Statement" },
];
// The 13 exact management scope items
const MANAGEMENT_ITEMS = [
  {
    title: "Registration & Onboarding",
    desc: "Private account creation, initial data intake, and personal wellness profile activation.",
    icon: UserCheck,
  },
  {
    title: "Wellness Assessment & Risk Scoring",
    desc: "Comprehensive readiness evaluation, physiological risk scoring, and baseline analysis.",
    icon: Activity,
  },
  {
    title: "Geo-Wellness Consultation",
    desc: "Dedicated session analyzing microclimates, biophilic resonance, and environmental suitability.",
    icon: Compass,
  },
  {
    title: "Clinical Consultation",
    desc: "Where applicable and included in the agreed scope with accredited wellness advisors.",
    icon: Award,
  },
  {
    title: "Geo-Wellness Matching & Recommendations",
    desc: "Algorithmic and expert-reviewed alignment of goals with optimal geographic destinations.",
    icon: Sparkles,
  },
  {
    title: "Wellness-Centre Selection & Coordination",
    desc: "Vetting, matching, and direct institutional liaison with accredited partner sanctuaries.",
    icon: Building2,
  },
  {
    title: "Booking & Coordination",
    desc: "Seamless reservation management, schedule alignment, and administrative handling.",
    icon: Calendar,
  },
  {
    title: "Post-Protocol Follow-Up",
    desc: "Structured post-residency debriefing, continuity recommendations, and lifestyle integration.",
    icon: CheckCircle2,
  },
  {
    title: "Wellness Tracking & Progress Monitoring",
    desc: "Ongoing metrics tracking and health outcome monitoring throughout your journey.",
    icon: Sliders,
  },
  {
    title: "DARSHAI Platform Access",
    desc: "Full access to your digital journey portal, telemetry data, and proposal documentation.",
    icon: Globe,
  },
  {
    title: "Travel Guidance, Arrival Planning & Pre-Arrival Instructions",
    desc: "Pre-departure preparation guides, climate advisories, and arrival protocol documentation.",
    icon: Navigation,
  },
  {
    title: "Transfer Coordination",
    desc: "Arrangement and scheduling of local ground transport and airport transfers.",
    icon: Plane,
  },
  {
    title: "DARSHAI BEYOND Continuity & Membership Options",
    desc: "Available separately at applicable prices unless expressly included in your proposal.",
    icon: ShieldCheck,
  },
];
export function JourneyInvestmentPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState("management");
  const [copied, setCopied] = useState(false);
  const sectionRefs = useRef({});
  useEffect(() => {
    track("view_booking_cancellation_page", { page: "journey-investment" });
    window.scrollTo(0, 0);
  }, []);
  // Handle scroll active state tracking for quick nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of QUICK_NAV) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleCopySummary = () => {
    const textToCopy = `DARSHAI — YOUR JOURNEY INVESTMENT
A Personalised Proposal. With Clear Inclusions.

01 — DARSHAI Management
Your DARSHAI Management Fee covers the services specified in your personalised proposal, which may include:
• Registration & Onboarding
• Wellness Assessment & Risk Scoring
• Geo-Wellness Consultation
• Clinical Consultation, where applicable and included in the agreed scope
• Geo-Wellness Matching & Recommendations
• Wellness-Centre Selection & Coordination
• Booking & Coordination
• Post-Protocol Follow-Up
• Wellness Tracking & Progress Monitoring
• DARSHAI Platform Access
• Travel Guidance, Arrival Planning & Pre-Arrival Instructions
• Transfer Coordination
• DARSHAI BEYOND Continuity & Membership Options, available separately at applicable prices unless expressly included in your proposal
The exact scope of services depends on the selected protocol and the terms of your personalised proposal.

02 — Wellness-Centre Programme & Accommodation
Wellness-centre programme charges and accommodation are priced separately according to the selected centre, programme, duration, room category and stay arrangements.
Your proposal will specify the applicable centre charges and accommodation costs.

03 — Travel & Third-Party Costs
Travel bookings and other applicable external services are charged separately, as specified in your proposal.
Travel guidance and coordination are included within the agreed DARSHAI Management scope; actual travel costs are not.
Additional costs may include flights, train tickets, private transfers, airport transfers, travel insurance, visa charges and personal expenses.
Applicable taxes will be stated in the proposal.

TRANSPARENCY STATEMENT
Before you confirm your journey, your personalised proposal will clearly outline DARSHAI's Management Fee, wellness-centre programme charges, accommodation, applicable taxes, inclusions, exclusions and other additional costs.
No journey is confirmed until the applicable terms, availability and payment requirements have been communicated and confirmation has been provided.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  const handlePrint = () => {
    window.print();
  };
  const handleCTA = () => {
    track("begin_journey", { source: "journey_investment_page" });
    if (onNavigate) {
      onNavigate("contact");
    } else {
      window.location.href = "/darshai-new/contact";
    }
  };
  return (
    <div className="min-h-screen bg-[#131315] text-white selection:bg-[#C5A059] selection:text-black font-sans pb-24">
      <div className="border-b border-white/10 bg-[#18181A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="darshai-container max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs sm:text-sm font-mono">
          <div className="flex items-center gap-2 sm:gap-3 text-white/60 truncate">
            <button
              onClick={() => onNavigate?.("home")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-white/40 hidden sm:inline">
              Journeys & Services
            </span>
            <span className="hidden sm:inline">/</span>
            <span className="text-[#C5A059] font-bold truncate">
              Journey Investment
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
              title="Copy Investment Policy Summary"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span className="text-[#34D399]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Copy Text</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print / PDF</span>
            </button>
          </div>
        </div>
      </div>
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#18181B] via-[#131315] to-[#131315]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="darshai-container max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/25 text-[#C5A059] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span>YOUR JOURNEY INVESTMENT</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6 font-display">
                A Personalised Proposal. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#C5A059]">
                  With Clear Inclusions.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-white/80 leading-relaxed font-normal max-w-3xl mb-8">
                Your total journey investment is confirmed after assessment,
                Geo-Wellness matching and wellness-centre selection. Every
                proposal clearly outlines what is included, what is charged
                separately and what additional costs may apply.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0 font-mono font-bold text-xs">
                    01
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                      01 — MANAGEMENT
                    </p>
                    <p className="text-xs text-white/70 font-medium">
                      DARSHAI Scope & Guidance
                    </p>
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] shrink-0 font-mono font-bold text-xs">
                    02
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#34D399]">
                      02 — PROGRAMME
                    </p>
                    <p className="text-xs text-white/70 font-medium">
                      Centre & Accommodation
                    </p>
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 font-mono font-bold text-xs">
                    03
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                      03 — TRAVEL & TAXES
                    </p>
                    <p className="text-xs text-white/70 font-medium">
                      Third-Party & Flights
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="sticky top-14 z-30 bg-[#18181B]/95 backdrop-blur-lg border-b border-white/10 py-3 shadow-lg">
        <div className="darshai-container max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5 text-xs sm:text-sm font-mono">
            <span className="text-white/40 uppercase tracking-widest text-[11px] shrink-0 mr-1 hidden sm:inline">
              Sections:
            </span>
            {QUICK_NAV.map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <button
                  onClick={() => scrollTo(nav.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full transition-all cursor-pointer shrink-0 flex items-center gap-2 font-medium ${
                    isActive
                      ? "bg-[#C5A059] text-black font-bold shadow-md"
                      : "bg-white/5 hover:bg-white/10 text-white/75 hover:text-white border border-white/10"
                  }`}
                  key={nav.id}
                >
                  <span
                    className={
                      isActive ? "text-black/70 font-bold" : "text-[#C5A059]"
                    }
                  >
                    {nav.num}
                  </span>
                  <span>{nav.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="darshai-container max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        <section id="management" className="scroll-mt-32">
          <Reveal>
            <div className="bg-[#1C1C1E] rounded-[28px] sm:rounded-[36px] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#C5A059] uppercase px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20">
                    01 — MANAGEMENT SCOPE
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-4">
                  01 — DARSHAI Management
                </h2>
                <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed max-w-3xl">
                  Your DARSHAI Management Fee covers the services specified in
                  your personalised proposal, which may include:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8">
                {MANAGEMENT_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A059]/40 transition-all duration-300 flex items-start gap-3.5 group"
                      key={idx}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5 group-hover:bg-[#C5A059] group-hover:text-black transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm sm:text-base leading-tight">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-1 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/5 via-[#C5A059]/10 to-white/5 border border-[#C5A059]/30 flex items-center gap-3">
                <Info className="w-5 h-5 text-[#C5A059] shrink-0" />
                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  The exact scope of services depends on the selected protocol
                  and the terms of your personalised proposal.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="programme" className="scroll-mt-32">
          <Reveal>
            <div className="bg-[#1C1C1E] rounded-[28px] sm:rounded-[36px] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#34D399] uppercase px-3 py-1 rounded-full bg-[#34D399]/10 border border-[#34D399]/20">
                    02 — CENTRE & STAY
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-4">
                  02 — Wellness-Centre Programme & Accommodation
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed">
                    Wellness-centre programme charges and accommodation are
                    priced separately according to the selected centre,
                    programme, duration, room category and stay arrangements.
                  </p>
                  <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                    Your proposal will specify the applicable centre charges and
                    accommodation costs.
                  </p>
                  <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-mono text-[#34D399] uppercase font-bold">
                        CENTRE
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        Selected Partner
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-mono text-[#34D399] uppercase font-bold">
                        PROGRAMME
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        Matched Protocol
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-mono text-[#34D399] uppercase font-bold">
                        DURATION
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        7 / 14 / 21 Days
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs font-mono text-[#34D399] uppercase font-bold">
                        ROOM CATEGORY
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        Suite / Villa
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-[#0E4D3A]/40 to-[#131315] border border-[#34D399]/30 flex flex-col justify-between space-y-4">
                  <Building2 className="w-8 h-8 text-[#34D399]" />
                  <div>
                    <p className="text-xs font-mono text-[#34D399] uppercase font-bold tracking-wider mb-1">
                      INSTITUTIONAL DIRECT RATES
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Centre charges are calculated with zero markup on
                      institutional partner rates, ensuring complete fiscal
                      transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="travel" className="scroll-mt-32">
          <Reveal>
            <div className="bg-[#1C1C1E] rounded-[28px] sm:rounded-[36px] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-white/80 uppercase px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    03 — LOGISTICS & TAXES
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-4">
                  03 — Travel & Third-Party Costs
                </h2>
              </div>
              <div className="space-y-6 max-w-4xl">
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
                    <Plane className="w-5 h-5 text-[#C5A059]" />
                    <span>Travel Guidance vs External Travel Costs</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                    Travel bookings and other applicable external services are
                    charged separately, as specified in your proposal.
                  </p>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                    Travel guidance and coordination are included within the
                    agreed DARSHAI Management scope; actual travel costs are
                    not.
                  </p>
                </div>
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                    ADDITIONAL APPLICABLE EXPENSES
                  </p>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                    Additional costs may include flights, train tickets, private
                    transfers, airport transfers, travel insurance, visa charges
                    and personal expenses.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
                      Flights & Rail
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
                      Airport Transfers
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
                      Travel Insurance
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
                      Visa Charges
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
                      Personal Expenses
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#34D399] shrink-0" />
                    <p className="text-sm text-white/90 font-medium">
                      Applicable taxes will be stated in the proposal.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#34D399] px-2.5 py-1 rounded bg-[#34D399]/10 border border-[#34D399]/20 shrink-0 font-bold">
                    ITEMIZED TAXES
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="transparency" className="scroll-mt-32">
          <Reveal>
            <div className="bg-gradient-to-br from-[#0E4D3A]/60 via-[#1C1C1E] to-[#131315] rounded-[28px] sm:rounded-[36px] border-2 border-[#34D399]/50 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(52,211,153,0.15)]">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#34D399]/20 border border-[#34D399]/40 text-[#34D399] text-xs font-mono font-bold uppercase tracking-[0.2em]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>TRANSPARENCY STATEMENT</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display">
                  Clear Governance Before Confirmation.
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                  <p className="p-4 rounded-2xl bg-black/40 border border-white/10 leading-relaxed">
                    Before you confirm your journey, your personalised proposal
                    will clearly outline DARSHAI's Management Fee,
                    wellness-centre programme charges, accommodation, applicable
                    taxes, inclusions, exclusions and other additional costs.
                  </p>
                  <p className="p-4 rounded-2xl bg-black/40 border border-white/10 leading-relaxed text-white/90">
                    No journey is confirmed until the applicable terms,
                    availability and payment requirements have been communicated
                    and confirmation has been provided.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section className="pt-6">
          <Reveal>
            <div className="p-8 sm:p-12 lg:p-16 rounded-[32px] sm:rounded-[40px] bg-[#0A1C14]/90 backdrop-blur-2xl border-2 border-white/80 hover:border-[#C5A059] shadow-[0_0_50px_rgba(197,160,89,0.25)] hover:shadow-[0_0_65px_rgba(197,160,89,0.4)] text-center relative overflow-hidden transition-all duration-500 group">
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#C5A059]/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-[#34D399]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.2)_0%,rgba(14,77,58,0.45)_50%,transparent_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 backdrop-blur-xs pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#C5A059] uppercase">
                  READY TO BEGIN?
                </p>
                <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display">
                  Receive Your Personalised Investment Proposal.
                </h3>
                <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed">
                  Share your wellness goals and preferences with DARSHAI. We
                  will review your profile and prepare a transparent, itemized
                  proposal tailored for you.
                </p>
              </div>
              <div className="relative z-10 pt-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleCTA}
                  className="bg-[#C5A059] hover:bg-[#dabe78] text-black font-bold tracking-wider uppercase text-xs sm:text-sm py-4 px-8 sm:px-10 rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all flex items-center gap-3 cursor-pointer group/btn transform hover:-translate-y-0.5"
                >
                  <span>REQUEST A PERSONALISED RECOMMENDATION</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
export default JourneyInvestmentPage;
