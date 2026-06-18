import { useEffect, useState } from "react";
import {
  FaUserInjured,
  FaMale,
  FaFemale,
  FaCalendarCheck,
} from "react-icons/fa";

import StatCard from "./StatCard";
import { getPatients } from "../../Services/patientService";

const PatientStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const patients = await getPatients();

      const total = patients.length;

      const male = patients.filter(
        p => p.gender?.toLowerCase() === "male"
      ).length;

      const female = patients.filter(
        p => p.gender?.toLowerCase() === "female"
      ).length;

      setStats({
        total,
        male,
        female,
        active: total,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

      <StatCard
        title="Total Patients"
        value={stats?.total}
        icon={<FaUserInjured />}
        color="text-blue-500"
      />

      <StatCard
        title="Male"
        value={stats?.male}
        icon={<FaMale />}
        color="text-green-500"
      />

      <StatCard
        title="Female"
        value={stats?.female}
        icon={<FaFemale />}
        color="text-purple-500"
      />

      <StatCard
        title="Active"
        value={stats?.active}
        icon={<FaCalendarCheck />}
        color="text-orange-500"
      />

    </div>
  );
};

export default PatientStats;