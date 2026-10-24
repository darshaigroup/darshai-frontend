import{motion}from"framer-motion";
import{Check,CheckCircle2}from"lucide-react";

const steps=[
  {id:1,label:"You"},
  {id:2,label:"Wellness"},
  {id:3,label:"Preferences"},
  {id:4,label:"Journey"}
];

export default function EnquirySuccess(){
  return(
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12 md:px-8">
      <motion.div
        initial={{opacity:0,y:35,scale:.94}}
        animate={{opacity:1,y:0,scale:1}}
        transition={{duration:.65,ease:[.22,1,.36,1]}}
        className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#dce7dd] bg-white/95 px-6 py-12 text-center shadow-[0_30px_90px_rgba(25,65,35,.12)] backdrop-blur-xl md:px-14 md:py-16"
      >
        <motion.div
          initial={{scale:0,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{delay:.2,type:"spring",stiffness:180,damping:12}}
          className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center"
        >
          <motion.div
            animate={{scale:[1,1.18,1],opacity:[.25,.08,.25]}}
            transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}
            className="absolute inset-0 rounded-full bg-[#1e7a3a]"
          />

          <motion.div
            initial={{scale:0}}
            animate={{scale:1}}
            transition={{delay:.35,type:"spring",stiffness:220,damping:12}}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#1e7a3a] text-white shadow-[0_12px_35px_rgba(30,122,58,.25)]"
          >
            <CheckCircle2 size={42} strokeWidth={1.7}/>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{opacity:0,y:10}}
          animate={{opacity:1,y:0}}
          transition={{delay:.45,duration:.4}}
          className="mb-4 flex items-center justify-center"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#1e7a3a]">
            JOURNEY STARTED
          </span>
        </motion.div>

        <motion.h1
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          transition={{delay:.55,duration:.45}}
          className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#18251d] md:text-4xl"
        >
          Thank you for contacting DARSHAI Geo-Wellness.
        </motion.h1>

        <motion.p
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          transition={{delay:.65,duration:.45}}
          className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#5e6d62] md:text-base"
        >
          Your enquiry has been received. Our team will review your preferences and contact you regarding suitable wellness journey options.
        </motion.p>

        <motion.p
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          transition={{delay:.75,duration:.45}}
          className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#748078]"
        >
          Programme recommendations, availability and pricing will be confirmed based on your requirements and the selected centre.
        </motion.p>

        {/* COMPLETED JOURNEY STEPS */}
        <div className="mx-auto mt-10 w-full max-w-md px-2">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[6%] right-[6%] top-4 h-[2px] rounded-full bg-[#d8e6da]"/>

            <motion.div
              initial={{width:0}}
              animate={{width:"88%"}}
              transition={{
                delay:1,
                duration:1.2,
                ease:"easeInOut"
              }}
              className="absolute left-[6%] top-4 h-[2px] rounded-full bg-[#1e7a3a]"
            />

            {/* Steps */}
            <div className="relative flex items-start justify-between">
              {steps.map((item,index)=>(
                <div
                  key={item.id}
                  className="flex w-1/4 flex-col items-center"
                >
                  <motion.div
                    initial={{scale:0,opacity:0}}
                    animate={{scale:1,opacity:1}}
                    transition={{
                      delay:.85+index*.2,
                      type:"spring",
                      stiffness:220,
                      damping:12
                    }}
                    className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#d8ebdc] text-[#1e7a3a] shadow-sm"
                  >
                    <motion.div
                      initial={{scale:0}}
                      animate={{scale:1}}
                      transition={{
                        delay:1+index*.2,
                        type:"spring",
                        stiffness:300,
                        damping:15
                      }}
                    >
                      <Check size={14} strokeWidth={2.5}/>
                    </motion.div>

                    <motion.div
                      initial={{scale:0,opacity:0}}
                      animate={{scale:1,opacity:[0,.25,0]}}
                      transition={{
                        delay:1.05+index*.2,
                        duration:1.2,
                        ease:"easeOut"
                      }}
                      className="absolute inset-[-5px] rounded-full bg-[#1e7a3a]"
                    />
                  </motion.div>

                  {/* Step label */}
                  <motion.span
                    initial={{opacity:0,y:6}}
                    animate={{opacity:1,y:0}}
                    transition={{
                      delay:1.15+index*.2,
                      duration:.4,
                      ease:"easeOut"
                    }}
                    className="mt-3 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-[#718077] md:text-[10px]"
                  >
                    {item.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 100% PROGRESS */}
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1.6}}
          className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-[#e2ebe3]"
        >
          <motion.div
            initial={{width:0}}
            animate={{width:"100%"}}
            transition={{
              delay:1.65,
              duration:1,
              ease:"easeOut"
            }}
            className="h-full rounded-full bg-[#1e7a3a]"
          />
        </motion.div>

        <motion.p
          initial={{opacity:0,y:5}}
          animate={{opacity:1,y:0}}
          transition={{delay:2.65,duration:.4}}
          className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#829087]"
        >
          100% Complete
        </motion.p>

        {/* Ambient background */}
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1.1,duration:1}}
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#1e7a3a]/5 blur-3xl"
        />

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1.3,duration:1}}
          className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#1e7a3a]/5 blur-3xl"
        />
      </motion.div>
    </div>
  );
}