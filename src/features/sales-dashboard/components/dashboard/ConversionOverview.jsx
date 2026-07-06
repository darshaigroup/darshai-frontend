import { motion } from "framer-motion";
import {
  Users,
  PhoneCall,
  HeartHandshake,
  CreditCard,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

const stages=[
  {
    key:"lead",
    title:"Lead",
    icon:Users,
    color:"bg-blue-50 text-blue-600",
  },
  {
    key:"contacted",
    title:"Contacted",
    icon:PhoneCall,
    color:"bg-cyan-50 text-cyan-600",
  },
  {
    key:"interested",
    title:"Interested",
    icon:HeartHandshake,
    color:"bg-emerald-50 text-emerald-600",
  },
  {
    key:"purchased",
    title:"Purchased",
    icon:CreditCard,
    color:"bg-amber-50 text-amber-600",
  },
  {
    key:"assigned",
    title:"Assigned",
    icon:UserCheck,
    color:"bg-indigo-50 text-indigo-600",
  },
  {
    key:"closed",
    title:"Closed",
    icon:CheckCircle2,
    color:"bg-green-50 text-green-600",
  },
];

export default function ConversionOverview({stats={}}){

  const total=stats.total_leads||1;

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-[34px] border border-[#ECE7DD] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,.05)]"
    >

      <div className="mb-8">

        <span className="rounded-full bg-[#EEF6FF] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#173C68]">
          Sales Funnel
        </span>

        <h2 className="mt-4 font-serif text-3xl text-[#173C68]">
          Conversion Overview
        </h2>

        <p className="mt-2 text-slate-500">
          Visual overview of the current sales conversion pipeline.
        </p>

      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {stages.map(stage=>{

          const Icon=stage.icon;
          const value=stats[stage.key]||0;
          const percent=Math.round((value/total)*100);

          return(

            <motion.div
              key={stage.key}
              whileHover={{y:-4}}
              className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6"
            >

              <div className="flex items-center justify-between">

                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stage.color}`}>

                  <Icon size={28}/>

                </div>

                <div className="text-right">

                  <h3 className="text-3xl font-bold text-[#173C68]">
                    {value}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {percent}%
                  </p>

                </div>

              </div>

              <h4 className="mt-5 font-serif text-2xl text-[#173C68]">
                {stage.title}
              </h4>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#E8E3DA]">

                <motion.div
                  initial={{width:0}}
                  animate={{width:`${percent}%`}}
                  transition={{duration:1}}
                  className="h-full rounded-full bg-gradient-to-r from-[#173C68] to-[#1E7A3A]"
                />

              </div>

              <div className="mt-3 flex items-center justify-between text-sm">

                <span className="text-slate-500">
                  Conversion
                </span>

                <span className="font-semibold text-[#173C68]">
                  {percent}%
                </span>

              </div>

            </motion.div>

          );

        })}

      </div>

    </motion.div>
  );

}