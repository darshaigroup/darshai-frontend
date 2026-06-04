import {
  ChevronDown,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const AyurvedaAccordion = ({
  title,
  isOpen,
  onToggle,
  children,
}) => {

  return (

    <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">

      <button
        onClick={onToggle}
        className="w-full p-8 flex items-center justify-between"
      >

        <h2 className="text-2xl font-bold text-slate-800">
          {title}
        </h2>

        <motion.div
          animate={{
            rotate: isOpen
              ? 180
              : 0,
          }}
        >

          <ChevronDown />

        </motion.div>

      </button>

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="px-8 pb-8"
          >

            {children}

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

};

export default AyurvedaAccordion;