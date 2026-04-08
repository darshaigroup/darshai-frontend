import React, { useState } from "react";
import { motion } from "framer-motion";
import DarshaiSidebar from "./DarshaiSidebar";
import { 
  FileText, 
  Download, 
  Calendar, 
  Activity, 
  BarChart3, 
  PieChart, 
  LineChart as ChartLineIcon, 
  Share2,
  Eye 
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const reportsData = [
  {
    id: 1,
    title: "Patient Longevity Analysis",
    date: "Mar 15, 2024",
    type: "Comprehensive",
    pages: 12,
    previewType: "line",
    patients: 28,
    status: "Ready",
    gradient: "from-emerald-400 to-teal-500",
    data: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 75 },
      { month: "Mar", score: 78 }
    ]
  },
  {
    id: 2,
    title: "Dosha Population Study",
    date: "Mar 10, 2024",
    type: "Research",
    pages: 8,
    previewType: "pie",
    patients: 156,
    status: "Ready",
    gradient: "from-purple-400 to-indigo-500",
    data: [
      { name: "Vata", value: 45 },
      { name: "Pitta", value: 30 },
      { name: "Kapha", value: 25 }
    ]
  },
  {
    id: 3,
    title: "Protocol Effectiveness",
    date: "Mar 12, 2024",
    type: "Performance",
    pages: 15,
    previewType: "bar",
    patients: 89,
    status: "Generating",
    gradient: "from-orange-400 to-red-500",
    data: [
      { protocol: "Panchakarma", effectiveness: 92 },
      { protocol: "Rasayana", effectiveness: 87 },
      { protocol: "Yoga", effectiveness: 79 }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState("recent");

  const renderPreview = (report) => {
    switch (report.previewType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={report.data}>
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={false} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={100}>
            <RePieChart>
              <Pie data={report.data} dataKey="value" cx="50%" cy="50%" outerRadius={35} >
                {report.data.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? '#3b82f6' : index === 1 ? '#ef4444' : '#10b981'} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={report.data}>
              <Bar dataKey="effectiveness" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <XAxis dataKey="protocol" axisLine={false} tickLine={false} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-indigo-900/30">
      <DarshaiSidebar />
      <div className="flex-1 p-8 pt-24">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl mb-6">
            Analytics & Reports
          </h1>
          <p className="text-xl text-indigo-200/90 max-w-2xl leading-relaxed">
            Transform data into Ayurvedic insights. Generate, preview, and share comprehensive reports.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-1 max-w-md mx-auto">
            {["recent", "generate", "templates"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/50"
                    : "text-indigo-300 hover:text-white"
                }`}
              >
                {tab === "recent" ? "Recent" : tab === "generate" ? "Generate" : "Templates"}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8"
        >
          {reportsData.map((report, index) => (
            <motion.div
              key={report.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/40 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden relative"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-indigo-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </span>
                    <span>{report.type} • {report.pages} pages</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${report.gradient} text-white shadow-lg flex-shrink-0`}>
                  {report.status}
                </div>
              </div>

              {/* Chart Preview */}
              <div className="h-32 bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                {renderPreview(report)}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-400">{report.patients}</div>
                  <div className="text-xs text-indigo-400 uppercase tracking-wider">Patients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{report.type}</div>
                  <div className="text-xs text-indigo-400 uppercase tracking-wider">Category</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">{report.pages}</div>
                  <div className="text-xs text-indigo-400 uppercase tracking-wider">Pages</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-white/10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl py-4 px-6 font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/20 backdrop-blur border border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white/20 backdrop-blur border border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all flex items-center justify-center"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

