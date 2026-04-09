import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaHandSparkles,
  FaEye,
  FaTemperatureHigh,
  FaWalking,
  FaUtensils,
  FaTint,
  FaAppleAlt,
  FaToilet,
  FaBrain,
  FaBed,
  FaBullseye,
  FaHeartbeat
} from "react-icons/fa";

const features = [
  {
    name: "Body Type",
    icon: FaUser,
    questions: [
      { text: "Body frame", options: ["Thin", "Medium", "Broad"] },
      { text: "Weight gain tendency", options: ["Hard", "Balanced", "Easy"] },
      { text: "Muscularity", options: ["Low", "Medium", "High"] }
    ]
  },
  {
    name: "Skin",
    icon: FaHandSparkles,
    questions: [
      { text: "Skin texture", options: ["Dry", "Warm", "Thick"] },
      { text: "Skin sensitivity", options: ["Low", "Medium", "High"] },
      { text: "Skin issues", options: ["Cracking", "Acne", "Smooth"] }
    ]
  },
  {
    name: "Nails",
    icon: FaHandSparkles,
    questions: [
      { text: "Nail texture", options: ["Brittle", "Soft", "Strong"] },
      { text: "Nail appearance", options: ["Rough", "Pink", "Thick"] },
      { text: "Breakability", options: ["High", "Medium", "Low"] }
    ]
  },
  {
    name: "Eyes",
    icon: FaEye,
    questions: [
      { text: "Eye size", options: ["Small", "Medium", "Large"] },
      { text: "Eye appearance", options: ["Dull", "Sharp", "Attractive"] },
      { text: "Light sensitivity", options: ["Low", "Medium", "High"] }
    ]
  },
  {
    name: "Sensitiveness",
    icon: FaTemperatureHigh,
    questions: [
      { text: "Sensitivity to cold", options: ["High", "Medium", "Low"] },
      { text: "Sensitivity to heat", options: ["Low", "High", "Medium"] },
      { text: "Sensitivity to environment", options: ["High", "Medium", "Low"] }
    ]
  },
  {
    name: "Walking Style",
    icon: FaWalking,
    questions: [
      { text: "Walking speed", options: ["Fast", "Moderate", "Slow"] },
      { text: "Movement style", options: ["Restless", "Purposeful", "Calm"] },
      { text: "Energy pattern", options: ["Bouncy", "Sharp", "Steady"] }
    ]
  },
  {
    name: "Appetite",
    icon: FaUtensils,
    questions: [
      { text: "Appetite pattern", options: ["Irregular", "Strong", "Stable"] },
      { text: "Hunger tolerance", options: ["Low", "Medium", "High"] },
      { text: "Eating frequency", options: ["Random", "Frequent", "Regular"] }
    ]
  },
  {
    name: "Thirst",
    icon: FaTint,
    questions: [
      { text: "Thirst level", options: ["Low", "Moderate", "High"] },
      { text: "Drinking pattern", options: ["Irregular", "Frequent", "Controlled"] }
    ]
  },
  {
    name: "Food Preference",
    icon: FaAppleAlt,
    questions: [
      { text: "Taste preference", options: ["Warm", "Cold", "Mixed"] },
      { text: "Preferred flavors", options: ["Sweet", "Sour", "Spicy", "Bitter"] },
      { text: "Food temperature", options: ["Hot", "Cold", "Normal"] }
    ]
  },
  {
    name: "Consumption",
    icon: FaUtensils,
    questions: [
      { text: "Eating speed", options: ["Fast", "Moderate", "Slow"] },
      { text: "Eating style", options: ["On-the-go", "Balanced", "Relaxed"] },
      { text: "Chewing habit", options: ["Poor", "Average", "Good"] }
    ]
  },
  {
    name: "Excretion",
    icon: FaToilet,
    questions: [
      { text: "Bowel pattern", options: ["Constipation", "Loose", "Regular"] },
      { text: "Frequency", options: ["Irregular", "Frequent", "Stable"] },
      { text: "Digestive comfort", options: ["Low", "Medium", "High"] }
    ]
  },
  {
    name: "Sweating",
    icon: FaTint,
    questions: [
      { text: "Sweat level", options: ["Low", "High", "Moderate"] },
      { text: "Sweat temperature", options: ["Cool", "Hot", "Neutral"] },
      { text: "Odor", options: ["Odorless", "Strong", "Mild"] }
    ]
  },
  {
    name: "Common Health Issues",
    icon: FaHeartbeat,
    questions: [
      { text: "Common issues", options: ["Anxiety", "Inflammation", "Congestion"] },
      { text: "Frequency of illness", options: ["Frequent", "Occasional", "Rare"] }
    ]
  },
  {
    name: "Mental Activity",
    icon: FaBrain,
    questions: [
      { text: "Thinking style", options: ["Creative", "Logical", "Calm"] },
      { text: "Activity level", options: ["Hyperactive", "Focused", "Slow"] },
      { text: "Memory", options: ["Quick", "Sharp", "Long-term"] }
    ]
  },
  {
    name: "Sleep",
    icon: FaBed,
    questions: [
      { text: "Sleep pattern", options: ["Light", "Moderate", "Deep"] },
      { text: "Sleep duration", options: ["Short", "Normal", "Long"] },
      { text: "Wake-up feeling", options: ["Tired", "Fresh", "Heavy"] }
    ]
  },
  {
    name: "Area of Interest",
    icon: FaBullseye,
    questions: [
      { text: "Interests", options: ["Arts", "Science", "Teaching"] },
      { text: "Work style", options: ["Creative", "Analytical", "Supportive"] }
    ]
  }
];

export default function QuestionnaireFlow() {
  const navigate = useNavigate();

  const [featureIndex, setFeatureIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentFeature = features[featureIndex];
  const currentQuestion = currentFeature.questions[questionIndex];

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers.push({
      feature: currentFeature.name,
      question: currentQuestion.text,
      answer: option
    });
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (questionIndex < currentFeature.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      if (featureIndex < features.length - 1) {
        setFeatureIndex(featureIndex + 1);
        setQuestionIndex(0);
      }
    }
  };

  const isComplete =
    featureIndex === features.length - 1 &&
    questionIndex === currentFeature.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white flex flex-col items-center justify-center p-6">

      {/* FEATURE HEADER */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl shadow-lg">
          <currentFeature.icon size={30} className="text-black" />
        </div>
        <h2 className="mt-3 text-xl font-semibold">
          {currentFeature.name}
        </h2>
      </div>

      {/* QUESTION CARD */}
      <motion.div
        key={currentFeature.name + questionIndex}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-[420px] bg-white/10 p-8 rounded-2xl shadow-xl"
      >
        <h3 className="text-lg mb-6 text-center">
          {currentQuestion.text}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>

      {/* PROGRESS */}
      <p className="mt-4 text-sm text-gray-400">
        Question {questionIndex + 1} / {currentFeature.questions.length}
      </p>

      {/* NEXT BUTTON */}
      {!isComplete ? (
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-3 bg-emerald-500 rounded-xl"
        >
          Next
        </button>
      ) : (
        <button
          disabled={!isComplete}
          onClick={() => {
            localStorage.setItem("answers", JSON.stringify(answers));
            navigate("/patients");
          }}
          className={`mt-6 px-6 py-3 rounded-xl ${
            isComplete
              ? "bg-yellow-400 text-black"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          View Score
        </button>
      )}

    </div>
  );
}