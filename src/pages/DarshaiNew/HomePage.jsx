import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DarshaiMethod } from "../../components/darshaiNew/DarshaiMethod";
import SmartImage from "../../components/darshaiNew/SmartImage";
import Reveal from "../../components/darshaiNew/Reveal";
import StatCounter from "../../components/darshaiNew/StatCounter";
import SignalBadge from "../../components/darshaiNew/SignalBadge";
import useCursorHighlight from "../../components/darshaiNew/useCursorHighlight";
import { track } from "../../lib/darshaiNew/analytics";
import {
  ShieldCheck,
  UserCheck,
  FileText,
  Star,
  Image as ImageIcon,
  Compass,
} from "lucide-react";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
import CarouselPillControls from "../../components/darshaiNew/CarouselPillControls";
import { HomeHeroSection } from "../../components/darshaiNew/HomeHeroSection";
import { WhyDarshaiProblemSolutionCard } from "../../components/darshaiNew/WhyDarshaiProblemSolutionCard";
import { FoundationalPrinciplesStory } from "../../components/darshaiNew/FoundationalPrinciplesStory";
import { HomeImmersiveGeoWellnessSelector } from "../../components/darshaiNew/HomeImmersiveGeoWellnessSelector";
import { PersonalizedJourneysSection } from "../../components/darshaiNew/PersonalizedJourneysSection";
import { CuratedEnvironmentsCarousel } from "../../components/darshaiNew/CuratedEnvironmentsCarousel";
export function HomePage({ onNavigate }) {
  const [activeProgramTab, setActiveProgramTab] = useState("all");
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const insightsScrollRef = useRef(null);
  const scrollToInsight = (index) => {
    setActiveInsightIndex(index);
    if (!insightsScrollRef.current) return;
    const cards = insightsScrollRef.current.querySelectorAll(".snap-start");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };
  const handleInsightScroll = () => {
    if (!insightsScrollRef.current) return;
    const { scrollLeft, clientWidth } = insightsScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.82));
    setActiveInsightIndex(Math.min(2, Math.max(0, index)));
  };
  // Hero Parallax & Scroll Exit Setup
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll(
    heroRef.current
      ? {
          target: heroRef,
          offset: ["start start", "end start"],
        }
      : {
          offset: ["start start", "end start"],
        },
  );
  const heroParallax = useTransform(heroScroll, [0, 1], [0, 40]);
  const heroScale = useTransform(heroScroll, [0, 1], [1.0, 0.97]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1.0, 0.92]);
  // Why Darshai Interactive State & Sequence
  const whySectionRef = useRef(null);
  // Trust & Governance Timeline Scroll Setup
  const trustSectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [touchCard, setTouchCard] = useState(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { scrollYProgress: trustScroll } = useScroll(
    mounted
      ? {
          target: trustSectionRef,
          offset: ["start 80%", "end 40%"],
        }
      : {
          offset: ["start 80%", "end 40%"],
        },
  );
  const timelineProgress = useTransform(trustScroll, [0, 1], [0, 1]);
  const programTabs = [
    { id: "all", label: "All Protocols", badge: "4" },
    { id: "protocol-01", label: "01. Executive Reset", badge: "01" },
    { id: "protocol-02", label: "02. Deep Detox", badge: "02" },
    { id: "protocol-03", label: "03. Longevity & Healthy Ageing", badge: "03" },
    { id: "protocol-04", label: "04. Sovereign Protocol", badge: "04" },
  ];
  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const protocolsList = [
    {
      id: "protocol-01",
      num: "01",
      title: "01. Executive Reset Protocol",
      tagline: "Nervous System Recovery",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop&auto=format",
      treatmentCaption: "Shirodhara & Somatic Reset",
      desc: "Recovery and renewal for founders, executives and high-performing professionals.",
      focusAreas:
        "Stress & Burnout Recovery • Sleep & Recovery • Executive Wellness • Lifestyle Reset",
    },
    {
      id: "protocol-02",
      num: "02",
      title: "02. Deep Detox Protocol",
      tagline: "Panchakarma Purification",
      image:
        "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop&auto=format",
      treatmentCaption: "Herbal Poultice & Botanical Cleansing",
      desc: "Structured wellness journeys centred on detoxification, rejuvenation and restoration.",
      focusAreas:
        "Detox & Rejuvenation • Panchakarma • Lifestyle Renewal • Digestive Support",
    },
    {
      id: "protocol-03",
      num: "03",
      title: "03. Longevity & Healthy Ageing Protocol",
      tagline: "Cellular Vitality & Resilience",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=800&fit=crop&auto=format",
      treatmentCaption: "Botanical Hydrotherapy & Tissue Regeneration",
      desc: "Designed for vitality, resilience and long-term wellbeing.",
      focusAreas:
        "Healthy Ageing • Preventive Wellness • Vitality • Lifestyle Optimization",
    },
    {
      id: "protocol-04",
      num: "04",
      title: "04. Sovereign Protocol",
      tagline: "Bespoke Private Sanctuary",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=800&fit=crop&auto=format",
      treatmentCaption: "Confidential Diagnostic & Private Pavilion Care",
      desc: "A highly personalized journey designed around the individual.",
      focusAreas:
        "Personal Goals • Environment Matching • Programme Suitability • Journey Duration • Premium Personalization",
    },
  ];
  function FeaturedArticleCard({ onClick }) {
    const {
      ref: articleRef,
      onPointerMove,
      onPointerLeave,
      coords,
      shouldShow,
    } = useCursorHighlight();
    return (
      <div
        ref={articleRef}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className="relative min-w-[85vw] sm:min-w-[420px] lg:min-w-0 lg:col-span-7 h-[420px] sm:h-[480px] lg:h-[520px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D2D2D7] hover:border-[#0E4D3A] bg-[#141416] group cursor-pointer apple-product-card shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 snap-start shrink-0"
      >
        {shouldShow && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.09), transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-[#0A1A14] overflow-hidden">
          <SmartImage
            src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&h=800&fit=crop&auto=format"
            alt="The missing variable in wellness"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-4/5 sm:h-3/5 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 z-20 flex flex-col justify-end">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/20">
            <span className="typography-eyebrow text-[#C6A660] font-semibold tracking-wider">
              WHAT IS GEO-WELLNESS?
            </span>
            <span className="typography-metadata text-white/70 tabular-nums">
              8 MIN READ
            </span>
          </div>
          <h3 className="typography-card-title text-white mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:text-[#C6A660]">
            A way of considering the person, the programme and the place
            together.
          </h3>
          <div className="flex justify-end items-center pt-3 border-t border-white/15">
            <span className="inline-flex items-center gap-1.5 typography-ui-button text-white group-hover:text-[#C6A660] transition-colors uppercase font-semibold text-xs">
              <span>Read Article</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[5px]"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <HomeHeroSection onNavigate={navigateTo} />
      <section
        ref={whySectionRef}
        id="why-darshai-section"
        className="section-editorial bg-white border-b border-[#D2D2D7]"
      >
        <div className="darshai-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center mb-16 md:mb-20">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <Reveal>
                <div>
                  <p
                    id="why-darshai-eyebrow"
                    className="typography-eyebrow text-[#0E4D3A] mb-4 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                    <span>WHY DARSHAI EXISTS</span>
                  </p>
                  <h2
                    id="why-darshai-heading"
                    className="typography-section-h2 tracking-tight mb-5 md:mb-6"
                  >
                    <span className="text-[#1D1D1F] block">
                      Finding Wellness Is Easy.
                    </span>
                    <span className="text-[#0E4D3A] block mt-1 sm:mt-2">
                      Finding What Fits You Is Hard.
                    </span>
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="space-y-4 max-w-xl">
                  <p className="typography-lead text-[#4A4A4A] leading-relaxed">
                    Many wellness centres and programmes exist. The difficult
                    part is knowing which options are relevant to you.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 flex items-center justify-center">
              <Reveal delay={0.15} className="w-full">
                <WhyDarshaiProblemSolutionCard onNavigate={navigateTo} />
              </Reveal>
            </div>
          </div>
          <FoundationalPrinciplesStory />
        </div>
      </section>
      <HomeImmersiveGeoWellnessSelector onNavigate={navigateTo} />
      <DarshaiMethod onNavigate={navigateTo} />
      <PersonalizedJourneysSection onNavigate={navigateTo} />
      <CuratedEnvironmentsCarousel onNavigate={navigateTo} />
      <section
        ref={trustSectionRef}
        id="trust-governance-section"
        className="section-editorial bg-[#141416] border-b border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0E4D3A]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#C6A660]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="darshai-container relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-10 md:mb-14">
              <p
                id="trust-governance-eyebrow"
                className="typography-eyebrow text-[#C6A660] mb-4 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>TRUST & GOVERNANCE</span>
              </p>

              <h2
                id="trust-governance-heading"
                className="typography-section-h2 tracking-tight mb-5 md:mb-6"
              >
                <span className="text-white block">Beyond Booking.</span>
                <span className="text-[#34D399] block mt-1 sm:mt-2">
                  Complete Journey Coordination.
                </span>
              </h2>

              <p className="typography-lead text-white/72 leading-relaxed">
                DARSHAI coordinates the entire journey experience before, during
                and after the programme.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative col-span-4 md:col-span-8 lg:col-span-6 bg-[#1A1A1E] rounded-[24px] border border-white hover:border-[#34D399] p-6 md:p-10 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden apple-product-card"
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-[#34D399] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#34D399]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                    <p className="typography-eyebrow text-[#C6A660] font-semibold">
                      Journey support includes:
                    </p>

                    <span className="typography-metadata text-white/60 uppercase tracking-wider">
                      <StatCounter value={8} suffix=" Touchpoints" />
                    </span>
                  </div>

                  <div className="relative pl-8 space-y-4">
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-white/15" />

                    <motion.div
                      style={{ scaleY: timelineProgress }}
                      className="absolute left-3 top-2 bottom-2 w-px bg-[#34D399] origin-top will-change-transform shadow-[0_0_8px_#34D399]"
                    />

                    {[
                      "Journey Planning",
                      "Centre Coordination",
                      "Travel Guidance",
                      "Airport Transfer Coordination",
                      "Arrival Assistance",
                      "Programme Coordination",
                      "Journey Monitoring",
                      "Post-Programme Follow-Up",
                    ].map((item, index) => (
                      <motion.div
                        className="relative flex items-center"
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{
                          once: true,
                          amount: 0.25,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + index * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="absolute -left-5 -translate-x-1/2 w-3 h-3 rounded-full bg-[#34D399] border-2 border-[#1A1A1E] ring-2 ring-[#34D399]/40 shadow-[0_0_8px_rgba(52,211,153,0.5)] z-10 shrink-0 group-hover:scale-110 transition-transform duration-300" />

                        <span className="typography-body font-medium text-white/90 group-hover:text-[#34D399] transition-colors duration-300">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 pt-6 mt-6 border-t border-white/10 typography-metadata text-white/50"
                >
                  <span>Coordinated Experience Management</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative col-span-4 md:col-span-8 lg:col-span-6 bg-[#1A1A1E] rounded-[24px] border border-white hover:border-[#34D399] p-6 md:p-10 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden apple-product-card"
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-[#34D399] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#34D399]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10"
                >
                  <div className="space-y-2 mb-6">
                    <h3 className="typography-h3 text-white leading-snug group-hover:text-[#34D399] transition-colors duration-300">
                      Trust is earned through transparency, quality and
                      consistency.
                    </h3>

                    <p className="typography-body text-white/70 leading-relaxed">
                      DARSHAI works with curated wellness partners and qualified
                      professionals while maintaining a structured and
                      documented journey process.
                    </p>
                  </div>

                  <div className="pb-3 mb-4 border-b border-white/10">
                    <p className="typography-eyebrow text-[#C6A660] font-semibold">
                      Trust signals:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    {[
                      {
                        title: "Verified Wellness Partners",
                        icon: ShieldCheck,
                      },
                      {
                        title: "Professional Profiles",
                        icon: UserCheck,
                      },
                      {
                        title: "Documented Policies",
                        icon: FileText,
                      },
                      {
                        title: "Real Testimonials",
                        icon: Star,
                      },
                      {
                        title: "Centre Media & Visuals",
                        icon: ImageIcon,
                      },
                      {
                        title: "Transparent Journey Process",
                        icon: Compass,
                      },
                    ].map(({ title: signal, icon: Icon }, index) => (
                      <motion.div
                        className="flex items-center gap-3 py-3 border-b border-white/10 last:border-b-0 sm:last:border-b"
                        key={signal}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: 0.45,
                          delay: 0.35 + index * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-md bg-[#34D399]/10 text-[#34D399] flex items-center justify-center group-hover:bg-[#34D399] group-hover:text-[#141416] transition-all duration-300">
                          <Icon className="w-4 h-4 stroke-[2]" />
                        </span>

                        <span className="typography-body font-medium text-white/90">
                          {signal}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 pt-6 mt-6 border-t border-white/10"
                >
                  <SignalBadge variant="dark" dot>
                    Governance & Verification
                  </SignalBadge>
                </motion.div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
      <section
        id="insights-section"
        className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7]"
      >
        <div className="darshai-container">
          <Reveal>
            <div className="max-w-3xl mb-10 md:mb-14">
              <p
                id="insights-eyebrow"
                className="typography-eyebrow text-[#0E4D3A] mb-4 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
                <span>INSIGHTS</span>
              </p>

              <h2
                id="insights-heading"
                className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-5 md:mb-6"
              >
                <span className="block">Ideas That Change</span>
                <span className="text-[#0E4D3A] block mt-1 sm:mt-1.5">
                  How You Think About Wellness.
                </span>
              </h2>

              <p className="typography-lead text-[#4A4A4A] leading-relaxed">
                Perspectives, ideas and educational content exploring wellness,
                environment, longevity and healthy living.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              ref={insightsScrollRef}
              onScroll={handleInsightScroll}
              className="flex lg:grid lg:grid-cols-12 gap-4 md:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-4 sm:px-0 -mx-4 sm:mx-0 scrollbar-none no-scrollbar touch-pan-x items-stretch"
            >
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-w-[85vw] sm:min-w-[420px] lg:min-w-0 lg:col-span-7 snap-start shrink-0"
              >
                <FeaturedArticleCard onClick={() => navigateTo("insights")} />
              </motion.div>

              <div className="flex flex-row lg:flex-col gap-5 sm:gap-6 contents lg:flex lg:col-span-5">
                {[
                  {
                    cat: "ENVIRONMENT",
                    time: "6 MIN READ",
                    title:
                      "Why Environment Matters More Than Most Wellness Plans Realise.",
                    date: "October 2025",
                    img: "https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&h=600&fit=crop&auto=format",
                  },
                  {
                    cat: "LONGEVITY",
                    time: "7 MIN READ",
                    title:
                      "The Future of Executive Recovery. Recovery needs to be designed around real working lives.",
                    date: "October 2025",
                    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format",
                  },
                ].map(({ cat, time, title, date, img }, idx) => (
                  <motion.div
                    onClick={() => navigateTo("insights")}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigateTo("insights");
                      }
                    }}
                    initial={{
                      opacity: 0,
                      x: 60,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.75,
                      delay: idx * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.01,
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="relative min-w-[85vw] sm:min-w-[420px] lg:min-w-0 flex-1 h-[420px] sm:h-[480px] lg:h-[245px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D2D2D7] hover:border-[#0E4D3A] bg-[#141416] group cursor-pointer apple-product-card shadow-lg hover:shadow-[0_18px_40px_-10px_rgba(14,77,58,0.25)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] snap-start shrink-0"
                    key={title}
                  >
                    <div className="absolute inset-0 bg-[#0A1A14] overflow-hidden">
                      <SmartImage
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none" />

                      <div className="absolute inset-0 bg-[#0E4D3A]/0 group-hover:bg-[#0E4D3A]/10 transition-colors duration-500 pointer-events-none" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7 z-20 flex flex-col justify-end">
                      <div className="flex justify-between items-center gap-3 mb-1.5 pb-2 border-b border-white/20">
                        <span className="typography-eyebrow text-[#C6A660] font-semibold tracking-wider text-[10px] sm:text-[11px] md:text-xs truncate">
                          {cat}
                        </span>

                        <span className="typography-metadata text-white/70 tabular-nums text-[10px] sm:text-[11px] md:text-xs shrink-0">
                          {time}
                        </span>
                      </div>

                      <h3 className="typography-card-title text-white mb-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:text-[#C6A660] line-clamp-3 sm:line-clamp-2">
                        {title}
                      </h3>

                      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 pt-2 border-t border-white/15 text-[10px] sm:text-[11px] md:text-xs">
                        <span className="typography-metadata text-white/70 font-medium shrink-0">
                          {date}
                        </span>

                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white group-hover:bg-[#C6A660] group-hover:border-[#C6A660] group-hover:text-[#111111] transition-all duration-300 uppercase font-semibold text-[10px] sm:text-[11px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] whitespace-nowrap">
                          <span>Read Article</span>

                          <motion.span
                            aria-hidden="true"
                            animate={{ x: [-2, 5, -2] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="inline-flex items-center font-bold"
                          >
                            →
                          </motion.span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:hidden mt-3">
              <CarouselPillControls
                total={3}
                currentIndex={activeInsightIndex}
                onChange={scrollToInsight}
                onPrev={() =>
                  scrollToInsight(
                    activeInsightIndex === 0 ? 2 : activeInsightIndex - 1,
                  )
                }
                onNext={() =>
                  scrollToInsight(
                    activeInsightIndex === 2 ? 0 : activeInsightIndex + 1,
                  )
                }
                layout="split"
                variant="light"
                showBorder
                className="px-1"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 md:mt-16 flex justify-center">
              <button
                id="insights-explore-cta"
                onClick={() => navigateTo("insights")}
                className="darshai-btn-primary whitespace-nowrap cursor-pointer uppercase inline-flex items-center gap-2 group"
              >
                <span>EXPLORE INSIGHTS</span>

                <motion.span
                  aria-hidden="true"
                  animate={{ x: [-2, 5, -2] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center"
                >
                  →
                </motion.span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA
        variant="black"
        eyebrow="THE DARSHAI JOURNEY"
        heading={
          <>
            <span className="block">Wellness Should</span>
            <span className="block text-[#34D399] mt-1 sm:mt-2">Fit You.</span>
          </>
        }
        description="Begin with your goals. Discover the journey, programme and environment that fit."
        buttonText="BEGIN YOUR JOURNEY"
        buttonOnClick={() => {
          track("begin_journey", { source: "homepage_final_cta" });
          navigateTo("contact");
        }}
      />
    </div>
  );
}
export default HomePage;
