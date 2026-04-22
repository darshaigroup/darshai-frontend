import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const chartData = [
  { name: 'Child', value: 170, color: '#FF8042' },
  { name: 'Teen', value: 457, color: '#0088FE' },
  { name: 'Adult', value: 298, color: '#8884d8' },
  { name: 'Older', value: 525, color: '#00C49F' },
];

export default function PatientDistribution() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="h-full"
    >
      <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[2rem] bg-white h-full">
        <CardHeader className="p-6 sm:p-8 pb-0">
          <CardTitle className="text-lg sm:text-xl font-bold text-darshai-blue">Patient Overview</CardTitle>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] sm:text-xs font-bold text-darshai-blue">{item.name}</span>
                <span className="text-[10px] sm:text-xs font-medium text-darshai-teal ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0 flex flex-col items-center justify-center h-[240px] sm:h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xl sm:text-2xl font-bold text-darshai-blue">1450</p>
            <p className="text-[8px] sm:text-[10px] font-bold text-darshai-teal uppercase tracking-tighter">Total Patients</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
