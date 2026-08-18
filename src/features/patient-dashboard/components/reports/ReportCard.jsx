import PatientInformation from "./PatientInformation";
import RiskAssessment from "./RiskAssessment";
import ClinicalAssessment from "./ClinicalAssessment";
import LifestyleAssessment from "./LifestyleAssessment";
import AyurvedaAssessment from "./AyurvedaAssessment";
import DoctorNotes from "./DoctorNotes";

export default function ReportCard({ patientData = {} }) {
  const patient = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};
  const progress = patientData?.progress ?? {};

  const clinical = report?.clinical_answers ?? {};
  const lifestyle = report?.matrix_answers ?? {};
  const ayurveda = report?.final_ayurveda_result ?? {};
  const ai = assessment?.ai_response ?? report?.ai_response ?? {};

  return (
    <div className="space-y-8">
      <PatientInformation patient={patient} />

      <RiskAssessment
        assessment={assessment}
        ai={ai}
        progress={progress}
      />

      <ClinicalAssessment clinical={clinical} />

      <LifestyleAssessment lifestyle={lifestyle} />

      <AyurvedaAssessment ayurveda={ayurveda} />

      <DoctorNotes doctor={report} />
    </div>
  );
}