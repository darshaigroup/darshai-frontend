import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, UserCheck, Calendar as CalendarIcon, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Total Patients', value: '1450', trend: '+0.39%', trendUp: true, icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { label: 'New Patients', value: '63', trend: '+0.62%', trendUp: true, icon: UserPlus, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { label: 'Old Patients', value: '313', trend: '-0.12%', trendUp: false, icon: UserCheck, color: 'text-green-500', bgColor: 'bg-green-50' },
  { label: 'Appointments', value: '1971', trend: '+2%', trendUp: true, icon: CalendarIcon, color: 'text-orange-500', bgColor: 'bg-orange-50' },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[2rem] overflow-hidden bg-white hover:scale-[1.02] transition-all duration-300 h-full">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${stat.color}`} />
                </div>
                <Button variant="ghost" size="icon" className="text-darshai-teal/40 w-8 h-8">
                  <MoreHorizontal className="w-4 h-4 sm:w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-4xl font-bold text-darshai-blue">{stat.value}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] sm:text-sm font-medium text-darshai-teal/60">{stat.label}</p>
                  <div className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[8px] sm:text-[10px] font-bold ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.trendUp ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                    {stat.trend}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
