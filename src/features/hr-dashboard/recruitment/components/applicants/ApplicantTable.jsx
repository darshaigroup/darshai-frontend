import {Eye,FileText,Mail,MapPin,MoreHorizontal,Phone,UserRound} from "lucide-react";
import {motion} from "framer-motion";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

const formatDate=value=>{
  if(!value) return "—";
  const date=new Date(value);
  return Number.isNaN(date.getTime())?"—":date.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
};

const getInitials=name=>{
  const parts=String(name||"").trim().split(/\s+/).filter(Boolean);
  return parts.length?parts.slice(0,2).map(part=>part[0]?.toUpperCase()).join(""):"NA";
};

const getStatusClass=status=>{
  switch(String(status||"").toLowerCase()){
    case "applied":return "border-blue-100 bg-blue-50 text-blue-700";
    case "screening":return "border-amber-100 bg-amber-50 text-amber-700";
    case "shortlisted":return "border-violet-100 bg-violet-50 text-violet-700";
    case "interview":return "border-cyan-100 bg-cyan-50 text-cyan-700";
    case "selected":return "border-emerald-100 bg-emerald-50 text-emerald-700";
    case "rejected":return "border-red-100 bg-red-50 text-red-600";
    default:return "border-[#DFE6E1] bg-[#F4F7F5] text-[#68756D]";
  }
};

const ResumeButton=({application,onResume})=>{
  if(!application.resumeId) return <span className="text-xs text-[#A0AAA3]">Not available</span>;

  return(
    <button type="button" onClick={e=>{e.stopPropagation();onResume?.(application.resumeId);}} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DCE6DF] bg-white px-2.5 text-xs font-semibold text-[#1E7A3A] transition hover:border-[#B9D5C0] hover:bg-[#F1F8F3]">
      <FileText className="h-3.5 w-3.5"/>View
    </button>
  );
};

const MobileCard=({application,index,onView,onResume})=>(
  <motion.article initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.22,delay:index*.025}} onClick={()=>onView?.(application.applicationId)} className="cursor-pointer rounded-2xl border border-[#E3E9E4] bg-white p-4 transition active:scale-[.995]">
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF4EC] text-xs font-bold text-[#1E7A3A]">{getInitials(application.fullName)}</div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#25352A]">{application.fullName||"Unknown Candidate"}</p>
            <p className="mt-0.5 truncate text-[10px] font-medium text-[#929D95]">{application.candidateCode||"—"}</p>
          </div>
          <span className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-semibold ${getStatusClass(application.status)}`}>{application.status||"Unknown"}</span>
        </div>

        <div className="mt-3">
          <p className="truncate text-xs font-semibold text-[#455249]">{application.jobTitle||"Position unavailable"}</p>
          <p className="mt-0.5 truncate text-[10px] text-[#929D95]">{application.department||"Department unavailable"}</p>
        </div>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#EEF2EF] pt-3 text-[11px]">
      <div className="min-w-0">
        <p className="text-[#9AA49D]">Qualification</p>
        <p className="mt-0.5 truncate font-medium text-[#56635A]">{application.qualification||"—"}</p>
      </div>
      <div>
        <p className="text-[#9AA49D]">Applied</p>
        <p className="mt-0.5 font-medium text-[#56635A]">{formatDate(application.appliedAt)}</p>
      </div>
    </div>

    <div className="mt-3 flex items-center justify-between gap-2">
      <ResumeButton application={application} onResume={onResume}/>
      <button type="button" onClick={e=>{e.stopPropagation();onView?.(application.applicationId);}} className="flex h-8 items-center gap-1.5 rounded-lg bg-[#1E7A3A] px-3 text-xs font-semibold text-white transition hover:bg-[#17652F]">
        <Eye className="h-3.5 w-3.5"/>Details
      </button>
    </div>
  </motion.article>
);

const ApplicantTable=({applications=[],loading=false,onView,onResume})=>{
  const rows=Array.isArray(applications)?applications:[];

  if(loading) return <TableSkeleton/>;

  if(!rows.length) return <EmptyState icon={UserRound} title="No applications found" description="No candidate applications match the selected search or filters."/>;

  return(
    <>
      <div className="space-y-3 md:hidden">
        {rows.map((application,index)=><MobileCard key={application.applicationId||index} application={application} index={index} onView={onView} onResume={onResume}/>)}
      </div>

      <section className="hidden overflow-hidden rounded-2xl border border-[#E3E9E4] bg-white md:block lg:rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            <thead>
              <tr className="border-b border-[#E8EDE9] bg-[#F8FAF8]">
                <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981] lg:px-6">Candidate</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981]">Position</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981]">Education</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981]">Applied</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981]">Status</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981]">Resume</th>
                <th className="w-16 px-4 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[.1em] text-[#7E8981]">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((application,index)=>(
                <motion.tr key={application.applicationId||index} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.2,delay:index*.018}} onClick={()=>onView?.(application.applicationId)} className="group cursor-pointer border-b border-[#EEF2EF] transition-colors last:border-0 hover:bg-[#FAFCFA]">
                  <td className="px-5 py-4 lg:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4EC] text-[11px] font-bold text-[#1E7A3A]">{getInitials(application.fullName)}</div>
                      <div className="min-w-0">
                        <p className="max-w-[190px] truncate text-[13px] font-semibold text-[#29382E] group-hover:text-[#1E7A3A]">{application.fullName||"Unknown Candidate"}</p>
                        <p className="mt-1 max-w-[190px] truncate text-[10px] text-[#929D95]">{application.candidateCode||"—"}</p>
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-[#9AA49D]">
                          <Mail className="h-3 w-3"/><span className="max-w-[165px] truncate">{application.email||"—"}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="max-w-[180px] truncate text-xs font-semibold text-[#455249]">{application.jobTitle||"—"}</p>
                    <p className="mt-1 max-w-[180px] truncate text-[10px] text-[#929D95]">{application.department||"—"}{application.jobCode?` • ${application.jobCode}`:""}</p>
                    {application.location&&<div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#9AA49D]"><MapPin className="h-3 w-3"/><span className="max-w-[150px] truncate">{application.location}</span></div>}
                  </td>

                  <td className="px-4 py-4">
                    <p className="max-w-[170px] truncate text-xs font-medium text-[#56635A]">{application.qualification||"—"}</p>
                    <p className="mt-1 max-w-[170px] truncate text-[10px] text-[#929D95]">{application.specialization||"—"}</p>
                    {application.institutionName&&<p className="mt-1 max-w-[170px] truncate text-[10px] text-[#A0AAA3]">{application.institutionName}</p>}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <p className="text-xs font-medium text-[#56635A]">{formatDate(application.appliedAt)}</p>
                    <p className="mt-1 max-w-[125px] truncate text-[10px] text-[#9AA49D]">{application.applicationCode||"—"}</p>
                  </td>

                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusClass(application.status)}`}>{application.status||"Unknown"}</span>
                  </td>

                  <td className="px-4 py-4"><ResumeButton application={application} onResume={onResume}/></td>

                  <td className="px-4 py-4 text-center">
                    <button type="button" onClick={e=>{e.stopPropagation();onView?.(application.applicationId);}} aria-label={`View ${application.fullName||"candidate"}`} className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#7C8880] transition hover:bg-[#EDF7F0] hover:text-[#1E7A3A]">
                      <MoreHorizontal className="h-[18px] w-[18px]"/>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ApplicantTable;