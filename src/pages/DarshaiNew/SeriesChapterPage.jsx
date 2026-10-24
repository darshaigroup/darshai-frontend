import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScroll } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Activity,
  Trees,
  Sliders,
  Sparkles,
  Clock,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import {
  SERIES_CHAPTERS,
  getChapterBySlug,
} from "../../data/darshaiNew/seriesChaptersData";
import { track } from "../../lib/darshaiNew/analytics";
const CHAPTER_ICONS = {
  "01": BookOpen,
  "02": Activity,
  "03": Compass,
  "04": Trees,
  "05": Sliders,
  "06": Sparkles,
};
export function SeriesChapterPage({ onNavigate }) {
  const { chapterSlug } = useParams();
  const navigate = useNavigate();
  // Find matching chapter or fallback to chapter 1
  const chapter =
    (chapterSlug && getChapterBySlug(chapterSlug)) || SERIES_CHAPTERS[0];
  const currentIndex = SERIES_CHAPTERS.findIndex((c) => c.id === chapter.id);
  const prevChapter =
    currentIndex > 0 ? SERIES_CHAPTERS[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < SERIES_CHAPTERS.length - 1
      ? SERIES_CHAPTERS[currentIndex + 1]
      : null;
  // Active Interactive Tenet Tab
  const [activeTenetIndex, setActiveTenetIndex] = useState(0);
  // Audio briefing play simulation state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  // Share link copied toast
  const [copiedLink, setCopiedLink] = useState(false);
  // Font size state: "normal" | "large"
  const [fontSize, setFontSize] = useState("normal");
  // Sticky subheader visibility
  const [showStickyNav, setShowStickyNav] = useState(false);
  // Scroll tracking for reading progress
  const articleRef = useRef(null);
  const { scrollYProgress } = useScroll();
  // Active Section Index for On This Page card highlight
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  // Scroll spy to track active section heading as user scrolls
  useEffect(() => {
    setActiveSectionIndex(0);
    const handleScrollSpy = () => {
      const sectionElements = chapter.articleSections.map((_, idx) =>
        document.getElementById(`section-${idx}`),
      );
      const scrollPosition = window.scrollY + 160;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionIndex(i);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [chapter.id, chapter.articleSections]);
  useEffect(() => {
    // Reset state on chapter change
    setActiveTenetIndex(0);
    setIsPlayingAudio(false);
    setAudioProgress(0);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Track analytics event
    track("view_series_chapter", {
      step: chapter.step,
      title: chapter.title,
      category: chapter.category,
    });
    // Update document title
    document.title = `Chapter ${chapter.step}: ${chapter.title} — Geo-Wellness Series — DARSHAI`;
  }, [chapter.id]);
  // Audio simulation timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1.25;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);
  // Handle sticky nav visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
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
  const goToChapter = (targetChapter) => {
    onNavigate(`/insights/series/${targetChapter.id}`);
  };
  const IconComponent = CHAPTER_ICONS[chapter.step] || BookOpen;
  return (
    <main
      ref={articleRef}
      className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F] font-sans selection:bg-[#0E4D3A]/20 selection:text-[#1D1D1F]"
    >
      <section
        id="chapter-hero"
        className="relative bg-[#0A1612] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-[#2C2C2E]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SmartImage
            src={chapter.heroImage}
            alt={chapter.title}
            priority
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1612]/85 via-[#0A1612]/75 to-[#0A1612]/95 backdrop-blur-[2px]" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-[#0E4D3A]/20 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full typography-caption font-semibold bg-[#0E4D3A]/60 text-[#34D399] border border-[#0E4D3A] shadow-md uppercase tracking-wider">
              <IconComponent className="w-4 h-4 text-[#34D399]" />
              <span>
                CHAPTER {chapter.step} • {chapter.category}
              </span>
            </span>
          </div>
          <h1 className="typography-hero-display text-white max-w-4xl mx-auto text-center mb-6 drop-shadow-md">
            {chapter.title}
          </h1>
          <p className="typography-lead text-[#D2D2D7] max-w-3xl mx-auto text-center mb-8 leading-relaxed">
            {chapter.desc}
          </p>
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 text-[#A1A1A6] typography-caption">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#86868B]" />
                <span>
                  Estimated {chapter.readTime.replace(/MIN READ/i, "min read")}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>EVIDENCE-BASED REVIEW</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
              <div className="bg-white rounded-[24px] border border-[#D2D2D7] p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0E4D3A] pb-3 border-b border-[#E5E5EA]">
                  <BookOpen className="w-4 h-4 text-[#0E4D3A]" />
                  <span className="typography-eyebrow text-[#0E4D3A] font-semibold tracking-wider uppercase">
                    ON THIS PAGE
                  </span>
                </div>
                <nav
                  className="space-y-1.5"
                  aria-label="Page Sections Navigation"
                >
                  {chapter.articleSections.map((sec, sIdx) => {
                    const isActive = activeSectionIndex === sIdx;
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSectionIndex(sIdx);
                          const el = document.getElementById(`section-${sIdx}`);
                          if (el) {
                            const yOffset = -120;
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset +
                              yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                          isActive
                            ? "bg-[#0E4D3A] text-white shadow-xs font-semibold"
                            : "hover:bg-[#F5F5F7] text-[#1D1D1F] hover:text-[#0E4D3A]"
                        }`}
                        key={sIdx}
                      >
                        <span
                          className={`typography-body-bold text-xs leading-snug transition-colors ${isActive ? "text-white font-semibold" : "group-hover:text-[#0E4D3A]"}`}
                        >
                          {sec.title.replace(/^\d+\.\s*/, "")}
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-all shrink-0 ml-2 ${
                            isActive
                              ? "text-[#34D399] translate-x-0.5"
                              : "text-[#86868B] group-hover:text-[#0E4D3A] group-hover:translate-x-0.5"
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("/insights")}
                className="w-full py-3 px-5 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] font-semibold typography-ui-button transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-[#0E4D3A]" />
                <span>Back to All Insights</span>
              </button>
            </aside>
            <article className="lg:col-span-8 space-y-12">
              <div className="space-y-10">
                {chapter.articleSections.map((sec, sIdx) => (
                  <div
                    id={`section-${sIdx}`}
                    className="space-y-5 scroll-mt-32"
                    key={sIdx}
                  >
                    <h2 className="typography-section-h2 text-[#1D1D1F]">
                      {sec.title}
                    </h2>
                    {sec.callout && (
                      <div className="my-6 p-6 sm:p-8 rounded-[20px] bg-[#F5F5F7] border-l-4 border-[#0E4D3A] border-t border-r border-b border-[#D2D2D7]">
                        <p className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-medium italic">
                          “{sec.callout}”
                        </p>
                      </div>
                    )}
                    <div className="space-y-4">
                      {sec.content.map((para, pIdx) => (
                        <p
                          className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal"
                          key={pIdx}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-5 pt-12 border-t border-[#D2D2D7]">
                  {prevChapter ? (
                    <button
                      type="button"
                      onClick={() => goToChapter(prevChapter)}
                      className="flex-1 p-6 sm:p-7 rounded-[28px] border-2 border-[#D2D2D7] bg-white hover:bg-[#0E4D3A] hover:border-[#0E4D3A] transition-all duration-300 ease-out text-left flex flex-col gap-3 cursor-pointer shadow-xs hover:shadow-xl active:scale-[0.98] group"
                    >
                      <div>
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] group-hover:bg-white/20 group-hover:text-white transition-colors">
                          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                          <span>PREVIOUS CHAPTER</span>
                        </span>
                      </div>
                      <p className="typography-card-title text-[#1D1D1F] group-hover:text-white transition-colors font-bold text-lg sm:text-xl leading-snug">
                        {prevChapter.title}
                      </p>
                    </button>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextChapter ? (
                    <button
                      type="button"
                      onClick={() => goToChapter(nextChapter)}
                      className="flex-1 p-6 sm:p-7 rounded-[28px] border-2 border-[#D2D2D7] bg-white hover:bg-[#0E4D3A] hover:border-[#0E4D3A] transition-all duration-300 ease-out text-right flex flex-col items-end gap-3 cursor-pointer shadow-xs hover:shadow-xl active:scale-[0.98] group"
                    >
                      <div>
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0E4D3A]/10 text-[#0E4D3A] group-hover:bg-white/20 group-hover:text-white transition-colors">
                          <span>NEXT CHAPTER</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                      <p className="typography-card-title text-[#1D1D1F] group-hover:text-white transition-colors font-bold text-lg sm:text-xl leading-snug">
                        {nextChapter.title}
                      </p>
                    </button>
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>
                {chapter.furtherReadingLinks &&
                  chapter.furtherReadingLinks.length > 0 && (
                    <div className="pt-6 border-t border-[#E5E5EA] mt-8 space-y-3">
                      <h4 className="typography-card-title text-xs font-extrabold text-[#1D1D1F] uppercase tracking-widest">
                        FURTHER READING
                      </h4>
                      <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                        {chapter.furtherReadingLinks.map((item, idx) => (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0E4D3A] font-semibold hover:text-white transition-all duration-200 inline-flex items-center gap-2 cursor-pointer bg-[#F5F5F7] hover:bg-[#0E4D3A] px-4 py-2.5 rounded-full border border-[#D2D2D7] hover:border-[#0E4D3A] shadow-2xs hover:shadow-md group"
                            key={idx}
                          >
                            <span>{item.label}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#0E4D3A] group-hover:text-white shrink-0 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
export default SeriesChapterPage;
