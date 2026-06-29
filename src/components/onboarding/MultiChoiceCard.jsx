import ChoiceCard from "@/components/onboarding/ChoiceCard";

export default function MultiChoiceCard({ question, value = [], onChange }) {
  const toggleOption = (label) => {
    onChange(
      value.includes(label)
        ? value.filter((item) => item !== label)
        : [...value, label]
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {question.options?.map((option) => {
        const item =
          typeof option === "string"
            ? { label: option, icon: question.icon }
            : {
                ...option,
                icon: option.icon || question.icon,
              };

        return (
          <ChoiceCard
            key={item.label}
            icon={item.icon}
            title={item.label}
            description={item.description}
            selected={value.includes(item.label)}
            onClick={() => toggleOption(item.label)}
          />
        );
      })}
    </div>
  );
}