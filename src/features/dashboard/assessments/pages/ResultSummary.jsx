import { useLocation } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SummaryHeader from "../components/resultSummary/SummaryHeader";
import PatientDetails from "../components/resultSummary/PatientDetails";
import RiskSummary from "../components/resultSummary/RiskSummary";
import AyurvedaSummary from "../components/resultSummary/AyurvedaSummary";
import ClinicalSummary from "../components/resultSummary/ClinicalSummary";
import PractitionerNotes from "../components/resultSummary/PractitionerNotes";
import LabReports from "../components/resultSummary/LabReports";
import SummaryFooter from "../components/resultSummary/SummaryFooter";
import Watermark from "../components/resultSummary/Watermark";

const ResultSummary = () => {

  const location = useLocation();

  const {
    patient,
    riskReport,
    ayurvedaReport,
    clinicalReport,
    doctorNotes,
    selectedSignature,
    uploadedReports,
  } = location.state || {};

  const downloadPDF = async () => {

    const report =
      document.getElementById(
        "summary-report"
      );

    if (!report) return;

    const canvas =
      await html2canvas(
        report,
        {
          scale: 2,
          useCORS: true,
        }
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const imgWidth =
      pdfWidth;

    const imgHeight =
      (canvas.height *
        imgWidth) /
      canvas.width;

    let heightLeft =
      imgHeight;

    let position = 0;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (
      heightLeft > 0
    ) {

      position =
        heightLeft -
        imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -=
        pageHeight;

    }

    const totalPages =
      pdf.internal.getNumberOfPages();

    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {

      pdf.setPage(i);

      pdf.setFontSize(10);

      pdf.text(
        `Page ${i} of ${totalPages}`,
        170,
        290
      );

    }

    pdf.save(
      `DarshAI_Report_${
        patient?.name ||
        "Patient"
      }.pdf`
    );

  };

  const printReport =
    () => {
      window.print();
    };

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <Watermark />

      <div
        id="summary-report"
        className="max-w-7xl mx-auto px-4 relative z-10"
      >

        <SummaryHeader
          patient={patient}
          onDownload={
            downloadPDF
          }
          onPrint={
            printReport
          }
        />

        <PatientDetails
          patient={patient}
        />

        <RiskSummary
          riskReport={
            riskReport
          }
        />

        <AyurvedaSummary
          ayurvedaReport={
            ayurvedaReport
          }
        />

        <ClinicalSummary
          clinicalReport={
            clinicalReport
          }
        />

         <LabReports
          uploadedReports={
            uploadedReports
          }
        />
        
        <PractitionerNotes
          doctorNotes={
            doctorNotes
          }
          selectedSignature={
            selectedSignature
          }
        />

       

        <SummaryFooter />

      </div>

    </div>

  );

};

export default ResultSummary;