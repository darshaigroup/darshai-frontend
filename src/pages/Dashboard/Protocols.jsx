import React from "react";
import { NavLink } from "react-router-dom";
import DarshaiSidebar from "./DarshaiSidebar";
import {
  FileText,
  Shield,
  Leaf,
  HeartPulse,
  Clock,
  Zap,
  Activity,
  AlertCircle,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  RadialBarChart,
  RadialBar,
} from "recharts";

// Sample protocol data with progress and animations
const protocols = [
  {
    id: 1,
    title: "Vata Balancing Protocol",
    description: "Daily routine for Vata aggravation with Abhyanga & Rasayana herbs",
    phase: "Week 3/8",
    progress: 38,
    compliance: 92,
    icon: Leaf,
    color: "from-blue-400 to-indigo-500",
    trendData: [
      { day: "1", score: 65 },
      { day: "2", score: 68 },
      { day: "3", score: 72 },
      { day: "4", score: 75 },
      { day: "5", score: 78 },
    ],
    status: "Active",
    statusColor: "emerald",
  },
  {
    id: 2,
    title: "Pitta Detox Protocol",
    description: "Cooling therapies + Pitta-pacifying diet plan",
    phase: "Week 1/6",
    progress: 15,
    compliance: 88,
    icon: Shield,
    color: "from-orange-400 to-red-500",
    trendData: [
      { day: "1", score: 70 },
      { day: "2", score: 67 },
      { day: "3", score: 64 },
    ],
    status: "New",
    statusColor: "amber",
  },
  {
    id: 3,
    title: "Kapha Reduction",
    description: "Metabolic activation with dry brushing & spices",
    phase: "Complete",
    progress: 100,
    compliance: 95,
    icon: Zap,
    color: "from-emerald-400 to-teal-500",
    trendData: [
      { day: "1", score: 55 },
      { day: "2", score: 62 },
      { day: "3", score: 68 },
      { day: "4", score: 74 },
      { day: "5", score: 80 },
      { day: "6", score: 85 },
    ],
    status: "Success",
    statusColor: "green",
  },
  {
    id: 4,
    title: "Rasayana Rejuvenation",
    description: "Advanced longevity protocol post-detox",
    phase: "Week 2/12",
    progress: 22,
    compliance: 78,
    icon: HeartPulse,
    color: "from-purple-400 to-pink-500",
    trendData: [
      { day: "1", score: 72 },
      { day: "2", score: 75 },
      { day: "3", score: 73 },
    ],
    status: "Monitoring",
    statusColor: "purple",
  },
];

const statusColors = {
  emerald: "from-emerald-400 to-teal-400",
  amber: "from-amber-400 to-orange-400",
  green: "from-green-400 to-emerald-500",
  purple: "from-violet-400 to-purple-500",
};

export default function Protocols() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Sidebar */}
      <DarshaiSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl">
              Treatment Protocols
            </h1>
            <p className="text-indigo-200/80 mt-2 text-lg">Ayurvedic Protocol Intelligence (12 Active)</p>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-3xl font-bold text-white shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300">
            <FileText size={24} />
            New Protocol
          </button>
        </div>

        {/* Filters & Stats */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl hover:shadow-emerald-500/30 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Protocol Overview</h3>
              <p className="text-indigo-300">Manage personalized Ayurvedic treatment plans</p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400">12</div>
                <div className="text-indigo-300 text-sm mt-1">Active</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">4</div>
                <div className="text-indigo-300 text-sm mt-1">Pending</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">8</div>
                <div className="text-indigo-300 text-sm mt-1">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Protocols Grid - Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {protocols.map((protocol, index) => {
            const Icon = protocol.icon;
            return (
              <div
                key={protocol.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-3 transition-all duration-500 hover:bg-white/10 cursor-pointer opacity-0 animate-slideUp" 
                style={{animationDelay: `${index * 150}ms`}}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${protocol.color} text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <span className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wide shadow-lg ${
                    protocol.statusColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                    protocol.statusColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-400/30' :
                    protocol.statusColor === 'green' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                    'bg-purple-500/20 text-purple-300 border-purple-400/30'
                  } border`}>
                    {protocol.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                  {protocol.title}
                </h3>
                <p className="text-indigo-300 mb-8 leading-relaxed">{protocol.description}</p>

                {/* Progress & Compliance */}
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-indigo-300 font-medium">Progress</span>
                      <span className="text-emerald-400 font-bold">{protocol.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-2xl h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-2xl shadow-lg animate-pulse transition-all duration-700 group-hover:from-emerald-500 group-hover:to-teal-600"
                        style={{ width: `${protocol.progress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-indigo-300 font-medium">Compliance</span>
                      <span className="text-emerald-400 font-bold">{protocol.compliance}%</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-emerald-500/20">
                      <RadialBarChart width={60} height={60} data={[{value: protocol.compliance}]} innerRadius="40%" outerRadius="80%">
                        <RadialBar dataKey="value" fill="#10b981" cornerRadius={10} background />
                      </RadialBarChart>
                      <div>
                        <div className="text-2xl font-bold text-white">{protocol.phase}</div>
                        <div className="text-emerald-400 text-sm font-medium">On Track</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trend Chart */}
                <div className="h-24 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={protocol.trendData}>
                      <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={false} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-white/10">
                  <NavLink
                    to={`/protocol/${protocol.id}`}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 text-center"
                  >
                    View Details
                  </NavLink>
                  <button className="p-4 bg-white/20 hover:bg-white/30 rounded-2xl text-white transition-all duration-300 hover:scale-110">
                    <Activity size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .animate-once {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}

