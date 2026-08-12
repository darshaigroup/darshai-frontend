import { useMemo,useState } from "react";
import { motion } from "framer-motion";
import { Activity,Brain,HeartPulse,Flame } from "lucide-react";
import bodyMap from "@/assets/images/BodyMap.png";

const pct=v=>Math.min(Math.max(+v||0,0),100);
const color=v=>v>=80?"#ef4444":v>=60?"#f59e0b":"#22c55e";
const bg=v=>v>=80?"bg-red-50 border-red-200":v>=60?"bg-amber-50 border-amber-200":"bg-emerald-50 border-emerald-200";

const ICONS={
  Nervous:Brain,
  Cardiovascular:HeartPulse,
  Digestive:Flame,
  Metabolic:Activity
};

export default function BodyHeatMap({assessment={}}){
  const [active,setActive]=useState(null);

  const systems=useMemo(()=>{
    const blocks=assessment?.ai_response?.blocks??[];

    const findBlock=(pattern)=>blocks.find(i=>pattern.test(i?.title??""));

    const nervous=findBlock(/nervous/i);
    const cardiovascular=findBlock(/cardio/i);
    const digestive=findBlock(/digest/i);
    const metabolic=findBlock(/metabolic/i);

    return[
      {
        id:"nervous",
        title:"Nervous",
        block:nervous,
        score:pct(nervous?.score),
        answered:nervous?.answered??0,
        total:nervous?.total??0,
        position:{top:"3%",left:"50%"}
      },
      {
        id:"cardiovascular",
        title:"Cardiovascular",
        block:cardiovascular,
        score:pct(cardiovascular?.score),
        answered:cardiovascular?.answered??0,
        total:cardiovascular?.total??0,
        position:{top:"24.5%",left:"50%"}
      },
      {
        id:"digestive",
        title:"Digestive",
        block:digestive,
        score:pct(digestive?.score),
        answered:digestive?.answered??0,
        total:digestive?.total??0,
        position:{top:"42.5%",left:"50%"}
      },
      {
        id:"metabolic",
        title:"Metabolic",
        block:metabolic,
        score:pct(metabolic?.score),
        answered:metabolic?.answered??0,
        total:metabolic?.total??0,
        position:{top:"66.5%",left:"50%"}
      }
    ];
  },[assessment]);

  const current=active??systems.reduce(
    (a,b)=>a.score>b.score?a:b,
    systems[0]
  );

  return(
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Body Heat Map
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Interactive visualization of key physiological system risks.
          </p>
        </div>

        <div className={`w-full rounded-2xl border px-4 py-3 sm:w-auto ${bg(current?.score)}`}>
          <div className="text-xs text-slate-500">
            Highest Risk
          </div>

          <div className="mt-1 font-semibold text-slate-900">
            {current?.title}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[320px_minmax(0,1fr)]">

        {/* BODY MAP */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-slate-50 p-3 sm:p-5 lg:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,.08),transparent_68%)]"/>

          <div className="relative w-full max-w-[210px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[310px]">
            <img
              src={bodyMap}
              alt="Body system heat map"
              draggable={false}
              className="block h-auto w-full select-none object-contain"
            />

            {systems.map(system=>{
              const activeSystem=active?.id===system.id;
              const systemColor=color(system.score);

              return(
                <motion.button
                  key={system.id}
                  type="button"
                  onMouseEnter={()=>setActive(system)}
                  onMouseLeave={()=>setActive(null)}
                  onFocus={()=>setActive(system)}
                  onBlur={()=>setActive(null)}
                  onClick={()=>setActive(system)}
                  whileHover={{scale:1.15}}
                  whileTap={{scale:.94}}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
                  style={system.position}
                  aria-label={`Select ${system.title}`}
                >
                  <motion.span
                    animate={{
                      scale:activeSystem?[1,1.65,1]:[1,1.3,1],
                      opacity:activeSystem?[.3,.06,.3]:[.16,.04,.16]
                    }}
                    transition={{
                      repeat:Infinity,
                      duration:2.2,
                      ease:"easeInOut"
                    }}
                    className="absolute -inset-2 rounded-full"
                    style={{background:systemColor}}
                  />

                  <motion.span
                    animate={activeSystem?{scale:[1,1.15,1]}:{scale:1}}
                    transition={{
                      repeat:activeSystem?Infinity:0,
                      duration:1.5
                    }}
                    className="relative block rounded-full border-[3px] border-white"
                    style={{
                      width:activeSystem?"clamp(20px,2vw,27px)":"clamp(15px,1.6vw,21px)",
                      height:activeSystem?"clamp(20px,2vw,27px)":"clamp(15px,1.6vw,21px)",
                      background:systemColor,
                      boxShadow:`0 0 18px ${systemColor}aa`
                    }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-5">

         <div className={`rounded-2xl border p-5 sm:rounded-3xl sm:p-6 ${bg(current?.score)}`}>
  <div className="mb-5 flex items-center justify-between gap-4">
    <div>
      <p className="text-sm font-medium text-slate-500">Risk Assessment</p>
      <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{current?.title}</h3>
    </div>

    <div className="text-right">
      <motion.h4
        key={current?.score}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-900 sm:text-4xl"
      >
        {current?.score}%
      </motion.h4>
      <p className="mt-1 text-xs font-medium text-slate-500">
        {current?.score >= 80 ? "Critical Risk" : current?.score >= 60 ? "Moderate Risk" : "Healthy Range"}
      </p>
    </div>
  </div>

  <div className="relative h-4 overflow-hidden rounded-full bg-white shadow-inner">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${current?.score ?? 0}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative h-full rounded-full"
      style={{
        background: color(current?.score),
        boxShadow: `0 0 14px ${color(current?.score)}80`
      }}
    >
      <motion.span
        animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-md"
      />
    </motion.div>
  </div>

  <div className="mt-3 flex justify-between text-[10px] font-medium text-slate-400 sm:text-xs">
    <span>0%</span>
    <span>Low</span>
    <span>Moderate</span>
    <span>Critical</span>
    <span>100%</span>
  </div>
</div>
          <div className="grid gap-3">
            {systems.map(system=>{
              const Icon=ICONS[system.title]??Activity;
              const selected=active?.id===system.id;

              return(
                <button
                  key={system.id}
                  type="button"
                  onMouseEnter={()=>setActive(system)}
                  onFocus={()=>setActive(system)}
                  onClick={()=>setActive(system)}
                  className={`flex min-h-[88px] flex-col gap-4 rounded-2xl border p-4 text-left transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between ${
                    selected
                      ?"border-emerald-400 bg-emerald-50"
                      :"border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 sm:h-12 sm:w-12">
                      <Icon
                        size={22}
                        style={{color:color(system.score)}}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold text-slate-900">
                        {system.title}
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {system.answered}/{system.total} parameters
                      </p>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto sm:text-right">
                    <div className="text-2xl font-bold text-slate-900">
                      {system.score}%
                    </div>

                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 sm:w-24">
                      <motion.div
                        initial={{width:0}}
                        whileInView={{width:`${system.score}%`}}
                        viewport={{once:true}}
                        transition={{duration:.8}}
                        className="h-full rounded-full"
                        style={{background:color(system.score)}}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="h-3 w-3 rounded-full bg-red-500"/>
          <span>Critical</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="h-3 w-3 rounded-full bg-amber-500"/>
          <span>Moderate</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="h-3 w-3 rounded-full bg-emerald-500"/>
          <span>Healthy</span>
        </div>
      </div>
    </motion.section>
  );
}