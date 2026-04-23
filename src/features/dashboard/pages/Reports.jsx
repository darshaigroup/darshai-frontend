import ReportCard from "../components/reports/ReportCard";
import ReportFilter from "../components/reports/ReportFilter";
import ReportTable from "../components/reports/ReportTable";

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportCard
          title="Total Reports"
          value="240"
          color="bg-gradient-to-r from-purple-500 to-purple-700"
        />

        <ReportCard
          title="Completed"
          value="180"
          color="bg-gradient-to-r from-green-500 to-green-700"
        />

        <ReportCard
          title="Pending"
          value="60"
          color="bg-gradient-to-r from-yellow-500 to-yellow-600"
        />
      </div>

      {/* Filters */}
      <ReportFilter />

      {/* Table */}
      <ReportTable />
    </div>
  );
};

export default Reports;