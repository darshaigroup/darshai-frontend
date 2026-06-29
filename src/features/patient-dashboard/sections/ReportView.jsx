import { useMemo, useState } from "react";
import ReportFilters from "../components/reports/ReportFilters";
import ReportsTable from "../components/reports/ReportTable";
import ReportViewer from "../components/reports/ReportViewer";

export default function ReportView({
  reports = [],
  onDownload,
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const searchMatch = report.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const typeMatch =
        type === "all" || report.type === type;

      return searchMatch && typeMatch;
    });
  }, [reports, search, type]);

  return (
    <div className="space-y-6">
      <ReportFilters
        search={search}
        setSearch={setSearch}
        selectedType={type}
        setSelectedType={setType}
      />

      <ReportsTable
        reports={filteredReports}
        onView={setSelectedReport}
        onDownload={onDownload}
      />

      <ReportViewer
        report={selectedReport}
        open={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        onDownload={onDownload}
      />
    </div>
  );
}