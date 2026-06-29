import { memo } from "react";
import { HeartPulse } from "lucide-react";
import ChoiceCard from "@/components/onboarding/ChoiceCard";
import MultiChoiceCard from "@/components/onboarding/MultiChoiceCard";
import CounterInput from "@/components/onboarding/CounterInput";
import OtherInput from "@/components/onboarding/OtherInput";

const WellnessIcon = HeartPulse;

function QuestionRenderer({ question, value, onChange, answers }) {
  if (question.visibleFor && !question.visibleFor.includes(answers?.retreat_for)) return null;

  if (question.type === "number" || question.type === "select") {
    return (
      <CounterInput
        label={question.question}
        value={value || 0}
        min={question.min || 0}
        max={question.max || 100}
        onChange={(v) => onChange(question.id, v)}
      />
    );
  }

  if (question.multiple) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#173C68]">{question.question}</h2>

        <MultiChoiceCard
          question={{ ...question, icon: WellnessIcon }}
          value={value || []}
          onChange={(v) => onChange(question.id, v)}
        />

        {question.allowOther &&
          Array.isArray(value) &&
          value.includes("Other") && (
            <OtherInput
              value={answers?.[`${question.id}_other`] || ""}
              onChange={(v) => onChange(`${question.id}_other`, v)}
            />
          )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#173C68]">{question.question}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {question.options?.map((option) => {
          const item = typeof option === "string" ? { label: option } : option;

          return (
            <ChoiceCard
              key={item.label}
              icon={item.icon || WellnessIcon}
              title={item.label}
              description={item.description}
              selected={value === item.label}
              onClick={() => onChange(question.id, item.label)}
            />
          );
        })}
      </div>

      {question.allowOther && value === "Other" && (
        <OtherInput
          value={answers?.[`${question.id}_other`] || ""}
          onChange={(v) => onChange(`${question.id}_other`, v)}
        />
      )}
    </div>
  );
}

export default memo(QuestionRenderer);