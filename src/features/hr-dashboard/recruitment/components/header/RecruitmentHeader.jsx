import {ArrowRight,BriefcaseBusiness,Sparkles} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

const RecruitmentHeader=({stats={},loading=false})=>{
  const navigate=useNavigate();
  const applications=Number(stats.totalApplications)||0,openJobs=Number(stats.openJobs)||0;

  return(
    <motion.section initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.3}} className="relative overflow-hidden rounded-2xl border border-[#E1E8E3] bg-white p-5 sm:p-6 lg:rounded-3xl lg:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#EAF5ED] blur-3xl sm:h-72 sm:w-72"/>
      <div className="pointer-events-none absolute -bottom-24 right-32 hidden h-48 w-48 rounded-full bg-[#F2F7E9] blur-3xl lg:block"/>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 items-center gap-1.5 rounded-full bg-[#EDF7F0] px-3 text-[11px] font-semibold uppercase tracking-[.12em] text-[#1E7A3A]">
              <Sparkles className="h-3.5 w-3.5"/>Recruitment
            </span>
          </div>

          <h2 className="font-serif text-2xl font-semibold leading-tight tracking-[-.02em] text-[#183022] sm:text-3xl lg:text-[34px]">
            Recruitment Overview
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#748078] sm:text-[15px]">
            Monitor candidate activity, review recent applications and keep track of your active hiring positions from one workspace.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#718078] sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1E7A3A]"/>
              {loading?"Loading applications...":`${applications.toLocaleString()} total application${applications===1?"":"s"}`}
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-[#76947E]"/>
              {loading?"Loading positions...":`${openJobs.toLocaleString()} open position${openJobs===1?"":"s"}`}
            </div>
          </div>
        </div>

        <div className="flex shrink-0">
          <button type="button" onClick={()=>navigate("/hr-dashboard/applications")} className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1E7A3A] px-5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(30,122,58,.16)] transition hover:bg-[#17672F] active:scale-[.98] sm:w-auto">
            View Applications
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"/>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default RecruitmentHeader;