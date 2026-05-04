import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Mountain,
  Target,
  Compass,
  ShieldCheck,
} from "lucide-react";

const slides = [
  {
    id: "problem",
    category: "THE PROBLEM",
    icon: Brain,
    title: 'The Problem: The Illusion of "Wellness"',
    content: [
      "The global wellness tourism and corporate health industries are fundamentally flawed.",
      "They are reactive, generic, and completely void of measurable biological data.",
      'Today, corporate leaders and High-Net-Worth Individuals (HNIs) are routinely sold "feel-good" spa experiences. These luxury vacations offer a temporary psychological escape, but they carry zero scientific accountability and deliver no lasting physiological impact. You check out of the resort, return to the high-stress environment of the city, and the burnout immediately resumes.',
    ],
  },
  {
    id: "solution",
    category: "THE SOLUTION",
    icon: Mountain,
    title: "The DARSHAI Solution: Precision Longevity Interventions",
    content: [
      "DARSHAI is India;s first AI-Native, IP-Driven Travel & Health-Tech Group. We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.",
      "Rather than operating a mass-market app or standard tour agency, we function on an elite Concierge Model, processing deep-tech biological data to deliver hyper-personalized interventions.",
    ],
  },
  {
    id: "engine",
    
    icons: [Target, Compass, ShieldCheck],
    title: "How We Engineer Your Longevity",
    subSections: [
      {
        heading: "The Dharsh-AI Engine",
        description: "Our proprietary intelligence does not guess; it calculates. We correlate your real-time human health metrics—including blood biomarkers and clinical assessments—with the localized environmental ecology of our curated Geo-Wellness zones.",
      },
      {
        heading: "The Sovereign Protocols",
        description: "We match your specific biological deficit to the exact geographical coordinate (Coast, Forest, or Mountain) and Ayurvedic intervention required to heal it.",
      },
      {
        heading: "The Protocol Efficacy Score (PES)",
        description: "We believe in absolute scientific proof. To guarantee an ROI on your health, our system generates a quantifiable PES. We don't just tell you that you feel better; we show you the exact data proving how our localized therapies, diets, and environments are actively reversing burnout and lowering your biological age.",
      },
    ],
  },
];

export default function DarshaiGreenLuxurySlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  const current = slides[active];
  const Icons = current.icons || [current.icon];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-green-600 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial_gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-20 right-20 w-72 h-72 bg-green-300/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 px-8 md:px-16 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Darshai"
              className="h-14 w-auto object-contain"
            />
          </div>
          <div className="w-14 h-14" />
        </div>
      </nav>

      {/* Main Slideshow */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pt-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1 }}
            className="w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center"
          >
            {/* Left Side */}
            <div className="space-y-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm uppercase text-green-100/80 tracking-[0.4em]"
              >
                {current.category}
              </motion.p>

              <div className="flex gap-3">
                {current.subSections ? (
                  current.subSections.map((_, idx) => {
                    const Icon = Icons[idx];
                    return (
                      <div
                        key={idx}
                        className="w-16 h-16 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg flex items-center justify-center shadow-2xl"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    );
                  })
                ) : (
                  Icons.map((Icon, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg flex items-center justify-center shadow-2xl"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  ))
                )}
              </div>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.05]"
              >
                {current.title}
              </motion.h1>

              <div className="w-40 h-[2px] bg-white/40" />
            </div>

            {/* Right Side */}
            <div className="space-y-5">
              {current.subSections ? (
                current.subSections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-500"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {section.heading}
                    </h3>
                    <p className="text-base md:text-lg font-light leading-relaxed text-white/90">
                      {section.description}
                    </p>
                  </motion.div>
                ))
              ) : (
                current.content.map((paragraph, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-500"
                  >
                    <p className="text-base md:text-lg font-light leading-relaxed text-white/90">
                      {paragraph}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation - Only dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-4">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-3 shadow-2xl">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActive(index)}
                className={`transition-all duration-500 ${
                  active === index
                    ? "w-10 h-2 rounded-full bg-white"
                    : "w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

