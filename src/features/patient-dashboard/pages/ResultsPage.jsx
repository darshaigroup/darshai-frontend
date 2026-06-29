import ResultView from "../sections/ResultView";

export default function ResultsPage({
  activePatient,
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      <ResultView activePatient={activePatient} />
    </div>
  );
}