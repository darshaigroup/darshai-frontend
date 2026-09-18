import { useNavigate } from "react-router-dom";
import hero from "@/assets/images/MainImg.png";
import { ChevronRight } from "lucide-react";
import { programData } from "./programData";
import { motion } from "framer-motion";

export default function ProgramMain(){
  const navigate=useNavigate();

  return <div className="bg-[#f6f3ef] min-h-screen overflow-hidden">
    {/* HERO */}
    <section className="relative h-[65vh] min-h-[520px] overflow-hidden">
      <img src={hero} alt="Wellness" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0" style={{background:"linear-gradient(to top right,rgba(30,122,58,.82),rgba(23,78,166,.55),rgba(0,0,0,.45))"}}/>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-5 sm:px-6">
        <div className="mb-5 sm:mb-6">
          <span className="text-[9px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] text-[#d1c957] px-4 sm:px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">DARSHAI PROGRAMMES</span>
        </div>
        <h1 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[90px] leading-[.98] tracking-[-.04em] font-serif mb-6 sm:mb-8">Wellness Programmes</h1>
        <p className="text-sm sm:text-lg md:text-2xl text-white/80 leading-[1.7] sm:leading-[1.9] max-w-4xl">Precision longevity interventions engineered for biological restoration.</p>
      </div>
    </section>

    {/* INTRO */}
    <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 px-5 sm:px-6 text-center">
      <p className="text-[8px] sm:text-[10px] tracking-[.3em] uppercase text-[#C9A75B] mb-4 sm:mb-5">THE DARSHAI METHOD</p>
      <h2 className="text-[38px] sm:text-[48px] md:text-[64px] lg:text-[76px] leading-[.95] tracking-[-.04em] font-serif text-[#1E7A3A] mb-6 sm:mb-8">
        Biologically Optimized<br/>
        <span className="italic text-[#C9A75B] font-light">Journeys.</span>
      </h2>
      <p className="max-w-2xl mx-auto text-[10px] sm:text-xs md:text-sm leading-6 sm:leading-7 text-[#1E7A3A]/65">
        We bridge modern clinical precision with ancestral wellness intelligence to architect restorative programmes that recalibrate biology, resilience, and long-term vitality.
      </p>
    </section>

    {/* PROGRAMMES */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 md:pb-36">
      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        {programData.map((item,i)=>{
          const reverse=i%2!==0;

          return <motion.div
            key={item.slug}
            initial={{opacity:0,y:60}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true,amount:.15}}
            transition={{duration:.8,ease:[.16,1,.3,1]}}
            className={`grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center ${reverse?"md:[&>*:first-child]:order-2":""}`}
          >
            {/* IMAGE */}
            <motion.div
              whileHover={{y:-6}}
              transition={{duration:.5}}
              onClick={()=>navigate(`/program/${item.slug}`)}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-2 rounded-[24px] sm:rounded-[30px] bg-[#C9A75B]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              <div className="relative h-[260px] sm:h-[320px] md:h-[350px] lg:h-[390px] rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_18px_45px_rgba(30,60,40,.16)]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#123C2A]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              </div>
            </motion.div>

            {/* CONTENT */}
            <div className={`text-[#1E7A3A] ${reverse?"md:text-left":""}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1E7A3A] text-white">
                  <span className="text-[10px]">✦</span>
                </span>
                <p className="text-[7px] sm:text-[8px] tracking-[.3em] uppercase text-[#C9A75B]">{item.tag}</p>
              </div>

              <p className="text-[10px] sm:text-xs italic text-[#C9A75B] mb-2">{item.subtitle}</p>

              <h2 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[48px] leading-[.95] tracking-[-.03em] font-serif mb-5 sm:mb-6">
                {item.title}
              </h2>

              <div className="border-l border-[#C9A75B]/50 pl-4 sm:pl-5 mb-5 sm:mb-6">
                <p className="text-[10px] sm:text-xs md:text-sm italic leading-6 text-[#1E7A3A]/70">
                  "{item.quote}"
                </p>
              </div>

              <p className="text-[10px] sm:text-xs md:text-sm leading-6 sm:leading-7 text-[#1E7A3A]/65 max-w-lg mb-5 sm:mb-6">
                {item.description}
              </p>

              {/* FOCUS AREAS */}
              <div className="mb-6 sm:mb-7">
                <p className="text-[7px] sm:text-[8px] tracking-[.25em] uppercase text-[#C9A75B] mb-3">FOCUS AREAS</p>
                <div className="flex flex-wrap gap-2">
                  {item.focusAreas?.map((focus,j)=>
                    <span key={j} className="px-2.5 sm:px-3 py-1 rounded-full border border-[#1E7A3A]/15 bg-white/40 text-[8px] sm:text-[9px] text-[#1E7A3A]/70">
                      {focus}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={()=>navigate(`/program/${item.slug}`)}
                className="group/btn relative inline-flex items-center gap-3 sm:gap-4 overflow-hidden rounded-full border border-[#C9A75B]/40 bg-[#1E7A3A] px-5 sm:px-6 py-2.5 sm:py-3 text-white shadow-[0_8px_25px_rgba(30,122,58,.18)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A75B] hover:bg-[#174EA6] hover:shadow-[0_12px_35px_rgba(23,78,166,.28)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-1000"/>
                <span className="relative z-10 text-[8px] sm:text-[9px] tracking-[.22em] sm:tracking-[.28em] uppercase font-medium">
                  Discover The Protocol
                </span>
                <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border border-[#C9A75B]/60 bg-[#C9A75B]/15 text-[#C9A75B] group-hover/btn:bg-[#C9A75B] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-500">
                  <ChevronRight size={14} strokeWidth={1.8}/>
                </span>
              </button>
            </div>
          </motion.div>;
        })}
      </div>
    </section>

    {/* WHY DARSHAI */}
    {/* WHY DARSHAI PROGRAMMES ARE DIFFERENT */}
<section className="relative py-20 sm:py-24 md:py-32 px-5 sm:px-6 bg-[#123C2A] text-white overflow-hidden">
  <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#1E7A3A]/25 blur-[130px]"/>
  <div className="absolute -bottom-40 -right-40 w-[460px] h-[460px] rounded-full bg-[#174EA6]/20 blur-[140px]"/>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A75B]/[.025] blur-[100px]"/>

  <div className="relative z-10 max-w-5xl mx-auto">

    {/* HEADER */}
    <motion.div
      initial={{opacity:0,y:35}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:.2}}
      transition={{duration:.8,ease:[.16,1,.3,1]}}
      className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
    >
      <p className="text-[8px] sm:text-[10px] tracking-[.3em] uppercase text-[#C9A75B] mb-4">
        THE DARSHAI DIFFERENCE
      </p>
      <h2 className="text-[36px] sm:text-[48px] md:text-[62px] lg:text-[68px] font-serif leading-[.98] tracking-[-.04em]">
        Why DARSHAI Programmes
        <br className="hidden sm:block"/>
        Are Different
      </h2>
      <p className="mt-5 text-xs sm:text-sm md:text-base text-white/55 leading-7 max-w-2xl mx-auto">
        A fundamentally different approach to wellness — moving from generic treatment to intelligent, personalized journeys.
      </p>
    </motion.div>

    {/* SINGLE FLIPPING CARD */}
    <div className="flex justify-center">
      <motion.div
        initial={{opacity:0,scale:.9,y:40}}
        whileInView={{opacity:1,scale:1,y:0}}
        viewport={{once:true,amount:.2}}
        transition={{duration:.9,ease:[.16,1,.3,1]}}
        className="relative w-full max-w-3xl"
      >
        {/* TOP LABEL */}
        <div className="flex items-center justify-center gap-3 mb-5 sm:mb-7">
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#C9A75B]/50"/>
          <span className="text-[7px] sm:text-[9px] tracking-[.3em] uppercase text-[#C9A75B]">
            THE WELLNESS SHIFT
          </span>
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#C9A75B]/50"/>
        </div>

        {/* CARD */}
        <div className="relative h-[470px] sm:h-[500px] md:h-[530px]" style={{perspective:"1800px"}}>
          <motion.div
            animate={{rotateY:[0,0,180,180,360]}}
            transition={{
              duration:12,
              times:[0,.30,.42,.72,1],
              repeat:Infinity,
              ease:"easeInOut"
            }}
            className="absolute inset-0 w-full h-full"
            style={{transformStyle:"preserve-3d"}}
          >

            {/* FRONT - TRADITIONAL */}
            <div
              className="absolute inset-0 rounded-[30px] sm:rounded-[38px] md:rounded-[44px] border border-white/10 bg-[#174635]/90 backdrop-blur-xl p-7 sm:p-10 md:p-14 shadow-[0_35px_100px_rgba(0,0,0,.25)]"
              style={{backfaceVisibility:"hidden"}}
            >
              <div className="h-full flex flex-col justify-center">

                <div className="flex items-center justify-between mb-10 sm:mb-12">
                  <div>
                    <p className="text-[8px] sm:text-[9px] tracking-[.3em] uppercase text-white/35 mb-3">
                      THE CONVENTIONAL MODEL
                    </p>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif">
                      Traditional Wellness
                    </h3>
                  </div>

                  <motion.div
                    animate={{rotate:[0,-8,8,0]}}
                    transition={{duration:4,repeat:Infinity}}
                    className="hidden sm:flex w-14 h-14 rounded-full border border-white/10 items-center justify-center text-white/30 text-xl"
                  >
                    −
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {["One program for everyone","Destination-first","Treatment-first"].map((item,i)=>
                    <motion.div
                      key={item}
                      initial={{opacity:0,x:-20}}
                      whileInView={{opacity:1,x:0}}
                      viewport={{once:true}}
                      transition={{duration:.5,delay:.3+i*.12}}
                      className="group flex items-center gap-4 px-5 py-4 sm:py-5 rounded-2xl border border-white/[.07] bg-black/10 hover:bg-white/[.05] hover:translate-x-2 transition-all duration-500"
                    >
                      <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30"/>
                      </span>
                      <span className="text-xs sm:text-sm md:text-base text-white/60">
                        {item}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 sm:mt-10 text-center">
                  <span className="text-[7px] sm:text-[8px] tracking-[.25em] uppercase text-white/25">
                    A GENERIC APPROACH
                  </span>
                </div>
              </div>
            </div>

            {/* BACK - DARSHAI */}
            <div
              className="absolute inset-0 rounded-[30px] sm:rounded-[38px] md:rounded-[44px] border border-[#C9A75B]/35 bg-gradient-to-br from-[#1E7A3A] via-[#174D3A] to-[#174EA6]/70 backdrop-blur-xl p-7 sm:p-10 md:p-14 shadow-[0_35px_110px_rgba(0,0,0,.35)]"
              style={{backfaceVisibility:"hidden",transform:"rotateY(180deg)"}}
            >
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#C9A75B]/10 blur-[70px]"/>
              <div className="absolute -bottom-28 -left-20 w-56 h-56 rounded-full bg-[#174EA6]/20 blur-[80px]"/>

              <div className="relative h-full flex flex-col justify-center">

                <div className="flex items-center justify-between mb-10 sm:mb-12">
                  <div>
                    <p className="text-[8px] sm:text-[9px] tracking-[.3em] uppercase text-[#C9A75B] mb-1">
                      THE DARSHAI MODEL
                    </p>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif">
                      DARSHAI
                    </h3>
                  </div>

                  <motion.div
                    animate={{rotate:[0,90,180,270,360]}}
                    transition={{duration:8,repeat:Infinity,ease:"linear"}}
                    className="hidden sm:flex w-14 h-14 rounded-full border border-[#C9A75B]/40 items-center justify-center text-[#C9A75B] text-xl"
                  >
                    +
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {["Biology-first","Environment-first","Personalization-first","Outcome-focused"].map((item,i)=>
                    <motion.div
                      key={item}
                      className="group flex items-center gap-4 px-5 py-4 sm:py-5 rounded-2xl border border-[#C9A75B]/15 bg-white/[.055] hover:bg-white/[.1] hover:translate-x-2 transition-all duration-500"
                    >
                      <span className="relative w-8 h-8 rounded-full border border-[#C9A75B]/40 flex items-center justify-center shrink-0">
                        <motion.span
                          animate={{scale:[1,1.45,1]}}
                          transition={{duration:2,delay:i*.25,repeat:Infinity}}
                          className="w-2 h-2 rounded-full bg-[#C9A75B] shadow-[0_0_12px_rgba(201,167,91,.7)]"
                        />
                      </span>
                      <span className="text-xs sm:text-sm md:text-base text-white/90 font-medium">
                        {item}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 sm:mt-10 text-center">
                  <span className="text-[7px] sm:text-[8px] tracking-[.25em] uppercase text-[#C9A75B]">
                    AN INTELLIGENT APPROACH
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* TRANSITION INDICATOR */}
        <div className="flex flex-col items-center mt-6 sm:mt-8">
          <div className="flex items-center gap-3 sm:gap-5 px-5 sm:px-7 py-3 rounded-full border border-[#C9A75B]/20 bg-white/[.035] backdrop-blur-xl">
            <motion.span
              animate={{opacity:[.3,1,.3]}}
              transition={{duration:2,repeat:Infinity}}
              className="text-[7px] sm:text-[8px] tracking-[.25em] uppercase text-white/40"
            >
              TRADITIONAL
            </motion.span>

            <motion.span
              animate={{x:[-3,3,-3]}}
              transition={{duration:1.5,repeat:Infinity}}
              className="text-[#C9A75B]"
            >
              →
            </motion.span>

            <motion.span
              animate={{opacity:[.4,1,.4]}}
              transition={{duration:2,repeat:Infinity,delay:.5}}
              className="text-[7px] sm:text-[8px] tracking-[.25em] uppercase text-[#C9A75B]"
            >
              DARSHAI
            </motion.span>
          </div>

          <p className="mt-4 text-[7px] sm:text-[8px] tracking-[.2em] uppercase text-white/25">
            A shift from treatment-first to biology-first
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>
  </div>;
}