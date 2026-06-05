import { useLocation } from "react-router-dom";

const AyurvedaResult = () => {
  const location = useLocation();

  const patient = location.state?.patient;
  const riskReport = location.state?.riskReport;

  const report =
    location.state?.report?.data ||
    location.state?.report ||
    {};

  // console.log("LOCATION STATE", location.state);
  // console.log("PATIENT", patient);
  // console.log("RISK REPORT", riskReport);
  // console.log("REPORT", report);

  if (!report || !report.prakriti) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        No Ayurveda Report Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">

      {/* HEADER */}

      <div className="bg-white rounded-[36px] shadow-xl p-10">

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          <div>

            <h1 className="text-5xl font-bold text-slate-900">
              Ayurveda Assessment Report
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              Personalized Dosha Analysis
            </p>

            <div className="mt-8">

              <h3 className="text-2xl font-semibold">
                {report.patient_name}
              </h3>

              {patient && (
                <p className="text-slate-500">
                  {patient.gender}
                </p>
              )}

            </div>

          </div>

          <div className="text-center">

            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center shadow-2xl">

              <div className="w-44 h-44 bg-white rounded-full flex flex-col items-center justify-center">

                <p className="text-3xl font-bold text-slate-900">
                  {report.risk_tier}
                </p>

                <p className="text-slate-500 text-sm">
                  Risk Tier
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    
      {/* PRAKRITI */}

<div className="bg-white rounded-[32px] shadow-xl p-10">

  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

    <div>

      <h2 className="text-3xl font-bold text-slate-900">
        Prakriti Constitution
      </h2>

      <p className="text-slate-500 mt-2">
        Natural Ayurvedic body constitution
      </p>

    </div>

    <div className="px-8 py-4 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl">

      <p className="text-sm uppercase tracking-wider opacity-80">
        Dominant Constitution
      </p>

      <p className="text-3xl font-bold mt-1">
        {report.prakriti.prakriti_type}
      </p>

    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-6 mt-10">

    <DoshaCard
      title="Vata"
      value={report.prakriti.vata_pct}
      color="violet"
    />

    <DoshaCard
      title="Pitta"
      value={report.prakriti.pitta_pct}
      color="red"
    />

    <DoshaCard
      title="Kapha"
      value={report.prakriti.kapha_pct}
      color="emerald"
    />

  </div>

</div>

      {/* VIKRITI */}

<div className="bg-white rounded-[32px] shadow-xl p-10">

  <div className="mb-8">

    <h2 className="text-3xl font-bold">
      Vikriti Imbalance Analysis
    </h2>

    <p className="text-slate-500 mt-2">
      Current dosha deviations from natural constitution
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8">

    {Object.entries(report.vikriti?.deviations || {}).map(
      ([dosha, item]) => (

        <div
          key={dosha}
          className="relative overflow-hidden rounded-[32px] border border-slate-100 p-8 bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-500"
        >

          <div className={`inline-flex px-5 py-2 rounded-full text-sm font-semibold ${getDoshaBarColor(dosha)}`}>
            {dosha}
          </div>

          <h3 className="mt-8 text-5xl font-bold text-slate-900">
            {item.delta > 0 ? "+" : ""}
            {item.delta}%
          </h3>

          <p className="mt-4 text-lg text-slate-600">
            {item.level}
          </p>

          <div className="mt-8">

            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

              <div
                className={`h-full rounded-full ${getDoshaBarColor(dosha)}`}
                style={{
                  width: `${Math.min(Math.abs(item.delta), 100)}%`,
                }}
              />

            </div>

          </div>

        </div>

      )
    )}

  </div>

</div>

      {/* AGNI */}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-[32px] shadow-xl p-8">

        <h2 className="text-3xl font-bold">
          🔥 Agni Assessment
        </h2>

        <h3 className="mt-6 text-4xl font-bold text-orange-600">
          {report.agni?.agni_type}
        </h3>

        <p className="mt-4 text-lg text-slate-700">
          {report.agni?.clinical_meaning}
        </p>

        <div className="mt-4 inline-flex px-5 py-2 rounded-full bg-orange-100 text-orange-700 font-medium">

          Linked Dosha:
          {" "}
          {report.agni?.linked_dosha}

        </div>

      </div>

     {/* AMA */}

<div className="bg-white rounded-[32px] shadow-xl p-10">

  <h2 className="text-3xl font-bold mb-8">
    Ama Assessment
  </h2>

  <div className="h-5 bg-slate-200 rounded-full overflow-hidden">

    <div
      className="h-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-1000"
      style={{
        width: `${report.ama?.percentage || 0}%`,
      }}
    />

  </div>

  <div className="mt-6 flex items-center justify-between">

    <span className="text-xl font-semibold">
      {report.ama?.severity}
    </span>

    <span className="text-slate-500">
      Ama Burden
    </span>

  </div>

</div>

      {/* CLINICAL SUMMARY */}

     <Section title="Clinical Intelligence Summary" className="bg-gradient-to-br from-[#0F766E] via-[#11998E] to-[#14B8A6] text-white">

  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-8">

    <p className="text-sm uppercase tracking-[0.2em] text-white/70">
      Clinical Interpretation
    </p>

    <p className="mt-4 text-2xl leading-relaxed font-medium">
      {report.clinical_summary}
    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-6 mt-8">

    <div className="bg-red-500/20 border border-red-300/30 rounded-[28px] p-7 backdrop-blur">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-xl">
          ⚠️
        </div>

        <div>

          <p className="text-sm text-red-100 uppercase tracking-wider">
            Primary Imbalance
          </p>

          <h3 className="text-2xl font-bold">
            {report.primary_dosha}
          </h3>

        </div>

      </div>

      <p className="mt-5 text-lg">
        {report.primary_level}
      </p>

    </div>

    <div className="bg-orange-500/20 border border-orange-300/30 rounded-[28px] p-7 backdrop-blur">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-xl">
          🔶
        </div>

        <div>

          <p className="text-sm text-orange-100 uppercase tracking-wider">
            Secondary Imbalance
          </p>

          <h3 className="text-2xl font-bold">
            {report.secondary_dosha}
          </h3>

        </div>

      </div>

      <p className="mt-5 text-lg">
        {report.secondary_level}
      </p>

    </div>

  </div>

  {report.correlation && (

    <div className="mt-8 space-y-5">

      <div className="bg-white rounded-[28px] p-7 text-slate-800 shadow-xl">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
            🧬
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Dominant Pattern
            </p>

            <h3 className="text-xl font-bold">
              {report.correlation.pattern_name}
            </h3>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-[28px] p-7 text-slate-800 shadow-xl">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
            🔥
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Ama Relationship
            </p>

            <h3 className="text-lg font-semibold">
              {report.correlation.ama_link}
            </h3>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-[28px] p-7 text-slate-800 shadow-xl">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
            📋
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Clinical Correlation
            </p>

            <h3 className="text-lg font-semibold">
              {report.correlation.summary}
            </h3>

          </div>

        </div>

      </div>

    </div>

  )}

</Section>

     
    </div>
  );
};

const Section = ({ title, children, className = "" }) => (
  <div className={`rounded-[32px] shadow-xl p-10 ${className}`}>
    <h2 className="text-3xl font-bold mb-8">
      {title}
    </h2>

    {children}
  </div>
);

const DoctorCard = ({ title, value }) => (
  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
    <h3 className="font-semibold text-lg">
      {title}
    </h3>

    <p className="text-xl mt-2">
      {value}
    </p>
  </div>
);

const DoshaCard = ({ title, value, color }) => (
  <div className="bg-slate-50 rounded-[28px] p-8">

    <div className="flex justify-between items-center">

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <div className={`w-4 h-4 rounded-full ${getDotColor(color)}`} />

    </div>

    <div className="mt-8 h-4 bg-slate-200 rounded-full overflow-hidden">

      <div
        className="h-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6]"
        style={{
          width: `${value || 0}%`,
        }}
      />

    </div>

  </div>
);

const getDotColor = (color) => {
  switch (color) {
    case "violet":
      return "bg-violet-500";

    case "red":
      return "bg-red-500";

    case "emerald":
      return "bg-emerald-500";

    default:
      return "bg-slate-500";
  }
};

const getDoshaBarColor = (dosha) => {
  switch (dosha?.toLowerCase()) {
    case "vata":
      return "bg-violet-500";

    case "pitta":
      return "bg-red-500";

    case "kapha":
      return "bg-emerald-500";

    default:
      return "bg-slate-500";
  }
};
export default AyurvedaResult;