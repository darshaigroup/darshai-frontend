import React from 'react';
import { 
  Search, 
  Plus, 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TopNavbar({
  isSidebarVisible,
  setIsSidebarVisible,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isRightPanelVisible,
  setIsRightPanelVisible,
  isAddPatientOpen,
  setIsAddPatientOpen,
  isProfileOpen,
  setIsProfileOpen,
  patientData,
  setPatientData,
  handleAddPatientSubmit,
}) {
  return (
    <header className="h-20 lg:h-24 flex items-center justify-between px-4 sm:px-8 lg:px-12 shrink-0 gap-4">
      <div className="flex items-center gap-2 sm:gap-6 flex-1 min-w-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl text-darshai-teal hover:bg-darshai-cream shrink-0"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsMobileMenuOpen(true);
            } else {
              setIsSidebarVisible(!isSidebarVisible);
            }
          }}
        >
          {isSidebarVisible ? <PanelLeftClose className="w-5 h-5 sm:w-6 h-6" /> : <PanelLeftOpen className="w-5 h-5 sm:w-6 h-6" />}
        </Button>

        <div className="relative w-full max-w-[200px] sm:max-w-md group">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 h-5 text-darshai-teal group-focus-within:text-darshai-green transition-colors" />
          <Input 
            placeholder="Search..." 
            className="pl-9 sm:pl-12 bg-white border-none rounded-xl sm:rounded-2xl h-10 sm:h-12 text-xs sm:text-sm luxury-shadow focus-visible:ring-darshai-green"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
          <DialogTrigger 
            className="bg-darshai-green hover:bg-darshai-green/90 text-white font-bold rounded-xl sm:rounded-2xl px-3 sm:px-6 h-10 sm:h-12 shadow-lg hover:scale-105 transition-all text-xs sm:text-sm flex items-center justify-center cursor-pointer"
          >
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Patients</span>
          </DialogTrigger>
          <DialogContent className="w-[95%] sm:max-w-[500px] rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-heading font-bold text-darshai-blue">Add New Patient</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-darshai-teal">
                Enter the basic information to start the wellness journey.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPatientSubmit} className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              <div className="grid gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="name" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-darshai-teal">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. John Doe" 
                    className="rounded-xl border-darshai-teal/10 h-10 sm:h-12 focus-visible:ring-darshai-green text-xs sm:text-sm"
                    required
                    value={patientData.name}
                    onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="dob" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-darshai-teal">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      className="rounded-xl border-darshai-teal/10 h-10 sm:h-12 focus-visible:ring-darshai-green text-xs sm:text-sm"
                      required
                      value={patientData.dob}
                      onChange={(e) => setPatientData({...patientData, dob: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-darshai-teal">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+91 98765 43210" 
                      className="rounded-xl border-darshai-teal/10 h-10 sm:h-12 focus-visible:ring-darshai-green text-xs sm:text-sm"
                      required
                      value={patientData.phone}
                      onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="location" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-darshai-teal">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. Chennai, Tamil Nadu" 
                    className="rounded-xl border-darshai-teal/10 h-10 sm:h-12 focus-visible:ring-darshai-green text-xs sm:text-sm"
                    required
                    value={patientData.location}
                    onChange={(e) => setPatientData({...patientData, location: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter className="pt-2 sm:pt-4">
                <Button type="submit" className="w-full darshai-gradient text-white font-bold h-10 sm:h-12 rounded-xl shadow-lg hover:scale-[1.02] transition-all text-xs sm:text-sm">
                  Continue to Questionnaires
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="w-[90%] sm:max-w-[400px] rounded-2xl sm:rounded-[2.5rem] p-0 overflow-hidden">
            <div className="h-24 sm:h-32 darshai-gradient relative">
              <div className="absolute -bottom-8 sm:-bottom-12 left-6 sm:left-8">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-xl">
                  <AvatarImage src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop" />
                  <AvatarFallback>RR</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="p-6 sm:p-8 pt-12 sm:pt-16 space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-darshai-blue">Dr. Renjith N Raj</h2>
                <p className="text-xs sm:text-sm text-darshai-teal font-medium">Senior Practitioner & Wellness Expert</p>
              </div>
              <Button 
                onClick={() => setIsProfileOpen(false)}
                className="w-full darshai-gradient text-white font-bold h-10 sm:h-12 rounded-xl shadow-lg text-xs sm:text-sm"
              >
                Close Profile
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden xl:flex rounded-xl text-darshai-teal hover:bg-darshai-cream"
          onClick={() => setIsRightPanelVisible(!isRightPanelVisible)}
        >
          {isRightPanelVisible ? <PanelRightClose className="w-6 h-6" /> : <PanelRightOpen className="w-6 h-6" />}
        </Button>
      </div>
    </header>
  );
}
