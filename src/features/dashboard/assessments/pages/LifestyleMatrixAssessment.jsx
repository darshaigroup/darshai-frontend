import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { lifestyleMatrixSections } from "../data/lifestyleMatrixData";
import { saveLifestyleMatrix } from "../services/lifestyleMatrixService";

const LifestyleMatrixAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const patient = location.state?.patient;

  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeSection = lifestyleMatrixSections[currentSection];

  const totalQuestions = lifestyleMatrixSections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  );

  const progress = Math.round(
    (Object.keys(answers).length / totalQuestions) * 100
  );

  const handleAnswer = (questionId, value) =>
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const report = await saveLifestyleMatrix({
        patient_id: patient.id,
        matrix_answers: answers,
      });

      navigate("/dashboard/lifestyle-matrix-result", {
        state: {
          patient,
          report,
        },
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#173C68]">
          Lifestyle Matrix Assessment
        </h1>

        <p className="text-slate-500 mt-2">
          Personalized wellness & retreat preference assessment.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-5 mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#173C68]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {lifestyleMatrixSections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              currentSection === index
                ? "bg-[#173C68] text-white"
                : "bg-white border"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-8">
          {activeSection.title}
        </h2>

        <div className="space-y-8">
          {activeSection.questions.map((question) => (
            <div key={question.id}>
              <h3 className="font-semibold mb-4">
                {question.question}
              </h3>

              <div className="flex flex-wrap gap-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleAnswer(question.id, option)
                    }
                    className={`px-5 py-3 rounded-full border transition-all ${
                      answers[question.id] === option
                        ? "bg-[#173C68] text-white border-[#173C68]"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() =>
            setCurrentSection((prev) => prev - 1)
          }
          disabled={currentSection === 0}
          className="px-6 py-3 rounded-xl border disabled:opacity-50"
        >
          Previous
        </button>

        {currentSection ===
        lifestyleMatrixSections.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl bg-[#173C68] text-white"
          >
            {isSubmitting ? "Saving..." : "Generate Report"}
          </button>
        ) : (
          <button
            onClick={() =>
              setCurrentSection((prev) => prev + 1)
            }
            className="px-8 py-3 rounded-xl bg-[#173C68] text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default LifestyleMatrixAssessment;
