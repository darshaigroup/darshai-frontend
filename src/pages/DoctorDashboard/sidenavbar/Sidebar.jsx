import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  BarChart3, 
  ClipboardList, 
  FileText, 
  MessageSquare,
  Settings,
  Leaf,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: Leaf, label: 'Geo Wellness', path: '/geo-wellness' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: ClipboardList, label: 'Reports', path: '/reports' },
  { icon: CalendarIcon, label: 'Schedule', path: '/schedule' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-white border-r border-darshai-teal/5 flex flex-col h-full luxury-shadow z-50">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 darshai-gradient rounded-full opacity-20 group-hover:opacity-30 transition-opacity animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-9 h-9 rounded-xl darshai-gradient flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                <Leaf className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-heading font-bold tracking-tight text-darshai-blue">
              DARSHAI
            </h1>
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-darshai-teal">Geo-Wellness</span>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => {
                  navigate(item.path);
                }}
                className={`w-full justify-start h-14 rounded-2xl px-6 transition-all duration-300 group ${
                  isActive 
                    ? 'darshai-gradient text-white shadow-lg' 
                    : 'text-darshai-teal hover:bg-darshai-cream hover:text-darshai-blue'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-darshai-teal'}`} />
                <span className="text-sm font-bold">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-6 mt-auto border-t border-darshai-teal/5">
        <div className="bg-darshai-cream/50 rounded-3xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-darshai-green/30">
              <AvatarImage src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-darshai-blue truncate">Dr. Renjith N Raj</p>
              <p className="text-[10px] text-darshai-teal font-medium truncate">Senior Practitioner</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="ghost" 
              onClick={() => window.dispatchEvent(new CustomEvent('open-profile'))}
              className="w-full justify-start h-10 rounded-xl text-darshai-teal hover:text-darshai-blue hover:bg-white px-3"
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="text-xs font-bold text-center w-full">View Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
