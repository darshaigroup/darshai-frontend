import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './sidenavbar';
import { TopNavbar } from './topnavbar';
import RightPanel from '@/components/RightPanel';

export default function DoctorDashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    name: '',
    dob: '',
    phone: '',
    location: '',
    occupation: ''
  });

  useEffect(() => {
    const handleOpenProfile = () => setIsProfileOpen(true);
    window.addEventListener('open-profile', handleOpenProfile);
    return () => window.removeEventListener('open-profile', handleOpenProfile);
  }, []);

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    setIsAddPatientOpen(false);
    navigate('/schedule'); // Redirect to schedule or wherever
  };

  return (
    <div className="flex h-screen bg-darshai-cream overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <AnimatePresence mode="wait">
        {isSidebarVisible && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden lg:block overflow-hidden"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-darshai-blue/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-24 z-[70] lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopNavbar 
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isRightPanelVisible={isRightPanelVisible}
          setIsRightPanelVisible={setIsRightPanelVisible}
          isAddPatientOpen={isAddPatientOpen}
          setIsAddPatientOpen={setIsAddPatientOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          patientData={patientData}
          setPatientData={setPatientData}
          handleAddPatientSubmit={handleAddPatientSubmit}
        />

        <ScrollArea className="flex-1 px-4 sm:px-8 lg:px-12 pb-12">
          {children}
        </ScrollArea>
      </div>

      <AnimatePresence mode="wait">
        {isRightPanelVisible && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden xl:block overflow-hidden"
          >
            <RightPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
