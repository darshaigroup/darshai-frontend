import {useCallback,useEffect,useState} from "react";
import {AlertCircle,RefreshCw} from "lucide-react";
import {motion} from "framer-motion";
import {useSearchParams} from "react-router-dom";
import hrRecruitmentService from "./services/hrRecruitmentService";
import ApplicantFilters from "./components/applicants/ApplicantFilters";
import ApplicantTable from "./components/applicants/ApplicantTable";
import Pagination from "./components/applicants/Pagination";
import CandidateDrawer from "./components/Candidate/CandidateDrawer";
import ResumeViewer from "./components/resume/ResumeViewer";

const DEFAULT_FILTERS={search:"",jobId:"",from:"",to:""};
const DEFAULT_PAGINATION={page:1,limit:10,total:0,totalPages:0};

const Applicants=()=>{
  const [searchParams,setSearchParams]=useSearchParams();

  const [applications,setApplications]=useState([]),
    [positions,setPositions]=useState([]),
    [pagination,setPagination]=useState(DEFAULT_PAGINATION),
    [filters,setFilters]=useState(()=>({...DEFAULT_FILTERS,jobId:searchParams.get("jobId")||""})),
    [loading,setLoading]=useState(true),
    [error,setError]=useState("");

  const [selectedApplication,setSelectedApplication]=useState(null),
    [drawerLoading,setDrawerLoading]=useState(false),
    [drawerError,setDrawerError]=useState("");

  const [resume,setResume]=useState(null),
    [resumeLoading,setResumeLoading]=useState(false),
    [resumeError,setResumeError]=useState("");

  const loadApplications=useCallback(async(page=1,currentFilters=filters)=>{
    try{
      setLoading(true);
      setError("");

      const result=await hrRecruitmentService.getApplications({
        page,
        limit:pagination.limit,
        ...currentFilters
      });

      setApplications(result.applications||[]);
      setPagination(result.pagination||DEFAULT_PAGINATION);
    }catch(err){
      setApplications([]);
      setError(err?.message||"Unable to load applications.");
    }finally{
      setLoading(false);
    }
  },[filters,pagination.limit]);

  const loadPositions=useCallback(async()=>{
    try{
      const result=await hrRecruitmentService.getJobOptions();
      setPositions(Array.isArray(result)?result:[]);
    }catch(err){
      console.error("Unable to load positions:",err);
      setPositions([]);
    }
  },[]);

  const openApplication=useCallback(async applicationId=>{
    if(!applicationId) return;

    try{
      setDrawerLoading(true);
      setDrawerError("");
      setSelectedApplication(null);

      const application=await hrRecruitmentService.getApplicationById(applicationId);
      setSelectedApplication(application);

      setSearchParams(current=>{
        const params=new URLSearchParams(current);
        params.set("applicationId",applicationId);
        return params;
      },{replace:true});
    }catch(err){
      setDrawerError(err?.message||"Unable to load candidate details.");
    }finally{
      setDrawerLoading(false);
    }
  },[setSearchParams]);

  const closeDrawer=()=>{
    setSelectedApplication(null);
    setDrawerError("");

    setSearchParams(current=>{
      const params=new URLSearchParams(current);
      params.delete("applicationId");
      return params;
    },{replace:true});
  };

  const openResume=async documentId=>{
    if(!documentId) return;

    try{
      setResumeLoading(true);
      setResumeError("");
      setResume(null);

      const data=await hrRecruitmentService.getResumeUrl(documentId);
      setResume(data);
    }catch(err){
      setResumeError(err?.message||"Unable to open resume.");
    }finally{
      setResumeLoading(false);
    }
  };

  const closeResume=()=>{
    setResume(null);
    setResumeError("");
    setResumeLoading(false);
  };

  const handleFiltersChange=nextFilters=>{
    const updated={...filters,...nextFilters};

    setFilters(updated);

    setSearchParams(current=>{
      const params=new URLSearchParams(current);

      if(updated.jobId) params.set("jobId",updated.jobId);
      else params.delete("jobId");

      params.delete("applicationId");

      return params;
    },{replace:true});

    loadApplications(1,updated);
  };

  const clearFilters=()=>{
    setFilters(DEFAULT_FILTERS);
    setSearchParams({});
    loadApplications(1,DEFAULT_FILTERS);
  };

  const handlePageChange=page=>{
    if(page<1||page>pagination.totalPages||page===pagination.page) return;

    loadApplications(page);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  useEffect(()=>{
    loadApplications(1);
    loadPositions();
  },[]);

  useEffect(()=>{
    const applicationId=searchParams.get("applicationId");
    if(applicationId) openApplication(applicationId);
  },[]);

  return(
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{opacity:0,y:8}}
        animate={{opacity:1,y:0}}
        transition={{duration:.3}}
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#1E7A3A]">
            Recruitment
          </p>

          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-.02em] text-[#183022] sm:text-3xl">
            Applications
          </h2>

          <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#7A857E]">
            Search, review and explore candidate applications from your recruitment workspace.
          </p>
        </div>

        {!loading&&!error&&(
          <div className="flex items-center gap-2 text-xs text-[#7D8981]">
            <span className="h-2 w-2 rounded-full bg-[#1E7A3A]"/>

            <span>
              <strong className="font-semibold text-[#344239]">
                {pagination.total.toLocaleString()}
              </strong>{" "}
              application{pagination.total===1?"":"s"}
            </span>
          </div>
        )}
      </motion.div>

      <ApplicantFilters
        filters={filters}
        positions={positions}
        onChange={handleFiltersChange}
        onClear={clearFilters}
        disabled={loading}
      />

      {error&&!loading?(
        <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-[#E3E9E4] bg-white p-6">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertCircle className="h-5 w-5"/>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[#29382E]">
              Unable to load applications
            </h3>

            <p className="mt-2 text-xs leading-5 text-[#8A958D]">
              {error}
            </p>

            <button
              type="button"
              onClick={()=>loadApplications(pagination.page)}
              className="mx-auto mt-5 flex h-10 items-center gap-2 rounded-xl bg-[#1E7A3A] px-4 text-sm font-semibold text-white transition hover:bg-[#17652F]"
            >
              <RefreshCw className="h-4 w-4"/>
              Try Again
            </button>
          </div>
        </div>
      ):(
        <>
          <ApplicantTable
            applications={applications}
            loading={loading}
            onView={openApplication}
            onResume={openResume}
          />

          {!loading&&pagination.totalPages>0&&(
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              onChange={handlePageChange}
            />
          )}
        </>
      )}

      <CandidateDrawer
        open={!!selectedApplication||drawerLoading||!!drawerError}
        application={selectedApplication}
        loading={drawerLoading}
        error={drawerError}
        onClose={closeDrawer}
        onResume={openResume}
      />

      <ResumeViewer
        open={!!resume||resumeLoading||!!resumeError}
        resume={resume}
        loading={resumeLoading}
        error={resumeError}
        onClose={closeResume}
      />
    </div>
  );
};

export default Applicants;