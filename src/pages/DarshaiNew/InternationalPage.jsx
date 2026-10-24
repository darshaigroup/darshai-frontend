import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Plus,
  Minus,
  Send,
  Check,
  Loader2,
} from "lucide-react";
import Reveal from "../../components/darshaiNew/Reveal";
import SmartImage from "../../components/darshaiNew/SmartImage";
import ScrollCue from "../../components/darshaiNew/ScrollCue";
import { track } from "../../lib/darshaiNew/analytics";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
import WhyDarshaiInternationalSection from "../../components/darshaiNew/WhyDarshaiInternationalSection";
import WhyIndiaWellnessBentoSection from "../../components/darshaiNew/WhyIndiaWellnessBentoSection";
import FourPrinciplesInternationalSection from "../../components/darshaiNew/FourPrinciplesInternationalSection";
import GeoWellnessScrollStorySection from "../../components/darshaiNew/GeoWellnessScrollStorySection";
import AIMatchingScrollStorySection from "../../components/darshaiNew/AIMatchingScrollStorySection";
import ExploreByGoalSection from "../../components/darshaiNew/ExploreByGoalSection";
import ExploreByDurationSection from "../../components/darshaiNew/ExploreByDurationSection";
import CuratedPartnersShowcaseSection from "../../components/darshaiNew/CuratedPartnersShowcaseSection";
import DarshaiAdvantageSection from "../../components/darshaiNew/DarshaiAdvantageSection";
import CorporateGeoWellnessSection from "../../components/darshaiNew/CorporateGeoWellnessSection";
import FinancialSecuritySection from "../../components/darshaiNew/FinancialSecuritySection";
import { GlobalJourneyManagementSection } from "../../components/darshaiNew/GlobalJourneyManagementSection";
function GeoWellnessFlowArrow({ index }) {
  const delay = index * 0.35;
  return (
    <div className="flex items-center justify-center shrink-0 self-center z-10 my-2 lg:my-0">
      <div className="hidden lg:flex items-center">
        <div className="w-2 xl:w-3.5 h-0.5 bg-gradient-to-r from-transparent to-[#0E4D3A]/30 rounded-full" />
        <div className="relative flex items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-[#0E4D3A]/40 pointer-events-none"
            animate={{
              scale: [1, 1.45, 1.75],
              opacity: [0.65, 0.25, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
              ease: "easeOut",
            }}
          />
          <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/30 shadow-xs flex items-center justify-center relative overflow-hidden backdrop-blur-xs">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
            <div className="flex items-center gap-0.5 text-[#0E4D3A]">
              <motion.span
                className="w-1 h-1 rounded-full bg-[#0E4D3A]/50"
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  x: [-2, 2, -2],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                animate={{
                  x: [-3, 4, -3],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-2 xl:w-3.5 h-0.5 bg-gradient-to-r from-[#0E4D3A]/30 to-transparent rounded-full" />
      </div>
      <div className="flex lg:hidden flex-col items-center">
        <div className="h-2 w-0.5 bg-gradient-to-b from-transparent to-[#0E4D3A]/30 rounded-full" />
        <div className="relative flex items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-[#0E4D3A]/40 pointer-events-none"
            animate={{
              scale: [1, 1.45, 1.75],
              opacity: [0.65, 0.25, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
              ease: "easeOut",
            }}
          />
          <div className="w-9 h-9 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/30 shadow-xs flex items-center justify-center relative overflow-hidden backdrop-blur-xs">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent pointer-events-none"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
            <div className="flex flex-col items-center gap-0.5 text-[#0E4D3A]">
              <motion.span
                className="w-1 h-1 rounded-full bg-[#0E4D3A]/50"
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  y: [-2, 2, -2],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                animate={{
                  y: [-3, 4, -3],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
              >
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="h-2 w-0.5 bg-gradient-to-b from-[#0E4D3A]/30 to-transparent rounded-full" />
      </div>
    </div>
  );
}
function SplitWordItem({ word, index, baseDelay, reducedMotion }) {
  return (
    <span className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="inline-block"
        initial={reducedMotion ? false : { y: "115%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 0.6,
                delay: baseDelay + index * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        {word}
      </motion.span>
    </span>
  );
}
function SplitWords({
  text,
  startIndex = 0,
  baseDelay = 0.3,
  reducedMotion = false,
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <>
          <SplitWordItem
            word={word}
            index={startIndex + i}
            baseDelay={baseDelay}
            reducedMotion={reducedMotion}
          />
          {i < words.length - 1 ? " " : null}
        </>
      ))}
    </>
  );
}
function MagneticPrimaryCTA({
  onClick,
  className,
  isDesktop,
  reducedMotion,
  children,
}) {
  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  // Springs: damping >= 30 so there is no overshoot
  const springCtaX = useSpring(ctaX, { stiffness: 150, damping: 30 });
  const springCtaY = useSpring(ctaY, { stiffness: 150, damping: 30 });
  const handlePointerMove = (e) => {
    if (!isDesktop || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const distanceX = e.clientX - (rect.left + rect.width / 2);
    const distanceY = e.clientY - (rect.top + rect.height / 2);
    // Clamped strictly within ±6px
    const clampedX = Math.max(
      -6,
      Math.min(6, (distanceX / (rect.width / 2)) * 6),
    );
    const clampedY = Math.max(
      -6,
      Math.min(6, (distanceY / (rect.height / 2)) * 6),
    );
    ctaX.set(clampedX);
    ctaY.set(clampedY);
  };
  const handlePointerLeave = () => {
    ctaX.set(0);
    ctaY.set(0);
  };
  return (
    <motion.button
      style={{
        x: isDesktop && !reducedMotion ? springCtaX : 0,
        y: isDesktop && !reducedMotion ? springCtaY : 0,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}
export function InternationalPage({ onNavigate }) {
  // Reduced motion preference & desktop breakpoint tracking
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);
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
  // Desktop Pointer Parallax: stiffness 60, damping 22, limited to ±10px
  const bgPointerX = useMotionValue(0);
  const bgPointerY = useMotionValue(0);
  const bgSpringX = useSpring(bgPointerX, { stiffness: 60, damping: 22 });
  const bgSpringY = useSpring(bgPointerY, { stiffness: 60, damping: 22 });
  const handleHeroPointerMove = (e) => {
    if (!isDesktop || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    bgPointerX.set(Math.max(-10, Math.min(10, normalizedX * 10)));
    bgPointerY.set(Math.max(-10, Math.min(10, normalizedY * 10)));
  };
  const handleHeroPointerLeave = () => {
    bgPointerX.set(0);
    bgPointerY.set(0);
  };
  // Form State & Validation Animations
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    nationality: "",
    wellnessGoal: "Stress & Burnout Recovery",
    query: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const isFieldValid = (fieldName) => {
    switch (fieldName) {
      case "fullName":
        return formData.fullName.trim().length >= 2;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      case "mobile":
        return formData.mobile.trim().length >= 6;
      case "country":
        return formData.country.trim().length >= 2;
      case "nationality":
        return formData.nationality.trim().length >= 2;
      case "query":
        return formData.query.trim().length >= 5;
      default:
        return false;
    }
  };
  const handleFieldBlur = (fieldName) => {
    setFocusedField(null);
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    if (!isFieldValid(fieldName)) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: true }));
    } else {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: false }));
    }
  };
  // AI Matching Interactive State
  const [activeMatchingFactors, setActiveMatchingFactors] = useState([
    "Wellness Goals",
    "Relevant Health Requirements",
    "Duration",
    "Environment Preferences",
  ]);
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);
  // DARSHAI Advantage Accordion State
  const [openAdvantage, setOpenAdvantage] = useState(0);
  const toggleMatchingFactor = (factor) => {
    setActiveMatchingFactors((prev) =>
      prev.includes(factor)
        ? prev.filter((f) => f !== factor)
        : [...prev, factor],
    );
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!isFieldValid("fullName")) errors.fullName = true;
    if (!isFieldValid("email")) errors.email = true;
    if (!isFieldValid("mobile")) errors.mobile = true;
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouchedFields((prev) => ({
        ...prev,
        fullName: true,
        email: true,
        mobile: true,
      }));
      setFormError("Please complete all required fields accurately.");
      track("contact_submit_error", { reason: "missing_required_fields" });
      return;
    }
    setFieldErrors({});
    setFormError("");
    setIsSubmitting(true);
    track("contact_submit_start", { page: "international" });
    setTimeout(() => {
      const ref = `DARSHAI-INT-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(ref);
      setIsSubmitting(false);
      setSubmitted(true);
      track("contact_submit_success", {
        page: "international",
        wellnessGoal: formData.wellnessGoal,
      });
      track("begin_journey", { source: "international_enquiry_form" });
    }, 1200);
  };
  const scrollToForm = (goalPreset) => {
    if (goalPreset) {
      setFormData((prev) => ({ ...prev, wellnessGoal: goalPreset }));
    }
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <motion.section
        ref={heroRef}
        id="hero-section"
        style={{ scale: heroScale, opacity: heroOpacity }}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={handleHeroPointerLeave}
        className="section-hero relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-24 sm:pb-28 md:pb-32 text-center bg-[#1D1D1F] origin-center will-change-transform"
      >
        <motion.div
          initial={
            reducedMotion
              ? false
              : { clipPath: "inset(10% 10% 10% 10% round 32px)" }
          }
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
          }
          className="absolute inset-0 overflow-hidden pointer-events-none will-change-[clip-path]"
        >
          <motion.div
            style={{
              x: isDesktop && !reducedMotion ? bgSpringX : 0,
              y: isDesktop && !reducedMotion ? bgSpringY : 0,
            }}
            className="w-full h-full will-change-transform"
          >
            <motion.div
              style={{ y: heroParallax }}
              initial={{ scale: 1.04, opacity: 0.4 }}
              animate={{ scale: 1.0, opacity: 0.45 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-full will-change-transform"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80"
                alt="Curated Wellness Sanctuaries Across India"
                priority
                aspectRatio="16:9"
                className="w-full h-full object-cover object-center scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/45 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[circle_at_center] from-black/20 via-black/60 to-black/90 pointer-events-none" />
          </motion.div>
        </motion.div>
        <div className="relative z-10 darshai-container w-full">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
              }
              className="mb-6 sm:mb-8 flex justify-center"
            >
              <span className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C6A660] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase shadow-lg">
                PERSONALIZED WELLNESS JOURNEYS IN INDIA
              </span>
            </motion.div>
            <div>
              <h1 className="typography-hero-display font-bold text-white max-w-4xl xl:max-w-5xl leading-[1.10] tracking-tight mb-8 sm:mb-10 lg:mb-12 mx-auto text-center drop-shadow-md">
                <span className="text-white">
                  <SplitWords
                    text="Come to India for Wellness."
                    startIndex={0}
                    baseDelay={0.3}
                    reducedMotion={reducedMotion}
                  />
                </span>{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#34D399] font-bold relative inline-block">
                  <SplitWords
                    text="Arrive With a Journey Built Around You."
                    startIndex={5}
                    baseDelay={0.3}
                    reducedMotion={reducedMotion}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-2 sm:-bottom-3 inset-x-0 h-[2px] bg-[#C6A660] origin-center rounded-full pointer-events-none block"
                    initial={reducedMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.7,
                            delay: 0.3 + 11 * 0.045 + 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  />
                </span>
              </h1>
            </div>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: 0.85, ease: [0.22, 1, 0.36, 1] }
              }
              className="max-w-[700px] md:max-w-[740px] mb-10 sm:mb-12 md:mb-14 mx-auto text-center"
            >
              <div className="space-y-3 sm:space-y-4 text-white drop-shadow-xs">
                <p className="text-base sm:text-lg md:text-[21px] font-bold leading-relaxed [word-spacing:0.04em] tracking-normal text-white">
                  <span className="text-[#C6A660] font-extrabold tracking-wide">
                    DARSHAI
                  </span>{" "}
                  helps international travellers discover curated wellness
                  programmes across India.
                </p>
                <p className="text-sm sm:text-base md:text-[18px] font-semibold text-white/90 leading-relaxed [word-spacing:0.03em] tracking-normal">
                  From assessment and centre matching to travel coordination and
                  follow-up, every journey is personalized to individual goals
                  and lifestyle.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: 1.05, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center mb-12 sm:mb-14 mx-auto w-full sm:w-auto">
                <MagneticPrimaryCTA
                  onClick={() => {
                    track("begin_journey", {
                      source: "international_hero_primary",
                    });
                    scrollToForm();
                  }}
                  isDesktop={isDesktop}
                  reducedMotion={reducedMotion}
                  className="h-14 sm:h-16 px-8 sm:px-10 md:px-12 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white shadow-xl hover:shadow-2xl text-xs sm:text-sm md:text-[15px] font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group w-full sm:w-auto"
                >
                  <span>PLAN MY WELLNESS JOURNEY</span>
                  <span
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </MagneticPrimaryCTA>
                <button
                  onClick={() => {
                    track("explore_all_centres", {
                      source: "international_hero_secondary",
                    });
                    onNavigate("centres");
                  }}
                  className="h-14 sm:h-16 px-7 sm:px-9 rounded-full bg-white/10 hover:bg-white/18 text-white border border-white/25 hover:border-white/50 backdrop-blur-md text-xs sm:text-sm md:text-[15px] font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>EXPLORE WELLNESS CENTRES</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-10 pointer-events-auto">
          <ScrollCue targetId="why-india" />
        </div>
      </motion.section>
      <WhyIndiaWellnessBentoSection
        onScrollToForm={() => scrollToForm()}
        onNavigate={onNavigate}
      />
      <WhyDarshaiInternationalSection />
      <FourPrinciplesInternationalSection />
      <GeoWellnessScrollStorySection />
      <AIMatchingScrollStorySection onScrollToForm={() => scrollToForm()} />
      <div className="my-10 sm:my-14 lg:my-20">
        <ExploreByGoalSection onSelectGoal={(goal) => scrollToForm(goal)} />
      </div>
      <div className="my-10 sm:my-14 lg:my-20">
        <ExploreByDurationSection
          onSelectDuration={(dur) => scrollToForm(dur)}
        />
      </div>
      <div className="my-10 sm:my-14 lg:my-20">
        <CuratedPartnersShowcaseSection onNavigate={onNavigate} />
      </div>
      <GlobalJourneyManagementSection />
      <div className="my-10 sm:my-14 lg:my-20">
        <FinancialSecuritySection onScrollToForm={() => scrollToForm()} />
      </div>
      <div className="my-10 sm:my-14 lg:my-20">
        <DarshaiAdvantageSection onScrollToForm={() => scrollToForm()} />
      </div>
      <div className="my-10 sm:my-14 lg:my-20">
        <CorporateGeoWellnessSection onNavigate={onNavigate} />
      </div>
      <section
        id="faq"
        className="section-editorial py-20 md:py-28 bg-white border-y border-[#D2D2D7] my-10 sm:my-14 lg:my-20"
      >
        <div className="darshai-container">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="typography-eyebrow text-[#0E4D3A] mb-3 uppercase tracking-[0.2em] font-semibold text-xs">
                FAQ
              </p>
              <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-[2px] bg-[#0E4D3A] mx-auto" />
            </div>
          </Reveal>
          <div className="space-y-4 max-w-4xl mx-auto text-left">
            {[
              {
                q: "1. What is DARSHAI Geo-Wellness?",
                a: "DARSHAI is a personalized wellness discovery, recommendation and journey-management platform that helps individuals explore suitable wellness programmes, destinations and wellness centres based on their goals, preferences and travel requirements.",
              },
              {
                q: "2. Does DARSHAI own or operate wellness centres?",
                a: "No. DARSHAI works with curated wellness centres and retreat partners across India.",
              },
              {
                q: "3. How does DARSHAI recommend a wellness centre?",
                a: "Recommendations consider wellness goals, lifestyle, programme preferences, duration, budget, travel preferences and geographic/environmental preferences.",
              },
              {
                q: "4. Does DARSHAI provide medical diagnosis or treatment?",
                a: "No. DARSHAI does not provide medical diagnosis or treatment. Where appropriate, recommendations may be reviewed by qualified professionals.",
              },
              {
                q: "5. Can international travellers use DARSHAI?",
                a: "Yes. DARSHAI supports international wellness travellers seeking curated wellness experiences across India.",
              },
              {
                q: "6. What programme durations are available?",
                a: "Most journeys are available as 7-day, 14-day or 21-day experiences, depending on the selected centre and programme.",
              },
              {
                q: "7. Can DARSHAI help with travel coordination?",
                a: "Yes. DARSHAI can assist with airport transfers, travel planning support, arrival coordination, programme scheduling and journey management.",
              },
              {
                q: "8. Can I choose my own wellness centre?",
                a: "Yes. You may request a specific centre or allow DARSHAI to recommend suitable options.",
              },
              {
                q: "9. What is included in Global Private Journey Management?",
                a: "Depending on the journey, it may include personalized coordination, centre booking support, travel planning, arrival coordination, partner communication, journey monitoring and post-programme follow-up.",
              },
              {
                q: "10. What is the cancellation/refund policy?",
                a: "Cancellation, rescheduling and refund eligibility depend on services already delivered by DARSHAI, the selected wellness centre's policy and applicable travel-provider policies. Detailed terms are shared before booking confirmation.",
              },
            ].map((faq, idx) => (
              <Reveal delay={idx * 0.04} key={faq.q}>
                <div className="border border-[#D2D2D7] rounded-[16px] overflow-hidden bg-[#F5F5F7]">
                  <button
                    id={`faq-btn-${idx}`}
                    aria-expanded={openFaq === idx}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 text-sm sm:text-base font-medium text-[#1D1D1F] flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition-colors group"
                  >
                    <span>{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 flex items-center justify-center text-[#0E4D3A] shrink-0 transition-colors group-hover:bg-[#0E4D3A] group-hover:text-white">
                      {openFaq === idx ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-3 text-base sm:text-lg text-[#2C2C2E] leading-relaxed border-t border-[#D2D2D7]/50 bg-white font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="enquiry-form"
        className="section-editorial py-20 md:py-28 bg-[#F5F5F7] border-y border-[#D2D2D7] my-10 sm:my-14 lg:my-20"
      >
        <div className="darshai-container text-left">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                INTERNATIONAL ENQUIRY FORM
              </p>
              <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-4">
                Start Your Personalized Wellness Journey
              </h2>
              <div className="w-12 h-[2px] bg-[#0E4D3A] mx-auto mb-4" />
              <p className="typography-body-large text-[#2C2C2E] max-w-2xl mx-auto font-medium">
                Tell us a little about yourself so we can understand your
                wellness goals and journey requirements.
              </p>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="p-10 sm:p-14 rounded-[32px] bg-gradient-to-b from-[#0E4D3A]/10 via-[#0E4D3A]/5 to-white border border-[#0E4D3A]/20 text-center space-y-6 shadow-2xl backdrop-blur-md"
                  key={"success-confirmation"}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    }}
                    className="w-16 h-16 rounded-full bg-[#0E4D3A] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#0E4D3A]/30"
                  >
                    <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                  </motion.div>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#0E4D3A]">
                      ENQUIRY CONFIRMED
                    </p>
                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                      Your journey request has been received.
                    </h4>
                    <p className="text-base sm:text-lg text-[#2C2C2E] max-w-lg mx-auto leading-relaxed font-medium">
                      Thank you,{" "}
                      <span className="font-semibold text-[#1D1D1F]">
                        {formData.fullName}
                      </span>
                      . An International Care Navigator has been assigned to
                      your profile and will connect with you within 24 hours.
                    </p>
                  </div>
                  {referenceId && (
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D2D2D7] text-xs font-mono font-bold text-[#0E4D3A] tracking-wider shadow-2xs">
                      <span className="text-[#3A3A3C] font-semibold">
                        REFERENCE CODE:
                      </span>{" "}
                      {referenceId}
                    </div>
                  )}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          mobile: "",
                          country: "",
                          nationality: "",
                          wellnessGoal: "Stress & Burnout Recovery",
                          query: "",
                        });
                      }}
                      className="darshai-btn-primary uppercase text-xs !h-11 !px-7 cursor-pointer hover:shadow-lg transition-all"
                    >
                      SUBMIT ANOTHER ENQUIRY
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleFormSubmit}
                  className="bg-white p-8 sm:p-12 rounded-[28px] border border-[#D2D2D7] shadow-xl space-y-6"
                  key={"journey-enquiry-form"}
                >
                  {formError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 typography-body text-xs sm:text-sm font-medium">
                      {formError}
                    </div>
                  )}
                  <div className="pb-4 border-b border-[#D2D2D7]/60">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1D1D1F]">
                      Personal Information
                    </h3>
                  </div>
                  {(() => {
                    const fieldKey = "fullName";
                    const isFocused = focusedField === fieldKey;
                    const isValid = isFieldValid(fieldKey);
                    const hasError = !!fieldErrors[fieldKey];
                    return (
                      <motion.div
                        animate={{ y: hasError ? [0, -3, 3, -2, 2, 0] : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-1.5"
                      >
                        <motion.label
                          animate={{
                            color: isFocused ? "#0E4D3A" : "#1D1D1F",
                            x: isFocused ? 2 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="block text-xs font-bold uppercase tracking-wider mb-2"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </motion.label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onFocus={() => setFocusedField(fieldKey)}
                            onBlur={() => handleFieldBlur(fieldKey)}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              });
                              if (fieldErrors[fieldKey]) {
                                setFieldErrors((prev) => ({
                                  ...prev,
                                  [fieldKey]: false,
                                }));
                              }
                            }}
                            className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all ${
                              isFocused
                                ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                                : hasError
                                  ? "border-red-500 bg-red-50/20"
                                  : isValid
                                    ? "border-[#0E4D3A]/60 bg-white"
                                    : "border-[#D2D2D7]"
                            }`}
                          />
                          <AnimatePresence>
                            {isValid && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0E4D3A] bg-[#0E4D3A]/10 p-1 rounded-full pointer-events-none"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {hasError && (
                          <p className="text-[11px] text-red-600 font-medium">
                            Please enter your full name.
                          </p>
                        )}
                      </motion.div>
                    );
                  })()}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(() => {
                      const fieldKey = "email";
                      const isFocused = focusedField === fieldKey;
                      const isValid = isFieldValid(fieldKey);
                      const hasError = !!fieldErrors[fieldKey];
                      return (
                        <motion.div
                          animate={{ y: hasError ? [0, -3, 3, -2, 2, 0] : 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="space-y-1.5"
                        >
                          <motion.label
                            animate={{
                              color: isFocused ? "#0E4D3A" : "#1D1D1F",
                              x: isFocused ? 2 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="block text-xs font-bold uppercase tracking-wider mb-2"
                          >
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </motion.label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              placeholder="name@domain.com"
                              value={formData.email}
                              onFocus={() => setFocusedField(fieldKey)}
                              onBlur={() => handleFieldBlur(fieldKey)}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                });
                                if (fieldErrors[fieldKey]) {
                                  setFieldErrors((prev) => ({
                                    ...prev,
                                    [fieldKey]: false,
                                  }));
                                }
                              }}
                              className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all ${
                                isFocused
                                  ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                                  : hasError
                                    ? "border-red-500 bg-red-50/20"
                                    : isValid
                                      ? "border-[#0E4D3A]/60 bg-white"
                                      : "border-[#D2D2D7]"
                              }`}
                            />
                            <AnimatePresence>
                              {isValid && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.6 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                  }}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0E4D3A] bg-[#0E4D3A]/10 p-1 rounded-full pointer-events-none"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {hasError && (
                            <p className="text-[11px] text-red-600 font-medium">
                              Please enter a valid email address.
                            </p>
                          )}
                        </motion.div>
                      );
                    })()}
                    {(() => {
                      const fieldKey = "mobile";
                      const isFocused = focusedField === fieldKey;
                      const isValid = isFieldValid(fieldKey);
                      const hasError = !!fieldErrors[fieldKey];
                      return (
                        <motion.div
                          animate={{ y: hasError ? [0, -3, 3, -2, 2, 0] : 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="space-y-1.5"
                        >
                          <motion.label
                            animate={{
                              color: isFocused ? "#0E4D3A" : "#1D1D1F",
                              x: isFocused ? 2 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="block text-xs font-bold uppercase tracking-wider mb-2"
                          >
                            Mobile / WhatsApp{" "}
                            <span className="text-red-500">*</span>
                          </motion.label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              placeholder="+1 (555) 000-0000"
                              value={formData.mobile}
                              onFocus={() => setFocusedField(fieldKey)}
                              onBlur={() => handleFieldBlur(fieldKey)}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  mobile: e.target.value,
                                });
                                if (fieldErrors[fieldKey]) {
                                  setFieldErrors((prev) => ({
                                    ...prev,
                                    [fieldKey]: false,
                                  }));
                                }
                              }}
                              className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all ${
                                isFocused
                                  ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                                  : hasError
                                    ? "border-red-500 bg-red-50/20"
                                    : isValid
                                      ? "border-[#0E4D3A]/60 bg-white"
                                      : "border-[#D2D2D7]"
                              }`}
                            />
                            <AnimatePresence>
                              {isValid && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.6 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                  }}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0E4D3A] bg-[#0E4D3A]/10 p-1 rounded-full pointer-events-none"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {hasError && (
                            <p className="text-[11px] text-red-600 font-medium">
                              Please enter a valid phone number.
                            </p>
                          )}
                        </motion.div>
                      );
                    })()}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(() => {
                      const fieldKey = "country";
                      const isFocused = focusedField === fieldKey;
                      const isValid = isFieldValid(fieldKey);
                      return (
                        <div className="space-y-1.5">
                          <motion.label
                            animate={{
                              color: isFocused ? "#0E4D3A" : "#1D1D1F",
                              x: isFocused ? 2 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="block text-xs font-bold uppercase tracking-wider mb-2"
                          >
                            Country of Residence
                          </motion.label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g. United Kingdom, USA, UAE"
                              value={formData.country}
                              onFocus={() => setFocusedField(fieldKey)}
                              onBlur={() => handleFieldBlur(fieldKey)}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  country: e.target.value,
                                })
                              }
                              className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all ${
                                isFocused
                                  ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                                  : isValid
                                    ? "border-[#0E4D3A]/60 bg-white"
                                    : "border-[#D2D2D7]"
                              }`}
                            />
                            <AnimatePresence>
                              {isValid && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.6 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                  }}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0E4D3A] bg-[#0E4D3A]/10 p-1 rounded-full pointer-events-none"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })()}
                    {(() => {
                      const fieldKey = "nationality";
                      const isFocused = focusedField === fieldKey;
                      const isValid = isFieldValid(fieldKey);
                      return (
                        <div className="space-y-1.5">
                          <motion.label
                            animate={{
                              color: isFocused ? "#0E4D3A" : "#1D1D1F",
                              x: isFocused ? 2 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="block text-xs font-bold uppercase tracking-wider mb-2"
                          >
                            Nationality
                          </motion.label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g. British, American, Emirati"
                              value={formData.nationality}
                              onFocus={() => setFocusedField(fieldKey)}
                              onBlur={() => handleFieldBlur(fieldKey)}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nationality: e.target.value,
                                })
                              }
                              className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all ${
                                isFocused
                                  ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                                  : isValid
                                    ? "border-[#0E4D3A]/60 bg-white"
                                    : "border-[#D2D2D7]"
                              }`}
                            />
                            <AnimatePresence>
                              {isValid && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.6 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                  }}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0E4D3A] bg-[#0E4D3A]/10 p-1 rounded-full pointer-events-none"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  {(() => {
                    const fieldKey = "wellnessGoal";
                    const isFocused = focusedField === fieldKey;
                    return (
                      <div className="space-y-1.5">
                        <motion.label
                          animate={{
                            color: isFocused ? "#0E4D3A" : "#1D1D1F",
                            x: isFocused ? 2 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="block text-xs font-bold uppercase tracking-wider mb-2"
                        >
                          Wellness Goals
                        </motion.label>
                        <select
                          value={formData.wellnessGoal}
                          onFocus={() => setFocusedField(fieldKey)}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              wellnessGoal: e.target.value,
                            })
                          }
                          className={`w-full px-4 py-3.5 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all cursor-pointer ${
                            isFocused
                              ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                              : "border-[#D2D2D7]"
                          }`}
                        >
                          <option value="Stress & Burnout Recovery">
                            Stress & Burnout Recovery
                          </option>
                          <option value="Sleep & Recovery">
                            Sleep & Recovery
                          </option>
                          <option value="Weight Management">
                            Weight Management
                          </option>
                          <option value="Healthy Ageing">Healthy Ageing</option>
                          <option value="Executive Wellness">
                            Executive Wellness
                          </option>
                          <option value="Digital Detox">Digital Detox</option>
                          <option value="Ayurveda Wellness">
                            Ayurveda Wellness
                          </option>
                          <option value="Preventive Wellness">
                            Preventive Wellness
                          </option>
                          <option value="Relaxation & Rejuvenation">
                            Relaxation & Rejuvenation
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    );
                  })()}
                  {(() => {
                    const fieldKey = "query";
                    const isFocused = focusedField === fieldKey;
                    const isValid = isFieldValid(fieldKey);
                    return (
                      <div className="space-y-1.5">
                        <motion.label
                          animate={{
                            color: isFocused ? "#0E4D3A" : "#1D1D1F",
                            x: isFocused ? 2 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="block text-xs font-bold uppercase tracking-wider mb-2"
                        >
                          Any Query
                        </motion.label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            placeholder="Tell us about any specific health requirements, travel dates, or questions..."
                            value={formData.query}
                            onFocus={() => setFocusedField(fieldKey)}
                            onBlur={() => handleFieldBlur(fieldKey)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                query: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-3.5 pr-11 rounded-xl border bg-[#F5F5F7] text-[#1D1D1F] text-sm focus:outline-none transition-all resize-none ${
                              isFocused
                                ? "border-[#0E4D3A] bg-white ring-2 ring-[#0E4D3A]/20 shadow-xs"
                                : isValid
                                  ? "border-[#0E4D3A]/60 bg-white"
                                  : "border-[#D2D2D7]"
                            }`}
                          />
                          <AnimatePresence>
                            {isValid && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="absolute right-3.5 top-4 flex items-center justify-center text-[#0E4D3A] bg-[#0E4D3A]/10 p-1 rounded-full pointer-events-none"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="pt-4 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="darshai-btn-primary uppercase cursor-pointer !h-14 !px-10 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-3 shadow-lg mx-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>SUBMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <section
        id="cancellation-refund"
        className="section-editorial py-20 md:py-28 bg-white border-y border-[#D2D2D7] my-10 sm:my-14 lg:my-20"
      >
        <div className="darshai-container text-left">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                  CANCELLATION & REFUND POLICY
                </p>
                <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-6">
                  Clear Terms Before You Book
                </h2>
                <div className="space-y-4 typography-body-large text-[#2C2C2E] font-medium leading-relaxed">
                  <p>
                    Once an assessment, consultation, recommendation report or
                    journey-planning service has been completed, applicable
                    DARSHAI service fees may become non-refundable.
                  </p>
                  <p>
                    Cancellation, rescheduling and refund eligibility for
                    wellness centre stays are governed directly by the selected
                    wellness centre’s individual policy. Travel services
                    including flights, visas, and insurance remain subject to
                    the relevant third-party provider policies.
                  </p>
                  <p>
                    Exceptional circumstances such as medical emergencies,
                    government travel restrictions, or force majeure situations
                    are reviewed individually with utmost care and
                    consideration.
                  </p>
                </div>
              </div>
              <div className="md:border-l md:border-[#D2D2D7] md:pl-10 lg:pl-16">
                <p className="typography-eyebrow text-[#0E4D3A] mb-3">
                  CLINICAL SAFETY NOTICE
                </p>
                <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-6">
                  Medical & Health Disclaimer
                </h2>
                <div className="space-y-4 typography-body-large text-[#2C2C2E] font-medium leading-relaxed">
                  <p>
                    DARSHAI does not provide medical diagnosis or medical
                    treatment. Where required, recommendations may be reviewed
                    by appropriately qualified professionals before a wellness
                    programme is recommended.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="my-10 sm:my-14 lg:my-20 mb-16 sm:mb-24 lg:mb-32">
        <FinalCTA
          id="final-cta"
          eyebrow="THE DARSHAI DESTINATION"
          heading="Ready to Explore Wellness in India?"
          description="Tell us about your goals, preferences and journey requirements. We'll help you explore suitable wellness experiences across India."
          buttonText="BEGIN MY JOURNEY"
          buttonOnClick={() => {
            track("begin_journey", {
              source: "international_final_cta_primary",
            });
            scrollToForm();
          }}
          secondaryButtonText="REQUEST CONSULTATION"
          secondaryButtonOnClick={() => {
            track("consultation_request", {
              source: "international_final_cta_secondary",
            });
            onNavigate("contact");
          }}
        />
      </div>
    </div>
  );
}
export default InternationalPage;
