import { useMemo } from "react";

const ClinicalDataSection = ({
  sections,
  answers,
  setAnswers,
}) => {

  const updateValue = (
    key,
    value
  ) => {

    setAnswers({
      [key]: value,
    });

  };

  const toggleMultiSelect = (
    questionId,
    option
  ) => {

    const current =
      answers[questionId] || [];

    const updated =
      current.includes(option)
        ? current.filter(
            (item) =>
              item !== option
          )
        : [
            ...current,
            option,
          ];

    setAnswers({
      [questionId]:
        updated,
    });

  };

  const totalQuestions =
    useMemo(
      () =>
        sections.reduce(
          (
            total,
            section
          ) =>
            total +
            section.questions.length,
          0
        ),
      [sections]
    );

  const answeredQuestions =
    Object.keys(
      answers
    ).filter(
      (key) => {

        const value =
          answers[key];

        return (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (
            !Array.isArray(value) ||
            value.length > 0
          )
        );

      }
    ).length;

  const completion =
    Math.round(
      (
        answeredQuestions /
        totalQuestions
      ) *
        100
    ) || 0;

  return (

    <div className="space-y-10">

      {/* PROGRESS */}

      <div className="sticky top-4 z-20 bg-white rounded-[28px] p-6 shadow-xl border border-slate-100">

        <div className="flex justify-between items-center mb-3">

          <h3 className="font-bold text-slate-800">
            Assessment Progress
          </h3>

          <span className="font-bold text-teal-700">
            {completion}%
          </span>

        </div>

        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] transition-all duration-500"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

      </div>

      {sections.map(
        (
          section
        ) => (

          <div
            key={section.id}
            className="space-y-8"
          >

            {/* SECTION HEADER */}

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                {section.title}
              </h2>

              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] mt-3" />

            </div>

            {section.questions.map(
              (q) => {

                if (
                  q.id === "otherCondition" &&
                  !answers.medicalConditions?.includes(
                    "Other"
                  )
                )
                  return null;

                if (
                  q.id === "medicationDetails" &&
                  answers.takingMedication !== "Yes"
                )
                  return null;

                if (
                  q.id === "allergyDetails" &&
                  answers.hasAllergies !== "Yes"
                )
                  return null;

                if (
                  q.id === "surgeryDetails" &&
                  answers.surgeryHistory !== "Yes"
                )
                  return null;

                if (
                  q.id === "bloodPressure" &&
                  answers.bloodPressureKnown !== "Yes"
                )
                  return null;

                if (
                  q.id === "hairSkinDetails" &&
                  answers.hairSkin !== "Yes"
                )
                  return null;

                if (
                  q.id === "goalOther" &&
                  answers.primaryGoal !== "Other"
                )
                  return null;

                return (

                  <div
                    key={q.id}
                    className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-[28px] p-8 shadow-lg hover:shadow-xl transition-all"
                  >

                    <h3 className="text-lg font-semibold text-slate-800 mb-6">
                      {q.question}
                    </h3>

                    {/* YES / NO */}

                    {q.type === "yesNo" && (

                      <div className="grid md:grid-cols-2 gap-4">

                        {[
                          "Yes",
                          "No",
                        ].map(
                          (
                            option
                          ) => (

                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                updateValue(
                                  q.id,
                                  option
                                )
                              }
                              className={`p-5 rounded-2xl border-2 font-semibold transition-all ${
                                answers[q.id] === option
                                  ? "border-teal-600 bg-teal-600 text-white shadow-lg"
                                  : "border-slate-200 bg-white hover:border-teal-300"
                              }`}
                            >

                              {option}

                            </button>

                          )
                        )}

                      </div>

                    )}

                    {/* SINGLE SELECT */}

                    {q.type === "singleSelect" && (

                      <div className="flex flex-wrap gap-3">

                        {q.options.map(
                          (
                            option
                          ) => (

                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                updateValue(
                                  q.id,
                                  option
                                )
                              }
                              className={`px-5 py-3 rounded-2xl border transition-all ${
                                answers[q.id] === option
                                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                                  : "bg-white border-slate-200 hover:border-teal-400"
                              }`}
                            >

                              {option}

                            </button>

                          )
                        )}

                      </div>

                    )}

                    {/* MULTI SELECT */}

                    {q.type === "multiSelect" && (

                      <div className="flex flex-wrap gap-3">

                        {q.options.map(
                          (
                            option
                          ) => (

                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                toggleMultiSelect(
                                  q.id,
                                  option
                                )
                              }
                              className={`px-5 py-3 rounded-2xl border transition-all ${
                                (
                                  answers[q.id] ||
                                  []
                                ).includes(
                                  option
                                )
                                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                                  : "bg-white border-slate-200 hover:border-teal-400"
                              }`}
                            >

                              {option}

                            </button>

                          )
                        )}

                      </div>

                    )}

                    {/* TEXT */}

                    {q.type === "text" && (

                      <input
                        type="text"
                        value={
                          answers[q.id] || ""
                        }
                        onChange={(e) =>
                          updateValue(
                            q.id,
                            e.target.value
                          )
                        }
                        className="w-full border border-slate-200 bg-slate-50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />

                    )}

                    {/* NUMBER */}

                    {q.type === "number" && (

                      <input
                        type="number"
                        value={
                          answers[q.id] || ""
                        }
                        onChange={(e) =>
                          updateValue(
                            q.id,
                            e.target.value
                          )
                        }
                        className="w-full border border-slate-200 bg-slate-50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />

                    )}

                    {/* TEXTAREA */}

                    {q.type === "textarea" && (

                      <textarea
                        rows={4}
                        value={
                          answers[q.id] || ""
                        }
                        onChange={(e) =>
                          updateValue(
                            q.id,
                            e.target.value
                          )
                        }
                        className="w-full border border-slate-200 bg-slate-50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />

                    )}

                  </div>

                );

              }
            )}

          </div>

        )
      )}

    </div>

  );

};

export default ClinicalDataSection;