import {FaShieldAlt,FaHeartbeat,FaExclamationTriangle,FaChartLine,FaCheckCircle,FaUserMd} from "react-icons/fa";

const WellnessOverview = ({patient}) => {

  const blocks =
    patient?.ai_response?.blocks || [];

  const highestRisk =
    [...blocks].sort(
      (a,b) => b.score - a.score
    )[0];

  const criticalCount =
    blocks.filter(
      item => item.is_critical
    ).length;

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-[#173C68]">

          Wellness Overview

        </h2>

        <p className="text-slate-500 mt-1">

          Ayurveda Generated Wellness Assessment

        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <PremiumCard
          title="Overall Score"
          value={patient?.composite_score || "-"}
          icon={<FaShieldAlt />}
          color="from-red-500 to-orange-500"
        />

        <PremiumCard
          title="Risk Band"
          value={patient?.risk_band || "-"}
          icon={<FaHeartbeat />}
          color="from-amber-500 to-yellow-500"
        />

        <PremiumCard
          title="Highest Risk"
          value={highestRisk?.title || "-"}
          subValue={highestRisk ? `${highestRisk.score}%` : "-"}
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
          title="Completion"
          value={`${patient?.ai_response?.total_completion_pct || 0}%`}
          icon={<FaCheckCircle />}
          color="from-emerald-500 to-green-600"
        />

        <PremiumCard
          title="Total Domains"
          value={blocks.length}
          icon={<FaUserMd />}
          color="from-cyan-500 to-blue-600"
        />

      </div>

    </div>

  );

};

const PremiumCard = ({title,value,subValue,icon,color}) => (

  <div className={`bg-gradient-to-r ${color} rounded-[32px] p-6 text-white shadow-lg min-h-[170px] flex flex-col justify-between`}>

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

export default WellnessOverview;