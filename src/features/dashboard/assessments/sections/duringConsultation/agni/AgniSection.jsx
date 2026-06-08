import { agniSections } from "./agniData";

import QuestionCard from "../../../components/questionnaire/QuestionCard";
import SectionHeader from "../../../components/questionnaire/SectionHeader";

const SCALE = [
  {
    label: "Not at all",
    value: 0,
  },
  {
    label: "Mild",
    value: 1,
  },
  {
    label: "Moderate",
    value: 2,
  },
  {
    label: "Strong",
    value: 3,
  },
];

const AgniSection = ({
  answers,
  setAnswers,
}) => {

  const handleSelect = (
    questionId,
    type,
    value
  ) => {

    const existing =
      answers[
        questionId
      ] || {

        vishama: null,

        tikshna: null,

        manda: null,

      };

    setAnswers({

      [questionId]: {

        ...existing,

        [type]:
          value,

      },

    });

  };

  return (

    <div className="space-y-10">

      {agniSections.map(
        (
          section,
          sIndex
        ) => (

          <div
            key={sIndex}
            className="space-y-6"
          >

            <SectionHeader
              title={section.title}
            />

            {section.questions.map(
              (q) => (

                <QuestionCard
                  key={q.id}
                  question={q.question}
                >

                  {q.patterns.map(
                    (
                      pattern,
                      idx
                    ) => {

                      const type =
                        pattern.type;

                      return (

                        <div
                          key={idx}
                          className="mb-8"
                        >

                          <p className="mb-4 text-base text-gray-700">
                            {pattern.text}
                          </p>

                          <div className="flex flex-wrap gap-3">

                            {SCALE.map(
                              (
                                level
                              ) => (

                                <button
                                  key={
                                    level.value
                                  }
                                  onClick={() =>
                                    handleSelect(
                                      q.id,
                                      type,
                                      level.value
                                    )
                                  }
                                  className={`px-4 py-2 rounded-xl transition shadow-sm ${
                                    answers[
                                      q.id
                                    ]?.[
                                      type
                                    ] ===
                                    level.value
                                      ? "bg-teal-600 text-white"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                                >

                                  {
                                    level.label
                                  }

                                </button>

                              )
                            )}

                          </div>

                        </div>

                      );

                    }
                  )}

                </QuestionCard>

              )
            )}

          </div>

        )
      )}

    </div>

  );

};

export default AgniSection;