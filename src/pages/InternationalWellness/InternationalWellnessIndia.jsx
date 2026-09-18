import {useEffect,useRef,useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";
import {ArrowUpRight,CheckCircle2,ChevronLeft,ChevronRight,Compass,Waves,Trees,Mountain,Sparkles} from "lucide-react";

const PhoneInput=PhoneInputModule.default||PhoneInputModule;

const IMG={
  hero:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop",
  india:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop",
  private:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop",
  executive:"https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2525&auto=format&fit=crop",
  difference:[
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2670&auto=format&fit=crop"
  ],
  centres:[
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2674&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2650&auto=format&fit=crop"
  ],
  goals:[
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512290900672-1f55b0a3bd2c?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620&auto=format&fit=crop"
  ]
};

const GOALS=[
  {id:"executive",title:"Executive Wellness",description:"For founders, business owners and leaders.",tag:"LEADERSHIP RESTORATION",accent:"#C6A75E",icon:"◈"},
  {id:"stress",title:"Stress & Burnout Recovery",description:"For mental and physical recovery.",tag:"NERVOUS SYSTEM RESET",accent:"#1E7A3A",icon:"◌"},
  {id:"sleep",title:"Sleep & Recovery",description:"For rest and restoration.",tag:"CIRCADIAN REALIGNMENT",accent:"#3B6E8C",icon:"☾"},
  {id:"ayurveda",title:"Ayurveda Wellness",description:"Traditional wellness experiences.",tag:"CLASSICAL PANCHAKARMA",accent:"#2D6A4F",icon:"✦"},
  {id:"rejuvenation",title:"Rejuvenation",description:"Reset and recharge.",tag:"PRANIC REVITALIZATION",accent:"#C6A75E",icon:"✧"},
  {id:"ageing",title:"Healthy Ageing",description:"Long-term vitality and wellness.",tag:"CELLULAR LONGEVITY",accent:"#1E7A3A",icon:"♡"}
];

const WHY=[
  {label:"GOAL",context:"Your physiological, mental, or restorative intent."},
  {label:"PROGRAM",context:"Authentic physician-supervised wellness and restorative protocols."},
  {label:"DURATION",context:"Optimized timelines from focused 7-day resets to deeper 21-day immersions."},
  {label:"ENVIRONMENT",context:"Geography, altitude, humidity, surroundings and the character of the setting."},
  {label:"PREFERENCES",context:"Dietary needs, solitude levels, language and cultural comfort."},
  {label:"BUDGET",context:"Transparent value alignment across the wellness experience."},
  {label:"REQUIREMENTS",context:"Relevant personal requirements, mobility considerations and companion needs."}
];

const DIFFERENCE=[
  {keyword:"PERSONALIZED",text:"Begins with understanding you.",detail:"Every journey begins with understanding your goals, preferences and relevant context."},
  {keyword:"CURATED",text:"Selected wellness partners.",detail:"Verified wellness partners and suitable programs rather than generic popularity."},
  {keyword:"GUIDED",text:"Human support throughout.",detail:"Human support from enquiry through planning, arrival and the wellness experience."},
  {keyword:"CONTINUOUS",text:"Support beyond the programme.",detail:"Thoughtful follow-up and wellness continuity after your programme."}
];

const STEPS=[
  ["ENQUIRE","Share your core goals, time horizon and personal wellness aspirations."],
  ["ASSESS","Your information is reviewed to understand the journey you are seeking."],
  ["CONSULT","A thoughtful consultation helps clarify expectations and preferences."],
  ["RECOMMEND","Receive a tailored recommendation based on your requirements."],
  ["MATCH","Choose the centre and journey structure that feels right for you."],
  ["COORDINATE","Coordinate the practical details around your India experience."],
  ["EXPERIENCE","Experience your wellness journey with the support you have planned."],
  ["CONTINUE","Continue your wellness intentions beyond your time in India."]
];

const CRITERIA=[
  ["◉","Wellness Goals","Whether you seek deep metabolic renewal, burnout recovery, chronic fatigue support, or executive vitality.","Precision alignment rather than generic destination popularity."],
  ["＋","Health Requirements","Relevant health information and practitioner requirements shared during enquiry.","Recommendations do not replace medical advice or diagnosis."],
  ["◷","Duration Preferences","7-day targeted journeys, 14-day deeper engagement or 21-day immersion.","Duration is considered alongside your goals and preferences."],
  ["₹","Budget & Transparency","Clear alignment between your expectations, programme and available options.","Transparent discovery without relying on generic listings."],
  ["✦","Lifestyle & Sanctuary Pace","Quiet isolation, nature, digital detachment, food and daily rhythm.","The setting should feel appropriate to the way you want to travel."],
  ["⌁","Travel & Geography","Location, climate, accessibility and practical travel considerations.","Travel planning can be coordinated around the selected experience."]
];

const TIMES=[
  {days:"07",headline:"Focused Introduction",description:"A focused introduction to wellness and recovery.",intensity:"TARGETED RESET"},
  {days:"14",headline:"Deeper Engagement",description:"Deeper wellness engagement and lifestyle reset.",intensity:"MOST POPULAR"},
  {days:"21",headline:"Comprehensive Immersion",description:"A more comprehensive wellness immersion.",intensity:"DEEP IMMERSION"}
];

const ENVIRONMENTS=[
  {icon:"◌",title:"COASTAL",text:"Sea air, slower rhythms and restorative surroundings.",detail:"Suitable for guests seeking calm, nature and recovery.",accent:"#3B6E8C"},
  {icon:"♧",title:"FOREST",text:"Green surroundings and deeper connection with nature.",detail:"A quieter setting for digital detachment and restoration.",accent:"#1E7A3A"},
  {icon:"⌂",title:"HERITAGE",text:"Traditional environments shaped by lineage and place.",detail:"For guests drawn to classical wellness traditions.",accent:"#C6A75E"},
  {icon:"✦",title:"URBAN + NATURE",text:"Accessible wellness with nature close at hand.",detail:"A practical balance between city access and restoration.",accent:"#2D6A4F"}
];

const CENTRES=[
  {id:"shathayu",name:"SHATHAYU",location:"Bengaluru, Karnataka",category:"URBAN + NATURE",focus:"Panchakarma • Preventive Wellness • Longevity",environment:"Urban wellness with access to nature",duration:"7, 14 & 21 Days",lineage:"Ayurvedic Wellness",setting:"Physician-led Ayurvedic wellness with a structured traditional approach.",slug:"shathayu-ayurveda-yoga-retreat"},
  {id:"kanasu",name:"KANASU",location:"Udupi, Karnataka",category:"COASTAL",focus:"Stress Recovery • Sleep • Rejuvenation",environment:"Coastal nature and restorative surroundings",duration:"7, 14 & 21 Days",lineage:"Ayurvedic Wellness",setting:"A quieter environment designed around recovery, nature and restorative living.",slug:"kanasu-ayurveda-wellness-retreat"},
  {id:"chithrakoota",name:"CHITHRAKOOTA",location:"Udupi Region, Karnataka",category:"HERITAGE",focus:"Traditional Ayurveda • Detox • Rejuvenation",environment:"Heritage setting near the coastal Western Ghats",duration:"7, 14 & 21 Days",lineage:"Traditional Ayurveda",setting:"Traditional Ayurvedic wellness shaped by its heritage and surrounding natural environment.",slug:"chithrakoota-ayurveda"}
];

const FAQS=[
  ["What is Geo-Wellness?","Geo-Wellness explores the relationship between your individual goals, lifestyle and the environment in which a wellness experience takes place."],
  ["How does DARSHAI recommend a centre?","DARSHAI considers your goals, programme requirements, duration, environment preferences, relevant personal requirements, budget and travel considerations."],
  ["Can DARSHAI support international travellers?","Yes. DARSHAI can support international guests with discovery, centre matching, journey planning and India-based coordination."],
  ["Does DARSHAI provide medical diagnosis or treatment?","No. DARSHAI supports wellness discovery and journey planning and does not diagnose or treat medical conditions."],
  ["What journey durations are available?","Featured journey structures include 7, 14 and 21 days, subject to the programme and centre selected."],
  ["Can DARSHAI coordinate travel?","Travel coordination can be discussed as part of your journey requirements, including practical arrival and transfer support."],
  ["How does the enquiry process work?","Share your requirements through the enquiry form. The information is reviewed and the appropriate next conversation is arranged."],
  ["Can I choose my own wellness centre?","Yes. You may express a preferred centre and DARSHAI can help you understand whether it aligns with your journey requirements."]
];

const Btn=({children,to="/begin-your-journey",outline=false,onClick,className=""})=>{
  const styles=`group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[10px] sm:text-xs font-semibold tracking-[.2em] uppercase transition-all duration-300 ${outline?"border border-[#C6A75E]/50 bg-transparent text-[#18352A] hover:border-[#1E7A3A] hover:bg-[#123C2A] hover:text-[#F8F5EE]":"bg-[#123C2A] text-[#F8F5EE] hover:bg-[#1E7A3A]"} ${className}`;
  return onClick?<button onClick={onClick} className={styles}>{children}<span className="text-[#C6A75E] transition-transform group-hover:translate-x-1">↗</span></button>:<Link to={to} className={styles}>{children}<span className="text-[#C6A75E] transition-transform group-hover:translate-x-1">↗</span></Link>
};

function Eyebrow({children,dark=false}){return <span className={`mb-4 block text-[10px] sm:text-[11px] font-semibold tracking-[.3em] uppercase ${dark?"text-[#C6A75E]":"text-[#1E7A3A]"}`}>{children}</span>}

function Hero({scrollCentres}){
  return <section id="hero" className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-[#123C2A] text-[#F8F5EE]">
    <div className="absolute inset-0 overflow-hidden"><div className="absolute inset-0 animate-[kenburns_24s_ease-in-out_infinite_alternate] bg-cover bg-center" style={{backgroundImage:`url("${IMG.hero}")`}}/><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A] via-[#123C2A]/60 to-[#123C2A]/40"/><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,60,42,.35)_55%,rgba(18,60,42,.75)_100%)]"/></div>
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-20 text-center sm:px-8">
      <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#C6A75E]/40 bg-[#123C2A]/60 px-4 py-1.5 backdrop-blur-md"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C6A75E]"/><span className="text-[9px] sm:text-[10px] tracking-[.3em] uppercase font-medium">PERSONALIZED WELLNESS JOURNEYS IN INDIA</span></div>
      <h1 className="max-w-4xl font-serif text-3xl leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"><span className="block opacity-95">Come to India for Wellness.</span><span className="mt-2 block font-light italic text-[#F1ECE2]/90">Arrive With a Journey Built Around You.</span></h1>
      <p className="mb-10 mt-6 max-w-3xl text-base font-light leading-relaxed tracking-wide text-[#F8F5EE]/85 sm:text-lg md:text-xl">DARSHAI helps international wellness travellers discover curated wellness centres, personalized wellness programs and guided wellness journeys across India.</p>
      <div className="mb-16 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"><Btn>PLAN MY WELLNESS JOURNEY</Btn><Btn onClick={scrollCentres} outline>EXPLORE WELLNESS CENTRES</Btn></div>
      <div className="w-full max-w-4xl border-t border-[#C6A75E]/25 pt-6"><div className="flex flex-col items-center justify-center gap-2 text-[9px] font-light tracking-[.16em] uppercase text-[#F8F5EE]/85 sm:flex-row sm:gap-6 sm:text-[10px]"><span>Personalized Geo-Wellness Journeys</span><span className="hidden text-[#C6A75E] sm:inline">•</span><span>Curated Wellness Centres Across India</span><span className="hidden text-[#C6A75E] sm:inline">•</span><span>International Concierge Support</span></div></div>
    </div>
    <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-60 md:flex"><span className="text-[8px] tracking-[.25em] uppercase">DISCOVER</span><div className="h-8 w-px animate-pulse bg-gradient-to-b from-[#C6A75E] to-transparent"/></div>
    <style>{`@keyframes kenburns{0%{transform:scale(1.03) translate(0,0)}50%{transform:scale(1.08) translate(-1%,-1%)}100%{transform:scale(1.03) translate(1%,0)}}`}</style>
  </section>
}

function India(){
  return <section id="india" className="relative overflow-hidden bg-[#F8F5EE] py-28 md:py-36"><div className="mx-auto max-w-6xl px-6 sm:px-8"><div className="mb-16 max-w-3xl md:mb-20"><Eyebrow>WHY INDIA FOR WELLNESS</Eyebrow><h2 className="mb-6 font-serif text-3xl leading-[1.15] text-[#18352A] sm:text-5xl md:text-6xl">A Tradition of Wellness.<br/><span className="font-light italic text-[#1E7A3A]">A Destination for Renewal.</span></h2><p className="max-w-2xl text-base font-light leading-relaxed text-[#6B706A] sm:text-lg">India has been home to Ayurveda, Yoga and holistic wellness traditions for thousands of years.</p></div><div className="group relative aspect-[16/9] max-h-[520px] overflow-hidden rounded-2xl shadow-xl sm:aspect-[21/9]"><img src={IMG.india} alt="Tranquil Indian wellness sanctuary" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer"/><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A]/70 via-transparent to-black/20"/><div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/20 pt-4 text-[9px] font-light tracking-[.25em] uppercase text-[#F8F5EE]/80 sm:text-[10px]"><span>WESTERN GHATS & SOUTHERN SANCTUARIES</span><span className="hidden sm:inline">CENTURIES OF UNBROKEN LINEAGE</span></div></div><div className="mt-12 border-t border-[#C6A75E]/30 pt-8"><div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">{["AYURVEDA","YOGA","RENEWAL","RECOVERY","REJUVENATION","NATURE"].map(x=><span key={x} className="text-xs font-medium tracking-[.3em] text-[#18352A] transition-colors hover:text-[#1E7A3A] sm:text-sm">{x}</span>)}</div></div></div></section>
}

function WhyDarshai(){
  const [active,setActive]=useState(0);
  return <section id="why-darshai" className="relative overflow-hidden bg-[#F1ECE2] py-28 text-[#18352A] md:py-36"><div className="mx-auto max-w-6xl px-6 sm:px-8"><div className="mb-16 max-w-3xl md:mb-24"><Eyebrow>WHY DARSHAI</Eyebrow><h2 className="mb-8 font-serif text-3xl leading-[1.15] text-[#123C2A] sm:text-5xl md:text-6xl">Finding a Wellness Centre is Easy.<br/><span className="font-light italic text-[#1E7A3A]">Finding the Right One is Hard.</span></h2><div className="flex items-center gap-3"><span className="h-px w-8 bg-[#C6A75E]"/><p className="font-serif text-lg italic tracking-wide text-[#18352A]/90 sm:text-xl">DARSHAI looks beyond ratings, reviews and luxury.</p></div></div><div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16"><div className="flex flex-col space-y-4 sm:space-y-5 lg:col-span-7">{WHY.map((x,i)=><button key={x.label} onClick={()=>setActive(i)} onMouseEnter={()=>setActive(i)} className="group flex items-baseline gap-4 text-left focus:outline-none"><span className={`font-serif text-3xl tracking-[.08em] transition-all duration-300 sm:text-5xl md:text-6xl ${active===i?"translate-x-2 text-[#123C2A]":"text-[#18352A]/30 group-hover:translate-x-1 group-hover:text-[#18352A]/70"}`}>{x.label}</span>{active===i&&<span className="hidden h-2 w-2 animate-pulse rounded-full bg-[#1E7A3A] sm:inline-block" />}</button>)}</div><div className="rounded-2xl border border-[#C6A75E]/30 bg-[#F8F5EE] p-8 shadow-sm lg:sticky lg:top-32 lg:col-span-5 sm:p-10"><span className="mb-2 block text-[10px] font-medium tracking-[.3em] uppercase text-[#6B706A]">CURATION CRITERIA</span><h3 className="mb-4 font-serif text-2xl text-[#123C2A] sm:text-3xl">{WHY[active].label}</h3><p className="mb-8 text-base font-light leading-relaxed text-[#18352A]/85 sm:text-lg">{WHY[active].context}</p><div className="flex items-center justify-between border-t border-[#C6A75E]/20 pt-6 text-[9px] tracking-[.15em] uppercase text-[#6B706A] sm:text-[10px]"><span>UNFILTERED PRECISION</span><span className="font-medium text-[#1E7A3A]">BEYOND GENERIC REVIEWS</span></div></div></div></div></section>
}

function ChooseJourney({onSelect}){
  const goals=[
    {id:"executive",title:"Executive Wellness",description:"For founders, business owners and leaders.",tag:"LEADERSHIP RESTORATION"},
    {id:"stress-burnout",title:"Stress & Burnout Recovery",description:"For mental and physical recovery.",tag:"NERVOUS SYSTEM RESET"},
    {id:"sleep-recovery",title:"Sleep & Recovery",description:"For rest and restoration.",tag:"CIRCADIAN REALIGNMENT"},
    {id:"ayurveda-wellness",title:"Ayurveda Wellness",description:"Traditional wellness experiences.",tag:"CLASSICAL PANCHAKARMA"},
    {id:"rejuvenation",title:"Rejuvenation",description:"Reset and recharge.",tag:"PRANIC REVITALIZATION"},
    {id:"healthy-ageing",title:"Healthy Ageing",description:"Long-term vitality and wellness.",tag:"CELLULAR LONGEVITY"}
  ];
  return <section id="choose-journey" className="relative py-28 md:py-36 bg-[#F8F5EE] overflow-hidden"><div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#C6A75E]/10 blur-3xl pointer-events-none"/><div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-[#1E7A3A]/10 blur-3xl pointer-events-none"/><div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10"><div className="max-w-3xl mb-16 md:mb-20"><Eyebrow>EXPLORE JOURNEYS BY GOAL</Eyebrow><h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#18352A] leading-[1.15] mb-4">Different Goals.<br/><span className="italic text-[#1E7A3A] font-light">Different Journeys.</span></h2><p className="text-base sm:text-lg text-[#6B706A] font-light leading-relaxed max-w-xl">Private wellness programs crafted around your restorative priorities and lifestyle.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">{goals.map((item,idx)=><motion.div key={item.id} id={`journey-goal-${item.id}`} onClick={()=>onSelect(item.title)} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-40px"}} transition={{duration:.45,delay:idx*.06}} whileHover={{y:-6,transition:{duration:.25}}} className="group relative rounded-2xl p-7 sm:p-8 bg-[#FDFBF7] border border-[#C6A75E]/30 hover:border-[#C6A75E] transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between min-h-[240px] overflow-hidden"><div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#C6A75E] transition-colors duration-300"/><div><div className="mb-4"><span className="text-[10px] tracking-[0.2em] uppercase text-[#1E7A3A] font-semibold bg-[#1E7A3A]/10 px-2.5 py-1 rounded-full border border-[#1E7A3A]/20">{item.tag}</span></div><h3 className="text-2xl sm:text-3xl font-serif text-[#123C2A] group-hover:text-[#1E7A3A] transition-colors leading-snug mb-3">{item.title}</h3><p className="text-sm sm:text-base text-[#6B706A] font-light leading-relaxed">{item.description}</p></div><div className="pt-6 mt-6 border-t border-[#C6A75E]/20 flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] transition-all duration-300 group-hover:w-4 group-hover:bg-[#1E7A3A]"/><span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#18352A]/70 group-hover:text-[#18352A] transition-colors">EXPLORE JOURNEY</span></div><div className="w-7 h-7 rounded-full bg-[#123C2A]/5 group-hover:bg-[#123C2A] text-[#123C2A] group-hover:text-[#F8F5EE] flex items-center justify-center transition-all duration-300"><ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></div></div></motion.div>)}</div></div></section>
}

function JourneyTimeline(){
  const [active,setActive]=useState(0);
  return <section id="journey" className="relative overflow-hidden bg-[#123C2A] py-28 text-[#F8F5EE] md:py-36"><div className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#1E7A3A]/10 blur-3xl"/><div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8"><div className="mb-16 max-w-3xl md:mb-20"><Eyebrow dark>HOW DARSHAI WORKS</Eyebrow><h2 className="font-serif text-3xl leading-[1.15] sm:text-5xl md:text-6xl">From First Conversation<br/><span className="font-light italic text-[#F1ECE2]/90">to Your Wellness Journey in India.</span></h2></div><div className="hidden lg:block"><div className="relative mb-16 pt-8"><div className="absolute left-0 right-0 top-[28px] h-px bg-[#C6A75E]/30"/><div className="absolute left-0 top-[28px] h-px bg-[#C6A75E] transition-all duration-500" style={{width:`${(active/(STEPS.length-1))*100}%`}}/><div className="relative flex items-start justify-between">{STEPS.map(([name],i)=><button key={name} onClick={()=>setActive(i)} onMouseEnter={()=>setActive(i)} className="group flex flex-col items-center px-1 text-center"><span className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${active===i?"scale-125 bg-[#1E7A3A] ring-4 ring-[#C6A75E]/40":i<active?"bg-[#1E7A3A]/80":"border border-[#C6A75E]/40 bg-[#18352A]"}`}><span className={`h-1.5 w-1.5 rounded-full ${active===i?"bg-[#C6A75E]":"bg-[#F8F5EE]/50"}`}/></span><span className={`mt-4 text-[10px] font-medium tracking-[.2em] uppercase transition-colors ${active===i?"text-white":"text-white/50 group-hover:text-white"}`}>{name}</span></button>)}</div></div><div className="mx-auto max-w-3xl rounded-2xl border border-[#C6A75E]/30 bg-[#18352A]/80 p-8 text-center shadow-lg sm:p-10"><span className="mb-2 block text-[10px] font-medium tracking-[.3em] uppercase text-[#C6A75E]">PHASE • {STEPS[active][0]}</span><p className="font-serif text-xl italic leading-relaxed sm:text-2xl">“{STEPS[active][1]}”</p></div></div><div className="relative space-y-8 border-l border-[#C6A75E]/40 pl-6 lg:hidden">{STEPS.map(([name,description],i)=><button key={name} onClick={()=>setActive(i)} className="relative block w-full text-left"><span className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full ${active===i?"bg-[#1E7A3A] ring-4 ring-[#C6A75E]/50":"border border-[#C6A75E]/50 bg-[#18352A]"}`}/><span className="block text-sm font-semibold tracking-[.2em] uppercase">{name}</span><p className="mt-2 text-sm font-light leading-relaxed text-white/75">{description}</p></button>)}</div></div></section>
}

function Difference(){
  return <section id="the-difference" className="relative overflow-hidden bg-[#F8F5EE] py-28 md:py-36"><div className="mx-auto max-w-7xl px-6 sm:px-8"><div className="mb-14 max-w-3xl md:mb-20"><Eyebrow>METHODOLOGY</Eyebrow><h2 className="mb-4 font-serif text-3xl leading-[1.15] text-[#18352A] sm:text-5xl md:text-6xl">The DARSHAI Difference</h2><p className="max-w-2xl text-base font-light leading-relaxed text-[#6B706A] sm:text-lg">A structured, human-guided approach to authentic Indian wellness — designed to bring clarity, care and thoughtful matching to the journey.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{DIFFERENCE.map((item,i)=><div key={item.keyword} className="group flex flex-col overflow-hidden rounded-2xl border border-[#C6A75E]/35 bg-[#F1ECE2] transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A75E] hover:shadow-xl"><div className="relative aspect-[16/11] overflow-hidden"><img src={IMG.difference[i]} alt={item.keyword} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A]/80 via-[#123C2A]/20 to-transparent"/><span className="absolute bottom-3 right-4 text-sm text-[#C6A75E]">✦</span></div><div className="flex flex-1 flex-col justify-between p-6 sm:p-7"><div><h3 className="mb-3 font-serif text-xl tracking-[.08em] text-[#123C2A] transition-colors group-hover:text-[#1E7A3A] sm:text-2xl">{item.keyword}</h3><p className="text-sm font-light leading-relaxed text-[#6B706A]">{item.text}</p><p className="mt-3 text-xs italic leading-relaxed text-[#18352A]/70">{item.detail}</p></div><div className="mt-6 border-t border-[#C6A75E]/25 pt-5 text-[9px] font-semibold tracking-[.2em] uppercase text-[#1E7A3A]">✓ DARSHAI STANDARD</div></div></div>)}</div></div></section>
}

function Recommendation(){
  const [open,setOpen]=useState(null);
  return <section id="recommendation-methodology" className="relative overflow-hidden bg-[#FDFBF7] py-28 text-[#18352A] md:py-36"><div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#C6A75E]/10 blur-3xl"/><div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#1E7A3A]/10 blur-3xl"/><div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8"><div className="mb-16 max-w-3xl md:mb-20"><Eyebrow>CURATION & RECOMMENDATION ARCHITECTURE</Eyebrow><h2 className="mb-6 font-serif text-3xl leading-[1.15] text-[#123C2A] sm:text-5xl md:text-6xl">How DARSHAI Recommends<br/><span className="font-light italic text-[#1E7A3A]">Wellness Centres.</span></h2><p className="text-base font-light leading-relaxed text-[#6B706A] sm:text-lg">DARSHAI brings together your goals, preferences and journey requirements with information about wellness experiences and suitable partner centres.</p></div><div className="mb-12 text-center"><span className="mb-2 block text-[10px] font-semibold tracking-[.25em] uppercase text-[#1E7A3A]">THE 6 CORE EVALUATION PILLARS</span><h3 className="font-serif text-2xl text-[#123C2A] sm:text-3xl">Every Recommendation Evaluates:</h3></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{CRITERIA.map(([icon,title,description,detail],i)=><button key={title} onClick={()=>setOpen(open===i?null:i)} className="group rounded-2xl border border-[#C6A75E]/30 bg-[#F8F5EE] p-6 text-left shadow-sm transition-all hover:border-[#C6A75E] hover:shadow-md sm:p-7"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#123C2A] text-lg text-[#C6A75E]">{icon}</div><h4 className="mb-2 font-serif text-xl text-[#123C2A]">{title}</h4><p className="text-sm font-light leading-relaxed text-[#6B706A]">{description}</p><div className={`overflow-hidden transition-all duration-300 ${open===i?"mt-4 max-h-32 opacity-100":"max-h-0 opacity-0"}`}><div className="border-t border-[#C6A75E]/20 pt-3 text-xs italic leading-relaxed text-[#18352A]/80">“{detail}”</div></div><div className="mt-5 border-t border-[#C6A75E]/20 pt-3 text-[9px] font-semibold tracking-[.18em] uppercase text-[#1E7A3A]">{open===i?"CLOSE DETAIL":"VIEW CRITERION →"}</div></button>)}</div><div className="mt-14 border-t border-[#C6A75E]/25 pt-8 text-center"><Btn>RECEIVE PERSONALIZED RECOMMENDATIONS</Btn></div></div></section>
}

function GeoWellness({onSelect}){
  const points=[
    {num:"01",icon:Compass,text:"Different wellness environments create different outcomes."},
    {num:"02",icon:Waves,text:"A coastal retreat may support recovery and relaxation."},
    {num:"03",icon:Trees,text:"A forest environment may support restoration and mental clarity."},
    {num:"04",icon:Mountain,text:"A mountain setting may encourage reflection and renewal."},
    {num:"05",icon:Sparkles,text:"DARSHAI combines health assessments, lifestyle understanding and environmental intelligence to help individuals explore wellness journeys aligned with their goals."}
  ];
  return <section id="geo-wellness" className="relative py-24 md:py-32 bg-[#FDFBF7] text-[#18352A]"><div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="mb-12 md:mb-16"><Eyebrow>WHAT IS GEO-WELLNESS?</Eyebrow><h2 className="text-3xl sm:text-5xl font-serif text-[#123C2A] leading-[1.15]">Geo-Wellness: Matching People With The Right Wellness Environment</h2></div><div className="space-y-4 sm:space-y-5">{points.map(pt=>{const Icon=pt.icon,isHighlighted=pt.num==="05";return <div key={pt.num} className={`group p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex items-start sm:items-center gap-5 cursor-pointer hover:-translate-y-0.5 ${isHighlighted?"bg-[#123C2A] text-[#F8F5EE] border-[#C6A75E]/50 shadow-md hover:border-[#C6A75E] hover:shadow-xl":"bg-[#F8F5EE] text-[#18352A] border-[#C6A75E]/30 hover:bg-[#123C2A] hover:text-[#F8F5EE] hover:border-[#C6A75E] hover:shadow-xl"}`}><div className="shrink-0"><div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isHighlighted?"bg-[#1E7A3A] text-[#C6A75E]":"bg-[#123C2A] text-[#C6A75E] group-hover:bg-[#1E7A3A] group-hover:scale-105"}`}><Icon className="w-5 h-5"/></div></div><p className={`text-base sm:text-lg font-serif leading-relaxed transition-colors duration-300 ${isHighlighted?"text-[#F8F5EE] font-light":"text-[#123C2A] group-hover:text-[#F8F5EE]"}`}>{pt.text}</p></div>})}</div></div></section>
}

function ChooseTime({onSelect}){
  const [active,setActive]=useState("14");
  return <section id="choose-time" className="relative overflow-hidden bg-[#F1ECE2] py-28 text-[#18352A] md:py-36"><div className="mx-auto max-w-6xl px-6 sm:px-8"><div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"><Eyebrow>EXPLORE JOURNEYS BY DURATION</Eyebrow><h2 className="font-serif text-3xl leading-tight text-[#123C2A] sm:text-5xl">Choose the Experience That Fits You</h2></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{TIMES.map(x=>{const selected=active===x.days;return <button key={x.days} onClick={()=>{setActive(x.days);onSelect(`${x.days} DAYS`)}} className={`group relative flex min-h-[300px] flex-col justify-between rounded-2xl border p-8 text-left transition-all duration-300 sm:p-10 ${selected?"border-[#C6A75E] bg-[#F8F5EE] shadow-xl ring-1 ring-[#C6A75E]/50":"border-[#C6A75E]/25 bg-[#F8F5EE]/50 hover:border-[#C6A75E]/60 hover:bg-[#F8F5EE] hover:shadow-md"}`}>{x.days==="14"&&<span className="absolute -top-3.5 right-6 rounded-full border border-[#C6A75E]/50 bg-[#123C2A] px-3.5 py-1 text-[9px] font-semibold tracking-[.2em] uppercase text-[#C6A75E]">✦ MOST POPULAR</span>}<div><span className={`mb-4 block font-serif text-5xl font-light sm:text-6xl lg:text-7xl ${selected?"text-[#123C2A]":"text-[#6B706A]/60 group-hover:text-[#18352A]"}`}>{x.days}</span><span className="mb-3 block text-xs font-semibold tracking-[.2em] uppercase text-[#1E7A3A]">{x.headline}</span><p className="text-sm font-light leading-relaxed text-[#18352A]/85 sm:text-base">{x.description}</p></div><div className="flex items-center justify-between border-t border-[#C6A75E]/20 pt-6"><span className="text-[9px] tracking-widest uppercase text-[#6B706A]">{x.intensity}</span><span className={`text-[9px] font-medium tracking-[.2em] uppercase ${selected?"text-[#1E7A3A]":"text-[#C6A75E]"}`}>{selected?"SELECTED":"SELECT →"}</span></div></button>})}</div></div></section>
}

function CentreModal({centre,onClose,onSelect}){
  if(!centre)return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#C6A75E]/40 bg-[#F8F5EE] text-[#18352A] shadow-2xl"><button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#123C2A]/85 text-xl text-white transition hover:bg-[#123C2A]">×</button><div className="relative aspect-[16/9] overflow-hidden"><img src={IMG.centres[CENTRES.findIndex(x=>x.id===centre.id)]} alt={centre.name} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A] via-[#123C2A]/30 to-transparent"/><div className="absolute bottom-6 left-6 right-6 text-white sm:left-8"><span className="mb-1 block text-[9px] tracking-[.25em] uppercase text-[#C6A75E]">{centre.lineage}</span><h3 className="font-serif text-3xl uppercase tracking-wider sm:text-4xl">{centre.name}</h3><p className="mt-1 text-xs text-white/80">{centre.location}</p></div></div><div className="space-y-8 p-6 sm:p-10"><div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#C6A75E]/30 bg-[#F1ECE2] p-4 text-xs sm:grid-cols-2 lg:grid-cols-4"><div><span className="block text-[9px] font-semibold uppercase tracking-wider text-[#6B706A]">Category</span><b>{centre.category}</b></div><div><span className="block text-[9px] font-semibold uppercase tracking-wider text-[#6B706A]">Program Focus</span><b>{centre.focus}</b></div><div><span className="block text-[9px] font-semibold uppercase tracking-wider text-[#6B706A]">Availability</span><b>{centre.duration}</b></div><div><span className="block text-[9px] font-semibold uppercase tracking-wider text-[#6B706A]">Status</span><b className="text-[#1E7A3A]">DARSHAI VETTED</b></div></div><div><Eyebrow>ENVIRONMENT & GEOGRAPHICAL SETTING</Eyebrow><p className="text-base font-light leading-relaxed text-[#18352A]/90 sm:text-lg">{centre.setting}</p></div><div><Eyebrow>PROGRAM FOCUS</Eyebrow><p className="text-sm font-light leading-relaxed text-[#6B706A] sm:text-base">{centre.focus}</p></div><div className="border-t border-[#C6A75E]/30 pt-6"><div className="flex flex-col items-center justify-between gap-4 sm:flex-row"><span className="text-xs text-[#6B706A]">✦ DARSHAI Preferred Wellness Partner</span><Btn onClick={()=>onSelect(centre.name)}>INQUIRE ABOUT THIS SANCTUARY</Btn></div></div></div></div></div>
}

function Centres({onView,onExplore}){
  return <section id="centres" className="relative overflow-hidden bg-[#F8F5EE] py-28 md:py-36"><div className="mx-auto max-w-7xl px-6 sm:px-8"><div className="mb-16 max-w-3xl md:mb-20"><Eyebrow>CURATED WELLNESS PARTNERS</Eyebrow><h2 className="font-serif text-3xl leading-tight text-[#18352A] sm:text-5xl md:text-6xl">Explore Curated Wellness Centres</h2></div><div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">{CENTRES.map((centre,i)=><div key={centre.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#C6A75E]/30 bg-[#FDFBF7] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A75E] hover:shadow-xl"><div className="relative aspect-[4/3] overflow-hidden"><img src={IMG.centres[i]} alt={`${centre.name} - ${centre.location}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A]/75 via-transparent to-black/20"/><span className="absolute left-4 top-4 rounded-full border border-[#C6A75E]/40 bg-[#123C2A]/85 px-3 py-1.5 text-[9px] font-medium tracking-[.15em] uppercase text-[#C6A75E]">✓ DARSHAI VETTED</span><span className="absolute bottom-4 left-4 rounded-md bg-[#F8F5EE]/90 px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase text-[#123C2A]">{centre.category}</span></div><div className="flex flex-1 flex-col justify-between space-y-5 p-6 sm:p-7"><div><p className="mb-2 text-xs font-medium tracking-wide text-[#1E7A3A]">⌖ {centre.location}</p><h3 className="mb-3 font-serif text-2xl leading-snug text-[#123C2A] transition-colors group-hover:text-[#1E7A3A]">{centre.name}</h3><div className="mb-4 rounded-xl border border-[#C6A75E]/25 bg-[#F4EFE6] p-3"><span className="mb-0.5 block text-[9px] font-semibold tracking-[.2em] uppercase text-[#1E7A3A]">PROGRAM FOCUS</span><p className="text-xs font-medium text-[#18352A] sm:text-sm">{centre.focus}</p></div><div className="space-y-2 border-t border-[#C6A75E]/15 pt-3 text-xs font-light text-[#6B706A]"><p><b className="text-[#18352A]/80">Environment:</b> {centre.environment}</p><p><b className="text-[#18352A]/80">Duration:</b> {centre.duration}</p></div></div><div className="border-t border-[#C6A75E]/20 pt-4"><button onClick={()=>onView(centre)} className="text-xs font-semibold tracking-[.2em] uppercase text-[#123C2A] transition-colors hover:text-[#1E7A3A]">VIEW CENTRE DOSSIER <span className="text-[#C6A75E]">→</span></button></div></div></div>)}</div><div className="pt-4 text-center"><Btn to="/geo-wellness-centres" outline onClick={onExplore}>EXPLORE ALL WELLNESS CENTRES</Btn></div></div></section>
}

function PrivateJourney(){
  const services=["Journey Planning","Centre Coordination","Travel Support","Airport Transfer","Arrival Assistance","Program Coordination","Post-Program Follow-Up"];
  return <section id="journey-management" className="relative overflow-hidden bg-[#123C2A] py-32 text-[#F8F5EE] md:py-40"><div className="absolute inset-0"><img src={IMG.private} alt="Private wellness journey coordination" className="h-full w-full object-cover opacity-35"/><div className="absolute inset-0 bg-gradient-to-r from-[#123C2A] via-[#123C2A]/90 to-[#123C2A]/70"/></div><div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8"><div className="max-w-3xl"><Eyebrow dark>GLOBAL PRIVATE JOURNEY MANAGEMENT</Eyebrow><h2 className="font-serif text-4xl leading-[1.08] sm:text-6xl md:text-7xl">Beyond Booking.</h2><h3 className="mb-8 font-serif text-2xl font-light italic text-[#C6A75E] sm:text-4xl">Complete Journey Coordination.</h3><p className="mb-12 max-w-2xl text-base font-light leading-relaxed text-[#F8F5EE]/80 sm:text-lg">DARSHAI acts as your dedicated private wellness concierge in India, reducing the complexity and friction of planning international wellness travel.</p><div className="border-t border-[#C6A75E]/30 pt-8"><div className="flex flex-wrap items-center gap-x-8 gap-y-4">{services.map((x,i)=><span key={x} className="text-xs font-light tracking-[.16em] uppercase text-[#F8F5EE]/90"><span className="mr-3 text-[#C6A75E]">•</span>{x}{i<services.length-1&&<span className="ml-6 hidden text-[#C6A75E]/40 sm:inline">/</span>}</span>)}</div></div></div></div></section>
}

function Payments({onInquire}){
  const flow=[["01","International Card Payments","Visa • Mastercard • Amex"],["02","Secure Payment Gateway","End-to-End Encryption"],["03","Multi-Currency Support","USD • EUR • GBP • AUD • AED"],["04","International Bank Transfer Support","SWIFT & Direct Wire"],["05","Verified Transaction Processing","Settlement & Confirmation"],["06","Invoice & Confirmation Process","Sanctuary Vouchers & Invoicing"]];
  return <section id="international-payments" className="relative overflow-hidden bg-[#123C2A] py-28 text-[#F8F5EE] md:py-36"><div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A75E]/10 blur-[120px]"/><div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8"><div className="mb-16 max-w-3xl md:mb-20"><span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C6A75E]/30 bg-[#18352A]/80 px-3.5 py-1 text-[9px] font-medium tracking-[.25em] uppercase text-[#C6A75E]">✦ FINANCIAL INTEGRITY & GLOBAL ASSURANCE</span><h2 className="mb-6 font-serif text-3xl leading-tight sm:text-5xl md:text-6xl">Seamless International Payments & Transaction Security</h2><p className="text-base font-light leading-relaxed text-[#F8F5EE]/80 sm:text-lg">Planning international wellness travel should be financially frictionless. DARSHAI supports transparent payment coordination and clear transaction communication.</p></div><div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{flow.map(([n,title,sub])=><div key={n} className="group rounded-2xl border border-[#C6A75E]/30 bg-[#18352A]/90 p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-[#C6A75E]"><div className="mb-5 flex items-center justify-between"><span className="rounded-md border border-[#C6A75E]/30 bg-[#123C2A] px-2.5 py-0.5 text-[9px] font-semibold tracking-[.2em] text-[#C6A75E]">FLOW {n}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C6A75E]/40 bg-[#123C2A] text-[#C6A75E]">✦</span></div><h3 className="font-serif text-lg leading-snug sm:text-xl">{title}</h3><p className="mt-2 text-xs font-medium tracking-wide text-[#C6A75E]/80">{sub}</p><div className="mt-4 flex items-center justify-between border-t border-[#C6A75E]/15 pt-4 text-[9px] text-white/55"><span>Verified Protocol</span><span className="text-[#C6A75E]">→</span></div></div>)}</div><div className="border-t border-[#C6A75E]/20 pt-8 text-center"><Btn onClick={onInquire}>INQUIRE ABOUT RETREAT RATES & TRANSFERS</Btn></div></div></section>
}

function Executive({onExplore}){
  const cards=[
    {id:"independent",title:"Independent Recommendations",description:"We are not limited to a single wellness centre."},
    {id:"partner-network",title:"Curated Partner Network",description:"Selected wellness environments across India."},
    {id:"doctor-guidance",title:"Doctor-Led Guidance",description:"Assessment and recommendation process."},
    {id:"concierge-support",title:"Concierge Support",description:"From enquiry to centre coordination."},
    {id:"transparent-info",title:"Transparent Information",description:"Programs, inclusions and pricing shared clearly."}
  ];
  const [isPaused,setIsPaused]=useState(false);
  const scrollContainerRef=useRef(null);
  const scrollManual=direction=>{if(scrollContainerRef.current)scrollContainerRef.current.scrollBy({left:direction==="left"?-360:360,behavior:"smooth"})};
  return <section id="corporate-wellness" className="relative py-28 md:py-36 bg-[#F8F5EE] overflow-hidden"><div className="max-w-7xl mx-auto px-6 sm:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"><div className="lg:col-span-6"><Eyebrow>CORPORATE & EXECUTIVE WELLNESS</Eyebrow><h2 className="text-3xl sm:text-5xl font-serif text-[#18352A] leading-[1.15] mb-6">Corporate Geo-Wellness</h2><p className="text-base sm:text-lg text-[#6B706A] font-light leading-relaxed mb-8">Personalized wellness experiences and executive wellness programs designed for founders, leadership teams and organizations.</p><div className="mb-10"><span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#123C2A] block mb-4">SERVICES MAY INCLUDE:</span><ul className="space-y-3">{["Executive Wellness Retreats","Leadership Wellness Experiences","Founder Recovery Programs","Corporate Wellness Initiatives","Team Wellness Experiences"].map(service=><li key={service} className="flex items-center gap-3 text-sm sm:text-base text-[#18352A] font-light"><CheckCircle2 className="w-4 h-4 text-[#1E7A3A] shrink-0"/><span>{service}</span></li>)}</ul></div><button onClick={onExplore} id="corporate-consultation-cta" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#123C2A] hover:bg-[#1E7A3A] text-[#F8F5EE] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"><span>REQUEST CORPORATE CONSULTATION</span><ArrowUpRight className="w-4 h-4 text-[#C6A75E] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></button></div><div className="lg:col-span-6"><div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group bg-[#123C2A]/10 border border-[#C6A75E]/30"><img src={IMG.executive} alt="Executive retreat overlooking peaceful misty hills in India" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer"/><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A]/70 via-transparent to-black/10"/><div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#F8F5EE] text-[10px] sm:text-xs tracking-[0.22em] uppercase font-light"><span>CONFIDENTIALITY GUARANTEED</span><span>BESPOKE PROTOCOLS</span></div></div></div></div><div className="mt-24 pt-16 border-t border-[#C6A75E]/25"><div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"><div><span className="text-[11px] tracking-[0.3em] uppercase text-[#1E7A3A] font-semibold block mb-2">PEACE OF MIND FOR GLOBAL TRAVELLERS</span><h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#18352A]">Why International Guests Choose DARSHAI</h3></div><div className="flex items-center gap-2"><button onClick={()=>scrollManual("left")} aria-label="Scroll left" id="guests-carousel-prev" className="w-10 h-10 rounded-full border border-[#C6A75E]/40 bg-[#FDFBF7] hover:bg-[#123C2A] text-[#123C2A] hover:text-[#C6A75E] flex items-center justify-center transition-colors cursor-pointer shadow-xs"><ChevronLeft className="w-5 h-5"/></button><button onClick={()=>scrollManual("right")} aria-label="Scroll right" id="guests-carousel-next" className="w-10 h-10 rounded-full border border-[#C6A75E]/40 bg-[#FDFBF7] hover:bg-[#123C2A] text-[#123C2A] hover:text-[#C6A75E] flex items-center justify-center transition-colors cursor-pointer shadow-xs"><ChevronRight className="w-5 h-5"/></button></div></div><div className="relative overflow-hidden py-4 -mx-6 sm:-mx-8 px-6 sm:px-8" onMouseEnter={()=>setIsPaused(true)} onMouseLeave={()=>setIsPaused(false)}><div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#F8F5EE] to-transparent z-10 pointer-events-none"/><div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F8F5EE] to-transparent z-10 pointer-events-none"/><div ref={scrollContainerRef} className="overflow-x-auto scrollbar-none scroll-smooth flex" style={{scrollbarWidth:"none",msOverflowStyle:"none"}}><motion.div className="flex gap-6 w-max cursor-grab active:cursor-grabbing py-2" animate={isPaused?{}:{x:["0%","-50%"]}} transition={{duration:28,repeat:Infinity,ease:"linear"}}>{[...cards,...cards].map((item,idx)=><div key={`${item.id}-${idx}`} className="group relative w-[270px] sm:w-[300px] p-6 sm:p-7 rounded-2xl bg-[#FDFBF7] border border-[#C6A75E]/30 hover:border-[#C6A75E] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-center shrink-0 overflow-hidden"><div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#C6A75E] transition-colors duration-300"/><h4 className="text-base sm:text-lg font-serif text-[#123C2A] group-hover:text-[#1E7A3A] transition-colors mb-2 leading-snug">{item.title}</h4><p className="text-xs sm:text-sm text-[#6B706A] font-light leading-relaxed">{item.description}</p></div>)}</motion.div></div></div></div></div></section>
}

function ConciergeForm({initialGoal,initialDuration,onExploreCentres}){
  const [submitted,setSubmitted]=useState(false);
  const [loading,setLoading]=useState(false);
  const [successMsg,setSuccessMsg]=useState("");
  const [form,setForm]=useState({fullName:"",email:"",phone:"",phoneCountry:"in",country:"India",countryCode:"IN",interestedIn:initialGoal||"Executive Wellness",query:""});

  useEffect(()=>{if(initialGoal)setForm(p=>({...p,interestedIn:initialGoal}))},[initialGoal]);

  const update=(k,v)=>setForm(p=>({...p,[k]:v}));

  const countryOptions=countryList().getData().map(x=>({...x,label:x.label,value:x.value.toUpperCase()}));

  const interests=["Executive Wellness","Stress & Burnout Recovery","Sleep & Recovery","Ayurveda Wellness","Rejuvenation","Healthy Ageing","Corporate & Executive Wellness","Doctor-Guided Panchakarma","Other / Custom Experience"];

  const handleSubmit=async e=>{
    e.preventDefault();

    if(!form.fullName.trim()||!form.email.trim()||!form.phone.trim()||!form.country||!form.interestedIn||!form.query.trim()){
      setSuccessMsg("Please complete all required fields");
      return;
    }

    setLoading(true);
    setSuccessMsg("");

    try{
      const API_URL=import.meta.env.VITE_API_URL||"http://localhost:5000";

      const payload={
        name:form.fullName.trim(),
        email:form.email.trim(),
        phone:form.phone.trim(),
        location:form.country,
        interest:form.interestedIn,
        message:form.query.trim()
      };

      const res=await fetch(`${API_URL}/api/query/create`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });

      const data=await res.json();

      if(!res.ok)throw new Error(data.message||"Failed to send inquiry");

      setSuccessMsg("Inquiry submitted successfully!");
      setSubmitted(true);

      setForm({
        fullName:"",
        email:"",
        phone:"",
        phoneCountry:"in",
        country:"India",
        countryCode:"IN",
        interestedIn:"Executive Wellness",
        query:""
      });

    }catch(error){
      console.error("International Inquiry Error:",error);
      setSuccessMsg(error.message||"Something went wrong. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return <section id="consultation" className="relative overflow-hidden bg-[#F1ECE2] py-28 text-[#18352A] md:py-36">
    <div className="mx-auto max-w-3xl px-6 sm:px-8">

      <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
        <Eyebrow>START YOUR JOURNEY</Eyebrow>
        <h2 className="mb-4 font-serif text-3xl leading-tight text-[#123C2A] sm:text-5xl">Tell Us What You’re Looking For.</h2>
        <p className="text-base font-light leading-relaxed text-[#6B706A] sm:text-lg">Share a few details about your goals and preferences. We’ll help you explore suitable wellness experiences across India.</p>
      </div>

      {submitted?
        <div className="relative overflow-hidden rounded-3xl border border-[#C6A75E]/45 bg-[#FDFBF7] p-8 text-center shadow-xl sm:p-14">
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A75E]/50 bg-[#123C2A] text-2xl text-[#C6A75E]">✓</div>
          <Eyebrow>CONFIDENTIAL CONCIERGE DOSSIER</Eyebrow>
          <h3 className="mb-6 font-serif text-2xl leading-tight text-[#123C2A] sm:text-4xl md:text-5xl">Your Journey Request Has Been Received.</h3>

          <div className="mb-8 rounded-2xl border border-[#C6A75E]/30 bg-[#F4EFE6] p-6 text-left sm:p-8">
            <p className="font-serif text-base font-light leading-relaxed text-[#18352A] sm:text-lg">
             Thank you for reaching out to DARSHAI. Our concierge team will carefully review your enquiry and connect with you.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#C6A75E]/25 pt-4 text-xs">
              <span>◷ Expected response: <b>within 24 hours</b></span>
              <span className="font-semibold tracking-wider uppercase text-[#1E7A3A]">● PRIORITY ADVISOR QUEUED</span>
            </div>
          </div>

          <button onClick={onExploreCentres} className="rounded-full bg-[#123C2A] px-8 py-4 text-xs font-semibold tracking-[.22em] uppercase text-white transition hover:bg-[#1E7A3A]">
            EXPLORE CENTRES →
          </button>
        </div>
      :
        <div className="rounded-3xl border border-[#C6A75E]/35 bg-[#F8F5EE] p-6 shadow-lg sm:p-12">

          <form onSubmit={handleSubmit} className="space-y-6">

            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[.2em] uppercase">FULL NAME *</span>
              <input required value={form.fullName} onChange={e=>update("fullName",e.target.value)} placeholder="e.g. Alistair Sterling" className="field"/>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[.2em] uppercase">EMAIL ADDRESS *</span>
              <input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="e.g. alistair@example.com" className="field"/>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[.2em] uppercase">MOBILE / WHATSAPP NUMBER *</span>
              <PhoneInput
                country={form.phoneCountry}
                value={form.phone}
                onChange={(value,country)=>setForm(p=>({...p,phone:`+${value.replace(/\D/g,"")}`,phoneCountry:country.countryCode}))}
                enableSearch
                searchPlaceholder="Search country..."
                countryCodeEditable={false}
                inputProps={{name:"phone",required:true,autoComplete:"tel"}}
                containerClass="phone-container"
                inputClass="phone-input"
                buttonClass="phone-button"
                dropdownClass="phone-dropdown"
                placeholder="98765 43210"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[.2em] uppercase">COUNTRY OF RESIDENCE *</span>
              <Select
                options={countryOptions}
                value={countryOptions.find(x=>x.label===form.country)||null}
                onChange={x=>setForm(p=>({...p,country:x.label,countryCode:x.value}))}
                isSearchable
                placeholder="Select your country..."
                formatOptionLabel={x=><div className="flex items-center gap-3"><ReactCountryFlag countryCode={x.value} svg style={{width:"1.35em",height:"1.35em"}}/><span>{x.label}</span></div>}
                styles={{
                  control:(base,state)=>({...base,minHeight:"50px",borderRadius:"0.75rem",borderColor:state.isFocused?"#1E7A3A":"rgba(198,167,94,.4)",backgroundColor:"#F1ECE2",boxShadow:state.isFocused?"0 0 0 1px #1E7A3A":"none",fontSize:".875rem",color:"#18352A",cursor:"pointer"}),
                  menu:(base)=>({...base,zIndex:50,borderRadius:"0.75rem",overflow:"hidden",backgroundColor:"#F8F5EE",boxShadow:"0 10px 30px rgba(18,60,42,.12)"}),
                  option:(base,state)=>({...base,backgroundColor:state.isSelected?"#123C2A":state.isFocused?"#F1ECE2":"#F8F5EE",color:state.isSelected?"#F8F5EE":"#18352A",cursor:"pointer",fontSize:".875rem",padding:"10px 12px"}),
                  singleValue:(base)=>({...base,color:"#18352A"}),
                  placeholder:(base)=>({...base,color:"rgba(107,112,106,.6)"}),
                  input:(base)=>({...base,color:"#18352A"}),
                  indicatorSeparator:()=>({display:"none"})
                }}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[.2em] uppercase">WHAT ARE YOU INTERESTED IN? *</span>
              <select required value={form.interestedIn} onChange={e=>update("interestedIn",e.target.value)} className="field">
                {interests.map(x=><option key={x}>{x}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[.2em] uppercase">ADDITIONAL QUESTIONS OR PREFERENCES *</span>
              <textarea required rows="4" value={form.query} onChange={e=>update("query",e.target.value)} placeholder="Share any questions, preferred dates, or personal preferences..." className="field resize-none"/>
            </label>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#6B706A]">
              <span className="text-[#1E7A3A]">✓</span>
              Confidential consultation • Direct verified partner matching
            </div>

            {successMsg&&!submitted&&<p className="text-center text-sm tracking-wide text-red-500">{successMsg}</p>}

            <button type="submit" disabled={loading} className="w-full rounded-full bg-[#123C2A] px-8 py-4 text-xs font-semibold tracking-[.22em] uppercase text-white transition hover:bg-[#1E7A3A] disabled:cursor-not-allowed disabled:opacity-50">
              {loading?"SENDING...":"START YOUR JOURNEY"} <span className="ml-2 text-[#C6A75E]">→</span>
            </button>

          </form>
        </div>
      }
    </div>

    <style>{`
      .field{width:100%;border:1px solid rgba(198,167,94,.4);border-radius:.75rem;background:#F1ECE2;padding:.875rem 1rem;font-size:.875rem;color:#18352A;outline:none;transition:.2s}
      .field:focus{border-color:#1E7A3A;box-shadow:0 0 0 1px #1E7A3A}
      .field::placeholder{color:rgba(107,112,106,.6)}
      .phone-container{width:100%!important}
      .phone-input{width:100%!important;height:50px!important;border:1px solid rgba(198,167,94,.4)!important;border-radius:.75rem!important;background:#F1ECE2!important;padding-left:58px!important;font-size:.875rem!important;color:#18352A!important}
      .phone-input:focus{border-color:#1E7A3A!important;box-shadow:0 0 0 1px #1E7A3A!important}
      .phone-button{border:1px solid rgba(198,167,94,.4)!important;border-radius:.75rem 0 0 .75rem!important;background:#F1ECE2!important}
      .phone-button:hover,.phone-button:focus{background:#F1ECE2!important}
      .phone-dropdown{border:1px solid rgba(198,167,94,.4)!important;border-radius:.75rem!important;background:#F8F5EE!important;color:#18352A!important;box-shadow:0 10px 30px rgba(18,60,42,.12)!important}
      .phone-dropdown .country:hover{background:#F1ECE2!important}
      .phone-dropdown .country.highlight{background:#E8EDE7!important}
      .phone-dropdown .search{background:#F8F5EE!important;border-bottom:1px solid rgba(198,167,94,.25)!important}
    `}</style>
  </section>
}

function FAQ(){
  const [open,setOpen]=useState(null);
  return <section id="faq" className="relative overflow-hidden bg-[#F8F5EE] py-28 md:py-36"><div className="mx-auto max-w-4xl px-6 sm:px-8"><div className="mb-16 max-w-xl"><Eyebrow>CLARITY & ASSURANCE</Eyebrow><h2 className="font-serif text-3xl leading-tight text-[#18352A] sm:text-4xl">Frequently Asked Questions</h2></div><div className="divide-y divide-[#C6A75E]/30 border-y border-[#C6A75E]/30">{FAQS.map(([q,a],i)=><div key={q} className="py-6"><button onClick={()=>setOpen(open===i?null:i)} className="group flex w-full items-center justify-between text-left"><span className="pr-6 font-serif text-base text-[#18352A] transition-colors group-hover:text-[#1E7A3A] sm:text-lg">{q}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C6A75E]/40 text-[#123C2A]">{open===i?"−":"+"}</span></button>{open===i&&<div className="animate-[fadeIn_.3s_ease] pt-4 pr-12 text-sm font-light leading-relaxed text-[#6B706A] sm:text-base">{a}</div>}</div>)}</div></div><style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style></section>
}

function Safety(){
  return <section id="safety-notice" className="border-t border-[#C6A75E]/20 bg-[#F1ECE2] py-12 text-[#6B706A]"><div className="mx-auto max-w-4xl px-6 text-center sm:px-8"><div className="mb-2 inline-flex items-center gap-2 text-[9px] font-medium tracking-[.25em] uppercase text-[#1E7A3A] sm:text-[10px]"><span className="text-[#C6A75E]">◆</span>IMPORTANT WELLNESS NOTICE</div><p className="mx-auto max-w-2xl text-xs font-light leading-relaxed sm:text-sm">DARSHAI does not diagnose or treat medical conditions. Recommendations are for wellness discovery and journey planning.</p></div></section>
}

function Final(){
  return <section id="final-cta" className="relative flex items-center justify-center overflow-hidden bg-[#123C2A] py-32 text-center text-[#F8F5EE] md:py-44"><div className="absolute inset-0 opacity-15"><div className="h-full w-full bg-cover bg-center" style={{backgroundImage:`url("${IMG.executive}")`}}/></div><div className="absolute inset-0 bg-gradient-to-t from-[#123C2A] via-[#123C2A]/90 to-[#123C2A]"/><div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 sm:px-8"><span className="mb-6 block text-[9px] font-medium tracking-[.35em] uppercase text-[#C6A75E] sm:text-[10px]">PRIVATE CONCIERGE DESK • INDIA</span><h2 className="mb-6 max-w-3xl font-serif text-4xl leading-[1.12] sm:text-6xl md:text-7xl">Ready to Explore<br/><span className="font-light italic text-[#F1ECE2]/90">Wellness in India?</span></h2><p className="mb-12 max-w-xl text-base font-light leading-relaxed text-[#F8F5EE]/80 sm:text-xl">Tell us about your goals, preferences and journey requirements.</p><div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"><Btn>BEGIN MY JOURNEY</Btn><Btn to="/geo-wellness-centres" outline>EXPLORE WELLNESS CENTRES</Btn></div></div></section>
}

export default function InternationalWellnessIndia(){
  const [goal,setGoal]=useState("Executive Wellness");
  const [duration,setDuration]=useState("14 DAYS");
  const [selectedCentre,setSelectedCentre]=useState(null);
  const scroll=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
  const selectGoal=x=>{setGoal(x);scroll("consultation")};
  const selectDuration=x=>{setDuration(x);scroll("consultation")};
  const selectCentre=x=>{setGoal(`Preferred Sanctuary: ${x}`);setSelectedCentre(null);scroll("consultation")};
  useEffect(()=>{document.documentElement.style.scrollBehavior="smooth";return()=>{document.documentElement.style.scrollBehavior=""}},[]);
  return <div className="min-h-screen overflow-x-hidden bg-[#F8F5EE] font-sans text-[#18352A] selection:bg-[#1E7A3A]/20 selection:text-[#123C2A]">
    <Hero scrollCentres={()=>scroll("centres")}/>
    <India/>
    <WhyDarshai/>
    <ChooseJourney onSelect={selectGoal}/>
    <JourneyTimeline/>
    <Difference/>
    <Recommendation/>
    <GeoWellness onSelect={selectGoal}/>
    <ChooseTime onSelect={selectDuration}/>
    <Centres onView={setSelectedCentre} onExplore={()=>scroll("centres")}/>
    <PrivateJourney/>
    <Payments onInquire={()=>scroll("consultation")}/>
    <Executive onExplore={()=>selectGoal("Corporate & Executive Wellness")}/>
    <ConciergeForm initialGoal={goal} initialDuration={duration} onExploreCentres={()=>scroll("centres")}/>
    <FAQ/>
    <Safety/>
    <Final/>
    <CentreModal centre={selectedCentre} onClose={()=>setSelectedCentre(null)} onSelect={selectCentre}/>
  </div>
}