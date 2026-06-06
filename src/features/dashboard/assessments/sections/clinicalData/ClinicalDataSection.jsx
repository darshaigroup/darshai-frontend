import QuestionCard from "../../components/questionnaire/QuestionCard";

import SectionHeader from "../../components/questionnaire/SectionHeader";

import { clinicalDataSections } from "./clinicalData";

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

  return (

    <div className="space-y-12">

      {sections.map(
        (section) => (

          <div
            key={section.id}
            className="space-y-8"
          >

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                {section.title}
              </h2>

            </div>

            {section.questions.map(
              (q) => (

                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-lg font-semibold text-slate-800 mb-5">
                    {q.question}
                  </h3>

                  {/* YES / NO */}

                  {q.type ===
                    "yesNo" && (

                    <div className="flex gap-4">

                      {[
                        "Yes",
                        "No",
                      ].map(
                        (
                          option
                        ) => (

                          <button
                            key={
                              option
                            }
                            type="button"
                            onClick={() =>
                              updateValue(
                                q.id,
                                option
                              )
                            }
                            className={`px-5 py-2 rounded-xl transition ${
                              answers[
                                q.id
                              ] ===
                              option
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >

                            {
                              option
                            }

                          </button>

                        )
                      )}

                    </div>

                  )}

                  {/* SINGLE SELECT */}

                  {q.type ===
                    "singleSelect" && (

                    <div className="flex flex-wrap gap-3">

                      {q.options.map(
                        (
                          option
                        ) => (

                          <button
                            key={
                              option
                            }
                            type="button"
                            onClick={() =>
                              updateValue(
                                q.id,
                                option
                              )
                            }
                            className={`px-5 py-2 rounded-xl transition ${
                              answers[
                                q.id
                              ] ===
                              option
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >

                            {
                              option
                            }

                          </button>

                        )
                      )}

                    </div>

                  )}

                  {/* MULTI SELECT */}

                  {q.type ===
                    "multiSelect" && (

                    <div className="flex flex-wrap gap-3">

                      {q.options.map(
                        (
                          option
                        ) => (

                          <button
                            key={
                              option
                            }
                            type="button"
                            onClick={() =>
                              toggleMultiSelect(
                                q.id,
                                option
                              )
                            }
                            className={`px-5 py-2 rounded-xl transition ${
                              (
                                answers[
                                  q.id
                                ] ||
                                []
                              ).includes(
                                option
                              )
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >

                            {
                              option
                            }

                          </button>

                        )
                      )}

                    </div>

                  )}

                  {/* TEXT */}

                  {q.type ===
                    "text" && (

                    <input
                      type="text"
                      value={
                        answers[
                          q.id
                        ] || ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateValue(
                          q.id,
                          e.target
                            .value
                        )
                      }
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                  )}

                  {/* TEXTAREA */}

                  {q.type ===
                    "textarea" && (

                    <textarea
                      rows={4}
                      value={
                        answers[
                          q.id
                        ] || ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateValue(
                          q.id,
                          e.target
                            .value
                        )
                      }
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                  )}

                 

                  {q.type ===
                    "number" && (

                    <input
                      type="number"
                      value={
                        answers[
                          q.id
                        ] || ""
                      }
                      onChange={(
                        e
                      ) =>
                        updateValue(
                          q.id,
                          e.target
                            .value
                        )
                      }
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                  )}

                </div>

              )
            )}

          </div>

        )
      )}

    </div>

  );

};

export default ClinicalDataSection;