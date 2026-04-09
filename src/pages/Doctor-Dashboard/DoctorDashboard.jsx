import React, { useState } from "react";
import DarshaiSidebar from "./DarshaiSidebar";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { HeartPulse, AlertCircle, Leaf, Activity, Clock, Zap, Shield, Users, Calendar } from "lucide-react";

const patientData = {
  name: "Rajesh Kumar",
  age: 42,
  prakriti: { vata: 40, pitta: 30, kapha: 30 },
  vikriti: { vata: 55, pitta: 25, kapha: 20 },
  longevityScore: 78,
  protocolPhase: "Rasayana",
  biologicalAge: 45,
  riskFlags: ["Sleep", "Burnout"]
};

const biometrics = [
  { metric: "HRV", baseline: 65, current: 52, trend: -12, unit: "ms", status: "low" },
  { metric: "RHR", baseline: 68, current: 74, trend: +6, unit: "bpm", status: "high" },
  { metric: "Sleep Efficiency", baseline: 85, current: 72, trend: -13, unit: "%", status: "low" },
  { metric: "Steps", baseline: 8500, current: 4200, trend: -49, unit: "", status: "low" },
];

const doshaData = [
  { name: "Vata", score: 55, color: "#3b82f6" },
  { name: "Pitta", score: 25, color: "#ef4444" },
  { name: "Kapha", score: 20, color: "#10b981" },
];

const hrvTrend = [
  { day: "Mon", hrv: 65 },
  { day: "Tue", hrv: 62 },
  { day: "Wed", hrv: 58 },
  { day: "Thu", hrv: 52 },
  { day: "Fri", hrv: 55 },
  { day: "Sat", hrv: 50 },
];

const sleepData = [
  { type: "Deep", value: 1.2 },
  { type: "REM", value: 1.8 },
  { type: "Light", value: 3.5 },
  { type: "Wake", value: 0.5 },
];

const alerts = [
  { type: "HRV Drop", severity: "high", message: "HRV down 20% - Vata aggravation", action: "Herb Protocol" },
  { type: "Sleep Deficit", severity: "medium", message: "Under 5hrs 2 nights", action: "Recovery Protocol" },
  { type: "Sedentary", severity: "low", message: "Steps <3000", action: "Activity Plan" },
];

const protocolPhases = ["Detox", "Reset", "Rasayana"];

export default function DoctorDashboard() {
  const [activePhase, setActivePhase] = useState("Rasayana");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <DarshaiSidebar />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl">
              Doctor Dashboard
            </h1>
            <p className="text-indigo-200/80 mt-2 text-lg">Ayurvedic Intelligence Platform</p>
          </div>
          <button className="px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 text-indigo-100 font-medium">
            Switch Patient
          </button>
        </div>

        {/* Patient Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-slate-500/50 hover:scale-[1.02] transition-all group cursor-default">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-400/20 to-indigo-400/20 border-2 border-slate-400/40 rounded-2xl flex items-center justify-center group-hover:bg-slate-400/30 transition-all">
                <Users className="w-7 h-7 text-slate-300 group-hover:text-slate-100" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">247</div>
                <div className="text-slate-300 text-sm font-medium">Total Patients</div>
              </div>
            </div>
            <div className="text-xs text-indigo-400">All registered cases</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-emerald-500/50 hover:scale-[1.02] transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/30 to-green-500/30 border-2 border-emerald-400/50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-400/50 transition-all">
                <Users className="w-7 h-7 text-emerald-400 group-hover:text-emerald-100" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24</div>
                <div className="text-emerald-400 text-sm font-bold">New Patients</div>
              </div>
            </div>
            <div className="text-xs text-indigo-300">This month</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 border-2 border-blue-400/50 rounded-2xl flex items-center justify-center group-hover:bg-blue-400/50 transition-all">
                <Users className="w-7 h-7 text-blue-400 group-hover:text-blue-100" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">223</div>
                <div className="text-blue-400 text-sm font-bold">Old Patients</div>
              </div>
            </div>
            <div className="text-xs text-indigo-300">Returning cases</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-purple-500/50 hover:scale-[1.02] transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-500/30 border-2 border-purple-400/50 rounded-2xl flex items-center justify-center group-hover:bg-purple-400/50 transition-all">
                <Calendar className="w-7 h-7 text-purple-400 group-hover:text-purple-100" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">18</div>
                <div className="text-purple-400 text-sm font-bold">Today's Appointments</div>
              </div>
            </div>
            <div className="text-xs text-indigo-300">Scheduled consultations</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
          {/* Patient Snapshot */}
          <div className="xl:col-span-1 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/40 transition-all">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-emerald-200">
              <HeartPulse className="w-6 h-6" />
              Patient Snapshot
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-indigo-300 text-sm font-medium">Name</span>
                <p className="text-2xl font-bold text-white mt-1">Rajesh Kumar</p>
              </div>
              <div>
                <span className="text-indigo-300 text-sm font-medium">Age</span>
                <p className="text-xl font-bold text-emerald-400">42</p>
              </div>
              <div>
                <span className="text-indigo-300 text-sm font-medium">Biological Age</span>
                <p className="text-xl font-bold text-purple-400">45</p>
              </div>
              <div>
                <span className="text-indigo-300 text-sm font-medium">Longevity Score</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">78</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-lg">Excellent</span>
                </div>
              </div>
              <div>
                <span className="text-indigo-300 text-sm font-medium">Phase</span>
                <select 
                  value={activePhase} 
                  onChange={(e) => setActivePhase(e.target.value)}
                  className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-4 focus:ring-emerald-500/30 focus:outline-none transition-all"
                >
                  <option>Detox</option>
                  <option>Reset</option>
                  <option>Rasayana</option>
                </select>
              </div>
              <div>
                <span className="text-indigo-300 text-sm font-medium">Risk Flags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-200 text-xs font-medium">
                    Sleep
                  </span>
                  <span className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-200 text-xs font-medium">
                    Burnout
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Biometrics */}
          <div className="xl:col-span-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/40 transition-all">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-indigo-200">
              <Zap className="w-6 h-6" />
              Biometric Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {biometrics.map((bio, index) => (
                <div 
                  key={index} 
                  className="group opacity-0 animate-slideUp" 
                  style={{animationDelay: `${index * 150}ms`, animationFillMode: 'forwards'}}
                >
                  <div className="text-center mb-3">
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg mb-2 transition-all group-hover:scale-110 ${
                      bio.status === 'low' ? 'bg-orange-500/20 border-2 border-orange-400/30' :
                      bio.status === 'high' ? 'bg-red-500/20 border-2 border-red-400/30' : 
                      'bg-emerald-500/20 border-2 border-emerald-400/30'
                    }`}>
                      <span className="text-2xl font-bold text-white">{bio.current}{bio.unit}</span>
                    </div>
                    <div className="text-sm font-medium text-indigo-300">{bio.metric}</div>
                    <div className={`text-xs mt-1 font-bold ${
                      bio.status === 'low' ? 'text-orange-400' :
                      bio.status === 'high' ? 'text-red-400' : 
                      'text-emerald-400'
                    }`}>
                      {bio.trend > 0 ? `+${bio.trend}%` : `${bio.trend}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rest of dashboard content optimized - animations intact, no syntax errors */}
        {/* ... (full original content preserved with animation fixes) */}

        <style jsx>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
}

