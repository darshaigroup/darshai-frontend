// import { selfAssessmentSections } from "../sections/beforeConsultation/selfAssessment/selfAssessmentData";

import { burnoutSections } from "../sections/beforeConsultation/burnout/burnoutData";

import { metabolicSections } from "../sections/beforeConsultation/metabolic/metabolicData";

import { digestiveSections } from "../sections/beforeConsultation/digestive/digestiveData";

import { cardiovascularSections } from "../sections/beforeConsultation/cardiovascular/cardiovascularData";

import { nervousSections } from "../sections/beforeConsultation/nervous/nervousData";

import { inflammationSections } from "../sections/beforeConsultation/inflammation/inflammationData";  

import { lifestyleHabitSections } from "../sections/beforeConsultation/lifestyleHabits/lifestyleHabitsData"

import {environmentSections} from "../sections/beforeConsultation/environment/environmentData";

// import { mentalEmotionalSections } from "../sections/beforeConsultation/mentalEmotional/mentalEmotionalData";

// import { readinessSections } from "../sections/beforeConsultation/readiness/readinessData";

export const patientFlowSections = [

  // {
  //   id: "selfAssessment",

  //   title: "Self Assessment",

  //   questions:
  //     selfAssessmentSections[0]
  //       .questions,
  // },
{
    id: "burnoutAssessment",

    title: "Burnout Assessment",  

    questions:
      burnoutSections[0]
        .questions,
  },

  {
    id: "metabolic",

    title: "Metabolic",

    questions:
      metabolicSections[0]
        .questions,
  },

  {
    id: "digestive",

    title: "Digestive",

    questions:
      digestiveSections[0]
        .questions,
  },

  {
    id: "cardiovascular",

    title: "Cardiovascular",  

    questions:
      cardiovascularSections[0]
        .questions,
  },

  {
    id: "nervous",

    title: "Nervous",

    questions:
      nervousSections[0]
        .questions,
  },

  {
    id: "inflammation",

    title: "Inflammation",

    questions:
      inflammationSections[0]
        .questions,
  },

  {
    id: "lifestyle",

    title:
      "Lifestyle & Habits",

    questions:
      lifestyleHabitSections[0]
        .questions,
  },

  {
    id: "environment",

    title: "Environment",

    questions:
      environmentSections[0]
        .questions,
  },

  // {
  //   id: "mentalEmotional",

  //   title:
  //     "Mental & Emotional",

  //   questions:
  //     mentalEmotionalSections[0]
  //       .questions,
  // },

  // {
  //   id: "readiness",

  //   title: "Readiness",

  //   questions:
  //     readinessSections[0]
  //       .questions,
  // },
];