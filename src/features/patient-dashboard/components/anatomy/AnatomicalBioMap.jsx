import { useMemo,useState } from "react";
import { motion } from "framer-motion";
import { Wind,Flame,Leaf,HeartPulse,Activity,ArrowRight,Sparkles } from "lucide-react";
import tridosha from "@/assets/images/TridoshaBody.png";

export default function AnatomicalBioMap({ patient={} }) {
  const [selected,setSelected]=useState("kapha");

  const report=patient?.report??{},
        ay=report?.final_ayurveda_result??{},
        prakriti=ay?.prakriti??{},
        vikriti=ay?.vikriti??{},
        correlation=ay?.correlation??{},
        value=(v,f)=>(v??"")!==""?v:f,
        num=v=>Number.isFinite(+v)?+v:0,
        composite=patient?.compositeScore??report?.composite_score??ay?.composite_score??0,
        wellness=Math.max(0,100-num(composite)),
        risk=ay?.risk_tier??report?.risk_tier??"Pending",
        summary=ay?.clinical_summary??correlation?.summary??"Assessment pending.";

  const nodes=useMemo(()=>({
    kapha:{
      title:"Kapha",
      icon:Leaf,
      color:"#22C55E",
      confidence:num(prakriti?.kapha_pct),
      imbalance:num(vikriti?.kapha_pct),
      desc:"Earth & Water • Provides immunity, stability and structural strength.",
      insight:summary
    },
    pitta:{
      title:"Pitta",
      icon:Flame,
      color:"#F59E0B",
      confidence:num(prakriti?.pitta_pct),
      imbalance:num(vikriti?.pitta_pct),
      desc:"Fire & Water • Governs digestion, metabolism and transformation.",
      insight:summary
    },
    vata:{
      title:"Vata",
      icon:Wind,
      color:"#38BDF8",
      confidence:num(prakriti?.vata_pct),
      imbalance:num(vikriti?.vata_pct),
      desc:"Air & Ether • Controls movement, nervous system and circulation.",
      insight:summary
    }
  }),[prakriti,vikriti,summary]);

  const positions={kapha:[50,26],pitta:[50,40],vata:[50,60]};
  const current=nodes[selected],Icon=current.icon;

  const riskLabel={
    Low:"Low Concern",
    Moderate:"Monitor Closely",
    High:"Needs Attention"
  }[risk]??risk;

  const riskColor={
    Low:"text-emerald-600",
    Moderate:"text-amber-600",
    High:"text-rose-600"
  }[risk]??"text-slate-900";

  const goToReport=()=>{window.location.href="/patient-dashboard/reports/ayurveda";};

  return(
    <motion.section
      whileHover={{y:-3}}
      className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      <div className="flex flex-col gap-5 border-b border-stone-100 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-emerald-600"/>
            <span className="font-mono text-[10px] uppercase tracking-[.22em] text-emerald-700 sm:text-[11px]">Tridosha Intelligence</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-slate-900">Tridosha Sharira Map</h2>
          <p className="mt-2 max-w-2xl font-sans text-sm leading-6 text-slate-500 sm:text-base">Explore your constitutional balance through personalized Ayurvedic insights.</p>
        </div>

        <button type="button" onClick={goToReport} className="group flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#06152A] px-5 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B2442] hover:shadow-[0_12px_30px_rgba(6,21,42,.2)] sm:w-auto sm:px-6 sm:py-4">
          Full Ayurveda Report
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"/>
        </button>
      </div>

      <div className="grid gap-10 p-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:p-8">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,197,94,.08),transparent_70%)]"/>
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px]">
            <img src={tridosha} alt="Tridosha Body" draggable={false} className="w-full select-none object-contain"/>
{Object.entries(nodes).map(([key,node])=>{
  const active=selected===key;

  return(
    <motion.button
      key={key}
      type="button"
      onClick={()=>setSelected(key)}
      whileHover={{scale:1.08}}
      whileTap={{scale:.95}}
      className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{
        left:`${positions[key][0]}%`,
        top:`${positions[key][1]}%`,
      }}
    >
      {/* Moving outer glow */}
      <motion.span
        animate={{
          scale:active?[1,2.4,1]:[1,1.8,1],
          opacity:active?[.55,.05,.55]:[.4,.04,.4],
        }}
        transition={{
          repeat:Infinity,
          duration:active?2.2:2.8,
          ease:"easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:`radial-gradient(circle,${node.color}90 0%,${node.color}35 35%,transparent 72%)`,
          filter:"blur(3px)",
        }}
      />

      {/* Secondary moving glow */}
      <motion.span
        animate={{
          scale:active?[1,1.7,1]:[1,1.4,1],
          opacity:active?[.65,.1,.65]:[.45,.08,.45],
        }}
        transition={{
          repeat:Infinity,
          duration:active?1.8:2.4,
          ease:"easeInOut",
          delay:.2,
        }}
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:node.color,
          filter:"blur(5px)",
        }}
      />

      {/* Colored ring + white glowing center */}
      <motion.span
        animate={{
          scale:active?[1,1.12,1]:[1,1.05,1],
          boxShadow:active
            ? [
                `0 0 10px ${node.color}90,0 0 22px ${node.color}70`,
                `0 0 18px ${node.color},0 0 35px ${node.color}80`,
                `0 0 10px ${node.color}90,0 0 22px ${node.color}70`,
              ]
            : [
                `0 0 8px ${node.color}70,0 0 16px ${node.color}40`,
                `0 0 14px ${node.color}90,0 0 24px ${node.color}50`,
                `0 0 8px ${node.color}70,0 0 16px ${node.color}40`,
              ],
        }}
        transition={{
          repeat:Infinity,
          duration:active?2:2.6,
          ease:"easeInOut",
        }}
        className={`relative flex items-center justify-center rounded-full border-[3px] border-white ${
          active?"h-8 w-8":"h-6 w-6"
        }`}
        style={{background:node.color}}
      >
        {/* Bright center */}
        <motion.span
          animate={{
            scale:active?[1,.75,1]:[1,.9,1],
            opacity:[1,.75,1],
          }}
          transition={{
            repeat:Infinity,
            duration:active?1.8:2.4,
            ease:"easeInOut",
          }}
          className="h-3 w-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,.95)]"
        />
      </motion.span>
    </motion.button>
  );
})}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px]"
                style={{background:`${current.color}15`,border:`1px solid ${current.color}30`}}
              >
                <Icon size={42} style={{color:current.color}}/>
              </div>

              <div className="min-w-0">
                <div
                  className="inline-flex rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[.18em] sm:text-[11px]"
                  style={{background:`${current.color}15`,color:current.color}}
                >
                  {current.title} Constitution
                </div>
                <h3 className="mt-3 font-serif text-4xl font-bold text-slate-900">{current.title}</h3>
                <p className="mt-2 max-w-2xl font-sans text-sm leading-7 text-slate-600 sm:text-base">{current.desc}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[.16em] text-slate-500 sm:text-[11px]">Prakriti Confidence</span>
                <span className="font-mono text-xs font-semibold sm:text-sm" style={{color:current.color}}>{current.confidence.toFixed(2)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <motion.div initial={{width:0}} animate={{width:`${current.confidence}%`}} transition={{duration:.8}} className="h-full rounded-full" style={{background:current.color,boxShadow:`0 0 12px ${current.color}70`}}/>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[.16em] text-slate-500 sm:text-[11px]">Current Vikriti</span>
                <span className="font-mono text-xs font-semibold sm:text-sm" style={{color:current.color}}>{current.imbalance.toFixed(2)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <motion.div initial={{width:0}} animate={{width:`${current.imbalance}%`}} transition={{duration:1}} className="h-full rounded-full" style={{background:current.color,boxShadow:`0 0 12px ${current.color}70`}}/>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <HeartPulse className={`h-7 w-7 ${riskColor}`}/>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">Overall Assessment</p>
                <h4 className={`mt-2 text-2xl font-bold ${riskColor}`}>{riskLabel}</h4>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <Activity className="h-7 w-7 text-sky-600"/>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">Wellness Index</p>
                <h4 className="mt-2 text-2xl font-bold text-slate-900">{wellness}%</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}