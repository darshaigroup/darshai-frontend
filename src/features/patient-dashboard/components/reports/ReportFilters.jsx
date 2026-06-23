import { Search, Filter } from "lucide-react";

export default function ReportFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search reports..."
          className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        />
      </div>

      <div className="relative">
        <Filter className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="h-11 pl-10 pr-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 min-w-[180px]"
        >
          <option value="all">All Reports</option>
          <option value="blood">Blood Reports</option>
          <option value="wellness">Wellness Reports</option>
          <option value="assessment">Assessments</option>
          <option value="biomarker">Biomarkers</option>
        </select>
      </div>
    </div>
  );
}