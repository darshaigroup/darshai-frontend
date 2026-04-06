import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarshaiSidebar from "./DarshaiSidebar";
import {
  User,
  Shield,
  Bell,
  Sliders,
  Smartphone,
  Settings as SettingsIcon,
  Zap,
  Moon,
  Sun,
  Wifi,
  Database,
  Lock,
  Save
} from "lucide-react";

const integrations = [
  { id: 1, name: "Fitbit Sync", icon: "🏃", status: "active", description: "Heart rate & steps" },
  { id: 2, name: "Oura Ring", icon: "💍", status: "inactive", description: "Sleep & recovery" },
  { id: 3, name: "Apple Health", icon: "🍎", status: "active", description: "iOS health data" },
  { id: 4, name: "Google Fit", icon: "📱", status: "inactive", description: "Android fitness" }
];

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true
  });
  const [theme, setTheme] = useState("dark");
  const [doshaSensitivity, setDoshaSensitivity] = useState({ vata: 75, pitta: 60, kapha: 80 });
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "preferences", icon: Sliders, label: "Preferences" },
    { id: "integrations", icon: Smartphone, label: "Integrations" },
    { id: "security", icon: Shield, label: "Security" }
  ];

  const Slider = ({ label, value, onChange, min=0, max=100, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-white">{label}</span>
        <span className="text-2xl font-bold" style={{ color: color }}>{value}%</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
        />
        <div 
          className="absolute -top-8 left-0 w-full h-2 bg-gradient-to-r rounded-full opacity-75"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );

  const Toggle = ({ label, checked, onChange }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 bg-white/5 backdrop-blur border border-white/20 rounded-2xl"
      whileHover={{ scale: 1.01 }}
    >
      <div>
        <div className="font-medium text-white">{label}</div>
        <div className="text-sm text-indigo-400">Manage {label.toLowerCase()}</div>
      </div>
      <motion.div
        layout
        onClick={onChange}
        className={`w-12 h-7 rounded-full p-1 cursor-pointer flex-shrink-0 transition-all duration-300 ${
          checked ? "bg-emerald-500 justify-end shadow-emerald-500/25" : "bg-white/20 justify-start shadow-gray-500/25"
        }`}
      >
        <motion.div 
          layout
          className="w-5 h-5 bg-white rounded-full shadow-md"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-teal-900/30">
      <DarshaiSidebar />
      <div className="flex-1 p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              Settings
            </h1>
            <p className="text-xl text-indigo-200/90">Personalize your Darshai experience</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-4"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl transition-all group ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/40 shadow-emerald-500/30"
                        : "bg-white/5 backdrop-blur border border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all ${activeTab === tab.id ? 'shadow-emerald-500/20' : ''}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{tab.label}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <User className="w-8 h-8" />
                        Profile Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <label className="block text-indigo-300 font-medium">Full Name</label>
                          <input type="text" defaultValue="Dr. Ayurveda Specialist" className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-4 focus:ring-emerald-500/30 outline-none" />
                        </div>
                        <div className="space-y-4">
                          <label className="block text-indigo-300 font-medium">Specialization</label>
                          <input type="text" defaultValue="Ayurvedic Pulse Diagnosis" className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-4 focus:ring-emerald-500/30 outline-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <Bell className="w-8 h-8" />
                      Notification Preferences
                    </h3>
                    <div className="space-y-4">
                      <Toggle 
                        label="Protocol Updates" 
                        checked={notifications.email} 
                        onChange={() => setNotifications(p => ({...p, email: !p.email}))} 
                      />
                      <Toggle 
                        label="SMS Alerts" 
                        checked={notifications.sms} 
                        onChange={() => setNotifications(p => ({...p, sms: !p.sms}))} 
                      />
                      <Toggle 
                        label="App Push Notifications" 
                        checked={notifications.app} 
                        onChange={() => setNotifications(p => ({...p, app: !p.app}))} 
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === "preferences" && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <Sliders className="w-8 h-8" />
                      Dosha Sensitivity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Slider 
                        label="Vata Sensitivity" 
                        value={doshaSensitivity.vata} 
                        onChange={(e) => setDoshaSensitivity(p => ({...p, vata: +e.target.value}))}
                        color="#3b82f6"
                      />
                      <Slider 
                        label="Pitta Sensitivity" 
                        value={doshaSensitivity.pitta} 
                        onChange={(e) => setDoshaSensitivity(p => ({...p, pitta: +e.target.value}))}
                        color="#ef4444"
                      />
                      <Slider 
                        label="Kapha Sensitivity" 
                        value={doshaSensitivity.kapha} 
                        onChange={(e) => setDoshaSensitivity(p => ({...p, kapha: +e.target.value}))}
                        color="#10b981"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === "integrations" && (
                  <motion.div
                    key="integrations"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <Smartphone className="w-8 h-8" />
                      Integrations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {integrations.map((integration) => (
                        <motion.div
                          key={integration.id}
                          whileHover={{ y: -4 }}
                          className="group p-6 bg-white/5 backdrop-blur border border-white/20 rounded-2xl hover:border-emerald-400/50 hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl shadow-lg">
                              {integration.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white text-lg">{integration.name}</h4>
                              <p className="text-indigo-400 text-sm">{integration.description}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                              integration.status === "active" 
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30" 
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                            }`}>
                              {integration.status === "active" ? "Connected" : "Connect"}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <Shield className="w-8 h-8" />
                      Security & Privacy
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <Toggle label="Two Factor Authentication" checked={false} onChange={() => {}} />
                      </div>
                      <div>
                        <Toggle label="Data Encryption" checked={true} onChange={() => {}} />
                      </div>
                      <div className="pt-6 border-t border-white/10">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 p-6 rounded-2xl font-bold text-white shadow-xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          <Save className="w-6 h-6" />
                          Save All Changes
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

