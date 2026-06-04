import { amaSections } from "./amaData";

import QuestionCard from "../../../components/questionnaire/QuestionCard";
import SectionHeader from "../../../components/questionnaire/SectionHeader";

const LEVELS = [
  {
    label: "Never",
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
    label: "Severe",
    value: 3,
  },
];

const AmaSection = ({
  answers,
  setAnswers,
}) => {

  const handleSelect = (
    questionId,
    value
  ) => {

    setAnswers({

      [questionId]:
        value,

    });

  };

  return (

    <div className="space-y-10">

      {amaSections.map(
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
              description={
                section.description
              }
            />

            {section.questions.map(
              (q) => (

                <QuestionCard
                  key={q.id}
                  question={q.question}
                >

                  <div className="flex flex-wrap gap-3">

                    {LEVELS.map(
                      (
                        lvl
                      ) => (

                        <button
                          key={
                            lvl.value
                          }
                          onClick={() =>
                            handleSelect(
                              q.id,
                              lvl.value
                            )
                          }
                          className={`px-4 py-2 rounded-xl transition shadow-sm ${
                            answers[
                              q.id
                            ] ===
                            lvl.value
                              ? "bg-teal-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >

                          {
                            lvl.label
                          }

                        </button>

                      )
                    )}

                  </div>

                </QuestionCard>

              )
            )}

          </div>

        )
      )}

    </div>

  );

};

export default AmaSection;