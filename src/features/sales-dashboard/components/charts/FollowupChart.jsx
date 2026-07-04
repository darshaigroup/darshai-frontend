import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

export default function FollowupChart({data=[]}){

  const chartData=data.length?data:[
    {day:"Mon",count:12},
    {day:"Tue",count:18},
    {day:"Wed",count:15},
    {day:"Thu",count:22},
    {day:"Fri",count:27},
    {day:"Sat",count:9}
  ];

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] border border-[#ECE7DD]"
    >

      <h3 className="text-xl font-semibold text-[#173C68] mb-6">
        Weekly Follow-ups
      </h3>

      <div className="h-[340px]">

        <ResponsiveContainer>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="day"/>

            <YAxis/>

            <Tooltip/>

            <Bar
              dataKey="count"
              fill="#173C68"
              radius={[10,10,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </motion.div>

  );

}