import { useMemo, useState } from "react";
import ReportFilters from "../components/reports/ReportFilters";
import ReportsTable from "../components/reports/ReportTable";
import ReportViewer from "../components/reports/ReportViewer";

export default function ReportView({ patientData }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [open, setOpen] = useState(false);

  const reports = useMemo(() => {
    if (!patientData) return [];

    const assessment = patientData?.assessment?.data ?? {};
    const progress = patientData?.progress ?? {};

    return [
      {
        id: assessment.assessment_id ?? "assessment",
        name: "Health Assessment Report",
        type: assessment.risk_band ?? "Assessment",
        date: assessment.created_at ?? assessment.updated_at ?? patientData?.profile?.patient?.created_at,
        status: progress.completed ? "Completed" : "Pending",
      },
    ];
  }, [patientData]);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchSearch = report.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || report.status.toLowerCase() === status.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [reports, search, status]);

  const handleView = report => {
    setSelectedReport(report);
    setOpen(true);
  };

  return (
    <>
      <ReportFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <ReportsTable
        reports={filteredReports}
        onView={handleView}
      />

      <ReportViewer
        open={open}
        onOpenChange={setOpen}
        report={selectedReport}
        patientData={patientData}
      />
    </>
  );
}