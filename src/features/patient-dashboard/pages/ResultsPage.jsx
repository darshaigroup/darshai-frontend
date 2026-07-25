import { useOutletContext } from "react-router-dom";
import HealthOverview from "../components/insight/HealthOverview";
import HealthRadar from "../components/insight/HealthRadar";
import SafetyAlerts from "../components/insight/SafetyAlerts";
import BodyHeatMap from "../components/insight/BodyHeatMap";
import AyurvedaDashboard from "../components/insight/AyurvedaDashboard";
import LifestyleDashboard from "../components/insight/LifestyleDashboard";

export default function ResultsPage() {
  const { patientData } = useOutletContext();

  const report=patientData?.report?.patient??{};
  const assessment=patientData?.assessment?.data??{};
  const progress=patientData?.progress??{};

  return (
    <div className="space-y-8">
      <HealthOverview assessment={assessment} report={report}/>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <HealthRadar assessment={assessment}/>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <SafetyAlerts assessment={assessment}/>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-6">
          <BodyHeatMap assessment={assessment}/>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <AyurvedaDashboard report={report}/>
        </div>
      </div>

      <LifestyleDashboard report={report}/>
    </div>
  );
}