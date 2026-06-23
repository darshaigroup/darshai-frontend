import { useMemo, useState } from "react";
import ReportFilters from "../components/reports/ReportFilters";
import ReportsTable from "../components/reports/ReportsTable";
import ReportViewer from "../components/reports/ReportViewer";

export default function ReportsPage({
  reports = [],
  onDownloadReport,
}) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const searchMatch =
        report.name.toLowerCase().includes(search.toLowerCase());

      const typeMatch =
        selectedType === "all" || report.type === selectedType;

      return searchMatch && typeMatch;
    });
  }, [reports, search, selectedType]);

  return (
    <div className="space-y-6">
      <ReportFilters
        search={search}
        setSearch={setSearch}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <ReportsTable
        reports={filteredReports}
        onView={setSelectedReport}
        onDownload={onDownloadReport}
      />

      <ReportViewer
        open={!!selectedReport}
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onDownload={onDownloadReport}
      />
    </div>
  );
}