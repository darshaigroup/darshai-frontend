import {ArrowRight,ChevronRight,Clock3,Inbox} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

const getInitials=name=>{
  const parts=String(name||"").trim().split(/\s+/).filter(Boolean);
  if(!parts.length) return "NA";
  return parts.slice(0,2).map(part=>part[0]?.toUpperCase()).join("");
};

const formatTime=date=>{
  if(!date) return "—";
  const value=new Date(date);
  if(Number.isNaN(value.getTime())) return "—";

  const diff=Date.now()-value.getTime(),minute=60000,hour=minute*60,day=hour*24;
  if(diff>=0&&diff<minute) return "Just now";
  if(diff>=0&&diff<hour) return `${Math.floor(diff/minute)}m ago`;
  if(diff>=0&&diff<day) return `${Math.floor(diff/hour)}h ago`;
  if(diff>=0&&diff<day*2) return "Yesterday";

  return value.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:value.getFullYear()!==new Date().getFullYear()?"numeric":undefined});
};

const RowSkeleton=()=>(
  <div className="flex items-center gap-3 border-b border-[#EEF2EF] py-4 last:border-0">
    <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-[#EEF2EF]"/>
    <div className="min-w-0 flex-1 space-y-2">
      <div className="h-3.5 w-32 animate-pulse rounded bg-[#EEF2EF]"/>
      <div className="h-3 w-44 animate-pulse rounded bg-[#F2F5F3]"/>
    </div>
    <div className="h-3 w-14 animate-pulse rounded bg-[#EEF2EF]"/>
  </div>
);

const RecentApplications=({data=[],loading=false})=>{
  const navigate=useNavigate(),applications=Array.isArray(data)?data:[];

  const openApplication=application=>{
    if(!application?.applicationId) return;
    navigate(`/hr/applications?applicationId=${encodeURIComponent(application.applicationId)}`);
  };

  return(
    <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E3E9E4] bg-white lg:rounded-3xl">
      <div className="flex items-center justify-between gap-3 border-b border-[#EDF1EE] px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#243128] sm:text-base">Recent Applications</h3>
          <p className="mt-1 text-xs text-[#8A958D]">{loading?"Loading applications...":"Latest candidate activity"}</p>
        </div>

        <button type="button" onClick={()=>navigate("/hr/applications")} className="group flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#1E7A3A] transition hover:bg-[#EDF7F0] sm:px-3">
          View All
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"/>
        </button>
      </div>

      <div className="px-4 sm:px-5 lg:px-6">
        {loading?Array.from({length:5},(_,index)=><RowSkeleton key={index}/>):applications.length?(
          <div>
            {applications.map((application,index)=>(
              <motion.button key={application.applicationId||index} type="button" onClick={()=>openApplication(application)} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} transition={{duration:.25,delay:index*.03}} className="group flex w-full items-center gap-3 border-b border-[#EEF2EF] py-4 text-left transition last:border-0 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4EC] text-xs font-bold uppercase text-[#1E7A3A] sm:h-11 sm:w-11">
                  {getInitials(application.fullName)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-[13px] font-semibold text-[#29382E] transition-colors group-hover:text-[#1E7A3A] sm:text-sm">{application.fullName||"Unknown Candidate"}</p>
                    {application.status&&<span className="hidden shrink-0 rounded-full bg-[#EDF7F0] px-2 py-0.5 text-[9px] font-semibold text-[#3E7D50] sm:inline-block">{application.status}</span>}
                  </div>

                  <p className="mt-1 truncate text-[11px] text-[#7F8B83] sm:text-xs">{application.jobTitle||"Position unavailable"}</p>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-[#A0A9A3] sm:text-[11px]">
                    {application.department&&<span className="max-w-[120px] truncate">{application.department}</span>}
                    {application.department&&application.candidateCode&&<span>•</span>}
                    {application.candidateCode&&<span className="truncate">{application.candidateCode}</span>}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-[10px] font-medium text-[#7D8981] sm:text-[11px]">
                      <Clock3 className="hidden h-3 w-3 sm:block"/>
                      {formatTime(application.appliedAt)}
                    </div>
                    <p className="mt-1 hidden max-w-[100px] truncate text-[9px] text-[#A0AAA3] sm:block">{application.applicationCode||""}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#BCC4BE] transition-all group-hover:translate-x-0.5 group-hover:text-[#1E7A3A]"/>
                </div>
              </motion.button>
            ))}
          </div>
        ):(
          <div className="flex min-h-[300px] flex-col items-center justify-center px-4 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F6F2] text-[#7B9882]"><Inbox className="h-5 w-5"/></div>
            <p className="mt-4 text-sm font-semibold text-[#344239]">No applications yet</p>
            <p className="mt-1 max-w-[240px] text-xs leading-5 text-[#929D95]">New candidate applications will automatically appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentApplications;