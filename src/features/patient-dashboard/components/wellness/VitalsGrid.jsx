import { motion } from "motion/react";
import {
  Thermometer,
  Heart,
  Activity,
  Wind,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import WellnessCard from "./WellnessCard";

export default function VitalsGrid() {
  const vitals = [
    {
      title: "Body Temperature",
      value: "36.2°C",
      unit: "Normal",
      trend: "+0.2",
      icon: Thermometer,
      color: "amber",
    },
    {
      title: "Pulse Spectrum",
      value: "85 BPM",
      unit: "Stable",
      trend: "-2%",
      icon: Heart,
      color: "rose",
    },
    {
      title: "Blood Pressure",
      value: "110/70",
      unit: "Optimal",
      trend: "+1%",
      icon: Activity,
      color: "emerald",
    },
    {
      title: "Breathing Cadence",
      value: "15/min",
      unit: "Balanced",
      trend: "Normal",
      icon: Wind,
      color: "sky",
    },
  ];

  return (
    <section className="space-y-6">

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <Sparkles className="w-4 h-4 text-emerald-500" />

            <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-emerald-600">
              Live Bio Telemetry
            </span>

          </div>

          <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900">
            Vital Health Parameters
          </h2>

          <p className="mt-2 text-slate-500 max-w-2xl">
            AI monitored physiological biomarkers synchronized with your
            Ayurvedic constitution and longevity profile.
          </p>

        </div>

        <motion.button
          whileHover={{ x: 3 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0B2442] transition"
        >
          View Complete Telemetry

          <ArrowRight className="w-4 h-4" />
        </motion.button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {vitals.map((vital, index) => (
          <motion.div
            key={vital.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
          >
            <WellnessCard
              title={vital.title}
              value={vital.value}
              status={vital.unit}
              trend={vital.trend}
              icon={vital.icon}
              color={vital.color}
            />
          </motion.div>
        ))}

      </div>

    </section>
  );
}