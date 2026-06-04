import {
  useState,
  useEffect,
} from "react";

import AssessmentLayout from "../../../layouts/AssessmentLayout";

import PatientSidebar from "../../../components/questionnaire/PatientSidebar";

import WellnessSectionCard from "../../../components/questionnaire/WellnessSectionCard";

import ExpandableQuestion from "../../../components/questionnaire/ExpandableQuestion";

import { inflammationSections } from "./inflammationData";

import { patientFlowSections } from "../../../utils/patientFlowSections";

const InflammationAssessment = ({
  data,
  onComplete,
  activeQuestion,
  onNavigate,
}) => {

  const section =
    inflammationSections[0];

  const [answers, setAnswers] =
    useState({});

  const [openQuestion, setOpenQuestion] =
    useState(
      activeQuestion ||
      section.questions[0].id
    );

  useEffect(() => {

    if (activeQuestion) {

      setOpenQuestion(
        activeQuestion
      );

    }

  }, [activeQuestion]);

  useEffect(() => {

    if (data?.inflammation) {

      setAnswers(
        data.inflammation
      );

    }

  }, [data]);

  const handleSelect = (
    questionId,
    option
  ) => {

    const updated = {
      ...answers,

      [questionId]: {
        level: option.level,

        label: option.label,

        weight:
          section.questions.find(
            (q) =>
              q.id === questionId
          )?.weight,
      },
    };

    setAnswers(updated);

    const currentIndex =
      section.questions.findIndex(
        (q) =>
          q.id === questionId
      );

    const nextQuestion =
      section.questions[
        currentIndex + 1
      ];

    setTimeout(() => {

      if (nextQuestion) {

        setOpenQuestion(
          nextQuestion.id
        );

      } else {

        setOpenQuestion(
          null
        );

      }

    }, 300);

  };

  return (

    <AssessmentLayout
      sidebar={
        <PatientSidebar
          sections={patientFlowSections}
          activeSection="inflammation"
          activeQuestion={openQuestion}
          answers={data}
          onNavigate={onNavigate}
        />
      }
    >

      <WellnessSectionCard
        title={section.title}
        subtitle={section.subtitle}
      >

        <div className="space-y-5">

          {section.questions.map(
            (q) => (

              <ExpandableQuestion
                key={q.id}
                icon={q.icon}
                question={q.question}
                options={q.options}
                selected={answers[q.id]}
                isOpen={
                  openQuestion === q.id
                }
                onOpen={() =>
                  setOpenQuestion(
                    q.id
                  )
                }
                onSelect={(option) =>
                  handleSelect(
                    q.id,
                    option
                  )
                }
              />

            )
          )}

        </div>

        <button
          onClick={() => {
            onComplete?.(
              answers
            );

          }}
          className="w-full mt-10 py-5 rounded-2xl text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-200 hover:scale-[1.01] transition-all"
        >
          Save and Continue
        </button>

      </WellnessSectionCard>

    </AssessmentLayout>

  );

};

export default InflammationAssessment;