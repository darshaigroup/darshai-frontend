import { useMemo,useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  ShieldAlert,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const pct=v=>Math.min(Math.max(Number(v)||0,0),100),
  clr=v=>v>=80?"#ef4444":v>=60?"#f59e0b":"#22c55e",
  bg=v=>v>=80?"bg-red-100 text-red-700":v>=60?"bg-amber-100 text-amber-700":"bg-emerald-100 text-emerald-700",
  cardAnim={initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.45}},
  expandAnim={initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.25}};

const Gauge=({value=0,risk="Healthy"})=>{
  const p=pct(value),r=72,c=2*Math.PI*r,o=c-c*p/100,color=clr(p);
  return(
    <div className="relative flex h-64 w-64 items-center justify-center">
      <svg viewBox="0 0 160 160" className="-rotate-90 h-full w-full">
        <defs>
          <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color}/>
            <stop offset="100%" stopColor={color}/>
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={r} stroke="#e2e8f0" strokeWidth="10" fill="none"/>
        <motion.circle cx="80" cy="80" r={r} stroke="url(#healthGradient)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={c} initial={{strokeDashoffset:c}} animate={{strokeDashoffset:o}} transition={{duration:1.2,ease:"easeOut"}}/>
      </svg>

      <div className="absolute text-center">
        <motion.h2 initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.2}} className="text-5xl font-bold tracking-tight">{p}</motion.h2>
        <p className="mt-1 text-sm font-medium text-slate-500">Overall Score</p>
        <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${bg(p)}`}>{risk}</span>
      </div>
    </div>
  );
};

const MetricCard=({icon:Icon,title,value,subtitle,color,onClick,active})=>(
  <motion.button {...cardAnim} whileHover={{y:-4,scale:1.02}} whileTap={{scale:.98}} onClick={onClick} className={`group w-full rounded-3xl border bg-white p-5 text-left shadow-sm transition-all ${active?"border-blue-500 ring-2 ring-blue-100":"border-slate-200 hover:border-blue-200 hover:shadow-lg"}`}>
    <div className="flex items-start justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{background:`${color}15`,color}}><Icon size={22}/></div>
      {active?<ChevronDown size={18} className="text-slate-400"/>:<ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform"/>}
    </div>
    <h3 className="mt-5 text-3xl font-bold">{value}</h3>
    <p className="mt-1 text-sm font-semibold text-slate-800">{title}</p>
    <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
  </motion.button>
);

const InsightCard=({icon:Icon,title,level,color,children,open,onToggle})=>(
  <motion.div {...cardAnim} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <button onClick={onToggle} className="flex w-full items-center justify-between p-5 text-left">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{background:`${color}15`,color}}><Icon size={22}/></div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${bg(level==="High"?90:level==="Moderate"?65:25)}`}>{level}</span>
        </div>
      </div>
      <motion.div animate={{rotate:open?180:0}}><ChevronDown size={18}/></motion.div>
    </button>

    <AnimatePresence initial={false}>
      {open&&(
        <motion.div {...expandAnim} className="border-t border-slate-100 px-5 pb-5 pt-4">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const CTA=({onClick})=>(
  <motion.button whileHover={{scale:1.02}} whileTap={{scale:.98}} onClick={onClick} className="flex w-full items-center justify-between rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white shadow-lg">
    <div>
      <h3 className="font-semibold">View Complete Health Report</h3>
      <p className="text-sm text-blue-100">Explore detailed insights & recommendations</p>
    </div>
    <Sparkles size={22}/>
  </motion.button>
);
export default function HealthOverview({assessment={},report={},onViewReport=()=>{}}){
  const [activeMetric,setActiveMetric]=useState("composite"),[openInsight,setOpenInsight]=useState(null);

  const{
    score,risk,completion,blocks,critical,moderate,healthy,metrics,priorities
  }=useMemo(()=>{
    const ai=assessment?.ai_response??report?.ai_response??{},
      blocks=ai?.blocks??[],
      score=pct(assessment?.composite_score??report?.composite_score),
      risk=assessment?.risk_band??report?.risk_band??ai?.composite_risk??"Healthy",
      completion=ai?.total_completion_pct??100,
      critical=blocks.filter(b=>b?.is_critical).length,
      moderate=blocks.filter(b=>!b?.is_critical&&pct(b?.score)>=60).length,
      healthy=Math.max(blocks.length-critical-moderate,0),
      priorities=[...blocks].sort((a,b)=>pct(b?.score)-pct(a?.score)).slice(0,4),
      metrics=[
        {
          id:"composite",
          icon:Activity,
          title:"Composite Score",
          value:`${score}%`,
          subtitle:"Overall health index",
          color:"#2563eb",
          details:[
            `Overall Risk: ${risk}`,
            `Health Score: ${score}/100`,
            `Calculated from ${blocks.length} body systems`
          ]
        },
        {
          id:"completion",
          icon:ClipboardCheck,
          title:"Assessment",
          value:`${completion}%`,
          subtitle:"Assessment completed",
          color:"#22c55e",
          details:[
            "Clinical Assessment ✓",
            "Lifestyle Assessment ✓",
            "Risk Assessment ✓",
            "Ayurveda Assessment ✓"
          ]
        },
        {
          id:"critical",
          icon:ShieldAlert,
          title:"Critical Systems",
          value:critical,
          subtitle:"Need immediate attention",
          color:"#ef4444",
          details:blocks.filter(b=>b?.is_critical).map(b=>`${b.title} (${pct(b.score)}%)`)
        },
        {
          id:"systems",
          icon:HeartPulse,
          title:"Body Systems",
          value:blocks.length,
          subtitle:"Systems evaluated",
          color:"#8b5cf6",
          details:blocks.map(b=>`${b.title} • ${pct(b.score)}%`)
        }
      ];

    return{
      score,
      risk,
      completion,
      blocks,
      critical,
      moderate,
      healthy,
      metrics,
      priorities
    };
  },[assessment,report]);

  const activeCard=metrics.find(i=>i.id===activeMetric)??metrics[0];
    return(
    <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-sm md:p-8">

      {/* Hero */}
      <motion.div {...cardAnim} className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="flex justify-center">
          <Gauge value={score} risk={risk}/>
        </div>

        <div className="space-y-6">
          <div>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${bg(score)}`}>{risk} Risk</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Health Snapshot</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Your assessment has analyzed <span className="font-semibold">{blocks.length}</span> body systems and generated an AI-powered clinical overview with actionable priorities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map(({id,...card})=>(
              <MetricCard
                key={id}
                {...card}
                active={activeMetric===id}
                onClick={()=>setActiveMetric(id)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Metric Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMetric}
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          exit={{opacity:0,y:-10}}
          transition={{duration:.25}}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{background:`${activeCard.color}15`,color:activeCard.color}}>
              <activeCard.icon size={22}/>
            </div>

            <div>
              <h3 className="text-xl font-semibold">{activeCard.title}</h3>
              <p className="text-sm text-slate-500">{activeCard.subtitle}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {activeCard.details.map((item,i)=>(
              <motion.div
                key={i}
                initial={{opacity:0,x:-10}}
                animate={{opacity:1,x:0}}
                transition={{delay:i*.05}}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="h-2.5 w-2.5 rounded-full" style={{background:activeCard.color}}/>
                <span className="text-sm text-slate-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
            {/* Priority Insights */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Priority Insights</h2>
            <p className="text-sm text-slate-500">AI-generated clinical priorities requiring attention.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{priorities.length} Priorities</span>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {priorities.map((item,i)=>(
            <InsightCard
              key={item.id}
              icon={item.is_critical?ShieldAlert:AlertTriangle}
              title={item.title}
              level={item.risk_level}
              color={clr(item.score)}
              open={openInsight===item.id}
              onToggle={()=>setOpenInsight(openInsight===item.id?null:item.id)}
            >
              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${bg(item.score)}`}>{item.score}% Risk</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.answered}/{item.total} Parameters</span>
                  {item.is_critical&&<span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Immediate Review</span>}
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">Severity</span>
                    <span>{item.score}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <motion.div className="h-full rounded-full" style={{background:clr(item.score)}} initial={{width:0}} animate={{width:`${pct(item.score)}%`}} transition={{delay:i*.08,duration:.7}}/>
                  </div>
                </div>

                {!!item.params?.length&&(
                  <div className="grid gap-2">
                    {item.params.slice(0,4).map((p,idx)=>(
                      <div key={idx} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-sm text-slate-700">{p.label}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${bg(p.score/p.max_score*100)}`}>{p.option}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Clinical Insight</p>
                  <p className="mt-2 text-sm text-slate-700">
                    {item.score>=80
                      ?"This body system shows severe deviation and should be prioritized during clinical review."
                      :item.score>=60
                      ?"Moderate abnormalities detected. Preventive intervention is recommended."
                      :"Current findings indicate relatively stable health with continued monitoring."}
                  </p>
                </div>
              </div>
            </InsightCard>
          ))}
        </div>
      </div>
            {/* CTA */}
      <motion.div
        {...cardAnim}
        className="relative overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl"
      >
        <motion.div
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{scale:[1,1.15,1],rotate:[0,15,0]}}
          transition={{duration:10,repeat:Infinity,ease:"linear"}}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-white/10 blur-3xl"
          animate={{scale:[1.15,1,1.15]}}
          transition={{duration:8,repeat:Infinity}}
        />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              AI Generated Health Report
            </span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Your assessment is ready
            </h2>

            <p className="mt-3 text-blue-100">
              Explore complete clinical findings, body-system analysis, Ayurveda insights,
              lifestyle recommendations and personalized intervention priorities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Overall Score</p>
                <h4 className="mt-1 text-2xl font-bold">{score}</h4>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Systems</p>
                <h4 className="mt-1 text-2xl font-bold">{blocks.length}</h4>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Critical</p>
                <h4 className="mt-1 text-2xl font-bold">{critical}</h4>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Completed</p>
                <h4 className="mt-1 text-2xl font-bold">{completion}%</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:w-80">
            <CTA onClick={onViewReport}/>

            <p className="text-center text-xs text-blue-100">
              Includes AI interpretation, risk analysis, Ayurveda report and lifestyle guidance.
            </p>
          </div>

        </div>
      </motion.div>

    </section>
  );
}