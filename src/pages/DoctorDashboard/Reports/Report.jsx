import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const reports = [
  { id: '1', patient: 'Aria Montgomery', type: 'Prakriti Analysis', date: 'Oct 12, 2023', status: 'Finalized', size: '2.4 MB' },
  { id: '2', patient: 'Julian Thorne', type: 'Wellness Progress', date: 'Oct 10, 2023', status: 'Finalized', size: '1.8 MB' },
  { id: '3', patient: 'Elena Vance', type: 'Biomarker Audit', date: 'Oct 08, 2023', status: 'Pending Review', size: '3.1 MB' },
  { id: '4', patient: 'Marcus Chen', type: 'Dosha Rebalancing', date: 'Oct 05, 2023', status: 'Finalized', size: '2.1 MB' },
  { id: '5', patient: 'Sophia Loren', type: 'Lifestyle Prescription', date: 'Oct 02, 2023', status: 'Draft', size: '0.9 MB' },
];

export default function Reports() {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-darshai-blue">Clinical Reports</h2>
          <p className="text-sm sm:text-base text-darshai-teal font-medium">Comprehensive wellness documentation and AI analysis</p>
        </div>
        <div className="flex gap-3 sm:gap-4 justify-center">
          <Button variant="outline" className="rounded-xl sm:rounded-2xl border-darshai-teal/20 text-darshai-blue font-bold hover:bg-darshai-teal/5 px-4 sm:px-6 h-10 sm:h-12 text-xs sm:text-sm">
            Archive
          </Button>
          <Button className="darshai-gradient text-white font-bold rounded-xl sm:rounded-2xl px-6 sm:px-8 h-10 sm:h-12 shadow-xl hover:scale-105 transition-all text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Generate AI Report</span>
            <span className="sm:hidden">AI Report</span>
          </Button>
        </div>
      </div>

      <Card className="border-none luxury-shadow rounded-2xl sm:rounded-[3rem] overflow-hidden bg-white">
        <CardHeader className="p-6 sm:p-10 pb-4 sm:pb-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-between items-center">
            <div className="relative w-full lg:w-[450px] group">
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 h-5 text-darshai-teal group-focus-within:text-darshai-green transition-colors" />
              <Input 
                placeholder="Search reports..." 
                className="pl-10 sm:pl-14 bg-darshai-cream/50 border-none rounded-xl sm:rounded-2xl h-12 sm:h-14 focus-visible:ring-darshai-green luxury-shadow text-xs sm:text-sm"
              />
            </div>
            <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
              <Button variant="outline" className="flex-1 lg:flex-none rounded-xl sm:rounded-2xl border-darshai-teal/10 bg-darshai-cream/30 h-12 sm:h-14 px-4 sm:px-6 font-bold text-darshai-blue text-xs sm:text-sm">
                <Filter className="w-4 h-4 sm:mr-2 text-darshai-green" />
                Filter
              </Button>
              <Button variant="outline" className="flex-1 lg:flex-none rounded-xl sm:rounded-2xl border-darshai-teal/10 bg-darshai-cream/30 h-12 sm:h-14 px-4 sm:px-6 font-bold text-darshai-blue text-xs sm:text-sm">
                Date
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <div className="min-w-[900px]">
              <table className="w-full">
              <thead>
                <tr className="text-left bg-darshai-cream/30 border-y border-darshai-teal/5">
                  <th className="py-4 sm:py-6 px-4 sm:px-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-darshai-teal">Patient</th>
                  <th className="py-4 sm:py-6 px-4 sm:px-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-darshai-teal">Report Type</th>
                  <th className="py-4 sm:py-6 px-4 sm:px-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-darshai-teal">Generated Date</th>
                  <th className="py-4 sm:py-6 px-4 sm:px-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-darshai-teal">Status</th>
                  <th className="py-4 sm:py-6 px-4 sm:px-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-darshai-teal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-darshai-teal/5">
                {reports.map((report, i) => (
                  <motion.tr 
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-darshai-cream/50 transition-all cursor-pointer"
                  >
                    <td className="py-4 sm:py-6 px-4 sm:px-10">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white luxury-shadow">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=rep-${i}`} />
                          <AvatarFallback>{report.patient[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs sm:text-sm font-bold text-darshai-blue">{report.patient}</p>
                      </div>
                    </td>
                    <td className="py-4 sm:py-6 px-4 sm:px-10">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FileText className="w-4 h-4 sm:w-5 h-5 text-darshai-green" />
                        <span className="text-xs sm:text-sm font-bold text-darshai-blue">{report.type}</span>
                      </div>
                    </td>
                    <td className="py-4 sm:py-6 px-4 sm:px-10 text-[10px] sm:text-xs font-bold text-darshai-teal uppercase tracking-wider">
                      {report.date}
                    </td>
                    <td className="py-4 sm:py-6 px-4 sm:px-10">
                      <div className={`inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${
                        report.status === 'Finalized' ? 'bg-darshai-green/10 text-darshai-green' : 
                        report.status === 'Pending Review' ? 'bg-darshai-blue/10 text-darshai-blue' : 'bg-darshai-teal/10 text-darshai-teal'
                      }`}>
                        {report.status === 'Finalized' ? <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
                        {report.status}
                      </div>
                    </td>
                    <td className="py-4 sm:py-6 px-4 sm:px-10 text-right">
                      <div className="flex justify-end gap-1 sm:gap-2">
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-darshai-teal/10 text-darshai-teal w-8 h-8 sm:w-10 sm:h-10">
                          <Eye className="w-4 h-4 sm:w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-darshai-teal/10 text-darshai-teal w-8 h-8 sm:w-10 sm:h-10">
                          <Download className="w-4 h-4 sm:w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-darshai-teal/10 text-darshai-teal w-8 h-8 sm:w-10 sm:h-10">
                          <Share2 className="w-4 h-4 sm:w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-darshai-teal/5 bg-darshai-cream/20">
              <p className="text-[8px] sm:text-[10px] text-darshai-teal font-bold uppercase tracking-[0.2em] text-center sm:text-left">Securely stored in DARSHAI clinical cloud</p>
              <div className="flex gap-2 sm:gap-3">
                <Button variant="outline" size="sm" className="rounded-xl border-darshai-teal/10 h-10 px-4 sm:px-6 font-bold text-darshai-blue text-xs">Archive</Button>
                <Button variant="outline" size="sm" className="rounded-xl border-darshai-teal/10 h-10 px-4 sm:px-6 font-bold text-darshai-blue text-xs">Next</Button>
              </div>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
