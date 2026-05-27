// environmentData.js

import {
  Sun,
  Building2,
  Trees,
  Monitor,
  Globe2,
} from "lucide-react";

export const environmentSections = [
  {
    id: "environment",

    title:
      "Environmental & Geo Context Assessment",

    subtitle:
      "Understand how your surroundings, environment, and lifestyle exposure affect your wellbeing.",

    blockWeight: 1,

    critical: false,

    questions: [
      {
        id: "climateExposure",

        short: "Climate",

        icon: Sun,

        question:
          "How stressful is your climate exposure generally?",

        weight: 20,

        options: [
          {
            label: "Optimal",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "High Stress",
            level: 2,
          },
        ],
      },

      {
        id: "livingEnvironment",

        short: "Living",

        icon: Building2,

        question:
          "How would you describe your living environment?",

        weight: 20,

        options: [
          {
            label: "Optimal",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "High Stress",
            level: 2,
          },
        ],
      },

      {
        id: "outdoorExposure",

        short: "Outdoor",

        icon: Trees,

        question:
          "How healthy is your outdoor exposure and nature interaction?",

        weight: 20,

        options: [
          {
            label: "Optimal",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "High Stress",
            level: 2,
          },
        ],
      },

      {
        id: "screenTime",

        short: "Screen",

        icon: Monitor,

        question:
          "How balanced is your daily screen time exposure?",

        weight: 20,

        options: [
          {
            label: "Optimal",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "High Stress",
            level: 2,
          },
        ],
      },

      {
        id: "environmentalImpact",

        short: "Impact",

        icon: Globe2,

        question:
          "How strongly does your environment affect your health and energy?",

        weight: 20,

        options: [
          {
            label: "Optimal",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "High Stress",
            level: 2,
          },
        ],
      },
    ],
  },
];