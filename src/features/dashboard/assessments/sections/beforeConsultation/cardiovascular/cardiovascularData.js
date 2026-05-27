// cardiovascularData.js

import {
  HeartPulse,
  Activity,
  Gauge,
  Droplets,
  Dumbbell,
  Brain,
} from "lucide-react";

export const cardiovascularSections = [
  {
    id: "cardiovascular",

    title: "Cardiovascular Assessment",

    subtitle:
      "Evaluate your heart health, circulation, recovery, and cardiovascular resilience.",

    blockWeight: 4,

    critical: true,

    questions: [
      {
        id: "bloodPressure",

        short: "BP",

        icon: HeartPulse,

        question:
          "What is your usual blood pressure range?",

        weight: 30,

        options: [
          {
            label: "<120 / 80",
            level: 0,
          },

          {
            label: "120–139 / 80–89",
            level: 1,
          },

          {
            label: "≥140 / 90",
            level: 2,
          },
        ],
      },

      {
        id: "hrv",

        short: "HRV",

        icon: Activity,

        question:
          "How is your Heart Rate Variability (HRV)?",

        weight: 15,

        options: [
          {
            label: "High",
            level: 0,
          },

          {
            label: "Normal",
            level: 1,
          },

          {
            label: "Low",
            level: 2,
          },
        ],
      },

      {
        id: "rhr",

        short: "RHR",

        icon: Gauge,

        question:
          "What is your Resting Heart Rate (RHR)?",

        weight: 15,

        options: [
          {
            label: "50–65 bpm",
            level: 0,
          },

          {
            label: "66–80 bpm",
            level: 1,
          },

          {
            label: ">80 bpm",
            level: 2,
          },
        ],
      },

      {
        id: "lipidProfile",

        short: "Lipid",

        icon: Droplets,

        question:
          "How would you describe your lipid profile?",

        weight: 20,

        options: [
          {
            label: "Optimal",
            level: 0,
          },

          {
            label: "Moderate Imbalance",
            level: 1,
          },

          {
            label: "High Risk",
            level: 2,
          },
        ],
      },

      {
        id: "physicalActivity",

        short: "Activity",

        icon: Dumbbell,

        question:
          "How physically active are you?",

        weight: 10,

        options: [
          {
            label: "Active",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "Sedentary",
            level: 2,
          },
        ],
      },

      {
        id: "stressLevel",

        short: "Stress",

        icon: Brain,

        question:
          "How would you rate your stress levels?",

        weight: 10,

        options: [
          {
            label: "Low",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "High",
            level: 2,
          },
        ],
      },
    ],
  },
];