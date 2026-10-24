import React, { useState, useRef } from "react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CarouselPillControls from "./CarouselPillControls";
export const TOP_THREE_PROTOCOLS = [
  {
    id: "restore",
    days: "7 DAYS",
    title: "DARSHAI RESTORE",
    tagline: "Focused recovery",
    desc: "A focused week to step away from daily demands, reset your routine, and begin restoring energy.",
    highlightedDesc: (
      <span className="text-white/95">
        A focused week to step away from daily demands, reset your routine, and
        begin restoring energy.
      </span>
    ),
    fullDesc:
      "Somatic reset & restorative care designed to restore energy reserves and clear fatigue.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=1400&fit=crop&auto=format&q=85",
    focusAreasText:
      "ENERGY RESTORATION • ROUTINE RESET • STRESS RECOVERY • LIFESTYLE BALANCE",
    focusAreaPills: [
      "ENERGY RESTORATION",
      "ROUTINE RESET",
      "STRESS RECOVERY",
      "LIFESTYLE BALANCE",
    ],
  },
  {
    id: "rebalance",
    days: "14 DAYS",
    title: "DARSHAI REBALANCE",
    tagline: "Deeper immersion",
    desc: "Two weeks for a deeper, structured wellness immersion designed to rebuild balance through sustained care and restorative practices.",
    highlightedDesc: (
      <span className="text-white/95">
        Two weeks for a deeper, structured wellness immersion designed to
        rebuild balance through sustained care and restorative practices.
      </span>
    ),
    fullDesc:
      "Systemic rebalance through botanical therapeutics and structured daily immersion.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=1400&fit=crop&auto=format&q=85",
    focusAreasText:
      "SYSTEMIC REBALANCE • SUSTAINED CARE • BOTANICAL THERAPEUTICS • DEEP RESTORATION",
    focusAreaPills: [
      "SYSTEMIC REBALANCE",
      "SUSTAINED CARE",
      "BOTANICAL THERAPEUTICS",
      "DEEP RESTORATION",
    ],
  },
  {
    id: "longevity",
    days: "21 DAYS",
    title: "DARSHAI LONGEVITY",
    tagline: "Healthy-ageing foundations",
    desc: "Three weeks for a more comprehensive wellness journey focused on healthy-ageing foundations, lasting habits, and long-term vitality.",
    highlightedDesc: (
      <span className="text-white/95">
        Three weeks for a comprehensive wellness journey focused on
        healthy-ageing foundations, lasting habits, and long-term vitality.
      </span>
    ),
    fullDesc:
      "Cellular vitality, regenerative therapy, and foundational habits for long-term healthspan.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=1400&fit=crop&auto=format&q=85",
    focusAreasText:
      "HEALTHY-AGEING FOUNDATIONS • LASTING HABITS • LONG-TERM VITALITY • TISSUE REGENERATION",
    focusAreaPills: [
      "HEALTHY-AGEING FOUNDATIONS",
      "LASTING HABITS",
      "LONG-TERM VITALITY",
      "TISSUE REGENERATION",
    ],
  },
];
export const BEYOND_PROTOCOL = {
  id: "beyond",
  days: "ONGOING MEMBERSHIP",
  title: "DARSHAI BEYOND",
  tagline: "Personalised complete journey management",
  desc: "Personalised complete journey management, wellness tracking, follow-ups and continuity beyond the programme.",
  highlightedDesc: (
    <span className="text-white/95">
      Personalised complete journey management, wellness tracking, follow-ups
      and continuity beyond the programme.
    </span>
  ),
  fullDesc:
    "Personalised complete journey management, wellness tracking, follow-ups and continuity beyond the programme.",
  image:
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1600&h=900&fit=crop&auto=format&q=85",
  focusAreasText:
    "INCLUDED: COMPLETE JOURNEY MANAGEMENT • WELLNESS TRACKING • CONTINUOUS FOLLOW-UPS • ONGOING CARE",
  focusAreaPills: [
    "COMPLETE JOURNEY MANAGEMENT",
    "WELLNESS TRACKING",
    "CONTINUOUS FOLLOW-UPS",
    "ONGOING CARE",
  ],
};
export function PersonalizedJourneysSection({ onNavigate }) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const mobileScrollRef = useRef(null);
  const ALL_PROTOCOLS = [...TOP_THREE_PROTOCOLS, BEYOND_PROTOCOL];
  const scrollToMobileSlide = (index) => {
    setActiveMobileIndex(index);
    if (!mobileScrollRef.current) return;
    const cards = mobileScrollRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveMobileIndex(
      Math.min(ALL_PROTOCOLS.length - 1, Math.max(0, index)),
    );
  };
  return (
    <section
      id="darshai-method-programs-section"
      aria-label="Personalized Journeys"
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 overflow-hidden text-[#1D1D1F]"
    >
      <div className="darshai-container">
        <Reveal>
          <div className="max-w-3xl mb-12 md:mb-16 text-left">
            <p
              id="darshai-programs-eyebrow"
              className="typography-eyebrow text-[#0E4D3A] mb-3 inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              <span>THE DARSHAI METHOD</span>
            </p>
            <h2
              id="darshai-programs-heading"
              className="typography-section-h2 tracking-tight mb-4"
            >
              <span className="text-[#1D1D1F] block">
                A Journey Built Around
              </span>
              <span className="text-[#0E4D3A] block mt-1 sm:mt-1.5">
                What You Need.
              </span>
            </h2>
            <p className="typography-lead text-[#4A4A4A] max-w-2xl leading-relaxed font-normal">
              Four pathways. Different goals. Personalised around you with
              practitioner oversight.
            </p>
          </div>
        </Reveal>
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-1 pb-4 touch-pan-x"
          >
            {ALL_PROTOCOLS.map((item) => (
              <div
                onClick={() => {
                  track("protocol_select", { protocol: item.title });
                  if (item.id === "beyond") {
                    onNavigate("/programs");
                  } else {
                    onNavigate(`/programs/${item.id}`);
                  }
                }}
                className="relative min-w-[85vw] h-[520px] rounded-[28px] overflow-hidden bg-[#141416] border border-[#D2D2D7] shadow-xl flex flex-col justify-between p-6 snap-start shrink-0 cursor-pointer group"
                key={item.id}
              >
                <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.88]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 pointer-events-none" />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                    {item.days}
                  </span>
                  <span className="text-[11px] font-mono text-[#34D399] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#34D399]/40 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    <span>DARSHAI PROTOCOL</span>
                  </span>
                </div>
                <div className="relative z-10 space-y-3 pt-4">
                  <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-semibold">
                    {item.title} · {item.days}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-white/80 uppercase tracking-wider">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
                    {item.highlightedDesc}
                  </p>
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#34D399] font-bold uppercase tracking-wider">
                      {item.focusAreaPills.slice(0, 2).join(" • ")}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#34D399] text-black font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                      <span>VIEW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <CarouselPillControls
              total={ALL_PROTOCOLS.length}
              currentIndex={activeMobileIndex}
              onChange={scrollToMobileSlide}
              onPrev={() =>
                scrollToMobileSlide(
                  activeMobileIndex === 0
                    ? ALL_PROTOCOLS.length - 1
                    : activeMobileIndex - 1,
                )
              }
              onNext={() =>
                scrollToMobileSlide(
                  activeMobileIndex === ALL_PROTOCOLS.length - 1
                    ? 0
                    : activeMobileIndex + 1,
                )
              }
              layout="split"
              variant="light"
              showBorder
              className="px-1"
            />
          </div>
        </div>
        <div className="hidden md:block space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TOP_THREE_PROTOCOLS.map((item) => (
              <div
                onClick={() => {
                  track("protocol_select", { protocol: item.title });
                  onNavigate(`/programs/${item.id}`);
                }}
                className="relative h-[540px] sm:h-[580px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#141416] border-2 border-white hover:border-[#34D399] shadow-xl group cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(52,211,153,0.35)] flex flex-col justify-between p-6 sm:p-8"
                key={item.id}
              >
                <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.92] group-hover:brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#0A1A14]/94 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out p-6 sm:p-8 flex flex-col justify-between z-10 overflow-y-auto no-scrollbar text-center items-center">
                    <div className="space-y-3 pt-1 w-full flex flex-col items-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-[#0E4D3A] text-white border border-[#34D399]/40 uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                          <span>
                            {item.title} · {item.days}
                          </span>
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#34D399] drop-shadow-[0_0_18px_rgba(52,211,153,0.45)] transition-colors duration-300 text-center">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#34D399] uppercase tracking-wider font-semibold text-center">
                        {item.tagline}
                      </p>
                      <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal pt-1 text-center mx-auto max-w-md">
                        {item.highlightedDesc}
                      </p>
                      <div className="pt-3 w-full">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#34D399] font-bold mb-2 text-center">
                          KEY PROTOCOL PILLARS
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {item.focusAreaPills.map((pill) => (
                            <span
                              className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/15 text-white border border-white/30 group-hover:border-[#34D399]/50 group-hover:bg-[#0E4D3A]/50 transition-all duration-300"
                              key={pill}
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/15 w-full">
                      <span className="w-full py-3.5 rounded-full bg-white text-[#1D1D1F] font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 group-hover:bg-[#34D399] group-hover:text-black transition-all duration-300 shadow-md group-hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]">
                        <span>EXPLORE {item.id.toUpperCase()}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider shadow-sm">
                    {item.days}
                  </span>
                  <span className="text-xs font-mono text-[#34D399] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#34D399]/40 uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    <span>CURATED PROTOCOL</span>
                  </span>
                </div>
                <div className="relative z-10 space-y-2 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none text-center flex flex-col items-center">
                  <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-semibold text-center">
                    {item.title} · {item.days}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-md text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-white/90 text-center">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal pt-1 line-clamp-2 text-center mx-auto">
                    {item.highlightedDesc}
                  </p>
                  <div className="pt-3 flex items-center justify-center">
                    <span className="px-4.5 py-2 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-[11px] font-mono font-bold text-white uppercase tracking-wider group-hover:bg-[#34D399] group-hover:text-black group-hover:border-[#34D399] transition-all duration-300 inline-flex items-center gap-2 shadow-md">
                      <span> EXPLORE DETAILS</span>
                      
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              track("protocol_select", { protocol: BEYOND_PROTOCOL.title });
              onNavigate("programs");
            }}
            className="relative min-h-[380px] sm:min-h-[420px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#141416] border border-white hover:border-[#34D399] shadow-xl group cursor-pointer transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(52,211,153,0.35)] flex flex-col justify-between p-6 sm:p-10 text-center items-center"
          >
            <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
              <SmartImage
                src={BEYOND_PROTOCOL.image}
                alt={BEYOND_PROTOCOL.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A14]/96 via-[#0E281F]/94 to-[#0A1A14]/96 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out p-6 sm:p-10 flex flex-col justify-between z-10 text-center items-center">
                <div className="space-y-4 max-w-4xl pt-1 w-full flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-[#0E4D3A] text-white border border-[#34D399]/40 uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      <span>
                        {BEYOND_PROTOCOL.title} · {BEYOND_PROTOCOL.days}
                      </span>
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#34D399] drop-shadow-[0_0_20px_rgba(52,211,153,0.45)] transition-colors duration-300 text-center">
                    {BEYOND_PROTOCOL.title}
                  </h3>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal text-center mx-auto max-w-2xl">
                    {BEYOND_PROTOCOL.highlightedDesc}
                  </p>
                  <div className="pt-2 w-full flex flex-col items-center">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[#34D399] font-bold mb-2 text-center">
                      INCLUDED IN BEYOND MEMBERSHIP
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {BEYOND_PROTOCOL.focusAreaPills.map((pill) => (
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/15 text-white border border-white/30 group-hover:border-[#34D399]/50 group-hover:bg-[#0E4D3A]/50 transition-all duration-300 inline-flex items-center gap-1.5"
                          key={pill}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                          <span>{pill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#111111] font-mono text-xs font-bold uppercase tracking-wider group-hover:bg-[#34D399] group-hover:text-black transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] shrink-0">
                    <span>EXPLORE MEMBERSHIP & INCLUSIONS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between w-full group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                {BEYOND_PROTOCOL.days}
              </span>
              <span className="text-xs font-mono text-[#34D399] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#34D399]/40 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>ONGOING CARE CONTINUITY</span>
              </span>
            </div>
            <div className="relative z-10 space-y-2 max-w-2xl mx-auto group-hover:opacity-0 transition-opacity duration-300 pointer-events-none text-center flex flex-col items-center">
              <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-semibold flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <span>
                  {BEYOND_PROTOCOL.title} · {BEYOND_PROTOCOL.days}
                </span>
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug drop-shadow-md text-center">
                {BEYOND_PROTOCOL.title}
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal text-center mx-auto">
                {BEYOND_PROTOCOL.desc}
              </p>
              <div className="pt-3 flex items-center justify-center">
                <span className="px-5 py-2.5 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-[11px] font-mono font-bold text-white uppercase tracking-wider group-hover:bg-[#34D399] group-hover:text-black group-hover:border-[#34D399] transition-all duration-300 inline-flex items-center gap-2 shadow-md">
                  <span>EXPLORE MEMBERSHIP & INCLUSIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#34D399] group-hover:text-black group-hover:translate-x-1 transition-all" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#D2D2D7] max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 rounded-[28px] bg-gradient-to-b from-white via-[#F5F5F7] to-[#EAEAEA] border-2 border-[#0E4D3A]/30 text-center space-y-6 shadow-md hover:shadow-xl hover:border-[#0E4D3A]/60 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#0E4D3A]/10 blur-3xl pointer-events-none group-hover:bg-[#0E4D3A]/15 transition-all duration-700" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#C6A660]/10 blur-3xl pointer-events-none group-hover:bg-[#C6A660]/15 transition-all duration-700" />
            <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] font-mono text-xs font-bold uppercase tracking-wider border border-[#0E4D3A]/20 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0E4D3A] animate-pulse" />
                <span>PERSONALISED JOURNEYS</span>
              </div>
              <h3 className="typography-section-h2 text-[#1D1D1F] tracking-tight pt-1">
                Looking for something different?
              </h3>
              <p className="text-base sm:text-lg text-[#3A3A3C] leading-relaxed font-normal pt-1">
                DARSHAI can curate a personalised wellness journey around your
                goals, clinical suitability, preferred duration and budget.
              </p>
            </div>
            <div className="pt-2 flex justify-center items-center relative z-10">
              <button
                id="explore-programmes-bottom-cta"
                type="button"
                onClick={() => {
                  track("protocol_select", {
                    source: "homepage_bottom_cta",
                    protocol: "all",
                  });
                  onNavigate("programs");
                }}
                className="darshai-btn-primary uppercase cursor-pointer text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 px-9 py-4 sm:px-11 sm:py-4.5 rounded-full bg-[#0E4D3A] text-white hover:bg-[#0A382A] font-bold tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
              >
                <span>EXPLORE PROGRAMMES</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default PersonalizedJourneysSection;
