import { motion } from "framer-motion";
import { TrendingUp,TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon:Icon,
  color="#1E7A3A",
  trend,
  trendUp=true,
  onClick
}){

  return(
    <motion.div
      whileHover={{y:-6}}
      whileTap={{scale:.98}}
      transition={{duration:.25}}
      onClick={onClick}
      className="group cursor-pointer rounded-[32px] bg-white border border-[#ECE7DD] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] hover:shadow-[0_30px_80px_rgba(0,0,0,.1)] transition-all"
    >

      <div className="flex items-start justify-between">

        <div className="flex-1">

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
          <Icon
            size={30}
            style={{color}}
          />
        </div>

      </div>

      {trend&&(

        <div className={`mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
          trendUp
          ?"bg-[#EAF8EE] text-[#1E7A3A]"
          :"bg-red-50 text-red-600"
        }`}>

          {trendUp
            ?<TrendingUp size={17}/>
            :<TrendingDown size={17}/>
          }

          {trend}

        </div>

      )}

    </motion.div>
  );

}