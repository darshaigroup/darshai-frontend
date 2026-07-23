import { motion } from "framer-motion";
import {Activity,AlertTriangle,ShieldAlert,HeartPulse,} from "lucide-react";
import {ResponsiveContainer,RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Tooltip} from "recharts";

const pct=v=>Math.min(Math.max(+v||0,0),100),
risk=v=>v>=80?"High":v>=60?"Moderate":"Low",
riskColor=v=>v>=80?"text-red-600 bg-red-50 border-red-200":v>=60?"text-amber-600 bg-amber-50 border-amber-200":"text-emerald-600 bg-emerald-50 border-emerald-200";

const CustomTooltip=({active,payload})=>{
  if(!active||!payload?.length) return null;
  const d=payload[0].payload;
  return(
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <h4 className="font-semibold text-slate-900">{d.name}</h4>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-6"><span className="text-slate-500">Risk Score</span><span className="font-semibold">{d.score}%</span></div>
        <div className="flex justify-between gap-6"><span className="text-slate-500">Level</span><span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${riskColor(d.score)}`}>{risk(d.score)}</span></div>
        <div className="flex justify-between gap-6"><span className="text-slate-500">Answered</span><span className="font-semibold">{d.answered}/{d.total}</span></div>
      </div>
    </div>
  );
};

const Metric=({icon:Icon,title,value,color})=>(
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <span className="text-sm text-slate-500">{title}</span>
      <Icon className={color} size={18}/>
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
  </div>
);

export default function HealthRadar({assessment={}}){
  const ai=assessment?.ai_response??{},
    blocks=ai?.blocks??[],
    radar=blocks.map(b=>({
      name:b.title,
      score:pct(b.score),
      answered:b.answered,
      total:b.total
    })),
    high=blocks.filter(b=>pct(b.score)>=80).length,
    moderate=blocks.filter(b=>{const s=pct(b.score);return s>=60&&s<80;}).length,
    avg=Math.round(radar.reduce((t,i)=>t+i.score,0)/(radar.length||1));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Body System Risk Radar
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Interactive visualization of AI-generated body system risk scores.
          </p>
        </div>

        <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          {blocks.length} Systems
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
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

      <div className="h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radar}>
            <PolarGrid stroke="#CBD5E1" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#475569" }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              dataKey="score"
              stroke="#16A34A"
              fill="#16A34A"
              fillOpacity={0.25}
              strokeWidth={3}
            />
            <Radar
              dataKey="score"
              stroke="#15803D"
              fill="#22C55E"
              fillOpacity={0.15}
              dot={{ r: 4, fill: "#15803D" }}
              activeDot={{ r: 7, fill: "#16A34A" }}
              animationDuration={1200}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Risk Distribution */}
        <div className="h-fit rounded-2xl border border-slate-200 p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              Risk Distribution
            </h3>

            <HeartPulse size={18} className="text-emerald-600" />
          </div>

          <div className="space-y-5">
            {radar
              .sort((a, b) => b.score - a.score)
              .map((item) => (
                <div key={item.name}>
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-2">
                      <div
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          item.score >= 80
                            ? "bg-red-500"
                            : item.score >= 60
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />

                      <span className="break-words text-sm font-medium leading-5 text-slate-700">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:text-xs ${riskColor(item.score)}`}
                      >
                        {risk(item.score)}
                      </span>

                      <span className="w-12 text-right text-sm font-bold text-slate-900">
                        {item.score}%
                      </span>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9 }}
                      className={`h-full rounded-full ${
                        item.score >= 80
                          ? "bg-red-500"
                          : item.score >= 60
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* System Summary */}
        <div className="h-fit rounded-2xl border border-slate-200 p-4 sm:p-5">
          <h3 className="mb-5 text-base font-semibold text-slate-900 sm:text-lg">
            System Summary
          </h3>

          <div className="space-y-4">
            {radar
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 transition-all hover:border-slate-200 hover:shadow-sm md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0 flex-1 md:pr-6">
                    <h4 className="break-words font-semibold leading-6 text-slate-900">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.answered}/{item.total} assessment parameters
                      completed
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:block md:min-w-[90px] md:text-right">
                    <div className="text-2xl font-bold text-slate-900">
                      {item.score}%
                    </div>

                    <span
                      className={`mt-0 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:text-xs md:mt-1 ${riskColor(item.score)}`}
                    >
                      {risk(item.score)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}