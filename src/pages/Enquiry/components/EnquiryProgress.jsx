import{motion}from"framer-motion";
import{Check}from"lucide-react";

const steps=[
  {id:1,label:"You"},
  {id:2,label:"Wellness"},
  {id:3,label:"Preferences"},
  {id:4,label:"Journey"}
];

export default function EnquiryProgress({step,total=4,onStepClick}){
  const currentStep=Math.min(Math.max(step,1),total);
  const progress=Math.round((currentStep/total)*100);

  return(
    <div className="mb-10 w-full">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#1e7a3a]">
            Your Journey
          </p>

          <motion.p
            key={currentStep}
            initial={{opacity:0,y:6}}
            animate={{opacity:1,y:0}}
            transition={{duration:.3}}
            className="mt-1 text-sm font-semibold text-[#243126]"
          >
            Step {String(currentStep).padStart(2,"0")} of {String(total).padStart(2,"0")}
          </motion.p>
        </div>

        <motion.span
          key={progress}
          initial={{opacity:0,scale:.7}}
          animate={{opacity:1,scale:1}}
          transition={{duration:.35,type:"spring",stiffness:220}}
          className="text-sm font-bold text-[#1e7a3a]"
        >
          {progress}%
        </motion.span>
      </div>

      <div className="relative px-1 pb-8">
        <div className="absolute left-0 right-0 top-4 h-1.5 rounded-full bg-[#dce6de]" />

        <div className="relative flex items-start justify-between">
          {steps.map((item,index)=>{
            const active=item.id===currentStep;
            const completed=item.id<currentStep;
            const clickable=Boolean(completed&&onStepClick);

            return(
              <div
                key={item.id}
                className="relative flex w-full items-start last:w-auto"
              >
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={()=>clickable&&onStepClick(item.id)}
                  className={`group relative z-10 flex shrink-0 flex-col items-center ${
                    clickable?"cursor-pointer":"cursor-default"
                  }`}
                >
                  <motion.span
                    animate={{
                      scale:active?1.12:1,
                      boxShadow:active
                        ?"0 0 0 7px rgba(30,122,58,.10),0 0 22px rgba(30,122,58,.22)"
                        :completed
                          ?"0 0 0 0 rgba(30,122,58,0)"
                          :"0 0 0 0 rgba(30,122,58,0)"
                    }}
                    transition={{
                      duration:.35,
                      ease:"easeOut"
                    }}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                      completed||active
                        ?"border-[#1e7a3a] bg-[#1e7a3a] text-white"
                        :"border-[#cbd8cc] bg-white text-[#8a978d]"
                    }`}
                  >
                    {active&&(
                      <motion.span
                        className="absolute inset-[-5px] rounded-full border border-[#1e7a3a]/30"
                        animate={{
                          scale:[1,1.18,1],
                          opacity:[.7,.15,.7]
                        }}
                        transition={{
                          duration:1.8,
                          repeat:Infinity,
                          ease:"easeInOut"
                        }}
                      />
                    )}

                    {completed?(
                      <motion.span
                        initial={{scale:0,rotate:-45}}
                        animate={{scale:1,rotate:0}}
                        transition={{duration:.3,type:"spring"}}
                      >
                        <Check size={14} strokeWidth={3}/>
                      </motion.span>
                    ):(
                      <motion.span
                        animate={{scale:active?1.08:1}}
                        transition={{duration:.25}}
                      >
                        {item.id}
                      </motion.span>
                    )}
                  </motion.span>

                  <motion.span
                    animate={{
                      y:active?-1:0,
                      scale:active?1.05:1
                    }}
                    transition={{duration:.3}}
                    className={`absolute top-11 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] ${
                      active
                        ?"text-[#1e7a3a]"
                        :completed
                          ?"text-[#4f6655]"
                          :"text-[#9aa69d]"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                </button>

                {index<steps.length-1&&(
                  <div className="relative mt-[13px] h-1.5 flex-1 overflow-hidden rounded-full bg-[#dce6de]">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-[#1e7a3a]"
                      initial={false}
                      animate={{
                        width:item.id<currentStep?"100%":"0%"
                      }}
                      transition={{
                        duration:.65,
                        ease:[.65,0,.35,1]
                      }}
                    />

                    {item.id===currentStep-1&&(
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-[#1e7a3a]"
                        initial={{width:"0%"}}
                        animate={{width:"100%"}}
                        transition={{
                          duration:.65,
                          ease:[.65,0,.35,1]
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* <motion.div
        className="h-1 overflow-hidden rounded-full bg-[#dce6de]"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#1e7a3a] via-[#287c4b] to-[#b39b45]"
          animate={{width:`${progress}%`}}
          transition={{duration:.7,ease:[.65,0,.35,1]}}
        />
      </motion.div> */}
    </div>
  );
}