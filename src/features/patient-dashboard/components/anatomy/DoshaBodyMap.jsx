import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Wind, Droplets, Sparkles, Brain, ArrowRight, HeartPulse, Activity } from "lucide-react";
import DoshaNode from "./DoshaNode";
import body from "@/assets/images/BodyTypes.png";

const text = (v, f) => (v ?? "") !== "" ? v : f;
const num = v => (Number.isFinite(+v) ? +v : 0);

const DOSHAS = {
  pitta: { title: "Pitta", label: "Pitta", icon: Flame, color: "#F59E0B", position: "absolute left-1/2 top-[20%] -translate-x-1/2" },
  vata: { title: "Vata", label: "Vata", icon: Wind, color: "#38BDF8", position: "absolute left-[24%] top-[47%]" },
  kapha: { title: "Kapha", label: "Kapha", icon: Droplets, color: "#10B981", position: "absolute right-[18%] top-[47%]" },
};

export default function DoshaBodyMap({ patient = {} }) {
  const report = patient?.report || {}, vikriti = report?.vikriti_result || {}, correlation = report?.correlation_result || {}, primary = report?.primary_dosha ?? patient?.primaryDosha ?? "Pitta", secondary = report?.secondary_dosha ?? patient?.secondaryDosha ?? "", composite = report?.composite_score ?? patient?.compositeScore ?? null, wellness = report?.wellness_score ?? patient?.wellnessScore ?? (composite !== null ? Math.max(0, 100 - num(composite)) : null);

  const [active, setActive] = useState(primary.toLowerCase());
  useEffect(() => setActive(primary.toLowerCase()), [primary]);

  const percentages = { Vata: num(vikriti?.vata_pct), Pitta: num(vikriti?.pitta_pct), Kapha: num(vikriti?.kapha_pct) };

  const doshas = Object.fromEntries(Object.entries(DOSHAS).map(([k, d]) => [k, {
    ...d,
    level: percentages[d.label],
    badge: primary === d.label ? "Dominant" : secondary === d.label ? "Secondary" : "Balanced",
    severity: primary === d.label ? report?.primary_level : secondary === d.label ? report?.secondary_level : "Balanced",
    description: report?.clinical_summary ?? correlation?.summary ?? `${d.label} assessment pending.`,
    recommendation: correlation?.ama_link ?? "Maintain a balanced Ayurvedic lifestyle.",
  }]));

  const current = doshas[active] ?? doshas.pitta, Icon = current.icon;

  return (
    <motion.section whileHover={{ y: -4 }} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,.08)]">
      <div className="flex flex-col gap-6 border-b border-slate-100 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2"><Sparkles className="h-4 w-4 text-emerald-600" /><span className="font-mono text-[11px] uppercase tracking-[.22em] text-emerald-700">Ayurvedic Constitution</span></div>
          <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900">Dosha Intelligence Map</h2>
          <p className="mt-3 max-w-2xl text-slate-500">Select a dosha on the anatomical model to explore its influence on your physiological balance.</p>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-[#06152A] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#0B2442]">View Complete Analysis <ArrowRight className="h-4 w-4" /></button>
      </div>

      <div className="grid grid-cols-1 gap-12 p-8 xl:grid-cols-[380px_minmax(520px,1fr)]">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.08),transparent_70%)]" />
          <div className="relative w-full max-w-[360px]">
            <img src={body} alt="Dosha Body" className="w-full object-contain" />

            {Object.values(DOSHAS).map(d => (
              <button key={d.label} onClick={() => setActive(d.label.toLowerCase())} className={d.position}>
                <DoshaNode label={d.label} color={d.color} active={active === d.label.toLowerCase()} />
              </button>
            ))}

            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute right-[-35px] top-1 rounded-3xl border border-slate-200 bg-white px-12 py-2 text-center shadow-xl">
              <p className="text-[10px] uppercase tracking-[.2em] text-slate-400">Wellness</p>
              <h3 className="mt-2 text-4xl font-bold text-emerald-600">{wellness !== null ? `${wellness}%` : "--"}</h3>
              <p className="mt-2 text-xs text-slate-500">{text(report?.risk_tier ?? report?.risk_band, "Pending")}</p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl" style={{ background: `${current.color}15`, border: `1px solid ${current.color}40` }}><Icon className="h-8 w-8" style={{ color: current.color }} /></div>

            <div>
              <h2 className="font-serif text-[46px] font-bold leading-none text-slate-900">{current.title}</h2>
              <span className="mt-3 inline-flex rounded-full px-4 py-1 text-xs font-semibold" style={{ background: `${current.color}20`, color: current.color }}>{current.badge}</span>
              <p className="mt-2 text-sm text-slate-500">{current.severity}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div><h3 className="text-lg font-semibold text-slate-900">Dosha Distribution</h3><p className="mt-1 text-sm text-slate-500">Current constitutional balance</p></div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Live Analysis</span>
            </div>

            {Object.values(doshas).map(d => (
              <div key={d.title} className="mb-5 last:mb-0">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ background: d.color }} />
                    <span className="font-medium text-slate-700">{d.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${d.badge === "Dominant" ? "bg-emerald-100 text-emerald-700" : d.badge === "Secondary" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{d.badge}</span>
                    {d.severity !== "Balanced" && <span className="text-xs text-slate-500">{d.severity}</span>}
                  </div>

                  <span className="font-semibold" style={{ color: d.color }}>{d.level.toFixed(2)}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, Math.max(0, d.level))}%` }} transition={{ duration: .9 }} className="h-full rounded-full" style={{ background: d.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><HeartPulse className="h-6 w-6 text-rose-500" /><p className="mt-4 text-sm text-slate-500">Risk Tier</p><h3 className="mt-2 text-2xl font-bold text-slate-900">{text(report?.risk_tier ?? report?.risk_band, "Pending Analysis")}</h3></div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><Activity className="h-6 w-6 text-emerald-500" /><p className="mt-4 text-sm text-slate-500">Wellness Index</p><h3 className="mt-2 text-2xl font-bold text-slate-900">{wellness !== null ? `${wellness}%` : "--"}</h3></div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3"><Brain className="h-5 w-5 text-emerald-600" /><h3 className="text-lg font-semibold text-slate-900">Clinical Interpretation</h3></div>
            <p className="leading-8 text-slate-600">{text(report?.clinical_summary, current.description)}</p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">
            <p className="text-[11px] uppercase tracking-[.22em] text-emerald-700">AI Recommendation</p>
            <p className="mt-4 leading-8 text-slate-700">{text(current.recommendation, report?.clinical_summary)}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}