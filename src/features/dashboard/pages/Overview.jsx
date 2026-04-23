import Greeting from "../components/overview/Greeting";
import StatCard from "../components/overview/StatCard";
import PatientTable from "../components/overview/PatientPreviewTable";
import ScheduleList from "../components/overview/ScheduleList";
import PatientChart from "../components/patients/PatientChart";

import {
  FaUserInjured,
  FaCalendarCheck,
  FaNotesMedical,
} from "react-icons/fa";

const Overview = () => {
  return (
    <div className="space-y-6">
      <Greeting />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Patients"
          value="120"
          icon={<FaUserInjured />}
          color="bg-gradient-to-r from-green-500 to-green-700"
        />

        <StatCard
          title="Appointments"
          value="45"
          icon={<FaCalendarCheck />}
          color="bg-gradient-to-r from-blue-500 to-blue-700"
        />

        <StatCard
          title="Reports"
          value="30"
          icon={<FaNotesMedical />}
          color="bg-gradient-to-r from-purple-500 to-purple-700"
        />
      </div>

      {/* Chart + Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PatientChart />
        <ScheduleList />
      </div>

      {/* Table */}
      <PatientTable />
    </div>
  );
};

export default Overview;