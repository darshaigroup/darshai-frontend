import { useState } from "react";
import { Brain, Heart, Activity, Wind } from "lucide-react";

export default function AnatomicalBioMap() {
  const [selected, setSelected] = useState("heart");

  const nodes = {
    brain: {
      icon: Brain,
      title: "Cerebral Prana",
      value: 88,
      color: "text-sky-400",
      desc: "Neuro-sensory coordination and mental agility.",
    },
    heart: {
      icon: Heart,
      title: "Sadhaka Pitta",
      value: 92,
      color: "text-rose-400",
      desc: "Emotional resilience and cardiac vitality.",
    },
    stomach: {
      icon: Activity,
      title: "Samana Agni",
      value: 74,
      color: "text-amber-400",
      desc: "Digestive and metabolic efficiency.",
    },
    lungs: {
      icon: Wind,
      title: "Avalambaka Kapha",
      value: 69,
      color: "text-emerald-400",
      desc: "Respiratory support and oxygen exchange.",
    },
  };

  const current = nodes[selected];
  const Icon = current.icon;

  return (
    <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div className="xl:col-span-5 bg-slate-900 rounded-3xl border border-slate-800 p-6 text-white">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 220 320"
            className="w-full max-w-[280px]"
          >
            <path
              d="M110 40 C95 40 90 50 90 60 C90 72 100 82 110 82 C120 82 130 72 130 60 C130 50 125 40 110 40 Z
                 M110 82 L110 230
                 M80 115 L140 115
                 M90 230 L80 300
                 M130 230 L140 300"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3"
            />

            <circle cx="110" cy="95" r="10" fill="#38bdf8" onClick={() => setSelected("brain")} className="cursor-pointer" />
            <circle cx="110" cy="130" r="10" fill="#fb7185" onClick={() => setSelected("heart")} className="cursor-pointer" />
            <circle cx="110" cy="165" r="10" fill="#f59e0b" onClick={() => setSelected("stomach")} className="cursor-pointer" />
            <circle cx="110" cy="205" r="10" fill="#10b981" onClick={() => setSelected("lungs")} className="cursor-pointer" />
          </svg>
        </div>
      </div>

      <div className="xl:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Icon className={`w-6 h-6 ${current.color}`} />
        </div>

        <h3 className="mt-5 text-2xl font-serif font-bold text-slate-900 dark:text-white">
          {current.title}
        </h3>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          {current.desc}
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">
              Wellness Alignment
            </span>

            <span className="font-semibold">
              {current.value}%
            </span>
          </div>

          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
              style={{ width: `${current.value}%` }}
            />
          </div>
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">
            AI Recommendation
          </h4>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Maintain circadian alignment, optimize sleep quality,
            continue anti-inflammatory nutrition and monitor
            biometric recovery metrics.
          </p>
        </div>
      </div>
    </section>
  );
}