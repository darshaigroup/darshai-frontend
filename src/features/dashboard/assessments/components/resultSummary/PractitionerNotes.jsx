const PractitionerNotes = ({
  doctorNotes,
  selectedSignature,
}) => {

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold mb-8">
        Practitioner Notes
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <Field
          title="Primary Diagnosis"
          value={
            doctorNotes?.primaryDiagnosis || "N/A"
          }
        />

        <Field
          title="Secondary Contributors"
          value={
            doctorNotes?.secondaryContributors || "N/A"
          }
        />

        <Field
          title="Dosha Imbalance"
          value={
            doctorNotes?.doshaImbalance || "N/A"
          }
        />

        <Field
          title="Root Cause"
          value={
            doctorNotes?.rootCause  || "N/A"
          }
        />

        <Field
          title="Priority Intervention"
          value={
            doctorNotes?.priorityIntervention || "N/A"
          }
        />

        <Field
          title="Follow Up"
          value={
            doctorNotes?.followUpTimeline || "N/A"
          }
        />

      </div>

      {selectedSignature && (

        <div className="mt-10 border-t pt-8">

          <img
            src={
              selectedSignature.signature_url
            }
            alt="Signature"
            className="h-20 mb-4"
          />

          <div className="font-bold">
            {
              selectedSignature.practitioner_name || "N/A"
            }
          </div>

          <div className="text-slate-500">
            {
              selectedSignature.designation 
            }
          </div>

        </div>

      )}

    </div>

  );

};

const Field = ({
  title,
  value,
}) => (

  <div className="bg-slate-50 rounded-2xl p-5">

    <div className="text-sm text-slate-500">
      {title}
    </div>

    <div className="font-semibold mt-2">
      {value || "-"}
    </div>

  </div>

);

export default PractitionerNotes;