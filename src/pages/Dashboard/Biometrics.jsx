import React, { useState } from "react";
import DarshaiSidebar from "./DarshaiSidebar";
import {
  HeartPulse,
  Activity,
  Zap,
  Clock,
  Shield,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

// Biometrics data from DoctorDashboard + more
const biometricsData = [
  { name: "HRV", current: 52, trend: -12, unit: "ms", status: "low" },
  { name: "RHR", current: 74, trend: +6, unit: "bpm", status: "high" },
  { name: "Sleep Eff.", current: 72, trend: -13, unit: "%", status: "low" },
  { name: "Steps", current: 4200, trend: -49, unit: "", status: "low" },
  { name: "Resp. Rate", current: 16, trend: 0, unit: "bpm", status: "normal" },
  { name: "Stress", current: 42, trend: +8, unit: "%", status: "medium" },
];

const hrvHistory = [
  { day: "Mon", hrv: 65 },
  { day: "Tue", hrv: 62 },
  { day: "Wed", hrv: 58 },
  { day: "Thu", hrv: 52 },
  { day: "Fri", hrv: 55 },
  { day: "Sat", hrv: 50 },
  { day: "Sun", hrv: 54 },
];

const sleepHistory = [
  { day: "Mon", sleep: 6.2 },
  { day: "Tue", sleep: 5.8 },
  { day: "Wed", sleep: 4.9 },
  { day: "Thu", sleep: 7.1 },
  { day: "Fri", sleep: 6.5 },
  { day: "Sat", sleep: 5.2 },
  { day: "Sun", sleep: 6.8 },
];

export default function Biometrics() {
  const [activePatient] = useState("Rajesh Kumar");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <DarshaiSidebar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl">
              Biometrics Intelligence
            </h1>
            <p className="text-indigo-200/80 mt-2 text-lg">Live Ayurvedic Vital Signs - {activePatient}</p>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {biometricsData.map((metric, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/40 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${metric.status === 'low' ? 'bg-orange-500/20' : metric.status === 'high' ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                  <HeartPulse className="w-8 h-8 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{metric.name}</h3>
                  <p className="text-indigo-400 text-sm uppercase tracking-wide">Live</p>
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{metric.current}<span className="text-xl text-indigo-300">{metric.unit}</span></div>
              <div className={`text-sm font-bold px-4 py-2 rounded-xl ${metric.trend < 0 ? 'text-orange-400 bg-orange-500/10' : 'text-emerald-400 bg-emerald-500/10'}`}>
                {metric.trend > 0 ? `+${metric.trend}` : metric.trend}% 24h
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* HRV Trend */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-indigo-200 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8" />
              HRV Trend (7 days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hrvHistory}>
                <Line type="monotone" dataKey="hrv" stroke="#3b82f6" strokeWidth={4} dot={{ fill: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sleep Pattern */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-emerald-200 mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8" />
              Sleep Pattern
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sleepHistory}>
                <Area type="monotone" dataKey="sleep" stroke="#10b981" fill="url(#sleepGradient)" strokeWidth={3} />
                <defs>
                  <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-orange-200 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8" />
              Vata Aggravation Risk
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={[{ risks: ['HRV Low', 'Sleep Low', 'Sedentary'] }]}>
                <Bar dataKey="risks" fill="#f59e0b" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-emerald-200 mb-6">
              Longevity Impact Score
            </h3>
            <div className="text-6xl font-bold text-emerald-400 text-center mb-4">78</div>
            <div className="space-y-3 text-center">
              <div className="flex justify-between text-sm text-indigo-300">
                <span>Baseline</span>
                <span className="font-bold text-emerald-400">+12%</span>
              </div>
              <div className="w-full bg-white/10 rounded-xl h-3">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-xl" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
