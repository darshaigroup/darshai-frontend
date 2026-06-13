import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lifestyleMatrixSections } from "@/data/lifestyleMatrixData";
import ProgressHeader from "@/components/onboarding/ProgressHeader";
import QuestionRenderer from "@/components/onboarding/QuestionRenderer";

export default function OnboardingFlow() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const sections = [
    lifestyleMatrixSections[0],
    lifestyleMatrixSections[1],
    lifestyleMatrixSections[2],
    lifestyleMatrixSections[3],
    lifestyleMatrixSections[4],
  ];

  const activeSection = sections[step];

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (step < sections.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/lifestyle/review", { state: { answers } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <ProgressHeader current={step + 1} total={sections.length} />

        <div className="bg-white rounded-[48px] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.08)] mt-8">
          <h1 className="text-5xl font-serif text-[#173C68] mb-2">{activeSection.title}</h1>
          <p className="text-slate-500 mb-10">Select all that apply</p>

          <div className="space-y-12">
            {activeSection.questions.map((question) => (
              <QuestionRenderer
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="flex justify-end mt-12">
            <button
              onClick={handleNext}
              className="px-10 py-4 rounded-full bg-[#1E7A3A] text-white hover:bg-[#14532d] transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}