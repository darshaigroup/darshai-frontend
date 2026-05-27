// nervousData.js

import {
  Brain,
  Moon,
  Sunrise,
  Zap,
  BatteryLow,
} from "lucide-react";

export const nervousSections = [
  {
    id: "nervous",

    title: "Nervous System Assessment",

    subtitle:
      "Evaluate your nervous system balance, recovery, resilience, and stress response.",

    blockWeight: 3,

    critical: true,

    questions: [
      {
        id: "daytimeState",

        short: "Daytime",

        icon: Brain,

        question:
          "How would you describe your daytime mental state?",

        weight: 25,

        options: [
          {
            label: "Calm",
            level: 0,
          },

          {
            label: "Tense",
            level: 1,
          },

          {
            label: "Wired / Anxious",
            level: 2,
          },
        ],
      },

      {
        id: "sleepQuality",

        short: "Sleep",

        icon: Moon,

        question:
          "How would you describe your sleep quality?",

        weight: 20,

        options: [
          {
            label: "Deep",
            level: 0,
          },

          {
            label: "Light",
            level: 1,
          },

          {
            label: "Disturbed",
            level: 2,
          },
        ],
      },

      {
        id: "wakeUpFeeling",

        short: "Wakeup",

        icon: Sunrise,

        question:
          "How do you usually feel after waking up?",

        weight: 15,

        options: [
          {
            label: "Refreshed",
            level: 0,
          },

          {
            label: "Slightly Tired",
            level: 1,
          },

          {
            label: "Exhausted",
            level: 2,
          },
        ],
      },

      {
        id: "stressResponse",

        short: "Stress",

        icon: Zap,

        question:
          "How does your body respond to stress generally?",

        weight: 20,

        options: [
          {
            label: "Stable",
            level: 0,
          },

          {
            label: "Reactive",
            level: 1,
          },

          {
            label: "Overwhelmed / Shutdown",
            level: 2,
          },
        ],
      },

      {
        id: "fatiguePattern",

        short: "Fatigue",

        icon: BatteryLow,

        question:
          "How would you describe your energy and fatigue pattern?",

        weight: 20,

        options: [
          {
            label: "Balanced",
            level: 0,
          },

          {
            label: "Fluctuating",
            level: 1,
          },

          {
            label:
              "Burnout / Extreme Fatigue",

            level: 2,
          },
        ],
      },
    ],
  },
];