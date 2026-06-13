import ChoiceCard from "@/components/onboarding/ChoiceCard";
import MultiChoiceCard from "@/components/onboarding/MultiChoiceCard";
import CounterInput from "@/components/onboarding/CounterInput";
import OtherInput from "@/components/onboarding/OtherInput";

export default function QuestionRenderer({
  question,
  value,
  onChange,
  answers,
}) {

  if (
    question.visibleFor &&
    !question.visibleFor.includes(
      answers?.retreat_for
    )
  ) {
    return null;
  }

  if (
    question.type === "number" ||
    question.id === "room_count"
  ) {
    return (
      <CounterInput
        label={question.question}
        value={value || 0}
        min={question.min || 0}
        max={question.max || 100}
        onChange={(v) =>
          onChange(
            question.id,
            v
          )
        }
      />
    );
  }

  if (question.multiple) {
    return (
      <MultiChoiceCard
        question={question}
        value={value || []}
        onChange={(v) =>
          onChange(
            question.id,
            v
          )
        }
      />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#173C68] mb-8">
        {question.question}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {question.options?.map(
          (option) => (
            <ChoiceCard
              key={option}
              title={option}
              selected={value === option}
              onClick={() =>
                onChange(
                  question.id,
                  option
                )
              }
            />
          )
        )}
      </div>

      {question.allowOther &&
        value === "Other" && (
          <div className="mt-6">
            <OtherInput
              value=""
              onChange={(v) =>
                onChange(
                  `${question.id}_other`,
                  v
                )
              }
            />
          </div>
        )}
    </div>
  );
}