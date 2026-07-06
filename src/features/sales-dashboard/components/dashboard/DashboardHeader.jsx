import { motion } from "framer-motion";

export default function DashboardHeader(){

  return(
    <motion.div
      initial={{opacity:0,y:15}}
      animate={{opacity:1,y:0}}
      transition={{duration:.5}}
      className="flex flex-col gap-3"
    >

      <h1 className="font-serif text-4xl font-semibold text-[#173C68]">
        Sales Dashboard
      </h1>

      <p className="max-w-2xl text-base text-slate-500">
        Overview of complete sales pipeline.
      </p>

    </motion.div>
  );

}