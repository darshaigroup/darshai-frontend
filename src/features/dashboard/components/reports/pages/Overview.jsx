import Greeting from "../../overview/Greeting";
import PatientStats from "../../overview/PatientStats";
import PatientTable from "../../overview/PatientPreviewTable";

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