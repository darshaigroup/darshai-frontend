import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import SmartImage from "../SmartImage";
import { track } from "../../../lib/darshaiNew/analytics";
export default function UnifiedCentreDetailView({ centre, onNavigate }) {
  // Video player controls
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  // Sticky Apple subnav bar visibility & active section tracking
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  // Lightbox modal for full-resolution campus photography
  const [lightboxIndex, setLightboxIndex] = useState(null);
  // Hero parallax effects
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  // Track scroll position for sticky Apple subnav and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowStickyNav(scrollPos > 480);
      const sections = [
        { id: "centre-hero", name: "hero" },
        { id: "campus-media", name: "media" },
        { id: "environment", name: "environment" },
        { id: "wellness-approach", name: "wellness" },
        { id: "stay", name: "stay" },
        { id: "suitability-considerations", name: "suitability" },
        { id: "availability", name: "availability" },
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
  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < (centre.galleryImages?.length || 1) - 1
            ? prev + 1
            : 0,
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0
            ? prev - 1
            : (centre.galleryImages?.length || 1) - 1,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, centre.galleryImages]);
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };
  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleRequestRecommendation = (source) => {
    track("request_personalised_recommendation", {
      centre: centre.name,
      slug: centre.slug,
      source,
    });
    onNavigate(`contact?centre=${centre.slug}&purpose=personal`);
  };
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const galleryList =
    centre.galleryImages && centre.galleryImages.length > 0
      ? centre.galleryImages
      : [centre.heroImage, centre.image];
  // Alternating side-by-side content items with user-pasted text and photography
  const contentSections = [
    {
      id: "environment",
      stepNum: "01",
      eyebrow: "ENVIRONMENT",
      title: "Environment",
      tagline: "Natural Setting & Surroundings",
      content: centre.environmentDetail || "",
      image:
        centre.sectionImages?.environment ||
        centre.galleryImages?.[1] ||
        centre.image,
      imageAlt: `${centre.name} environment and surrounding landscape`,
      imageCaption: "Verified Campus Landscape & Setting",
    },
    {
      id: "wellness-approach",
      stepNum: "02",
      eyebrow: "WELLNESS APPROACH",
      title: "Wellness Approach",
      tagline: "Doctor-Supervised Disciplines & Therapies",
      content: centre.wellnessApproach || "",
      image:
        centre.sectionImages?.wellness ||
        centre.galleryImages?.[2] ||
        centre.image,
      imageAlt: `${centre.name} wellness approach and therapeutic practices`,
      imageCaption: "Therapeutic Spaces & Practitioner Sessions",
    },
    {
      id: "stay",
      stepNum: "03",
      eyebrow: "STAY",
      title: "Stay",
      tagline: "Residential Accommodations & Campus Amenities",
      content: centre.stayDetail || "",
      image:
        centre.sectionImages?.stay ||
        centre.galleryImages?.[3] ||
        centre.heroImage,
      imageAlt: `${centre.name} accommodation and campus stays`,
      imageCaption: "Guest Stays & Living Quarters",
    },
    {
      id: "suitability-considerations",
      stepNum: "04",
      eyebrow: "SUITABILITY CONSIDERATIONS",
      title: "Suitability Considerations",
      tagline: "Practitioner Intake & Health Review",
      content: centre.suitabilityConsiderations || "",
      image:
        centre.sectionImages?.suitability ||
        centre.galleryImages?.[4] ||
        centre.image,
      imageAlt: `${centre.name} suitability considerations and consultation`,
      imageCaption: "Individual Alignment & Practitioner Confirmation",
    },
    {
      id: "availability",
      stepNum: "05",
      eyebrow: "AVAILABILITY",
      title: "Availability",
      tagline: "Dates & Inclusions Verification",
      content: centre.availabilityNote || "",
      image:
        centre.sectionImages?.availability ||
        centre.galleryImages?.[0] ||
        centre.heroImage,
      imageAlt: `${centre.name} availability and scheduling confirmation`,
      imageCaption: "Direct Coordination Before Final Proposal",
      isAvailabilitySection: true,
    },
  ];
  // Highlights formatted for the hero section
  const highlightsItems = centre.highlightsText
    ? centre.highlightsText
        .split("•")
        .map((item) => item.trim())
        .filter(Boolean)
    : [
        "Published wellness programmes",
        "Seasonal retreats",
        "Therapies & practices",
        "Campus & stays",
        "Practitioner profiles",
      ];
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
                  onClick={() => onNavigate("centres")}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer"
                  aria-label="Back to centres list"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="truncate">
                  <span className="font-semibold text-xs sm:text-sm text-white truncate block">
                    {centre.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 hidden sm:block truncate">
                    {centre.location}
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-1 text-xs font-medium">
                {[
                  { id: "centre-hero", label: "Overview", name: "hero" },
                  { id: "campus-media", label: "Campus Media", name: "media" },
                  {
                    id: "environment",
                    label: "Environment",
                    name: "environment",
                  },
                  {
                    id: "wellness-approach",
                    label: "Wellness Approach",
                    name: "wellness",
                  },
                  { id: "stay", label: "Stay", name: "stay" },
                  {
                    id: "suitability-considerations",
                    label: "Suitability",
                    name: "suitability",
                  },
                  {
                    id: "availability",
                    label: "Availability",
                    name: "availability",
                  },
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
                onClick={() => handleRequestRecommendation("sticky_subnav")}
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
        id="centre-hero"
        ref={heroRef}
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-[#0A0D0C] text-white overflow-hidden pt-28 pb-0"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ scale: heroImageScale }}
            className="w-full h-full"
          >
            <SmartImage
              src={centre.heroImage}
              alt={centre.name}
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
            <h1 className="typography-hero-display text-white mb-4 drop-shadow-md">
              {centre.quickViewHeadline || `Meet ${centre.name}.`}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 typography-metadata text-white/90 font-medium mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{centre.location}</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/85">{centre.environmentType}</span>
            </div>
            <div className="max-w-4xl mx-auto mb-8 sm:mb-10 px-2">
              <p className="typography-lead text-white/90 leading-relaxed font-normal drop-shadow-sm">
                {centre.overview.replace(
                  new RegExp(`^Meet\\s+${centre.name}\\.?\\s*`, "i"),
                  "",
                )}
              </p>
            </div>
            <div className="mb-10 max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span className="typography-eyebrow font-semibold text-[#C6A660]">
                  PROFILE HIGHLIGHTS
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
                onClick={() => scrollToSection("campus-media")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-black/40 hover:bg-white/15 text-white border border-white/25 hover:border-white/50 backdrop-blur-md typography-ui-button font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
              >
                <span>EXPLORE FULL CENTRE PROFILE</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleRequestRecommendation("hero_cta")}
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
                onClick={() => onNavigate("home")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HOME
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onNavigate("centres")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                CENTRES
              </button>
              <span>/</span>
              <span className="flex items-center gap-1.5 text-[#34D399] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>{centre.name.toUpperCase()}</span>
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate("centres")}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL CENTRES</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("campus-media")}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <span>EXPLORE PROFILE</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#34D399]" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="campus-media"
        className="py-16 sm:py-24 border-b border-[#D2D2D7] bg-[#F5F5F7] scroll-mt-14"
      >
        <div className="darshai-container">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <p className="typography-eyebrow font-semibold text-[#0E4D3A] mb-2">
              CAMPUS & LANDSCAPE PHOTOGRAPHY
            </p>
            <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-3">
              Real campus and surrounding-landscape photography
            </h2>
            <p className="typography-lead text-[#555555] leading-relaxed">
              Authentic on-site imagery and footage capturing {centre.name}’s
              grounds, treatment spaces, and natural surroundings.
            </p>
          </div>
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-black border border-[#D2D2D7] shadow-2xl mb-8 group aspect-[16/9] max-h-[580px]">
            {!videoError && centre.videoUrl ? (
              <video
                ref={videoRef}
                src={centre.videoUrl}
                poster={centre.heroImage}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <SmartImage
                src={centre.heroImage}
                alt={`${centre.name} campus setting`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVideoPlay}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleVideoMute}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span>REAL CAMPUS FOOTAGE</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="typography-eyebrow font-semibold text-[#4A4A4A]">
                CAMPUS PHOTO GALLERY (CLICK TO EXPAND)
              </h3>
              <span className="typography-metadata text-[#777777]">
                {galleryList.length} Photographs
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {galleryList.map((img, idx) => (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-[4/3] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#D2D2D7] bg-[#18181A] shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
                  aria-label={`View photo ${idx + 1}`}
                  key={`${img}-${idx}`}
                >
                  <SmartImage
                    src={img}
                    alt={`${centre.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1 rounded-full bg-black/70 text-white backdrop-blur-xs flex items-center justify-center">
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="divide-y divide-[#D2D2D7]">
        {contentSections.map((sec, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              id={sec.id}
              className={`py-16 sm:py-24 lg:py-28 scroll-mt-20 ${index % 2 === 1 ? "bg-[#F9F9FB]" : "bg-white"}`}
              key={sec.id}
            >
              <div className="darshai-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.12] mb-3">
                      {sec.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-[#4A4A4A] font-normal leading-relaxed mb-6">
                      {sec.tagline}
                    </p>
                    <div className="mb-7">
                      <p className="text-lg sm:text-xl lg:text-[21px] text-[#1D1D1F] leading-[1.68] sm:leading-[1.72] font-normal tracking-[-0.01em]">
                        {sec.content}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="relative aspect-[4/3] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#D2D2D7] bg-[#18181A] shadow-xl group">
                      <SmartImage
                        src={sec.image}
                        alt={sec.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between">
                        <div className="px-3.5 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 text-xs font-medium flex items-center gap-2 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                          <span className="truncate">{sec.imageCaption}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <section
        id="recommendation-cta"
        className="py-20 sm:py-28 bg-[#1D1D1F] text-white border-t border-black relative overflow-hidden"
      >
        <div className="darshai-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="typography-eyebrow font-semibold text-[#C6A660] mb-3">
              YOUR GEO-WELLNESS JOURNEY
            </p>
            <h2 className="typography-section-h2 text-white tracking-tight mb-4">
              Explore {centre.name} With DARSHAI.
            </h2>
            <p className="typography-lead text-white/72 leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
              Our clinical and environmental coordinators evaluate your wellness
              objectives, verify date availability directly with the centre’s
              practitioners, and prepare an itemised proposal.
            </p>
            <button
              type="button"
              onClick={() => handleRequestRecommendation("final_centre_cta")}
              className="px-8 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#34D399] hover:text-[#1D1D1F] text-white typography-ui-button font-semibold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer shadow-xl shadow-black/40 group border border-emerald-500/30"
            >
              <span>REQUEST A PERSONALISED RECOMMENDATION</span>
              <span className="group-hover:translate-x-1 transition-transform font-bold">
                →
              </span>
            </button>
            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-white/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Direct Centre Verification</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>No Hidden Charges</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20 focus-visible:outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : galleryList.length - 1,
                )
              }
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < galleryList.length - 1 ? prev + 1 : 0,
                )
              }
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="rounded-[20px] overflow-hidden max-h-[75vh] border border-white/15 shadow-2xl"
                key={lightboxIndex}
              >
                <img
                  src={galleryList[lightboxIndex]}
                  alt={`${centre.name} photo ${lightboxIndex + 1}`}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </motion.div>
              <div className="mt-4 flex items-center justify-between w-full max-w-2xl text-xs font-mono text-white/70">
                <span>{centre.name} — Verified Campus Photography</span>
                <span className="text-[#34D399] font-bold">
                  {lightboxIndex + 1} / {galleryList.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
