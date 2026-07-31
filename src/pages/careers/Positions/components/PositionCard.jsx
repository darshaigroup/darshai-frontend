import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Clock3, MapPin, Users } from "lucide-react";
import PositionBadge from "./PositionBadge";
import PositionInfoChip from "./PositionInfoChip";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const PositionCard = ({ position, onView }) => (
  <motion.article
    variants={fadeUp}
    initial="hidden"
    animate="show"
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
    layout
    className="group relative overflow-hidden rounded-[28px] border border-[#E7ECE8] bg-white p-7 shadow-[0_10px_35px_rgba(16,24,40,.05)]"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-5">
        <PositionBadge>{position.department}</PositionBadge>

        <div>
          <h3 className="font-['Playfair_Display'] text-[1.8rem] font-semibold leading-tight text-[#162A1E] transition-colors group-hover:text-[#1E7A3A]">
            {position.title}
          </h3>

          <p className="mt-3 text-[15px] leading-7 text-[#66746B]">
            {position.description}
          </p>
        </div>
      </div>

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF8F2] text-[#1E7A3A]">
        <Briefcase size={24} />
      </div>
    </div>

    <div className="mt-7 flex flex-wrap gap-3">
      <PositionInfoChip icon={MapPin}>{position.location}</PositionInfoChip>

      <PositionInfoChip icon={Clock3}>{position.experience}</PositionInfoChip>

      <PositionInfoChip icon={Users}>
        {position.vacancies} Vacanc{position.vacancies > 1 ? "ies" : "y"}
      </PositionInfoChip>
    </div>

    <div className="mt-8 border-t border-[#EEF2EF] pt-6">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[.16em] text-[#162A1E]">
        Key Skills
      </h4>

      <div className="flex flex-wrap gap-2">
        {position.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-[#F5F8F6] px-3 py-1.5 text-[12px] font-medium text-[#516257]"
          >
            {skill}
          </span>
        ))}

        {position.skills.length > 4 && (
          <span className="rounded-full border border-[#D9E4DD] px-3 py-1.5 text-[12px] font-semibold text-[#1E7A3A]">
            +{position.skills.length - 4} More
          </span>
        )}
      </div>
    </div>

    <div className="mt-8 flex items-center justify-between border-t border-[#EEF2EF] pt-6">
      <div>
        <p className="text-xs uppercase tracking-[.16em] text-[#95A198]">
          Employment
        </p>

        <p className="mt-1 font-medium text-[#162A1E]">
          {position.employmentType}
        </p>
      </div>

      <button
        onClick={() => onView(position)}
        className="inline-flex items-center gap-2 rounded-full bg-[#1E7A3A] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#17622F]"
      >
        View Details
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  </motion.article>
);

export default PositionCard;
