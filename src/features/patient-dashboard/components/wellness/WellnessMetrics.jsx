import { motion } from "motion/react";
import {
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Activity,
  ArrowRight,
  Brain,
} from "lucide-react";
import WellnessCard from "./WellnessCard";

export default function WellnessMetrics() {
  const metrics = [
    {
      title: "Wellness Score",
      value: "84%",
      status: "Optimal Alignment",
      trend: "+4%",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      title: "Global Sync",
      value: "TriDosha",
      status: "Connected",
      trend: "Live",
      icon: Sparkles,
      color: "sky",
    },
    {
      title: "Recovery Index",
      value: "92%",
      status: "Excellent",
      trend: "+8%",
      icon: ShieldCheck,
      color: "amber",
    },
    {
      title: "Activity Feed",
      value: "Live",
      status: "Updated 5 min ago",
      trend: "24/7",
      icon: Activity,
      color: "teal",
    },
  ];

  return (
    <section className="space-y-8">

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <Brain className="w-4 h-4 text-emerald-500" />

            <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-emerald-600">
              Wellness Intelligence Snapshot
            </span>

          </div>

          <h2 className="mt-5 text-3xl lg:text-4xl font-serif font-bold text-slate-900">
            Personalized Health Metrics
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            Your companion continuously analyzes physiological biomarkers,
            constitutional balance and recovery trends to optimize long-term
            wellness.
          </p>

        </div>

        <motion.button
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#06152A] px-6 py-3 text-white font-medium hover:bg-[#0B2442] transition"
        >
          Open Wellness Report

          <ArrowRight className="w-4 h-4" />

        </motion.button>

      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: .45,
            }}
          >
            <WellnessCard
              title={metric.title}
              value={metric.value}
              status={metric.status}
              trend={metric.trend}
              icon={metric.icon}
              color={metric.color}
            />
          </motion.div>
        ))}

      </div>

      {/* Bottom Summary */}
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.08)]"
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-[11px] uppercase tracking-[0.18em] font-mono text-emerald-600">
              Wellness Companion Summary
            </p>

            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              Wellness trajectory remains positive.
            </h3>

            <p className="mt-2 max-w-3xl text-slate-500 leading-7">
              Recovery biomarkers have improved over the last seven days.
              Continue following your personalized protocol to maintain optimal
              vitality, circadian rhythm and metabolic resilience.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 lg:min-w-[320px]">

            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                HRV
              </p>

              <h4 className="mt-2 text-2xl font-bold text-emerald-600">
                82 ms
              </h4>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Sleep
              </p>

              <h4 className="mt-2 text-2xl font-bold text-sky-600">
                7.8 hrs
              </h4>
            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}