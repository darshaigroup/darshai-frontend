import {Users,FileText,CalendarCheck,CalendarDays,BriefcaseBusiness,UserRoundCheck} from "lucide-react";
import {motion} from "framer-motion";

const STAT_CONFIG=[
  {key:"totalCandidates",label:"Total Candidates",description:"Registered candidates",icon:Users},
  {key:"totalApplications",label:"Applications",description:"All applications",icon:FileText},
  {key:"applicationsToday",label:"Today",description:"Applications today",icon:CalendarCheck},
  {key:"applicationsThisMonth",label:"This Month",description:"Monthly applications",icon:CalendarDays},
  {key:"openJobs",label:"Open Positions",description:"Published jobs",icon:BriefcaseBusiness},
  {key:"openVacancies",label:"Vacancies",description:"Available openings",icon:UserRoundCheck}
];

const StatSkeleton=()=>(
  <div className="rounded-2xl border border-[#E5EAE6] bg-white p-4 sm:p-5">
    <div className="h-10 w-10 animate-pulse rounded-xl bg-[#EEF2EF]"/>
    <div className="mt-5 h-7 w-16 animate-pulse rounded-md bg-[#EEF2EF]"/>
    <div className="mt-3 h-3 w-24 animate-pulse rounded bg-[#F1F4F2]"/>
  </div>
);

const RecruitmentStats=({stats={},loading=false})=>{
  if(loading) return(
    <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
      {STAT_CONFIG.map(item=><StatSkeleton key={item.key}/>)}
    </section>
  );

  return(
    <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
      {STAT_CONFIG.map(({key,label,description,icon:Icon},index)=>{
        const value=Number(stats?.[key])||0;
        return(
          <motion.article key={key} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.3,delay:index*.04}} whileHover={{y:-2}} className="group min-w-0 rounded-2xl border border-[#E3E9E4] bg-white p-4 transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(31,60,40,.07)] sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF7F0] text-[#1E7A3A] transition-colors group-hover:bg-[#E4F2E8]">
                <Icon className="h-[18px] w-[18px]"/>
              </div>
              {key==="applicationsToday"&&value>0&&<span className="rounded-full bg-[#F0F7F2] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#448158]">Live</span>}
            </div>

            <div className="mt-4 sm:mt-5">
              <p className="text-2xl font-semibold tracking-[-.04em] text-[#1D2D22] sm:text-[28px]">{value.toLocaleString()}</p>
              <p className="mt-1.5 truncate text-xs font-semibold text-[#46534A] sm:text-[13px]">{label}</p>
              <p className="mt-1 hidden truncate text-[11px] text-[#939D96] sm:block">{description}</p>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
};

export default RecruitmentStats;