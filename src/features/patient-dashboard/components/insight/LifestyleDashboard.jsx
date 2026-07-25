import { motion } from "framer-motion";
import { Apple, Moon, Dumbbell, HeartPulse, Leaf, ShieldCheck, TrendingUp } from "lucide-react";

const pct=v=>Math.min(Math.max(+v||0,0),100);
const scoreColor=v=>v>=80?"text-emerald-600":v>=60?"text-amber-600":"text-red-600";
const ring=v=>v>=80?"#16A34A":v>=60?"#F59E0B":"#DC2626";

const Gauge=({value,color,label,icon:Icon})=>(
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <h3 className={`mt-1 text-3xl font-bold ${scoreColor(value)}`}>{value}%</h3>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
        <Icon size={22} style={{color}}/>
      </div>
    </div>

    <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
      <svg className="-rotate-90 h-28 w-28">
        <circle cx="56" cy="56" r="46" stroke="#E2E8F0" strokeWidth="10" fill="none"/>
        <motion.circle
          cx="56"
          cy="56"
          r="46"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={289}
          initial={{strokeDashoffset:289}}
          animate={{strokeDashoffset:289-(289*value)/100}}
          transition={{duration:1}}
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">Score</div>
      </div>
    </div>
  </div>
);

export default function LifestyleDashboard({report={}}){
  const m=report?.matrix_answers??{},
    nutrition=pct(m?.nutrition_score??m?.nutrition??72),
    activity=pct(m?.activity_score??m?.exercise??68),
    sleep=pct(m?.sleep_score??m?.sleep??74),
    stress=pct(m?.stress_score??m?.stress??61),
    environment=pct(m?.environment_score??m?.environment??80),
    recovery=Math.round((nutrition+activity+sleep+environment+(100-stress))/5),
    cards=[
      {label:"Nutrition",value:nutrition,icon:Apple,color:ring(nutrition)},
      {label:"Activity",value:activity,icon:Dumbbell,color:ring(activity)},
      {label:"Sleep",value:sleep,icon:Moon,color:ring(sleep)},
      {label:"Stress",value:100-stress,icon:HeartPulse,color:ring(100-stress)},
      {label:"Environment",value:environment,icon:Leaf,color:ring(environment)},
      {label:"Recovery",value:recovery,icon:ShieldCheck,color:ring(recovery)}
    ];

  return(
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lifestyle Intelligence</h2>
          <p className="mt-1 text-sm text-slate-500">Daily habits influencing longevity, recovery and resilience.</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
          <TrendingUp className="text-emerald-600" size={20}/>
          <div>
            <div className="text-xs text-slate-500">Lifestyle Score</div>
            <div className="text-xl font-bold text-emerald-700">{recovery}%</div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cards.map(({label,value,icon,color})=>(
          <Gauge
            key={label}
            label={label}
            value={value}
            icon={icon}
            color={color}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">

        <div className="rounded-3xl border border-slate-200 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Lifestyle Breakdown</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Overall {recovery}%
            </span>
          </div>

          <div className="space-y-5">
            {cards.map(({label,value,color,icon:Icon})=>(
              <div key={label}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      <Icon size={18} style={{color}}/>
                    </div>

                    <div>
                      <div className="font-medium text-slate-900">{label}</div>
                      <div className="text-xs text-slate-500">
                        {value>=80?"Excellent":value>=60?"Needs Improvement":"Immediate Attention"}
                      </div>
                    </div>
                  </div>

                  <div className={`text-lg font-bold ${scoreColor(value)}`}>
                    {value}%
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{width:0}}
                    whileInView={{width:`${value}%`}}
                    viewport={{once:true}}
                    transition={{duration:.9}}
                    className="h-full rounded-full"
                    style={{background:color}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">

          <div className="rounded-3xl border border-slate-200 p-6">
            <h3 className="mb-5 text-lg font-semibold text-slate-900">Lifestyle Status</h3>

            <div className="space-y-4">
              {cards
                .sort((a,b)=>b.value-a.value)
                .map(({label,value,color})=>(
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <div className="font-medium text-slate-900">{label}</div>
                      <div className="text-xs text-slate-500">
                        {value>=80?"Optimal":value>=60?"Moderate":"Poor"}
                      </div>
                    </div>

                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
                      style={{background:color}}
                    >
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
                    <div className="rounded-3xl border border-slate-200 p-6">
            <h3 className="mb-5 text-lg font-semibold text-slate-900">AI Recommendations</h3>

            <div className="space-y-4">
              {[
                {
                  title:"Nutrition",
                  desc:nutrition<70
                    ?"Increase whole foods, seasonal vegetables and maintain consistent meal timings."
                    :"Maintain your current dietary pattern."
                },
                {
                  title:"Sleep",
                  desc:sleep<70
                    ?"Target 7–8 hours of uninterrupted sleep with a fixed bedtime."
                    :"Continue your healthy sleep routine."
                },
                {
                  title:"Activity",
                  desc:activity<70
                    ?"Include 30–45 minutes of moderate exercise and strength training."
                    :"Maintain your current activity level."
                },
                {
                  title:"Stress",
                  desc:stress>40
                    ?"Practice meditation, breathing exercises and digital detox daily."
                    :"Stress levels are well managed."
                }
              ].map(({title,desc})=>(
                <motion.div
                  key={title}
                  initial={{opacity:0,y:10}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true}}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900">{title}</h4>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      Recommended
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 p-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Overall Lifestyle Assessment</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Your current lifestyle score is <span className="font-semibold text-emerald-700">{recovery}%</span>. Focus on improving your
              lowest-scoring lifestyle domains to maximize recovery, resilience and long-term healthy ageing.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm">
              <div className="text-xs text-slate-500">Recovery</div>
              <div className={`text-3xl font-bold ${scoreColor(recovery)}`}>{recovery}%</div>
            </div>

            <div className="rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow-lg">
              <div className="text-xs text-emerald-100">Status</div>
              <div className="text-lg font-semibold">
                {recovery>=80?"Excellent":recovery>=60?"Good":"Needs Attention"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}