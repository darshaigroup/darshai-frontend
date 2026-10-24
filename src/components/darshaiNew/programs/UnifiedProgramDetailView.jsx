import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Compass,
  ChevronDown,
  X,
} from "lucide-react";
import SmartImage from "../SmartImage";
import { ALL_PROGRAMS } from "../../../data/darshaiNew/programsData";
import { track } from "../../../lib/darshaiNew/analytics";
export default function UnifiedProgramDetailView({ program, onNavigate }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowStickyNav(scrollPos > 420);
      const sections = [
        { id: "program-hero", name: "hero" },
        { id: "program-media", name: "media" },
        { id: "what-to-expect", name: "expect" },
        { id: "journey-focus", name: "focus" },
        { id: "next-step", name: "step" },
      ];
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(sec.name);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleCtaClick = (source) => {
    track("begin_journey", {
      program: program.name,
      slug: program.slug,
      source,
    });
    onNavigate(`/contact?program=${program.slug}`);
  };
  const highlightsItems = program.highlightsText
    ? program.highlightsText
        .split("•")
        .map((item) => item.trim())
        .filter(Boolean)
    : program.journeyFocusItems;
  const galleryImages = program.galleryImages || [program.image];
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] selection:bg-[#0E4D3A] selection:text-white font-sans">
      <AnimatePresence>
        {showStickyNav && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 z-40 bg-[#111112]/90 backdrop-blur-md border-b border-white/10 shadow-lg text-white"
          >
            <div className="darshai-container h-14 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => onNavigate("/programs")}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer"
                  aria-label="Back to programmes"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="truncate">
                  <span className="font-semibold text-xs sm:text-sm text-white truncate block">
                    {program.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 hidden sm:block truncate">
                    Duration: {program.duration}
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-1 text-xs font-medium">
                {[
                  { id: "program-hero", label: "Overview", name: "hero" },
                  { id: "program-media", label: "Media", name: "media" },
                  {
                    id: "what-to-expect",
                    label: "What to Expect",
                    name: "expect",
                  },
                  {
                    id: "journey-focus",
                    label: "Journey Focus",
                    name: "focus",
                  },
                  { id: "next-step", label: "Your Next Step", name: "step" },
                ].map((item) => (
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeSection === item.name
                        ? "bg-[#0E4D3A] text-white font-semibold shadow-xs"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    key={item.id}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleCtaClick("sticky_subnav")}
                className="px-4 py-2 rounded-full bg-[#0E4D3A] hover:bg-[#093527] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer border border-emerald-500/20"
              >
                <span className="hidden sm:inline">REQUEST RECOMMENDATION</span>
                <span className="sm:hidden">ENQUIRE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#34D399]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section
        id="program-hero"
        ref={heroRef}
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-[#0A0D0C] text-white overflow-hidden pt-28 pb-0"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ scale: heroImageScale }}
            className="w-full h-full"
          >
            <SmartImage
              src={program.heroImage || program.image}
              alt={program.name}
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </div>
        <div className="darshai-container relative z-10 flex-1 flex flex-col justify-center items-center text-center py-10 sm:py-16 max-w-5xl mx-auto">
          <motion.div
            style={{ opacity: heroContentOpacity }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-white px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-xs font-mono font-semibold uppercase tracking-wider shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                <span>
                  {program.code} — {program.name}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/80">
                  DURATION: {program.duration}
                </span>
              </span>
            </div>
            <h1 className="typography-hero-display text-white mb-6 drop-shadow-md">
              {program.headline}
            </h1>
            <div className="max-w-4xl mx-auto mb-8 sm:mb-10 px-2">
              <p className="typography-lead text-white/90 leading-relaxed font-normal drop-shadow-sm">
                {program.overview || program.description}
              </p>
            </div>
            <div className="mb-10 max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span className="typography-eyebrow font-semibold text-[#C6A660]">
                  PROGRAMME HIGHLIGHTS
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 typography-ui-button font-medium text-white/90">
                {highlightsItems.map((item, idx) => (
                  <>
                    <span>{item}</span>
                    {idx < highlightsItems.length - 1 && (
                      <span className="text-white/30 font-light select-none">
                        |
                      </span>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-xl">
              <button
                type="button"
                onClick={() => scrollToSection("what-to-expect")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-black/40 hover:bg-white/15 text-white border border-white/25 hover:border-white/50 backdrop-blur-md typography-ui-button font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
              >
                <span>EXPLORE PROGRAMME DETAILS</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleCtaClick("hero_cta")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0E4D3A] hover:bg-[#093527] text-white typography-ui-button font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#0E4D3A]/40 border border-emerald-500/30 group"
              >
                <span>REQUEST A PERSONALISED RECOMMENDATION</span>
                <span className="text-[#34D399] group-hover:translate-x-1 transition-transform font-bold">
                  →
                </span>
              </button>
            </div>
          </motion.div>
        </div>
        <div className="relative z-10 w-full bg-black/60 backdrop-blur-md border-t border-white/10 py-3.5 px-4 sm:px-8">
          <div className="darshai-container flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-white/60">
              <button
                type="button"
                onClick={() => onNavigate("/")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HOME
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onNavigate("/programs")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                PROGRAMS
              </button>
              <span>/</span>
              <span className="flex items-center gap-1.5 text-[#34D399] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>{program.name.toUpperCase()}</span>
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate("/programs")}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL PROGRAMMES</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("what-to-expect")}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <span>EXPLORE DETAILS</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#34D399]" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="program-media"
        className="py-16 sm:py-24 border-b border-[#D2D2D7] bg-[#F5F5F7] scroll-mt-14"
      >
        <div className="darshai-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryImages.map((img, idx) => (
              <div
                className="rounded-[28px] overflow-hidden bg-white border border-[#D2D2D7] shadow-lg aspect-[16/10] group cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
                key={idx}
              >
                <SmartImage
                  src={img}
                  alt={`${program.name} gallery image ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="what-to-expect"
        className="py-20 md:py-28 bg-white scroll-mt-14"
      >
        <div className="darshai-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT TO EXPECT</span>
              </div>
              <h2 className="typography-section-h2 text-3xl sm:text-4xl text-[#1D1D1F]">
                {program.headline}
              </h2>
              <p className="text-xl sm:text-2xl lg:text-3xl text-[#1D1D1F] font-medium leading-relaxed tracking-tight">
                {program.whatToExpect}
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-[32px] overflow-hidden bg-[#141416] border border-[#D2D2D7] shadow-xl p-8 sm:p-10 text-white">
                <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider mb-4">
                  JOURNEY FOCUS
                </p>
                <div className="space-y-4">
                  {program.journeyFocusItems.map((item, idx) => (
                    <div
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
                      key={item}
                    >
                      <span className="w-8 h-8 rounded-full bg-[#0E4D3A] text-[#34D399] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#F5F5F7] border-t border-[#D2D2D7]">
        <div className="darshai-container">
          <div className="max-w-3xl mb-12">
            <p className="typography-eyebrow font-semibold text-[#0E4D3A] mb-2">
              EXPLORE OTHER PROGRAMMES
            </p>
            <h2 className="typography-section-h2 text-3xl sm:text-4xl text-[#1D1D1F]">
              Explore Other Darshai Journeys
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALL_PROGRAMS.filter((p) => p.slug !== program.slug).map((p) => (
              <div
                onClick={() => {
                  track("program_explore_card_click", { target: p.slug });
                  onNavigate(`/programs/${p.slug}`);
                }}
                className="relative rounded-[32px] overflow-hidden shadow-xl aspect-[16/11] sm:aspect-[4/3] cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(14,77,58,0.3)] border border-[#D2D2D7] group flex flex-col justify-between p-8 sm:p-10 bg-[#141416]"
                key={p.slug}
              >
                <SmartImage
                  src={p.heroImage || p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30 uppercase tracking-wider">
                    {p.code} — {p.duration}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#0E4D3A] group-hover:text-[#34D399] transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className="relative z-10 space-y-3">
                  <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-semibold">
                    {p.name}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#34D399] transition-colors">
                    {p.headline}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed font-normal line-clamp-2">
                    {p.description}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1D1D1F] font-mono text-xs font-bold uppercase tracking-wider group-hover:bg-[#34D399] group-hover:text-black transition-all shadow-md">
                      <span>EXPLORE {p.name.replace("DARSHAI ", "")}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="next-step"
        className="py-20 md:py-28 bg-[#141416] text-white border-t border-white/10 scroll-mt-14"
      >
        <div className="darshai-container max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#34D399] text-xs font-mono font-bold uppercase border border-white/10">
            <Compass className="w-3.5 h-3.5" />
            <span>YOUR NEXT STEP</span>
          </div>
          <h2 className="typography-section-h2 text-3xl sm:text-4xl text-white">
            Begin Your Personalised Journey with DARSHAI
          </h2>
          <p className="typography-lead text-white/80 max-w-2xl mx-auto leading-relaxed">
            {program.yourNextStep}
          </p>
          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={() => handleCtaClick("next_step")}
              className="px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#093527] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#0E4D3A]/40 border border-emerald-500/30 inline-flex items-center gap-2.5 cursor-pointer hover:scale-105"
            >
              <span>{program.ctaText}</span>
            </button>
          </div>
        </div>
      </section>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              src={galleryImages[lightboxIndex]}
              alt="Lightbox preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
