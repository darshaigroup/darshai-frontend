import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {motion,AnimatePresence} from "framer-motion";
import {ArrowRight,Sparkles,Mouse} from "lucide-react";

import career1 from "@/assets/images/bg2.png";
import career2 from "@/assets/images/bg7.png";
import career3 from "@/assets/images/bg8.png";

const SLIDES=[
  {image:career1},
  {image:career2},
  {image:career3}
];

const HERO={
  badge:"JOIN INDIA'S AI-NATIVE HEALTHCARE STARTUP",
  title:"Shape the Future of Wellness Through Innovation",
  desc:"Build your career at DarshAI and create meaningful impact through Artificial Intelligence, Preventive Healthcare, Longevity, and Technology."
};

const HeroSection=()=>{
  const [current,setCurrent]=useState(0);

  useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrent(prev=>(prev+1)%SLIDES.length);
    },6000);

    return()=>clearInterval(timer);
  },[]);

  const scrollToSection = (id) => {
  const section = document.getElementById(id);

  if (!section) return;

  window.scrollTo({
    top: section.offsetTop - 80,
    behavior: "smooth",
  });
};

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.img
            src={SLIDES[current].image}
            alt="DarshAI Career"
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ scale: 1 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 7, ease: "linear" }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-[#062812]/90" />

          {/* Green Tint */}
          <div className="absolute inset-0 bg-[#10361F]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 pt-24 pb-24 text-center sm:px-8 sm:pt-28 md:pt-32 lg:px-10 lg:pt-36 xl:pt-40">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#2D2A24]/70 px-4 py-2 shadow-xl backdrop-blur-xl sm:px-6 sm:py-3">
              <Sparkles size={14} className="text-[#D4AF37] shrink-0" />

              <span className="text-[10px] font-semibold tracking-[2px] text-[#D4AF37] sm:text-xs sm:tracking-[3px] md:text-sm">
                {HERO.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-7 font-serif font-bold leading-[1.08] tracking-[-1px] text-white text-[42px] sm:text-[54px] md:text-[66px] lg:text-[78px] xl:text-[88px]">
              <span className="block lg:inline">Shape the Future of</span>

              <span className="block italic text-[#D4AF37] lg:inline">
                {" "}
                Wellness{" "}
              </span>

              <span className="block lg:inline">Through Innovation</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-3xl px-2 text-base leading-7 text-gray-200 sm:text-lg md:text-xl md:leading-8">
              {HERO.desc}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("application")}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#1E7A3A] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(30,122,58,.45)] transition-all duration-300 hover:bg-[#176530] sm:w-auto sm:text-base"
              >
                Apply Now
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("position")}
                className="w-full rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/15 sm:w-auto sm:text-base"
              >
                Explore Opportunities
              </motion.button>
            </div>

            {/* AI Card (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mx-auto mt-12 hidden max-w-xl items-center gap-4 rounded-3xl border border-white/10 bg-white/10 px-6 py-4 shadow-2xl backdrop-blur-xl lg:flex"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1E7A3A]/20">
                <Sparkles size={26} className="text-[#D4AF37]" />
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold uppercase tracking-[2px] text-[#D4AF37]">
                  AI-Powered Precision Healthcare
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  Bridging 5,000 years of Ayurvedic wisdom with Artificial
                  Intelligence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="mb-3 text-xs uppercase tracking-[3px] text-white/70">
            Scroll
          </span>

          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/40 p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              <Mouse size={16} className="text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`overflow-hidden rounded-full transition-all duration-500 ${
              current === index
                ? "h-2 w-12 bg-[#D4AF37]"
                : "h-2 w-2 bg-white/40 hover:bg-white/70"
            }`}
          >
            {current === index && (
              <motion.div
                layoutId="indicator"
                className="h-full w-full bg-[#D4AF37]"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;