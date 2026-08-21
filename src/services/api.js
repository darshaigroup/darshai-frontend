const API_URL=import.meta.env.VITE_API_URL||"http://localhost:5000";

const clearSession=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

const handleSessionExpiry=message=>{
  clearSession();
  window.dispatchEvent(new CustomEvent("session-expired",{detail:{message}}));
};

const getErrorMessage=(status,result)=>{
  if(status===401) return result?.message||"Your session has expired. Please login again.";
  if(status===403) return result?.message||"You don't have permission to perform this action.";
  if(status===404) return result?.message||"Requested resource was not found.";
  if(status>=500) return "Server error. Please try again later.";
  return result?.message||result?.error||"Request failed. Please try again.";
};

export const request=async(endpoint,options={})=>{
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
      handleSessionExpiry(
        result?.message||"Your session has expired. Please login again."
      );
      throw new Error("SESSION_EXPIRED");
    }

    if(!response.ok){
      const error=new Error(getErrorMessage(response.status,result));
      error.status=response.status;
      error.serverError=response.status>=500;
      throw error;
    }

    return result;
  }catch(error){
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

export default request;