import { ResponsiveContainer,FunnelChart,Funnel,Tooltip,LabelList } from "recharts";
import { motion } from "framer-motion";

export default function LeadFunnelChart({data=[]}){

  const chartData=data.length?data:[
    {stage:"Lead",value:120},
    {stage:"Contacted",value:90},
    {stage:"Interested",value:60},
    {stage:"Assigned",value:35},
    {stage:"Converted",value:20}
  ];

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] border border-[#ECE7DD]"
    >

      <h3 className="text-xl font-semibold text-[#173C68] mb-6">
        Lead Funnel
      </h3>

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip/>
            <Funnel dataKey="value" data={chartData} isAnimationActive>
              <LabelList position="right" fill="#173C68" stroke="none"/>
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

    </motion.div>
  );

}