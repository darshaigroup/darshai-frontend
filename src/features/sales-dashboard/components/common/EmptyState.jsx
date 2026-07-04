import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function EmptyState({
  title="Nothing Found",
  description="There is no data available at the moment.",
  buttonText,
  onClick
}){

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="rounded-[40px] bg-white border border-[#ECE7DD] shadow-[0_20px_60px_rgba(0,0,0,.06)] p-10 text-center"
    >

      <div className="w-24 h-24 rounded-full bg-[#1E7A3A]/10 flex items-center justify-center mx-auto">

        <Inbox
          size={42}
          className="text-[#1E7A3A]"
        />

      </div>

      <h2 className="mt-8 text-3xl font-serif text-[#173C68]">
        {title}
      </h2>

      <p className="mt-4 max-w-lg mx-auto text-slate-500 leading-7">
        {description}
      </p>

      {buttonText&&(
        <button
          onClick={onClick}
          className="mt-8 px-8 py-4 rounded-full bg-[#1E7A3A] text-white hover:bg-[#176632] transition"
        >
          {buttonText}
        </button>
      )}

    </motion.div>
  );

}