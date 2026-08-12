import { motion } from "framer-motion";
import { Flame,Droplets,Leaf,Triangle,Sparkles,Activity,Soup,ShieldCheck } from "lucide-react";
import { ResponsiveContainer,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar } from "recharts";

const pct=v=>Math.min(Math.max(Number(v)||0,0),100);

const clr={
  Vata:"#38BDF8",
  Pitta:"#F59E0B",
  Kapha:"#22C55E"
};

const Gauge=({value,color,label})=>(
  <div className="flex flex-col items-center">
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="-rotate-90 h-28 w-28">
        <circle cx="56" cy="56" r="46" fill="none" stroke="#E2E8F0" strokeWidth="10"/>
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
          animate={{strokeDashoffset:289-(289*pct(value))/100}}
          transition={{duration:1}}
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-2xl font-bold text-slate-900">{Math.round(pct(value))}%</div>
        <div className="mt-1 max-w-[90px] text-[11px] leading-4 text-slate-500">{label}</div>
      </div>
    </div>
  </div>
);

export default function AyurvedaDashboard({report={}}){

  const patient=report?.patient??report,
        ay=patient?.final_ayurveda_result??{},
        prakriti=ay?.prakriti??{},
        vikriti=ay?.vikriti??{},
        agni=ay?.agni??{},
        ama=ay?.ama??{},
        correlation = ay?.correlation ?? {},
        dominant=prakriti?.dominant_dosha??"Unknown",

        radar=[
          {
            name:"Vata",
            prakriti:pct(prakriti?.vata_pct),
            vikriti:pct(vikriti?.vata_pct)
          },
          {
            name:"Pitta",
            prakriti:pct(prakriti?.pitta_pct),
            vikriti:pct(vikriti?.pitta_pct)
          },
          {
            name:"Kapha",
            prakriti:pct(prakriti?.kapha_pct),
            vikriti:pct(vikriti?.kapha_pct)
          }
        ],

        agniValue=pct((agni?.confidence_score??0)/15*100),
        agniLabel=agni?.agni_type??"Unknown",

        amaValue=pct(ama?.percentage),
        amaLabel=ama?.severity??"Unknown";
const normalizedAgni=(agniLabel||"").toLowerCase();

const agniType=normalizedAgni.includes("vish")
  ?"Vishamagni"
  :normalizedAgni.includes("manda")
  ?"Mandagni"
  :normalizedAgni.includes("tiksh")
  ?"Tikshnagni"
  :normalizedAgni.includes("sama")
  ?"Samagni"
  :"Pending Analysis";

const recommendation=
  agni?.recommendation||
  correlation?.summary||
  agni?.clinical_meaning||
  "Complete your Agni assessment to receive personalized nutrition recommendations.";

const observation=
  agni?.summary||
  correlation?.summary||
  "Your digestive assessment has not been completed yet.";

const metabolism=
  agni?.metabolism||
  (agniType==="Samagni"
    ?"Optimal"
    :agniType==="Mandagni"
    ?"Needs Stimulation"
    :agniType==="Tikshnagni"
    ?"Overactive"
    :agniType==="Vishamagni"
    ?"Irregular"
    :"Pending Assessment");

const hydration=ama?.severity??"Pending Assessment";

const stages=[
  {name:"Mandagni",active:agniType==="Mandagni",icon:Soup,color:"text-amber-600 bg-amber-50 border-amber-200"},
  {name:"Vishamagni",active:agniType==="Vishamagni",icon:Activity,color:"text-violet-600 bg-violet-50 border-violet-200"},
  {name:"Samagni",active:agniType==="Samagni",icon:ShieldCheck,color:"text-emerald-600 bg-emerald-50 border-emerald-200"},
  {name:"Tikshnagni",active:agniType==="Tikshnagni",icon:Flame,color:"text-orange-600 bg-orange-50 border-orange-200"},
];
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6"
          >
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Ayurveda Intelligence
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Constitution, imbalance, digestive fire and toxin load.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center self-start rounded-2xl bg-emerald-50 lg:self-auto">
                <Leaf className="text-emerald-600" size={28} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-slate-200 p-4 sm:rounded-3xl sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">
                    Prakriti vs Vikriti
                  </h3>

                  <Sparkles className="h-5 w-5 text-emerald-600" />
                </div>

                <div className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[340px] xl:h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radar} outerRadius="72%">
                      <PolarGrid stroke="#CBD5E1" />

                      <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />

                      <PolarRadiusAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                      />

                      <Radar
                        dataKey="prakriti"
                        stroke="#16A34A"
                        fill="#16A34A"
                        fillOpacity={0.25}
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />

                      <Radar
                        dataKey="vikriti"
                        stroke="#DC2626"
                        fill="#DC2626"
                        fillOpacity={0.15}
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 space-y-4">
                  {["Vata", "Pitta", "Kapha"].map((d) => (
                    <motion.div
                      key={d}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${clr[d]}20` }}
                          >
                            <Triangle size={22} style={{ color: clr[d] }} />
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-slate-900">
                              {d}
                            </h4>

                            
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 sm:gap-10">
                          <div className="text-center">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Prakriti
                            </p>

                            <p
                              className="mt-1 text-2xl font-bold"
                              style={{ color: clr[d] }}
                            >
                              {pct(prakriti?.[`${d.toLowerCase()}_pct`])}%
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Vikriti
                            </p>

                            <p className="mt-1 text-2xl font-bold text-red-600">
                              {pct(vikriti?.[`${d.toLowerCase()}_pct`])}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
               
                <div className="grid grid-cols-1 gap-5">
                  {/* -------------------- AGNI -------------------- */}
                  <div className="rounded-2xl border border-slate-200 p-4 sm:rounded-3xl sm:p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">Agni</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Digestive Fire Intelligence
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                        <Flame className="text-orange-500" size={20} />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative flex h-36 w-36 items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 blur-xl" />

                        <motion.div
                          animate={{
                            scale: [1, 1.08, 1],
                            rotate: [0, 4, -4, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-orange-100 bg-white shadow-xl"
                        >
                          <Flame className="text-orange-500" size={44} />
                        </motion.div>
                      </div>

                      <h3 className="mt-2 text-center text-xl font-bold text-slate-900">
                        {agniType}
                      </h3>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                      {stages.map(({ name, active, icon: Icon, color }) => (
                        <motion.div
                          key={name}
                          whileHover={{ y: -3 }}
                          className={`rounded-2xl border p-3 transition ${active ? color : "border-slate-200 bg-slate-50 text-slate-400"}`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon size={18} />
                            {active && <Sparkles size={16} />}
                          </div>

                          <p className="mt-4 text-xs font-semibold uppercase tracking-wide">
                            {name}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* -------------------- AMA -------------------- */}
                  <div className="rounded-2xl border border-slate-200 p-4 sm:rounded-3xl sm:p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">Ama</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Toxin Accumulation Analysis
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
                        <Droplets className="text-cyan-600" size={20} />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative flex h-36 w-36 items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 blur-xl" />

                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-100 bg-white shadow-xl"
                        >
                          <Droplets className="text-cyan-600" size={42} />
                        </motion.div>
                      </div>

                      <h3 className="mt-2 text-center text-xl font-bold text-slate-900">
                        {amaLabel}
                      </h3>

                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        );
}