import {AnimatePresence,motion} from "framer-motion";
import {AlertCircle,X} from "lucide-react";

const ApplicationErrorPopup=({message,onClose})=>(
  <AnimatePresence>
    {message&&(
      <motion.div
        initial={{opacity:0,y:-16,scale:.96}}
        animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:-12,scale:.96}}
        transition={{duration:.22,ease:"easeOut"}}
        className="fixed inset-x-0 top-3 z-[99999] mx-auto w-[calc(100%-24px)] max-w-[380px] sm:top-4 sm:max-w-[400px] lg:top-5"
      >
        <div className="relative flex items-start gap-2.5 overflow-hidden rounded-xl border border-red-200 bg-white p-3 shadow-[0_12px_35px_rgba(0,0,0,.14)] sm:gap-3 sm:p-4">

          {/* Icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 sm:h-9 sm:w-9">
            <AlertCircle className="h-4 w-4 text-red-500 sm:h-[18px] sm:w-[18px]"/>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[12px] font-bold leading-4 text-[#243128] sm:text-[13px] sm:leading-5">
              Application Not Submitted
            </p>

            <p className="mt-1 break-words text-[11px] leading-[17px] text-[#6B776F] sm:text-xs sm:leading-5">
              {message}
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#89938C] transition hover:bg-[#F3F6F4] hover:text-[#243128]"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
          </button>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-red-400/70"/>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ApplicationErrorPopup;