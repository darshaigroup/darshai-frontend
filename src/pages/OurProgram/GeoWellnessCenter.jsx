// src/pages/GeoWellnessCenter.jsx

import React from "react";

const GeoWellnessCenter = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          alt="Geo Wellness"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-green-900/70"></div>

        <div className="relative z-10 text-white px-6">
          <h1 className="text-5xl md:text-6xl font-serif">
            Geo-Wellness Center
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Exclusive partner locations optimized for circadian and environmental correction.
          </p>
        </div>
      </section>

    {/* ================= CURATED SANCTUARIES (FULL SECTION) ================= */}
<section className="bg-[#e9e4db] py-28 px-6 md:px-16">

  {/* TOP HEADING */}
  <div className="text-center mb-20">
    <p className="text-xs tracking-[0.35em] text-yellow-700 mb-6">
      CURATED SANCTUARIES
    </p>

    <h2 className="text-4xl md:text-7xl font-serif text-green-800 leading-tight">
      Where Environment <br />
      Becomes Medicine.
    </h2>
  </div>

  {/* CARDS */}
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-24">

    {/* CARD 1 */}
    <div>
      <div className="relative rounded-[40px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-green-900/60"></div>

        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-xs tracking-[0.3em] mb-2">
            RISHIKESH, INDIA
          </p>
          <h3 className="text-2xl font-serif italic text-green-200">
            The Himalayan Sanctuary
          </h3>
        </div>
      </div>

      <p className="mt-6 text-green-700 italic">
        A vertical sanctuary optimized for circadian spectral light and high-altitude recovery.
      </p>
    </div>

    {/* CARD 2 */}
    <div>
      <div className="rounded-[40px] bg-green-200 flex items-center justify-center h-[420px]">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-white mb-3">
            KERALA, INDIA
          </p>
          <h3 className="text-2xl font-serif italic text-green-800">
            Coastal Bio-Hub
          </h3>
        </div>
      </div>

      <p className="mt-6 text-green-700 italic">
        Traditional ‘Vastu’ architecture meeting 21st-century environmental auditing.
      </p>
    </div>

    {/* CARD 3 */}
    <div>
      <div className="relative rounded-[40px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-green-900/60"></div>

        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-xs tracking-[0.3em] mb-2">
            SWISS ALPS
          </p>
          <h3 className="text-2xl font-serif italic text-green-200">
            The Alpine Reset
          </h3>
        </div>
      </div>

      <p className="mt-6 text-green-700 italic">
        Our exclusive European outpost for zero-gravity sleep protocols and cold-exposure therapy.
      </p>
    </div>

  </div>

  {/* BOTTOM QUOTE ROW */}
  <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-t border-green-800/10 pt-12">

    {/* Quote */}
    <p className="text-green-700 italic text-lg md:text-xl max-w-xl">
      "Health is the state of equilibrium of the biological tectonic gears."
    </p>

    {/* Footer Line */}
    <p className="text-yellow-700 text-xs tracking-[0.35em] text-center md:text-right">
      DARSHAI GEO–WELLNESS • PRECISION LONGEVITY ARCHIVE • © 2026
    </p>

  </div>

</section>

    </div>
  );
};

export default GeoWellnessCenter;