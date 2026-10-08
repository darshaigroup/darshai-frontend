import hero from "@/assets/images/MainImg.png";
import bg4 from "@/assets/images/bg4.png";
import herb from "@/assets/images/herb.jpg";
import Protocol from "./protocol.jsx";
import doctor from "@/assets/images/doctor.jpeg";
import ceo1 from "@/assets/images/ceo1.jpeg";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

const brandGreen="#1E7A3A";

const PHILOSOPHY_DATA=[
  {tag:"THE DISCONNECTION",title:"The Reality of Modern Living",text:"In a world driven by constant connectivity, performance pressure, and information overload, many individuals experience chronic stress, burnout, poor recovery, and declining health. Modern lifestyles often disconnect us from the biological rhythms that support resilience, clarity, and long-term vitality. DARSHAI exists to help individuals reconnect with their health through personalized wellness guidance, sustainable lifestyle practices, and evidence-informed Retreat interventions."},
  {tag:"THE SYNTHESIS",title:"A Smarter Way to Wellness",text:"DARSHAI was founded on a simple belief: The future of wellness lies in combining ancient healing wisdom with modern scientific understanding. By integrating wellness intelligence, technology, and personalized guidance, we help individuals better understand their health, make informed decisions, and build sustainable habits that support long-term well-being."},
  {tag:"THE GEO-BIOTIC MAP",title:"Healing Through Environment",text:"At DARSHAI, we recognize that the environment influences human health. By combining wellness insights, health data, and carefully selected natural settings, we help individuals discover experiences that support recovery, mental clarity, resilience, and overall well-being. From coastal landscapes and forest ecosystems to mountain environments, DARSHAI guides individuals toward destinations aligned with their wellness goals."},
  {tag:"THE SOVEREIGN PROTOCOLS",title:"Our Wellness Approach",text:"At DARSHAI, wellness is not a one-size-fits-all experience. We combine health insights, personalized guidance, and curated wellness programs to help individuals improve recovery, resilience, lifestyle quality, and long-term well-being. Every journey is designed to support meaningful and sustainable transformation through a personalized approach to health."},
];

const LEADERS=[
  {
    name:"Veekshitha V",
    role:"Founder & CEO",
    title:"The Visionary",
    desc:`Leading DARSHAI's vision to build a globally recognized Geo-Wellness and longevity platform that combines environment, wellness and technology into measurable health outcomes.
Her focus is creating scalable systems that help individuals make better health decisions through personalized interventions and curated wellness ecosystems.`,
  },
  {
    name:"Dr. Renjith N Raj",
    role:"Consultant – Clinical Logic & Wellness Protocol Development",
    title:"The Clinical Intelligence",
    desc:`Responsible for the clinical intelligence behind DARSHAI's assessment frameworks, Geo-Wellness recommendation logic and personalized wellness protocols.
His work bridges traditional Ayurvedic principles, environmental health science and modern longevity thinking to create evidence-informed interventions.`,
  },
];

const OurStory=()=>{
  const sectionRef=useRef(null);
  const {scrollYProgress}=useScroll({target:sectionRef,offset:["start start","end end"]});
  const imageScale=useTransform(scrollYProgress,[0,1],[1.1,1]);
  const imageY=useTransform(scrollYProgress,[0,1],[0,-80]);

  return <div className="bg-[#f6f3ef] text-gray-800 overflow-hidden">
    <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
      <img src={hero} alt="hero" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0" style={{background:"linear-gradient(to top right,rgba(30,122,58,.82),rgba(23,78,166,.55),rgba(0,0,0,.45))"}}/>
      <div className="relative z-10 text-white max-w-3xl px-6">
        <div className="mb-6 flex justify-center"><span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">THE GENESIS</span></div>
        <h1 className="text-[42px] md:text-[72px] font-serif mb-6 leading-[1.05] tracking-[-.02em]">Why DARSHAI Exists</h1>
        <p className="text-lg opacity-90 font-light">Bridging 5,000 years of wisdom with 21st-century biomarker science.</p>
      </div>
    </section>

    <section className="relative bg-[#f6f3ef] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <p className="text-xs tracking-[4px] text-yellow-700 mb-5 uppercase">THE PHILOSOPHY</p>
          <h2 className="text-[42px] md:text-[72px] leading-[1.05] font-serif max-w-5xl mx-auto" style={{color:brandGreen}}>Reclaiming Sovereignty</h2>
        </div>

        <div className="relative flex justify-center mb-32">
          <div className="absolute w-[70%] h-[70%] bg-blue-900/10 blur-[140px] rounded-full"/>
          <motion.div initial={{opacity:0,y:80,scale:.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}} transition={{duration:1.4,ease:[.16,1,.3,1]}} className="relative w-full max-w-6xl rounded-[42px] overflow-hidden shadow-[0_60px_140px_rgba(0,0,0,.18)]">
            <motion.img style={{scale:imageScale,y:imageY}} src={bg4} alt="wellness" className="w-full h-[320px] md:h-[720px] object-cover"/>
            <div className="absolute inset-0" style={{background:"linear-gradient(to top right,rgba(23,78,166,.92),rgba(23,78,166,.68),rgba(8,15,35,.58),rgba(0,0,0,.38))"}}/>
            <div className="absolute inset-0 ring-1 ring-white/10 rounded-[42px]"/>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-blue-900/20 blur-[100px]"/>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto space-y-32">
          {PHILOSOPHY_DATA.map((item,i)=><motion.div key={i} initial={{opacity:0,y:80}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.25}} transition={{duration:1,ease:[.16,1,.3,1]}} className="relative">
            <div className="absolute -left-8 -top-12 text-[80px] md:text-[140px] font-serif text-[#174ea6]/[.05] pointer-events-none">0{i+1}</div>
            <p className="text-xs tracking-[4px] text-yellow-700 mb-6 uppercase relative z-10">{item.tag}</p>
            <h3 className="text-3xl md:text-6xl leading-[1.08] font-serif mb-10 relative z-10" style={{color:brandGreen}}>{item.title}</h3>
            <p className="text-lg md:text-xl leading-[2.1] text-[#1E7A3A]/75 border-l border-blue-700/20 pl-8 italic relative z-10">{item.text}</p>
            {i===PHILOSOPHY_DATA.length-1&&<div className="pt-16 border-t border-[#174ea6]/10 mt-16">
              <p className="text-2xl italic text-yellow-700 mb-4">"This is not an escape from life."</p>
              <p className="text-3xl md:text-5xl font-serif italic leading-tight" style={{color:"rgba(30,122,58,.9)"}}>This is the mastery of life.</p>
            </div>}
          </motion.div>)}
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-6"><p className="text-xs tracking-[3px] text-yellow-700">OUR LEADERS</p></div>
      <h2 className="text-[42px] md:text-[72px] font-serif text-center mb-20" style={{color:brandGreen}}>The Minds Behind DARSHAI</h2>

      <div className="grid md:grid-cols-2 gap-16">
        {LEADERS.map((person,i)=><div key={i} className="group">
          <div className="rounded-[40px] overflow-hidden relative shadow-xl">
            <img src={person.name==="Veekshitha V"?ceo1:doctor} alt={person.name} className="w-full h-[900px] object-cover group-hover:scale-110 transition-all duration-[1200ms]"/>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700" style={{background:"linear-gradient(to top,rgba(23,78,166,.92),rgba(23,78,166,.45),transparent)"}}/>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="text-2xl font-serif">{person.name}</h4>
              <p className="text-xs tracking-[4px] text-yellow-400">{person.role}</p>
            </div>
          </div>
          <div className="mt-6 px-2">
            <p className="text-xs text-center tracking-[4px] text-yellow-700 mb-3 uppercase">{person.title}</p>
            <p className="text-[#1E7A3A]/70 leading-relaxed whitespace-pre-line text-sm md:text-base">{person.desc}</p>
          </div>
        </div>)}
      </div>
    </section>

   <section className="max-w-5xl mx-auto px-6 pb-24">
      <div className="rounded-[40px] overflow-hidden relative shadow-[0_50px_120px_rgba(0,0,0,.4)]">
        <img src={herb} alt="herb" className="w-full h-[620px] md:h-[600px] object-cover"/>
        <div className="absolute inset-0" style={{backgroundColor:brandGreen,opacity:.85}}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 py-12">
          <div className="mb-5 flex justify-center">
            <span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 uppercase">
              Our North Star
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[52px] font-serif leading-[1.12] max-w-4xl">
            To help individuals reclaim biological resilience, improve long-term health outcomes and make more informed wellness decisions through personalized Geo-Wellness and longevity intelligence.
          </h2>
          <p className="mt-5 text-sm md:text-lg leading-7 text-white/80 max-w-2xl">
            DARSHAI exists to bridge ancient wisdom, environmental intelligence and modern technology to create measurable improvements in human well-being.
          </p>
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
      <h3 className="text-3xl font-serif text-yellow-700">Bio-Luxury</h3>
      <p className="text-xs tracking-[4px] text-yellow-600 mt-2">A NEW CATEGORY</p>
    </div>
    <Protocol/>
  </div>;
};
export default OurStory;