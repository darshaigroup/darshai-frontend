import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon:Icon,
  color="#1E7A3A",
  trend,
  onClick
}){

  return(
    <motion.div
      whileHover={{y:-6}}
      transition={{duration:.25}}
      onClick={onClick}
      className="cursor-pointer rounded-[32px] bg-white border border-[#ECE7DD] shadow-[0_20px_60px_rgba(0,0,0,.06)] p-6"
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#173C68]">
            {value}
          </h2>

          {subtitle&&(
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{background:`${color}15`}}
        >
          <Icon size={30} style={{color}}/>
        </div>

      </div>

      {trend&&(
        <div className="mt-8 flex items-center gap-2 text-[#1E7A3A] font-medium">

          <ArrowUpRight size={18}/>

          <span>{trend}</span>

        </div>
      )}

    </motion.div>
  );

}