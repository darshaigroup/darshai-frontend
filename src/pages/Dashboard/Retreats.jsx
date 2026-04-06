import React from "react";
import { motion } from "framer-motion";
import DarshaiSidebar from "./DarshaiSidebar";
import { Calendar, MapPin, Users, Clock, DollarSign, BookOpen, Leaf, Mountain, Waves, Sun, Trees, Droplets } from "lucide-react";

const retreats = [
  {
    id: 1,
    title: "Panchakarma Sanctuary",
    subtitle: "Deep Detox Retreat",
    icon: Mountain,
    color: "from-amber-400 via-orange-400 to-red-400",
    stats: [
      { icon: Leaf, label: "21 Treatments", value: "Daily" },
      { icon: Clock, label: "Duration", value: "7 Days" },
      { icon: Users, label: "Group", value: "8 Max" }
    ],
    price: "$2,499",
    dosha: "Vata Dominant",
    uniqueGradient: "bg-gradient-to-br from-amber-500/20 via-orange-400/10 to-red-500/20 border-amber-400/30"
  },
  {
    id: 2,
    title: "Himalayan Yoga Journey",
    subtitle: "Spiritual Transformation",
    icon: Trees,
    color: "from-green-400 via-emerald-400 to-teal-400",
    stats: [
      { icon: Sun, label: "Sunrise Yoga", value: "Daily" },
      { icon: Clock, label: "Duration", value: "5 Days" },
      { icon: Users, label: "Group", value: "12 Max" }
    ],
    price: "$1,299",
    dosha: "Kapha Balance",
    uniqueGradient: "bg-gradient-to-br from-green-500/20 via-emerald-400/10 to-teal-500/20 border-emerald-400/30"
  },
  {
    id: 3,
    title: "Kerala Rejuvenation",
    subtitle: "Rasayana Longevity",
    icon: Waves,
    color: "from-indigo-400 via-violet-400 to-purple-400",
    stats: [
      { icon: Leaf, label: "Herbal Therapy", value: "Full Course" },
      { icon: Clock, label: "Duration", value: "10 Days" },
      { icon: Users, label: "Group", value: "6 Max" }
    ],
    price: "$3,499",
    dosha: "Tridosha Harmony",
    uniqueGradient: "bg-gradient-to-br from-indigo-500/20 via-violet-400/10 to-purple-500/20 border-violet-400/30"
  },
  {
    id: 4,
    title: "Forest Silence",
    subtitle: "Vipassana Meditation",
    icon: Sun,
    color: "from-sky-400 via-blue-400 to-indigo-500",
    stats: [
      { icon: Clock, label: "Noble Silence", value: "Full" },
      { icon: Clock, label: "Duration", value: "3 Days" },
      { icon: Users, label: "Group", value: "15 Max" }
    ],
    price: "$799",
    dosha: "Vata Calming",
    uniqueGradient: "bg-gradient-to-br from-sky-500/20 via-blue-400/10 to-indigo-500/20 border-blue-400/30"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Retreats() {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900/50 to-teal-900/30 relative overflow-hidden">
      <DarshaiSidebar />
      
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-8 pt-24 relative z-10"
      >
        {/* Animated Particle Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-32 left-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-20 max-w-6xl mx-auto text-center mb-24"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 backdrop-blur-xl border border-emerald-400/40 rounded-3xl mb-8 shadow-2xl">
            <Leaf className="w-12 h-12 mx-auto mb-4 text-emerald-300" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent drop-shadow-3xl mb-6 leading-tight">
            Sacred Retreats
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-indigo-100/90 max-w-3xl mx-auto leading-relaxed font-light">
            Ancient wisdom meets modern transformation. Immerse in nature's healing embrace.
          </p>
        </motion.div>

        {/* Retreats Collection */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24"
        >
          {retreats.map((retreat, index) => {
            const Icon = retreat.icon;
            return (
              <motion.div
                key={retreat.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -20, 
                  rotateX: 5,
                  transition: { duration: 0.4 }
                }}
                className={`group relative overflow-hidden rounded-4xl p-10 shadow-2xl backdrop-blur-xl hover:shadow-emerald-500/60 transition-all duration-700 ${retreat.uniqueGradient}`}
              >
                {/* 3D Card Tilt Effect */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon Background */}
                <div className="relative z-10 flex items-center justify-center w-32 h-32 mx-auto mb-8 bg-white/10 rounded-3xl backdrop-blur border border-white/20 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <Icon className="w-20 h-20 text-white drop-shadow-2xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur border border-white/30 mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm font-bold text-emerald-200">{retreat.dosha}</span>
                  </motion.div>

                  <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl mb-4">
                    {retreat.title}
                  </h3>
                  <p className="text-xl text-indigo-100/90 font-light leading-relaxed max-w-md mx-auto">
                    {retreat.subtitle}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
                    {retreat.stats.map((stat, sIndex) => {
                      const StatIcon = stat.icon;
                      return (
                        <motion.div 
                          key={sIndex}
                          className="group flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all"
                          whileHover={{ y: -4, scale: 1.05 }}
                        >
                          <StatIcon className="w-8 h-8 text-emerald-300 mb-2 drop-shadow-lg" />
                          <div className="font-bold text-emerald-200 text-lg">{stat.value}</div>
                          <div className="text-xs text-indigo-300 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-8 space-y-6">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
                      {retreat.price}
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-12 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 rounded-4xl font-black text-2xl text-white shadow-2xl hover:shadow-emerald-500/75 transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-4 mx-auto backdrop-blur-xl border border-emerald-400/50"
                    >
                      <BookOpen className="w-8 h-8" />
                      Reserve Your Spot
                    </motion.button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:animate-ping" />
                <div className="absolute bottom-10 right-10 w-20 h-20 bg-emerald-400/20 rounded-2xl group-hover:scale-110 transition-all" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-20 max-w-4xl mx-auto text-center py-24"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 backdrop-blur-xl border border-emerald-400/40 rounded-4xl mb-8 shadow-2xl hover:scale-105 transition-all">
            <Mountain className="w-16 h-16 mx-auto mb-4 text-emerald-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-3xl mb-6">
            Ready for Transformation?
          </h2>
          <p className="text-xl text-indigo-100/90 max-w-2xl mx-auto mb-12 font-light">
            Join hundreds who have rediscovered their natural balance through authentic Ayurvedic retreats.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-8 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-600 hover:from-amber-600 hover:via-emerald-600 hover:to-teal-700 rounded-4xl font-black text-2xl text-white shadow-2xl hover:shadow-amber-500/50 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-4 mx-auto backdrop-blur-xl border-4 border-white/20"
          >
            Explore All Retreats
            <MapPin className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .group:hover .float-element {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

