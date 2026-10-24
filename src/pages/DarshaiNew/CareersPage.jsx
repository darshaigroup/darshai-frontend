import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import Reveal from "../../components/darshaiNew/Reveal";
import { track } from "../../lib/darshaiNew/analytics";
import {
  Search,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Loader2,
  X,
  Upload,
  Building2,
  MapPin,
  Layers,
  HeartPulse,
  TrendingUp,
  Handshake,
  Settings,
  Palette,
  FileCheck,
} from "lucide-react";
const JOB_ROLES = [
  {
    id: "role-1",
    title: "International Sales Executive",
    category: "Sales & Partnerships",
    type: "Full Time",
    location: "Mangaluru / Hybrid",
    summary:
      "Lead international client acquisition, global retreat advisory, and bespoke wellness journey sales for overseas guests.",
    overview:
      "As an International Sales Executive at DARSHAI, you will lead outreach and inbound consultative sales for high-net-worth individuals and executive travelers across North America, Europe, the Middle East, and Asia. You will introduce foreign guests to India's premier Geo-Wellness sanctuaries and tailor clinical wellness pathways calibrated to their health baselines.",
    responsibilities: [
      "Consult with international clients seeking clinical wellness, Ayurvedic rejuvenation, and longevity retreats in India.",
      "Present personalized retreat itineraries, bioclimatic compatibility analysis, and program protocols to prospective guests.",
      "Build relationships with international luxury travel advisors, family offices, and executive health sponsors.",
      "Coordinate with on-ground clinical teams, Vaidyas, and sanctuary directors to confirm tailored care programs.",
      "Achieve quarterly sales objectives while maintaining exceptional client advisory satisfaction.",
    ],
    qualifications: [
      "2-5+ years of international sales or business development experience in luxury hospitality, medical travel, or high-touch consultative services.",
      "Flawless written and spoken English communication with cross-cultural fluency; additional languages (German, French, or Arabic) are a plus.",
      "Demonstrated track record of managing high-ticket consultative deal cycles from inquiry to closed booking.",
      "Genuine passion for preventative health, longevity science, and India's traditional wellness heritage.",
    ],
  },
  {
    id: "role-2",
    title: "Domestic Sales Executive",
    category: "Sales & Partnerships",
    type: "Full Time",
    location: "Mangaluru / Bengaluru",
    summary:
      "Drive domestic guest acquisition, executive retreat bookings, and high-touch consultative advisory across India's metropolitan markets.",
    overview:
      "As a Domestic Sales Executive at DARSHAI, you will connect Indian executives, entrepreneurs, and wellness seekers with our audited network of therapeutic sanctuaries across the Western Ghats, Himalayas, and coastal Kerala. You will guide prospects through our precision intake assessments and curate life-changing wellness experiences.",
    responsibilities: [
      "Engage directly with high-intent domestic inquiries to understand stress recovery, sleep optimization, and detox goals.",
      "Guide prospective guests through microclimate matching logic and accredited partner sanctuary selections.",
      "Develop direct relationships with corporate executive networks, private wealth managers, and wellness communities.",
      "Manage end-to-end sales pipeline from initial assessment review to confirmed retreat reservation.",
      "Maintain active communication and provide comprehensive pre-departure briefings to traveling guests.",
    ],
    qualifications: [
      "2-4+ years of successful consultative sales or client advisory experience in premium hospitality, healthcare, or luxury lifestyle services in India.",
      "Outstanding presentation and relationship-building skills in English and Hindi (regional languages like Kannada or Malayalam beneficial).",
      "Goal-driven self-starter with disciplined CRM pipeline management and follow-up rigor.",
      "Familiarity with Ayurvedic retreats, holistic detox centers, and longevity programs across India.",
    ],
  },
  {
    id: "role-3",
    title: "Inside Sales Specialist",
    category: "Sales & Partnerships",
    type: "Full Time",
    location: "Mangaluru",
    summary:
      "Manage high-intent inbound inquiries, qualify prospective guests, and guide leads through the DARSHAI intake assessment and booking funnel.",
    overview:
      "As an Inside Sales Specialist, you are the responsive, knowledgeable first voice of DARSHAI. You will handle inbound digital inquiries, walk prospects through our diagnostic intake assessment, and convert high-intent interest into scheduled advisory consultations.",
    responsibilities: [
      "Promptly qualify and engage inbound leads coming through the DARSHAI website, assessment tools, and digital campaigns.",
      "Conduct in-depth discovery calls to identify health objectives, travel timeframes, budget preferences, and bioclimatic requirements.",
      "Schedule advisory sessions with senior navigators and manage structured lead nurture follow-up sequences.",
      "Maintain meticulous CRM data hygiene, contact records, and pipeline conversion analytics.",
      "Provide feedback to marketing and product teams on customer questions, objections, and intake trends.",
    ],
    qualifications: [
      "1-3+ years inside sales, lead qualification, or sales development (SDR) experience with a proven track record of meeting targets.",
      "Articulate, warm communication style with strong active listening and consultative questioning skills.",
      "Experience with modern CRM platforms (HubSpot/Salesforce) and digital communications tools.",
      "Enthusiasm for learning Geo-Wellness frameworks, clinical partner offerings, and restorative travel.",
    ],
  },
  {
    id: "role-4",
    title: "Client Relationship Executive",
    category: "Sales & Partnerships",
    type: "Full Time",
    location: "Mangaluru",
    summary:
      "Nurture long-term guest relationships, coordinate personalized pre-and-post retreat touchpoints, and cultivate repeat wellness journeys.",
    overview:
      "As a Client Relationship Executive, you will champion client delight across every stage of the Geo-Wellness lifecycle. You will serve as the trusted concierge and dedicated relationship manager for guests, ensuring their sanctuary experience exceeds expectations and driving long-term loyalty and repeat journeys.",
    responsibilities: [
      "Manage dedicated accounts for enrolled wellness travelers, acting as their primary personal liaison before, during, and after their journey.",
      "Coordinate dietary preferences, clinical intake documentation, and special retreat requests directly with partner sanatorium directors.",
      "Conduct structured post-retreat debriefings, collect qualitative outcome data, and coordinate post-journey continuity check-ins.",
      "Drive guest retention, repeat journey bookings, and referral introductions through high-touch relationship management.",
      "Resolve guest inquiries and special travel logistics with poise, discretion, and meticulous attention to detail.",
    ],
    qualifications: [
      "2-4+ years of experience in guest relations, high-touch luxury concierge, premium hospitality, or private client account management.",
      "Exceptional emotional intelligence, empathy, and relationship-nurturing acumen.",
      "Impeccable verbal and written communication with meticulous follow-through and organizational precision.",
      "Deep personal resonance with wellness, holistic health, and restorative travel philosophy.",
    ],
  },
  {
    id: "role-5",
    title: "Digital Marketing Executive",
    category: "Growth & Marketing",
    type: "Full Time",
    location: "Mangaluru / Hybrid",
    summary:
      "Execute multi-channel digital acquisition campaigns, search marketing, social storytelling, and performance content to drive high-intent wellness traffic.",
    overview:
      "As a Digital Marketing Executive at DARSHAI, you will execute our performance marketing, search, and digital growth initiatives. You will translate our premium brand ethos into compelling campaigns, optimize acquisition funnels, and drive qualified wellness seekers to the DARSHAI intake assessment.",
    responsibilities: [
      "Plan, launch, and optimize digital performance campaigns across Google Search, Meta, LinkedIn, and programmatic display.",
      "Collaborate with content and design teams to create high-converting ad creative, landing pages, and educational content assets.",
      "Monitor and optimize key performance indicators including CAC, ROAS, conversion rates, and lead quality using GA4 and analytics tools.",
      "Manage email marketing automation flows, lead nurture drip sequences, and newsletter distributions.",
      "Conduct keyword research and implement on-page SEO best practices to grow organic search visibility.",
    ],
    qualifications: [
      "2-4+ years of hands-on digital marketing experience with proven success in performance marketing or content distribution.",
      "Proficiency in Google Ads, Meta Ads Manager, Google Analytics 4, email automation tools, and SEO principles.",
      "Strong analytical mindset with ability to interpret campaign data and iterate rapidly.",
      "Refined aesthetic judgment that respects luxury Apple-standard design and brand elegance.",
    ],
  },
];
const WORK_CATEGORIES = [
  { label: "All Areas", value: "All", icon: Layers },
  {
    label: "Sales & Partnerships",
    value: "Sales & Partnerships",
    icon: Handshake,
  },
  {
    label: "Growth & Marketing",
    value: "Growth & Marketing",
    icon: TrendingUp,
  },
  { label: "Technology", value: "Technology", icon: Settings },
  {
    label: "Wellness & Clinical",
    value: "Wellness & Clinical",
    icon: HeartPulse,
  },
  { label: "Operations", value: "Operations", icon: Building2 },
  { label: "Creative", value: "Creative", icon: Palette },
];
const CAREER_PILLARS = [
  {
    num: "01",
    title: "Category Creation",
    subtitle: "Help shape a new Geo-Wellness category.",
    description:
      "We aren't creating another directory or booking portal. We are pioneering environmental intelligence — uniting geography, biology, and health into a formalized discipline.",
    metrics: "Uncontested space · First-principles architecture",
  },
  {
    num: "02",
    title: "Real-World Impact",
    subtitle: "Work on journeys that connect people, wellness and place.",
    description:
      "Our work touches the deepest aspects of human vitality. Every algorithm, partnership, and concierge coordination directly shifts someone's chronic recovery and longevity.",
    metrics: "Measurable biomarker shifts · Real sanctuaries",
  },
  {
    num: "03",
    title: "Cross-Functional Work",
    subtitle:
      "Technology, wellness, travel, operations and growth work together.",
    description:
      "Engineers sit alongside Ayurvedic Vaidyas. Designers collaborate with private chauffeurs. You work in an un-siloed environment where diverse disciplines cross-pollinate daily.",
    metrics: "Multi-disciplinary team · Zero bureaucracy",
  },
  {
    num: "04",
    title: "Ownership",
    subtitle: "Small team. High responsibility. Visible contribution.",
    description:
      "We keep our core team lean and exceptionally capable. You won't be managing ticket queues; you will own critical systems, make decisions, and see your imprint on the brand.",
    metrics: "High autonomy · Direct executive access",
  },
];
export function CareersPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePillar, setActivePillar] = useState(0);
  // Sheet & Slide-over state
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [prefilledRole, setPrefilledRole] = useState("");
  // Slide-over form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleInterest: "",
    linkedin: "",
    shortNote: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const rolesSectionRef = useRef(null);
  const whySectionRef = useRef(null);
  const scrollToRoles = () => {
    rolesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToWhy = () => {
    whySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const openApplicationSlideOver = (roleTitle = "") => {
    setPrefilledRole(roleTitle);
    setFormData((prev) => ({
      ...prev,
      roleInterest: roleTitle || prev.roleInterest,
    }));
    setIsSubmitted(false);
    setIsSlideOverOpen(true);
    track("open_application_slideover", {
      role: roleTitle || "General Profile",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !cvFile) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      track("submit_profile_success", {
        roleInterest: formData.roleInterest || prefilledRole || "General",
        hasCv: true,
      });
    }, 1200);
  };
  const filteredRoles = JOB_ROLES.filter((role) => {
    const matchesCategory =
      selectedCategory === "All" || role.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      role.title.toLowerCase().includes(query) ||
      role.category.toLowerCase().includes(query) ||
      role.location.toLowerCase().includes(query) ||
      role.summary.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F7] min-h-screen selection:bg-[#0F6B4A] selection:text-white relative">
      <section
        id="careers-hero"
        className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 border-b border-white/10"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.03, opacity: 0.4 }}
            animate={{ scale: 1.0, opacity: 0.55 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full will-change-transform"
          >
            <SmartImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=80"
              alt="Architectural collaborative studio with environmental dashboards and team members"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-[#0A0A0A]/70 to-[#0A0A0A] pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/90 pointer-events-none" />
        </div>
        <div className="relative z-10 darshai-container max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A]" />
            <p className="typography-eyebrow text-[#C7A25A] tracking-[0.25em] text-xs font-semibold uppercase">
              CAREERS AT DARSHAI
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-white leading-[1.08] mb-6 max-w-3xl mx-auto"
          >
            Build What <br />
            Comes Next in <span className="text-[#34D399]">Geo-Wellness.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            DARSHAI is building a new category at the intersection of wellness,
            environmental intelligence and technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <button
              type="button"
              onClick={scrollToRoles}
              className="darshai-btn-primary uppercase cursor-pointer group !h-14 !px-8 text-xs sm:text-sm shadow-xl inline-flex items-center gap-3 text-white"
            >
              <span>EXPLORE OPEN ROLES</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>
            <button
              type="button"
              onClick={scrollToWhy}
              className="typography-ui-button text-xs sm:text-sm text-[#A1A1AA] hover:text-white transition-colors uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 py-3 px-4 cursor-pointer"
            >
              <span>WHY DARSHAI</span>
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </div>
      </section>
      <section
        ref={whySectionRef}
        id="why-darshai-careers"
        className="py-24 md:py-32 bg-[#0E0E10] border-b border-white/10 relative overflow-hidden"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-3">
                WHY WORK WITH DARSHAI
              </p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-4">
                Build Something <br />
                <span className="text-[#34D399]">That Matters.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
                Category-defining companies aren't built on generic ideas. They
                are forged by teams who demand precision, clinical grounding,
                and deep ownership.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CAREER_PILLARS.map((pillar, index) => {
              const isSelected = activePillar === index;
              return (
                <motion.div
                  onClick={() => {
                    setActivePillar(index);
                    track("select_career_pillar", { pillar: pillar.title });
                  }}
                  layout
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative rounded-[24px] sm:rounded-[28px] border cursor-pointer p-6 sm:p-8 transition-all duration-300 ${
                    isSelected
                      ? "bg-[#141416] border-[#0F6B4A] shadow-[0_12px_40px_-10px_rgba(15,107,74,0.3)] ring-1 ring-[#0F6B4A]/50"
                      : "bg-[#111113]/70 border-white/10 hover:border-white/20 hover:bg-[#141416]/50"
                  }`}
                  key={pillar.num}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-md transition-colors ${
                          isSelected
                            ? "bg-[#0F6B4A] text-white"
                            : "bg-white/5 text-[#A1A1AA] group-hover:text-white"
                        }`}
                      >
                        {pillar.num}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${isSelected ? "bg-[#34D399] shadow-[0_0_8px_#34D399]" : "bg-white/20"}`}
                    />
                  </div>
                  <p className="text-sm sm:text-base font-medium text-[#C7A25A] mb-3">
                    {pillar.subtitle}
                  </p>
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed pt-2 border-t border-white/10 mb-4 font-normal">
                          {pillar.description}
                        </p>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-[#34D399]/90 font-semibold flex items-center gap-1.5">
                          <span>•</span>
                          <span>{pillar.metrics}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-[#0A0A0A] border-b border-white/10">
        <div className="darshai-container max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="typography-eyebrow text-[#C7A25A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
              DISCOVER YOUR DISCIPLINE
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Find Your Kind of Work.
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {WORK_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              const Icon = cat.icon;
              return (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    track("filter_career_category", { category: cat.value });
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-[#0F6B4A] text-white shadow-[0_0_15px_-3px_rgba(15,107,74,0.5)] border border-[#34D399]/40"
                      : "bg-[#141416] text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1D] border border-white/10"
                  }`}
                  key={cat.value}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section
        ref={rolesSectionRef}
        id="open-positions"
        className="py-24 md:py-32 bg-[#0E0E10] border-b border-white/10"
      >
        <div className="darshai-container max-w-5xl mx-auto">
          <div className="mb-12 md:mb-16">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-2">
                    ACTIVE ROLES
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
                    Find Your Place at DARSHAI.
                  </h2>
                </div>
                <div className="text-xs font-mono text-[#A1A1AA]">
                  Showing{" "}
                  <span className="text-[#34D399] font-bold">
                    {filteredRoles.length}
                  </span>{" "}
                  positions
                </div>
              </div>
            </Reveal>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-[#A1A1AA]">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by role title, discipline, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-14 pr-12 py-4 rounded-2xl border border-white/15 bg-[#141416] text-white placeholder-[#71717A] text-sm sm:text-base focus:outline-none focus:border-[#0F6B4A] focus:ring-1 focus:ring-[#0F6B4A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-white cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
          {filteredRoles.length > 0 ? (
            <div className="space-y-4">
              {filteredRoles.map((role) => (
                <div
                  onClick={() => {
                    setSelectedRole(role);
                    track("view_role_detail", { role: role.title });
                  }}
                  className="group relative rounded-[20px] sm:rounded-[24px] bg-white border border-[#D2D2D7] p-6 sm:p-7 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-[3px] hover:border-[#0F6B4A] hover:shadow-[0_12px_32px_-8px_rgba(15,107,74,0.25)] text-[#1D1D1F]"
                  key={role.id}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6E6E73]">
                        <span className="font-semibold text-[#0E4D3A] uppercase tracking-wider">
                          {role.category}
                        </span>
                        <span>·</span>
                        <span>{role.type}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0E4D3A]" />
                          {role.location}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight group-hover:text-[#0E4D3A] transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none transition-colors">
                        {role.summary}
                      </p>
                    </div>
                    <div className="shrink-0 pt-2 md:pt-0">
                      <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0E4D3A] group-hover:text-[#0F6B4A]">
                        <span>VIEW ROLE</span>
                        <span
                          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[4px]"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 px-6 text-center rounded-[24px] bg-[#141416] border border-white/10">
              <Briefcase className="w-8 h-8 text-[#A1A1AA] mx-auto mb-3" />
              <h4 className="font-display text-xl font-semibold text-white mb-2">
                No matching positions found
              </h4>
              <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-6">
                We couldn't find an open role matching your criteria. Explore
                other disciplines or submit your profile below.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="darshai-btn-primary uppercase text-xs !h-11 !px-6"
              >
                VIEW ALL ROLES
              </button>
            </div>
          )}
          <div className="mt-16 p-8 sm:p-10 rounded-[28px] bg-[#141416] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-lg">
            <div>
              <p className="typography-eyebrow text-[#C7A25A] uppercase tracking-wider text-xs mb-1">
                GENERAL APPLICANTS
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2">
                Don't See Your Role?
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl font-normal">
                We still want to hear from exceptional people. If you believe
                your expertise can accelerate the Geo-Wellness movement,
                introduce yourself.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => openApplicationSlideOver()}
                className="darshai-btn-primary uppercase cursor-pointer group !h-12 !px-7 text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 whitespace-nowrap"
              >
                <span>SEND YOUR PROFILE</span>
                <span
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-b border-white/10">
        <div className="darshai-container max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="typography-eyebrow text-[#0F6B4A] uppercase tracking-[0.2em] font-semibold text-xs mb-3">
              LIFE AT DARSHAI
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
              Principled Independence. High Ambition.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              We operate in quiet focus from Mangaluru and remote global hubs,
              valuing rigor over noise and genuine health over trend chasing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Deep Focus Culture",
                desc: "Long blocks of uninterrupted thought. Asynchronous communication preferred over unnecessary status meetings.",
                badge: "CULTURE",
              },
              {
                title: "Sanctuary Immersion",
                desc: "Every team member visits and audits our partner retreat sanctuaries in the Western Ghats and coastal Kerala.",
                badge: "EXPERIENCE",
              },
              {
                title: "Holistic Vitality",
                desc: "Comprehensive health allowances, preventative consultations, and annual personal wellness journey sabbaticals.",
                badge: "WELLBEING",
              },
            ].map((item) => (
              <div
                className="p-7 rounded-[24px] bg-[#141416] border border-white/10 hover:border-white/20 transition-all"
                key={item.title}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#34D399] bg-[#0F6B4A]/20 px-2.5 py-1 rounded-md mb-4 inline-block">
                  {item.badge}
                </span>
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRole(null)}
              className="absolute inset-0 bg-black backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#141416] border border-white/20 shadow-2xl p-6 sm:p-10 text-white z-10 scrollbar-none"
            >
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close role details"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="pr-12 mb-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#C7A25A] mb-3">
                  <span className="font-semibold">{selectedRole.category}</span>
                  <span>·</span>
                  <span>{selectedRole.type}</span>
                  <span>·</span>
                  <span>{selectedRole.location}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
                  {selectedRole.title}
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  {selectedRole.overview}
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#34D399] font-bold mb-4">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2.5">
                  {selectedRole.responsibilities.map((resp, i) => (
                    <li
                      className="text-xs sm:text-sm text-white/85 flex items-start gap-2.5 leading-relaxed"
                      key={i}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F6B4A] shrink-0 mt-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#34D399] font-bold mb-4">
                  Desired Qualifications
                </h4>
                <ul className="space-y-2.5">
                  {selectedRole.qualifications.map((qual, i) => (
                    <li
                      className="text-xs sm:text-sm text-white/85 flex items-start gap-2.5 leading-relaxed"
                      key={i}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A25A] shrink-0 mt-2" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#A1A1AA]">
                  Direct application · CV / Resume required
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const roleToApply = selectedRole.title;
                      setSelectedRole(null);
                      openApplicationSlideOver(roleToApply);
                    }}
                    className="darshai-btn-primary uppercase text-xs !h-12 !px-7 flex-1 sm:flex-initial"
                  >
                    <span>APPLY FOR THIS ROLE</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSlideOverOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSlideOverOpen(false)}
              className="absolute inset-0 bg-black cursor-pointer"
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-screen max-w-md md:max-w-lg bg-[#141416] border-l border-white/15 text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-y-auto"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                    <div>
                      <p className="typography-eyebrow text-[#C7A25A] uppercase text-xs font-semibold tracking-wider mb-1">
                        APPLICATION DESK
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {prefilledRole
                          ? `Apply: ${prefilledRole}`
                          : "Send Your Profile"}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSlideOverOpen(false)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                      aria-label="Close application panel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#0F6B4A] text-white flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(15,107,74,0.6)]">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                        Profile Received.
                      </h4>
                      <p className="text-sm text-[#A1A1AA] max-w-xs mx-auto leading-relaxed">
                        Thank you. The DARSHAI team will review your profile and
                        reach out if there is a mutual fit.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => setIsSlideOverOpen(false)}
                          className="darshai-btn-primary uppercase text-xs !h-11 !px-7"
                        >
                          DONE
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.3 }}
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-semibold">
                          Name <span className="text-[#34D399]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#0F6B4A] focus:bg-[#1A1A1D] transition-all"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-semibold">
                          Email <span className="text-[#34D399]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@domain.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#0F6B4A] focus:bg-[#1A1A1D] transition-all"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-semibold">
                          Role / Area of Interest
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Technology, Clinical Advisory, Sales"
                          value={formData.roleInterest}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              roleInterest: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#0F6B4A] focus:bg-[#1A1A1D] transition-all"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-semibold">
                          LinkedIn / Portfolio
                        </label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/..."
                          value={formData.linkedin}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              linkedin: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#0F6B4A] focus:bg-[#1A1A1D] transition-all"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-semibold">
                          CV / Resume Upload{" "}
                          <span className="text-[#34D399]">*</span>
                        </label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCvFile(e.target.files[0]);
                            }
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-full p-4 rounded-xl border border-dashed transition-all text-left flex items-center justify-between cursor-pointer ${
                            cvFile
                              ? "border-[#0F6B4A] bg-[#0F6B4A]/10 text-white"
                              : "border-white/20 bg-white/5 hover:border-white/40 text-[#A1A1AA] hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate">
                            <Upload className="w-4 h-4 text-[#34D399] shrink-0" />
                            <span className="text-xs truncate">
                              {cvFile
                                ? cvFile.name
                                : "Select PDF or DOCX file (Max 10MB)"}
                            </span>
                          </div>
                          {cvFile && (
                            <FileCheck className="w-4 h-4 text-[#34D399] shrink-0" />
                          )}
                        </button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 font-semibold">
                          Short Note
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Briefly state your background, perspective, and what you want to build."
                          value={formData.shortNote}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shortNote: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#0F6B4A] focus:bg-[#1A1A1D] transition-all resize-none"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.3 }}
                        className="pt-2"
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting || !cvFile}
                          className="w-full darshai-btn-primary uppercase cursor-pointer !h-13 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>TRANSMITTING PROFILE...</span>
                            </>
                          ) : (
                            <>
                              <span>SUBMIT APPLICATION</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </motion.div>
                    </form>
                  )}
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-[#71717A] text-center">
                  DARSHAI Talent Governance · Confidential Processing
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default CareersPage;
