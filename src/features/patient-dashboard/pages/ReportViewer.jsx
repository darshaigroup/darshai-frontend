import { Navigate, useParams } from "react-router-dom";
import ClinicalReport from "./ClinicalReport";
import RiskReport from "./RiskReport";
import LifestyleReport from "./LifestyleReport";
import AyurvedaReport from "./AyurvedaReport";
import FullReport from "./FullReport";

export default function ReportViewer() {
  const { reportType } = useParams();

  switch ((reportType ?? "").toLowerCase()) {
    case "clinical":
      return <ClinicalReport />;

    case "risk":
      return <RiskReport />;

    case "lifestyle":
      return <LifestyleReport />;

    case "ayurveda":
      return <AyurvedaReport />;

    case "full":
      return <FullReport />;

    default:
      return <Navigate to="/patient-dashboard/reports" replace />;
  }
}