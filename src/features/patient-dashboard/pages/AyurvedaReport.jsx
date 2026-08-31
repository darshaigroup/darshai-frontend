import {useMemo,useRef,useState} from "react";
import {useNavigate,useOutletContext} from "react-router-dom";
import {ArrowLeft,CalendarDays,Download,Loader2} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PatientInformation from "../components/reports/PatientInformation";
import AyurvedaAssessment from "../components/reports/AyurvedaAssessment";
import DoctorNotes from "../components/reports/DoctorNotes";
import MetricCard from "../components/reports/MetricCard";
import logo from "@/assets/images/logos.png";

export default function AyurvedaReport(){
  const navigate=useNavigate(),reportRef=useRef(null);
  const [downloading,setDownloading]=useState(false);
  const {patientData}=useOutletContext();

  const patient=patientData?.profile?.patient??{};
  const report=patientData?.report?.patient??{};
  const assessment=patientData?.assessment?.data??{};
  const ayurveda=report?.final_ayurveda_result??{};

  const metrics=useMemo(()=>[
    {title:"Prakriti",value:ayurveda?.prakriti?.prakriti_type??"--",color:"emerald"},
    {title:"Primary Dosha",value:ayurveda?.primary_dosha??"--",color:"red"},
    {title:"Agni",value:ayurveda?.agni?.agni_type?.split("(")[0]?.trim()??"--",color:"amber"},
    {title:"Ama",value:ayurveda?.ama?.severity??"--",color:"blue"}
  ],[ayurveda]);

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
        ctx.drawImage(canvas,0,offset,canvas.width,slice.height,0,0,canvas.width,slice.height);

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
          const logoWidth=24;
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
        pdf.text(`Page ${page+1}`,pageWidth-margin,pageHeight-5,{align:"right"});

        offset+=slice.height;
        page++;
      }

      const safeName=(patient?.name||"Ayurveda")
        .replace(/[^a-z0-9]+/gi,"-")
        .replace(/^-|-$/g,"");

      pdf.save(`DarshAI-Ayurveda-Report-${safeName||"Patient"}.pdf`);
    }catch(error){
      console.error("AYURVEDA PDF DOWNLOAD ERROR:",error);
      alert("Unable to download the PDF. Please try again.");
    }finally{
      setDownloading(false);
    }
  };

  return(
    <div className="mx-auto max-w-7xl space-y-8">
      <div
        id="ayurveda-report"
        ref={reportRef}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="report-page-header">
          <img src={logo} alt="DarshAI"/>
          <span>Darshai | AI-Powered Geo-Wellness & Longevity Platform</span>
        </div>

        <div className="border-b border-slate-200 p-8">
          <button
            onClick={()=>navigate("/patient-dashboard/reports")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4"/>
            Back to Reports
          </button>

          <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#C9A75B]">
            Ayurveda Assessment
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Ayurveda Health Report
          </h1>

          <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>
              <strong className="text-slate-700">Patient:</strong>{" "}
              {patient?.name??"--"}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4"/>
              {generatedDate}
            </span>
          </div>
        </div>

        <div className="grid gap-5 border-b border-slate-200 p-8 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(item=>(
            <div key={item.title} className="print-avoid-break">
              <MetricCard {...item}/>
            </div>
          ))}
        </div>

        <div className="p-8">
          <PatientInformation patient={patient}/>
        </div>

        <div className="border-t border-slate-200 p-8">
          <AyurvedaAssessment ayurveda={ayurveda}/>
        </div>

        <div className="border-t border-slate-200 p-8">
          <DoctorNotes doctor={report}/>
        </div>
      </div>

      {/* <div className="flex justify-end gap-3 py-6 print:hidden">
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
      </div> */}

      <style>{`
        .report-page-header{display:none}

        @media print{
          @page{
            size:A4;
            margin:22mm 12mm 16mm;
          }

          html,body,#root{
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

          #ayurveda-report{
            width:100%!important;
            max-width:none!important;
            height:auto!important;
            overflow:visible!important;
            border:0!important;
            border-radius:0!important;
            box-shadow:none!important;
          }

          .report-page-header{
            position:fixed!important;
            top:-17mm!important;
            left:0!important;
            right:0!important;
            height:14mm!important;
            display:flex!important;
            align-items:center!important;
            justify-content:space-between!important;
            background:#fff!important;
            border-bottom:1px solid #e2e8f0!important;
            color:#64748b!important;
            font-size:8px!important;
            font-weight:600!important;
            z-index:999999!important;
          }

          .report-page-header img{
            display:block!important;
            width:24px!important;
            height:24px!important;
            object-fit:contain!important;
          }

          .report-page-header span{
            display:block!important;
            white-space:nowrap!important;
          }

          #ayurveda-report,
          #ayurveda-report *{
            -webkit-print-color-adjust:exact!important;
            print-color-adjust:exact!important;
          }

          .print-avoid-break{
            break-inside:avoid;
            page-break-inside:avoid;
          }

          button,[role="button"]{
            display:none!important;
          }

          [class*="shadow"]{
            box-shadow:none!important;
          }

          img{
            max-width:100%!important;
          }

          svg{
            -webkit-print-color-adjust:exact!important;
            print-color-adjust:exact!important;
          }
        }
      `}</style>
    </div>
  );
}