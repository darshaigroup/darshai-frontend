const API_URL=import.meta.env.VITE_API_URL||"http://localhost:5000";

const clearSession=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

const request=async(endpoint,options={})=>{
  const token=localStorage.getItem("token");

  try{
    const response=await fetch(`${API_URL}${endpoint}`,{
      ...options,
      headers:{
        ...(token&&{Authorization:`Bearer ${token}`}),
        "Content-Type":"application/json",
        ...options.headers
      }
    });

    const result=await response.json().catch(()=>({}));

    if(response.status===401){
      const message=result.message||"Your session has expired. Please login again.";
      clearSession();

      window.dispatchEvent(
        new CustomEvent("session-expired",{detail:{message}})
      );

      throw new Error("SESSION_EXPIRED");
    }

    if(response.status>=500){
      const error=new Error("Server error. Please try again later.");
      error.status=response.status;
      error.serverError=true;
      throw error;
    }

    if(!response.ok){
      const error=new Error(
        result.message||result.error||"Request failed. Please try again."
      );
      error.status=response.status;
      throw error;
    }

    return result;
  }catch(error){
    if(error.message==="SESSION_EXPIRED") throw error;

    if(error.name==="TypeError"){
      const networkError=new Error(
        "Unable to connect to server. Please try again later."
      );
      networkError.networkError=true;
      throw networkError;
    }

    throw error;
  }
};

export const getMyProfile=()=>request("/api/patients/profile");
export const getMyReport=()=>request("/api/reports/patient-report");
export const getMyAssessment=()=>request("/api/assessments/my-assessment");
export const getAssessmentProgress=patientId=>
  request(`/api/reports/${patientId}/progress`);
export const searchMyDashboard=query=>
  request(`/api/reports/search?q=${encodeURIComponent(query)}`);

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