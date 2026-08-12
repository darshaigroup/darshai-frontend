import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, ChevronRight } from "lucide-react";

const CRITICAL_THRESHOLD=80;

export default function SafetyAlerts({ assessment={} }) {
  const aiResponse=assessment?.ai_response??{};
  const blocks=Array.isArray(aiResponse?.blocks)?aiResponse.blocks:[];

  const criticalAlerts=blocks
    .map(block=>({
      id:block?.id??block?.title,
      title:block?.title??"Unknown System",
      score:Math.min(Math.max(Number(block?.score??0),0),100),
      answered:Number(block?.answered??0),
      total:Number(block?.total??0),
      completion:Number(block?.completion_pct??0),
      reason:block?.clinical_summary??block?.summary??"Immediate clinical attention is recommended."
    }))
    .filter(item=>item.score>CRITICAL_THRESHOLD)
    .sort((a,b)=>b.score-a.score);

  return(
    <motion.section
      initial={{opacity:0,x:20}}
      animate={{opacity:1,x:0}}
      className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6"
    >
      <div className="mb-5 flex min-w-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
            Critical Systems
          </h2>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Assessment domains with a risk score above the critical threshold requiring immediate attention.
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 sm:h-12 sm:w-12 sm:rounded-2xl">
          <ShieldAlert className="text-red-600" size={22}/>
        </div>
      </div>

      {!criticalAlerts.length&&(
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 px-4 py-10 text-center sm:min-h-[200px] sm:rounded-3xl">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
            <ShieldAlert size={22} className="text-emerald-600"/>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
            No Critical Systems
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
            No assessed system has exceeded the critical risk threshold.
          </p>
        </div>
      )}

      {!!criticalAlerts.length&&(
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4">
          {criticalAlerts.map((item,index)=>(
            <motion.div
              key={`${item.id}-${index}`}
              initial={{opacity:0,y:12}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{delay:index*.06}}
              className="min-w-0 overflow-hidden rounded-2xl border border-red-200 bg-white p-4 transition-all hover:border-red-300 hover:shadow-md sm:p-5"
            >
              <div className="flex min-w-0 flex-col gap-4">

                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                      <AlertTriangle size={19} className="text-red-600"/>
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-base font-semibold leading-5 text-slate-900 sm:text-lg sm:leading-6">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        {item.answered}/{item.total} assessment parameters evaluated
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end">
                    <div className="text-2xl font-bold leading-none text-slate-900 sm:text-3xl">
                      {item.score}%
                    </div>

                    <span className="mt-1 inline-flex rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700 sm:px-2.5 sm:py-1 sm:text-xs">
                      Critical
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{width:0}}
                    whileInView={{width:`${item.score}%`}}
                    viewport={{once:true}}
                    transition={{duration:.9,delay:index*.05}}
                    className="h-full rounded-full bg-red-500"
                  />
                </div>

                <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-red-50 px-3 py-3 sm:px-4">
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-xs font-medium leading-5 text-red-700 sm:text-sm">
                      Immediate attention recommended.
                    </p>

                    {item.completion>0&&(
                      <p className="mt-1 text-[10px] leading-4 text-red-400 sm:text-xs">
                        Assessment completion: {item.completion}%
                      </p>
                    )}
                  </div>

                  <ChevronRight size={17} className="shrink-0 text-red-400"/>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}