import { Shield, Sparkles, Headphones, Building2, LineChart, Users, ArrowUpRight } from "lucide-react";
import sover from "@/assets/images/health.jpeg";
import corporate from "@/assets/images/nature.jpeg";
import maintenance from "@/assets/images/maintenance.png";
import prepkit from "@/assets/images/prepkit.png";
import precision from "@/assets/images/precision.png";
import environment from "@/assets/images/environment.png";

const brandGreen="#1E7A3A",brandGold="#C9A75B",brandBlue="#174EA6";

const ecosystem=[
  {no:"01",title:"Precision Assessment",desc:"AI-Powered Biological & Lifestyle Intelligence",content:`Every wellness journey begins with understanding the individual. DARSHAI's Precision Assessment combines structured health questionnaires, lifestyle analysis, wellness goals, environmental preferences, and clinical insights to identify factors that may be affecting long-term well-being. Rather than offering generic recommendations, we evaluate the person as a whole to understand recovery needs, health priorities, and lifestyle challenges. This foundation helps create a more personalized and meaningful Geo-Wellness journey aligned with each individual's unique circumstances and objectives.`,icon:Shield,img:sover},
  {no:"02",title:"Sovereign Protocols",desc:"Personalized Geo-Wellness Interventions",content:`Sovereign Protocols are personalized wellness journeys designed around an individual's assessment outcomes, goals, and recovery requirements. DARSHAI combines curated wellness destinations, therapeutic programs, environmental suitability, and evidence-informed wellness practices to create tailored interventions. Whether the objective is stress recovery, executive wellness, rejuvenation, or long-term health optimization, each protocol is designed to connect the right person with the right environment, experience, and wellness approach at the right time.`,icon:Sparkles,img:corporate},
  {no:"03",title:"Longevity Concierge",desc:"Continuous Guidance Beyond the Retreat",content:`Wellness should not end when a program concludes. The DARSHAI Longevity Concierge provides ongoing support before, during, and after the wellness experience. From coordinating consultations and wellness centre bookings to helping individuals stay accountable to their health goals, the concierge ensures a seamless experience throughout the journey. Continuous guidance, personalized recommendations, and structured follow-ups help clients maintain momentum and integrate positive wellness practices into their daily lives long after their retreat has ended.`,icon:Headphones,img:maintenance},
  {no:"04",title:"Corporate Longevity",desc:"Executive Recovery & Workforce Resilience",content:`Modern workplaces face increasing challenges related to stress, burnout, fatigue, and declining employee well-being. DARSHAI's Corporate Longevity programs are designed to support founders, executives, leadership teams, and organizations through personalized recovery experiences and workplace wellness strategies. By focusing on resilience, performance, recovery, and sustainable well-being, these programs help individuals and teams improve focus, energy, productivity, and overall organizational health while creating healthier and more resilient work environments.`,icon:Building2,img:prepkit},
  {no:"05",title:"Longevity Intelligence",desc:"Measure What Matters",content:`Meaningful wellness outcomes require more than subjective experiences. DARSHAI's Longevity Intelligence framework focuses on tracking progress, measuring outcomes, and improving decision-making through data-driven insights. Using tools such as Protocol Efficacy Scores (PES), wellness indicators, progress analytics, and structured review systems, we help individuals understand the impact of their wellness journey over time. This approach transforms wellness from a one-time experience into a measurable and continuously improving process focused on long-term health outcomes.`,icon:LineChart,img:precision},
  {no:"06",title:"The DARSHAI Collective",desc:"People. Places. Knowledge.",content:`The DARSHAI Collective is a growing network of wellness centres, clinicians, longevity experts, researchers, innovators, and health-conscious individuals connected by a shared commitment to better health and well-being. By bringing together expertise, environments, and diverse wellness perspectives, the Collective creates opportunities for learning, collaboration, and meaningful health transformation. It represents DARSHAI's vision of building a trusted ecosystem where people can access knowledge, guidance, and carefully curated wellness experiences designed for long-term well-being.`,icon:Users,img:environment},
];

const collectiveItems=[
  {title:"Wellness Centres",text:"Curated environments where meaningful wellness journeys take place."},
  {title:"Doctors",text:"Clinical and wellness professionals contributing expertise and guidance."},
  {title:"Executives",text:"Leaders seeking resilience, recovery and sustainable performance."},
  {title:"Researchers",text:"Knowledge builders advancing the understanding of long-term well-being."},
  {title:"Communities",text:"Individuals connected by a shared commitment to better health."},
];

export default function ProtocolPreview(){
  return <section className="bg-[#F6F3EF] overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 md:pt-32 pb-10">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[10px] md:text-xs tracking-[.35em] uppercase font-semibold text-[#C9A75B]">The DARSHAI Ecology</span>
        <h2 className="mt-5 text-[42px] sm:text-[54px] md:text-[72px] font-serif leading-[1.02] tracking-[-.03em] text-[#1E7A3A]">The DARSHAI Longevity Ecosystem</h2>
        <p className="mt-7 mx-auto max-w-2xl text-sm sm:text-base md:text-lg leading-8 text-[#1E7A3A]/75">An integrated ecosystem combining assessment, Geo-Wellness interventions, longevity intelligence, concierge support, and measurable outcomes.</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-28">
      <div className="flex items-center gap-5 mb-16">
        <div className="h-px flex-1 bg-[#C9A75B]/30"/>
        <span className="text-[10px] sm:text-xs tracking-[.3em] uppercase text-[#1E7A3A]/70 font-semibold">The DARSHAI Longevity Ecosystem</span>
        <div className="h-px flex-1 bg-[#C9A75B]/30"/>
      </div>

      <div className="space-y-24 md:space-y-32">
        {ecosystem.map((item,i)=>{
          const Icon=item.icon;
          return <article key={item.no} className={`grid lg:grid-cols-2 items-center gap-12 lg:gap-20 ${i%2?"lg:[&>div:first-child]:order-2":""}`}>
            <div className="relative">
              <span className="absolute -top-12 -left-2 md:-left-6 text-[100px] md:text-[150px] font-serif leading-none text-[#1E7A3A]/[.045] select-none pointer-events-none">{item.no}</span>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#1E7A3A] to-[#174EA6] flex items-center justify-center shadow-[0_15px_40px_rgba(23,78,166,.25)] border border-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(23,78,166,.3)]">
                    <Icon className="text-white" size={24} strokeWidth={1.7}/>
                  </div>
                </div>

                <h3 className="text-[38px] sm:text-[48px] md:text-[60px] font-serif leading-[1.03] tracking-[-.025em] text-[#1E7A3A] mb-6">{item.title}</h3>

                <p className="text-base sm:text-lg md:text-xl italic leading-8 text-[#C9A75B] border-l border-[#C9A75B]/50 pl-5 mb-7 max-w-xl">{item.desc}</p>

                <p className="text-sm sm:text-base md:text-lg leading-8 text-[#1E7A3A]/80 max-w-2xl">{item.content}</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-3 rounded-[38px] border border-[#C9A75B]/15 transition-all duration-700 group-hover:border-[#174EA6]/35 group-hover:scale-[1.01]"/>
              <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.14)]">
                <img src={item.img} alt={item.title} className="w-full h-[420px] sm:h-[520px] md:h-[620px] object-cover transition-transform duration-[1400ms] group-hover:scale-105"/>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{background:"linear-gradient(to top,rgba(23,78,166,.92),rgba(23,78,166,.45),transparent)"}}/>
              </div>
            </div>
          </article>;
        })}
      </div>
    </div>

    <section className="bg-[#F6F3EF] px-5 sm:px-8 lg:px-10 py-24 md:py-32 border-t border-[#C9A75B]/15">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-[10px] md:text-xs tracking-[.35em] uppercase text-[#C9A75B] font-semibold">The DARSHAI Collective</span>
            <h2 className="mt-5 text-[48px] sm:text-[58px] md:text-[76px] font-serif leading-[.98] tracking-[-.03em] text-[#1E7A3A]">The DARSHAI Collective</h2>
            <p className="mt-7 text-base md:text-lg leading-8 text-[#1E7A3A]/70">People. Places. Knowledge.</p>
          </div>

          <div>
            <p className="text-xl sm:text-2xl md:text-3xl leading-[1.55] font-serif text-[#1E7A3A]">DARSHAI is building a global network of wellness centres, clinicians, longevity experts, innovators and individuals committed to long-term health optimization.</p>

            <p className="mt-7 text-sm sm:text-base md:text-lg leading-8 text-[#1E7A3A]/75">The Collective connects people, knowledge, environments and outcomes through a shared commitment to better health.</p>

            <div className="mt-14 border-t border-[#1E7A3A]/15">
              {collectiveItems.map((item,i)=><div key={item.title} className="group border-b border-[#1E7A3A]/15 py-6 md:py-7 flex gap-5 items-start transition-all duration-500 hover:px-3 hover:border-[#174EA6]/40">
                <span className="text-[10px] tracking-[.25em] text-[#C9A75B] pt-1 transition-colors duration-500 group-hover:text-[#174EA6]">0{i+1}</span>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-serif text-[#1E7A3A] transition-colors duration-500 group-hover:text-[#174EA6]">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm md:text-base leading-7 text-[#1E7A3A]/60 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">{item.text}</p>
                </div>
              </div>)}
            </div>

            <div className="mt-14 rounded-3xl border border-[#C9A75B]/25 bg-white/40 p-7 md:p-10 transition-all duration-500 hover:border-[#174EA6]/30 hover:shadow-[0_20px_60px_rgba(23,78,166,.08)]">
              <p className="text-[10px] tracking-[.3em] uppercase text-[#C9A75B] mb-4">A Growing Network</p>
              <p className="text-base md:text-lg leading-8 text-[#1E7A3A]/75">By bringing together wellness centres, doctors, executives, researchers and communities, the Collective creates opportunities for learning, collaboration and meaningful health transformation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>;
}