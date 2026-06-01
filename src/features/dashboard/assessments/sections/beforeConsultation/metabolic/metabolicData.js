// metabolicData.js

import {
  Droplets,
  Activity,
  Dumbbell,
  HeartPulse,
  Utensils,
  Scale,
} from "lucide-react";

export const metabolicSections = [
  {
    id: "metabolic",

    title: "Metabolic Assessment",

    subtitle:
      "Evaluate your metabolic balance, energy response, and activity levels.",

    blockWeight: 4,

    critical: true,

    questions: [
      {
        id: "hba1c",

        short: "HbA1c",

        icon: Droplets,

        question:
          "What is your HbA1c level?",

        weight: 25,

        options: [
          {
            label: "<5.7",
            level: 0,
          },

          {
            label: "5.7 – 6.4",
            level: 1,
          },

          {
            label: "≥6.5",
            level: 2,
          },
        ],
      },

      {
        id: "bloodGlucose",

        short: "Glucose",

        icon: Activity,

        question:
          "What is your fasting blood glucose level?",

        weight: 20,

        options: [
          {
            label: "<100 mg/dl",
            level: 0,
          },

          {
            label: "100 – 125 mg/dl",
            level: 1,
          },

          {
            label: "≥126 mg/dl",
            level: 2,
          },
        ],
      },

      {
        id: "physicalActivity",

        short: "Activity",

        icon: Dumbbell,

        question:
          "How active are you physically every week?",

        weight: 15,

        options: [
          {
            label: "150 min/week",
            level: 0,
          },

          {
            label: "60 – 150 min/week",
            level: 1,
          },

          {
            label: "<60 min/week",
            level: 2,
          },
        ],
      },

      {
        id: "cholesterol",

        short: "Lipid",

        icon: HeartPulse,

        question:
          "How would you describe your cholesterol or lipid profile?",

        weight: 15,

        options: [
          {
            label: "Normal",
            level: 0,
          },

          {
            label: "Borderline",
            level: 1,
          },

          {
            label: "High",
            level: 2,
          },
        ],
      },

      {
        id: "postMealResponse",

        short: "Meals",

        icon: Utensils,

        question:
          "How do you usually feel after meals?",

        weight: 15,

        options: [
          {
            label: "Stable Energy",
            level: 0,
          },

          {
            label: "Mild Crash / Hunger",
            level: 1,
          },

          {
            label: "Sleepy / Heavy",
            level: 2,
          },
        ],
      },

      {
        id: "bmi",

        short: "BMI",

        icon: Scale,

        question:
          "What is your BMI range?",

        weight: 10,

        options: [
          {
            label: "18.5 – 24.9",
            level: 0,
          },

          {
            label: "25 – 29.9",
            level: 1,
          },

          {
            label: "≥30",
            level: 2,
          },
        ],
      },
    ],
  },
];