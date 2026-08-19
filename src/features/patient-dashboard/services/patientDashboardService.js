const API_URL=import.meta.env.VITE_API_URL;

const request=async(endpoint,options={})=>{
  const token=localStorage.getItem("token");

  const response=await fetch(`${API_URL}${endpoint}`,{
    ...options,
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json",
      ...options.headers
    }
  });

  const result=await response.json().catch(()=>({}));

  if(response.status===401){
    window.dispatchEvent(
      new CustomEvent("session-expired",{
        detail:{
          message:result.message||"Your session has expired. Please login again."
        }
      })
    );
    throw new Error("SESSION_EXPIRED");
  }

  if(!response.ok) throw new Error(result.message||"Request failed");

  return result;
};

export const getMyProfile=()=>request("/api/patients/profile");
export const getMyReport=()=>request("/api/reports/patient-report");
export const getMyAssessment=()=>request("/api/assessments/my-assessment");
export const getAssessmentProgress=patientId=>request(`/api/reports/${patientId}/progress`);
export const searchMyDashboard=query=>request(`/api/reports/search?q=${encodeURIComponent(query)}`);

// Notifications
export const getNotifications=(limit=20)=>
  request(`/api/notifications?limit=${limit}`);

export const getUnreadNotificationCount=()=>
  request("/api/notifications/unread-count");

export const markNotificationAsRead=notificationId=>
  request(`/api/notifications/${notificationId}/read`,{
    method:"PATCH"
  });

export const markAllNotificationsAsRead=()=>
  request("/api/notifications/read-all",{
    method:"PATCH"
  });