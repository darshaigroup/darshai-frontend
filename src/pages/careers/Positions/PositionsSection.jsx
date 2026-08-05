import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PositionHeader from "./components/PositionHeader";
import PositionFilter from "./components/PositionFilter";
import PositionCard from "./components/PositionCard";
import PositionModal from "./components/PositionModal";
import PositionEmptyState from "./components/PositionEmptyState";

const fade = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.45 },
  },
};

const positions = [
  {
    id:1,
    featured:true,
    department:"Business Development",
    category:"Sales/Marketing",
    title:"Client Acquisition & Strategic Partnerships Executive",
    description:
      "Build strategic healthcare partnerships, strengthen community engagement, and accelerate DarshAI's preventive healthcare ecosystem.",
    overview:
      "As a Client Acquisition & Strategic Partnerships Executive, you'll collaborate with hospitals, wellness organizations, NGOs, institutions, and strategic partners to expand DarshAI's impact while driving outreach initiatives and long-term collaborations.",
    location: "Mangalore",
    experience: "0–3 Years",
    employmentType: "Full Time",
    salary: "₹2.40 LPA–₹3.00 LPA + Attractive Incentives",
    vacancies: 1,
    qualifications: [
      "MBA/ BBA / Commerce / Management / Healthcare Management",
      "Excellent communication & presentation skills",
      "Strong interpersonal & networking abilities",
      "Willingness to work in a startup environment",
    ],
    responsibilities: [
      "Identify and onboard strategic partners.",
      "Coordinate community engagement activities.",
      "Develop partnership proposals & presentations.",
      "Maintain long-term stakeholder relationships.",
      "Collaborate with internal product & operations teams.",
    ],
    skills: [
      "Communication",
      "Networking",
      "Presentation",
      "MS Office",
      "Google Workspace",
      "Relationship Management",
      "Time Management",
    ],
  },
  {
    id: 2,
    featured:false,
    department:"Client Experience",
    category:"Sales/Marketing",
    title:"Client Relationship Executive",
    description:
      "Deliver exceptional client experiences by managing patient relationships, onboarding, and operational communication.",
    overview:
      "You'll become the primary point of contact for patients and partners, ensuring a seamless experience throughout their wellness journey while coordinating closely with internal teams.",
    location: "Mangalore",
    experience: "0–3 Years",
    employmentType: "Full Time",
    salary: "₹2.20 LPA–₹2.80 LPA",
    vacancies: 1,
    qualifications: [
      "MBA / BBA / Psychology / Hospital Administration",
      "Excellent communication skills",
      "Customer-first mindset",
      "CRM knowledge preferred",
    ],
    responsibilities: [
      "Manage client onboarding.",
      "Coordinate appointments.",
      "Maintain CRM records.",
      "Resolve client queries.",
      "Support operational workflows.",
    ],
    skills: [
      "CRM",
      "Communication",
      "Documentation",
      "Empathy",
      "Google Workspace",
      "Problem Solving",
    ],
  },
  // {
  //   id: 3,
  //   featured:false,
  //   department:"Consultant Opportunities",
  //   category:"Consultant",
  //   title:"Senior Ayurveda Advisor",
  //   description:
  //     "Guide preventive healthcare programs with deep Ayurvedic expertise while collaborating with DarshAI's AI-driven longevity platform.",
  //   overview:
  //     "Support evidence-based wellness protocols, mentor practitioners, and contribute domain expertise to clinical and product initiatives.",
  //   location: "Mangalore",
  //   experience: "5+ Years",
  //   employmentType: "Consultant",
  //   salary: "Negotiable",
  //   vacancies: 1,
  //   qualifications: [
  //     "BAMS / MD Ayurveda",
  //     "Strong clinical experience",
  //     "Evidence-based practice mindset",
  //   ],
  //   responsibilities: [
  //     "Review wellness protocols.",
  //     "Guide clinical consultations.",
  //     "Collaborate with AI research teams.",
  //     "Support practitioner training.",
  //   ],
  //   skills: [
  //     "Ayurveda",
  //     "Clinical Practice",
  //     "Leadership",
  //     "Mentoring",
  //     "Healthcare",
  //   ],
  // },
];

const PositionsSection = () => {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      category === "All"
        ? positions
        : positions.filter((job) => job.category === category),
    [category],
  );

  const openModal = (job) => {
    setSelected(job);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setSelected(null), 200);
  };
  const applyJob = (job) => console.log("Apply:", job);

  return (
    <section id="position" className="relative overflow-hidden bg-[#fffefe] py-24">
      <div className="relative mx-auto max-w-[1450px] px-6 lg:px-10">
        <PositionHeader />

        <PositionFilter active={category} onChange={setCategory} />

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.length ? (
            filtered.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                onView={openModal}
              />
            ))
          ) : (
            <div className="col-span-full">
              <PositionEmptyState onReset={() => setCategory("All")} />
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
