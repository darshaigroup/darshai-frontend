import { useEffect,useState } from "react";
import { FaFilePdf,FaExternalLinkAlt } from "react-icons/fa";

const API_URL=import.meta.env.VITE_API_URL;

const LabReports=({ uploadedReports=[] })=>{
  const [reports,setReports]=useState([]);
  const [loading,setLoading]=useState(true);
  const [activeReport,setActiveReport]=useState(null);

  useEffect(()=>{
    const loadReports=async()=>{
      try{
        const token=localStorage.getItem("token");

        if(!token){
          setReports(uploadedReports||[]);
          return;
        }

        const normalized=Array.isArray(uploadedReports)
          ? uploadedReports
          : [];

        const reportsWithUrls=await Promise.all(
          normalized.map(async report=>{
            try{
              const response=await fetch(
                `${API_URL}/api/lab-reports/${report.id}/view`,
                {
                  headers:{
                    Authorization:`Bearer ${token}`,
                  },
                }
              );

              if(!response.ok) return report;

              const blob=await response.blob();

              return{
                ...report,
                previewUrl:URL.createObjectURL(blob),
              };
            }catch(error){
              console.error("LAB REPORT VIEW ERROR:",error);
              return report;
            }
          })
        );

        setReports(reportsWithUrls);
      }catch(error){
        console.error("LAB REPORT LOAD ERROR:",error);
        setReports(uploadedReports||[]);
      }finally{
        setLoading(false);
      }
    };

    loadReports();

    return()=>{
      reports.forEach(report=>{
        if(report.previewUrl){
          URL.revokeObjectURL(report.previewUrl);
        }
      });
    };
  },[uploadedReports]);

  if(loading){
    return(
      <div className="bg-white rounded-[28px] p-8 mt-6">
        <p className="text-sm text-slate-500">
          Loading clinical reports...
        </p>
      </div>
    );
  }

  if(!reports.length){
    return(
      <div className="bg-white rounded-[28px] p-8 mt-6">
        <h2 className="text-xl font-semibold text-[#173C68]">
          Clinical Reports
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          No clinical reports have been uploaded for this patient.
        </p>
      </div>
    );
  }

  return(
    <div className="bg-white rounded-[28px] shadow-sm p-6 md:p-8 mt-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#173C68]">
            Clinical Reports
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Uploaded laboratory and clinical documents
          </p>
        </div>

        <span className="px-4 py-2 rounded-full bg-[#F6F9F8] text-[#173C68] text-sm font-medium w-fit">
          {reports.length} {reports.length===1?"Report":"Reports"}
        </span>

      </div>

      <div className="space-y-4">

        {reports.map(report=>(
          <div
            key={report.id}
            className="rounded-[22px] border border-slate-100 bg-[#F8FAFC] overflow-hidden"
          >

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">

              <div className="flex items-center gap-4 min-w-0">

                <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-500 flex items-center justify-center text-white">
                  <FaFilePdf size={20}/>
                </div>

                <div className="min-w-0">

                  <h3 className="font-semibold text-[#173C68] truncate">
                    {report.original_name||report.file_name||"Clinical Report"}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {report.created_at
                      ? new Date(report.created_at).toLocaleDateString()
                      : "Clinical Document"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2 shrink-0">

                {report.previewUrl&&(
                  <button
                    onClick={()=>setActiveReport(
                      activeReport?.id===report.id
                        ? null
                        : report
                    )}
                    className="px-5 py-2.5 rounded-full bg-[#173C68] text-white text-sm font-medium hover:bg-[#102B4A] transition"
                  >
                    {activeReport?.id===report.id
                      ?"Close PDF"
                      :"View PDF"}
                  </button>
                )}

                {report.previewUrl&&(
                  <a
                    href={report.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#173C68] hover:bg-slate-50 transition"
                    title="Open PDF"
                  >
                    <FaExternalLinkAlt size={14}/>
                  </a>
                )}

              </div>

            </div>

            {activeReport?.id===report.id&&report.previewUrl&&(
              <div className="border-t border-slate-200 bg-slate-100 p-3 md:p-5">

                <div className="w-full h-[500px] md:h-[700px] rounded-2xl overflow-hidden bg-white shadow-inner">

                  <iframe
                    src={report.previewUrl}
                    title={report.original_name||"Clinical Report"}
                    className="w-full h-full border-0"
                  />

                </div>

              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default LabReports;