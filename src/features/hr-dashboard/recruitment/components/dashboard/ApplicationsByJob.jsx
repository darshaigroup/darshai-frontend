import {ArrowUpRight,BriefcaseBusiness} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

const RowSkeleton=()=>(
  <div className="space-y-3 border-b border-[#EEF2EF] py-4 last:border-0">
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="h-4 w-36 animate-pulse rounded bg-[#EEF2EF] sm:w-48"/>
        <div className="h-3 w-20 animate-pulse rounded bg-[#F2F5F3]"/>
      </div>
      <div className="h-5 w-10 animate-pulse rounded bg-[#EEF2EF]"/>
    </div>
    <div className="h-1.5 w-full animate-pulse rounded-full bg-[#F0F3F1]"/>
  </div>
);

const ApplicationsByJob=({data=[],loading=false})=>{
  const navigate=useNavigate(),jobs=Array.isArray(data)?data:[];
  const maxApplications=Math.max(...jobs.map(job=>Number(job.applications)||0),1);
  const totalApplications=jobs.reduce((sum,job)=>sum+(Number(job.applications)||0),0);

  const openJob=jobId=>{
    if(!jobId) return;
    navigate(`/hr/applications?jobId=${encodeURIComponent(jobId)}`);
  };

  return(
    <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E3E9E4] bg-white lg:rounded-3xl">
      <div className="flex items-center justify-between gap-4 border-b border-[#EDF1EE] px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#243128] sm:text-base">Applications by Position</h3>
          <p className="mt-1 text-xs text-[#8A958D]">{loading?"Loading recruitment activity...":`${totalApplications.toLocaleString()} applications across ${jobs.length.toLocaleString()} position${jobs.length===1?"":"s"}`}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF7F0] text-[#1E7A3A]">
          <BriefcaseBusiness className="h-[18px] w-[18px]"/>
        </div>
      </div>

      <div className="px-4 sm:px-5 lg:px-6">
        {loading?Array.from({length:5},(_,index)=><RowSkeleton key={index}/>):jobs.length?(
          <div>
            {jobs.map((job,index)=>{
              const count=Number(job.applications)||0,percentage=Math.max(count/maxApplications*100,0);
              return(
                <motion.button key={job.jobId||job.jobCode||index} type="button" onClick={()=>openJob(job.jobId)} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.25,delay:index*.035}} className="group block w-full border-b border-[#EEF2EF] py-4 text-left transition last:border-0 hover:px-1 sm:py-[18px]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-[13px] font-semibold text-[#2A382E] transition-colors group-hover:text-[#1E7A3A] sm:text-sm">{job.title||"Untitled Position"}</p>
                        <ArrowUpRight className="hidden h-3.5 w-3.5 shrink-0 text-[#8A958D] opacity-0 transition group-hover:opacity-100 sm:block"/>
                      </div>
                      <div className="mt-1 flex min-w-0 items-center gap-2 text-[11px] text-[#929D95] sm:text-xs">
                        {job.department&&<span className="truncate">{job.department}</span>}
                        {job.department&&job.jobCode&&<span className="h-1 w-1 shrink-0 rounded-full bg-[#C3CBC5]"/>}
                        {job.jobCode&&<span className="shrink-0">{job.jobCode}</span>}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold tabular-nums text-[#26362B]">{count.toLocaleString()}</p>
                      <p className="mt-0.5 hidden text-[10px] text-[#9AA49D] sm:block">applications</p>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF3EF]">
                    <motion.div initial={{width:0}} animate={{width:`${percentage}%`}} transition={{duration:.65,delay:.1+index*.035,ease:"easeOut"}} className="h-full rounded-full bg-[#1E7A3A]"/>
                  </div>
                </motion.button>
              );
            })}
          </div>
        ):(
          <div className="flex min-h-[260px] flex-col items-center justify-center px-4 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F6F2] text-[#7B9882]"><BriefcaseBusiness className="h-5 w-5"/></div>
            <p className="mt-4 text-sm font-semibold text-[#344239]">No positions found</p>
            <p className="mt-1 max-w-[250px] text-xs leading-5 text-[#929D95]">Application activity will appear here when candidates start applying.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationsByJob;