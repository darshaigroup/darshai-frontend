// import { useState } from "react";

// import AssessmentLayout from "../layouts/AssessmentLayout";

// import FlowIntro from "./FlowIntro";

// /* PATIENT FLOW */
// import BasicDetails from "../sections/afterLogin/BasicDetails";

// import BurnoutAssessment from "../sections/beforeConsultation/burnout/BurnoutAssessment";

// import CardiovascularAssessment from "../sections/beforeConsultation/cardiovascular/CardiovascularAssessment";

// import DigestiveAssessment from "../sections/beforeConsultation/digestive/DigestiveAssessment";

// import MetabolicAssessment from "../sections/beforeConsultation/metabolic/MetabolicAssessment";

// import NervousAssessment from "../sections/beforeConsultation/nervous/NervousAssessment";

// import EnvironmentAssessment from "../sections/beforeConsultation/environment/EnvironmentAssessment";

// import SelfAssessment from "../sections/beforeConsultation/selfAssessment/SelfAssessment";

// import LifestyleHabits from "../sections/beforeConsultation/LifestyleHabits/LifestyleHabits";

// import MentalEmotional from "../sections/beforeConsultation/mentalEmotional/MentalEmotional";

// import InflammationAssessment from "../sections/beforeConsultation/inflammation/InflammationAssessment";

// import Readiness from "../sections/beforeConsultation/readiness/Readiness";

// import ConsultationReady from "../pages/ConsultationReady";

// /* DOCTOR FLOW */
// import Prakriti from "../sections/prakriti/Prakriti";

// import Vikriti from "../sections/vikriti/Vikriti";

// import Agni from "../sections/agni/Agni";

// import Ama from "../sections/ama/Ama";

// import AyurvedicResult from "../sections/duringConsultation/ayurvedicResult/AyurvedicResult";

// import ClinicalData from "../sections/duringConsultation/clinicalData/ClinicalData";

// import LabReports from "../sections/duringConsultation/labReports/LabReports";

// import ConsultationResult from "../sections/duringConsultation/consultationResult/ConsultationResult";

// import DoctorNotes from "../sections/duringConsultation/doctorNotes/DoctorNotes";

// /* FINAL */
// import FinalSummary from "../sections/afterConsultation/FinalSummary";

// import FinalResult from "./FinalResult";

// const Assessment = () => {
//   /* MAIN STEP */
//   const [step, setStep] = useState(0);

//   /* GLOBAL DATA */
//   const [data, setData] = useState({});

//   /* GLOBAL SIDEBAR NAVIGATION */
//   const [activeQuestion, setActiveQuestion] = useState(null);

//   const [activeSection, setActiveSection] = useState("selfAssessment");

//   /* ALL STEPS */
//   const steps = [
//     {
//       component: FlowIntro,
//       key: "flowIntro",
//       sectionId: "intro",
//     },
//     {
//       component: BasicDetails,
//       key: "basicDetails",
//       sectionId: "basicDetails",
//     },

//     {
//       component: BurnoutAssessment,
//       key: "burnoutAssessment",
//       sectionId: "burnoutAssessment",
//     },

//     {
//       component: CardiovascularAssessment,
//       key: "cardiovascular",
//       sectionId: "cardiovascular",
//     },
    
//     {
//       component: DigestiveAssessment,
//       key: "digestive",
//       sectionId: "digestive",
//     },
//     {
//       component: InflammationAssessment,
//       key: "inflammation",
//       sectionId: "inflammation",
//     },
//     {
//       component: MetabolicAssessment,
//       key: "metabolic",
//       sectionId: "metabolic",
//     },

//     {
//       component: NervousAssessment,
//       key: "nervous",
//       sectionId: "nervous",
//     },
    
//     {
//   component: EnvironmentAssessment,
//   key: "environment",
//   sectionId: "environment",
// },

//     {
//       component: SelfAssessment,
//       key: "selfAssessment",
//       sectionId: "selfAssessment",
//     },
    

//     {
//       component: LifestyleHabits,
//       key: "lifestyleHabits",
//       sectionId: "lifestyle",
//     },

//   {
//   component: MentalEmotional,
//   key: "mentalEmotional",
//   sectionId: "mentalEmotional",
// },

//     {
//       component: Readiness,
//       key: "readiness",
//       sectionId: "readiness",
//     },

//     {
//       component: ConsultationReady,
//       key: "consultationReady",
//       sectionId: "consultationReady",
//     },

//     {
//       component: Prakriti,
//       key: "prakriti",
//       sectionId: "prakriti",
//     },

//     {
//       component: Vikriti,
//       key: "vikriti",
//       sectionId: "vikriti",
//     },

//     {
//       component: Agni,
//       key: "agni",
//       sectionId: "agni",
//     },

//     {
//       component: Ama,
//       key: "ama",
//       sectionId: "ama",
//     },

//     {
//       component: AyurvedicResult,
//       key: "ayurvedicResult",
//       sectionId: "ayurvedicResult",
//     },

//     {
//       component: ClinicalData,
//       key: "clinicalData",
//       sectionId: "clinical",
//     },

//     {
//       component: LabReports,
//       key: "labReports",
//       sectionId: "labs",
//     },

//     {
//       component: ConsultationResult,
//       key: "consultationResult",
//       sectionId: "consultationResult",
//     },
//    {
//       component: DoctorNotes,
//       key: "doctorNotes",
//       sectionId: "doctorNotes",
//    },

//     {
//       component: FinalSummary,
//       key: "finalSummary",
//       sectionId: "summary",
//     },
    

//     {
//       component: FinalResult,
//       key: "finalResult",
//       sectionId: "finalResult",
//     },
//   ];

//   const currentStep = steps[step];

//   /* NEXT */
//   const next = (key, values) => {
//     if (key) {
//       setData((prev) => ({
//         ...prev,
//         [key]: values,
//       }));
//     }

//     const nextStep = step + 1;

//     if (steps[nextStep]) {
//       setActiveSection(steps[nextStep].sectionId);
//     }

//     setStep(nextStep);
//   };

//   /* SIDEBAR NAVIGATION */
//   const handleSidebarNavigate = (questionId, sectionId) => {
//     setActiveQuestion(questionId);

//     setActiveSection(sectionId);

//     const sectionStep = steps.findIndex((s) => s.sectionId === sectionId);

//     if (sectionStep !== -1) {
//       setStep(sectionStep);
//     }
//   };

//   const CurrentComponent = currentStep.component;

//   return (
//     <AssessmentLayout>
//       <CurrentComponent
//         data={data}
//         activeSection={activeSection}
//         activeQuestion={activeQuestion}
//         onNavigate={handleSidebarNavigate}
//         onComplete={(values) => next(currentStep.key, values)}
//       />
//     </AssessmentLayout>
//   );
// };

// export default Assessment;


import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import AssessmentLayout from "../layouts/AssessmentLayout";

import FlowIntro from "./FlowIntro";

import BurnoutAssessment from "../sections/beforeConsultation/burnout/BurnoutAssessment";

import CardiovascularAssessment from "../sections/beforeConsultation/cardiovascular/CardiovascularAssessment";

import DigestiveAssessment from "../sections/beforeConsultation/digestive/DigestiveAssessment";

import EnvironmentAssessment from "../sections/beforeConsultation/environment/EnvironmentAssessment";

import InflammationAssessment from "../sections/beforeConsultation/inflammation/InflammationAssessment";

import LifestyleHabits from "../sections/beforeConsultation/lifestyleHabits/LifestyleHabits";

import MetabolicAssessment from "../sections/beforeConsultation/metabolic/MetabolicAssessment";

import NervousAssessment from "../sections/beforeConsultation/nervous/NervousAssessment";

import { submitAssessment }
  from "../services/assessmentService";

const Assessment = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const patient =
    location.state?.patient;

  const [step, setStep] =
    useState(0);

  const [data, setData] =
    useState({
      patient,
    });

  const [activeSection,
    setActiveSection] =
      useState("burnout");

  const [activeQuestion,
    setActiveQuestion] =
      useState(null);

  const steps = [

    {
      component: FlowIntro,
      key: "flowIntro",
      sectionId: "intro",
    },

    {
      component:
        BurnoutAssessment,
      key: "burnout",
      sectionId: "burnout",
    },

    {
      component:
        MetabolicAssessment,
      key: "metabolic",
      sectionId: "metabolic",
    },

    {
      component:
        DigestiveAssessment,
      key: "digestive",
      sectionId: "digestive",
    },

    {
      component:
        CardiovascularAssessment,
      key: "cardiovascular",
      sectionId:
        "cardiovascular",
    },

    {
      component:
        NervousAssessment,
      key: "nervous",
      sectionId: "nervous",
    },

    {
      component:
        InflammationAssessment,
      key: "inflammation",
      sectionId:
        "inflammation",
    },

    {
      component:
        LifestyleHabits,
      key: "lifestyle",
      sectionId:
        "lifestyle",
    },

    {
      component:
        EnvironmentAssessment,
      key: "environment",
      sectionId:
        "environment",
    },
  ];

  const currentStep =
    steps[step];

  const next =
    async (
      key,
      values
    ) => {

      const updatedData = {

        ...data,

        [key]: values,
      };

      setData(
        updatedData
      );

      // FINAL SUBMIT

      if (
        currentStep.key ===
        "environment"
      ) {

        try {

          const payload = {

            patientId:
              updatedData
                .patient.id,

            patientName:
              updatedData
                .patient.name,

            answers: {

              burnout:
                updatedData
                  .burnout,

              metabolic:
                updatedData
                  .metabolic,

              digestive:
                updatedData
                  .digestive,

              cardiovascular:
                updatedData
                  .cardiovascular,

              nervous:
                updatedData
                  .nervous,

              inflammation:
                updatedData
                  .inflammation,

              lifestyle:
                updatedData
                  .lifestyle,

              environment:
                updatedData
                  .environment,
            },
          };

          console.log(
            "ASSESSMENT PAYLOAD"
          );

          console.log(
            payload
          );

          const result =
            await submitAssessment(
              payload
            );

          navigate(
            "/dashboard/result",
            {
              state: result,
            }
          );

          return;

        } catch (error) {

          console.error(
            error
          );

          alert(
            error.message
          );

          return;
        }
      }

      const nextStep =
        step + 1;

      if (
        steps[nextStep]
      ) {

        setActiveSection(
          steps[nextStep]
            .sectionId
        );
      }

      setStep(
        nextStep
      );
    };

  const handleSidebarNavigate =
    (
      questionId,
      sectionId
    ) => {

      setActiveQuestion(
        questionId
      );

      setActiveSection(
        sectionId
      );

      const sectionStep =
        steps.findIndex(
          (item) =>
            item.sectionId ===
            sectionId
        );

      if (
        sectionStep !== -1
      ) {

        setStep(
          sectionStep
        );
      }
    };

  const CurrentComponent =
    currentStep.component;

  return (

    <AssessmentLayout>

      <CurrentComponent
        data={data}
        activeSection={
          activeSection
        }
        activeQuestion={
          activeQuestion
        }
        onNavigate={
          handleSidebarNavigate
        }
        onComplete={(
          values
        ) =>
          next(
            currentStep.key,
            values
          )
        }
      />

    </AssessmentLayout>
  );
};

export default Assessment;