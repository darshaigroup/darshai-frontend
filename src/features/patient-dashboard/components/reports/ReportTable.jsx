import ReportCard from "./ReportCard";

export default function ReportsTable({
  reports,
  onView,
  onDownload,
}) {
  if (!reports.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 text-center">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          No Reports Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {reports.map(report => (
        <ReportCard
          key={report.id}
          report={report}
          onView={onView}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}