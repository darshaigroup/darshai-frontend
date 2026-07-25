import ReportsHeader from "../ReportsHeader";
import ReportsTable from "../ReportsTable";
import ReportCard from "../ReportCard";

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