import React, { useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SmartImage } from "../../components/darshaiNew/SmartImage";
import { Reveal } from "../../components/darshaiNew/Reveal";
import { ArrowRight } from "lucide-react";
import DarshaiEcosystem from "../../components/darshaiNew/DarshaiEcosystem";
import { AboutPurposeSection } from "../../components/darshaiNew/AboutPurposeSection";
export function AboutPage({ onNavigate }) {
  const [heroEl, setHeroEl] = useState(null);
  const heroRef = useCallback((node) => {
    if (node !== null) setHeroEl(node);
  }, []);
  const { scrollYProgress } = useScroll(
    heroEl
      ? { target: { current: heroEl }, offset: ["start start", "end start"] }
      : { offset: ["start start", "end start"] },
  );
  const heroDarkenOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [0.35, 0.9],
  );
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.55], [0, -32]);
  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <section
        ref={heroRef}
        className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden pt-32 pb-24 text-center bg-[#0A0A0A] text-white border-b border-white/10"
      >
        <motion.div
          initial={{ scale: 1.04 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=85"
            alt="Atmospheric mountain environment sanctuary"
            priority
            className="w-full h-full object-cover object-center opacity-65"
          />
          <motion.div
            style={{ opacity: heroDarkenOpacity }}
            className="absolute inset-0 bg-[#0A0A0A] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60 pointer-events-none" />
        </motion.div>
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="relative z-10 darshai-container max-w-4xl mx-auto flex flex-col items-center text-center px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            <p className="typography-eyebrow text-[#C7A25A] tracking-[0.25em] text-xs font-semibold uppercase">
              ABOUT DARSHAI
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6 max-w-3xl mx-auto"
          >
            Wellness, <br />
            <span className="text-[#34D399]">Reconsidered.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            DARSHAI is building an AI-native Geo-Wellness platform that connects
            individual context, environmental intelligence, wellness programmes
            and curated centres to create more personalised wellness journeys.
          </motion.p>
        </motion.div>
      </section>
      <AboutPurposeSection onNavigate={navigateTo} />
      <section className="section-story bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F]">
        <div className="darshai-container">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <div className="lg:col-span-6 rounded-[24px] lg:rounded-[32px] border border-[#D2D2D7] bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_12px_36px_-10px_rgba(0,0,0,0.06)]">
                <div className="space-y-6">
                  <div>
                    <p className="typography-eyebrow text-[#0E4D3A] mb-3 uppercase tracking-[0.25em] font-semibold text-xs">
                      FOUNDATIONAL FRAMEWORK
                    </p>
                    <h2 className="typography-section-h2 mb-4">
                      <span className="text-[#1D1D1F] block">What Is</span>
                      <span className="text-[#0E4D3A] block mt-1">
                        Geo-Wellness?
                      </span>
                    </h2>
                    <div className="w-12 h-[2px] bg-[#0E4D3A] mb-6" />
                  </div>
                  <div className="space-y-4 typography-body text-[#6E6E73] leading-relaxed">
                    <p>
                      Geo-Wellness is DARSHAI's approach to understanding how
                      geography, climate, environment and wellness programmes
                      may influence individual wellness experiences.
                    </p>
                    <p className="text-[#1D1D1F] font-semibold typography-body-large border-l-2 border-[#0E4D3A] pl-4 py-1">
                      The future of wellness is not only understanding who you
                      are.
                      <br />
                      It is also understanding where you are.
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[11px] font-mono font-semibold tracking-wider text-[#0E4D3A] uppercase mb-2.5">
                      The Geo-Wellness Synthesis
                    </p>
                    <div className="p-4 rounded-2xl bg-[#F9F9FB] border border-[#D2D2D7]/80 shadow-xs space-y-2 font-mono text-xs text-[#1D1D1F]">
                      <div className="flex items-center justify-between py-1 border-b border-[#E5E5EA]">
                        <span className="font-bold text-[#EC4899] text-[11px]">
                          INDIVIDUAL
                        </span>
                        <span className="text-[#6E6E73] text-[10px]">
                          Biological & lifestyle context
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#E5E5EA]">
                        <span className="font-bold text-[#38BDF8] text-[11px]">
                          CLIMATE & GEOGRAPHY
                        </span>
                        <span className="text-[#6E6E73] text-[10px]">
                          Altitude, pressure & terrain
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#E5E5EA]">
                        <span className="font-bold text-[#34D399] text-[11px]">
                          ENVIRONMENT
                        </span>
                        <span className="text-[#6E6E73] text-[10px]">
                          Microclimates & botanical canopy
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#E5E5EA]">
                        <span className="font-bold text-[#C6A660] text-[11px]">
                          PROGRAMME
                        </span>
                        <span className="text-[#6E6E73] text-[10px]">
                          Curated clinical therapies
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 font-sans">
                        <span className="font-bold text-[#0E4D3A] text-xs sm:text-[13px] flex items-center gap-1.5">
                          <span>↓</span> GEO-WELLNESS
                        </span>
                        <span className="text-[10px] font-medium text-[#0E4D3A] bg-[#0E4D3A]/10 px-2 py-0.5 rounded-full font-mono">
                          Person + Place + Programme
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 h-full flex flex-col">
                <div className="relative w-full h-full min-h-[380px] lg:min-h-full rounded-[24px] lg:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#1D1D1F] shadow-[0_12px_36px_-10px_rgba(0,0,0,0.08)] group flex-1">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=1200&fit=crop&auto=format&q=85"
                    alt="Lush atmospheric mountain and forest Geo-Wellness sanctuary"
                    className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none group-hover:opacity-95 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white flex items-center gap-3.5 shadow-2xl transform group-hover:translate-y-[-2px] transition-transform duration-500">
                    <div className="w-3 h-3 rounded-full bg-[#34D399] animate-pulse shrink-0 shadow-[0_0_12px_#34D399]" />
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C6A660]">
                        BIOCLIMATIC HABITAT
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-white/95">
                        High-Altitude Mountain & Canopy Sanctuary
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <DarshaiEcosystem onNavigate={navigateTo} />
      <section className="relative text-center py-28 md:py-36 overflow-hidden bg-[#1D1D1F] border-b border-white/10">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SmartImage
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&auto=format&fit=crop&q=80"
            alt="Atmospheric pine forest canopy at dusk"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F]/90 via-[#1D1D1F]/70 to-[#1D1D1F]/95" />
        </div>
        <div className="relative z-10 darshai-container max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <p className="typography-eyebrow text-[#C6A660] mb-3 uppercase tracking-[0.25em] font-semibold">
                OUR MISSION
              </p>
              <div className="w-12 h-[2px] bg-[#0E4D3A] mx-auto my-4" />
              <h2 className="typography-section-h2 text-white font-semibold tracking-tight leading-[1.2] max-w-3xl mx-auto my-6">
                <span>Make Wellness</span>
                <br />
                <span className="text-[#34D399]">
                  More Intelligent. More Human.
                </span>
                <br />
                <span className="text-[#C6A660]">More Context-Aware.</span>
              </h2>
              <p className="typography-lead text-white/70 max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10">
                “To make personalized wellness journeys more intelligent,
                transparent and context-aware.”
              </p>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => navigateTo("assessment")}
                  className="typography-ui-button px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#146049] text-white font-semibold tracking-wider uppercase inline-flex items-center gap-3 border border-[#34D399]/40 shadow-[0_8px_24px_rgba(14,77,58,0.4)] hover:shadow-[0_12px_32px_rgba(14,77,58,0.6)] transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                >
                  <span>BEGIN YOUR JOURNEY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#34D399]" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
export default AboutPage;
