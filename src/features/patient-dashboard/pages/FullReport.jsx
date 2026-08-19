import {useMemo,useRef,useState} from "react";
import {useNavigate,useOutletContext} from "react-router-dom";
import {ArrowLeft,CalendarDays,Download,Printer,Loader2} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PatientInformation from "../components/reports/PatientInformation";
import ClinicalAssessment from "../components/reports/ClinicalAssessment";
import LifestyleAssessment from "../components/reports/LifestyleAssessment";
import RiskAssessment from "../components/reports/RiskAssessment";
import AyurvedaAssessment from "../components/reports/AyurvedaAssessment";
import DoctorNotes from "../components/reports/DoctorNotes";
import MetricCard from "../components/reports/MetricCard";
import logo from "@/assets/images/logos.png";

export default function FullReport(){
  const navigate=useNavigate(),reportRef=useRef(null);
  const [downloading,setDownloading]=useState(false);
  const {patientData}=useOutletContext();

  const patient=patientData?.profile?.patient??{};
  const report=patientData?.report?.patient??{};
  const assessment=patientData?.assessment?.data??{};
  const clinical=report?.clinical_answers??{};
  const lifestyle=report?.matrix_answers??{};
  const ayurveda=report?.final_ayurveda_result??{};
  const ai=assessment?.ai_response??report?.ai_response??{};

  const metrics=useMemo(()=>[
    {title:"Health Score",value:report?.composite_score??assessment?.composite_score??"--",color:"emerald"},
    {title:"Risk Band",value:report?.risk_band??assessment?.risk_band??"--",color:"red"},
    {title:"Primary Dosha",value:ayurveda?.primary_dosha??"--",color:"amber"},
    {title:"Agni",value:ayurveda?.agni?.agni_type?.split("(")[0]?.trim()??"--",color:"blue"}
  ],[report,assessment,ayurveda]);

  const generatedDate=new Date(
    report?.updated_at??report?.created_at??assessment?.created_at??Date.now()
  ).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});

  const downloadPDF=async()=>{
    if(!reportRef.current||downloading)return;
    setDownloading(true);

    try{
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));

      const element=reportRef.current;
      const canvas=await html2canvas(element,{
        scale:2,
        useCORS:true,
        allowTaint:false,
        backgroundColor:"#ffffff",
        logging:false,
        imageTimeout:15000,
        windowWidth:element.scrollWidth,
        windowHeight:element.scrollHeight
      });

      const pdf=new jsPDF("p","mm","a4");
      const pageWidth=210,pageHeight=297;
      const margin=12,headerHeight=20,footerHeight=10;
      const contentWidth=pageWidth-margin*2;
      const contentHeight=pageHeight-margin-headerHeight-footerHeight;
      const scale=contentWidth/canvas.width;
      const sliceHeight=Math.floor(contentHeight/scale);
      let offset=0,page=0;

      const logoImg=new Image();
      logoImg.src=logo;
      await new Promise(resolve=>{
        logoImg.onload=resolve;
        logoImg.onerror=resolve;
      });

      while(offset<canvas.height){
        if(page>0)pdf.addPage();

        const slice=document.createElement("canvas");
        slice.width=canvas.width;
        slice.height=Math.min(sliceHeight,canvas.height-offset);

        const ctx=slice.getContext("2d");
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,slice.width,slice.height);
        ctx.drawImage(
          canvas,
          0,offset,canvas.width,slice.height,
          0,0,canvas.width,slice.height
        );

        const imageHeight=slice.height*scale;

        pdf.addImage(
          slice.toDataURL("image/jpeg",0.96),
          "JPEG",
          margin,
          margin+headerHeight,
          contentWidth,
          imageHeight,
          undefined,
          "FAST"
        );

        if(logoImg.complete&&logoImg.naturalWidth){
          const logoWidth=28;
          const logoHeight=(logoImg.naturalHeight/logoImg.naturalWidth)*logoWidth;
          pdf.addImage(logoImg,"PNG",margin,5,logoWidth,logoHeight);
        }

        pdf.setFont("helvetica","normal");
        pdf.setFontSize(8);
        pdf.setTextColor(90,100,110);
        pdf.text(
          "Darshai | AI-Powered Geo-Wellness & Longevity Platform",
          pageWidth-margin,
          10,
          {align:"right"}
        );

        pdf.setFontSize(7);
        pdf.setTextColor(120,120,120);
        pdf.text(
          `Page ${page+1}`,
          pageWidth-margin,
          pageHeight-5,
          {align:"right"}
        );

        offset+=slice.height;
        page++;
      }

      const safeName=(patient?.name||"Patient")
        .replace(/[^a-z0-9]+/gi,"-")
        .replace(/^-|-$/g,"");

      pdf.save(`DarshAI-Health-Report-${safeName||"Patient"}.pdf`);
    }catch(error){
      console.error("PDF DOWNLOAD ERROR:",error);
      alert("Unable to download the PDF. Please try again.");
    }finally{
      setDownloading(false);
    }
  };

  return(
    <>
      <div className="mx-auto max-w-7xl space-y-8 print:max-w-none print:space-y-0">
        <div
          id="print-report"
          ref={reportRef}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm print:overflow-visible print:rounded-none print:border-0 print:shadow-none"
        >
          <div className="print-page-header">
            <img src={logo} alt="DarshAI"/>
            <span>Darshai | AI-Powered Geo-Wellness & Longevity Platform</span>
          </div>

          <div className="border-b border-slate-200 p-8 print:px-0 print:pb-8 print:pt-0">
            <button
              onClick={()=>navigate("/patient-dashboard/reports")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600 print:hidden"
            >
              <ArrowLeft className="h-4 w-4"/>
              Back to Reports
            </button>

            <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#C9A75B]">
              Comprehensive Report
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Complete Health Report
            </h1>

            <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">
              <span>
                <strong className="text-slate-700">Patient:</strong>{" "}
                {patient?.name??"--"}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 print:hidden"/>
                {generatedDate}
              </span>

              <span>
                <strong className="text-slate-700">Risk:</strong>{" "}
                {report?.risk_band??assessment?.risk_band??"--"}
              </span>
            </div>
          </div>

          <div className="grid gap-5 border-b border-slate-200 p-8 md:grid-cols-2 xl:grid-cols-4 print:grid-cols-2 print:p-8">
            {metrics.map(item=>(
              <div key={item.title} className="print-avoid-break">
                <MetricCard
                  title={item.title}
                  value={item.value}
                  color={item.color}
                />
              </div>
            ))}
          </div>

          <div className="p-8 print:p-8 print-avoid-break">
            <PatientInformation patient={patient}/>
          </div>

          <div className="border-t border-slate-200 p-8 print:p-8">
            <ClinicalAssessment clinical={clinical}/>
          </div>

          <div className="border-t border-slate-200 p-8 print:p-8">
            <LifestyleAssessment lifestyle={lifestyle}/>
          </div>

          <div className="border-t border-slate-200 p-8 print:p-8">
            <RiskAssessment assessment={assessment} ai={ai}/>
          </div>

          <div className="border-t border-slate-200 p-8 print:p-8">
            <AyurvedaAssessment ayurveda={ayurveda}/>
          </div>

          <div className="border-t border-slate-200 p-8 print:p-8">
            <DoctorNotes doctor={report}/>
          </div>
        </div>

        <div className="flex justify-end gap-3 py-6 print:hidden">

          <button
            type="button"
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 rounded-xl bg-[#06152A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A2342] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {downloading
              ? <Loader2 className="h-4 w-4 animate-spin"/>
              : <Download className="h-4 w-4"/>}
            {downloading?"Generating PDF...":"Download PDF"}
          </button>
        </div>
      </div>

      <style>{`
        .print-page-header{display:none}

        @media print{
          @page{
            size:A4;
            margin:22mm 12mm 16mm;
          }

          html,
          body,
          #root{
            width:100%!important;
            min-height:100%!important;
            height:auto!important;
            margin:0!important;
            padding:0!important;
            overflow:visible!important;
            background:#fff!important;
            -webkit-print-color-adjust:exact!important;
            print-color-adjust:exact!important;
          }

          body{
            color:#0f172a!important;
          }

          /* Hide dashboard chrome but keep report in normal document flow */
          body>header,
          body>aside,
          nav,
          .print\\:hidden{
            display:none!important;
          }

          /* Remove clipping from dashboard layout parents */
          #root,
          #root>div,
          #root main,
          #root main>div{
            overflow:visible!important;
            height:auto!important;
            min-height:0!important;
            max-height:none!important;
          }

          #print-report{
            position:static!important;
            display:block!important;
            width:100%!important;
            max-width:none!important;
            height:auto!important;
            min-height:0!important;
            max-height:none!important;
            margin:0!important;
            padding:0!important;
            overflow:visible!important;
            border:0!important;
            border-radius:0!important;
            box-shadow:none!important;
            background:#fff!important;
          }

          /* Header repeats on every printed page */
          .print-page-header{
            position:fixed!important;
            top:-17mm!important;
            left:0!important;
            right:0!important;
            height:14mm!important;
            display:flex!important;
            align-items:center!important;
            justify-content:space-between!important;
            padding:0!important;
            background:#fff!important;
            border-bottom:1px solid #e2e8f0!important;
            color:#64748b!important;
            font-size:8px!important;
            font-weight:600!important;
            z-index:999999!important;
            visibility:visible!important;
          }

          .print-page-header img{
            display:block!important;
            width:24px!important;
            height:24px!important;
            object-fit:contain!important;
          }

          .print-page-header span{
            display:block!important;
            white-space:nowrap!important;
          }

          /* Preserve colours */
          #print-report,
          #print-report *{
            -webkit-print-color-adjust:exact!important;
            print-color-adjust:exact!important;
          }

          /* Do not force report sections into one page */
          .print-avoid-break{
            break-inside:avoid;
            page-break-inside:avoid;
          }

          /* Keep headings with their content */
          h1,
          h2,
          h3,
          h4{
            break-after:avoid;
            page-break-after:avoid;
          }

          /* Allow long sections to continue naturally */
          section,
          article{
            break-inside:auto;
            page-break-inside:auto;
          }

          /* Avoid awkward empty pages */
          .border-t,
          .border-b{
            break-inside:auto;
            page-break-inside:auto;
          }

          img{
            max-width:100%!important;
          }

          svg{
            -webkit-print-color-adjust:exact!important;
            print-color-adjust:exact!important;
          }

          [class*="shadow"]{
            box-shadow:none!important;
          }

          /* Make sure print controls never appear */
          button,
          [role="button"]{
            display:none!important;
          }
        }
      `}</style>
    </>
  );
}