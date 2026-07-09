const API=import.meta.env.VITE_API_URL||"http://localhost:5000";

const getToken=()=>localStorage.getItem("token");

async function request(endpoint,options={}){

  const res=await fetch(`${API}${endpoint}`,{
    cache: "reload",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${getToken()}`,
      ...options.headers,
    },
    ...options,
  });

  const data=await res.json();

  if(!res.ok){
    throw new Error(data.message||"Something went wrong");
  }

  return data.data;

}

/* ================= Dashboard ================= */

export const getDashboard=()=>
  request("/api/sales/dashboard");

export const getAnalytics=()=>
  request("/api/sales/analytics");

/* ================= Leads ================= */

export const getLeads=()=>
  request("/api/sales");

export const searchLeads=search=>
  request(`/api/sales/search?search=${encodeURIComponent(search)}`);

export const getLeadDetails=id=>
  request(`/api/sales/${id}`);

export const getLifestyleAssessment=id=>
  request(`/api/sales/${id}/lifestyle`);

export const getFollowupHistory=id=>
  request(`/api/sales/${id}/followups`);

export const updateLeadStatus=(id,lead_status)=>
  request(`/api/sales/${id}/status`,{
    method:"PATCH",
    body:JSON.stringify({lead_status}),
  });

export const updateSalesNotes=(id,sales_notes)=>
  request(`/api/sales/${id}/notes`,{
    method:"PATCH",
    body:JSON.stringify({sales_notes}),
  });

export const updateFollowup=(id,followup_date,sales_notes)=>
  request(`/api/sales/${id}/followup`,{
    method:"PATCH",
    body:JSON.stringify({
      followup_date,
      sales_notes,
    }),
  });

export const assignDoctor=(id,doctor_id)=>
  request(`/api/sales/${id}/assign`,{
    method:"PATCH",
    body:JSON.stringify({doctor_id}),
  });

export const getDoctors=()=>
  request("/api/sales/doctors");