import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {getPatientSummary} from "../../../services/reportService";

import Watermark from "../../../assessments/components/resultSummary/Watermark";
import PatientReportHeader from "../../patientReportSummary/PatientReportHeader";
import PatientProfileCard from "../../patientReportSummary/PatientProfileCard";
import WellnessOverview from "../../patientReportSummary/WellnessOverview";
import RiskDomains from "../../patientReportSummary/RiskDomains";
import ClinicalAssessment from "../../patientReportSummary/ClinicalAssessment";
import LifestyleAssessment from "../../patientReportSummary/LifestyleAssessment";
import AyurvedaAssessment from "../../patientReportSummary/AyurvedaAssessment";
import PractitionerSection from "../../patientReportSummary/PractitionerSection";
import PatientReportFooter from "../../patientReportSummary/PatientReportFooter";
import LabReports from "../../../assessments/components/resultSummary/LabReports";

const PatientReportSummary=()=>{

  const {patientId}=useParams();

  const [report,setReport]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    loadSummary();
  },[patientId]);

  const loadSummary=async()=>{

    try{

      const data=await getPatientSummary(patientId);

      console.log("PATIENT SUMMARY RESPONSE:",data);
      console.log("PATIENT:",data?.patient);
      console.log("LAB REPORTS:",data?.labReports);
      console.log("PATIENT LAB REPORTS:",data?.patient?.lab_reports);
      console.log("UPLOADED REPORTS:",data?.patient?.uploaded_reports);

      setReport(data);

    }catch(error){

      console.error("PATIENT SUMMARY ERROR:",error);

    }finally{

      setLoading(false);

    }

  };

  if(loading){

    return(
      <div className="p-10">
        Loading...
      </div>
    );

  }

  const patient=report?.patient;

  /*
   * getPatientSummary should return labReports at the
   * top level, same as getPatientReport().
   *
   * Fallbacks are kept so older backend responses
   * will also continue to work.
   */
  const labReports=
    report?.labReports ||
    patient?.lab_reports ||
    patient?.uploaded_reports ||
    [];

  console.log("FINAL LAB REPORTS FOR SUMMARY:",labReports);

  return(

    <div className="min-h-screen bg-slate-100 py-10">

      <Watermark/>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        <PatientReportHeader
          patient={patient}
        />

        <PatientProfileCard
          patient={patient}
        />

        <WellnessOverview
          patient={patient}
        />

        <RiskDomains
          blocks={patient?.ai_response?.blocks||[]}
        />

        <ClinicalAssessment
          patient={patient}
        />

        <LifestyleAssessment
          patient={patient}
        />

        <AyurvedaAssessment
          patient={patient}
        />

        <LabReports
          uploadedReports={labReports}
        />

        <PractitionerSection
          patient={patient}
        />

        <PatientReportFooter
          patient={patient}
        />

      </div>

    </div>

  );

};

export default PatientReportSummary;