import { useRef } from "react";

export default function Philosophy() {
  const sliderRef = useRef(null);

  // Vertical Page Navigation
  const goToPage = (pageIndex) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollTo({
      top: sliderRef.current.clientHeight * pageIndex,
      behavior: "smooth",
    });
  };

  return (
    <main className="w-full h-screen overflow-hidden">

      {/* VERTICAL SLIDER */}
      <div
        ref={sliderRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >

        {/* PAGE 1 — PHILOSOPHY */}
        <section className="w-full h-screen snap-start shrink-0 bg-white px-6 py-20 flex items-center">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">

            {/* Left Side Dots */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="flex flex-col items-center gap-5">

                {/* Active */}
                <div className="w-10 h-10 rounded-full border-2 border-green-700 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-700" />
                </div>

                {/* Solution */}
                <button
                  onClick={() => goToPage(1)}
                  className="w-4 h-4 rounded-full bg-gray-300 hover:bg-teal-700 transition-all duration-500"
                />

                {/* Protocol */}
                <button
                  onClick={() => goToPage(2)}
                  className="w-4 h-4 rounded-full bg-gray-300 hover:bg-black transition-all duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7">
            

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-gray-900 leading-tight mb-8">
                The Problem: The Illusion of "Wellness"
              </h1>

              <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                <p>
                  The global wellness tourism and corporate health industries are fundamentally flawed. 
                  They are reactive, generic, and completely void of measurable biological data.
                  Today, corporate leaders and High-Net-Worth Individuals (HNIs) are routinely sold "feel-good" spa experiences. These luxury vacations offer a temporary psychological escape, but they carry zero scientific accountability and deliver no lasting physiological impact. You check out of the resort, return to the high-stress environment of the city, and the burnout immediately resumes.

                </p>

                
              </div>

              <button
                onClick={() => goToPage(1)}
                className="mt-10 px-8 py-4 bg-green-700 text-white rounded-lg text-lg font-medium hover:bg-teal-800 transition-all duration-500 hover:scale-105"
              >
                Discover the Solution 
              </button>
            </div>
          </div>
        </section>

        {/* PAGE 2 — SOLUTION */}
        <section className="w-full h-screen snap-start shrink-0 bg-black text-white px-6 py-20 flex items-center">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">

            {/* Left Side Dots */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="flex flex-col items-center gap-5">

                {/* Problem */}
                <button
                  onClick={() => goToPage(0)}
                  className="w-4 h-4 rounded-full bg-gray-400 hover:bg-white transition-all duration-500"
                />

                {/* Active */}
                <div className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-400" />
                </div>

                {/* Protocol */}
                <button
                  onClick={() => goToPage(2)}
                  className="w-4 h-4 rounded-full bg-gray-600 hover:bg-yellow-400 transition-all duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
            

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-black-400 leading-tight mb-8">
                The DARSHAI Solution: Precision Longevity Interventions
              </h1>

              <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                <p>
                  DARSHAI is India’s first AI-Native, IP-Driven Travel & Health-Tech Group. We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.
Rather than operating a mass-market app or standard tour agency, we function on an elite Concierge Model, processing deep-tech biological data to deliver hyper-personalized interventions.

                </p>

               
              </div>

              <button
                onClick={() => goToPage(2)}
                className="mt-10 px-8 py-4 bg-green-500 text-whiterounded-lg text-lg font-medium hover:bg-yellow-400 transition-all duration-500 hover:scale-105"
              >
                Explore the Protocol ↓
              </button>
            </div>
          </div>
        </section>

        {/* PAGE 3 — PROTOCOL */}
        <section className="w-full h-screen snap-start shrink-0 bg-[#f4f1ea] px-6 py-20 flex items-center">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">

            {/* Left Side Dots */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="flex flex-col items-center gap-5">

                <button
                  onClick={() => goToPage(0)}
                  className="w-4 h-4 rounded-full bg-gray-400 hover:bg-black transition-all duration-500"
                />

                <button
                  onClick={() => goToPage(1)}
                  className="w-4 h-4 rounded-full bg-gray-400 hover:bg-black transition-all duration-500"
                />

                {/* Active */}
                <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-black" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-9">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-700 mb-4">
                The Protocol
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-gray-900 leading-tight mb-10">
                How We Engineer Your Longevity
              </h1>

              <div className="space-y-8 text-lg md:text-xl text-gray-700 leading-relaxed">
                <p>•DARSHAI is India’s first AI-Native, IP-Driven Travel & Health-Tech Group. We are entirely disrupting the global wellness market by shifting the focus from generic hospitality to engineered human performance.
Rather than operating a mass-market app or standard tour agency, we function on an elite Concierge Model, processing deep-tech biological data to deliver hyper-personalized interventions.
</p>
                <p> • 	The Sovereign Protocols: We match your specific biological deficit to the exact geographical coordinate (Coast, Forest, or Mountain) and Ayurvedic intervention required to heal it.</p>
                <p>• The Sovereign Protocols: We match your specific biological deficit to the exact geographical coordinate (Coast, Forest, or Mountain) and Ayurvedic intervention required to heal it.</p>
              </div>

              <button
                onClick={() => goToPage(0)}
                className="mt-12 px-8 py-4 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-800 transition-all duration-500 hover:scale-105"
              >
                Back to Start ↑
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}