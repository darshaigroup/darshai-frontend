import {useState} from "react";
import {motion} from "framer-motion";
import{
UserPlus,
Search,
ClipboardCheck,
Users,
UserCheck,
Building2,
Award,
Crown,
FileBadge,
Rocket,
ArrowDown,
CheckCircle2
}from"lucide-react";

const fadeUp={
  hidden:{opacity:0,y:40},
  show:{
    opacity:1,
    y:0,
    transition:{duration:.7}
  }
};

const steps=[
{
  id:1,
  part:"PART 1",
  sectionTitle:"Initial Evaluation",
  sectionSubtitle:"Online preliminary screening and technical skill verification",
  icon:UserPlus,
  title:"Candidate Registration",
  description:"Submit your profile, background details, and resume directly through our candidate registration portal.",
  badge:"Online Portal"
},
{
  id:2,
  icon:Search,
  title:"Resume Screening",
  description:"Talent acquisition and domain heads review your background alignment against open position prerequisites.",
  badge:"Shortlisting"
},
{
  id:3,
  icon:Users,
  title:"Group Discussion",
  description:"Participate in a collaborative group discussion evaluating communication, problem-solving, and team alignment.",
  badge:"Interactive Session"
},
{
  id:4,
  icon:ClipboardCheck,
  title:"Written Assessment",
  description:"Complete a practical task, case study, or role-specific assignment designed to showcase your technical capability.",
  badge:"Practical Task"
},
{
  id:5,
  icon:UserCheck,
  title:"HR Interview",
  description:"Connect with our HR leadership to discuss career aspirations, company values, and cultural fit.",
  badge:"Culture Fit"
},
{
  id:6,
  part:"PART 2",
  sectionTitle:"On-Site Office Interview",
  sectionSubtitle:"In-person evaluation at headquarters focusing on domain mastery and leadership alignment",
  icon:Building2,
  title:"Role-Specific Functional Interview",
  description:"An in-person practical interview to assess communication, client handling, lead generation, partnership development, problem-solving, and role suitability.",
  badge:"On-Site / Department Head"
},
{
  id:7,
  icon:Crown,
  title:"Founder Interview",
  description:"Strategic conversation with Founder Veekshitha V exploring long-term vision, leadership, and performance expectations.",
  badge:"Executive Vision"
},
{
  id:8,
  part:"PART 3",
  sectionTitle:"Results & Onboarding",
  sectionSubtitle:"Final decision, formal offer dispatch, and team integration",
  icon:Award,
  title:"Final Evaluation",
  description:"Consolidation and review of evaluation feedback from every selection stage by the hiring committee.",
  badge:"Committee Review"
},
{
  id:9,
  icon:FileBadge,
  title:"Offer Letter",
  description:" Official offer communication detailing the role, compensation, joining date, reporting structure, and employment terms.",
  badge:"Formal Dispatch"
},
{
  id:10,
  icon:Rocket,
  title:"Onboarding",
  description:"Welcome to DARSHAI! Executive orientation, mentorship pairing, and immediate integration into active innovation initiatives.",
  badge:"Day 1 & Beyond"
}
];

const RecruitmentSection=()=>{

const[active,setActive]=useState(2);

return(
  <section
  id="recruitment"
  className="relative overflow-hidden bg-[#FBF8F1] py-24 md:py-28"
>
  <div className="mx-auto max-w-6xl px-5 md:px-6">

    {/* Hero */}

    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{once:true}}
      className="text-center"
    >

      <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE6D5] bg-[#EEF8F1] px-4 py-1.5">
        <CheckCircle2 size={14} className="text-[#2F8A49]" />

        <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#2F8A49]">
          Recruitment Journey
        </span>
      </div>

      <h2 className="mt-5 font-serif text-4xl font-bold text-[#1C2A22] md:text-6xl">
        Your Path to DARSHAI
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-[#68756D]">
        A transparent multi-stage recruitment process carefully designed for
        fairness, technical excellence, leadership evaluation, and long-term
        career growth.
      </p>

    </motion.div>

    {/* Timeline */}

    <div className="relative mx-auto mt-20 max-w-5xl md:mt-24">

      {/* Vertical Line */}

      <div className="absolute left-[27px] top-3 bottom-0 w-[2px] bg-[#C7D8CC]">

        <motion.div
          initial={{height:0}}
          whileInView={{height:"100%"}}
          viewport={{once:true}}
          transition={{duration:2}}
          className="w-full bg-[#2F8A49]"
        />

      </div>

      <div className="space-y-14 md:space-y-16">
        {steps.map((step,index)=>{
          const Icon=step.icon;
          const isActive=active===index;
          const showPart=Boolean(step.part);

          return(
            <div key={step.id}>

              {showPart&&(
                <motion.div
                  initial={{opacity:0,y:25}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true}}
                  transition={{duration:.5}}
                  className="relative mb-10 flex items-start gap-5"
                >
                  <div className="ml-[18px] rounded-full bg-[#1E7A3A] px-4 py-2 shadow-lg">
                    <span className="text-[11px] font-bold uppercase tracking-[.18em] text-white">
                      {step.part}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-[30px] font-bold leading-none text-[#1F2A22] md:text-[42px]">
                      {step.sectionTitle}
                    </h3>

                    <p className="mt-2 text-[15px] text-[#69756D] md:text-[18px]">
                      {step.sectionSubtitle}
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{opacity:0,y:40}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:false,amount:.35}}
                transition={{duration:.55,delay:index*.08}}
                whileHover={{x:6}}
                whileTap={{scale:.99}}
                onMouseEnter={()=>setActive(index)}
                onClick={()=>setActive(index)}
                onViewportEnter={()=>setActive(index)}
                className="group relative flex cursor-pointer items-start gap-5"
              >

                {/* Timeline Icon */}

                <div className="relative z-20 flex w-14 shrink-0 justify-center">

                  <motion.div
                    animate={{
                      scale:isActive?1.08:1,
                      backgroundColor:isActive?"#1E7A3A":"#FFFFFF",
                      borderColor:"#1E7A3A"
                    }}
                    transition={{duration:.25}}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-lg"
                  >
                    <Icon
                      size={22}
                      strokeWidth={2.1}
                      className={isActive?"text-white":"text-[#1E7A3A]"}
                    />
                  </motion.div>

                  <motion.div
                    animate={{scale:isActive?1.05:1}}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D6A728] text-[10px] font-bold text-white"
                  >
                    {step.id}
                  </motion.div>

                </div>

                {/* Content */}

                <motion.div
                  animate={{x:isActive?8:0}}
                  transition={{duration:.25}}
                  className="flex-1 pb-4"
                >

                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                    <div className="min-w-0 flex-1">

                      <h3
                        className={`font-serif text-[28px] font-bold leading-tight transition-colors duration-300 md:text-[34px] ${
                          isActive
                            ? "text-[#1E7A3A]"
                            : "text-[#223227]"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-4 max-w-2xl text-[15px] leading-8 text-[#6A756E] md:text-[16px]">
                        {step.description}
                      </p>

                    </div>

                    <motion.div
                      animate={{
                        scale:isActive?1.04:1,
                        backgroundColor:isActive?"#EAF6ED":"#F8FBF9"
                      }}
                      transition={{duration:.25}}
                      className="inline-flex h-fit items-center rounded-full border border-[#C9DED0] px-4 py-2 shadow-sm"
                    >
                      <span className="whitespace-nowrap text-[12px] font-semibold text-[#2F8A49]">
                        {step.badge}
                      </span>
                    </motion.div>

                  </div>

                  {/* Footer */}

                  <div className="mt-8 flex items-center gap-3">

                    <motion.div
                      animate={{
                        backgroundColor:isActive?"#2F8A49":"#C7D7CB"
                      }}
                      transition={{duration:.3}}
                      className="h-px flex-1"
                    />

                    <div className="flex items-center gap-2">

                      <motion.div
                        animate={isActive?{y:[0,3,0]}:{y:0}}
                        transition={{repeat:Infinity,duration:1.4}}
                      >
                        <ArrowDown
                          size={14}
                          className={isActive?"text-[#2F8A49]":"text-[#97A49D]"}
                        />
                      </motion.div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-[.18em] ${
                          isActive
                            ? "text-[#2F8A49]"
                            : "text-[#97A49D]"
                        }`}
                      >
                        {step.id===steps.length
                          ?"Welcome to DARSHAI"
                          :"Proceeding to Next Step"}
                      </span>

                    </div>

                    <motion.div
                      animate={{
                        backgroundColor:isActive?"#2F8A49":"#C7D7CB"
                      }}
                      transition={{duration:.3}}
                      className="h-px flex-1"
                    />

                  </div>

                  {index!==steps.length-1&&(
                    <div className="mt-10 border-b border-[#E6ECE8]" />
                  )}

                </motion.div>

              </motion.div>

            </div>
          );
        })}
      </div>

      {/* Background Glow */}

      <motion.div
        animate={{opacity:.35,scale:1}}
        transition={{duration:.6}}
        className="pointer-events-none absolute inset-0 -z-20 rounded-[60px] bg-[radial-gradient(circle_at_center,rgba(47,138,73,.08),transparent_70%)]"
      />

      <div className="pointer-events-none absolute -left-44 top-20 -z-30 h-80 w-80 rounded-full bg-[#2F8A49]/5 blur-[120px]" />

      <div className="pointer-events-none absolute -right-44 bottom-10 -z-30 h-96 w-96 rounded-full bg-[#D6A728]/5 blur-[140px]" />

    </div>
  </div>
</section>
);
};

export default RecruitmentSection;