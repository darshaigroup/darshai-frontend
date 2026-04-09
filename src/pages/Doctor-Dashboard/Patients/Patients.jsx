import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarshaiSidebar from "../../Dashboard/DarshaiSidebar";
import AddPatient from "../../../components/patients/AddPatient";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Eye,
  MessageCircle,
  Calendar,
  AlertCircle,
  HeartPulse,
  Shield,
  TrendingUp,
  Award,
  Leaf
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from "recharts";

const patients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    age: 42,
    photo: "doctor.jpg",
    avatarColor: "from-emerald-400 to-teal-500",
    longevityScore: 78,
    doshaScores: { vata: 45, pitta: 35, kapha: 20 },
    dominantDosha: "Vata-Pitta",
    doshaColor: "from-blue-400 to-indigo-500",
    riskLevel: "medium",
    lastVisit: "2 days ago",
    hrvTrend: [
      { day: "D-5", hrv: 65 },
      { day: "D-4", hrv: 62 },
      { day: "D-3", hrv: 58 },
      { day: "D-2", hrv: 52 },
      { day: "D-1", hrv: 55 },
    ],
    sleepAvg: 6.8,
    rhr: 72,
    protocol: "Rasayana Phase 2",
    status: "Active",
    riskColor: "orange",
    progress: 68
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 35,
    photo: "wellness.png",
    avatarColor: "from-green-400 to-emerald-500",
    longevityScore: 85,
    doshaScores: { vata: 15, pitta: 25, kapha: 60 },
    dominantDosha: "Kapha",
    doshaColor: "from-emerald-400 to-teal-500",
    riskLevel: "low",
    lastVisit: "5 days ago",
    hrvTrend: [
      { day: "D-5", hrv: 72 },
      { day: "D-4", hrv: 75 },
      { day: "D-3", hrv: 78 },
      { day: "D-2", hrv: 76 },
      { day: "D-1", hrv: 80 },
    ],
    sleepAvg: 7.2,
    rhr: 65,
    protocol: "Maintenance",
    status: "Stable",
    riskColor: "green",
    progress: 92
  },
  {
    id: 3,
    name: "Amit Patel",
    age: 48,
    photo: "herb.png",
    avatarColor: "from-red-400 to-orange-500",
    longevityScore: 72,
    doshaScores: { vata: 25, pitta: 55, kapha: 20 },
    dominantDosha: "Pitta",
    doshaColor: "from-orange-400 to-red-500",
    riskLevel: "high",
    lastVisit: "1 day ago",
    hrvTrend: [
      { day: "D-5", hrv: 58 },
      { day: "D-4", hrv: 55 },
      { day: "D-3", hrv: 52 },
      { day: "D-2", hrv: 48 },
      { day: "D-1", hrv: 50 },
    ],
    sleepAvg: 5.2,
    rhr: 78,
    protocol: "Panchakarma Detox",
    status: "Critical",
    riskColor: "red",
    progress: 45
  },
  {
    id: 4,
    name: "Neha Gupta",
    age: 38,
    photo: "doctor1.png",
    avatarColor: "from-purple-400 to-violet-500",
    longevityScore: 81,
    doshaScores: { vata: 35, pitta: 30, kapha: 35 },
    dominantDosha: "Tridoshic",
    doshaColor: "from-indigo-400 to-purple-500",
    riskLevel: "low",
    lastVisit: "3 days ago",
    hrvTrend: [
      { day: "D-5", hrv: 70 },
      { day: "D-4", hrv: 68 },
      { day: "D-3", hrv: 71 },
      { day: "D-2", hrv: 69 },
      { day: "D-1", hrv: 73 },
    ],
    sleepAvg: 7.8,
    rhr: 68,
    protocol: "Yoga Therapy",
    status: "Improving",
    riskColor: "blue",
    progress: 76
  }
];

const riskBadges = {
  low: { color: "emerald", label: "Low Risk" },
  medium: { color: "amber", label: "Medium" },
  high: { color: "red", label: "High Risk" }
};

const doshaConfig = [
  { name: "Vata", color: "from-blue-400 to-indigo-500", fill: "#3b82f6" },
  { name: "Pitta", color: "from-orange-400 to-red-500", fill: "#ef4444" },
  { name: "Kapha", color: "from-emerald-400 to-teal-500", fill: "#10b981" }
];

function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [recalculateOpen, setRecalculateOpen] = useState(false);
  const [tempDoshaScores, setTempDoshaScores] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [patientList, setPatientList] = useState(patients);
  const navigate = useNavigate();

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === "all" || patient.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-teal-900/30 relative">
      <DarshaiSidebar />
      <div className="flex-1 p-8 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
                Patient Portal
              </h1>
              <p className="text-xl text-indigo-200/90 mt-2">Ayurvedic Intelligence Dashboard</p>
            </div>
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl font-bold text-white"
            >
              <Plus className="w-6 h-6" />
              Add Patient
            </motion.button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patients..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-3xl text-white placeholder-indigo-400 focus:ring-4 focus:ring-emerald-500/30 focus:outline-none transition-all text-lg"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-3xl hover:bg-white/20 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filter: {filterRisk}
              <svg className={`w-4 h-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>

          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="flex gap-3">
                {['all', 'low', 'medium', 'high'].map((risk) => (
                  <motion.button
                    key={risk}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFilterRisk(risk);
                      setFiltersOpen(false);
                    }}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all ${filterRisk === risk
                        ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                        : 'bg-white/10 text-indigo-300 hover:bg-white/20 border border-white/20'
                      }`}
                  >
                    {risk === 'all' ? 'All' : risk.charAt(0).toUpperCase() + risk.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Patients Grid */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/50 hover:border-emerald-400/50 transition-all duration-500 cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedPatient(patient)}
            >
              {/* Gradient Badge */}
              <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${patient.doshaColor} text-white shadow-lg`}>
                {patient.dominantDosha}
              </div>

              {/* Avatar */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl text-2xl font-bold text-white ${patient.avatarColor} group-hover:scale-110 transition-transform duration-300`}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-2 ml-auto">
                  <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 transition-all">
                    <MessageCircle size={18} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 transition-all">
                    <Calendar size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Name & Status */}
              <h3 className="text-2xl font-bold text-white mb-2">{patient.name}</h3>
              <div className="flex items-center gap-4 mb-6 text-sm text-indigo-300">
                <span>{patient.age} yrs • {patient.lastVisit}</span>
              </div>

              {/* Dosha Scores */}
              <div className="mb-6 pt-6 border-t border-white/10">
                <div className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Dosha Scores
                </div>
                <div className="space-y-3">
                  {doshaConfig.map(({ name, color, fill }, idx) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-indigo-300 font-medium capitalize">{name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all`}
                            style={{
                              width: `${selectedPatient ? selectedPatient.doshaScores[name.toLowerCase()] || 0 : patient.doshaScores[name.toLowerCase()]}%`,
                              background: fill
                            }}
                          />
                        </div>
                        <span className="text-white font-bold text-sm">
                          {selectedPatient ? selectedPatient.doshaScores[name.toLowerCase()] || 0 : patient.doshaScores[name.toLowerCase()]}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Longevity */}
                <div className="group-hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold text-2xl">{patient.longevityScore}</div>
                      <div className="text-xs text-indigo-400 uppercase tracking-wider">Longevity Score</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all" style={{ width: `${patient.progress}%` }} />
                  </div>
                </div>

                {/* Risk */}
                <div>
                  <div className={`px-4 py-2 rounded-2xl inline-flex items-center gap-2 text-sm font-bold text-white shadow-lg ${patient.riskColor === 'green' ? 'bg-emerald-500/90' : patient.riskColor === 'orange' ? 'bg-orange-500/90' : 'bg-red-500/90'}`}>
                    <AlertCircle size={16} />
                    {riskBadges[patient.riskLevel]?.label || patient.riskLevel}
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2 gap-6 mb-8 h-32">
                {/* HRV Trend */}
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <div className="text-xs text-indigo-400 uppercase tracking-wider mb-2">HRV Trend</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patient.hrvTrend}>
                      <Line type="monotone" dataKey="hrv" stroke="#10b981" strokeWidth={3} dot={false} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Sleep/RHR */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <HeartPulse className="w-5 h-5 text-red-400" />
                    <span className="font-bold text-white">RHR: <span className="text-emerald-400">{patient.rhr} bpm</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-white">Sleep: <span className="text-emerald-400">{patient.sleepAvg}h avg</span></span>
                  </div>
                </div>
              </div>

              {/* Protocol & CTA */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-sm text-indigo-400 mb-4">{patient.protocol}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-4 px-8 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Eye className="w-5 h-5" />
                  View Full Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Patients Grid */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/50 hover:border-emerald-400/50 transition-all duration-500 cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedPatient(patient)}
            >
              {/* Gradient Badge */}
              <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${patient.doshaColor} text-white shadow-lg`}>
                {patient.dominantDosha}
              </div>

              {/* Avatar */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl text-2xl font-bold text-white ${patient.avatarColor} group-hover:scale-110 transition-transform duration-300`}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-2 ml-auto">
                  <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 transition-all">
                    <MessageCircle size={18} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 transition-all">
                    <Calendar size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Name & Status */}
              <h3 className="text-2xl font-bold text-white mb-2">{patient.name}</h3>
              <div className="flex items-center gap-4 mb-6 text-sm text-indigo-300">
                <span>{patient.age} yrs • {patient.lastVisit}</span>
              </div>

              {/* Dosha Scores */}
              <div className="mb-6 pt-6 border-t border-white/10">
                <div className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Dosha Scores
                </div>
                <div className="space-y-3">
                  {doshaConfig.map(({ name, color, fill }, idx) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-indigo-300 font-medium capitalize">{name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all`}
                            style={{
                              width: `${selectedPatient ? selectedPatient.doshaScores[name.toLowerCase()] || 0 : patient.doshaScores[name.toLowerCase()]}%`,
                              background: fill
                            }}
                          />
                        </div>
                        <span className="text-white font-bold text-sm">
                          {selectedPatient ? selectedPatient.doshaScores[name.toLowerCase()] || 0 : patient.doshaScores[name.toLowerCase()]}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Longevity */}
                <div className="group-hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold text-2xl">{patient.longevityScore}</div>
                      <div className="text-xs text-indigo-400 uppercase tracking-wider">Longevity Score</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all" style={{ width: `${patient.progress}%` }} />
                  </div>
                </div>

                {/* Risk */}
                <div>
                  <div className={`px-4 py-2 rounded-2xl inline-flex items-center gap-2 text-sm font-bold text-white shadow-lg ${patient.riskColor === 'green' ? 'bg-emerald-500/90' : patient.riskColor === 'orange' ? 'bg-orange-500/90' : 'bg-red-500/90'}`}>
                    <AlertCircle size={16} />
                    {riskBadges[patient.riskLevel]?.label || patient.riskLevel}
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2 gap-6 mb-8 h-32">
                {/* HRV Trend */}
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <div className="text-xs text-indigo-400 uppercase tracking-wider mb-2">HRV Trend</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patient.hrvTrend}>
                      <Line type="monotone" dataKey="hrv" stroke="#10b981" strokeWidth={3} dot={false} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Sleep/RHR */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <HeartPulse className="w-5 h-5 text-red-400" />
                    <span className="font-bold text-white">RHR: <span className="text-emerald-400">{patient.rhr} bpm</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-white">Sleep: <span className="text-emerald-400">{patient.sleepAvg}h avg</span></span>
                  </div>
                </div>
              </div>

              {/* Protocol & CTA */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-sm text-indigo-400 mb-4">{patient.protocol}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-4 px-8 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Eye className="w-5 h-5" />
                  View Full Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Patient Detail Modal */}
        <AnimatePresence>
          {selectedPatient && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedPatient(null)}
            >
              <motion.div
                layout
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-4xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-3xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/10 backdrop-blur border-b border-white/20 p-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl text-3xl font-bold text-white ${selectedPatient.avatarColor}`}>
                      {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-1">{selectedPatient.name}</h2>
                      <div className="flex items-center gap-4 text-lg text-indigo-300">
                        <span className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Longevity: <span className="text-emerald-400 font-bold text-2xl">{selectedPatient.longevityScore}</span>
                        </span>
                        <span>{selectedPatient.dominantDosha}</span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPatient(null)}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-3xl border border-white/30 text-white transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-8">
                  {/* Dosha Analysis */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Leaf className="w-8 h-8 text-emerald-400" />
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Vikriti Analysis</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <ResponsiveContainer width="100%" height={250}>
                          <RadialBarChart data={doshaConfig.map(d => ({ ...d, vikriti: selectedPatient.doshaScores[d.name.toLowerCase()] }))} innerRadius="30%" outerRadius="80%">
                            <RadialBar
                              minAngle={15}
                              background
                              clockWise
                              dataKey="vikriti"
                              cornerRadius={20}
                            />
                            <Tooltip />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-6">
                        {doshaConfig.map(dosha => {
                          const score = selectedPatient.doshaScores[dosha.name.toLowerCase()];
                          const aggravation = score > 33 ? `+${Math.round(score - 33)}% aggravation` : 'Stable';
                          return (
                            <div key={dosha.name} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                              <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-xl mb-4`}
                                style={{ backgroundColor: dosha.fill + '40', border: `2px solid ${dosha.fill}60` }}>
                                <span className="text-2xl font-bold text-white">{score}%</span>
                              </div>
                              <div className="font-bold text-white text-lg capitalize mb-1">{dosha.name}</div>
                              <div className={`text-sm font-medium ${score > 40 ? 'text-orange-400' : 'text-emerald-400'}`}>
                                {aggravation}
                              </div>
                            </div>
                          );
                        })}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setRecalculateOpen(true)}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-4 px-6 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 text-lg mx-auto"
                        >
                          🔄 Recalculate Dosha
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Biometrics Timeline */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">7-Day Biometrics</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* HRV */}
                      <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-400/30 rounded-2xl flex items-center justify-center">
                            <HeartPulse className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-white font-bold text-xl">HRV Trend</div>
                            <div className="text-indigo-400">Avg 58ms</div>
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height={120}>
                          <LineChart data={selectedPatient.hrvTrend}>
                            <Line type="monotone" dataKey="hrv" stroke="#3b82f6" strokeWidth={3} />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Sleep */}
                      <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-purple-500/20 border-2 border-purple-400/30 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h1v1a1 1 0 001 1h3a1 1 0 001 -1v-1h1a1 1 0 100 -2h-1V8a1 1 0 00-1 -1h-3a1 1 0 00-1 1v1H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-emerald-400 font-bold text-xl">{selectedPatient.sleepAvg}h avg</div>
                            <div className="text-indigo-400">Deep sleep improving</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-center">
                          <div className="text-3xl font-bold text-white">✓</div>
                          <div className="text-indigo-400">Good progress</div>
                        </div>
                      </div>

                      {/* Protocol Progress */}
                      <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400/30 rounded-2xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-white font-bold text-xl">{selectedPatient.progress}%</div>
                            <div className="text-indigo-400">{selectedPatient.protocol}</div>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all" style={{ width: `${selectedPatient.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                    <motion.button whileHover={{ scale: 1.05 }} className="group flex flex-col items-center p-6 rounded-3xl bg-white/10 border border-white/20 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all">
                      <MessageCircle className="w-10 h-10 text-indigo-400 group-hover:text-emerald-400 mb-2" />
                      <span className="font-bold text-white text-sm">Send Message</span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} className="group flex flex-col items-center p-6 rounded-3xl bg-white/10 border border-white/20 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all">
                      <Calendar className="w-10 h-10 text-indigo-400 group-hover:text-emerald-400 mb-2" />
                      <span className="font-bold text-white text-sm">Schedule</span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} className="group flex flex-col items-center p-6 rounded-3xl bg-white/10 border border-white/20 hover:border-orange-400/50 hover:bg-orange-500/10 transition-all">
                      <AlertCircle className="w-10 h-10 text-orange-400 group-hover:text-orange-300 mb-2" />
                      <span className="font-bold text-white text-sm">View Alerts</span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} className="group flex flex-col items-center p-6 rounded-3xl bg-white/10 border border-white/20 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all">
                      <Shield className="w-10 h-10 text-purple-400 group-hover:text-purple-300 mb-2" />
                      <span className="font-bold text-white text-sm">Full Report</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recalculate Dosha Modal */}
        <AnimatePresence>
          {recalculateOpen && selectedPatient && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setRecalculateOpen(false)}
            >
              <motion.div
                layout
                className="bg-gradient-to-br from-slate-800/95 to-emerald-900/95 backdrop-blur-xl border border-emerald-400/50 rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-3xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8 border-b border-emerald-400/30">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                    Recalculate Dosha
                  </h3>
                  <p className="text-indigo-300">Quick reassessment based on recent biometrics</p>
                </div>
                <div className="p-8 space-y-6">
                  {['vata', 'pitta', 'kapha'].map((dosha) => (
                    <div key={dosha}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="capitalize font-bold text-white">{dosha}</span>
                        <span className="text-emerald-400 font-bold text-xl">{tempDoshaScores[dosha] || selectedPatient.doshaScores[dosha]}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={tempDoshaScores[dosha] || selectedPatient.doshaScores[dosha]}
                        onChange={(e) => {
                          const newScores = {
                            ...tempDoshaScores,
                            [dosha]: parseInt(e.target.value)
                          };
                          // Normalize to ~100%
                          const total = Object.values(newScores).reduce((a, b) => a + b, 0);
                          if (total > 0) {
                            Object.keys(newScores).forEach(key => {
                              newScores[key] = Math.round((newScores[key] / total) * 100);
                            });
                          }
                          setTempDoshaScores(newScores);
                        }}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-6 border-t border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRecalculateOpen(false)}
                      className="flex-1 py-4 px-6 bg-white/20 backdrop-blur border border-white/30 rounded-2xl text-white font-bold hover:bg-white/30 transition-all text-sm"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Mock AI recalculation with small random adjustment
                        const adjustments = {
                          vata: (Math.random() - 0.5) * 8,
                          pitta: (Math.random() - 0.5) * 8,
                          kapha: (Math.random() - 0.5) * 8
                        };
                        const newScores = {};
                        let total = 0;
                        ['vata', 'pitta', 'kapha'].forEach(d => {
                          newScores[d] = Math.max(5, Math.round((selectedPatient.doshaScores[d] || 33) + adjustments[d]));
                          total += newScores[d];
                        });
                        // Normalize
                        Object.keys(newScores).forEach(d => {
                          newScores[d] = Math.round((newScores[d] / total) * 100);
                        });

                        // Update selected patient (local state only)
                        setSelectedPatient(prev => ({ ...prev, doshaScores: newScores }));
                        setRecalculateOpen(false);
                        setTempDoshaScores({});
                      }}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      ✅ Update Dosha
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AddPatient
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(newPatient) => {
            setPatientList([...patientList, newPatient]);

            // Redirect to Question Page
            navigate("/dashboard/patient-question");
          }}
        />
      </div>
    </div>
  );
}

export default Patients;


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import DarshaiSidebar from "../../Dashboard/DarshaiSidebar";
// import { Search, Filter, Plus, Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function Patients() {
//   const [patientList, setPatientList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRisk, setFilterRisk] = useState("all");

//   const navigate = useNavigate();

//   // ✅ Load patient from localStorage
//   useEffect(() => {
//     const storedPatient = JSON.parse(localStorage.getItem("newPatient"));

//     if (storedPatient) {
//       const age = calculateAge(storedPatient.dob);

//       const patientCard = {
//         id: storedPatient.id,
//         name: storedPatient.name,
//         age,
//         lastVisit: "Just now",

//         doshaScores: {
//           vata: Math.floor(Math.random() * 100),
//           pitta: Math.floor(Math.random() * 100),
//           kapha: Math.floor(Math.random() * 100),
//         },

//         dominantDosha: "Vata-Pitta",
//         longevityScore: Math.floor(Math.random() * 100),
//         riskLevel: "medium",
//         progress: 70,
//       };

//       setPatientList([patientCard]); // ✅ only latest patient
//     }
//   }, []);

//   // ✅ Age calculation
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const diff = Date.now() - birthDate.getTime();
//     return new Date(diff).getUTCFullYear() - 1970;
//   };

//   // ✅ Filter logic
//   const filteredPatients = patientList.filter((patient) => {
//     const matchesSearch = patient.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesFilter =
//       filterRisk === "all" || patient.riskLevel === filterRisk;

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white">
//       <DarshaiSidebar />

//       <div className="flex-1 p-6 md:p-8">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold">
//               Patient Portal
//             </h1>
//             <p className="text-gray-400">
//               Ayurvedic Intelligence Dashboard
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/add-patient")}
//             className="flex items-center gap-2 px-6 py-3 bg-emerald-500 rounded-xl"
//           >
//             <Plus size={18} />
//             Add Patient
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="mb-6">
//           <input
//             placeholder="Search patients..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
//           />
//         </div>

//         {/* PATIENT CARD */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//           {filteredPatients.map((patient) => (
//             <motion.div
//               key={patient.id}
//               whileHover={{ scale: 1.03 }}
//               className="bg-white/10 p-6 rounded-2xl border border-white/20"
//             >
//               {/* Initials */}
//               <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4">
//                 {patient.name.slice(0, 2).toUpperCase()}
//               </div>

//               {/* Name */}
//               <h2 className="text-xl font-bold">{patient.name}</h2>
//               <p className="text-sm text-gray-400 mb-4">
//                 {patient.age} yrs • {patient.lastVisit}
//               </p>

//               {/* Dosha */}
//               <div className="space-y-2 mb-4">
//                 <p>Vata: {patient.doshaScores.vata}%</p>
//                 <p>Pitta: {patient.doshaScores.pitta}%</p>
//                 <p>Kapha: {patient.doshaScores.kapha}%</p>
//               </div>

//               {/* Score */}
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-bold">
//                   {patient.longevityScore}
//                 </span>
//                 <span className="bg-emerald-500 px-3 py-1 rounded-lg text-sm">
//                   Medium
//                 </span>
//               </div>

//               {/* CTA */}
//               <button className="w-full py-2 bg-yellow-400 text-black rounded-xl flex items-center justify-center gap-2">
//                 <Eye size={16} />
//                 View More
//               </button>
//             </motion.div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Patients;