import { motion } from "framer-motion";
import { Flame, Leaf, Shield, Sparkles, Wind } from "lucide-react";

const color=v=>{v=String(v??"").toLowerCase();if(["balanced","normal","good","optimal"].includes(v))return"#22c55e";if(["moderate","medium"].includes(v))return"#f59e0b";if(["high","poor","imbalanced","severe"].includes(v))return"#ef4444";return"#3b82f6";};
const badge=v=>{v=String(v??"").toLowerCase();if(["balanced","normal","good","optimal"].includes(v))return"bg-emerald-100 text-emerald-700";if(["moderate","medium"].includes(v))return"bg-amber-100 text-amber-700";if(["high","poor","imbalanced","severe"].includes(v))return"bg-red-100 text-red-700";return"bg-sky-100 text-sky-700";};
const pct=v=>Math.min(100,Math.max(0,Number(v)||0));
 const doshaUI={
  Vata:{card:"border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white",icon:"bg-sky-100 text-sky-600",bar:"from-sky-400 to-cyan-500",badge:"bg-sky-100 text-sky-700",text:"text-sky-600"},
  Pitta:{card:"border-orange-200 bg-gradient-to-br from-orange-50 via-red-50 to-white",icon:"bg-orange-100 text-orange-600",bar:"from-orange-400 to-red-500",badge:"bg-orange-100 text-orange-700",text:"text-orange-600"},
  Kapha:{card:"border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white",icon:"bg-emerald-100 text-emerald-600",bar:"from-emerald-400 to-green-500",badge:"bg-emerald-100 text-emerald-700",text:"text-emerald-600"}
};

const Gauge=({score=0,risk})=>{
  const r=64,c=2*Math.PI*r,o=c-c*(score/100);
  return(
    <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
      <svg className="-rotate-90 h-full w-full">
        <circle cx="88" cy="88" r={r} strokeWidth="10" className="fill-none stroke-slate-200"/>
        <motion.circle
          cx="88"
          cy="88"
          r={r}
          strokeWidth="10"
          stroke={color(risk)}
          strokeLinecap="round"
          className="fill-none"
          strokeDasharray={c}
          initial={{strokeDashoffset:c}}
          animate={{strokeDashoffset:o}}
          transition={{duration:1}}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold text-slate-900">{score}%</p>
        <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge(risk)}`}>{risk??"--"}</span>
      </div>
    </div>
  );
};

export default function AyurvedaAssessment({ayurveda={}}){
  const{
    prakriti={},vikriti={},agni={},ama={},correlation={},
    risk_tier,primary_dosha,secondary_dosha,clinical_summary
  }=ayurveda;

  const score=pct(ama?.percentage??50);

  return(
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:.35}}
      className="space-y-6"
    >

      <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-600">
              Personalized Dosha Analysis
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-5xl">
              Ayurveda Assessment Report
            </h2>

            <p className="mt-4 max-w-2xl text-slate-500">
              Comprehensive constitutional analysis generated from Ayurvedic intelligence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Leaf className="h-5 w-5 text-emerald-600"/>
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Prakriti</p>
                <p className="mt-2 font-bold text-slate-900">{prakriti?.prakriti_type??"--"}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100">
                  <Wind className="h-5 w-5 text-sky-600"/>
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Primary Dosha</p>
                <p className="mt-2 font-bold text-slate-900">{primary_dosha??"--"}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <Flame className="h-5 w-5 text-orange-600"/>
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Agni</p>
                <p className="mt-2 font-bold text-slate-900">{agni?.agni_type??"--"}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Sparkles className="h-5 w-5 text-violet-600"/>
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Dominant Dosha</p>
                <p className="mt-2 font-bold text-slate-900">{prakriti?.dominant_dosha??"--"}</p>
              </div>

            </div>
          </div>

        

        </div>
      </div>
           
<div className="grid gap-6 xl:grid-cols-2">


  {/* PRAKRITI */}

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-3xl font-bold text-slate-900">Prakriti Constitution</h3>
        <p className="mt-1 text-sm text-slate-500">Natural Ayurvedic body constitution</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-white shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-[.18em] opacity-80">
          Dominant Constitution
        </p>
        <p className="mt-1 text-xl font-bold">
          {prakriti?.dominant_dosha??"--"}
        </p>
      </div>
    </div>

    <div className="space-y-5">
      {[
        {label:"Vata",value:pct(prakriti?.vata_pct),icon:Wind},
        {label:"Pitta",value:pct(prakriti?.pitta_pct),icon:Flame},
        {label:"Kapha",value:pct(prakriti?.kapha_pct),icon:Leaf}
      ].map(d=>{
        const s=doshaUI[d.label];

        return(
          <motion.div
            key={d.label}
            whileHover={{y:-3}}
            className={`rounded-3xl border bg-gradient-to-br p-5 shadow-sm ${s.card}`}
          >
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.icon}`}>
                  <d.icon className="h-7 w-7"/>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900">{d.label}</h4>
                  <p className="text-sm text-slate-500">Constitutional Balance</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-3xl font-black ${s.text}`}>{d.value}%</p>

                <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${s.badge}`}>
                  {prakriti?.dominant_dosha===d.label?"Dominant":"Balanced"}
                </span>
              </div>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/70">
              <motion.div
                initial={{width:0}}
                animate={{width:`${d.value}%`}}
                transition={{duration:.8}}
                className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>

  {/* VIKRITI */}

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-3xl font-bold text-slate-900">Vikriti Analysis</h3>
        <p className="mt-1 text-sm text-slate-500">Current dosha imbalance</p>
      </div>

      <span className={`rounded-full px-5 py-2 text-sm font-bold ${badge(risk_tier)}`}>
        {risk_tier??"--"}
      </span>
    </div>

    <div className="space-y-5">
      {[
        {name:"Vata",value:pct(vikriti?.vata_pct),level:vikriti?.deviations?.Vata?.level,icon:Wind},
        {name:"Pitta",value:pct(vikriti?.pitta_pct),level:vikriti?.deviations?.Pitta?.level,icon:Flame},
        {name:"Kapha",value:pct(vikriti?.kapha_pct),level:vikriti?.deviations?.Kapha?.level,icon:Leaf}
      ].map(d=>{
        const s=doshaUI[d.name];

        return(
          <motion.div
            key={d.name}
            whileHover={{x:3}}
            className={`rounded-3xl border bg-gradient-to-br p-5 shadow-sm ${s.card}`}
          >
            <div className="mb-4 flex items-center justify-between">

              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.icon}`}>
                  <d.icon className="h-6 w-6"/>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900">{d.name}</h4>
                  <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${s.badge}`}>
                    {d.level??"Balanced"}
                  </span>
                </div>
              </div>

              <p className={`text-3xl font-black ${s.text}`}>
                {d.value}%
              </p>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/70">
              <motion.div
                initial={{width:0}}
                animate={{width:`${d.value}%`}}
                transition={{duration:.8}}
                className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>

</div>
            <div className="grid gap-6 xl:grid-cols-2">

        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Agni Assessment</h3>
              <p className="mt-1 text-sm text-slate-500">Digestive fire and metabolic capacity.</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <Flame className="h-7 w-7 text-orange-600"/>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 text-white">
            <p className="text-sm uppercase tracking-[.2em] opacity-90">Current Agni</p>

            <h2 className="mt-3 text-4xl font-bold">
              {agni?.agni_type ?? "--"}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-xs uppercase opacity-80">Linked Dosha</p>
                <p className="mt-2 text-lg font-semibold">
                  {agni?.linked_dosha ?? "--"}
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-xs uppercase opacity-80">Confidence</p>
                <p className="mt-2 text-lg font-semibold">
                  {agni?.confidence_score ?? "--"}
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Ama Assessment</h3>
              <p className="mt-1 text-sm text-slate-500">Accumulation of metabolic toxins.</p>
            </div>

            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${badge(ama?.severity)}`}>
              {ama?.severity ?? "--"}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Ama Percentage
              </p>

              <h2 className="mt-3 text-5xl font-bold text-slate-900">
                {ama?.percentage ?? 0}%
              </h2>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  initial={{width:0}}
                  animate={{width:`${pct(ama?.percentage)}%`}}
                  transition={{duration:.9}}
                  className="h-full rounded-full bg-red-500"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Ama Score
              </p>

              <h2 className="mt-3 text-5xl font-bold text-slate-900">
                {ama?.raw_score ?? 0}
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                Maximum Score
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {ama?.max_score ?? "--"}
              </p>
            </div>

          </div>

          {!!ama?.indicators_present?.length && (
            <div className="mt-6">
              <h4 className="mb-3 font-semibold text-slate-900">
                Indicators Present
              </h4>

              <div className="flex flex-wrap gap-2">
                {ama.indicators_present.map(item=>(
                  <span
                    key={item}
                    className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </motion.section>
  );
}