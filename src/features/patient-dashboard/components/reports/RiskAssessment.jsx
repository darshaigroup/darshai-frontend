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
  const r=68,c=2*Math.PI*r,p=c-c*(score/100),stroke=gaugeStroke(risk);

  return(
    <div className="relative flex h-52 w-52 items-center justify-center">
      <svg className="-rotate-90 h-full w-full">
        <circle cx="104" cy="104" r={r} strokeWidth="12" className="fill-none stroke-slate-200"/>
        <motion.circle
          cx="104"
          cy="104"
          r={r}
          strokeWidth="12"
          stroke={stroke}
          strokeLinecap="round"
          className="fill-none"
          strokeDasharray={c}
          initial={{strokeDashoffset:c}}
          animate={{strokeDashoffset:p}}
          transition={{duration:1}}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-700">{score}</h2>
        <span className={`mt-3 rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${gaugeBadge(risk)}`}>{risk??"--"}</span>
      </div>
    </div>
  );
};

export default function RiskAssessment({assessment={},ai={}}){
  const [open,setOpen]=useState(null);
  const blocks=Array.isArray(ai?.blocks)?ai.blocks:[];
  const score=assessment?.composite_score??ai?.composite_score??0;
  const alerts=useMemo(()=>blocks.filter(b=>["high","critical","severe"].includes(String(b.risk_level).toLowerCase())),[blocks]);

 return (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="space-y-6"
  >
    <div>
      <h2 className="text-3xl font-bold text-slate-900">Risk Assessment</h2>
      <p className="mt-1 text-sm text-slate-500">
        Complete wellness assessment generated from AI.
      </p>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:p-10">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-2xl">
          <span
            className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${gaugeBadge(
              assessment?.risk_band
            )}`}
          >
            {assessment?.risk_band ?? "Unknown"} Risk
          </span>

          <h3 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Wellness Risk Overview
          </h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className={`rounded-2xl border px-5 py-4 ${bg(assessment?.risk_band)}`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Overall Risk
              </p>
              <p className={`mt-2 text-xl font-bold capitalize ${text(assessment?.risk_band)}`}>
                {assessment?.risk_band ?? "--"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Composite Score
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {score}/100
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 sm:col-span-2 xl:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Completion
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {ai?.total_completion_pct ?? 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Gauge score={score} risk={assessment?.risk_band} />
        </div>
      </div>
    </div>

    {!!alerts.length && (
      <div className="rounded-3xl bg-white p-5 shadow-lg sm:p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Risk Band Alerts
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Wellness domains requiring clinical monitoring.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            <AlertTriangle className="h-4 w-4" />
            {alerts.length} Active Alerts
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {alerts.map(b => (
            <motion.div
              key={b.id}
              whileHover={{ y: -3 }}
              className={`rounded-2xl border-2 p-5 shadow-sm ${bg(b.risk_level)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white">
                    <ShieldAlert className="h-5 w-5" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">{b.title}</h4>
                    <p className="text-xs text-slate-500">
                      Wellness Domain
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  {b.risk_level}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                Immediate attention recommended
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )}

    <div className="space-y-5">
      {blocks.map((b, i) => (
        <motion.div
          key={b.id}
          layout
          className="overflow-hidden rounded-3xl bg-white shadow-md"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full flex-col gap-5 p-5 text-left sm:p-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="w-full flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {b.title}
                </h3>

                <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${bg(b.risk_level)} ${text(b.risk_level)}`}>
                  {b.risk_level}
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                  <span>Score</span>
                  <span>{b.score}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${b.score}%` }}
                    transition={{ duration: .8 }}
                    className={`h-full rounded-full ${color(b.risk_level)}`}
                  />
                </div>
              </div>
            </div>

            <ChevronDown
              className={`mx-auto h-6 w-6 shrink-0 transition lg:mx-0 ${open === i ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
                        {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: .3 }}
                className="overflow-hidden border-t bg-slate-50"
              >
                <div className="p-4 sm:p-6">
                  <div className="rounded-2xl border bg-white p-4 sm:p-6">
                    <h4 className="mb-5 text-lg font-semibold text-slate-900">
                      Assessment Parameters
                    </h4>

                    <div className="grid gap-4">
                      {b.params?.map(p => {
                        const percent = Math.round((p.score / (p.max_score || 1)) * 100);

                        return (
                          <div
                            key={p.label}
                            className={`rounded-2xl border p-4 transition-all ${progressBg(percent)}`}
                          >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                              <div className="min-w-0 flex-1">
                                <h5 className="text-base font-semibold text-slate-900">
                                  {p.label}
                                </h5>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 lg:justify-end">

                               

                                <div
                                  className={`rounded-full px-4 py-2 text-xs font-semibold ${progressBg(percent)} ${progressText(percent)}`}
                                >
                                  {riskLabel(percent)}
                                </div>

                              </div>
                            </div>

                            <div className="mt-5">
                              <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                                <span>Health Status</span>
                                <span className={progressText(percent)}>
                                  {percent}%
                                </span>
                              </div>

                              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percent}%` }}
                                  transition={{ duration: .7 }}
                                  className={`h-full rounded-full ${progressColor(percent)}`}
                                />
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