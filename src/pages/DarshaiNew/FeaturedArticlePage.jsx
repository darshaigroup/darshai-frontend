import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "motion/react";
import {
  ArrowRight,
  Compass,
  Clock,
  ExternalLink,
  ShieldCheck,
  Trees,
  Sun,
  Wind,
  BookOpen,
  HeartPulse,
} from "lucide-react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
export function FeaturedArticlePage({ onNavigate }) {
  // Sticky reading subnav state
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  // Audio briefing play simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  // Active Environmental Setting Tab
  const [activeSetting, setActiveSetting] = useState("coastal");
  const articleRef = useRef(null);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.title =
      "The Missing Variable in Wellness May Be Geography — Featured Article — DARSHAI";
    track("read_featured_article", {
      id: "the-missing-variable-in-wellness-may-be-geography",
    });
  }, []);
  // Audio briefing timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);
  // Scroll listener for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 440) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };
  return (
    <main
      ref={articleRef}
      className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F] font-sans selection:bg-[#0E4D3A]/20 selection:text-[#1D1D1F]"
    >
      <section
        id="article-hero"
        className="relative bg-[#0A1612] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-[#2C2C2E]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SmartImage
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=85"
            alt="The Missing Variable in Wellness May Be Geography"
            priority
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1612]/85 via-[#0A1612]/75 to-[#0A1612]/95 backdrop-blur-[2px]" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-[#0E4D3A]/20 blur-[140px] rounded-full pointer-events-none z-0" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-5 sm:mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full typography-caption font-semibold bg-[#0E4D3A]/60 text-[#34D399] border border-[#0E4D3A] shadow-md uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#34D399]" />
              <span>FEATURED ARTICLE •</span>
            </span>
          </div>
          <h1 className="typography-hero-display text-white max-w-4xl mx-auto text-center mb-6 drop-shadow-md">
            The Missing Variable in Wellness May Be Geography.
          </h1>
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 text-[#A1A1A6] typography-caption">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#86868B]" />
                <span>Estimated 5–7 min read</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34D399]/15 text-[#34D399] font-medium border border-[#34D399]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>EVIDENCE-BASED REVIEW</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-36">
              <div className="bg-white rounded-[24px] border border-[#D2D2D7] p-6 sm:p-7 shadow-xs space-y-5">
                <span className="typography-eyebrow text-[#0E4D3A]">
                  KEY ARTICLE TAKEAWAYS
                </span>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 typography-caption text-[#2C2C2E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A] mt-1.5 shrink-0" />
                    <span>
                      The setting is more than a backdrop—it shapes biological
                      adaptation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 typography-caption text-[#2C2C2E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A] mt-1.5 shrink-0" />
                    <span>
                      No single climate or landscape is universally optimal for
                      every individual.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 typography-caption text-[#2C2C2E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A] mt-1.5 shrink-0" />
                    <span>
                      Geography complements—rather than replaces—qualified
                      medical assessment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 typography-caption text-[#2C2C2E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A] mt-1.5 shrink-0" />
                    <span>
                      Structured assessment matches person, programme and
                      setting.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#111111] text-white rounded-[24px] border border-[#2C2C2E] p-6 sm:p-7 shadow-md space-y-5">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#34D399]" />
                  <p className="typography-eyebrow text-[#34D399]">
                    GEO-WELLNESS VARIABLES
                  </p>
                </div>
                <h4 className="typography-card-title text-white">
                  Environmental Conditions
                </h4>
                <div className="grid grid-cols-2 gap-3 typography-caption text-[#A1A1A6]">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <Sun className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Daylight</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <Wind className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Air Quality</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <Compass className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Terrain</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <Trees className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Green Cover</span>
                  </div>
                </div>
                <p className="typography-caption text-[#86868B] leading-relaxed pt-2 border-t border-[#2C2C2E]">
                  Evaluated across all verified retreat partners to ensure
                  clinical safety and optimal therapeutic conditions.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#111111] text-white rounded-[24px] border border-[#2C2C2E] overflow-hidden shadow-xl group cursor-pointer relative"
                onClick={() =>
                  onNavigate("/insights/series/introduction-to-geo-wellness")
                }
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#0A1612]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=85"
                    alt="Understanding Geo-Wellness Editorial Series"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#0A1612]/80 backdrop-blur-md text-[#34D399] border border-[#34D399]/30 shadow-md uppercase tracking-wider">
                      <span>EDITORIAL SERIES • 6 CHAPTERS</span>
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-[#111111] relative z-10">
                  <h4 className="typography-card-title text-white group-hover:text-[#34D399] transition-colors font-semibold">
                    Understanding Geo-Wellness
                  </h4>
                  <p className="typography-caption text-[#A1A1A6] leading-relaxed">
                    A six-part introduction to the principles behind DARSHAI’s
                    Geo-Wellness framework—exploring how personal goals,
                    wellness programmes and environmental context can come
                    together in a more considered wellness journey.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(
                        "/insights/series/introduction-to-geo-wellness",
                      );
                    }}
                    className="typography-ui-button w-full py-3 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white font-semibold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md group-hover:bg-[#13634B]"
                  >
                    <span>Explore 6-Chapter Series</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </aside>
            <article className="lg:col-span-8 space-y-6">
              <h2 className="typography-section-h2 text-[#1D1D1F] font-semibold text-2xl sm:text-3xl leading-snug">
                The setting is more than a backdrop.
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0E4D3A]/5 border border-[#0E4D3A]/20 space-y-3 shadow-2xs mb-6">
                <h4 className="typography-card-title text-sm font-bold text-[#0E4D3A] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0E4D3A]" />
                  <span>Further Reading</span>
                </h4>
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                  <a
                    href="https://www.who.int/europe/publications/i/item/9789289052498"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E4D3A] font-semibold hover:underline hover:text-[#0A382A] transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-white hover:bg-[#0E4D3A]/10 px-3.5 py-2 rounded-lg border border-[#0E4D3A]/20 shadow-2xs"
                  >
                    <span>WHO — Urban green spaces and health</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0E4D3A] shrink-0" />
                  </a>
                  <a
                    href="https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E4D3A] font-semibold hover:underline hover:text-[#0A382A] transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-white hover:bg-[#0E4D3A]/10 px-3.5 py-2 rounded-lg border border-[#0E4D3A]/20 shadow-2xs"
                  >
                    <span>WHO — Heat and health</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0E4D3A] shrink-0" />
                  </a>
                </div>
              </div>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                A wellness journey is often described through its programme: the
                practices, schedule, practitioner and duration. These are
                important elements. But the setting in which a journey takes
                place deserves consideration too.
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                Geography influences the conditions around an experience.
                Climate, temperature, humidity, air quality, daylight, noise,
                terrain and access to natural surroundings can all affect what a
                place feels like and how a person experiences time there.
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                Research on green and blue spaces has explored their
                relationship with mental health, physical activity, relaxation
                and other aspects of wellbeing. The World Health Organization
                has also highlighted the health risks associated with excessive
                heat and other environmental exposures. This evidence makes
                environmental context worth considering—but it does not mean
                that one landscape or climate is universally better for
                everyone.
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                A coastal setting, a mountain environment and a quiet green
                campus offer different conditions. Their relevance depends on
                the individual, the purpose of the journey, the programme being
                considered and any relevant health or mobility requirements.
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                This is the thinking behind Geo-Wellness: looking beyond the
                intervention alone and considering the relationship between a
                person, a programme and the place in which the experience
                unfolds.
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                For DARSHAI, the practical question is not simply, “Which
                destination looks best?” It is, “Which setting and programme are
                appropriate for this person's goals, preferences and
                requirements?”
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal">
                The answer requires structured assessment, careful matching and
                confirmation of the partner's capabilities. Geography is one
                consideration in that process—not a substitute for qualified
                professional judgement.
              </p>
              <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] pt-2 font-semibold">
                The central idea: a considered wellness journey begins by
                understanding both the person and the setting.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
export default FeaturedArticlePage;
