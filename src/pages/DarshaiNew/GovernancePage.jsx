import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import SmartImage from "../../components/darshaiNew/SmartImage";
import { Plus, Minus } from "lucide-react";
export function GovernancePage({ onNavigate }) {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [expandedReviewId, setExpandedReviewId] = useState(null);
  const [expandedRightId, setExpandedRightId] = useState(null);
  const transparencySectionRef = useRef(null);
  const { scrollYProgress: transparencyScroll } = useScroll({
    target: transparencySectionRef,
    offset: ["start end", "end start"],
  });
  // Progress line scrolls cleanly as visitor scrolls
  const transparencyLineScale = useTransform(
    transparencyScroll,
    [0.15, 0.75],
    [0, 1],
  );
  const navigateTo = (page) => {
    onNavigate(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <main className="bg-[#FAF8F5] min-h-screen text-[#1D1D1F] overflow-x-hidden font-sans">
      <section
        id="governance-hero"
        className="relative text-center min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0B0C0E] border-b border-white/5 px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <SmartImage
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000"
            alt="Nature backdrop"
            className="w-full h-full object-cover grayscale mix-blend-luminosity"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/25 via-[#34D399]/8 to-transparent blur-[130px] pointer-events-none z-0"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-lg"
          >
            <p className="text-xs sm:text-sm font-mono font-bold text-[#C6A660] uppercase tracking-[0.25em]">
              TRUST & GOVERNANCE
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 max-w-3xl mx-auto font-medium tracking-tight leading-[1.1]"
          >
            Trust, Made Visible.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-12 h-[2px] bg-[#34D399] mb-8 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl lg:text-[22px] text-white/70 max-w-2xl mx-auto leading-relaxed font-normal mb-10"
          >
            DARSHAI is built around clear information, responsible coordination
            and transparent communication — so you know what we do, how we work
            and what you can expect throughout your journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
          >
            {["Transparency", "Responsibility", "Accountability"].map(
              (tag, idx) => (
                <>
                  {idx > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]/70 shrink-0" />
                  )}
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white/80 whitespace-nowrap">
                    {tag}
                  </span>
                </>
              ),
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 text-white/40 hover:text-[#34D399] transition-colors"
          onClick={() => {
            const nextSec = document.getElementById("trust-overview");
            nextSec?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">
            Explore Standards
          </span>
          <span className="text-lg font-bold">↓</span>
        </motion.div>
      </section>
      <section
        id="trust-overview"
        className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#D2D2D7]/40 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
              OUR APPROACH
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 font-medium">
              Know What DARSHAI Does. <br />
              <span className="text-[#0E4D3A]">Know What It Doesn't.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                id: "transparency",
                num: "01",
                title: "TRANSPARENCY",
                desc: "Clear information about journeys, centres, programmes, pricing and applicable terms.",
                explanation:
                  "We believe trust begins with complete clarity. DARSHAI provides unvarnished details on travel logic, sanctuary standards, exact pricing structures, and terms up-front—enabling complete peace of mind.",
              },
              {
                id: "responsibility",
                num: "02",
                title: "RESPONSIBILITY",
                desc: "DARSHAI works within a defined role of assessment, matching, recommendation and coordination.",
                explanation:
                  "Our focus is clear: scientific assessment of your bio-telemetry, intelligent matching with microclimates, and professional journey coordination. We are your dedicated navigators throughout the planning and follow-up phases.",
              },
              {
                id: "accountability",
                num: "03",
                title: "PARTNER ACCOUNTABILITY",
                desc: "Wellness-centre partners remain responsible for the services and on-site experience they deliver.",
                explanation:
                  "We partner exclusively with accredited, world-class clinical sanctuaries. Each partner remains fully accountable for delivering the clinical treatments, therapy programs, and high-standard on-site hospitality under our guidelines.",
              },
              {
                id: "control",
                num: "04",
                title: "CLIENT CONTROL",
                desc: "Clients receive relevant information and make informed decisions before confirming a journey.",
                explanation:
                  "You hold the ultimate compass. We curate options based on suitability and bio-climatic matching, present detailed recommendations, and only coordinate arrangements upon your explicit consent and confirmation.",
              },
            ].map((card, idx) => {
              const isExpanded = expandedCardId === card.id;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: "easeOut",
                  }}
                  onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                  className={`rounded-[24px] p-6 sm:p-8 cursor-pointer relative transition-all duration-300 border flex flex-col justify-between min-h-[180px] bg-white group select-none ${
                    isExpanded
                      ? "border-[#0E4D3A] ring-1 ring-[#0E4D3A]/10 shadow-md"
                      : "border-[#D2D2D7]/60 shadow-xs hover:border-[#0E4D3A]/40 hover:shadow-md hover:-translate-y-1"
                  }`}
                  key={card.id}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-[#C6A660] tracking-wider">
                        {card.num}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#FAF8F5] group-hover:bg-[#0E4D3A]/10 text-[#0E4D3A] flex items-center justify-center transition-colors">
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2 group-hover:text-[#0E4D3A] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#D2D2D7]/40 pt-4 mt-4"
                      >
                        <p className="text-sm text-[#0E4D3A] leading-relaxed font-medium">
                          {card.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="how-it-works"
        className="py-24 md:py-32 border-b border-[#D2D2D7]/40 bg-[#FAF8F5] relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
              ROLE & RESPONSIBILITY
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 font-medium">
              DARSHAI Coordinates. <br />
              <span className="text-[#0E4D3A]">Partners Deliver.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-1 md:col-span-5 bg-white border border-[#D2D2D7]/60 rounded-[24px] p-8 sm:p-10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-[#E5E5EA] pb-4 mb-6">
                  <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-[#0E4D3A] uppercase">
                    DARSHAI
                  </h3>
                </div>
                <ul className="divide-y divide-[#F2F2F7]">
                  {[
                    "Assessment",
                    "Geo-Wellness Matching",
                    "Recommendation",
                    "Booking Coordination",
                    "Journey Coordination",
                  ].map((item) => (
                    <li
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      key={item}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#0E4D3A] shrink-0" />
                      <span className="font-semibold text-base text-[#1D1D1F]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <div className="hidden md:flex col-span-1 h-full min-h-[300px] flex-col items-center justify-center relative">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                className="absolute w-[2px] bg-[#D2D2D7]/50 origin-top h-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative z-10 px-3.5 py-2 rounded-full bg-[#0E4D3A] text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md select-none"
              >
                COORDINATION
              </motion.div>
            </div>
            <div className="flex md:hidden col-span-1 py-8 flex-col items-center justify-center relative">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                className="absolute w-[2px] bg-[#D2D2D7]/50 origin-top h-24"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative z-10 px-3.5 py-2 rounded-full bg-[#0E4D3A] text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md select-none"
              >
                COORDINATION
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-1 md:col-span-5 bg-white border border-[#D2D2D7]/60 rounded-[24px] p-8 sm:p-10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-[#E5E5EA] pb-4 mb-6">
                  <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-[#1D1D1F] uppercase">
                    PARTNER CENTRE
                  </h3>
                </div>
                <ul className="divide-y divide-[#F2F2F7]">
                  {[
                    "Programme Delivery",
                    "Clinical / Wellness Services",
                    "Accommodation",
                    "On-site Operations",
                    "Guest Experience",
                  ].map((item) => (
                    <li
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      key={item}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#C6A660] shrink-0" />
                      <span className="font-semibold text-base text-[#1D1D1F]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          <div className="mt-16 pt-6 border-t border-[#D2D2D7]/40 flex items-center justify-center gap-3 text-xs sm:text-sm text-[#48484A] text-center max-w-3xl mx-auto font-medium">
            <span className="w-2 h-2 rounded-full bg-[#C6A660] animate-pulse shrink-0" />
            <span>
              DARSHAI does not own, operate or manage partner wellness centres
              unless explicitly stated.
            </span>
          </div>
        </div>
      </section>
      <section
        id="partner-review-framework"
        className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#D2D2D7]/40 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
              PARTNER REVIEW FRAMEWORK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 font-medium">
              How We Review <br />
              <span className="text-[#0E4D3A]">Wellness Centres.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {[
              {
                id: "programme-capability",
                num: "01",
                title: "PROGRAMME CAPABILITY",
                desc: "Relevant programmes, practitioners and capabilities for the journey type.",
                explanation:
                  "We assess practitioner credentials, clinical training standards, therapeutic lineage depth, and programme alignment with each of our core physiological wellness protocols.",
              },
              {
                id: "environment-quality",
                num: "02",
                title: "ENVIRONMENT QUALITY",
                desc: "Environmental suitability considered as part of Geo-Wellness matching.",
                explanation:
                  "We evaluate local biophilic features, environmental air/noise purity levels, bio-climatic resonance values, and terrain microclimate suitability to feed our matching algorithm.",
              },
              {
                id: "operational-readiness",
                num: "03",
                title: "OPERATIONAL READINESS",
                desc: "Accommodation, service and operational readiness.",
                explanation:
                  "We review on-site facilities, room standards, clinical hygiene standards, kitchen dietary capability, and general administrative readiness before matching any client.",
              },
              {
                id: "client-experience",
                num: "04",
                title: "CLIENT EXPERIENCE",
                desc: "Service quality and journey suitability.",
                explanation:
                  "We audit end-to-end client feedback history, care navigation pathways, privacy protocols, and standard hospitality hospitality indicators to guarantee a seamless stay.",
              },
              {
                id: "documentation-governance",
                num: "05",
                title: "DOCUMENTATION & GOVERNANCE",
                desc: "Relevant business and operational information required for onboarding.",
                explanation:
                  "We verify registration certificates, business licenses, medical certifications (where applicable), insurance policies, and organizational governance structures.",
              },
            ].map((card, idx) => {
              const isExpanded = expandedReviewId === card.id;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: "easeOut",
                  }}
                  onClick={() =>
                    setExpandedReviewId(isExpanded ? null : card.id)
                  }
                  className={`rounded-[24px] p-6 sm:p-8 cursor-pointer relative transition-all duration-300 border flex flex-col justify-between min-h-[180px] bg-white group select-none ${
                    isExpanded
                      ? "border-[#0E4D3A] ring-1 ring-[#0E4D3A]/10 shadow-md"
                      : "border-[#D2D2D7]/60 shadow-xs hover:border-[#0E4D3A] hover:shadow-md hover:-translate-y-1"
                  }`}
                  key={card.id}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-[#C6A660] tracking-wider">
                        {card.num}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#FAF8F5] group-hover:bg-[#0E4D3A]/10 text-[#0E4D3A] flex items-center justify-center transition-colors">
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2 group-hover:text-[#0E4D3A] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#48484A] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#D2D2D7]/40 pt-4 mt-4"
                      >
                        <p className="text-sm text-[#0E4D3A] leading-relaxed font-medium">
                          {card.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <p className="text-xs text-[#6E6E73] text-center mt-12 max-w-2xl mx-auto font-normal">
            Partner review criteria may vary according to centre type, programme
            and journey requirements.
          </p>
        </div>
      </section>
      <section
        id="transparency-timeline"
        ref={transparencySectionRef}
        className="py-24 md:py-32 border-b border-[#D2D2D7]/40 bg-[#FAF8F5] relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col justify-start text-left lg:sticky lg:top-28">
              <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
                BEFORE YOU CONFIRM
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-6 font-medium">
                Know What You're Choosing. <br />
                <span className="text-[#0E4D3A]">Before You Commit.</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#0E4D3A] mb-6" />
              <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
                Relevant journey, centre, programme, pricing and applicable
                terms are communicated before confirmation, subject to
                availability and the applicable partner-centre conditions.
              </p>
            </div>
            <div className="lg:col-span-7 relative pl-10 sm:pl-12 py-2">
              <div className="absolute left-[17px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-[#D2D2D7]/40 z-0" />
              <motion.div
                className="absolute left-[17px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-[#0E4D3A] origin-top z-0"
                style={{ scaleY: transparencyLineScale }}
              />
              <div className="space-y-12 sm:space-y-14 relative z-10">
                {[
                  { num: "01", title: "Journey Recommendation" },
                  { num: "02", title: "Centre Information" },
                  { num: "03", title: "Programme Details" },
                  { num: "04", title: "Duration" },
                  { num: "05", title: "Pricing" },
                  { num: "06", title: "Inclusions & Exclusions" },
                  { num: "07", title: "Cancellation Terms" },
                ].map((step) => {
                  return (
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.8 }}
                      variants={{
                        hidden: { opacity: 0.25, x: 10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="flex items-start gap-4 sm:gap-6 relative group"
                      key={step.num}
                    >
                      <div className="absolute -left-[32px] sm:-left-[37px] top-1.5 flex items-center justify-center">
                        <motion.div
                          variants={{
                            hidden: {
                              scale: 0.8,
                              backgroundColor: "#E5E5EA",
                              borderColor: "#D2D2D7",
                            },
                            visible: {
                              scale: 1.1,
                              backgroundColor: "#0E4D3A",
                              borderColor: "#0E4D3A",
                            },
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-4 h-4 rounded-full border-2 bg-white shadow-2xs"
                        />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-[#C6A660] mb-0.5 block group-hover:text-[#0E4D3A] transition-colors duration-300">
                          {step.num}
                        </span>
                        <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1D1D1F] leading-snug group-hover:text-[#0E4D3A] transition-colors duration-300">
                          {step.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="privacy-data"
        className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#D2D2D7]/40 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
              PRIVACY
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 font-medium">
              Your Information <br />
              <span className="text-[#0E4D3A]">Has a Purpose.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start mt-12">
            <div className="flex flex-col justify-start">
              <div className="border-b border-[#D2D2D7]/60 pb-3 mb-5">
                <h3 className="text-base font-bold tracking-wider text-[#1D1D1F] uppercase">
                  COLLECT
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
                Information required to understand your journey requirements and
                provide relevant services.
              </p>
            </div>
            <div className="flex flex-col justify-start">
              <div className="border-b border-[#D2D2D7]/60 pb-3 mb-5">
                <h3 className="text-base font-bold tracking-wider text-[#1D1D1F] uppercase">
                  USE
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
                Used for assessment, recommendations, communication,
                coordination and service improvement.
              </p>
            </div>
            <div className="flex flex-col justify-start">
              <div className="border-b border-[#D2D2D7]/60 pb-3 mb-5">
                <h3 className="text-base font-bold tracking-wider text-[#1D1D1F] uppercase">
                  SHARE
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
                Shared only where reasonably necessary to provide services or
                meet legal obligations.
              </p>
            </div>
          </div>
          <div className="mt-16 flex justify-start">
            <button
              onClick={() => navigateTo("privacy")}
              className="text-[#0E4D3A] hover:text-[#0A3527] font-bold tracking-wider uppercase inline-flex items-center gap-2 group text-sm sm:text-base cursor-pointer transition-colors duration-300"
            >
              <span>READ PRIVACY POLICY</span>
              <span
                aria-hidden="true"
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              >
                →
              </span>
            </button>
          </div>
          <div className="mt-24 pt-8 border-t border-[#D2D2D7]/40 text-xs text-[#6E6E73] leading-relaxed">
            <p>
              Client information is collected and processed securely only for
              assessment, recommendation, and journey coordination purposes
              under strict privacy guidelines aligned with global data
              protection norms.
            </p>
          </div>
        </div>
      </section>
      <section
        id="clinical-boundary"
        className="py-24 md:py-32 bg-[#0B0C0E] text-white relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/20 to-transparent blur-[120px] pointer-events-none z-0" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 text-left">
              <p className="text-xs font-mono font-bold text-[#C6A660] mb-3 uppercase tracking-[0.2em]">
                CLINICAL BOUNDARY
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-4 font-medium">
                Guidance, <br />
                <span className="text-[#34D399]">Not Diagnosis.</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#34D399]" />
            </div>
            <div className="lg:col-span-6 text-left space-y-6 lg:pt-8 text-white/80">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                DARSHAI provides wellness discovery, assessment, matching and
                coordination services. These services do not replace medical
                diagnosis, treatment or advice from a qualified healthcare
                professional.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-normal text-white/60">
                Recommendations are based on available information and
                suitability criteria and are not guarantees of medical or
                wellness outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="client-rights"
        className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#D2D2D7]/40 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col justify-start text-left lg:sticky lg:top-28">
              <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
                YOUR RIGHTS
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-6 font-medium">
                You Should Know <br />
                <span className="text-[#0E4D3A]">Your Options.</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#0E4D3A] mb-6" />
              <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal mb-8">
                Every individual connecting with DARSHAI retains full agency and
                rights over how their assessments are matched, recorded and
                referenced.
              </p>
              <div className="flex justify-start">
                <button
                  onClick={() => navigateTo("contact")}
                  className="text-[#0E4D3A] hover:text-[#0A3527] font-bold tracking-wider uppercase inline-flex items-center gap-2 group text-sm sm:text-base cursor-pointer transition-colors duration-300"
                >
                  <span>CONTACT PRIVACY TEAM</span>
                  <span
                    aria-hidden="true"
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  id: "access",
                  title: "Access your information",
                  explanation:
                    "You have the right to request a full, detailed copy of all personal telemetry, assessment responses, matching histories, and records maintained on our secure servers.",
                },
                {
                  id: "correction",
                  title: "Request correction",
                  explanation:
                    "If you find any inaccuracies in your profile, medical questionnaire summaries, or journey preferences, you have the right to request immediate correction and revision.",
                },
                {
                  id: "deletion",
                  title: "Request deletion where applicable",
                  explanation:
                    "You may request the permanent deletion of your profile, assessments, and records. This is fulfilled promptly subject to medical/financial audit log regulatory retention rules.",
                },
                {
                  id: "withdraw",
                  title: "Withdraw consent where applicable",
                  explanation:
                    "If you previously consented to the processing or matching of specialized assessment indicators, you have the right to withdraw that consent, instantly halting matching activities.",
                },
                {
                  id: "understand",
                  title: "Understand how information is processed",
                  explanation:
                    "We guarantee complete transparency into how our matching algorithm analyzes environmental factors and clinical protocols to recommend sanctuaries—ensuring no hidden logic.",
                },
              ].map((item, idx) => {
                const isExpanded = expandedRightId === item.id;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: "easeOut",
                    }}
                    onClick={() =>
                      setExpandedRightId(isExpanded ? null : item.id)
                    }
                    className={`rounded-[20px] p-5 sm:p-6 cursor-pointer relative transition-all duration-300 border bg-white group select-none ${
                      isExpanded
                        ? "border-[#0E4D3A] ring-1 ring-[#0E4D3A]/10 shadow-md"
                        : "border-[#D2D2D7]/60 shadow-xs hover:border-[#0E4D3A]/40 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                    key={item.id}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-sm sm:text-base text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors duration-300">
                        •   {item.title}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-[#FAF8F5] group-hover:bg-[#0E4D3A]/10 text-[#0E4D3A] flex items-center justify-center transition-colors shrink-0">
                        {isExpanded ? (
                          <Minus className="w-3 h-3" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden border-t border-[#D2D2D7]/40 pt-3 mt-3"
                        >
                          <p className="text-sm text-[#0E4D3A] leading-relaxed font-medium">
                            {item.explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section
        id="governance-library"
        className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#D2D2D7]/40 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
              GOVERNANCE RESOURCES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 font-medium">
              Clear Documents. <br />
              <span className="text-[#0E4D3A]">One Place.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Privacy Policy",
                desc: "How DARSHAI handles personal information.",
                cta: "READ →",
                action: () => navigateTo("privacy"),
              },
              {
                title: "Terms of Service",
                desc: "How the DARSHAI platform and services operate.",
                cta: "READ →",
                action: () => navigateTo("terms"),
              },
              {
                title: "Partner Review Framework",
                desc: "How DARSHAI evaluates partner-centre suitability.",
                cta: "EXPLORE →",
                action: () => {
                  const sec = document.getElementById(
                    "partner-review-framework",
                  );
                  sec?.scrollIntoView({ behavior: "smooth" });
                },
              },
              {
                title: "Contact & Governance",
                desc: "For questions about trust, privacy or business practices.",
                cta: "CONTACT →",
                action: () => navigateTo("contact"),
              },
            ].map((resource, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                onClick={resource.action}
                className="rounded-[24px] p-6 sm:p-7 border border-[#D2D2D7]/60 bg-white hover:border-[#0E4D3A] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px] cursor-pointer group select-none"
                key={resource.title}
              >
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors duration-300 mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed">
                    {resource.desc}
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#0E4D3A] group-hover:text-[#0A3527] uppercase">
                    {resource.cta}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="governing-framework"
        className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <p className="text-xs font-mono font-bold text-[#0E4D3A] mb-3 uppercase tracking-[0.2em]">
              LEGAL FRAMEWORK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 font-medium">
              Governed With Clarity.
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
            {[
              {
                title: "Applicable Law",
                desc: "Indian law, subject to the applicable DARSHAI Terms.",
              },
              {
                title: "Jurisdiction",
                desc: "As specified in the DARSHAI Terms of Service.",
              },
              {
                title: "Policy Updates",
                desc: "Important legal and policy changes are published through the relevant document.",
              },
            ].map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: "easeOut",
                }}
                className="flex flex-col justify-start"
                key={item.title}
              >
                <div className="border-b border-[#D2D2D7]/60 pb-3 mb-4">
                  <h3 className="text-base font-bold uppercase tracking-wide text-[#1D1D1F]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 flex justify-start">
            <button
              onClick={() => navigateTo("terms")}
              className="text-[#0E4D3A] hover:text-[#0A3527] font-bold tracking-wider uppercase inline-flex items-center gap-2 group text-sm sm:text-base cursor-pointer transition-colors duration-300"
            >
              <span>VIEW TERMS OF SERVICE</span>
              <span
                aria-hidden="true"
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>
      <section
        id="governance-final-cta"
        className="py-24 md:py-32 bg-[#0B0C0E] text-white relative overflow-hidden text-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0E4D3A]/25 via-[#34D399]/8 to-transparent blur-[130px] pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <p className="text-xs sm:text-sm font-mono font-bold text-[#C6A660] mb-4 uppercase tracking-[0.25em]">
            TRUST & GOVERNANCE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight leading-[1.1] mb-6 max-w-3xl">
            Understand The Framework. <br />
            <span className="text-[#34D399]">Then Begin Your Journey.</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#34D399] mb-8" />
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed mb-10 font-normal">
            DARSHAI provides structured, independent matching to give you
            absolute confidence in your wellness selection. No generic
            directories. Just verified suitability.
          </p>
          <button
            onClick={() => {
              navigateTo("contact");
            }}
            className="px-8 py-4 text-xs font-mono tracking-[0.2em] font-bold text-white bg-[#0E4D3A] border border-white/10 rounded-full hover:bg-[#12634B] hover:border-white/30 transition-all duration-300 flex items-center gap-3 shadow-md hover:shadow-xl cursor-pointer"
          >
            <span>BEGIN YOUR JOURNEY</span>
            <span aria-hidden="true" className="text-sm">
              →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
export default GovernancePage;
