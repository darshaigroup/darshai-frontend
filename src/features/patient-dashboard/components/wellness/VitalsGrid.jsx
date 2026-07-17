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

export default function VitalsGrid({ patient }) {
 const vitals=[
{
title:"Dominant Dosha",
value:`${patient?.primaryLevel||0}%`,
unit:patient?.primaryDosha||"--",
trend:"+0%",
icon:Thermometer,
color:"amber",
},
{
title:"Secondary Dosha",
value:`${patient?.secondaryLevel||0}%`,
unit:patient?.secondaryDosha||"--",
trend:"+0%",
icon:Heart,
color:"rose",
},
{
title:"Wellness Score",
value:`${patient?.compositeScore||0}%`,
unit:"Excellent",
trend:"+2%",
icon:Activity,
color:"emerald",
},
{
title:"Risk Tier",
value:patient?.riskTier||"Pending",
unit:patient?.riskBand||"Stable",
trend:"Live",
icon:Wind,
color:"sky",
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