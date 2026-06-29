import { useState } from "react";
import AssessmentQuestion from "../components/assessment/AssessmentQuestion";
import AssessmentResult from "../components/assessment/AssessmentResult";
import ProgressTracker from "../components/assessment/ProgressTracker";

export default function AssessmentView({
  questions = [],
  onSubmit,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentStep - 1];

  const handleAnswer = value => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep >= questions.length) {
      setCompleted(true);
      onSubmit?.(answers);
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  if (completed) {
    return (
      <AssessmentResult
        dominantDosha="Pitta"
        results={{
          vata: 68,
          pitta: 88,
          kapha: 54,
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProgressTracker
        currentStep={currentStep}
        totalSteps={questions.length}
      />

      {currentQuestion && (
        <AssessmentQuestion
          question={currentQuestion}
          value={answers[currentQuestion.id]}
          onChange={handleAnswer}
        />
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 h-11 rounded-xl bg-emerald-600 text-white"
        >
          {currentStep === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}