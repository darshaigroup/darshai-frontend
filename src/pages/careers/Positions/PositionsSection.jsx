import {useMemo,useState} from "react";
import {motion} from "framer-motion";
import PositionHeader from "./components/PositionHeader";
import PositionFilter from "./components/PositionFilter";
import PositionCard from "./components/PositionCard";
import PositionModal from "./components/PositionModal";
import PositionEmptyState from "./components/PositionEmptyState";

const fade={
  hidden:{opacity:0,y:40},
  show:{
    opacity:1,
    y:0,
    transition:{staggerChildren:.08,duration:.45}
  }
};

const positions=[
  {
    id:1,
    featured:true,
    department:"Business Development",
    category:"Sales/Marketing",
    title:"Client Acquisition & Strategic Partnerships Executive",

    description:
      "Acquire new clients, build strategic partnerships, conduct corporate outreach, and drive DARSHAI's business growth through measurable client acquisition and revenue generation.",

    overview:
      "As a Client Acquisition & Strategic Partnerships Executive, you'll focus on acquiring new B2B and B2C clients, developing strategic wellness partnerships, conducting corporate outreach, and building long-term relationships that contribute directly to DARSHAI's business growth.",

    location:"Mangalore",
    experience:"0–3 Years",
    employmentType:"Full Time",
    salary:"₹2.40 LPA–₹3.00 LPA + Performance Incentives",
    vacancies:1,

    qualifications:[
      "MBA / BBA / Commerce / Management / Healthcare Management",
      "Confident communicator",
      "Comfortable meeting new people",
      "Sales or business development mindset",
      "Self-driven and target-oriented",
      "Willing to travel for meetings"
    ],

    responsibilities:[
      "Generate B2B and B2C leads.",
      "Convert enquiries into clients.",
      "Build partnerships with wellness centres and organisations.",
      "Conduct corporate outreach and presentations.",
      "Manage client and partner relationships.",
      "Achieve monthly growth and revenue targets.",
      "Coordinate with internal teams for successful onboarding."
    ],

    skills:[
      "Communication",
      "Networking",
      "Presentation",
      "Sales & Negotiation",
      "Lead Generation",
      "CRM Management",
      "MS Office",
      "Google Workspace",
      "Relationship Management",
      "Time Management"
    ],

    success:[
      "Acquire new qualified clients every month.",
      "Build strategic wellness partnerships.",
      "Conduct corporate outreach.",
      "Meet monthly acquisition targets."
    ]
  },

  {
    id:2,
    featured:false,
    department:"Client Experience",
    category:"Sales/Marketing",
    title:"Client Relationship Executive (Female Preferred)",

    description:
      "Manage client enquiries, onboarding, follow-ups, wellness coordination, documentation, and communication to deliver a professional and trusted client experience.",

    overview:
      "As a Client Relationship Executive, you'll serve as a primary point of contact for clients, coordinate their wellness journey, maintain accurate documentation, resolve queries, and work closely with internal teams to ensure a smooth and professional client experience.",

    location:"Mangalore",
    experience:"0–3 Years",
    employmentType:"Full Time",
    salary:"₹2.40 LPA–₹3.00 LPA",
    vacancies:1,

    qualifications:[
      "MBA / BA / BBA / Psychology / Hospital Administration",
      "Excellent communication skills",
      "Passion for delivering excellent client experiences.",
      "CRM knowledge preferred"
    ],

    responsibilities:[
      "Manage client onboarding and documentation.",
      "Coordinate appointments and wellness programs.",
      "Build strong client relationships.",
      "Resolve client queries and provide timely support.",
      "Maintain accurate CRM records.",
      "Ensure a smooth client experience.",
      "Coordinate with internal teams for service delivery."
    ],

    skills:[
      "CRM",
      "Communication",
      "Documentation",
      "Empathy",
      "Google Workspace",
      "Problem Solving",
      "Client Coordination",
      "Relationship Management"
    ],

    success:[
      "Deliver an exceptional client experience.",
      "Ensure timely onboarding and follow-ups.",
      "Maintain accurate documentation.",
      "Achieve high client satisfaction."
    ]
  }
];

const PositionsSection=()=>{
  const [category,setCategory]=useState("All");
  const [selected,setSelected]=useState(null);
  const [open,setOpen]=useState(false);

  const filtered=useMemo(
    ()=>category==="All"
      ?positions
      :positions.filter(job=>job.category===category),
    [category]
  );

  const openModal=job=>{
    setSelected(job);
    setOpen(true);
  };

  const closeModal=()=>{
    setOpen(false);
    setTimeout(()=>setSelected(null),200);
  };

  const applyJob=job=>console.log("Apply:",job);

  return(
    <section id="position" className="relative overflow-hidden bg-[#fffefe] py-24">
      <div className="relative mx-auto max-w-[1450px] px-6 lg:px-10">
        <PositionHeader/>

        <PositionFilter active={category} onChange={setCategory}/>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{once:true,amount:.15}}
          className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.length?(
            filtered.map(position=>(
              <PositionCard
                key={position.id}
                position={position}
                onView={openModal}
              />
            ))
          ):(
            <div className="col-span-full">
              <PositionEmptyState onReset={()=>setCategory("All")}/>
            </div>
          )}
        </motion.div>

        <PositionModal
          open={open}
          position={selected}
          onClose={closeModal}
          onApply={applyJob}
        />
      </div>
    </section>
  );
};

export default PositionsSection;