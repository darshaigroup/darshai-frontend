import { useState } from "react";
import { Flame, Wind, Droplets } from "lucide-react";
import DoshaNode from "./DoshaNode";

export default function DoshaBodyMap() {
  const [active, setActive] = useState("pitta");

  const doshas = {
    pitta: {
      title: "Pitta",
      color: "#f59e0b",
      icon: Flame,
      desc: "Controls metabolism, digestion and transformation.",
    },
    vata: {
      title: "Vata",
      color: "#38bdf8",
      icon: Wind,
      desc: "Controls movement, breathing and nervous activity.",
    },
    kapha: {
      title: "Kapha",
      color: "#10b981",
      icon: Droplets,
      desc: "Provides stability, lubrication and structure.",
    },
  };

  const current = doshas[active];
  const Icon = current.icon;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 flex justify-center">
          <svg
            viewBox="0 0 200 300"
            className="w-full max-w-[280px] h-auto"
          >
            <path
              d="M100,45 C92,45 88,50 88,58 C88,68 94,75 100,75 C106,75 112,68 112,58 C112,50 108,45 100,45 Z
              M100,75 L100,210
              M70,105 L130,105
              M80,210 L70,280
              M120,210 L130,280"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <DoshaNode
              x="100"
              y="90"
              label="Pitta"
              color="#f59e0b"
              active={active === "pitta"}
              onClick={() => setActive("pitta")}
            />

            <DoshaNode
              x="75"
              y="145"
              label="Vata"
              color="#38bdf8"
              active={active === "vata"}
              onClick={() => setActive("vata")}
            />

            <DoshaNode
              x="125"
              y="145"
              label="Kapha"
              color="#10b981"
              active={active === "kapha"}
              onClick={() => setActive("kapha")}
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon className="w-6 h-6" style={{ color: current.color }} />
          </div>

          <h3 className="mt-4 text-2xl font-serif font-bold">
            {current.title}
          </h3>

          <p className="mt-3 text-slate-300 leading-relaxed">
            {current.desc}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              Active
            </span>

            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              Balanced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}