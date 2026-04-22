import { 
  Settings, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Users,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const monthlyReports = [
  { name: 'Deepashikha Sundar', status: 'Follow', time: 'Next. 03.00', color: 'text-[#009688]', border: 'border-[#009688]' },
  { name: 'Alagappan PS', status: 'New Patient', time: '05.00', color: 'text-purple-500', border: 'border-gray-100' },
  { name: 'Sundaram Pillai', status: 'New Patient', time: '08.00', color: 'text-orange-500', border: 'border-gray-100' },
  { name: 'Eilnangai Perumal', status: 'New Patient', time: '15.00', color: 'text-yellow-500', border: 'border-gray-100' },
];

const patientChartData = [
  { day: 'Mon', count: 40 },
  { day: 'Tue', count: 65 },
  { day: 'Wed', count: 45 },
  { day: 'Thu', count: 90 },
  { day: 'Fri', count: 55 },
  { day: 'Sat', count: 70 },
  { day: 'Sun', count: 30 },
];

export default function RightPanel() {
  return (
    <aside className="w-full lg:w-[400px] bg-white border-l border-darshai-teal/5 flex flex-col h-full luxury-shadow shrink-0 hidden xl:flex">
      <ScrollArea className="flex-1">
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-12">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="rounded-xl text-darshai-teal hover:bg-darshai-cream w-9 h-9 sm:w-10 sm:h-10">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl text-darshai-teal hover:bg-darshai-cream relative w-9 h-9 sm:w-10 sm:h-10">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('open-profile'))}>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-bold text-darshai-blue group-hover:text-darshai-green transition-colors">Dr. Renjith N Raj</p>
                <p className="text-[8px] sm:text-[10px] text-darshai-teal font-bold uppercase tracking-wider">View Profile</p>
              </div>
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-darshai-green/30 luxury-shadow group-hover:scale-105 transition-transform">
                <AvatarImage src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop" />
                <AvatarFallback>RR</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Schedule Calendar */}
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-base sm:text-lg font-heading font-bold text-darshai-blue">Schedule Calendar</h4>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 h-4 text-darshai-teal cursor-pointer" />
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 h-4 text-darshai-teal cursor-pointer" />
                </div>
                <Badge variant="outline" className="bg-darshai-cream text-[#009688] hover:bg-darshai-cream border-none px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-bold flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  Mar
                  <CalendarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-[8px] sm:text-[10px] font-bold text-darshai-teal/40 uppercase">{day}</span>
              ))}
              {[23, 24, 25, 26, 27, 28, 29].map(date => (
                <div key={date} className={`py-2 sm:py-3 rounded-lg sm:rounded-xl flex flex-col items-center gap-0.5 sm:gap-1 cursor-pointer transition-all ${date === 26 ? 'bg-[#009688] text-white shadow-lg' : 'hover:bg-darshai-cream'}`}>
                  <span className="text-xs sm:text-sm font-bold">{date}</span>
                  <div className="flex gap-0.5">
                    <div className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${date === 26 ? 'bg-white' : 'bg-red-400'}`} />
                    {date % 2 === 0 && <div className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${date === 26 ? 'bg-white' : 'bg-darshai-green'}`} />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Monthly Reports */}
          <section className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-heading font-bold text-darshai-blue">Monthly Reports</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {monthlyReports.map((report, i) => (
                <div key={i} className="space-y-2 sm:space-y-3 flex flex-col items-center">
                  <div className={`w-full aspect-square rounded-xl sm:rounded-2xl border-2 ${report.border} flex flex-col items-center justify-center p-2 sm:p-3 space-y-1 sm:space-y-2 group cursor-pointer hover:shadow-md transition-all`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-darshai-cream flex items-center justify-center ${report.color}`}>
                      <Users className="w-3 h-3 sm:w-4 h-4" />
                    </div>
                    <p className="text-[8px] sm:text-[9px] font-bold text-center leading-tight text-darshai-blue">{report.name}</p>
                    <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-widest ${report.color}`}>{report.status}</span>
                  </div>
                  <p className="text-[8px] sm:text-[10px] font-bold text-darshai-teal/60">{report.time}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Number of Patients Chart */}
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-base sm:text-lg font-heading font-bold text-darshai-blue">Number of Patients</h4>
              <Button variant="ghost" className="text-darshai-teal font-bold text-[8px] sm:text-[10px] p-0 h-auto uppercase tracking-widest">
                Last week
                <ChevronDown className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </Button>
            </div>
            <div className="h-[160px] sm:h-[200px] w-full bg-darshai-cream/30 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EDE8" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#5E9387', fontSize: 8, fontWeight: 700}} 
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '10px' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 8, 8]} barSize={10}>
                    {patientChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#99C24D' : '#5E9387'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </ScrollArea>
    </aside>
  );
}
