import FlowCard from "../components/questionnaire/FlowCard";

const FlowIntro = ({
  onComplete,
}) => {

  return (

    <FlowCard
      title="Welcome"
      description="
        Before your consultation,
        complete your wellness
        assessment for a more
        personalized Ayurvedic journey.
      "
      onNext={() =>
        onComplete?.()
      }
    />

  );
};

export default FlowIntro;