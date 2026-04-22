import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PatientSearch() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-between items-center bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] luxury-shadow">
      <div className="relative w-full lg:w-[450px] group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-darshai-teal group-focus-within:text-darshai-green transition-colors" />
        <Input 
          placeholder="Search by name, ID, or biomarker..." 
          className="pl-14 bg-darshai-cream/50 border-none rounded-2xl h-14 focus-visible:ring-darshai-green luxury-shadow text-sm"
        />
      </div>
      <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
        <Button variant="outline" className="flex-1 lg:flex-none rounded-2xl border-darshai-teal/10 bg-darshai-cream/30 h-14 px-6 font-bold text-darshai-blue">
          <Filter className="w-4 h-4 mr-2 text-darshai-green" />
          Filter
        </Button>
        <Button className="flex-1 lg:flex-none darshai-gradient text-white font-bold rounded-2xl px-8 h-14 shadow-xl hover:scale-105 transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>
    </div>
  );
}
