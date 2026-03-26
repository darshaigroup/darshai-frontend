import React from 'react'
import bgImage from '../../assets/homeImage.png' // update filename if needed

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-start"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full md:w-1/2 text-gray-800 p-12 md:p-16 flex flex-col justify-start pt-8 md:pt-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight text-black">
            DARSHAI<br />GEO-WELLNESS
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide-amber text-black mb-8">
            AI-Native Longevity Protocols Validated by Heritage
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primaryDark transition-colors duration-300">
              Get Demo
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home