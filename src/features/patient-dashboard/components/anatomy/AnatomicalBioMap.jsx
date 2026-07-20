import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Activity, Wind, Sparkles, ShieldCheck, ArrowRight, HeartPulse } from "lucide-react";

export default function AnatomicalBioMap({ patient = {} }) {
  const [selected, setSelected] = useState("heart");

  const report = patient?.report || {},
    value = (v, f) => (v ?? "") !== "" ? v : f,
    num = v => (Number.isFinite(Number(v)) ? Number(v) : 0),
    composite = patient?.compositeScore ?? report?.composite_score ?? null,
    wellness = composite !== null ? Math.max(0, 100 - num(composite)) : null,
    vikriti = report?.vikriti_result || {},
    nodes = {
      brain: { icon: Brain, title: value(report?.secondary_dosha, "Secondary Dosha"), value: num(vikriti?.vata_pct), color: "#38BDF8", desc: `Secondary constitutional influence (${value(report?.secondary_dosha, "Pending")}).`, insight: value(report?.clinical_summary, "Assessment pending.") },
      heart: { icon: HeartPulse, title: value(report?.primary_dosha, "Dominant Dosha"), value: num(vikriti?.pitta_pct), color: "#FB7185", desc: `Primary constitutional influence (${value(report?.primary_dosha, "Pending")}).`, insight: value(report?.clinical_summary, "Assessment pending.") },
      stomach: { icon: Activity, title: "Wellness Index", value: wellness ?? 0, color: "#F59E0B", desc: wellness !== null ? `Overall wellness index is ${wellness}%.` : "Assessment Required.", insight: value(report?.clinical_summary, "Complete assessment to calculate wellness.") },
      lungs: { icon: Wind, title: value(report?.risk_tier || report?.risk_band, "Risk Tier"), value: num(composite), color: "#10B981", desc: `Current Risk: ${value(report?.risk_tier || report?.risk_band, "Pending Analysis")}`, insight: value(report?.clinical_summary, "Risk assessment pending.") },
    },
    positions = { brain: [110, 95], heart: [110, 135], stomach: [110, 175], lungs: [110, 215] },
    current = nodes[selected],
    Icon = current.icon;

  return (
    <motion.section whileHover={{ y: -3 }} className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]">
      <div className="flex flex-col gap-5 border-b border-stone-100 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2"><Sparkles className="h-4 w-4 text-sky-600" /><span className="font-mono text-[11px] uppercase tracking-[.22em] text-sky-700">Bio Intelligence</span></div>
          <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900">Anatomical Biomarker Map</h2>
          <p className="mt-2 max-w-2xl text-slate-500">Explore organ-specific vitality powered by biometric analysis and Ayurvedic intelligence.</p>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-white transition hover:bg-[#0B2442]">Full Biomarker Report <ArrowRight className="h-4 w-4" /></button>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-8">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,.08),transparent_70%)]" />

          <svg viewBox="0 0 220 330" className="relative z-10 w-full max-w-[300px]">
            <path d="M110 40 C95 40 90 50 90 62 C90 74 100 84 110 84 C120 84 130 74 130 62 C130 50 125 40 110 40 M110 84 L110 235 M78 118 L142 118 M92 235 L82 315 M128 235 L138 315" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />

            {Object.entries(nodes).map(([key, node]) => (
              <motion.circle key={key} whileHover={{ scale: 1.2 }} cx={positions[key][0]} cy={positions[key][1]} r={selected === key ? 12 : 9} fill={node.color} className="cursor-pointer" onClick={() => setSelected(key)} />
            ))}
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl" style={{ background: `${current.color}15`, border: `1px solid ${current.color}30` }}><Icon className="h-8 w-8" style={{ color: current.color }} /></div>

            <div>
              <h3 className="font-serif text-3xl font-bold text-slate-900">{current.title}</h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${current.color}20`, color: current.color }}>Live Analysis</span>
                {current.severity && <span className="text-xs text-slate-500">{current.severity}</span>}
              </div>
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-600">{value(current.desc, "Assessment pending.")}</p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-slate-500">Clinical Confidence</span>
              <span className="font-semibold" style={{ color: current.color }}>{current.value > 0 ? `${current.value.toFixed(2)}%` : "Pending Assessment"}</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(0, Math.min(current.value, 100))}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: current.color }} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><ShieldCheck className="h-6 w-6 text-emerald-500" /><p className="mt-4 text-sm text-slate-500">Risk Tier</p><h4 className="mt-2 text-2xl font-bold text-slate-900">{value(report?.risk_tier || report?.risk_band, "Pending Analysis")}</h4></div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><Activity className="h-6 w-6 text-sky-500" /><p className="mt-4 text-sm text-slate-500">Wellness Index</p><h4 className="mt-2 text-2xl font-bold text-slate-900">{wellness !== null ? `${wellness}%` : "--"}</h4></div>
          </div>

          <div className="mt-8 rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-sky-50 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[.2em] text-emerald-700">AI Clinical Interpretation</p>
            <p className="mt-3 leading-7 text-slate-700">{value(report?.clinical_summary, current.insight)}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}