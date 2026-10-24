import{motion}from"framer-motion";

export default function EnquiryStep({
  title,
  description,
  children,
  step,
  total=4
}){
  return(
    <motion.section
      key={step}
      initial={{opacity:0,y:28,scale:.985}}
      animate={{opacity:1,y:0,scale:1}}
      exit={{opacity:0,y:-20,scale:.985}}
      transition={{duration:.45,ease:[.22,1,.36,1]}}
      className="relative overflow-visible"
    >
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[45px] bg-[radial-gradient(circle_at_50%_20%,rgba(30,122,58,.12),transparent_55%)] blur-2xl" />

      <div className="relative overflow-visible rounded-[32px] border border-[#dce7dd] bg-white/95 p-6 shadow-[0_30px_90px_rgba(25,65,35,.10)] backdrop-blur-xl transition-all duration-500 md:p-10">
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-1.5 overflow-hidden rounded-t-[32px] bg-gradient-to-r from-[#173c68] via-[#1e7a3a] to-[#c3a84c]">
          <motion.div
            initial={{x:"-100%"}}
            animate={{x:"100%"}}
            transition={{
              duration:2.5,
              repeat:Infinity,
              ease:"linear"
            }}
            className="h-full w-1/3 bg-white/40 blur-sm"
          />
        </div>

        <div className="mb-8">
          <motion.div
            initial={{opacity:0,x:-15}}
            animate={{opacity:1,x:0}}
            transition={{delay:.1}}
            className="mb-3 flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1e7a3a]" />
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#1e7a3a]">
              DARSHAI GEO-WELLNESS
            </p>
          </motion.div>

          <motion.h2
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            transition={{delay:.15}}
            className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#18251d] md:text-4xl"
          >
            {title}
          </motion.h2>

          {description&&(
            <motion.p
              initial={{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              transition={{delay:.2}}
              className="mt-3 max-w-2xl text-sm leading-7 text-[#68766c] md:text-[15px]"
            >
              {description}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          transition={{delay:.25,duration:.4}}
          className="relative"
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}