import React from 'react'

function About() {
  return (
    <div className="bg-lightBg min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-10">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index].image}
            src={slides[index].image}
            alt=""
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-gold font-semibold mb-2">
              {slides[index].subtitle}
            </h4>

            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              {slides[index].title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {slides[index].text}
            </p>

            <button
              onClick={nextSlide}
              className="mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-primaryDark transition"
            >
              Next →
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-3 mt-6">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-primary" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default About;