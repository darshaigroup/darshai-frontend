// import React from "react";
// import GeoWellnessCenter from "./GeoWellnessCenter";
// import { Link, useParams } from "react-router-dom";
// import treatment1 from "@/assets/images/Treatment7.png";
// import treatment2 from "@/assets/images/Treatment6.png";
// import treatment3 from "@/assets/images/Treatment9.png";
// import treatment4 from "@/assets/images/Treatment8.png";
// import hero from "@/assets/images/MainImg.png";

// const brandGreen = "#1E7A3A";

// const ProgramMain = () => {
//   const [activeProgram, setActiveProgram] = React.useState(null);

//   const { category } = useParams();

//   if (category === "geo-wellness-center") {
//     return <GeoWellnessCenter />;
//   }

//   return (
//     <div className="w-full">
//       {/* ================= HERO ================= */}
//       <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
//         {/* Background */}
//         <img
//           src={hero}
//           alt="wellness"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
//           }}
//         />

//         {/* Content */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
//           <h1 className="text-5xl md:text-7xl font-serif mb-6">
//             Wellness Programmes
//           </h1>

//           <p className="max-w-3xl text-lg md:text-xl text-gray-200 italic">
//             Bio-validated clinical interventions and data-driven wellness
//             journeys for peak human performance.
//           </p>
//         </div>
//       </section>

//       {/* ================= DARSHAI METHOD SECTION ================= */}
//       <section className="bg-[#f6f3ef] py-28 px-6 text-center">
//         {/* Small Label */}
//         <p className="text-xs tracking-[0.35em] text-yellow-700 mb-6">
//           THE DARSHAI METHOD
//         </p>

//         {/* Main Heading */}
//         <h2 className="text-4xl md:text-7xl font-serif leading-tight">
//           <span className="text-green-800">Biologically Optimized</span>

//           <br />

//           <span className="text-yellow-700 italic font-light">journeys.</span>
//         </h2>

//         {/* Sub Text */}
//         <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-green-700 leading-relaxed">
//           We bridge modern clinical precision with ancestral wisdom to architect
//           a version of you that transcends current limitations.
//         </p>
//       </section>
//       {/* ================= REJUVENATION PROGRAMME ================= */}
//       <section className="bg-[#f6f3ef] py-24 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           {/* LEFT IMAGE */}
//           <div className="relative group overflow-hidden rounded-[40px] cursor-pointer">
//             {/* IMAGE */}
//             <img
//               src={treatment1}
//               alt="Rejuvenation"
//               className="
//       w-full h-[500px] object-cover
//       transition-transform duration-[1200ms] ease-out
//       group-hover:scale-110
//     "
//             />

//             {/* GREEN TEXTURE OVERLAY */}
           

//             {/* OPTIONAL DARK DEPTH */}
//             <div
//               className="
//       absolute inset-0 bg-black/10
//       opacity-0 group-hover:opacity-100
//       transition duration-700
//     "
//             />

//             {/* TEXT */}
//             <div
//               className="
//       absolute bottom-6 left-6 text-white
//       transform translate-y-6 opacity-0
//       group-hover:translate-y-0 group-hover:opacity-100
//       transition-all duration-700 ease-out
//     "
//             >
//               <h3 className="text-2xl md:text-3xl font-serif">
//                 Darshai Vital Reset
//               </h3>
//             </div>
//           </div>

//           {/* RIGHT CONTENT */}
//           <div>
//             {/* Small Label */}
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
//                 ⚡
//               </div>
//               <div>
//                 <p className="text-xs tracking-[0.2em] text-yellow-900">
//                   Vitality Focus
//                 </p>
//               </div>
//             </div>

//             {/* Title */}
//             <p className="text-yellow-700 italic text-lg mb-2">
//               Vitality Reset
//             </p>

//             <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
//               Darshai Vital Reset
//             </h2>

//             {/* Quote */}
//             <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
//               "Restore vitality and renew your energy for a balanced life."
//             </p>

//             {/* Description */}
//             <p className="text-green-800/80 leading-relaxed text-lg">
//               The Rejuvenation Programme is a structured therapeutic pathway
//               designed to restore vitality, resilience, and systemic balance by
//               integrating Ayurvedic rasāyana principles with modern wellness
//               practices. It focuses on enhancing cellular repair, strengthening
//               immunity, and regulating biological rhythms through a combination
//               of personalised nutrition, targeted herbal formulations, and
//               restorative therapies. The programme works to reduce fatigue,
//               improve energy levels, and support overall physiological function
//               while incorporating lifestyle coaching to ensure long-term
//               sustainability. It is particularly suited for individuals
//               experiencing stress, burnout, low energy, or age-related decline,
//               offering a comprehensive approach to revitalisation and long-term
//               health optimisation.
//             </p>
//             <button
//               onClick={() =>
//                 setActiveProgram({
//                   title: "Rejuvenation Programme",
//                   label: "DARSHAI VITAL RESET",
//                   image: treatment1,
//                   description:
//                     " The Rejuvenation Programme is a structured therapeutic pathway designed to restore vitality, resilience, and systemic balance by integrating Ayurvedic rasāyana principles with modern wellness practices. It focuses on enhancing cellular repair, strengthening immunity, and regulating biological rhythms through a combination of personalised nutrition, targeted herbal formulations, and restorative therapies. The programme works to reduce fatigue, improve energy levels, and support overall physiological function while incorporating lifestyle coaching to ensure long-term sustainability. It is particularly suited for individuals experiencing stress, burnout, low energy, or age-related decline, offering a comprehensive approach to revitalisation and long-term health optimisation.  ",
//                 })
//               }
//               className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium"
//             >
//               DISCOVER THE PROTOCOL
//               <span className="w-10 h-10 rounded-full border border-green-800 flex items-center justify-center">
//                 ⚡
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>
//       {/* ================= MINDFULNESS PROGRAMME ================= */}
//       <section className="bg-[#f6f3ef] py-24 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           {/* LEFT CONTENT */}
//           <div>
//             {/* Top Label */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
//                 ⚡
//               </div>
//               <div>
//                 <p className="text-xs tracking-[0.2em] text-yellow-700">
//                   Resilience Focus
//                 </p>
//               </div>
//             </div>

//             {/* Subtitle */}
//             <p className="text-yellow-700 italic text-lg mb-2">
//               Inner Stillness
//             </p>

//             {/* Title */}
//             <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
//               Darshai Mind Balance
//             </h2>

//             {/* Quote */}
//             <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
//               "Cultivate calm, clarity, and inner peace through guided
//               practices."
//             </p>

//             {/* Description */}
//             <p className="text-green-800/80 leading-relaxed text-lg">
//               The Mindfulness Programme is designed to cultivate mental clarity,
//               emotional balance, and resilience through structured,
//               evidence-informed practices such as guided meditation, breathwork,
//               and awareness training. It helps regulate the nervous system,
//               reduce stress responses, and enhance focus by building deeper
//               awareness of thought patterns and emotional triggers. Participants
//               learn to respond to challenges with greater balance rather than
//               reactivity, while also gaining practical tools that can be applied
//               in professional and personal environments. This programme supports
//               improved sleep, emotional stability, and cognitive performance,
//               making it well suited for professionals, students, and individuals
//               seeking sustainable mental wellbeing.
//             </p>
//             <button
//               onClick={() =>
//                 setActiveProgram({
//                   title: "Mindfulness Programme",
//                   label: "DARSHAI MIND BALANCE",
//                   image: treatment2,
//                   description:
//                     "The Mindfulness Programme is designed to cultivate mental clarity, emotional balance, and resilience through structured, evidence-informed practices such as guided meditation, breathwork, and awareness training. It helps regulate the nervous system, reduce stress responses, and enhance focus by building deeper awareness of thought patterns and emotional triggers. Participants learn to respond to challenges with greater balance rather than reactivity, while also gaining practical tools that can be applied in professional and personal environments. This programme supports improved sleep, emotional stability, and cognitive performance, making it well suited for professionals, students, and individuals seeking sustainable mental wellbeing.  ",
//                 })
//               }
//               className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
//             >
//               DISCOVER THE PROTOCOL
//               <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
//                 ⚡
//               </span>
//             </button>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative group overflow-hidden rounded-[40px] cursor-pointer">
//             {/* IMAGE */}
//             <img
//               src={treatment2}
//               alt="mindfulness"
//               className="
//       w-full h-[500px] object-cover
//       transition-transform duration-[1200ms] ease-out
//       group-hover:scale-110
//     "
//             />

//             {/* GREEN TEXTURE OVERLAY */}
            

//             {/* OPTIONAL DARK DEPTH */}
//             <div
//               className="
//       absolute inset-0 bg-black/10
//       opacity-0 group-hover:opacity-100
//       transition duration-700
//     "
//             />

//             {/* TEXT */}
//             <div
//               className="
//       absolute bottom-6 left-6 text-white
//       transform translate-y-6 opacity-0
//       group-hover:translate-y-0 group-hover:opacity-100
//       transition-all duration-700 ease-out
//     "
//             >
//               <h3 className="text-2xl md:text-3xl font-serif">
//                 Darshai Vital Reset
//               </h3>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* ================= DETOX PROGRAMME ================= */}
//       <section className="bg-[#f6f3ef] py-24 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           {/* LEFT IMAGE */}
//           <div className="relative group overflow-hidden rounded-[40px] cursor-pointer">
//             {/* IMAGE */}
//             <img
//               src={treatment3}
//               alt="Detox Programme"
//               className="
//       w-full h-[500px] object-cover
//       transition-transform duration-[1200ms] ease-out
//       group-hover:scale-110
//     "
//             />

//             {/* GREEN TEXTURE OVERLAY */}
           

//             {/* OPTIONAL DARK DEPTH */}
//             <div
//               className="
//       absolute inset-0 bg-black/10
//       opacity-0 group-hover:opacity-100
//       transition duration-700
//     "
//             />

//             {/* TEXT */}
//             <div
//               className="
//       absolute bottom-6 left-6 text-white
//       transform translate-y-6 opacity-0
//       group-hover:translate-y-0 group-hover:opacity-100
//       transition-all duration-700 ease-out
//     "
//             >
//               <h3 className="text-2xl md:text-3xl font-serif">
//                 Darshai Vital Reset
//               </h3>
//             </div>
//           </div>

//           {/* RIGHT CONTENT */}
//           <div>
//             {/* Top Label */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
//                 ⚡
//               </div>
//               <div>
//                 <p className="text-xs tracking-[0.2em] text-yellow-700">
//                   Metabolic Focus
//                 </p>
//               </div>
//             </div>

//             {/* Subtitle */}
//             <p className="text-yellow-700 italic text-lg mb-2">Deep Cleanse</p>

//             {/* Title */}
//             <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
//               Darshai Deep Detox
//             </h2>

//             {/* Quote */}
//             <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
//               "Cleanse your system and refresh your body from within."
//             </p>

//             {/* Description */}
//             <p className="text-green-800/80 leading-relaxed text-lg mb-10">
//               The Detox Programme is a targeted intervention focused on
//               optimising metabolism and supporting the body’s natural
//               detoxification processes through a blend of Ayurvedic purification
//               principles and modern nutritional science. It aims to eliminate
//               āma (metabolic toxins), strengthen agni (digestive function), and
//               restore systemic balance using personalised dietary protocols,
//               herbal formulations, and therapeutic practices such as controlled
//               fasting and sweating therapies. This structured approach helps
//               reset internal systems, improve digestion, and enhance metabolic
//               efficiency, leading to better energy levels, clearer skin, and
//               overall physiological balance. It is ideal for individuals dealing
//               with lifestyle-related imbalances, digestive issues, or seasonal
//               transitions.
//             </p>

//             <button
//               onClick={() =>
//                 setActiveProgram({
//                   title: "Detox Programme",
//                   label: "DARSHAI DEEP DETOX",
//                   image: treatment3,
//                   description:
//                     "The Detox Programme is a targeted intervention focused on optimising metabolism and supporting the body’s natural detoxification processes through a blend of Ayurvedic purification principles and modern nutritional science. It aims to eliminate āma (metabolic toxins), strengthen agni (digestive function), and restore systemic balance using personalised dietary protocols, herbal formulations, and therapeutic practices such as controlled fasting and sweating therapies. This structured approach helps reset internal systems, improve digestion, and enhance metabolic efficiency, leading to better energy levels, clearer skin, and overall physiological balance. It is ideal for individuals dealing with lifestyle-related imbalances, digestive issues, or seasonal transitions.  .",
//                 })
//               }
//               className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
//             >
//               DISCOVER THE PROTOCOL
//               <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
//                 ⚡
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>
//       {/* ================= FITNESS PROGRAMME ================= */}
//       <section className="bg-[#f6f3ef] py-24 px-6 md:px-16">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           {/* LEFT CONTENT */}
//           <div>
//             {/* Top Label */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">
//                 🛡️
//               </div>
//               <div>
//                 <p className="text-xs tracking-[0.2em] text-yellow-700">
//                   Performance Focus
//                 </p>
//               </div>
//             </div>

//             {/* Subtitle */}
//             <p className="text-yellow-700 italic text-lg mb-2">
//               Signature Wellness Journeys
//             </p>

//             {/* Title */}
//             <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight mb-6">
//              Darshai Personalised Journey
//             </h2>

//             {/* Quote */}
//             <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
//               "Build strength, stamina, and confidence with tailored workouts."
//             </p>

//             {/* Description */}
//             <p className="text-green-800/80 leading-relaxed text-lg">
//               Personalised Wellness Programmes provide a comprehensive,
//               data-driven approach to health optimisation by tailoring
//               interventions to each individual’s unique profile. Combining
//               Ayurvedic diagnostics with biomarker analysis and lifestyle
//               insights, these programmes address constitution, current
//               imbalances, and personal health goals through integrated
//               strategies across nutrition, stress management, movement, and
//               detoxification. Continuous monitoring and refinement ensure that
//               the programme evolves in response to measurable progress,
//               delivering precise and adaptive care. This approach supports
//               improved systemic balance, enhanced resilience, and sustainable
//               wellbeing, making it ideal for individuals seeking a customised
//               and outcome-oriented health journe
//             </p>
//             <button
//               onClick={() =>
//                 setActiveProgram({
//                   title: "Darshai Personalised Journey",
//                   label: "DARSHAI PERSONALISED JOURNEY",
//                   subtitle: "Signature Wellness Journeys",
//                   quote:
//                     "Designed around your unique needs for holistic transformation.",
//                   image: treatment4,
//                   description:
//                     "Personalised Wellness Programmes provide a comprehensive, data-driven approach to health optimisation by tailoring interventions to each individual’s unique profile.",
//                   details:
//                     "Combining Ayurvedic diagnostics with biomarker analysis and lifestyle insights, these programmes address constitution, current imbalances, and personal health goals through integrated strategies across nutrition, stress management, movement, and detoxification. Continuous monitoring and refinement ensure that the programme evolves in response to measurable progress, delivering precise and adaptive care. This approach supports improved systemic balance, enhanced resilience, and sustainable wellbeing, making it ideal for individuals seeking a customised and outcome-oriented health journey.",
//                 })
//               }
//               className="mt-10 flex items-center gap-4 text-green-800 tracking-[0.3em] font-medium hover:text-yellow-700 transition"
//             >
//               DISCOVER THE PROTOCOL
//               <span className="w-10 h-10 border border-green-800 rounded-full flex items-center justify-center">
//                 ⚡
//               </span>
//             </button>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative group overflow-hidden rounded-[40px] cursor-pointer">
//             {/* IMAGE */}
//             <img
//               src={treatment4}
//               alt="personalised wellness"
//               className="
//       w-full h-[500px] object-cover
//       transition-transform duration-[1200ms] ease-out
//       group-hover:scale-110
//     "
//             />

//             {/* GREEN TEXTURE OVERLAY */}
            

//             {/* OPTIONAL DARK DEPTH */}
//             <div
//               className="
//       absolute inset-0 bg-black/10
//       opacity-0 group-hover:opacity-100
//       transition duration-700
//     "
//             />

//             {/* TEXT */}
//             <div
//               className="
//       absolute bottom-6 left-6 text-white
//       transform translate-y-6 opacity-0
//       group-hover:translate-y-0 group-hover:opacity-100
//       transition-all duration-700 ease-out
//     "
//             >
//               <h3 className="text-2xl md:text-3xl font-serif">
//                 Darshai Vital Reset
//               </h3>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== FULL SCREEN DISCOVER OVERLAY ===== */}
//       {/* ===== PREMIUM CARD MODAL ===== */}
//       {activeProgram && (
//         <div className="fixed inset-0 z-50 bg-green-700 overflow-y-auto px-4 py-10">
//           <div className="min-h-full flex items-center justify-center">
//             <div className="max-w-5xl w-full bg-[#f6f3ef] rounded-[40px] overflow-hidden grid md:grid-cols-2 shadow-[0_50px_120px_rgba(0,0,0,0.4)] relative max-h-[90vh] md:max-h-none">
//               {/* CLOSE */}
//               <button
//                 onClick={() => setActiveProgram(null)}
//                 className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-200 text-green-800 flex items-center justify-center z-10"
//               >
//                 ✕
//               </button>

//               {/* LEFT IMAGE */}
//               <div className="relative">
//                 <img
//                   src={activeProgram.image}
//                   alt={activeProgram.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* RIGHT CONTENT */}
//               <div className="p-6 md:p-14 overflow-y-auto">
//                 <p className="text-xs tracking-[0.3em] text-yellow-700 mb-4">
//                   {activeProgram.label}
//                 </p>

//                 <h2 className="text-3xl md:text-5xl font-serif text-green-800 mb-6">
//                   {activeProgram.title}
//                 </h2>

//                 {activeProgram.subtitle && (
//                   <p className="text-yellow-700 italic text-lg mb-4">
//                     {activeProgram.subtitle}
//                   </p>
//                 )}

//                 {activeProgram.quote && (
//                   <p className="border-l-4 border-yellow-600 pl-4 italic text-green-700 mb-6">
//                     {activeProgram.quote}
//                   </p>
//                 )}

//                 <p className="text-green-800/80 leading-relaxed text-sm mb-8">
//                   {activeProgram.description}
//                 </p>

//                 {(activeProgram.focus || activeProgram.protocol) && (
//                   <div className="flex justify-between text-xs text-green-700 mb-8">
//                     <div>
//                       <p className="tracking-[0.2em] text-gray-500">
//                         PROGRAMME FOCUS
//                       </p>
//                       <p>{activeProgram.focus}</p>
//                     </div>

//                     <div>
//                       <p className="tracking-[0.2em] text-gray-500">
//                         CLINICAL PROTOCOL
//                       </p>
//                       <p>{activeProgram.protocol}</p>
//                     </div>
//                   </div>
//                 )}

//                 <Link to="/register">
//                   <button className="bg-green-700 text-white px-8 py-3 rounded-lg w-full md:w-auto">
//                     Confirm Registration
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProgramMain;


import { useNavigate } from "react-router-dom";

import hero from "@/assets/images/MainImg.png";

import { programData } from "./programData";

export default function ProgramMain() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f6f3ef] min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative h-[65vh] overflow-hidden">

        {/* IMAGE */}
        <img
          src={hero}
          alt="Wellness"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">

          <p className="text-[11px] tracking-[0.4em] uppercase text-[#C9A75B] mb-6">
            DARSHAI PROGRAMMES
          </p>

          <h1 className="text-[48px] md:text-[90px] leading-[0.95] tracking-[-0.04em] font-serif mb-8">
            Wellness Programmes
          </h1>

          <p className="text-lg md:text-2xl text-white/80 leading-[1.9] max-w-4xl">
            Precision longevity interventions engineered for biological restoration.
          </p>

        </div>

      </section>

      {/* INTRO */}
      <section className="py-28 px-6 text-center">

        <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A75B] mb-6">
          THE DARSHAI METHOD
        </p>

        <h2 className="text-[42px] md:text-[82px] leading-[0.95] tracking-[-0.04em] font-serif text-[#1E7A3A] mb-10">
          Biologically
          <br />
          Optimized Journeys
        </h2>

        <p className="max-w-4xl mx-auto text-lg md:text-2xl leading-[1.9] text-[#1E7A3A]/75">
          We bridge modern clinical precision with ancestral wellness intelligence
          to architect restorative programmes that recalibrate biology,
          resilience, and long-term vitality.
        </p>

      </section>

      {/* PROGRAM CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="grid md:grid-cols-2 gap-10">

          {programData.map((item, i) => (

            <div
              key={i}
              className="
                group
                relative

                h-[700px]

                rounded-[42px]
                overflow-hidden

                bg-black

                shadow-[0_40px_120px_rgba(0,0,0,0.12)]

                cursor-pointer
              "
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full
                  h-full
                  object-cover

                  scale-[1.02]

                  transition-all
                  duration-[1800ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  group-hover:scale-110
                "
              />

              {/* BLUE OVERLAY */}
              <div
                className="
                  absolute
                  inset-0

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-700
                "
                style={{
                  background:
                    "linear-gradient(to top, rgba(23,78,166,0.94), rgba(23,78,166,0.55), rgba(0,0,0,0.15), transparent)",
                }}
              />

              {/* DEPTH */}
              <div
                className="
                  absolute
                  inset-0

                  bg-black/20

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-700
                "
              />

              {/* TOP LABEL */}
              <div
                className="
                  absolute
                  top-8
                  left-8

                  z-20

                  px-5
                  py-2

                  rounded-full

                  bg-white/10
                  backdrop-blur-xl

                  border
                  border-white/10

                  opacity-0
                  translate-y-4

                  group-hover:opacity-100
                  group-hover:translate-y-0

                  transition-all
                  duration-700
                "
              >

                <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A75B]">
                  {item.tag}
                </p>

              </div>

              {/* CONTENT */}
              <div
                className="
                  absolute
                  inset-0

                  z-20

                  flex
                  flex-col
                  items-center
                  justify-center

                  text-center

                  px-10
                "
              >

                <div
                  className="
                    max-w-2xl

                    transform
                    translate-y-20

                    opacity-0

                    group-hover:translate-y-0
                    group-hover:opacity-100

                    transition-all
                    duration-700
                    ease-out
                  "
                >

                  {/* TITLE */}
                  <h2
                    className="
                      text-4xl
                      md:text-5xl

                      font-serif
                      leading-[1.05]

                      text-white

                      mb-6
                    "
                  >
                    {item.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-white/85

                      leading-[1.9]

                      text-[16px]
                      md:text-[17px]

                      mb-10

                      max-w-xl
                      mx-auto
                    "
                  >
                    {item.description}
                  </p>

                  {/* BUTTON */}
                  <div className="flex justify-center">

                    <button
                      onClick={() => navigate(`/program/${item.slug}`)}
                      className="
                        relative

                        inline-flex
                        items-center
                        justify-center

                        overflow-hidden

                        px-10
                        py-5

                        rounded-full

                        border
                        border-white/20

                        bg-white/10
                        backdrop-blur-2xl

                        shadow-[0_20px_60px_rgba(0,0,0,0.18)]

                        text-white

                        text-[11px]
                        md:text-[12px]

                        tracking-[0.38em]
                        uppercase

                        font-medium
                      "
                    >

                      {/* GOLD GLOW */}
                      <div
                        className="
                          absolute
                          inset-0

                          opacity-40

                          rounded-full
                        "
                        style={{
                          background:
                            "linear-gradient(to right, rgba(201,167,91,0.18), rgba(255,255,255,0.02), rgba(201,167,91,0.12))",
                        }}
                      />

                      {/* TEXT */}
                      <span className="relative z-10">
                        Discover Protocol
                      </span>

                    </button>

                  </div>

                </div>

              </div>

              {/* GLOW */}
              <div
                className="
                  absolute
                  -bottom-20
                  left-1/2
                  -translate-x-1/2

                  w-[70%]
                  h-32

                  bg-[#174EA6]/30

                  blur-[100px]

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-700
                "
              />

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}