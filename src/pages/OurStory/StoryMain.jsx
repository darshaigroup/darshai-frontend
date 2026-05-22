import hero from "@/assets/images/MainImg.png";
import bg4 from "@/assets/images/bg4.png";
import herb from "@/assets/images/herb.jpg";
import Protocol from "./protocol.jsx";
import doctor from "@/assets/images/doctor.jpeg";
import ceo1 from "@/assets/images/ceo1.jpeg";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

const brandGreen = "#1E7A3A";

import { motion } from "framer-motion";

const PHILOSOPHY_DATA = [
  {
    tag: "THE DISCONNECTION",
    title: "The Paradox of Modern Progress",
    text: "We live in the most 'connected' era in human history, yet we have never been more disconnected from our own biological foundations. In the pursuit of high performance, themodern leader has treated the body as a machine to be pushed, rather than an ecosystem to be nurtured. We have traded seasonal rhythms for artificial light, and intuitive Longevity for chronic burnout.",
  },
  {
    tag: "THE SYNTHESIS",
    title: "The New Standard of Optimization",
    text: "DARSHAI was born from a singular realization - True longevity is not found in a laboratory, nor is it found solely in a forest. It is found at the intersection of both. We bridge 5,000 years of Ayurvedic intelligence with the relentless precision of AI-driven biomarker monitoring. We don't believe in &quot;generic wellness; We believe in Biological Sovereignty—the right to own your health data, understand your unique metabolic fire (Agni), and master your environment.",
  },
  {
    tag: "THE GEO-BIOTIC MAP",
    title: "Geography as Medicine",
    text: "At DARSHAI, we understand that a human being is not a static entity; we are a reflection of our surroundings. Our philosophy is rooted in Geo-Wellness. We map your internal clinical data (CGM, BIA, and Blood Biomarkers) to the specific healing frequencies of South India’s most potent landscapes. Whether it is the mineral-rich air of the Coastal Sanctuaries, the phytoncide-dense Forest Deep, or the high-altitude Mountain Silence, we prescribe the exact coordinate your cells need to reset.",
  },

  {
    tag: "THE SOVEREIGN PROTOCOLS",
    title: "The Covenant",
    text: "We do not offer 'retreats'. We engineer Precision Longevity Interventions. Through our Sovereign Protocols, we provide the data, the environment, and the clinical mastery required to reverse your biological age and reclaim your vitality.",
  },
];

const OurStory = () => {
 
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // IMAGE PARALLAX
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.1, 1]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -80]
  );
  return (
    <div className="bg-[#f6f3ef] text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* IMAGE */}
        <img
          src={hero}
          alt="hero"
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
        <div className="relative z-10 text-white max-w-3xl px-6">
          <div className="mb-6 flex justify-center">
            <span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              THE GENESIS
            </span>
          </div>

          <h1 className="text-[42px] md:text-[72px] font-serif mb-6 leading-[1.05] tracking-[-0.02em]">
            Why DARSHAI Exists
          </h1>

          <p className="text-lg opacity-90 font-light">
            Bridging 5,000 years of wisdom with 21st-century biomarker science.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative bg-[#f6f3ef] overflow-hidden">

  {/* WRAPPER */}
  <div className="max-w-7xl mx-auto px-6 py-32">

    {/* HEADER */}
    <div className="text-center mb-24">

      <p className="text-xs tracking-[4px] text-yellow-700 mb-5 uppercase">
        THE PHILOSOPHY
      </p>

      <h2
        className="
          text-[42px]
          md:text-[72px]

          leading-[1.05]
          font-serif

          max-w-5xl
          mx-auto
        "
        style={{ color: brandGreen }}
      >
        Reclaiming Sovereignty
      </h2>

    </div>

    {/* PREMIUM HERO IMAGE */}
    <div className="relative flex justify-center mb-32">

      {/* GLOW */}
      <div className="absolute w-[70%] h-[70%] bg-blue-900/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative

          w-full
          max-w-6xl

          rounded-[42px]
          overflow-hidden

          shadow-[0_60px_140px_rgba(0,0,0,0.18)]
        "
      >

        {/* IMAGE */}
        <img
          src={bg4}
          alt="wellness"
          className="
            w-full

            h-[320px]
            md:h-[720px]

            object-cover
          "
        />

        {/* GREEN → BLUE OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(23,78,166,0.92), rgba(23,78,166,0.68), rgba(8,15,35,0.58), rgba(0,0,0,0.38))",
          }}
        />

        {/* PREMIUM LIGHT */}
        <div className="absolute inset-0 ring-1 ring-white/10 rounded-[42px]" />

        {/* EDGE GLOW */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-blue-900/20 blur-[100px]" />

      </motion.div>

    </div>

    {/* STORY CONTENT */}
    <div className="max-w-4xl mx-auto space-y-32">

      {PHILOSOPHY_DATA.map((item, i) => (

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

          {/* LARGE BACKGROUND NUMBER */}
          <div
            className="
              absolute
              -left-8
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

          {/* TAG */}
          <p className="text-xs tracking-[4px] text-yellow-700 mb-6 uppercase relative z-10">
            {item.tag}
          </p>

          {/* TITLE */}
          <h3
            className="
              text-3xl
              md:text-6xl

              leading-[1.08]

              font-serif

              mb-10

              relative z-10
            "
            style={{ color: brandGreen }}
          >
            {item.title}
          </h3>

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

              relative z-10
            "
          >
            {item.text}
          </p>

          {/* FINAL QUOTE */}
          {i === PHILOSOPHY_DATA.length - 1 && (

            <div className="pt-16 border-t border-[#174ea6]/10 mt-16">

              <p className="text-2xl italic text-yellow-700 mb-4">
                "This is not an escape from life."
              </p>

              <p
                className="
                  text-3xl
                  md:text-5xl

                  font-serif
                  italic

                  leading-tight
                "
                style={{
                  color: "rgba(30,122,58,0.9)",
                }}
              >
                This is the mastery of it.
              </p>

            </div>

          )}

        </motion.div>

      ))}

    </div>

  </div>

</section>

      {/* BRAIN TRUST */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-6">
          <p className="text-xs tracking-[3px] text-yellow-700">OUR LEADER</p>
        </div>

        <h2
          className="text-[42px] md:text-[72px] font-serif text-center mb-20"
          style={{ color: brandGreen }}
        >
          The Synergy of Intelligence & Clinical Mastery.
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {[
            {
              name: "Veekshitha V",
              role: "Founder & CEO | DARSHAI Architect",
              title: "The Visionary",
              desc: `A postgraduate in Science and Journalism and an MCJ Silver Jubilee Year Awardee, Veekshitha is the driving force behind the DARSHAI vision.

With a background rooted in academic excellence and science communication, she recognized a dangerous gap in the wellness industry: the lack of quantifiable truth.

As the brand’s primary architect, she ensures that the bridge between 21st-century clinical data and human storytelling remains unbreakable. Her mission is to move longevity from a luxury "feeling" into a mathematical certainty, reclaiming biological sovereignty for the modern leader.`,
            },
            {
              name: "Dr Renjith N Raj",
              role: "Head of Wellness & Curation Protocols",
              title: "The Custodian",
              desc: `Dr. Renjith stands as the guardian of our clinical integrity. A specialist in translating 5,000 years of Ayurvedic tradition into measurable, modern interventions, he is responsible for the precision behind the Sovereign Protocols.

His expertise ensures that every intervention prescribed by the DARSHAI AI engine is rooted in profound clinical wisdom.

By distilling complex ancient sciences into actionable, data-backed protocols, Dr. Renjith empowers clients to transition from reactive health to proactive, optimized longevity.`,
            },
          ].map((person, i) => (
            <div key={i} className="group">
              {/* IMAGE CARD (unchanged effect) */}
              <div className="rounded-[40px] overflow-hidden relative shadow-xl">
                <img
                  src={person.name === "Veekshitha V" ? ceo1 : doctor}
                  alt={person.name}
                  className="w-full h-[900px] object-cover group-hover:scale-110 transition-all duration-[1200ms]"
                />

                <div
                  className="
    absolute inset-0
    opacity-0 group-hover:opacity-100
    transition duration-700
  "
                  style={{
                    background:
                      "linear-gradient(to top, rgba(23,78,166,0.92), rgba(23,78,166,0.45), transparent)",
                  }}
                />

                <div className="absolute bottom-8 left-8 text-white">
                  <h4 className="text-2xl font-serif">{person.name}</h4>
                  <p className="text-xs tracking-[4px] text-yellow-400">
                    {person.role}
                  </p>
                </div>
              </div>

              {/* 🔥 NEW DESCRIPTION BLOCK */}
              <div className="mt-6 px-2">
                <p className="text-xs text-center tracking-[4px] text-yellow-700 mb-3 uppercase">
                  {person.title}
                </p>

                <p className="text-[#1E7A3A]/70 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {person.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL BLOCK */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-[40px] overflow-hidden relative shadow-[0_50px_120px_rgba(0,0,0,0.4)]">
          <img
            src={herb}
            alt="herb"
            className="w-full h-[520px] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: brandGreen, opacity: 0.85 }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <div className="mb-6 flex justify-center">
              <span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 uppercase">
                Our North Star
              </span>
            </div>
            <h2 className="text-[32px] md:text-[64px] font-serif leading-[1.1] max-w-4xl">
              {" "}
              To reset a baseline is to architect a legacy{" "}
              <span className="italic">
                {" "}
                that outlives the chronological clock.{" "}
              </span>{" "}
            </h2>
            <p className="mt-6 text-sm md:text-lg text-white/80 max-w-2xl">
              {" "}
              We solve the crisis of modern burnout by recalibrating the human
              system at its architectural foundation.{" "}
            </p>
          </div>
        </div>
      </section>
      {/* BIO LUXURY */}
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <h3 className="text-3xl font-serif text-yellow-700">Bio-Luxury</h3>

        <p className="text-xs tracking-[4px] text-yellow-600 mt-2">
          A NEW CATEGORY
        </p>
      </div>

      <Protocol />
    </div>
  );
};

export default OurStory;
