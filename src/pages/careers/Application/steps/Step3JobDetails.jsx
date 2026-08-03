import {useEffect,useState} from "react";
import {Controller,useFormContext} from "react-hook-form";
import {motion} from "framer-motion";
import {Briefcase,BadgeCheck} from "lucide-react";
import applicationService from "../services/applicationService";

const Select=({icon:Icon,error,children,...props})=>(
  <div className="space-y-2">
    <div className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${error?"border-red-400 focus-within:border-red-500":"border-[#D8E2DC] focus-within:border-[#1E7A3A]"}`}>
      <Icon className={`mr-3 h-5 w-5 shrink-0 ${error?"text-red-500":"text-[#8A958D]"}`}/>
      <select {...props} className="h-full min-w-0 w-full bg-transparent text-[15px] text-[#1C2A21] outline-none disabled:cursor-not-allowed disabled:opacity-60">
        {children}
      </select>
    </div>
    {error&&<p className="text-xs font-medium text-red-500">{error.message}</p>}
  </div>
);

const Field=({label,required,children})=>(
  <div className="min-w-0 space-y-2">
    <label className="text-sm font-semibold uppercase tracking-wide text-[#243128]">{label}{required&&<span className="text-red-500"> *</span>}</label>
    {children}
  </div>
);

const Step3JobDetails=()=>{
  const {control,watch,setValue,formState:{errors}}=useFormContext();
  const experience=watch("experience");
  const [jobs,setJobs]=useState([]),[loadingJobs,setLoadingJobs]=useState(true),[jobError,setJobError]=useState("");

  useEffect(()=>{
    let mounted=true;
    const loadJobs=async()=>{
      try{
        setLoadingJobs(true);
        setJobError("");
        const data=await applicationService.getJobs();
        if(mounted) setJobs(Array.isArray(data)?data:[]);
      }catch(err){
        if(mounted){setJobs([]);setJobError(err?.message||"Unable to load positions.");}
      }finally{
        if(mounted) setLoadingJobs(false);
      }
    };
    loadJobs();
    return()=>{mounted=false;};
  },[]);

  useEffect(()=>{
    if(experience==="Fresher") setValue("totalExperience","",{shouldValidate:false});
  },[experience,setValue]);

  const handleJobChange=(field,e)=>{
    const jobId=e.target.value,job=jobs.find(item=>String(item.id)===jobId);
    field.onChange(jobId);
    setValue("jobTitle",job?.title||"",{shouldDirty:true});
  };

  return(
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.35}} className="space-y-8">
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Position Applying For" required>
          <Controller name="jobId" control={control} render={({field})=>(
            <Select {...field} onChange={e=>handleJobChange(field,e)} icon={Briefcase} error={errors.jobId} disabled={loadingJobs}>
              <option value="">{loadingJobs?"Loading Positions...":"Select Position"}</option>
              {jobs.map(job=><option key={job.id} value={String(job.id)}>{job.title}</option>)}
            </Select>
          )}/>
          {jobError&&<p className="mt-2 text-xs font-medium text-red-500">{jobError}</p>}
          {!loadingJobs&&!jobError&&!jobs.length&&<p className="mt-2 text-xs font-medium text-[#7A857E]">No positions are currently available.</p>}
        </Field>

        <Field label="Experience Level" required>
          <Controller name="experience" control={control} render={({field})=>(
            <Select {...field} icon={BadgeCheck} error={errors.experience}>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </Select>
          )}/>
        </Field>

        {experience==="Experienced"&&(
          <Field label="Total Experience (in years)" required>
            <Controller name="totalExperience" control={control} render={({field})=>(
              <Select {...field} icon={BadgeCheck} error={errors.totalExperience}>
                <option value="">Select Experience</option>
                {Array.from({length:11},(_,i)=><option key={i} value={i}>{i} </option>)}
              </Select>
            )}/>
          </Field>
        )}
      </div>
    </motion.div>
  );
};

export default Step3JobDetails;