import { FaShieldAlt,FaHeartbeat,FaExclamationTriangle,FaLeaf,FaClipboardCheck,FaChartLine } from "react-icons/fa";
import { useEffect,useState } from "react";
import { getPatientReport } from "../../../services/reportService";

const OverviewTab = ({ patient }) => {

  const [reportData,setReportData] =
    useState(null);

  const [loading,setLoading] =
    useState(true);

 const loadReport =
    async () => {

      try {

        const data =
          await getPatientReport(
            patient.id
          );

        console.log(
          "REPORT RESPONSE:",
          data
        );

        setReportData(
          data.patient
        );

      } catch(error){

        console.error(
          error
        );

      } finally {

        setLoading(
          false
        );

      }

    };
  useEffect(() => {

    if(patient?.id){

      loadReport();

    }

  },[patient?.id]);

  if(loading){

    return (

      <div className="bg-white rounded-[32px] p-8">

        Loading Report...

      </div>

    );

  }

 

  

  const blocks =
    reportData?.ai_response?.blocks || [];

  const highestRisk =
    [...blocks].sort(
      (a,b) => b.score - a.score
    )[0];

  const criticalCount =
    blocks.filter(
      item => item.is_critical
    ).length;

  const prakritiCount =
    Object.keys(
      reportData?.prakriti_answers || {}
    ).length;

  const lifestyleCount =
    Object.keys(
      reportData?.matrix_answers || {}
    ).length;


const clinical = reportData?.clinical_answers || {};
const lifestyle = reportData?.matrix_answers || {};

const topRisks = [...blocks]
  .sort((a,b) => b.score - a.score)
  .slice(0,4);

 return (
  <div className="space-y-6">

    {/* HEADER */}

    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-9 bg-white rounded-[32px] p-8 shadow-sm">

        <p className="text-green-600 font-medium text-sm">
          Assessment Completed
        </p>

        <h1 className="text-4xl font-bold text-[#173C68] mt-3">
          Patient Wellness Overview
        </h1>

        <p className="text-slate-500 mt-2">
          Complete AI, Ayurveda, Lifestyle and Clinical Summary
        </p>

        <div className="grid grid-cols-4 gap-4 mt-8">

          <InfoCard
            label="Patient"
            value={patient?.name}
          />

          <InfoCard
            label="Gender"
            value={patient?.gender}
          />

          <InfoCard
            label="Risk Band"
            value={reportData?.risk_band}
          />

          <InfoCard
            label="Assessment ID"
            value={reportData?.assessment_id?.slice(0,8)}
          />

        </div>

      </div>

      <div className="col-span-3">

        <div className="bg-gradient-to-br from-[#173C68] to-[#275892] rounded-[32px] p-8 text-white shadow-xl">

          <h2 className="text-xl font-semibold">
            Wellness Snapshot
          </h2>

          <h1 className="text-6xl font-bold mt-6">
            {reportData?.composite_score}
          </h1>

          <div className="mt-5">

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                reportData?.risk_band === "High"
                  ? "bg-red-500"
                  : reportData?.risk_band === "Moderate"
                  ? "bg-orange-500"
                  : "bg-green-500"
              }`}
            >
              {reportData?.risk_band}
            </span>

          </div>

          <div className="mt-8 space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-white/70">
                Completion
              </span>

              <span>
                {reportData?.ai_response?.total_completion_pct}%
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/70">
                Critical Domains
              </span>

              <span>{criticalCount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/70">
                Lifestyle Responses
              </span>

              <span>{lifestyleCount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/70">
                Ayurveda Responses
              </span>

              <span>{prakritiCount}</span>
            </div>

          </div>

        </div>

      </div>

    </div>

    {/* TOP RISKS */}

    <div className="grid grid-cols-4 gap-6">

      {topRisks.map(item => (

        <div
          key={item.id}
          className="bg-white rounded-[28px] p-6 shadow-sm border"
        >

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {item.score}%
              </h2>

            </div>

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${
                item.risk_level === "High"
                  ? "bg-red-500"
                  : item.risk_level === "Moderate"
                  ? "bg-orange-500"
                  : "bg-green-500"
              }`}
            >
              <FaChartLine />
            </div>

          </div>

          <div className="mt-5">

            <span
              className={`px-3 py-1 rounded-full text-xs ${
                item.risk_level === "High"
                  ? "bg-red-100 text-red-600"
                  : item.risk_level === "Moderate"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {item.risk_level}
            </span>

          </div>

        </div>

      ))}

    </div>

    {/* RISK DOMAINS */}

    <div className="bg-white rounded-[32px] p-8 shadow-sm">

      <h2 className="text-2xl font-semibold text-[#173C68] mb-6">
        Risk Domains
      </h2>

      <div className="space-y-5">

        {blocks.map(item => (

          <div key={item.id}>

            <div className="flex justify-between mb-2">

              <h3 className="font-medium">
                {item.title}
              </h3>

              <span>
                {item.score}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

              <div
                className={`h-full ${
                  item.risk_level === "High"
                    ? "bg-red-500"
                    : item.risk_level === "Moderate"
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                style={{
                  width:`${item.score}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

    {/* LIFESTYLE + CLINICAL */}

    <div className="grid grid-cols-2 gap-6">

      <SectionCard title="Lifestyle Summary">

        <InfoCard label="Food Style" value={lifestyle.food_style} />
        <InfoCard label="Activity" value={lifestyle.activity_level} />
        <InfoCard label="Water Intake" value={lifestyle.water_intake} />
        <InfoCard label="Environment" value={lifestyle.natural_environment} />
        <InfoCard label="Retreat Goal" value={lifestyle.retreat_goal} />
        <InfoCard label="Mind Body" value={lifestyle.mind_body_practice} />

      </SectionCard>

      <SectionCard title="Clinical Summary">

        <InfoCard label="Height" value={clinical.height} />
        <InfoCard label="Medication" value={clinical.takingMedication} />
        <InfoCard label="Blood Pressure" value={clinical.bloodPressureKnown} />
        <InfoCard label="Allergies" value={clinical.hasAllergies} />
        <InfoCard label="Primary Goal" value={clinical.primaryGoal} />
        <InfoCard label="Fatigue" value={clinical.fatiguePattern} />

      </SectionCard>

    </div>

    {/* AYURVEDA */}

    <SectionCard title="Ayurveda Assessment">

      <div className="grid grid-cols-3 gap-4">

        <InfoCard
          label="Prakriti Questions"
          value={Object.keys(reportData?.prakriti_answers || {}).length}
        />

        <InfoCard
          label="Vikriti Questions"
          value={Object.keys(reportData?.vikriti_answers || {}).length}
        />

        <InfoCard
          label="Ama Questions"
          value={Object.keys(reportData?.ama_answers || {}).length}
        />

      </div>

    </SectionCard>

  </div>
);

};
const InfoCard = ({ label,value }) => (
  <div className="bg-[#F8FAFC] border rounded-[20px] p-4">
    <p className="text-xs text-slate-500">
      {label}
    </p>

   <p className="text-lg font-semibold text-[#173C68] mt-2">
  {Array.isArray(value)
    ? value.join(", ")
    : value || "-"}
</p>
  </div>
);
const SectionCard = ({ title,children }) => (
  <div className="bg-white rounded-[32px] p-8 shadow-sm">
    <h2 className="text-2xl font-semibold text-[#173C68] mb-6">
      {title}
    </h2>

    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);
const PremiumCard = ({
  title,
  value,
  subValue,
  icon,
  color
}) => (

  <div
    className={`
      bg-gradient-to-r
      ${color}
      rounded-[32px]
      p-6
      text-white
      shadow-lg
      min-h-[160px]
      flex
      flex-col
      justify-between
      hover:scale-[1.02]
      transition-all
    `}
  >

    <div className="flex justify-between items-start">

      <div>

        <p className="text-sm text-white/80">
          {title}
        </p>

      </div>

      <div className="text-2xl">
        {icon}
      </div>

    </div>

    <div>

      <h2 className="text-4xl font-bold">
        {value}
      </h2>

      {

        subValue && (

          <p className="mt-2 text-white/80">
            {subValue}
          </p>

        )

      }

    </div>

  </div>

);

export default OverviewTab;