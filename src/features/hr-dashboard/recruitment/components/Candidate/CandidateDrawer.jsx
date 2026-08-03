import {AlertCircle,FileText,Loader2,Mail,Phone,X} from "lucide-react";
import {AnimatePresence,motion} from "framer-motion";
import CandidateOverview from "./CandidateOverview";

const getInitials=name=>{
  const parts=String(name||"").trim().split(/\s+/).filter(Boolean);
  return parts.length?parts.slice(0,2).map(part=>part[0]?.toUpperCase()).join(""):"NA";
};

const CandidateDrawer=({open=false,application=null,loading=false,error="",onClose,onResume})=>{
  const handleResume=()=>{
    if(application?.resumeId) onResume?.(application.resumeId);
  };

  return(
    <AnimatePresence>
      {open&&(
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}} onClick={onClose} className="fixed inset-0 z-40 bg-[#132018]/30 backdrop-blur-[2px]"/>

          <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:30,stiffness:320}} role="dialog" aria-modal="true" aria-label="Candidate application details" className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-[#F8FAF8] shadow-[-20px_0_60px_rgba(20,40,26,.12)] sm:max-w-[540px] lg:max-w-[620px]">
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#E4EAE5] bg-white px-4 sm:h-[74px] sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#1E7A3A]">Application Details</p>
                <h2 className="mt-1 truncate text-base font-semibold text-[#233329]">Candidate Profile</h2>
              </div>

              <button type="button" onClick={onClose} aria-label="Close candidate details" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#718078] transition hover:bg-[#F0F4F1] hover:text-[#25352A]">
                <X className="h-5 w-5"/>
              </button>
            </div>

            {loading?(
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF7F0] text-[#1E7A3A]"><Loader2 className="h-5 w-5 animate-spin"/></div>
                  <p className="mt-4 text-sm font-semibold text-[#344239]">Loading candidate</p>
                  <p className="mt-1 text-xs text-[#929D95]">Fetching application details...</p>
                </div>
              </div>
            ):error?(
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="max-w-sm text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500"><AlertCircle className="h-5 w-5"/></div>
                  <h3 className="mt-4 text-sm font-semibold text-[#344239]">Unable to load candidate</h3>
                  <p className="mt-2 text-xs leading-5 text-[#8A958D]">{error}</p>
                  <button type="button" onClick={onClose} className="mt-5 h-10 rounded-xl border border-[#DFE6E1] bg-white px-4 text-sm font-semibold text-[#56635A] transition hover:bg-[#F5F8F6]">Close</button>
                </div>
              </div>
            ):application&&(
              <>
                <div className="flex-1 overflow-y-auto">
                  <section className="border-b border-[#E6ECE7] bg-white px-4 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F4EB] text-base font-bold text-[#1E7A3A] sm:h-16 sm:w-16 sm:text-lg">{getInitials(application.fullName)}</div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-semibold tracking-[-.02em] text-[#213127] sm:text-xl">{application.fullName||"Unknown Candidate"}</h3>
                            <p className="mt-1 truncate text-xs font-medium text-[#849087]">{application.candidateCode||"Candidate code unavailable"}</p>
                          </div>

                          <span className="w-fit shrink-0 rounded-full border border-[#CDE4D3] bg-[#EDF7F0] px-2.5 py-1 text-[10px] font-semibold text-[#347849]">{application.status||"Unknown"}</span>
                        </div>

                        <div className="mt-3 flex flex-col gap-1.5 text-xs text-[#68756D] sm:flex-row sm:flex-wrap sm:gap-x-4">
                          {application.email&&<a href={`mailto:${application.email}`} className="flex min-w-0 items-center gap-1.5 transition hover:text-[#1E7A3A]"><Mail className="h-3.5 w-3.5 shrink-0"/><span className="truncate">{application.email}</span></a>}
                          {application.phone&&<a href={`tel:${application.phone}`} className="flex items-center gap-1.5 transition hover:text-[#1E7A3A]"><Phone className="h-3.5 w-3.5 shrink-0"/><span>{application.phone}</span></a>}
                        </div>
                      </div>
                    </div>
                  </section>

                  <CandidateOverview application={application}/>
                </div>

                <div className="shrink-0 border-t border-[#E1E8E3] bg-white p-4 sm:px-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onClose} className="h-11 rounded-xl border border-[#DDE5DF] bg-white px-5 text-sm font-semibold text-[#5C6960] transition hover:bg-[#F5F8F6]">Close</button>

                    <button type="button" onClick={handleResume} disabled={!application.resumeId} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1E7A3A] px-5 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(30,122,58,.16)] transition hover:bg-[#17652F] disabled:cursor-not-allowed disabled:bg-[#B7C3BA] disabled:shadow-none">
                      <FileText className="h-4 w-4"/>
                      {application.resumeId?"View Resume":"Resume Unavailable"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CandidateDrawer;