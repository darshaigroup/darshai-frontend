import { useState } from "react";
import { motion } from "framer-motion";

export default function QuestionDropdown({ question, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/10 p-6 rounded-xl border border-white/20">

      <p className="text-white mb-4">{question.text}</p>

      <div
        onClick={() => setOpen(!open)}
        className="p-3 bg-black/40 rounded-lg text-white cursor-pointer"
      >
        Select Answer
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 space-y-2"
        >
          {question.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onSelect(opt.score);
                setOpen(false);
              }}
              className="p-2 bg-white/10 hover:bg-emerald-500 rounded cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}