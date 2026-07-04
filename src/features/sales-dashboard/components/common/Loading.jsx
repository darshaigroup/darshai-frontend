import { motion } from "framer-motion";

export default function Loading({title="Loading Dashboard..."}){

  return(
    <div className="min-h-[65vh] flex items-center justify-center">

      <div className="text-center">

        <motion.div
          animate={{rotate:360}}
          transition={{
            repeat:Infinity,
            duration:1,
            ease:"linear"
          }}
          className="w-20 h-20 mx-auto rounded-full border-[5px] border-[#1E7A3A] border-t-transparent"
        />

        <h2 className="mt-8 text-3xl font-serif text-[#173C68]">
          {title}
        </h2>

        <p className="mt-3 text-slate-500">
          Please wait while we prepare your dashboard.
        </p>

      </div>

    </div>
  );

}