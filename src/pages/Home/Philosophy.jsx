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
      "DARSHAI is India's first AI-Native, IP-Driven Travel & Health-Tech Group. We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.",
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

  const brandGreen = "#1E7A3A";
const brandGold = "#C9A75B";
const softCream = "#F6F3EF";
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#14532D] via-[#1E7A3A] to-[#2E8B57] text-white">

    {/* PREMIUM BACKGROUND */}
    <div className="absolute inset-0 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,167,91,0.10),transparent_32%)]" />

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* FLOATING GLOW */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute top-20 right-20 w-80 h-80 bg-[#C9A75B]/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />

    </div>

    {/* MAIN SECTION */}
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-28">

      <AnimatePresence mode="wait">

        <motion.div
          key={current.id}
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -40,
          }}
          transition={{
            duration: 1,
          }}
          className="w-full max-w-7xl grid lg:grid-cols-2 gap-20 items-center"
        >

          {/* LEFT SIDE */}
          <div className="space-y-10">

            {/* CATEGORY */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="text-[11px] uppercase tracking-[0.45em] text-[#E8D7A5]"
            >
              {current.category}
            </motion.p>

            {/* ICONS */}
            <div className="flex gap-5">

              {current.subSections
                ? current.subSections.map((_, idx) => {
                    const Icon = Icons[idx];

                    return (
                      <div
                        key={idx}
                        className="w-18 h-18 rounded-[22px] bg-white/10 border border-white/10 backdrop-blur-2xl flex items-center justify-center shadow-[0_25px_70px_rgba(0,0,0,0.18)]"
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{
                            color: brandGold,
                          }}
                        />
                      </div>
                    );
                  })
                : Icons.map((Icon, idx) => (
                    <div
                      key={idx}
                      className="w-18 h-18 rounded-[22px] bg-white/10 border border-white/10 backdrop-blur-2xl flex items-center justify-center shadow-[0_25px_70px_rgba(0,0,0,0.18)]"
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{
                          color: brandGold,
                        }}
                      />
                    </div>
                  ))}

            </div>

            {/* TITLE */}
            <motion.h1
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="text-4xl md:text-5xl lg:text-7xl font-serif font-light leading-[0.98] tracking-[-0.05em]"
            >
              {current.title}
            </motion.h1>

            {/* DIVIDER */}
            <div className="w-44 h-[2px] bg-gradient-to-r from-[#C9A75B] via-[#E8D7A5] to-transparent rounded-full" />

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {current.subSections
              ? current.subSections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.2,
                    }}
                    className="rounded-[30px] border border-white/10 bg-white/8 backdrop-blur-2xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.20)] transition-all duration-700 hover:-translate-y-2 hover:bg-white/12"
                  >

                    <h3
                      className="text-2xl md:text-3xl font-serif mb-5"
                      style={{
                        color: softCream,
                      }}
                    >
                      {section.heading}
                    </h3>

                    <p className="text-[17px] leading-[1.95] text-white/80 font-light">
                      {section.description}
                    </p>

                  </motion.div>
                ))
              : current.content.map((paragraph, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.2,
                    }}
                    className="rounded-[30px] border border-white/10 bg-white/8 backdrop-blur-2xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.20)] transition-all duration-700 hover:-translate-y-2 hover:bg-white/12"
                  >

                    <p className="text-[17px] leading-[2] text-white/80 font-light">
                      {paragraph}
                    </p>

                  </motion.div>
                ))}

          </div>

        </motion.div>

      </AnimatePresence>

    </div>

    {/* BOTTOM NAVIGATION */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">

      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">

        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActive(index)}
            className={`transition-all duration-500 ${
              active === index
                ? "w-10 h-2 rounded-full bg-[#C9A75B]"
                : "w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-white/70"
            }`}
          />
        ))}

      </div>

    </div>

  </section>
  );
}

// import React from "react";

// import { motion } from "framer-motion";

// import hero from "@/assets/images/MainImg.png";
// import bg4 from "@/assets/images/bg4.png";

// import {
//   Brain,
//   Mountain,
//   Target,
//   Compass,
//   ShieldCheck,
// } from "lucide-react";

// const brandGreen = "#1E7A3A";

// const PHILOSOPHY_DATA = [
//   {
//     tag: "THE PROBLEM",

//     icon: Brain,

//     title:
//       'The Problem: The Illusion of "Wellness"',

//     text: `
// The global wellness tourism and corporate health industries are fundamentally flawed.

// They are reactive, generic, and completely void of measurable biological data.

// Today, corporate leaders and High-Net-Worth Individuals (HNIs) are routinely sold "feel-good" spa experiences. These luxury vacations offer a temporary psychological escape, but they carry zero scientific accountability and deliver no lasting physiological impact. You check out of the resort, return to the high-stress environment of the city, and the burnout immediately resumes.
//     `,
//   },

//   {
//     tag: "THE SOLUTION",

//     icon: Mountain,

//     title:
//       "The DARSHAI Solution: Precision Longevity Interventions",

//     text: `
// DARSHAI is India's first AI-Native, IP-Driven Travel & Health-Tech Group.

// We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.

// Rather than operating a mass-market app or standard tour agency, we function on an elite Concierge Model, processing deep-tech biological data to deliver hyper-personalized interventions.
//     `,
//   },

//   {
//     tag: "THE ENGINE",

//     icon: Target,

//     title:
//       "The Dharsh-AI Engine",

//     text: `
// Our proprietary intelligence does not guess; it calculates.

// We correlate your real-time human health metrics — including blood biomarkers and clinical assessments — with the localized environmental ecology of our curated Geo-Wellness zones.
//     `,

//     title:
//       "The Sovereign Protocols",

//     text: `
// We match your specific biological deficit to the exact geographical coordinate — Coast, Forest, or Mountain — and Ayurvedic intervention required to heal it.
//     `,

//     title:
//       "The Protocol Efficacy Score (PES)",

//     text: `
// We believe in absolute scientific proof.

// To guarantee an ROI on your health, our system generates a quantifiable PES.

// We don't just tell you that you feel better; we show you the exact data proving how our localized therapies, diets, and environments are actively reversing burnout and lowering your biological age.
//     `,
//   },

//   {
//     tag: "THE PROTOCOLS",

//     icon: Compass,

//     title:
//       "The Sovereign Protocols",

//     text: `
// We match your specific biological deficit to the exact geographical coordinate — Coast, Forest, or Mountain — and Ayurvedic intervention required to heal it.
//     `,
//   },

//   {
//     tag: "THE EVIDENCE",

//     icon: ShieldCheck,

//     title:
//       "The Protocol Efficacy Score (PES)",

//     text: `
// We believe in absolute scientific proof.

// To guarantee an ROI on your health, our system generates a quantifiable PES.

// We don't just tell you that you feel better; we show you the exact data proving how our localized therapies, diets, and environments are actively reversing burnout and lowering your biological age.
//     `,
//   },
// ];

// export default function Philosophy() {
//   return (
//     <div className="bg-[#f6f3ef] text-gray-800 overflow-hidden">

//       {/* HERO */}
//       <section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">

//         {/* IMAGE */}
//         <img
//           src={hero}
//           alt="Philosophy"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* OVERLAY */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
//           }}
//         />

//         {/* CONTENT */}
//         <div className="relative z-10 text-white max-w-4xl px-6">

//           <div className="mb-6 flex justify-center">

//             <span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 uppercase">
//               THE PHILOSOPHY
//             </span>

//           </div>

//           <h1 className="text-[42px] md:text-[82px] leading-[0.95] tracking-[-0.04em] font-serif mb-8">
//             Reclaiming Sovereignty
//           </h1>

//           <p className="text-lg md:text-2xl text-white/80 leading-[1.8] max-w-3xl mx-auto">
//             The future of precision longevity begins with biological intelligence.
//           </p>

//         </div>

//       </section>

     

//       {/* STORY CONTENT */}
//       <section className="max-w-5xl mx-auto px-6 pb-32">

//         <div className="space-y-32">

//           {PHILOSOPHY_DATA.map((item, i) => {

//             const Icon = item.icon;

//             return (
//               <motion.div
//                 key={i}
//                 initial={{
//                   opacity: 0,
//                   y: 80,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 viewport={{
//                   once: false,
//                   amount: 0.25,
//                 }}
//                 transition={{
//                   duration: 1,
//                   ease: [0.16, 1, 0.3, 1],
//                 }}
//                 className="relative"
//               >

//                 {/* NUMBER */}
//                 <div
//                   className="
//                     absolute
//                     -left-6
//                     -top-12

//                     text-[80px]
//                     md:text-[140px]

//                     font-serif

//                     text-[#174ea6]/[0.05]

//                     pointer-events-none
//                   "
//                 >
//                   0{i + 1}
//                 </div>

//                 {/* ICON */}
//                 <div className="relative z-10 mb-8">

//                   <div className="w-16 h-16 rounded-[20px] bg-white border border-[#1E7A3A]/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center">

//                     <Icon
//                       className="w-7 h-7"
//                       style={{
//                         color: brandGreen,
//                       }}
//                     />

//                   </div>

//                 </div>

//                 {/* TAG */}
//                 <p className="text-xs tracking-[4px] text-yellow-700 mb-6 uppercase relative z-10">
//                   {item.tag}
//                 </p>

//                 {/* TITLE */}
//                 <h2
//                   className="
//                     text-3xl
//                     md:text-6xl

//                     leading-[1.08]

//                     font-serif

//                     mb-10

//                     relative z-10
//                   "
//                   style={{
//                     color: brandGreen,
//                   }}
//                 >
//                   {item.title}
//                 </h2>

//                 {/* TEXT */}
//                 <p
//                   className="
//                     text-lg
//                     md:text-xl

//                     leading-[2.1]

//                     text-[#1E7A3A]/75

//                     border-l
//                     border-blue-700/20

//                     pl-8

//                     italic

//                     whitespace-pre-line

//                     relative z-10
//                   "
//                 >
//                   {item.text}
//                 </p>

//               </motion.div>
//             );
//           })}

//         </div>

//       </section>

//     </div>
//   );
// }