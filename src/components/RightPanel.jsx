import {
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Users,
  ChevronDown,
} from "lucide-react";

import Button from "@/components/ui/button";
import Avatar from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const monthlyReports = [
  { name: "Deepashikha Sundar", status: "Follow", time: "Next. 03.00", color: "text-[#009688]", border: "border-[#009688]" },
  { name: "Alagappan PS", status: "New Patient", time: "05.00", color: "text-purple-500", border: "border-gray-100" },
  { name: "Sundaram Pillai", status: "New Patient", time: "08.00", color: "text-orange-500", border: "border-gray-100" },
  { name: "Eilnangai Perumal", status: "New Patient", time: "15.00", color: "text-yellow-500", border: "border-gray-100" },
];

const patientChartData = [
  { day: "Mon", count: 40 },
  { day: "Tue", count: 65 },
  { day: "Wed", count: 45 },
  { day: "Thu", count: 90 },
  { day: "Fri", count: 55 },
  { day: "Sat", count: 70 },
  { day: "Sun", count: 30 },
];

export default function RightPanel() {
  return (
    <aside className="w-[320px] bg-white border-l flex flex-col h-full hidden xl:flex">
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">

        {/* 🔹 Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button className="bg-transparent text-gray-600 hover:bg-gray-100 p-2">
              <Settings size={16} />
            </Button>

            <Button className="bg-transparent text-gray-600 hover:bg-gray-100 p-2 relative">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-semibold">Dr. Renjith N Raj</p>
              <p className="text-xs text-gray-400">View Profile</p>
            </div>

            <Avatar src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop" />
          </div>
        </div>

        {/* 🔹 Schedule */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Schedule</h4>

            <Badge>Mar</Badge>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm font-medium">Morning Checkup</p>
              <p className="text-xs text-gray-400">09:30 AM</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm font-medium">Follow-up Session</p>
              <p className="text-xs text-gray-400">11:00 AM</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-sm font-medium">Ayurvedic Consult</p>
              <p className="text-xs text-gray-400">02:30 PM</p>
            </div>
          </div>
        </section>

        {/* 🔹 Monthly Reports */}
        <section className="space-y-4">
          <h4 className="font-semibold">Monthly Reports</h4>

          <div className="grid grid-cols-2 gap-3">
            {monthlyReports.map((report, i) => (
              <div key={i} className="text-center space-y-2">
                
                <div className={`border rounded-xl p-3 ${report.border}`}>
                  <div className="flex justify-center mb-2">
                    <Users size={16} className={report.color} />
                  </div>

                  <p className="text-xs font-medium">{report.name}</p>

                  <p className={`text-[10px] font-semibold ${report.color}`}>
                    {report.status}
                  </p>
                </div>

                <p className="text-[10px] text-gray-400">{report.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 Chart */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Number of Patients</h4>

            <button className="text-xs text-gray-400 flex items-center">
              Last week <ChevronDown size={12} />
            </button>
          </div>

          <div className="h-[180px] bg-gray-50 rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="day" axisLine={false} tickLine={false} />

                <Tooltip />

                <Bar dataKey="count" radius={[6, 6, 6, 6]}>
                  {patientChartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index % 2 === 0 ? "#99C24D" : "#5E9387"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </aside>
  );
}