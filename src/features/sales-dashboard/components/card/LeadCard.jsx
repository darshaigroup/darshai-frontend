import { motion } from "framer-motion";
import {
Phone,
Mail,
MapPin,
CalendarClock,
ArrowRight
} from "lucide-react";

const statusColor={
Lead:"bg-blue-100 text-blue-700",
Interested:"bg-green-100 text-green-700",
Followup:"bg-yellow-100 text-yellow-700",
Assigned:"bg-purple-100 text-purple-700",
Closed:"bg-red-100 text-red-700"
};

export default function LeadCard({
  lead,
  onView,
  onCall
}){

  return(

    <motion.div
      whileHover={{y:-5}}
      transition={{duration:.25}}
      className="rounded-[32px] bg-white border border-[#ECE7DD] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)]"
    >

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold text-[#173C68]">
            {lead.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {lead.occupation||"Lifestyle Client"}
          </p>

        </div>

        <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
          statusColor[lead.status]||"bg-slate-100 text-slate-600"
        }`}>
          {lead.status}
        </span>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-slate-600">

          <Mail size={17}/>

          <span className="truncate">
            {lead.email}
          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Phone size={17}/>

          <span>
            {lead.phone}
          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <MapPin size={17}/>

          <span>
            {lead.location||"-"}
          </span>

        </div>

        {lead.follow_up&&(

          <div className="flex items-center gap-3 text-[#1E7A3A]">

            <CalendarClock size={17}/>

            <span>
              {lead.follow_up}
            </span>

          </div>

        )}

      </div>

      <div className="mt-8 flex gap-3">

        <button
          onClick={()=>onCall?.(lead)}
          className="flex-1 rounded-2xl border border-[#1E7A3A] py-3 text-[#1E7A3A] font-medium hover:bg-[#1E7A3A] hover:text-white transition"
        >
          Contact
        </button>

        <button
          onClick={()=>onView?.(lead)}
          className="flex-1 rounded-2xl bg-[#173C68] text-white py-3 font-medium hover:bg-[#1E7A3A] transition flex items-center justify-center gap-2"
        >

          View

          <ArrowRight size={18}/>

        </button>

      </div>

    </motion.div>

  );

}