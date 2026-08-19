import { useMemo,useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Activity,AlertTriangle,ChevronDown,ShieldAlert } from "lucide-react";

const color=r=>{r=String(r??"").toLowerCase();if(["low","normal"].includes(r))return"bg-emerald-500";if(["moderate","medium"].includes(r))return"bg-amber-500";if(["high","critical","severe"].includes(r))return"bg-red-500";return"bg-sky-500";};
const text=r=>{r=String(r??"").toLowerCase();if(["low","normal"].includes(r))return"text-emerald-600";if(["moderate","medium"].includes(r))return"text-amber-600";if(["high","critical","severe"].includes(r))return"text-red-600";return"text-sky-600";};
const bg=r=>{r=String(r??"").toLowerCase();if(["low","normal"].includes(r))return"bg-emerald-50 border-emerald-200";if(["moderate","medium"].includes(r))return"bg-amber-50 border-amber-200";if(["high","critical","severe"].includes(r))return"bg-red-50 border-red-200";return"bg-sky-50 border-sky-200";};
const progressColor=p=>p>=65?"bg-red-500":p>=40?"bg-amber-500":"bg-emerald-500";
const progressBg=p=>p>=65?"bg-red-50 border-red-200":p>=40?"bg-amber-50 border-amber-200":"bg-emerald-50 border-emerald-200";
const progressText=p=>p>=65?"text-red-600":p>=40?"text-amber-600":"text-emerald-600";
const gaugeStroke=r=>{r=String(r??"").toLowerCase();if(["low","normal"].includes(r))return"#22C55E";if(["moderate","medium"].includes(r))return"#F59E0B";if(["high","critical","severe"].includes(r))return"#EF4444";return"#0EA5E9";};
const gaugeBadge=r=>{r=String(r??"").toLowerCase();if(["low","normal"].includes(r))return"bg-emerald-100 text-emerald-700";if(["moderate","medium"].includes(r))return"bg-amber-100 text-amber-700";if(["high","critical","severe"].includes(r))return"bg-red-100 text-red-700";return"bg-sky-100 text-sky-700";};
const riskLabel=p=>p>=80?"High Risk":p>=30?"Moderate":"Good";

const Gauge=({score=0,risk})=>{
  const r=68,c=2*Math.PI*r,p=c-c*(Math.min(Math.max(Number(score)||0,0),100)/100);
  const stroke=Number(score)<=33?"#16a34a":Number(score)<=66?"#eab308":"#dc2626";
  return(
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
      <svg viewBox="0 0 208 208" className="h-full w-full -rotate-90">
        <circle cx="104" cy="104" r={r} strokeWidth="12" className="fill-none stroke-slate-200"/>
        <motion.circle cx="104" cy="104" r={r} strokeWidth="12" stroke={stroke} strokeLinecap="round" className="fill-none" strokeDasharray={c} initial={{strokeDashoffset:c}} animate={{strokeDashoffset:p}} transition={{duration:1}}/>
      </svg>
      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-700 sm:text-4xl">{score}</h2>
        <p className="text-xs font-medium text-slate-500 sm:text-sm">Composite Score</p>
      </div>
    </div>
  );
};
export default function RiskAssessment({assessment={},ai={}}){
  const [open,setOpen]=useState(null);
  const blocks=Array.isArray(ai?.blocks)?ai.blocks:[];
  const score=Math.min(Math.max(Number(assessment?.composite_score??ai?.composite_score??0),0),100);
  const alerts=useMemo(()=>blocks.filter(b=>["high","critical","severe"].includes(String(b.risk_level).toLowerCase())),[blocks]);

  return(
    <motion.section initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.35}} className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Risk Assessment</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">Complete wellness assessment based on your evaluated health parameters.</p>
      </div>

      <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="w-full min-w-0 lg:max-w-2xl">
            <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize sm:px-4 sm:text-sm ${gaugeBadge(assessment?.risk_band)}`}>
              {assessment?.risk_band??"Unknown"} Risk
            </span>

            <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Wellness Risk Overview
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              <div className={`min-w-0 rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 ${bg(assessment?.risk_band)}`}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">Overall Risk</p>
                <p className={`mt-2 truncate text-lg font-bold capitalize sm:text-xl ${text(assessment?.risk_band)}`}>{assessment?.risk_band??"--"}</p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 sm:px-5 sm:py-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">Composite Score</p>
                <p className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">{score}/100</p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 sm:px-5 sm:py-4 sm:col-span-2 xl:col-span-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">Completion</p>
                <p className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">{ai?.total_completion_pct??0}%</p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-auto lg:shrink-0">
            <Gauge score={score} />
          </div>
        </div>
      </div>

      {!!alerts.length&&(
        <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Risk Band Alerts</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">Wellness domains requiring clinical monitoring.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 sm:px-4 sm:py-2 sm:text-sm">
              <AlertTriangle className="h-4 w-4"/>
              {alerts.length} Active Alerts
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {alerts.map(b=>(
              <motion.div key={b.id??b.title} whileHover={{y:-3}} className={`min-w-0 rounded-2xl border-2 p-4 shadow-sm sm:p-5 ${bg(b.risk_level)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white sm:h-11 sm:w-11">
                      <ShieldAlert className="h-5 w-5"/>
                    </div>
                    <div className="min-w-0">
                      <h4 className="break-words text-sm font-bold text-slate-900 sm:text-base">{b.title}</h4>
                      <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">Wellness Domain</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold capitalize text-red-600 sm:px-3 sm:text-xs">{b.risk_level}</span>
                </div>
                <div className="mt-4 rounded-xl bg-red-100 px-3 py-2.5 text-xs font-medium text-red-700 sm:px-4 sm:py-3 sm:text-sm">Immediate attention recommended</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 sm:space-y-5">
        {blocks.map((b,i)=>(
          <motion.div key={b.id??i} layout className="overflow-hidden rounded-3xl bg-white shadow-md">
            <button type="button" onClick={()=>setOpen(open===i?null:i)} className="flex w-full flex-col gap-4 p-4 text-left sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <div className="w-full min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <h3 className="break-words text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">{b.title}</h3>
                  <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold capitalize sm:text-xs ${bg(b.risk_level)} ${text(b.risk_level)}`}>{b.risk_level}</span>
                </div>

                <div className="mt-4 sm:mt-5">
                  <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-medium text-slate-500 sm:text-xs">
                    <span>Score</span>
                    <span>{b.score}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 sm:h-3">
                    <motion.div initial={{width:0}} animate={{width:`${Math.min(Math.max(Number(b.score)||0,0),100)}%`}} transition={{duration:.8}} className={`h-full rounded-full ${color(b.risk_level)}`}/>
                  </div>
                </div>
              </div>

              <ChevronDown className={`h-5 w-5 shrink-0 self-center transition-transform sm:h-6 sm:w-6 lg:self-auto ${open===i?"rotate-180":""}`}/>
            </button>

            <AnimatePresence initial={false}>
              {open===i&&(
                <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}} className="overflow-hidden border-t bg-slate-50">
                  <div className="p-3 sm:p-5 lg:p-6">
                    <div className="rounded-2xl border bg-white p-3 sm:p-5">
                      <h4 className="mb-4 text-base font-semibold text-slate-900 sm:mb-5 sm:text-lg">Assessment Parameters</h4>

                      <div className="grid gap-3 sm:gap-4">
                        {b.params?.map((p,j)=>{
                          const percent=Math.min(Math.max(Math.round((Number(p.score||0)/(Number(p.max_score)||1))*100),0),100);
                          return(
                            <div key={p.label??j} className={`rounded-2xl border p-3.5 transition-all sm:p-4 ${progressBg(percent)}`}>
                              <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="min-w-0 flex-1">
                                  <h5 className="break-words text-sm font-semibold text-slate-900 sm:text-base">{p.label}</h5>
                                </div>

                                <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold sm:px-4 sm:py-2 sm:text-xs ${progressBg(percent)} ${progressText(percent)}`}>{riskLabel(percent)}</span>
                                  <span className={`text-xs font-semibold sm:text-sm ${progressText(percent)}`}>{percent}%</span>
                                </div>
                              </div>

                              <div className="mt-4">
                                <div className="mb-2 flex items-center justify-between text-[10px] font-medium text-slate-500 sm:text-xs">
                                  <span>Health Status</span>
                                  <span className={progressText(percent)}>{percent}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-200 sm:h-2.5">
                                  <motion.div initial={{width:0}} animate={{width:`${percent}%`}} transition={{duration:.7}} className={`h-full rounded-full ${progressColor(percent)}`}/>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}