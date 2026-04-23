import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Cardio", value: 40 },
  { name: "Diabetes", value: 25 },
  { name: "Ortho", value: 20 },
  { name: "Others", value: 15 },
];

const COLORS = ["#1E7A3A", "#3B82F6", "#F59E0B", "#EF4444"];

const DiseasePieChart = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-4">Disease Distribution</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiseasePieChart;