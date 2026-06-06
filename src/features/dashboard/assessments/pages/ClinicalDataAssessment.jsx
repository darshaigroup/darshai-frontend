import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import AssessmentLayout from "../layouts/AssessmentLayout";

import ClinicalDataSection from "../sections/clinicalData/ClinicalDataSection";

import {
  clinicalDataSections,
} from "../sections/clinicalData/clinicalData";

import {
  submitClinicalData,
} from "../services/clinicalDataService";

const ClinicalDataAssessment = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const patient =
    location.state?.patient;

  const riskReport =
    location.state?.riskReport;

    console.log("report", riskReport);
  const ayurvedaReport =
    location.state?.ayurvedaReport;

  const [
    answers,
    setAnswers,
  ] = useState({});

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

 const handleSubmit =
  async () => {

    if (isSubmitting)
      return;

    try {

      setIsSubmitting(
        true
      );

      const payload = {

        patientId:
          patient?.id,

        clinicalAnswers:
          answers,

      };

      const response =
        await submitClinicalData(
          payload
        );

      navigate(
        "/dashboard/clinical-data-result",
        {
          state: {

            patient,

            riskReport,

            ayurvedaReport,

            clinicalReport:
              response.data,

          },
        }
      );

    } catch (error) {

      console.error(
        "CLINICAL SUBMIT ERROR:",
        error
      );

      alert(
        error.message
      );

    } finally {

      setIsSubmitting(
        false
      );

    }

  };

  return (

    <AssessmentLayout>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="bg-white rounded-[32px] shadow-xl p-10">

          <h1 className="text-4xl font-bold text-slate-900">
            Clinical Data Collection
          </h1>

          <p className="mt-4 text-slate-500">
            Collect medical history,
            medications,
            measurements,
            hormonal indicators
            and wellness goals.
          </p>

        </div>

        {/* PATIENT INFO */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Patient Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <p className="text-sm text-slate-500">
                Patient Name
              </p>

              <p className="font-semibold text-slate-900">
                {patient?.name || "-"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Gender
              </p>

              <p className="font-semibold text-slate-900">
                {patient?.gender || "-"}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Patient ID
              </p>

              <p className="font-semibold text-slate-900 break-all">
                {patient?.id || "-"}
              </p>

            </div>

          </div>

        </div>

        {/* CLINICAL QUESTIONS */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <ClinicalDataSection
            sections={
              clinicalDataSections.filter(
                (section) =>
                  !section.gender ||
                  section.gender.toLowerCase() ===
                    patient?.gender?.toLowerCase()
              )
            }
            answers={answers}
            setAnswers={(data) =>
              setAnswers((prev) => ({
                ...prev,
                ...data,
              }))
            }
          />

        </div>

        {/* SUBMIT */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full py-5 rounded-2xl text-lg font-semibold bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {isSubmitting
              ? "Saving Clinical Data..."
              : "Submit Clinical Data"}

          </button>

        </div>

      </div>

    </AssessmentLayout>

  );

};

export default ClinicalDataAssessment;