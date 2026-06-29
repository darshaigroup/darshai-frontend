import Greeting from "../components/overview/Greeting";
import PatientStats from "../components/overview/PatientStats";
import PatientTable from "../components/overview/PatientPreviewTable";

const Overview = () => {
  return (
    <div className="space-y-8">
      <Greeting />

      <PatientStats />

      <PatientTable />
    </div>
  );
};

export default Overview;