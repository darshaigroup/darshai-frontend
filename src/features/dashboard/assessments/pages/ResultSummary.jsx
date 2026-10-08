import { useLocation,useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import SummaryHeader from "../components/resultSummary/SummaryHeader";
import PatientDetails from "../components/resultSummary/PatientDetails";
import LifestyleMatrixSummary from "../components/resultSummary/LifestyleMatrixSummary";
import RiskSummary from "../components/resultSummary/RiskSummary";
import AyurvedaSummary from "../components/resultSummary/AyurvedaSummary";
import ClinicalSummary from "../components/resultSummary/ClinicalSummary";
import PractitionerNotes from "../components/resultSummary/PractitionerNotes";
import LabReports from "../components/resultSummary/LabReports";
import SummaryFooter from "../components/resultSummary/SummaryFooter";
import Watermark from "../components/resultSummary/Watermark";

const ResultSummary=()=>{
  const location=useLocation();
  const navigate=useNavigate();

  const {
    patient,
    riskReport,
    ayurvedaReport,
    lifestyleMatrix,
    clinicalReport,
    doctorNotes,
    selectedSignature,
    uploadedReports,
  }=location.state||{};

  const hasValue=(value)=>{
    if(Array.isArray(value))return value.length>0;
    return value!==undefined&&value!==null&&value!=="";
  };

  const getDisplayValue=(field,answers)=>{
    const value=answers?.[field];

    if(Array.isArray(value)){
      const otherValue=answers?.[`${field}_other`];

      return value
        .map((item)=>
          item==="Other"&&otherValue
            ?`Other (${otherValue})`
            :item,
        )
        .join(", ");
    }

    return value||"-";
  };

  const filteredLifestyleMatrix={
    ...lifestyleMatrix,
    matrix_answers:Object.entries(
      lifestyleMatrix?.matrix_answers||{},
    ).reduce((acc,[key,value])=>{
      if(hasValue(value)){
        acc[key]=Array.isArray(value)
          ?getDisplayValue(key,lifestyleMatrix.matrix_answers)
          :value;
      }

      return acc;
    },{}),
  };

  const downloadPDF=async()=>{
    const report=document.getElementById("summary-report");

    if(!report)return;

    const pdf=new jsPDF("p","mm","a4");

    const pdfWidth=pdf.internal.pageSize.getWidth();
    const pdfHeight=pdf.internal.pageSize.getHeight();

    const margin=8;
    const contentWidth=pdfWidth-margin*2;
    const contentHeight=pdfHeight-margin*2;

    const sections=Array.from(
      report.querySelectorAll("[data-pdf-section]"),
    );

    let currentY=margin;
    let isFirstPage=true;

    const addPage=()=>{
      pdf.addPage();
      currentY=margin;
    };

    for(const section of sections){
      const canvas=await html2canvas(section,{
        scale:2,
        useCORS:true,
        backgroundColor:"#ffffff",
        logging:false,
        windowWidth:report.scrollWidth,
      });

      const imageWidth=contentWidth;
      const imageHeight=
        (canvas.height*imageWidth)/canvas.width;

      /*
       * If the section doesn't fit in the remaining
       * space, start it on a new page.
       */
      if(
        !isFirstPage&&
        currentY!==margin&&
        currentY+imageHeight>pdfHeight-margin
      ){
        addPage();
      }

      /*
       * If one section is larger than a complete A4 page,
       * split only that section across pages.
       */
      if(imageHeight>contentHeight){
        let sourceY=0;

        const pagePixelHeight=Math.floor(
          (contentHeight/imageWidth)*canvas.width,
        );

        while(sourceY<canvas.height){
          if(!isFirstPage&&currentY!==margin){
            addPage();
          }

          isFirstPage=false;

          const remainingHeight=
            canvas.height-sourceY;

          const sliceHeight=Math.min(
            pagePixelHeight,
            remainingHeight,
          );

          const pageCanvas=document.createElement("canvas");

          pageCanvas.width=canvas.width;
          pageCanvas.height=sliceHeight;

          const ctx=pageCanvas.getContext("2d");

          ctx.fillStyle="#ffffff";
          ctx.fillRect(
            0,
            0,
            pageCanvas.width,
            pageCanvas.height,
          );

          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight,
          );

          const pageImage=pageCanvas.toDataURL("image/png");

          const pageImageHeight=
            (sliceHeight*imageWidth)/canvas.width;

          pdf.addImage(
            pageImage,
            "PNG",
            margin,
            currentY,
            imageWidth,
            pageImageHeight,
          );

          sourceY+=sliceHeight;
          currentY+=pageImageHeight;

          if(sourceY<canvas.height){
            addPage();
          }
        }

        continue;
      }

      isFirstPage=false;

      const imageData=canvas.toDataURL("image/png");

      pdf.addImage(
        imageData,
        "PNG",
        margin,
        currentY,
        imageWidth,
        imageHeight,
      );

      currentY+=imageHeight;
    }

    /*
     * Add page numbers after all report pages
     * have been created.
     */
    const totalPages=pdf.internal.getNumberOfPages();

    for(let i=1;i<=totalPages;i++){
      pdf.setPage(i);

      pdf.setFontSize(9);
      pdf.setTextColor(100,100,100);

      pdf.text(
        `Page ${i} of ${totalPages}`,
        pdfWidth-margin,
        pdfHeight-4,
        {
          align:"right",
        },
      );
    }

    pdf.save(
      `DarshAI_Report_${patient?.name||"Patient"}.pdf`,
    );
  };

  const printReport=()=>{
    window.print();
  };

  return(
    <div className="min-h-screen bg-slate-100 py-10">
      <Watermark />

      <div
        id="summary-report"
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <div data-pdf-section>
          <SummaryHeader
            patient={patient}
            onDownload={downloadPDF}
            onPrint={printReport}
          />
        </div>

        {/* Patient Details */}
        <div data-pdf-section>
          <PatientDetails patient={patient} />
        </div>

        {/* Lifestyle Matrix */}
        {/* 
        <div data-pdf-section>
          <LifestyleMatrixSummary
            lifestyleMatrixReport={filteredLifestyleMatrix}
          />
        </div>
        */}

        {/* Risk Summary */}
        <div data-pdf-section>
          <RiskSummary riskReport={riskReport} />
        </div>

        {/* Ayurveda Assessment */}
        <div data-pdf-section>
          <AyurvedaSummary
            ayurvedaReport={ayurvedaReport}
          />
        </div>

        {/* Clinical Findings */}
        <div data-pdf-section>
          <ClinicalSummary
            clinicalReport={clinicalReport}
          />
        </div>

        {/* Lab Reports */}
        <div>
          <LabReports
            uploadedReports={uploadedReports}
          />
        </div>

        {/* Practitioner Notes */}
        <div data-pdf-section>
          <PractitionerNotes
            doctorNotes={doctorNotes}
            selectedSignature={selectedSignature}
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="print-hidden max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-[24px] shadow-xl p-6 flex justify-center items-center gap-4">
          <button
            onClick={()=>navigate("/dashboard")}
            className="h-12 px-8 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={downloadPDF}
            className="h-12 px-8 rounded-xl bg-[#173C68] text-white font-medium hover:opacity-90 transition-all"
          >
            Download Report
          </button>
        </div>
      </div>

      <SummaryFooter />
    </div>
  );
};

export default ResultSummary;