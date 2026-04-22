import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ChevronRight, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

export default function PatientCard({ patient, index }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        onClick={() => navigate(`/patients/${patient.id}`)}
        className="border-none luxury-shadow rounded-[2rem] sm:rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
      >
        <CardContent className="p-0">
          <div className="p-6 sm:p-10">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div className="relative">
                <Avatar className="w-16 h-16 sm:w-24 sm:h-24 border-4 border-white luxury-shadow group-hover:border-darshai-green transition-all duration-500">
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback>{patient.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 bg-darshai-green border-4 border-white rounded-full" />
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-darshai-green/10 text-darshai-green text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3">
                  <Activity className="w-3 h-3" />
                  Stable
                </div>
                <p className="text-[10px] text-darshai-teal font-bold uppercase tracking-[0.2em]">DAR-{1000 + parseInt(patient.id)}</p>
              </div>
            </div>
            
            <div className="mb-6 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-darshai-blue group-hover:text-darshai-green transition-colors mb-1">{patient.name}</h3>
              <p className="text-[10px] sm:text-xs text-darshai-teal font-bold uppercase tracking-widest">{patient.age}Y • {patient.gender} • {patient.dosha} Type</p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-3 text-darshai-teal hover:text-darshai-blue transition-colors group/link">
                <div className="w-8 h-8 rounded-xl bg-darshai-cream/50 flex items-center justify-center group-hover/link:bg-darshai-green/10 transition-colors">
                  <Mail className="w-4 h-4 group-hover/link:text-darshai-green" />
                </div>
                <span className="text-xs sm:text-sm font-medium truncate">{patient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-darshai-teal">
                <div className="w-8 h-8 rounded-xl bg-darshai-cream/50 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium">+1 (555) 000-0000</span>
              </div>
            </div>

            <Button variant="outline" className="w-full rounded-xl sm:rounded-2xl border-darshai-teal/10 text-darshai-blue hover:bg-darshai-green hover:text-white hover:border-darshai-green font-bold h-10 sm:h-12 transition-all text-xs sm:text-sm shadow-sm group-hover:shadow-md">
              View Health Journal
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="bg-darshai-cream/30 p-4 sm:p-6 text-center border-t border-darshai-teal/5">
            <p className="text-[8px] sm:text-[10px] text-darshai-teal font-bold uppercase tracking-[0.2em]">Latest Sync: {patient.lastVisit}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
