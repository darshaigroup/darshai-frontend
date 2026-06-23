import { useLocation, useNavigate } from "react-router-dom";

const AyurvedaResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient;
  const riskReport = location.state?.riskReport;
  const lifestyleMatrix = location.state?.lifestyleMatrix;
  const report = location.state?.report?.data || location.state?.report || {};

  // console.log("LOCATION STATE", location.state);
  // console.log("PATIENT", patient);
  // console.log("RISK REPORT", riskReport);
  // console.log("LIFESTYLE MATRIX", lifestyleMatrix);
  // console.log("REPORT", report);

  if (!report || !report.prakriti) {
  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">
        Debug Ayurveda Report
      </h2>

      <pre className="bg-black text-green-400 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(location.state, null, 2)}
      </pre>
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
              <h3 className="text-2xl font-semibold">{report.patient_name}</h3>

              {patient && <p className="text-slate-500">{patient.gender}</p>}
            </div>
          </div>

          <div className="text-center">

  <div
    className={`w-56 h-56 rounded-full flex items-center justify-center shadow-2xl ${
      report.risk_tier === "High"
        ? "bg-gradient-to-br from-red-600 to-red-400"
        : report.risk_tier === "Medium"
        ? "bg-gradient-to-br from-amber-500 to-orange-400"
        : "bg-gradient-to-br from-[#0F766E] to-[#14B8A6]"
    }`}
  >

    <div className="w-44 h-44 bg-white rounded-full flex flex-col items-center justify-center">

      <p
        className={`text-3xl font-bold ${
          report.risk_tier === "High"
            ? "text-red-600"
            : report.risk_tier === "Medium"
            ? "text-amber-600"
            : "text-emerald-600"
        }`}
      >
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
              {report?.prakriti?.prakriti_type || "-"}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <DoshaCard
            title="Vata"
            value={report?.prakriti?.vata_pct || 0}
            color="violet"
          />

          <DoshaCard
            title="Pitta"
            value={report?.prakriti?.pitta_pct || 0}
            color="red"
          />

          <DoshaCard
            title="Kapha"
            value={report?.prakriti?.kapha_pct || 0}
            color="emerald"
          />
        </div>
      </div>

      {/* VIKRITI */}

      <div className="bg-white rounded-[32px] shadow-xl p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Vikriti Analysis
            </h2>

            <p className="text-slate-500 mt-2">Current Dosha Distribution</p>
          </div>

          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <p className="text-xs uppercase tracking-wider">Risk Tier</p>

            <p className="text-xl font-bold">{report.risk_tier}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <InteractiveDoshaCard
            title="Vata"
            value={report.vikriti?.vata_pct}
            highlight
          />

          <InteractiveDoshaCard
            title="Pitta"
            value={report.vikriti?.pitta_pct}
            highlight
          />

          <InteractiveDoshaCard
            title="Kapha"
            value={report.vikriti?.kapha_pct}
            highlight
          />
        </div>
      </div>

      {/* AGNI */}

     <div className="bg-white rounded-[32px] shadow-xl p-10">

  <div className="flex justify-between items-center mb-8">

    <div>

      <h2 className="text-3xl font-bold text-slate-900">
        Agni Assessment
      </h2>

      <p className="text-slate-500 mt-2">
        Digestive Fire Analysis
      </p>

    </div>

    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">

      <span className="text-4xl">
        🔥
      </span>

    </div>

  </div>

  <div className="rounded-[28px] bg-gradient-to-r from-orange-500 to-red-500 p-10 text-center text-white shadow-lg">

    <p className="text-sm uppercase tracking-[0.25em] opacity-80">
      Agni Type
    </p>

    <h3 className="text-5xl font-bold mt-4">
      {report.agni?.agni_type}
    </h3>

  </div>

</div>
      {/* AMA */}

      <div className="bg-white rounded-[32px] shadow-xl p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Ama Assessment
            </h2>

            <p className="text-slate-500 mt-2">Toxin Accumulation Status</p>
          </div>

          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-white">
           
            <p className="text-xl font-bold">{report.ama?.severity}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AmaInsightCard
            title="Ama Burden"
            value={`${report.ama?.percentage}%`}
            description="Toxin accumulation level"
          />

          <AmaInsightCard
            title="Severity"
            value={report.ama?.severity}
            description="Current Ama status"
          />
        </div>
      </div>

      {/* CLINICAL SUMMARY */}

      {/* <Section title="Clinical Intelligence Summary" className="bg-gradient-to-br from-[#0F766E] via-[#11998E] to-[#14B8A6] text-white">

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

</Section> */}
      <div className="bg-white rounded-[32px] shadow-xl p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Continue Clinical Assessment
          </h2>

          <p className="text-slate-500 mb-8">
            Complete medical history, medications, measurements and wellness
            goals.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/clinical-data-assessment", {
                state: {
                  patient,

                  riskReport,

                  lifestyleMatrix,

                  ayurvedaReport: report,
                },
              })
            }
            className="px-10 py-5 rounded-2xl text-lg font-semibold bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-lg hover:scale-[1.02] transition-all"
          >
            Continue Clinical Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children, className = "" }) => (
  <div className={`rounded-[32px] shadow-xl p-10 ${className}`}>
    <h2 className="text-3xl font-bold mb-8">{title}</h2>

    {children}
  </div>
);

const DoctorCard = ({ title, value }) => (
  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
    <h3 className="font-semibold text-lg">{title}</h3>

    <p className="text-xl mt-2">{value}</p>
  </div>
);

const DoshaCard = ({ title, value, color }) => {
  const styles = {
    violet: {
      card: "from-violet-50 to-violet-100 border-violet-200",
      bar: "from-violet-500 to-violet-700",
      text: "text-violet-700",
    },

    red: {
      card: "from-red-50 to-red-100 border-red-200",
      bar: "from-red-500 to-red-700",
      text: "text-red-700",
    },

    emerald: {
      card: "from-emerald-50 to-emerald-100 border-emerald-200",
      bar: "from-emerald-500 to-emerald-700",
      text: "text-emerald-700",
    },
  };

  return (
    <div
      className={`
        rounded-[28px]
        border
        bg-gradient-to-br
        p-6
        ${styles[color].card}
      `}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`
            text-xl
            font-bold
            ${styles[color].text}
          `}
        >
          {title}
        </h3>

        <span
          className={`
            text-3xl
            font-bold
            ${styles[color].text}
          `}
        >
          {value}%
        </span>
      </div>

      <div className="mt-5 h-4 bg-white rounded-full overflow-hidden">
        <div
          className={`
            h-full
            bg-gradient-to-r
            ${styles[color].bar}
          `}
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <p className="text-sm text-slate-500 mt-3">Constitutional Balance</p>
    </div>
  );
};

const InteractiveDoshaCard = ({ title, value, level, highlight = false }) => (
  <div
    className={`
      rounded-[28px]
      p-8
      transition-all
      duration-300
      cursor-pointer
      hover:-translate-y-1
      hover:shadow-2xl
      ${
        highlight
          ? "bg-gradient-to-br from-green-50 to-green-50 border-2 border-green-300"
          : "bg-slate-50 border border-slate-200"
      }
    `}
  >
    <p className="text-slate-500 text-sm uppercase tracking-wider">{title}</p>

    <h3 className="text-5xl font-bold text-slate-900 mt-3">{value}%</h3>
  </div>
);

const AmaInsightCard = ({ title, value, description }) => (
  <div className="rounded-[28px] p-8 bg-gradient-to-br from-amber-50 to-red-50 border border-amber-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <p className="text-sm uppercase tracking-wider text-slate-500">{title}</p>

    <h3 className="text-5xl font-bold text-slate-900 mt-3">{value}</h3>

    <p className="text-slate-500 mt-3">{description}</p>
  </div>
);
export default AyurvedaResult;
