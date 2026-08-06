import {motion} from "framer-motion";
import {Briefcase,Check,Copy,House,IdCard,Mail,RotateCcw,Sparkles} from "lucide-react";

const container={
  hidden:{opacity:0},
  show:{opacity:1,transition:{staggerChildren:.1}}
};

const item={
  hidden:{opacity:0,y:18},
  show:{opacity:1,y:0,transition:{duration:.45,ease:"easeOut"}}
};

const copyText=async text=>{
  if(!text) return;
  try{await navigator.clipboard.writeText(text);}
  catch(err){console.error("Copy failed:",err);}
};

const DetailCard=({icon:Icon,label,value,copy=false})=>(
  <motion.div variants={item} className="group rounded-2xl border border-[#E4ECE6] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#BFD8C6] hover:shadow-[0_12px_35px_rgba(30,122,58,.08)]">
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF8F0]">
        <Icon size={20} className="text-[#1E7A3A]"/>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[.08em] text-[#839087]">{label}</p>

        <div className="mt-1 flex items-center gap-2">
          <p className="min-w-0 break-all text-[15px] font-bold text-[#1E2A22] sm:text-base">{value||"-"}</p> 
        </div>
      </div>
    </div>
  </motion.div>
);

const Step6Submit=({candidateCode,applicationCode,jobTitle,resetForm})=>(
  <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="mx-auto max-w-4xl">
    <div className="overflow-hidden rounded-[28px] border border-[#DDE9E0] bg-white shadow-[0_30px_80px_rgba(28,62,39,.12)] sm:rounded-[34px]">

      {/* Success Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#176A32] via-[#1E7A3A] to-[#29934A] px-5 py-12 text-center sm:px-8 sm:py-14 md:px-12 md:py-16">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/5"/>
        <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-white/5"/>

        <motion.div
          initial={{opacity:0,scale:.4}}
          animate={{opacity:1,scale:1}}
          transition={{type:"spring",stiffness:180,damping:14,delay:.15}}
          className="relative mx-auto flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
        >
          <motion.div
            initial={{scale:.7,opacity:0}}
            animate={{scale:[.8,1.2,1],opacity:[0,.25,0]}}
            transition={{duration:1.4,delay:.2}}
            className="absolute inset-0 rounded-full bg-white"
          />

          <motion.div
            initial={{scale:0}}
            animate={{scale:1}}
            transition={{type:"spring",stiffness:220,damping:14,delay:.25}}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_10px_35px_rgba(0,0,0,.18)] sm:h-24 sm:w-24"
          >
            <motion.div
              initial={{scale:0,rotate:-20}}
              animate={{scale:1,rotate:0}}
              transition={{type:"spring",stiffness:260,damping:13,delay:.45}}
            >
              <Check className="h-10 w-10 text-[#1E7A3A] sm:h-12 sm:w-12" strokeWidth={3}/>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.55,duration:.45}}>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles size={13} className="text-[#DCEFE1]"/>
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-white">Application Received</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-[-.03em] text-white sm:text-4xl md:text-[44px]">
            Application Submitted!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/85 sm:text-[16px]">
            Thank you for your interest in joining DARSHAI. Your application has been successfully received and is now with our recruitment team.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 p-5 sm:p-7 md:p-10">

        <motion.div variants={item}>
          <div className="mb-5">
            <h2 className="font-serif text-xl font-bold text-[#1E2A22] sm:text-2xl">Application Details</h2>
            <p className="mt-1 text-sm text-[#758179]">Keep these IDs for future communication with our recruitment team.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <DetailCard icon={Briefcase} label="Position Applied" value={jobTitle||"Selected Position"}/>
            <DetailCard icon={IdCard} label="Candidate ID" value={candidateCode} copy/>
            <DetailCard icon={Mail} label="Application ID" value={applicationCode} copy/>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={item} className="rounded-3xl border border-[#EFE4C8] bg-gradient-to-br from-[#FFFDF7] to-[#FFF8E9] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0C8]">
              <Sparkles size={18} className="text-[#B98618]"/>
            </div>

            <div>
              <h3 className="font-bold text-[#1E2A22]">What Happens Next?</h3>
              <p className="mt-0.5 text-sm text-[#7A7568]">Here's what you can expect from our recruitment team.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Our Talent Acquisition team will review your profile.",
              "Shortlisted candidates will participate in the interview process.",
              "After the interview process, we will notify you of the outcome.",
              "Keep your Candidate ID and Application ID for future communication."
            ].map((text,index)=>(
              <div key={text} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E9F6ED] text-[11px] font-bold text-[#1E7A3A]">
                  {index+1}
                </div>
                <p className="text-[14px] leading-6 text-[#59665E]">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={item} className="flex flex-col gap-3 border-t border-[#EDF1EE] pt-7 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={()=>window.location.href="/"}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1E7A3A] px-8 font-semibold text-white shadow-[0_8px_25px_rgba(30,122,58,.20)] transition hover:-translate-y-0.5 hover:bg-[#17622F] sm:w-auto"
          >
            <House size={18}/> Back to Home
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#D4E1D7] bg-white px-8 font-semibold text-[#1E7A3A] transition hover:-translate-y-0.5 hover:bg-[#F4F8F5] sm:w-auto"
          >
            <RotateCcw size={18}/> Back to Application
          </button>
        </motion.div>

      </motion.div>
    </div>
  </motion.div>
);

export default Step6Submit;