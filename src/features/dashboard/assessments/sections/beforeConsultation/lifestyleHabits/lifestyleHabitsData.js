// lifestyleHabitsData.js

import {
  CalendarDays,
  Briefcase,
  CheckCircle2,
  Plane,
  Users,
} from "lucide-react";

export const lifestyleHabitSections = [
  {
    id: "lifestyle",

    title:
      "Lifestyle & Compliance Assessment",

    subtitle:
      "Understand your routine, consistency, workload, and ability to follow wellness protocols.",

    blockWeight: 2,

    critical: false,

    questions: [
      {
        id: "routineStability",

        short: "Routine",

        icon: CalendarDays,

        question:
          "How stable is your daily routine?",

        weight: 25,

        options: [
          {
            label: "Stable",
            level: 0,
          },

          {
            label: "Variable",
            level: 1,
          },

          {
            label: "Irregular",
            level: 2,
          },
        ],
      },

      {
        id: "workload",

        short: "Workload",

        icon: Briefcase,

        question:
          "How would you describe your workload and intensity?",

        weight: 20,

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

      {
        id: "protocolCompliance",

        short: "Compliance",

        icon: CheckCircle2,

        question:
          "How willing are you to follow a wellness protocol consistently?",

        weight: 25,

        options: [
          {
            label: "High",
            level: 0,
          },

          {
            label: "Moderate",
            level: 1,
          },

          {
            label: "Low",
            level: 2,
          },
        ],
      },

      {
        id: "travelSchedule",

        short: "Travel",

        icon: Plane,

        question:
          "How irregular is your travel or work schedule?",

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
        id: "supportSystem",

        short: "Support",

        icon: Users,

        question:
          "How strong is your support system?",

        weight: 15,

        options: [
          {
            label: "Strong",
            level: 0,
          },

          {
            label: "Limited",
            level: 1,
          },

          {
            label: "None",
            level: 2,
          },
        ],
      },
    ],
  },
];