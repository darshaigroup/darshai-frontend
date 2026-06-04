import { prakritiSections } from "./prakritiData";

import QuestionCard from "../../../components/questionnaire/QuestionCard";
import SectionHeader from "../../../components/questionnaire/SectionHeader";
import OptionRadio from "../../../components/questionnaire/OptionRadio";

const DOSHA_MAP = {
  VATA: 0,
  PITTA: 1,
  KAPHA: 2,
};

const PrakritiSection = ({
  answers,
  setAnswers,
}) => {

  const handleSelect = (
    questionId,
    value
  ) => {

    setAnswers({
      [questionId]:
        DOSHA_MAP[value],
    });

  };

  return (

    <div className="space-y-10">

      {prakritiSections.map(
        (section, sIndex) => (

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

                  <div className="space-y-4">

                    {q.options.map(
                      (
                        opt,
                        index
                      ) => (

                        <OptionRadio
                          key={index}
                          name={q.id}
                          value={opt.value}
                          selected={
                            Object.keys(
                              DOSHA_MAP
                            ).find(
                              (key) =>
                                DOSHA_MAP[
                                  key
                                ] ===
                                answers[
                                  q.id
                                ]
                            )
                          }
                          onChange={(
                            value
                          ) =>
                            handleSelect(
                              q.id,
                              value
                            )
                          }
                          label={
                            opt.label
                          }
                        />

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

export default PrakritiSection;