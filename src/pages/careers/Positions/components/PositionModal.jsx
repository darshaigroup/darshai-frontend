import { AnimatePresence, motion } from "framer-motion";
import {Briefcase,Building2,Clock3,IndianRupee,MapPin,Users,X,
} from "lucide-react";
import PositionBadge from "./PositionBadge";
import PositionInfoChip from "./PositionInfoChip";
import PositionSkills from "./PositionSkills";

const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};
const modal = {
  hidden: { opacity: 0, scale: 0.96, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.96, y: 30, transition: { duration: 0.2 } },
};

const PositionModal = ({ open, position, onClose, onApply }) => {
  if (!position) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-[0_40px_90px_rgba(0,0,0,.22)]"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#E6ECE8] bg-white text-[#56665B] transition hover:bg-[#F5F8F6] hover:text-[#1E7A3A]"
            >
              <X size={20} />
            </button>

            <div className="max-h-[92vh] overflow-y-auto">
              <section className="relative overflow-hidden bg-gradient-to-br from-[#1E7A3A] via-[#256B39] to-[#163F25] px-6 py-10 text-white sm:px-10 sm:py-12">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#C89C37]/20 blur-3xl" />

                <div className="relative z-10">
                  <PositionBadge className="border-white/20 bg-white/10 text-white">
                    {position.department}
                  </PositionBadge>

                  <h2 className="mt-6 font-['Playfair_Display'] text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                    {position.title}
                  </h2>

                  <p className="mt-5 max-w-3xl text-[15px] leading-8 text-white/85 sm:text-base">
                    {position.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PositionInfoChip icon={MapPin}>
                      {position.location}
                    </PositionInfoChip>

                    <PositionInfoChip icon={Clock3}>
                      {position.experience}
                    </PositionInfoChip>

                    <PositionInfoChip icon={Users}>
                      {position.vacancies} Vacanc
                      {position.vacancies > 1 ? "ies" : "y"}
                    </PositionInfoChip>

                    <PositionInfoChip icon={Briefcase}>
                      {position.employmentType}
                    </PositionInfoChip>

                    {position.salary && (
                      <PositionInfoChip icon={IndianRupee}>
                        {position.salary}
                      </PositionInfoChip>
                    )}
                  </div>
                </div>
              </section>

              <section className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
                <div className="grid gap-10 lg:grid-cols-[1.6fr_.9fr]">
                  <div className="space-y-10">
                    <div>
                      <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold text-[#162A1E]">
                        <Building2 size={20} className="text-[#1E7A3A]" />
                        Role Overview
                      </h3>

                      <p className="leading-8 text-[#58665E]">
                        {position.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-5 text-xl font-semibold text-[#162A1E]">
                        Key Responsibilities
                      </h3>

                      <ul className="space-y-4">
                        {position.responsibilities?.map((item, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#1E7A3A]" />
                            <p className="leading-7 text-[#58665E]">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <PositionSkills
                      title="Required Skills"
                      skills={position.skills || []}
                    />
                  </div>

                  <div className="space-y-8">
                    <div className="rounded-[24px] border border-[#E6ECE8] bg-[#F8FBF9] p-7">
                      <h3 className="mb-5 text-lg font-semibold text-[#162A1E]">
                        Position Details
                      </h3>

                      <div className="space-y-5">
                        <div>
                          <p className="text-xs uppercase tracking-[.16em] text-[#8A958D]">
                            Department
                          </p>
                          <p className="mt-1 font-medium text-[#162A1E]">
                            {position.department}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[.16em] text-[#8A958D]">
                            Employment Type
                          </p>
                          <p className="mt-1 font-medium text-[#162A1E]">
                            {position.employmentType}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[.16em] text-[#8A958D]">
                            Experience
                          </p>
                          <p className="mt-1 font-medium text-[#162A1E]">
                            {position.experience}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[.16em] text-[#8A958D]">
                            Location
                          </p>
                          <p className="mt-1 font-medium text-[#162A1E]">
                            {position.location}
                          </p>
                        </div>

                        {position.salary && (
                          <div>
                            <p className="text-xs uppercase tracking-[.16em] text-[#8A958D]">
                              Compensation
                            </p>
                            <p className="mt-1 font-semibold text-[#1E7A3A]">
                              {position.salary}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[#E6ECE8] bg-white p-7">
                      <h3 className="mb-5 text-lg font-semibold text-[#162A1E]">
                        Qualifications
                      </h3>

                      <ul className="space-y-3">
                        {position.qualifications?.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-2 h-2 w-2 rounded-full bg-[#C89C37]" />
                            <p className="leading-7 text-[#58665E]">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PositionModal;
