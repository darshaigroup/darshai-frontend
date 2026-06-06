import { useLocation } from "react-router-dom";
import { useState } from "react";
const ClinicalDataResult = () => {

  

  const location = useLocation();

  const patient =
    location.state?.patient;

  const riskReport =
    location.state?.riskReport;


  const ayurvedaReport =
    location.state?.ayurvedaReport;

  const clinicalReport =
    location.state?.clinicalData ||
    location.state?.clinicalReport;

  const answers =
    clinicalReport?.clinical_answers || {};
    const [doctorNotes, setDoctorNotes] = useState({
  primaryDiagnosis: "",
  secondaryContributors: "",
  doshaImbalance:
    ayurvedaReport?.primary_dosha || "",
  sampraptiStage: "",
  rootCause: "",
  priorityIntervention: "",
  protocolTier: "",
  followUpTimeline: "",
  practitionerSignature: "",
});

const handleLabUpload = (
  event
) => {

  const files =
    Array.from(
      event.target.files
    );

  setLabFiles(
    (prev) => [
      ...prev,
      ...files,
    ]
  );

};

const [hasLabReport, setHasLabReport] =
  useState(false);

const [labFiles, setLabFiles] =
  useState([]);
const handleDoctorNoteChange = (
  field,
  value
) => {

  setDoctorNotes((prev) => ({
    ...prev,
    [field]: value,
  }));

};

const saveDoctorNotes = async () => {

  console.log(
    "DOCTOR NOTES",
    doctorNotes
  );

  // later call API here

};
  
   
  if (!clinicalReport) {

    return (
      <div className="p-10 text-center text-xl font-semibold">
        No Clinical Report Found
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-8">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-[32px] p-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Integrated Clinical Report
        </h1>

        <p className="mt-3 text-white/80">
          Functional Medicine • Ayurveda • Clinical Data
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-8">

          <HeaderCard
            title="Patient"
            value={patient?.name}
          />

          <HeaderCard
            title="Gender"
            value={patient?.gender}
          />

          <HeaderCard
            title="Status"
            value={clinicalReport?.status}
          />

          <HeaderCard
            title="Assessment ID"
            value={clinicalReport?.id?.slice(0, 8)}
          />

        </div>

      </div>

      {/* EXECUTIVE SUMMARY */}

     <SectionCard title="Integrated Clinical Summary">

  {/* RISK ASSESSMENT */}

  <h3 className="text-xl font-bold text-slate-900 mb-4">
    Risk Assessment Overview
  </h3>

  <div className="grid md:grid-cols-2 gap-5">

    <SummaryCard
      title="Composite Risk Score"
      value={
        riskReport?.compositeScore ||
        "-"
      }
    />

    <SummaryCard
      title="Risk Band"
      value={
        riskReport?.riskBand ||
        "-"
      }
    />

  </div>

  {riskReport?.blocks?.length > 0 && (

    <div className="mt-6">

      <h4 className="font-semibold text-slate-800 mb-3">
        Critical Factors Affecting Risk
      </h4>

      <div className="flex flex-wrap gap-3">

        {riskReport.blocks

          .filter(
            (block) =>
              block.risk_band?.toLowerCase() === "high" ||
              block.risk_level?.toLowerCase() === "high"
          )

          .map((block) => (

            <span
              key={block.id}
              className="px-4 py-2 rounded-full bg-red-50 text-red-700 font-medium"
            >
              {block.block_title || block.title}
            </span>

          ))}

      </div>

    </div>

  )}

  {/* AYURVEDA DOSHA */}

  <div className="mt-10 border-t pt-8">

    <h3 className="text-xl font-bold text-slate-900 mb-4">
      Ayurvedic Constitution Analysis
    </h3>

    <div className="grid md:grid-cols-4 gap-5">

      <MetricCard
        title="Vata"
        value={`${ayurvedaReport?.prakriti?.vata_pct || 0}%`}
      />

      <MetricCard
        title="Pitta"
        value={`${ayurvedaReport?.prakriti?.pitta_pct || 0}%`}
      />

      <MetricCard
        title="Kapha"
        value={`${ayurvedaReport?.prakriti?.kapha_pct || 0}%`}
      />

      <MetricCard
        title="Constitution Type"
        value={
          ayurvedaReport?.prakriti?.prakriti_type ||
          "-"
        }
      />

    </div>

  </div>

  {/* AGNI + AMA */}

  <div className="mt-10 border-t pt-8">

    <h3 className="text-xl font-bold text-slate-900 mb-4">
      Digestive & Toxic Load Analysis
    </h3>

    <div className="grid md:grid-cols-2 gap-5">

      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6">

        <p className="text-sm text-orange-600 font-medium">
          AGNI
        </p>

        <h4 className="text-2xl font-bold text-slate-900 mt-2">
          {ayurvedaReport?.agni?.agni_type || "-"}
        </h4>

        <p className="mt-2 text-slate-600">
          Linked Dosha:
          {" "}
          {ayurvedaReport?.agni?.linked_dosha || "-"}
        </p>

      </div>

      <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-6">

        <p className="text-sm text-cyan-600 font-medium">
          AMA
        </p>

        <h4 className="text-2xl font-bold text-slate-900 mt-2">
          {ayurvedaReport?.ama?.severity || "-"}
        </h4>

        <p className="mt-2 text-slate-600">
          {ayurvedaReport?.ama?.percentage || 0}%
        </p>

      </div>

    </div>

  </div>

  {/* AYURVEDA SUMMARY */}

  <div className="mt-10 border-t pt-8">

    <h3 className="text-xl font-bold text-slate-900 mb-4">
      Ayurveda Clinical Summary
    </h3>

    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">

      <p className="leading-relaxed text-slate-700">
        {ayurvedaReport?.clinical_summary || "-"}
      </p>

    </div>

  </div>

  {/* WELLNESS GOAL */}

  <div className="mt-10 border-t pt-8">

    <h3 className="text-xl font-bold text-slate-900 mb-4">
      Patient Wellness Goal
    </h3>

    <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-3xl p-8 text-white">

      <p className="text-sm uppercase tracking-wider opacity-80">
        Primary Goal
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {answers.primaryGoal || "-"}
      </h2>

      {answers.goalOther && (

        <p className="mt-4 opacity-90">
          {answers.goalOther}
        </p>

      )}

    </div>

  </div>

</SectionCard>

      {/* MEDICAL CONDITIONS */}

      <SectionCard title="Existing Medical Conditions">

        <div className="flex flex-wrap gap-3">

          {answers.medicalConditions?.length
            ? answers.medicalConditions.map(
                (condition) => (

                  <Tag
                    key={condition}
                    label={condition}
                    type="danger"
                  />

                )
              )
            : (
              <p className="text-gray-500">
                No medical conditions reported
              </p>
            )}

        </div>

      </SectionCard>

      {/* PHYSICAL METRICS */}

      <SectionCard title="Physical Measurements">

        <div className="grid md:grid-cols-4 gap-5">

          <MetricCard
            title="Height"
            value={`${answers.height || "-"} cm`}
          />

          <MetricCard
            title="Weight"
            value={`${answers.weight || "-"} kg`}
          />

          <MetricCard
            title="Waist"
            value={`${answers.waistCircumference || "-"} cm`}
          />

          <MetricCard
            title="Blood Pressure"
            value={
              answers.bloodPressure
                ? `${answers.bloodPressure.systolic}/${answers.bloodPressure.diastolic}`
                : "-"
            }
          />

        </div>

      </SectionCard>

      {/* MEDICATIONS */}

      <SectionCard title="Medications & Supplements">

       {Array.isArray(
  answers.medicationDetails
) ? (

  <div className="grid md:grid-cols-2 gap-5">

    {answers.medicationDetails.map(
      (med, index) => (

                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                >

                  <h3 className="font-bold text-lg">
                    {med.name}
                  </h3>

                  <p className="mt-2">
                    Dose: {med.dose}
                  </p>

                  <p>
                    Duration: {med.duration}
                  </p>

                </div>

              )
            )}

          </div>

        ) : (

          <p className="text-gray-500">
            No medications reported
          </p>

        )}

      </SectionCard>

      {/* ALLERGIES */}

      <SectionCard title="Allergies">

        <p className="text-lg text-slate-700">
          {answers.allergyDetails ||
            "No allergies reported"}
        </p>

      </SectionCard>

      {/* FAMILY HISTORY */}

      <SectionCard title="Family History">

        <div className="flex flex-wrap gap-3">

          {answers.familyHistory?.length ? (

            answers.familyHistory.map(
              (item) => (

                <Tag
                  key={item}
                  label={item}
                  type="warning"
                />

              )
            )

          ) : (

            <p className="text-gray-500">
              No family history reported
            </p>

          )}

        </div>

      </SectionCard>

      {/* HORMONAL HEALTH */}

      <SectionCard title="Hormonal Health">

        <div className="grid md:grid-cols-4 gap-5">

          <MetricCard
            title="Libido"
            value={answers.libido}
          />

          <MetricCard
            title="Fatigue"
            value={answers.fatiguePattern}
          />

          <MetricCard
            title="Hair / Skin"
            value={
              answers.hairSkin
                ? "Present"
                : "None"
            }
          />

          <MetricCard
            title="Details"
            value={
              answers.hairSkinDetails ||
              "-"
            }
          />

        </div>

      </SectionCard>

      {/* WELLNESS GOAL */}

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[32px] p-10 text-white shadow-xl">

        <h2 className="text-2xl font-bold">
          Primary Wellness Goal
        </h2>

        <p className="text-4xl font-bold mt-4">
          {answers.primaryGoal || "-"}
        </p>

        {answers.goalOther && (

          <p className="mt-4 text-lg text-white/90">
            {answers.goalOther}
          </p>

        )}

      </div>

      {/* DOCTOR NOTES */}

     <div className="bg-white rounded-[32px] shadow-xl p-8">

  <div className="flex items-center justify-between mb-8">

    <h2 className="text-3xl font-bold text-slate-900">
      Practitioner Notes
    </h2>

    <button
      onClick={saveDoctorNotes}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white font-semibold shadow-md"
    >
      Save Notes
    </button>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full border border-slate-200 rounded-2xl overflow-hidden">

      <tbody>

        <EditableDoctorRow
          label="Primary Diagnosis"
          value={doctorNotes.primaryDiagnosis}
          onChange={(value) =>
            handleDoctorNoteChange(
              "primaryDiagnosis",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Secondary Contributors"
          value={doctorNotes.secondaryContributors}
          onChange={(value) =>
            handleDoctorNoteChange(
              "secondaryContributors",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Dosha Imbalance (Vikriti)"
          value={doctorNotes.doshaImbalance}
          onChange={(value) =>
            handleDoctorNoteChange(
              "doshaImbalance",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Samprapti Stage"
          value={doctorNotes.sampraptiStage}
          onChange={(value) =>
            handleDoctorNoteChange(
              "sampraptiStage",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Root Cause"
          value={doctorNotes.rootCause}
          onChange={(value) =>
            handleDoctorNoteChange(
              "rootCause",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Priority Intervention"
          value={doctorNotes.priorityIntervention}
          onChange={(value) =>
            handleDoctorNoteChange(
              "priorityIntervention",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Recommended Protocol Tier"
          value={doctorNotes.protocolTier}
          onChange={(value) =>
            handleDoctorNoteChange(
              "protocolTier",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Follow-up Timeline"
          value={doctorNotes.followUpTimeline}
          onChange={(value) =>
            handleDoctorNoteChange(
              "followUpTimeline",
              value
            )
          }
        />

        <EditableDoctorRow
          label="Practitioner Signature"
          value={doctorNotes.practitionerSignature}
          onChange={(value) =>
            handleDoctorNoteChange(
              "practitionerSignature",
              value
            )
          }
        />

      </tbody>

    </table>

  </div>

</div>

{/* LAB REPORTS */}

<SectionCard title="Laboratory Reports">

  <div className="space-y-6">

    <div className="bg-slate-50 rounded-2xl p-6">

      <h3 className="text-lg font-semibold text-slate-800">

        Do you have any laboratory reports?

      </h3>

      <p className="text-slate-500 mt-2">

        Upload blood work, imaging reports,
        diagnostic reports or any recent
        medical investigations.

      </p>

      <div className="flex gap-4 mt-5">

        <button
          type="button"
          onClick={() =>
            setHasLabReport(true)
          }
          className={`px-6 py-3 rounded-xl font-medium ${
            hasLabReport
              ? "bg-teal-600 text-white"
              : "bg-white border"
          }`}
        >

          Yes

        </button>

        <button
          type="button"
          onClick={() =>
            setHasLabReport(false)
          }
          className={`px-6 py-3 rounded-xl font-medium ${
            !hasLabReport
              ? "bg-slate-700 text-white"
              : "bg-white border"
          }`}
        >

          No

        </button>

      </div>

    </div>

    {hasLabReport && (

      <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center bg-gradient-to-br from-slate-50 to-white">

        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleLabUpload}
          className="hidden"
          id="lab-upload"
        />

        <label
          htmlFor="lab-upload"
          className="cursor-pointer"
        >

          <div className="text-5xl">

            📄

          </div>

          <h3 className="mt-4 text-xl font-bold text-slate-800">

            Drag & Drop or Upload Lab Reports

          </h3>

          <p className="mt-2 text-slate-500">

            PDF, JPG, PNG, DOC, DOCX

          </p>

          <button
            type="button"
            className="mt-5 px-8 py-3 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white font-semibold"
          >

            Select Files

          </button>

        </label>

      </div>

    )}

    {labFiles.length > 0 && (

      <div className="grid md:grid-cols-2 gap-4">

        {labFiles.map(
          (file, index) => (

            <div
              key={index}
              className="border rounded-2xl p-4 bg-slate-50"
            >

              <p className="font-semibold text-slate-800">

                {file.name}

              </p>

              <p className="text-sm text-slate-500">

                {(
                  file.size /
                  1024 /
                  1024
                ).toFixed(2)}
                {" "}
                MB

              </p>

            </div>

          )
        )}

      </div>

    )}

  </div>

</SectionCard>
    </div>

  );

};

const HeaderCard = ({ title, value }) => (
  <div className="bg-white/15 backdrop-blur rounded-2xl p-4">
    <p className="text-white/70 text-sm">{title}</p>
    <p className="font-bold text-lg">{value || "-"}</p>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-[32px] shadow-xl p-8">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    {children}
  </div>
);

const SummaryCard = ({ title, value }) => (
  <div className="bg-slate-50 rounded-2xl p-5">
    <p className="text-slate-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value || "-"}</p>
  </div>
);

const MetricCard = ({ title, value }) => (
  <div className="bg-slate-50 rounded-2xl p-5">
    <p className="text-slate-500">{title}</p>
    <p className="text-2xl font-bold">{value || "-"}</p>
  </div>
);

const Tag = ({ label, type }) => {

  const styles = {
    danger:
      "bg-red-50 text-red-700",
    warning:
      "bg-orange-50 text-orange-700",
  };

  return (
    <span className={`px-4 py-2 rounded-full font-medium ${styles[type]}`}>
      {label}
    </span>
  );
};

const EditableDoctorRow = ({
  label,
  value,
  onChange,
}) => (

  <tr className="border-b border-slate-200">

    <td className="w-[320px] p-5 font-semibold text-slate-700 bg-slate-50">

      {label}

    </td>

    <td className="p-3">

      <textarea
        rows={2}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={`Enter ${label}`}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
      />

    </td>

  </tr>

);

export default ClinicalDataResult;