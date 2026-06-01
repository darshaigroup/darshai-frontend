import {
  Moon,
  Activity,
  HeartPulse,
  Brain,
  Battery,
  Smile,
} from "lucide-react";

export const burnoutSections = [
  {
    id: "burnout",

    title: "Burnout Assessment",

    subtitle:
      "Evaluate stress, fatigue, and nervous system overload.",

    blockWeight: 3,

    critical: true,

    questions: [
      {
        id: "sleep",

        short: "Sleep",

        icon: Moon,

        question:
          "How would you describe your sleep quality?",

        weight: 20,

        options: [
          {
            label:
              "7-8 Hrs (Deep Sleep)",

            level: 0,
          },

          {
            label:
              "5-6 Hrs (Light Sleep)",

            level: 1,
          },

          {
            label:
              "<5 Hrs (Disturbed)",

            level: 2,
          },
        ],
      },

      {
        id: "hrv",

        short: "HRV",

        icon: Activity,

        question:
          "How is your Heart Rate Variability?",

        weight: 20,

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

        icon: HeartPulse,

        question:
          "What is your Resting Heart Rate?",

        weight: 20,

        options: [
          {
            label: "50-65 bpm",

            level: 0,
          },

          {
            label: "66-80 bpm",

            level: 1,
          },

          {
            label: ">80 bpm",

            level: 2,
          },
        ],
      },

      {
        id: "stress",

        short: "Stress",

        icon: Brain,

        question:
          "How would you describe your stress levels?",

        weight: 15,

        options: [
          {
            label: "Manageable",

            level: 0,
          },

          {
            label: "Frequent",

            level: 1,
          },

          {
            label: "Overwhelming",

            level: 2,
          },
        ],
      },

      {
        id: "energy",

        short: "Energy",

        icon: Battery,

        question:
          "How are your daily energy levels?",

        weight: 15,

        options: [
          {
            label:
              "High & Stable",

            level: 0,
          },

          {
            label:
              "Fluctuating",

            level: 1,
          },

          {
            label:
              "Low / Fatigued",

            level: 2,
          },
        ],
      },

      {
        id: "mood",

        short: "Mood",

        icon: Smile,

        question:
          "How stable is your mood generally?",

        weight: 10,

        options: [
          {
            label: "Stable",

            level: 0,
          },

          {
            label:
              "Mild Swings",

            level: 1,
          },

          {
            label:
              "Frequent Swings",

            level: 2,
          },
        ],
      },
    ],
  },
];