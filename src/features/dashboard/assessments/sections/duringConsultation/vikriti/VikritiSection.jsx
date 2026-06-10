import { vikritiSections } from "./vikritiData";

import QuestionCard from "../../../components/questionnaire/QuestionCard";
import SectionHeader from "../../../components/questionnaire/SectionHeader";

const OPTIONS = [
  {
    label: "Agree",
    value: 3,
  },
  {
    label: "Neutral",
    value: 2,
  },
  {
    label: "Disagree",
    value: 1,
  },
];

const VikritiSection = ({
  answers,
  setAnswers,
}) => {

  const handleSelect = (
    questionId,
    dosha,
    value
  ) => {

    const existing =
      answers[
        questionId
      ] || [null, null, null];

    const updated =
      [...existing];

    const indexMap = {

      VATA: 0,

      PITTA: 1,

      KAPHA: 2,

    };

    updated[
      indexMap[dosha]
    ] = value;

    setAnswers({

      [questionId]:
        updated,

    });

  };

  return (

    <div className="space-y-10">

      {vikritiSections.map(
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

                  {q.statements.map(
                    (
                      stmt,
                      idx
                    ) => {

                      const dosha =
                        stmt.type;

                      const selectedValue =
                        answers[
                          q.id
                        ]?.[
                          dosha === "VATA"
                            ? 0
                            : dosha === "PITTA"
                            ? 1
                            : 2
                        ];

                      return (

                        <div
                          key={idx}
                          className="mb-8"
                        >

                          <p className="mb-4 text-base text-gray-700">
                            {stmt.text}
                          </p>

                          <div className="flex flex-wrap gap-3">

                            {OPTIONS.map(
                              (
                                opt
                              ) => (

                                <button
                                  key={
                                    opt.value
                                  }
                                  onClick={() =>
                                    handleSelect(
                                      q.id,
                                      dosha,
                                      opt.value
                                    )
                                  }
                                  className={`px-4 py-2 rounded-xl transition shadow-sm ${
                                    selectedValue ===
                                    opt.value
                                      ? "bg-teal-600 text-white"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                                >

                                  {
                                    opt.label
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

export default VikritiSection;