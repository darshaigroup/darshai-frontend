import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Activity, 
  FileText, 
  MessageSquare, 
  ChevronLeft,
  Heart,
  Thermometer,
  Droplets,
  Zap,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  Upload,
  Sparkles,
  Eye,
  Download,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { patients, healthMetrics } from '@/lib/mockData';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find(p => p.id === id) || patients[0];
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header / Back Button */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="rounded-xl text-darshai-teal hover:bg-darshai-cream w-8 h-8 sm:w-10 sm:h-10"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 h-6" />
        </Button>
        <h2 className="text-xl sm:text-2xl font-bold text-darshai-blue">Patient Profile</h2>
      </div>

      {/* Patient Hero Card */}
      <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] overflow-hidden bg-white">
        <CardContent className="p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center lg:items-start text-center lg:text-left">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-darshai-cream luxury-shadow">
              <AvatarImage src={patient.avatar} />
              <AvatarFallback>{patient.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4 sm:space-y-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-heading font-bold text-darshai-blue mb-2">{patient.name}</h1>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                    <Badge className="bg-darshai-cream text-darshai-blue border-none rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 font-bold text-[10px] sm:text-xs">
                      ID: DAR-{1000 + parseInt(patient.id)}
                    </Badge>
                    <Badge className="bg-darshai-green/10 text-darshai-green border-none rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 font-bold uppercase tracking-widest text-[8px] sm:text-[10px]">
                      {patient.dosha}
                    </Badge>
                    <Badge className="bg-darshai-blue/10 text-darshai-blue border-none rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 font-bold text-[10px] sm:text-xs">
                      {patient.age}Y • {patient.gender}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 justify-center">
                  <Button variant="outline" className="rounded-xl border-darshai-teal/10 text-darshai-blue font-bold h-10 sm:h-12 text-xs sm:text-sm px-4 sm:px-6">
                    <MessageSquare className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Message</span>
                  </Button>
                  <Button className="darshai-gradient text-white font-bold rounded-xl px-4 sm:px-6 h-10 sm:h-12 shadow-lg text-xs sm:text-sm">
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-darshai-teal/5">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-darshai-cream flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 h-5 text-darshai-teal" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] font-bold text-darshai-teal uppercase tracking-widest">Location</p>
                    <p className="text-xs sm:text-sm font-bold text-darshai-blue">Chennai, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-darshai-cream flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 h-5 text-darshai-teal" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] font-bold text-darshai-teal uppercase tracking-widest">Phone</p>
                    <p className="text-xs sm:text-sm font-bold text-darshai-blue">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-darshai-cream flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 h-5 text-darshai-teal" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] font-bold text-darshai-teal uppercase tracking-widest">Email</p>
                    <p className="text-xs sm:text-sm font-bold text-darshai-blue truncate max-w-[150px]">{patient.name.toLowerCase().replace(' ', '.')}@email.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Navigation */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-white p-1 rounded-xl sm:rounded-2xl luxury-shadow border border-darshai-teal/5 mb-6 sm:mb-8 w-full overflow-x-auto no-scrollbar flex justify-start sm:justify-center">
          <TabsTrigger value="overview" className="rounded-lg sm:rounded-xl px-4 sm:px-8 py-2 sm:py-3 data-[state=active]:darshai-gradient data-[state=active]:text-white transition-all font-bold text-xs sm:text-sm flex-shrink-0">
            <User className="w-3.5 h-3.5 sm:w-4 h-4 mr-1.5 sm:mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="biomarkers" className="rounded-lg sm:rounded-xl px-4 sm:px-8 py-2 sm:py-3 data-[state=active]:darshai-gradient data-[state=active]:text-white transition-all font-bold text-xs sm:text-sm flex-shrink-0">
            <Activity className="w-3.5 h-3.5 sm:w-4 h-4 mr-1.5 sm:mr-2" /> Biomarkers
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg sm:rounded-xl px-4 sm:px-8 py-2 sm:py-3 data-[state=active]:darshai-gradient data-[state=active]:text-white transition-all font-bold text-xs sm:text-sm flex-shrink-0">
            <FileText className="w-3.5 h-3.5 sm:w-4 h-4 mr-1.5 sm:mr-2" /> Reports
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg sm:rounded-xl px-4 sm:px-8 py-2 sm:py-3 data-[state=active]:darshai-gradient data-[state=active]:text-white transition-all font-bold text-xs sm:text-sm flex-shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 h-4 mr-1.5 sm:mr-2" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 sm:space-y-8 outline-none">
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Vitals Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Body Temp', value: '98.6 °F', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Hydration', value: '85%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Energy', value: 'High', icon: Zap, color: 'text-darshai-green', bg: 'bg-darshai-green/10' },
                  ].map((vital) => (
                    <Card key={vital.label} className="border-none luxury-shadow rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${vital.bg} flex items-center justify-center`}>
                          <vital.icon className={`w-5 h-5 sm:w-6 h-6 ${vital.color}`} />
                        </div>
                        <div>
                          <p className="text-[8px] sm:text-[10px] font-bold text-darshai-teal uppercase tracking-widest">{vital.label}</p>
                          <p className="text-lg sm:text-xl font-bold text-darshai-blue">{vital.value}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Next Appointment */}
                <Card className="border-none luxury-shadow rounded-2xl sm:rounded-3xl bg-darshai-blue text-white p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Next Appointment</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 sm:w-6 h-6 text-darshai-green" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold">Tomorrow, 10:30 AM</p>
                        <p className="text-[10px] sm:text-xs text-white/60">Follow-up Consultation</p>
                      </div>
                    </div>
                    <Button className="w-full bg-darshai-green hover:bg-darshai-green/90 text-darshai-blue font-bold rounded-xl h-10 sm:h-12 text-xs sm:text-sm">
                      Reschedule
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Individual Analysis Overview */}
              <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] bg-white overflow-hidden">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Analysis Overview</CardTitle>
                      <p className="text-xs sm:text-sm text-darshai-teal font-medium">Personalized wellness trajectory and growth</p>
                    </div>
                    <Badge className="bg-darshai-green/10 text-darshai-green border-none px-3 py-1 rounded-full font-bold text-[10px] sm:text-xs">
                      +12% Improvement
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    <div className="h-[250px] sm:h-[300px]">
                      <p className="text-xs font-bold text-darshai-teal uppercase tracking-widest mb-4">Wellness Growth</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={healthMetrics}>
                          <defs>
                            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#99C24D" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#99C24D" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F0" />
                          <XAxis dataKey="name" hide />
                          <YAxis hide />
                          <Tooltip />
                          <Area type="monotone" dataKey="energy" stroke="#99C24D" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-6">
                      <p className="text-xs font-bold text-darshai-teal uppercase tracking-widest">Key Insights</p>
                      <div className="space-y-4">
                        {[
                          { title: 'Dosha Balance', desc: 'Significant stabilization in Pitta levels observed over the last 30 days.', trend: 'up' },
                          { title: 'Sleep Quality', desc: 'Average deep sleep duration increased by 45 minutes.', trend: 'up' },
                          { title: 'Stress Resilience', desc: 'Heart rate variability shows improved autonomic nervous system balance.', trend: 'up' },
                        ].map((insight, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-darshai-cream/30 border border-darshai-teal/5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${insight.trend === 'up' ? 'bg-darshai-green/10 text-darshai-green' : 'bg-red-50 text-red-500'}`}>
                              {insight.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-darshai-blue">{insight.title}</p>
                              <p className="text-xs text-darshai-teal leading-relaxed">{insight.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="biomarkers" className="space-y-6 sm:space-y-8 outline-none">
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Avg. Heart Rate', value: '72 bpm', status: 'Optimal', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
                  { label: 'Respiration', value: '16 br/m', status: 'Stable', icon: Activity, color: 'text-darshai-blue', bg: 'bg-darshai-blue/10' },
                  { label: 'Body Temp', value: '98.6 °F', status: 'Normal', icon: Thermometer, color: 'text-darshai-green', bg: 'bg-darshai-green/10' },
                  { label: 'Hydration', value: '84%', status: 'Good', icon: Droplets, color: 'text-darshai-teal', bg: 'bg-darshai-teal/10' },
                ].map((stat, i) => (
                  <Card key={i} className="border-none luxury-shadow rounded-2xl sm:rounded-3xl bg-white p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <Badge variant="outline" className="rounded-full border-darshai-green/20 text-darshai-green bg-darshai-green/5 px-2 py-0.5 text-[8px] font-bold uppercase">
                        {stat.status}
                      </Badge>
                    </div>
                    <p className="text-[10px] font-bold text-darshai-teal uppercase tracking-wider">{stat.label}</p>
                    <h3 className="text-xl font-bold text-darshai-blue">{stat.value}</h3>
                  </Card>
                ))}
              </div>

              <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 bg-white">
                <CardHeader className="px-0 pt-0 mb-6 sm:mb-8">
                  <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Biomarker Trends</CardTitle>
                  <p className="text-xs sm:text-sm text-darshai-teal font-medium">Continuous physiological monitoring data</p>
                </CardHeader>
                <CardContent className="px-0 h-[250px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthMetrics}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F4F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#5E9387', fontSize: 10}} />
                      <Tooltip />
                      <Line type="monotone" dataKey="energy" stroke="#99C24D" strokeWidth={3} dot={{ r: 4, fill: '#99C24D' }} />
                      <Line type="monotone" dataKey="stress" stroke="#1D3557" strokeWidth={3} dot={{ r: 4, fill: '#1D3557' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6 sm:space-y-8 outline-none">
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Drag & Drop Upload */}
                <Card className="lg:col-span-2 border-2 border-dashed border-darshai-teal/20 rounded-2xl sm:rounded-[3rem] bg-darshai-cream/10 p-8 sm:p-12 flex flex-col items-center justify-center text-center group hover:border-darshai-green/40 transition-all cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-darshai-cream flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-darshai-teal" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-darshai-blue mb-2">Upload Clinical Reports</h3>
                  <p className="text-xs sm:text-sm text-darshai-teal max-w-xs mb-6">Drag and drop PDF, JPG or PNG files here. Max file size 10MB.</p>
                  <Button className="darshai-gradient text-white font-bold rounded-xl px-8 h-12 shadow-lg">
                    Select Files
                  </Button>
                </Card>

                {/* AI Analysis Trigger */}
                <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] bg-white p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-darshai-blue mb-2">AI Clinical Insight</h3>
                    <p className="text-xs text-darshai-teal leading-relaxed">
                      Generate a comprehensive AI analysis based on the latest uploaded reports and biomarker data.
                    </p>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl h-12 shadow-lg mt-8">
                    Generate AI Analysis
                  </Button>
                </Card>
              </div>

              {/* Reports List */}
              <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] bg-white overflow-hidden">
                <CardHeader className="p-6 sm:p-10 border-b border-darshai-teal/5">
                  <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Report History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="divide-y divide-darshai-teal/5">
                      {[
                        { name: 'Prakriti Analysis.pdf', type: 'Clinical', date: 'Oct 12, 2023', size: '2.4 MB', last: true },
                        { name: 'Blood Work Oct.jpg', type: 'Lab Result', date: 'Oct 10, 2023', size: '1.8 MB', last: false },
                        { name: 'Wellness Plan.pdf', type: 'Prescription', date: 'Oct 05, 2023', size: '0.9 MB', last: false },
                        { name: 'Biomarker Audit.pdf', type: 'Clinical', date: 'Oct 01, 2023', size: '3.1 MB', last: false },
                        { name: 'Dietary Chart.pdf', type: 'Nutrition', date: 'Sep 28, 2023', size: '1.2 MB', last: false },
                      ].map((report, i) => (
                        <div key={i} className="p-4 sm:p-6 flex items-center justify-between hover:bg-darshai-cream/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-darshai-cream flex items-center justify-center">
                              <FileText className="w-5 h-5 sm:w-6 h-6 text-darshai-teal" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-darshai-blue">{report.name}</p>
                                {report.last && (
                                  <Badge className="bg-darshai-green text-white border-none text-[8px] px-1.5 py-0">Latest</Badge>
                                )}
                              </div>
                              <p className="text-[10px] text-darshai-teal font-medium uppercase tracking-widest">{report.type} • {report.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="hidden sm:block text-xs font-bold text-darshai-teal mr-4">{report.date}</p>
                            <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-darshai-teal hover:text-darshai-green">
                              <Eye className="w-4 h-4 sm:w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-darshai-teal hover:text-darshai-green">
                              <Download className="w-4 h-4 sm:w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="history" className="space-y-6 sm:space-y-8 outline-none">
          <ScrollArea className="h-[600px] w-full pr-4">
            <div className="space-y-6 sm:space-y-8">
              <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] bg-white overflow-hidden">
                <CardHeader className="p-6 sm:p-10 border-b border-darshai-teal/5">
                  <CardTitle className="text-xl sm:text-2xl font-heading text-darshai-blue">Clinical History</CardTitle>
                  <p className="text-xs sm:text-sm text-darshai-teal font-medium">Timeline of consultations and treatments</p>
                </CardHeader>
                <CardContent className="p-6 sm:p-10">
                  <div className="space-y-8">
                    {[
                      { date: 'Oct 12, 2023', title: 'Prakriti Analysis', desc: 'Comprehensive constitutional assessment completed.', icon: User, color: 'text-darshai-blue', bg: 'bg-darshai-blue/10' },
                      { date: 'Oct 05, 2023', title: 'Wellness Consultation', desc: 'Initial follow-up on Vata-balancing diet.', icon: Activity, color: 'text-darshai-green', bg: 'bg-darshai-green/10' },
                      { date: 'Sep 28, 2023', title: 'Biomarker Sync', desc: 'Initial baseline physiological data captured.', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 relative">
                        {i !== 2 && <div className="absolute left-6 top-12 bottom-[-32px] w-0.5 bg-darshai-teal/10" />}
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0 z-10`}>
                          <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-darshai-teal uppercase tracking-widest">{item.date}</p>
                          <h4 className="text-base font-bold text-darshai-blue">{item.title}</h4>
                          <p className="text-sm text-darshai-teal leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
