import React from "react";
import {Link,useNavigate} from "react-router-dom";
import {useState,useRef,useEffect} from "react";
import {motion,AnimatePresence} from "framer-motion";
import {ChevronLeft,ChevronRight} from "lucide-react";
import bg2 from "@/assets/images/bg2.png";
import bg7 from "@/assets/images/bg7.png";
import bg3 from "@/assets/images/bg3.png";
import bg8 from "@/assets/images/bg8.png";
import sover from "@/assets/images/health.jpeg";
import corporate from "@/assets/images/nature.jpeg";
import maintenance from "@/assets/images/maintenance.png";
import prepkit from "@/assets/images/prepkit.png";
import precision from "@/assets/images/precision.png";
import environment from "@/assets/images/environment.png";
import ceo from "@/assets/images/ceo.webp";
import yoga from "@/assets/images/yoga1.png";

const SLIDES=[
  {image:bg2,title:"Your Journey to Strategic Health Autonomy",desc:"We combine biology, wellness, and environment to create personalized experiences that support recovery, balance, and long-term wellbeing"},
  {image:bg7,title:"From Health Management to Biological Wellness",desc:"Move beyond guesswork with personalised wellness insights that align your health, environment, and recovery journey"},
  {image:bg8,title:"Personalized Wellness Guided by Biology and Environment",desc:"We combine biological insights and environmental wellness to help individuals improve recovery, resilience, and long-term wellbeing through personalized wellness experiences"},
];

function HomeMain(){
  const navigate=useNavigate();
  const [current,setCurrent]=useState(0);
  const sliderRef=useRef(null);

  useEffect(()=>{
    const interval=setInterval(()=>setCurrent(prev=>(prev+1)%SLIDES.length),6000);
    return()=>clearInterval(interval);
  },[]);

  const scrollLeft=()=>sliderRef.current?.scrollBy({left:-420,behavior:"smooth"});
  const scrollRight=()=>sliderRef.current?.scrollBy({left:420,behavior:"smooth"});

  const ecosystem=[
    {title:"Precision Assessment",desc:"AI-powered biological, lifestyle, and environmental analysis to identify the root causes of health decline",img:sover,delay:1.4},
    {title:"Sovereign Protocols",desc:"Personalized Geo-Wellness interventions delivered through curated wellness destinations and evidence-based therapeutic protocols",img:corporate,delay:1.6},
    {title:"Longevity Concierge",desc:"Continuous support, monitoring, accountability, and optimization beyond the retreat experience",img:maintenance,delay:1.8},
    {title:"Corporate Longevity",desc:"Executive recovery programs, workforce resilience, and workplace health optimization",img:prepkit,delay:2},
    {title:"Longevity Intelligence",desc:"Protocol Efficacy Score (PES), health analytics, progress tracking, and biological outcome measurement.",img:precision,delay:2.2},
    {title:"The DARSHAI Collective",desc:"A global network of wellness centers, longevity experts, innovators, and health-conscious individuals.",img:environment,delay:2.4},
  ];

  return <div>

    {/* HERO */}
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={current} className="absolute inset-0" initial={{opacity:0,scale:1.1}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.05}} transition={{duration:1.5,ease:[.19,1,.22,1]}}>
          <img src={SLIDES[current].image} alt={SLIDES[current].title} className="w-full h-full object-cover object-center"/>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"/>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-5 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-60}} transition={{duration:.8}} className="max-w-5xl">
            <h1 className="text-[42px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[90px] font-serif text-white mb-7 sm:mb-8 leading-[1.05]">{SLIDES[current].title}</h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-9 sm:mb-12 leading-7">{SLIDES[current].desc}</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link to="/register"><button className="px-8 sm:px-10 py-4 bg-amber-500 text-white rounded-full tracking-widest text-xs sm:text-sm hover:bg-amber-600 transition">Begin Your Clinical Assessment</button></Link>
              <Link to="/geo-wellness-centres"><button className="text-white hover:text-amber-400 transition">Explore the Geo-Wellness Zones →</button></Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_,i)=><button key={i} onClick={()=>setCurrent(i)} aria-label={`Slide ${i+1}`} className={`h-2 rounded-full transition-all duration-500 ${current===i?"w-10 bg-amber-400":"w-4 bg-white/40"}`}/>)}
      </div>
    </section>

    {/* PHILOSOPHY */}
    <section className="relative w-full py-20 sm:py-24 md:py-32 bg-green-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-16 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-100px"}} transition={{duration:1.2,ease:[.19,1,.22,1]}}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-yellow-400 mb-6 leading-tight">Reclaim Your Biological Sovereignty.</h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 leading-7 max-w-xl">Modern life has made health more complicated than ever. DARSHAI simplifies it by combining the intelligence of Ayurveda, advanced health assessments, and carefully curated wellness environments. Every recommendation, retreat, and protocol is designed to help you restore balance, build resilience, and create a foundation for long-term vitality. This is not wellness tourism. This is precision-guided longevity.</p>
          <button onClick={()=>navigate("/philosophy")} className="group flex items-center gap-2 text-yellow-400 text-sm sm:text-base md:text-lg font-semibold">Explore the Philosophy <span className="group-hover:translate-x-2 transition-transform">→</span></button>
        </motion.div>

        <motion.div initial={{opacity:0,scale:1.05}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1.2,ease:[.19,1,.22,1]}} className="flex justify-center lg:justify-end relative">
          <div className="group relative w-[250px] sm:w-[280px] md:w-[360px] h-[320px] sm:h-[360px] md:h-[460px] rounded-[28px] sm:rounded-[30px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.3)]">
            <img src={bg3} alt="Geo Wellness" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"/>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700" style={{background:"linear-gradient(to top,rgba(23,78,166,.92),rgba(23,78,166,.45),rgba(0,0,0,.08),transparent)"}}/>
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-[#174EA6]/35 blur-[90px] opacity-0 group-hover:opacity-100 transition-all duration-700"/>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ECOSYSTEM */}
    <section className="bg-[#f3efe8] py-20 sm:py-24 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start mb-14 sm:mb-20" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}>
          <div className="text-center md:text-left">
            <p className="text-xs sm:text-sm tracking-widest text-amber-500 mb-5 sm:mb-6">THE ECOSYSTEM</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-green-800 leading-tight">The DARSHAI Longevity Ecosystem</h2>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full">
        <button onClick={scrollLeft} className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_10px_40px_rgba(59,130,246,.25)] hover:bg-blue-500/20 transition-all duration-500"><ChevronLeft size={28}/></button>
        <button onClick={scrollRight} className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_10px_40px_rgba(59,130,246,.25)] hover:bg-blue-500/20 transition-all duration-500"><ChevronRight size={28}/></button>

        <div ref={sliderRef} className="w-full overflow-x-auto scroll-smooth scrollbar-hide lg:overflow-hidden">
          <div className="flex gap-6 sm:gap-8 px-5 sm:px-6 md:px-12 w-max snap-x snap-mandatory pb-4">
            {ecosystem.map((item,i)=><motion.div key={i} className="group min-w-[280px] sm:min-w-[320px] md:min-w-[380px] w-[280px] sm:w-[320px] md:w-[380px] h-[430px] sm:h-[500px] relative rounded-[28px] sm:rounded-[36px] overflow-hidden flex-shrink-0 snap-start border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.25)] transition-all duration-700 hover:scale-[1.03]" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,delay:item.delay}}>
            <motion.img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" initial={{scale:1.05}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1,delay:item.delay}}/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#021B33]/95 via-[#0A3D62]/40 to-[#2563EB]/10 opacity-80 group-hover:opacity-100 transition-all duration-700"/>
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 opacity-0 translate-y-16 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">{item.title}</h3>
              <p className="text-xs sm:text-sm text-blue-100/80 leading-7">{item.desc}</p>
            </div>
          </motion.div>)}
          </div>
        </div>
      </div>
    </section>

    {/* VISIONARY */}
    <section className="relative w-full bg-gradient-to-br from-[#1E7A3A] via-[#176B3A] to-[#123C2A] py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#C9A75B]/10 blur-[120px]"/>
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#174EA6]/20 blur-[120px]"/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-[1fr_.75fr] gap-12 sm:gap-16 lg:gap-20 items-center">

          {/* CONTENT */}
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.2}} transition={{duration:.9,ease:[.16,1,.3,1]}}>

            <p className="text-[8px] sm:text-[10px] tracking-[.3em] uppercase text-[#C9A75B] mb-5 sm:mb-6">
              THE VISIONARY
            </p>

            <h2 className="text-[42px] sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[82px] font-serif leading-[.95] tracking-[-.04em] text-white mb-8 sm:mb-10">
              Architecting
              <br/>
              <span className="italic text-[#C9A75B]">Biological</span>
              <br/>
              <span className="italic text-[#C9A75B]">Sovereignty.</span>
            </h2>

            <div className="relative border-l border-[#C9A75B]/60 pl-5 sm:pl-7 mb-8 sm:mb-10 max-w-2xl">
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#C9A75B]"/>
              <p className="text-base sm:text-lg md:text-xl italic text-white/90 leading-7 sm:leading-8">
                “Health is not a luxury you purchase. It is a biological sovereignty you reclaim through intelligence, environment, and precision.”
              </p>
            </div>

            <div className="mb-7 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-1">
                Veekshitha V
              </h3>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[.25em] uppercase text-[#C9A75B]">
                Founder & CEO, DARSHAI Geo-Wellness
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl">
              {[
                "Creator of the Geo-Wellness Framework",
                "Building India's First AI-Native Geo-Wellness Platform",
                "Bridging wellness wisdom with environmental intelligence"
              ].map((item,i)=><motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:i*.12}} className="rounded-2xl border border-white/10 bg-white/[.05] backdrop-blur-xl p-4 sm:p-5">
                <span className="block text-[#C9A75B] text-sm mb-3">0{i+1}</span>
                <p className="text-[11px] sm:text-xs text-white/70 leading-5">{item}</p>
              </motion.div>)}
            </div>

            <div className="space-y-5 sm:space-y-6 max-w-2xl">
              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-7 sm:leading-8">
                Veekshitha founded DARSHAI with a simple belief: health cannot be understood through biology alone. The environments in which people live, work, recover, and heal play an equally important role in shaping long-term well-being.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-7 sm:leading-8">
                Today, DARSHAI is pioneering <strong className="text-white font-medium">Geo-Wellness</strong> — a new approach that connects environmental intelligence, wellness science, and personalized health journeys to help individuals make more informed decisions about where they heal, recover, and thrive.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl font-serif italic text-[#C9A75B] leading-7 sm:leading-8">
                The future of health is not only understanding who you are. It is understanding where you are.
              </p>
              <p className="mt-6 text-xs sm:text-sm text-white/50">Regards,</p>
              <p className="mt-1 text-sm sm:text-base text-white/85 font-medium">Veekshitha V</p>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div initial={{opacity:0,x:50,scale:.96}} whileInView={{opacity:1,x:0,scale:1}} viewport={{once:true,amount:.2}} transition={{duration:1,ease:[.16,1,.3,1]}} className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-5 sm:-inset-8 rounded-[40px] bg-[#C9A75B]/10 blur-3xl"/>
            <div className="group relative w-full max-w-[360px] sm:max-w-[420px] h-[480px] sm:h-[560px] md:h-[620px] rounded-[30px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-[0_35px_100px_rgba(0,0,0,.3)]">
              <motion.img src={ceo} alt="Veekshitha V, Founder and CEO of DARSHAI Geo-Wellness" className="w-full h-full object-cover object-center transition-transform duration-[1400ms] group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C2A]/80 via-transparent to-transparent"/>
              <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C9A75B] animate-pulse"/>
                  <span className="text-[8px] sm:text-[9px] tracking-[.25em] uppercase text-white/80">Founder & CEO</span>
                </div>
                <p className="mt-2 text-lg sm:text-xl font-serif text-white">Veekshitha V</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

    {/* CTA SECTION */}
      <section className="relative w-full min-h-[720px] sm:min-h-[760px] md:min-h-screen flex items-center justify-center text-center overflow-hidden bg-black">
  {/* BACKGROUND IMAGE */}
  <motion.div
    initial={{opacity:0,scale:1.05}}
    animate={{opacity:1,scale:1}}
    transition={{duration:1.5,ease:[.19,1,.22,1],delay:.5}}
    className="absolute inset-0 flex items-center justify-center"
  >
    <img
      src={yoga}
      alt="Meditation"
      className="w-full h-full object-cover object-center"
    />

    {/* CINEMATIC OVERLAY */}
    <div className="absolute inset-0 bg-black/55 shadow-[0_50px_120px_rgba(0,0,0,.4)]"/>
  </motion.div>

  {/* CONTENT */}
  <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 py-20 sm:py-24 md:py-0 md:mb-14">

    {/* HEADING */}
    <motion.h2
      initial={{opacity:0,y:40}}
      animate={{opacity:1,y:0}}
      transition={{duration:1,ease:[.19,1,.22,1],delay:.8}}
      className="text-[34px] sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 sm:mb-8 leading-[1.05]"
    >
      The End of Reactive Health
    </motion.h2>

    {/* SUBTEXT */}
    <motion.p
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      transition={{duration:1,ease:[.19,1,.22,1],delay:1.1}}
      className="text-[15px] sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-7 sm:leading-relaxed"
    >
      Your biology deserves more than generic wellness.
    </motion.p>

    <motion.p
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      transition={{duration:1,ease:[.19,1,.22,1],delay:1.2}}
      className="text-[15px] sm:text-lg md:text-xl text-white/80 mb-7 sm:mb-8 max-w-2xl mx-auto leading-7 sm:leading-relaxed"
    >
      DARSHAI combines biological intelligence, environmental precision, and evidence-based longevity interventions to help high-performing individuals restore resilience, elevate performance, and build long-term health sovereignty.
    </motion.p>

    {/* BUTTON */}
    <Link to="/register">
      <motion.button
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:1,ease:[.19,1,.22,1],delay:1.4}}
        className="w-[calc(100%-24px)] sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-amber-500 text-white rounded-full text-[11px] sm:text-sm tracking-[.12em] sm:tracking-widest font-semibold hover:bg-amber-600 hover:scale-105 transition-all shadow-xl"
      >
        Begin Your Sovereign Journey
      </motion.button>
    </Link>
  </div>

  {/* FOOTER BLEND */}
  <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-40 bg-gradient-to-b from-transparent to-[#f3efe8]"/>
</section>

    <section className="bg-[#f3efe8] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6"><div className="h-px bg-[#1E7A3A]/10"/></div>
    </section>
  </div>;
}

export default HomeMain;