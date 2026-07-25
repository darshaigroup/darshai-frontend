import { useMemo,useRef,useState,useEffect } from "react";
import { useNavigate,useOutletContext } from "react-router-dom";
import { ArrowLeft,CalendarDays,Download,Printer } from "lucide-react";
import html2pdf from "html2pdf.js";
import PatientInformation from "../components/reports/PatientInformation";
import LifestyleAssessment from "../components/reports/LifestyleAssessment";
import DoctorNotes from "../components/reports/DoctorNotes";
import MetricCard from "../components/reports/MetricCard";

export default function LifestyleReport(){
  const navigate=useNavigate(),reportRef=useRef(null);
  const [isPrinting,setIsPrinting]=useState(false);
  const {patientData}=useOutletContext();

  const patient=patientData?.profile?.patient??{};
  const report=patientData?.report?.patient??{};
  const assessment=patientData?.assessment?.data??{};
  const lifestyle=report?.matrix_answers??{};

  const metrics=useMemo(()=>[
    {title:"Living Environment",value:lifestyle?.living_environment??"--",color:"emerald"},
    {title:"Activity Level",value:lifestyle?.activity_intensity??"--",color:"blue"},
    {title:"Food Style",value:lifestyle?.food_style??"--",color:"amber"},
    {title:"Travel Frequency",value:lifestyle?.travel_frequency??"--",color:"red"}
  ],[lifestyle]);

  const generatedDate=new Date(report?.updated_at??report?.created_at??assessment?.created_at??Date.now()).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});

  useEffect(()=>{
    const after=()=>setIsPrinting(false);
    window.addEventListener("afterprint",after);
    return()=>window.removeEventListener("afterprint",after);
  },[]);

  const handlePrint=()=>{
    setIsPrinting(true);
    requestAnimationFrame(()=>setTimeout(()=>window.print(),250));
  };

  const handleDownload=()=>{
    if(!reportRef.current)return;
    html2pdf().set({
      margin:.4,
      filename:`${patient?.name??"Lifestyle"}-Report.pdf`,
      image:{type:"jpeg",quality:1},
      html2canvas:{scale:2,useCORS:true,scrollY:0},
      jsPDF:{unit:"in",format:"a4",orientation:"portrait"},
      pagebreak:{mode:["css","legacy"]}
    }).from(reportRef.current).save();
  };

  return(
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {!isPrinting&&(
          <>
            <div className="no-print flex flex-col gap-6 border-b border-slate-200 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button onClick={()=>navigate("/patient-dashboard/reports")} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600"><ArrowLeft className="h-4 w-4"/>Back to Reports</button>
                <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#C9A75B]">Lifestyle Assessment</p>
                <h1 className="mt-2 text-4xl font-bold text-slate-900">Lifestyle & Wellness Report</h1>
                <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">
                  <span><strong className="text-slate-700">Patient:</strong> {patient?.name??"--"}</span>
                  <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/>{generatedDate}</span>
                </div>
              </div>
            </div>

            <div className="no-print grid gap-5 border-b border-slate-200 p-8 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map(item=><MetricCard key={item.title} {...item}/>)}
            </div>
          </>
        )}

        <div ref={reportRef} className="bg-white">

          {isPrinting&&(
            <div className="border-b border-slate-300 px-10 py-8 text-center">
              <h1 className="text-3xl font-bold text-[#1E7A3A]">DARSHAI</h1>
              <p className="mt-1 text-lg font-semibold text-slate-700">Lifestyle & Wellness Assessment Report</p>
              <p className="mt-2 text-sm text-slate-500">Generated on {generatedDate}</p>
            </div>
          )}

          <div className="p-8">
            <PatientInformation patient={patient} printable={isPrinting}/>
          </div>

          <div className="border-t border-slate-200 p-8">
            <LifestyleAssessment lifestyle={lifestyle} printable={isPrinting}/>
          </div>

          <div className="border-t border-slate-200 p-8">
            <DoctorNotes doctor={report} printable={isPrinting}/>
          </div>

          {isPrinting&&(
            <div className="border-t border-slate-300 px-10 py-6 text-center text-xs text-slate-500">
              <p>Confidential Medical Report • Darshai AI Native Longevity Platform</p>
            </div>
          )}

        </div>

        {!isPrinting&&(
          <div className="no-print flex justify-end gap-4 border-t border-slate-200 bg-slate-50 p-8">
            <button onClick={handlePrint} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"><Printer className="h-5 w-5"/>Print Report</button>
            <button onClick={handleDownload} className="flex items-center gap-2 rounded-xl bg-[#06152A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0A2342]"><Download className="h-5 w-5"/>Download PDF</button>
          </div>
        )}

      </div>
    </div>
  );
}