import AssessmentView from "../sections/AssessmentView";

export default function AssessmentPage({
  activePatient,
  assessmentData,
  onSubmitAssessment,
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      <AssessmentView
        activePatient={activePatient}
        assessmentData={assessmentData}
        onSubmitAssessment={onSubmitAssessment}
      />
    </div>
  );
}