import {AnimatePresence,motion} from "framer-motion";
import {AlertCircle,X} from "lucide-react";

const ApplicationErrorPopup=({message,onClose})=>(
  <AnimatePresence>
    {message&&(
      <motion.div
        initial={{opacity:0,y:-20,scale:.96}}
        animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:-15,scale:.96}}
        transition={{duration:.25}}
        className="fixed left-1/2 top-5 z-[9999] w-[calc(100%-32px)] max-w-md -translate-x-1/2"
      >
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,.15)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
            <AlertCircle size={20} className="text-red-500"/>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#1E2A22]">Application could not be submitted</p>
            <p className="mt-1 text-sm leading-6 text-[#66736B]">{message}</p>
          </div>

          <button type="button" onClick={onClose} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#66736B] transition hover:bg-[#F3F6F4]">
            <X size={17}/>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ApplicationErrorPopup;