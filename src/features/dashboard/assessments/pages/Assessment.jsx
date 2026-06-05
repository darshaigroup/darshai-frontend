import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import AssessmentLayout from "../layouts/AssessmentLayout";
import FlowIntro from "./FlowIntro";
/* BEFORE CONSULTATION */
import BurnoutAssessment from "../sections/beforeConsultation/burnout/BurnoutAssessment";

import CardiovascularAssessment from "../sections/beforeConsultation/cardiovascular/CardiovascularAssessment";

import DigestiveAssessment from "../sections/beforeConsultation/digestive/DigestiveAssessment";

import EnvironmentAssessment from "../sections/beforeConsultation/environment/EnvironmentAssessment";

import InflammationAssessment from "../sections/beforeConsultation/inflammation/InflammationAssessment";

import LifestyleHabits from "../sections/beforeConsultation/lifestyleHabits/LifestyleHabits";

import MetabolicAssessment from "../sections/beforeConsultation/metabolic/MetabolicAssessment";

import NervousAssessment from "../sections/beforeConsultation/nervous/NervousAssessment";

import { submitAssessment } from "../services/assessmentService";

const Assessment = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const patient = location.state?.patient;

  const [step, setStep] = useState(0);

  const [data, setData] = useState({
    patient,
  });

  const [activeSection, setActiveSection] = useState("burnout");

  const [activeQuestion, setActiveQuestion] = useState(null);

  const steps = [
    {
      component: FlowIntro,
      key: "flowIntro",
      sectionId: "intro",
    },

    {
      component: BurnoutAssessment,
      key: "burnout",
      sectionId: "burnout",
    },

    {
      component: MetabolicAssessment,
      key: "metabolic",
      sectionId: "metabolic",
    },

    {
      component: DigestiveAssessment,
      key: "digestive",
      sectionId: "digestive",
    },

    {
      component: CardiovascularAssessment,
      key: "cardiovascular",
      sectionId: "cardiovascular",
    },

    {
      component: NervousAssessment,
      key: "nervous",
      sectionId: "nervous",
    },

    {
      component: InflammationAssessment,
      key: "inflammation",
      sectionId: "inflammation",
    },

    {
      component: LifestyleHabits,
      key: "lifestyleHabits",
      sectionId: "lifestyleHabits",
    },

    {
      component: EnvironmentAssessment,
      key: "environment",
      sectionId: "environment",
    },
  ];

  const currentStep = steps[step];

  const next = async (key, values) => {
    const updatedData = {
      ...data,

      [key]: values,
    };

    setData(updatedData);

    // ======================
    // FINAL SUBMIT
    // ======================

    if (currentStep.key === "environment") {
      try {
        const payload = {
          patientId: updatedData.patient.id,

          patientName: updatedData.patient.name,

          answers: {
            burnout: {
              sleep: updatedData.burnout?.sleep?.level,

              hrv: updatedData.burnout?.hrv?.level,

              rhr: updatedData.burnout?.rhr?.level,

              stress: updatedData.burnout?.stress?.level,

              energy: updatedData.burnout?.energy?.level,

              mood: updatedData.burnout?.mood?.level,
            },

            metabolic: {
              hba1c: updatedData.metabolic?.hba1c?.level,

              bloodGlucose: updatedData.metabolic?.bloodGlucose?.level,

              physicalActivity: updatedData.metabolic?.physicalActivity?.level,

              cholesterol: updatedData.metabolic?.cholesterol?.level,

              postMealResponse: updatedData.metabolic?.postMealResponse?.level,

              bmi: updatedData.metabolic?.bmi?.level,
            },

            digestive: {
              appetite: updatedData.digestive?.appetite?.level,

              bloating: updatedData.digestive?.bloating?.level,

              mealTolerance: updatedData.digestive?.mealTolerance?.level,

              acidReflux: updatedData.digestive?.acidReflux?.level,

              bowelMovement: updatedData.digestive?.bowelMovement?.level,

              postMealEnergy: updatedData.digestive?.postMealEnergy?.level,
            },

            cardiovascular: {
              bloodPressure: updatedData.cardiovascular?.bloodPressure?.level,

              hrv: updatedData.cardiovascular?.hrv?.level,

              rhr: updatedData.cardiovascular?.rhr?.level,

              lipidProfile: updatedData.cardiovascular?.lipidProfile?.level,

              physicalActivity:
                updatedData.cardiovascular?.physicalActivity?.level,

              stressLevel: updatedData.cardiovascular?.stressLevel?.level,
            },

            nervous_system: {
              daytimeState: updatedData.nervous?.daytimeState?.level,

              sleepQuality: updatedData.nervous?.sleepQuality?.level,

              wakeUpFeeling: updatedData.nervous?.wakeUpFeeling?.level,

              stressResponse: updatedData.nervous?.stressResponse?.level,

              fatiguePattern: updatedData.nervous?.fatiguePattern?.level,
            },

            inflammation: {
              bodyPain: updatedData.inflammation?.bodyPain?.level,

              fatigue: updatedData.inflammation?.fatigue?.level,

              foodSensitivity: updatedData.inflammation?.foodSensitivity?.level,

              allergies: updatedData.inflammation?.allergies?.level,

              recoverySpeed: updatedData.inflammation?.recoverySpeed?.level,
            },

            lifestyle: {
              routineStability:
                updatedData.lifestyleHabits?.routineStability?.level,

              workload: updatedData.lifestyleHabits?.workload?.level,

              protocolCompliance:
                updatedData.lifestyleHabits?.protocolCompliance?.level,

              travelSchedule:
                updatedData.lifestyleHabits?.travelSchedule?.level,

              supportSystem: updatedData.lifestyleHabits?.supportSystem?.level,
            },
            environment: {
              climateExposure: updatedData.environment?.climateExposure?.level,

              livingEnvironment:
                updatedData.environment?.livingEnvironment?.level,

              outdoorExposure: updatedData.environment?.outdoorExposure?.level,

              screenTime: updatedData.environment?.screenTime?.level,

              environmentalImpact:
                updatedData.environment?.environmentalImpact?.level,
            },
          },
        };

        // console.log("ASSESSMENT PAYLOAD");

        // console.log(JSON.stringify(payload, null, 2));

        const result = await submitAssessment(payload);

        navigate("/dashboard/result", {
          state: {
            patient: updatedData.patient,
            data: result,
          },
        });

        return;
      } catch (error) {
        console.error("SUBMIT ERROR:", error);

        alert(error.message);

        return;
      }
    }

    const nextStep = step + 1;

    if (steps[nextStep]) {
      setActiveSection(steps[nextStep].sectionId);
    }

    setStep(nextStep);
  };

  const handleSidebarNavigate = (questionId, sectionId) => {
    setActiveQuestion(questionId);

    setActiveSection(sectionId);

    const sectionStep = steps.findIndex((item) => item.sectionId === sectionId);

    if (sectionStep !== -1) {
      setStep(sectionStep);
    }
  };

  const CurrentComponent = currentStep.component;

  return (
    <AssessmentLayout>
      <CurrentComponent
        data={data}
        activeSection={activeSection}
        activeQuestion={activeQuestion}
        onNavigate={handleSidebarNavigate}
        onComplete={(values) => next(currentStep.key, values)}
      />
    </AssessmentLayout>
  );
};

export default Assessment;
