import { useMemo,useState } from "react";
import { motion } from "framer-motion";
import { Wind,Flame,Leaf,ShieldCheck,Activity,ArrowRight,Sparkles } from "lucide-react";
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
    },
  }),[prakriti,vikriti,summary]);

  const positions={
    kapha:[50,26],
    pitta:[50,40],
    vata:[50,60], 
    
  };

  const current=nodes[selected],
        Icon=current.icon;
  return(
  <motion.section
  whileHover={{ y:-3 }}
  className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)]"
>

  <div className="flex flex-col gap-5 border-b border-stone-100 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
        <Sparkles className="h-4 w-4 text-emerald-600"/>
        <span className="font-mono text-[11px] uppercase tracking-[.22em] text-emerald-700">
          Tridosha Intelligence
        </span>
      </div>

      <h2 className="mt-4 font-serif text-3xl font-bold text-slate-900">
        Tridosha Sharira Map
      </h2>

      <p className="mt-2 max-w-2xl text-slate-500">
        Explore your constitutional balance through interactive Ayurvedic intelligence.
      </p>
    </div>

    <button className="flex items-center gap-2 rounded-full bg-[#06152A] px-5 py-3 text-white transition hover:bg-[#0B2442]">
      Full Ayurveda Report
      <ArrowRight className="h-4 w-4"/>
    </button>

  </div>

  <div className="grid gap-10 p-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:p-8">

    {/* ---------------- BODY ---------------- */}

    <div className="relative flex items-center justify-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,197,94,.08),transparent_70%)]"/>

      <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px]">

        <img
          src={tridosha}
          alt="Tridosha Body"
          draggable={false}
          className="w-full select-none object-contain"
        />

        {Object.entries(nodes).map(([key,node])=>{

          const active=selected===key;

          return(
            <motion.button
              key={key}
              onClick={()=>setSelected(key)}
              whileHover={{scale:1.12}}
              whileTap={{scale:.95}}
              className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{
                left:`${positions[key][0]}%`,
                top:`${positions[key][1]}%`
              }}
            >

              <motion.span
                animate={{
                  scale:[1,1.9,1],
                  opacity:[.45,.12,.45]
                }}
                transition={{
                  repeat:Infinity,
                  duration:2.4,
                  ease:"easeInOut"
                }}
                className="absolute -left-1 -top-2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{background:node.color}}
              />

              <motion.span
                animate={active?{scale:[1,1.2,1]}:{}}
                transition={{repeat:Infinity,duration:1.5}}
                className={`relative flex items-center justify-center rounded-full border-[3px] border-white shadow-2xl ${active?"h-7 w-7":"h-5 w-5"}`}
                style={{background:node.color}}
              />

            </motion.button>
          );

        })}

      </div>

    </div>

    {/* ---------------- RIGHT PANEL ---------------- */}

    <div className="space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px]"
            style={{
              background:`${current.color}15`,
              border:`1px solid ${current.color}30`
            }}
          >
            <Icon size={42} style={{color:current.color}}/>
          </div>

          <div className="min-w-0">

            <div className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[.18em]"
              style={{
                background:`${current.color}15`,
                color:current.color
              }}
            >
              {current.title} Constitution
            </div>

            <h3 className="mt-3 font-serif text-4xl font-bold text-slate-900">
              {current.title}
            </h3>

            <p className="mt-2 max-w-2xl leading-7 text-slate-600">
              {current.desc}
            </p>

          </div>

        </div>

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Prakriti Confidence
            </span>

            <span
              className="font-semibold"
              style={{color:current.color}}
            >
              {current.confidence.toFixed(2)}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">

            <motion.div
              initial={{width:0}}
              animate={{width:`${current.confidence}%`}}
              transition={{duration:.8}}
              className="h-full rounded-full"
              style={{background:current.color}}
            />

          </div>

        </div>

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Current Vikriti
            </span>

            <span
              className="font-semibold"
              style={{color:current.color}}
            >
              {current.imbalance.toFixed(2)}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">

            <motion.div
              initial={{width:0}}
              animate={{width:`${current.imbalance}%`}}
              transition={{duration:1}}
              className="h-full rounded-full"
              style={{background:current.color}}
            />

          </div>

        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">

            <ShieldCheck className="h-7 w-7 text-emerald-600"/>

            <p className="mt-4 text-sm text-slate-500">
              Risk Tier
            </p>

            <h4 className="mt-2 text-2xl font-bold text-slate-900">
              {risk}
            </h4>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">

            <Activity className="h-7 w-7 text-sky-600"/>

            <p className="mt-4 text-sm text-slate-500">
              Wellness Index
            </p>

            <h4 className="mt-2 text-2xl font-bold text-slate-900">
              {wellness}%
            </h4>

          </div>

        </div>

        <div
          className="mt-8 rounded-3xl border p-6"
          style={{
            background:`linear-gradient(135deg,${current.color}12,#ffffff)`,
            borderColor:`${current.color}30`
          }}
        >

          <div className="flex items-center gap-2">

            <Sparkles
              size={18}
              style={{color:current.color}}
            />

            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-[.22em]"
              style={{color:current.color}}
            >
              AI Clinical Interpretation
            </span>

          </div>

          <p className="mt-4 leading-8 text-slate-700">
            {current.insight}
          </p>

        </div>

      </div>

    </div>

  </div>

</motion.section>
  )
}