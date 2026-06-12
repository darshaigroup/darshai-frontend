import {ArrowUp,ArrowDown,Activity,HeartPulse} from "lucide-react";

const AyurvedaAssessment = ({patient}) => {

  const report =
    patient?.ayurveda_report ||
    patient ||
    {};

  const vata =
    report?.prakriti?.vata_pct || 0;

  const pitta =
    report?.prakriti?.pitta_pct || 0;

  const kapha =
    report?.prakriti?.kapha_pct || 0;

  const dominant =
    [
      {
        name:"Vata",
        value:vata
      },
      {
        name:"Pitta",
        value:pitta
      },
      {
        name:"Kapha",
        value:kapha
      }
    ].sort(
      (a,b) =>
        b.value - a.value
    )[0];

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Ayurveda Assessment

          </h2>

          <p className="text-slate-500 mt-1">

            Constitutional Analysis

          </p>

        </div>

        <div className="flex gap-3">

          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">

            {report?.primary_dosha || "-"}

          </span>

          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">

            {report?.risk_tier || "-"}

          </span>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <InfoCard
          icon={<HeartPulse size={22} />}
          title="Primary Dosha"
          value={report?.primary_dosha}
          bg="bg-blue-50"
        />

        <InfoCard
          icon={<Activity size={22} />}
          title="Agni"
          value={report?.agni?.agni_type}
          bg="bg-orange-50"
        />

        <InfoCard
          icon={<HeartPulse size={22} />}
          title="Risk Tier"
          value={report?.risk_tier}
          bg="bg-red-50"
        />

      </div>

      <div className="bg-slate-50 rounded-[28px] p-6">

        <h3 className="font-bold text-xl mb-6">

          Dosha Distribution

        </h3>

        <DoshaBar
          name="Vata"
          value={vata}
          color="bg-blue-500"
          dominant={
            dominant?.name === "Vata"
          }
        />

        <DoshaBar
          name="Pitta"
          value={pitta}
          color="bg-orange-500"
          dominant={
            dominant?.name === "Pitta"
          }
        />

        <DoshaBar
          name="Kapha"
          value={kapha}
          color="bg-green-500"
          dominant={
            dominant?.name === "Kapha"
          }
        />

      </div>

    </div>

  );

};

const InfoCard = ({icon,title,value,bg}) => (

  <div className={`${bg} rounded-[24px] p-6`}>

    <div className="mb-3">

      {icon}

    </div>

    <div className="text-sm text-slate-500">

      {title}

    </div>

    <div className="font-bold text-xl mt-2">

      {value || "-"}

    </div>

  </div>

);

const DoshaBar = ({name,value,color,dominant}) => (

  <div className="mb-5">

    <div className="flex justify-between mb-2">

      <div className="flex items-center gap-2">

        <span className="font-semibold">

          {name}

        </span>

        {

          dominant ? (

            <ArrowUp
              size={16}
              className="text-red-500"
            />

          ) : (

            <ArrowDown
              size={16}
              className="text-green-500"
            />

          )

        }

      </div>

      <span className="font-bold">

        {value}%

      </span>

    </div>

    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">

      <div
        className={`h-full ${color}`}
        style={{
          width:`${value}%`
        }}
      />

    </div>

  </div>

);

export default AyurvedaAssessment;