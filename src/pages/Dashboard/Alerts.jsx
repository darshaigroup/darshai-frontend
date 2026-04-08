import React from "react";
import DarshaiSidebar from "./DarshaiSidebar";
import {
  AlertCircle,
  Zap,
  Clock,
  Shield,
  HeartPulse,
  Leaf,
} from "lucide-react";

const alerts = [
  {
    type: "HRV Critical Drop",
    severity: "high",
    message: "20% decline - Immediate Vata intervention needed",
    dosha: "Vata",
    time: "2 min ago",
    action: "Rasayana Protocol",
  },
  {
    type: "Sleep Deficit Alert",
    severity: "medium",
    message: "3 consecutive nights <5hrs sleep",
    dosha: "Vata-Kapha",
    time: "1 hr ago",
    action: "Recovery Mode",
  },
  {
    type: "Pitta Burnout Risk",
    severity: "high",
    message: "RHR elevated + stress index 78%",
    dosha: "Pitta",
    time: "45 min ago",
    action: "Cooling Herbs",
  },
  {
    type: "Sedentary Pattern",
    severity: "low",
    message: "Steps <2000 for 48hrs",
    dosha: "Kapha",
    time: "Today",
    action: "Movement Plan",
  },
  {
    type: "Protocol Completion",
    severity: "positive",
    message: "Shirodhara cycle completed",
    dosha: "All",
    time: "Just now",
    action: "Assessment",
  },
];

const severityColors = {
  high: "from-red-500 to-rose-500",
  medium: "from-orange-500 to-amber-500",
  low: "from-yellow-500 to-orange-500",
  positive: "from-emerald-500 to-teal-500",
};

export default function Alerts() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <DarshaiSidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent drop-shadow-2xl">
              Smart Alerts Engine
            </h1>
            <p className="text-indigo-200/80 mt-2 text-lg">Real-time Ayurvedic Risk Detection</p>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-6 rounded-3xl border-l-8 shadow-2xl hover:shadow-orange-500/40 hover:-translate-x-2 transition-all backdrop-blur-xl ${alert.severity === 'high' ? 'bg-red-500/10 border-red-400/50' : alert.severity === 'medium' ? 'bg-orange-500/10 border-orange-400/50' : alert.severity === 'low' ? 'bg-yellow-500/10 border-yellow-400/50' : 'bg-emerald-500/10 border-emerald-400/50'}`}>
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl shadow-xl flex-shrink-0 ${severityColors[alert.severity]} text-white`}>
                  <AlertCircle size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{alert.type}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${alert.severity === 'high' ? 'bg-red-500/30 text-red-200' : alert.severity === 'medium' ? 'bg-orange-500/30 text-orange-200' : alert.severity === 'low' ? 'bg-yellow-500/30 text-yellow-200' : 'bg-emerald-500/30 text-emerald-200'}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-indigo-200 text-lg mb-4">{alert.message}</p>
                  <div className="flex items-center gap-6 text-sm mb-4">
                    <div className="flex items-center gap-2 text-indigo-300">
                      <Leaf size={18} />
                      <span>{alert.dosha}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Clock size={18} />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all flex-1 text-center">
                      {alert.action}
                    </button>
                    <button className="px-6 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-red-400 mb-2">2</div>
            <div className="text-indigo-300">High Priority</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
            <Zap className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-orange-400 mb-2">3</div>
            <div className="text-indigo-300">Active Alerts</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
            <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-emerald-400 mb-2">95%</div>
            <div className="text-indigo-300">Response Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
