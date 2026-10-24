import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { track } from "../../lib/darshaiNew/analytics";
import FinalCTA from "../../components/darshaiNew/FinalCTA";
import { ProgramsCinematicHero } from "../../components/darshaiNew/ProgramsCinematicHero";
import { ProtocolHorizontalScrollSection } from "../../components/darshaiNew/ProtocolHorizontalScrollSection";
import { DarshaiMatchingEngineSection } from "../../components/darshaiNew/DarshaiMatchingEngineSection";
import { DarshaiApproachTimelineSection } from "../../components/darshaiNew/DarshaiApproachTimelineSection";
import { CuratedEnvironmentsChapters } from "../../components/darshaiNew/CuratedEnvironmentsChapters";
import { TotalJourneyInvestmentLayersSection } from "../../components/darshaiNew/TotalJourneyInvestmentLayersSection";
import { ProgramsFAQSection } from "../../components/darshaiNew/ProgramsFAQSection";
const VALID_PROTOCOLS = [
  "executive-reset",
  "deep-detox",
  "longevity",
  "sovereign",
];
const PROTOCOL_TABS = [
  { id: "executive-reset", label: "01. Executive Reset", badge: "01" },
  { id: "deep-detox", label: "02. Deep Detox", badge: "02" },
  { id: "longevity", label: "03. Longevity & Healthy Ageing", badge: "03" },
  { id: "sovereign", label: "04. Sovereign", badge: "04" },
];
const PROTOCOL_DATA = {
  "executive-reset": {
    badge: "PROTOCOL 01",
    title: "01 — EXECUTIVE RESET",
    subtitle: "Recovery from modern performance fatigue.",
    description:
      "A targeted physiological and cognitive recovery protocol engineered for high-pressure decision makers. Combines adaptive nervous system regulation with microclimate air quality to reverse cognitive burnout and optimize sleep architecture.",
    designedFor: [
      "Founders",
      "Business Leaders",
      "Executives",
      "Decision Makers",
      "High-performance professionals",
    ],
    focusAreas: [
      "Stress Recovery",
      "Sleep Optimization",
      "Nervous System Regulation",
      "Mental Clarity",
      "Recovery Environment",
    ],
    duration: "7–14 Days",
    ctaText: "EXPLORE EXECUTIVE RESET →",
    image:
      "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "Coastal & Mountain Sanctuaries",
    imageAlt: "Executive Reset restorative environment and therapies",
  },
  "deep-detox": {
    badge: "PROTOCOL 02",
    title: "02 — DEEP DETOX",
    subtitle: "Structured physiological restoration.",
    description:
      "An authentic metabolic and cellular purification protocol combining clinical monitoring with traditional Panchakarma therapies. Designed to eliminate systemic inflammation, restore gut microbiome integrity, and re-establish natural circadian rhythms.",
    designedFor: [
      "Individuals seeking deeper intervention and traditional Ayurvedic rejuvenation.",
    ],
    focusAreas: [
      "Detoxification",
      "Digestive Restoration",
      "Lifestyle Reset",
      "Ayurvedic Therapies",
      "Preventive Wellness",
    ],
    duration: "14–21 Days",
    ctaText: "EXPLORE DEEP DETOX →",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "Traditional Ayurvedic Sanctuaries",
    imageAlt:
      "Deep Detox and Panchakarma authentic Ayurvedic rejuvenation sanctuary",
  },
  longevity: {
    badge: "PROTOCOL 03",
    title: "03 — LONGEVITY & HEALTHY AGEING",
    subtitle: "Supporting long-term vitality and healthspan.",
    description:
      "A forward-looking cellular rejuvenation protocol designed to extend healthspan and vitality. Integrates sub-alpine oxygen therapy, hydro-thermal circulation, and personalized cellular metabolic guidance within protected mountain enclaves.",
    designedFor: [
      "Professionals",
      "Families",
      "Preventive Wellness Seekers",
      "Midlife Health Optimization",
    ],
    focusAreas: [
      "Longevity",
      "Recovery",
      "Movement",
      "Lifestyle Optimization",
      "Ageing Well",
      "Vitality",
    ],
    duration: "7–21 Days",
    ctaText: "EXPLORE LONGEVITY →",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "High-Altitude & Nature Terrains",
    imageAlt:
      "Longevity and healthy ageing hydrotherapy and vitality sanctuary",
  },
  sovereign: {
    badge: "PROTOCOL 04",
    title: "04 — SOVEREIGN",
    subtitle: "The most personalized Geo-Wellness journey offered by DARSHAI.",
    description:
      "The definitive bespoke Geo-Wellness journey. Engineered through multi-layer clinical assessment and matched across environment, sanctuary microclimate, and partner capability to create an unparalleled private recovery protocol.",
    builtAround: [
      "Individual Goals",
      "Lifestyle",
      "Preferences",
      "Environment",
      "Journey Duration",
      "Programme Suitability",
    ],
    duration: "Bespoke 7–21 Days",
    ctaText: "DISCOVER SOVEREIGN →",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=900&fit=crop&auto=format",
    imageCaption: "Exclusive Private Sanctuaries",
    imageAlt: "Sovereign Protocol bespoke luxury wellness sanctuary suite",
  },
};
const PROTOCOL_DEEP_DIVE = {
  "executive-reset": {
    overview:
      "A clinical and physiological recovery framework engineered for leaders facing cognitive overload, chronic sympathetic nervous system activation, and burnout. Combines neuro-resilience protocols, vagal tone activation, and sub-alpine or coastal air quality to reverse fatigue and optimize sleep architecture.",
    clinicalTherapies: [
      "Vagus Nerve & Parasympathetic Stimulation",
      "Shirodhara & Somatic Bio-Reset",
      "Hyperbaric Oxygen Therapy (HBOT)",
      "Targeted IV Micronutrient & Amino Therapy",
      "Circadian Light & Sleep Architecture Alignment",
    ],
    diagnosticBaseline: [
      "Continuous Heart Rate Variability (HRV) Telemetry",
      "Salivary Cortisol & Neuro-Endocrine Profile",
      "Cognitive Reaction & Neural Fatigue Index",
      "Sleep Architecture & Oxygen Saturation Analysis",
    ],
    dailyRhythm: [
      { time: "07:00 AM", activity: "Circadian Sunlight & Cold Hydro-Therapy" },
      {
        time: "09:30 AM",
        activity: "Somatic Nervous System Regulation & Shirodhara",
      },
      { time: "02:00 PM", activity: "Hyperbaric Oxygen & Thermal Rest" },
      {
        time: "06:00 PM",
        activity: "Vagal Tone Stimulation & Sunset Breathing Protocol",
      },
    ],
    geoAlignment:
      "Sub-alpine mountain forests and negative-ion coastal microclimates that naturally reduce atmospheric cortisol triggers.",
    includedServices: [
      "Private Luxury Sanctuary Suite",
      "Dedicated Medical & Ayurvedic Protocol Doctor",
      "Personalized Organic Bio-Nutritional Dining",
      "Airport Transfers & Priority Care Management",
    ],
  },
  "deep-detox": {
    overview:
      "An authentic metabolic purification protocol combining clinical diagnostics with traditional Panchakarma. Eliminates systemic cellular waste, purifies blood and organ matrices, and restores gut microbiome balance.",
    clinicalTherapies: [
      "Snehan & Swedan Herbal Oleation & Thermal Steam",
      "Virechan & Basti Targeted Cellular Purification",
      "Gut Microbiome Bio-Restoration & Probiotics",
      "Therapeutic Lymphatic Drainage & Abhyanga",
      "Thermal Mineral Hydro-Circulation",
    ],
    diagnosticBaseline: [
      "Heavy Metal & Toxin Screening",
      "Gut Microbiome Metagenomic Sequencing",
      "Metabolic Rate & Inflammatory Markers (hs-CRP)",
      "Hepatic & Renal Excretion Panel",
    ],
    dailyRhythm: [
      { time: "06:30 AM", activity: "Herbal Decoction & Warm Swedan Steam" },
      { time: "10:00 AM", activity: "Clinical Panchakarma Therapy & Abhyanga" },
      {
        time: "01:00 PM",
        activity: "Kitchari & Ayurvedic Gut-Restorative Lunch",
      },
      { time: "05:00 PM", activity: "Gentle Restorative Yoga & Meditation" },
    ],
    geoAlignment:
      "High-oxygen tropical rainforest or mineral-rich thermal springs in Southern India for optimal metabolic excretion.",
    includedServices: [
      "Authentic Panchakarma Suite",
      "Full Ayurvedic Physician Consultation & Daily Rounds",
      "Custom Herbal Formulations & Tailored Diet",
      "Post-Detox 30-Day Follow-Up Protocol",
    ],
  },
  longevity: {
    overview:
      "A forward-looking cellular rejuvenation protocol designed to extend healthspan, enhance mitochondrial density, and optimize long-term metabolic vitality through sub-alpine oxygen adaptation and hydro-thermal circulation.",
    clinicalTherapies: [
      "Mitochondrial Photobiomodulation (Red Light)",
      "Sub-Alpine Altitude Adaptation Training",
      "NAD+ Cellular Rejuvenation Therapy",
      "Hydro-Thermal Circulation Boosting",
      "Cryotherapy & Contrast Immersion",
    ],
    diagnosticBaseline: [
      "Epigenetic Biological Age & Telomere Analysis",
      "Mitochondrial Function & VO2 Max Baseline",
      "Advanced Lipidomics & Glycation Index",
      "Body Composition & Bone Density Scan",
    ],
    dailyRhythm: [
      {
        time: "07:30 AM",
        activity: "Altitude Adaptive Breathing & Red Light Therapy",
      },
      {
        time: "10:30 AM",
        activity: "Contrast Hydrotherapy & Lymphatic Flushing",
      },
      {
        time: "03:00 PM",
        activity: "NAD+ Infusion & Targeted Muscle Conditioning",
      },
      {
        time: "06:30 PM",
        activity: "Mitochondrial Nutrition & Longevity Lecture",
      },
    ],
    geoAlignment:
      "Sub-alpine Himalayan foothills (1,500m+) providing moderate hypoxia that naturally stimulates cellular longevity pathways.",
    includedServices: [
      "Private Rejuvenation Villa",
      "Longevity Physician & Bio-Hacker Guide",
      "Epigenetic Bio-Nutritional Plan",
      "6-Month Healthspan Roadmap & Coaching",
    ],
  },
  sovereign: {
    overview:
      "The definitive bespoke Geo-Wellness journey engineered through multi-layer clinical assessment, sanctuary microclimate alignment, and dedicated specialist teams for total physiological and executive sovereign restoration.",
    clinicalTherapies: [
      "Bespoke Multi-Modal Therapy Fusion",
      "Private Sanctuary Bio-Dome Environment",
      "Custom Bio-Identical Hormone & Nutrient Protocol",
      "Neuro-Feedback & Cognitive Optimization",
      "Dedicated Master Practitioner Team",
    ],
    diagnosticBaseline: [
      "Full-Genome & Epigenetic Biomarker Sequencing",
      "360° Multi-System Diagnostic Suite",
      "Continuous Physiological Telemetry",
      "Comprehensive Biomarker Mapping",
    ],
    dailyRhythm: [
      {
        time: "08:00 AM",
        activity: "Bespoke Morning Re-Alignment & Vitality Protocol",
      },
      { time: "11:00 AM", activity: "Clinical Master Therapy Session" },
      {
        time: "03:30 PM",
        activity: "Microclimate Immersion & Personalized Restoration",
      },
      { time: "07:00 PM", activity: "Private Chef & Bio-Customized Dinner" },
    ],
    geoAlignment:
      "Exclusive private sanctuary estate matched precisely to physiological profile and privacy requirements.",
    includedServices: [
      "Entire Private Sanctuary Wing or Estate",
      "Full Dedicated Specialist & Medical Team",
      "24/7 Concierge & Private Jet Transfers",
      "1-Year Sovereign Health Management",
    ],
  },
};
export function ProgramsPage({ onNavigate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawParam = searchParams.get("protocol");
  const currentProtocol = VALID_PROTOCOLS.includes(rawParam)
    ? rawParam
    : "executive-reset";
  const [activeDeepDive, setActiveDeepDive] = useState(null);
  const handleProtocolChange = (tabId) => {
    if (VALID_PROTOCOLS.includes(tabId)) {
      setSearchParams({ protocol: tabId }, { replace: true });
      track("protocol_select", { protocol: tabId });
    }
  };
  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="bg-[#F5F5F7] min-h-screen text-[#1D1D1F]">
      <ProgramsCinematicHero
        onExploreClick={() => scrollToSection("protocols-showcase")}
        onNavigate={navigateTo}
      />
      <ProtocolHorizontalScrollSection
        id="protocols-showcase"
        onNavigate={navigateTo}
      />
      <div className="my-20">
        <DarshaiApproachTimelineSection
          id="darshai-approach-process"
          eyebrow="THE DARSHAI APPROACH"
          headline="Selected Through Understanding. Not Guesswork."
          supportingLine="Your goals, context and suitability guide the journey we recommend."
          stages={[
            {
              num: "01",
              title: "Understand You",
              description: "Your goals, preferences and wellness context.",
            },
            {
              num: "02",
              title: "Review Suitability",
              description:
                "Relevant assessment and professional review where appropriate.",
            },
            {
              num: "03",
              title: "Match the Journey",
              description:
                "Duration, environment, programme requirements and partner-centre capability.",
            },
            {
              num: "04",
              title: "Plan Together",
              description: "A personalised recommendation and clear proposal.",
            },
            {
              num: "05",
              title: "Coordinate Your Journey",
              description:
                "Centre coordination, preparation, agreed support and follow-up.",
            },
          ]}
        />
      </div>
      <CuratedEnvironmentsChapters
        id="trusted-wellness-centres"
        onNavigate={navigateTo}
      />
      <DarshaiMatchingEngineSection
        id="darshai-matching-engine"
        onNavigate={navigateTo}
      />
     
      <ProgramsFAQSection id="programs-faq" />
      <FinalCTA
        id="programs-final-cta"
        eyebrow="BEGIN YOUR PROTOCOL"
        heading="The Right Program Starts With The Right Understanding."
        description="Discover a Geo-Wellness journey designed around your goals, preferences and wellbeing priorities."
        buttonText="BEGIN YOUR JOURNEY"
        buttonOnClick={() => {
          track("begin_journey", { source: "programs_final_cta" });
          navigateTo("contact");
        }}
        bgImage="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=1920&auto=format&fit=crop&q=80"
      />
    </main>
  );
}
export default ProgramsPage;
