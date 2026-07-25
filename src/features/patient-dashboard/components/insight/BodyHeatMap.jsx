import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Brain, HeartPulse, Flame, Leaf, Waves } from "lucide-react";

const pct=v=>Math.min(Math.max(+v||0,0),100);
const color=v=>v>=80?"#ef4444":v>=60?"#f59e0b":"#22c55e";
const bg=v=>v>=80?"bg-red-50 border-red-200":v>=60?"bg-amber-50 border-amber-200":"bg-emerald-50 border-emerald-200";

const ICONS={
  Brain,
  Cardiovascular:HeartPulse,
  Digestive:Flame,
  Metabolic:Activity,
  Inflammation:Leaf,
  Nervous:Waves
};

export default function BodyHeatMap({assessment={}}){
  const [active,setActive]=useState(null);

  const systems=useMemo(()=>{
    const blocks=assessment?.ai_response?.blocks??[];

    return[
      {id:"brain",label:"Brain",title:"Nervous",x:150,y:60,score:pct(blocks.find(i=>/nervous/i.test(i.title))?.score),answered:blocks.find(i=>/nervous/i.test(i.title))?.answered??0,total:blocks.find(i=>/nervous/i.test(i.title))?.total??0},
      {id:"heart",label:"Heart",title:"Cardiovascular",x:150,y:145,score:pct(blocks.find(i=>/cardio/i.test(i.title))?.score),answered:blocks.find(i=>/cardio/i.test(i.title))?.answered??0,total:blocks.find(i=>/cardio/i.test(i.title))?.total??0},
      {id:"gut",label:"Digestive",title:"Digestive",x:150,y:230,score:pct(blocks.find(i=>/digest/i.test(i.title))?.score),answered:blocks.find(i=>/digest/i.test(i.title))?.answered??0,total:blocks.find(i=>/digest/i.test(i.title))?.total??0},
      {id:"metabolic",label:"Metabolic",title:"Metabolic",x:150,y:295,score:pct(blocks.find(i=>/metabolic/i.test(i.title))?.score),answered:blocks.find(i=>/metabolic/i.test(i.title))?.answered??0,total:blocks.find(i=>/metabolic/i.test(i.title))?.total??0},
      {id:"inflammation",label:"Inflammation",title:"Inflammation",x:150,y:360,score:pct(blocks.find(i=>/inflammation/i.test(i.title))?.score),answered:blocks.find(i=>/inflammation/i.test(i.title))?.answered??0,total:blocks.find(i=>/inflammation/i.test(i.title))?.total??0}
    ];
  },[assessment]);

  const current=active??systems.reduce((a,b)=>a.score>b.score?a:b,systems[0]);

 return(
  <motion.section
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6"
  >
    <div className="mb-5 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Body Heat Map</h2>
        <p className="mt-1 text-sm text-slate-500">
          Interactive visualization of organ-system risk.
        </p>
      </div>

      <div className={`w-full rounded-2xl border px-4 py-3 sm:w-auto ${bg(current?.score)}`}>
        <div className="text-xs text-slate-500">Highest Risk</div>
        <div className="mt-1 font-semibold text-slate-900">{current?.title}</div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[320px_minmax(0,1fr)]">

      {/* Body */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-slate-50 p-3 sm:p-6">

        <svg
          viewBox="0 0 300 470"
          className="h-[320px] w-full max-w-[260px] sm:h-[420px] sm:max-w-[300px] lg:h-[470px] lg:max-w-full"
        >

          <motion.circle cx="150" cy="42" r="28" fill="#E2E8F0"/>

          <motion.rect x="125" y="72" width="50" height="140" rx="24" fill="#E2E8F0"/>

          <motion.rect x="72" y="88" width="42" height="128" rx="22" fill="#E2E8F0"/>

          <motion.rect x="186" y="88" width="42" height="128" rx="22" fill="#E2E8F0"/>

          <motion.rect x="120" y="210" width="28" height="170" rx="18" fill="#E2E8F0"/>

          <motion.rect x="152" y="210" width="28" height="170" rx="18" fill="#E2E8F0"/>

                    {systems.map(s=>(
            <g
              key={s.id}
              onMouseEnter={()=>setActive(s)}
              onMouseLeave={()=>setActive(null)}
              onClick={()=>setActive(s)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={12}
                fill={color(s.score)}
                initial={{scale:.7,opacity:0}}
                animate={{scale:1,opacity:1}}
                transition={{duration:.35}}
              />

              <motion.circle
                cx={s.x}
                cy={s.y}
                r={20}
                fill={color(s.score)}
                opacity={.18}
                animate={{r:[18,24,18],opacity:[.15,.3,.15]}}
                transition={{repeat:Infinity,duration:2.5,ease:"easeInOut"}}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Details */}
      <div className="space-y-5">

        <div className={`rounded-2xl border p-5 sm:rounded-3xl sm:p-6 ${bg(current?.score)}`}>

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-500">Selected System</p>

              <h3 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                {current?.title}
              </h3>
            </div>

            {(()=>{
              const Icon=ICONS[current?.title]??Activity;
              return(
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-14 sm:w-14">
                  <Icon size={26} style={{color:color(current?.score)}}/>
                </div>
              );
            })()}

          </div>

          <div className="mb-5 h-3 overflow-hidden rounded-full bg-white">
            <motion.div
              initial={{width:0}}
              animate={{width:`${current?.score??0}%`}}
              transition={{duration:.8}}
              className="h-full rounded-full"
              style={{background:color(current?.score)}}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 sm:text-xs">
                Risk
              </p>

              <h4 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                {current?.score}%
              </h4>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 sm:text-xs">
                Answered
              </p>

              <h4 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                {current?.answered}
              </h4>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 sm:text-xs">
                Questions
              </p>

              <h4 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                {current?.total}
              </h4>
            </div>

          </div>
        </div>
                <div className="grid gap-3">

          {systems.map(s=>{
            const Icon=ICONS[s.title]??Activity;

            return(
              <button
                key={s.id}
                onMouseEnter={()=>setActive(s)}
                onFocus={()=>setActive(s)}
                onClick={()=>setActive(s)}
                className={`flex flex-col gap-4 rounded-2xl border p-4 text-left transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between ${active?.id===s.id?"border-emerald-400 bg-emerald-50":"border-slate-200 bg-white"}`}
              >

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 sm:h-12 sm:w-12">
                    <Icon size={22} style={{color:color(s.score)}}/>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-semibold text-slate-900">
                      {s.title}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {s.answered}/{s.total} parameters
                    </p>
                  </div>

                </div>

                <div className="w-full sm:w-auto sm:text-right">

                  <div className="text-2xl font-bold text-slate-900">
                    {s.score}%
                  </div>

                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 sm:w-24">

                    <motion.div
                      initial={{width:0}}
                      whileInView={{width:`${s.score}%`}}
                      viewport={{once:true}}
                      transition={{duration:.8}}
                      className="h-full rounded-full"
                      style={{background:color(s.score)}}
                    />

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </div>

    </div>
          {/* Legend */}
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