import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  X,
  ClipboardCheck,
  GitFork,
  Building2,
  Compass,
  ShieldCheck,
  HeartHandshake,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Sliders,
} from "lucide-react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import Reveal from "../../components/darshaiNew/Reveal";
import SignalBadge from "../../components/darshaiNew/SignalBadge";
import useCursorHighlight from "../../components/darshaiNew/useCursorHighlight";
import { track } from "../../lib/darshaiNew/analytics";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
import JourneyExamplesSection from "../../components/darshaiNew/JourneyExamplesSection";
import TrustVerificationSection from "../../components/darshaiNew/TrustVerificationSection";
import { CENTRES_DATA } from "../../data/darshaiNew/centresData";
function CentreCard({ centre, index, onNavigate, onOpenQuickView }) {
  const {
    ref: imageRef,
    onPointerMove,
    onPointerLeave,
    coords,
    shouldShow,
  } = useCursorHighlight();
  // Map CentreDetail to CentreProfile for quick view drawer
  const centreProfile = {
    slug: centre.slug,
    name: centre.name,
    location: centre.location,
    environmentType: centre.environmentType,
    environmentSlug: centre.environmentSlug,
    description: centre.description,
    focusAreas: centre.focusAreas,
    suitableFor: centre.suitableFor,
    durations: centre.durations,
    clinicalHighlights: centre.clinicalHighlights,
    image: centre.image,
    quickViewHeadline: centre.quickViewHeadline,
    overview: centre.overview,
    highlightsText: centre.highlightsText,
  };
  const handleOpenQuickView = (e) => {
    e.stopPropagation();
    track("explore_centre", { centre: centre.name, slug: centre.slug });
    onOpenQuickView(centreProfile);
  };
  const handleFullProfileClick = () => {
    track("view_centre_profile", { centre: centre.name, slug: centre.slug });
    onNavigate(`centres/${centre.slug}`);
  };
  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={handleFullProfileClick}
        className="relative bg-[#18181B] rounded-[24px] sm:rounded-[28px] border border-white/15 overflow-hidden flex flex-col justify-end h-full aspect-[4/5] shadow-xl cursor-pointer"
        title={`Click to view ${centre.name} profile`}
      >
        <div
          ref={imageRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <SmartImage
            src={centre.image}
            alt={`${centre.name} Campus`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 pointer-events-none" />
          {shouldShow && (
            <div
              className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
              style={{
                background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(52, 211, 153, 0.15), transparent 70%)`,
              }}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-end h-full text-left">
          <div className="mt-auto space-y-3">
            <div>
              <span className="text-xs font-mono text-[#34D399] tracking-wider uppercase block mb-1">
                {centre.location}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {centre.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
              {centre.tagline || centre.description}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullProfileClick();
                }}
                className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#34D399] hover:bg-[#2bb281] px-5 py-2.5 rounded-full cursor-pointer transition-colors shadow-lg"
                aria-label={`Explore sanctuary: ${centre.name}`}
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
export function CentresPage({ onNavigate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawEnv = searchParams.get("environment")?.toLowerCase();
  const normalizeSlug = (slug) => {
    if (!slug) return "all";
    if (slug === "coast" || slug === "coastal") return "coastal";
    if (slug === "mountain") return "mountain";
    if (slug === "forest") return "forest";
    if (slug === "heritage") return "heritage";
    if (slug === "urban-nature" || slug === "urban_nature" || slug === "urban")
      return "urban-nature";
    return "all";
  };
  const selectedEnv = normalizeSlug(rawEnv);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const filterOptions = [
    { id: "all", label: "All Environments", slug: "all" },
    { id: "coastal", label: "Coastal", slug: "coastal" },
    { id: "mountain", label: "Mountain", slug: "mountain" },
    { id: "forest", label: "Forest", slug: "forest" },
    { id: "heritage", label: "Heritage", slug: "heritage" },
    { id: "urban-nature", label: "Urban-Nature", slug: "urban-nature" },
  ];
  // Curated Partners Carousel State & Ref
  const [partnerCarouselIndex, setPartnerCarouselIndex] = useState(0);
  const partnerScrollRef = useRef(null);
  // Journey Examples Carousel State & Ref
  const [exampleMobileIndex, setExampleMobileIndex] = useState(0);
  const exampleScrollRef = useRef(null);
  // Reset carousel index when filter changes
  useEffect(() => {
    setPartnerCarouselIndex(0);
    if (partnerScrollRef.current) {
      partnerScrollRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [selectedEnv]);
  // Active Environment Index for Sticky Image + Changing Sequential Metadata Showcase
  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  // Hero Scroll Exit & Initial Load Setup
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
  // Single photograph movement during scroll: scale 1.00 -> 1.06
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.0, 1.06]);
  // Content fades out during scroll as user leaves hero
  const heroContentOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const heroContentY = useTransform(heroScroll, [0, 0.65], [0, -20]);
  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const curatedPartners = Object.values(CENTRES_DATA);
  const [expandedAttribute, setExpandedAttribute] = useState("climate");
  const environmentTypes = [
    {
      id: "coastal",
      type: "COASTAL",
      badge: "COASTAL",
      image:
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=1200&h=900&fit=crop&auto=format",
      summary:
        "Open horizons, coastal air and sea-adjacent landscapes. Local conditions and access vary by destination.",
      attributes: [
        {
          id: "climate",
          label: "Climate profile",
          content: "Coastal humidity, rainfall and temperature vary by season.",
        },
        {
          id: "terrain",
          label: "Terrain",
          content:
            "Shoreline, landscaped grounds or uneven natural surfaces may be present.",
        },
        {
          id: "character",
          label: "Environmental character",
          content: "Open views and water-adjacent settings where verified.",
        },
        {
          id: "compatibility",
          label: "Programme compatibility",
          content:
            "Compare the actual centre’s offering, availability and individual requirements; no therapeutic outcome is implied.",
        },
      ],
    },
    {
      id: "mountain",
      type: "MOUNTAIN",
      badge: "MOUNTAIN",
      image:
        "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&h=900&fit=crop&auto=format",
      summary:
        "Elevated landscapes, changing temperatures and broad terrain. Consider altitude, access, mobility and season.",
      attributes: [
        {
          id: "climate",
          label: "Climate profile",
          content: "Conditions vary with elevation and season.",
        },
        {
          id: "terrain",
          label: "Terrain",
          content:
            "Slopes, steps and uneven paths must be confirmed for each property.",
        },
        {
          id: "character",
          label: "Environmental character",
          content: "Hill or mountain views only where true of the location.",
        },
        {
          id: "compatibility",
          label: "Programme compatibility",
          content:
            "Assess transport access, physical requirements, available programmes and professional guidance.",
        },
      ],
    },
    {
      id: "forest",
      type: "FOREST",
      badge: "FOREST",
      image:
        "https://images.unsplash.com/photo-1476820865390-c52abebb3478?w=1200&h=900&fit=crop&auto=format",
      summary:
        "Tree-rich landscapes, shaded grounds and nature-focused surroundings.",
      attributes: [
        {
          id: "climate",
          label: "Climate profile",
          content: "Local rainfall, humidity and temperature vary by location.",
        },
        {
          id: "terrain",
          label: "Terrain",
          content:
            "Natural paths, gardens or uneven surfaces must be verified.",
        },
        {
          id: "character",
          label: "Environmental character",
          content:
            "Tree cover and natural campus features that are genuinely present.",
        },
        {
          id: "compatibility",
          label: "Programme compatibility",
          content:
            "Based on the actual centre and its available programmes, not an assumed benefit of forest settings.",
        },
      ],
    },
    {
      id: "heritage",
      type: "HERITAGE",
      badge: "HERITAGE",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=900&fit=crop&auto=format",
      summary:
        "Culturally rooted settings, local architecture and place-based atmosphere.",
      attributes: [
        {
          id: "climate",
          label: "Climate profile",
          content: "Describe local seasonality only where useful and accurate.",
        },
        {
          id: "terrain",
          label: "Terrain",
          content: "Reflect actual access and campus layout.",
        },
        {
          id: "character",
          label: "Environmental character",
          content:
            "Display verified heritage, cultural or architectural features.",
        },
        {
          id: "compatibility",
          label: "Programme compatibility",
          content:
            "Explain the centre’s real offerings and any travel or access considerations.",
        },
      ],
    },
    {
      id: "urban-nature",
      type: "URBAN-NATURE",
      badge: "URBAN-NATURE",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&auto=format",
      summary:
        "Contemporary biophilic sanctuaries providing seamless transitions between city accessibility and protected botanical sanctuaries.",
      attributes: [
        {
          id: "climate",
          label: "Climate profile",
          content:
            "Describe local conditions without implying medical effects.",
        },
        {
          id: "terrain",
          label: "Terrain",
          content: "Reflect the actual campus, paths and access.",
        },
        {
          id: "character",
          label: "Environmental character",
          content:
            "Verified gardens or landscaped spaces plus the surrounding location.",
        },
        {
          id: "compatibility",
          label: "Programme compatibility",
          content:
            "Consider access, available facilities, programme needs and the client’s preferences.",
        },
      ],
    },
  ];
  const [selectedStandard, setSelectedStandard] = useState(null);
  const PARTNER_STANDARDS = [
    {
      id: "programme-capability",
      category: "CAPABILITY",
      title: "Programme Capability",
      teaser: "Targeted capability for the programmes offered",
      description:
        "DARSHAI evaluates whether a centre possesses the specialized expertise, equipment, therapeutic protocols, and qualified practitioners required to deliver specific wellness programmes effectively.",
      icon: Sliders,
      keyPoints: [
        "Specialized treatment domain experience and therapeutic track record",
        "Practitioner qualifications, clinical certifications and Vaidya lineage",
        "Dedicated therapeutic infrastructure and specialized treatment facilities",
      ],
    },
    {
      id: "clinical-alignment",
      category: "CLINICAL",
      title: "Clinical Alignment",
      teaser: "Alignment with the intended wellness framework",
      description:
        "DARSHAI reviews whether the centre's clinical philosophy and therapeutic practices align strictly with the intended wellness framework, ensuring evidence-based, authentic, and safe protocols.",
      icon: ShieldCheck,
      keyPoints: [
        "Adherence to authentic medical and classical Ayurvedic frameworks",
        "Structured intake, diagnostic evaluation, and medical screening procedures",
        "Documented progress tracking and guest safety protocols throughout the stay",
      ],
    },
    {
      id: "environment-quality",
      category: "ENVIRONMENT",
      title: "Environment Quality",
      teaser: "Quality and suitability of the surrounding environment",
      description:
        "DARSHAI assesses the local microclimate, ambient acoustic levels, air purity, natural canopy cover, and surrounding geography to ensure the setting actively supports the recovery process.",
      icon: Compass,
      keyPoints: [
        "Favorable microclimate metrics, air purity, and high negative ion density",
        "Low ambient acoustic threshold (<35 dB) for deep autonomic nervous system recovery",
        "Biophilic sanctuary integration, natural seclusion, and restorative surrounding landscapes",
      ],
    },
    {
      id: "operational-standards",
      category: "OPERATIONS",
      title: "Operational Standards",
      teaser: "Service, safety and operating readiness",
      description:
        "DARSHAI inspects day-to-day hospitality standards, hygiene compliance, guest privacy, safety infrastructure, and team operating readiness to guarantee a seamless, high-touch experience.",
      icon: UserCheck,
      keyPoints: [
        "Strict hygiene, sanctuary maintenance, and organic dining benchmarks",
        "Guest privacy, executive discretion, and peaceful sanctuary atmosphere",
        "On-site emergency management procedures and 24/7 dedicated support staff",
      ],
    },
  ];
  const handleFilterChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === "all") {
      newParams.delete("environment");
    } else {
      newParams.set("environment", slug);
    }
    setSearchParams(newParams, { replace: true });
    track("filter_environment", { environment: slug });
  };
  const handleResetFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("environment");
    setSearchParams(newParams, { replace: true });
    track("filter_environment", { environment: "all" });
  };
  const filteredCentres = curatedPartners;
  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <section
        ref={heroRef}
        id="centres-hero"
        className="relative min-h-[100svh] h-[100svh] w-full flex items-center justify-center overflow-hidden text-center bg-[#1D1D1F]"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ scale: heroImgScale }}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full will-change-transform"
          >
            <SmartImage
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=2000&h=1400&fit=crop&auto=format"
              alt="Curated Geo-Wellness environmental sanctuary"
              priority
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 darshai-container w-full"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-4 sm:mb-6 flex justify-center"
            >
              <span
                id="centres-hero-eyebrow"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C6A660] typography-eyebrow font-semibold tracking-[0.25em] uppercase shadow-lg"
              >
                CURATED GEO-WELLNESS ENVIRONMENTS
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1
                id="centres-hero-heading"
                className="typography-hero-display font-semibold text-white leading-[1.05] tracking-tight mb-6 mx-auto text-center"
              >
                <span className="text-white">The Right Environment.</span>
                <br />
                <span className="text-[#34D399]">For The Right Journey.</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p
                id="centres-hero-supporting-copy"
                className="typography-lead text-white/72 max-w-[740px] leading-relaxed mb-10 mx-auto text-center font-normal"
              >
                Wellness journeys are shaped not only by what you do, but by
                where you do it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex items-center justify-center mx-auto">
                <button
                  type="button"
                  id="centres-hero-cta"
                  onClick={() => {
                    track("explore_curated_centres", {
                      source: "centres_hero",
                    });
                    const el =
                      document.getElementById("environment-types") ||
                      document.getElementById("curated-partners");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="darshai-btn-primary uppercase whitespace-nowrap cursor-pointer inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1D1F]"
                >
                  <span>Discover Environments</span>
                  <span
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: heroContentOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="absolute bottom-6 inset-x-0 flex justify-center z-10 pointer-events-none"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
            <span>SCROLL</span>
            <span className="text-[#34D399] animate-bounce">↓</span>
          </div>
        </motion.div>
      </section>
      <section
        id="environment-types"
        className="section-editorial bg-[#1D1D1F] border-b border-white/10 py-20 md:py-28 text-white scroll-mt-12"
      >
        <div className="darshai-container">
          <Reveal>
            <div className="max-w-3xl mb-8 md:mb-12">
              <p className="typography-eyebrow text-[#C6A660] mb-3">
                ENVIRONMENT TYPES
              </p>
              <h2 className="typography-section-h2 font-semibold text-white leading-[1.08] tracking-tight mb-3">
                Different environments.
                <br className="hidden sm:inline" /> Different possibilities.
              </h2>
              <p className="typography-lead text-white/80 leading-relaxed font-normal">
                Select an environment to inspect its climate profile, terrain,
                environmental character, and programme compatibility.
              </p>
            </div>
            <div className="flex items-center justify-start overflow-x-auto pb-4 pt-1 mb-10 scrollbar-none">
              <div className="bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center gap-1">
                {environmentTypes.map((env, idx) => {
                  const isActive = activeEnvIndex === idx;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveEnvIndex(idx);
                        track("filter_environment", { environment: env.type });
                      }}
                      className={`relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] ${
                        isActive
                          ? "bg-white text-[#1D1D1F] font-bold shadow-lg scale-[1.02]"
                          : "text-white/65 hover:text-white hover:bg-white/5"
                      }`}
                      key={env.id}
                    >
                      <span>{env.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="hidden lg:block lg:col-span-7 lg:sticky lg:top-28">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] rounded-[28px] overflow-hidden border border-white/15 shadow-2xl bg-[#111112] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 pointer-events-none z-10" />
                  <AnimatePresence mode="wait">
                    {(() => {
                      const currentEnv = environmentTypes[activeEnvIndex];
                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 1.06 }}
                          animate={{ opacity: 1, scale: 1.0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="w-full h-full"
                          key={currentEnv.id}
                        >
                          <SmartImage
                            src={currentEnv.image}
                            alt={currentEnv.type}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                  <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between z-20">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold tracking-widest text-[#34D399] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                      {environmentTypes[activeEnvIndex].type} SANCTUARY
                    </span>
                    <span className="text-xs text-white/50 font-mono tracking-widest uppercase bg-black/50 px-3 py-1.5 rounded-full border border-white/10 hidden sm:inline-block">
                      SANCTUARY STAGE
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between w-full">
                <AnimatePresence mode="wait">
                  {(() => {
                    const currentEnv = environmentTypes[activeEnvIndex];
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="p-5 sm:p-7 lg:p-9 rounded-[28px] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[460px] overflow-hidden"
                        key={currentEnv.id}
                      >
                        <div>
                          <div className="block lg:hidden relative aspect-[16/10] w-full rounded-[20px] overflow-hidden border border-white/15 bg-[#111112] shadow-lg mb-5 sm:mb-6">
                            <SmartImage
                              src={currentEnv.image}
                              alt={currentEnv.type}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white flex items-center justify-between z-10">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-semibold tracking-wider text-[#34D399] uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                                {currentEnv.type} SANCTUARY
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                            <span className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-widest">
                              ENVIRONMENT PROFILE
                            </span>
                            <span className="text-xs font-mono font-bold text-[#C6A660] tracking-widest tabular-nums">
                              0{activeEnvIndex + 1} / 05
                            </span>
                          </div>
                          <h3 className="typography-h3 font-semibold text-white mb-3 tracking-tight uppercase">
                            {currentEnv.type}
                          </h3>
                          <p className="typography-body text-white/80 font-normal mb-6">
                            {currentEnv.summary}
                          </p>
                          <div className="pt-2 border-t border-white/10 space-y-1">
                            {currentEnv.attributes.map((attr) => {
                              const isExpanded = expandedAttribute === attr.id;
                              return (
                                <div
                                  className="border-b border-white/10 last:border-b-0"
                                  key={attr.id}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedAttribute(
                                        isExpanded ? "" : attr.id,
                                      )
                                    }
                                    className="w-full py-3.5 flex items-center justify-between text-left group cursor-pointer focus-visible:outline-none"
                                  >
                                    <span
                                      className={`text-sm sm:text-base font-semibold transition-colors ${isExpanded ? "text-[#34D399]" : "text-white/90 group-hover:text-white"}`}
                                    >
                                      {attr.label}
                                    </span>
                                    <span
                                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-mono transition-all duration-300 ${isExpanded ? "bg-[#34D399] text-[#1D1D1F] font-bold" : "bg-white/10 text-white/70 group-hover:bg-white/20"}`}
                                    >
                                      {isExpanded ? "−" : "+"}
                                    </span>
                                  </button>
                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="overflow-hidden pb-4"
                                      >
                                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal bg-white/5 p-3.5 rounded-[12px] border border-white/10">
                                          {attr.content}
                                        </p>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                          <button
                            type="button"
                            onClick={() => {
                              track("start_assessment_centres_cta", {
                                source: "environment_types_card",
                              });
                              navigateTo("contact");
                            }}
                            className="w-full py-3.5 px-6 rounded-full bg-[#0E4D3A] hover:bg-[#093527] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-[#0E4D3A]/20 border border-emerald-500/20"
                          >
                            <span>BEGIN YOUR JOURNEY</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                          <div className="flex items-center justify-between pt-1">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveEnvIndex(
                                  (prev) =>
                                    (prev - 1 + environmentTypes.length) %
                                    environmentTypes.length,
                                )
                              }
                              className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                              <span>Previous</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveEnvIndex(
                                  (prev) =>
                                    (prev + 1) % environmentTypes.length,
                                )
                              }
                              className="text-xs font-semibold uppercase tracking-wider text-[#34D399] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Next Environment</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <JourneyExamplesSection id="journey-examples" onNavigate={navigateTo} />
      <section
        id="curated-partners"
        className="section-story border-b border-[#D2D2D7] py-20 md:py-28 bg-[#F5F5F7] scroll-mt-12"
      >
        <div className="darshai-container">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                CURATED PARTNERS
              </p>
              <h2 className="typography-section-h2 font-semibold text-[#1D1D1F] leading-[1.08] tracking-tight mb-4">
                Matched With Wellness Centres for Your Journey.
              </h2>
              <p className="typography-lead text-[#48484A] leading-relaxed font-normal">
                Programmes are delivered by partner wellness centres. DARSHAI
                helps you explore centre environments and programme information
                that may align with your goals and preferences.
              </p>
            </div>
          </Reveal>
          <AnimatePresence mode="popLayout">
            {filteredCentres.length > 0 ? (
              <div className="space-y-8">
                <motion.div
                  ref={partnerScrollRef}
                  onScroll={() => {
                    if (!partnerScrollRef.current) return;
                    const container = partnerScrollRef.current;
                    const cards = Array.from(container.children);
                    if (!cards.length) return;
                    const scrollCenter =
                      container.scrollLeft + container.clientWidth / 2;
                    let closestIndex = 0;
                    let minDistance = Infinity;
                    cards.forEach((card, idx) => {
                      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                      const distance = Math.abs(scrollCenter - cardCenter);
                      if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = idx;
                      }
                    });
                    setPartnerCarouselIndex(closestIndex);
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 pt-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none no-scrollbar touch-pan-x scroll-smooth items-stretch"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  key={`grid-${selectedEnv}`}
                >
                  {filteredCentres.map((centre, index) => (
                    <div
                      className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-auto"
                      key={centre.name}
                    >
                      <CentreCard
                        centre={centre}
                        index={index}
                        onNavigate={navigateTo}
                        onOpenQuickView={(c) => setSelectedCentre(c)}
                      />
                    </div>
                  ))}
                </motion.div>
                {filteredCentres.length > 1 && (
                  <div className="w-full pt-6 border-t border-[#D2D2D7]/60 flex items-center justify-between">
                    <div className="hidden sm:block w-24 shrink-0" />
                    <div className="flex-1 flex justify-center items-center gap-2 sm:gap-2.5 py-1.5 flex-wrap">
                      {filteredCentres.map((centre, idx) => {
                        const isSelected = partnerCarouselIndex === idx;
                        return (
                          <button
                            type="button"
                            onClick={() => {
                              setPartnerCarouselIndex(idx);
                              if (partnerScrollRef.current) {
                                const container = partnerScrollRef.current;
                                const cards = Array.from(container.children);
                                if (cards[idx]) {
                                  cards[idx].scrollIntoView({
                                    behavior: "smooth",
                                    inline: "center",
                                    block: "nearest",
                                  });
                                }
                              }
                            }}
                            aria-label={`Select sanctuary card ${idx + 1}`}
                            className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center py-1 px-0.5"
                            key={centre.name}
                          >
                            <div
                              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isSelected
                                  ? "w-8 sm:w-11 bg-[#0E4D3A] shadow-xs"
                                  : "w-3.5 sm:w-4 bg-[#1D1D1F]/25 hover:bg-[#1D1D1F]/50"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                      <button
                        type="button"
                        aria-label="Previous sanctuary card"
                        onClick={() => {
                          const newIdx = Math.max(0, partnerCarouselIndex - 1);
                          setPartnerCarouselIndex(newIdx);
                          if (partnerScrollRef.current) {
                            const container = partnerScrollRef.current;
                            const cards = Array.from(container.children);
                            if (cards[newIdx]) {
                              cards[newIdx].scrollIntoView({
                                behavior: "smooth",
                                inline: "center",
                                block: "nearest",
                              });
                            }
                          }
                        }}
                        disabled={partnerCarouselIndex <= 0}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          partnerCarouselIndex <= 0
                            ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                            : "bg-white hover:bg-[#0E4D3A] text-[#1D1D1F] hover:text-white border-[#D2D2D7] shadow-xs active:scale-95"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next sanctuary card"
                        onClick={() => {
                          const newIdx = Math.min(
                            filteredCentres.length - 1,
                            partnerCarouselIndex + 1,
                          );
                          setPartnerCarouselIndex(newIdx);
                          if (partnerScrollRef.current) {
                            const container = partnerScrollRef.current;
                            const cards = Array.from(container.children);
                            if (cards[newIdx]) {
                              cards[newIdx].scrollIntoView({
                                behavior: "smooth",
                                inline: "center",
                                block: "nearest",
                              });
                            }
                          }
                        }}
                        disabled={
                          partnerCarouselIndex >= filteredCentres.length - 1
                        }
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          partnerCarouselIndex >= filteredCentres.length - 1
                            ? "opacity-35 cursor-not-allowed bg-[#E5E5EA] border-[#D2D2D7] text-[#8E8E93]"
                            : "bg-white hover:bg-[#0E4D3A] text-[#1D1D1F] hover:text-white border-[#D2D2D7] shadow-xs active:scale-95"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-center py-16 px-6 bg-white rounded-[24px] border border-[#D2D2D7] max-w-xl mx-auto shadow-2xs"
                key={"empty-state"}
              >
                <div className="w-12 h-12 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="mb-3">
                  <SignalBadge variant="light" dot>
                    Sanctuary Search
                  </SignalBadge>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1D1D1F] mb-3">
                  No centres match this environment yet
                </h3>
                <p className="text-sm text-[#6E6E73] mb-6 leading-relaxed">
                  DARSHAI continuously evaluates and audits new sanctuaries
                  across India that meet our strict clinical and geographical
                  standards.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="darshai-btn-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A] focus-visible:ring-offset-2"
                >
                  <span>Show all environments</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <section
        id="partner-standards"
        className="section-editorial bg-white border-b border-[#D2D2D7] py-20 md:py-28 text-[#1D1D1F] scroll-mt-12"
      >
        <div className="darshai-container">
          <Reveal>
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                PARTNER STANDARDS
              </p>
              <h2 className="typography-section-h2 font-semibold text-[#1D1D1F] leading-[1.08] tracking-tight mb-4">
                How DARSHAI
                <br />
                Selects A Centre.
              </h2>
              <p className="typography-lead text-[#48484A] font-normal">
                Location is only one part of the decision.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {PARTNER_STANDARDS.map((standard) => {
                const IconComponent = standard.icon;
                return (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedStandard(standard);
                      track("explore_environments", {
                        standard: standard.title,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedStandard(standard);
                        track("explore_environments", {
                          standard: standard.title,
                        });
                      }
                    }}
                    className="group relative bg-white border border-[#D2D2D7] hover:border-[#0E4D3A] rounded-[22px] p-6 sm:p-7 flex flex-col justify-between h-[230px] sm:h-[250px] transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-xs hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
                    key={standard.id}
                  >
                    <div>
                      <p className="typography-eyebrow text-[#0E4D3A] mb-2">
                        {standard.category}
                      </p>
                      <h3 className="typography-card-title font-semibold text-[#1D1D1F] mb-2 group-hover:text-[#0E4D3A] transition-colors">
                        {standard.title}
                      </h3>
                      <p className="typography-body text-[#555555] font-normal line-clamp-2">
                        {standard.teaser}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#D2D2D7]/60 flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#D2D2D7] flex items-center justify-center text-[#0E4D3A] group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#F5F5F7] border border-[#D2D2D7] group-hover:bg-[#0E4D3A] group-hover:border-[#0E4D3A] text-[#0E4D3A] group-hover:text-white flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 shadow-2xs">
                        +
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
      <AnimatePresence>
        {selectedStandard && (
          <div
            onClick={() => setSelectedStandard(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-white border border-[#D2D2D7] rounded-[28px] p-7 sm:p-9 text-[#1D1D1F] shadow-2xl overflow-hidden cursor-default"
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setSelectedStandard(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] transition-colors cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="pr-6">
                <p className="typography-eyebrow text-[#0E4D3A] mb-2">
                  {selectedStandard.category}
                </p>
                <h3 className="typography-h3 font-semibold text-[#1D1D1F] mb-2 tracking-tight">
                  {selectedStandard.title}
                </h3>
                <p className="typography-lead text-[#48484A] font-normal mb-5 pb-4 border-b border-[#D2D2D7]">
                  {selectedStandard.teaser}
                </p>
                <p className="typography-body text-[#555555] font-normal">
                  {selectedStandard.description}
                </p>
                <div className="mt-8 pt-6 border-t border-[#D2D2D7] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedStandard(null)}
                    className="px-6 py-2.5 rounded-full bg-[#0E4D3A] hover:bg-[#093527] text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    <span>CLOSE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <section className="section-editorial border-b border-[#D2D2D7] py-28 md:py-36 bg-white">
        <div className="darshai-container">
          <Reveal>
            <div className="max-w-3xl mb-12 sm:mb-16 text-left">
              <p className="typography-eyebrow text-[#C6A660] mb-3 uppercase tracking-[0.2em] font-mono text-xs font-bold">
                THE DARSHAI JOURNEY
              </p>
              <h2 className="typography-section-h2 font-semibold text-[#1D1D1F] leading-[1.08] tracking-tight mb-4">
                Every Environment Becomes Part of a Larger Journey.
              </h2>
              <p className="typography-lead text-[#48484A] font-normal leading-relaxed">
                A thoughtful journey connects your goals and preferences with
                the environment, centre and programme information that may fit.
                DARSHAI coordinates the next steps with the relevant partner.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[1320px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-8 sm:gap-y-10 lg:gap-y-0 lg:gap-x-4 items-start relative">
                {[
                  {
                    num: "01",
                    label: "ASSESSMENT",
                    name: "Assessment",
                    icon: ClipboardCheck,
                    desc: "Understand your goals, preferences, practical requirements and relevant context.",
                  },
                  {
                    num: "02",
                    label: "ENVIRONMENT",
                    name: "Environment",
                    icon: Compass,
                    desc: "Explore geographic and environmental characteristics alongside your priorities.",
                  },
                  {
                    num: "03",
                    label: "PARTNER",
                    name: "Partner",
                    icon: Building2,
                    desc: "Identify potentially relevant centre options using available partner information.",
                  },
                  {
                    num: "04",
                    label: "PROGRAMME",
                    name: "Programme",
                    icon: ShieldCheck,
                    desc: "Request confirmation of the programme, duration, inclusions, suitability requirements and dates.",
                  },
                  {
                    num: "05",
                    label: "JOURNEY",
                    name: "Journey",
                    icon: GitFork,
                    desc: "Review the personalised proposal and coordinate booking and pre-arrival information after confirmation.",
                  },
                  {
                    num: "06",
                    label: "FOLLOW-UP",
                    name: "Follow-Up",
                    icon: HeartHandshake,
                    desc: "Coordinate post-journey guidance or continuity where it is included in the agreed service scope.",
                  },
                ].map((step, idx, arr) => {
                  const Icon = step.icon;
                  const isLast = idx === arr.length - 1;
                  return (
                    <>
                      <div className="relative flex flex-col items-center text-center group cursor-pointer w-full px-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAFAFA] border border-[#E5E5EA]/80 group-hover:bg-[#0E4D3A] group-hover:border-[#0E4D3A] group-hover:shadow-[0_8px_24px_rgba(14,77,58,0.25)] flex items-center justify-center text-black group-hover:text-white mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105 shadow-2xs z-10 relative">
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black group-hover:text-white stroke-[2.5] transition-colors duration-300" />
                        </div>
                        {!isLast && (
                          <div className="hidden lg:flex items-center justify-center absolute top-8 sm:top-10 -right-5 lg:-right-7 w-10 lg:w-14 z-20 pointer-events-none">
                            <div className="w-full flex items-center">
                              <div className="h-[2px] flex-1 bg-gradient-to-r from-[#D2D2D7] via-[#0E4D3A]/40 to-[#0E4D3A] rounded-full relative overflow-hidden">
                                <motion.div
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-90"
                                />
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#0E4D3A] stroke-[2.5] -ml-1 shrink-0" />
                            </div>
                          </div>
                        )}
                        <span className="text-[10px] font-mono font-bold text-[#0E4D3A] tracking-widest uppercase mb-1">
                          {step.num}
                        </span>
                        <span className="typography-card-title font-semibold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors duration-300 leading-snug tracking-wider text-xs sm:text-sm uppercase mb-1">
                          {step.label}
                        </span>
                        <span className="text-xs text-[#555555] leading-relaxed group-hover:text-[#1D1D1F] transition-colors font-normal">
                          {step.desc}
                        </span>
                      </div>
                      {!isLast && (
                        <div className="flex sm:hidden flex-col items-center justify-center my-2 py-1 pointer-events-none col-span-1">
                          <div className="w-[2px] h-8 bg-gradient-to-b from-[#D2D2D7] via-[#0E4D3A]/50 to-[#0E4D3A] rounded-full relative overflow-hidden">
                            <motion.div
                              animate={{ y: ["-100%", "100%"] }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-[#34D399] to-transparent opacity-90"
                            />
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#0E4D3A] stroke-[2.5] rotate-90 -mt-0.5 shrink-0" />
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <TrustVerificationSection
        id="selection-process"
        onNavigate={navigateTo}
      />
      <FinalCTA
        id="centres-final-cta"
        eyebrow="THE DARSHAI DESTINATION"
        heading="Find The Environment That Fits Your Journey."
        description="Begin with our structured assessment. Let us identify the climate, terrain and clinical setting that will serve your health best."
        buttonText="BEGIN YOUR JOURNEY"
        buttonOnClick={() => {
          track("start_assessment_centres_cta", {
            source: "centres_final_cta",
          });
          navigateTo("contact");
        }}
        bgImage="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&auto=format&fit=crop&q=80"
      />
      {selectedCentre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70">
          <div
            className="relative w-full max-w-3xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-[#D2D2D7] max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setSelectedCentre(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] transition-colors cursor-pointer z-10 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 sm:p-10 overflow-y-auto">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0E4D3A]">
                  Curated Centre Quick-View
                </span>
                <span className="text-[11px] font-mono text-[#6E6E73] uppercase">
                  {selectedCentre.location}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-4">
                {selectedCentre.quickViewHeadline ||
                  `Meet ${selectedCentre.name}.`}
              </h3>
              <div className="relative aspect-[16/9] rounded-[22px] overflow-hidden mb-6 bg-[#161618] border border-[#D2D2D7] group">
                <SmartImage
                  src={selectedCentre.image}
                  alt={selectedCentre.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90 uppercase tracking-wider">
                    [MEDIA SLOT - QUICK-VIEW CENTRE IMAGE / VIDEO | 16:9]
                  </span>
                </div>
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-[#34D399] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    DARSHAI VERIFIED
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between text-[11px] text-white/80 font-mono">
                  <span className="truncate">
                    Real campus, stay and landscape photography for{" "}
                    {selectedCentre.name}.
                  </span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#1D1D1F] leading-relaxed mb-6 font-normal">
                {selectedCentre.overview || selectedCentre.description}
              </p>
              {selectedCentre.highlightsText && (
                <div className="mb-8 p-4 sm:p-5 rounded-[20px] bg-[#F5F5F7] border border-[#D2D2D7]/80">
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#0E4D3A] font-bold mb-2.5">
                    Highlights
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1D1D1F] font-medium leading-relaxed">
                    {selectedCentre.highlightsText}
                  </p>
                </div>
              )}
              <div className="pt-6 border-t border-[#D2D2D7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    const slug = selectedCentre.slug || "kanasu";
                    setSelectedCentre(null);
                    track("view_full_centre", {
                      centre: selectedCentre.name,
                      slug,
                    });
                    navigateTo(`centres/${slug}`);
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-[#0E4D3A] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>EXPLORE FULL CENTRE PROFILE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const slug = selectedCentre.slug || "kanasu";
                    setSelectedCentre(null);
                    track("request_recommendation", {
                      centre: selectedCentre.name,
                      slug,
                    });
                    navigateTo(`contact?centre=${slug}&purpose=personal`);
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#0E4D3A] hover:opacity-95 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-md shadow-[#0E4D3A]/25 group"
                >
                  <span>REQUEST A PERSONALISED RECOMMENDATION</span>
                  <span
                    aria-hidden="true"
                    className="text-[#34D399] group-hover:translate-x-1 transition-transform font-bold"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default CentresPage;
