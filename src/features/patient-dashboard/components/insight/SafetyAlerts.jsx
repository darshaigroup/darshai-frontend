import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, ShieldAlert, CircleAlert, ChevronRight } from "lucide-react";

const level=v=>v>=80?"Critical":v>=60?"High":"Moderate";
const badge=v=>v>=80?"bg-red-100 text-red-700 border-red-200":v>=60?"bg-amber-100 text-amber-700 border-amber-200":"bg-emerald-100 text-emerald-700 border-emerald-200";
const bar=v=>v>=80?"bg-red-500":v>=60?"bg-amber-500":"bg-emerald-500";

export default function SafetyAlerts({assessment={}}){
  const ai=assessment?.ai_response??{},
  blocks=ai?.blocks??[],
  alerts=(ai?.safety_triggered_by??[])
    .map(alert=>{
      const block=blocks.find(b=>b.id===alert.id);

      return{
        id:alert.id,
        title:alert.title,
        score:alert.score??block?.score??0,
        answered:block?.answered??0,
        total:block?.total??0,
        risk:block?.risk_level??"Unknown",
        critical:block?.is_critical??false,
        safety:block?.safety_flag??false,
        params:block?.params??[],
        completion:block?.completion_pct??0
      };
    })
    .sort((a,b)=>b.score-a.score),
  critical=alerts.filter(i=>i.critical).length,
  high=alerts.filter(i=>!i.critical&&i.score>=60).length,
  moderate=alerts.filter(i=>i.score<60).length;

  return(
    <motion.section
      initial={{opacity:0,x:20}}
      animate={{opacity:1,x:0}}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Safety Alerts</h2>
          <p className="mt-1 text-sm text-slate-500">AI detected body systems requiring immediate attention.</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <ShieldAlert className="text-red-600" size={26}/>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <AlertTriangle className="text-red-600" size={18}/>
            <span className="text-xs font-medium text-red-600">Critical</span>
          </div>
          <h3 className="text-3xl font-bold text-red-700">{critical}</h3>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <CircleAlert className="text-amber-600" size={18}/>
            <span className="text-xs font-medium text-amber-600">High</span>
          </div>
          <h3 className="text-3xl font-bold text-amber-700">{high}</h3>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <ShieldCheck className="text-emerald-600" size={18}/>
            <span className="text-xs font-medium text-emerald-600">Moderate</span>
          </div>
          <h3 className="text-3xl font-bold text-emerald-700">{moderate}</h3>
        </div>
      </div>

      {!alerts.length&&(
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 py-14">
          <ShieldCheck size={42} className="mb-3 text-emerald-600"/>
          <h3 className="font-semibold text-slate-900">No Safety Alerts</h3>
          <p className="mt-1 text-sm text-slate-500">No high-risk conditions were detected.</p>
        </div>
      )}

      {!!alerts.length&&(
        <div className="space-y-4">
          {alerts.map((item,i)=>(
            <motion.div
              key={item.title+i}
              initial={{opacity:0,y:10}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{delay:i*.08}}
              className="rounded-2xl border border-slate-200 p-5 transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.answered}/{item.total} assessment parameters evaluated</p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">{item.score}%</div>
                  <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${badge(item.score)}`}>
                    {level(item.score)}
                  </span>
                </div>
              </div>

              <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{width:0}}
                  whileInView={{width:`${item.score}%`}}
                  viewport={{once:true}}
                  transition={{duration:.8}}
                  className={`h-full rounded-full ${bar(item.score)}`}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">Requires clinical review & lifestyle intervention.</span>
                <ChevronRight size={18} className="text-slate-400"/>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}