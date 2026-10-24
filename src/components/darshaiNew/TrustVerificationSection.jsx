import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { ShieldCheck, UserCheck, FileText, Compass, X } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const PILLARS = [
  {
    id: "verified-partners",
    num: "01",
    title: "Verified Partners",
    icon: ShieldCheck,
    shortDesc:
      "Accredited facilities, genuine campus environments & verified programmes.",
    expandedDetail:
      "Every wellness retreat partner is reviewed for statutory licensing, facility standards, accommodation quality, hygiene protocols and accurate programme descriptions.",
    passportKey: "partner",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Verified wellness centre facility and campus",
    imageBadge: "01 / VERIFIED PARTNER CENTRES",
    tagline: "Facility Standards & Statutory Licensing",
  },
  {
    id: "practitioner-suitability",
    num: "02",
    title: "Practitioner Suitability",
    icon: UserCheck,
    shortDesc:
      "Qualified Ayurvedic doctors & wellness practitioners determine individual suitability.",
    expandedDetail:
      "All clinical intake, health assessments and programme suitability decisions are conducted directly by qualified resident practitioners. DARSHAI does not provide medical diagnoses or prescribe treatments.",
    passportKey: "environment",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Resident Ayurvedic practitioner conducting consultation",
    imageBadge: "02 / QUALIFIED RESIDENT PRACTITIONERS",
    tagline: "Independent Clinical Suitability",
  },
  {
    id: "documented-standards",
    num: "03",
    title: "Documented Standards",
    icon: FileText,
    shortDesc:
      "Published schedules, accommodation tiers, dining arrangements & safety protocols.",
    expandedDetail:
      "Clear documentation covering daily therapeutic routines, room categories, dietary arrangements, facility hygiene, and emergency medical procedures communicated prior to booking.",
    passportKey: "programme",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Documented operational standards and wellness protocols",
    imageBadge: "03 / CLEAR OPERATIONAL STANDARDS",
    tagline: "Published Programmes & Clear Inclusions",
  },
  {
    id: "journey-transparency",
    num: "04",
    title: "Journey Transparency",
    icon: Compass,
    shortDesc:
      "Clear pricing, upfront inclusions, defined responsibilities & cancellation terms.",
    expandedDetail:
      "Transparent proposals with itemised pricing, inclusions, exclusions, and cancellation policies. DARSHAI coordinates journey logistics while partner centres deliver all on-site care.",
    passportKey: "verified",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Transparent journey itinerary and coordination overview",
    imageBadge: "04 / DEFINED RESPONSIBILITIES & PRICING",
    tagline: "Defined Roles & Upfront Inclusions",
  },
];
export function TrustVerificationSection({
  id = "selection-process",
  onNavigate,
}) {
  const containerRef = useRef(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [expandedPillar, setExpandedPillar] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Track active pillar index across 4 ranges (0.00 -> 1.00)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const step = Math.min(Math.floor(latest * 4), 3);
      setActivePillarIndex(step);
    });
  }, [scrollYProgress]);
  const activePillar = PILLARS[activePillarIndex];
  return (
    <section
      ref={containerRef}
      id={id}
      className="relative bg-[#111112] text-white border-b border-white/10 h-[260vh] scroll-mt-12"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#111112] z-10 py-6 sm:py-8 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col h-full max-h-[860px] justify-between">
          <div className="mb-4 sm:mb-6 shrink-0">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <p className="typography-eyebrow text-[#C6A660] mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A660] shadow-[0_0_8px_#C6A660]" />
                    <span>TRUST</span>
                  </p>
                  <h2 className="typography-section-h2 font-semibold text-white tracking-tight leading-tight">
                    Built On Real Partnerships.
                  </h2>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>VERIFIED CENTRES · CLEAR STANDARDS</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch flex-1 min-h-0">
            <div className="order-1 lg:order-1 lg:col-span-7 relative rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-white/15 bg-[#18181A] shadow-2xl flex flex-col justify-between group h-[190px] sm:h-[260px] lg:h-auto min-h-[190px] sm:min-h-[260px] lg:min-h-[360px] shrink-0">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full absolute inset-0"
                    key={activePillar.id}
                  >
                    <SmartImage
                      src={activePillar.image}
                      alt={activePillar.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 pointer-events-none" />
              </div>
              <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>{activePillar.imageBadge}</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#C6A660] bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/15 hidden sm:inline-block">
                  VERIFIED PARTNERSHIP STANDARDS
                </span>
              </div>
              <div className="relative z-10 p-3 sm:p-6 lg:p-8 flex items-center justify-between">
                <div className="bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-2 sm:gap-2.5 shadow-lg">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399]" />
                  <span className="text-[#34D399] font-mono font-bold">
                    {activePillar.num}
                  </span>
                  <span className="truncate max-w-[200px] sm:max-w-none">
                    {activePillar.title} — {activePillar.tagline}
                  </span>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2 lg:col-span-5 flex flex-col justify-between bg-[#1C1C1E] rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl relative overflow-hidden min-h-0">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0E4D3A] text-white border border-[#34D399]/30 mb-2 sm:mb-3 shadow-md">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span>PARTNERSHIP GOVERNANCE</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-1 sm:mb-1.5">
                  Direct Partner Standards
                </h3>
                <p className="text-[11px] sm:text-xs lg:text-sm text-white/70 font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
                  DARSHAI coordinates journeys in collaboration with independent
                  partner centres based on verified facilities, practitioner
                  qualifications, and transparent operational standards.
                </p>
              </div>
              <div className="py-2 sm:py-3 my-auto space-y-1.5 sm:space-y-2">
                <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#C6A660] font-bold mb-1">
                  4 PRIMARY TRUST PILLARS
                </p>
                {PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isActive = activePillarIndex === idx;
                  return (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setActivePillarIndex(idx);
                          setExpandedPillar(pillar);
                          track("explore_environments", {
                            pillar: pillar.title,
                          });
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 lg:p-3.5 rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                          isActive
                            ? "bg-white/15 border-[#34D399] text-white shadow-lg ring-1 ring-[#34D399]/40 scale-[1.01]"
                            : "bg-black/30 border-white/10 hover:border-white/25 text-white/60 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-colors ${
                              isActive
                                ? "bg-[#34D399] text-black shadow-[0_0_12px_#34D399]"
                                : "bg-white/10 text-white/50 border border-white/15"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <div>
                            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase block text-white">
                              {pillar.num} {pillar.title}
                            </span>
                            <span
                              className={`text-[11px] sm:text-xs font-normal line-clamp-1 block transition-colors ${isActive ? "text-[#34D399]" : "text-white/60"}`}
                            >
                              {pillar.shortDesc}
                            </span>
                          </div>
                        </div>
                        {isActive && (
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#34D399] shadow-[0_0_10px_#34D399] animate-pulse shrink-0 ml-2" />
                        )}
                      </button>
                      {idx < PILLARS.length - 1 && (
                        <div className="flex justify-center py-0">
                          <div
                            className={`w-0.5 h-1.5 transition-colors duration-300 ${activePillarIndex > idx ? "bg-[#34D399]" : "bg-white/15"}`}
                          />
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-white/70 font-mono italic">
                  Scroll or tap pillars to inspect verification layers
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-[#34D399] font-bold">
                  0{activePillarIndex + 1} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {expandedPillar && (
          <div
            onClick={() => setExpandedPillar(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#18181A] border border-white/15 rounded-[28px] p-7 sm:p-9 text-white shadow-2xl overflow-hidden cursor-default"
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setExpandedPillar(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#34D399] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                  <span>PRIMARY TRUST PILLAR {expandedPillar.num}</span>
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                  {expandedPillar.title}
                </h3>
                <p className="text-sm text-[#C6A660] font-mono mb-5 pb-4 border-b border-white/10">
                  {expandedPillar.shortDesc}
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal mb-6">
                  {expandedPillar.expandedDetail}
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50">
                    DARSHAI Partnership Standards · Independent Partner Centres
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedPillar(null)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default TrustVerificationSection;
