import {ArrowLeft} from "lucide-react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import logo from "@/assets/images/logo.png";

export default function EnquiryHeader({step,onBack}){
  const navigate=useNavigate();

  const handleBack=()=>{
    if(onBack){
      onBack();
      return;
    }

    navigate("/enquiry");
  };

  return(
    <header className="relative z-20 w-full px-4 pt-5 sm:px-6 sm:pt-7 md:px-10">
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between">

       {/* DARSHAI Logo - Left */}
<motion.div
  initial={{ opacity: 0, x: -15, y: -5 }}
  animate={{ opacity: 1, x: 0, y: 0 }}
  transition={{
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="flex items-center"
>
  <motion.div
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    transition={{
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="group flex items-center"
  >
    {/* DARSHAI Logo */}
    <motion.img
      src={logo}
      alt="DARSHAI"
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative z-10
        h-auto
        w-[150px]
        max-w-[45vw]
        object-contain
        sm:w-[180px]
        md:w-[210px]
        lg:w-[230px]
      "
    />
  </motion.div>
</motion.div>

        {/* Step Indicator - Right */}
        <motion.div
          initial={{opacity:0,x:15}}
          animate={{opacity:1,x:0}}
          transition={{
            duration:.5,
            delay:.15
          }}
          className="flex items-center gap-2"
        >
          <span className="hidden text-[10px] font-medium tracking-[0.12em] text-[#89948c] sm:block">
            STEP
          </span>

          <motion.div
            key={step}
            initial={{scale:.8,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:.3}}
            className="flex h-8 min-w-8 items-center justify-center rounded-full border border-[#1e7a3a]/20 bg-white/80 px-2 text-xs font-semibold text-[#1e7a3a] shadow-sm backdrop-blur-sm"
          >
            {step}
          </motion.div>

          <span className="text-[10px] font-medium text-[#89948c]">
            / 4
          </span>
        </motion.div>

      </div>

      {/* Subtle Divider */}
      <motion.div
        initial={{scaleX:0,opacity:0}}
        animate={{scaleX:1,opacity:1}}
        transition={{
          duration:.7,
          delay:.25
        }}
        className="mx-auto mt-5 h-px w-full max-w-[980px] origin-center bg-gradient-to-r from-transparent via-[#dce5dd] to-transparent"
      />

    </header>
  );
}