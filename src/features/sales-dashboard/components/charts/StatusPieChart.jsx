import { ResponsiveContainer,PieChart,Pie,Tooltip,Cell,Legend } from "recharts";
import { motion } from "framer-motion";

const COLORS=[
"#173C68",
"#1E7A3A",
"#C6A75E",
"#F59E0B",
"#DC2626"
];

export default function StatusPieChart({data=[]}){

  const chartData=data.length?data:[
    {name:"Lead",value:40},
    {name:"Contacted",value:25},
    {name:"Interested",value:15},
    {name:"Assigned",value:10},
    {name:"Closed",value:10}
  ];

  return(
    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] border border-[#ECE7DD]"
    >

      <h3 className="text-xl font-semibold text-[#173C68] mb-6">
        Lead Status
      </h3>

      <div className="h-[340px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={60}
            >

              {chartData.map((_,i)=>(
                <Cell key={i} fill={COLORS[i%COLORS.length]}/>
              ))}

            </Pie>

            <Tooltip/>

            <Legend/>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );

}