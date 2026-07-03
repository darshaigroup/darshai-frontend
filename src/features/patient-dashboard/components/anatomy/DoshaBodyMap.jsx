import { useState } from "react";
import { motion } from "motion/react";
import {
  Flame,
  Wind,
  Droplets,
  Sparkles,
  Brain,
  ArrowRight,
} from "lucide-react";
import DoshaNode from "./DoshaNode";
import body from "@/assets/images/BodyTypes.png";

export default function DoshaBodyMap() {
  const [active, setActive] = useState("pitta");

  const doshas = {
    pitta: {
      title: "Pitta",
      icon: Flame,
      color: "#F59E0B",
      level: "74%",
      badge: "Dominant",
      description:
        "Controls metabolism, digestion, hormonal regulation and body temperature.",
      recommendation:
        "Prioritize cooling foods, avoid excessive spices and maintain hydration.",
    },
    vata: {
      title: "Vata",
      icon: Wind,
      color: "#38BDF8",
      level: "61%",
      badge: "Balanced",
      description:
        "Responsible for movement, nervous system activity, respiration and circulation.",
      recommendation:
        "Improve sleep routine, warm nourishment and regular meditation.",
    },
    kapha: {
      title: "Kapha",
      icon: Droplets,
      color: "#10B981",
      level: "52%",
      badge: "Stable",
      description:
        "Provides stability, immunity, lubrication and tissue nourishment.",
      recommendation: "Increase physical activity and reduce heavy foods.",
    },
  };

  const current = doshas[active];
  const Icon = current.icon;

  return (
  <motion.section
    whileHover={{ y: -4 }}
    className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,.08)]"
  >
    {/* Header */}
    <div className="flex flex-col gap-6 border-b border-slate-100 px-6 pt-6 pb-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
          <Sparkles className="h-4 w-4 text-emerald-600" />

          <span className="font-mono text-[11px] uppercase tracking-[.22em] text-emerald-700">
            Ayurvedic Constitution
          </span>
        </div>

        <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900">
          Dosha Intelligence Map
        </h2>

        <p className="mt-3 max-w-2xl text-slate-500">
          Select a dosha on the anatomical model to explore its influence on
          your current physiological balance.
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-full bg-[#06152A] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#0B2442]">
        View Complete Analysis
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>

    {/* Content */}
   <div className="grid grid-cols-1 xl:grid-cols-[380px_minmax(520px,1fr)] gap-12 p-8 items-start">

  {/* LEFT SIDE */}
  <div className="relative flex justify-center">

    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.08),transparent_70%)]" />

    <div className="relative w-full max-w-[360px]">

      <img
        src={body}
        alt="Dosha Body"
        className="w-full object-contain"
      />

      {/* Pitta */}
      <button
        onClick={() => setActive("pitta")}
        className="absolute left-1/2 top-[20%] -translate-x-1/2"
      >
        <DoshaNode
          label="Pitta"
          color="#F59E0B"
          active={active === "pitta"}
        />
      </button>

      {/* Vata */}
      <button
        onClick={() => setActive("vata")}
        className="absolute left-[24%] top-[47%]"
      >
        <DoshaNode
          label="Vata"
          color="#38BDF8"
          active={active === "vata"}
        />
      </button>

      {/* Kapha */}
      <button
        onClick={() => setActive("kapha")}
        className="absolute right-[18%] top-[47%]"
      >
        <DoshaNode
          label="Kapha"
          color="#10B981"
          active={active === "kapha"}
        />
      </button>

      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute top-4 right-[-35px] rounded-3xl border border-slate-200 bg-white px-7 py-5 shadow-xl"
      >
        <p className="text-center text-[10px] uppercase tracking-[.2em] text-slate-400">
          Wellness
        </p>

        <h3 className="mt-2 text-center text-4xl font-bold text-emerald-600">
          91%
        </h3>
      </motion.div>

    </div>

  </div>

  {/* RIGHT SIDE */}

  <div className="flex w-full flex-col gap-6">

    {/* Dosha Heading */}

    <div className="flex items-center gap-5">

      <div
        className="flex h-16 w-16 items-center justify-center rounded-3xl shrink-0"
        style={{
          background: `${current.color}15`,
          border: `1px solid ${current.color}40`,
        }}
      >
        <Icon
          className="h-8 w-8"
          style={{
            color: current.color,
          }}
        />
      </div>

      <div>

        <h2 className="font-serif text-[46px] leading-none font-bold text-slate-900">
          {current.title}
        </h2>

        <span
          className="mt-3 inline-flex rounded-full px-4 py-1 text-xs font-semibold"
          style={{
            background: `${current.color}20`,
            color: current.color,
          }}
        >
          {current.badge}
        </span>

      </div>

    </div>

    {/* Progress */}

    <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-6">

      <div className="mb-3 flex justify-between">

        <span className="text-sm text-slate-500">
          Dosha Influence
        </span>

        <span
          className="font-semibold"
          style={{
            color: current.color,
          }}
        >
          {current.level}
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: current.level }}
          transition={{ duration: 1 }}
          className="h-full rounded-full"
          style={{
            background: current.color,
          }}
        />

      </div>

    </div>

    {/* Clinical */}

    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6">

      <div className="mb-4 flex items-center gap-3">

        <Brain className="h-5 w-5 text-emerald-600" />

        <h3 className="text-lg font-semibold text-slate-900">
          Clinical Interpretation
        </h3>

      </div>

      <p className="leading-8 text-slate-600">
        {current.description}
      </p>

    </div>

    {/* Recommendation */}

    <div className="w-full rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">

      <p className="text-[11px] uppercase tracking-[.22em] text-emerald-700">
        AI Recommendation
      </p>

      <p className="mt-4 leading-8 text-slate-700">
        {current.recommendation}
      </p>

    </div>

  </div>

</div>
  </motion.section>
);
}
