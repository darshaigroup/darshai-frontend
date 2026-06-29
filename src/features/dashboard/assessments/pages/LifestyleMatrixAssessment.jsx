import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { lifestyleMatrixSections } from "../data/lifestyleMatrixData";

import {
  saveLifestyleMatrix,
  getLifestyleMatrix,
} from "../services/lifestyleMatrixService";

const LifestyleMatrixAssessment = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const patient = location.state?.patient;

  const [answers, setAnswers] = useState({});

  const [currentSection, setCurrentSection] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const source = location.state?.source;

  useEffect(() => {
    if (patient?.id) {
      loadLifestyleMatrix();
    }
  }, []);

  const loadLifestyleMatrix = async () => {
    try {
      const data = await getLifestyleMatrix(patient.id);

      if (data?.matrix_answers) {
        setAnswers(data.matrix_answers);
      }
    } catch (error) {
      console.error("LOAD MATRIX ERROR", error);
    }
  };

  const multiSelectQuestions = [
    "retreat_goal",

    "mind_body_practice",

    "therapeutic_experience",

    "creative_activity",

    "wellness_learning",

    "retreat_experience",

    "exercise_type",
  ];

  const handleAnswer = (
    questionId,

    value,

    multiple = false,
  ) => {
    if (multiple) {
      setAnswers((prev) => {
        const existing = Array.isArray(prev[questionId])
          ? prev[questionId]
          : [];

        const updated = existing.includes(value)
          ? existing.filter((item) => item !== value)
          : [...existing, value];

        return {
          ...prev,

          [questionId]: updated,
        };
      });

      return;
    }

    setAnswers((prev) => ({
      ...prev,

      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentSection < lifestyleMatrixSections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const report = await saveLifestyleMatrix({
        patient_id: patient.id,

        matrix_answers: answers,
      });

     if (source === "questionnaire") {

  navigate(
    `/dashboard/report-display/${patient.id}`,
    {
      state: {
        reportType: "lifestyle"
      }
    }
  );

} else {

  navigate(
    "/dashboard/lifestyle-matrix-result",
    {
      state: {
        patient,
        report
      }
    }
  );

}
    } catch (error) {
      console.error("SAVE MATRIX ERROR", error);

      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeSection = lifestyleMatrixSections[currentSection];

  const visibleQuestions =
  activeSection?.questions?.filter(
    (question) => {

      if (!question.visibleFor) {
        return true;
      }

      return question.visibleFor.includes(
        answers.retreat_for
      );

    }
  ) || [];
  const totalQuestions = lifestyleMatrixSections.reduce(
    (sum, section) => sum + (section.questions?.length || 0),
    0,
  );

  const validSections =
  lifestyleMatrixSections.filter(
    (section) =>
      section.title &&
      Array.isArray(section.questions)
  );

  const answeredQuestions = Object.keys(answers).length;

  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6FFF8] via-white to-[#F0FFF4]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#03a547]">
            Lifestyle Matrix Assessment
          </h1>

          <p className="text-slate-500 mt-2">
            Personalized wellness & retreat preference assessment.
          </p>
        </div>

        {/* PROGRESS */}

        <div className="bg-gradient-to-r from-[#E8FFF1] to-[#F5FFF8] border border-[#C6F6D5] rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-3">
            <span>Overall Progress</span>

            <span>{progress}%</span>
          </div>

          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#00C853] to-[#1DB954] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {answeredQuestions} of {totalQuestions} questions completed
          </p>
        </div>

        {/* SECTION NAVIGATION */}

        <div className="flex flex-wrap gap-3 mb-8">
          {lifestyleMatrixSections
  .filter(
    (section) =>
      section.title &&
      Array.isArray(section.questions)
  )
  .map((section, index) => (
    <button
      key={section.id}
      onClick={() => setCurrentSection(index)}
      className={`
        px-5 py-3 rounded-2xl text-sm font-medium transition-all
        ${
          currentSection === index
            ? "bg-gradient-to-r from-[#00C853] to-[#1DB954] text-white shadow-lg scale-[1.02]"
            : "bg-white border border-slate-200 text-slate-700 hover:border-[#00C853] hover:text-[#00C853]"
        }
      `}
    >
      {section.title}
    </button>
))}
        </div>

        {/* ACTIVE SECTION */}

        <div className="bg-white rounded-[32px] border border-[#E5F7EC] shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {activeSection.title}
              </h2>

              <p className="text-slate-500 mt-2">
                Complete all questions in this section
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C853] to-[#1DB954] flex items-center justify-center text-white text-xl font-bold">
              {currentSection + 1}
            </div>
          </div>

          <div className="space-y-8">
            {visibleQuestions.map((question) => (
              <div
                key={question.id}
                className="border border-slate-100 rounded-3xl p-6 bg-slate-50/50"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  {question.question}
                </h3>

                {question.type === "number" ? (
                  <input
                    type="number"
                    min="0"
                    max={question.max || 100}
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    placeholder={`Enter ${question.question}`}
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:border-[#00C853]"
                  />
                ) : question.type === "select" ? (
                  <select
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:border-[#00C853]"
                  >
                    <option value="">Select</option>

                    {Array.from(
                      {
                        length: question.max,
                      },
                      (_, i) => i + 1,
                    ).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          handleAnswer(question.id, option, question.multiple)
                        }
                        className={`
          px-5
          py-3
          rounded-2xl
          border
          font-medium
          transition-all
          ${
            (
              question.multiple
                ? (answers[question.id] || []).includes(option)
                : answers[question.id] === option
            )
              ? "bg-gradient-to-r from-[#00C853] to-[#1DB954] text-white border-transparent shadow-md"
              : "bg-white border-slate-200 text-slate-700 hover:border-[#00C853] hover:text-[#00C853]"
          }
        `}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.allowOther &&
                  question.multiple &&
                  Array.isArray(answers[question.id]) &&
                  answers[question.id].includes("Other") && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={answers[`${question.id}_other`] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,

                            [`${question.id}_other`]: e.target.value,
                          }))
                        }
                        placeholder="Please specify"
                        className="w-full h-12 px-4 rounded-2xl border border-[#00C853] outline-none"
                      />
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER BUTTONS */}

        <div className="flex justify-between items-center mt-10">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="px-8 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
          >
            Previous
          </button>

          {currentSection === lifestyleMatrixSections.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#1DB954] text-white font-semibold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Generating Report..." : "View Report"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#1DB954] text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
            >
              Next Section
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LifestyleMatrixAssessment;
