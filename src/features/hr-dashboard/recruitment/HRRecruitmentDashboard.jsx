import {useCallback,useEffect,useState} from "react";
import {AlertCircle,RefreshCw} from "lucide-react";
import {motion} from "framer-motion";
import hrRecruitmentService from "./services/hrRecruitmentService";
import RecruitmentHeader from "./components/header/RecruitmentHeader";
import RecruitmentStats from "./components/dashboard/RecruitmentStats";
import ApplicationsByJob from "./components/dashboard/ApplicationsByJob";
import RecentApplications from "./components/dashboard/RecentApplications";

const EMPTY_STATS={
  totalCandidates:0,
  totalApplications:0,
  applicationsToday:0,
  applicationsThisMonth:0,
  openJobs:0,
  openVacancies:0
};

const HRRecruitmentDashboard=()=>{
  const [stats,setStats]=useState(EMPTY_STATS),[applicationsByJob,setApplicationsByJob]=useState([]),[recentApplications,setRecentApplications]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");

  const loadDashboard=useCallback(async()=>{
    try{
      setLoading(true);
      setError("");
      const data=await hrRecruitmentService.getDashboard();
      setStats({...EMPTY_STATS,...data?.stats});
      setApplicationsByJob(Array.isArray(data?.applicationsByJob)?data.applicationsByJob:[]);
      setRecentApplications(Array.isArray(data?.recentApplications)?data.recentApplications:[]);
    }catch(err){
      setError(err?.message||"Unable to load recruitment dashboard.");
    }finally{
      setLoading(false);
    }
  },[]);

  useEffect(()=>{loadDashboard();},[loadDashboard]);

  if(error&&!loading) return(
    <div className="flex min-h-[60vh] items-center justify-center px-2">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500"><AlertCircle className="h-5 w-5"/></div>
        <h2 className="mt-4 text-base font-semibold text-[#243128]">Unable to load dashboard</h2>
        <p className="mt-2 text-sm leading-6 text-[#7A857E]">{error}</p>
        <button type="button" onClick={loadDashboard} className="mx-auto mt-5 flex h-10 items-center justify-center gap-2 rounded-xl bg-[#1E7A3A] px-4 text-sm font-semibold text-white transition hover:bg-[#17652F] active:scale-[.98]">
          <RefreshCw className="h-4 w-4"/>Try Again
        </button>
      </motion.div>
    </div>
  );

  return(
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <RecruitmentHeader stats={stats} loading={loading}/>

      <RecruitmentStats stats={stats} loading={loading}/>

      <div className="grid min-w-0 gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,.65fr)]">
        <ApplicationsByJob data={applicationsByJob} loading={loading}/>
        <RecentApplications data={recentApplications} loading={loading}/>
      </div>
    </div>
  );
};

export default HRRecruitmentDashboard;