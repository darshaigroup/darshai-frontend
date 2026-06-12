import {Activity,HeartPulse,Ruler,Weight,Target,AlertTriangle} from "lucide-react";

const ClinicalAssessment = ({patient}) => {

  const clinical =
    patient?.clinical_answers || {};

  const height =
    Number(clinical?.height || 0);

  const weight =
    Number(clinical?.weight || 0);

  const bmi =
    height && weight
      ? (
          weight /
          Math.pow(
            height / 100,
            2
          )
        ).toFixed(1)
      : null;

  const getBmiStatus =
    (value) => {

      if(!value)
        return {
          label:"-",
          color:"bg-slate-100 text-slate-600"
        };

      if(value < 18.5)
        return {
          label:"Underweight",
          color:"bg-blue-100 text-blue-700"
        };

      if(value < 25)
        return {
          label:"Healthy",
          color:"bg-green-100 text-green-700"
        };

      if(value < 30)
        return {
          label:"Overweight",
          color:"bg-amber-100 text-amber-700"
        };

      return {
        label:"Obese",
        color:"bg-red-100 text-red-700"
      };

    };

  const bmiStatus =
    getBmiStatus(
      Number(bmi)
    );

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-[#173C68]">

          Clinical Assessment

        </h2>

        <p className="text-slate-500 mt-1">

          Clinical Measurements & Health Indicators

        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <MetricCard
          icon={<Ruler size={22} />}
          label="Height"
          value={height ? `${height} cm` : "-"}
        />

        <MetricCard
          icon={<Weight size={22} />}
          label="Weight"
          value={weight ? `${weight} kg` : "-"}
        />

        <MetricCard
          icon={<Activity size={22} />}
          label="Waist"
          value={clinical?.waistCircumference ? `${clinical.waistCircumference} cm` : "-"}
        />

        <MetricCard
          icon={<HeartPulse size={22} />}
          label="BMI"
          value={bmi || "-"}
        />

      </div>

      <div className="bg-slate-50 rounded-[28px] p-6 mb-8">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="font-bold text-lg">

              BMI Analysis

            </h3>

            <p className="text-slate-500">

              Based on height and weight

            </p>

          </div>

          <span className={`px-4 py-2 rounded-full font-semibold ${bmiStatus.color}`}>

            {bmiStatus.label}

          </span>

        </div>

        <div className="text-5xl font-bold text-[#173C68] mt-6">

          {bmi || "-"}

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <InfoCard
          icon={<Target />}
          title="Primary Goal"
          value={clinical?.primaryGoal}
        />

        <InfoCard
          icon={<HeartPulse />}
          title="Medical Conditions"
          value={
            clinical?.medicalConditions?.length
              ? clinical.medicalConditions.join(", ")
              : "-"
          }
        />

        <InfoCard
          icon={<AlertTriangle />}
          title="Allergies"
          value={
            clinical?.allergies
              ? clinical?.allergyDetails
              : "None Reported"
          }
        />

        <InfoCard
          icon={<Activity />}
          title="Additional Notes"
          value={clinical?.additionalNotes}
        />

      </div>

    </div>

  );

};

const MetricCard = ({icon,label,value}) => (

  <div className="bg-slate-50 rounded-[24px] p-5">

    <div className="text-[#173C68] mb-3">

      {icon}

    </div>

    <div className="text-sm text-slate-500">

      {label}

    </div>

    <div className="font-bold text-xl mt-2">

      {value || "-"}

    </div>

  </div>

);

const InfoCard = ({icon,title,value}) => (

  <div className="bg-slate-50 rounded-[24px] p-6">

    <div className="flex items-center gap-2 mb-3 text-[#173C68]">

      {icon}

      <h3 className="font-semibold">

        {title}

      </h3>

    </div>

    <p className="text-slate-700">

      {value || "-"}

    </p>

  </div>

);

export default ClinicalAssessment;