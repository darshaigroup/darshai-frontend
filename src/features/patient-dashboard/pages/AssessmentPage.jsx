import { useOutletContext } from "react-router-dom";
import AssessmentView from "../sections/AssessmentView";

export default function AssessmentPage() {
  const { patientData } = useOutletContext();

  return (
    <AssessmentView
      report={patientData?.report?.patient}
      pendingAssessments={[]}
    />
  );
}