import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, CheckCircle2, Sparkles } from "lucide-react";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
const PROGRAMS = [
  {
    id: "restore",
    number: "01",
    title: "DARSHAI RESTORE",
    duration: "7 DAYS",
    subtitle:
      "A focused week to step away from daily demands, reset your routine, and begin restoring energy.",
    description:
      "Designed for leaders and individuals experiencing acute performance fatigue or cognitive drain. Restore re-establishes sleep architecture, nervous system regulation, and baseline vitality within a restorative natural sanctuary.",
    focus: [
      "Recovery",
      "Rest",
      "Daily routine",
      "Sleep Optimization",
      "Nervous System Regulation",
    ],
    purpose:
      "To provide a rapid, highly effective reset from modern performance burnout, clearing cognitive fog and re-calibrating daily physiological rhythms.",
    experience: [
      "Targeted somatic nervous system regulation and vagal stimulation",
      "Daily restorative hydrotherapy and circadian light exposure",
      "Customized organic nutritional support and herbal infusion protocols",
      "Protected restorative downtime in pristine natural microclimates",
    ],
    nextStep:
      "Select your preferred sanctuary partner or request a personalized recommendation based on your current location and schedule.",
    image:
      "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=1200&h=900&fit=crop&auto=format",
    imageAlt: "DARSHAI Restore Sanctuary Environment",
  },
  {
    id: "rebalance",
    number: "02",
    title: "DARSHAI REBALANCE",
    duration: "14 DAYS",
    subtitle:
      "Two weeks for a deeper, structured wellness immersion designed to build balance through sustained care and restorative practices.",
    description:
      "An immersive 14-day protocol that bridges clinical evaluation with traditional rejuvenation therapies. Rebalance addresses metabolic sluggishness, deep-seated stress patterns, and sustainable lifestyle habit formation.",
    focus: [
      "Structured care",
      "Restorative practices",
      "Wellbeing routines",
      "Metabolic Reset",
      "Digestive Harmony",
    ],
    purpose:
      "To achieve deeper physiological rebalancing, reset metabolic pathways, and instill durable daily wellbeing rituals that endure long after departure.",
    experience: [
      "Comprehensive biomarker baseline assessment and clinical consultation",
      "Structured multi-modal therapy sessions including therapeutic massage and hydro-thermal circulation",
      "Guided mindfulness and somatic movement practices",
      "Tailored dietary architecture designed for gut microbiome restoration",
    ],
    nextStep:
      "Review your preferred partner wellness centre suitability or coordinate your arrival schedule with our Global Journey Management team.",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=900&fit=crop&auto=format",
    imageAlt: "DARSHAI Rebalance Immersion Sanctuary",
  },
  {
    id: "longevity",
    number: "03",
    title: "DARSHAI LONGEVITY",
    duration: "21 DAYS",
    subtitle:
      "Three weeks for a more comprehensive wellness journey focused on healthy-ageing foundations, lasting habits, and long-term vitality.",
    description:
      "Our most comprehensive structural protocol. Longevity integrates advanced cellular rejuvenation, sub-alpine or high-oxygen altitude adaptation, metabolic tracking, and healthspan extension methodologies.",
    focus: [
      "Healthy-ageing foundations",
      "Sustainable habits",
      "Long-term vitality",
      "Cellular Health",
      "Mitochondrial Optimization",
    ],
    purpose:
      "To establish lifelong healthspan foundations, optimize mitochondrial function, and integrate advanced anti-aging protocols into a sustainable personal framework.",
    experience: [
      "Advanced diagnostics including metabolic rate, inflammatory markers, and biological age assessment",
      "Sub-alpine altitude adaptation training and mitochondrial photobiomodulation",
      "Personalized longevity roadmap with ongoing 90-day continuity support",
      "Exclusive private sanctuary enclave accommodation with dedicated medical oversight",
    ],
    nextStep:
      "Initiate your Sovereign consultation or connect with our clinical team to design your bespoke 21-day longevity itinerary.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&h=900&fit=crop&auto=format",
    imageAlt: "DARSHAI Longevity & Healthspan Sanctuary",
  },
];
export function DarshaiMethodSection({
  id = "why-programs-exist",
  onNavigate,
}) {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const handleOpenProgram = (program) => {
    track("protocol_select", { protocol: program.id, title: program.title });
    setSelectedProgram(program);
  };
  return (
    <section
      id={id}
      className="py-20 sm:py-28 lg:py-36 bg-[#F5F5F7] border-b border-[#D2D2D7]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 sm:mb-20">
          <p className="typography-eyebrow text-[#0E4D3A] mb-3">
            THE DARSHAI METHOD
          </p>
          <h2 className="typography-section-h2 text-[#1D1D1F] mb-4 tracking-tight">
            Different Goals. Different Journeys.
          </h2>
          <p className="text-lg sm:text-xl text-[#86868B] font-normal leading-relaxed">
            Choose a starting point. We help shape the journey around you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS.map((prog, index) => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => handleOpenProgram(prog)}
              className="relative h-[560px] sm:h-[600px] rounded-[28px] overflow-hidden bg-[#1D1D1F] border border-white/80 hover:border-[#34D399] shadow-xl hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] group cursor-pointer transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between p-6 sm:p-8"
              key={prog.id}
            >
              <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                <SmartImage
                  src={prog.image}
                  alt={prog.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/30 uppercase tracking-wider">
                  {prog.number} / 03
                </span>
                <span className="text-xs font-mono text-[#34D399] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#34D399]/40 uppercase tracking-wider font-semibold shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                  {prog.duration}
                </span>
              </div>
              <div className="relative z-10 space-y-2 mt-auto text-center flex flex-col items-center">
                <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-extrabold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                  {prog.number} — PATHWAY
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#34D399] transition-colors duration-300">
                  {prog.title}
                </h3>
                <div className="max-h-0 opacity-0 pointer-events-none group-hover:max-h-[340px] group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden pt-0 group-hover:pt-2 w-full flex flex-col items-center">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/85 border border-[#34D399]/50 shadow-[0_0_20px_rgba(52,211,153,0.35)] backdrop-blur-md space-y-3 w-full flex flex-col items-center">
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal text-center mx-auto">
                      {prog.subtitle}
                    </p>
                    <div className="pt-2 border-t border-white/20 w-full flex flex-col items-center">
                      <p className="text-[11px] font-mono text-[#34D399] uppercase tracking-wider mb-1.5 font-extrabold text-center drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]">
                        Journey focus:
                      </p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {prog.focus.slice(0, 3).map((f, i) => (
                          <span
                            className="text-[11px] font-semibold bg-[#34D399]/15 text-white px-2.5 py-0.5 rounded-full border border-[#34D399]/40 backdrop-blur-xs"
                            key={i}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-1 w-full flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProgram(prog);
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#34D399] text-black font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-[0_0_15px_rgba(52,211,153,0.5)] cursor-pointer"
                      >
                        <span>
                          EXPLORE {prog.title.replace(/^[0-9—\s]+/, "")}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl border border-[#D2D2D7] max-h-[90vh] flex flex-col relative"
            >
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#D2D2D7] bg-[#F5F5F7]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0E4D3A] text-white tracking-widest">
                    {selectedProgram.number}
                  </span>
                  <span className="text-xs font-mono uppercase text-[#86868B] tracking-wider">
                    {selectedProgram.duration} PROGRAM OVERVIEW
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="w-9 h-9 rounded-full bg-white border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                <div className="relative rounded-[24px] overflow-hidden aspect-[16/7] bg-[#1D1D1F]">
                  <SmartImage
                    src={selectedProgram.image}
                    alt={selectedProgram.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
                      {selectedProgram.title}
                    </h2>
                    <p className="text-sm text-white/80 font-normal">
                      {selectedProgram.subtitle}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0E4D3A]">
                    Purpose & Objective
                  </h4>
                  <p className="text-base sm:text-lg text-[#1D1D1F] leading-relaxed font-normal">
                    {selectedProgram.purpose}
                  </p>
                </div>
                <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-[#D2D2D7]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#86868B] mb-2">
                    Program Overview
                  </h4>
                  <p className="text-[#1D1D1F] text-sm sm:text-base leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0E4D3A]">
                    Experience & Core Modalities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProgram.experience.map((exp, idx) => (
                      <div
                        className="flex items-start gap-3 bg-[#F5F5F7] p-4 rounded-xl border border-[#D2D2D7]"
                        key={idx}
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#0E4D3A] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#1D1D1F] leading-snug">
                          {exp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#D2D2D7] pt-6 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0E4D3A]">
                    Next Step
                  </h4>
                  <p className="text-sm sm:text-base text-[#1D1D1F] leading-relaxed">
                    {selectedProgram.nextStep}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 py-5 border-t border-[#D2D2D7] bg-[#F5F5F7] flex items-center justify-end gap-4">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-2.5 rounded-full border border-[#D2D2D7] text-sm font-medium text-[#1D1D1F] hover:bg-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    track("request_personalised_recommendation", {
                      program: selectedProgram.id,
                    });
                    setSelectedProgram(null);
                    onNavigate("contact");
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#0E4D3A] text-white text-sm font-semibold hover:bg-[#0A382A] transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Recommendation</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default DarshaiMethodSection;
