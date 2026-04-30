import Greeting from "../components/overview/Greeting";
import StatCard from "../components/overview/StatCard";
import PatientOverviewChart from "../components/overview/PatientOverviewChart";
import PatientTable from "../components/overview/PatientPreviewTable";

import {
  FaUserInjured,
  FaUserPlus,
  FaUserCheck,
  FaCalendarCheck,
} from "react-icons/fa";

const Overview = () => {
  return (
    <div className="space-y-8">

      {/* Greeting */}
      <Greeting />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value="1450" icon={<FaUserInjured />} change={0.39} color="text-blue-500" />
        <StatCard title="New Patients" value="63" icon={<FaUserPlus />} change={0.62} color="text-purple-500" />
        <StatCard title="Old Patients" value="313" icon={<FaUserCheck />} change={-0.12} color="text-green-500" />
        <StatCard title="Appointments" value="1971" icon={<FaCalendarCheck />} change={2} color="text-orange-500" />
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientTable />
        </div>

        <PatientOverviewChart />
      </div>

    </div>
  );
};

export default Overview;