import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import yoga from "@/assets/images/yoga1.png";

const SLIDES = [
  {
    image: bg2,
    title: "Your Journey to Strategic Health Autonomy",
    desc: "We combine biology, wellness, and environment to create personalized experiences that support recovery, balance, and long-term wellbeing",
  },
  {
    image: bg7,
    title: "From Health Management to Biological Wellness",
    desc: "Move beyond guesswork with personalised wellness insights that align your health, environment, and recovery journey",
  },
  {
    image: bg8,
    title: "Personalized Wellness Guided by Biology and Environment",
    desc: "We combine biological insights and environmental wellness to help individuals improve recovery, resilience, and long-term wellbeing through personalized wellness experiences",
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
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  };
  return (
    <div>
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
            <div
              className="
      group
      relative

      w-[280px]
      md:w-[360px]

      h-[360px]
      md:h-[460px]

      rounded-[30px]
      overflow-hidden

      shadow-[0_30px_80px_rgba(0,0,0,0.3)]
    "
            >
              {/* IMAGE */}
              <img
                src={bg3}
                alt="Geo Wellness"
                className="
        w-full
        h-full

        object-cover

        transition-transform
        duration-[1200ms]

        group-hover:scale-110
      "
              />

              {/* BLUE PREMIUM OVERLAY */}
              <div
                className="
        absolute
        inset-0

        opacity-0
        group-hover:opacity-100

        transition-all
        duration-700
      "
                style={{
                  background:
                    "linear-gradient(to top, rgba(23,78,166,0.92), rgba(23,78,166,0.45), rgba(0,0,0,0.08), transparent)",
                }}
              />

              {/* BLUE GLOW */}
              <div
                className="
        absolute
        -bottom-20
        left-1/2
        -translate-x-1/2

        w-[70%]
        h-24

        bg-[#174EA6]/35

        blur-[90px]

        opacity-0
        group-hover:opacity-100

        transition-all
        duration-700
      "
              />
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

        <div className="relative w-full">
          {/* LEFT ARROW */}
          <button
            onClick={scrollLeft}
            className="
      hidden lg:flex
      absolute left-4 top-1/2 -translate-y-1/2
      z-30

      w-14 h-14 rounded-full

      items-center justify-center

      bg-white/10
      backdrop-blur-xl
      border border-white/20

      text-white

      shadow-[0_10px_40px_rgba(59,130,246,0.25)]

      hover:bg-blue-500/20

      transition-all duration-500
    "
          >
            <ChevronLeft size={28} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={scrollRight}
            className="
      hidden lg:flex
      absolute right-4 top-1/2 -translate-y-1/2
      z-30

      w-14 h-14 rounded-full

      items-center justify-center

      bg-white/10
      backdrop-blur-xl
      border border-white/20

      text-white

      shadow-[0_10px_40px_rgba(59,130,246,0.25)]

      hover:bg-blue-500/20

      transition-all duration-500
    "
          >
            <ChevronRight size={28} />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="
      w-full
      overflow-x-auto
      scroll-smooth
      scrollbar-hide

      lg:overflow-hidden
    "
          >
            <div
              className="
        flex
        gap-8
        px-6
        md:px-12

        w-max

        snap-x
        snap-mandatory

        pb-4
      "
            >
              {[
                {
                  gear: "GEAR 1",
                  title: "Sovereign Protocols",
                  desc: "7-Day Luxury Geo-Wellness Interventions",
                  img: sover,
                  delay: 1.4,
                },
                {
                  gear: "GEAR 2",
                  title: "Corporate Wellness Reset ",
                  desc: "5-Day Executive Reset for B2B",
                  img: corporate,
                  delay: 1.6,
                },
                {
                  gear: "GEAR 3",
                  title: "Long-Term Wellness Support",
                  desc: "Habit Tracking & Video Library",
                  img: maintenance,
                  delay: 1.8,
                },
                {
                  gear: "GEAR 4",
                  title: "Longevity Wellness Kits",
                  desc: "Waitlist / Coming Soon",
                  img: prepkit,
                  delay: 2,
                },
                {
                  gear: "GEAR 5",
                  title: "Wellness & Innovation Events",
                  desc: "Bio-hacking Workshops / Hackathons",
                  img: precision,
                  delay: 2.2,
                },
                {
                  gear: "GEAR 6",
                  title: "Corporate Wellness Optimization",
                  desc: "Office Auditing",
                  img: environment,
                  delay: 2.4,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="
            group

            min-w-[320px]
            md:min-w-[380px]

            h-[500px]
            relative

            rounded-[36px]
            overflow-hidden

            flex-shrink-0
            snap-start

            border border-white/10

            bg-white/5
            backdrop-blur-2xl

            shadow-[0_20px_80px_rgba(0,0,0,0.25)]

            transition-all
            duration-700

            hover:scale-[1.03]
          "
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: item.delay,
                  }}
                >
                  {/* IMAGE */}
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="
              w-[400px]
              h-full
              object-cover

              transition-all
              duration-[1200ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]

              group-hover:scale-110
            "
                    initial={{
                      scale: 1.05,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: item.delay,
                    }}
                  />

                  {/* OVERLAY */}
                  <div
                    className="
              absolute inset-0

              bg-gradient-to-t
              from-[#021B33]/95
              via-[#0A3D62]/40
              to-[#2563EB]/10

              opacity-80
              group-hover:opacity-100

              transition-all
              duration-700
            "
                  />

                  {/* TEXT */}
                  <div
                    className="
              absolute inset-0

              flex flex-col justify-end

              p-8

              opacity-0
              translate-y-16

              group-hover:opacity-100
              group-hover:translate-y-0

              transition-all
              duration-700
            "
                  >
                    <p
                      className="
                text-xs
                tracking-widest
                text-blue-200
                mb-2

                opacity-0
                group-hover:opacity-100

                transition duration-500
              "
                    >
                      {item.gear}
                    </p>

                    <h3
                      className="
                text-3xl
                font-serif
                text-white
                mb-3
              "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                text-sm
                text-blue-100/80
                leading-7

                opacity-0
                group-hover:opacity-100

                transition duration-700 delay-150
              "
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
      <section
        className="
    relative

    w-full

    min-h-screen

    flex
    items-center
    justify-center

    text-center

    overflow-hidden

    bg-black
  "
      >
        {/* BACKGROUND IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.5,
          }}
          className="
      absolute
      inset-0

      flex
      items-center
      justify-center
    "
        >
          {/* IMAGE */}
          <img
            src={yoga}
            alt="Meditation"
            className="
        w-full
        h-full

        object-contain
        md:object-cover

        object-center
      "
          />

          {/* CINEMATIC OVERLAY */}
          <div
            className="
        absolute
        inset-0

        bg-black/55

        shadow-[0_50px_120px_rgba(0,0,0,0.4)]
      "
          />
        </motion.div>

        {/* CONTENT */}
        <div
          className="
      relative
      z-10

      max-w-4xl

      px-6

      mb-14
    "
        >
          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.8,
            }}
            className="
        text-4xl
        md:text-6xl
        lg:text-7xl

        font-serif

        text-white

        mb-8

        leading-tight
      "
          >
            The End of Reactive Health
          </motion.h2>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
              delay: 1.1,
            }}
            className="
        text-lg
        md:text-l

        text-white/80

        mb-8

        max-w-2xl
        mx-auto

        leading-relaxed
      "
          >
            Reclaim your 168. Join an elite group of founders and leaders in our
            2026 Sovereign Pilot. We map your data to South India's most potent
            coordinates to reverse your biological age
          </motion.p>

          {/* BUTTON */}
          <Link to="/register">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.19, 1, 0.22, 1],
                delay: 1.4,
              }}
              className="
          px-12
          py-5

          bg-amber-500

          text-white

          rounded-full

          text-sm
          tracking-widest
          font-semibold

          hover:bg-amber-600
          hover:scale-105

          transition-all

          shadow-xl
        "
            >
              Apply for the Sovereign 168
            </motion.button>
          </Link>
        </div>

        {/* FOOTER BLEND */}
        <div
          className="
      absolute
      bottom-0
      left-0

      w-full
      h-40

      bg-gradient-to-b
      from-transparent
      to-[#f3efe8]
    "
        />
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
