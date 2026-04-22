import React from 'react';
import { motion } from 'motion/react';
import { patients } from '@/lib/mockData';
import PatientSearch from './components/PatientSearch';
import PatientCard from './components/PatientCard';

export default function Patients() {
  return (
    <div className="space-y-12 sm:space-y-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-darshai-blue">Patient Directory</h2>
          <p className="text-sm sm:text-base text-darshai-teal font-medium">Precision health monitoring for your practice</p>
        </div>
      </div>

      <PatientSearch />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 pb-20">
        {patients.map((patient, i) => (
          <PatientCard key={patient.id} patient={patient} index={i} />
        ))}
      </div>
    </div>
  );
}
