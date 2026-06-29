import { useState } from "react";
import { motion } from "motion/react";
import { Flame, Wind, Droplets, Sparkles, Brain, ArrowRight } from "lucide-react";
import DoshaNode from "./DoshaNode";

export default function DoshaBodyMap() {
  const [active, setActive] = useState("pitta");

  const doshas = {
    pitta: {
      title: "Pitta",
      icon: Flame,
      color: "#F59E0B",
      level: "74%",
      badge: "Dominant",
      description: "Controls metabolism, digestion, hormonal regulation and body temperature.",
      recommendation: "Prioritize cooling foods, avoid excessive spices and maintain hydration."
    },
    vata: {
      title: "Vata",
      icon: Wind,
      color: "#38BDF8",
      level: "61%",
      badge: "Balanced",
      description: "Responsible for movement, nervous system activity, respiration and circulation.",
      recommendation: "Improve sleep routine, warm nourishment and regular meditation."
    },
    kapha: {
      title: "Kapha",
      icon: Droplets,
      color: "#10B981",
      level: "52%",
      badge: "Stable",
      description: "Provides stability, immunity, lubrication and tissue nourishment.",
      recommendation: "Increase physical activity and reduce heavy foods."
    }
  };

  const current = doshas[active];
  const Icon = current.icon;

  return (
    <motion.section
      whileHover={{ y: -4 }}
      className="rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,.08)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 lg:px-8 pt-6 pb-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] uppercase tracking-[.22em] font-mono text-emerald-700">
              Ayurvedic Constitution
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900">
            Dosha Intelligence Map
          </h2>

          <p className="mt-2 text-slate-500 max-w-2xl">
            Select a dosha on the anatomical model to explore its influence on your current physiological balance.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-[#06152A] text-white px-5 py-3 text-sm hover:bg-[#0B2442] transition">
          View Complete Analysis
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-10 p-6 lg:p-8">

        {/* Body Illustration */}
        <div className="relative flex justify-center">

          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,.08),transparent_70%)]" />

          <svg viewBox="0 0 220 340" className="w-full max-w-[300px] relative z-10">

            <path
              d="M110 40 C95 40 90 50 90 62 C90 75 100 85 110 85 C120 85 130 75 130 62 C130 50 125 40 110 40
              M110 85 L110 235
              M75 120 L145 120
              M92 235 L82 315
              M128 235 L138 315"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <DoshaNode
              x="110"
              y="95"
              label="Pitta"
              color="#F59E0B"
              active={active === "pitta"}
              onClick={() => setActive("pitta")}
            />

            <DoshaNode
              x="82"
              y="160"
              label="Vata"
              color="#38BDF8"
              active={active === "vata"}
              onClick={() => setActive("vata")}
            />

            <DoshaNode
              x="138"
              y="160"
              label="Kapha"
              color="#10B981"
              active={active === "kapha"}
              onClick={() => setActive("kapha")}
            />

          </svg>

          {/* Floating Score */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute right-2 top-5 rounded-2xl bg-white border border-slate-200 shadow-lg p-4"
          >
            <p className="text-[10px] uppercase tracking-[.18em] text-slate-400">
              Wellness
            </p>

            <h3 className="mt-2 text-2xl font-bold text-emerald-600">
              91%
            </h3>
          </motion.div>

        </div>

        {/* Details */}
        <div className="space-y-6">

          <div className="flex items-center gap-4">

            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center"
              style={{
                background: `${current.color}15`,
                border: `1px solid ${current.color}40`
              }}
            >
              <Icon
                className="w-8 h-8"
                style={{ color: current.color }}
              />
            </div>

            <div>

              <h3 className="text-3xl font-serif font-bold text-slate-900">
                {current.title}
              </h3>

              <span
                className="inline-flex mt-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: `${current.color}20`,
                  color: current.color
                }}
              >
                {current.badge}
              </span>

            </div>

          </div>

          <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">

            <div className="flex justify-between mb-2">

              <span className="text-sm text-slate-500">
                Dosha Influence
              </span>

              <span
                className="font-semibold"
                style={{ color: current.color }}
              >
                {current.level}
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: current.level }}
                transition={{ duration: 1 }}
                className="h-full rounded-full"
                style={{ background: current.color }}
              />

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 p-6">

            <div className="flex items-center gap-2 mb-3">

              <Brain className="w-5 h-5 text-emerald-600" />

              <h4 className="font-semibold text-slate-900">
                Clinical Interpretation
              </h4>

            </div>

            <p className="text-slate-600 leading-7">
              {current.description}
            </p>

          </div>

          <div className="rounded-3xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 p-6">

            <p className="text-[11px] uppercase tracking-[.2em] text-emerald-700 font-mono">
              AI Recommendation
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              {current.recommendation}
            </p>

          </div>

        </div>

      </div>
    </motion.section>
  );
}