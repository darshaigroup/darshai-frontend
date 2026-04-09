import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    name: "Body Type",
    icon: "🧍",
    questions: [
      { text: "Body frame", options: ["Thin", "Medium", "Broad"] },
      { text: "Weight gain tendency", options: ["Hard", "Balanced", "Easy"] },
      { text: "Muscularity", options: ["Low", "Medium", "High"] }
    ]
  },
  {
    name: "Skin",
    icon: "🧴",
    questions: [
      { text: "Skin texture", options: ["Dry", "Warm", "Thick"] },
      { text: "Skin sensitivity", options: ["Low", "Medium", "High"] },
      { text: "Skin issues", options: ["Cracking", "Acne", "Smooth"] }
    ]
  },
  {
    name: "Eyes",
    icon: "👁️",
    questions: [
      { text: "Eye size", options: ["Small", "Medium", "Large"] },
      { text: "Eye appearance", options: ["Dull", "Sharp", "Attractive"] },
      { text: "Light sensitivity", options: ["Low", "Medium", "High"] }
    ]
  }
  // 👉 add all remaining from PDF same way
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
          {currentFeature.icon}
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