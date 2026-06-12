import { FaShieldAlt,FaHeartbeat,FaExclamationTriangle,FaLeaf,FaClipboardCheck,FaChartLine } from "react-icons/fa";
import { useEffect,useState } from "react";
import { getPatientReport } from "../../../Services/reportService";

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



  return (

    <div className="grid grid-cols-12 gap-6">

      {/* LEFT SECTION */}

      <div className="col-span-9">

        <div className="grid grid-cols-3 gap-6">

          <PremiumCard
  title="Overall Risk Score"
  value={
    reportData?.composite_score || "-"
  }
  icon={<FaShieldAlt />}
  color="from-red-500 to-orange-500"
/>

<PremiumCard
  title="Risk Band"
  value={
    reportData?.risk_band || "-"
  }
  icon={<FaHeartbeat />}
  color="from-amber-500 to-yellow-500"
/>

          <PremiumCard
            title="Highest Risk Domain"
            value={
              highestRisk?.title || "-"
            }
            subValue={
              highestRisk
                ? `${highestRisk.score}%`
                : "-"
            }
            icon={<FaExclamationTriangle />}
            color="from-rose-500 to-red-600"
          />

          <PremiumCard
            title="Critical Domains"
            value={criticalCount}
            icon={<FaChartLine />}
            color="from-violet-500 to-purple-600"
          />

          <PremiumCard
            title="Prakriti Responses"
            value={prakritiCount}
            icon={<FaLeaf />}
            color="from-emerald-500 to-green-600"
          />

          <PremiumCard
            title="Lifestyle Parameters"
            value={lifestyleCount}
            icon={<FaClipboardCheck />}
            color="from-cyan-500 to-blue-600"
          />

        </div>

        {/* TOP RISK DOMAINS */}

        <div className="bg-white rounded-[32px] p-8 shadow-sm mt-6">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-semibold text-[#173C68]">
                Risk Domains
              </h2>

              <p className="text-slate-500 text-sm">
                AI Wellness Risk Analysis
              </p>

            </div>

          </div>

          <div className="space-y-5">

            {

              [...blocks]

                .sort(
                  (a,b) => b.score - a.score
                )

                .slice(0,5)

                .map((item) => (

                  <div
                    key={item.id}
                    className="bg-[#F8FAFC] rounded-[24px] p-5 border"
                  >

                    <div className="flex justify-between mb-3">

                      <h3 className="font-semibold text-[#173C68]">
                        {item.title}
                      </h3>

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${
                            item.risk_level === "High"
                              ? "bg-red-100 text-red-600"
                              : item.risk_level === "Moderate"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-green-100 text-green-600"
                          }
                        `}
                      >
                        {item.risk_level}
                      </span>

                    </div>

                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                      <div
                        className={`
                          h-full
                          rounded-full
                          ${
                            item.risk_level === "High"
                              ? "bg-red-500"
                              : item.risk_level === "Moderate"
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }
                        `}
                        style={{
                          width:`${item.score}%`
                        }}
                      />

                    </div>

                    <div className="flex justify-end mt-2">

                      <span className="text-sm text-slate-500">
                        {item.score}%
                      </span>

                    </div>

                  </div>

                ))

            }

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="col-span-3">

        <div className="bg-[#173C68] text-white rounded-[32px] p-8 h-full flex flex-col justify-between shadow-lg">

          <div>

            <h2 className="text-2xl font-bold">
              Wellness Snapshot
            </h2>

            <p className="text-white/70 mt-2">
              Composite Wellness Assessment
            </p>

          </div>

          <div className="my-10">

            <h1 className="text-7xl font-bold">
              {
                patient?.ai_response?.composite_score || "-"
              }
            </h1>

            <div className="mt-5">

             <span
  className={`
    px-5
    py-2
    rounded-full
    text-sm
    font-semibold
    ${
      reportData?.risk_band === "High"
        ? "bg-red-500"
        : reportData?.risk_band === "Moderate"
        ? "bg-orange-500"
        : "bg-green-500"
    }
  `}
>
  {reportData?.risk_band}
</span>

            </div>

          </div>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">

              <span className="text-white/70">
                Assessment ID
              </span>

              <span>
  {
    reportData?.assessment_id
      ?.slice(0,8)
  }
</span>

            </div>

            <div className="flex justify-between">

              <span className="text-white/70">
                Completion
              </span>

             <span>
  {
    reportData?.ai_response
      ?.total_completion_pct || 0
  }%
</span>

            </div>

            <div className="flex justify-between">

              <span className="text-white/70">
                Critical Domains
              </span>

              <span>
                {criticalCount}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-white/70">
                Patient
              </span>

              <span>
                {patient?.name}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

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