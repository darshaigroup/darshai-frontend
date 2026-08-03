import {useMemo,useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import applicationService from "../services/applicationService";

const MAX_FILE_SIZE=1024*1024;
const FILE_TYPES=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const schema=z.object({
  fullName:z.string().trim().min(3,"Full Name is required."),
  email:z.string().trim().email("Enter a valid email."),
  phone:z.string().regex(/^[6-9]\d{9}$/,"Enter a valid mobile number."),
  dateOfBirth:z.string().min(1,"Date of Birth is required."),
  gender:z.enum(["Male","Female","Other"],{message:"Select Gender."}),
  qualification:z.string().trim().min(1,"Qualification is required."),
  specialization:z.string().trim().min(1,"Specialization is required."),
  college:z.string().trim().min(2,"College / Institution is required."),
  university:z.string().trim().min(2,"University is required."),
  gradeType:z.enum(["CGPA","Percentage"],{message:"Select Grade Type."}),
  grade:z.string().trim().min(1,"CGPA / Percentage is required."),
  passingYear:z.string().regex(/^\d{4}$/,"Enter a valid passing year."),
  jobId:z.string().uuid("Invalid Job ID."),
  jobTitle:z.string().optional(),
  experience:z.enum(["Fresher","Experienced"]),
  totalExperience:z.string().optional(),
  resume:z.any().refine(file=>file,"Resume is required.").refine(file=>!file||file.size<=MAX_FILE_SIZE,"Maximum file size is 1 MB.").refine(file=>!file||FILE_TYPES.includes(file.type),"Only PDF, DOC & DOCX allowed."),
  declaration:z.literal(true,{errorMap:()=>({message:"Please accept the declaration."})})
}).superRefine((data,ctx)=>{
  const grade=Number(data.grade),experience=Number(data.totalExperience);
  if(data.gradeType==="CGPA"&&(Number.isNaN(grade)||grade<0||grade>10)) ctx.addIssue({code:z.ZodIssueCode.custom,path:["grade"],message:"CGPA must be between 0 and 10."});
  if(data.gradeType==="Percentage"&&(Number.isNaN(grade)||grade<0||grade>100)) ctx.addIssue({code:z.ZodIssueCode.custom,path:["grade"],message:"Percentage must be between 0 and 100."});
  if(data.experience==="Experienced"&&!data.totalExperience?.trim()) ctx.addIssue({code:z.ZodIssueCode.custom,path:["totalExperience"],message:"Total Experience is required."});
  else if(data.experience==="Experienced"&&(Number.isNaN(experience)||experience<0||experience>50)) ctx.addIssue({code:z.ZodIssueCode.custom,path:["totalExperience"],message:"Experience must be between 0 and 50 years."});
});

const defaultValues={
  fullName:"",email:"",phone:"",dateOfBirth:"",gender:"",
  qualification:"",specialization:"",college:"",university:"",gradeType:"",grade:"",passingYear:"",
  jobId:"",jobTitle:"",experience:"Fresher",totalExperience:"",
  resume:null,declaration:false
};

const STEP_FIELDS={
  1:["fullName","email","phone","dateOfBirth","gender"],
  2:["qualification","specialization","college","university","gradeType","grade","passingYear"],
  3:["jobId","experience","totalExperience"],
  4:["resume"],
  5:["declaration"]
};

const TOTAL_STEPS=5;

const useApplicationForm=()=>{
  const [step,setStep]=useState(1),[loading,setLoading]=useState(false),[success,setSuccess]=useState(false),[applicationCode,setApplicationCode]=useState(""),[jobTitle,setJobTitle]=useState(""),[submitError,setSubmitError]=useState("");
  const methods=useForm({resolver:zodResolver(schema),defaultValues,mode:"onTouched"});
  const progress=useMemo(()=>Math.round(step/TOTAL_STEPS*100),[step]);

  const nextStep=async()=>{
    const fields=step===3&&methods.getValues("experience")==="Fresher"?["jobId","experience"]:STEP_FIELDS[step];
    const valid=await methods.trigger(fields,{shouldFocus:true});
    if(!valid) return;
    setStep(s=>Math.min(s+1,TOTAL_STEPS));
  };

  const prevStep=()=>setStep(s=>Math.max(s-1,1));
  const goToStep=index=>setStep(Math.min(Math.max(index,1),TOTAL_STEPS));

  const resetForm=()=>{
    methods.reset(defaultValues);
    setStep(1);
    setLoading(false);
    setSuccess(false);
    setApplicationCode("");
    setJobTitle("");
    setSubmitError("");
  };

  const submit=async values=>{
    if(loading) return;
    setLoading(true);
    setSubmitError("");
    try{
      const response=await applicationService.submitApplication(values);
      setApplicationCode(response?.application?.applicationCode||response?.applicationCode||"");
      setJobTitle(values.jobTitle||"");
      setSuccess(true);
    }catch(err){
      setSubmitError(err?.message||"Unable to submit application. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return{methods,step,progress,loading,success,applicationCode,jobTitle,submitError,nextStep,prevStep,goToStep,submit,resetForm};
};

export default useApplicationForm;