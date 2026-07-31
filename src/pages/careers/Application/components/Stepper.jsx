import {motion} from "framer-motion";
import {Check} from "lucide-react";

const STEPS=[
  "Personal Info",
  "Education",
  "Job Details",
  "Resume Upload",
  "Declaration",
];

const Stepper=({step=1,onStepClick})=>(
<div>
  <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
    {STEPS.map((label,index)=>{
      const current=index+1;
      const completed=current<step;
      const active=current===step;

      return(
        <motion.button
          key={label}
          layout
          whileHover={completed?{y:-2}:undefined}
          whileTap={{scale:.98}}
          type="button"
          disabled={!completed}
          onClick={()=>completed&&onStepClick?.(current)}
          className={`flex h-14 items-center gap-3 rounded-2xl border px-3 transition-all duration-300 ${
            completed
              ?"cursor-pointer border-[#A9E3BB] bg-[#ECFAF2]"
              :active
              ?"border-[#1E7A3A] bg-[#F6FCF8]"
              :"border-[#DCE2E7] bg-[#F8FAFB]"
          }`}
        >
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              completed||active
                ?"bg-[#1E7A3A] text-white"
                :"bg-[#E7EBEF] text-[#7D8895]"
            }`}
          >
            {completed?<Check size={14} strokeWidth={3}/>:current}
          </div>

          <span
            className={`truncate text-xs font-semibold sm:text-sm ${
              completed||active
                ?"text-[#1E7A3A]"
                :"text-[#8B95A7]"
            }`}
          >
            {label}
          </span>
        </motion.button>
      );
    })}
  </div>
</div>
);

export default Stepper;