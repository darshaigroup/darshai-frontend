import React from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

export function GeoWellnessPrincipleSection({
  id = "why-environment-matters",
}) {
  return (
    <section
      id={id}
      aria-label="Why Environment Matters"
      className="section-editorial bg-white text-[#1D1D1F] border-b border-[#D2D2D7] py-20 md:py-28"
    >
      <div className="darshai-container w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-stretch">
          {/* IMAGE — FIRST ON MOBILE/TABLET, RIGHT ON DESKTOP */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col h-full order-1 lg:order-2">
            <Reveal delay={0.15} className="w-full h-full flex-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full h-full min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-0 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#F5F5F7] border border-[#D2D2D7]/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] flex-1 group"
              >
                <SmartImage
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=1100&fit=crop&auto=format"
                  alt="Lush forest canopy with soft light rays illustrating how environment shapes recovery"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Reveal>
          </div>

          {/* CONTENT — SECOND ON MOBILE/TABLET, LEFT ON DESKTOP */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1 order-2 lg:order-1">
            <Reveal>
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p
                  id="geo-wellness-principle-eyebrow"
                  className="typography-eyebrow text-[#0E4D3A] mb-4 sm:mb-5 uppercase tracking-[0.25em] font-semibold"
                >
                  WHY ENVIRONMENT MATTERS
                </p>

                <h2
                  id="geo-wellness-principle-heading"
                  className="typography-section-h2 text-[#1D1D1F] font-semibold tracking-tight leading-[1.08] mb-6 sm:mb-8"
                >
                  <span>Most Wellness Journeys</span>
                  <br />
                  <span>Focus on What.</span>
                  <br />
                  <span className="text-[#0E4D3A]">Few Consider Where.</span>
                </h2>
              </motion.div>
            </Reveal>

            <Reveal delay={0.1}>
              <motion.div
                initial={{ opacity: 0, x: -60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-5 max-w-xl text-[#48484A]"
              >
                <p className="typography-lead leading-relaxed">
                  Traditional wellness recommendations often focus on
                  treatments, therapies and protocols/Programmes.
                </p>

                <p className="typography-lead leading-relaxed">
                  Yet the environment surrounding those experiences can
                  influence how people rest, recover, reflect and reconnect.
                </p>

                <p className="typography-lead text-[#1D1D1F] font-semibold leading-relaxed pt-1">
                  DARSHAI believes understanding both the individual and the
                  environment creates a more relevant wellness journey.
                </p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeoWellnessPrincipleSection;