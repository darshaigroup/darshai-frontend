import { prakritiSections } from "./prakritiData";
import { useFormState } from "../../hooks/useFormState";
import QuestionCard from "../../components/questionnaire/QuestionCard";
import OptionRadio from "../../components/questionnaire/OptionRadio";
import SectionHeader from "../../components/questionnaire/SectionHeader";
import CloseButton from "../../components/common/CloseButton";

// ✅ Backend Mapping
const DOSHA_MAP = {
  VATA: 0,
  PITTA: 1,
  KAPHA: 2,
};

const Prakriti = ({ onComplete }) => {
  const { answers, updateAnswer } = useFormState();

  // ✅ Convert frontend answers to backend format
  const handleSubmit = () => {
    const formattedAnswers = {};

    Object.keys(answers).forEach((key) => {
      formattedAnswers[key] = DOSHA_MAP[answers[key]];
    });

   

    onComplete?.(formattedAnswers);
  };

  return (
    <div className="space-y-8">
      
      <CloseButton />

      {/* Page Title */}
      <div className="text-center mt-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
          Prakriti Questionnaire
        </h1>
      </div>

      {/* Sections */}
      {prakritiSections.map((section, sIndex) => (
        <div key={sIndex}>

          {/* Section Title */}
          <SectionHeader title={section.title} />

          {/* Questions */}
          {section.questions.map((q) => (
            <QuestionCard key={q.id} question={q.question}>

              {q.options.map((opt, i) => (
                <OptionRadio
                  key={i}
                  name={q.id}
                  value={opt.value}
                  selected={answers[q.id]}
                  onChange={(val) => updateAnswer(q.id, val)}
                  label={opt.label}
                />
              ))}

            </QuestionCard>
          ))}

        </div>
      ))}

      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-teal-700 transition"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Prakriti;