const API=import.meta.env.VITE_API_URL||"http://localhost:5000";

const getToken=()=>localStorage.getItem("token");

const request=async(endpoint,options={})=>{
  const response=await fetch(`${API}${endpoint}`,{cache:"no-store",...options,headers:{"Content-Type":"application/json",Authorization:`Bearer ${getToken()}`,...options.headers}});
  const data=await response.json().catch(()=>({}));

  if(response.status===401){
    window.dispatchEvent(new CustomEvent("session-expired",{detail:{message:data.message||"Your session has expired. Please login again."}}));
    throw new Error("SESSION_EXPIRED");
  }

  if(!response.ok) throw new Error(data.message||"Something went wrong");
  return data.data;
};

export const getDashboard=()=>request("/api/sales/dashboard");
export const getAnalytics=()=>request("/api/sales/analytics");
export const getLeads=()=>request("/api/sales");
export const searchLeads=search=>request(`/api/sales/search?search=${encodeURIComponent(search)}`);
export const getLeadDetails=id=>request(`/api/sales/${id}`);
export const getLifestyleAssessment=id=>request(`/api/sales/${id}/lifestyle`);
export const getFollowupHistory=id=>request(`/api/sales/${id}/followups`);
export const updateLeadStatus=(id,lead_status)=>request(`/api/sales/${id}/status`,{method:"PATCH",body:JSON.stringify({lead_status})});
export const updateSalesNotes=(id,sales_notes)=>request(`/api/sales/${id}/notes`,{method:"PATCH",body:JSON.stringify({sales_notes})});
export const updateFollowup=(id,followup_date,sales_notes)=>request(`/api/sales/${id}/followup`,{method:"PATCH",body:JSON.stringify({followup_date,sales_notes})});
export const assignDoctor=(id,doctor_id)=>request(`/api/sales/${id}/assign`,{method:"PATCH",body:JSON.stringify({doctor_id})});
export const getDoctors=()=>request("/api/sales/doctors");