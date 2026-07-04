import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  subtitle,
  action
}){

  return(
    <motion.div
      initial={{opacity:0,y:15}}
      animate={{opacity:1,y:0}}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
    >

      <div>

        <h2 className="text-3xl md:text-4xl font-serif text-[#173C68]">
          {title}
        </h2>

        {subtitle&&(
          <p className="text-slate-500 mt-2">
            {subtitle}
          </p>
        )}

      </div>

      {action}

    </motion.div>
  );

}