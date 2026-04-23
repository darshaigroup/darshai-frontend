import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", appointments: 40 },
  { name: "Week 2", appointments: 55 },
  { name: "Week 3", appointments: 30 },
  { name: "Week 4", appointments: 70 },
];

const AppointmentBarChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-4">Weekly Appointments</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="appointments" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentBarChart;