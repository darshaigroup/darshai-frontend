import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import AssessmentLayout from "../layouts/AssessmentLayout";

import AyurvedaAccordion from "../components/questionnaire/AyurvedaAccordion";

import PrakritiSection from "../sections/duringConsultation/prakriti/PrakritiSection";

import VikritiSection from "../sections/duringConsultation/vikriti/VikritiSection";

import AgniSection from "../sections/duringConsultation/agni/AgniSection";

import AmaSection from "../sections/duringConsultation/ama/AmaSection";

import { generateAyurvedaReport } from "../services/ayurvedaService";

const AyurvedaAssessment = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const patient = location.state?.patient;

  const riskReport = location.state?.riskReport;

  const  lifestyleMatrix=location.state?.lifestyleMatrix;

  console.log("PATIENT", patient);

  console.log("RISK REPORT", riskReport);

  console.log("LIFESTYLE MATRIX", lifestyleMatrix);

  const [openSection, setOpenSection] = useState("prakriti");

  const [isGenerating, setIsGenerating] = useState(false);

  const [answers, setAnswers] = useState({
    prakriti: {},

    vikriti: {},

    agni: {},

    ama: {},
  });

  const normalizeVikriti = (data) => {

    const normalized = {};

    Object.keys(data).forEach((key) => {

      normalized[key] =
        data[key].map(
          (value) => value ?? 1
        );

    });

    return normalized;

  };

  const normalizeAgni = (data) => {

    const normalized = {};

    Object.keys(data).forEach((key) => {

      normalized[key] = {

        vishama:
          data[key]?.vishama ?? 0,

        tikshna:
          data[key]?.tikshna ?? 0,

        manda:
          data[key]?.manda ?? 0,

      };

    });

    return normalized;

  };

  const handleGenerateReport = async () => {
    if (isGenerating) return;

    if (
      Object.keys(answers.prakriti).length === 0 ||
      Object.keys(answers.vikriti).length === 0 ||
      Object.keys(answers.agni).length === 0 ||
      Object.keys(answers.ama).length === 0
    ) {
      alert("Please complete all sections before generating report.");

      return;
    }

    try {
      setIsGenerating(true);

      const response = await generateAyurvedaReport({
        patientId: patient?.id,

        patientName: patient?.name,

        gapHours: 24,

        prakritiAnswers:
          answers.prakriti,

        vikritiAnswers:
          normalizeVikriti(
            answers.vikriti
          ),

        agniAnswers:
          normalizeAgni(
            answers.agni
          ),

        amaAnswers:
          answers.ama,
      });
      navigate(
        "/dashboard/ayurveda-result",

        {
          state: {
            patient,

            riskReport,

            report: response.data,

            lifestyleMatrix,
          },
        },
      );
    } catch (error) {
      console.error(error);

      alert(error.message);

      setIsGenerating(false);
    }
  };

  return (
    <AssessmentLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}

        <div className="bg-white rounded-[32px] shadow-xl p-8 md:p-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Ayurvedic Consultation
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            Patient: <span className="font-semibold">{patient?.name}</span>
          </p>

          <p className="text-gray-500">
            Discover constitution, imbalance, digestive fire and toxin burden.
          </p>
        </div>

        {/* PRAKRITI */}

        <AyurvedaAccordion
          title="Prakriti Assessment"
          isOpen={openSection === "prakriti"}
          onToggle={() =>
            setOpenSection(openSection === "prakriti" ? null : "prakriti")
          }
        >
          <PrakritiSection
            answers={answers.prakriti}
            setAnswers={(data) =>
              setAnswers((prev) => ({
                ...prev,

                prakriti: {
                  ...prev.prakriti,
                  ...data,
                },
              }))
            }
          />
        </AyurvedaAccordion>

        {/* VIKRITI */}

        <AyurvedaAccordion
          title="Vikriti Assessment"
          isOpen={openSection === "vikriti"}
          onToggle={() =>
            setOpenSection(openSection === "vikriti" ? null : "vikriti")
          }
        >
          <VikritiSection
            answers={answers.vikriti}
            setAnswers={(data) =>
              setAnswers((prev) => ({
                ...prev,

                vikriti: {
                  ...prev.vikriti,
                  ...data,
                },
              }))
            }
          />
        </AyurvedaAccordion>

        {/* AGNI */}

        <AyurvedaAccordion
          title="Agni Assessment"
          isOpen={openSection === "agni"}
          onToggle={() =>
            setOpenSection(openSection === "agni" ? null : "agni")
          }
        >
          <AgniSection
            answers={answers.agni}
            setAnswers={(data) =>
              setAnswers((prev) => ({
                ...prev,

                agni: {
                  ...prev.agni,
                  ...data,
                },
              }))
            }
          />
        </AyurvedaAccordion>

        {/* AMA */}

        <AyurvedaAccordion
          title="Ama Assessment"
          isOpen={openSection === "ama"}
          onToggle={() => setOpenSection(openSection === "ama" ? null : "ama")}
        >
          <AmaSection
            answers={answers.ama}
            setAnswers={(data) =>
              setAnswers((prev) => ({
                ...prev,

                ama: {
                  ...prev.ama,
                  ...data,
                },
              }))
            }
          />
        </AyurvedaAccordion>

        {/* GENERATE REPORT */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">
          <button
            disabled={isGenerating}
            onClick={handleGenerateReport}
            className={`

              w-full

              py-5

              rounded-2xl

              text-lg

              font-semibold

              text-white

              transition-all

              ${isGenerating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#0F766E] to-[#14B8A6] hover:scale-[1.01]"
              }

            `}
          >
            {isGenerating ? "Generating Report..." : "Generate Ayurveda Report"}
          </button>
        </div>
      </div>
    </AssessmentLayout>
  );
};

export default AyurvedaAssessment;
