import { useState } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Heart,
  Activity,
  Wind,
  Sparkles,
  ShieldCheck,
  ArrowRight,
 HeartPulse
} from "lucide-react";

export default function AnatomicalBioMap() {
  const [selected, setSelected] = useState("heart");

  const nodes = {
    brain: {
      icon: Brain,
      title: "Cerebral Prana",
      value: 88,
      color: "#38BDF8",
      desc: "Neuro-sensory coordination and cognitive vitality.",
      insight: "Brain recovery remains excellent with balanced Vata activity."
    },
    heart: {
      icon: HeartPulse,
      title: "Sadhaka Pitta",
      value: 92,
      color: "#FB7185",
      desc: "Emotional resilience and cardiovascular regulation.",
      insight: "Excellent cardiac resilience with optimal emotional balance."
    },
    stomach: {
      icon: Activity,
      title: "Samana Agni",
      value: 74,
      color: "#F59E0B",
      desc: "Digestive metabolism and nutrient absorption.",
      insight: "Support Agni with warm meals and consistent meal timing."
    },
    lungs: {
      icon: Wind,
      title: "Avalambaka Kapha",
      value: 69,
      color: "#10B981",
      desc: "Respiratory support and oxygen transport.",
      insight: "Practice breathing exercises to enhance lung vitality."
    }
  };

  const current = nodes[selected];
  const Icon = current.icon;

  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 lg:px-8 py-6 border-b border-stone-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200 px-4 py-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span className="text-[11px] uppercase tracking-[.22em] font-mono text-sky-700">
              Bio Intelligence
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900">
            Anatomical Biomarker Map
          </h2>

          <p className="mt-2 text-slate-500 max-w-2xl">
            Explore organ-specific vitality powered by biometric analysis and Ayurvedic intelligence.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-white hover:bg-[#0B2442] transition">
          Full Biomarker Report
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">

        {/* Human Body */}
        <div className="relative flex justify-center">

          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,.08),transparent_70%)]" />

          <svg
            viewBox="0 0 220 330"
            className="w-full max-w-[300px] relative z-10"
          >

            <path
              d="M110 40 C95 40 90 50 90 62 C90 74 100 84 110 84 C120 84 130 74 130 62 C130 50 125 40 110 40
              M110 84 L110 235
              M78 118 L142 118
              M92 235 L82 315
              M128 235 L138 315"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {Object.entries(nodes).map(([key, node], index) => {

              const positions = {
                brain:[110,95],
                heart:[110,135],
                stomach:[110,175],
                lungs:[110,215]
              };

              return (
                <motion.circle
                  key={key}
                  whileHover={{ scale:1.2 }}
                  cx={positions[key][0]}
                  cy={positions[key][1]}
                  r={selected===key?12:9}
                  fill={node.color}
                  className="cursor-pointer"
                  onClick={()=>setSelected(key)}
                />
              );

            })}

          </svg>

        </div>

        {/* Right */}
        <div>

          <div className="flex items-center gap-4">

            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center"
              style={{
                background:`${current.color}15`,
                border:`1px solid ${current.color}30`
              }}
            >
              <Icon
                className="w-8 h-8"
                style={{color:current.color}}
              />
            </div>

            <div>

              <h3 className="text-3xl font-serif font-bold text-slate-900">
                {current.title}
              </h3>

              <span
                className="inline-flex mt-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background:`${current.color}20`,
                  color:current.color
                }}
              >
                Active Biomarker
              </span>

            </div>

          </div>

          <p className="mt-6 text-slate-600 leading-7">
            {current.desc}
          </p>

          {/* Progress */}
          <div className="mt-8">

            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-500">
                Organ Vitality
              </span>

              <span
                className="font-semibold"
                style={{color:current.color}}
              >
                {current.value}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">

              <motion.div
                initial={{width:0}}
                animate={{width:`${current.value}%`}}
                transition={{duration:1}}
                className="h-full rounded-full"
                style={{background:current.color}}
              />

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">

              <ShieldCheck className="w-6 h-6 text-emerald-500" />

              <p className="mt-4 text-sm text-slate-500">
                Recovery
              </p>

              <h4 className="mt-2 text-2xl font-bold text-slate-900">
                Excellent
              </h4>

            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">

              <Activity className="w-6 h-6 text-sky-500" />

              <p className="mt-4 text-sm text-slate-500">
                AI Sync
              </p>

              <h4 className="mt-2 text-2xl font-bold text-slate-900">
                Live
              </h4>

            </div>

          </div>

          {/* Recommendation */}
          <div className="mt-8 rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-sky-50 p-6">

            <p className="text-[11px] uppercase tracking-[.2em] text-emerald-700 font-mono">
              AI Recommendation
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              {current.insight}
            </p>

          </div>

        </div>

      </div>

    </motion.section>
  );
}