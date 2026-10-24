import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import ScrollCue from "../../components/darshaiNew/ScrollCue";
import {
  Compass,
  ArrowRight,
  BookOpen,
  X,
  Activity,
  Trees,
  Sliders,
  ChevronRight,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const articlesData = [
  {
    id: "what-is-geo-wellness",
    cat: "GEO-WELLNESS",
    theme: "Geo-Wellness",
    time: "3–4 MIN READ",
    title: "What Is Geo-Wellness?",
    summary:
      "A way of considering the person, the programme and the place together.",
    date: "September 2026",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop&auto=format",
    author: "Veekshitha V",
    authorRole: "Founder & CEO, DARSHAI",
    fullContent: [
      "Wellness journeys can involve many elements: daily routines, movement, rest, nutrition, practitioner guidance and time away from everyday demands. Geo-Wellness adds another consideration to this picture: the environment in which the journey takes place.",
      "Environment includes more than scenery. It can involve temperature, humidity, air quality, daylight, noise, terrain, access to nature, privacy and the practical conditions of a stay. These factors do not affect every person in the same way, and their importance depends on the purpose and requirements of the journey.",
      "DARSHAI uses Geo-Wellness as a framework for considering these elements together. The starting point is understanding the individual's goals and preferences. The next step is to consider suitable programmes and environments, review relevant requirements, and identify partner centres whose capabilities align with the intended journey.",
      "The process does not assume that a particular location can diagnose, prevent or treat a health condition. Nor does it suggest that nature alone guarantees a better outcome. Environmental context is one part of a broader decision.",
      "A useful Geo-Wellness process can be expressed in five steps: assess, personalise, match, experience and follow up. Each stage connects the individual's requirements with practical planning and appropriate professional input.",
      "The aim is not to find one perfect place for everyone. It is to make the selection of a wellness journey more considered, transparent and individual.",
      "Geo-Wellness begins with a simple question: what matters about the person, the programme and the place?",
    ],
  },
  {
    id: "why-environment-matters",
    cat: "ENVIRONMENT & WELLBEING",
    theme: "Environment & Wellbeing",
    time: "4–5 MIN READ",
    title: "Why Environment Matters More Than Most Wellness Plans Realise.",
    summary: "Wellbeing takes place in real-world conditions.",
    date: "August 2026",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85",
    author: "DARSHAI Editorial",
    authorRole: "Public Health Lead",
    fullContent: [
      "A wellness plan may include time for rest, movement, reflection or practitioner-led activities. Yet the surroundings in which those activities occur can influence comfort, access and the overall experience.",
      "Consider temperature and humidity. Excessive heat is a recognised health risk, and the World Health Organization explains that heat exposure can place strain on the body and worsen some existing health conditions. Air quality, noise and access to comfortable indoor spaces also matter when planning a stay.",
      "Natural surroundings deserve consideration too. Research reviewed by public health organisations has explored relationships between green spaces, physical activity, relaxation and mental wellbeing. The findings are encouraging in several areas, but they do not establish a single environment as the best choice for every person.",
      "This is why environment should be assessed rather than romanticised. A beautiful location may still be unsuitable if its climate, terrain, accessibility, facilities or available programme do not meet an individual's needs.",
      "A practical review considers the person's goals and preferences, the environmental conditions, the programme's requirements, the centre's capabilities and the logistics of the stay. Where health considerations are relevant, qualified professional input remains essential.",
      "Environment is not a replacement for a suitable programme. It is one of the conditions that helps determine whether the planned experience makes sense for the individual.",
      "The better question is not whether a place is beautiful, but whether its conditions and capabilities fit the intended journey.",
      "Further reading: WHO — Assessing green and blue spaces for health and wellbeing",
    ],
  },
  {
    id: "the-future-of-executive-recovery",
    cat: "EXECUTIVE WELLNESS",
    theme: "Executive Wellness",
    time: "4–5 MIN READ",
    title: "The Future of Executive Recovery.",
    summary: "Recovery needs to be designed around real working lives.",
    date: "August 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=85",
    author: "DARSHAI Editorial",
    authorRole: "Executive Wellbeing Advisor",
    fullContent: [
      "Leaders and senior professionals often work within demanding schedules, complex decisions and responsibilities that continue beyond the office. For them, a wellness experience must be more than an attractive break on a calendar.",
      "A considered approach begins with the person and the context. What does the individual want to address? How much time is available? What level of structure is appropriate? Are privacy, accessibility, travel time or dietary requirements important? What professional guidance is needed before a programme is selected?",
      "These questions shape the design of a journey. They also help distinguish a generic retreat recommendation from an experience planned around an individual's requirements.",
      "Environment matters here, but it should not become a shortcut for making promises. A mountain view or a quiet campus cannot, by itself, guarantee improved performance, prevent burnout or resolve a health concern. Workload, personal circumstances, programme suitability and the quality of support remain important considerations.",
      "For organisations, the same principle applies at a group level. A programme should account for cohort needs, timing, confidentiality, accessibility, operational requirements and the organisation's objectives. It should also be clear about what is included, what is optional and what follow-up will be available.",
      "DARSHAI's corporate approach is to coordinate these decisions through assessment, programme and environment matching, planning and agreed continuity support.",
      "The future of executive recovery is not simply more wellness activities. It is more considered planning around the people who need them.",
    ],
  },
  {
    id: "can-wellness-be-personalised",
    cat: "WELLNESS INTELLIGENCE",
    theme: "Wellness Intelligence",
    time: "4 MIN READ",
    title: "Can Wellness Be Personalised Through Environment?",
    summary: "Personalisation starts with the right questions.",
    date: "July 2026",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=85",
    author: "DARSHAI Editorial",
    authorRole: "Clinical Intelligence Director",
    fullContent: [
      "Personalised wellness is often associated with choosing activities, routines or programme durations around individual goals. Environmental preferences can add another useful layer to this decision.",
      "One person may prefer a quiet, nature-led setting. Another may need easy access, a specific room arrangement or a location that supports practical travel requirements. Climate, terrain, privacy, food requirements and the available facilities may all influence whether a proposed setting is appropriate.",
      "These preferences are not a diagnosis, and they should not be treated as proof that a particular environment will produce a specific health outcome. Instead, they help guide the questions that need to be asked before a journey is recommended.",
      "A structured process considers the individual's goals, relevant health context, preferences, intended duration and budget. It then checks the capabilities of the programme and centre, the suitability of the setting, and the availability of the required arrangements.",
      "This is where wellness intelligence can support decision-making. Information becomes useful when it helps people understand the factors being considered, the reasons behind a recommendation and the limitations that still need to be reviewed.",
      "Personalisation does not mean that every detail can be predicted or that every preference can always be accommodated. It means making the decision process more explicit, relevant and transparent.",
      "The goal is not to automate judgement. It is to support better-informed decisions, with appropriate professional input where needed.",
    ],
  },
  {
    id: "why-matching-matters",
    cat: "DARSHAI PERSPECTIVES",
    theme: "DARSHAI Perspectives",
    time: "4 MIN READ",
    title: "Why Matching Matters More Than Choice.",
    summary: "More options do not automatically lead to better decisions.",
    date: "July 2026",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=85",
    author: "DARSHAI Editorial",
    authorRole: "Founder & CEO, DARSHAI",
    fullContent: [
      "Finding a wellness centre or programme can be overwhelming when every option presents a different combination of therapies, facilities, surroundings and claims. A longer list does not necessarily make the decision easier.",
      "A more useful approach begins with clear requirements. What is the purpose of the journey? What duration is realistic? Which programme capabilities are needed? Are there health, mobility, dietary or privacy considerations? What budget and travel constraints must be respected?",
      "Once these questions are understood, the available options can be reviewed against relevant criteria. Programme capability, individual suitability, environmental conditions, accommodation, operational readiness and confirmed availability all matter. The reasons for recommending an option should be understandable to the client.",
      "Matching also requires restraint. A centre should not be described as suitable for a specific condition merely because it offers a related therapy. Claims about clinical suitability require appropriate professional review, and advertised offerings must be confirmed with the centre.",
      "At DARSHAI, the intention is to guide the client through a structured process rather than leave them to interpret a directory alone. The recommendation should connect the individual's needs with a programme and setting that can be considered responsibly.",
      "The process should also make limitations clear. If availability is uncertain, an offering has not been verified or a professional assessment is required, that should be communicated before a decision is finalised.",
      "Good matching is not about presenting the most options. It is about making the relevant options easier to understand and evaluate.",
    ],
  },
];
const KNOWLEDGE_PILLARS = [
  {
    num: "01",
    id: "Geo-Wellness",
    title: "GEO-WELLNESS",
    tag: "01 — GEO-WELLNESS",
    articleId: "what-is-geo-wellness",
    headline: "What Is Geo-Wellness?",
    description:
      "Explore how geography, climate, natural surroundings and environmental context may influence a wellness experience.",
    metric: "ESTIMATED 3–4 MIN READ",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85",
    categoryArticles: [
      {
        id: "what-is-geo-wellness",
        title: "What Is Geo-Wellness?",
        readTime: "3–4 min read",
      },
      {
        id: "the-missing-variable-in-wellness-may-be-geography",
        title: "The Missing Variable in Wellness May Be Geography",
        readTime: "5–7 min read",
      },
    ],
  },
  {
    num: "02",
    id: "Longevity",
    title: "LONGEVITY",
    tag: "02 — LONGEVITY",
    articleId: "why-environment-matters",
    headline: "Why Environment Matters More Than Most Wellness Plans Realise.",
    description:
      "Explore healthy ageing, sustainable routines, resilience and the foundations of long-term wellbeing.",
    metric: "ESTIMATED 4–5 MIN READ",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85",
    categoryArticles: [
      {
        id: "why-environment-matters",
        title: "Why Environment Matters More Than Most Wellness Plans Realise",
        readTime: "4–5 min read",
      },
    ],
  },
  {
    num: "03",
    id: "Executive Wellness",
    title: "EXECUTIVE WELLNESS",
    tag: "03 — EXECUTIVE WELLNESS",
    articleId: "the-future-of-executive-recovery",
    headline: "The Future of Executive Recovery.",
    description:
      "Explore recovery, workload, decision fatigue and wellbeing considerations for people in high-responsibility roles.",
    metric: "ESTIMATED 4–5 MIN READ",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=85",
    categoryArticles: [
      {
        id: "the-future-of-executive-recovery",
        title: "The Future of Executive Recovery",
        readTime: "4–5 min read",
      },
    ],
  },
  {
    num: "04",
    id: "Wellness Intelligence",
    title: "WELLNESS INTELLIGENCE",
    tag: "04 — WELLNESS INTELLIGENCE",
    articleId: "can-wellness-be-personalised",
    headline: "Can Wellness Be Personalised Through Environment?",
    description:
      "Explore assessment, personalisation, decision systems and the role of data and technology in wellness planning.",
    metric: "ESTIMATED 4 MIN READ",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=85",
    categoryArticles: [
      {
        id: "can-wellness-be-personalised",
        title: "Can Wellness Be Personalised Through Environment?",
        readTime: "4 min read",
      },
    ],
  },
  {
    num: "05",
    id: "DARSHAI Perspectives",
    title: "DARSHAI PERSPECTIVES",
    tag: "05 — DARSHAI PERSPECTIVES",
    articleId: "why-matching-matters",
    headline: "Why Matching Matters More Than Choice.",
    description:
      "Explore founder thinking, industry developments and the ideas behind DARSHAI's Geo-Wellness approach.",
    metric: "ESTIMATED 4 MIN READ",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=85",
    categoryArticles: [
      {
        id: "why-matching-matters",
        title: "Why Matching Matters More Than Choice",
        readTime: "4 min read",
      },
    ],
  },
];
const seriesChapters = [
  {
    id: "what-is-geo-wellness-and-why-does-place-matter",
    step: "01",
    readTime: "5 MIN READ",
    category: "FOUNDATIONS",
    title: "What Is Geo-Wellness and Why Does Place Matter?",
    desc: "A different way to think about personalised wellness—exploring how personal goals, wellness programmes and environmental context come together.",
    tag: "CHAPTER 01",
    icon: BookOpen,
  },
  {
    id: "your-environment-is-part-of-the-wellness-experience",
    step: "02",
    readTime: "6 MIN READ",
    category: "ENVIRONMENT",
    title: "Your Environment Is Part of the Wellness Experience",
    desc: "The details of a place can matter more than its photographs suggest—from air quality and noise levels to privacy and light.",
    tag: "CHAPTER 02",
    icon: Activity,
  },
  {
    id: "does-climate-matter-when-choosing-a-wellness-destination",
    step: "03",
    readTime: "6 MIN READ",
    category: "CLIMATE",
    title: "Does Climate Matter When Choosing a Wellness Destination?",
    desc: "Understanding temperature, humidity and seasonal conditions before you travel.",
    tag: "CHAPTER 03",
    icon: Compass,
  },
  {
    id: "beyond-scenery-why-nature-and-quiet-matter",
    step: "04",
    readTime: "6 MIN READ",
    category: "NATURE & QUIET",
    title: "Beyond Scenery: Why Nature and Quiet Matter",
    desc: "Looking at natural settings as part of the wellness experience—not as a promise of results.",
    tag: "CHAPTER 04",
    icon: Trees,
  },
  {
    id: "from-wellness-goals-to-the-right-place-how-personalisation-works",
    step: "05",
    readTime: "6 MIN READ",
    category: "PERSONALISATION",
    title: "From Wellness Goals to the Right Place: How Personalisation Works",
    desc: "Bringing the person, the programme and the environment into one considered plan.",
    tag: "CHAPTER 05",
    icon: Sliders,
  },
  {
    id: "the-future-of-wellness-may-be-more-place-aware",
    step: "06",
    readTime: "6 MIN READ",
    category: "FUTURE OF WELLNESS",
    title: "The Future of Wellness May Be More Place-Aware",
    desc: "The opportunities, questions and responsibilities of bringing environmental context into wellness planning.",
    tag: "CHAPTER 06",
    icon: Compass,
  },
];
const editorialStatements = [
  {
    num: "01",
    statement: "Insights are educational.",
    subDetail:
      "Articles, research summaries, and editorial publications are designed to inform and build understanding around Geo-Wellness frameworks.",
    scopeTag: "EDUCATIONAL SCOPE",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "02",
    statement: "Content is not medical advice.",
    subDetail:
      "Publications do not constitute formal medical diagnosis, clinical prescription, or individual therapeutic directives.",
    scopeTag: "CLINICAL BOUNDARY",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "03",
    statement: "Recommendations require individual assessment.",
    subDetail:
      "Sanctuary and microclimate matches require structured personal health intake and intake profiling before journey formulation.",
    scopeTag: "ASSESSMENT METHODOLOGY",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "04",
    statement: "Partner selection follows structured review processes.",
    subDetail:
      "Retreat partners and clinical facilities undergo structured on-site audits, credential verification, and ongoing quality reviews.",
    scopeTag: "PARTNER GOVERNANCE",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85",
  },
];
export function InsightsPage({ onNavigate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTheme = searchParams.get("category");
  const selectedTheme =
    rawTheme && KNOWLEDGE_PILLARS.some((p) => p.id === rawTheme)
      ? rawTheme
      : "all";
  // Section 02 Featured Insight Scroll Story Ref
  const featuredSceneRef = useRef(null);
  const { scrollYProgress: featuredScrollProgress } = useScroll({
    target: featuredSceneRef,
    offset: ["start start", "end end"],
  });
  // Section 03 Knowledge Categories Scroll Ref
  const categoriesSectionRef = useRef(null);
  const { scrollYProgress: categoriesScrollProgress } = useScroll({
    target: categoriesSectionRef,
    offset: ["start start", "end end"],
  });
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  // Section 05 Geo-Wellness Series Scroll Track Ref
  const seriesSectionRef = useRef(null);
  const { scrollYProgress: seriesScrollProgress } = useScroll({
    target: seriesSectionRef,
    offset: ["start start", "end end"],
  });
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [seriesPage, setSeriesPage] = useState(0);
  // Section 09 Editorial Principles State
  const [activeStatementIndex, setActiveStatementIndex] = useState(0);
  // Selected series chapter modal
  const [selectedSeriesItem, setSelectedSeriesItem] = useState(null);
  // Selected Article Modal State
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  // Editorial Index Expand/Collapse State
  const [showAllEditorialArticles, setShowAllEditorialArticles] =
    useState(false);
  const shouldReduceMotion = useReducedMotion();
  // Handle Featured Insight Progressive Disclosure Scroll Interpolation
  const featuredImageScale = useTransform(
    featuredScrollProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.0, 1.025],
  );
  const featuredImageY = useTransform(
    featuredScrollProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-1.5%"],
  );
  const featuredMetaOpacity = useTransform(
    featuredScrollProgress,
    [0.05, 0.22],
    [0, 1],
  );
  const featuredMetaY = useTransform(
    featuredScrollProgress,
    [0.05, 0.22],
    [14, 0],
  );
  const featuredHeadlineOpacity = useTransform(
    featuredScrollProgress,
    [0.2, 0.45],
    [0, 1],
  );
  const featuredHeadlineY = useTransform(
    featuredScrollProgress,
    [0.2, 0.45],
    [16, 0],
  );
  const featuredSummaryOpacity = useTransform(
    featuredScrollProgress,
    [0.42, 0.7],
    [0, 1],
  );
  const featuredSummaryY = useTransform(
    featuredScrollProgress,
    [0.42, 0.7],
    [14, 0],
  );
  const featuredCtaOpacity = useTransform(
    featuredScrollProgress,
    [0.68, 0.92],
    [0, 1],
  );
  const featuredCtaY = useTransform(
    featuredScrollProgress,
    [0.68, 0.92],
    [12, 0],
  );
  const featuredProgressLine = useTransform(
    featuredScrollProgress,
    [0.05, 0.95],
    ["0%", "100%"],
  );
  // Horizontal Chapter Rail Transformation (Desktop sticky scene)
  // Maps 0.0 -> 1.0 vertical scroll progress to 0% -> -78% horizontal rail shift
  const seriesHorizontalX = useTransform(
    seriesScrollProgress,
    [0.05, 0.95],
    ["0%", "-68%"],
  );
  const seriesProgressLineWidth = useTransform(
    seriesScrollProgress,
    [0.05, 0.95],
    ["0%", "100%"],
  );
  // Section 05 Geo-Wellness Series Scroll Track Ref & Animation (matching The Darshai Method)
  const seriesTrackRef = useRef(null);
  const [seriesTranslateX, setSeriesTranslateX] = useState(0);
  const handleSeriesScroll = useCallback(() => {
    if (
      !seriesSectionRef.current ||
      !seriesTrackRef.current ||
      window.innerWidth < 1024
    ) {
      return;
    }
    const rect = seriesSectionRef.current.getBoundingClientRect();
    const sectionHeight = seriesSectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = sectionHeight - windowHeight;
    if (totalScrollableDistance <= 0) return;
    const currentProgress = Math.min(
      Math.max(0, -rect.top / totalScrollableDistance),
      1,
    );
    const trackWidth = seriesTrackRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const maxDistance = Math.max(0, trackWidth - windowWidth + 120);
    setSeriesTranslateX(currentProgress * maxDistance);
    const step = Math.min(
      Math.floor(currentProgress * seriesChapters.length),
      seriesChapters.length - 1,
    );
    setActiveChapterIndex(step);
  }, []);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleSeriesScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleSeriesScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleSeriesScroll]);
  const goToChapterStep = (index) => {
    const clamped = Math.max(0, Math.min(index, seriesChapters.length - 1));
    setActiveChapterIndex(clamped);
    if (window.innerWidth >= 1024 && seriesSectionRef.current) {
      const rect = seriesSectionRef.current.getBoundingClientRect();
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = rect.top + currentScrollY;
      const scrollableDistance =
        seriesSectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll =
        sectionTop +
        (clamped / (seriesChapters.length - 1)) * scrollableDistance;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };
  // Track active chapter index based on scroll position
  useEffect(() => {
    return seriesScrollProgress.on("change", (latest) => {
      if (latest < 0.18) setActiveChapterIndex(0);
      else if (latest < 0.35) setActiveChapterIndex(1);
      else if (latest < 0.52) setActiveChapterIndex(2);
      else if (latest < 0.69) setActiveChapterIndex(3);
      else if (latest < 0.86) setActiveChapterIndex(4);
      else setActiveChapterIndex(5);
    });
  }, [seriesScrollProgress]);
  // Track active Knowledge Pillar category index based on scroll position
  useEffect(() => {
    return categoriesScrollProgress.on("change", (latest) => {
      if (latest < 0.18) setActiveCategoryIndex(0);
      else if (latest < 0.38) setActiveCategoryIndex(1);
      else if (latest < 0.58) setActiveCategoryIndex(2);
      else if (latest < 0.78) setActiveCategoryIndex(3);
      else setActiveCategoryIndex(4);
    });
  }, [categoriesScrollProgress]);
  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  const filteredArticles =
    selectedTheme === "all"
      ? articlesData
      : articlesData.filter((art) => art.theme === selectedTheme);
  const leadArticle = filteredArticles[0] || articlesData[0];
  const subsequentArticles = filteredArticles.slice(1);
  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F] font-sans selection:bg-[#0E4D3A]/20 selection:text-[#1D1D1F]">
      <section
        id="insights-hero"
        className="section-hero relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 md:pb-28 text-center origin-center will-change-transform bg-[#0A1612]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.05, opacity: 0.8 }}
            animate={{ scale: 1.0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full will-change-transform"
          >
            <SmartImage
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1200&fit=crop&auto=format"
              alt="Panoramic alpine sanctuary landscape representing Geo-Wellness research context"
              priority
              sizes="100vw"
              className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>
        <div className="relative z-10 darshai-container w-full">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5 sm:mb-6 mx-auto shadow-lg">
                <p
                  id="insights-hero-eyebrow"
                  className="typography-eyebrow text-[#C6A660]"
                >
                  DARSHAI RESEARCH & INSIGHTS
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1
                id="insights-hero-heading"
                className="typography-hero-display text-white max-w-4xl xl:max-w-5xl mb-6 sm:mb-8 mx-auto text-center drop-shadow-lg"
              >
                <span className="text-white">Ideas Shaping </span>
                <span className="text-[#34D399]">the Future of Wellness.</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-3xl sm:max-w-4xl mb-10 sm:mb-12 mx-auto text-center"
            >
              <p
                id="insights-hero-supporting-copy"
                className="typography-lead text-[#D2D2D7] leading-relaxed tracking-normal drop-shadow-sm"
              >
                Research, perspectives and analysis on Geo-Wellness, longevity,
                wellness intelligence, and how regional environments directly
                influence human recovery and long-term wellbeing.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center mb-8 mx-auto w-full sm:w-auto">
                <button
                  type="button"
                  id="insights-hero-cta"
                  onClick={() => {
                    track("explore_insights", { source: "insights_hero" });
                    scrollToSection("featured-insight");
                  }}
                  className="typography-ui-button h-14 sm:h-16 px-8 sm:px-10 md:px-12 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white shadow-xl hover:shadow-2xl font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group w-full sm:w-auto"
                >
                  <span>EXPLORE LATEST INSIGHTS</span>
                  <span
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-10 pointer-events-auto">
          <ScrollCue targetId="featured-insight" />
        </div>
      </section>
      <section
        ref={featuredSceneRef}
        id="featured-insight"
        aria-label="Featured Research Insight"
        className="relative bg-white border-b border-[#D2D2D7] py-16 sm:py-24"
      >
        <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-6 sm:mb-8 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0E4D3A]" />
                <p className="typography-eyebrow text-[#0E4D3A]">
                  FEATURED ARTICLE
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span className="typography-caption text-[#86868B] uppercase">
                  Lead Story
                </span>
                <div className="w-28 h-1 bg-[#F5F5F7] border border-[#D2D2D7] rounded-full overflow-hidden">
                  <motion.div
                    style={{ width: featuredProgressLine }}
                    className="h-full bg-[#0E4D3A]"
                  />
                </div>
              </div>
            </div>
            <h2 className="typography-section-h2 text-[#1D1D1F]">
              The Missing Variable in Wellness May Be Geography.
            </h2>
          </div>
          <div className="w-full rounded-[24px] sm:rounded-[32px] border border-[#D2D2D7] bg-[#F9F9FB] overflow-hidden shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] flex flex-col group">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] bg-[#111111] overflow-hidden">
              <motion.div
                style={{ scale: featuredImageScale, y: featuredImageY }}
                className="w-full h-full will-change-transform"
              >
                <SmartImage
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&auto=format&fit=crop&q=85"
                  alt="The Missing Variable in Wellness May Be Geography"
                  priority
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className="typography-caption font-semibold px-3.5 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md uppercase tracking-wider">
                  GEO-WELLNESS LEAD ESSAY
                </span>
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:p-14 bg-white flex flex-col justify-between space-y-6">
              <div className="typography-caption flex flex-wrap items-center gap-2.5 text-[#6E6E73]">
                <span className="font-semibold px-3 py-1 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] tracking-wider uppercase">
                  FEATURED ARTICLE
                </span>
                <span>•</span>
                <span className="font-semibold text-[#0E4D3A] tracking-wider uppercase">
                  GEO-WELLNESS
                </span>
                <span>•</span>
                <span className="tabular-nums font-medium uppercase">
                  ESTIMATED 5–7 MIN READ
                </span>
              </div>
              <p className="typography-lead text-[#1D1D1F] font-medium leading-relaxed max-w-4xl">
                Wellness journeys often focus on what people do. DARSHAI
                explores another consideration: how the surrounding environment
                may shape the experience of a wellness journey.
              </p>
              <p className="typography-body text-[#555555] max-w-4xl leading-relaxed">
                A wellness programme does not take place in isolation. Climate,
                terrain, air quality, light, noise, access to nature and the
                character of a setting can influence the experience of a stay.
                Understanding these factors alongside personal goals and
                programme requirements offers a broader way to think about
                wellness planning.
              </p>
              <div className="pt-6 border-t border-[#D2D2D7] flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    track("read_featured_article", {
                      id: "the-missing-variable-in-wellness-may-be-geography",
                    });
                    onNavigate(
                      "/insights/the-missing-variable-in-wellness-may-be-geography",
                    );
                  }}
                  className="typography-ui-button px-7 py-3.5 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white font-semibold transition-all cursor-pointer group inline-flex items-center gap-2.5 shadow-md hover:shadow-lg"
                >
                  <span>READ THE FEATURED ARTICLE →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={categoriesSectionRef}
        id="knowledge-categories"
        className="relative min-h-[220vh] bg-[#F5F5F7] border-b border-[#D2D2D7]"
      >
        <div className="sticky top-16 sm:top-20 py-10 sm:py-16">
          <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mb-10 sm:mb-12 space-y-2">
              <p className="typography-eyebrow text-[#0E4D3A]">
                EXPLORE TOPICS
              </p>
              <h2 className="typography-section-h2 text-[#1D1D1F]">
                Explore by Knowledge Pillar.
              </h2>
              <p className="typography-lead text-[#555555]">
                Five perspectives on the questions shaping personalised
                wellness.
              </p>
            </div>
            <div className="lg:hidden flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
              {KNOWLEDGE_PILLARS.map((pillar, idx) => {
                const isActive = activeCategoryIndex === idx;
                return (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategoryIndex(idx);
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set("category", pillar.id);
                      setSearchParams(newParams, { replace: true });
                    }}
                    className={`shrink-0 px-4 py-2.5 rounded-full typography-caption font-semibold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#0E4D3A] text-white border-[#0E4D3A] shadow-xs"
                        : "bg-white text-[#48484A] border-[#D2D2D7] hover:bg-white/80"
                    }`}
                    key={pillar.id}
                  >
                    <span>
                      {pillar.num} — {pillar.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-2.5 self-center my-auto">
                {KNOWLEDGE_PILLARS.map((pillar, idx) => {
                  const isActive = activeCategoryIndex === idx;
                  return (
                    <button
                      type="button"
                      onMouseEnter={() => {
                        setActiveCategoryIndex(idx);
                      }}
                      onClick={() => {
                        setActiveCategoryIndex(idx);
                        const newParams = new URLSearchParams(searchParams);
                        newParams.set("category", pillar.id);
                        setSearchParams(newParams, { replace: true });
                        track("filter_theme", { theme: pillar.id });
                      }}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                        isActive
                          ? "bg-white border-[#D2D2D7] shadow-xs"
                          : "bg-transparent border-transparent hover:bg-white/60 opacity-60 hover:opacity-100"
                      }`}
                      key={pillar.id}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`typography-caption font-semibold px-2 py-0.5 rounded-md ${
                            isActive
                              ? "bg-[#0E4D3A] text-white"
                              : "bg-[#D2D2D7]/60 text-[#48484A]"
                          }`}
                        >
                          {pillar.num}
                        </span>
                        <span
                          className={`typography-card-title ${isActive ? "text-[#1D1D1F]" : "text-[#48484A]"}`}
                        >
                          {pillar.title}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${isActive ? "text-[#0E4D3A] translate-x-0.5" : "text-[#86868B] opacity-0"}`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[24px] border border-[#D2D2D7] overflow-hidden shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] relative min-h-[400px] flex flex-col justify-between">
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#F5F5F7] z-20">
                    <div
                      className="h-full bg-[#0E4D3A] transition-all duration-500 ease-out"
                      style={{
                        width: `${((activeCategoryIndex + 1) / KNOWLEDGE_PILLARS.length) * 100}%`,
                      }}
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col h-full"
                      key={KNOWLEDGE_PILLARS[activeCategoryIndex].id}
                    >
                      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] bg-[#111111] overflow-hidden border-b border-[#D2D2D7]/60">
                        <SmartImage
                          src={KNOWLEDGE_PILLARS[activeCategoryIndex].image}
                          alt={KNOWLEDGE_PILLARS[activeCategoryIndex].headline}
                          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-10">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full typography-caption font-semibold bg-black/60 backdrop-blur-md text-[#34D399] border border-white/20 shadow-md">
                            <span>
                              {KNOWLEDGE_PILLARS[activeCategoryIndex].tag}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 space-y-6">
                        <div className="space-y-4">
                          <h3 className="typography-h3 text-[#1D1D1F]">
                            {KNOWLEDGE_PILLARS[activeCategoryIndex].headline}
                          </h3>
                          <p className="typography-body text-[#48484A] leading-relaxed">
                            {KNOWLEDGE_PILLARS[activeCategoryIndex].description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[#D2D2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="typography-caption text-[#6E6E73] flex items-center gap-3">
                            <span className="uppercase font-semibold text-[#0E4D3A]">
                              Focus:{" "}
                              {KNOWLEDGE_PILLARS[activeCategoryIndex].metric}
                            </span>
                            <span>•</span>
                            <span>
                              Topic {KNOWLEDGE_PILLARS[activeCategoryIndex].num}{" "}
                              of 05
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onNavigate(
                                `/insights/pillar/${KNOWLEDGE_PILLARS[activeCategoryIndex].articleId}`,
                              )
                            }
                            className="typography-ui-button font-semibold px-6 py-3 rounded-full bg-[#0E4D3A] hover:bg-[#0A382A] text-white transition-all cursor-pointer group inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
                          >
                            <span>EXPLORE TOPIC →</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="articles"
        className="py-16 sm:py-24 bg-white border-b border-[#D2D2D7]"
      >
        <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <p className="typography-eyebrow text-[#0E4D3A] mb-2">
                EDITORIAL INDEX
              </p>
              <h2 className="typography-section-h2 text-[#1D1D1F]">
                Latest Insights & Publications.
              </h2>
            </div>
            {selectedTheme !== "all" && (
              <button
                type="button"
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("category");
                  setSearchParams(newParams, { replace: true });
                }}
                className="typography-caption font-semibold text-[#0E4D3A] hover:underline cursor-pointer self-start sm:self-auto"
              >
                Showing {selectedTheme} • Show all articles
              </button>
            )}
          </div>
          <article
            onClick={() => {
              track("read_article_card", {
                id: leadArticle.id,
                title: leadArticle.title,
              });
              onNavigate(`/insights/pillar/${leadArticle.id}`);
            }}
            className="mb-8 p-6 sm:p-8 lg:p-10 rounded-[28px] border-2 border-[#D2D2D7] hover:border-[#0E4D3A] bg-white hover:bg-[#F2F8F5] hover:shadow-[0_0_30px_rgba(14,77,58,0.2)] transition-all duration-300 cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs"
          >
            <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[16/9] rounded-[20px] overflow-hidden border border-[#D2D2D7]/80 bg-[#111111]">
              <SmartImage
                src={leadArticle.image}
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                <div className="typography-caption flex flex-wrap items-center gap-2.5 text-[#6E6E73]">
                  <span className="font-extrabold text-[#0E4D3A] uppercase tracking-wider">
                    {leadArticle.cat}
                  </span>
                  <span>•</span>
                  <span className="font-medium">{leadArticle.time}</span>
                </div>
                <h3 className="typography-h2 text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors leading-tight font-display font-bold">
                  {leadArticle.title}
                </h3>
                <p className="typography-body text-[#48484A] text-base sm:text-lg leading-relaxed font-normal">
                  {leadArticle.summary}
                </p>
              </div>
              <div className="pt-4 border-t border-[#D2D2D7]/70 flex items-center justify-between text-sm">
                <span className="typography-caption text-[#6E6E73] font-medium">
                  By {leadArticle.author} ({leadArticle.authorRole})
                </span>
                <span className="typography-caption inline-flex items-center gap-2 font-bold text-white bg-[#0E4D3A] px-5 py-2.5 rounded-full uppercase tracking-wider shadow-sm group-hover:bg-[#12614B] transition-colors">
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </article>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 my-6">
            {subsequentArticles.map((article) => (
              <article
                onClick={() => {
                  track("read_article_card", {
                    id: article.id,
                    title: article.title,
                  });
                  onNavigate(`/insights/pillar/${article.id}`);
                }}
                className="p-5 sm:p-7 rounded-[22px] border-2 border-[#D2D2D7] hover:border-[#0E4D3A] bg-white hover:bg-[#F2F8F5] hover:shadow-[0_0_25px_rgba(14,77,58,0.18)] transition-all duration-300 cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-xs"
                key={article.id}
              >
                <div className="md:w-1/4 shrink-0 typography-caption text-[#6E6E73] flex items-center gap-2">
                  <span className="font-extrabold text-[#0E4D3A] uppercase tracking-wider">
                    {article.cat}
                  </span>
                  <span>•</span>
                  <span className="font-medium text-[#555555]">
                    {article.time}
                  </span>
                </div>
                <div className="md:w-2/4 space-y-1.5">
                  <h4 className="typography-card-title text-[#1D1D1F] font-bold text-lg sm:text-xl group-hover:text-[#0E4D3A] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="typography-caption text-[#555555] font-normal leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="md:w-1/4 flex items-center justify-end gap-4 typography-caption">
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#0E4D3A] bg-[#0E4D3A]/10 group-hover:bg-[#0E4D3A] group-hover:text-white px-4 py-2 rounded-full uppercase tracking-wider transition-all duration-300 shadow-xs">
                    <span>READ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        ref={seriesSectionRef}
        id="geo-wellness-series"
        aria-label="Editorial Series: Understanding Geo-Wellness"
        className="relative bg-[#111111] text-white border-b border-[#2C2C2E]"
      >
        <div className="hidden lg:block relative h-[300vh]">
          <div className="sticky top-0 h-screen flex flex-col justify-between py-16 xl:py-20 overflow-hidden z-10">
            <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12 shrink-0">
              <span className="typography-eyebrow text-[#34D399] tracking-wider uppercase font-semibold block mb-2">
                EDITORIAL SERIES
              </span>
              <h2 className="typography-section-h2 text-white font-semibold mb-3">
                Understanding Geo-Wellness
              </h2>
              <p className="typography-body text-[#A1A1A6] text-base sm:text-lg leading-relaxed max-w-3xl">
                A six-part introduction to the principles behind DARSHAI’s
                Geo-Wellness framework—exploring how personal goals, wellness
                programmes and environmental context can come together in a more
                considered wellness journey.
              </p>
            </div>
            <div className="w-full relative my-auto overflow-hidden py-6">
              <div
                className="w-full"
                style={{
                  paddingLeft: "max(1.5rem, calc((100vw - 1340px) / 2 + 3rem))",
                }}
              >
                <div
                  ref={seriesTrackRef}
                  style={{
                    transform: `translate3d(-${seriesTranslateX}px, 0px, 0px)`,
                    transition: "transform 0.08s linear",
                  }}
                  className="flex items-stretch gap-6 will-change-transform pr-12 w-max"
                >
                  {seriesChapters.map((chapter, idx) => {
                    const isCurrent = activeChapterIndex === idx;
                    return (
                      <div
                        onClick={() =>
                          onNavigate(`/insights/series/${chapter.id}`)
                        }
                        className={`w-[420px] xl:w-[460px] bg-[#18181A] hover:bg-[#1C1C1E] rounded-[24px] border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] p-7 sm:p-8 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-[0_12px_36px_-12px_rgba(14,77,58,0.4)] shrink-0 min-h-[340px] ${isCurrent ? "border-[#34D399] shadow-[0_12px_36px_-12px_rgba(52,211,153,0.3)]" : "border-[#2C2C2E]"}`}
                        key={chapter.id}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-[#2C2C2E]">
                            <span className="typography-caption font-semibold px-3 py-1 rounded-full bg-[#0E4D3A]/30 text-[#34D399] border border-[#0E4D3A]/50">
                              {chapter.tag}
                            </span>
                            <span className="typography-caption text-[#86868B] font-medium">
                              {chapter.readTime}
                            </span>
                          </div>
                          <h3 className="typography-card-title text-white group-hover:text-[#34D399] transition-colors font-semibold leading-snug">
                            {chapter.title}
                          </h3>
                          <p className="typography-body text-[#A1A1A6] text-sm leading-relaxed">
                            {chapter.desc}
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-[#2C2C2E] flex items-center justify-between">
                          <span className="typography-caption text-[#86868B] font-medium">
                            {chapter.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider text-[#34D399] group-hover:translate-x-1 transition-transform">
                            <span>Read Chapter</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12 shrink-0 pt-4 border-t border-[#2C2C2E] flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#34D399] px-3 py-1 rounded-full bg-[#34D399]/10 border border-[#34D399]/20">
                  0{activeChapterIndex + 1} / 06
                </span>
                <span className="text-sm font-semibold text-white">
                  {seriesChapters[activeChapterIndex].title}
                </span>
              </div>
              <div className="inline-flex items-center gap-2">
                {seriesChapters.map((ch, idx) => (
                  <button
                    type="button"
                    onClick={() => goToChapterStep(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeChapterIndex === idx ? "w-8 bg-[#34D399]" : "w-2 bg-white/20 hover:bg-white/40"}`}
                    aria-label={`Jump to chapter ${idx + 1}`}
                    key={ch.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden py-16 px-6 sm:px-8 max-w-[1340px] mx-auto">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="typography-eyebrow text-[#34D399] tracking-wider uppercase font-semibold block">
              EDITORIAL SERIES
            </span>
            <h2 className="typography-section-h2 text-white font-semibold">
              Understanding Geo-Wellness
            </h2>
            <p className="typography-body text-[#A1A1A6] text-base leading-relaxed">
              A six-part introduction to the principles behind DARSHAI’s
              Geo-Wellness framework—exploring how personal goals, wellness
              programmes and environmental context can come together in a more
              considered wellness journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seriesChapters.map((chapter) => (
              <div
                onClick={() => onNavigate(`/insights/series/${chapter.id}`)}
                className="bg-[#18181A] hover:bg-[#1C1C1E] rounded-[24px] border border-[#2C2C2E] hover:border-[#0E4D3A] p-7 flex flex-col justify-between transition-all duration-300 group cursor-pointer shadow-lg min-h-[320px]"
                key={chapter.id}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2C2C2E]">
                    <span className="typography-caption font-semibold px-3 py-1 rounded-full bg-[#0E4D3A]/30 text-[#34D399] border border-[#0E4D3A]/50">
                      {chapter.tag}
                    </span>
                    <span className="typography-caption text-[#86868B] font-medium">
                      {chapter.readTime}
                    </span>
                  </div>
                  <h3 className="typography-card-title text-white group-hover:text-[#34D399] transition-colors font-semibold leading-snug">
                    {chapter.title}
                  </h3>
                  <p className="typography-body text-[#A1A1A6] text-sm leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#2C2C2E] flex items-center justify-between">
                  <span className="typography-caption text-[#86868B] font-medium">
                    {chapter.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider text-[#34D399] group-hover:translate-x-1 transition-transform">
                    <span>Read Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="founder-perspectives"
        className="py-16 sm:py-24 bg-white border-b border-[#D2D2D7]"
      >
        <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[24px] overflow-hidden border border-[#D2D2D7] aspect-[4/5] bg-[#111111] shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)]">
                <SmartImage
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=85"
                  alt="Veekshitha V, Founder & CEO of DARSHAI"
                  className="w-full h-full object-cover object-top brightness-[0.96]"
                />
              </div>
            </motion.div>
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <p className="typography-eyebrow text-[#0E4D3A] mb-2">
                  FOUNDER PERSPECTIVES
                </p>
                <h2 className="typography-section-h2 text-[#1D1D1F]">
                  Building The Future of
                  <br className="hidden sm:inline" /> Geo-Wellness.
                </h2>
              </div>
              <blockquote className="typography-lead text-[#2C2C2E] font-medium leading-relaxed italic border-l-2 border-[#0E4D3A] pl-5 sm:pl-6 my-2">
                “Health is not simply about understanding the individual. It is
                also about understanding the environments in which people
                recover, heal and thrive.”
              </blockquote>
              <div className="pt-2">
                <p className="typography-body-bold text-[#1D1D1F]">
                  Veekshitha V
                </p>
                <p className="typography-caption text-[#6E6E73]">
                  Founder & CEO, DARSHAI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="editorial-trust"
        className="py-16 sm:py-24 bg-white border-b border-[#D2D2D7]"
      >
        <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="typography-eyebrow text-[#0E4D3A] mb-2">
                  EDITORIAL PRINCIPLES
                </p>
                <h2 className="typography-section-h2 text-[#1D1D1F] mb-6">
                  Clarity Over Claims.
                </h2>
              </div>
              <div className="divide-y divide-[#D2D2D7] border-y border-[#D2D2D7]">
                {editorialStatements.map((item, idx) => {
                  const isActive = activeStatementIndex === idx;
                  return (
                    <div
                      onMouseEnter={() => setActiveStatementIndex(idx)}
                      onClick={() => setActiveStatementIndex(idx)}
                      className={`py-5 transition-all duration-300 flex items-start gap-4 cursor-pointer group ${isActive ? "bg-[#F5F5F7] px-4 rounded-xl border-l-4 border-[#0E4D3A]" : "px-2 hover:bg-[#F5F5F7]/50 rounded-xl"}`}
                      key={item.num}
                    >
                      <span
                        className={`typography-caption font-semibold mt-0.5 px-2 py-0.5 rounded-md transition-colors ${isActive ? "bg-[#0E4D3A] text-white" : "text-[#0E4D3A] bg-[#0E4D3A]/10"}`}
                      >
                        {item.num}
                      </span>
                      <div className="space-y-1">
                        <p
                          className={`typography-body-bold transition-colors ${isActive ? "text-[#0E4D3A]" : "text-[#1D1D1F] group-hover:text-[#0E4D3A]"}`}
                        >
                          {item.statement}
                        </p>
                        <p className="typography-caption text-[#6E6E73] leading-relaxed">
                          {item.subDetail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-5 self-stretch">
              <div className="bg-[#111111] rounded-[24px] border border-[#D2D2D7] overflow-hidden shadow-xl relative min-h-[420px] h-full w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 z-0 overflow-hidden"
                    key={activeStatementIndex}
                  >
                    <SmartImage
                      src={editorialStatements[activeStatementIndex].image}
                      alt={editorialStatements[activeStatementIndex].statement}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="final-cta"
        className="py-20 sm:py-28 bg-[#111111] text-white text-center relative overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 sm:px-8 space-y-6">
          <p className="typography-eyebrow text-[#C6A660]">
            DARSHAI RESEARCH & INSIGHTS
          </p>
          <h2 className="typography-section-h2 text-white">
            Understanding Comes Before
            <br className="hidden sm:inline" /> Transformation.
          </h2>
          <p className="typography-lead text-[#A1A1A6] max-w-2xl mx-auto">
            Explore the science of environments, clinical methodologies, and
            personalized wellness journeys across India.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                track("begin_journey", { source: "insights_final_cta" });
                navigateTo("contact");
              }}
              className="typography-ui-button px-8 sm:px-10 py-4 rounded-full bg-[#0E4D3A] hover:bg-[#093527] text-white font-semibold tracking-wider uppercase transition-colors shadow-lg cursor-pointer inline-flex items-center gap-2"
            >
              <span>BEGIN YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                track("explore_all_centres", { source: "insights_final_cta" });
                navigateTo("centres");
              }}
              className="typography-ui-button px-8 sm:px-10 py-4 rounded-full bg-white/10 hover:bg-white/18 text-white border border-white/20 font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>EXPLORE CENTRES</span>
            </button>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {activeArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1.0, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl bg-white rounded-[24px] border border-[#D2D2D7] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-[#D2D2D7] flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-2">
                  <span className="typography-caption font-semibold px-2.5 py-1 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A]">
                    {activeArticleModal.cat}
                  </span>
                  <span className="typography-caption text-[#86868B]">
                    {activeArticleModal.time}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticleModal(null)}
                  className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto space-y-6">
                <h2 className="typography-section-h2 text-[#1D1D1F]">
                  {activeArticleModal.title}
                </h2>
                <div className="typography-caption flex items-center gap-3 text-[#6E6E73] pb-4 border-b border-[#D2D2D7]">
                  <p>
                    By{" "}
                    <span className="typography-body-bold text-[#1D1D1F]">
                      {activeArticleModal.author}
                    </span>{" "}
                    ({activeArticleModal.authorRole})
                  </p>
                  <span>•</span>
                  <p>{activeArticleModal.date}</p>
                </div>
                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#D2D2D7] bg-[#111111]">
                  <SmartImage
                    src={activeArticleModal.image}
                    alt={activeArticleModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 typography-body text-[#2C2C2E]">
                  {activeArticleModal.fullContent ? (
                    activeArticleModal.fullContent.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))
                  ) : (
                    <p>{activeArticleModal.summary}</p>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-6 border-t border-[#D2D2D7] bg-[#F5F5F7] flex items-center justify-between shrink-0">
                <span className="typography-caption text-[#86868B]">
                  DARSHAI Research & Publications
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticleModal(null)}
                  className="typography-ui-button px-5 py-2 rounded-full bg-[#1D1D1F] text-white font-semibold uppercase tracking-wider hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  Close Essay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedSeriesItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1.0, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-[24px] border border-[#D2D2D7] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-[#D2D2D7] flex items-center justify-between shrink-0 bg-white">
                <span className="typography-caption font-semibold px-2.5 py-1 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A]">
                  CHAPTER {selectedSeriesItem.step} •{" "}
                  {selectedSeriesItem.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSeriesItem(null)}
                  className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
                <h3 className="typography-h3 text-[#1D1D1F]">
                  {selectedSeriesItem.title}
                </h3>
                <p className="typography-body text-[#48484A]">
                  {selectedSeriesItem.fullDescription}
                </p>
                <div className="space-y-2 pt-2">
                  <p className="typography-caption uppercase font-semibold text-[#0E4D3A] tracking-wider">
                    Key Syllabus Tenets:
                  </p>
                  <ul className="space-y-2">
                    {selectedSeriesItem.keyPoints.map((pt, ptIdx) => (
                      <li
                        className="flex items-start gap-2.5 typography-caption text-[#2C2C2E]"
                        key={ptIdx}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A] mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 sm:p-6 border-t border-[#D2D2D7] bg-[#F5F5F7] flex flex-wrap items-center justify-between gap-3 shrink-0">
                <span className="typography-caption text-[#86868B]">
                  Geo-Wellness Educational Curriculum
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSeriesItem(null)}
                    className="typography-ui-button px-4 py-2 rounded-full border border-[#D2D2D7] bg-white text-[#1D1D1F] font-semibold text-xs uppercase tracking-wider hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const slug = selectedSeriesItem.id;
                      setSelectedSeriesItem(null);
                      onNavigate(`/insights/series/${slug}`);
                    }}
                    className="typography-ui-button px-5 py-2 rounded-full bg-[#0E4D3A] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#0A382A] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
export default InsightsPage;
