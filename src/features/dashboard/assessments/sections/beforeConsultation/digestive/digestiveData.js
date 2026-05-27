// digestiveData.js

import {
  Utensils,
  Wind,
  Soup,
  Flame,
  Activity,
  BatteryLow,
} from "lucide-react";

export const digestiveSections = [
  {
    id: "digestive",

    title: "Digestive Assessment",

    subtitle:
      "Understand your digestive strength, gut comfort, and post-meal response.",

    blockWeight: 2,

    critical: false,

    questions: [
      {
        id: "appetite",

        short: "Appetite",

        icon: Utensils,

        question:
          "How would you describe your appetite?",

        weight: 15,

        options: [
          {
            label: "Normal",
            level: 0,
          },

          {
            label: "Irregular",
            level: 1,
          },

          {
            label: "Extreme (Low / High)",
            level: 2,
          },
        ],
      },

      {
        id: "bloating",

        short: "Bloating",

        icon: Wind,

        question:
          "How often do you experience bloating?",

        weight: 20,

        options: [
          {
            label: "Rare",
            level: 0,
          },

          {
            label: "Sometimes",
            level: 1,
          },

          {
            label: "Daily",
            level: 2,
          },
        ],
      },

      {
        id: "mealTolerance",

        short: "Tolerance",

        icon: Soup,

        question:
          "How comfortable do you feel after meals?",

        weight: 15,

        options: [
          {
            label: "Comfortable",
            level: 0,
          },

          {
            label: "Mild Discomfort",
            level: 1,
          },

          {
            label: "Frequent Discomfort",
            level: 2,
          },
        ],
      },

      {
        id: "acidReflux",

        short: "Reflux",

        icon: Flame,

        question:
          "How often do you experience acid reflux or burping?",

        weight: 15,

        options: [
          {
            label: "Rare",
            level: 0,
          },

          {
            label: "Occasional",
            level: 1,
          },

          {
            label: "Frequent",
            level: 2,
          },
        ],
      },

      {
        id: "bowelMovement",

        short: "Bowel",

        icon: Activity,

        question:
          "How regular are your bowel movements?",

        weight: 20,

        options: [
          {
            label: "Regular",
            level: 0,
          },

          {
            label: "Slight Disturbance",
            level: 1,
          },

          {
            label: "Irregular",
            level: 2,
          },
        ],
      },

      {
        id: "postMealEnergy",

        short: "Energy",

        icon: BatteryLow,

        question:
          "How is your energy level after meals?",

        weight: 15,

        options: [
          {
            label: "Good",
            level: 0,
          },

          {
            label: "Slight Dip",
            level: 1,
          },

          {
            label: "Very Low / Sleepy",
            level: 2,
          },
        ],
      },
    ],
  },
];