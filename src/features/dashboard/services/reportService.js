const API_URL=import.meta.env.VITE_API_URL;

const request=async(endpoint,options={})=>{
  const token=localStorage.getItem("token");
  const response=await fetch(`${API_URL}${endpoint}`,{...options,headers:{Authorization:`Bearer ${token}`,...options.headers}});
  const result=await response.json().catch(()=>({}));

  if(response.status===401){
    window.dispatchEvent(new CustomEvent("session-expired",{detail:{message:result.message||"Your session has expired. Please login again."}}));
    throw new Error("SESSION_EXPIRED");
  }

  if(!response.ok) throw new Error(result.message||"Request failed");
  return result;
};

export const getReportsTable=()=>request("/api/reports");

export const getPatientReport=patientId=>request(`/api/reports/${patientId}`);

export const getSignatures=async()=>{
  const result=await request("/api/practitioner/signatures");
  return result.data||[];
};

export const getPatientSummary=patientId=>request(`/api/reports/${patientId}`);

export const getAssessmentProgress=patientId=>request(`/api/reports/${patientId}/progress`);