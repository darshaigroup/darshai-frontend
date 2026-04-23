import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", patients: 20 },
  { day: "Tue", patients: 35 },
  { day: "Wed", patients: 25 },
  { day: "Thu", patients: 40 },
  { day: "Fri", patients: 30 },
];

const PatientTrendChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-4">Patient Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="patients"
            stroke="#1E7A3A"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientTrendChart;