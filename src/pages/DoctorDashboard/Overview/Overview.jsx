import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, BarChart3, Users2 } from 'lucide-react';
import Greeting from './components/Greeting';
import StatsCards from './components/StatsCards';
import PatientDistribution from './components/PatientDistribution';
import OverviewPatientTable from './components/OverviewPatientTable';

const tabs = [
  { id: 'greeting', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'patients', label: 'Patients', icon: Users2 },
];

export default function Overview() {
  const [activeTab, setActiveTab] = useState('greeting');
  const sectionRefs = {
    greeting: useRef(null),
    stats: useRef(null),
    patients: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12 pb-24 relative">
      <div className="sticky top-0 z-40 bg-darshai-cream/80 backdrop-blur-md py-4 -mx-4 px-4 mb-4">
        <div className="flex items-center gap-1 sm:gap-2 bg-white/60 p-1 rounded-xl sm:rounded-2xl luxury-shadow w-full sm:w-fit border border-white/20 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`relative flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold transition-all duration-300 flex-1 sm:flex-none whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-darshai-teal hover:text-darshai-blue hover:bg-white/50'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 darshai-gradient rounded-lg sm:rounded-xl shadow-lg"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              <tab.icon className={`w-3 h-3 sm:w-4 sm:h-4 relative z-10 ${activeTab === tab.id ? 'text-white' : ''}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Greeting />

      <section id="stats" ref={sectionRefs.stats} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 scroll-mt-28">
        <div className="lg:col-span-2">
          <StatsCards />
        </div>
        <PatientDistribution />
      </section>

      <OverviewPatientTable />
    </div>
  );
}
