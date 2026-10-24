import{motion}from"framer-motion";
import{Check}from"lucide-react";

export default function EnquiryOption({label,selected,onClick,multiple=false}){
  return(
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{y:-2,scale:1.005}}
      whileTap={{scale:.98}}
      animate={{
        scale:selected?1.01:1,
        transition:{duration:.18}
      }}
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
        selected
          ?"border-[#1e7a3a] bg-[#edf6ef] text-[#163c25] shadow-[0_8px_25px_rgba(30,122,58,0.10)]"
          :"border-[#dce5dd] bg-white text-[#344239] hover:border-[#91b79b] hover:bg-[#f8fbf8] hover:shadow-sm"
      }`}
    >
      {selected&&(
        <motion.span
          layoutId={`selected-${label}`}
          className="absolute inset-y-0 left-0 w-1 bg-[#1e7a3a]"
        />
      )}

      <span className="pr-4 text-sm leading-6 md:text-base">
        {label}
      </span>

      <motion.span
        animate={{
          scale:selected?1:0.9,
          backgroundColor:selected?"#1e7a3a":"#ffffff"
        }}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
          selected
            ?"border-[#1e7a3a] text-white"
            :"border-[#c8d3ca]"
        }`}
      >
        <AnimateCheck visible={selected}/>
      </motion.span>
    </motion.button>
  );
}

function AnimateCheck({visible}){
  return visible?(
    <motion.div
      initial={{opacity:0,scale:0,rotate:-45}}
      animate={{opacity:1,scale:1,rotate:0}}
      transition={{type:"spring",stiffness:400,damping:18}}
    >
      <Check size={14}/>
    </motion.div>
  ):null;
}