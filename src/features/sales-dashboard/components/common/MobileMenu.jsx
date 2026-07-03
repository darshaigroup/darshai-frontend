import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function MobileMenu({children,close}){

  return(
    <motion.div
      initial={{x:-320}}
      animate={{x:0}}
      exit={{x:-320}}
      transition={{duration:.3,ease:"easeOut"}}
      className="relative h-screen w-full bg-gradient-to-b from-[#173C68] via-[#163E66] to-[#1E7A3A] shadow-[0_30px_80px_rgba(0,0,0,.35)] overflow-hidden"
    >

      {/* Decorative Blur */}
      <div className="absolute -top-20 -right-16 w-52 h-52 rounded-full bg-[#E7D6A4]/20 blur-3xl" />
      <div className="absolute bottom-0 -left-16 w-60 h-60 rounded-full bg-[#1E7A3A]/20 blur-3xl" />

      {/* Close Button */}
      <div className="absolute top-5 right-5 z-20">

        <button
          onClick={close}
          className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center transition"
        >
          <X size={22} className="text-white"/>
        </button>

      </div>

      {/* Sidebar */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">

        {children}

      </div>

    </motion.div>
  );

}