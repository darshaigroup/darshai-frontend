const API=`${import.meta.env.VITE_API_URL}/api/hr/recruitment`;

const getError=async response=>{
  try{
    const data=await response.json();
    return data?.message||data?.error||data?.errors?.[0]?.message||"Something went wrong.";
  }catch{
    return `Request failed with status ${response.status}.`;
  }
};

const request=async(url,options={})=>{
  const token=localStorage.getItem("token");
  const response=await fetch(url,{...options,headers:{Accept:"application/json",Authorization:`Bearer ${token}`,...options.headers}});

  if(response.status===401){
    const message=await getError(response);
    window.dispatchEvent(new CustomEvent("session-expired",{detail:{message}}));
    throw new Error("SESSION_EXPIRED");
  }

  if(!response.ok) throw new Error(await getError(response));
  return response.json();
};

const getDashboard=async()=>{
  const result=await request(`${API}/dashboard`);
  return result?.data||{stats:{},applicationsByJob:[],recentApplications:[]};
};

const getApplications=async(params={})=>{
  const query=new URLSearchParams();
  Object.entries(params).forEach(([key,value])=>{if(value!==undefined&&value!==null&&value!=="")query.set(key,String(value));});
  const url=query.size?`${API}/applications?${query.toString()}`:`${API}/applications`;
  const result=await request(url);
  return{applications:Array.isArray(result?.data)?result.data:[],pagination:result?.pagination||{page:Number(params.page)||1,limit:Number(params.limit)||10,total:0,totalPages:0}};
};

const getJobOptions=async()=>{
  const result=await request(`${API}/jobs`);
  return Array.isArray(result?.data)?result.data:[];
};

const getApplicationById=async id=>{
  if(!id)throw new Error("Application ID is required.");
  const result=await request(`${API}/applications/${encodeURIComponent(id)}`);
  return result?.data||null;
};

const getCandidateById=async id=>{
  if(!id)throw new Error("Candidate ID is required.");
  const result=await request(`${API}/candidates/${encodeURIComponent(id)}`);
  return result?.data||null;
};

const getResumeUrl=async documentId=>{
  if(!documentId)throw new Error("Resume document ID is required.");
  const result=await request(`${API}/documents/${encodeURIComponent(documentId)}/view`);
  return result?.data||null;
};

export default{getDashboard,getApplications,getJobOptions,getApplicationById,getCandidateById,getResumeUrl};