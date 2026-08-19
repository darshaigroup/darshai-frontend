import { motion } from "framer-motion";
import { Activity, AlertTriangle, ShieldAlert, HeartPulse } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

const pct=v=>Math.min(Math.max(Number(v)||0,0),100);
const risk=v=>v>=80?"High":v>=60?"Moderate":"Low";
const riskColor=v=>v>=80?"text-red-600 bg-red-50 border-red-200":v>=60?"text-amber-600 bg-amber-50 border-amber-200":"text-emerald-600 bg-emerald-50 border-emerald-200";
const riskDot=v=>v>=80?"bg-red-500":v>=60?"bg-amber-500":"bg-emerald-500";
const riskBar=v=>v>=80?"bg-red-500":v>=60?"bg-amber-500":"bg-emerald-500";

const CustomTooltip=({active,payload})=>{
  if(!active||!payload?.length)return null;
  const d=payload[0].payload,score=pct(d.score);

  return(
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <h4 className="font-semibold text-slate-900">{d.name}</h4>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-6">
          <span className="text-slate-500">Risk Score</span>
          <span className="font-semibold">{score}%</span>
        </div>

        <div className="flex justify-between gap-6">
          <span className="text-slate-500">Level</span>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${riskColor(score)}`}>
            {risk(score)}
          </span>
        </div>
      </div>
    </div>
  );
};

const Metric=({icon:Icon,title,value,color})=>(
  <div className="flex min-h-[108px] items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
    <div>
      <span className="text-sm text-slate-500">{title}</span>
      <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
    </div>
    <Icon className={color} size={20}/>
  </div>
);

export default function HealthRadar({assessment={}}){
  const ai=assessment?.ai_response??{};
  const blocks=ai?.blocks??[];

  const radar=blocks.map(b=>({
    id:b.id,
    name:b.title,
    score:pct(b.score),
    answered:b.answered??0,
    total:b.total??0
  }));

  // Use exactly the same classification everywhere in the dashboard:
  // Low = 0-59, Moderate = 60-79, High = 80-100.
  const high=radar.filter(b=>b.score>=80).length;
  const moderate=radar.filter(b=>b.score>=60&&b.score<80).length;
  const low=radar.filter(b=>b.score<60).length;

  const avg=Math.round(
    radar.reduce((total,item)=>total+item.score,0)/(radar.length||1)
  );

  return(
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Body System Risk Radar
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Ayurvedic assessment of systemic balance across key physiological
            domains, reflecting patterns of constitutional stress and wellness.
          </p>
        </div>

        <div className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          {blocks.length} Health Domains
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Metric
          icon={Activity}
          title="Average Risk"
          value={`${avg}%`}
          color="text-blue-600"
        />

        <Metric
          icon={ShieldAlert}
          title="High Risk"
          value={high}
          color="text-red-600"
        />

        <Metric
          icon={AlertTriangle}
          title="Moderate Risk"
          value={moderate}
          color="text-amber-600"
        />
      </div>

      <div className="h-[380px] sm:h-[460px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radar}>
            <PolarGrid stroke="#CBD5E1"/>

            <PolarAngleAxis
              dataKey="name"
              tick={{
                fontSize:12,
                fill:"#475569"
              }}
            />

            <PolarRadiusAxis
              domain={[0,100]}
              tick={{
                fontSize:11,
                fill:"#94A3B8"
              }}
            />

            <Tooltip content={<CustomTooltip/>}/>

            <Radar
              dataKey="score"
              stroke="#16A34A"
              fill="#16A34A"
              fillOpacity={0.22}
              strokeWidth={3}
              animationDuration={1200}
            />

            <Radar
              dataKey="score"
              stroke="#15803D"
              fill="#22C55E"
              fillOpacity={0.08}
              dot={{
                r:4,
                fill:"#15803D"
              }}
              activeDot={{
                r:7,
                fill:"#16A34A"
              }}
              animationDuration={1400}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              Risk Distribution
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Ayurvedic wellness risk pattern across assessed body systems
            </p>
          </div>

          <HeartPulse size={19} className="text-emerald-600"/>
        </div>

        <div className="space-y-5">
          {[...radar]
            .sort((a,b)=>b.score-a.score)
            .map(item=>{
              const score=pct(item.score);
              const level=risk(score);

              return(
                <div key={item.id??item.name}>
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-2">
                      <div
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${riskDot(score)}`}
                      />

                      <span className="break-words text-sm font-medium leading-5 text-slate-700">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:text-xs ${riskColor(score)}`}
                      >
                        {level}
                      </span>

                      <span className="w-12 text-right text-sm font-bold text-slate-900">
                        {score}%
                      </span>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{width:0}}
                      whileInView={{width:`${score}%`}}
                      viewport={{once:true}}
                      transition={{duration:.9}}
                      className={`h-full rounded-full ${riskBar(score)}`}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </motion.section>
  );
}