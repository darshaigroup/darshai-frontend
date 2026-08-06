// import {AnimatePresence,motion} from "framer-motion";
// import {Download,ExternalLink,FileText,Loader2,RefreshCw,X} from "lucide-react";

// const formatFileSize=size=>{
//   if(!size) return "—";
//   const kb=1024,mb=kb*1024;
//   if(size>=mb) return `${(size/mb).toFixed(2)} MB`;
//   return `${(size/kb).toFixed(1)} KB`;
// };

// const ResumeViewer=({open=false,resume=null,loading=false,error="",onClose})=>(
// <AnimatePresence>
// {open&&<>
// <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"/>

// <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}} transition={{duration:.25}} className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">

// <div className="flex h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

// <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E5EBE6] px-5">

// <div className="min-w-0">
// <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#1E7A3A]">Resume Viewer</p>
// <h2 className="truncate text-base font-semibold text-[#243128]">{resume?.fileName||"Candidate Resume"}</h2>
// </div>

// <div className="flex items-center gap-2">

// {resume?.signedUrl&&<>
// <a href={resume.signedUrl} download={resume.fileName} className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#F3F7F4]">
// <Download className="h-5 w-5"/>
// </a>

// <a href={resume.signedUrl} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#F3F7F4]">
// <ExternalLink className="h-5 w-5"/>
// </a>
// </>}

// <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-[#F3F7F4]">
// <X className="h-5 w-5"/>
// </button>

// </div>
// </div>

// <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#EEF2EF] bg-[#FAFCFA] px-5 text-xs text-[#66736A]">

// <div className="flex flex-wrap gap-5">
// <div><span className="font-semibold">Type</span> {resume?.mimeType||"—"}</div>
// <div><span className="font-semibold">Size</span> {formatFileSize(resume?.fileSize)}</div>
// <div><span className="font-semibold">Expires</span> {resume?.expiresIn||0}s</div>
// </div>

// </div>

// <div className="relative flex-1 bg-[#EDF2EE]">

// {loading&&(
// <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
// <Loader2 className="h-8 w-8 animate-spin text-[#1E7A3A]"/>
// <p className="mt-4 text-sm font-medium text-[#344239]">Loading Resume...</p>
// </div>
// )}

// {error&&!loading&&(
// <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
// <FileText className="h-10 w-10 text-red-500"/>
// <p className="mt-4 text-lg font-semibold">Unable to load resume</p>
// <p className="mt-2 text-sm text-[#6F7A72]">{error}</p>
// <button onClick={()=>window.location.reload()} className="mt-5 flex items-center gap-2 rounded-xl bg-[#1E7A3A] px-4 py-2 text-white">
// <RefreshCw className="h-4 w-4"/>
// Reload
// </button>
// </div>
// )}

// {resume?.signedUrl&&!loading&&!error&&(
// <iframe
// title="Candidate Resume"
// src={resume.signedUrl}
// className="h-full w-full border-0"
// />
// )}

// </div>

// </div>

// </motion.div>
// </>}
// </AnimatePresence>
// );

// export default ResumeViewer;

import {AnimatePresence,motion} from "framer-motion";
import {Download,ExternalLink,FileText,Loader2,RefreshCw,X} from "lucide-react";

const formatFileSize=size=>{
  if(!size) return "—";
  const kb=1024,mb=kb*1024;
  if(size>=mb) return `${(size/mb).toFixed(2)} MB`;
  return `${(size/kb).toFixed(1)} KB`;
};

const getFileType=resume=>{
  const mime=String(resume?.mimeType||"").toLowerCase();
  const name=String(resume?.fileName||"").toLowerCase();

  if(mime==="application/pdf"||name.endsWith(".pdf")) return "pdf";

  if(
    mime==="application/msword"||
    mime==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||
    name.endsWith(".doc")||
    name.endsWith(".docx")
  ) return "word";

  return "unknown";
};

const getViewerUrl=resume=>{
  if(!resume?.signedUrl) return "";

  const type=getFileType(resume);

  if(type==="pdf") return resume.signedUrl;

  if(type==="word"){
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(resume.signedUrl)}`;
  }

  return "";
};

const ResumeViewer=({open=false,resume=null,loading=false,error="",onClose})=>{
  const fileType=getFileType(resume);
  const viewerUrl=getViewerUrl(resume);

  return(
    <AnimatePresence>
      {open&&(
        <>
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:40}}
            transition={{duration:.25}}
            className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4"
          >
            <div className="flex h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

              {/* Header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E5EBE6] px-5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#1E7A3A]">
                    Resume Viewer
                  </p>

                  <h2 className="truncate text-base font-semibold text-[#243128]">
                    {resume?.fileName||"Candidate Resume"}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {resume?.signedUrl&&(
                    <>
                      <a
                        href={resume.signedUrl}
                        download={resume.fileName}
                        title="Download Resume"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-[#526158] transition hover:bg-[#F3F7F4] hover:text-[#1E7A3A]"
                      >
                        <Download className="h-5 w-5"/>
                      </a>

                      <a
                        href={resume.signedUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Resume"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-[#526158] transition hover:bg-[#F3F7F4] hover:text-[#1E7A3A]"
                      >
                        <ExternalLink className="h-5 w-5"/>
                      </a>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    title="Close"
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-[#526158] transition hover:bg-[#F3F7F4] hover:text-[#1E7A3A]"
                  >
                    <X className="h-5 w-5"/>
                  </button>
                </div>
              </div>

              {/* File Information */}
              <div className="flex min-h-14 shrink-0 items-center justify-between border-b border-[#EEF2EF] bg-[#FAFCFA] px-5 py-3 text-xs text-[#66736A]">
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <div>
                    <span className="font-semibold">Type </span>
                    {resume?.mimeType||"—"}
                  </div>

                  <div>
                    <span className="font-semibold">Size </span>
                    {formatFileSize(resume?.fileSize)}
                  </div>

                  <div>
                    <span className="font-semibold">Expires </span>
                    {resume?.expiresIn||0}s
                  </div>
                </div>
              </div>

              {/* Viewer */}
              <div className="relative flex-1 overflow-hidden bg-[#EDF2EE]">

                {/* Loading */}
                {loading&&(
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
                    <Loader2 className="h-8 w-8 animate-spin text-[#1E7A3A]"/>

                    <p className="mt-4 text-sm font-medium text-[#344239]">
                      Loading Resume...
                    </p>
                  </div>
                )}

                {/* API Error */}
                {error&&!loading&&(
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                      <FileText className="h-8 w-8 text-red-500"/>
                    </div>

                    <p className="mt-4 text-lg font-semibold text-[#243128]">
                      Unable to load resume
                    </p>

                    <p className="mt-2 max-w-md text-sm leading-6 text-[#6F7A72]">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={()=>window.location.reload()}
                      className="mt-5 flex items-center gap-2 rounded-xl bg-[#1E7A3A] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17652F]"
                    >
                      <RefreshCw className="h-4 w-4"/>
                      Reload
                    </button>
                  </div>
                )}

                {/* PDF */}
                {!loading&&!error&&fileType==="pdf"&&viewerUrl&&(
                  <iframe
                    key={viewerUrl}
                    title="Candidate Resume PDF"
                    src={viewerUrl}
                    className="h-full w-full border-0"
                  />
                )}

                {/* DOC / DOCX */}
                {!loading&&!error&&fileType==="word"&&viewerUrl&&(
                  <iframe
                    key={viewerUrl}
                    title="Candidate Resume Document"
                    src={viewerUrl}
                    className="h-full w-full border-0 bg-white"
                    allowFullScreen
                  />
                )}

                {/* Unsupported */}
                {!loading&&!error&&fileType==="unknown"&&(
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF7F0]">
                      <FileText className="h-8 w-8 text-[#1E7A3A]"/>
                    </div>

                    <p className="mt-4 text-lg font-semibold text-[#243128]">
                      Preview unavailable
                    </p>

                    <p className="mt-2 max-w-md text-sm leading-6 text-[#6F7A72]">
                      This file format cannot be previewed directly. You can download the resume to view it.
                    </p>

                    {resume?.signedUrl&&(
                      <a
                        href={resume.signedUrl}
                        download={resume.fileName}
                        className="mt-5 flex items-center gap-2 rounded-xl bg-[#1E7A3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#17652F]"
                      >
                        <Download className="h-4 w-4"/>
                        Download Resume
                      </a>
                    )}
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeViewer;