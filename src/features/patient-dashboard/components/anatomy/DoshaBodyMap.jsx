import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Wind, Droplets, Sparkles, Brain, ArrowRight, HeartPulse, Activity } from "lucide-react";
import DoshaNode from "./DoshaNode";
import body from "@/assets/images/BodyTypes.png";

const text=(v,f)=>(v??"")!==""?v:f;
const num=v=>Number.isFinite(+v)?+v:0;

const DOSHAS={
  pitta:{title:"Pitta",label:"Pitta",icon:Flame,color:"#F59E0B",position:"left-1/2 top-[19%] -translate-x-1/2"},
  vata:{title:"Vata",label:"Vata",icon:Wind,color:"#38BDF8",position:"left-[21%] top-[43%]"},
  kapha:{title:"Kapha",label:"Kapha",icon:Droplets,color:"#10B981",position:"right-[17%] top-[43%]"}
};

export default function DoshaBodyMap({patient={}}){
  const report=patient?.report||{},vikriti=report?.vikriti_result||{},correlation=report?.correlation_result||{},primary=report?.primary_dosha??patient?.primaryDosha??"Pitta",secondary=report?.secondary_dosha??patient?.secondaryDosha??"",composite=report?.composite_score??patient?.compositeScore??null,wellness=report?.wellness_score??patient?.wellnessScore??(composite!==null?Math.max(0,100-num(composite)):null);
  const [active,setActive]=useState(primary.toLowerCase());
  useEffect(()=>setActive(primary.toLowerCase()),[primary]);

  const percentages={Vata:num(vikriti?.vata_pct),Pitta:num(vikriti?.pitta_pct),Kapha:num(vikriti?.kapha_pct)};
  const doshas=Object.fromEntries(Object.entries(DOSHAS).map(([key,dosha])=>[key,{
    ...dosha,
    level:percentages[dosha.label],
    badge:primary===dosha.label?"Primary":secondary===dosha.label?"Secondary":"",
    description:report?.clinical_summary??correlation?.summary??`${dosha.label} assessment pending.`,
    recommendation:correlation?.ama_link??"Maintain a balanced Ayurvedic lifestyle."
  }]));

  const current=doshas[active]??doshas.pitta,Icon=current.icon,riskTier=text(report?.risk_tier??report?.risk_band,"Pending Analysis");

  
  return(
    <motion.section whileHover={{y:-3}} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,.08)]">
      <div className="flex flex-col gap-6 border-b border-slate-100 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2"><Sparkles className="h-4 w-4 text-emerald-600"/><span className="font-mono text-[10px] uppercase tracking-[.22em] text-emerald-700 sm:text-[11px]">Ayurvedic Constitution</span></div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">Dosha Intelligence Map</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">Select a dosha on the anatomical model to explore its influence on your physiological balance.</p>
        </div>
        <button onClick={()=>{window.location.href="/patient-dashboard/reports/ayurveda"}} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#06152A] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2442] sm:w-auto sm:px-6 sm:py-4">View Complete Analysis <ArrowRight className="h-4 w-4"/></button>
      </div>

      <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 xl:grid-cols-[390px_minmax(520px,1fr)] xl:gap-12">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.1),transparent_68%)]"/>
          <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
            <img src={body} alt="Dosha Body" className="w-full select-none object-contain" draggable={false}/>
            {Object.values(DOSHAS).map(d=><button key={d.label} type="button" aria-label={`Select ${d.label}`} onClick={()=>setActive(d.label.toLowerCase())} className={`absolute z-20 ${d.position}`}><DoshaNode label={d.label} color={d.color} active={active===d.label.toLowerCase()}/></button>)}
            
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,.09),transparent_70%)]"/>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <motion.div animate={{boxShadow:[`0 0 0 ${current.color}00`,`0 0 22px ${current.color}55`,`0 0 0 ${current.color}00`]}} transition={{repeat:Infinity,duration:2.5}} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16 sm:rounded-3xl" style={{background:`${current.color}15`,border:`1px solid ${current.color}40`}}><Icon className="h-7 w-7 sm:h-8 sm:w-8" style={{color:current.color}}/></motion.div>
            <div className="min-w-0">
              <h2 className="font-serif text-4xl font-bold leading-none text-slate-900 sm:text-[46px]">{current.title}</h2>
              {current.badge&&<span className="mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold sm:mt-3 sm:px-4 sm:text-xs" style={{background:`${current.color}20`,color:current.color}}>{current.badge}</span>}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
              <div><h3 className="text-base font-semibold text-slate-900 sm:text-lg">Dosha Distribution</h3><p className="mt-1 text-xs text-slate-500 sm:text-sm">Current constitutional balance</p></div>
              <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:px-3 sm:text-xs">Live Analysis</span>
            </div>
            {Object.values(doshas).map(d=>(
              <button key={d.title} type="button" onClick={()=>setActive(d.title.toLowerCase())} className="mb-5 block w-full text-left last:mb-0">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <motion.div animate={active===d.title.toLowerCase()?{scale:[1,1.25,1]}:{scale:1}} transition={{repeat:active===d.title.toLowerCase()?Infinity:0,duration:1.8}} className="h-3 w-3 shrink-0 rounded-full" style={{background:d.color,boxShadow:active===d.title.toLowerCase()?`0 0 10px ${d.color}`:"none"}}/>
                    <span className="font-medium text-slate-700">{d.title}</span>
                    {d.badge&&<span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${d.badge==="Primary"?"bg-sky-100 text-sky-700":"bg-amber-100 text-amber-700"}`}>{d.badge}</span>}
                  </div>
                  <span className="text-sm font-semibold" style={{color:d.color}}>{d.level.toFixed(2)}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 sm:h-3"><motion.div initial={{width:0}} animate={{width:`${Math.min(100,Math.max(0,d.level))}%`}} transition={{duration:.9}} className="h-full rounded-full" style={{background:d.color,boxShadow:active===d.title.toLowerCase()?`0 0 10px ${d.color}80`:"none"}}/></div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><HeartPulse className="h-6 w-6 text-rose-500"/><p className="mt-4 text-sm text-slate-500">Risk Tier</p><h3 className="mt-2 text-2xl font-bold text-slate-900">{riskTier}</h3></div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><Activity className="h-6 w-6 text-emerald-500"/><p className="mt-4 text-sm text-slate-500">Wellness Index</p><h3 className="mt-2 text-2xl font-bold text-slate-900">{wellness!==null?`${wellness}%`:"--"}</h3></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}