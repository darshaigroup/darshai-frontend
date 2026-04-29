import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function HomeMain() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO SECTION */}
      <motion.section
        className="min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/src/assets/images/Hero.jpg')",
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative max-w-5xl mx-auto px-6 z-10">
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-tight text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Health is not a destination of rest, but the state of equilibrium
            between your biological tectonic gears
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Predictive Longevity We map your biological data to South India's
            most potent healing coordinates to reverse your chronological age.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="px-10 py-4 bg-amber-500 text-white rounded-full text-sm tracking-widest font-semibold hover:bg-amber-600 transition">
              Begin Your Clinical Assessment
            </button>

            <button className="text-white flex items-center gap-2 hover:underline">
              Explore the Geo-Wellness Zones
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* GREEN SECTION */}
      <section className="w-full lg:min-h-screen flex flex-col lg:flex-row">
        <motion.div 
          className="w-full lg:w-1/2 bg-green-700 text-white flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-xl mx-auto px-10 py-16">
            <h1 className="text-3xl md:text-4xl font-serif italic text-yellow-400 mb-6 leading-tight whitespace-nowrap">
              Reclaim Your Biological Sovereignty.
            </h1>

            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              We noticed a dangerous paradox in modern health: the more
              "connected" our technology became, the more disconnected we became
              from our biological foundations. DARSHAI bridges 5,000 years of
              Ayurvedic tradition with the relentless precision of AI biomarker
              monitoring. This is not a retreat. This is the new standard of
              human optimization
            </p>

            <button
              onClick={() => navigate("/philosophy")}
              className="text-yellow-400 text-lg font-semibold hover:underline"
            >
              Explore the Philosophy →
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.img
            src="/src/assets/images/herb.jpg"
            alt="Geo Wellness"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </motion.div>
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
          src="/src/assets/images/Protocols.jpg"
          alt="Sovereign Protocols"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.0, delay: 1.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100 transition duration-500">
            GEAR 1
          </p>
          <h3 className="text-3xl font-serif text-white mb-3">Sovereign Protocols</h3>
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
          src="/src/assets/images/Corporate.jpg"
          alt="Corporate Ecology"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.0, delay: 1.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">GEAR 2</p>
          <h3 className="text-3xl font-serif text-white mb-3">Corporate Ecology</h3>
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
          src="/src/assets/images/Maintenance.jpg"
          alt="Maintenance Modules"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.0, delay: 1.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">GEAR 3</p>
          <h3 className="text-3xl font-serif text-white mb-3">Maintenance Modules</h3>
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
          src="/src/assets/images/Prepkits.jpg"
          alt="Longevity Prep-Kits"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.0, delay: 2.0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">GEAR 4</p>
          <h3 className="text-3xl font-serif text-white mb-3">Longevity Prep-Kits</h3>
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
          src="/src/assets/images/Events.jpg"
          alt="Precision Tech Events"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.0, delay: 2.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">GEAR 5</p>
          <h3 className="text-3xl font-serif text-white mb-3">Precision Tech Events</h3>
          <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition delay-150">
            Bio-hacking Workshops / Hackathons
          </p>
        </div>
      </motion.div>

      {/* GEAR 6 */}
      <motion.div 
        className="group min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-3xl overflow-hidden flex-shrink-0 snap-start cursor-pointer transform transition duration-500 hover:scale-105"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
      >
        <motion.img
          src="/src/assets/images/Auditing.jpg"
          alt="Precision Ecology & Corporate Auditing"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.0, delay: 2.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-24 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-xs tracking-widest text-green-200 mb-2 opacity-0 group-hover:opacity-100">GEAR 6</p>
          <h3 className="text-3xl font-serif text-white mb-3">Precision Ecology & Corporate Auditing</h3>
          <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition delay-150">
            Office Auditing
          </p>
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
              As a Silver Jubilee Year Award journalist and science scholar,
              she recognized that the greatest crisis in modern health was not
              a lack of information, but a lack of integration.
            </p>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-4">
              Under her leadership, DARSHAI has evolved from a startup concept
              into an elite ecosystem where Dharsh AI - our proprietary
              diagnostic engine, translates thousands of years of traditional
              medicine into quantifiable, data-backed longevity protocols.
            </p>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Her work focuses on the ‘Science of Where,’ a concept that explores the relationship between human optimization and environment.
               She is not just
              building a travel company; she is architecting a new standard
              for human performance.
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
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
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
        <motion.img
          src="src/assets/images/Section.jpg"
          alt="Meditation"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 3.0 }}
        />

      

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl px-6">
          {/* HEADING */}
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
          >
            The End of Reactive Health.
          </motion.h2>

          {/* SUBTEXT */}
         <motion.p 
           className="text-lg md:text-xl text-white/80 font-bold mb-4"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 3.4 }}
         >
  Reclaim your 168. Join an elite group of founders and leaders in
  our 2026 Sovereign Pilot. We map your data to South India's most
  potent coordinates to reverse your biological age.
</motion.p>

          {/* BUTTON */}
          <motion.button 
            className="px-12 py-5 bg-amber-500 text-white rounded-full text-sm tracking-widest font-semibold hover:bg-amber-600 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6 }}
          >
            Apply for the Sovereign 168
          </motion.button>
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

