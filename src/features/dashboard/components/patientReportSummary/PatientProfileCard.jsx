
const InfoCard = ({
  title,
  value,
}) => (

  <div className="bg-slate-50 rounded-2xl p-5">

    <div className="text-sm text-slate-500">
      {title}
    </div>

    <div className="font-bold text-lg mt-2 break-words">
      {value || "-"}
    </div>

  </div>

);
const PatientProfileCard = ({patient}) => (

  <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

    <h2 className="text-2xl font-bold mb-6">
      Patient Information
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

      <InfoCard
        title="Name"
        value={patient?.name}
      />

      <InfoCard
        title="Gender"
        value={patient?.gender}
      />

      <InfoCard
        title="Phone"
        value={patient?.phone}
      />

      <InfoCard
        title="Location"
        value={patient?.location}
      />

      <InfoCard
        title="Occupation"
        value={patient?.occupation}
      />

      <InfoCard
        title="Email"
        value={patient?.email}
      />

      <InfoCard
        title="Assessment ID"
        value={
          patient?.assessment_id
        }
      />

      <InfoCard
        title="Risk Band"
        value={
          patient?.risk_band
        }
      />

    </div>

  </div>

);

export default PatientProfileCard;