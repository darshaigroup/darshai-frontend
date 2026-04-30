import PatientTrendChart from "../components/charts/PatientTrendChart";
import AppointmentBarChart from "../components/charts/AppointmentBarChart";
import DiseasePieChart from "../components/charts/DiseasePieChart";
import InsightCard from "../components/Analysis/InsightCard";

const Analysis = () => {
  return (
    <div className="space-y-6">
      {/* Top Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InsightCard
          title="Total Visits"
          value="1,200"
          change="+12% this month"
        />

        <InsightCard
          title="Recovery Rate"
          value="85%"
          change="+5% improvement"
        />

        <InsightCard
          title="New Patients"
          value="320"
          change="+8% growth"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PatientTrendChart />
        <AppointmentBarChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DiseasePieChart />
      </div>
    </div>
  );
};

export default Analysis;