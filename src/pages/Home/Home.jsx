import React from "react";
import { motion } from "framer-motion";
import { Leaf, Shield, Zap, HeartPulse, Brain, Award } from "lucide-react";
import homeBg from "../../assets/DoctorHomepage.jpg";


const features = [
  {
    icon: Leaf,
    title: "Dosha Intelligence",
    desc: "AI-powered Prakriti-Vikriti analysis using pulse, biometrics, and lifestyle data.",
    color: "from-emerald-400 to-teal-500"
  },
  {
    icon: Shield,
    title: "Longevity Protocols",
    desc: "Personalized Rasayana therapies validated by 5000+ years of Ayurvedic wisdom.",
    color: "from-blue-400 to-indigo-500"
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    desc: "HRV, sleep, RHR tracking with instant dosha aggravation alerts.",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: HeartPulse,
    title: "Geo-Wellness",
    desc: "Location-based Panchakarma retreats and seasonal ritucharya optimization.",
    color: "from-purple-400 to-violet-500"
  }
];

const stats = [
  { value: "500+", label: "Active Protocols" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "AI Monitoring" },
  { value: "5000+", label: "Years Expertise" }
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900/50 to-teal-900/40"
          style={{
    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%), linear-gradient(135deg, rgba(16,185,129,0.2), rgba(34,197,94,0.1)), url(${homeBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            animation: 'slowParallax 30s ease-in-out infinite'
          }}
        />
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float1" />
        <div className="absolute top-1/2 right-32 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-float2" />
        <div className="absolute bottom-32 left-1/2 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-float3" />
      </div>

      {/* Main Content */}
      <div className="relative z-40">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="space-y-8"
              >
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent drop-shadow-4xl leading-none">
                DARSHAI
              </h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 max-w-5xl mx-auto leading-relaxed drop-shadow-xl tracking-wide">
                  India’s first AI-Native, IP-Driven Travel & Health Tech startup | Architecting the Future of Longevity
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mx-auto max-w-md"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 3, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-5 bg-gradient-to-r from-emerald-500/95 via-teal-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-teal-600 rounded-3xl font-bold text-xl text-white shadow-2xl hover:shadow-emerald-400/50 transition-all duration-400 flex items-center gap-3 backdrop-blur-2xl border-2 border-white/30 hover:border-emerald-400/50 relative overflow-hidden group flex-1 mx-auto sm:mx-0"
                >
                  <motion.div 
                    className="w-3 h-3 bg-white/80 rounded-full group-hover:animate-ping absolute -inset-1 blur opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <Shield className="w-7 h-7 drop-shadow-lg" />
                  Doctor Login
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl mb-6">
                Wellness Intelligence
              </h2>
              <p className="text-2xl text-white/80 max-w-3xl mx-auto">
                AI meets 5000 years of Ayurvedic mastery. Your complete health transformation platform.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 80, scale: 0.8 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                    }}
                    whileHover={{ y: -20, scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative cursor-pointer"
                  >
                    <div className={`absolute inset-0 ${feature.color} blur-3xl opacity-30 animate-pulse rounded-3xl -z-10`} />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-4xl p-10 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:-translate-y-4">
                      <motion.div 
                        className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20`}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon className="w-14 h-14 text-white drop-shadow-2xl" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-white mb-6 drop-shadow-xl text-center">{feature.title}</h3>
                      <p className="text-lg text-indigo-100 leading-relaxed text-center">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Image Slideshow Section */}
        <section className="py-32 bg-gradient-to-b from-transparent to-slate-900/30">
          <div className="max-w-7xl mx-auto px-8">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl mb-6 text-center"
            >
              Our Technology
            </motion.h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
{[
                { src: '/src/assets/CGM.jpg', alt: 'CGM' },
                { src: '/src/assets/Watchclock.jpg', alt: 'Watch Clock' },
                { src: '/src/assets/watch.jpg', alt: 'Watch' },
                { src: '/src/assets/longevity.jpg', alt: 'Longevity' },
                { src: '/src/assets/herbs.jpg', alt: 'Herbs' },
                { src: '/src/assets/Geo-wellness.jpg', alt: 'Geo Wellness' },
                { src: '/src/assets/Dietplan.jpg', alt: 'Diet Plan' },
                { src: '/src/assets/dosha.jpg', alt: 'Dosha' }
              ].map((image, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.8 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                  }}
                  whileHover={{ scale: 1.1, y: -10, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 h-64 bg-gradient-to-br from-slate-800/50 to-transparent backdrop-blur-xl border border-white/20"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white font-bold text-xl drop-shadow-2xl">{image.alt}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-3xl mb-4 mx-auto"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xl text-white/80 font-medium uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto px-8 text-center relative z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-block p-8 bg-gradient-to-r from-emerald-400/95 via-teal-400/95 to-emerald-500/95 backdrop-blur-xl border border-emerald-400/50 rounded-4xl shadow-3xl mb-12 mx-auto">
                <Brain className="w-20 h-20 mx-auto mb-6 text-white drop-shadow-2xl" />
                <h2 className="text-5xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent drop-shadow-3xl mb-6">
                  Health AI Revolution
                </h2>
                <p className="text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                  Precision Ayurveda powered by artificial intelligence. Your wellness, redefined.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="px-16 py-10 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 rounded-4xl font-black text-3xl text-white shadow-4xl hover:shadow-emerald-500/75 transition-all duration-500 uppercase tracking-wider flex items-center gap-6 mx-auto backdrop-blur-3xl border-8 border-white/30"
              >
                <HeartPulse className="w-12 h-12" />
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes slowParallax {
          0%, 100% { transform: scale(1.05) translateY(0); }
          50% { transform: scale(1.08) translateY(-20px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(180deg); }
          33% { transform: translateY(-15px) rotate(300deg); }
          66% { transform: translateY(-25px) rotate(60deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(360deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(-18px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
}

