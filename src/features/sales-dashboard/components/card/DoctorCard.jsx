import { motion } from "framer-motion";
import {
UserRound,
Users,
Star,
ChevronRight,
Phone,
Mail
} from "lucide-react";

export default function DoctorCard({
  doctor,
  onAssign,
  onView
}){

  return(
    <motion.div
      whileHover={{y:-6}}
      transition={{duration:.25}}
      className="rounded-[32px] bg-white border border-[#ECE7DD] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)]"
    >

      <div className="flex items-start gap-4">

        <div className="w-16 h-16 rounded-2xl bg-[#173C68]/10 flex items-center justify-center">

          <UserRound
            size={32}
            className="text-[#173C68]"
          />

        </div>

        <div className="flex-1">

          <h2 className="text-xl font-semibold text-[#173C68]">
            {doctor.name}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {doctor.specialization||"Ayurveda Specialist"}
          </p>

        </div>

        <div className="flex items-center gap-1 text-[#C6A75E]">

          <Star size={18} fill="currentColor"/>

          <span className="font-semibold">
            {doctor.rating||"4.9"}
          </span>

        </div>

      </div>

      <div className="mt-7 space-y-4">

        <div className="flex items-center gap-3 text-slate-600">

          <Mail size={17}/>

          <span className="truncate">
            {doctor.email}
          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Phone size={17}/>

          <span>
            {doctor.phone}
          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Users size={17}/>

          <span>
            {doctor.patient_count||0} Active Patients
          </span>

        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <button
          onClick={()=>onView?.(doctor)}
          className="flex-1 py-3 rounded-2xl border border-[#173C68] text-[#173C68] hover:bg-[#173C68] hover:text-white transition"
        >
          View
        </button>

        <button
          onClick={()=>onAssign?.(doctor)}
          className="flex-1 py-3 rounded-2xl bg-[#1E7A3A] text-white hover:bg-[#166531] transition flex items-center justify-center gap-2"
        >

          Assign

          <ChevronRight size={18}/>

        </button>

      </div>

    </motion.div>
  );

}