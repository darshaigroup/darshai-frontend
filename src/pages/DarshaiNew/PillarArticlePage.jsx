import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Compass,
  CheckCircle2,
} from "lucide-react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import { PILLAR_ARTICLES } from "../../data/darshaiNew/pillarArticlesData";
import { track } from "../../lib/darshaiNew/analytics";
export function PillarArticlePage({ onNavigate }) {
  const { articleSlug } = useParams();
  // Find article by id or pillarId match
  const article =
    PILLAR_ARTICLES.find(
      (a) =>
        a.id === articleSlug ||
        a.pillarId.toLowerCase().replace(/\s+/g, "-") ===
          articleSlug?.toLowerCase(),
    ) || PILLAR_ARTICLES[0];
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.title = `${article.title} — DARSHAI Insights`;
    track("read_article_card", { id: article.id, category: article.category });
  }, [article]);
  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F] font-sans selection:bg-[#0E4D3A]/20 selection:text-[#1D1D1F]">
      <header className="bg-[#0A1612] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-[#2C2C2E] relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SmartImage
            src={article.image}
            alt={article.title}
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
              <span>{article.eyebrow}</span>
            </span>
          </div>
          <h1 className="typography-hero-display text-white max-w-4xl mx-auto text-center mb-6 drop-shadow-md">
            {article.title}
          </h1>
          <p className="typography-lead text-[#34D399] font-medium text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-center">
            {article.subtitle}
          </p>
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 text-[#A1A1A6] typography-caption">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="font-semibold text-white uppercase">
                {article.category}
              </span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34D399]/15 text-[#34D399] font-medium border border-[#34D399]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EDITORIAL FRAMEWORK</span>
            </div>
          </div>
        </div>
      </header>
      <section className="py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-36">
              <div className="bg-white rounded-[24px] border border-[#D2D2D7] p-6 shadow-xs space-y-5">
                <span className="typography-eyebrow text-[#0E4D3A]">
                  KNOWLEDGE PILLARS INDEX
                </span>
                <div className="space-y-2">
                  {PILLAR_ARTICLES.map((item) => {
                    const isCurrent = item.id === article.id;
                    return (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate(`/insights/pillar/${item.id}`)
                        }
                        className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between border cursor-pointer ${
                          isCurrent
                            ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-xs"
                            : "bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] border-transparent"
                        }`}
                        key={item.id}
                      >
                        <div className="min-w-0 pr-2">
                          <span
                            className={`typography-caption font-semibold block ${isCurrent ? "text-[#34D399]" : "text-[#0E4D3A]"}`}
                          >
                            {item.pillarNumber} • {item.category}
                          </span>
                          <span className="typography-body-bold text-xs truncate block mt-0.5">
                            {item.title}
                          </span>
                        </div>
                        {isCurrent && (
                          <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
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
              <button
                type="button"
                onClick={() => onNavigate("/insights")}
                className="w-full py-3 px-5 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] font-semibold typography-ui-button transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-[#0E4D3A]" />
                <span>Back to All Insights</span>
              </button>
            </aside>
            <article className="lg:col-span-8 space-y-7">
              {article.paragraphs.map((p, idx) => (
                <p
                  className="text-[19px] sm:text-[20px] text-[#1D1D1F] leading-[1.7] font-normal"
                  key={idx}
                >
                  {p}
                </p>
              ))}
              {article.furtherReading && (
                <div className="mt-10 p-6 rounded-[20px] bg-white border border-[#D2D2D7] shadow-xs flex items-center gap-3.5">
                  <BookOpen className="w-5 h-5 text-[#0E4D3A] shrink-0" />
                  <div>
                    <span className="typography-caption font-semibold text-[#0E4D3A] block uppercase tracking-wider">
                      FURTHER READING
                    </span>
                    <p className="typography-body-bold text-[#1D1D1F] mt-0.5">
                      {article.furtherReading}
                    </p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
