
import ReportCard from "./ReportCard";

export default function ReportViewer({ patientData }) {
  if (!patientData) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <ReportCard patientData={patientData} />
    </div>
  );
}