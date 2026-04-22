import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Users, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

const scheduleItems = [
  { id: 1, patient: 'Aria Montgomery', time: '09:00 AM', type: 'Consultation', status: 'Upcoming' },
  { id: 2, patient: 'Julian Thorne', time: '11:30 AM', type: 'Follow-up', status: 'Upcoming' },
  { id: 3, patient: 'Elena Vance', time: '02:00 PM', type: 'Clinical Audit', status: 'In Progress' },
];

export default function Schedule() {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-darshai-blue">Clinical Schedule</h2>
          <p className="text-sm sm:text-base text-darshai-teal font-medium">Manage your daily appointments and consultations</p>
        </div>
        <Button className="darshai-gradient text-white font-bold rounded-xl sm:rounded-2xl px-6 sm:px-8 h-10 sm:h-12 shadow-xl hover:scale-105 transition-all text-xs sm:text-sm">
          <Plus className="w-4 h-4 sm:mr-2" />
          Add Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
        <Card className="lg:col-span-2 border-none luxury-shadow rounded-2xl sm:rounded-[3rem] bg-white overflow-hidden">
          <CardHeader className="p-6 sm:p-10">
            <CardTitle className="text-xl font-heading text-darshai-blue">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-10 pb-10 space-y-4">
            {scheduleItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-6 rounded-2xl bg-darshai-cream/30 border border-darshai-teal/5 group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white luxury-shadow flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-darshai-teal uppercase">{item.time.split(' ')[1]}</span>
                    <span className="text-lg font-bold text-darshai-blue -mt-1">{item.time.split(' ')[0].split(':')[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-darshai-blue group-hover:text-darshai-green transition-colors">{item.patient}</h4>
                    <p className="text-xs text-darshai-teal font-medium">{item.type} • {item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        item.status === 'In Progress' ? 'bg-darshai-green/10 text-darshai-green' : 'bg-darshai-blue/10 text-darshai-blue'
                    }`}>
                        {item.status}
                    </span>
                    <ChevronRight className="w-5 h-5 text-darshai-teal/30 group-hover:text-darshai-green transition-all" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] bg-white overflow-hidden p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-darshai-cream flex items-center justify-center mb-6">
                <CalendarIcon className="w-10 h-10 text-darshai-teal" />
            </div>
            <h4 className="text-lg font-bold text-darshai-blue mb-2">Calendar View</h4>
            <p className="text-xs text-darshai-teal font-medium mb-6">Full schedule management coming soon with AI optimization.</p>
            <Button variant="outline" className="w-full rounded-xl border-darshai-teal/10 text-darshai-blue">
                Open Full Calendar
            </Button>
        </Card>
      </div>
    </div>
  );
}
