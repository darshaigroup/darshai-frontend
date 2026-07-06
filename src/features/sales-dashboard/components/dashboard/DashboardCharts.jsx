import { motion } from "framer-motion";
import {
  Users,
  HeartHandshake,
  CreditCard,
  UserCheck,
} from "lucide-react";

export default function DashboardCharts({ stats={} }) {

  const cards=[
    {
      title:"Lead Conversion",
      value:`${stats.total_leads||0} Leads`,
      progress:100,
      icon:Users,
      color:"bg-[#173C68]",
    },
    {
      title:"Interested",
      value:stats.interested||0,
      progress:stats.total_leads?Math.round((stats.interested/stats.total_leads)*100):0,
      icon:HeartHandshake,
      color:"bg-[#1E7A3A]",
    },
    {
      title:"Purchased",
      value:stats.purchased||0,
      progress:stats.total_leads?Math.round((stats.purchased/stats.total_leads)*100):0,
      icon:CreditCard,
      color:"bg-[#C6A75E]",
    },
    {
      title:"Assigned",
      value:stats.assigned||0,
      progress:stats.total_leads?Math.round((stats.assigned/stats.total_leads)*100):0,
      icon:UserCheck,
      color:"bg-[#0F766E]",
    },
  ];

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-[34px] border border-[#ECE7DD] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,.05)]"
    >

      <div className="mb-8">

        <span className="rounded-full bg-[#EDF9F0] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#1E7A3A]">
          Analytics
        </span>

        <h2 className="mt-4 font-serif text-3xl text-[#173C68]">
          Sales Analytics
        </h2>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {cards.map(card=>{

          const Icon=card.icon;

          return(

            <div
              key={card.title}
              className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#173C68]">
                    {card.value}
                  </h3>

                </div>

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}>
                  <Icon
                    size={24}
                    className="text-white"
                  />
                </div>

              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#E5E7EB]">

                <div
                  style={{width:`${card.progress}%`}}
                  className={`h-full rounded-full ${card.color}`}
                />

              </div>

              <div className="mt-3 flex justify-between text-sm">

                <span className="text-slate-500">
                  Progress
                </span>

                <span className="font-semibold text-[#173C68]">
                  {card.progress}%
                </span>

              </div>

            </div>

          );

        })}

      </div>

    </motion.div>
  );

}