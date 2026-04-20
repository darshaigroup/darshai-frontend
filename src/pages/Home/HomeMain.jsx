import React from "react";

function HomeMain() {
  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center text-center">
        <div className="max-w-5xl mx-auto px-6">

          <p className="text-sm tracking-widest text-gray-400 mb-6">
            BIO-LUXURY OPTIMIZATION
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight text-gray-800 mb-8">
            The Art of Balance,
            <br />
            Decoded by AI.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Bridge 5,000 years of Ayurvedic wisdom with 21st-century
            biomarker science.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-10 py-4 bg-amber-500 text-white rounded-full text-sm tracking-widest font-semibold hover:bg-amber-600 transition">
              BEGIN YOUR PROTOCOL
            </button>

            <button className="text-gray-700 flex items-center gap-2 hover:underline">
              Watch the Film →
            </button>
          </div>

        </div>
      </section>

      {/* GREEN SECTION */}
      <section className="w-full lg:min-h-screen flex flex-col lg:flex-row">
        
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 bg-green-700 text-white flex items-center">
          <div className="max-w-xl mx-auto px-10 py-16">
            
            <h1 className="text-4xl md:text-5xl font-serif italic text-yellow-400 mb-6 leading-tight">
              DARSHAI asks you
              <br />
              to reclaim.
            </h1>

            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              We noticed a dangerous gap in modern health: the more "connected"
              our technology became, the more disconnected we became from our
              biological foundations.
            </p>

            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              We bridge 5,000 years of Ayurvedic tradition with AI precision.
            </p>

            <button className="text-yellow-400 text-lg font-semibold hover:underline">
              Explore the Philosophy →
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center py-20">
          <p className="text-gray-400">Right side content</p>
        </div>

      </section>

      {/* ECOSYSTEM SECTION */}
      <section className="bg-[#f3efe8] py-24 mt-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* TOP TEXT */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            
            {/* LEFT */}
            <div>
              <p className="text-sm tracking-widest text-amber-500 mb-6">
                THE ECOSYSTEM
              </p>

              <h2 className="text-5xl md:text-6xl font-serif text-green-800 leading-tight">
                The Six Gears of
                <br />
                Longevity
              </h2>
            </div>

            {/* RIGHT */}
            <div className="flex items-center">
              <p className="text-lg text-green-700 max-w-md leading-relaxed">
                A multi-gear biological ecosystem engineered to solve modern burnout
                from its tectonic roots.
              </p>
            </div>
          </div>

          {/* BIG IMAGE CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden group">
              <img
                src=""
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-widest text-green-200 mb-1">GEAR 1</p>
                <h3 className="text-3xl font-serif">Sovereign Protocols</h3>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-widest text-green-200 mb-1">GEAR 2</p>
                <h3 className="text-3xl font-serif">Corporate Ecology</h3>
                <p className="text-sm text-white/80 max-w-xs">
                  Specialized programs engineered to reverse decision fatigue.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1556228724-4d2efb3cdb56"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-widest text-green-200 mb-1">GEAR 3</p>
                <h3 className="text-3xl font-serif">Maintenance</h3>
              </div>
            </div>

          </div>

        </div> {/* ✅ FIXED missing div */}
      </section>
      {/* VISIONARY SECTION */}
<section className="w-full bg-gradient-to-r from-green-700 to-green-600 py-28">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <div>

      {/* Tag */}
      <p className="text-sm tracking-widest text-amber-400 mb-6">
        THE VISIONARY
      </p>

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-white mb-12">
        Architecting
        <br />
        <span className="text-amber-400 italic">Biological</span>
        <br />
        <span className="text-amber-400 italic">Sovereignty.</span>
      </h2>

      {/* QUOTE BLOCK */}
      <div className="border-l-2 border-amber-400 pl-6 mb-10">
        <p className="text-xl md:text-2xl italic text-white/90 leading-relaxed">
          “Health is not a luxury you purchase, but a biological sovereignty
          you reclaim through mathematical precision.”
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="text-lg text-white/70 leading-relaxed max-w-lg">
        Veekshitha V is a vanguard in science communication, dedicated to
        bridging the tectonic gap between ancient Ayurvedic wisdom and modern
        clinical data.
      </p>

    </div>

    {/* RIGHT IMAGE */}
    <div className="relative flex justify-center">

      {/* Glow Layer */}
      <div className="absolute w-[90%] h-[90%] bg-green-500/20 rounded-[40px] blur-2xl"></div>

      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
        alt="Visionary"
        className="relative w-full max-w-md rounded-[40px] object-cover"
      />

    </div>

  </div>
</section>
{/* CTA SECTION */}
<section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <img
    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
    alt="Meditation"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* GREEN OVERLAY */}
  <div className="absolute inset-0 bg-green-800/80"></div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-4xl px-6">

    {/* HEADING */}
    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-8">
      Beyond Wellness.
    </h2>

    {/* SUBTEXT */}
    <p className="text-lg md:text-xl text-white/80 mb-4">
      We are accepting applications for our 2026 Sovereign Pilot.
    </p>

    <p className="text-xl md:text-2xl text-amber-400 mb-12">
      Redefine your biological baseline.
    </p>

    {/* BUTTON */}
    <button className="px-12 py-5 bg-amber-500 text-white rounded-full text-sm tracking-widest font-semibold hover:bg-amber-600 transition">
      BEGIN YOUR APPLICATION
    </button>

  </div>

</section>
{/* FOOTER QUOTE SECTION */}
<section className="bg-[#f3efe8] py-16">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

    {/* LEFT QUOTE */}
    <p className="text-xl md:text-2xl font-serif italic text-green-700 max-w-xl leading-relaxed">
      "Health is the state of equilibrium of the biological tectonic gears."
    </p>

    {/* RIGHT TEXT */}
    <p className="text-xs tracking-[0.3em] text-amber-500 uppercase text-center md:text-right">
      DARSHAI GEO-WELLNESS • PRECISION LONGEVITY ARCHIVE • © 2026
    </p>

  </div>
</section>

    </div>
  );
}

export default HomeMain;