export const agniSections = [
  {
    title: "APPETITE",
    questions: [
      {
        id: "G1",
        question: "How has your hunger been recently?",
        patterns: [
          { text: "Irregular hunger (sometimes strong, sometimes absent)", type: "vishama" },
          { text: "Very strong, sharp hunger", type: "tikshna" },
          { text: "Low or dull hunger", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "DIGESTION",
    questions: [
      {
        id: "G2",
        question: "How do you usually feel after eating?",
        patterns: [
          { text: "Unpredictable digestion, bloating", type: "vishama" },
          { text: "Burning, acidity, heat", type: "tikshna" },
          { text: "Heaviness, sluggish digestion", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "BOWEL",
    questions: [
      {
        id: "G3",
        question: "How are your bowel movements generally?",
        patterns: [
          { text: "Irregular, sometimes constipated", type: "vishama" },
          { text: "Loose, frequent, urgent", type: "tikshna" },
          { text: "Slow, heavy, incomplete", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "ENERGY",
    questions: [
      {
        id: "G4",
        question: "What happens to your energy after meals?",
        patterns: [
          { text: "Energy fluctuates", type: "vishama" },
          { text: "Restless or overheated", type: "tikshna" },
          { text: "Sleepy, dull, heavy", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "TOLERANCE",
    questions: [
      {
        id: "G5",
        question: "How does your body respond to different foods?",
        patterns: [
          { text: "Easily disturbed digestion", type: "vishama" },
          { text: "Sensitive to spicy/oily foods", type: "tikshna" },
          { text: "Can tolerate but feels heavy", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "MEAL TIMING",
    questions: [
      {
        id: "G6",
        question: "What happens if you delay or miss a meal?",
        patterns: [
          { text: "No clear pattern", type: "vishama" },
          { text: "Feel weak or irritable quickly", type: "tikshna" },
          { text: "Can skip meals easily", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "TRANSIT",
    questions: [
      {
        id: "G7",
        question: "How long after eating do you feel hungry again?",
        patterns: [
          { text: "Unpredictable timing", type: "vishama" },
          { text: "Very soon (1–2 hours)", type: "tikshna" },
          { text: "Long gap (4+ hours)", type: "manda" },
        ],
      },
    ],
  },

  {
    title: "QUANTITY",
    questions: [
      {
        id: "G8",
        question: "How does your body handle normal meal portions?",
        patterns: [
          { text: "Small changes cause discomfort", type: "vishama" },
          { text: "Handles large meals but heat/acidity", type: "tikshna" },
          { text: "Normal meals feel heavy", type: "manda" },
        ],
      },
    ],
  },
];