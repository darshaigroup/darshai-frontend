import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  // SECTION A
  {
    id: "A1",
    text: "Skeletal frame",
    description: "How would you describe your natural body frame?",
    options: [
      { label: "Thin, bony, or narrow frame", value: "V" },
      { label: "Medium, balanced frame", value: "P" },
      { label: "Broad, wide, or large frame", value: "K" },
    ],
  },
  {
    id: "A2",
    text: "Weight tendency",
    description: "How does your body respond to food and weight?",
    options: [
      { label: "Hard to gain weight even when eating well", value: "V" },
      { label: "Maintain weight fairly easily, build muscle well", value: "P" },
      { label: "Gain weight easily even with small food intake", value: "K" },
    ],
  },
  {
    id: "A3",
    text: "Skin texture",
    description: "How is your skin naturally (without any product)?",
    options: [
      { label: "Dry, rough, or flaky", value: "V" },
      { label: "Warm, oily, or prone to redness and breakouts", value: "P" },
      { label: "Smooth, thick, soft, and naturally moist", value: "K" },
    ],
  },
  {
    id: "A4",
    text: "Skin temperature",
    description: "How does your skin feel to touch naturally?",
    options: [
      { label: "Cool and dry", value: "V" },
      { label: "Warm, almost hot at times", value: "P" },
      { label: "Cool but soft and slightly oily", value: "K" },
    ],
  },
  {
    id: "A5",
    text: "Nails",
    description: "How are your nails naturally?",
    options: [
      { label: "Brittle, dry, rough, and break easily", value: "V" },
      { label: "Soft, pink, flexible, and smooth", value: "P" },
      { label: "Large, thick, hard, and very strong", value: "K" },
    ],
  },
  {
    id: "A6",
    text: "Eye size and appearance",
    description: "How are your eyes naturally?",
    options: [
      { label: "Small or slightly sunken", value: "V" },
      { label: "Medium-sized, sharp, and piercing", value: "P" },
      { label: "Large, wide, calm, with thick lashes", value: "K" },
    ],
  },
  {
    id: "A7",
    text: "Eye sensitivity",
    description: "How do your eyes react?",
    options: [
      { label: "Dry, sensitive to wind or dust", value: "V" },
      { label: "Sensitive to bright light or heat", value: "P" },
      { label: "Moist, rarely irritated", value: "K" },
    ],
  },
  {
    id: "A8",
    text: "Weather sensitivity",
    description: "Which weather makes you most uncomfortable?",
    options: [
      { label: "Cold, dry, or windy weather", value: "V" },
      { label: "Hot weather or direct sunlight", value: "P" },
      { label: "Humid, damp, or cold-wet weather", value: "K" },
    ],
  },
  {
    id: "A9",
    text: "Sweating",
    description: "How do you sweat naturally?",
    options: [
      { label: "Very little, almost odourless", value: "V" },
      { label: "Heavily, with strong odour and heat", value: "P" },
      { label: "Moderate and steady, mild smell", value: "K" },
    ],
  },

  // SECTION B
  {
    id: "B1",
    text: "Appetite pattern",
    description: "How is your hunger naturally?",
    options: [
      { label: "Irregular and unpredictable", value: "V" },
      { label: "Strong and intense", value: "P" },
      { label: "Slow and steady", value: "K" },
    ],
  },
  {
    id: "B2",
    text: "Thirst",
    description: "How is your thirst naturally?",
    options: [
      { label: "Low or forgetful", value: "V" },
      { label: "High", value: "P" },
      { label: "Low to moderate", value: "K" },
    ],
  },
  {
    id: "B3",
    text: "Food preference",
    description: "What kind of food do you naturally prefer?",
    options: [
      { label: "Warm, oily, heavy, sweet, or salty food", value: "V" },
      { label: "Cold, sweet, bitter, or light food", value: "P" },
      { label: "Warm, dry, light, spicy, or bitter food", value: "K" },
    ],
  },
  {
    id: "B4",
    text: "Eating speed",
    description: "How do you naturally eat?",
    options: [
      { label: "Quickly, on the go", value: "V" },
      { label: "Moderate pace", value: "P" },
      { label: "Slowly, enjoying food", value: "K" },
    ],
  },
  {
    id: "B5",
    text: "Digestion",
    description: "How does your stomach behave?",
    options: [
      { label: "Gas, constipation", value: "V" },
      { label: "Loose stools, acidity", value: "P" },
      { label: "Slow but regular", value: "K" },
    ],
  },

  // SECTION C
  {
    id: "C1",
    text: "Movement style",
    description: "How do you move or walk?",
    options: [
      { label: "Fast, restless", value: "V" },
      { label: "Steady, purposeful", value: "P" },
      { label: "Slow, calm", value: "K" },
    ],
  },
  {
    id: "C2",
    text: "Energy pattern",
    description: "Your daily energy feels...",
    options: [
      { label: "Irregular", value: "V" },
      { label: "Strong", value: "P" },
      { label: "Stable", value: "K" },
    ],
  },

  // SECTION D
  {
    id: "D1",
    text: "Thinking style",
    description: "How does your mind work?",
    options: [
      { label: "Creative & quick", value: "V" },
      { label: "Logical & focused", value: "P" },
      { label: "Calm & patient", value: "K" },
    ],
  },
  {
    id: "D2",
    text: "Memory",
    description: "Your memory is...",
    options: [
      { label: "Quick but forgets", value: "V" },
      { label: "Sharp recall", value: "P" },
      { label: "Slow but lasting", value: "K" },
    ],
  },
  {
    id: "D3",
    text: "Decision making",
    description: "You make decisions...",
    options: [
      { label: "Quickly but change often", value: "V" },
      { label: "Confidently", value: "P" },
      { label: "Slow but firm", value: "K" },
    ],
  },
  {
    id: "D4",
    text: "Stress response",
    description: "Under pressure you feel...",
    options: [
      { label: "Anxious", value: "V" },
      { label: "Irritable", value: "P" },
      { label: "Withdrawn", value: "K" },
    ],
  },
  {
    id: "D5",
    text: "Emotional nature",
    description: "Emotionally you are...",
    options: [
      { label: "Changeable", value: "V" },
      { label: "Intense", value: "P" },
      { label: "Calm & steady", value: "K" },
    ],
  },

  // SECTION E
  {
    id: "E1",
    text: "Sleep depth",
    description: "How do you sleep?",
    options: [
      { label: "Light sleeper", value: "V" },
      { label: "Moderate sleep", value: "P" },
      { label: "Deep sleep", value: "K" },
    ],
  },
  {
    id: "E2",
    text: "Sleep duration",
    description: "You feel rested with...",
    options: [
      { label: "<6 hours", value: "V" },
      { label: "6–7 hours", value: "P" },
      { label: "8+ hours", value: "K" },
    ],
  },

  // SECTION F
  {
    id: "F1",
    text: "Health tendencies",
    description: "You often experience...",
    options: [
      { label: "Anxiety, dryness, bloating", value: "V" },
      { label: "Acidity, inflammation", value: "P" },
      { label: "Weight gain, lethargy", value: "K" },
    ],
  },
  {
    id: "F2",
    text: "Interest",
    description: "You are drawn to...",
    options: [
      { label: "Creative fields", value: "V" },
      { label: "Achievement-driven work", value: "P" },
      { label: "People-oriented roles", value: "K" },
    ],
  },
];

export default function DoshaAssessment() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const current = questions[step];

  const handleSelect = (value) => {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);

    if (step < questions.length - 1) setStep(step + 1);
    else calculate(updated);
  };

  const calculate = (data) => {
    let score = { V: 0, P: 0, K: 0 };
    Object.values(data).forEach((v) => score[v]++);
    const total = Object.values(score).reduce((a, b) => a + b, 0);

    setResult({
      V: ((score.V / total) * 100).toFixed(0),
      P: ((score.P / total) * 100).toFixed(0),
      K: ((score.K / total) * 100).toFixed(0),
      dominant: Object.keys(score).reduce((a, b) =>
        score[a] > score[b] ? a : b
      ),
    });
  };

  // 🌿 INTRO
  if (step === -1) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f7f6f2]">
        <button onClick={() => setStep(0)} className="px-6 py-3 bg-black text-white rounded-full">
          Begin Assessment
        </button>
      </div>
    );
  }

  // 🌿 RESULT PAGE
  if (result) {
    const getColor = (type) => {
      if (type === "V") return "bg-purple-100 text-purple-700";
      if (type === "P") return "bg-red-100 text-red-700";
      return "bg-green-100 text-green-700";
    };

    const getName = (type) => {
      if (type === "V") return "Vata";
      if (type === "P") return "Pitta";
      return "Kapha";
    };

    return (
      <div className="h-screen flex items-center justify-center bg-[#f7f6f2] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-6 rounded-2xl shadow-sm"
        >
          <h2 className="text-xl font-semibold text-center mb-2">
            Your Dosha Profile
          </h2>

          <div className="space-y-3 mt-4">
            <div className="flex justify-between"><span>Vata</span><span>{result.V}%</span></div>
            <div className="flex justify-between"><span>Pitta</span><span>{result.P}%</span></div>
            <div className="flex justify-between"><span>Kapha</span><span>{result.K}%</span></div>
          </div>

          <div className={`mt-6 text-center py-3 rounded-xl ${getColor(result.dominant)}`}>
            Dominant: {getName(result.dominant)}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full py-3 border rounded-xl"
          >
            Retake
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#f7f6f2] px-6">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">{current.text}</h2>
          <p className="text-gray-500 mb-6">{current.description}</p>

          <div className="space-y-3">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="w-full text-left p-4 border rounded-xl hover:bg-white"
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Small Progress Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === step ? 1.3 : 1,
                  backgroundColor: i <= step ? "#000" : "#d1d5db",
                }}
                className="h-2 w-2 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}