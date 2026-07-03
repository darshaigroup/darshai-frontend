import { motion } from "framer-motion";
import {
Clock3,
ArrowRightCircle,
UserRoundPlus,
UserCheck,
CircleCheckBig,
PhoneCall
} from "lucide-react";

const icons={
Lead:<UserRoundPlus size={20}/>,
Followup:<PhoneCall size={20}/>,
Assigned:<UserCheck size={20}/>,
Closed:<CircleCheckBig size={20}/>
};

const colors={
Lead:"bg-blue-100 text-blue-700",
Followup:"bg-yellow-100 text-yellow-700",
Assigned:"bg-[#EAF8EE] text-[#1E7A3A]",
Closed:"bg-red-100 text-red-600"
};

export default function ActivityCard({
  activity,
  onOpen
}){

  return(

    <motion.div
      whileHover={{x:5}}
      transition={{duration:.2}}
      className="rounded-[28px] bg-white border border-[#ECE7DD] p-5 shadow-[0_20px_50px_rgba(0,0,0,.05)]"
    >

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            colors[activity.type]||"bg-slate-100"
          }`}>

            {icons[activity.type]}

          </div>

          <div>

            <h3 className="font-semibold text-[#173C68]">
              {activity.title}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {activity.description}
            </p>

            <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">

              <Clock3 size={15}/>

              {activity.time}

            </div>

          </div>

        </div>

        <button
          onClick={()=>onOpen?.(activity)}
          className="w-10 h-10 rounded-xl hover:bg-[#173C68] hover:text-white transition flex items-center justify-center"
        >

          <ArrowRightCircle size={20}/>

        </button>

      </div>

    </motion.div>

  );

}