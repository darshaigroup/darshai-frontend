import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CalendarPlus,
  UserRoundPlus,
  Users,
  ClipboardList,
  PhoneCall,
  FileText,
} from "lucide-react";

const actions=[
  {
    title:"New Follow-up",
    desc:"Schedule patient follow-up",
    icon:CalendarPlus,
    color:"from-[#173C68] to-[#1E7A3A]",
    path:"/sales-dashboard/followups",
  },
  {
    title:"Assign Doctor",
    desc:"Allocate purchased patient",
    icon:UserRoundPlus,
    color:"from-[#1E7A3A] to-[#49A66D]",
    path:"/sales-dashboard/assign-doctor",
  },
  {
    title:"View Leads",
    desc:"Manage all lifestyle leads",
    icon:Users,
    color:"from-[#2563EB] to-[#4F8DFF]",
    path:"/sales-dashboard/leads",
  },
  {
    title:"Today's Follow-ups",
    desc:"Patients to contact today",
    icon:PhoneCall,
    color:"from-[#C58A00] to-[#E7B733]",
    path:"/sales-dashboard/followups",
  },
  {
    title:"Closed Leads",
    desc:"Completed sales history",
    icon:ClipboardList,
    color:"from-[#0F766E] to-[#16A34A]",
    path:"/sales-dashboard/closed",
  },
  {
    title:"Reports",
    desc:"View patient reports",
    icon:FileText,
    color:"from-[#7C3AED] to-[#9333EA]",
    path:"/sales-dashboard/leads",
  },
];

export default function QuickActions(){

  const navigate=useNavigate();

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-[34px] border border-[#ECE7DD] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,.05)]"
    >

      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-[#EDF9F0] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#1E7A3A]">
            Productivity
          </span>

          <h2 className="mt-4 font-serif text-3xl text-[#173C68]">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-500">
            Frequently used CRM shortcuts for faster workflow.
          </p>

        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {actions.map(item=>{

          const Icon=item.icon;

          return(

            <motion.button
              key={item.title}
              whileHover={{y:-6,scale:1.02}}
              whileTap={{scale:.98}}
              onClick={()=>navigate(item.path)}
              className="group overflow-hidden rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] text-left transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,.08)]"
            >

              <div className={`bg-gradient-to-r ${item.color} p-6`}>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

                  <Icon
                    size={30}
                    className="text-white"
                  />

                </div>

              </div>

              <div className="p-6">

                <h3 className="font-serif text-2xl text-[#173C68]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.desc}
                </p>

                <div className="mt-6 flex items-center font-semibold text-[#1E7A3A]">

                  Open

                  <span className="ml-2 transition-transform group-hover:translate-x-2">
                    →
                  </span>

                </div>

              </div>

            </motion.button>

          );

        })}

      </div>

    </motion.div>
  );

}