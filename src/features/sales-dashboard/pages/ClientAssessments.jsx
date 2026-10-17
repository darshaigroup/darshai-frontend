import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import { getLeads, getClientAssessmentReports } from "../services/salesService";

const PAGE_SIZE = 10;
const CARD_CLASS =
  "rounded-[24px] border border-[#ECE7DD] bg-white p-4 shadow-sm sm:p-5";
const LABEL_CLASS = "text-sm text-slate-500";
const VALUE_CLASS = "mt-1 font-semibold text-[#173C68]";

const normalizeReport = (response) => response?.data ?? response ?? {};

const getPatientId = (client) =>
  client?.patient_id || client?.patient?.id || client?.id || "";

const getClientName = (client) =>
  client?.name || client?.client_name || client?.client?.name || "—";

const getClientId = (client) =>
  client?.client_id || client?.client?.client_id || "";

const getJourneyId = (client) =>
  client?.journey_id || client?.client?.journey_id || "—";

const getDoctorName = (client) =>
  client?.doctor_name || client?.assigned_doctor || "—";

const getAssessmentCompleted = (client) => {
  if (typeof client?.assessmentStatus?.completed === "boolean") {
    return client.assessmentStatus.completed;
  }

  if (typeof client?.assessment_completed === "boolean") {
    return client.assessment_completed;
  }

  if (typeof client?.assessment_status === "string") {
    const status = client.assessment_status.toLowerCase();
    if (status === "completed") return true;
    if (status === "pending") return false;
  }

  return null;
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.map(formatValue).join(", ");

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => `${key.replaceAll("_", " ")}: ${formatValue(item)}`)
      .join(" · ");
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

function StatusBadge({ completed }) {
  if (completed === null || completed === undefined) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
        Not verified
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
        completed
          ? "bg-[#EDF9F0] text-[#1E7A3A]"
          : "bg-orange-50 text-orange-600"
      }`}
    >
      {completed ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
      {completed ? "Completed" : "Pending"}
    </span>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#ECE7DD] bg-[#FAF9F6] p-3 sm:p-4">
      <p className={LABEL_CLASS}>{label}</p>
      <p className={`${VALUE_CLASS} break-words`}>{formatValue(value)}</p>
    </div>
  );
}

function ResultCard({ title, data }) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;

  return (
    <div className="rounded-2xl border border-[#ECE7DD] p-4">
      <h4 className="mb-3 font-semibold text-[#173C68]">{title}</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(data).map(([key, value]) => {
          if (value === null || value === undefined) return null;

          return (
            <div key={key} className="min-w-0">
              <p className="text-xs capitalize text-slate-500">
                {key.replaceAll("_", " ")}
              </p>
              <p className="mt-1 break-words text-sm text-slate-700">
                {formatValue(value)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RiskBlock({ block }) {
  const params = Array.isArray(block.params) ? block.params : [];

  return (
    <details className="group rounded-2xl border border-[#ECE7DD] bg-white">
      <summary className="flex cursor-pointer list-none flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="font-semibold text-[#173C68]">
            {block.title || block.id || "Assessment"}
          </h4>
          <p className="mt-1 text-xs text-slate-500">
            {block.answered ?? 0} of {block.total ?? params.length} answered
            {" · "}
            {block.completion_pct ?? 0}% complete
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-sm font-semibold text-[#173C68]">
            Score: {block.score ?? "—"}/{block.max_score ?? 100}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
            {block.risk_level || "Unclassified"}
          </span>
          <span className="text-xs text-slate-400">View parameters</span>
        </div>
      </summary>

      <div className="overflow-x-auto border-t border-[#ECE7DD]">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-[#F8F7F3] text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Parameter</th>
              <th className="px-4 py-3">Selected Response</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Maximum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECE7DD]">
            {params.map((param, index) => (
              <tr key={`${param.label || "parameter"}-${index}`}>
                <td className="px-4 py-3 font-medium text-[#173C68]">
                  {param.label || "—"}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {param.option || "—"}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {param.score ?? "—"}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {param.max_score ?? param.weight ?? "—"}
                </td>
              </tr>
            ))}
            {params.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  No parameter details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(block.is_critical || block.safety_flag) && (
        <div className="m-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <ShieldAlert size={18} className="shrink-0" />
          <span>
            {block.safety_flag
              ? "Safety flag is present in this assessment."
              : "This assessment is marked critical."}
          </span>
        </div>
      )}
    </details>
  );
}

function AssessmentDetails({ report }) {
  const data = normalizeReport(report);
  const client = data.client ?? {};
  const patient = data.patient ?? {};
  const aiResponse = patient.ai_response ?? {};
  const blocks = Array.isArray(aiResponse.blocks) ? aiResponse.blocks : [];
  const status = data.assessmentStatus ?? {};
  const labReports = Array.isArray(data.labReports) ? data.labReports : [];

  const statusItems = [
    ["Lifestyle", status.lifestyle],
    ["Risk Assessment", status.risk],
    ["Ayurveda", status.ayurveda],
    ["Clinical", status.clinical],
    ["Overall", status.completed],
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className={CARD_CLASS}>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-[#EDF9F0] p-3">
            <UserRound size={22} className="text-[#1E7A3A]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#173C68] sm:text-xl">
              Client Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Patient details from the assessment report.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <InfoCard label="Client Name" value={client.name || patient.name} />
          <InfoCard label="Client ID" value={client.client_id || patient.client_id} />
          <InfoCard label="Patient ID" value={client.patient_id || patient.id} />
          <InfoCard label="Email" value={patient.email} />
          <InfoCard label="Phone" value={patient.phone} />
          <InfoCard label="Journey ID" value={client.journey_id || patient.journey_id} />
          <InfoCard label="Doctor ID" value={patient.doctor_id} />
          <InfoCard label="Occupation" value={patient.occupation} />
          <InfoCard label="Location" value={patient.location} />
        </div>
      </section>

      <section className={CARD_CLASS}>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-[#EDF9F0] p-3">
            <ClipboardList size={22} className="text-[#1E7A3A]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#173C68] sm:text-xl">
              Assessment Progress
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Completion status reported by the API.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {statusItems.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-2 rounded-2xl border border-[#ECE7DD] p-4"
            >
              <span className="text-sm text-slate-600">{label}</span>
              <StatusBadge completed={typeof value === "boolean" ? value : null} />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoCard
            label="Composite Score"
            value={aiResponse.composite_score ?? patient.composite_score}
          />
          <InfoCard
            label="Composite Risk"
            value={aiResponse.composite_risk ?? patient.risk_band}
          />
          <InfoCard
            label="Total Completion"
            value={
              aiResponse.total_completion_pct == null
                ? "—"
                : `${aiResponse.total_completion_pct}%`
            }
          />
          <InfoCard
            label="Safety Override"
            value={
              aiResponse.safety_override_active == null
                ? "—"
                : aiResponse.safety_override_active
                  ? "Active"
                  : "Inactive"
            }
          />
        </div>
      </section>

      <section className={CARD_CLASS}>
        <h2 className="mb-2 text-lg font-semibold text-[#173C68] sm:text-xl">
          Risk Assessment Results
        </h2>
        <p className="mb-5 text-sm text-slate-500">
          Expand a category to inspect its individual parameters and scores.
        </p>

        {blocks.length > 0 ? (
          <div className="space-y-3">
            {blocks.map((block, index) => (
              <RiskBlock key={block.id || index} block={block} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No risk assessment blocks were returned.
          </p>
        )}

        {Array.isArray(aiResponse.safety_triggered_by) &&
          aiResponse.safety_triggered_by.length > 0 && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-800">Safety Triggers</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {aiResponse.safety_triggered_by.map((item, index) => (
                  <span
                    key={`${item.id || item.title || "trigger"}-${index}`}
                    className="rounded-full bg-white px-3 py-1.5 text-sm text-amber-800"
                  >
                    {item.title || item.id}: {item.score ?? "—"}
                  </span>
                ))}
              </div>
            </div>
          )}
      </section>

      <section className={CARD_CLASS}>
        <h2 className="mb-5 text-lg font-semibold text-[#173C68] sm:text-xl">
          Ayurveda Results
        </h2>
        <div className="space-y-4">
          <ResultCard title="Prakriti" data={patient.prakriti_result} />
          <ResultCard title="Vikriti" data={patient.vikriti_result} />
          <ResultCard title="Agni" data={patient.agni_result} />
          <ResultCard title="Ama" data={patient.ama_result} />
          <ResultCard title="Correlation" data={patient.correlation_result} />
          <ResultCard title="Final Ayurveda Result" data={patient.final_ayurveda_result} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoCard label="Primary Dosha" value={patient.primary_dosha} />
          <InfoCard label="Primary Level" value={patient.primary_level} />
          <InfoCard label="Secondary Dosha" value={patient.secondary_dosha} />
          <InfoCard label="Secondary Level" value={patient.secondary_level} />
          <InfoCard label="Risk Tier" value={patient.risk_tier} />
          <InfoCard label="Clinical Summary" value={patient.clinical_summary} />
          <InfoCard
            label="Doctor Approval"
            value={
              patient.is_approved == null
                ? "Not reviewed"
                : patient.is_approved
                  ? "Approved"
                  : "Not approved"
            }
          />
        </div>
      </section>

      <section className={CARD_CLASS}>
        <h2 className="mb-5 text-lg font-semibold text-[#173C68] sm:text-xl">
          Clinical Information
        </h2>
        {patient.clinical_answers &&
        Object.keys(patient.clinical_answers).length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Object.entries(patient.clinical_answers).map(([key, value]) => (
              <InfoCard key={key} label={key} value={value} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No clinical answers available.</p>
        )}
      </section>

      <section className={CARD_CLASS}>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-[#EDF9F0] p-3">
            <FileText size={22} className="text-[#1E7A3A]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#173C68] sm:text-xl">
              Lab Reports
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Uploaded reports returned by the API.
            </p>
          </div>
        </div>

        {labReports.length > 0 ? (
          <div className="space-y-3">
            {labReports.map((lab, index) => (
              <div
                key={lab.id || index}
                className="flex flex-col gap-3 rounded-2xl border border-[#ECE7DD] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <FileText size={21} className="mt-1 shrink-0 text-[#1E7A3A]" />
                  <div className="min-w-0">
                    <p className="break-words font-medium text-[#173C68]">
                      {lab.report_name || lab.file_name || "Lab report"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {lab.file_type || "Unknown file type"}
                      {lab.file_size
                        ? ` · ${(Number(lab.file_size) / 1024).toFixed(1)} KB`
                        : ""}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Uploaded{" "}
                      {lab.created_at
                        ? new Date(lab.created_at).toLocaleString()
                        : "date unavailable"}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {lab.url || lab.file_url || lab.signed_url
                    ? "Report available"
                    : "File URL not included"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No lab reports available.</p>
        )}
      </section>

      <section className={CARD_CLASS}>
        <h2 className="mb-5 text-lg font-semibold text-[#173C68] sm:text-xl">
          Lifestyle Assessment Answers
        </h2>
        {patient.matrix_answers &&
        Object.keys(patient.matrix_answers).length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Object.entries(patient.matrix_answers).map(([key, value]) => (
              <InfoCard key={key} label={key} value={value} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No lifestyle matrix answers available.
          </p>
        )}
      </section>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange, totalItems, pageSize }) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  let pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  startPage = Math.max(1, endPage - maxVisible + 1);

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  return (
    <div className="flex flex-col gap-4 border-t border-[#ECE7DD] pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500 sm:text-sm">
        Showing <span className="font-semibold text-[#173C68]">{startItem}–{endItem}</span>{" "}
        of <span className="font-semibold text-[#173C68]">{totalItems}</span> clients
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 rounded-xl border border-[#ECE7DD] px-3 py-2 text-sm text-[#173C68] hover:bg-[#F8F7F3] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {startPage > 1 && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="rounded-xl border border-[#ECE7DD] px-3 py-2 text-sm text-[#173C68] hover:bg-[#F8F7F3]"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-slate-400">…</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`min-w-10 rounded-xl border px-3 py-2 text-sm font-medium ${
              page === currentPage
                ? "border-[#173C68] bg-[#173C68] text-white"
                : "border-[#ECE7DD] text-[#173C68] hover:bg-[#F8F7F3]"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-slate-400">…</span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className="rounded-xl border border-[#ECE7DD] px-3 py-2 text-sm text-[#173C68] hover:bg-[#F8F7F3]"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 rounded-xl border border-[#ECE7DD] px-3 py-2 text-sm text-[#173C68] hover:bg-[#F8F7F3] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function ClientAssessments() {
  const [clients, setClients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [report, setReport] = useState(null);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const loadClients = useCallback(async () => {
    setLoadingClients(true);
    setError("");

    try {
      const response = await getLeads();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.leads)
            ? response.leads
            : [];

      setClients(list);

      // Read each patient's Overall status from their detailed report.
      // A failed report request leaves that client as Not verified.
      const verifiedClients = await Promise.all(
        list.map(async (client) => {
          const patientId = getPatientId(client);
          if (!patientId) return client;

          try {
            const reportResponse = await getClientAssessmentReports(patientId);
            const reportData = normalizeReport(reportResponse);
            const status = reportData.assessmentStatus;

            if (typeof status?.completed !== "boolean") return client;

            return {
              ...client,
              assessmentStatus: status,
              assessment_completed: status.completed,
              assessment_status: status.completed ? "Completed" : "Pending",
            };
          } catch (reportError) {
            console.warn(
              `Unable to verify assessment status for patient ${patientId}:`,
              reportError
            );
            return client;
          }
        })
      );

      setClients(verifiedClients);
    } catch (err) {
      setError(err.message || "Unable to load clients.");
    } finally {
      setLoadingClients(false);
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Reset pagination whenever the search or status filter changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const loadReport = useCallback(async (patientId) => {
    if (!patientId) {
      setError("This client does not have a patient ID.");
      return;
    }

    setSelectedPatientId(String(patientId));
    setReport(null);
    setLoadingReport(true);
    setError("");

    try {
      const response = await getClientAssessmentReports(patientId);
      const data = normalizeReport(response);
      setReport(data);

      const status = data.assessmentStatus;
      if (typeof status?.completed === "boolean") {
        setClients((previous) =>
          previous.map((client) =>
            String(getPatientId(client)) === String(patientId)
              ? {
                  ...client,
                  assessmentStatus: status,
                  assessment_completed: status.completed,
                  assessment_status: status.completed ? "Completed" : "Pending",
                }
              : client
          )
        );
      }
    } catch (err) {
      setError(err.message || "Unable to load the assessment report.");
    } finally {
      setLoadingReport(false);
    }
  }, []);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch = [
        getClientName(client),
        getClientId(client),
        client.email,
        client.phone,
        getJourneyId(client),
        getDoctorName(client),
        getPatientId(client),
      ].some((value) => String(value || "").toLowerCase().includes(query));

      const completed = getAssessmentCompleted(client);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "Completed" && completed === true) ||
        (statusFilter === "Pending" && completed === false) ||
        (statusFilter === "unverified" &&
          (completed === null || completed === undefined));

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedClients = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredClients.slice(start, start + PAGE_SIZE);
  }, [filteredClients, safeCurrentPage]);

  const completedCount = clients.filter(
    (client) => getAssessmentCompleted(client) === true
  ).length;

  const pendingCount = clients.filter(
    (client) => getAssessmentCompleted(client) === false
  ).length;

  const unverifiedCount = clients.length - completedCount - pendingCount;

  const reportData = normalizeReport(report);
  const reportClient = reportData.client ?? {};
  const reportPatient = reportData.patient ?? {};
  const reportStatus = reportData.assessmentStatus ?? {};

  return (
    <div className="mx-auto w-full min-w-0 space-y-5 sm:space-y-8">
      <SectionTitle
        title="Client Assessment"
        subtitle="View assigned clients, assessment progress, risk scores and detailed reports."
      />

      {selectedPatientId && (
        <button
          type="button"
          onClick={() => {
            setSelectedPatientId("");
            setReport(null);
            setError("");
          }}
          className="inline-flex items-center gap-2 rounded-full border border-[#ECE7DD] bg-white px-4 py-2.5 text-sm font-medium text-[#173C68] transition hover:bg-[#F8F7F3]"
        >
          <ArrowLeft size={17} />
          Back to Client List
        </button>
      )}

      {!selectedPatientId && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
            <div className={CARD_CLASS}>
              <p className={LABEL_CLASS}>Assigned Clients</p>
              <p className="mt-2 text-2xl font-bold text-[#173C68] sm:text-3xl">
                {clients.length}
              </p>
            </div>

            <div className={CARD_CLASS}>
              <p className={LABEL_CLASS}>Completed</p>
              <p className="mt-2 text-2xl font-bold text-[#1E7A3A] sm:text-3xl">
                {completedCount}
              </p>
            </div>

            <div className={CARD_CLASS}>
              <p className={LABEL_CLASS}>Pending / Not Verified</p>
              <p className="mt-2 text-2xl font-bold text-amber-600 sm:text-3xl">
                {pendingCount + unverifiedCount}
              </p>
              {unverifiedCount > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  {unverifiedCount} not verified
                </p>
              )}
            </div>
          </div>

          <section className="min-w-0 space-y-5 rounded-2xl border border-[#ECE7DD] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,.06)] sm:rounded-[32px] sm:p-5 lg:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-serif text-xl text-[#173C68] sm:text-2xl">
                  Assigned Client List
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a client to load their complete assessment report.
                </p>
              </div>

              <button
                type="button"
                onClick={loadClients}
                disabled={loadingClients}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#173C68] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1E7A3A] disabled:opacity-50 sm:w-auto"
              >
                <RefreshCw
                  size={16}
                  className={loadingClients ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_190px]">
              <div className="relative min-w-0">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search client, email, phone, journey ID or doctor..."
                  className="w-full min-w-0 rounded-2xl border border-[#ECE7DD] py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-[#1E7A3A]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-2xl border border-[#ECE7DD] bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#1E7A3A]"
              >
                <option value="all">All assessments</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="unverified">Not verified</option>
              </select>
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
                <span className="break-words">{error}</span>
              </div>
            )}

            {loadingClients ? (
              <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
                <LoaderCircle
                  size={21}
                  className="animate-spin text-[#1E7A3A]"
                />
                <span className="text-sm">
                  Loading clients and verifying status...
                </span>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                No clients found.
              </div>
            ) : (
              <>
                {/* Mobile layout: stacked client cards */}
                <div className="space-y-3 md:hidden">
                  {paginatedClients.map((client, index) => {
                    const patientId = getPatientId(client);
                    const completed = getAssessmentCompleted(client);

                    return (
                      <article
                        key={patientId || index}
                        className="rounded-2xl border border-[#ECE7DD] p-4"
                      >
                        <div className="flex min-w-0 items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="break-words font-semibold text-[#173C68]">
                              {getClientName(client)}
                            </h3>
                            <p className="mt-1 break-all text-xs text-slate-500">
                              {getClientId(client) || patientId || "—"}
                            </p>
                          </div>
                          <StatusBadge completed={completed} />
                        </div>

                        <div className="mt-4 space-y-3 border-t border-[#ECE7DD] pt-3">
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500">Contact</p>
                            <p className="mt-1 break-all text-sm text-slate-700">
                              {client.email || client.patient?.email || "—"}
                            </p>
                            <p className="mt-1 break-words text-sm text-slate-600">
                              {client.phone || client.patient?.phone || "—"}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500">Journey ID</p>
                              <p className="mt-1 break-words text-sm text-slate-700">
                                {getJourneyId(client)}
                              </p>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500">Doctor</p>
                              <p className="mt-1 break-words text-sm text-slate-700">
                                {getDoctorName(client)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={!patientId || loadingReport}
                          onClick={() => loadReport(patientId)}
                          className="mt-4 w-full rounded-full bg-[#173C68] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1E7A3A] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          View Assessment
                        </button>
                      </article>
                    );
                  })}
                </div>

                {/* Tablet and desktop layout: data table */}
                <div className="hidden overflow-x-auto rounded-2xl border border-[#ECE7DD] md:block">
                  <table className="w-full min-w-[900px] text-left">
                    <thead className="bg-[#F8F7F3]">
                      <tr className="border-b border-[#ECE7DD] text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-4 lg:px-5">Client</th>
                        <th className="px-4 py-4 lg:px-5">Contact</th>
                        <th className="px-4 py-4 lg:px-5">Journey ID</th>
                        <th className="px-4 py-4 lg:px-5">Doctor</th>
                        <th className="px-4 py-4 lg:px-5">Assessment</th>
                        <th className="px-4 py-4 lg:px-5">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#ECE7DD]">
                      {paginatedClients.map((client, index) => {
                        const patientId = getPatientId(client);
                        const completed = getAssessmentCompleted(client);

                        return (
                          <tr
                            key={patientId || index}
                            className="transition-colors hover:bg-[#FAF9F6]"
                          >
                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                              <p className="font-semibold text-[#173C68]">
                                {getClientName(client)}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {getClientId(client) || patientId || "—"}
                              </p>
                            </td>

                            <td className="max-w-[240px] px-4 py-4 lg:px-5 lg:py-5">
                              <p className="break-words text-sm text-slate-700">
                                {client.email || client.patient?.email || "—"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {client.phone || client.patient?.phone || "—"}
                              </p>
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-600 lg:px-5">
                              {getJourneyId(client)}
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-600 lg:px-5">
                              {getDoctorName(client)}
                            </td>

                            <td className="px-4 py-4 lg:px-5">
                              <StatusBadge completed={completed} />
                            </td>

                            <td className="px-4 py-4 lg:px-5">
                              <button
                                type="button"
                                disabled={!patientId || loadingReport}
                                onClick={() => loadReport(patientId)}
                                className="whitespace-nowrap rounded-full bg-[#173C68] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1E7A3A] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                View Assessment
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredClients.length}
                  pageSize={PAGE_SIZE}
                />
              </>
            )}
          </section>
        </>
      )}

      {selectedPatientId && (
        <>
          {loadingReport ? (
            <div
              className={`${CARD_CLASS} flex items-center justify-center gap-3 py-16 text-slate-500`}
            >
              <LoaderCircle
                size={22}
                className="animate-spin text-[#1E7A3A]"
              />
              <span className="text-sm">Loading the full assessment report...</span>
            </div>
          ) : report ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="break-words text-xl font-semibold text-[#173C68] sm:text-2xl">
                    {reportClient.name || reportPatient.name || "Client Assessment"}
                  </h2>
                  <p className="mt-1 break-all text-sm text-slate-500">
                    Patient ID: {reportClient.patient_id || reportPatient.id || selectedPatientId}
                  </p>
                </div>
                <StatusBadge
                  completed={
                    typeof reportStatus.completed === "boolean"
                      ? reportStatus.completed
                      : null
                  }
                />
              </div>

              <AssessmentDetails report={report} />
            </>
          ) : (
            <div className={`${CARD_CLASS} text-sm text-slate-500`}>
              {error || "No assessment report was returned."}
              <button
                type="button"
                onClick={() => loadReport(selectedPatientId)}
                className="ml-2 font-semibold text-[#1E7A3A] underline"
              >
                Retry
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}