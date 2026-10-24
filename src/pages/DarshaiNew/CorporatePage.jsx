import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, Plus, X, ShieldCheck, Building2, Compass, Plane, Calendar, FileText, CheckCircle2, Activity, Layers, UserCheck, Star, Target, Sparkles, GraduationCap, Laptop, Users, Briefcase, } from "lucide-react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import Reveal from "../../components/darshaiNew/Reveal";
import SignalBadge from "../../components/darshaiNew/SignalBadge";
import ScrollCue from "../../components/darshaiNew/ScrollCue";
import useCursorHighlight from "../../components/darshaiNew/useCursorHighlight";
import { track } from "../../lib/darshaiNew/analytics";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
import { CorporateChallengeSection } from "../../components/darshaiNew/CorporateChallengeSection";
import { CorporateSolutionsSection } from "../../components/darshaiNew/CorporateSolutionsSection";
import { GeoWellnessDifferenceSection } from "../../components/darshaiNew/GeoWellnessDifferenceSection";
/**
 * Restrained cursor-aware micro-interaction image wrapper (desktop fine pointer only).
 * In accordance with enterprise finish, applied strictly to solution-module and case-context imagery.
 */
function InteractiveImageFrame({ src, alt, aspect = "aspect-[4/3]", className = "", children, }) {
    const { ref, onPointerMove, onPointerLeave, coords, shouldShow } = useCursorHighlight();
    return (<div className="relative group/corp-img"><div className="absolute inset-[-8px] rounded-[28px] pointer-events-none z-0 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 scale-98 group-hover/corp-img:opacity-100 group-hover/corp-img:scale-100 filter blur-[20px] motion-reduce:hidden" style={{
        background: "rgba(0, 0, 0, 0.035)",
    }} aria-hidden="true"/><div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`relative z-10 ${aspect} rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D2D2D7] bg-[#1D1D1F] transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/corp-img:scale-[1.02] group-hover/corp-img:-translate-y-1 motion-reduce:group-hover/corp-img:transform-none ${className}`.trim()}><SmartImage src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/corp-img:scale-[1.025] group-hover/corp-img:-translate-y-[2px]"/>{shouldShow && (<div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300" style={{
        background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.15), transparent 80%)`,
    }}/>)}{children}</div></div>);
}
const BEYOND_SERVICES = [
    {
        title: "Journey Planning",
        desc: "Comprehensive schedule alignment, biometric objective structuring, and seamless executive calendar integration.",
        icon: Calendar,
        tag: "Phase 01",
        short: "Schedule & Biometrics",
    },
    {
        title: "Centre Coordination",
        desc: "Direct liaison with clinical directors, specialist medical teams, and private executive sanctuary suites.",
        icon: Building2,
        tag: "Phase 02",
        short: "Clinical Liaison",
    },
    {
        title: "Travel Guidance",
        desc: "Global private aviation advice, diplomatic documentation assistance, and real-time itinerary synchronisation.",
        icon: Plane,
        tag: "Phase 03",
        short: "Aviation & Logistics",
    },
    {
        title: "Airport Transfers",
        desc: "Chauffeured, discrete private transit between international VIP terminals and secluded destination sanctuaries.",
        icon: Compass,
        tag: "Phase 04",
        short: "VIP Chauffeured Transit",
    },
    {
        title: "Arrival Assistance",
        desc: "Seamless VIP tarmac protocol, fast-tracked customs clearance, and discrete sanctuary check-in.",
        icon: UserCheck,
        tag: "Phase 05",
        short: "Tarmac & Check-In",
    },
    {
        title: "Program Coordination",
        desc: "Continuous concierge oversight of clinical sessions, restorative intervals, and bespoke executive dietary regimens.",
        icon: Activity,
        tag: "Phase 06",
        short: "Therapy & Nutrition",
    },
    {
        title: "Post-Journey Follow-Up",
        desc: "Structured post-stay evaluations, biometric tracking updates, and continuous long-term vitality protocols.",
        icon: CheckCircle2,
        tag: "Phase 07",
        short: "Long-Term Vitality",
    },
];
const TRUST_PRINCIPLES = [
    {
        num: "01",
        title: "Partner Verification",
        icon: ShieldCheck,
        tag: "Clinical Governance",
        visualTitle: "Direct Onsite Verification & Clinical Credentialing",
        description: "Every sanctuary and clinical partner undergoes stringent onsite audits, verifying medical licenses, hygiene governance, and practitioner accreditations.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=1000&fit=crop&auto=format",
    },
    {
        num: "02",
        title: "Structured Assessments",
        icon: FileText,
        tag: "Diagnostic Precision",
        visualTitle: "Biometric Baselines & Executive Health Profiling",
        description: "Multi-parameter biomarker profiling, autonomic nervous system mapping, and cognitive fatigue evaluations conducted by board-certified physicians.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=1000&fit=crop&auto=format",
    },
    {
        num: "03",
        title: "Journey Transparency",
        icon: Compass,
        tag: "Live Synchronisation",
        visualTitle: "End-to-End Real-Time Journey Tracking",
        description: "Executive sponsors and participants receive complete transparency into daily clinical itineraries, environmental metrics, and privacy-shielded milestone logs.",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=1000&fit=crop&auto=format",
    },
    {
        num: "04",
        title: "Documented Processes",
        icon: Layers,
        tag: "Audit Architecture",
        visualTitle: "Institutional Protocols & Audit-Ready Compliance",
        description: "Formally codified operational blueprints, medical confidentiality protocols, and institutional legal frameworks adhering to Swiss and international standards.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1000&fit=crop&auto=format",
    },
    {
        num: "05",
        title: "Professional Support",
        icon: UserCheck,
        tag: "Executive Concierge",
        visualTitle: "Dedicated 24/7 Medical & Logistical Attachés",
        description: "Every cohort is assigned a private medical concierge liaison ensuring immediate coordination between treating specialists, private transport, and corporate HR.",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=1000&fit=crop&auto=format",
    },
    {
        num: "06",
        title: "Real Partner Relationships",
        icon: Star,
        tag: "Exclusive Alliances",
        visualTitle: "Direct Tier-1 Medical Sanctuaries & Private Retreats",
        description: "Decade-long private relationships with premier European and Swiss longevity centres, guaranteeing priority executive suite bookings and confidential care.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=1000&fit=crop&auto=format",
    },
    {
        num: "07",
        title: "Governance Frameworks",
        icon: Building2,
        tag: "Corporate Safety",
        visualTitle: "Duty of Care & Enterprise Risk Management",
        description: "Comprehensive enterprise-grade risk mitigation, sovereign data encryption, cross-border health insurance coverage, and executive duty-of-care fulfillment.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=1000&fit=crop&auto=format",
    },
];
const GEO_DIFFERENCE_PILLARS = [
    {
        num: "01",
        statement: "A wellness program delivered in the wrong environment may not achieve the intended physiological outcome or restorative depth.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=1200&fit=crop&auto=format&q=85",
        alt: "Pristine sunlit alpine peaks and high-altitude mountain air",
        badge: "High-Altitude Oxygenation & Alpine Stillness",
        metric: "Geo-Alignment",
    },
    {
        num: "02",
        statement: "DARSHAI evaluates environmental suitability alongside program suitability when designing executive wellness journeys.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=1200&fit=crop&auto=format&q=85",
        alt: "Misty pine forest sanctuary with therapeutic biophilic microclimate",
        badge: "Atmospheric Telemetry & Microclimate Pairing",
        metric: "Verified Resonance",
    },
    {
        num: "03",
        statement: "The result is a more personalized, context-aware and deeply transformative experience.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=1200&fit=crop&auto=format&q=85",
        alt: "Pristine emerald mountain lake and restorative executive sanctuary",
        badge: "Context-Aware Transformative Recovery",
        metric: "Target Reset",
    },
];
export function CorporatePage({ onNavigate }) {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    // Active/Hovered cohort in DESIGNED FOR section (defaults to "C-Suite" with indigo highlight)
    const [activeCohort, setActiveCohort] = useState("C-Suite");
    // Trust section active principle
    const [selectedTrustIndex, setSelectedTrustIndex] = useState(0);
    // Beyond The Program "Take a Closer Look" state
    const [activeBeyondIndex, setActiveBeyondIndex] = useState(0);
    const [isBeyondCloserLook, setIsBeyondCloserLook] = useState(false);
    const [beyondDirection, setBeyondDirection] = useState(1);
    const nextBeyond = () => {
        if (activeBeyondIndex < BEYOND_SERVICES.length - 1) {
            setBeyondDirection(1);
            setActiveBeyondIndex((prev) => prev + 1);
        }
    };
    const prevBeyond = () => {
        if (activeBeyondIndex > 0) {
            setBeyondDirection(-1);
            setActiveBeyondIndex((prev) => prev - 1);
        }
    };
    const selectBeyond = (index) => {
        setBeyondDirection(index > activeBeyondIndex ? 1 : -1);
        setActiveBeyondIndex(index);
        setIsBeyondCloserLook(true);
    };
    // Scroll active pill into view when navigated via arrows, dots, or clicks
    const isBeyondMountedRef = useRef(false);
    const beyondPillsContainerRef = useRef(null);
    const beyondPillsRef = useRef([]);
    // Ensure Corporate Page always starts cleanly from the top Hero section
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);
    useEffect(() => {
        if (!isBeyondMountedRef.current) {
            isBeyondMountedRef.current = true;
            return;
        }
        const activePill = beyondPillsRef.current[activeBeyondIndex];
        const container = beyondPillsContainerRef.current;
        if (activePill && container) {
            const pillLeft = activePill.offsetLeft;
            const pillWidth = activePill.offsetWidth;
            const containerWidth = container.offsetWidth;
            container.scrollTo({
                left: pillLeft - containerWidth / 2 + pillWidth / 2,
                behavior: "smooth",
            });
        }
    }, [activeBeyondIndex]);
    // Hero Parallax & Scroll Exit Setup
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll(heroRef.current
        ? {
            target: heroRef,
            offset: ["start start", "end start"],
        }
        : {
            offset: ["start start", "end start"],
        });
    const heroParallax = useTransform(heroScroll, [0, 1], [0, 40]);
    const heroScale = useTransform(heroScroll, [0, 1], [1.0, 0.97]);
    const heroOpacity = useTransform(heroScroll, [0, 1], [1.0, 0.92]);
    // Method Section Scroll Ref
    const methodRef = useRef(null);
    const METHOD_STEPS = [
        {
            num: "01",
            stepName: "People",
            shortLabel: "UNDERSTAND PEOPLE",
            title: "Understand People",
            detail: "Every journey begins with deep one-on-one intake evaluating physiological baselines, stress levels, and individual executive goals.",
            icon: UserCheck,
        },
        {
            num: "02",
            stepName: "Organizational Context",
            shortLabel: "ORGANIZATIONAL CONTEXT",
            title: "Understand Organizational Context",
            detail: "We align the timing, privacy requirements, and retreat structure with corporate schedules to ensure zero operational friction.",
            icon: Building2,
        },
        {
            num: "03",
            stepName: "Wellness Objectives",
            shortLabel: "ASSESS OBJECTIVES",
            title: "Assess Wellness Objectives",
            detail: "Establishing clinical and wellness metrics tailored to individual leaders or executive cohorts.",
            icon: Target,
        },
        {
            num: "04",
            stepName: "Environment",
            shortLabel: "IDENTIFY ENVIRONMENTS",
            title: "Identify Suitable Environments",
            detail: "Pairing executive requirements with natural environments offering optimal air purity, natural quietude, and privacy.",
            icon: Compass,
        },
        {
            num: "05",
            stepName: "Programme",
            shortLabel: "MATCH PROGRAMS",
            title: "Match Programs",
            detail: "Curating bespoke therapies, restorative routines, and dietary plans supervised by accredited master practitioners.",
            icon: Layers,
        },
        {
            num: "06",
            stepName: "Journey",
            shortLabel: "COORDINATE JOURNEYS",
            title: "Coordinate Journeys",
            detail: "Our dedicated concierge handles all travel and sanctuary coordination so executives focus purely on rest and renewal.",
            icon: Plane,
        },
        {
            num: "07",
            stepName: "Continuity",
            shortLabel: "SUPPORT CONTINUITY",
            title: "Support Continuity",
            detail: "Ensuring restorative gains translate into long-term resilience, decision clarity, and sustainable leadership back in the office.",
            icon: ShieldCheck,
        },
    ];
    const navigateTo = (page) => {
        onNavigate(page);
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    };
    const solutionModules = [
        {
            title: "Executive Reset",
            desc: "For founders, executives and leadership teams experiencing sustained pressure and decision fatigue.",
            image: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?w=800&h=550&fit=crop&auto=format",
            tag: "Cognitive Recovery",
        },
        {
            title: "Leadership Recovery",
            desc: "For senior teams requiring focused recovery and restoration.",
            image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=550&fit=crop&auto=format",
            tag: "Sustained Vitality",
        },
        {
            title: "Organizational Wellbeing",
            desc: "Supporting wellbeing initiatives for high-value talent and key contributors.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=550&fit=crop&auto=format",
            tag: "Key Talent Support",
        },
        {
            title: "Leadership Retreats",
            desc: "Curated wellness environments designed for strategic reflection and team alignment.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=550&fit=crop&auto=format",
            tag: "Strategic Alignment",
        },
        {
            title: "Corporate Longevity",
            desc: "Long-term wellbeing strategies supporting sustainable leadership performance.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=550&fit=crop&auto=format",
            tag: "Preventative Longevity",
        },
    ];
    return (<main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]"><motion.section ref={heroRef} id="corporate-hero" style={{ scale: heroScale, opacity: heroOpacity }} className="section-hero relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 md:pb-28 text-center origin-center will-change-transform"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut" }} className="absolute inset-0 overflow-hidden"><motion.div style={{ y: heroParallax }} initial={{ scale: 1.04, opacity: 0.8 }} animate={{ scale: 1.00, opacity: 1 }} transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="w-full h-full will-change-transform"><SmartImage src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1200&fit=crop&auto=format" alt="Executive leadership environment" priority className="w-full h-full object-cover object-center"/></motion.div><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/35 pointer-events-none"/><div className="absolute inset-0 bg-black/20 pointer-events-none"/></motion.div><div className="relative z-10 darshai-container w-full"><div className="max-w-5xl mx-auto flex flex-col items-center text-center"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}><div className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 mx-auto shadow-lg"><p className="text-xs sm:text-sm tracking-[0.25em] text-[#C6A660] uppercase font-semibold">CORPORATE GEO-WELLNESS</p></div></motion.div><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}><h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[84px] xl:text-[92px] font-semibold text-white leading-[1.05] tracking-tight mb-8 mx-auto text-center"><span className="text-white">Wellness Designed For </span><br className="hidden sm:inline"/><span className="text-[#34D399]">Leaders And Organizations.</span></h1></motion.div><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}><div className="space-y-6 sm:space-y-8 text-[#D2D2D7] text-lg sm:text-xl md:text-[22px] max-w-3xl mb-10 leading-relaxed font-bold mx-auto text-center drop-shadow-xs"><p className="font-bold text-[#D2D2D7] leading-relaxed [word-spacing:0.08em] tracking-normal">DARSHAI helps organizations design personalized wellness experiences and executive wellbeing journeys for founders, leadership teams, senior executives and high-responsibility professionals.</p><p className="font-bold text-[#D2D2D7] leading-relaxed [word-spacing:0.08em] tracking-normal">Through structured assessment, Geo-Wellness intelligence and curated wellness environments, organizations can support recovery, resilience and sustainable performance.</p></div></motion.div><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}><div className="flex flex-col sm:flex-row gap-4 items-center justify-center mx-auto"><button type="button" onClick={() => {
        track("consultation_request", { source: "corporate_hero_consultation" });
        track("begin_journey", { source: "corporate_hero_consultation" });
        navigateTo("contact");
    }} className="darshai-btn-primary uppercase cursor-pointer group !h-14 !px-9 text-xs sm:text-sm shadow-xl"><span>REQUEST CORPORATE CONSULTATION</span><span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span></button><button type="button" onClick={() => {
        track("protocol_select", { source: "corporate_hero_explore_programs" });
        navigateTo("programs");
    }} className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer"><span>EXPLORE CORPORATE PROGRAMS</span></button></div></motion.div></div></div><div className="absolute bottom-4 inset-x-0 flex justify-center z-10 pointer-events-auto"><ScrollCue targetId="why-corporate-needs-to-evolve"/></div></motion.section><CorporateChallengeSection onNavigate={navigateTo}/><section className="bg-[#111112] py-20 md:py-28 border-b border-white/10 text-white overflow-hidden"><div className="darshai-container"><Reveal><div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"><div><p className="text-xs tracking-[0.3em] text-[#C6A660] mb-4 uppercase font-semibold">DESIGNED FOR</p><h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.12] max-w-2xl tracking-tight">Built for high-responsibility individuals and teams.</h2></div><div className="hidden md:flex items-center gap-2 text-white/50 text-xs font-mono"><span>5 EXECUTIVE COHORTS</span></div></div></Reveal><Reveal delay={0.1}><div onMouseLeave={() => setActiveCohort("C-Suite")} className="flex lg:grid lg:grid-cols-5 gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-6 pt-2 px-4 sm:px-0 -mx-4 sm:mx-0 scrollbar-none no-scrollbar touch-pan-x">{[
        {
            icon: Sparkles,
            group: "Audience Grid",
            members: [
                "Founders",
                "Entrepreneurs",
                "Business Owners",
                "Company Builders",
            ],
            buttonText: "Request Consultation",
        },
        {
            icon: Users,
            group: "Leadership Teams",
            members: [
                "Senior Leaders",
                "Executive Committees",
                "Strategic Teams",
            ],
            buttonText: "Request Consultation",
        },
        {
            icon: Briefcase,
            group: "C-Suite",
            members: [
                "CEOs",
                "COOs",
                "CFOs",
                "CXOs",
            ],
            buttonText: "Request Consultation",
        },
        {
            icon: GraduationCap,
            group: "HR & People",
            members: [
                "People Strategy",
                "Wellbeing",
                "Leadership Development",
            ],
            buttonText: "Request Consultation",
        },
        {
            icon: Laptop,
            group: "High-Performance",
            members: [
                "Decision Makers",
                "Key Talent",
                "Critical Contributors",
            ],
            buttonText: "Request Consultation",
        },
    ].map(({ icon: Icon, group, members, buttonText }) => {
        const isActive = activeCohort === group;
        return (<div onMouseEnter={() => setActiveCohort(group)} onClick={() => setActiveCohort(group)} onTouchStart={() => setActiveCohort(group)} className={`min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-0 flex-1 flex-shrink-0 snap-start rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 lg:p-9 flex flex-col justify-between shadow-2xl transition-all duration-300 select-none min-h-[420px] sm:min-h-[460px] cursor-pointer group relative ${isActive
            ? "bg-[#131b2e] border-2 border-[#1D4ED8] shadow-[0_20px_50px_rgba(29,78,216,0.35)] -translate-y-2 lg:-translate-y-3 lg:scale-[1.05] z-10"
            : "bg-[#1C1C1E] border border-white/10 hover:border-[#1D4ED8] hover:bg-[#131b2e] hover:-translate-y-2 hover:lg:-translate-y-3 hover:lg:scale-[1.05] hover:z-10 active:bg-[#131b2e] active:border-[#1D4ED8] lg:scale-[0.98] lg:opacity-90 hover:lg:opacity-100 z-0"}`} key={group}><div><div className="mb-6 sm:mb-8 flex items-center justify-between"><Icon className={`w-8 h-8 sm:w-9 sm:h-9 stroke-[2] transition-colors duration-300 ${isActive
            ? "text-blue-400"
            : "text-white group-hover:text-blue-400 group-active:text-blue-400"}`}/>{group === "C-Suite" && (<span className={`text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-0.5 rounded-full border transition-all duration-300 ${isActive
            ? "text-blue-300 bg-blue-900/60 border-[#1D4ED8]/40"
            : "text-white/60 bg-white/5 border-white/15"}`}>Highlight</span>)}</div><h3 className="font-display text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug mb-6">{group}</h3><div className="space-y-3 mb-8">{members.map((item) => (<p className="text-white text-sm sm:text-base font-medium leading-relaxed flex items-center gap-2.5" key={item}><span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${isActive
            ? "bg-blue-400"
            : "bg-white/80 group-hover:bg-blue-400 group-active:bg-blue-400"}`}/><span>{item}</span></p>))}</div></div><div className="pt-2 mt-auto"><button type="button" onClick={(e) => {
            e.stopPropagation();
            track("consultation_request", { source: `designed_for_${group}` });
            track("begin_journey", { source: `designed_for_${group}` });
            navigateTo("contact");
        }} className="bg-white text-black hover:bg-[#1D4ED8] hover:text-white group-hover:bg-[#1D4ED8] group-hover:text-white active:bg-[#1D4ED8] active:text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(29,78,216,0.5)] inline-flex items-center justify-center cursor-pointer active:scale-95"><span>{buttonText}</span></button></div></div>);
    })}</div><div className="lg:hidden flex items-center justify-center gap-2 pt-3 text-white/40 text-xs"><span>← Swipe cards to explore →</span></div></Reveal></div></section><section ref={methodRef} id="darshai-method" className="relative py-20 md:py-28 lg:py-32 bg-[#07241A] text-white overflow-hidden scroll-mt-12 border-b border-[#0E4D3A]/80"><div className="absolute inset-0 z-0 overflow-hidden pointer-events-none"><motion.div animate={{ scale: [1.00, 1.05, 1.00] }} transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
    }} className="w-full h-full"><SmartImage src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=2000&h=1400&fit=crop&auto=format" alt="Atmospheric environmental sanctuary landscape" className="w-full h-full object-cover opacity-25"/></motion.div><div className="absolute inset-0 bg-gradient-to-b from-[#07241A]/95 via-[#0A2E22]/90 to-[#07241A]/95"/><div className="absolute inset-0 bg-radial from-transparent via-[#07241A]/60 to-[#07241A]"/></div><div className="darshai-container relative z-10"><Reveal><div className="max-w-3xl mx-auto text-center mb-16"><p className="typography-eyebrow text-[#C6A660] mb-3 uppercase tracking-[0.2em] font-semibold text-xs">THE DARSHAI METHOD</p><h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.10] tracking-tight mb-6">A Structured Approach To Executive Wellbeing.</h2><p className="text-white/95 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-bold [word-spacing:0.06em] tracking-normal">Instead of disconnected interventions, DARSHAI guides executive teams through a progressive 7-stage method grounded in environmental resonance and clinical governance.</p></div></Reveal><div className="max-w-3xl mx-auto space-y-3 relative">{METHOD_STEPS.map((step, idx) => {
        const isActive = activeStepIndex === idx;
        const isLast = idx === METHOD_STEPS.length - 1;
        return (<><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-10% 0px" }} onViewportEnter={() => setActiveStepIndex(idx)} onClick={() => setActiveStepIndex(idx)} className={`rounded-[28px] p-8 sm:p-10 border transition-all duration-500 cursor-pointer relative overflow-hidden backdrop-blur-md ${isActive
            ? "bg-white/10 border-[#C6A660] shadow-[0_0_35px_rgba(198,166,96,0.25)] ring-1 ring-[#C6A660]/40 scale-[1.01]"
            : "bg-black/30 border-white/10 hover:border-white/30 hover:bg-white/5 opacity-80"}`}><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4"><div className="flex items-center gap-3.5"><span className="w-9 h-9 rounded-full bg-[#C6A660]/20 text-[#C6A660] border border-[#C6A660]/40 font-bold text-xs flex items-center justify-center shrink-0">{step.num}</span><h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">{step.stepName}</h3></div><SignalBadge variant="dark" dot>{step.shortLabel}</SignalBadge></div><p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal">{step.detail}</p></motion.div>{!isLast && (<div className="flex flex-col items-center justify-center py-2"><div className="w-[2px] h-5 bg-gradient-to-b from-[#C6A660] to-[#C6A660]/40"/><div className="w-9 h-9 rounded-full bg-[#041A13] border border-[#C6A660]/60 flex items-center justify-center text-[#C6A660] shadow-[0_0_15px_rgba(198,166,96,0.4)] my-1"><span className="text-lg font-bold leading-none">↓</span></div><div className="w-[2px] h-5 bg-gradient-to-b from-[#C6A660]/40 to-[#C6A660]"/></div>)}</>);
    })}</div></div></section><CorporateSolutionsSection onNavigate={navigateTo}/><GeoWellnessDifferenceSection onNavigate={navigateTo}/><section className="bg-[#111112] py-20 md:py-28 border-b border-white/10 text-white relative overflow-hidden"><div className="darshai-container"><Reveal><div className="max-w-3xl mb-10 md:mb-12"><p className="typography-eyebrow text-[#34D399] mb-3 uppercase tracking-[0.2em] font-semibold text-xs">BEYOND THE PROGRAM</p><h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.12] tracking-tight mb-4">Complete Coordination From Planning To Follow-Up.</h2><p className="text-white/60 text-base sm:text-lg">Take a closer look at our end-to-end executive concierge coordination.</p></div></Reveal><Reveal delay={0.1}><div className="relative transition-all space-y-6"><div className="pb-4 sm:pb-5 flex items-center justify-between border-b border-white/10"><div className="flex items-center gap-3"><span className="text-xs font-mono font-semibold tracking-wider text-[#34D399] uppercase px-3.5 py-1 rounded-full bg-[#0E4D3A]/30 border border-[#0E4D3A]/50">{BEYOND_SERVICES[activeBeyondIndex].tag}</span><span className="text-xs text-white/50 hidden sm:inline">{activeBeyondIndex + 1} of {BEYOND_SERVICES.length}</span></div>{isBeyondCloserLook ? (<button type="button" onClick={() => setIsBeyondCloserLook(false)} aria-label="Close closer look" className="w-9 h-9 rounded-full bg-[#0E4D3A]/40 hover:bg-[#0E4D3A] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border border-[#34D399]/40"><X className="w-4 h-4 text-[#34D399]"/></button>) : (<button type="button" onClick={() => setIsBeyondCloserLook(true)} className="text-xs font-semibold text-white/80 hover:text-white uppercase tracking-wider flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#14231D] border border-white/10 hover:border-[#34D399] transition-all cursor-pointer"><span>Take a closer look</span><ChevronRight className="w-4 h-4 text-[#34D399]"/></button>)}</div><div className="relative min-h-[380px] sm:min-h-[440px] flex flex-col items-center justify-center px-4 py-8 sm:py-12 overflow-hidden"><div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#0E4D3A]/35 via-[#34D399]/25 to-transparent blur-3xl opacity-80"/></div><div className="relative z-10 flex items-center justify-center gap-3 sm:gap-6 md:gap-10 mb-8 sm:mb-10 w-full max-w-xl mx-auto px-2"><div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0"><AnimatePresence mode="wait">{activeBeyondIndex > 0 ? (<motion.button type="button" onClick={prevBeyond} aria-label={`Previous section: ${BEYOND_SERVICES[activeBeyondIndex - 1].title}`} title={`Previous: ${BEYOND_SERVICES[activeBeyondIndex - 1].title}`} initial={{ opacity: 0, scale: 0.7, x: -15 }} animate={{ opacity: 0.35, scale: 0.85, x: 0 }} exit={{ opacity: 0, scale: 0.7, x: -15 }} whileHover={{ opacity: 0.75, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#1C1C1E] backdrop-blur-md border border-white/10 hover:border-[#34D399] hover:bg-[#14231D] flex items-center justify-center shadow-lg cursor-pointer transition-all active:scale-90 group" key={`prev-${activeBeyondIndex - 1}`}>{React.createElement(BEYOND_SERVICES[activeBeyondIndex - 1].icon, {
        className: "w-7 h-7 sm:w-10 sm:h-10 text-white/70 group-hover:text-[#34D399] transition-colors",
    })}</motion.button>) : (<div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 invisible pointer-events-none"/>)}</AnimatePresence></div><div className="flex items-center justify-center shrink-0"><AnimatePresence mode="wait"><motion.div initial={{ opacity: 0, scale: 0.85, x: beyondDirection * 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.85, x: -beyondDirection * 30 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="relative flex items-center justify-center" key={activeBeyondIndex}><div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-[#14231D] border-2 border-[#34D399] flex items-center justify-center shadow-[0_0_50px_rgba(14,77,58,0.55)] relative">{React.createElement(BEYOND_SERVICES[activeBeyondIndex].icon, {
        className: "w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 text-[#34D399]",
    })}</div></motion.div></AnimatePresence></div><div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0"><AnimatePresence mode="wait">{activeBeyondIndex < BEYOND_SERVICES.length - 1 ? (<motion.button type="button" onClick={nextBeyond} aria-label={`Next section: ${BEYOND_SERVICES[activeBeyondIndex + 1].title}`} title={`Next: ${BEYOND_SERVICES[activeBeyondIndex + 1].title}`} initial={{ opacity: 0, scale: 0.7, x: 15 }} animate={{ opacity: 0.35, scale: 0.85, x: 0 }} exit={{ opacity: 0, scale: 0.7, x: 15 }} whileHover={{ opacity: 0.75, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#1C1C1E] backdrop-blur-md border border-white/10 hover:border-[#34D399] hover:bg-[#14231D] flex items-center justify-center shadow-lg cursor-pointer transition-all active:scale-90 group" key={`next-${activeBeyondIndex + 1}`}>{React.createElement(BEYOND_SERVICES[activeBeyondIndex + 1].icon, {
        className: "w-7 h-7 sm:w-10 sm:h-10 text-white/70 group-hover:text-[#34D399] transition-colors",
    })}</motion.button>) : (<div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 invisible pointer-events-none"/>)}</AnimatePresence></div></div><div className="w-full max-w-xl mx-auto relative z-20 px-2 sm:px-4"><div className="w-full rounded-[22px] sm:rounded-[26px] bg-[#14231D]/80 backdrop-blur-2xl border border-[#34D399]/30 p-5 sm:p-6 shadow-[0_20px_50px_rgba(14,77,58,0.3)] overflow-hidden min-h-[110px] flex items-center"><AnimatePresence mode="wait"><motion.div initial={{ opacity: 0, y: 8, x: beyondDirection * 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -8, x: -beyondDirection * 20 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="w-full" key={activeBeyondIndex}><p className="text-base sm:text-lg leading-relaxed"><strong className="text-white font-bold text-lg sm:text-2xl block sm:inline mr-2 mb-1.5 sm:mb-0 tracking-tight">{BEYOND_SERVICES[activeBeyondIndex].title}.</strong> <span className="text-[#D2D2D7] font-semibold text-base sm:text-lg leading-relaxed tracking-normal">{BEYOND_SERVICES[activeBeyondIndex].desc}</span></p></motion.div></AnimatePresence></div></div></div><div className="py-3"><div ref={beyondPillsContainerRef} className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 scroll-smooth">{BEYOND_SERVICES.map((service, idx) => {
        const isSelected = idx === activeBeyondIndex;
        return (<button ref={(el) => {
            beyondPillsRef.current[idx] = el;
        }} type="button" onClick={() => selectBeyond(idx)} className={`rounded-full px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-medium border flex items-center gap-2 transition-all shrink-0 cursor-pointer active:scale-95 ${isSelected
            ? "bg-[#0E4D3A] text-white border-[#34D399] font-semibold shadow-[0_4px_20px_rgba(14,77,58,0.45)]"
            : "bg-[#1C1C1E] hover:bg-[#14231D] text-white/90 border-white/15 hover:border-[#34D399]"}`} key={service.title}><Plus className={`w-3.5 h-3.5 ${isSelected ? "text-[#34D399]" : "text-[#34D399]"}`}/><span>{service.title}</span></button>);
    })}</div></div><div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"><div className="flex items-center justify-start hidden sm:flex"><span className="text-xs text-white/50 font-mono tracking-wider">Phase {String(activeBeyondIndex + 1).padStart(2, "0")} of {String(BEYOND_SERVICES.length).padStart(2, "0")}</span></div><div className="flex items-center justify-center gap-2 sm:gap-2.5 py-1">{BEYOND_SERVICES.map((service, idx) => {
        const isActive = idx === activeBeyondIndex;
        return (<button type="button" onClick={() => selectBeyond(idx)} aria-label={`Go to ${service.title}`} className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center py-1 px-0.5" key={service.title}><div className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
            ? "w-8 sm:w-11 bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.6)]"
            : "w-3.5 sm:w-4 bg-white/30 hover:bg-white/55"}`}/></button>);
    })}</div><div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-2.5"><button type="button" onClick={prevBeyond} disabled={activeBeyondIndex === 0} aria-label="Previous service" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#0E4D3A] hover:border-[#34D399] active:scale-95 border border-white/20 text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-xs shrink-0"><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5"/></button><button type="button" onClick={nextBeyond} disabled={activeBeyondIndex === BEYOND_SERVICES.length - 1} aria-label="Next service" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#0E4D3A] hover:border-[#34D399] active:scale-95 border border-white/20 text-white flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-xs shrink-0"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5"/></button></div></div></div></Reveal></div></section><section className="section-editorial border-b border-[#D2D2D7] py-20 md:py-28 bg-white text-[#1D1D1F]"><div className="darshai-container"><Reveal><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative"><div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between"><div><p className="typography-eyebrow text-[#1D4ED8] mb-2 uppercase tracking-[0.2em] font-semibold text-xs">TRUST</p><h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111] leading-[1.15] tracking-tight mb-2">Built On Professional Standards.</h2><p className="text-xs sm:text-sm text-[#6E6E73] font-medium leading-relaxed mb-6">Institutional governance, operational audits, and clinical credentials underpinning every enterprise partnership.</p><div className="divide-y divide-[#D2D2D7] border-y border-[#D2D2D7]">{TRUST_PRINCIPLES.map((principle, idx) => {
        const isSelected = selectedTrustIndex === idx;
        const Icon = principle.icon;
        return (<button type="button" onClick={() => setSelectedTrustIndex(idx)} onMouseEnter={() => setSelectedTrustIndex(idx)} className={`w-full text-left py-3 sm:py-3.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${isSelected
            ? "bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/30 shadow-sm"
            : "hover:bg-[#F5F5F7] text-[#1D1D1F]"}`} key={principle.num}><div className="flex items-center gap-3 min-w-0"><span className={`text-xs font-mono font-bold tracking-wider shrink-0 transition-colors ${isSelected ? "text-[#1D4ED8]" : "text-[#86868B]"}`}>{principle.num}</span><span className={`text-sm sm:text-base tracking-tight truncate transition-colors ${isSelected
            ? "text-[#1D4ED8] font-bold"
            : "text-[#1D1D1F] font-medium group-hover:text-[#1D4ED8]"}`}>{principle.title}</span></div><div className="flex items-center gap-2 shrink-0"><Icon className={`w-4 h-4 transition-colors ${isSelected
            ? "text-[#1D4ED8] stroke-[2.2]"
            : "text-[#86868B] group-hover:text-[#1D4ED8]"}`}/><ChevronRight className={`w-4 h-4 transition-all duration-200 ${isSelected
            ? "text-[#1D4ED8] translate-x-0.5 opacity-100"
            : "text-[#86868B]/40 opacity-0 group-hover:opacity-100"}`}/></div></button>);
    })}</div></div><div className="pt-6 hidden lg:flex items-center justify-between text-xs text-[#6E6E73]"><span>Select any principle to review visual proof</span><span className="font-mono text-[#1D4ED8] font-semibold">{String(selectedTrustIndex + 1).padStart(2, "0")} / 07</span></div></div><div className="order-1 lg:order-2 lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[600px] bg-[#111112] rounded-[24px] sm:rounded-[32px] overflow-hidden flex flex-col justify-end shadow-xl border border-[#D2D2D7]/50"><AnimatePresence mode="wait"><motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0" key={selectedTrustIndex}><SmartImage src={TRUST_PRINCIPLES[selectedTrustIndex].image} alt={TRUST_PRINCIPLES[selectedTrustIndex].visualTitle} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 pointer-events-none"/><div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none"/><div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/35 pointer-events-none"/></motion.div></AnimatePresence><div className="absolute top-5 right-5 z-20 pointer-events-none"><div className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg"><span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse"/><span>Standard {TRUST_PRINCIPLES[selectedTrustIndex].num} Proof</span></div></div><div className="relative z-20 p-6 sm:p-8 lg:p-10 text-white"><AnimatePresence mode="wait"><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} key={selectedTrustIndex}><div className="mb-2.5 flex items-center gap-2.5"><SignalBadge variant="dark" dot>{TRUST_PRINCIPLES[selectedTrustIndex].tag}</SignalBadge><span className="text-xs text-white/60 font-mono tracking-wider">Verified Protocol</span></div><h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">{TRUST_PRINCIPLES[selectedTrustIndex].visualTitle}</h3><p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl font-normal">{TRUST_PRINCIPLES[selectedTrustIndex].description}</p></motion.div></AnimatePresence></div></div></div></Reveal></div></section><section className="section-editorial border-b border-[#D2D2D7] py-28 md:py-36 bg-white"><div className="darshai-container"><Reveal><div className="max-w-4xl mb-16 text-center mx-auto"><p className="typography-eyebrow text-[#0E4D3A] mb-3 uppercase tracking-[0.2em] font-bold text-xs">HOW IT WORKS</p><h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] leading-[1.12] tracking-tight">A Structured Corporate Engagement Process.</h2></div></Reveal><Reveal delay={0.1}><div className="max-w-[1280px] mx-auto"><div className="hidden lg:flex items-start justify-between w-full">{[
        { title: "Consultation", icon: Calendar },
        { title: "Needs Assessment", icon: Activity },
        { title: "Wellness Objectives", icon: Compass },
        { title: "Journey Design", icon: Layers },
        { title: "Proposal", icon: FileText },
        { title: "Coordination", icon: Building2 },
        { title: "Journey Delivery", icon: ShieldCheck },
        { title: "Follow-Up", icon: CheckCircle2 },
    ].map((step, idx, arr) => {
        const Icon = step.icon;
        const isLast = idx === arr.length - 1;
        return (<><div className="flex flex-col items-center text-center group cursor-pointer w-24 shrink-0"><div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAFAFA] border border-[#E5E5EA]/80 group-hover:bg-[#0E4D3A] group-hover:border-[#0E4D3A] group-hover:shadow-[0_8px_24px_rgba(14,77,58,0.25)] flex items-center justify-center text-black group-hover:text-white mb-4 transition-all duration-300 group-hover:scale-105 shadow-2xs"><Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black group-hover:text-white stroke-[2.5] transition-colors duration-300"/></div><span className="font-display text-xs sm:text-sm font-bold text-[#111111] group-hover:text-[#0E4D3A] transition-colors duration-300 leading-snug">{step.title}</span></div>{!isLast && (<div className="flex-1 flex items-center justify-center px-1 pt-8 pointer-events-none"><div className="w-full h-[2px] bg-gradient-to-r from-[#D2D2D7] via-[#0E4D3A]/60 to-[#0E4D3A] rounded-full relative overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-90"/></div><ChevronRight className="w-4 h-4 text-[#0E4D3A] stroke-[2.5] -ml-1 shrink-0"/></div>)}</>);
    })}</div><div className="flex lg:hidden flex-col items-center justify-center w-full max-w-sm mx-auto">{[
        { title: "Consultation", icon: Calendar },
        { title: "Needs Assessment", icon: Activity },
        { title: "Wellness Objectives", icon: Compass },
        { title: "Journey Design", icon: Layers },
        { title: "Proposal", icon: FileText },
        { title: "Coordination", icon: Building2 },
        { title: "Journey Delivery", icon: ShieldCheck },
        { title: "Follow-Up", icon: CheckCircle2 },
    ].map((step, idx, arr) => {
        const Icon = step.icon;
        const isLast = idx === arr.length - 1;
        return (<><div className="flex flex-col items-center text-center group cursor-pointer w-full py-2"><div className="w-20 h-20 rounded-2xl bg-[#FAFAFA] border border-[#E5E5EA]/80 group-hover:bg-[#0E4D3A] group-hover:border-[#0E4D3A] group-hover:shadow-[0_8px_24px_rgba(14,77,58,0.25)] flex items-center justify-center text-black group-hover:text-white mb-3 transition-all duration-300 group-hover:scale-105 shadow-2xs"><Icon className="w-8 h-8 text-black group-hover:text-white stroke-[2.5] transition-colors duration-300"/></div><span className="font-display text-base font-bold text-[#111111] group-hover:text-[#0E4D3A] transition-colors duration-300 leading-snug">{step.title}</span></div>{!isLast && (<div className="flex flex-col items-center justify-center my-2 py-1 pointer-events-none"><div className="w-[2px] h-9 bg-gradient-to-b from-[#D2D2D7] via-[#0E4D3A]/60 to-[#0E4D3A] rounded-full relative overflow-hidden"><motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-[#34D399] to-transparent opacity-90"/></div><ChevronRight className="w-4 h-4 text-[#0E4D3A] stroke-[2.5] rotate-90 -mt-1 shrink-0"/></div>)}</>);
    })}</div></div></Reveal></div></section><FinalCTA id="corporate-final-cta" eyebrow={<span className="inline-flex items-center gap-2 justify-center"><span className="w-5 h-5 rounded-full bg-black text-white font-bold text-[10px] flex items-center justify-center border border-white/20 shadow-xs">D</span><span>CORPORATE GEO-WELLNESS</span></span>} heading="Support The People Responsible For Leading." description="Discover how personalized Geo-Wellness journeys can support recovery, resilience and sustainable performance across leadership teams and organizations." descriptionClassName="font-bold text-[#D2D2D7] text-lg sm:text-xl md:text-[22px] max-w-3xl mb-10 leading-relaxed mx-auto text-center drop-shadow-xs [word-spacing:0.08em] tracking-normal" buttonText="REQUEST CORPORATE CONSULTATION" buttonOnClick={() => {
        track("consultation_request", { source: "corporate_final_cta" });
        track("begin_journey", { source: "corporate_final_cta" });
        navigateTo("contact");
    }} bgImage="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&auto=format&fit=crop&q=80"/></main>);
}
export default CorporatePage;
