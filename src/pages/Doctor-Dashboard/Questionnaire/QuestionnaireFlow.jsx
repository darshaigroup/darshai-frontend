import { useState } from "react";
import { motion } from "framer-motion";

const doshas = [
  { key: "vata", label: "Vata", color: "from-blue-400 to-indigo-500" },
  { key: "pitta", label: "Pitta", color: "from-red-400 to-orange-500" },
  { key: "kapha", label: "Kapha", color: "from-green-400 to-emerald-500" }
];

const features = [
  {
    name: "Body Type",
    options: {
      vata: ["Thin", "Bony", "Irregular"],
      pitta: ["Muscular", "Athletic", "Balanced"],
      kapha: ["Broad", "Heavy", "Sturdy"]
    }
  },
  {
    name: "Skin",
    options: {
      vata: ["Dry", "Rough", "Cool"],
      pitta: ["Warm", "Oily", "Sensitive"],
      kapha: ["Thick", "Soft", "Pale"]
    }
  },
  {
    name: "Eyes",
    options: {
      vata: ["Small", "Dry", "Sunken"],
      pitta: ["Sharp", "Bright", "Sensitive"],
      kapha: ["Large", "Calm", "Attractive"]
    }
  }
  // 👉 Add remaining features same way
];

export default function QuestionnaireFlow() {
  const [featureIndex, setFeatureIndex] = useState(0);
  const [doshaIndex, setDoshaIndex] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({
    vata: 0,
    pitta: 0,
    kapha: 0
  });

  const currentFeature = features[featureIndex];
  const currentDosha = doshas[doshaIndex];

  const handleSelect = (option, index) => {
    const value = 3 - index; // scoring logic

    setScores(prev => ({
      ...prev,
      [currentDosha.key]: prev[currentDosha.key] + value
    }));

    setAnswers([...answers, option]);
  };

  const handleNext = () => {
    if (doshaIndex < 2) {
      setDoshaIndex(doshaIndex + 1);
    } else {
      if (featureIndex < features.length - 1) {
        setFeatureIndex(featureIndex + 1);
        setDoshaIndex(0);
      }
    }
  };

  const isComplete =
    featureIndex === features.length - 1 && doshaIndex === 2;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-10">

      {/* 🔵 DOSHA + CONNECTED STEM */}
      <div className="relative flex justify-center items-center gap-32 mb-20">

        {/* CURVED CONNECTION */}
        <svg className="absolute top-20 w-[600px] h-[200px]">
          <path
            d="M100 0 Q300 200 500 0"
            stroke="#facc15"
            strokeWidth="6"
            fill="transparent"
          />
        </svg>

        {doshas.map((d, index) => (
          <div key={d.key} className="flex flex-col items-center">

            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${d.color}
              ${doshaIndex === index ? "shadow-[0_0_40px_#22c55e]" : "opacity-30"}`}
            >
              {d.label}
            </div>

          </div>
        ))}

        {/* FEATURE CENTER */}
        <div className="absolute top-40 text-center">
          <h2 className="text-xl text-yellow-400">
            {currentFeature.name}
          </h2>
        </div>

      </div>

      {/* OPTIONS */}
      <motion.div
        key={currentFeature.name + currentDosha.key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[500px]"
      >
        <h3 className="mb-6 text-lg text-center">
          {currentDosha.label} - Select matching trait
        </h3>

        <div className="space-y-3">
          {currentFeature.options[currentDosha.key].map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt, i)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>

      {/* BUTTON */}
      {!isComplete ? (
        <button
          onClick={handleNext}
          className="mt-8 px-8 py-3 bg-emerald-500 rounded-xl"
        >
          Next
        </button>
      ) : (
        <button
          disabled={!isComplete}
          className={`mt-8 px-8 py-3 rounded-xl ${
            isComplete
              ? "bg-yellow-400 text-black"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={() => {
            localStorage.setItem("doshaScores", JSON.stringify(scores));
            console.log(scores);
          }}
        >
          View Score
        </button>
      )}

    </div>
  );
}