import React from "react";

import { motion } from "framer-motion";

import hero from "@/assets/images/MainImg.png";
import bg4 from "@/assets/images/bg4.png";

import { Brain, Mountain, Target, Compass, ShieldCheck } from "lucide-react";

const brandGreen = "#1E7A3A";

const PHILOSOPHY_DATA = [
  {
    tag: "THE PROBLEM",

    icon: Brain,

    title: 'The Problem: The Illusion of "Wellness"',

    text: `
The global wellness tourism and corporate health industries are fundamentally flawed.

They are reactive, generic, and completely void of measurable biological data.

Today, corporate leaders and High-Net-Worth Individuals (HNIs) are routinely sold "feel-good" spa experiences. These luxury vacations offer a temporary psychological escape, but they carry zero scientific accountability and deliver no lasting physiological impact. You check out of the resort, return to the high-stress environment of the city, and the burnout immediately resumes.
    `,
  },

  {
    tag: "THE SOLUTION",

    icon: Mountain,

    title: "The DARSHAI Solution: Precision Longevity Interventions",

    text: `
DARSHAI is India's first AI-Native, IP-Driven Travel & Health-Tech Group.

We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.

Rather than operating a mass-market app or standard tour agency, we function on an elite Concierge Model, processing deep-tech biological data to deliver hyper-personalized interventions.
    `,
  },

  {
    tag: "THE ENGINE",

    icon: Target,

    title: "The Dharsh-AI Engine",

    text: `
Our proprietary intelligence does not guess; it calculates.

We correlate your real-time human health metrics — including blood biomarkers and clinical assessments — with the localized environmental ecology of our curated Geo-Wellness zones.
    `,

    title: "The Sovereign Protocols",

    text: `
We match your specific biological deficit to the exact geographical coordinate — Coast, Forest, or Mountain — and Ayurvedic intervention required to heal it.
    `,

    title: "The Protocol Efficacy Score (PES)",

    text: `
We believe in absolute scientific proof.

To guarantee an ROI on your health, our system generates a quantifiable PES.

We don't just tell you that you feel better; we show you the exact data proving how our localized therapies, diets, and environments are actively reversing burnout and lowering your biological age.
    `,
  },

  {
    tag: "THE PROTOCOLS",

    icon: Compass,

    title: "The Sovereign Protocols",

    text: `
We match your specific biological deficit to the exact geographical coordinate — Coast, Forest, or Mountain — and Ayurvedic intervention required to heal it.
    `,
  },

  {
    tag: "THE EVIDENCE",

    icon: ShieldCheck,

    title: "The Protocol Efficacy Score (PES)",

    text: `
We believe in absolute scientific proof.

To guarantee an ROI on your health, our system generates a quantifiable PES.

We don't just tell you that you feel better; we show you the exact data proving how our localized therapies, diets, and environments are actively reversing burnout and lowering your biological age.
    `,
  },
];

export default function Philosophy() {
  return (
    <div className="bg-[#f6f3ef] text-gray-800 overflow-hidden">
      {/* HERO */}
      <section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">
        {/* IMAGE */}
        <img
          src={hero}
          alt="Philosophy"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 text-white max-w-4xl px-6">
          <div className="mb-6 flex justify-center">
            <span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 uppercase">
              THE PHILOSOPHY
            </span>
          </div>

          <h1 className="text-[42px] md:text-[82px] leading-[0.95] tracking-[-0.04em] font-serif mb-8">
            Reclaiming Sovereignty
          </h1>

          <p className="text-lg md:text-2xl text-white/80 leading-[1.8] max-w-3xl mx-auto">
            The future of precision longevity begins with biological
            intelligence.
          </p>
        </div>
      </section>

      {/* STORY CONTENT */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="space-y-32">
          {PHILOSOPHY_DATA.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.25,
                }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* NUMBER */}
                <div
                  className="
                    absolute
                    -left-6
                    -top-12

                    text-[80px]
                    md:text-[140px]

                    font-serif

                    text-[#174ea6]/[0.05]

                    pointer-events-none
                  "
                >
                  0{i + 1}
                </div>

                {/* ICON */}
                <div className="relative z-10 mb-8"></div>

                {/* TAG */}
                <p className="text-xs tracking-[4px] text-yellow-700 mb-6 uppercase relative z-10">
                  {item.tag}
                </p>

                {/* TITLE */}
                <h2
                  className="
                    text-3xl
                    md:text-6xl

                    leading-[1.08]

                    font-serif

                    mb-10

                    relative z-10
                  "
                  style={{
                    color: brandGreen,
                  }}
                >
                  {item.title}
                </h2>

                {/* TEXT */}
                <p
                  className="
                    text-lg
                    md:text-xl

                    leading-[2.1]

                    text-[#1E7A3A]/75

                    border-l
                    border-blue-700/20

                    pl-8

                    italic

                    whitespace-pre-line

                    relative z-10
                  "
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
