import {ArrowRight,ChevronRight,Clock3,Inbox,Briefcase,Building2,IdCard} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import person from "@/assets/images/profile.jpg";
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

  return value.toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:value.getFullYear()!==new Date().getFullYear()?"numeric":undefined
  });
};

const StatusBadge=({status})=>{
  if(!status) return null;

  return(
    <span className="inline-flex w-fit items-center rounded-full border border-[#D8EADB] bg-[#EDF7F0] px-2.5 py-1 text-[10px] font-semibold text-[#2F7B45]">
      {status}
    </span>
  );
};

const RowSkeleton=()=>(
  <div className="grid grid-cols-[44px_minmax(0,1fr)_80px] items-center gap-4 border-b border-[#EEF2EF] px-1 py-5 last:border-0 lg:grid-cols-[44px_minmax(170px,1.4fr)_minmax(150px,1fr)_minmax(130px,.9fr)_100px_110px_18px]">
    <div className="h-11 w-11 animate-pulse rounded-full bg-[#EEF2EF]"/>
    <div className="space-y-2">
      <div className="h-3.5 w-32 animate-pulse rounded bg-[#EEF2EF]"/>
      <div className="h-3 w-44 animate-pulse rounded bg-[#F2F5F3]"/>
    </div>
    <div className="h-3 w-16 animate-pulse rounded bg-[#EEF2EF]"/>
  </div>
);

const RecentApplications=({data=[],loading=false})=>{
  const navigate=useNavigate();
  const applications=Array.isArray(data)?data:[];

  const openApplication=application=>{
    if(!application?.applicationId) return;
    navigate(`/hr-dashboard/applications?applicationId=${encodeURIComponent(application.applicationId)}`);
  };

  return(
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#E2E9E4] bg-white shadow-[0_4px_20px_rgba(28,62,39,.025)] lg:rounded-3xl">

      {/* Header */}
      <div className="flex min-h-[82px] items-center justify-between gap-4 border-b border-[#E9EFEB] px-4 sm:px-6 lg:px-7">
        <div className="min-w-0">
          <h3 className="font-serif text-[17px] font-bold text-[#213127] sm:text-lg">
            Recent Applications
          </h3>

          <p className="mt-1 text-[11px] text-[#89958D] sm:text-xs">
            {loading?"Loading applications...":"Latest candidate activity"}
          </p>
        </div>

        <button
          type="button"
          onClick={()=>navigate("/hr-dashboard/applications")}
          className="group flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-[#1E7A3A] transition hover:bg-[#EDF7F0]"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/>
        </button>
      </div>

      {/* Desktop Column Header */}
      {!loading&&applications.length>0&&(
        <div className="hidden grid-cols-[44px_minmax(170px,1.4fr)_minmax(150px,1fr)_minmax(130px,.9fr)_100px_110px_18px] items-center gap-4 border-b border-[#EDF1EE] bg-[#FAFCFA] px-7 py-2.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#9AA59D] lg:grid">
          <div/>
          <div>Candidate</div>
          <div>Position</div>
          <div>Reference</div>
          <div>Status</div>
          <div className="text-right">Applied</div>
          <div/>
        </div>
      )}

      {/* Content */}
      <div className="px-3 sm:px-5 lg:px-7">

        {loading?(
          Array.from({length:5},(_,index)=>(
            <RowSkeleton key={index}/>
          ))
        ):applications.length?(
          <div>
            {applications.map((application,index)=>(
              <motion.button
                key={application.applicationId||index}
                type="button"
                onClick={()=>openApplication(application)}
                initial={{opacity:0,y:6}}
                animate={{opacity:1,y:0}}
                transition={{duration:.25,delay:index*.025}}
                className="group relative w-full border-b border-[#EDF1EE] py-4 text-left transition-colors last:border-0 hover:bg-[#FAFCFA] sm:py-5 lg:grid lg:grid-cols-[44px_minmax(170px,1.4fr)_minmax(150px,1fr)_minmax(130px,.9fr)_100px_110px_18px] lg:items-center lg:gap-4 lg:px-0"
              >

                {/* MOBILE / TABLET */}
                <div className="flex items-start gap-3 lg:contents">

                  {/* Avatar */}
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#DFECE2] bg-[#F3F7F4] transition group-hover:border-[#BFD9C5]">
                    <img
                      src={person}
                      alt="Candidate"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Candidate */}
                  <div className="min-w-0 flex-1 lg:block">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="truncate text-[13px] font-bold text-[#29382E] transition-colors group-hover:text-[#1E7A3A] sm:text-sm">
                        {application.fullName||"Unknown Candidate"}
                      </p>

                      <div className="lg:hidden">
                        <StatusBadge status={application.status}/>
                      </div>
                    </div>

                    {/* Mobile Position */}
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#738078] lg:hidden">
                      <Briefcase className="h-3 w-3 shrink-0 text-[#93A098]"/>
                      <span className="truncate">
                        {application.jobTitle||"Position unavailable"}
                      </span>
                    </div>

                    {/* Mobile Department */}
                    {application.department&&(
                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#929D95] lg:hidden">
                        <Building2 className="h-3 w-3 shrink-0"/>
                        <span className="truncate">
                          {application.department}
                        </span>
                      </div>
                    )}

                    {/* Mobile References */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:hidden">
                      {application.candidateCode&&(
                        <span className="flex items-center gap-1 text-[10px] font-medium text-[#78867D]">
                          <IdCard className="h-3 w-3"/>
                          {application.candidateCode}
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-[10px] text-[#929D95]">
                        <Clock3 className="h-3 w-3"/>
                        {formatTime(application.appliedAt)}
                      </span>
                    </div>

                    {application.applicationCode&&(
                      <p className="mt-1.5 max-w-[230px] truncate text-[9px] text-[#A0AAA3] sm:text-[10px] lg:hidden">
                        {application.applicationCode}
                      </p>
                    )}
                  </div>

                  {/* Mobile Arrow */}
                  <ChevronRight className="mt-3 h-4 w-4 shrink-0 text-[#B9C3BC] transition-all group-hover:translate-x-1 group-hover:text-[#1E7A3A] lg:hidden"/>

                </div>

                {/* DESKTOP POSITION */}
                <div className="hidden min-w-0 lg:block">
                  <p className="truncate text-[12px] font-medium text-[#657269]">
                    {application.jobTitle||"Position unavailable"}
                  </p>

                  {application.department&&(
                    <p className="mt-1 truncate text-[10px] text-[#9AA49D]">
                      {application.department}
                    </p>
                  )}
                </div>

                {/* DESKTOP REFERENCE */}
                <div className="hidden min-w-0 lg:block">
                  <p className="truncate text-[10px] font-semibold text-[#6F7E74]">
                    {application.candidateCode||"—"}
                  </p>

                  <p
                    title={application.applicationCode}
                    className="mt-1 truncate text-[9px] text-[#A1AAA4]"
                  >
                    {application.applicationCode||"—"}
                  </p>
                </div>

                {/* DESKTOP STATUS */}
                <div className="hidden lg:block">
                  <StatusBadge status={application.status}/>
                </div>

                {/* DESKTOP TIME */}
                <div className="hidden text-right lg:block">
                  <div className="flex items-center justify-end gap-1 text-[10px] font-medium text-[#7D8981]">
                    <Clock3 className="h-3 w-3"/>
                    <span>{formatTime(application.appliedAt)}</span>
                  </div>
                </div>

                {/* Desktop Arrow */}
                <ChevronRight className="hidden h-4 w-4 text-[#BAC3BD] transition-all group-hover:translate-x-1 group-hover:text-[#1E7A3A] lg:block"/>

              </motion.button>
            ))}
          </div>
        ):(
          <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E2ECE4] bg-[#F1F6F2] text-[#71907A]">
              <Inbox className="h-6 w-6"/>
            </div>

            <p className="mt-4 text-sm font-bold text-[#344239]">
              No applications yet
            </p>

            <p className="mt-1.5 max-w-[260px] text-xs leading-5 text-[#929D95]">
              New candidate applications will automatically appear here.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default RecentApplications;