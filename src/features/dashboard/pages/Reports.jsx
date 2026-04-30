import ReportsHeader from "../components/reports/ReportsHeader";
import ReportsTable from "../components/reports/ReportsTable";
import ReportCard from "../components/reports/ReportCard";

const Reports = () => {
  return (
    <div className="space-y-6">
      <ReportCard/>
     
      <ReportsHeader />

      <ReportsTable />

    </div>
  );
};

export default Reports;