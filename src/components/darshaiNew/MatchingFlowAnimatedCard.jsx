import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
const STAGES = [
  {
    num: "01",
    stage: "YOU",
    detail: "Individual Baseline & Biological Profile",
  },
  {
    num: "02",
    stage: "GOALS",
    detail: "Target Health Outcomes & Renewal Priorities",
  },
  { num: "03", stage: "CONTEXT", detail: "Life Rhythm, Constraints & Pacing" },
  {
    num: "04",
    stage: "ENVIRONMENT",
    detail: "Microclimate & Bio-Terrain Matching",
  },
  {
    num: "05",
    stage: "PROGRAMME",
    detail: "Clinically Aligned Protocol & Sanctuary",
  },
];
export default function MatchingFlowAnimatedCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Auto-cycle through the 5 stages to demonstrate flow direction
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isHovered]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-[#121214] border border-white/12 rounded-[28px] p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden group/box"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#0E4D3A]/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 relative z-10">
        <span className="text-xs font-mono font-bold text-[#C6A660] tracking-wider uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>MATCHING FLOW</span>
        </span>
        <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
          5-STAGE SEQUENCE
        </span>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="space-y-3.5 relative z-10"
      >
        {STAGES.map((item, idx) => {
          const isActive = activeIdx === idx;
          const isLast = idx === STAGES.length - 1;
          return (
            <motion.div
              variants={itemVariants}
              onClick={() => setActiveIdx(idx)}
              className={`p-4 rounded-[18px] transition-all duration-500 cursor-pointer flex items-center justify-between gap-3 relative border ${
                isActive
                  ? "bg-[#1C2822] border-[#34D399] shadow-[0_0_20px_rgba(52,211,153,0.22)] scale-[1.02]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
              key={item.stage}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#34D399] text-[#121214] shadow-[0_0_12px_#34D399]"
                      : "bg-[#0E4D3A]/60 text-[#34D399] border border-[#34D399]/30"
                  }`}
                >
                  {item.num}
                </div>
                <div>
                  <h4
                    className={`font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors duration-300 ${isActive ? "text-[#34D399]" : "text-white group-hover:text-[#34D399]"}`}
                  >
                    {item.stage}
                  </h4>
                  <p className="text-xs text-white/65 font-normal leading-tight mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-center pl-2">
                {!isLast ? (
                  <motion.div
                    animate={
                      isActive
                        ? {
                            y: [0, 4, 0],
                            scale: [1, 1.25, 1],
                            opacity: [0.7, 1, 0.7],
                          }
                        : { y: 0, scale: 1, opacity: 0.35 }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#34D399]/20 text-[#34D399] border border-[#34D399] shadow-[0_0_10px_#34D399]"
                        : "text-white/40"
                    }`}
                  >
                    <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#34D399] text-[#121214] shadow-[0_0_12px_#34D399]"
                        : "text-[#34D399]/60"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
