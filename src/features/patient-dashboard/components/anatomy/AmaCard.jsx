import { Droplets, ShieldCheck, AlertTriangle } from "lucide-react";

export default function AmaCard({ patient = {} }) {
  const report = patient?.report ?? {};
  const ayurveda = report?.final_ayurveda_result ?? {};
  const ama = ayurveda?.ama ?? {};

  const status = ama?.severity ?? ama?.status ?? ama?.state ?? "Absent";
  const normalizedStatus = String(status).toLowerCase();

  const isPresent =
    normalizedStatus.includes("present") ||
    normalizedStatus.includes("mild") ||
    normalizedStatus.includes("moderate") ||
    normalizedStatus.includes("severe") ||
    normalizedStatus.includes("high") ||
    normalizedStatus.includes("elevated");

  const isAbsent =
    normalizedStatus.includes("absent") ||
    normalizedStatus.includes("none") ||
    normalizedStatus.includes("normal");

  const description = isAbsent
    ? "No significant signs of Ama accumulation were identified."
    : "Indicators suggest the presence of Ama accumulation and may require attention.";

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,.11)]">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-100/40 blur-3xl transition-all duration-500 group-hover:bg-cyan-200/50" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5">
            <Droplets className="h-3.5 w-3.5 text-cyan-600" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-700">
              Ayurveda
            </span>
          </div>

          <h3 className="mt-4 font-serif text-2xl font-bold text-slate-900">
            Ama
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Metabolic toxin accumulation assessment
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-600">
          <Droplets className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>

      <div className="relative mt-7 flex flex-col items-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full ${
              isPresent ? "bg-amber-400/10" : "bg-emerald-400/10"
            }`}
          />

          <div
            className={`absolute inset-3 rounded-full border ${
              isPresent ? "border-amber-200" : "border-emerald-200"
            }`}
          />

          <div
            className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(15,23,42,.08)] ${
              isPresent ? "text-amber-500" : "text-emerald-500"
            }`}
          >
            {isPresent ? (
              <AlertTriangle className="h-9 w-9" strokeWidth={1.6} />
            ) : (
              <ShieldCheck className="h-9 w-9" strokeWidth={1.6} />
            )}
          </div>
        </div>

        <div
          className={`mt-5 rounded-full px-4 py-1.5 text-sm font-semibold ${
            isPresent
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {status}
        </div>

        <p className="mt-3 max-w-xs text-center text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <div className="relative mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">
            Ama Status
          </span>

          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isPresent ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Toxin accumulation
          </span>

          <span
            className={`text-sm font-bold ${
              isPresent ? "text-amber-600" : "text-emerald-600"
            }`}
          >
            {isPresent ? "Detected" : "Not Detected"}
          </span>
        </div>
      </div>

      {isPresent && (
        <div className="relative mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-xs leading-5 text-amber-700">
              Ama accumulation detected
            </p>
          </div>
        </div>
      )}
    </div>
  );
}