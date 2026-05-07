import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg2 from "@/assets/images/bg2.png";
import bg7 from "@/assets/images/bg7.png";
import bg3 from "@/assets/images/bg3.png";
import bg8 from "@/assets/images/bg8.png";
import sover from "@/assets/images/health.jpeg";
import corporate from "@/assets/images/nature.jpeg";
import maintenance from "@/assets/images/maintenance.png";
import prepkit from "@/assets/images/prepkit.png";
import precision from "@/assets/images/precision.png";
import environment from "@/assets/images/environment.png";
import ceo from "@/assets/images/ceo.webp";
import yoga from "@/assets/images/yoga.png";


const SLIDES = [
  {
    image: bg2,
    title: "The Transition to Strategic Health Autonomy.",
    desc: "Predictive Longevity. We map your biological data to South India’s most potent healing coordinates to reverse your chronological age.",
  },
  {
    image: bg7,
    title: "From Health Management to Biological Mastery.",
    desc: "Stop guessing and start governing your biology. We synchronize your real-time biomarkers with the Earth’s most potent healing coordinates to engineer a younger, more resilient version of you.",
  },
  {
    image: bg8,
    title: "Your DNA is the Map. Geo-Wellness is the Destination.",
    desc: "We’ve decoded the synergy between human physiology and geography. By matching your unique bio-profile to specific South Indian landscapes, we turn every mile travelled into a calculated strike against aging.",
  },
];

function HomeMain() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  /* 🔁 AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* 🎬 BACKGROUND IMAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <img
              src={SLIDES[current].image}
              className=" w-full h-full
    object-cover
    object-center
    md:object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          </motion.div>
        </AnimatePresence>

        {/* 🎬 CONTENT */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
              {/* TITLE */}
              <h1 className=" text-[48px]  md:text-[32px] lg:text-[60px] xl:text-[90px]  font-serif text-white mb-8 leading-tight">
                {SLIDES[current].title}
              </h1>

              {/* DESCRIPTION */}
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12">
                {SLIDES[current].desc}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/register">
                  <button className="px-10 py-4 bg-amber-500 text-white rounded-full tracking-widest text-sm hover:bg-amber-600 transition">
                    Begin Your Clinical Assessment
                  </button>
                </Link>

                <Link to="/program/geo-wellness-center">
                  <button className="text-white hover:underline">
                    Explore the Geo-Wellness Zones →
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🎯 SLIDER DOTS */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === i ? "w-10 bg-amber-400" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* GREEN SECTION */}
      <section className="relative w-full py-24 md:py-32 bg-green-700 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="text-3xl md:text-5xl font-serif italic text-yellow-400 mb-6 leading-tight">
              Reclaim Your Biological Sovereignty.
            </h1>

            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
              We noticed a dangerous paradox in modern health: the more
              "connected" our technology became, the more disconnected we became
              from our biological foundations. DARSHAI bridges 5,000 years of
              Ayurvedic tradition with precision-driven biomarker intelligence.
              This is not a retreat. This is the new standard of human
              optimization.
            </p>

            <button
              onClick={() => navigate("/philosophy")}
              className="group flex items-center gap-2 text-yellow-400 text-lg font-semibold"
            >
              Explore the Philosophy
              <span className="group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </motion.div>

          {/* RIGHT SMALL IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative w-[280px] md:w-[360px] h-[360px] md:h-[460px] rounded-[30px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <img
                src={bg3}
                alt="Geo Wellness"
                className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-110"
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="bg-[#f3efe8] py-24 overflow-hidden">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-start mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Left Title */}
            <div className="text-center md:text-left">
              <p className="text-sm tracking-widest text-amber-500 mb-6">
                THE ECOSYSTEM
              </p>

              <h2 className="text-4xl md:text-5xl font-serif text-green-800 leading-tight">
                The Six Gears of Longevity
              </h2>
            </div>

            {/* Right Description (Optional) */}
            <div className="flex items-center">
              {/* Add description here if needed */}
            </div>
          </motion.div>
        </div>

        {/* Full-Width Horizontal Scroll Section */}
        <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide">
          <div className="flex gap-8 px-6 md:px-12 w-max snap-x snap-mandatory pb-4">
            {/* GEAR 1 */}
            <motion.div
              className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.img
                src={sover}
                alt="Sovereign Protocols"
                className="w-[400px] h-full object-cover transition duration-700 group-hover:scale-110"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0, delay: 1.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100 transition duration-500">
                  GEAR 1
                </p>
                <h3 className="text-3xl font-serif text-white mb-3">
                  Sovereign Protocols
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition duration-500 delay-150">
                  7-Day Luxury Geo-Wellness Interventions
                </p>
              </div>
            </motion.div>

            {/* GEAR 2 */}
            <motion.div
              className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.img
                src={corporate}
                alt="Corporate Ecology"
                className="w-[400px] h-full object-cover transition duration-700 group-hover:scale-110"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0, delay: 1.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">
                  GEAR 2
                </p>
                <h3 className="text-3xl font-serif text-white mb-3">
                  Corporate Ecology
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition delay-150">
                  5-Day Executive Reset for B2B
                </p>
              </div>
            </motion.div>

            {/* GEAR 3 */}
            <motion.div
              className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.img
                src={maintenance}
                alt="Maintenance Modules"
                className="w-[400px] h-full object-cover transition duration-700 group-hover:scale-110"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0, delay: 1.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">
                  GEAR 3
                </p>
                <h3 className="text-3xl font-serif text-white mb-3">
                  Maintenance Modules
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition delay-150">
                  Habit Tracking & Video Library
                </p>
              </div>
            </motion.div>

            {/* GEAR 4 */}
            <motion.div
              className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <motion.img
                src={prepkit}
                alt="Longevity Prep-Kits"
                className="w-[400px] h-full object-cover transition duration-700 group-hover:scale-110"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0, delay: 2.0 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">
                  GEAR 4
                </p>
                <h3 className="text-3xl font-serif text-white mb-3">
                  Longevity Prep-Kits
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition delay-150">
                  Waitlist / Coming Soon
                </p>
              </div>
            </motion.div>

            {/* GEAR 5 */}
            <motion.div
              className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <motion.img
                src={precision}
                alt="Precision Tech Events"
                className="w-[400px] h-full object-cover transition duration-700 group-hover:scale-110"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0, delay: 2.2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">
                  GEAR 5
                </p>
                <h3 className="text-3xl font-serif text-white mb-3">
                  Precision Tech Events
                </h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition delay-150">
                  Bio-hacking Workshops / Hackathons
                </p>
              </div>
            </motion.div>

            {/* GEAR 6 */}
            <motion.div
              className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <img
                src={environment}
                className="w-[400px] h-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent" />

              <div
                className="absolute inset-0 flex flex-col justify-end p-8 
    opacity-0 translate-y-24 
    group-hover:opacity-100 group-hover:translate-y-0 
    transition-all duration-700"
              >
                <p className="text-xs tracking-widest text-green-200 mb-2">
                  GEAR 6
                </p>

                <h3 className="text-3xl font-serif text-white mb-3">
                  Precision Ecology & Corporate Auditing
                </h3>

                <p className="text-sm text-white/80">Office Auditing</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISIONARY, CTA, FOOTER remain SAME (no structural issues) */}
      {/* VISIONARY SECTION */}
      <section className="w-full bg-gradient-to-r from-green-700 to-green-600 py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <p className="text-sm tracking-widest text-amber-400 mb-6">
              THE VISIONARY
            </p>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-white mb-12">
              Architecting
              <br />
              <span className="text-amber-400 italic">Biological</span>
              <br />
              <span className="text-amber-400 italic">Sovereignty.</span>
            </h2>

            <div className="border-l-2 border-amber-400 pl-6 mb-10">
              <p className="text-xl md:text-2xl italic text-white/90 leading-relaxed">
                “Health is not a luxury you purchase, but a biological
                sovereignty you reclaim through mathematical precision.”
              </p>
            </div>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-4">
              Veekshitha V, is an Innovator in science communication and a
              bio-luxury strategist dedicated to bridging the Significant gap
              between ancient Ayurvedic wisdom and modern clinical data.
            </p>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-4">
              As a Silver Jubilee Year Award journalist and science scholar, she
              recognized that the greatest crisis in modern health was not a
              lack of information, but a lack of integration.
            </p>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-4">
              Under her leadership, DARSHAI has evolved from a startup concept
              into an elite ecosystem where Dharsh AI - our proprietary
              diagnostic engine, translates thousands of years of traditional
              medicine into quantifiable, data-backed longevity protocols.
            </p>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Her work focuses on the ‘Science of Where,’ a concept that
              explores the relationship between human optimization and
              environment. She is not just building a travel company; she is
              architecting a new standard for human performance.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            {/* Glow Layer */}
            <div className="absolute w-[90%] h-[90%] bg-green-500/20 rounded-[40px] blur-2xl"></div>

            {/* Image */}
            <motion.img
              src={ceo}
              alt="Visionary"
              className="relative w-full max-w-md rounded-[40px] object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 2.8 }}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={yoga} // ✅ use import instead of string path
            alt="Meditation"
            className="w-full h-full object-cover"
          />

          {/* DARK CINEMATIC OVERLAY */}
          <div className="absolute inset-0 bg-black/60 shadow-[0_50px_120px_rgba(0,0,0,0.4)]" />
        </motion.div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl px-6">
          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-tight"
          >
            The End of Reactive Health.
          </motion.h2>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 1.1 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Reclaim your 168. Join an elite group of founders and leaders in our
            2026 Sovereign Pilot. We map your data to South India's most potent
            coordinates to reverse your biological age.
          </motion.p>

          {/* BUTTON */}
          <Link to="/register">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 1.4 }}
              className="px-12 py-5 bg-amber-500 text-white rounded-full text-sm tracking-widest font-semibold hover:bg-amber-600 hover:scale-105 transition-all shadow-xl"
            >
              Apply for the Sovereign 168
            </motion.button>
          </Link>
        </div>
      </section>

      {/* FOOTER QUOTE SECTION */}
      <section className="bg-[#f3efe8] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* RIGHT TEXT */}
        </div>
      </section>
    </div>
  );
}

export default HomeMain;
