const API=`${import.meta.env.VITE_API_URL}/api/hr/recruitment`;

const getError=async res=>{
  try{
    const data=await res.json();
    return data?.message||data?.error||data?.errors?.[0]?.message||"Something went wrong.";
  }catch{
    return `Request failed with status ${res.status}.`;
  }
};

const request=async(url,options={})=>{
  const res=await fetch(url,{
    ...options,
    headers:{
      Accept:"application/json",
      ...options.headers
    }
  });

  if(!res.ok) throw new Error(await getError(res));
  return res.json();
};

const getDashboard=async()=>{
  const res=await request(`${API}/dashboard`);
  return res?.data||{
    stats:{},
    applicationsByJob:[],
    recentApplications:[]
  };
};

const getApplications=async(params={})=>{
  const query=new URLSearchParams();

  Object.entries(params).forEach(([key,value])=>{
    if(value!==undefined&&value!==null&&value!=="") query.set(key,String(value));
  });

  const url=query.size?`${API}/applications?${query.toString()}`:`${API}/applications`;
  const res=await request(url);

  return{
    applications:Array.isArray(res?.data)?res.data:[],
    pagination:res?.pagination||{
      page:Number(params.page)||1,
      limit:Number(params.limit)||10,
      total:0,
      totalPages:0
    }
  };
};

const getJobOptions=async()=>{
  const res=await request(`${API}/jobs`);
  return Array.isArray(res?.data)?res.data:[];
};

const getApplicationById=async id=>{
  if(!id) throw new Error("Application ID is required.");
  const res=await request(`${API}/applications/${encodeURIComponent(id)}`);
  return res?.data||null;
};

const getCandidateById=async id=>{
  if(!id) throw new Error("Candidate ID is required.");
  const res=await request(`${API}/candidates/${encodeURIComponent(id)}`);
  return res?.data||null;
};

const getResumeUrl=async documentId=>{
  if(!documentId) throw new Error("Resume document ID is required.");
  const res=await request(`${API}/documents/${encodeURIComponent(documentId)}/view`);
  return res?.data||null;
};

export default{
  getDashboard,
  getApplications,
  getJobOptions,
  getApplicationById,
  getCandidateById,
  getResumeUrl
};