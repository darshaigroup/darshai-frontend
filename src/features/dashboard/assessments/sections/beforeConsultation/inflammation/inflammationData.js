// inflammationData.js

import {
  Activity,
  BatteryLow,
  Utensils,
  ShieldAlert,
  RefreshCcw,
} from "lucide-react";

export const inflammationSections = [
  {
    id: "inflammation",

    title: "Inflammation Assessment",

    subtitle:
      "Evaluate inflammation load, recovery capacity, and systemic stress response.",

    blockWeight: 3,

    critical: true,

    questions: [
      {
        id: "bodyPain",

        short: "Pain",

        icon: Activity,

        question:
          "How would you describe your body pain or stiffness?",

        weight: 20,

        options: [
          {
            label: "None",
            level: 0,
          },

          {
            label: "Mild",
            level: 1,
          },

          {
            label: "Severe",
            level: 2,
          },
        ],
      },

      {
        id: "fatigue",

        short: "Fatigue",

        icon: BatteryLow,

        question:
          "How often do you experience unexplained fatigue?",

        weight: 20,

        options: [
          {
            label: "None",
            level: 0,
          },

          {
            label: "Mild",
            level: 1,
          },

          {
            label: "Severe",
            level: 2,
          },
        ],
      },

      {
        id: "foodSensitivity",

        short: "Sensitivity",

        icon: Utensils,

        question:
          "How severe are your food sensitivities or digestive reactions?",

        weight: 20,

        options: [
          {
            label: "None",
            level: 0,
          },

          {
            label: "Mild",
            level: 1,
          },

          {
            label: "Severe",
            level: 2,
          },
        ],
      },

      {
        id: "allergies",

        short: "Allergies",

        icon: ShieldAlert,

        question:
          "How often do you experience allergies or skin issues?",

        weight: 20,

        options: [
          {
            label: "None",
            level: 0,
          },

          {
            label: "Mild",
            level: 1,
          },

          {
            label: "Severe",
            level: 2,
          },
        ],
      },

      {
        id: "recoverySpeed",

        short: "Recovery",

        icon: RefreshCcw,

        question:
          "How quickly do you recover from stress, illness, or exertion?",

        weight: 20,

        options: [
          {
            label: "Fast Recovery",
            level: 0,
          },

          {
            label: "Moderate Recovery",
            level: 1,
          },

          {
            label: "Slow Recovery",
            level: 2,
          },
        ],
      },
    ],
  },
];