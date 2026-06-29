import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { lifestyleMatrixSections } from "@/data/lifestyleMatrixData";
import ProgressHeader from "@/components/onboarding/ProgressHeader";
import QuestionRenderer from "@/components/onboarding/QuestionRenderer";

export default function OnboardingFlow() {
  const navigate = useNavigate();
const { state } = useLocation();
  const [step, setStep] = useState(state?.step || 0);
  

  const [answers, setAnswers] = useState(
    state?.answers ||
      JSON.parse(sessionStorage.getItem("lifestyleAnswers") || "{}"),
  );
  useEffect(() => {
    sessionStorage.setItem("lifestyleAnswers", JSON.stringify(answers));
  }, [answers]);

  const activeSection = lifestyleMatrixSections[step];
  const isFirst = step === 0;
  const isLast = step === lifestyleMatrixSections.length - 1;

  const handleChange = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (!isLast) {
      setStep((prev) => prev + 1);
      return;
    }

    navigate("/lifestyle/review", { state: { answers, step } });
  }, [isLast, answers, navigate]);

  const handlePrevious = useCallback(() => {
    if (!isFirst) setStep((prev) => prev - 1);
  }, [isFirst]);

  const renderedQuestions = useMemo(
    () =>
      activeSection.questions.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={answers[question.id]}
          answers={answers}
          onChange={handleChange}
        />
      )),
    [activeSection, answers, handleChange],
  );

  return (
    <div className="min-h-screen bg-[#F4EFE6] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        <ProgressHeader
          current={step + 1}
          total={lifestyleMatrixSections.length}
        />

        <div className="bg-white rounded-3xl lg:rounded-[48px] p-5 sm:p-7 md:p-8 lg:p-10 shadow-[0_30px_100px_rgba(0,0,0,.08)] mt-6">
          <h1 className="font-serif text-[#173C68] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            {activeSection.title}
          </h1>

          <p className="text-slate-500 text-sm sm:text-base mt-2 mb-8 sm:mb-10">
            Select all that apply
          </p>

          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {renderedQuestions}
          </div>

          <div className="sticky bottom-0 bg-white pt-6 mt-10 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={isFirst}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full transition ${
                isFirst
                  ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-white border border-slate-200 hover:border-[#1E7A3A] hover:text-[#1E7A3A]"
              }`}
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#1E7A3A] text-white hover:bg-[#16632F] shadow-lg transition"
            >
              {isLast ? "Review" : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
