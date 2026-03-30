import React from "react";
import { motion } from "framer-motion";
import bgImage from "../../assets/images/homeImage.png";

function Home() {
  return (
    <div className="relative min-h-screen flex items-center">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-[slowZoom_20s_linear_infinite]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full pt-24">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary leading-tight mb-6">
            DARSHAI <br /> GEO-WELLNESS
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8">
            AI-Native Longevity Protocols Validated by Heritage
          </p>

          <div className="flex gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-7 py-3 rounded-full font-normal shadow-lg hover:bg-primaryLight transition"
            >
              Get Demo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="border border-primary text-primary px-7 py-3 rounded-full font-normal hover:bg-primary hover:text-white transition"
            >
              View More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;