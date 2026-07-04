import {
ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip
} from "recharts";
import { motion } from "framer-motion";

export default function ConversionChart({data=[]}){

  const chartData=data.length?data:[
    {month:"Jan",rate:18},
    {month:"Feb",rate:24},
    {month:"Mar",rate:28},
    {month:"Apr",rate:32},
    {month:"May",rate:41},
    {month:"Jun",rate:48}
  ];

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] border border-[#ECE7DD]"
    >

      <h3 className="text-xl font-semibold text-[#173C68] mb-6">
        Conversion Trend
      </h3>

      <div className="h-[340px]">

        <ResponsiveContainer>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="rate"
              stroke="#1E7A3A"
              strokeWidth={4}
              dot={{r:5}}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );

}