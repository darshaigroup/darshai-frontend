import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight,
  Info,
  Star,
  Hotel
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { patients } from '@/lib/mockData';

const wellnessCenters = [
  {
    id: '1',
    name: 'Ananda in the Himalayas',
    location: 'Rishikesh, Uttarakhand',
    description: 'A spiritual pathway to the ultimate, Ananda is located in the tranquil Himalayan foothills, close to the mythological cities of Haridwar and Rishikesh.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    rating: 4.9,
    specialty: 'Ayurvedic Detox'
  },
  {
    id: '2',
    name: 'Somatheeram Ayurveda Village',
    location: 'Kovalam, Kerala',
    description: 'The world\'s first Ayurveda resort, Somatheeram offers a perfect blend of traditional Ayurveda, Yoga, and Meditation in a serene beach setting.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    rating: 4.8,
    specialty: 'Panchakarma'
  },
  {
    id: '3',
    name: 'Vana Retreat',
    location: 'Dehradun, Uttarakhand',
    description: 'Vana is a retreat that explores each guest\'s unique path to wellbeing, integrating Ayurveda, Sowa Rigpa, and Yoga.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    rating: 4.7,
    specialty: 'Sowa Rigpa'
  },
  {
    id: '4',
    name: 'Atmantan Wellness Resort',
    location: 'Mulshi, Pune',
    description: 'Nestled in the Sahyadri mountains, Atmantan is a luxury wellness pitstop for the soul, mind, and body.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    rating: 4.6,
    specialty: 'Holistic Health'
  }
];

const initialRequests = [
  {
    id: 'req-1',
    patientId: '1',
    centerId: '1',
    status: 'Confirmed',
    date: '2023-10-15',
    notes: 'Patient interested in deep detox program.'
  },
  {
    id: 'req-2',
    patientId: '2',
    centerId: '2',
    status: 'Active',
    date: '2023-10-12',
    notes: 'Recommended for post-treatment rejuvenation.'
  },
  {
    id: 'req-3',
    patientId: '3',
    centerId: '3',
    status: 'Confirmed',
    date: '2023-10-18',
    notes: 'Seeking stress management and meditation.'
  }
];

export default function GeoWellness() {
  const [requests] = useState(initialRequests);

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-darshai-blue">Geo Wellness Centers</h2>
          <p className="text-sm sm:text-base text-darshai-teal font-medium">Curated luxury wellness retreats and patient placements</p>
        </div>
        <Button className="darshai-gradient text-white font-bold rounded-xl h-12 px-8 shadow-lg hover:scale-105 transition-all">
          Add New Center
        </Button>
      </div>

      {/* Wellness Centers List */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Hotel className="w-5 h-5 text-darshai-green" />
          <h3 className="text-xl font-bold text-darshai-blue">Available Retreats</h3>
        </div>
        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-6">
            {wellnessCenters.map((center) => (
              <Card key={center.id} className="min-w-[350px] max-w-[350px] border-none luxury-shadow rounded-[2.5rem] overflow-hidden bg-white group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={center.image} 
                    alt={center.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 backdrop-blur-md text-darshai-blue border-none font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {center.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-darshai-green text-white border-none font-bold px-3 py-1 rounded-full">
                      {center.specialty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-darshai-blue">{center.name}</h4>
                    <div className="flex items-center gap-1 text-darshai-teal text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {center.location}
                    </div>
                  </div>
                  <p className="text-xs text-darshai-teal leading-relaxed line-clamp-3">
                    {center.description}
                  </p>
                  <Button variant="outline" className="w-full rounded-xl border-darshai-teal/10 text-darshai-blue font-bold hover:bg-darshai-cream">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Patient Selections & Verification */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-darshai-green" />
            <h3 className="text-xl font-bold text-darshai-blue">Patient Placements</h3>
          </div>
        </div>

        <Card className="border-none luxury-shadow rounded-[3rem] bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-darshai-teal/5">
                    <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-darshai-teal/50">Patient</th>
                    <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-darshai-teal/50">Selected Center</th>
                    <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-darshai-teal/50">Request Date</th>
                    <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-darshai-teal/50">Status</th>
                    <th className="p-8 text-right text-[10px] font-bold uppercase tracking-widest text-darshai-teal/50">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-darshai-teal/5">
                  {requests.map((req) => {
                    const patient = patients.find(p => p.id === req.patientId);
                    const center = wellnessCenters.find(c => c.id === req.centerId);
                    return (
                      <motion.tr 
                        key={req.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group hover:bg-darshai-cream/20 transition-colors"
                      >
                        <td className="p-8">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-white luxury-shadow">
                              <AvatarImage src={patient?.avatar} />
                              <AvatarFallback>{patient?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-bold text-darshai-blue">{patient?.name}</p>
                              <p className="text-[10px] text-darshai-teal font-bold uppercase tracking-widest">ID: {patient?.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-darshai-cream flex items-center justify-center">
                              <Hotel className="w-4 h-4 text-darshai-blue" />
                            </div>
                            <span className="text-sm font-bold text-darshai-blue">{center?.name}</span>
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-2 text-darshai-teal">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{req.date}</span>
                          </div>
                        </td>
                        <td className="p-8">
                          <Badge className={`rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-widest border-none ${
                            req.status === 'Confirmed' ? 'bg-darshai-green/10 text-darshai-green' :
                            req.status === 'Active' ? 'bg-darshai-blue/10 text-darshai-blue' :
                            'bg-darshai-cream text-darshai-teal'
                          }`}>
                            {req.status}
                          </Badge>
                        </td>
                        <td className="p-8 text-right">
                          <Button variant="ghost" size="icon" className="text-darshai-teal/40 hover:text-darshai-blue">
                            <Info className="w-5 h-5" />
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
