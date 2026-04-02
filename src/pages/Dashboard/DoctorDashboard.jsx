import React from "react";
import Sidebar from "./Sidebar";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function DoctorDashboard() {
  const patient = {
    name: "John Doe",
    age: 32,
    risk: "High",
  };

  const scoreData = [
    { name: "Burnout", value: 78 },
    { name: "Metabolic", value: 65 },
    { name: "Cardio", value: 70 },
    { name: "Digestive", value: 60 },
  ];

  const trendData = [
    { day: "Mon", stress: 70 },
    { day: "Tue", stress: 65 },
    { day: "Wed", stress: 80 },
    { day: "Thu", stress: 75 },
    { day: "Fri", stress: 78 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="mb-3 font-semibold">Stress Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <Line type="monotone" dataKey="stress" stroke="#3b82f6" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="mb-3 font-semibold">Health Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={scoreData} dataKey="value" outerRadius={90}>
                  {scoreData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Card */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Patient Overview</h2>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p className="text-red-500">Risk: {patient.risk}</p>
        </div>

      </div>
    </div>
  );
}