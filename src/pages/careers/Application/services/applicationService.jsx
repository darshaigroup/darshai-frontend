const API=`${import.meta.env.VITE_API_URL}/api`;

const getError=async res=>{
  try{
    const data=await res.json();
    return data?.errors?.map(e=>e.message).join(" ")||data?.message||data?.error||"Something went wrong.";
  }catch{
    return "Something went wrong.";
  }
};

const request=async(url,options={})=>{
  const res=await fetch(url,options);
  if(!res.ok) throw new Error(await getError(res));
  return res.json();
};

const getJobs=async()=>{
  const res=await request(`${API}/jobs`);
  return res?.data||res?.jobs||res||[];
};

const getJobById=async id=>{
  const res=await request(`${API}/jobs/id/${id}`);
  return res?.data||res?.job||res;
};

const getJobBySlug=async slug=>{
  const res=await request(`${API}/jobs/slug/${encodeURIComponent(slug)}`);
  return res?.data||res?.job||res;
};

const submitApplication=async values=>{
  const formData=new FormData();
  const payload={
    fullName:values.fullName,
    email:values.email,
    phone:values.phone,
    dob:values.dateOfBirth,
    gender:values.gender,
    qualification:values.qualification,
    specialization:values.specialization,
    institutionName:values.college,
    university:values.university,
    gradeType:values.gradeType,
    grade:values.grade,
    passingYear:values.passingYear,
    jobId:values.jobId,
    experienceType:values.experience,
    declaration:values.declaration
  };

  if(values.experience==="Experienced") payload.totalExperience=values.totalExperience;

  Object.entries(payload).forEach(([key,value])=>{
    if(value!==undefined&&value!==null&&value!=="") formData.append(key,String(value));
  });

  if(values.resume instanceof File) formData.append("resume",values.resume);

  return request(`${API}/applications/submit`,{method:"POST",body:formData});
};

export default{getJobs,getJobById,getJobBySlug,submitApplication};