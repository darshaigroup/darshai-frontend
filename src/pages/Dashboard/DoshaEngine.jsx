import React, { useState } from "react";
import DarshaiSidebar from "./DarshaiSidebar";
import {
  Leaf,
  Shield,
  HeartPulse,
  Zap,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const doshaData = [
  { name: "Vata", prakriti: 40, vikriti: 55, fill: "#3b82f6" },
  { name: "Pitta", prakriti: 30, vikriti: 25, fill: "#ef4444" },
  { name: "Kapha", prakriti: 30, vikriti: 20, fill: "#10b981" },
];

const patientProfiles = [
  {
    name: "Rajesh Kumar",
    prakriti: { vata: 40, pitta: 30, kapha: 30 },
    vikriti: { vata: 55, pitta: 25, kapha: 20 },
    imbalance: "Vata aggravation +12%",
    recommendation: "Rasayana herbs + Abhyanga",
  },
  {
    name: "Priya Sharma",
    prakriti: { vata: 25, pitta: 20, kapha: 55 },
    vikriti: { vata: 28, pitta: 22, kapha: 50 },
    imbalance: "Kapha stable",
    recommendation: "Maintenance protocol",
  },
];

export default function DoshaEngine() {
  const [activeTab, setActiveTab] = useState("analysis");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-green-900/30 to-emerald-900/50">
      <DarshaiSidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
              Dosha Intelligence Engine
            </h1>
            <p className="text-indigo-200/80 mt-2 text-lg">Prakriti-Vikriti Analysis AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Main Dosha Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/40">
            <h3 className="text-2xl font-bold text-emerald-200 mb-8 flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              Vikriti Analysis (Current)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadialBarChart data={doshaData} innerRadius="20%" outerRadius="80%">
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="vikriti"
                  cornerRadius={50}
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
              {doshaData.map((dosha, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: dosha.fill + '30', border: `2px solid ${dosha.fill}40` }}>
                    <span className="text-2xl font-bold" style={{ color: dosha.fill }}>{dosha.vikriti}%</span>
                  </div>
                  <div className="font-bold text-white">{dosha.name}</div>
                  <div className={`text-sm ${dosha.vikriti > dosha.prakriti ? 'text-orange-400' : 'text-emerald-400'}`}>
                    {dosha.vikriti > dosha.prakriti ? '+15%' : 'Stable'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prakriti Comparison */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-purple-200 mb-6">Prakriti Baseline</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={doshaData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="prakriti"
                  cornerRadius={10}
                >
                  {doshaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Analysis */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-emerald-200 flex-1">Patient Dosha Profiles</h3>
            <div className="flex gap-2">
              {['analysis', 'recommendations', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === tab ? 'bg-emerald-500/30 text-emerald-200 shadow-emerald-500/50' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
{patientProfiles.map((profile, index) => (
              <div 
                key={index} 
                className="opacity-0 animate-slideUp bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-3xl p-8 hover:shadow-emerald-500/40 transition-all"
                style={{animationDelay: `${index * 250}ms`}}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
                    <span className="text-2xl font-bold text-white">RK</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-1">{profile.name}</h4>
                    <div className="flex gap-4 text-sm text-indigo-300">
                      <span>Imbalance: <span className="font-bold text-orange-400">{profile.imbalance}</span></span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-white/10 rounded-2xl">
                    <div className="text-emerald-400 text-xl font-bold mb-1">Vata</div>
                    <div className="text-3xl font-bold text-white">55%</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-2xl">
                    <div className="text-red-400 text-xl font-bold mb-1">Pitta</div>
                    <div className="text-3xl font-bold text-white">25%</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-2xl">
                    <div className="text-emerald-500 text-xl font-bold mb-1">Kapha</div>
                    <div className="text-3xl font-bold text-white">20%</div>
                  </div>
                </div>
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all">
                    {profile.recommendation}
                  </button>
                  <button className="px-6 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all">
                    Full Analysis →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
