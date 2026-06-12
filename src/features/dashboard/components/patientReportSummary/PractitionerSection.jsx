const PractitionerSection = ({patient}) => (

  <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

    <h2 className="text-2xl font-bold mb-8">

      Practitioner Notes

    </h2>

    <div className="grid md:grid-cols-2 gap-5">

      <Field
        title="Primary Diagnosis"
        value={
          patient?.primary_diagnosis || "N/A"
        }
      />

      <Field
        title="Secondary Contributors"
        value={
          patient?.secondary_contributors || "N/A"
        }
      />

      <Field
        title="Dosha Imbalance"
        value={
          patient?.dosha_imbalance || "N/A"
        }
      />

      <Field
        title="Root Cause"
        value={
          patient?.root_cause || "N/A"
        }
      />

      <Field
        title="Priority Intervention"
        value={
          patient?.priority_intervention || "N/A"
        }
      />

      <Field
        title="Follow Up"
        value={
          patient?.follow_up_timeline || "N/A"
        }
      />

    </div>

    {

      patient?.signature_url && (

        <div className="mt-10 border-t pt-8">

          <img
            src={patient.signature_url}
            alt="Signature"
            className="h-20 mb-4"
          />

          <div className="font-bold">

            {
              patient?.practitioner_name || "N/A"
            }

          </div>

          <div className="text-slate-500">

            {
              patient?.designation || ""
            }

          </div>

        </div>

      )

    }

  </div>

);

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

export default PractitionerSection;