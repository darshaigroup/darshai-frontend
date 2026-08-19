import { motion } from "framer-motion";
import { Flame, Leaf, Shield, Sparkles, Wind } from "lucide-react";

const color=v=>{
  v=String(v??"").toLowerCase();
  if(["balanced","normal","good","optimal"].includes(v))return"#22c55e";
  if(["moderate","medium"].includes(v))return"#f59e0b";
  if(["high","poor","imbalanced","severe"].includes(v))return"#ef4444";
  return"#3b82f6";
};

const badge=v=>{
  v=String(v??"").toLowerCase();
  if(["balanced","normal","good","optimal"].includes(v))return"bg-emerald-100 text-emerald-700";
  if(["moderate","medium"].includes(v))return"bg-amber-100 text-amber-700";
  if(["high","poor","imbalanced","severe"].includes(v))return"bg-red-100 text-red-700";
  return"bg-sky-100 text-sky-700";
};

const pct=v=>Math.min(100,Math.max(0,Number(v)||0));

const doshaUI={
  Vata:{
    card:"border-sky-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-white",
    icon:"bg-sky-100 text-sky-600",
    bar:"from-sky-400 to-cyan-500",
    badge:"bg-sky-100 text-sky-700",
    text:"text-sky-600"
  },
  Pitta:{
    card:"border-orange-200 bg-gradient-to-br from-orange-50 via-red-50 to-white",
    icon:"bg-orange-100 text-orange-600",
    bar:"from-orange-400 to-red-500",
    badge:"bg-orange-100 text-orange-700",
    text:"text-orange-600"
  },
  Kapha:{
    card:"border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white",
    icon:"bg-emerald-100 text-emerald-600",
    bar:"from-emerald-400 to-green-500",
    badge:"bg-emerald-100 text-emerald-700",
    text:"text-emerald-600"
  }
};

const Gauge=({score=0,risk})=>{
  const r=64;
  const size=176;
  const center=size/2;
  const circumference=2*Math.PI*r;
  const offset=circumference-circumference*(score/100);

  return(
    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-44 sm:w-44 md:h-48 md:w-48">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={r}
          strokeWidth="10"
          className="fill-none stroke-slate-200"
        />

        <motion.circle
          cx={center}
          cy={center}
          r={r}
          strokeWidth="10"
          stroke={color(risk)}
          strokeLinecap="round"
          className="fill-none"
          strokeDasharray={circumference}
          initial={{strokeDashoffset:circumference}}
          animate={{strokeDashoffset:offset}}
          transition={{duration:1}}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {score}%
        </p>

        <span className={`mt-1.5 inline-flex max-w-[90px] items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold leading-tight sm:mt-2 sm:px-3 sm:text-xs ${badge(risk)}`}>
          {risk??"--"}
        </span>
      </div>
    </div>
  );
};

export default function AyurvedaAssessment({ayurveda={}}){
  const{
    prakriti={},
    vikriti={},
    agni={},
    ama={},
    correlation={},
    risk_tier,
    primary_dosha,
    secondary_dosha,
    clinical_summary
  }=ayurveda;

  const score=pct(ama?.percentage??50);

  return(
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:.35}}
      className="w-full min-w-0 space-y-4 sm:space-y-5 md:space-y-6"
    >

      {/* HEADER */}
      <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6 md:p-8">
        <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-600 sm:text-xs md:text-sm md:tracking-[.2em]">
              Personalized Dosha Analysis
            </p>

            <h2 className="mt-2 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Ayurveda Assessment Report
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
              Comprehensive constitutional analysis generated from Ayurvedic intelligence.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">

              <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 sm:h-10 sm:w-10">
                  <Leaf className="h-4 w-4 text-emerald-600 sm:h-5 sm:w-5"/>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  Prakriti
                </p>

                <p className="mt-2 break-words text-sm font-bold text-slate-900 sm:text-base">
                  {prakriti?.prakriti_type??"--"}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 sm:h-10 sm:w-10">
                  <Wind className="h-4 w-4 text-sky-600 sm:h-5 sm:w-5"/>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  Primary Dosha
                </p>

                <p className="mt-2 break-words text-sm font-bold text-slate-900 sm:text-base">
                  {primary_dosha??"--"}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 sm:h-10 sm:w-10">
                  <Flame className="h-4 w-4 text-orange-600 sm:h-5 sm:w-5"/>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  Agni
                </p>

                <p className="mt-2 break-words text-sm font-bold text-slate-900 sm:text-base">
                  {agni?.agni_type??"--"}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 sm:h-10 sm:w-10">
                  <Sparkles className="h-4 w-4 text-violet-600 sm:h-5 sm:w-5"/>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                  Dominant Dosha
                </p>

                <p className="mt-2 break-words text-sm font-bold text-slate-900 sm:text-base">
                  {prakriti?.dominant_dosha??"--"}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* PRAKRITI + VIKRITI */}
      <div className="grid min-w-0 gap-4 sm:gap-5 lg:gap-6 xl:grid-cols-2">

        {/* PRAKRITI */}
        <div className="min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6">
          <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h3 className="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
                Prakriti Constitution
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Natural Ayurvedic body constitution
              </p>
            </div>

            <div className="w-full shrink-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-3 text-white shadow-lg sm:w-auto sm:px-5">
              <p className="text-[9px] font-semibold uppercase tracking-[.16em] opacity-80 sm:text-[10px] sm:tracking-[.18em]">
                Dominant Constitution
              </p>

              <p className="mt-1 break-words text-lg font-bold sm:text-xl">
                {prakriti?.dominant_dosha??"--"}
              </p>
            </div>

          </div>

          <div className="space-y-3 sm:space-y-5">
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
                  className={`min-w-0 rounded-2xl border bg-gradient-to-br p-4 shadow-sm sm:rounded-3xl sm:p-5 ${s.card}`}
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl ${s.icon}`}>
                        <d.icon className="h-6 w-6 sm:h-7 sm:w-7"/>
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
                          {d.label}
                        </h4>

                        <p className="text-xs text-slate-500 sm:text-sm">
                          Constitutional Balance
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className={`text-2xl font-black sm:text-3xl ${s.text}`}>
                        {d.value}%
                      </p>

                      <span className={`mt-1.5 inline-flex rounded-full px-2 py-1 text-[9px] font-bold sm:mt-2 sm:px-3 sm:text-xs ${s.badge}`}>
                        {prakriti?.dominant_dosha===d.label?"Dominant":"Balanced"}
                      </span>
                    </div>

                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/70 sm:mt-5 sm:h-3">
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
        <div className="min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6">
          <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h3 className="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
                Vikriti Analysis
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Current dosha imbalance
              </p>
            </div>

            <span className={`w-fit shrink-0 rounded-full px-4 py-2 text-xs font-bold sm:px-5 sm:text-sm ${badge(risk_tier)}`}>
              {risk_tier??"--"}
            </span>

          </div>

          <div className="space-y-3 sm:space-y-5">
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
                  className={`min-w-0 rounded-2xl border bg-gradient-to-br p-4 shadow-sm sm:rounded-3xl sm:p-5 ${s.card}`}
                >
                  <div className="mb-3 flex min-w-0 items-center justify-between gap-3 sm:mb-4">

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${s.icon}`}>
                        <d.icon className="h-5 w-5 sm:h-6 sm:w-6"/>
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                          {d.name}
                        </h4>

                        <span className={`mt-1 inline-flex max-w-full rounded-full px-2.5 py-1 text-[9px] font-semibold sm:px-3 sm:text-[11px] ${s.badge}`}>
                          {d.level??"Balanced"}
                        </span>
                      </div>
                    </div>

                    <p className={`shrink-0 text-2xl font-black sm:text-3xl ${s.text}`}>
                      {d.value}%
                    </p>

                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-white/70 sm:h-3">
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

      {/* AGNI + AMA */}
      <div className="grid min-w-0 gap-4 sm:gap-5 lg:gap-6 xl:grid-cols-2">

        {/* AGNI */}
        <motion.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6"
        >
          <div className="mb-5 flex min-w-0 items-center justify-between gap-4 sm:mb-6">

            <div className="min-w-0">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Agni Assessment
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Digestive fire and metabolic capacity.
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Flame className="h-6 w-6 text-orange-600 sm:h-7 sm:w-7"/>
            </div>

          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-4 text-white sm:rounded-3xl sm:p-6">

            <p className="text-[10px] uppercase tracking-[.18em] opacity-90 sm:text-sm sm:tracking-[.2em]">
              Current Agni
            </p>

            <h2 className="mt-2 break-words text-3xl font-bold sm:mt-3 sm:text-4xl">
              {agni?.agni_type??"--"}
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">

              <div className="min-w-0 rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wide opacity-80 sm:text-xs">
                  Linked Dosha
                </p>

                <p className="mt-2 break-words text-base font-semibold sm:text-lg">
                  {agni?.linked_dosha??"--"}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wide opacity-80 sm:text-xs">
                  Confidence
                </p>

                <p className="mt-2 break-words text-base font-semibold sm:text-lg">
                  {agni?.confidence_score??"--"}
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* AMA */}
        <motion.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-6"
        >
          <div className="mb-5 flex min-w-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Ama Assessment
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Accumulation of metabolic toxins.
              </p>
            </div>

            <span className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${badge(ama?.severity)}`}>
              {ama?.severity??"--"}
            </span>

          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">

            <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                Ama Percentage
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900 sm:mt-3 sm:text-5xl">
                {ama?.percentage??0}%
              </h2>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200 sm:mt-6 sm:h-3">
                <motion.div
                  initial={{width:0}}
                  animate={{width:`${pct(ama?.percentage)}%`}}
                  transition={{duration:.9}}
                  className="h-full rounded-full bg-red-500"
                />
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                Ama Score
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900 sm:mt-3 sm:text-5xl">
                {ama?.raw_score??0}
              </h2>

              <p className="mt-3 text-xs text-slate-500 sm:mt-4 sm:text-sm">
                Maximum Score
              </p>

              <p className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
                {ama?.max_score??"--"}
              </p>
            </div>

          </div>

          {/* {!!ama?.indicators_present?.length&&(
            <div className="mt-5 sm:mt-6">
              <h4 className="mb-3 text-sm font-semibold text-slate-900 sm:text-base">
                Indicators Present
              </h4>

              <div className="flex flex-wrap gap-2">
                {ama.indicators_present.map(item=>(
                  <span
                    key={item}
                    className="max-w-full break-words rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )} */}

        </motion.div>

      </div>

    </motion.section>
  );
}