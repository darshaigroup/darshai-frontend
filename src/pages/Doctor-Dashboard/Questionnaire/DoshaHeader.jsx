import { motion } from "framer-motion";

const doshas = [
  { name: "Vata", color: "bg-blue-400" },
  { name: "Pitta", color: "bg-red-400" },
  { name: "Kapha", color: "bg-green-400" }
];

export default function DoshaHeader({ activeIndex }) {
  return (
    <div className="relative flex justify-center items-center gap-20 mb-12">

      {/* Stem line */}
      <div className="absolute top-6 w-[60%] h-[2px] bg-white/20"></div>

      {/* Moving Node */}
      <motion.div
        animate={{ x: activeIndex * 120 - 120 }}
        transition={{ duration: 0.5 }}
        className="absolute top-5 w-4 h-4 bg-emerald-400 rounded-full z-10"
      />

      {doshas.map((d, i) => (
        <div key={i} className="flex flex-col items-center z-20">
          <div className={`w-12 h-12 rounded-full ${d.color}`} />
          <p className="text-white mt-2">{d.name}</p>
        </div>
      ))}
    </div>
  );
}