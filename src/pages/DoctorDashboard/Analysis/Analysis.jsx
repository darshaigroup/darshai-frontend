import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Zap, Activity, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { healthMetrics } from '@/lib/mockData';

const doshaDistribution = [
  { name: 'Vata', value: 35, color: '#99C24D' },
  { name: 'Pitta', value: 25, color: '#1D3557' },
  { name: 'Kapha', value: 40, color: '#5E9387' },
];

const wellnessRadar = [
  { subject: 'Nutrition', A: 120, B: 110, fullMark: 150 },
  { subject: 'Sleep', A: 98, B: 130, fullMark: 150 },
  { subject: 'Stress', A: 86, B: 130, fullMark: 150 },
  { subject: 'Activity', A: 99, B: 100, fullMark: 150 },
  { subject: 'Meditation', A: 85, B: 90, fullMark: 150 },
];

export default function Analysis() {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-darshai-blue">Health Analytics</h2>
          <p className="text-sm sm:text-base text-darshai-teal font-medium">AI-driven biomarker insights and wellness trends</p>
        </div>
        <Select defaultValue="weekly">
          <SelectTrigger className="w-full md:w-[220px] rounded-xl sm:rounded-2xl border-darshai-teal/20 bg-white luxury-shadow h-10 sm:h-12 font-bold text-darshai-blue text-xs sm:text-sm">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="rounded-xl sm:rounded-2xl border-darshai-teal/10">
            <SelectItem value="daily">Daily View</SelectItem>
            <SelectItem value="weekly">Weekly View</SelectItem>
            <SelectItem value="monthly">Monthly View</SelectItem>
            <SelectItem value="yearly">Yearly View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[calc(100vh-20rem)] w-full pr-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 pb-10">
          {/* Patient Growth Analysis */}
        <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
          <CardHeader className="px-0 pt-0 mb-4 sm:mb-8">
            <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Patient Growth</CardTitle>
            <p className="text-xs sm:text-sm text-darshai-teal font-medium">New patient acquisition and retention trends</p>
          </CardHeader>
          <CardContent className="px-0 h-[250px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthMetrics}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D3557" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1D3557" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="energy" stroke="#1D3557" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geo-Wellness Center Analysis */}
        <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
          <CardHeader className="px-0 pt-0 mb-4 sm:mb-8">
            <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Center Performance</CardTitle>
            <p className="text-xs sm:text-sm text-darshai-teal font-medium">Regional wellness scores and center efficiency</p>
          </CardHeader>
          <CardContent className="px-0 h-[250px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="sleep" fill="#99C24D" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="stress" fill="#1D3557" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wellness Trends */}
        <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
          <CardHeader className="px-0 pt-0 mb-4 sm:mb-8">
            <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Wellness Trends</CardTitle>
            <p className="text-xs sm:text-sm text-darshai-teal font-medium">Comparative analysis of energy and stress levels</p>
          </CardHeader>
          <CardContent className="px-0 h-[250px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10, fontWeight: 500}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(29, 53, 87, 0.1)' }}
                />
                <Line type="monotone" dataKey="energy" stroke="#99C24D" strokeWidth={3} dot={{ r: 4, fill: '#99C24D', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="stress" stroke="#1D3557" strokeWidth={3} dot={{ r: 4, fill: '#1D3557', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dosha Distribution */}
        <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
          <CardHeader className="px-0 pt-0 mb-4 sm:mb-8">
            <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Dosha Distribution</CardTitle>
            <p className="text-xs sm:text-sm text-darshai-teal font-medium">Practice-wide constitutional analysis</p>
          </CardHeader>
          <CardContent className="px-0 flex flex-col items-center justify-center h-[250px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={doshaDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {doshaDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(29, 53, 87, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 sm:mt-6">
              {doshaDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[8px] sm:text-[10px] font-bold text-darshai-blue uppercase tracking-widest">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holistic Wellness Radar */}
        <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
          <CardHeader className="px-0 pt-0 mb-4 sm:mb-8">
            <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Geo-Wellness Radar</CardTitle>
            <p className="text-xs sm:text-sm text-darshai-teal font-medium">Aggregate wellness scores across categories</p>
          </CardHeader>
          <CardContent className="px-0 h-[250px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={wellnessRadar}>
                <PolarGrid stroke="#F0F4F0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#5E9387', fontSize: 10, fontWeight: 500}} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} axisLine={false} tick={false} />
                <Radar
                  name="Current Batch"
                  dataKey="A"
                  stroke="#99C24D"
                  fill="#99C24D"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Target"
                  dataKey="B"
                  stroke="#1D3557"
                  fill="#1D3557"
                  fillOpacity={0.2}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(29, 53, 87, 0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

          {/* Patient Recovery Rate */}
          <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
            <CardHeader className="px-0 pt-0 mb-4 sm:mb-8">
              <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Recovery Progress</CardTitle>
              <p className="text-xs sm:text-sm text-darshai-teal font-medium">Monthly recovery rates by treatment type</p>
            </CardHeader>
            <CardContent className="px-0 h-[250px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthMetrics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10, fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10, fontWeight: 500}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(29, 53, 87, 0.1)' }}
                  />
                  <Bar dataKey="energy" fill="#1D3557" radius={[6, 6, 0, 0]} barSize={16} />
                  <Bar dataKey="sleep" fill="#99C24D" radius={[6, 6, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}
