import React from "react";
import GeoWellnessCenter from "./GeoWellnessCenter";
import { useParams } from "react-router-dom";

const ProgramMain = () => {
  const { category } = useParams();
  const [activeProgram, setActiveProgram] = React.useState(null);

  if (category === 'geo-wellness-center') {
    return <GeoWellnessCenter />;
  }
  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <section className="relative h-[600px] w-full">
        
        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
          alt="wellness"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900/80"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Wellness Programmes
          </h1>

          <p className="max-w-3xl text-lg md:text-xl text-gray-200 italic">
            Bio-validated clinical interventions and data-driven wellness
            journeys for peak human performance.
          </p>

        </div>
      </section>


      {/* ================= DARSHAI METHOD SECTION ================= */}
<section className="bg-[#e9e4db] py-28 px-6 text-center">

  {/* Small Label */}
  <p className="text-xs tracking-[0.35em] text-yellow-700 mb-6">
    THE DARSHAI METHOD
  </p>

  {/* Main Heading */}
  <h2 className="text-4xl md:text-7xl font-serif leading-tight">
    
    <span className="text-green-800">
      Biologically Optimized
    </span>

    <br />

    <span className="text-yellow-700 italic font-light">
      journeys.
    </span>

  </h2>

  {/* Sub Text */}
  <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-green-700 leading-relaxed">
    We bridge modern clinical precision with ancestral wisdom
    to architect a version of you that transcends current
    limitations.
  </p>

</section>
{/* ================= REJUVENATION PROGRAMME ================= */}
<section className="bg-[#e9e4db] py-24 px-6 md:px-16">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT IMAGE */}
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
        alt="Rejuvenation"
        className="w-full h-[500px] object-cover rounded-[40px]"
      />

      {/* Overlay Text */}
      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-xs tracking-[0.3em] text-yellow-400 mb-2">
          DARSHAI VITAL RESET
        </p>
        <h3 className="text-2xl md:text-3xl font-serif">
          Rejuvenation Programme
        </h3>
      </div>

      {/* Top Icon Circle */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white">
        ⚡
      </div>
    </div>

    {/* RIGHT CONTENT */}
    <div>

      {/* Small Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
          ⚡
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-yellow-700">
            DARSHAI VITAL RESET
          </p>
          <p className="text-xs text-gray-500">VITALITY FOCUS</p>
        </div>
      </div>

      {/* Title */}
      <p className="text-yellow-700 italic text-lg mb-2">
        Vitality Reset
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
        Rejuvenation Programme
      </h2>

      {/* Quote */}
      <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
        "Restore vitality and renew your energy for a balanced life."
      </p>

      {/* Description */}
      <p className="text-green-800/80 leading-relaxed text-lg">
        A structured therapeutic protocol aimed at restoring physiological
        balance, improving energy levels, and supporting systemic recovery.
        Our approach integrates chronobiology with targeted nutrient density
        to reboot your cellular potential.
      </p>
      <button
  onClick={() =>
    setActiveProgram({
      title: "Rejuvenation Programme",
      label: "DARSHAI VITAL RESET",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      description:
        "Inspired by the regenerative heritage of the Himalayas...",
    })
  }
  className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium"
>
  DISCOVER THE PROTOCOL
  <span className="w-10 h-10 rounded-full border border-green-800 flex items-center justify-center">
    ⚡
  </span>
</button>

    </div>
  </div>

</section>
{/* ================= MINDFULNESS PROGRAMME ================= */}
<section className="bg-[#e9e4db] py-24 px-6 md:px-16">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div>

      {/* Top Label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
          💚
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-yellow-700">
            DARSHAI MIND BALANCE
          </p>
          <p className="text-xs text-gray-500">RESILIENCE FOCUS</p>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-yellow-700 italic text-lg mb-2">
        Inner Stillness
      </p>

      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
        Mindfulness Programme
      </h2>

      {/* Quote */}
      <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
        "Cultivate calm, clarity, and inner peace through guided practices."
      </p>

      {/* Description */}
      <p className="text-green-800/80 leading-relaxed text-lg">
        Evidence-informed practices to regulate stress response, enhance
        cognitive clarity, and improve emotional resilience. We transition
        you from a state of survival to a state of sovereign flow.
      </p>
     <button
  onClick={() =>
    setActiveProgram({
      title: "Mindfulness Programme",
      label: "DARSHAI MIND BALANCE",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      description:
        "Cultivate calm, clarity, and inner peace through guided practices.",
    })
  }
  className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
>
  DISCOVER THE PROTOCOL
  <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
    ⚡
  </span>
</button>


    </div>

    {/* RIGHT IMAGE */}
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
        alt="Mindfulness"
        className="w-full h-[500px] object-cover rounded-[40px]"
      />

      {/* Optional subtle overlay (for premium feel) */}
      <div className="absolute inset-0 bg-black/10 rounded-[40px]"></div>
    </div>

  </div>
</section>
{/* ================= DETOX PROGRAMME ================= */}
<section className="bg-[#e9e4db] py-24 px-6 md:px-16">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT IMAGE */}
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1552693673-1bf958298935"
        alt="Detox"
        className="w-full h-[500px] object-cover rounded-[40px]"
      />

      {/* Bottom Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent rounded-[40px]" />

      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-xs tracking-[0.3em] text-yellow-400 mb-2">
          DARSHAI DEEP DETOX
        </p>
        <h3 className="text-2xl md:text-3xl font-serif">
          Detox Programme
        </h3>
      </div>

      {/* Top Icon */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white">
        ⚡
      </div>
    </div>

    {/* RIGHT CONTENT */}
    <div>

      {/* Top Label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
          ⚡
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-yellow-700">
            DARSHAI DEEP DETOX
          </p>
          <p className="text-xs text-gray-500">METABOLIC FOCUS</p>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-yellow-700 italic text-lg mb-2">
        Deep Cleanse
      </p>

      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
        Detox Programme
      </h2>

      {/* Quote */}
      <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
        "Cleanse your system and refresh your body from within."
      </p>

      {/* Description */}
      <p className="text-green-800/80 leading-relaxed text-lg mb-10">
        Targeted cleansing interventions designed to optimise metabolic
        function and support the body’s natural detoxification pathways.
        We go beyond superficial 'cleanses' to address systemic toxic load.
      </p>

      <button
  onClick={() =>
    setActiveProgram({
      title: "Detox Programme",
      label: "DARSHAI DEEP DETOX",
      image: "https://images.unsplash.com/photo-1552693673-1bf958298935",
      description:
        "Cleanse your system and refresh your body from within.",
    })
  }
  className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
>
  DISCOVER THE PROTOCOL
  <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
    ⚡
  </span>
</button>
    </div>
  </div>
</section>
{/* ================= FITNESS PROGRAMME ================= */}
<section className="bg-[#e9e4db] py-24 px-6 md:px-16">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div>

      {/* Top Label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
          🛡️
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-yellow-700">
            DARSHAI BODY CONDITIONING
          </p>
          <p className="text-xs text-gray-500">PERFORMANCE FOCUS</p>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-yellow-700 italic text-lg mb-2">
        Strength & Flow
      </p>

      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
        Fitness Programme
      </h2>

      {/* Quote */}
      <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
        "Build strength, stamina, and confidence with tailored workouts."
      </p>

      {/* Description */}
      <p className="text-green-800/80 leading-relaxed text-lg">
        Individually prescribed training protocols to improve strength,
        cardiovascular capacity, and functional performance. Fitness is
        treated as a tectonic foundation for healthspan.
      </p>
      <button
  onClick={() =>
    setActiveProgram({
      title: "Fitness Programme",
      label: "DARSHAI BODY CONDITIONING",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      description:
        "Build strength, stamina, and confidence with tailored workouts.",
    })
  }
  className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
>
  DISCOVER THE PROTOCOL
  <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
    ⚡
  </span>
</button>

    </div>

    {/* RIGHT IMAGE */}
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
        alt="Fitness"
        className="w-full h-[500px] object-cover rounded-[40px]"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent rounded-[40px]" />

      {/* Bottom Text */}
      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-xs tracking-[0.3em] text-yellow-400 mb-2">
          DARSHAI BODY CONDITIONING
        </p>
        <h3 className="text-2xl md:text-3xl font-serif">
          Fitness Programme
        </h3>
      </div>

      {/* Top Icon */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white">
        ⚡
      </div>
    </div>

  </div>
</section>
{/* ================= LAST SECTION ================= */}
<section className="bg-[#e9e4db] py-28 px-6 md:px-16">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT - IMAGE WITH OVERLAY TEXT */}
    <div className="relative overflow-hidden rounded-[40px]">

      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="Personalised Wellness"
        className="w-full h-[520px] object-cover"
      />

      {/* Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1f6b4f]/90 via-[#1f6b4f]/40 to-transparent" />

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-8 text-white">
        <p className="text-xs tracking-[0.35em] text-yellow-400 mb-2">
          DARSHAI PERSONALISED JOURNEYS
        </p>
        <h2 className="text-3xl md:text-4xl font-serif leading-tight">
          Personalised Wellness <br /> Programmes
        </h2>
      </div>

      {/* Top Right Icon */}
      <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl">
        ⚡
      </div>
    </div>

    {/* RIGHT - SIMPLE TEXT BLOCK */}
    <div>
      <p className="text-yellow-700 italic text-lg mb-4">
        Signature Wellness Journeys
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
        Personalised Wellness Programmes
      </h2>

      <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 text-lg">
        "Designed around your unique needs for holistic transformation."
      </p>
      <button
  onClick={() =>
    setActiveProgram({
      title: "Personalised Wellness Programmes",
      label: "DARSHAI PERSONALISED JOURNEYS",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      description:
        "Designed around your unique needs for holistic transformation.",
    })
  }
  className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
>
  DISCOVER THE PROTOCOL
  <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
    ⚡
  </span>
</button>
    </div>

  </div>
</section>
{/* ===== FULL SCREEN DISCOVER OVERLAY ===== */}
{activeProgram && (
  <div className="fixed inset-0 z-50 bg-[#e9e4db] overflow-y-auto">

    {/* CLOSE BUTTON */}
    <button
      onClick={() => setActiveProgram(null)}
      className="absolute top-6 right-6 text-green-800 text-3xl z-50"
    >
      ✕
    </button>

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-screen px-6 md:px-16 py-20">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={activeProgram.image}
          alt={activeProgram.title}
          className="w-full h-[600px] object-cover rounded-[20px]"
        />
        <div className="absolute inset-0 bg-green-900/30 rounded-[20px]" />
      </div>

      {/* CONTENT */}
      <div>
        <p className="text-xs tracking-[0.3em] text-yellow-700 mb-4">
          {activeProgram.label}
        </p>

        <h2 className="text-5xl md:text-7xl font-serif text-green-800 mb-6">
          {activeProgram.title}
        </h2>

        <p className="border-l-4 border-yellow-600 pl-6 italic text-green-700 text-xl mb-6">
          {activeProgram.description}
        </p>

        <p className="text-green-800/80 text-lg leading-relaxed">
          Full protocol details go here...
        </p>
      </div>

    </div>
  </div>
)}

</div>

  );
}
export default ProgramMain;