import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Lightbulb,
  Cpu,
  Map,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    id: "problem",
    category: "THE PROBLEM",
    icon: AlertCircle,
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
    icon: Lightbulb,
    title: "The DARSHAI Solution: Precision Longevity Interventions",
    content: [
      "DARSHAI is India;s first AI-Native, IP-Driven Travel & Health-Tech Group. We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.",
      "Rather than operating a mass-market app or standard tour agency, we function on an elite Concierge Model, processing deep-tech biological data to deliver hyper-personalized interventions.",
    ],
  },
  {
    id: "engine",
    category: "HOW WE ENGINEER YOUR LONGEVITY",
    icons: [Cpu, Map, BarChart3],
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

// ---------- UNIQUE ANIMATION COMPONENTS ----------

// 1. Biometric Pulse Background
const BiometricPulse = () => {
  const pathRef = useRef(null);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg className="absolute bottom-0 left-0 w-full h-32" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 T650,50 T700,50 T750,50 T800,50"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          animate={{
            d: [
              "M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 T650,50 T700,50 T750,50 T800,50",
              "M0,50 Q25,70 50,50 T100,50 T150,30 T200,50 T250,70 T300,50 T350,30 T400,50 T450,50 T500,70 T550,50 T600,30 T650,50 T700,50 T750,70 T800,50",
              "M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 T650,50 T700,50 T750,50 T800,50",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// 2. Data Stream Background Lines
const DataStream = () => {
  const lines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 4,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-32"
          style={{ top: line.top, left: "-8rem" }}
          animate={{ x: ["0%", "120%"] }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// 3. Card Hover Scan Effect (CSS + motion)
const ScanCard = ({ children }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      {children}
    </div>
  );
};

// 4. Breathing Icon Cluster
const BreathingIcon = ({ Icon, delay = 0 }) => {
  return (
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <Icon className="w-10 h-10 text-white" />
    </motion.div>
  );
};

// 5. Typewriter Category (only on slide change)
const TypewriterCategory = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm uppercase text-green-100/80 tracking-[0.4em]">
        {displayText}
      </span>
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-0.5 h-4 bg-green-400"
        />
      )}
    </div>
  );
};

// 6. Directional Slide Transition wrapper
const SlideTransition = ({ children, direction }) => {
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
  center: {
      x: 0,
      opacity: 1,
    },
  exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

// ---------- MAIN COMPONENT ----------
export default function Philosophy() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Timer & Progress logic
  const startTimer = (resetProgress = true) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    if (resetProgress) setProgress(0);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length;
        setDirection(next > prev ? 1 : -1);
        return next;
      });
      setProgress(0);
    }, 8500);

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 8500) * 100, 100);
      setProgress(newProgress);
    }, 50);
  };

  useEffect(() => {
    startTimer(true);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
}, []);

  const handleDotClick = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
    startTimer(true);
  };

  const current = slides[active];
  const Icons = current.icons || [current.icon];

  // Segment-based progress ring color
  const getSegmentColor = () => {
    if (active === 0) return "#ef4444"; // red for problem
    if (active === 1) return "#22c55e"; // green for solution
    return "#fbbf24"; // amber/gold for engine
  };
  const circumference = 2 * Math.PI * 12; // radius 6 -> 37.7
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-green-600 text-white">
      {/* Unique Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <BiometricPulse />
        <DataStream />

        {/* Floating orbs */}
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
            <img src="/logo.png" alt="Darshai" className="h-14 w-auto object-contain" />
          </div>
          <div className="w-14 h-14" />
        </div>
      </nav>

      {/* Main Slideshow with Directional Transitions */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pt-36">
        <AnimatePresence mode="wait" custom={direction}>
          <SlideTransition key={current.id} direction={direction}>
            <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
              {/* Left Side */}
              <div className="space-y-10">
                <TypewriterCategory text={current.category} />

                {/* Icon cluster with breathing effect */}
                <div className="flex gap-4">
                  {current.subSections ? (
                    current.subSections.map((_, idx) => {
                      const Icon = Icons[idx];
                      return (
                        <div
                          key={idx}
                          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl"
                        >
                          <BreathingIcon Icon={Icon} delay={idx * 0.3} />
                        </div>
                      );
                    })
                  ) : (
                    Icons.map((Icon, idx) => (
                      <div
                        key={idx}
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl"
                      >
                        <BreathingIcon Icon={Icon} delay={idx * 0.2} />
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

                <div className="w-40 h-[2px] bg-gradient-to-r from-green-400 to-transparent" />
              </div>

              {/* Right Side - Cards with Scan Effect */}
              <div className="space-y-5">
                {current.subSections ? (
                  current.subSections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <ScanCard>
                        <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 shadow-2xl hover:from-white/15 transition-all duration-500 border border-white/10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                              {index === 0 && <Cpu className="w-4 h-4 text-white" />}
                              {index === 1 && <Map className="w-4 h-4 text-white" />}
                              {index === 2 && <BarChart3 className="w-4 h-4 text-white" />}
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                              {section.heading}
                            </h3>
                          </div>
                          <p className="text-base md:text-lg font-light leading-relaxed text-white/90">
                            {section.description}
                          </p>
                        </div>
                      </ScanCard>
                    </motion.div>
                  ))
                ) : (
                  current.content.map((paragraph, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <ScanCard>
                        <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 shadow-2xl hover:from-white/15 transition-all duration-500 border border-white/10">
                          <p className="text-base md:text-lg font-light leading-relaxed text-white/90">
                            {paragraph}
                          </p>
                        </div>
                      </ScanCard>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </SlideTransition>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation - Enhanced Dots with Segmented Progress Ring */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-3 shadow-2xl">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleDotClick(index)}
                className="relative group"
              >
                {active === index && (
                  <svg className="absolute -top-1 -left-1 w-6 h-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      fill="none"
                      stroke={`${getSegmentColor()}30`}
                      strokeWidth="1.5"
                    />
                    <motion.circle
                      cx="8"
                      cy="8"
                      r="6"
                      fill="none"
                      stroke={getSegmentColor()}
                      strokeWidth="1.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform="rotate(-90 8 8)"
                    />
                  </svg>
                )}
                <div
                  className={`transition-all duration-500 ${
                    active === index
                      ? "w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                      : "w-2 h-2 rounded-full bg-white/40 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* End Button */}
          {active === slides.length - 1 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/our-program")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-green-900 font-medium flex items-center gap-2 hover:from-green-300 hover:to-emerald-300 transition-all shadow-lg"
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}