import {
  Activity,
  HeartPulse,
  Target,
  AlertTriangle,
  Ruler,
  Weight,
} from "lucide-react";

const ClinicalSummary = ({
  clinicalReport,
}) => {

  const answers =
    clinicalReport?.clinical_answers ||
    {};

  const height =
    Number(answers.height);

  const weight =
    Number(answers.weight);

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

      if (!value)
        return {
          label: "-",
          color:
            "bg-slate-100 text-slate-600",
        };

      if (value < 18.5)
        return {
          label:
            "Underweight",
          color:
            "bg-blue-100 text-blue-700",
        };

      if (value < 25)
        return {
          label: "Healthy",
          color:
            "bg-green-100 text-green-700",
        };

      if (value < 30)
        return {
          label:
            "Overweight",
          color:
            "bg-amber-100 text-amber-700",
        };

      return {
        label: "Obese",
        color:
          "bg-red-100 text-red-700",
      };

    };

  const bmiStatus =
    getBmiStatus(
      Number(bmi)
    );

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Clinical Findings
          </h2>

          <p className="text-slate-500 mt-1">
            Clinical & Lifestyle Assessment
          </p>

        </div>

      </div>

      {/* Vital Metrics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <MetricCard
          icon={<Ruler size={22} />}
          label="Height"
          value={
            height
              ? `${height} cm`
              : "-"
          }
        />

        <MetricCard
          icon={<Weight size={22} />}
          label="Weight"
          value={
            weight
              ? `${weight} kg`
              : "-"
          }
        />

        <MetricCard
          icon={
            <Activity size={22} />
          }
          label="Waist"
          value={
            answers.waistCircumference
              ? `${answers.waistCircumference} cm`
              : "-"
          }
        />

        <MetricCard
          icon={
            <HeartPulse size={22} />
          }
          label="BMI"
          value={
            bmi || "-"
          }
        />

      </div>

      {/* BMI Analysis */}

      <div className="bg-slate-50 rounded-3xl p-6 mb-8">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="font-bold text-lg">
              BMI Analysis
            </h3>

            <p className="text-slate-500">
              Calculated from
              height & weight
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${bmiStatus.color}`}
          >
            {bmiStatus.label}
          </span>

        </div>

        <div className="mt-5">

          <div className="text-4xl font-bold text-[#173C68]">

            {bmi || "-"}

          </div>

        </div>

      </div>

      {/* Health Details */}

      <div className="grid lg:grid-cols-2 gap-6">

        <InfoSection
          title="Primary Goal"
          icon={<Target />}
          value={
            answers.primaryGoal
          }
        />

        <InfoSection
          title="Medical Conditions"
          icon={
            <HeartPulse />
          }
          value={
            answers
              .medicalConditions
              ?.length
              ? answers.medicalConditions.join(
                  ", "
                )
              : "-"
          }
        />

        <InfoSection
          title="Allergies"
          icon={
            <AlertTriangle />
          }
          value={
            answers.allergies
              ? answers.allergyDetails
              : "None Reported"
          }
        />

        <InfoSection
          title="Additional Notes"
          icon={
            <Activity />
          }
          value={
            answers.additionalNotes ||
            "-"
          }
        />

      </div>

      

    </div>

  );

};

const MetricCard = ({
  icon,
  label,
  value,
}) => (

  <div className="bg-slate-50 rounded-3xl p-5">

    <div className="flex items-center gap-2 mb-3 text-[#173C68]">

      {icon}

    </div>

    <div className="text-sm text-slate-500">

      {label}

    </div>

    <div className="font-bold text-xl mt-2">

      {value}

    </div>

  </div>

);

const InfoSection = ({
  title,
  value,
  icon,
}) => (

  <div className="bg-slate-50 rounded-3xl p-6">

    <div className="flex items-center gap-2 mb-3 text-[#173C68]">

      {icon}

      <h3 className="font-semibold">
        {title}
      </h3>

    </div>

    <p className="text-slate-700 leading-relaxed">

      {value || "-"}

    </p>

  </div>

);

export default ClinicalSummary;