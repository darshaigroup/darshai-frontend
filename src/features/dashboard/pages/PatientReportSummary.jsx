import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {getPatientSummary} from "../Services/reportService";
//import for components
import Watermark from "../assessments/components/resultSummary/Watermark";
import PatientReportHeader from "../components/patientReportSummary/PatientReportHeader";
import PatientProfileCard from "../components/patientReportSummary/PatientProfileCard";
import WellnessOverview from "../components/patientReportSummary/WellnessOverview";
import RiskDomains from "../components/patientReportSummary/RiskDomains";
import ClinicalAssessment from "../components/patientReportSummary/ClinicalAssessment";
import LifestyleAssessment from "../components/patientReportSummary/LifestyleAssessment";
import AyurvedaAssessment from "../components/patientReportSummary/AyurvedaAssessment";
import PractitionerSection from "../components/patientReportSummary/PractitionerSection";
import PatientReportFooter from "../components/patientReportSummary/PatientReportFooter";

const PatientReportSummary = () => {

  const {patientId} =
    useParams();

  const [report,setReport] =
    useState(null);

  const [loading,setLoading] =
    useState(true);

  useEffect(() => {

    loadSummary();

  },[patientId]);

  const loadSummary =
    async () => {

      try{

        const data =
          await getPatientSummary(
            patientId
          );
console.log(
  "PATIENT SUMMARY RESPONSE:",
  data
);
        setReport(data);

      }catch(error){

        console.error(error);

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

  const patient =
    report?.patient;

  return(

    <div className="min-h-screen bg-slate-100 py-10">

      <Watermark />

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
  blocks={
    patient?.ai_response?.blocks || []
  }
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