import {AnimatePresence,motion} from "framer-motion";
import {Download,ExternalLink,FileText,Loader2,RefreshCw,X} from "lucide-react";

const formatFileSize=size=>{
  if(!size) return "—";
  const kb=1024,mb=kb*1024;
  if(size>=mb) return `${(size/mb).toFixed(2)} MB`;
  return `${(size/kb).toFixed(1)} KB`;
};

const ResumeViewer=({open=false,resume=null,loading=false,error="",onClose})=>(
<AnimatePresence>
{open&&<>
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"/>

<motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}} transition={{duration:.25}} className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">

<div className="flex h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

<div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E5EBE6] px-5">

<div className="min-w-0">
<p className="text-xs font-semibold uppercase tracking-[.15em] text-[#1E7A3A]">Resume Viewer</p>
<h2 className="truncate text-base font-semibold text-[#243128]">{resume?.fileName||"Candidate Resume"}</h2>
</div>

<div className="flex items-center gap-2">

{resume?.signedUrl&&<>
<a href={resume.signedUrl} download={resume.fileName} className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#F3F7F4]">
<Download className="h-5 w-5"/>
</a>

<a href={resume.signedUrl} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#F3F7F4]">
<ExternalLink className="h-5 w-5"/>
</a>
</>}

<button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#F3F7F4]">
<X className="h-5 w-5"/>
</button>

</div>
</div>

<div className="flex h-14 shrink-0 items-center justify-between border-b border-[#EEF2EF] bg-[#FAFCFA] px-5 text-xs text-[#66736A]">

<div className="flex flex-wrap gap-5">
<div><span className="font-semibold">Type</span> {resume?.mimeType||"—"}</div>
<div><span className="font-semibold">Size</span> {formatFileSize(resume?.fileSize)}</div>
<div><span className="font-semibold">Expires</span> {resume?.expiresIn||0}s</div>
</div>

</div>

<div className="relative flex-1 bg-[#EDF2EE]">

{loading&&(
<div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
<Loader2 className="h-8 w-8 animate-spin text-[#1E7A3A]"/>
<p className="mt-4 text-sm font-medium text-[#344239]">Loading Resume...</p>
</div>
)}

{error&&!loading&&(
<div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
<FileText className="h-10 w-10 text-red-500"/>
<p className="mt-4 text-lg font-semibold">Unable to load resume</p>
<p className="mt-2 text-sm text-[#6F7A72]">{error}</p>
<button onClick={()=>window.location.reload()} className="mt-5 flex items-center gap-2 rounded-xl bg-[#1E7A3A] px-4 py-2 text-white">
<RefreshCw className="h-4 w-4"/>
Reload
</button>
</div>
)}

{resume?.signedUrl&&!loading&&!error&&(
<iframe
title="Candidate Resume"
src={resume.signedUrl}
className="h-full w-full border-0"
/>
)}

</div>

</div>

</motion.div>
</>}
</AnimatePresence>
);

export default ResumeViewer;